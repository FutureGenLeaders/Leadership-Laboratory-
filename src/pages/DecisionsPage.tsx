
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  ArrowLeft,
  Brain,
  Target,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const DecisionsPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      question: "How clear is your thinking right now?",
      options: ["Very cloudy (1)", "Somewhat unclear (2)", "Neutral (3)", "Clear (4)", "Crystal clear (5)"]
    },
    {
      question: "How much mental energy do you have?",
      options: ["Depleted (1)", "Low (2)", "Moderate (3)", "High (4)", "Peak energy (5)"]
    },
    {
      question: "How confident are you in making important decisions?",
      options: ["Not confident (1)", "Slightly confident (2)", "Moderately confident (3)", "Very confident (4)", "Completely confident (5)"]
    },
    {
      question: "How well can you focus on complex problems?",
      options: ["Cannot focus (1)", "Poor focus (2)", "Average focus (3)", "Good focus (4)", "Laser focus (5)"]
    }
  ];

  const handleResponse = (score: number) => {
    const newResponses = [...responses, score];
    setResponses(newResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const getAverageScore = () => {
    return responses.reduce((a, b) => a + b, 0) / responses.length;
  };

  const getRecommendation = () => {
    const avg = getAverageScore();
    if (avg >= 4) return { text: "Optimal cognitive state for complex decisions", color: '#10B981', icon: CheckCircle };
    if (avg >= 3) return { text: "Good state - minor optimization recommended", color: '#F59E0B', icon: Target };
    return { text: "Cognitive load high - regulation protocol recommended", color: '#AD1E2D', icon: AlertCircle };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))',
          borderColor: 'rgba(224, 184, 72, 0.3)' 
        }}>
          <CardHeader className="text-center">
            <Badge className="mx-auto w-fit mb-4" style={{ 
              backgroundColor: 'rgba(224, 184, 72, 0.2)', 
              color: '#E0B848', 
              borderColor: 'rgba(224, 184, 72, 0.3)' 
            }}>
              <Brain className="w-4 h-4 mr-2" />
              Cognitive Assessment
            </Badge>
            <CardTitle className="text-3xl flex items-center justify-center" style={{ color: '#E0B848' }}>
              <Zap className="w-8 h-8 mr-3" />
              Cognitive Load Scanner
            </CardTitle>
            <CardDescription className="text-lg" style={{ color: '#C9D5DD' }}>
              Assess your decision-making capacity and cognitive state
            </CardDescription>
          </CardHeader>
        </Card>

        {!isComplete ? (
          <Card className="border" style={{ 
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))',
            borderColor: 'rgba(224, 184, 72, 0.3)' 
          }}>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span style={{ color: '#C9D5DD' }}>Question {currentQuestion + 1} of {questions.length}</span>
                  <span style={{ color: '#E0B848' }}>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: '#E0B848' }}>
                {questions[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleResponse(index + 1)}
                    variant="outline"
                    className="w-full text-left justify-start p-4 h-auto"
                    style={{ 
                      backgroundColor: 'rgba(224, 184, 72, 0.1)', 
                      borderColor: 'rgba(224, 184, 72, 0.3)',
                      color: '#C9D5DD'
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border" style={{ 
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))',
            borderColor: 'rgba(224, 184, 72, 0.3)' 
          }}>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                {(() => {
                  const rec = getRecommendation();
                  const IconComponent = rec.icon;
                  return (
                    <>
                      <IconComponent className="w-16 h-16 mx-auto mb-4" style={{ color: rec.color }} />
                      <h3 className="text-2xl font-bold mb-4" style={{ color: rec.color }}>
                        Cognitive Load: {getAverageScore().toFixed(1)}/5.0
                      </h3>
                      <p className="text-lg mb-6" style={{ color: '#C9D5DD' }}>
                        {rec.text}
                      </p>
                    </>
                  );
                })()}
              </div>

              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/morning-session')}
                  className="text-black font-semibold"
                  style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
                >
                  Begin Optimization Protocol
                </Button>
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline"
                  style={{ 
                    backgroundColor: 'rgba(224, 184, 72, 0.1)', 
                    borderColor: 'rgba(224, 184, 72, 0.3)',
                    color: '#E0B848'
                  }}
                >
                  Return to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DecisionsPage;
