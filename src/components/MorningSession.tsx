
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Sun, 
  Target, 
  Zap, 
  Crown,
  Check,
  ChevronRight,
  Brain,
  Activity,
  Heart
} from "lucide-react";

interface MorningSessionProps {
  level: number;
  onComplete: () => void;
}

const MorningSession = ({ level, onComplete }: MorningSessionProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [reflections, setReflections] = useState<string[]>([]);

  const getLevelContent = () => {
    switch (level) {
      case 1:
        return {
          title: "Nervous System Strategic Activation",
          affirmations: [
            "Today my nervous system supports uncompromising decision quality",
            "My regulated state serves optimal leadership performance", 
            "I maintain cognitive clarity under organizational pressure",
            "I execute strategic priorities from a coherent nervous system"
          ],
          questions: [
            "What's the most important decision requiring peak cognitive function today?",
            "How will I maintain nervous system regulation when pressure builds?",
            "What level of neural coherence am I committed to sustaining?"
          ],
          icon: Target,
          color: "from-blue-500 to-blue-600",
          neuroscienceInsight: "Coherent nervous systems show 67% better decision accuracy under pressure"
        };
      case 2:
        return {
          title: "Advanced Neural Leadership Optimization",
          affirmations: [
            "I activate peak executive presence through nervous system mastery",
            "My regulated state aligns with authentic organizational leadership",
            "My cognitive coherence serves sustainable high performance",
            "I lead from nervous system wisdom, not reactive patterns"
          ],
          refusals: [
            "I refuse dysregulated decision-making patterns",
            "I refuse ego-driven neural reactions", 
            "I refuse stress-based thinking that damages long-term cognitive function"
          ],
          commitment: "Today I execute strategic will through nervous system precision, disciplined regulation, and optimal cognitive timing",
          questions: [
            "Where might my nervous system be challenged to maintain regulation today?",
            "What neural coherence principles will guide my toughest leadership moments?",
            "How can I transform today's pressure into nervous system strength?"
          ],
          icon: Zap,
          color: "from-yellow-500 to-yellow-600",
          neuroscienceInsight: "Regulated leaders show 45% less cortisol during crisis situations"
        };
      case 3:
        return {
          title: "Peak Performance Consciousness Integration",
          affirmations: [
            "I activate optimal nervous system mastery for transcendent leadership",
            "My neural coherence aligns with universal principles and organizational excellence",
            "My regulated state serves cosmic order through business mastery",
            "My leadership channels optimal brain function through strategic precision"
          ],
          refusals: [
            "I REFUSE unconscious nervous system patterns that limit performance",
            "I REFUSE fear-based neural reactions that block innovation",
            "I REFUSE toxic stress patterns that damage optimal cognitive function"
          ],
          commitment: "Today I execute perfect nervous system coherence through business mastery, sacred focus, divine timing, and transcendent clarity",
          questions: [
            "What higher nervous system coherence guides my leadership today?",
            "How can I serve both peak performance and universal principles simultaneously?",
            "Where is optimal consciousness calling me to lead courageously?"
          ],
          icon: Crown,
          color: "from-red-500 to-red-600",
          neuroscienceInsight: "Peak coherence states increase creative problem-solving by 23x"
        };
      default:
        return getLevelContent();
    }
  };

  const content = getLevelContent();
  const IconComponent = content.icon;
  const totalSteps = content.questions.length + (content.refusals ? 2 : 1);
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleReflectionChange = (value: string) => {
    const newReflections = [...reflections];
    newReflections[currentStep] = value;
    setReflections(newReflections);
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const renderCurrentStep = () => {
    if (currentStep === 0) {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#E0B848' }}>
            Neural Coherence Activation
          </h3>
          <div className="space-y-3">
            {content.affirmations.map((affirmation, index) => (
              <div key={index} className="flex items-start p-3 rounded-lg border" style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                borderColor: 'rgba(173, 30, 45, 0.2)' 
              }}>
                <Check className="w-5 h-5 mr-3 mt-0.5 text-green-400" />
                <span style={{ color: '#C9D5DD' }}>{affirmation}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded-lg border" style={{ 
            backgroundColor: 'rgba(224, 184, 72, 0.1)', 
            borderColor: 'rgba(224, 184, 72, 0.3)' 
          }}>
            <div className="flex items-center mb-2">
              <Brain className="w-4 h-4 mr-2" style={{ color: '#E0B848' }} />
              <p className="text-sm font-semibold" style={{ color: '#E0B848' }}>Neuroscience Insight:</p>
            </div>
            <p className="text-sm" style={{ color: '#C9D5DD' }}>{content.neuroscienceInsight}</p>
          </div>
        </div>
      );
    }

    if (content.refusals && currentStep === 1) {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#E0B848' }}>
            Neural Pattern Optimization
          </h3>
          <div className="space-y-3">
            {content.refusals.map((refusal, index) => (
              <div key={index} className="flex items-start p-3 rounded-lg border" style={{ 
                backgroundColor: 'rgba(173, 30, 45, 0.1)', 
                borderColor: 'rgba(173, 30, 45, 0.3)' 
              }}>
                <span className="text-red-400 font-bold mr-3">✗</span>
                <span style={{ color: '#C9D5DD' }}>{refusal}</span>
              </div>
            ))}
          </div>
          {content.commitment && (
            <div className="mt-6 p-4 rounded-lg border" style={{ 
              backgroundColor: 'rgba(224, 184, 72, 0.1)', 
              borderColor: 'rgba(224, 184, 72, 0.3)' 
            }}>
              <div className="flex items-center mb-2">
                <Heart className="w-4 h-4 mr-2" style={{ color: '#E0B848' }} />
                <p className="text-sm font-semibold" style={{ color: '#E0B848' }}>Peak Performance Commitment:</p>
              </div>
              <p className="text-sm" style={{ color: '#C9D5DD' }}>{content.commitment}</p>
            </div>
          )}
        </div>
      );
    }

    const questionIndex = content.refusals ? currentStep - 2 : currentStep - 1;
    const question = content.questions[questionIndex];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#E0B848' }}>
          Cognitive Optimization Protocol {questionIndex + 1} of {content.questions.length}
        </h3>
        <p className="text-lg mb-4" style={{ color: '#C9D5DD' }}>{question}</p>
        <Textarea
          placeholder="Your neural coherence reflection..."
          value={reflections[currentStep] || ''}
          onChange={(e) => handleReflectionChange(e.target.value)}
          className="min-h-[100px]"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.2)', 
            borderColor: 'rgba(173, 30, 45, 0.3)',
            color: '#C9D5DD'
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="border" style={{ 
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
          borderColor: 'rgba(173, 30, 45, 0.3)' 
        }}>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge className="flex items-center" style={{ 
                backgroundColor: 'rgba(224, 184, 72, 0.2)', 
                color: '#E0B848', 
                borderColor: 'rgba(224, 184, 72, 0.3)' 
              }}>
                <Sun className="w-4 h-4 mr-2" />
                Morning Neural Activation
              </Badge>
              <div className={`p-3 rounded-full bg-gradient-to-r ${content.color}`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
            </div>
            <Progress value={progress} className="mb-4" />
            <CardTitle className="text-2xl" style={{ color: '#E0B848' }}>
              {content.title}
            </CardTitle>
            <CardDescription className="text-lg" style={{ color: '#C9D5DD' }}>
              3-5 minute neuroscience-based peak performance protocol
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderCurrentStep()}
            
            <div className="mt-6 pt-4 border-t" style={{ borderColor: 'rgba(173, 30, 45, 0.2)' }}>
              <Button 
                onClick={handleNext}
                className="w-full font-semibold text-lg py-6 text-black"
                style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
              >
                {currentStep < totalSteps - 1 ? (
                  <>
                    <Activity className="w-5 h-5 mr-2" />
                    Continue Neural Training
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Complete Activation
                  </>
                )}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MorningSession;
