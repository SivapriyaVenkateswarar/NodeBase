"use client";

import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import { WorkflowNode } from "./workflow-node";
import { NodeSelector } from "./node-selector";

export const InitialNode = memo((props: NodeProps) => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  return (
    <WorkflowNode name="Initial node" description="Click to add a node">
      <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
        <PlaceholderNode {...props} 
        onClick={() => setSelectorOpen(true)}>
          <div className="cursor-pointer flex items-center justify-center">
            <PlusIcon className="size-4" />
          </div>
        </PlaceholderNode>
      </NodeSelector>
    </WorkflowNode>
  );
});

InitialNode.displayName = "InitialNode";
