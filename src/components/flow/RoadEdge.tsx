
import { EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge } from '@xyflow/react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Label } from '@/components/ui/label';

const RoadEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleWeightChange = (newWeight: number[]) => {
    data.onWeightChange(id, newWeight[0]);
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <Popover>
          <PopoverTrigger asChild>
            <div
              style={{
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                pointerEvents: 'all',
              }}
              className="nodrag nopan"
            >
              <button className="bg-card border text-foreground text-xs rounded-full px-2 py-1 cursor-pointer hover:scale-110 transition-transform">
                w: {data.weight.toFixed(2)}
              </button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-4">
            <div className="grid gap-4">
                <Label htmlFor={`weight-${id}`}>Connection Strength</Label>
                <Slider
                    id={`weight-${id}`}
                    defaultValue={[data.weight]}
                    max={1}
                    min={-1}
                    step={0.1}
                    onValueChange={handleWeightChange}
                />
            </div>
          </PopoverContent>
        </Popover>
      </EdgeLabelRenderer>
    </>
  );
};

export default RoadEdge;
