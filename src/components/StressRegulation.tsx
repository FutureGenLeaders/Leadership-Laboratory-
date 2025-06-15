
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Pause, 
  RotateCcw,
  Shield,
  Activity
} from "lucide-react";

interface StressRegulationProps {
  onComplete: () => void;
}

const StressRegulation = ({ onComplete }: StressRegulationProps) => {
  const [isActive, setIsActive] = useState(false);
  const [technique, setTechnique] = useState<'coherence' | 'reset' | 'integration'>('coherence');
  const [cycleCount, setCycleCount] = useState(0);
  const [phaseTime, setPhaseTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const totalCycles = 3;
  const techniques = {
    coherence: { duration: 30, instruction: 'Heart-Brain Coherence Activation' },
    reset: { duration: 20, instruction: 'Neural Pathway Reset' },
    integration: { duration: 15, instruction: 'Stress Integration Protocol' }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isComplete) {
      interval = setInterval(() => {
        setPhaseTime((prev) => {
          const currentDuration = techniques[technique].duration;
          
          if (prev >= currentDuration) {
            const nextTechnique = {
              coherence: 'reset',
              reset: 'integration',
              integration: 'coherence'
            }[technique] as typeof technique;

            if (technique === 'integration') {
              setCycleCount(c => c + 1);
            }

            setTechnique(nextTechnique);
            return 0;
          }
          
          return prev + 0.1;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isActive, technique, isComplete]);

  useEffect(() => {
    if (cycleCount >= totalCycles) {
      setIsComplete(true);
      setIsActive(false);
    }
  }, [cycleCount]);

  const getTechniqueColor = () => {
    switch (technique) {
      case 'coherence': return '#10B981';
      case 'reset': return '#F59E0B';
      case 'integration': return '#8B5CF6';
    }
  };

  const getTechniqueIcon = () => {
    switch (technique) {
      case 'coherence': return Shield;
      case 'reset': return Zap;
      case 'integration': return Activity;
    }
  };

  const getInstructions = () => {
    switch (technique) {
      case 'coherence': 
        return 'Focus on your heart center. Breathe slowly and feel gratitude expanding through your chest.';
      case 'reset':
        return 'Visualize stress leaving your nervous system. See tension dissolving with each breath.';
      case 'integration':
        return 'Integrate the regulation. Feel your system stabilizing at a higher baseline.';
    }
  };

  const reset = () => {
    setIsActive(false);
    setTechnique('coherence');
    setCycleCount(0);
    setPhaseTime(0);
    setIsComplete(false);
  };

  const progress = (cycleCount / totalCycles) * 100;
  const TechniqueIcon = getTechniqueIcon();

  return (
    <Card className="border" style={{ 
      background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(245, 158, 11, 0.1))',
      borderColor: 'rgba(245, 158, 11, 0.3)' 
    }}>
      <CardContent className="p-8 text-center">
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#F59E0B' }}>
          Peak State Reset Protocol
        </h3>
        <p className="mb-6" style={{ color: '#C9D5DD' }}>
          Rapid Stress Regulation & Neural Optimization
        </p>

        <div className="mb-8 flex justify-center">
          <div 
            className="relative transition-all duration-1000 ease-in-out flex flex-col items-center justify-center rounded-full border-4"
            style={{ 
              width: '200px',
              height: '200px',
              borderColor: getTechniqueColor(),
              backgroundColor: `${getTechniqueColor()}15`,
              transform: isActive ? 'scale(1.05)' : 'scale(1)',
              boxShadow: isActive ? `0 0 30px ${getTechniqueColor()}40` : 'none'
            }}
          >
            <TechniqueIcon 
              className="w-12 h-12 mb-3"
              style={{ color: getTechniqueColor() }}
            />
            <div className="text-2xl font-bold mb-1" style={{ color: getTechniqueColor() }}>
              {Math.ceil(techniques[technique].duration - phaseTime)}s
            </div>
            <div className="text-sm font-medium" style={{ color: '#C9D5DD' }}>
              {techniques[technique].instruction}
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-lg border" style={{ 
          backgroundColor: `${getTechniqueColor()}10`, 
          borderColor: `${getTechniqueColor()}30` 
        }}>
          <p className="text-sm" style={{ color: '#C9D5DD' }}>
            {getInstructions()}
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span style={{ color: '#C9D5DD' }}>Progress: {cycleCount}/{totalCycles} cycles</span>
            <span style={{ color: '#F59E0B' }}>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex gap-4 justify-center">
          {!isComplete ? (
            <>
              <Button 
                onClick={() => setIsActive(!isActive)}
                className="flex items-center text-black"
                style={{ background: 'linear-gradient(to right, #F59E0B, #D97706)' }}
              >
                {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                {isActive ? 'Pause' : 'Begin Reset'}
              </Button>
              
              <Button 
                onClick={reset}
                variant="outline"
                style={{ 
                  backgroundColor: 'rgba(245, 158, 11, 0.1)', 
                  borderColor: 'rgba(245, 158, 11, 0.3)',
                  color: '#F59E0B'
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </>
          ) : (
            <Button 
              onClick={onComplete}
              className="text-black font-semibold"
              style={{ background: 'linear-gradient(to right, #10B981, #059669)' }}
            >
              <Shield className="w-4 h-4 mr-2" />
              Complete Peak Reset
            </Button>
          )}
        </div>

        {isComplete && (
          <div className="mt-4 p-4 rounded-lg border" style={{ 
            backgroundColor: 'rgba(16, 185, 129, 0.1)', 
            borderColor: 'rgba(16, 185, 129, 0.3)' 
          }}>
            <p className="text-sm font-medium" style={{ color: '#10B981' }}>
              Peak state restored! Your nervous system is optimized and stress-resilient.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StressRegulation;
