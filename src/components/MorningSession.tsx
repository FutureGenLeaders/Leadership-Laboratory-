
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
  ChevronRight
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
          title: "Strategic Focus Activation",
          affirmations: [
            "Today I lead with uncompromising standards",
            "My decisions serve long-term excellence",
            "I maintain clarity under pressure",
            "I execute strategic priorities without distraction"
          ],
          questions: [
            "What's the most important decision I'll make today?",
            "How will I maintain clarity when pressure builds?",
            "What level of excellence am I committed to?"
          ],
          icon: Target,
          color: "from-blue-500 to-blue-600"
        };
      case 2:
        return {
          title: "Advanced Leadership Alignment",
          affirmations: [
            "I activate authentic leadership presence",
            "My choices align with organizational truth",
            "My judgment serves sustainable success",
            "I lead from principles, not politics"
          ],
          refusals: [
            "I refuse reactive decision-making",
            "I refuse ego-driven choices",
            "I refuse short-term thinking that damages long-term vision"
          ],
          commitment: "Today I execute strategic will with precision through focused discipline and clear timing",
          questions: [
            "Where might I be tempted to compromise my standards today?",
            "What principles will guide my toughest decisions?",
            "How can I turn today's pressure into strategic advantage?"
          ],
          icon: Zap,
          color: "from-yellow-500 to-yellow-600"
        };
      case 3:
        return {
          title: "Mastery Mode Awakening",
          affirmations: [
            "I activate uncompromising leadership mastery",
            "My decisions align with universal truth and organizational excellence",
            "My judgment serves cosmic order through business excellence",
            "My leadership channels divine will through strategic precision"
          ],
          refusals: [
            "I REFUSE unconscious leadership patterns",
            "I REFUSE fear-based organizational choices",
            "I REFUSE toxic dynamics that block innovation"
          ],
          commitment: "Today I execute perfect will through business mastery through sacred focus, divine timing, and ruthless clarity",
          questions: [
            "What higher purpose guides my leadership today?",
            "How can I serve both profit and principle simultaneously?",
            "Where is the universe calling me to lead courageously?"
          ],
          icon: Crown,
          color: "from-red-500 to-red-600"
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
            Morning Affirmations
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
        </div>
      );
    }

    if (content.refusals && currentStep === 1) {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#E0B848' }}>
            Leadership Refusals
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
              <p className="font-semibold" style={{ color: '#E0B848' }}>{content.commitment}</p>
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
          Strategic Reflection {questionIndex + 1} of {content.questions.length}
        </h3>
        <p className="text-lg mb-4" style={{ color: '#C9D5DD' }}>{question}</p>
        <Textarea
          placeholder="Your reflection..."
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
                Morning Session
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
              3-5 minute leadership activation protocol
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
                {currentStep < totalSteps - 1 ? 'Continue' : 'Complete Session'}
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
