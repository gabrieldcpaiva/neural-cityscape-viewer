
import { useState, useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';
import NeuralNetFlow from '@/components/flow/NeuralNetFlow';
import ControlPanel from '@/components/ui/ControlPanel';
import { useSetState } from '@uidotdev/usehooks';
import { initialNodes, initialEdges } from '@/components/flow/initial-elements';

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

const Index = () => {
  const [nodes, setNodes] = useSetState<Node[]>(initialNodes);
  const [input1, setInput1] = useState(0.5);
  const [input2, setInput2] = useState(0.8);

  const handleRunSimulation = useCallback((currentNodes: Node[], currentEdges: Edge[]) => {
      const updatedNodes = [...currentNodes];
      
      const getNode = (id: string) => updatedNodes.find(n => n.id === id);
      const getEdge = (source: string, target: string) => currentEdges.find(e => e.source === source && e.target === target);

      // Set initial input activations
      const i1 = getNode('i1');
      if (i1) i1.data.activation = input1;
      const i2 = getNode('i2');
      if (i2) i2.data.activation = input2;

      // Calculate hidden layer activations
      const h1 = getNode('h1');
      if (h1) {
          const w_i1_h1 = getEdge('i1', 'h1')?.data.weight || 0;
          const w_i2_h1 = getEdge('i2', 'h1')?.data.weight || 0;
          const act_i1 = getNode('i1')?.data.activation || 0;
          const act_i2 = getNode('i2')?.data.activation || 0;
          h1.data.activation = sigmoid(act_i1 * w_i1_h1 + act_i2 * w_i2_h1);
      }

      const h2 = getNode('h2');
      if (h2) {
          const w_i1_h2 = getEdge('i1', 'h2')?.data.weight || 0;
          const w_i2_h2 = getEdge('i2', 'h2')?.data.weight || 0;
          const act_i1 = getNode('i1')?.data.activation || 0;
          const act_i2 = getNode('i2')?.data.activation || 0;
          h2.data.activation = sigmoid(act_i1 * w_i1_h2 + act_i2 * w_i2_h2);
      }
      
      // Calculate output layer activation
      const o1 = getNode('o1');
      if (o1) {
          const w_h1_o1 = getEdge('h1', 'o1')?.data.weight || 0;
          const w_h2_o1 = getEdge('h2', 'o1')?.data.weight || 0;
          const act_h1 = getNode('h1')?.data.activation || 0;
          const act_h2 = getNode('h2')?.data.activation || 0;
          o1.data.activation = sigmoid(act_h1 * w_h1_o1 + act_h2 * w_h2_o1);
      }

      // We need to trick React Flow into re-rendering the nodes
      setNodes(updatedNodes.map(n => ({...n})));

  }, [input1, input2, setNodes]);

  const Flow = useCallback(() => (
    <NeuralNetFlow onRunSimulation={handleRunSimulation} />
  ), [handleRunSimulation])

  return (
    <div className="min-h-screen w-screen flex flex-col md:flex-row bg-background text-foreground p-4 gap-4">
      <header className="absolute top-4 left-4">
        <h1 className="text-2xl font-bold text-primary">Neural Cities</h1>
        <p className="text-muted-foreground">Visualizing networks in motion.</p>
      </header>
      <main className="flex-grow h-[calc(100vh-200px)] md:h-auto">
         <Flow />
      </main>
      <aside className="w-full md:w-auto">
        <ControlPanel 
          input1={input1}
          setInput1={setInput1}
          input2={input2}
          setInput2={setInput2}
          onRun={handleRunSimulation}
        />
      </aside>
    </div>
  );
};

export default Index;
