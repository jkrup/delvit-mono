// src/pages/api/trpc/[trpc].ts
import { appRouter } from '@/server/router'
import { createNextApiHandler } from '@trpc/server/adapters/next'

import { createContext } from '../../../server/router/context'

// export API handler
export default createNextApiHandler({
	router: appRouter,
	createContext: createContext,
})
