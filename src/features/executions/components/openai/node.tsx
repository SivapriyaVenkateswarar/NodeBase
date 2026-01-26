"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { OpenAiDialog, OpenAiFormValues } from "./dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { fetchOpenAiRealtimeToken } from "./actions";
import { OPENAI_CHANNEL_NAME } from "@/inngest/channels/openai";


type OpenAiNodeData = {
  variableName?: string;
  systemPrompt?: string;
  credentialId?: string;
  userPrompt?: string;
};

type OpenAiNodeType = Node<OpenAiNodeData>;

export const OpenAiNode = memo(
  (props: NodeProps<OpenAiNodeType>) => {
    const nodeStatus = useNodeStatus({
        nodeId: props.id,
        channel: OPENAI_CHANNEL_NAME,
        topic:"status",
        refreshToken: fetchOpenAiRealtimeToken,
     });
    const { setNodes } = useReactFlow();
    const handleOpenSettings = () => setDialogOpen(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleSubmit = (values: OpenAiFormValues) => {
  setNodes((nodes) =>
    nodes.map((node) => {
      if (node.id === props.id) {
        return {
          ...node,
          data: {
            ...node.data,
            ...values,
          },
        };
      }

      return node;
    })
  );
};

const nodeData = props.data;
const description = nodeData ?. userPrompt
? `"gpt-3.5-turbo": ${nodeData.userPrompt.slice(0, 50)}... `
: "Not configured";

    return (
        <>
            <OpenAiDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              onSubmit={handleSubmit}
              defaultValues={nodeData}
            />
            <BaseExecutionNode
            {...props}
            id={props.id}
            icon="/logos/openai.svg"
            name="OpenAI"
            status={nodeStatus}
            description={description}
            onSettings={handleOpenSettings}
            onDoubleClick={handleOpenSettings}
            />
        </>
        );
  }
);

OpenAiNode.displayName = "OpenAiNode";