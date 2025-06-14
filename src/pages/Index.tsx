
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Flame, 
  Zap, 
  Sprout, 
  Eye,
  Star,
  ChevronRight,
  Crown,
  Shield
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [consciousnessLevel, setConsciousnessLevel] = useState(73);

  const pillars = [
    {
      id: 1,
      title: "Sacred Team Conflict Mastery",
      description: "Transform team tensions into breakthrough clarity",
      icon: Flame,
      color: "from-red-500 to-orange-500",
      progress: 65,
      dailyChallenge: "Convert one team frustration into strategic opportunity"
    },
    {
      id: 2,
      title: "Antifragile Decision Architecture", 
      description: "Make powerful decisions under pressure",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      progress: 78,
      dailyChallenge: "Practice uncertainty training with incomplete information"
    },
    {
      id: 3,
      title: "Executive Burnout Recovery",
      description: "Maintain peak performance without depletion",
      icon: Sprout,
      color: "from-green-500 to-emerald-500", 
      progress: 42,
      dailyChallenge: "Complete your sacred energy audit and recovery protocol"
    },
    {
      id: 4,
      title: "Crisis Leadership Performance",
      description: "Thrive as an unshakeable leader during chaos",
      icon: Eye,
      color: "from-purple-500 to-indigo-500",
      progress: 55,
      dailyChallenge: "Strengthen unshakeable presence training"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sacred Geometry Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-gold-400 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-28 h-28 border border-gold-400 transform rotate-12 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-yellow-400 mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              Sacred Leadership
            </h1>
            <Crown className="w-8 h-8 text-yellow-400 ml-3" />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-purple-300 mb-4">
            Consciousness Platform
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Transform from reactive stress-leader into an antifragile consciousness master. 
            Your digital Ruthless Sanusi delivering precise wisdom when you need it most.
          </p>
          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-lg px-4 py-2">
            Divine Frequency Active
          </Badge>
        </div>

        {/* Morning Consciousness Check-in */}
        <Card className="mb-12 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/30">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-yellow-300 flex items-center justify-center">
              <Star className="w-6 h-6 mr-2" />
              Morning Consciousness Activation
              <Star className="w-6 h-6 ml-2" />
            </CardTitle>
            <CardDescription className="text-purple-200">
              Your daily sacred frequency check-in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-yellow-400 mb-2">{consciousnessLevel}%</div>
              <p className="text-lg text-purple-200">Nervous System Optimization</p>
              <Progress value={consciousnessLevel} className="w-full max-w-md mx-auto mt-4" />
            </div>
            
            <div className="bg-purple-800/30 rounded-lg p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-yellow-300 mb-3">Today's Divine Assignment:</h3>
              <p className="text-purple-100 text-lg leading-relaxed">
                Your consciousness state reads <span className="text-yellow-400 font-semibold">"Responsive & Clear"</span>. 
                Transform one team tension into breakthrough clarity today. Your frequency is set to 
                <span className="text-yellow-400 font-semibold"> 'Antifragile Wisdom'</span>.
              </p>
            </div>

            <Button 
              onClick={() => navigate('/assessment')}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold text-lg py-6"
            >
              <Shield className="w-5 h-5 mr-2" />
              Begin Sacred Assessment
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Four Pillars */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-yellow-300 mb-8">
            The Four Pillars of Conscious Leadership
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <Card 
                  key={pillar.id}
                  className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br from-slate-800/50 to-purple-900/30 border-purple-500/20 hover:border-yellow-500/40"
                  onClick={() => navigate(`/pillar/${pillar.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${pillar.color}`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                        {pillar.progress}% Complete
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-purple-100 group-hover:text-yellow-300 transition-colors">
                      {pillar.title}
                    </CardTitle>
                    <CardDescription className="text-purple-300">
                      {pillar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={pillar.progress} className="mb-4" />
                    <div className="bg-purple-800/20 rounded-lg p-4 border border-purple-500/10">
                      <p className="text-sm text-purple-200 font-medium mb-1">Today's Micro-Practice:</p>
                      <p className="text-purple-100">{pillar.dailyChallenge}</p>
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
            className="h-20 bg-red-900/20 hover:bg-red-900/40 border-red-500/30 text-red-200 hover:text-red-100"
            onClick={() => navigate('/emergency')}
          >
            <Flame className="w-6 h-6 mr-2" />
            Emergency Conflict Support
          </Button>
          
          <Button 
            variant="outline"
            className="h-20 bg-blue-900/20 hover:bg-blue-900/40 border-blue-500/30 text-blue-200 hover:text-blue-100"
            onClick={() => navigate('/decisions')}
          >
            <Zap className="w-6 h-6 mr-2" />
            Decision Clarity Scanner
          </Button>
          
          <Button 
            variant="outline"
            className="h-20 bg-green-900/20 hover:bg-green-900/40 border-green-500/30 text-green-200 hover:text-green-100"
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
