
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Heart, 
  Brain, 
  Zap, 
  Shield,
  Star
} from "lucide-react";

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      category: "Nervous System State",
      icon: Heart,
      question: "How does your body feel right now?",
      options: [
        { text: "Tense, rushed, scattered energy", value: 1 },
        { text: "Alert but stable, manageable stress", value: 2 },
        { text: "Calm, centered, ready for challenges", value: 3 },
        { text: "Deeply peaceful, unshakeable presence", value: 4 }
      ]
    },
    {
      category: "Decision Clarity",
      icon: Brain,
      question: "When facing complex decisions, I typically:",
      options: [
        { text: "Feel overwhelmed and avoid deciding", value: 1 },
        { text: "Analyze endlessly but struggle to choose", value: 2 },
        { text: "Balance analysis with intuitive knowing", value: 3 },
        { text: "Access clear guidance from deeper wisdom", value: 4 }
      ]
    },
    {
      category: "Conflict Response",
      icon: Zap,
      question: "During team conflicts, I:",
      options: [
        { text: "React defensively or withdraw completely", value: 1 },
        { text: "Try to manage but feel drained after", value: 2 },
        { text: "Stay centered while addressing issues", value: 3 },
        { text: "Transform tension into breakthrough clarity", value: 4 }
      ]
    },
    {
      category: "Energy Management",
      icon: Shield,
      question: "My energy levels throughout the day are:",
      options: [
        { text: "Constantly depleted, running on fumes", value: 1 },
        { text: "Up and down, inconsistent performance", value: 2 },
        { text: "Generally stable with good recovery", value: 3 },
        { text: "Sustainably high, renewable energy source", value: 4 }
      ]
    },
    {
      category: "Crisis Leadership",
      icon: Shield,
      question: "Under extreme pressure, I:",
      options: [
        { text: "Lose composure and make poor decisions", value: 1 },
        { text: "Survive but feel rattled afterward", value: 2 },
        { text: "Maintain effectiveness despite stress", value: 3 },
        { text: "Thrive and inspire others through chaos", value: 4 }
      ]
    }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    const average = total / answers.length;
    const percentage = Math.round((average / 4) * 100);
    
    let level = "Laboratory Initiate";
    let description = "Beginning the leadership optimization journey";
    let color = "from-red-400 to-red-500";
    
    if (percentage >= 85) {
      level = "Leadership Scientist";
      description = "Master of high-performance leadership";
      color = "from-yellow-400 to-yellow-600";
    } else if (percentage >= 70) {
      level = "Performance Expert";
      description = "Advanced leadership practitioner";
      color = "from-yellow-500 to-red-500";
    } else if (percentage >= 55) {
      level = "Leadership Analyst";
      description = "Developing precision leadership skills";
      color = "from-gray-400 to-gray-500";
    }
    
    return { level, description, percentage, color };
  };

  if (showResults) {
    const results = calculateResults();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
        <div className="container mx-auto max-w-2xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6 hover:text-yellow-300"
            style={{ color: '#C9D5DD' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Laboratory
          </Button>

          <Card className="border" style={{ 
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
            borderColor: 'rgba(173, 30, 45, 0.3)' 
          }}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className={`p-6 rounded-full bg-gradient-to-r ${results.color}`}>
                  <span className="text-4xl">🔬</span>
                </div>
              </div>
              <CardTitle className="text-3xl" style={{ color: '#E0B848' }}>
                Performance Analysis Complete
              </CardTitle>
              <CardDescription className="text-lg" style={{ color: '#C9D5DD' }}>
                Your leadership profile has been calibrated
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Badge className={`bg-gradient-to-r ${results.color} text-white text-xl px-6 py-3 mb-4`}>
                  {results.level}
                </Badge>
                <div className="text-6xl font-bold mb-2" style={{ color: '#E0B848' }}>
                  {results.percentage}%
                </div>
                <p className="text-lg" style={{ color: '#C9D5DD' }}>{results.description}</p>
                <Progress value={results.percentage} className="w-full max-w-md mx-auto mt-4" />
              </div>

              <div className="rounded-lg p-6 border" style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                borderColor: 'rgba(173, 30, 45, 0.2)' 
              }}>
                <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: '#E0B848' }}>
                  <Star className="w-5 h-5 mr-2" />
                  Your Precision Development Path
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#C9D5DD' }}>Nervous System Mastery</span>
                    <span className="font-semibold" style={{ color: '#E0B848' }}>{answers[0] * 25}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#C9D5DD' }}>Decision Architecture</span>
                    <span className="font-semibold" style={{ color: '#E0B848' }}>{answers[1] * 25}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#C9D5DD' }}>Conflict Mastery</span>
                    <span className="font-semibold" style={{ color: '#E0B848' }}>{answers[2] * 25}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#C9D5DD' }}>Energy Sovereignty</span>
                    <span className="font-semibold" style={{ color: '#E0B848' }}>{answers[3] * 25}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#C9D5DD' }}>Crisis Leadership</span>
                    <span className="font-semibold" style={{ color: '#E0B848' }}>{answers[4] * 25}%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6 border" style={{ 
                backgroundColor: 'rgba(224, 184, 72, 0.1)', 
                borderColor: 'rgba(224, 184, 72, 0.2)' 
              }}>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#E0B848' }}>Precision Guidance:</h3>
                <p style={{ color: '#C9D5DD' }}>
                  {results.percentage >= 70 
                    ? "Your performance metrics are strong. Focus on advanced optimization and sharing expertise with your team."
                    : results.percentage >= 40
                    ? "You're on the precision path. Consistent daily practice will elevate your leadership performance."
                    : "Your transformation begins now. Embrace the protocols with dedication and watch your leadership transform."
                  }
                </p>
              </div>

              <Button 
                onClick={() => navigate('/')}
                className="w-full font-semibold text-lg py-6 text-black"
                style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
              >
                Begin Your Precision Training
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const IconComponent = currentQ.icon;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="container mx-auto max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 hover:text-yellow-300"
          style={{ color: '#C9D5DD' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Laboratory
        </Button>

        <Card className="border" style={{ 
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
          borderColor: 'rgba(173, 30, 45, 0.3)' 
        }}>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge style={{ 
                backgroundColor: 'rgba(224, 184, 72, 0.2)', 
                color: '#E0B848', 
                borderColor: 'rgba(224, 184, 72, 0.3)' 
              }}>
                Analysis {currentQuestion + 1} of {questions.length}
              </Badge>
              <div className="p-3 rounded-full bg-gradient-to-r from-red-500 to-red-600">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
            </div>
            <Progress value={progress} className="mb-4" />
            <CardTitle className="text-xl" style={{ color: '#E0B848' }}>
              {currentQ.category}
            </CardTitle>
            <CardDescription className="text-lg" style={{ color: '#C9D5DD' }}>
              {currentQ.question}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswer(option.value)}
                  className="w-full text-left h-auto p-6 transition-all duration-300"
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                    borderColor: 'rgba(173, 30, 45, 0.3)',
                    color: '#C9D5DD'
                  }}
                >
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white font-bold mr-4 mt-1">
                      {index + 1}
                    </div>
                    <span className="text-base leading-relaxed">{option.text}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;
