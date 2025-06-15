
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BreathingExercise from "@/components/BreathingExercise";
import { 
  Flame, 
  ArrowLeft,
  AlertTriangle,
  Heart,
  Shield
} from "lucide-react";

const EmergencyPage = () => {
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = () => {
    setIsComplete(true);
    setTimeout(() => {
      navigate('/', { 
        state: { 
          message: 'Emergency regulation complete! Your nervous system is stabilized.',
          type: 'success'
        }
      });
    }, 2000);
  };

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
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
          borderColor: 'rgba(173, 30, 45, 0.3)' 
        }}>
          <CardHeader className="text-center">
            <Badge className="mx-auto w-fit mb-4" style={{ 
              backgroundColor: 'rgba(173, 30, 45, 0.2)', 
              color: '#AD1E2D', 
              borderColor: 'rgba(173, 30, 45, 0.3)' 
            }}>
              <AlertTriangle className="w-4 h-4 mr-2" />
              Emergency Protocol Active
            </Badge>
            <CardTitle className="text-3xl flex items-center justify-center" style={{ color: '#AD1E2D' }}>
              <Flame className="w-8 h-8 mr-3" />
              Emergency Neural Regulation
            </CardTitle>
            <CardDescription className="text-lg" style={{ color: '#C9D5DD' }}>
              Rapid nervous system stabilization for high-stress moments
            </CardDescription>
          </CardHeader>
        </Card>

        {!isComplete ? (
          <BreathingExercise onComplete={handleComplete} />
        ) : (
          <Card className="border text-center" style={{ 
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(16, 185, 129, 0.1))',
            borderColor: 'rgba(16, 185, 129, 0.3)' 
          }}>
            <CardContent className="p-8">
              <Shield className="w-16 h-16 mx-auto mb-4" style={{ color: '#10B981' }} />
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#10B981' }}>
                Emergency Regulation Complete
              </h3>
              <p className="text-lg" style={{ color: '#C9D5DD' }}>
                Your nervous system is now stabilized and ready for peak performance.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EmergencyPage;
