
import { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: 'i1',
    type: 'city',
    position: { x: 50, y: 100 },
    data: { label: 'Input 1', layer: 'input', activation: 0.5 },
  },
  {
    id: 'i2',
    type: 'city',
    position: { x: 50, y: 250 },
    data: { label: 'Input 2', layer: 'input', activation: 0.8 },
  },
  {
    id: 'h1',
    type: 'city',
    position: { x: 350, y: 100 },
    data: { label: 'Hidden 1', layer: 'hidden', activation: 0 },
  },
  {
    id: 'h2',
    type: 'city',
    position: { x: 350, y: 250 },
    data: { label: 'Hidden 2', layer: 'hidden', activation: 0 },
  },
  {
    id: 'o1',
    type: 'city',
    position: { x: 650, y: 175 },
    data: { label: 'Output', layer: 'output', activation: 0, isOutput: true },
  },
];

export const initialEdges: Edge[] = [
  { id: 'e-i1-h1', source: 'i1', target: 'h1', type: 'road', data: { weight: 0.3 } },
  { id: 'e-i1-h2', source: 'i1', target: 'h2', type: 'road', data: { weight: -0.6 } },
  { id: 'e-i2-h1', source: 'i2', target: 'h1', type: 'road', data: { weight: 0.8 } },
  { id: 'e-i2-h2', source: 'i2', target: 'h2', type: 'road', data: { weight: 0.1 } },
  { id: 'e-h1-o1', source: 'h1', target: 'o1', type: 'road', data: { weight: 0.7 } },
  { id: 'e-h2-o1', source: 'h2', target: 'o1', type: 'road', data: { weight: 0.4 } },
];
