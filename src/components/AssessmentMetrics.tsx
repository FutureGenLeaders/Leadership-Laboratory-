
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Brain,
  Activity,
  Target,
  TrendingUp,
  Zap,
  Heart,
  Eye,
  Shield,
  BarChart3,
  Calendar,
  Star
} from "lucide-react";

const AssessmentMetrics = () => {
  const [currentWeek] = useState(2); // Week 2 of current month
  const [metrics, setMetrics] = useState({
    businessPerformance: {
      decisionQuality: 78,
      teamEngagement: 85,
      crisisResponse: 72,
      strategicClarity: 80
    },
    consciousnessDevelopment: {
      presenceUnderPressure: 74,
      emotionalRegulation: 82,
      intuitiveAccuracy: 69,
      nervousSystemCoherence: 73
    }
  });

  const getOverallScore = () => {
    const businessAvg = Object.values(metrics.businessPerformance).reduce((a, b) => a + b, 0) / 4;
    const consciousnessAvg = Object.values(metrics.consciousnessDevelopment).reduce((a, b) => a + b, 0) / 4;
    return Math.round((businessAvg + consciousnessAvg) / 2);
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 85) return { level: "Peak Performance", color: "#E0B848", bg: "rgba(224, 184, 72, 0.1)" };
    if (score >= 70) return { level: "High Performance", color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" };
    if (score >= 55) return { level: "Developing", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)" };
    return { level: "Foundation Building", color: "#EF4444", bg: "rgba(239, 68, 68, 0.1)" };
  };

  const overallScore = getOverallScore();
  const performanceLevel = getPerformanceLevel(overallScore);

  const weeklyInsights = [
    {
      week: 1,
      focus: "Nervous System Regulation",
      insight: "Established baseline coherence patterns",
      improvement: "+12% in stress response"
    },
    {
      week: 2,
      focus: "Decision Architecture",
      insight: "Improved clarity under uncertainty",
      improvement: "+8% decision accuracy"
    },
    {
      week: 3,
      focus: "Team Dynamics Mastery",
      insight: "Enhanced conflict resolution",
      improvement: "Projected +15% engagement"
    },
    {
      week: 4,
      focus: "Crisis Leadership",
      insight: "Unshakeable presence training",
      improvement: "Projected +20% crisis response"
    }
  ];

  return (
    <Card className="border" style={{ 
      background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))',
      borderColor: 'rgba(224, 184, 72, 0.3)' 
    }}>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge className="flex items-center" style={{ 
            backgroundColor: 'rgba(224, 184, 72, 0.2)', 
            color: '#E0B848', 
            borderColor: 'rgba(224, 184, 72, 0.3)' 
          }}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Performance Analytics
          </Badge>
          <div className="flex items-center" style={{ color: performanceLevel.color }}>
            <Brain className="w-5 h-5 mr-2" />
            <span className="text-lg font-semibold">{overallScore}%</span>
          </div>
        </div>
        
        <CardTitle className="text-2xl" style={{ color: '#E0B848' }}>
          Assessment Metrics Dashboard
        </CardTitle>
        <CardDescription className="text-lg" style={{ color: '#C9D5DD' }}>
          Real-time tracking of business performance and consciousness development
        </CardDescription>
        
        <div className="mt-4 p-4 rounded-lg border" style={{ 
          backgroundColor: performanceLevel.bg, 
          borderColor: `${performanceLevel.color}40` 
        }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold" style={{ color: performanceLevel.color }}>
                Current Performance Level: {performanceLevel.level}
              </h3>
              <p className="text-sm mt-1" style={{ color: '#C9D5DD' }}>
                Composite score across all leadership dimensions
              </p>
            </div>
            <Progress value={overallScore} className="w-32" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Business Performance Metrics */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center" style={{ color: '#E0B848' }}>
            <Target className="w-5 h-5 mr-2" />
            Business Performance Indicators
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border" style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.2)', 
              borderColor: 'rgba(173, 30, 45, 0.2)' 
            }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: '#C9D5DD' }}>Decision Quality</span>
                <span className="font-semibold" style={{ color: '#E0B848' }}>
                  {metrics.businessPerformance.decisionQuality}%
                </span>
              </div>
              <Progress value={metrics.businessPerformance.decisionQuality} />
              <p className="text-xs mt-1" style={{ color: '#BDBBBB' }}>
                Accuracy and speed under pressure
              </p>
            </div>
            
            <div className="p-4 rounded-lg border" style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.2)', 
              borderColor: 'rgba(173, 30, 45, 0.2)' 
            }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: '#C9D5DD' }}>Team Engagement</span>
                <span className="font-semibold" style={{ color: '#E0B848' }}>
                  {metrics.businessPerformance.teamEngagement}%
                </span>
              </div>
              <Progress value={metrics.businessPerformance.teamEngagement} />
              <p className="text-xs mt-1" style={{ color: '#BDBBBB' }}>
                Influence and inspiration metrics
              </p>
            </div>
            
            <div className="p-4 rounded-lg border" style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.2)', 
              borderColor: 'rgba(173, 30, 45, 0.2)' 
            }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: '#C9D5DD' }}>Crisis Response</span>
                <span className="font-semibold" style={{ color: '#E0B848' }}>
                  {metrics.businessPerformance.crisisResponse}%
                </span>
              </div>
              <Progress value={metrics.businessPerformance.crisisResponse} />
              <p className="text-xs mt-1" style={{ color: '#BDBBBB' }}>
                Performance during chaos
              </p>
            </div>
            
            <div className="p-4 rounded-lg border" style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.2)', 
              borderColor: 'rgba(173, 30, 45, 0.2)' 
            }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: '#C9D5DD' }}>Strategic Clarity</span>
                <span className="font-semibold" style={{ color: '#E0B848' }}>
                  {metrics.businessPerformance.strategicClarity}%
                </span>
              </div>
              <Progress value={metrics.businessPerformance.strategicClarity} />
              <p className="text-xs mt-1" style={{ color: '#BDBBBB' }}>
                Long-term vision execution
              </p>
            </div>
          </div>
        </div>

        {/* Consciousness Development Metrics */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center" style={{ color: '#E0B848' }}>
            <Brain className="w-5 h-5 mr-2" />
            Consciousness Development Indicators
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border" style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.2)', 
              borderColor: 'rgba(173, 30, 45, 0.2)' 
            }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: '#C9D5DD' }}>Presence Under Pressure</span>
                <span className="font-semibold" style={{ color: '#E0B848' }}>
                  {metrics.consciousnessDevelopment.presenceUnderPressure}%
                </span>
              </div>
              <Progress value={metrics.consciousnessDevelopment.presenceUnderPressure} />
              <p className="text-xs mt-1" style={{ color: '#BDBBBB' }}>
                Centeredness during intensity
              </p>
            </div>
            
            <div className="p-4 rounded-lg border" style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.2)', 
              borderColor: 'rgba(173, 30, 45, 0.2)' 
            }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: '#C9D5DD' }}>Emotional Regulation</span>
                <span className="font-semibold" style={{ color: '#E0B848' }}>
                  {metrics.consciousnessDevelopment.emotionalRegulation}%
                </span>
              </div>
              <Progress value={metrics.consciousnessDevelopment.emotionalRegulation} />
              <p className="text-xs mt-1" style={{ color: '#BDBBBB' }}>
                Nervous system coherence
              </p>
            </div>
            
            <div className="p-4 rounded-lg border" style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.2)', 
              borderColor: 'rgba(173, 30, 45, 0.2)' 
            }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: '#C9D5DD' }}>Intuitive Accuracy</span>
                <span className="font-semibold" style={{ color: '#E0B848' }}>
                  {metrics.consciousnessDevelopment.intuitiveAccuracy}%
                </span>
              </div>
              <Progress value={metrics.consciousnessDevelopment.intuitiveAccuracy} />
              <p className="text-xs mt-1" style={{ color: '#BDBBBB' }}>
                Pattern recognition beyond logic
              </p>
            </div>
            
            <div className="p-4 rounded-lg border" style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.2)', 
              borderColor: 'rgba(173, 30, 45, 0.2)' 
            }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: '#C9D5DD' }}>Nervous System Coherence</span>
                <span className="font-semibold" style={{ color: '#E0B848' }}>
                  {metrics.consciousnessDevelopment.nervousSystemCoherence}%
                </span>
              </div>
              <Progress value={metrics.consciousnessDevelopment.nervousSystemCoherence} />
              <p className="text-xs mt-1" style={{ color: '#BDBBBB' }}>
                Heart-brain synchronization
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Progression Insights */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center" style={{ color: '#E0B848' }}>
            <TrendingUp className="w-5 h-5 mr-2" />
            Monthly Progression Analytics
          </h3>
          
          <div className="grid gap-3">
            {weeklyInsights.map((week, index) => {
              const isComplete = week.week < currentWeek;
              const isCurrent = week.week === currentWeek;
              
              return (
                <div 
                  key={week.week}
                  className={`p-4 rounded-lg border ${isCurrent ? 'ring-2 ring-red-500' : ''}`}
                  style={{ 
                    backgroundColor: isComplete 
                      ? 'rgba(224, 184, 72, 0.1)' 
                      : isCurrent 
                      ? 'rgba(173, 30, 45, 0.1)' 
                      : 'rgba(0, 0, 0, 0.2)',
                    borderColor: isComplete 
                      ? 'rgba(224, 184, 72, 0.3)' 
                      : isCurrent 
                      ? 'rgba(173, 30, 45, 0.3)' 
                      : 'rgba(201, 213, 221, 0.2)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        isComplete ? 'bg-green-500' : isCurrent ? 'bg-red-500' : 'bg-gray-500'
                      }`}>
                        {isComplete ? (
                          <Star className="w-4 h-4 text-white fill-current" />
                        ) : (
                          <span className="text-sm font-bold text-white">{week.week}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold" style={{ color: '#C9D5DD' }}>
                          Week {week.week}: {week.focus}
                        </h4>
                        <p className="text-sm" style={{ color: '#BDBBBB' }}>{week.insight}</p>
                      </div>
                    </div>
                    <Badge 
                      className="text-xs"
                      style={{ 
                        backgroundColor: isComplete ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)', 
                        color: isComplete ? '#10B981' : '#F59E0B', 
                        borderColor: isComplete ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)' 
                      }}
                    >
                      {week.improvement}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Button 
          className="w-full font-semibold text-lg py-6 text-black"
          style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
        >
          <Activity className="w-5 h-5 mr-2" />
          Update Assessment Metrics
        </Button>
      </CardContent>
    </Card>
  );
};

export default AssessmentMetrics;
