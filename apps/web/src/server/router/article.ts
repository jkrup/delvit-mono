import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { EvidenceType, Prisma } from "@prisma/client";
import { orderByMap } from "./question";

export const articleRouter = createRouter()
  .query("getTrendingPosts", {
    async resolve({ ctx }) {
      return ctx.prisma.post.findMany({
        where: {
          topics: {
            some: {
              topic: {
                title: {
                  equals: "TRENDING",
                },
              },
            },
          },
        },
      });
    },
  })
  .query("getPopularTopics", {
    async resolve({ ctx }) {
      const topics = await ctx.prisma.topic.findMany({
        select: { id: true, title: true },
      });
      return topics;
    },
  })
  .query("getQuestion", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.question.findUnique({
        where: {
          id: input.id,
        },
      });
    },
  })
  .query("getAllQuestions", {
    input: z.object({
      mode: z.enum(["NEW", "TOP"]),
      topic: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.question.findMany({
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });
    },
  })
  .query("getAllArticles", {
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
                topicId: input.topic,
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

      const where = {
        ...topics,
        ...query,
        parentPosts: {
          none: {},
        },
        parentQuestions: {
          none: {},
        },
      };

      return await ctx.prisma.post.findMany({
        where,
        include: {
          author: true,
          _count: {
            select: {
              comments: true,
              evidencePosts: true,
            },
          },
          topics: {
            select: {
              topic: true
            }
          }
        },
        orderBy,
      });
    },
  })
  .query("getBackTitle", {
    input: z.object({
      postId: z.string().optional(),
      questionId: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      const { postId, questionId } = input;
      if (postId) {
        return await ctx.prisma.post
          .findUnique({
            where: {
              id: postId,
            },
            select: {
              title: true,
            },
          })
          .then((p) => p?.title);
      }
      if (questionId) {
        return await ctx.prisma.question
          .findUnique({
            where: {
              id: questionId,
            },
            select: {
              title: true,
            },
          })
          .then((p) => p?.title);
      }
      return null;
    },
  })
  .query("getArticle", {
    input: z.object({
      articleId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const article = await ctx.prisma.post.findUnique({
        where: {
          id: input.articleId,
        },
        include: {
          author: true,
          comments: {
            orderBy: [
              {
                depth: "asc",
              },
              {
                votes: "desc",
              },
              {
                createdAt: "desc",
              },
            ],
            include: {
              author: true,
            },
          },
          evidencePosts: {
            include: {
              evidencePost: {
                include: {
                  _count: {
                    select: {
                      parentPosts: true,
                      comments: true,
                    },
                  },
                },
              },
            },
            orderBy: [
              {
                evidencePost: {
                  views: "desc",
                },
              },
              {
                evidencePost: {
                  createdAt: "desc",
                },
              },
            ],
          },
          topics: {
            select: {
              topic: true
            },
          },
        },
      });

      return article;
    },
  })
  .query("getOrderedComments", {
    input: z.object({
      postId: z.string().optional(),
      questionId: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const { postId, questionId } = input;
      const comments = await ctx.prisma.comment.findMany({
        where: {
          postId,
          questionId,
        },
        include: {
          author: true,
        },
        orderBy: {
          votes: "desc",
        },
      });

      const commentIds = comments.map((c) => c.id);

      const votesOnComments = await ctx.prisma.vote.findMany({
        where: {
          commentId: {
            in: commentIds,
          },
          userId: ctx.session.userId as string,
        },
      });

      const commentToVotes = new Map<string, number>();
      votesOnComments.forEach((commentVote) => {
        commentToVotes.set(commentVote.commentId!, commentVote.vote);
      });

      if (comments.length === 0) {
        return [];
      }

      const orderedComments: ((typeof comments)[number] & {
        hasVoted?: number;
      })[] = [];

      // parentToChildrenMap generation {

      const parentToChildrenMap = new Map<string, typeof orderedComments>();
      // build map
      comments.forEach((comment) => {
        const k = comment.parentCommentId || "root";

        if (!parentToChildrenMap.has(k)) {
          parentToChildrenMap.set(k, []);
        }

        parentToChildrenMap.get(k)!.push(comment);
      });

      // }

      // This should never happen, but potentially could if data is weird.
      if (!parentToChildrenMap.has("root")) {
        return [];
        // parentToChildrenMap.set("root", []);
      }

      const rootComments = parentToChildrenMap.get("root")!;

      rootComments.forEach((rootComment) => {
        if (commentToVotes.has(rootComment.id)) {
          rootComment.hasVoted = commentToVotes.get(rootComment.id)!;
        }

        orderedComments.push(rootComment);

        let cids: string[] = [];
        cids.push(rootComment.id);
        let depth = 0;
        while (cids.length > 0) {
          const lastCid = cids[cids.length - 1]!;
          const ptcCid = parentToChildrenMap.get(lastCid)!;

          if (ptcCid?.length > 0) {
            depth = depth + 1;
            const newComment = ptcCid.shift()!;

            if (commentToVotes.has(newComment.id)) {
              newComment.hasVoted = commentToVotes.get(newComment.id)!;
            }

            orderedComments.push({ ...newComment, depth });

            cids.push(newComment.id);
          } else {
            depth = depth - 1;
            cids.pop();
          }
          continue;
        }
      });

      return orderedComments;
    },
  })
  .query("getArticleComments", {
    input: z.object({
      articleId: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const comments = await ctx.prisma.post.findUnique({
        where: {
          id: input.articleId,
        },
        select: {
          comments: {
            orderBy: [
              {
                depth: "asc",
              },
              {
                votes: "desc",
              },
              {
                createdAt: "desc",
              },
            ],
            include: {
              author: true,
            },
          },
        },
      });

      const commentToVotes = await ctx.prisma.vote.findMany({
        where: {
          userId: ctx.session.userId as string,
          commentId: {
            in: comments?.comments.map((c) => c.id),
          },
        },
      });

      return {
        comments,
        commentToVotes,
      };
    },
  })
  .query("getArticleCommentVotes", {
    input: z.object({
      articleId: z.string().optional(),
      questionId: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // commentIds that belong to specific ARTICLE
      const commentIds = input.articleId
        ? await ctx.prisma.post
            .findUnique({
              where: {
                id: input.articleId,
              },
              select: {
                comments: {
                  select: {
                    id: true,
                  },
                },
              },
            })
            .then((c) => c?.comments.map((c) => c.id))
        : await ctx.prisma.question
            .findUnique({
              where: {
                id: input.questionId,
              },
              select: {
                comments: {
                  select: {
                    id: true,
                  },
                },
              },
            })
            .then((c) => c?.comments.map((c) => c.id));

      // My votes within the article
      const commentToVotes = await ctx.prisma.vote.findMany({
        where: {
          userId: ctx.session.userId as string,
          commentId: {
            in: commentIds,
          },
        },
      });

      return commentToVotes;
    },
  })
  // Increments VIEW on article
  .mutation("viewArticle", {
    input: z.object({
      articleId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const article = await ctx.prisma.post.update({
        where: {
          id: input.articleId,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });

      return article;
    },
  })
  .query("getTopic", {
    input: z.object({
      topicId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const topic = await ctx.prisma.topic.findUnique({
        where: {
          id: input.topicId,
        },
        include: {
          posts: true,
        },
      });

      return topic;
    },
  })
  .mutation("editTopic", {
    input: z.object({
      id: z.string(),
      title: z.string(),
      body: z.string(),
      relatedArticleIds: z.string().array(),
    }),
    async resolve({ input, ctx }) {
      const relatedArticlesToConnect = input.relatedArticleIds.map((id) => ({
        id,
      }));
      const t = await ctx.prisma.topic.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          body: input.body,
          // posts: {
          //   // connect: relatedArticlesToConnect
          // },
        },
        include: {
          posts: true,
        },
      });
      return t;
    },
  })
  .mutation("removeArticleFromTopic", {
    input: z.object({
      articleId: z.string(),
      topicId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const { articleId, topicId } = input;
      const updated = await ctx.prisma.topic.update({
        where: {
          id: topicId,
        },
        data: {
          // posts: {
          //   disconnect: [{ id: articleId }],
          // },
        },
      });
      return updated;
    },
  })
  .mutation("addArticleToTopic", {
    input: z.object({
      articleId: z.string(),
      topicId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const { articleId, topicId } = input;
      const updated = await ctx.prisma.topic.update({
        where: {
          id: topicId,
        },
        data: {
          // posts: {
          //   connect: [{ id: articleId }],
          // },
        },
      });

      return updated;
    },
  })
  .mutation("createTopic", {
    input: z.object({
      title: z.string(),
      body: z.string(),
    }),
    async resolve({ input, ctx }) {
      const { title, body } = input;

      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const newTopic = await ctx.prisma.topic.create({
        data: {
          title,
          body,
        },
      });

      return newTopic;
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
          forPercent: 50,
          views: 0,
          authorId: userId,
        },
      });

      return {
        questionId: a?.id,
      };
    },
  })
  .mutation("submitPost", {
    input: z.object({
      title: z.string(),
      body: z.string(),
      url: z.string().optional(),
      questionId: z.string().optional(),
      postId: z.string().optional(),
      for: z.boolean().optional().default(true),
      image: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const userId = ctx.session.userId as string;

      const a = await ctx.prisma.post.create({
        data: {
          title: input.title,
          body: input.body,
          url: !!input.url ? input.url : undefined,
          authorId: userId,
          imgSrc: input.image,
          topics: {
            createMany: {
              data: input.tags?.map(topicId => ({topicId})) ?? []
            }
          }
        },
        include: {
          topics: true
        }
      });

      const existingPosts = await ctx.prisma.post.count({
        where: {
          authorId: userId
        }
      })

      if (existingPosts === 1) {
        // give points for first post
        await ctx.prisma.pointDisbursement.create({
          data: {
            amount: 100,
            message: `First Post`,
            kind: 'SYSTEM',
            userId
          }
        })
      }

      if (input.questionId && a?.id) {
        const relationship = await ctx.prisma.evidenceOnQuestion.create({
          data: {
            evidencePostId: a.id,
            parentQuestionId: input.questionId,
            evidenceType: input.for ? EvidenceType.FOR : EvidenceType.AGAINST,
          },
        });
      }

      if (input.postId && a?.id) {
        const relationship = await ctx.prisma.evidenceOnPost.create({
          data: {
            evidencePostId: a.id,
            parentPostId: input.postId,
            evidenceType: input.for ? EvidenceType.FOR : EvidenceType.AGAINST,
          },
        });
      }

      return {
        postId: a?.id,
      };
    },
  })

  .mutation("removeQuestion", {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.prisma.question.delete({
        where: {
          id: input.questionId
        }
      })
    },
  })

  .mutation("removePost", {
    input: z.object({
      postId: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.prisma.post.delete({
        where: {
          id: input.postId
        }
      })
    },
  })
