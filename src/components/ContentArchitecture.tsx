
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Brain, Heart, Shield } from 'lucide-react';

interface LessonModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'conflict' | 'decision' | 'burnout' | 'nervous-system';
  weekNumber: number;
  isCompleted: boolean;
  ancientWisdom: {
    quote: string;
    author: string;
    context: string;
  };
}

const LESSON_TYPES = {
  'conflict': { icon: Shield, color: 'bg-red-500', name: 'Conflict Transformation' },
  'decision': { icon: Brain, color: 'bg-blue-500', name: 'Decision Mastery' },
  'burnout': { icon: Heart, color: 'bg-green-500', name: 'Burnout Prevention' },
  'nervous-system': { icon: BookOpen, color: 'bg-purple-500', name: 'Nervous System Regulation' }
};

const MONTHLY_STRUCTURE: LessonModule[] = [
  {
    id: 'week1-conflict',
    title: 'Conflict Transformation Deep Dive',
    description: 'Root cause analysis, trigger identification, communication protocols, resolution frameworks',
    duration: '45 minutes',
    type: 'conflict',
    weekNumber: 1,
    isCompleted: false,
    ancientWisdom: {
      quote: "Try not to resist the changes that come your way. Instead, let life live through you.",
      author: "Rumi",
      context: "13th century Persian poet and mystic teacher on flowing with life's challenges"
    }
  },
  {
    id: 'week2-decision',
    title: 'Decision-Making Fatigue Elimination',
    description: 'Cognitive load management, decision frameworks, intuitive integration, energy preservation',
    duration: '40 minutes',
    type: 'decision',
    weekNumber: 2,
    isCompleted: false,
    ancientWisdom: {
      quote: "Believe nothing, no matter where you read it or who said it, unless it agrees with your own reason and common sense.",
      author: "Buddha",
      context: "Ancient teaching on developing discernment and inner wisdom for decision-making"
    }
  },
  {
    id: 'week3-burnout',
    title: 'Burnout Prevention & Recovery Systems',
    description: 'Early warning systems, recovery protocols, sustainable pace creation, energy management',
    duration: '35 minutes',
    type: 'burnout',
    weekNumber: 3,
    isCompleted: false,
    ancientWisdom: {
      quote: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
      author: "Rumi",
      context: "Teaching on focusing energy inward for sustainable transformation"
    }
  },
  {
    id: 'week4-nervous',
    title: 'Nervous System Regulation Mastery',
    description: 'Polyvagal applications, somatic practices, co-regulation skills, stress response optimization',
    duration: '50 minutes',
    type: 'nervous-system',
    weekNumber: 4,
    isCompleted: false,
    ancientWisdom: {
      quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
      author: "Marcus Aurelius",
      context: "Stoic emperor's wisdom on internal sovereignty and nervous system mastery"
    }
  }
];

interface ContentArchitectureProps {
  userTier: 'basic' | 'premium' | 'executive';
  currentWeek: number;
}

const ContentArchitecture: React.FC<ContentArchitectureProps> = ({ userTier, currentWeek }) => {
  const getAvailableLessons = () => {
    if (userTier === 'basic') {
      // Basic tier gets 2 lessons per month
      return MONTHLY_STRUCTURE.filter(lesson => lesson.weekNumber <= 2);
    }
    return MONTHLY_STRUCTURE; // Premium and Executive get all 4
  };

  const availableLessons = getAvailableLessons();
  const completedLessons = availableLessons.filter(lesson => lesson.isCompleted).length;
  const progressPercentage = (completedLessons / availableLessons.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">Monthly Presence Mastery Progress</CardTitle>
          <CardDescription className="text-gray-400">
            {userTier === 'basic' ? '2 focused lessons' : '4 comprehensive lessons'} per month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Lessons Completed</span>
              <span className="text-yellow-400">{completedLessons} of {availableLessons.length}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Lesson Modules */}
      <div className="grid gap-4">
        {availableLessons.map((lesson) => {
          const typeConfig = LESSON_TYPES[lesson.type];
          const IconComponent = typeConfig.icon;
          const isAvailable = lesson.weekNumber <= currentWeek;

          return (
            <Card 
              key={lesson.id} 
              className={`bg-gray-900 border-gray-700 transition-all hover:border-gray-600 ${
                !isAvailable ? 'opacity-60' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${typeConfig.color}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{lesson.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        Week {lesson.weekNumber} • {lesson.duration}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={lesson.isCompleted ? "default" : "secondary"}>
                      {lesson.isCompleted ? 'Completed' : isAvailable ? 'Available' : 'Locked'}
                    </Badge>
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                      {typeConfig.name}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">{lesson.description}</p>
                
                {/* Ancient Wisdom Integration */}
                <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <blockquote className="text-yellow-100 italic mb-2">
                    "{lesson.ancientWisdom.quote}"
                  </blockquote>
                  <div className="text-sm text-gray-400">
                    <strong className="text-yellow-400">— {lesson.ancientWisdom.author}</strong>
                    <p className="mt-1">{lesson.ancientWisdom.context}</p>
                  </div>
                </div>

                {isAvailable && (
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-black font-semibold py-2 px-4 rounded-lg transition-colors"
                      disabled={lesson.isCompleted}
                    >
                      {lesson.isCompleted ? 'Review Lesson' : 'Start Lesson'}
                    </button>
                    {lesson.isCompleted && (
                      <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                        Mark Complete
                      </button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tier Upgrade Suggestion for Basic Users */}
      {userTier === 'basic' && (
        <Card className="bg-gradient-to-r from-yellow-900/20 to-amber-800/20 border-yellow-600/50">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                Unlock Full Monthly Structure
              </h3>
              <p className="text-yellow-200 mb-4">
                Access all 4 weekly lessons plus advanced features with Premium Mastery
              </p>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 px-6 rounded-lg transition-colors">
                Upgrade to Premium
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentArchitecture;
