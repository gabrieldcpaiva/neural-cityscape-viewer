
import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { initialNodes, initialEdges } from './initial-elements';
import CityNode from './CityNode';
import RoadEdge from './RoadEdge';

const nodeTypes = { city: CityNode };
const edgeTypes = { road: RoadEdge };

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

interface NeuralNetFlowProps {
  input1: number;
  input2: number;
  onRunSimulation: (nodes: Node[], edges: Edge[]) => void;
}

const NeuralNetFlow = React.memo(({ onRunSimulation }: { onRunSimulation: (nodes: Node[], edges: Edge[]) => void }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleWeightChange = useCallback((edgeId: string, newWeight: number) => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === edgeId) {
          return { ...edge, data: { ...edge.data, weight: newWeight } };
        }
        return edge;
      })
    );
  }, [setEdges]);

  const runSimulation = useCallback(() => {
    onRunSimulation(nodes, edges);
  }, [nodes, edges, onRunSimulation]);

  const edgesWithHandler = edges.map(edge => ({
    ...edge,
    data: {
        ...edge.data,
        onWeightChange: handleWeightChange,
    }
  }))

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

