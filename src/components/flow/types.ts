
export interface CityNodeData extends Record<string, unknown> {
  label: string;
  layer: 'input' | 'hidden' | 'output';
  activation: number;
  isOutput?: boolean;
}

export interface RoadEdgeData extends Record<string, unknown> {
  weight: number;
  onWeightChange?: (edgeId: string, newWeight: number) => void;
}
