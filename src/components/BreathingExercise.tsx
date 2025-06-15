
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  RotateCcw,
  Circle,
  Waves
} from "lucide-react";

interface BreathingExerciseProps {
  onComplete: () => void;
}

const BreathingExercise = ({ onComplete }: BreathingExerciseProps) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const [phaseTime, setPhaseTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const totalCycles = 4;
  const phaseDurations = {
    inhale: 5,
    hold: 5,
    exhale: 5
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isComplete) {
      interval = setInterval(() => {
        setPhaseTime((prev) => {
          const currentDuration = phaseDurations[phase];
          
          if (prev >= currentDuration) {
            // Move to next phase
            const nextPhase = {
              inhale: 'hold',
              hold: 'exhale', 
              exhale: 'inhale'
            }[phase] as typeof phase;

            if (phase === 'exhale') {
              setCycleCount(c => c + 1);
            }

            setPhase(nextPhase);
            return 0;
          }
          
          return prev + 0.1;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isActive, phase, isComplete]);

  useEffect(() => {
    if (cycleCount >= totalCycles) {
      setIsComplete(true);
      setIsActive(false);
    }
  }, [cycleCount]);

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe Out...';
    }
  };

  const getCircleScale = () => {
    const progress = phaseTime / phaseDurations[phase];
    if (phase === 'inhale') return 0.5 + (progress * 0.5);
    if (phase === 'exhale') return 1 - (progress * 0.5);
    return 1; // hold phase stays at full scale
  };

  const reset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCycleCount(0);
    setPhaseTime(0);
    setIsComplete(false);
  };

  const progress = (cycleCount / totalCycles) * 100;

  return (
    <Card className="border" style={{ 
      background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(6, 182, 212, 0.1))',
      borderColor: 'rgba(6, 182, 212, 0.3)' 
    }}>
      <CardContent className="p-8 text-center">
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#06B6D4' }}>
          Nervous System Regulation Protocol
        </h3>
        <p className="mb-6" style={{ color: '#C9D5DD' }}>
          5-5-5 Equal Breathing for Optimal Neural Coherence
        </p>

        <div className="mb-8 flex justify-center">
          <div 
            className="relative transition-transform duration-[400ms] ease-in-out"
            style={{ 
              transform: `scale(${getCircleScale()})`,
              width: '200px',
              height: '200px'
            }}
          >
            <Circle 
              className="w-full h-full"
              style={{ 
                color: phase === 'inhale' ? '#06B6D4' : 
                       phase === 'hold' ? '#10B981' :
                       '#8B5CF6',
                strokeWidth: 3,
                fill: 'rgba(6, 182, 212, 0.1)'
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#06B6D4' }}>
                {Math.ceil(phaseDurations[phase] - phaseTime)}
              </div>
              <div className="text-lg" style={{ color: '#C9D5DD' }}>
                {getPhaseInstruction()}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span style={{ color: '#C9D5DD' }}>Progress: {cycleCount}/{totalCycles} cycles</span>
            <span style={{ color: '#06B6D4' }}>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex gap-4 justify-center">
          {!isComplete ? (
            <>
              <Button 
                onClick={() => setIsActive(!isActive)}
                className="flex items-center text-black"
                style={{ background: 'linear-gradient(to right, #06B6D4, #0891B2)' }}
              >
                {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isActive ? 'Pause' : 'Start'}
              </Button>
              
              <Button 
                onClick={reset}
                variant="outline"
                style={{ 
                  backgroundColor: 'rgba(6, 182, 212, 0.1)', 
                  borderColor: 'rgba(6, 182, 212, 0.3)',
                  color: '#06B6D4'
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
              <Waves className="w-4 h-4 mr-2" />
              Continue to Next Phase
            </Button>
          )}
        </div>

        {isComplete && (
          <div className="mt-4 p-4 rounded-lg border" style={{ 
            backgroundColor: 'rgba(16, 185, 129, 0.1)', 
            borderColor: 'rgba(16, 185, 129, 0.3)' 
          }}>
            <p className="text-sm font-medium" style={{ color: '#10B981' }}>
              Neural regulation complete! Your nervous system is now optimized for peak performance.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BreathingExercise;
