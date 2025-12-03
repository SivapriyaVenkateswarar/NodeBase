import { createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/lib/db";
import { inngest } from '@/inngest/client';

export const appRouter = createTRPCRouter({
  // Get all workflows
  getWorkflows: protectedProcedure.query(async ({ ctx }) => {
    return db.workflow.findMany();
  }),

  // Create a new workflow
  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "sia@gmail.com",
        message: "Yo",
      },
    });

    // Create the workflow in the database
    return db.workflow.create({
      data: {
        name: "test-workflow",
      },
    });

    return { success: true, message: "Job queued"}
  }),
});

// Export type definition of API
export type AppRouter = typeof appRouter;
