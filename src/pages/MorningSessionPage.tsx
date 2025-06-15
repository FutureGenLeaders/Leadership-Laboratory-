
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BreathingExercise from "@/components/BreathingExercise";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import { 
  Sun, 
  Target, 
  Zap, 
  Crown,
  Check,
  ChevronRight,
  Brain,
  Activity,
  Heart,
  ArrowLeft
} from "lucide-react";

const MorningSessionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const level = location.state?.level || 1;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [reflections, setReflections] = useState<string[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const getLevelContent = () => {
    switch (level) {
      case 1:
        return {
          title: "Strategic Leadership Activation",
          description: "Foundation protocols for regulated leadership presence",
          affirmations: [
            "Today I operate from universal principles that govern peak performance",
            "My leadership emerges from patterns recognized by high-achieving cultures throughout history", 
            "I maintain the clarity that exceptional leaders across civilizations discovered",
            "I execute decisions from timeless wisdom that creates sustainable success"
          ],
          reflectionPrompts: [
            {
              title: "Strategic Decision Clarity",
              prompt: "What decision requires the highest level of conscious leadership today? Consider the broader impact and the leadership presence needed.",
              insight: "Strategic leaders pause before major decisions to access deeper wisdom patterns."
            },
            {
              title: "Universal Leadership Principles", 
              prompt: "How will you embody the principles that exceptional leaders throughout history have recognized? What timeless wisdom guides you?",
              insight: "The most effective leaders tap into principles that transcend cultural and temporal boundaries."
            },
            {
              title: "Pressure Response Protocol",
              prompt: "What level of presence are you committed to maintaining under pressure today? Define your non-negotiable standards.",
              insight: "Regulated nervous systems maintain decision quality even during crisis moments."
            }
          ],
          icon: Target,
          color: "from-blue-500 to-blue-600",
          universalInsight: "Leaders operating from universal principles show 67% better decision accuracy under pressure"
        };
      case 2:
        return {
          title: "Advanced Leadership Consciousness",
          description: "Enhanced protocols for expanded awareness and presence",
          affirmations: [
            "I activate timeless patterns that create extraordinary leadership presence",
            "My authority emerges from principles recognized across all high-performing cultures",
            "I lead from consciousness that peak performers throughout history discovered",
            "I embody universal laws that govern sustainable excellence"
          ],
          reflectionPrompts: [
            {
              title: "Consciousness Under Pressure",
              prompt: "Where might your consciousness be challenged to maintain its highest expression today? Identify potential trigger points and your response strategy.",
              insight: "Advanced leaders anticipate consciousness challenges and prepare regulated responses."
            },
            {
              title: "Universal Principle Application",
              prompt: "What universal principles will guide your most challenging leadership moments today? How will you apply timeless wisdom to current situations?",
              insight: "Universal principles provide stable guidance when external circumstances become chaotic."
            },
            {
              title: "Pressure Transformation Protocol",
              prompt: "How can you transform today's pressure into expanded consciousness? Define specific practices for converting stress into growth.",
              insight: "Mastery-level leaders use pressure as fuel for consciousness expansion rather than depletion."
            }
          ],
          icon: Zap,
          color: "from-yellow-500 to-yellow-600",
          universalInsight: "Leaders operating from expanded consciousness show 45% less stress response during crisis"
        };
      case 3:
        return {
          title: "Mastery-Level Consciousness Integration",
          description: "Advanced protocols for peak consciousness expression",
          affirmations: [
            "I activate the highest expression of leadership consciousness recognized across all wisdom traditions",
            "My presence aligns with universal laws while serving organizational excellence",
            "I lead from consciousness that serves both peak performance and human flourishing",
            "My leadership channels timeless principles that create lasting positive impact"
          ],
          reflectionPrompts: [
            {
              title: "Highest Consciousness Expression",
              prompt: "What is the highest expression of consciousness your leadership can embody today? Consider how you can operate from your most expanded awareness.",
              insight: "Mastery consciousness integrates peak performance with service to the greater good."
            },
            {
              title: "Dual Excellence Service",
              prompt: "How can you serve both peak performance and universal good simultaneously? Define how your leadership creates value at multiple levels.",
              insight: "Advanced leaders create solutions that optimize individual and collective outcomes."
            },
            {
              title: "Courageous Consciousness Leadership",
              prompt: "Where is expanded consciousness calling you to lead with courage today? Identify areas requiring breakthrough thinking.",
              insight: "Consciousness-driven courage creates breakthrough solutions that serve humanity's evolution."
            }
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
  
  // Steps: 0=breathing, 1=affirmations, 2-4=reflections, 5=completion
  const totalSteps = 5;
  const progress = ((completedSteps.length + 1) / totalSteps) * 100;

  const handleStepComplete = (data?: string) => {
    setCompletedSteps(prev => [...prev, currentStep]);
    
    if (typeof data === 'string') {
      const newReflections = [...reflections];
      newReflections[currentStep - 2] = data; // Adjust for breathing and affirmations steps
      setReflections(newReflections);
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Session complete
      handleSessionComplete();
    }
  };

  const handleSessionComplete = () => {
    // Store completion data
    const sessionData = {
      level,
      completedAt: new Date().toISOString(),
      reflections,
      duration: 'morning'
    };
    
    localStorage.setItem('lastMorningSession', JSON.stringify(sessionData));
    navigate('/', { 
      state: { 
        message: 'Morning activation complete! Your nervous system is optimized for peak performance.',
        type: 'success'
      }
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <BreathingExercise onComplete={() => handleStepComplete()} />;
      
      case 1:
        return (
          <Card className="border" style={{ 
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))',
            borderColor: 'rgba(224, 184, 72, 0.3)' 
          }}>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: '#E0B848' }}>
                Leadership Consciousness Activation
              </h3>
              <div className="space-y-4 mb-6">
                {content.affirmations.map((affirmation, index) => (
                  <div key={index} className="flex items-start p-4 rounded-lg border" style={{ 
                    backgroundColor: 'rgba(224, 184, 72, 0.1)', 
                    borderColor: 'rgba(224, 184, 72, 0.2)' 
                  }}>
                    <Check className="w-5 h-5 mr-3 mt-1 text-green-400 flex-shrink-0" />
                    <span className="text-lg" style={{ color: '#C9D5DD' }}>{affirmation}</span>
                  </div>
                ))}
              </div>
              
              <div className="mb-6 p-4 rounded-lg border" style={{ 
                backgroundColor: 'rgba(139, 92, 246, 0.1)', 
                borderColor: 'rgba(139, 92, 246, 0.3)' 
              }}>
                <div className="flex items-center mb-2">
                  <Brain className="w-4 h-4 mr-2" style={{ color: '#8B5CF6' }} />
                  <p className="text-sm font-semibold" style={{ color: '#8B5CF6' }}>Universal Principle:</p>
                </div>
                <p className="text-sm" style={{ color: '#C9D5DD' }}>{content.universalInsight}</p>
              </div>
              
              <Button 
                onClick={() => handleStepComplete()}
                className="w-full text-black font-semibold text-lg py-4"
                style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
              >
                <Activity className="w-5 h-5 mr-2" />
                Continue to Reflection Protocols
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        );

      case 2:
      case 3:
      case 4:
        const reflectionIndex = currentStep - 2;
        const reflection = content.reflectionPrompts[reflectionIndex];
        return (
          <ReflectionPrompt
            title={reflection.title}
            prompt={reflection.prompt}
            insight={reflection.insight}
            onComplete={handleStepComplete}
            icon={[Target, Brain, Heart][reflectionIndex]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
            style={{ color: '#C9D5DD' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
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
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span style={{ color: '#C9D5DD' }}>Session Progress</span>
                  <span style={{ color: '#E0B848' }}>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <CardTitle className="text-2xl" style={{ color: '#E0B848' }}>
                {content.title}
              </CardTitle>
              <CardDescription className="text-lg" style={{ color: '#C9D5DD' }}>
                {content.description} • Level {level} Protocol
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Current Step */}
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default MorningSessionPage;
