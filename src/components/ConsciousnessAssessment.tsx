
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, Shield, Target, Star, TrendingUp, Award } from 'lucide-react';

interface AssessmentQuestion {
  id: string;
  category: 'conflict' | 'decision' | 'burnout' | 'nervous-system' | 'consciousness';
  question: string;
  options: {
    value: number;
    text: string;
    description: string;
  }[];
}

const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'conflict-1',
    category: 'conflict',
    question: 'When faced with team conflict, my first instinct is to:',
    options: [
      { value: 1, text: 'Avoid it and hope it resolves itself', description: 'Reactive avoidance pattern' },
      { value: 2, text: 'Jump in and try to fix it immediately', description: 'Reactive intervention pattern' },
      { value: 3, text: 'Take time to understand all perspectives first', description: 'Conscious assessment approach' },
      { value: 4, text: 'Use conflict as an opportunity for team growth', description: 'Transformational leadership' },
      { value: 5, text: 'Hold space for emergence while guiding resolution', description: 'Presence-based mastery' }
    ]
  },
  {
    id: 'nervous-system-1',
    category: 'nervous-system',
    question: 'Under high pressure, my body typically:',
    options: [
      { value: 1, text: 'Becomes very tense, heart races uncontrollably', description: 'Sympathetic overdrive' },
      { value: 2, text: 'Shows stress but I can usually manage it', description: 'Basic stress management' },
      { value: 3, text: 'Stays relatively calm with conscious breathing', description: 'Developing regulation' },
      { value: 4, text: 'Remains centered while I assess the situation', description: 'Advanced regulation' },
      { value: 5, text: 'Actually becomes more present and clear', description: 'Nervous system mastery' }
    ]
  },
  {
    id: 'decision-1',
    category: 'decision',
    question: 'When making important decisions, I primarily:',
    options: [
      { value: 1, text: 'Feel overwhelmed by options and often delay', description: 'Decision fatigue pattern' },
      { value: 2, text: 'Rely heavily on data and logical analysis', description: 'Analytical decision-making' },
      { value: 3, text: 'Balance logic with gut feeling', description: 'Integrated approach' },
      { value: 4, text: 'Check alignment with core values first', description: 'Values-based decisions' },
      { value: 5, text: 'Access deep knowing beyond thinking mind', description: 'Consciousness-based decisions' }
    ]
  },
  {
    id: 'consciousness-1',
    category: 'consciousness',
    question: 'My awareness of my impact on others is:',
    options: [
      { value: 1, text: 'Limited - I focus mainly on getting things done', description: 'Task-focused awareness' },
      { value: 2, text: 'Developing - I notice some of my effects', description: 'Growing self-awareness' },
      { value: 3, text: 'Good - I regularly consider my impact', description: 'Conscious consideration' },
      { value: 4, text: 'Strong - I can feel how my energy affects others', description: 'Energetic awareness' },
      { value: 5, text: 'Refined - I consciously cultivate beneficial presence', description: 'Mastery of presence' }
    ]
  }
];

const CONSCIOUSNESS_LEVELS = {
  1: { name: 'Awakening Awareness', color: 'text-red-400', description: 'Beginning to recognize unconscious patterns' },
  2: { name: 'Developing Presence', color: 'text-orange-400', description: 'Building conscious leadership skills' },
  3: { name: 'Expanding Consciousness', color: 'text-yellow-400', description: 'Integrating presence-based approaches' },
  4: { name: 'Integrated Leadership', color: 'text-green-400', description: 'Embodying conscious leadership naturally' },
  5: { name: 'Mastery & Service', color: 'text-blue-400', description: 'Leading from pure presence and wisdom' }
};

interface AssessmentResults {
  overallLevel: number;
  categoryScores: Record<string, number>;
  strengths: string[];
  growthAreas: string[];
  recommendations: string[];
}

interface ConsciousnessAssessmentProps {
  onComplete: (results: AssessmentResults) => void;
  isStandalone?: boolean;
}

const ConsciousnessAssessment: React.FC<ConsciousnessAssessmentProps> = ({ 
  onComplete, 
  isStandalone = false 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<AssessmentResults | null>(null);

  const handleAnswer = (questionId: string, value: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: Record<string, number>) => {
    const categories: Record<string, number[]> = {
      conflict: [],
      'nervous-system': [],
      decision: [],
      consciousness: []
    };

    ASSESSMENT_QUESTIONS.forEach(q => {
      const answer = finalAnswers[q.id];
      if (answer && categories[q.category]) {
        categories[q.category].push(answer);
      }
    });

    const averages = Object.entries(categories).reduce((acc, [key, values]) => {
      acc[key] = values.length > 0 ? Math.round(values.reduce((sum, val) => sum + val, 0) / values.length) : 1;
      return acc;
    }, {} as Record<string, number>);

    const overallLevel = Math.round(Object.values(averages).reduce((sum, val) => sum + val, 0) / Object.values(averages).length);

    const assessmentResults: AssessmentResults = {
      overallLevel,
      categoryScores: averages,
      strengths: getStrengths(averages),
      growthAreas: getGrowthAreas(averages),
      recommendations: getRecommendations(overallLevel, averages)
    };

    setResults(assessmentResults);
    setIsCompleted(true);
    onComplete(assessmentResults);
  };

  const getStrengths = (scores: Record<string, number>): string[] => {
    return Object.entries(scores)
      .filter(([_, score]) => score >= 4)
      .map(([category, _]) => category.replace('-', ' '));
  };

  const getGrowthAreas = (scores: Record<string, number>): string[] => {
    return Object.entries(scores)
      .filter(([_, score]) => score <= 2)
      .map(([category, _]) => category.replace('-', ' '));
  };

  const getRecommendations = (level: number, scores: Record<string, number>): string[] => {
    const recs: string[] = [];
    
    if (scores.conflict <= 2) {
      recs.push('Focus on conflict transformation modules');
    }
    if (scores['nervous-system'] <= 2) {
      recs.push('Prioritize nervous system regulation practices');
    }
    if (scores.decision <= 2) {
      recs.push('Develop decision-making frameworks');
    }
    
    if (level >= 4) {
      recs.push('Consider Executive Circle for advanced mastery');
    } else if (level >= 3) {
      recs.push('Premium Mastery track recommended');
    } else {
      recs.push('Basic Foundation track is perfect for building core skills');
    }

    return recs;
  };

  const progress = ((currentQuestion + 1) / ASSESSMENT_QUESTIONS.length) * 100;

  if (isCompleted && results) {
    const levelInfo = CONSCIOUSNESS_LEVELS[results.overallLevel as keyof typeof CONSCIOUSNESS_LEVELS];
    
    return (
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
            <Award className="w-8 h-8 text-yellow-400" />
            Your Consciousness Leadership Assessment
          </CardTitle>
          <CardDescription className="text-gray-400">
            Comprehensive analysis of your leadership consciousness level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Level */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <Star className="w-12 h-12 text-yellow-400" />
              <div>
                <h3 className={`text-3xl font-bold ${levelInfo.color}`}>
                  Level {results.overallLevel}
                </h3>
                <p className={`text-lg ${levelInfo.color}`}>
                  {levelInfo.name}
                </p>
              </div>
            </div>
            <p className="text-gray-300 max-w-md mx-auto">
              {levelInfo.description}
            </p>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(results.categoryScores).map(([category, score]) => {
              const icons = {
                conflict: Shield,
                'nervous-system': Brain,
                decision: Target,
                consciousness: Heart
              };
              const IconComponent = icons[category as keyof typeof icons];
              
              return (
                <div key={category} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-semibold capitalize">
                      {category.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={(score / 5) * 100} className="flex-1 h-2" />
                    <span className="text-yellow-400 font-bold">{score}/5</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Strengths */}
          {results.strengths.length > 0 && (
            <div>
              <h4 className="text-white font-semibold mb-2">Your Strengths:</h4>
              <div className="flex flex-wrap gap-2">
                {results.strengths.map((strength: string) => (
                  <Badge key={strength} className="bg-green-500/20 text-green-400 border-green-500/50">
                    {strength}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Growth Areas */}
          {results.growthAreas.length > 0 && (
            <div>
              <h4 className="text-white font-semibold mb-2">Growth Opportunities:</h4>
              <div className="flex flex-wrap gap-2">
                {results.growthAreas.map((area: string) => (
                  <Badge key={area} className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div>
            <h4 className="text-white font-semibold mb-2">Personalized Recommendations:</h4>
            <ul className="space-y-2">
              {results.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-gray-300 flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <Button 
            onClick={() => window.location.reload()} 
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold"
          >
            Retake Assessment
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = ASSESSMENT_QUESTIONS[currentQuestion];

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-white">
            Consciousness Leadership Assessment
          </CardTitle>
          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
            {currentQuestion + 1} of {ASSESSMENT_QUESTIONS.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            {question.question}
          </h3>
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(question.id, option.value)}
                className="w-full text-left p-4 rounded-lg border border-gray-600 hover:border-yellow-400 hover:bg-gray-800 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-500 group-hover:border-yellow-400 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{option.text}</p>
                    <p className="text-sm text-gray-400 mt-1">{option.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsciousnessAssessment;
