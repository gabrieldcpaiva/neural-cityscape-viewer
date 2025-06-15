
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

const HelpSection: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="text-lg font-semibold flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              Help & Instructions
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Getting Started:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Define your network architecture (layers and neurons)</li>
                <li>• Click "Generate Network" to create the visualization</li>
                <li>• Set input values using sliders or number inputs</li>
                <li>• Click on edges (roads) to adjust connection weights</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Visualization:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Neurons are cities with activation-based colors</li>
                <li>• Blue = low activation, White/Red = high activation</li>
                <li>• Green edges = positive weights, Red = negative weights</li>
                <li>• Thicker edges = stronger connection weights</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Interaction:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Zoom and pan the network visualization</li>
                <li>• Click edges to modify weights (-1 to 1)</li>
                <li>• Activations update in real-time</li>
                <li>• Uses sigmoid activation function</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Tips:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Start with small networks (2-3 layers)</li>
                <li>• Experiment with different weight values</li>
                <li>• Observe how changes propagate through layers</li>
                <li>• Try different input combinations</li>
              </ul>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default HelpSection;
