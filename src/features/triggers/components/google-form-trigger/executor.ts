import type { NodeExecutor } from "@/features/executions/types";
import { googleFormTriggerChannel } from "@/inngest/channels/google-form-trigger";

type GoogleFormTriggerData = Record<string, unknown>;

export const googleFormTriggerExecutor: NodeExecutor<GoogleFormTriggerData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
      await publish(
        googleFormTriggerChannel().status({
          nodeId,
          status: "loading",
        }),
      );
  // TODO: Publish "loading" state for googleForm trigger

  const result = await step.run("google-form-trigger", async () => context);

  // TODO: Publish "success" state for googleForm trigger

        await publish(
        googleFormTriggerChannel().status({
          nodeId,
          status: "success",
        }),
      );
  return result;
};
