// src/utils/trpc.ts
import type { AppRouter } from "../server/router";
import { createReactQueryHooks } from "@trpc/react";
import { createTRPCClient } from "@trpc/client";

export const trpc = createReactQueryHooks<AppRouter>();
export const trpcRaw = createTRPCClient<AppRouter>({
    url: '/api/trpc'
});

/**
 * Check out tRPC docs for Inference Helpers
 * https://trpc.io/docs/infer-types#inference-helpers
 */
