import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./services/cookies";
import { systemRouter } from "./routers/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    getTop: publicProcedure
      .input(
        z
          .object({
            limit: z.number().default(10),
            platform: z.enum(["tiktok_shop", "instagram"]).optional(),
          })
          .passthrough(),
      )
      .query(async ({ input }) => {
        // TODO: Implement with actual database queries
        return [];
      }),

    getById: publicProcedure.input(z.string()).query(async ({ input }) => {
      // TODO: Implement with actual database queries
      return null;
    }),
  }),

  sellers: router({
    getTop: publicProcedure
      .input(
        z
          .object({
            limit: z.number().default(10),
            platform: z.enum(["tiktok_shop", "instagram"]).optional(),
          })
          .passthrough(),
      )
      .query(async ({ input }) => {
        // TODO: Implement with actual database queries
        return [];
      }),

    getById: publicProcedure.input(z.string()).query(async ({ input }) => {
      // TODO: Implement with actual database queries
      return null;
    }),
  }),

  notifications: router({
    getUnread: protectedProcedure.query(async ({ ctx }) => {
      // TODO: Implement with actual database queries
      return [];
    }),

    markAsRead: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        // TODO: Implement with actual database queries
        return { success: true };
      }),
  }),

  insights: router({
    getLatest: protectedProcedure.query(async ({ ctx }) => {
      // TODO: Implement with actual database queries
      return [];
    }),
  }),
});

export type AppRouter = typeof appRouter;
