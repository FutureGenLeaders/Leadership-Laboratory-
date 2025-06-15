import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Moon,
  Heart,
  Flower,
  Waves,
  Eye,
  Sparkles,
  Circle,
  Infinity,
  Flower2,
  Star
} from "lucide-react";

const DivineFeminine = () => {
  const [currentCycle] = useState("Expansion Phase"); // Could be: Reflection, Integration, Expansion, Manifestation
  const [intuitionLevel] = useState(82);

  const feminineWisdomPillars = [
    {
      id: 1,
      title: "Intuitive Intelligence",
      description: "Access wisdom beyond logical analysis through receptive awareness",
      icon: Eye,
      color: "from-purple-500 to-purple-600",
      progress: 75,
      practice: "Practice 5-minute receptive listening with no agenda today",
      wisdom: "The feminine receives information through the field of connection"
    },
    {
      id: 2,
      title: "Cyclical Leadership",
      description: "Honor natural rhythms and seasonal thinking in decision-making",
      icon: Moon,
      color: "from-blue-400 to-blue-500",
      progress: 68,
      practice: "Align one major decision with your natural energy cycle today",
      wisdom: "Linear time serves strategy; cyclical time serves sustainability"
    },
    {
      id: 3,
      title: "Collaborative Creation",
      description: "Lead through inclusive co-creation rather than hierarchical control",
      icon: Flower,
      color: "from-pink-400 to-pink-500",
      progress: 71,
      practice: "Facilitate one decision through collective wisdom gathering",
      wisdom: "The feminine creates through relationship and connection"
    },
    {
      id: 4,
      title: "Flow State Mastery",
      description: "Navigate through receptivity, allowing, and organic unfolding",
      icon: Waves,
      color: "from-teal-400 to-teal-500",
      progress: 79,
      practice: "Practice 'wu wei' - non-forcing action in one challenging situation",
      wisdom: "The feminine flows around obstacles rather than forcing through them"
    }
  ];

  const getCurrentPhaseInsight = () => {
    switch (currentCycle) {
      case "Reflection Phase":
        return {
          color: "#8B5CF6",
          insight: "This is your time for deep inner listening and wisdom gathering. Avoid major decisions.",
          action: "Practice receptive meditation and journaling"
        };
      case "Integration Phase":
        return {
          color: "#06B6D4",
          insight: "Synthesize recent learnings into new leadership patterns. Perfect for strategic planning.",
          action: "Integrate intuitive insights with logical analysis"
        };
      case "Expansion Phase":
        return {
          color: "#EC4899",
          insight: "Your creative and manifestation energy is at its peak. Take inspired action.",
          action: "Launch new initiatives with confidence and flow"
        };
      case "Manifestation Phase":
        return {
          color: "#10B981",
          insight: "Focus on bringing visions into concrete reality through sustained, flowing effort.",
          action: "Execute plans with feminine persistence and grace"
        };
      default:
        return getCurrentPhaseInsight();
    }
  };

  const phaseInsight = getCurrentPhaseInsight();

  return (
    <Card className="border" style={{ 
      background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(236, 72, 153, 0.1))',
      borderColor: 'rgba(236, 72, 153, 0.3)' 
    }}>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge className="flex items-center" style={{ 
            backgroundColor: 'rgba(236, 72, 153, 0.2)', 
            color: '#EC4899', 
            borderColor: 'rgba(236, 72, 153, 0.3)' 
          }}>
            <Heart className="w-4 h-4 mr-2" />
            Divine Feminine Integration
          </Badge>
          <div className="flex items-center" style={{ color: '#EC4899' }}>
            <Sparkles className="w-5 h-5 mr-2" />
            <span className="text-lg font-semibold">{intuitionLevel}%</span>
          </div>
        </div>
        
        <CardTitle className="text-2xl flex items-center" style={{ color: '#EC4899' }}>
          <Flower2 className="w-6 h-6 mr-2" />
          Sacred Feminine Leadership Wisdom
          <Moon className="w-6 h-6 ml-2" />
        </CardTitle>
        <CardDescription className="text-lg" style={{ color: '#C9D5DD' }}>
          Integrate receptive intelligence and cyclical wisdom into your leadership mastery
        </CardDescription>
        
        <div className="mt-4 p-4 rounded-lg border" style={{ 
          backgroundColor: `${phaseInsight.color}20`, 
          borderColor: `${phaseInsight.color}40` 
        }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold flex items-center" style={{ color: phaseInsight.color }}>
                <Circle className="w-4 h-4 mr-2" />
                Current Cycle: {currentCycle}
              </h3>
              <p className="text-sm mt-1" style={{ color: '#C9D5DD' }}>
                {phaseInsight.insight}
              </p>
              <p className="text-xs mt-2 font-medium" style={{ color: phaseInsight.color }}>
                Today's Practice: {phaseInsight.action}
              </p>
            </div>
            <Progress value={intuitionLevel} className="w-32" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Feminine Wisdom Pillars */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center" style={{ color: '#EC4899' }}>
            <Infinity className="w-5 h-5 mr-2" />
            The Four Sacred Principles
          </h3>
          
          <div className="grid gap-4">
            {feminineWisdomPillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div 
                  key={pillar.id}
                  className="p-4 rounded-lg border hover:scale-102 transition-all duration-300"
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                    borderColor: 'rgba(236, 72, 153, 0.2)' 
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full bg-gradient-to-r ${pillar.color} mr-3`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold" style={{ color: '#C9D5DD' }}>
                          {pillar.title}
                        </h4>
                        <p className="text-sm" style={{ color: '#BDBBBB' }}>
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                    <Badge className="text-xs" style={{ 
                      backgroundColor: 'rgba(236, 72, 153, 0.2)', 
                      color: '#EC4899', 
                      borderColor: 'rgba(236, 72, 153, 0.3)' 
                    }}>
                      {pillar.progress}%
                    </Badge>
                  </div>
                  
                  <Progress value={pillar.progress} className="mb-3" />
                  
                  <div className="space-y-2">
                    <div className="p-2 rounded border" style={{ 
                      backgroundColor: 'rgba(236, 72, 153, 0.1)', 
                      borderColor: 'rgba(236, 72, 153, 0.2)' 
                    }}>
                      <p className="text-xs font-medium" style={{ color: '#EC4899' }}>
                        Today's Practice:
                      </p>
                      <p className="text-xs" style={{ color: '#C9D5DD' }}>
                        {pillar.practice}
                      </p>
                    </div>
                    
                    <div className="p-2 rounded border" style={{ 
                      backgroundColor: 'rgba(139, 92, 246, 0.1)', 
                      borderColor: 'rgba(139, 92, 246, 0.2)' 
                    }}>
                      <p className="text-xs font-medium flex items-center" style={{ color: '#8B5CF6' }}>
                        <Star className="w-3 h-3 mr-1" />
                        Sacred Wisdom:
                      </p>
                      <p className="text-xs" style={{ color: '#C9D5DD' }}>
                        {pillar.wisdom}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Integration Practices */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button 
            className="h-20 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(236, 72, 153, 0.2)', 
              borderColor: 'rgba(236, 72, 153, 0.3)',
              color: '#EC4899',
              border: '1px solid'
            }}
          >
            <Heart className="w-6 h-6 mb-2" />
            <span className="font-semibold">Intuitive Council</span>
            <span className="text-sm opacity-80">Receptive Decision Making</span>
          </Button>
          
          <Button 
            className="h-20 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(139, 92, 246, 0.2)', 
              borderColor: 'rgba(139, 92, 246, 0.3)',
              color: '#8B5CF6',
              border: '1px solid'
            }}
          >
            <Moon className="w-6 h-6 mb-2" />
            <span className="font-semibold">Cyclical Planning</span>
            <span className="text-sm opacity-80">Natural Rhythm Strategy</span>
          </Button>
          
          <Button 
            className="h-20 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(6, 182, 212, 0.2)', 
              borderColor: 'rgba(6, 182, 212, 0.3)',
              color: '#06B6D4',
              border: '1px solid'
            }}
          >
            <Waves className="w-6 h-6 mb-2" />
            <span className="font-semibold">Flow State Leadership</span>
            <span className="text-sm opacity-80">Wu Wei Management</span>
          </Button>
          
          <Button 
            className="h-20 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(16, 185, 129, 0.2)', 
              borderColor: 'rgba(16, 185, 129, 0.3)',
              color: '#10B981',
              border: '1px solid'
            }}
          >
            <Flower className="w-6 h-6 mb-2" />
            <span className="font-semibold">Collaborative Creation</span>
            <span className="text-sm opacity-80">Co-Creative Leadership</span>
          </Button>
        </div>

        <Button 
          className="w-full font-semibold text-lg py-6"
          style={{ background: 'linear-gradient(to right, #EC4899, #8B5CF6)' }}
        >
          <Heart className="w-5 h-5 mr-2" />
          Begin Sacred Feminine Integration Practice
          <Sparkles className="w-5 h-5 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default DivineFeminine;
