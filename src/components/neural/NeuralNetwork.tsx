
import React, { useEffect, useRef, useState } from 'react';
import cytoscape, { Core, EdgeSingular, NodeSingular } from 'cytoscape';

interface NetworkLayer {
  size: number;
  neurons: Array<{
    id: string;
    activation: number;
  }>;
}

interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  weight: number;
}

interface NeuralNetworkProps {
  layers: number[];
  inputValues: number[];
  onWeightChange: (edgeId: string, weight: number) => void;
  weights: NetworkEdge[];
}

const sigmoid = (x: number): number => 1 / (1 + Math.exp(-x));

// Helper function to convert activation to color
const activationToColor = (activation: number): string => {
  const intensity = Math.round(activation * 255);
  return `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
};

const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
  layers,
  inputValues,
  onWeightChange,
  weights
}) => {
  const cyRef = useRef<HTMLDivElement>(null);
  const cyInstance = useRef<Core | null>(null);
  const [activations, setActivations] = useState<Record<string, number>>({});

  // Initialize network structure
  const initializeNetwork = () => {
    const nodes: any[] = [];
    const edges: any[] = [];
    
    // Create nodes for each layer
    layers.forEach((layerSize, layerIndex) => {
      for (let neuronIndex = 0; neuronIndex < layerSize; neuronIndex++) {
        const nodeId = `Layer${layerIndex + 1}_${neuronIndex + 1}`;
        const activation = layerIndex === 0 ? (inputValues[neuronIndex] || 0) : 0;
        nodes.push({
          data: {
            id: nodeId,
            label: nodeId,
            layer: layerIndex,
            neuron: neuronIndex,
            activation: activation
          },
          position: {
            x: 150 + layerIndex * 200,
            y: 100 + neuronIndex * 80
          }
        });
      }
    });

    // Create edges between adjacent layers
    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
      const currentLayerSize = layers[layerIndex];
      const nextLayerSize = layers[layerIndex + 1];
      
      for (let sourceIndex = 0; sourceIndex < currentLayerSize; sourceIndex++) {
        for (let targetIndex = 0; targetIndex < nextLayerSize; targetIndex++) {
          const sourceId = `Layer${layerIndex + 1}_${sourceIndex + 1}`;
          const targetId = `Layer${layerIndex + 2}_${targetIndex + 1}`;
          const edgeId = `${sourceId}_${targetId}`;
          
          const existingWeight = weights.find(w => w.id === edgeId);
          const weight = existingWeight ? existingWeight.weight : (Math.random() * 2 - 1);
          
          edges.push({
            data: {
              id: edgeId,
              source: sourceId,
              target: targetId,
              weight: weight
            }
          });
        }
      }
    }

    return { nodes, edges };
  };

  // Calculate activations for the network
  const calculateActivations = () => {
    const newActivations: Record<string, number> = {};
    
    // Set input layer activations
    for (let i = 0; i < layers[0]; i++) {
      const nodeId = `Layer1_${i + 1}`;
      newActivations[nodeId] = inputValues[i] || 0;
    }

    // Calculate activations for hidden and output layers
    for (let layerIndex = 1; layerIndex < layers.length; layerIndex++) {
      const layerSize = layers[layerIndex];
      
      for (let neuronIndex = 0; neuronIndex < layerSize; neuronIndex++) {
        const targetId = `Layer${layerIndex + 1}_${neuronIndex + 1}`;
        let weightedSum = 0;
        
        // Sum weighted inputs from previous layer
        for (let prevNeuronIndex = 0; prevNeuronIndex < layers[layerIndex - 1]; prevNeuronIndex++) {
          const sourceId = `Layer${layerIndex}_${prevNeuronIndex + 1}`;
          const edgeId = `${sourceId}_${targetId}`;
          
          const weight = weights.find(w => w.id === edgeId)?.weight || 0;
          const sourceActivation = newActivations[sourceId] || 0;
          
          weightedSum += sourceActivation * weight;
        }
        
        newActivations[targetId] = sigmoid(weightedSum);
      }
    }
    
    setActivations(newActivations);
    return newActivations;
  };

  // Initialize Cytoscape
  useEffect(() => {
    if (!cyRef.current) return;

    const { nodes, edges } = initializeNetwork();
    
    cyInstance.current = cytoscape({
      container: cyRef.current,
      elements: [...nodes, ...edges],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#E3F2FD',
            'label': 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': '#000000',
            'font-size': '10px',
            'width': '60px',
            'height': '60px',
            'border-width': '2px',
            'border-color': '#333333'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': '2px',
            'line-color': '#4CAF50',
            'target-arrow-color': '#4CAF50',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(weight)',
            'font-size': '8px',
            'text-background-color': '#ffffff',
            'text-background-opacity': 0.8,
            'text-background-padding': '2px'
          }
        }
      ],
      layout: {
        name: 'preset'
      },
      userZoomingEnabled: true,
      userPanningEnabled: true,
      boxSelectionEnabled: false
    });

    // Add click handler for edges
    cyInstance.current.on('tap', 'edge', (event) => {
      const edge = event.target as EdgeSingular;
      const currentWeight = edge.data('weight');
      const newWeight = prompt(`Enter new weight (current: ${currentWeight.toFixed(3)}):`, currentWeight.toString());
      
      if (newWeight !== null && !isNaN(parseFloat(newWeight))) {
        const weight = parseFloat(newWeight);
        if (weight >= -1 && weight <= 1) {
          onWeightChange(edge.id(), weight);
        } else {
          alert('Weight must be between -1 and 1');
        }
      }
    });

    return () => {
      if (cyInstance.current) {
        cyInstance.current.destroy();
      }
    };
  }, [layers]);

  // Update activations when inputs or weights change
  useEffect(() => {
    const newActivations = calculateActivations();
    
    if (cyInstance.current) {
      // Update node colors based on activations
      cyInstance.current.nodes().forEach((node: NodeSingular) => {
        const activation = newActivations[node.id()] || 0;
        const color = activationToColor(activation);
        node.style('background-color', color);
        node.data('activation', activation);
      });

      // Update edge weights
      cyInstance.current.edges().forEach((edge: EdgeSingular) => {
        const weight = weights.find(w => w.id === edge.id())?.weight || 0;
        edge.data('weight', weight.toFixed(3));
        const width = Math.abs(weight) * 8 + 1;
        const lineColor = weight >= 0 ? '#4CAF50' : '#F44336';
        edge.style('width', `${width}px`);
        edge.style('line-color', lineColor);
        edge.style('target-arrow-color', lineColor);
      });
    }
  }, [inputValues, weights]);

  return (
    <div className="w-full h-full min-h-[500px] border rounded-lg bg-gradient-to-br from-blue-50 to-green-50">
      <div ref={cyRef} className="w-full h-full" />
    </div>
  );
};

export default NeuralNetwork;
