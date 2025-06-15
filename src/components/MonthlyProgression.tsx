
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  Star,
  Target,
  ChevronRight,
  Brain,
  Compass,
  Trophy
} from "lucide-react";
import { universalPrinciples, getCurrentMonthTheme, getMonthlyPrinciples } from "@/data/universalPrinciples";

const MonthlyProgression = () => {
  const [currentMonth] = useState(1); // This would come from user progress data
  const [completedPrinciples] = useState([1, 2, 3]); // This would come from user progress
  
  const monthlyPrinciples = getMonthlyPrinciples(currentMonth);
  const monthTheme = getCurrentMonthTheme(currentMonth);
  const completionPercentage = (completedPrinciples.length / monthlyPrinciples.length) * 100;

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
            <Calendar className="w-4 h-4 mr-2" />
            Month {currentMonth} of 12
          </Badge>
          <div className="flex items-center" style={{ color: '#E0B848' }}>
            <Brain className="w-5 h-5 mr-2" />
            <span className="text-lg font-semibold">{Math.round(completionPercentage)}%</span>
          </div>
        </div>
        
        <CardTitle className="text-2xl" style={{ color: '#E0B848' }}>
          {monthTheme}
        </CardTitle>
        <CardDescription className="text-lg" style={{ color: '#C9D5DD' }}>
          Universal principles discovered by peak performers throughout history
        </CardDescription>
        
        <Progress value={completionPercentage} className="mt-4" />
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {monthlyPrinciples.map((principle) => {
            const isCompleted = completedPrinciples.includes(principle.id);
            const isCurrent = principle.id === Math.max(...completedPrinciples) + 1;
            
            return (
              <Card 
                key={principle.id}
                className={`border transition-all duration-300 ${isCurrent ? 'ring-2' : ''}`}
                style={{ 
                  backgroundColor: isCompleted 
                    ? 'rgba(224, 184, 72, 0.1)' 
                    : isCurrent 
                    ? 'rgba(173, 30, 45, 0.1)' 
                    : 'rgba(0, 0, 0, 0.2)',
                  borderColor: isCompleted 
                    ? 'rgba(224, 184, 72, 0.3)' 
                    : isCurrent 
                    ? 'rgba(173, 30, 45, 0.3)' 
                    : 'rgba(201, 213, 221, 0.2)',
                  ringColor: isCurrent ? '#AD1E2D' : 'transparent'
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        isCompleted ? 'bg-green-500' : isCurrent ? 'bg-red-500' : 'bg-gray-500'
                      }`}>
                        {isCompleted ? (
                          <Star className="w-4 h-4 text-white fill-current" />
                        ) : (
                          <span className="text-sm font-bold text-white">{principle.id}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg" style={{ color: '#C9D5DD' }}>
                          {principle.title}
                        </h3>
                        <p className="text-sm" style={{ color: '#BDBBBB' }}>
                          Week {principle.week} Focus
                        </p>
                      </div>
                    </div>
                    {isCurrent && (
                      <Badge style={{ 
                        backgroundColor: 'rgba(173, 30, 45, 0.2)', 
                        color: '#AD1E2D', 
                        borderColor: 'rgba(173, 30, 45, 0.3)' 
                      }}>
                        Current
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm mb-3" style={{ color: '#C9D5DD' }}>
                    {principle.description}
                  </p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start">
                      <Target className="w-3 h-3 mr-2 mt-0.5" style={{ color: '#E0B848' }} />
                      <span style={{ color: '#BDBBBB' }}>{principle.businessApplication}</span>
                    </div>
                    <div className="flex items-start">
                      <Compass className="w-3 h-3 mr-2 mt-0.5" style={{ color: '#E0B848' }} />
                      <span style={{ color: '#BDBBBB' }}>{principle.universalPattern}</span>
                    </div>
                  </div>
                  
                  {isCurrent && (
                    <Button 
                      className="w-full mt-4 text-black"
                      style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Begin This Principle
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyProgression;
