
import { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CityNodeData } from './types';

type CityNodeType = Node<CityNodeData>;

const CityNode = ({ data, isConnectable }: NodeProps<CityNodeType>) => {
  const { label, layer, activation, isOutput } = data;

  return (
    <Card className={cn('react-flow__node-city', layer)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <Building2 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold">{activation.toFixed(4)}</div>
        <p className="text-xs text-muted-foreground">Activation</p>
      </CardContent>
      {!isOutput && <Handle type="source" position={Position.Right} isConnectable={isConnectable} />}
      {layer !== 'input' && <Handle type="target" position={Position.Left} isConnectable={isConnectable} />}
    </Card>
  );
};

export default memo(CityNode);
