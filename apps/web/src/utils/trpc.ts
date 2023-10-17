// src/utils/trpc.ts
import { createTRPCClient } from '@trpc/client'
import { createReactQueryHooks } from '@trpc/react'

import type { AppRouter } from '../server/router'

export const trpc = createReactQueryHooks<AppRouter>()
export const trpcRaw = createTRPCClient<AppRouter>({
	url: '/api/trpc',
})

/**
 * Check out tRPC docs for Inference Helpers
 * https://trpc.io/docs/infer-types#inference-helpers
 */
