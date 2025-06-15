
import React, { useState, useCallback } from 'react';
import NeuralNetwork from './NeuralNetwork';
import NetworkArchitecture from './NetworkArchitecture';
import InputControls from './InputControls';
import HelpSection from './HelpSection';
import { Button } from '@/components/ui/button';
import { RotateCcw, Shuffle } from 'lucide-react';

interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  weight: number;
}

const NeuralNetworkApp: React.FC = () => {
  const [layers, setLayers] = useState<number[]>([]);
  const [inputValues, setInputValues] = useState<number[]>([]);
  const [weights, setWeights] = useState<NetworkEdge[]>([]);
  const [isNetworkGenerated, setIsNetworkGenerated] = useState(false);

  const generateRandomWeights = useCallback((networkLayers: number[]) => {
    const newWeights: NetworkEdge[] = [];
    
    for (let layerIndex = 0; layerIndex < networkLayers.length - 1; layerIndex++) {
      const currentLayerSize = networkLayers[layerIndex];
      const nextLayerSize = networkLayers[layerIndex + 1];
      
      for (let sourceIndex = 0; sourceIndex < currentLayerSize; sourceIndex++) {
        for (let targetIndex = 0; targetIndex < nextLayerSize; targetIndex++) {
          const sourceId = `Layer${layerIndex + 1}_${sourceIndex + 1}`;
          const targetId = `Layer${layerIndex + 2}_${targetIndex + 1}`;
          const edgeId = `${sourceId}_${targetId}`;
          
          newWeights.push({
            id: edgeId,
            source: sourceId,
            target: targetId,
            weight: Math.random() * 2 - 1 // Random weight between -1 and 1
          });
        }
      }
    }
    
    return newWeights;
  }, []);

  const handleGenerateNetwork = useCallback((networkLayers: number[]) => {
    setLayers(networkLayers);
    setInputValues(new Array(networkLayers[0]).fill(0.5));
    setWeights(generateRandomWeights(networkLayers));
    setIsNetworkGenerated(true);
  }, [generateRandomWeights]);

  const handleInputChange = useCallback((index: number, value: number) => {
    const clampedValue = Math.max(0, Math.min(1, value));
    setInputValues(prev => {
      const newValues = [...prev];
      newValues[index] = clampedValue;
      return newValues;
    });
  }, []);

  const handleWeightChange = useCallback((edgeId: string, newWeight: number) => {
    setWeights(prev => 
      prev.map(weight => 
        weight.id === edgeId ? { ...weight, weight: newWeight } : weight
      )
    );
  }, []);

  const handleRandomizeWeights = useCallback(() => {
    if (layers.length > 0) {
      setWeights(generateRandomWeights(layers));
    }
  }, [layers, generateRandomWeights]);

  const handleReset = useCallback(() => {
    setLayers([]);
    setInputValues([]);
    setWeights([]);
    setIsNetworkGenerated(false);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Neural Cities</h1>
          <p className="text-muted-foreground">
            Visualize neural networks as cities connected by roads. Watch activations flow through your network!
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-4 overflow-y-auto">
            <NetworkArchitecture
              onGenerateNetwork={handleGenerateNetwork}
              isNetworkGenerated={isNetworkGenerated}
            />
            
            <InputControls
              inputCount={layers[0] || 0}
              inputValues={inputValues}
              onInputChange={handleInputChange}
            />

            {isNetworkGenerated && (
              <div className="space-y-2">
                <Button
                  onClick={handleRandomizeWeights}
                  variant="outline"
                  className="w-full"
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Randomize Weights
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Network
                </Button>
              </div>
            )}

            <HelpSection />
          </div>

          {/* Visualization Area */}
          <div className="lg:col-span-3">
            {isNetworkGenerated ? (
              <NeuralNetwork
                layers={layers}
                inputValues={inputValues}
                onWeightChange={handleWeightChange}
                weights={weights}
              />
            ) : (
              <div className="w-full h-full min-h-[500px] border rounded-lg bg-muted/30 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Welcome to Neural Cities!</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first neural network to start exploring.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Define your network architecture in the control panel and click "Generate Network".
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetworkApp;
