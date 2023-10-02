import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const authRouter = createRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("getProfile", {
    async resolve({ ctx }) {
      const userId = ctx.session!.userId as string;

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          _count: {
            select: {
              posts: true,
              comments: true,
              votes: true,
            },
          },
          points: {
            orderBy: {
              createdAt: 'desc'
            }
          }
        },
      });

      return user;
    },
  })
  .query("getName", {
    async resolve({ ctx }) {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const userId = ctx.session.userId as string;
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      return user?.name;
    },
  })
  .query("isAdmin", {
    async resolve({ ctx }) {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const userId = ctx.session.userId as string;
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      return user?.bio === 'allyourbasearebelongtous';
    },
  })
  .query("getUserID", {
    async resolve({ ctx }) {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return ctx.session.userId
    },
  })
  .query("getAvatar", {
    async resolve({ ctx }) {

      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const userId = ctx.session.userId as string;

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      return user?.image || "https://i.imgur.com/hepj9ZS.png";
    },
  })
  .mutation("updateProfile", {
    input: z.object({
      name: z.string().optional(),
      title: z.string().optional(),
      bio: z.string().optional(),
      image: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const userId: string = ctx.session.userId as string;

      const update = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: input.name,
          title: input.title,
          bio: input.bio,
          image: input.image,
        },
      });

      return update;
    },
  })
  .mutation("submitComment", {
    input: z.object({
      body: z.string(),
      postId: z.string().optional(),
      questionId: z.string().optional(),
      parentCommentId: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      const { postId, questionId, body, parentCommentId } = input;
      if (!postId && !questionId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Not attached to postId or questionId",
        });
      }
      const userId = ctx.session!.userId as string

      const comment = await ctx.prisma.comment.create({
        data: {
          questionId,
          postId,
          body,
          authorId: ctx.session!.userId as string,
          parentCommentId,
        },
      });

      const existingComments = await ctx.prisma.comment.count({
        where: {
          authorId: userId
        }
      })

      if (existingComments === 1) {
        // give points for first comment
        await ctx.prisma.pointDisbursement.create({
          data: {
            amount: 100,
            message: `First Banter`,
            kind: 'SYSTEM',
            userId
          }
        })
      }


      return comment;
    },
  })
  .mutation("voteComment", {
    input: z.object({
      vote: z.number(),
      commentId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const { vote, commentId } = input;
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const userId = ctx.session.userId as string;

      if ([-1, 1].indexOf(vote) === -1) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      // UPVOTE or DOWNVOTE

      const existingVote = await ctx.prisma.vote.findFirst({
        where: {
          commentId,
          userId,
          // userId_commentId: {
          //   commentId,
          //   userId,
          // },
        },
      });

      if (!existingVote) {
        await ctx.prisma.vote.create({
          data: {
            userId,
            commentId,
            vote,
          },
        });
      } else {
        if (existingVote.vote === vote) {
          await ctx.prisma.vote.deleteMany({
            where: {
              commentId,
              userId,
            },
          });
        } else {
          await ctx.prisma.vote.updateMany({
            where: {
              commentId,
              userId,
            },
            data: {
              vote,
            },
          });
        }
      }

      const allCommentVotes = await ctx.prisma.vote.findMany({
        where: {
          commentId: commentId,
        },
        select: {
          vote: true,
        },
      });

      // sum of all votes
      const voteVal = allCommentVotes.reduce((acc, val) => {
        return acc + val.vote;
      }, 0);

      const commentToVote = await ctx.prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          votes: voteVal,
        },
      });

      console.log({ allCommentVotes, voteVal, commentToVote });

      return commentToVote;
    },
  });
