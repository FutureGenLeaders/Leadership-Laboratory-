
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Zap, 
  Crown,
  ChevronRight,
  Star
} from "lucide-react";

interface LevelSelectionProps {
  onLevelSelect: (level: number) => void;
}

const LevelSelection = ({ onLevelSelect }: LevelSelectionProps) => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const levels = [
    {
      id: 1,
      title: "Strategic Focus",
      subtitle: "Professional Development",
      description: "Perfect for emerging leaders and professionals building foundational excellence",
      icon: Target,
      color: "from-blue-500 to-blue-600",
      features: [
        "Daily clarity protocols",
        "Strategic decision frameworks",
        "Pressure management basics",
        "Excellence standards"
      ],
      ideal: "Directors, Managers, Team Leads"
    },
    {
      id: 2,
      title: "Advanced Leadership",
      subtitle: "Executive Mastery",
      description: "Designed for experienced executives ready to eliminate reactive patterns",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
      features: [
        "Authentic leadership presence",
        "Organizational truth alignment",
        "Principle-based decision making",
        "Strategic will execution"
      ],
      ideal: "VPs, Senior Directors, Executives"
    },
    {
      id: 3,
      title: "Mastery Mode",
      subtitle: "Transformational Leadership",
      description: "For senior leaders channeling higher purpose through business excellence",
      icon: Crown,
      color: "from-red-500 to-red-600",
      features: [
        "Uncompromising mastery protocols",
        "Universal truth alignment",
        "Sacred focus and divine timing",
        "Breakthrough performance"
      ],
      ideal: "C-Suite, Founders, Transformation Leaders"
    }
  ];

  const handleConfirmSelection = () => {
    if (selectedLevel) {
      onLevelSelect(selectedLevel);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">🔬</span>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              Choose Your Development Path
            </h1>
            <span className="text-4xl ml-3">🔬</span>
          </div>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#C9D5DD' }}>
            Select the leadership level that matches your current role and readiness for transformation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {levels.map((level) => {
            const IconComponent = level.icon;
            const isSelected = selectedLevel === level.id;
            
            return (
              <Card 
                key={level.id}
                className={`cursor-pointer transition-all duration-300 border-2 ${
                  isSelected 
                    ? 'border-yellow-400 shadow-lg shadow-yellow-400/20 scale-105' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                style={{ 
                  background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
                }}
                onClick={() => setSelectedLevel(level.id)}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full bg-gradient-to-r ${level.color}`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl" style={{ color: '#E0B848' }}>
                    {level.title}
                  </CardTitle>
                  <CardDescription className="text-lg font-medium" style={{ color: '#C9D5DD' }}>
                    {level.subtitle}
                  </CardDescription>
                  <p className="text-sm mt-2" style={{ color: '#BDBBBB' }}>
                    {level.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge className="w-full justify-center" style={{ 
                    backgroundColor: 'rgba(224, 184, 72, 0.2)', 
                    color: '#E0B848', 
                    borderColor: 'rgba(224, 184, 72, 0.3)' 
                  }}>
                    {level.ideal}
                  </Badge>
                  
                  <div className="space-y-2">
                    {level.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm" style={{ color: '#C9D5DD' }}>
                        <Star className="w-3 h-3 mr-2 text-yellow-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Progress value={level.id * 33} className="mt-4" />
                  <p className="text-xs text-center" style={{ color: '#BDBBBB' }}>
                    Depth Level: {level.id * 33}%
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedLevel && (
          <div className="text-center">
            <Button 
              onClick={handleConfirmSelection}
              className="font-semibold text-lg px-8 py-6 text-black"
              style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
            >
              Begin {levels[selectedLevel - 1].title} Journey
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelSelection;
