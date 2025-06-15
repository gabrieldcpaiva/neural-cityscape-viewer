
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface InputControlsProps {
  inputCount: number;
  inputValues: number[];
  onInputChange: (index: number, value: number) => void;
}

const InputControls: React.FC<InputControlsProps> = ({
  inputCount,
  inputValues,
  onInputChange
}) => {
  if (inputCount === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Input Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Generate a network first to see input controls.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Input Layer Activations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: inputCount }, (_, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm">Input {index + 1}:</Label>
              <Input
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={(inputValues[index] || 0).toFixed(1)}
                onChange={(e) => onInputChange(index, parseFloat(e.target.value) || 0)}
                className="w-20 h-8"
              />
            </div>
            <Slider
              value={[inputValues[index] || 0]}
              onValueChange={(value) => onInputChange(index, value[0])}
              max={1}
              min={0}
              step={0.05}
              className="w-full"
            />
          </div>
        ))}
        
        <div className="text-xs text-muted-foreground mt-4">
          <p>• Adjust input values between 0 and 1</p>
          <p>• Watch activation propagate through the network</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InputControls;
