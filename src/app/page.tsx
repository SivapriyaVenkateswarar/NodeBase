"use client";

import { LogoutButton } from "./logout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useQuery(
    trpc.getWorkflows.queryOptions()
  );

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued")
      },
    })
  );

   return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      protected client component
      <div>{JSON.stringify(data, null, 2)}</div>
      <LogoutButton />
      <Button
        disabled={create.isPending}        
        onClick={() => create.mutate()}    
      >
        Create Workflow
      </Button>
    </div>
  );
};

export default Page;
