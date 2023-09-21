import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  OpinionOpinion,
  QuestionStateState,
  SchellingState,
} from "@prisma/client";

export const orderByMap = {
  NEW: { createdAt: "desc" },
  TOP: { views: "desc" },
} as const;

export const questionRouter = createRouter()
  .query("getSchellingQuestions", {
    async resolve({ ctx }) {
      const questions = await ctx.prisma.question.findMany({
        include: {
          questionStates: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
          Schelling: {
            where: {
              userId: ctx.session?.userId as string,
            },
            orderBy: {
              state: "desc",
            },
          },
        },
        where: {
          Schelling: {
            some: {
              userId: ctx.session!.userId as string,
              state: { not: SchellingState.SUBMITTED },
            },
          },
          questionStates: {
            some: {
              state: {
                equals: "ACTIVE",
              },
            },
          },
        },
      });

      return questions.filter((q) => {
        return q.questionStates[0]?.state === "ACTIVE";
      });
    },
  })
  .mutation("acceptSchelling", {
    input: z.object({
      question: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.schelling.update({
        data: {
          state: SchellingState.PENDING,
        },
        where: {
          userId_questionId: {
            questionId: input.question,
            userId: ctx.session!.userId as string,
          },
        },
      });
    },
  })
  .mutation("answerSchelling", {
    input: z.object({
      question: z.string(),
      response: z.object({
        answer: z.boolean().optional(),
        confidence: z.number().min(0).max(4).optional(),
        bestPostId: z.string().optional(),
        personalAnswer: z.boolean().optional(),
      }),
      done: z.boolean().optional(),
    }),
    async resolve({ input, ctx }) {
      const markDone = input.done ? { state: SchellingState.SUBMITTED } : {};
      const s = await ctx.prisma.schelling.findUnique({
        where: {
          userId_questionId: {
            questionId: input.question,
            userId: ctx.session!.userId as string,
          },
        },
      });
      if (s?.state !== SchellingState.PENDING) {
        // don't do anything if not "PENDING"
        return s;
      }
      return await ctx.prisma.schelling.update({
        data: {
          ...input.response,
          ...markDone,
        },
        where: {
          userId_questionId: {
            questionId: input.question,
            userId: ctx.session!.userId as string,
          },
        },
      });
    },
  })
  .query("getActiveUsers", {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ ctx, input: {questionId} }) {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.userId,
        },
      });

      if (user?.bio !== 'allyourbasearebelongtous') {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return await ctx.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          image: true,
          Schelling: {
            where: {
              questionId
            },
          }
        }
      });
    },
  })
  .mutation("createSchelling", {
    input: z.object({
      questionId: z.string(),
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const { questionId } = input;

      const userId = ctx.session.userId as string;
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (user?.bio !== 'allyourbasearebelongtous') {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return await ctx.prisma.schelling.create({
        data: {
          questionId,
          state: SchellingState.INVITED,
          userId: input.userId,
        },
      });
    },
  })
  .mutation("finalizeConsensus", {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const { questionId } = input
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.userId,
        },
      });

      if (user?.bio !== 'allyourbasearebelongtous') {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.prisma.questionState.create({
        data: {
          questionId,
          state: QuestionStateState.CLOSED,
        },
      });

      await ctx.prisma.consensus.create({
        data: {
          questionId,
          answer: 'FOR',
          body: '',
          confidence: '3',
        },
      });

      return true
    },
  })
  .query("getAllQuestions", {
    input: z.object({
      mode: z.enum(["NEW", "TOP"]),
      topic: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      const orderBy = orderByMap[input.mode];

      return await ctx.prisma.question.findMany({
        include: {
          author: true,
          questionStates: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
          _count: {
            select: {
              comments: true,
              posts: true,
            },
          },
        },
        where: {
          topics: {
            some: {
              topicId: input.topic,
            },
          },
        },
        orderBy,
      });
    },
  })
  .query("getRecentConsensus", {
    async resolve({ ctx }) {
      return await ctx.prisma.question
        .findMany({
          select: {
            id: true,
            title: true,
            questionStates: {
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
            },
          },
          where: {
            questionStates: {
              some: {
                state: {
                  equals: QuestionStateState.CLOSED,
                },
              },
            },
          },
        })
        .then((qs) => {
          return qs
            .filter((q) => {
              return (
                q.questionStates[0] &&
                q.questionStates[0].state === QuestionStateState.CLOSED
              );
            })
            .sort((a, b) => {
              return (
                Number(b.questionStates[0]!.createdAt) -
                Number(a.questionStates[0]!.createdAt)
              );
            });
        });
    },
  })
  .query("getAllActiveQuestions", {
    input: z.object({
      mode: z.enum(["NEW", "TOP"]),
      topic: z.string().optional(),
      query: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      const orderBy = orderByMap[input.mode];

      const topics = input.topic
        ? {
            topics: {
              some: {
                topicId: {
                  equals: input.topic,
                },
              },
            },
          }
        : {};

      const query = input.query
        ? {
            title: {
              search: input.query,
            },
          }
        : {};

      const allQuestions = await ctx.prisma.question.findMany({
        include: {
          author: true,
          questionStates: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
          posts: {
            select: {
              evidenceType: true
            },
          },
          _count: {
            select: {
              comments: true,
              posts: true,
            },
          },
        },
        where: {
          ...topics,
          ...query,
        },
        orderBy,
      });

      const activeQuestions = allQuestions.filter(
        (q) => q.questionStates?.[0]?.state === "ACTIVE"
      );
      // .map((q) => ({
      //   id: q.id,
      //   author: {
      //     id: q.authorId,
      //     name: q.author.name,
      //     avatarUrl: q.author.image,
      //   },
      //   title: q.title,
      // }));

      return activeQuestions;
    },
  })
  .query("getAllPendingQuestions", {
    input: z.object({
      // type: z.enum("ACTIVE", "PENDING", "CONSENSUS"),
      mode: z.enum(["NEW", "TOP"]),
      topic: z.string().optional(),
      query: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      const orderBy = orderByMap[input.mode];

      const userId = ctx.session?.userId as string | undefined | null;
      const opinions = userId
        ? ({
            where: {
              userId: userId,
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          } as const)
        : undefined;

      const topics = input.topic
        ? {
            topics: {
              some: {
                topicId: {
                  equals: input.topic,
                },
              },
            },
          }
        : {};

      const query = input.query
        ? {
            title: {
              search: input.query,
            },
          }
        : {};

      const allQuestions = await ctx.prisma.question.findMany({
        include: {
          author: true,
          questionStates: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
          opinions,
          _count: {
            select: {
              comments: true,
              posts: true,
              opinions: true,
            },
          },
          comments: {
            include: {
              author: true,
            },
          },
        },
        where: {
          ...topics,
          ...query,
        },
        orderBy,
      });

      const pendingQuestions = allQuestions
        .filter(
          (q) => !q.questionStates[0] || q.questionStates[0].state === "PENDING"
        )
        .map((q) => ({
          id: q.id,
          author: {
            id: q.authorId,
            name: q.author.name ?? undefined,
            avatarUrl: q.author.image ?? undefined,
          },
          title: q.title,
          opinion: q.opinions?.[0]?.opinion,
          comments: q.comments,
          votes: q._count.opinions,
        }));

      return pendingQuestions;
    },
  })
  .query("getAllConsensusQuestions", {
    input: z.object({
      // type: z.enum("ACTIVE", "PENDING", "CONSENSUS"),
      mode: z.enum(["NEW", "TOP"]),
      topic: z.string().optional(),
      query: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      const orderBy = orderByMap[input.mode];
      const topics = input.topic
        ? {
            topics: {
              some: {
                topicId: {
                  equals: input.topic,
                },
              },
            },
          }
        : {};
      const query = input.query
        ? {
            title: {
              search: input.query,
            },
          }
        : {};

      const allQuestions = await ctx.prisma.question.findMany({
        include: {
          author: true,
          questionStates: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
          _count: {
            select: {
              comments: true,
              posts: true,
            },
          },
          Consensus: true,
        },
        where: {
          ...topics,
          ...query,
        },
        orderBy,
      });

      console.log(allQuestions.filter((q) => q.questionStates?.[0]?.state === "CLOSED"))

      const pendingQuestions = allQuestions
        .filter((q) => q.questionStates?.[0]?.state === "CLOSED" && !!q.Consensus)
        .sort((a, b) => {
          return (
            Number(b.questionStates[0]!.createdAt) -
            Number(a.questionStates[0]!.createdAt)
          );
        })
        .map((q) => ({
          id: q.id,
          author: {
            id: q.authorId,
            name: q.author.name ?? undefined,
            avatarUrl: q.author.image ?? undefined,
          },
          answer: {
            result:
              q.Consensus!.answer === "FOR"
                ? ("Yes" as const)
                : ("No" as const),
            confidence: q.Consensus!.confidence,
            body: q.Consensus!.body,
          } as const,
          title: q.title,
        }));

      return pendingQuestions;
    },
  })
  .query("getQuestion", {
    input: z.object({
      id: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const { id } = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.userId,
        },
      });

      return await ctx.prisma.question.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
          posts: {
            include: {
              evidencePost: {
                include: {
                  author: true,
                  _count: {
                    select: {
                      evidencePosts: true,
                      comments: true,
                    },
                  },
                },
              },
            },
            orderBy: {
              evidencePost: {
                createdAt: "desc",
              },
            },
          },
          comments: true,
          topics: true,
          questionStates: {
            orderBy: {
              createdAt: 'desc'
            },
            select: {
              id: true,
              state: true,
              createdAt: true
            },
          },
          Schelling: user?.bio === 'allyourbasearebelongtous'
        },
      });
    },
  })
  .query("getQuestionWithConsensus", {
    input: z.object({
      id: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      const { id } = input;
      return await ctx.prisma.question.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
          Consensus: true,
          posts: {
            include: {
              evidencePost: {
                include: {
                  author: true,
                  _count: {
                    select: {
                      evidencePosts: true,
                      comments: true,
                    },
                  },
                },
              },
            },
            orderBy: {
              evidencePost: {
                createdAt: "desc",
              },
            },
          },
          comments: true,
          topics: true,
          Schelling: {
            where: {
              userId: ctx.session!.userId as string,
            },
          },
        },
      });
    },
  })
  .mutation("setOpinion", {
    input: z.object({
      opinion: z.enum(["AGREE", "DISAGREE"]),
      questionId: z.string(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.opinion.create({
        data: {
          userId: ctx.session!.userId as string,
          questionId: input.questionId,
          opinion:
            input.opinion === "AGREE"
              ? OpinionOpinion.AGREE
              : OpinionOpinion.DISAGREE,
        },
      });
    },
  })
  .mutation("submitQuestion", {
    input: z.object({
      title: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const userId = ctx.session.userId as string;

      const a = await ctx.prisma.question.create({
        data: {
          title: input.title,
          authorId: userId,
          forPercent: 50,
          views: 0,
        },
      });

      return {
        questionId: a?.id,
        test: {
          session: ctx.session,
          input,
        },
      };
    },
  })
  .mutation("activateQuestion", {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const { questionId } = input;

      const userId = ctx.session.userId as string;
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (user?.bio !== 'allyourbasearebelongtous') {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.prisma.questionState.create({
        data: {
          questionId,
          state: QuestionStateState.ACTIVE,
        },
      });

      return {
        questionId,
      };
    },
  });