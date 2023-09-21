import { createRouter } from './context'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { Prisma } from '@prisma/client'

export const topicRouter = createRouter()
	.query('getPopularTopics', {
		async resolve({ ctx }) {
			return ctx.prisma.topic.findMany({
				where: {
					NOT: {
						title: 'TRENDING', // This is used only for tagging Trending Posts
					},
				},
			})
			// return [
			//   {
			//     id: "1",
			//     title: "Breaking",
			//   },
			//   {
			//     id: "2",
			//     title: "General",
			//   },
			//   {
			//     id: "3",
			//     title: "Climate Change",
			//   },
			//   {
			//     id: "4",
			//     title: "USA",
			//   },
			//   {
			//     id: "8",
			//     title: "Flights by Amelia Earhart",
			//   },
			//   {
			//     id: "9",
			//     title: "awehowofe",
			//   },
			//   {
			//     id: "10",
			//     title: "Aleec",
			//   },
			// ];
		},
	})
	.query('list', {
		async resolve({ ctx }) {
			const topics = await ctx.prisma.topic.findMany({
				select: { id: true, title: true },
			})
			return topics
		},
	})
	.mutation('createTopic', {
		input: z.object({
			title: z.string(),
		}),
		async resolve({ ctx, input }) {
			return ctx.prisma.topic.create({
				data: {
					title: input.title,
				},
			})
		},
	})
	.mutation('removeTopic', {
		input: z.object({
			topicId: z.string(),
		}),
		async resolve({ ctx, input }) {
			return ctx.prisma.topic.delete({
				where: {
					id: input.topicId,
				},
			})
		},
	})
