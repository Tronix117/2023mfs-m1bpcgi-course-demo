import { router } from '../trpc.js';

import { userRouter as users } from './userRouter.js';

export const appRouter = router({
  users,
});

export type AppRouter = typeof appRouter;
