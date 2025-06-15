
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  CheckCircle,
  Lock,
  Trophy,
  Target,
  Brain,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { universalPrinciples, getPrinciplesByMonth, getCompletedPrinciples } from "@/data/universalPrinciples";

const MonthlyProgression = () => {
  const [expandedMonth, setExpandedMonth] = useState<number | null>(1);
  
  const completedPrinciples = getCompletedPrinciples();
  const totalProgress = Math.round((completedPrinciples.length / universalPrinciples.length) * 100);

  const months = [
    { 
      id: 1, 
      title: "Foundation Month", 
      description: "Master nervous system awareness and basic regulation",
      color: "#3B82F6",
      weeks: "Weeks 1-4"
    },
    { 
      id: 2, 
      title: "Developing Mastery", 
      description: "Advanced regulation and team influence skills",
      color: "#E0B848",
      weeks: "Weeks 5-8"
    },
    { 
      id: 3, 
      title: "Advanced Integration", 
      description: "Complex decision-making and crisis leadership",
      color: "#10B981",
      weeks: "Weeks 9-12"
    },
    { 
      id: 4, 
      title: "Mastery Achievement", 
      description: "Unshakeable presence and neuroscience leadership",
      color: "#AD1E2D",
      weeks: "Weeks 13-16"
    }
  ];

  const toggleMonth = (monthId: number) => {
    setExpandedMonth(expandedMonth === monthId ? null : monthId);
  };

  const getMasteryColor = (level: string) => {
    switch (level) {
      case 'Foundation': return '#3B82F6';
      case 'Developing': return '#E0B848';
      case 'Advanced': return '#10B981';
      case 'Mastery': return '#AD1E2D';
      default: return '#BDBBBB';
    }
  };

  return (
    <Card className="border" style={{ 
      background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))',
      borderColor: 'rgba(224, 184, 72, 0.3)' 
    }}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center" style={{ color: '#E0B848' }}>
          <Calendar className="w-6 h-6 mr-2" />
          42 Universal Principles Progression
          <Trophy className="w-6 h-6 ml-2" />
        </CardTitle>
        <CardDescription style={{ color: '#C9D5DD' }}>
          Your journey through neuroscience-based leadership mastery
        </CardDescription>
        
        <div className="mt-6">
          <div className="text-4xl font-bold mb-2" style={{ color: '#E0B848' }}>
            {completedPrinciples.length}/42
          </div>
          <p className="text-sm mb-4" style={{ color: '#BDBBBB' }}>Principles Mastered</p>
          <Progress value={totalProgress} className="max-w-md mx-auto" />
          <p className="text-lg mt-2" style={{ color: '#C9D5DD' }}>{totalProgress}% Complete</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {months.map((month) => {
          const monthPrinciples = getPrinciplesByMonth(month.id);
          const completedInMonth = monthPrinciples.filter(p => p.isCompleted).length;
          const monthProgress = monthPrinciples.length > 0 ? (completedInMonth / monthPrinciples.length) * 100 : 0;
          const isExpanded = expandedMonth === month.id;

          return (
            <div key={month.id} className="space-y-2">
              <Button
                variant="ghost"
                onClick={() => toggleMonth(month.id)}
                className="w-full p-0 h-auto"
              >
                <Card className="w-full border" style={{ 
                  background: `linear-gradient(to right, rgba(0, 0, 0, 0.8), ${month.color}20)`,
                  borderColor: `${month.color}40` 
                }}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                             style={{ backgroundColor: `${month.color}30`, border: `2px solid ${month.color}60` }}>
                          <span className="font-bold" style={{ color: month.color }}>{month.id}</span>
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold" style={{ color: month.color }}>
                            {month.title}
                          </h3>
                          <p className="text-sm" style={{ color: '#BDBBBB' }}>
                            {month.description}
                          </p>
                          <Badge className="mt-1" style={{ 
                            backgroundColor: `${month.color}20`, 
                            color: month.color, 
                            borderColor: `${month.color}40` 
                          }}>
                            {month.weeks}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-bold" style={{ color: month.color }}>
                            {completedInMonth}/{monthPrinciples.length}
                          </div>
                          <Progress value={monthProgress} className="w-20 h-2" />
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" style={{ color: month.color }} />
                        ) : (
                          <ChevronDown className="w-5 h-5" style={{ color: month.color }} />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Button>

              {isExpanded && (
                <div className="ml-4 space-y-2">
                  {monthPrinciples.map((principle) => (
                    <Card key={principle.id} className="border" style={{ 
                      background: principle.isCompleted 
                        ? 'linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(0, 0, 0, 0.8))'
                        : principle.isUnlocked
                        ? 'linear-gradient(to right, rgba(224, 184, 72, 0.1), rgba(0, 0, 0, 0.8))'
                        : 'linear-gradient(to right, rgba(189, 187, 187, 0.1), rgba(0, 0, 0, 0.8))',
                      borderColor: principle.isCompleted 
                        ? 'rgba(16, 185, 129, 0.3)'
                        : principle.isUnlocked
                        ? 'rgba(224, 184, 72, 0.3)'
                        : 'rgba(189, 187, 187, 0.3)'
                    }}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {principle.isCompleted ? (
                              <CheckCircle className="w-6 h-6" style={{ color: '#10B981' }} />
                            ) : principle.isUnlocked ? (
                              <Target className="w-6 h-6" style={{ color: '#E0B848' }} />
                            ) : (
                              <Lock className="w-6 h-6" style={{ color: '#BDBBBB' }} />
                            )}
                            <div>
                              <h4 className="font-semibold" style={{ 
                                color: principle.isCompleted ? '#10B981' : principle.isUnlocked ? '#E0B848' : '#BDBBBB' 
                              }}>
                                {principle.title}
                              </h4>
                              <p className="text-sm" style={{ color: '#BDBBBB' }}>
                                {principle.description}
                              </p>
                              <div className="flex items-center mt-2 space-x-2">
                                <Badge className="text-xs" style={{ 
                                  backgroundColor: `${getMasteryColor(principle.masteryLevel)}20`, 
                                  color: getMasteryColor(principle.masteryLevel), 
                                  borderColor: `${getMasteryColor(principle.masteryLevel)}40` 
                                }}>
                                  {principle.masteryLevel}
                                </Badge>
                                <Badge className="text-xs" style={{ 
                                  backgroundColor: 'rgba(201, 213, 221, 0.2)', 
                                  color: '#C9D5DD', 
                                  borderColor: 'rgba(201, 213, 221, 0.3)' 
                                }}>
                                  Week {principle.week}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant={principle.isCompleted ? "outline" : "default"}
                            disabled={!principle.isUnlocked}
                            size="sm"
                            style={principle.isCompleted ? {
                              backgroundColor: 'rgba(16, 185, 129, 0.2)',
                              borderColor: 'rgba(16, 185, 129, 0.3)',
                              color: '#10B981'
                            } : principle.isUnlocked ? {
                              background: 'linear-gradient(to right, #E0B848, #B08B18)',
                              color: 'black'
                            } : {
                              backgroundColor: 'rgba(189, 187, 187, 0.2)',
                              borderColor: 'rgba(189, 187, 187, 0.3)',
                              color: '#BDBBBB'
                            }}
                          >
                            {principle.isCompleted ? 'Review' : principle.isUnlocked ? 'Practice' : 'Locked'}
                          </Button>
                        </div>
                        
                        {principle.isUnlocked && (
                          <div className="mt-4 p-3 rounded border" style={{ 
                            backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                            borderColor: 'rgba(224, 184, 72, 0.2)' 
                          }}>
                            <p className="text-sm font-medium mb-1" style={{ color: '#E0B848' }}>
                              Practice Challenge:
                            </p>
                            <p className="text-sm mb-2" style={{ color: '#C9D5DD' }}>
                              {principle.practiceChallenge}
                            </p>
                            <div className="flex items-center text-xs" style={{ color: '#BDBBBB' }}>
                              <Brain className="w-3 h-3 mr-1" />
                              {principle.neuroscienceInsight}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default MonthlyProgression;
