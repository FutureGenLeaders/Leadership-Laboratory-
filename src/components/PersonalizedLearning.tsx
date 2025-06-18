
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Lightbulb, Target, TrendingUp, Clock, Star, Zap, BookOpen } from 'lucide-react';

interface LearningStyle {
  visual: number;
  auditory: number;
  kinesthetic: number;
  reading: number;
}

interface PersonalizationData {
  learningStyle: LearningStyle;
  preferredPace: 'slow' | 'moderate' | 'fast';
  optimalLearningTime: 'morning' | 'afternoon' | 'evening';
  challengeAreas: string[];
  strengths: string[];
  currentFocus: string;
}

interface ContentRecommendation {
  id: string;
  title: string;
  type: 'lesson' | 'practice' | 'assessment' | 'challenge';
  difficulty: number;
  estimatedTime: number;
  relevanceScore: number;
  reason: string;
  category: 'conflict' | 'decision' | 'burnout' | 'nervous-system';
}

const PersonalizedLearning: React.FC = () => {
  const [personalizationData, setPersonalizationData] = useState<PersonalizationData>({
    learningStyle: { visual: 75, auditory: 60, kinesthetic: 85, reading: 70 },
    preferredPace: 'moderate',
    optimalLearningTime: 'morning',
    challengeAreas: ['conflict-transformation', 'decision-fatigue'],
    strengths: ['nervous-system-regulation'],
    currentFocus: 'conflict-transformation'
  });

  const [recommendations, setRecommendations] = useState<ContentRecommendation[]>([
    {
      id: 'conflict-deep-dive',
      title: 'Conflict Transformation Through Somatic Awareness',
      type: 'lesson',
      difficulty: 3,
      estimatedTime: 25,
      relevanceScore: 95,
      reason: 'Combines your kinesthetic learning strength with conflict challenge area',
      category: 'conflict'
    },
    {
      id: 'breathing-practice',
      title: 'Advanced 4-7-8 Breathing Protocol',
      type: 'practice',
      difficulty: 2,
      estimatedTime: 15,
      relevanceScore: 88,
      reason: 'Builds on your nervous system regulation strength',
      category: 'nervous-system'
    },
    {
      id: 'decision-fatigue-assessment',
      title: 'Personal Decision Fatigue Pattern Analysis',
      type: 'assessment',
      difficulty: 2,
      estimatedTime: 20,
      relevanceScore: 92,
      reason: 'Directly addresses your identified challenge area',
      category: 'decision'
    }
  ]);

  const [learningInsights, setLearningInsights] = useState<string[]>([
    'Your kinesthetic learning style (85%) suggests hands-on practices will be most effective',
    'Morning learning sessions align with your optimal cognitive performance time',
    'Focus on conflict transformation will accelerate your overall leadership development'
  ]);

  const getLearningStyleSuggestions = () => {
    const dominant = Object.entries(personalizationData.learningStyle)
      .sort(([,a], [,b]) => b - a)[0][0];

    const suggestions = {
      visual: 'Include more diagrams, mind maps, and visual progress tracking',
      auditory: 'Focus on audio practices, recorded content, and discussion forums',
      kinesthetic: 'Emphasize body-based practices, movement, and experiential learning',
      reading: 'Provide detailed written materials, frameworks, and text-based resources'
    };

    return suggestions[dominant as keyof typeof suggestions];
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      conflict: Target,
      decision: Brain,
      burnout: Zap,
      'nervous-system': BookOpen
    };
    return icons[category as keyof typeof icons] || Lightbulb;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      conflict: 'text-red-400',
      decision: 'text-blue-400',
      burnout: 'text-green-400',
      'nervous-system': 'text-purple-400'
    };
    return colors[category as keyof typeof colors] || 'text-yellow-400';
  };

  return (
    <div className="space-y-6">
      {/* Learning Style Analysis */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-yellow-400" />
            Your Personalized Learning Profile
          </CardTitle>
          <CardDescription className="text-gray-400">
            AI-powered analysis of your optimal learning approach
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Learning Style Breakdown */}
          <div>
            <h4 className="text-white font-semibold mb-3">Learning Style Preferences</h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(personalizationData.learningStyle).map(([style, score]) => (
                <div key={style} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300 capitalize">{style}</span>
                    <span className="text-yellow-400 font-semibold">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Personalization Insights */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-800/20 p-4 rounded-lg border border-blue-600/30">
            <h4 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              AI Insights
            </h4>
            <ul className="space-y-2">
              {learningInsights.map((insight, index) => (
                <li key={index} className="text-blue-100 text-sm flex items-start gap-2">
                  <Star className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <h5 className="text-white font-semibold">Optimal Time</h5>
              <p className="text-gray-400 text-sm capitalize">{personalizationData.optimalLearningTime}</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <h5 className="text-white font-semibold">Learning Pace</h5>
              <p className="text-gray-400 text-sm capitalize">{personalizationData.preferredPace}</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <h5 className="text-white font-semibold">Current Focus</h5>
              <p className="text-gray-400 text-sm">{personalizationData.currentFocus.replace('-', ' ')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-yellow-400" />
            Personalized Content Recommendations
          </CardTitle>
          <CardDescription className="text-gray-400">
            Content curated specifically for your learning style and development goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec) => {
              const IconComponent = getCategoryIcon(rec.category);
              const categoryColor = getCategoryColor(rec.category);
              
              return (
                <div key={rec.id} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-6 h-6 ${categoryColor}`} />
                      <div>
                        <h4 className="text-white font-semibold">{rec.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {rec.type}
                          </Badge>
                          <span className="text-gray-400 text-xs">
                            {rec.estimatedTime} min
                          </span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: rec.difficulty }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-sm">
                        {rec.relevanceScore}% match
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{rec.reason}</p>
                  
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold">
                    Start {rec.type.charAt(0).toUpperCase() + rec.type.slice(1)}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path Optimization */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-800/20 border-purple-600/50">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-purple-400" />
            AI Learning Path Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-purple-300 font-semibold mb-2">Accelerated Development Areas</h4>
              <ul className="space-y-2">
                {personalizationData.challengeAreas.map((area) => (
                  <li key={area} className="text-gray-300 text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    {area.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-purple-300 font-semibold mb-2">Leverage Your Strengths</h4>
              <ul className="space-y-2">
                {personalizationData.strengths.map((strength) => (
                  <li key={strength} className="text-gray-300 text-sm flex items-center gap-2">
                    <Star className="w-4 h-4 text-purple-400" />
                    {strength.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-purple-800/20 p-3 rounded-lg">
            <h4 className="text-purple-300 font-semibold mb-1">Optimization Suggestion</h4>
            <p className="text-purple-100 text-sm">
              {getLearningStyleSuggestions()}. This approach will increase learning efficiency by up to 40%.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedLearning;
