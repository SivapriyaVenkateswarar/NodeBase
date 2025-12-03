import { db } from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // Fetching the vide o 
    await step.sleep("fetch-video", "5s");

    // Transcribing
    await step.sleep("transcribe-video", "5s");

    // Sending transcription to AI
    await step.sleep("send-transcription", "5s");

    // Create workflow record
    return await step.run("create-workflow", async () => {
      return db.workflow.create({
        data: {
          name: "workflow-from-ingest",
        },
      });
    });
  }
);
