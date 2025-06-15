
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface ControlPanelProps {
    input1: number;
    setInput1: (value: number) => void;
    input2: number;
    setInput2: (value: number) => void;
    onRun: () => void;
}

const ControlPanel = ({ input1, setInput1, input2, setInput2, onRun }: ControlPanelProps) => {
    return (
        <Card className="w-full md:w-80">
            <CardHeader>
                <CardTitle>Controls</CardTitle>
                <CardDescription>Input data and run the simulation.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="input1">Input 1</Label>
                    <Input id="input1" type="number" value={input1} onChange={e => setInput1(parseFloat(e.target.value))} step="0.1" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="input2">Input 2</Label>
                    <Input id="input2" type="number" value={input2} onChange={e => setInput2(parseFloat(e.target.value))} step="0.1" />
                </div>
                <Button onClick={onRun}>
                    <Play className="mr-2 h-4 w-4" /> Run Simulation
                </Button>
            </CardContent>
        </Card>
    );
}

export default ControlPanel;
