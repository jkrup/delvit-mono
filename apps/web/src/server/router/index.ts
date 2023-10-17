// src/server/router/index.ts
import superjson from 'superjson'

import { articleRouter } from './article'
import { authRouter } from './auth'
import { createRouter } from './context'
import { questionRouter } from './question'
import { topicRouter } from './topic'

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('article.', articleRouter)
	.merge('topic.', topicRouter)
	.merge('question.', questionRouter)
	.merge('auth.', authRouter)

// export type definition of API
export type AppRouter = typeof appRouter
