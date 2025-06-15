
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  Brain,
  Activity,
  CheckCircle,
  TrendingUp,
  Zap,
  Shield,
  Target
} from "lucide-react";

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<any>(null);

  const questions = [
    {
      category: "Nervous System Regulation",
      question: "How quickly do you recover from stressful situations?",
      options: [
        "I stay stressed for hours or days (1)",
        "It takes me 30-60 minutes to calm down (2)", 
        "I recover within 15-30 minutes (3)",
        "I bounce back within 5-15 minutes (4)",
        "I stay regulated throughout stress (5)"
      ]
    },
    {
      category: "Decision Making Under Pressure",
      question: "How clear is your thinking during high-pressure decisions?",
      options: [
        "I become overwhelmed and can't think (1)",
        "My thinking becomes cloudy and slow (2)",
        "I can think but not at my best (3)",
        "I think clearly with some effort (4)",
        "I think most clearly under pressure (5)"
      ]
    },
    {
      category: "Team Leadership Presence",
      question: "How does your energy affect your team during conflict?",
      options: [
        "I escalate tensions without realizing (1)",
        "I struggle to stay calm, affecting others (2)",
        "I stay neutral but don't help the situation (3)",
        "I generally have a calming influence (4)",
        "My presence immediately de-escalates conflict (5)"
      ]
    },
    {
      category: "Energy Management",
      question: "How well do you maintain energy throughout demanding days?",
      options: [
        "I'm exhausted by mid-morning (1)",
        "I crash by afternoon and struggle to recover (2)",
        "I have moderate energy that fluctuates (3)",
        "I maintain steady energy most of the day (4)",
        "I have consistent high energy from morning to evening (5)"
      ]
    },
    {
      category: "Crisis Performance",
      question: "How do you perform when everything is falling apart?",
      options: [
        "I freeze or panic completely (1)",
        "I struggle but eventually respond (2)",
        "I function but not at my best (3)",
        "I rise to meet the challenge (4)",
        "I perform better in crisis than normal times (5)"
      ]
    },
    {
      category: "Cognitive Load Management",
      question: "How well do you handle multiple complex decisions simultaneously?",
      options: [
        "I become overwhelmed immediately (1)",
        "I can handle one thing at a time only (2)",
        "I manage but feel stressed (3)",
        "I handle multiple priorities well (4)",
        "I thrive on complex, multi-faceted challenges (5)"
      ]
    }
  ];

  const handleResponse = (score: number) => {
    const newResponses = [...responses, score];
    setResponses(newResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newResponses);
    }
  };

  const calculateResults = (scores: number[]) => {
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const maxScore = questions.length * 5;
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    let level = "Baseline";
    let recommendations = [];
    let color = "#AD1E2D";

    if (percentage >= 85) {
      level = "Peak Performance";
      color = "#10B981";
      recommendations = [
        "Maintain your excellence with advanced protocols",
        "Consider mentoring others in nervous system regulation",
        "Explore mastery-level training modules"
      ];
    } else if (percentage >= 70) {
      level = "Advanced Regulation";
      color = "#E0B848";
      recommendations = [
        "Focus on crisis performance optimization",
        "Develop team regulation leadership skills",
        "Practice advanced decision-making protocols"
      ];
    } else if (percentage >= 55) {
      level = "Developing Mastery";
      color = "#3B82F6";
      recommendations = [
        "Strengthen basic nervous system regulation",
        "Practice daily stress recovery protocols",
        "Build cognitive load management skills"
      ];
    } else {
      level = "Foundation Building";
      color = "#AD1E2D";
      recommendations = [
        "Start with emergency regulation protocols",
        "Focus on basic breathing and stress management",
        "Build fundamental nervous system awareness"
      ];
    }

    setResults({
      totalScore,
      percentage,
      level,
      color,
      recommendations,
      categoryScores: questions.map((q, i) => ({
        category: q.category,
        score: scores[i],
        maxScore: 5
      }))
    });
    setIsComplete(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="container mx-auto max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
          style={{ color: '#C9D5DD' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {!isComplete ? (
          <>
            {/* Progress Header */}
            <Card className="mb-8 border" style={{ 
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
                  Nervous System Assessment
                </Badge>
                <CardTitle className="text-3xl" style={{ color: '#E0B848' }}>
                  Leadership Neuroscience Evaluation
                </CardTitle>
                <CardDescription className="text-lg" style={{ color: '#C9D5DD' }}>
                  Comprehensive analysis of your nervous system regulation and peak performance capacity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ color: '#C9D5DD' }}>Question {currentQuestion + 1} of {questions.length}</span>
                    <span style={{ color: '#E0B848' }}>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card className="border" style={{ 
              background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))',
              borderColor: 'rgba(224, 184, 72, 0.3)' 
            }}>
              <CardHeader>
                <Badge className="w-fit mb-4" style={{ 
                  backgroundColor: 'rgba(224, 184, 72, 0.2)', 
                  color: '#E0B848', 
                  borderColor: 'rgba(224, 184, 72, 0.3)' 
                }}>
                  {questions[currentQuestion].category}
                </Badge>
                <CardTitle className="text-xl" style={{ color: '#E0B848' }}>
                  {questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleResponse(index + 1)}
                    variant="outline"
                    className="w-full text-left justify-start p-6 h-auto text-wrap"
                    style={{ 
                      backgroundColor: 'rgba(224, 184, 72, 0.1)', 
                      borderColor: 'rgba(224, 184, 72, 0.3)',
                      color: '#C9D5DD'
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Results Header */}
            <Card className="mb-8 border text-center" style={{ 
              background: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), ${results.color}20)`,
              borderColor: `${results.color}40` 
            }}>
              <CardContent className="p-8">
                <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: results.color }} />
                <h2 className="text-3xl font-bold mb-2" style={{ color: results.color }}>
                  Assessment Complete
                </h2>
                <p className="text-lg mb-6" style={{ color: '#C9D5DD' }}>
                  Your Nervous System Regulation Level: <span className="font-semibold">{results.level}</span>
                </p>
                <div className="text-6xl font-bold mb-4" style={{ color: results.color }}>
                  {results.percentage}%
                </div>
                <Progress value={results.percentage} className="max-w-md mx-auto" />
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="mb-8 border" style={{ 
              background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(201, 213, 221, 0.1))',
              borderColor: 'rgba(201, 213, 221, 0.3)' 
            }}>
              <CardHeader>
                <CardTitle className="flex items-center" style={{ color: '#C9D5DD' }}>
                  <TrendingUp className="w-6 h-6 mr-2" />
                  Category Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.categoryScores.map((category: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#C9D5DD' }}>{category.category}</span>
                      <span style={{ color: '#E0B848' }}>{category.score}/{category.maxScore}</span>
                    </div>
                    <Progress value={(category.score / category.maxScore) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="mb-8 border" style={{ 
              background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))',
              borderColor: 'rgba(224, 184, 72, 0.3)' 
            }}>
              <CardHeader>
                <CardTitle className="flex items-center" style={{ color: '#E0B848' }}>
                  <Target className="w-6 h-6 mr-2" />
                  Personalized Training Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: results.color }}></div>
                      <p style={{ color: '#C9D5DD' }}>{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-3 gap-4">
              <Button 
                onClick={() => navigate('/morning-session')}
                className="h-16 font-semibold text-black"
                style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
              >
                <Zap className="w-6 h-6 mr-2" />
                Start Training
              </Button>
              <Button 
                onClick={() => navigate('/emergency')}
                variant="outline"
                className="h-16 font-semibold"
                style={{ 
                  backgroundColor: 'rgba(173, 30, 45, 0.2)', 
                  borderColor: 'rgba(173, 30, 45, 0.3)',
                  color: '#AD1E2D'
                }}
              >
                <Shield className="w-6 h-6 mr-2" />
                Emergency Protocol
              </Button>
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="h-16 font-semibold"
                style={{ 
                  backgroundColor: 'rgba(201, 213, 221, 0.2)', 
                  borderColor: 'rgba(201, 213, 221, 0.3)',
                  color: '#C9D5DD'
                }}
              >
                <Activity className="w-6 h-6 mr-2" />
                View Dashboard
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Assessment;
