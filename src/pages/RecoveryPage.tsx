
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  ArrowLeft,
  Battery,
  Zap,
  CheckCircle,
  Clock
} from "lucide-react";

const RecoveryPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const recoverySteps = [
    {
      title: "Nervous System Scan",
      description: "Assess current energy and stress levels",
      duration: 30,
      action: "Complete Assessment"
    },
    {
      title: "Parasympathetic Activation",
      description: "Engage rest-and-digest response",
      duration: 60,
      action: "Begin Recovery Protocol"
    },
    {
      title: "Energy Restoration",
      description: "Rebuild cognitive and emotional reserves",
      duration: 90,
      action: "Restore Energy Systems"
    }
  ];

  const [stepTimer, setStepTimer] = useState(0);
  const [isStepActive, setIsStepActive] = useState(false);

  const startStep = () => {
    setIsStepActive(true);
    const interval = setInterval(() => {
      setStepTimer(prev => {
        if (prev >= recoverySteps[currentStep].duration) {
          clearInterval(interval);
          setIsStepActive(false);
          handleStepComplete();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStepComplete = () => {
    if (currentStep < recoverySteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setStepTimer(0);
    } else {
      setIsComplete(true);
      setTimeout(() => {
        navigate('/', { 
          state: { 
            message: 'Nervous system recovery complete! Energy and resilience restored.',
            type: 'success'
          }
        });
      }, 2000);
    }
  };

  const progress = ((currentStep + (isStepActive ? stepTimer / recoverySteps[currentStep].duration : 0)) / recoverySteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="container mx-auto max-w-3xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4"
          style={{ color: '#C9D5DD' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="mb-6 border" style={{ 
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(201, 213, 221, 0.1))',
          borderColor: 'rgba(201, 213, 221, 0.3)' 
        }}>
          <CardHeader className="text-center">
            <Badge className="mx-auto w-fit mb-4" style={{ 
              backgroundColor: 'rgba(201, 213, 221, 0.2)', 
              color: '#C9D5DD', 
              borderColor: 'rgba(201, 213, 221, 0.3)' 
            }}>
              <Battery className="w-4 h-4 mr-2" />
              Recovery Protocol
            </Badge>
            <CardTitle className="text-3xl flex items-center justify-center" style={{ color: '#C9D5DD' }}>
              <Brain className="w-8 h-8 mr-3" />
              Nervous System Recovery
            </CardTitle>
            <CardDescription className="text-lg" style={{ color: '#BDBBBB' }}>
              Systematic restoration of energy and cognitive capacity
            </CardDescription>
          </CardHeader>
        </Card>

        {!isComplete ? (
          <Card className="border" style={{ 
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(201, 213, 221, 0.1))',
            borderColor: 'rgba(201, 213, 221, 0.3)' 
          }}>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span style={{ color: '#C9D5DD' }}>Recovery Progress</span>
                  <span style={{ color: '#C9D5DD' }}>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#C9D5DD' }}>
                  {recoverySteps[currentStep].title}
                </h3>
                <p className="text-lg mb-4" style={{ color: '#BDBBBB' }}>
                  {recoverySteps[currentStep].description}
                </p>

                {isStepActive ? (
                  <div className="mb-6">
                    <div className="text-4xl font-bold mb-2" style={{ color: '#C9D5DD' }}>
                      {recoverySteps[currentStep].duration - stepTimer}s
                    </div>
                    <div className="w-32 h-32 mx-auto border-4 rounded-full flex items-center justify-center animate-pulse"
                         style={{ borderColor: '#C9D5DD' }}>
                      <Zap className="w-12 h-12" style={{ color: '#C9D5DD' }} />
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <Clock className="w-16 h-16 mx-auto mb-4" style={{ color: '#C9D5DD' }} />
                    <p className="text-sm" style={{ color: '#BDBBBB' }}>
                      Duration: {recoverySteps[currentStep].duration} seconds
                    </p>
                  </div>
                )}
              </div>

              {!isStepActive && (
                <Button 
                  onClick={startStep}
                  className="w-full text-black font-semibold text-lg py-4"
                  style={{ background: 'linear-gradient(to right, #C9D5DD, #A0AEB8)' }}
                >
                  <Battery className="w-5 h-5 mr-2" />
                  {recoverySteps[currentStep].action}
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border text-center" style={{ 
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(16, 185, 129, 0.1))',
            borderColor: 'rgba(16, 185, 129, 0.3)' 
          }}>
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#10B981' }} />
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#10B981' }}>
                Recovery Complete
              </h3>
              <p className="text-lg" style={{ color: '#C9D5DD' }}>
                Your nervous system is restored and ready for peak performance.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RecoveryPage;
