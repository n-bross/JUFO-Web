import { eventRouter } from "~/server/api/routers/event";
import { tournamentRouter } from "~/server/api/routers/tournament";
import { qrCodeRouter } from "~/server/api/routers/qrcode";
import { pageRouter } from "~/server/api/routers/page";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  event: eventRouter,
  tournament: tournamentRouter,
  qrCode: qrCodeRouter,
  page: pageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.event.getAll();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
