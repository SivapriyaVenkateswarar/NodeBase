import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { cache } from "react";

/**
 * Context creation for each request
 * (optional, you can add request-specific data here)
 */
export const createTRPCContext = cache(async () => {
  return { userId: "user_123" }; // Example — replace with actual session if needed
});

/**
 * Initialize tRPC
 */
const t = initTRPC.create({});

/**
 * Base router and procedure helpers
 */
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

/**
 * Protected procedure — middleware to require authentication
 */

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  return next({
    ctx: {
      ...ctx,
      auth: session,
    },
  });
});
