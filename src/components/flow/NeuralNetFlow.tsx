
import React from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import CityNode from './CityNode';
import RoadEdge from './RoadEdge';

const nodeTypes = { city: CityNode };
const edgeTypes = { road: RoadEdge };

interface NeuralNetFlowProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onWeightChange: (edgeId: string, newWeight: number) => void;
}

const NeuralNetFlow = React.memo(({ nodes, edges, onNodesChange, onEdgesChange, onWeightChange }: NeuralNetFlowProps) => {

  const edgesWithHandler = edges.map(edge => ({
    ...edge,
    data: {
        ...edge.data,
        onWeightChange: onWeightChange,
    }
  }));

  return (
    <ReactFlow
      nodes={nodes}
      edges={edgesWithHandler}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
      className="bg-background"
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
});

export default NeuralNetFlow;
