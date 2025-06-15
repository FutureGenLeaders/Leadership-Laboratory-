
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Brain,
  ChevronRight,
  Lightbulb,
  Target,
  Clock
} from "lucide-react";

interface ReflectionPromptProps {
  prompt: string;
  insight: string;
  onComplete: (reflection: string) => void;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const ReflectionPrompt = ({ prompt, insight, onComplete, title, icon: Icon = Brain }: ReflectionPromptProps) => {
  const [reflection, setReflection] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useState(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  });

  const handleStart = () => {
    setIsActive(true);
  };

  const handleComplete = () => {
    if (reflection.trim().length > 20) {
      onComplete(reflection);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getQualityScore = () => {
    const length = reflection.length;
    if (length < 50) return { score: 'Developing', color: '#EAB308' };
    if (length < 150) return { score: 'Good', color: '#06B6D4' };
    if (length < 300) return { score: 'Excellent', color: '#10B981' };
    return { score: 'Exceptional', color: '#8B5CF6' };
  };

  const quality = getQualityScore();

  return (
    <Card className="border" style={{ 
      background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(139, 92, 246, 0.1))',
      borderColor: 'rgba(139, 92, 246, 0.3)' 
    }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center" style={{ color: '#8B5CF6' }}>
            <Icon className="w-5 h-5 mr-2" />
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <Badge style={{ 
              backgroundColor: `${quality.color}20`, 
              color: quality.color, 
              borderColor: `${quality.color}40` 
            }}>
              {quality.score}
            </Badge>
            {isActive && (
              <Badge style={{ 
                backgroundColor: 'rgba(139, 92, 246, 0.2)', 
                color: '#8B5CF6', 
                borderColor: 'rgba(139, 92, 246, 0.3)' 
              }}>
                <Clock className="w-3 h-3 mr-1" />
                {formatTime(timeSpent)}
              </Badge>
            )}
          </div>
        </div>

        <div className="mb-4 p-4 rounded-lg border" style={{ 
          backgroundColor: 'rgba(139, 92, 246, 0.1)', 
          borderColor: 'rgba(139, 92, 246, 0.2)' 
        }}>
          <div className="flex items-start">
            <Target className="w-5 h-5 mr-3 mt-0.5" style={{ color: '#8B5CF6' }} />
            <p className="text-lg leading-relaxed" style={{ color: '#C9D5DD' }}>
              {prompt}
            </p>
          </div>
        </div>

        {!isActive ? (
          <Button 
            onClick={handleStart}
            className="w-full mb-4 text-black font-semibold"
            style={{ background: 'linear-gradient(to right, #8B5CF6, #7C3AED)' }}
          >
            <Brain className="w-4 h-4 mr-2" />
            Begin Deep Reflection
          </Button>
        ) : (
          <>
            <Textarea
              placeholder="Begin writing your conscious reflection..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="min-h-[150px] mb-4 text-base"
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                borderColor: 'rgba(139, 92, 246, 0.3)',
                color: '#C9D5DD'
              }}
              autoFocus
            />

            <div className="mb-4 p-3 rounded border" style={{ 
              backgroundColor: 'rgba(224, 184, 72, 0.1)', 
              borderColor: 'rgba(224, 184, 72, 0.2)' 
            }}>
              <div className="flex items-center mb-2">
                <Lightbulb className="w-4 h-4 mr-2" style={{ color: '#E0B848' }} />
                <span className="text-sm font-medium" style={{ color: '#E0B848' }}>
                  Leadership Insight:
                </span>
              </div>
              <p className="text-sm" style={{ color: '#C9D5DD' }}>
                {insight}
              </p>
            </div>

            <Button 
              onClick={handleComplete}
              disabled={reflection.trim().length < 20}
              className="w-full text-black font-semibold"
              style={{ 
                background: reflection.trim().length >= 20 
                  ? 'linear-gradient(to right, #10B981, #059669)' 
                  : 'rgba(107, 114, 128, 0.5)'
              }}
            >
              Complete Reflection
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>

            {reflection.trim().length < 20 && (
              <p className="text-xs mt-2 text-center" style={{ color: '#BDBBBB' }}>
                Continue writing for deeper consciousness integration...
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ReflectionPrompt;
