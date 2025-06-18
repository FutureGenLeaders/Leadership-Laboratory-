
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Calendar, Clock, Star, Award, Flame, TrendingUp } from 'lucide-react';

interface ProgressMetrics {
  currentStreak: number;
  longestStreak: number;
  totalLessonsCompleted: number;
  totalPracticeMinutes: number;
  consciousnessLevel: number;
  weeklyGoalProgress: number;
  monthlyGoalProgress: number;
  certificationProgress: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  unlockedAt?: Date;
  isUnlocked: boolean;
  category: 'streak' | 'completion' | 'practice' | 'consciousness';
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: Target,
    isUnlocked: true,
    unlockedAt: new Date(),
    category: 'completion'
  },
  {
    id: 'week-streak',
    title: 'Consistency Master',
    description: 'Maintain a 7-day practice streak',
    icon: Flame,
    isUnlocked: false,
    category: 'streak'
  },
  {
    id: 'monthly-complete',
    title: 'Monthly Warrior',
    description: 'Complete all lessons in a month',
    icon: Trophy,
    isUnlocked: false,
    category: 'completion'
  },
  {
    id: 'consciousness-level-3',
    title: 'Awareness Expander',
    description: 'Reach consciousness level 3',
    icon: Star,
    isUnlocked: false,
    category: 'consciousness'
  },
  {
    id: 'practice-100-hours',
    title: 'Dedicated Practitioner',
    description: 'Complete 100 hours of practice',
    icon: Clock,
    isUnlocked: false,
    category: 'practice'
  }
];

interface ProgressTrackingDashboardProps {
  metrics: ProgressMetrics;
  userTier: 'basic' | 'premium' | 'executive';
}

const ProgressTrackingDashboard: React.FC<ProgressTrackingDashboardProps> = ({ 
  metrics, 
  userTier 
}) => {
  const getConsciousnessLevelDescription = (level: number) => {
    const levels = {
      1: 'Awakening Awareness',
      2: 'Developing Presence',
      3: 'Expanding Consciousness',
      4: 'Integrated Leadership',
      5: 'Mastery & Service'
    };
    return levels[level as keyof typeof levels] || 'Unknown Level';
  };

  const getCertificationProgress = () => {
    const requirements = {
      basic: { lessons: 24, practices: 100, level: 2 },
      premium: { lessons: 48, practices: 200, level: 3 },
      executive: { lessons: 120, practices: 500, level: 5 }
    };
    
    const req = requirements[userTier];
    const lessonsProgress = Math.min((metrics.totalLessonsCompleted / req.lessons) * 100, 100);
    const practicesProgress = Math.min((metrics.totalPracticeMinutes / req.practices) * 100, 100);
    const levelProgress = Math.min((metrics.consciousnessLevel / req.level) * 100, 100);
    
    return {
      overall: (lessonsProgress + practicesProgress + levelProgress) / 3,
      requirements: req,
      progress: { lessonsProgress, practicesProgress, levelProgress }
    };
  };

  const certificationData = getCertificationProgress();

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Flame className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Current Streak</p>
                <p className="text-2xl font-bold text-white">{metrics.currentStreak}</p>
                <p className="text-xs text-gray-500">days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Trophy className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Lessons Completed</p>
                <p className="text-2xl font-bold text-white">{metrics.totalLessonsCompleted}</p>
                <p className="text-xs text-gray-500">total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Practice Time</p>
                <p className="text-2xl font-bold text-white">{Math.floor(metrics.totalPracticeMinutes / 60)}h</p>
                <p className="text-xs text-gray-500">{metrics.totalPracticeMinutes % 60}m total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Star className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Consciousness Level</p>
                <p className="text-2xl font-bold text-white">{metrics.consciousnessLevel}</p>
                <p className="text-xs text-gray-500">{getConsciousnessLevelDescription(metrics.consciousnessLevel)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-yellow-400" />
              Weekly Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Practice Sessions</span>
                <span className="text-yellow-400">{Math.round(metrics.weeklyGoalProgress)}%</span>
              </div>
              <Progress value={metrics.weeklyGoalProgress} className="h-2" />
            </div>
            <p className="text-sm text-gray-400">Complete daily practices to maintain momentum</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              Monthly Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Lesson Completion</span>
                <span className="text-blue-400">{Math.round(metrics.monthlyGoalProgress)}%</span>
              </div>
              <Progress value={metrics.monthlyGoalProgress} className="h-2" />
            </div>
            <p className="text-sm text-gray-400">Stay on track with your monthly learning goals</p>
          </CardContent>
        </Card>
      </div>

      {/* Certification Progress */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-400" />
            Conscious Leadership Certification Progress
          </CardTitle>
          <CardDescription className="text-gray-400">
            {userTier.charAt(0).toUpperCase() + userTier.slice(1)} Track Certification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Lessons</span>
                <span className="text-yellow-400">
                  {metrics.totalLessonsCompleted}/{certificationData.requirements.lessons}
                </span>
              </div>
              <Progress value={certificationData.progress.lessonsProgress} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Practice Hours</span>
                <span className="text-blue-400">
                  {Math.floor(metrics.totalPracticeMinutes / 60)}/{certificationData.requirements.practices}
                </span>
              </div>
              <Progress value={certificationData.progress.practicesProgress} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Consciousness Level</span>
                <span className="text-purple-400">
                  {metrics.consciousnessLevel}/{certificationData.requirements.level}
                </span>
              </div>
              <Progress value={certificationData.progress.levelProgress} className="h-2" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Overall Progress</span>
              <span className="text-green-400">{Math.round(certificationData.overall)}%</span>
            </div>
            <Progress value={certificationData.overall} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" />
            Achievements & Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-all ${
                    achievement.isUnlocked
                      ? 'bg-yellow-500/10 border-yellow-400/50'
                      : 'bg-gray-800/50 border-gray-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.isUnlocked ? 'bg-yellow-500/20' : 'bg-gray-700'
                    }`}>
                      <IconComponent className={`w-5 h-5 ${
                        achievement.isUnlocked ? 'text-yellow-400' : 'text-gray-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        achievement.isUnlocked ? 'text-yellow-400' : 'text-gray-400'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {achievement.description}
                      </p>
                      {achievement.isUnlocked && achievement.unlockedAt && (
                        <Badge variant="secondary" className="mt-2">
                          Unlocked {achievement.unlockedAt.toLocaleDateString()}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTrackingDashboard;
