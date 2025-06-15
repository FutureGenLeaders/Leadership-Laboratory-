
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import { 
  Moon, 
  Brain, 
  Heart,
  Star,
  ArrowLeft,
  Check,
  ChevronRight
} from "lucide-react";

const EveningSessionPage = () => {
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
          title: "Leadership Integration Protocol",
          description: "Daily reflection and consciousness integration",
          gratitudes: [
            "I am grateful for the leadership opportunities that expanded my consciousness today",
            "I appreciate the challenges that strengthened my resilience and wisdom",
            "I honor the universal principles that guided my decisions and actions"
          ],
          reflectionPrompts: [
            {
              title: "Leadership Growth Assessment",
              prompt: "What did you learn about your leadership capacity today? How did you grow beyond your previous limitations?",
              insight: "Daily growth assessment creates exponential development over time through conscious reflection."
            },
            {
              title: "Tomorrow's Leadership Vision",
              prompt: "How will you apply today's insights to tomorrow's leadership challenges? What will you do differently?",
              insight: "Integration happens when insights become intentional actions in future leadership moments."
            }
          ],
          icon: Moon,
          color: "from-purple-500 to-blue-500",
          universalInsight: "Leaders who practice evening reflection show 73% faster skill development"
        };
      case 2:
        return {
          title: "Advanced Consciousness Integration",
          description: "Deep integration and consciousness expansion",
          gratitudes: [
            "I am grateful for expanding consciousness that serves both performance and purpose",
            "I appreciate the universal wisdom that flowed through my leadership today",
            "I honor the growth that transforms challenges into consciousness expansion"
          ],
          reflectionPrompts: [
            {
              title: "Consciousness Expansion Review",
              prompt: "How did your consciousness expand today? What new levels of awareness emerged through your leadership?",
              insight: "Consciousness expansion accelerates when we consciously recognize and integrate new awareness levels."
            },
            {
              title: "Universal Principle Integration",
              prompt: "Which universal principles guided your most important decisions today? How will you deepen this integration?",
              insight: "Universal principles become second nature through daily recognition and conscious application."
            }
          ],
          icon: Brain,
          color: "from-blue-500 to-purple-500",
          universalInsight: "Advanced practitioners integrate consciousness lessons 45% more effectively through evening protocols"
        };
      case 3:
        return {
          title: "Mastery-Level Consciousness Synthesis",
          description: "Complete integration and mastery consolidation",
          gratitudes: [
            "I am grateful for consciousness that serves the highest good while achieving peak performance",
            "I appreciate the mastery that transforms every challenge into expanded capacity",
            "I honor the universal wisdom that flows through me to benefit all"
          ],
          reflectionPrompts: [
            {
              title: "Mastery Integration Assessment",
              prompt: "How did your mastery-level consciousness manifest today? What evidence shows your evolution beyond previous limitations?",
              insight: "Mastery consciousness compounds through daily recognition and integration of expanded capacity."
            },
            {
              title: "Universal Service Integration",
              prompt: "How did your leadership serve both peak performance and universal good today? How will you expand this service?",
              insight: "True mastery naturally serves individual excellence and collective evolution simultaneously."
            }
          ],
          icon: Star,
          color: "from-purple-500 to-pink-500",
          universalInsight: "Mastery practitioners consolidate breakthrough insights 89% more effectively through evening synthesis"
        };
      default:
        return getLevelContent();
    }
  };

  const content = getLevelContent();
  const IconComponent = content.icon;
  
  // Steps: 0=gratitude, 1-2=reflections, 3=completion
  const totalSteps = 3;
  const progress = ((completedSteps.length + 1) / totalSteps) * 100;

  const handleStepComplete = (data?: string) => {
    setCompletedSteps(prev => [...prev, currentStep]);
    
    if (typeof data === 'string') {
      const newReflections = [...reflections];
      newReflections[currentStep - 1] = data; // Adjust for gratitude step
      setReflections(newReflections);
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSessionComplete();
    }
  };

  const handleSessionComplete = () => {
    const sessionData = {
      level,
      completedAt: new Date().toISOString(),
      reflections,
      duration: 'evening'
    };
    
    localStorage.setItem('lastEveningSession', JSON.stringify(sessionData));
    navigate('/', { 
      state: { 
        message: 'Evening integration complete! Consciousness and insights fully integrated.',
        type: 'success'
      }
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="border" style={{ 
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(139, 92, 246, 0.1))',
            borderColor: 'rgba(139, 92, 246, 0.3)' 
          }}>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: '#8B5CF6' }}>
                Consciousness Gratitude Protocol
              </h3>
              <div className="space-y-4 mb-6">
                {content.gratitudes.map((gratitude, index) => (
                  <div key={index} className="flex items-start p-4 rounded-lg border" style={{ 
                    backgroundColor: 'rgba(139, 92, 246, 0.1)', 
                    borderColor: 'rgba(139, 92, 246, 0.2)' 
                  }}>
                    <Heart className="w-5 h-5 mr-3 mt-1 text-pink-400 flex-shrink-0" />
                    <span className="text-lg" style={{ color: '#C9D5DD' }}>{gratitude}</span>
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
                style={{ background: 'linear-gradient(to right, #8B5CF6, #7C3AED)' }}
              >
                <Heart className="w-5 h-5 mr-2" />
                Continue to Integration Reflection
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        );

      case 1:
      case 2:
        const reflectionIndex = currentStep - 1;
        const reflection = content.reflectionPrompts[reflectionIndex];
        return (
          <ReflectionPrompt
            title={reflection.title}
            prompt={reflection.prompt}
            insight={reflection.insight}
            onComplete={handleStepComplete}
            icon={[Brain, Star][reflectionIndex]}
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
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(139, 92, 246, 0.1))',
            borderColor: 'rgba(139, 92, 246, 0.3)' 
          }}>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="flex items-center" style={{ 
                  backgroundColor: 'rgba(139, 92, 246, 0.2)', 
                  color: '#8B5CF6', 
                  borderColor: 'rgba(139, 92, 246, 0.3)' 
                }}>
                  <Moon className="w-4 h-4 mr-2" />
                  Evening Consciousness Integration
                </Badge>
                <div className={`p-3 rounded-full bg-gradient-to-r ${content.color}`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span style={{ color: '#C9D5DD' }}>Session Progress</span>
                  <span style={{ color: '#8B5CF6' }}>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <CardTitle className="text-2xl" style={{ color: '#8B5CF6' }}>
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

export default EveningSessionPage;
