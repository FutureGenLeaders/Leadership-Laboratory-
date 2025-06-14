
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
  Crown,
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
      icon: Crown,
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
    
    let level = "Initiate";
    let description = "Beginning the consciousness journey";
    let color = "from-red-400 to-orange-400";
    
    if (percentage >= 85) {
      level = "Ruthless Sanusi";
      description = "Master of consciousness leadership";
      color = "from-yellow-400 to-yellow-600";
    } else if (percentage >= 70) {
      level = "Master";
      description = "Advanced consciousness practitioner";
      color = "from-purple-400 to-indigo-400";
    } else if (percentage >= 55) {
      level = "Practitioner";
      description = "Developing conscious leadership skills";
      color = "from-blue-400 to-cyan-400";
    }
    
    return { level, description, percentage, color };
  };

  if (showResults) {
    const results = calculateResults();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="container mx-auto max-w-2xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6 text-purple-300 hover:text-yellow-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Button>

          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className={`p-6 rounded-full bg-gradient-to-r ${results.color}`}>
                  <Crown className="w-12 h-12 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl text-yellow-300">
                Sacred Assessment Complete
              </CardTitle>
              <CardDescription className="text-purple-200 text-lg">
                Your consciousness profile has been revealed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Badge className={`bg-gradient-to-r ${results.color} text-white text-xl px-6 py-3 mb-4`}>
                  {results.level}
                </Badge>
                <div className="text-6xl font-bold text-yellow-400 mb-2">
                  {results.percentage}%
                </div>
                <p className="text-lg text-purple-200">{results.description}</p>
                <Progress value={results.percentage} className="w-full max-w-md mx-auto mt-4" />
              </div>

              <div className="bg-purple-800/30 rounded-lg p-6 border border-purple-500/20">
                <h3 className="text-xl font-semibold text-yellow-300 mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Your Sacred Development Path
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Nervous System Mastery</span>
                    <span className="text-yellow-400 font-semibold">{answers[0] * 25}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Decision Architecture</span>
                    <span className="text-yellow-400 font-semibold">{answers[1] * 25}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Conflict Mastery</span>
                    <span className="text-yellow-400 font-semibold">{answers[2] * 25}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Energy Sovereignty</span>
                    <span className="text-yellow-400 font-semibold">{answers[3] * 25}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Crisis Leadership</span>
                    <span className="text-yellow-400 font-semibold">{answers[4] * 25}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/10 rounded-lg p-6 border border-yellow-500/20">
                <h3 className="text-lg font-semibold text-yellow-300 mb-2">Divine Guidance:</h3>
                <p className="text-yellow-200">
                  {results.percentage >= 70 
                    ? "Your consciousness frequency is strong. Focus on refining your mastery and sharing wisdom with others."
                    : results.percentage >= 40
                    ? "You're on the sacred path. Consistent daily practice will elevate your leadership consciousness."
                    : "Your transformation journey begins now. Embrace the practices with devotion and watch your leadership transform."
                  }
                </p>
              </div>

              <Button 
                onClick={() => navigate('/')}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold text-lg py-6"
              >
                Begin Your Sacred Practice
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 text-purple-300 hover:text-yellow-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Dashboard
        </Button>

        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
              <div className={`p-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
            </div>
            <Progress value={progress} className="mb-4" />
            <CardTitle className="text-xl text-yellow-300">
              {currentQ.category}
            </CardTitle>
            <CardDescription className="text-purple-200 text-lg">
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
                  className="w-full text-left h-auto p-6 bg-purple-800/20 hover:bg-purple-700/30 border-purple-500/30 hover:border-yellow-500/50 text-purple-100 hover:text-yellow-200 transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold mr-4 mt-1">
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
