
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus } from 'lucide-react';

interface NetworkArchitectureProps {
  onGenerateNetwork: (layers: number[]) => void;
  isNetworkGenerated: boolean;
}

const NetworkArchitecture: React.FC<NetworkArchitectureProps> = ({
  onGenerateNetwork,
  isNetworkGenerated
}) => {
  const [layers, setLayers] = useState<number[]>([2, 3, 1]);

  const addLayer = () => {
    setLayers([...layers, 3]);
  };

  const removeLayer = () => {
    if (layers.length > 2) {
      setLayers(layers.slice(0, -1));
    }
  };

  const updateLayerSize = (index: number, size: number) => {
    const newLayers = [...layers];
    newLayers[index] = Math.max(1, Math.min(10, size));
    setLayers(newLayers);
  };

  const handleGenerate = () => {
    onGenerateNetwork(layers);
  };

  const getLayerName = (index: number) => {
    if (index === 0) return 'Input Layer';
    if (index === layers.length - 1) return 'Output Layer';
    return `Hidden Layer ${index}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Network Architecture</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {layers.map((size, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Label className="w-24 text-sm">{getLayerName(index)}:</Label>
              <Input
                type="number"
                min="1"
                max="10"
                value={size}
                onChange={(e) => updateLayerSize(index, parseInt(e.target.value) || 1)}
                className="w-20"
                disabled={isNetworkGenerated}
              />
              <span className="text-sm text-muted-foreground">neurons</span>
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={addLayer}
            variant="outline"
            size="sm"
            disabled={layers.length >= 5 || isNetworkGenerated}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Layer
          </Button>
          <Button
            onClick={removeLayer}
            variant="outline"
            size="sm"
            disabled={layers.length <= 2 || isNetworkGenerated}
          >
            <Minus className="h-4 w-4 mr-1" />
            Remove Layer
          </Button>
        </div>

        <Button onClick={handleGenerate} className="w-full" disabled={isNetworkGenerated}>
          Generate Network
        </Button>

        <div className="text-xs text-muted-foreground">
          <p>• Minimum 2 layers (input + output)</p>
          <p>• Maximum 5 layers, 10 neurons per layer</p>
          <p>• Fully connected between adjacent layers</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkArchitecture;
