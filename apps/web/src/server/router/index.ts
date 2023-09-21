// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { articleRouter } from "./article";
import { authRouter } from "./auth";
import { topicRouter } from "./topic";
import { questionRouter } from "./question";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("article.", articleRouter)
  .merge("topic.", topicRouter)
  .merge("question.", questionRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
