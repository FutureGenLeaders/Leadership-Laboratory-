import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StressRegulation from "@/components/StressRegulation";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import { 
  Sun, 
  Zap, 
  Target,
  Check,
  ChevronRight,
  Brain,
  Activity,
  ArrowLeft,
  Shield
} from "lucide-react";
import CertificateModal from "@/components/CertificateModal";

const AfternoonSessionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const level = location.state?.level || 1;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [reflections, setReflections] = useState<string[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);

  const getLevelContent = () => {
    switch (level) {
      case 1:
        return {
          title: "Peak State Reset Protocol",
          description: "Stress regulation and performance optimization",
          reflectionPrompts: [
            {
              title: "Stress Pattern Recognition",
              prompt: "What stress patterns emerged in your leadership today? Identify the specific triggers and your body's response signals.",
              insight: "Recognition is the first step to regulation. Awareness creates the space for conscious response."
            },
            {
              title: "Energy Management Assessment",
              prompt: "How did you manage your energy throughout the day? What depleted you and what restored you?",
              insight: "Peak performers optimize energy allocation like a strategic resource, not an unlimited commodity."
            }
          ],
          icon: Zap,
          color: "from-yellow-500 to-orange-500",
          universalInsight: "Leaders who practice afternoon regulation show 58% better decision quality in the evening"
        };
      case 2:
        return {
          title: "Advanced Stress Mastery",
          description: "Enhanced stress transformation and resilience building",
          reflectionPrompts: [
            {
              title: "Stress Transformation Protocol",
              prompt: "How can you transform today's stress into tomorrow's strength? What specific practices will you implement?",
              insight: "Advanced leaders don't avoid stress—they alchemize it into enhanced capacity and wisdom."
            },
            {
              title: "Resilience Building Assessment",
              prompt: "What evidence do you see of your growing stress resilience? How has your capacity expanded?",
              insight: "Resilience compounds daily through conscious practice and reflection on growth patterns."
            }
          ],
          icon: Shield,
          color: "from-orange-500 to-red-500",
          universalInsight: "Advanced practitioners build 34% more stress resilience through structured afternoon protocols"
        };
      case 3:
        return {
          title: "Mastery-Level Stress Alchemy",
          description: "Complete stress transformation and peak optimization",
          reflectionPrompts: [
            {
              title: "Stress Alchemy Mastery",
              prompt: "How are you transforming stress into exponential growth and expanded consciousness? Document your alchemical process.",
              insight: "Mastery-level leaders use stress as raw material for consciousness expansion and breakthrough solutions."
            },
            {
              title: "Peak State Integration",
              prompt: "How can you integrate today's peak states into your baseline functioning? What would consistent peak performance look like?",
              insight: "True mastery makes peak states the new normal rather than temporary achievements."
            }
          ],
          icon: Activity,
          color: "from-red-500 to-purple-500",
          universalInsight: "Mastery practitioners maintain peak states 78% longer through afternoon integration protocols"
        };
      default:
        return getLevelContent();
    }
  };

  const content = getLevelContent();
  const IconComponent = content.icon;
  
  // Steps: 0=stress regulation, 1-2=reflections, 3=completion
  const totalSteps = 3;
  const progress = ((completedSteps.length + 1) / totalSteps) * 100;

  const handleStepComplete = (data?: string) => {
    setCompletedSteps(prev => [...prev, currentStep]);
    
    if (typeof data === 'string') {
      const newReflections = [...reflections];
      newReflections[currentStep - 1] = data; // Adjust for stress regulation step
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
      duration: 'afternoon'
    };
    
    localStorage.setItem('lastAfternoonSession', JSON.stringify(sessionData));
    navigate('/', { 
      state: { 
        message: 'Afternoon reset complete! Peak state restored and stress transformed.',
        type: 'success'
      }
    });
    setShowCertificate(true);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <StressRegulation onComplete={() => handleStepComplete()} />;
      
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
            icon={[Target, Brain][reflectionIndex]}
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
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(245, 158, 11, 0.1))',
            borderColor: 'rgba(245, 158, 11, 0.3)' 
          }}>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="flex items-center" style={{ 
                  backgroundColor: 'rgba(245, 158, 11, 0.2)', 
                  color: '#F59E0B', 
                  borderColor: 'rgba(245, 158, 11, 0.3)' 
                }}>
                  <Sun className="w-4 h-4 mr-2" />
                  Afternoon Peak State Reset
                </Badge>
                <div className={`p-3 rounded-full bg-gradient-to-r ${content.color}`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span style={{ color: '#C9D5DD' }}>Session Progress</span>
                  <span style={{ color: '#F59E0B' }}>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <CardTitle className="text-2xl" style={{ color: '#F59E0B' }}>
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
      {/* NEW: Certificate Modal */}
      <CertificateModal open={showCertificate} onClose={() => setShowCertificate(false)} sessionType="Afternoon" />
    </div>
  );
};

export default AfternoonSessionPage;
