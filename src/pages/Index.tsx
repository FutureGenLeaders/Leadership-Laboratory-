
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import LevelSelection from "@/components/LevelSelection";
import { 
  Flame, 
  Zap, 
  Sprout, 
  Eye,
  Star,
  ChevronRight,
  Shield,
  Sun
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [consciousnessLevel, setConsciousnessLevel] = useState(73);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [showLevelSelection, setShowLevelSelection] = useState(false);

  const pillars = [
    {
      id: 1,
      title: "Sacred Team Conflict Mastery",
      description: "Transform team tensions into breakthrough clarity",
      icon: Flame,
      color: "from-red-500 to-red-600",
      progress: 65,
      dailyChallenge: "Convert one team frustration into strategic opportunity"
    },
    {
      id: 2,
      title: "Antifragile Decision Architecture", 
      description: "Make powerful decisions under pressure",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
      progress: 78,
      dailyChallenge: "Practice uncertainty training with incomplete information"
    },
    {
      id: 3,
      title: "Executive Burnout Recovery",
      description: "Maintain peak performance without depletion",
      icon: Sprout,
      color: "from-gray-400 to-gray-500", 
      progress: 42,
      dailyChallenge: "Complete your sacred energy audit and recovery protocol"
    },
    {
      id: 4,
      title: "Crisis Leadership Performance",
      description: "Thrive as an unshakeable leader during chaos",
      icon: Eye,
      color: "from-red-600 to-red-700",
      progress: 55,
      dailyChallenge: "Strengthen unshakeable presence training"
    }
  ];

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level);
    setShowLevelSelection(false);
    navigate('/morning-session', { state: { level } });
  };

  const getLevelInfo = () => {
    switch (selectedLevel) {
      case 1: return { name: "Strategic Focus", color: "#3B82F6" };
      case 2: return { name: "Advanced Leadership", color: "#EAB308" };
      case 3: return { name: "Mastery Mode", color: "#DC2626" };
      default: return { name: "Select Level", color: "#E0B848" };
    }
  };

  if (showLevelSelection) {
    return <LevelSelection onLevelSelect={handleLevelSelect} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Sacred Geometry Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-yellow-400 rotate-45 animate-pulse" style={{ borderColor: '#E0B848' }}></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-red-500 rounded-full animate-pulse delay-1000" style={{ borderColor: '#AD1E2D' }}></div>
        <div className="absolute bottom-32 left-1/3 w-28 h-28 border border-yellow-500 transform rotate-12 animate-pulse delay-2000" style={{ borderColor: '#B08B18' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">🔬</span>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent"
                style={{ background: `linear-gradient(to right, #E0B848, #B08B18, #E0B848)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              The Leadership Laboratory
            </h1>
            <span className="text-4xl ml-3">🔬</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: '#C9D5DD' }}>
            Where Pressure Becomes Performance
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: '#BDBBBB' }}>
            Transform from reactive crisis management into antifragile leadership mastery. 
            Your advanced leadership development platform delivering precision coaching and frameworks exactly when high-stakes decisions matter most.
          </p>
          <Badge className="text-lg px-4 py-2" style={{ backgroundColor: 'rgba(224, 184, 72, 0.2)', color: '#E0B848', borderColor: 'rgba(224, 184, 72, 0.3)' }}>
            Precision Mode Active
          </Badge>
        </div>

        {/* Level Selection Status */}
        {selectedLevel && (
          <div className="text-center mb-8">
            <Badge className="text-lg px-6 py-3" style={{ 
              backgroundColor: `${getLevelInfo().color}20`, 
              color: getLevelInfo().color, 
              borderColor: `${getLevelInfo().color}40` 
            }}>
              Current Path: {getLevelInfo().name}
            </Badge>
            <Button 
              variant="ghost" 
              onClick={() => setShowLevelSelection(true)}
              className="ml-4 text-sm"
              style={{ color: '#C9D5DD' }}
            >
              Change Level
            </Button>
          </div>
        )}

        {/* Morning Consciousness Check-in */}
        <Card className="mb-12 bg-gradient-to-r border" style={{ 
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))', 
          borderColor: 'rgba(173, 30, 45, 0.3)' 
        }}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center" style={{ color: '#E0B848' }}>
              <Star className="w-6 h-6 mr-2" />
              Leadership Performance Analysis
              <Star className="w-6 h-6 ml-2" />
            </CardTitle>
            <CardDescription style={{ color: '#C9D5DD' }}>
              Your daily precision leadership assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2" style={{ color: '#E0B848' }}>{consciousnessLevel}%</div>
              <p className="text-lg" style={{ color: '#C9D5DD' }}>Decision-Making Optimization</p>
              <Progress value={consciousnessLevel} className="w-full max-w-md mx-auto mt-4" />
            </div>
            
            <div className="rounded-lg p-6 border" style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.3)', 
              borderColor: 'rgba(173, 30, 45, 0.2)' 
            }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#E0B848' }}>Today's Performance Protocol:</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#C9D5DD' }}>
                Your leadership assessment reads <span className="font-semibold" style={{ color: '#E0B848' }}>"High-Performance Ready"</span>. 
                {selectedLevel ? (
                  <>Transform one team tension into breakthrough clarity today using your <span className="font-semibold" style={{ color: getLevelInfo().color }}>{getLevelInfo().name}</span> protocols.</>
                ) : (
                  <>Begin with morning activation to calibrate your system for <span className="font-semibold" style={{ color: '#E0B848' }}>'Antifragile Excellence'</span>.</>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => selectedLevel ? navigate('/morning-session', { state: { level: selectedLevel } }) : setShowLevelSelection(true)}
                className="font-semibold text-lg py-6 text-black"
                style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
              >
                <Sun className="w-5 h-5 mr-2" />
                Morning Session
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => selectedLevel ? navigate('/afternoon-session', { state: { level: selectedLevel } }) : setShowLevelSelection(true)}
                className="font-semibold text-lg py-6"
                style={{ 
                  backgroundColor: 'rgba(224, 184, 72, 0.1)', 
                  borderColor: 'rgba(224, 184, 72, 0.3)',
                  color: '#E0B848'
                }}
              >
                <Zap className="w-5 h-5 mr-2" />
                Afternoon Reset
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => selectedLevel ? navigate('/evening-session', { state: { level: selectedLevel } }) : setShowLevelSelection(true)}
                className="font-semibold text-lg py-6"
                style={{ 
                  backgroundColor: 'rgba(173, 30, 45, 0.1)', 
                  borderColor: 'rgba(173, 30, 45, 0.3)',
                  color: '#AD1E2D'
                }}
              >
                <Star className="w-5 h-5 mr-2" />
                Evening Integration
              </Button>
            </div>

            {!selectedLevel && (
              <Button 
                onClick={() => setShowLevelSelection(true)}
                className="w-full font-semibold text-lg py-6 text-black"
                style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
              >
                <Shield className="w-5 h-5 mr-2" />
                Choose Your Leadership Path
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Four Pillars */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#E0B848' }}>
            The Four Pillars of Leadership Excellence
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <Card 
                  key={pillar.id}
                  className="group hover:scale-105 transition-all duration-300 cursor-pointer border"
                  style={{ 
                    background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
                    borderColor: 'rgba(173, 30, 45, 0.2)' 
                  }}
                  onClick={() => navigate(`/pillar/${pillar.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${pillar.color}`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="text-sm" style={{ 
                        backgroundColor: 'rgba(224, 184, 72, 0.2)', 
                        color: '#E0B848', 
                        borderColor: 'rgba(224, 184, 72, 0.3)' 
                      }}>
                        {pillar.progress}% Complete
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-yellow-300 transition-colors" style={{ color: '#C9D5DD' }}>
                      {pillar.title}
                    </CardTitle>
                    <CardDescription style={{ color: '#BDBBBB' }}>
                      {pillar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={pillar.progress} className="mb-4" />
                    <div className="rounded-lg p-4 border" style={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                      borderColor: 'rgba(173, 30, 45, 0.1)' 
                    }}>
                      <p className="text-sm font-medium mb-1" style={{ color: '#C9D5DD' }}>Today's Precision Practice:</p>
                      <p style={{ color: '#BDBBBB' }}>{pillar.dailyChallenge}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Button 
            variant="outline" 
            className="h-20 transition-colors"
            style={{ 
              backgroundColor: 'rgba(173, 30, 45, 0.2)', 
              borderColor: 'rgba(173, 30, 45, 0.3)',
              color: '#AD1E2D'
            }}
            onClick={() => navigate('/emergency')}
          >
            <Flame className="w-6 h-6 mr-2" />
            Emergency Conflict Support
          </Button>
          
          <Button 
            variant="outline"
            className="h-20 transition-colors"
            style={{ 
              backgroundColor: 'rgba(224, 184, 72, 0.2)', 
              borderColor: 'rgba(224, 184, 72, 0.3)',
              color: '#E0B848'
            }}
            onClick={() => navigate('/decisions')}
          >
            <Zap className="w-6 h-6 mr-2" />
            Decision Clarity Scanner
          </Button>
          
          <Button 
            variant="outline"
            className="h-20 transition-colors"
            style={{ 
              backgroundColor: 'rgba(201, 213, 221, 0.2)', 
              borderColor: 'rgba(201, 213, 221, 0.3)',
              color: '#C9D5DD'
            }}
            onClick={() => navigate('/recovery')}
          >
            <Sprout className="w-6 h-6 mr-2" />
            Energy Recovery Protocol
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
