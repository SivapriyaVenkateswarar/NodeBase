import { Button } from "@/components/ui/button";
import { FlaskConicalIcon } from "lucide-react";
import { useExecuteWorkflow } from "@/features/workflows/hooks/use-workflows";

type ExecuteWorkflowButtonProps = {
  workflowId: string;
};

export const ExecuteWorkflowButton = ({
  workflowId,
}: ExecuteWorkflowButtonProps) => {
  const executeWorkflow = useExecuteWorkflow();

  const handleExecute = () => {
    executeWorkflow.mutate({ id: workflowId });
  };

  return (
    <Button
      size="lg"
      onClick={handleExecute}
      disabled={executeWorkflow.isPending}
    >
      <FlaskConicalIcon className="size-4 mr-2" />
      Execute workflow
    </Button>
  );
};
