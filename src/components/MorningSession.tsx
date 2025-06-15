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
          title: "Strategic Leadership Activation",
          affirmations: [
            "Today I operate from the universal principles that govern peak performance",
            "My leadership emerges from patterns recognized by high-achieving cultures throughout history", 
            "I maintain the clarity that exceptional leaders across civilizations discovered",
            "I execute decisions from the timeless wisdom that creates sustainable success"
          ],
          questions: [
            "What decision requires the highest level of conscious leadership today?",
            "How will I embody the principles that exceptional leaders throughout history have recognized?",
            "What level of presence am I committed to maintaining under pressure?"
          ],
          icon: Target,
          color: "from-blue-500 to-blue-600",
          universalInsight: "Leaders who operate from universal principles show 67% better decision accuracy under pressure"
        };
      case 2:
        return {
          title: "Advanced Leadership Consciousness",
          affirmations: [
            "I activate the timeless patterns that create extraordinary leadership presence",
            "My authority emerges from principles recognized across all high-performing cultures",
            "I lead from the consciousness that peak performers throughout history discovered",
            "I embody the universal laws that govern sustainable excellence"
          ],
          refusals: [
            "I refuse reactive patterns that limit conscious leadership",
            "I refuse ego-driven responses that block universal wisdom", 
            "I refuse stress-based thinking that disconnects me from timeless principles"
          ],
          commitment: "Today I execute leadership through universal consciousness, disciplined presence, and optimal timing that serves both performance and purpose",
          questions: [
            "Where might my consciousness be challenged to maintain its highest expression today?",
            "What universal principles will guide my most challenging leadership moments?",
            "How can I transform today's pressure into expanded consciousness?"
          ],
          icon: Zap,
          color: "from-yellow-500 to-yellow-600",
          universalInsight: "Leaders operating from expanded consciousness show 45% less stress response during crisis"
        };
      case 3:
        return {
          title: "Mastery-Level Consciousness Integration",
          affirmations: [
            "I activate the highest expression of leadership consciousness recognized across all wisdom traditions",
            "My presence aligns with universal laws while serving organizational excellence",
            "I lead from the consciousness that serves both peak performance and human flourishing",
            "My leadership channels the timeless principles that create lasting positive impact"
          ],
          refusals: [
            "I REFUSE unconscious patterns that limit my highest leadership expression",
            "I REFUSE fear-based responses that block universal wisdom from flowing through me",
            "I REFUSE operating below the consciousness level that my role demands"
          ],
          commitment: "Today I embody perfect leadership consciousness through universal principles, sacred focus, divine timing, and service to both excellence and humanity",
          questions: [
            "What is the highest expression of consciousness my leadership can embody today?",
            "How can I serve both peak performance and universal good simultaneously?",
            "Where is expanded consciousness calling me to lead with courage?"
          ],
          icon: Crown,
          color: "from-red-500 to-red-600",
          universalInsight: "Leaders operating at mastery consciousness create breakthrough solutions 23x more frequently"
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
            Consciousness Activation Protocol
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
              <p className="text-sm font-semibold" style={{ color: '#E0B848' }}>Universal Principle:</p>
            </div>
            <p className="text-sm" style={{ color: '#C9D5DD' }}>{content.universalInsight}</p>
          </div>
        </div>
      );
    }

    if (content.refusals && currentStep === 1) {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#E0B848' }}>
            Consciousness Clearing Protocol
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
                <p className="text-sm font-semibold" style={{ color: '#E0B848' }}>Leadership Commitment:</p>
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
          Consciousness Integration {questionIndex + 1} of {content.questions.length}
        </h3>
        <p className="text-lg mb-4" style={{ color: '#C9D5DD' }}>{question}</p>
        <Textarea
          placeholder="Your consciousness reflection..."
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
                Morning Consciousness Activation
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
              3-5 minute universal principle activation protocol
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
                    Continue Consciousness Training
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
