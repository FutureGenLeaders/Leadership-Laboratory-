
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  Flame,
  Zap,
  Sprout,
  Eye,
  Brain,
  Activity,
  Target,
  CheckCircle,
  Lock
} from "lucide-react";

const PillarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const pillars = {
    "1": {
      title: "Nervous System Team Dynamics",
      description: "Transform team tensions through neuroscience-based conflict resolution",
      icon: Flame,
      color: "#AD1E2D",
      progress: 65,
      modules: [
        { title: "Vagal Tone Assessment", description: "Measure nervous system regulation capacity", completed: true },
        { title: "Conflict Regulation Protocol", description: "Stay regulated during team tensions", completed: true },
        { title: "Mirror Neuron Training", description: "Influence team energy through your presence", completed: false },
        { title: "Advanced De-escalation", description: "Neuroscience-based conflict resolution", completed: false }
      ],
      currentChallenge: "Practice regulated response training with one challenging team member",
      neuroscienceInsight: "Vagal tone optimization reduces cortisol during conflict by 73%"
    },
    "2": {
      title: "Cognitive Load Decision Architecture",
      description: "Peak performance decision-making under pressure using brain optimization",
      icon: Zap,
      color: "#E0B848",
      progress: 78,
      modules: [
        { title: "Cognitive Load Assessment", description: "Measure decision-making capacity", completed: true },
        { title: "Uncertainty Training Protocol", description: "Make decisions with incomplete information", completed: true },
        { title: "Pressure Decision Matrix", description: "Optimize choices under stress", completed: true },
        { title: "Strategic Thinking Enhancement", description: "Prefrontal cortex optimization", completed: false }
      ],
      currentChallenge: "Execute uncertainty training protocol with incomplete information",
      neuroscienceInsight: "Prefrontal cortex regulation enhances strategic thinking by 340%"
    },
    "3": {
      title: "Executive Nervous System Recovery",
      description: "Maintain peak cognitive performance without burnout using neuroscience protocols",
      icon: Sprout,
      color: "#C9D5DD",
      progress: 42,
      modules: [
        { title: "Energy Assessment Protocol", description: "Measure cognitive and emotional reserves", completed: true },
        { title: "Parasympathetic Activation", description: "Engage rest-and-digest response", completed: false },
        { title: "Recovery Optimization", description: "Systematic energy restoration", completed: false },
        { title: "Burnout Prevention Matrix", description: "Sustainable peak performance", completed: false }
      ],
      currentChallenge: "Complete nervous system recovery audit and optimization protocol",
      neuroscienceInsight: "Parasympathetic activation restores executive function by 265%"
    },
    "4": {
      title: "Crisis Nervous System Performance",
      description: "Optimal brain function during chaos through regulated leadership presence",
      icon: Eye,
      color: "#AD1E2D",
      progress: 55,
      modules: [
        { title: "Crisis State Assessment", description: "Measure performance under pressure", completed: true },
        { title: "Unshakeable Presence Training", description: "Maintain regulation in chaos", completed: true },
        { title: "Crisis Decision Protocols", description: "Optimal choices during emergencies", completed: false },
        { title: "Team Stability Leadership", description: "Regulate others through your presence", completed: false }
      ],
      currentChallenge: "Practice unshakeable nervous system training under simulated pressure",
      neuroscienceInsight: "Coherent heart-brain patterns enhance decision quality by 280%"
    }
  };

  const pillar = pillars[id as keyof typeof pillars];
  
  if (!pillar) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#C9D5DD' }}>Pillar Not Found</h1>
          <Button onClick={() => navigate('/')} style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = pillar.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="container mx-auto max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
          style={{ color: '#C9D5DD' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <Card className="mb-8 border" style={{ 
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
          borderColor: 'rgba(173, 30, 45, 0.3)' 
        }}>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <IconComponent className="w-12 h-12 mr-3" style={{ color: pillar.color }} />
              <Badge className="text-lg px-4 py-2" style={{ 
                backgroundColor: `${pillar.color}20`, 
                color: pillar.color, 
                borderColor: `${pillar.color}40` 
              }}>
                {pillar.progress}% Complete
              </Badge>
            </div>
            <CardTitle className="text-3xl mb-4" style={{ color: pillar.color }}>
              {pillar.title}
            </CardTitle>
            <CardDescription className="text-lg" style={{ color: '#C9D5DD' }}>
              {pillar.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={pillar.progress} className="mb-4" />
            <div className="text-center">
              <p className="text-sm" style={{ color: '#BDBBBB' }}>
                {pillar.modules.filter(m => m.completed).length} of {pillar.modules.length} modules completed
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Current Challenge */}
        <Card className="mb-8 border" style={{ 
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))',
          borderColor: 'rgba(224, 184, 72, 0.3)' 
        }}>
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: '#E0B848' }}>
              <Target className="w-6 h-6 mr-2" />
              Today's Neural Training Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4" style={{ color: '#C9D5DD' }}>
              {pillar.currentChallenge}
            </p>
            <div className="p-4 rounded border" style={{ 
              backgroundColor: 'rgba(224, 184, 72, 0.1)', 
              borderColor: 'rgba(224, 184, 72, 0.2)' 
            }}>
              <div className="flex items-center text-sm" style={{ color: '#E0B848' }}>
                <Brain className="w-4 h-4 mr-2" />
                <strong>Neuroscience Insight:</strong> {pillar.neuroscienceInsight}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Modules */}
        <Card className="mb-8 border" style={{ 
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(201, 213, 221, 0.1))',
          borderColor: 'rgba(201, 213, 221, 0.3)' 
        }}>
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: '#C9D5DD' }}>
              <Activity className="w-6 h-6 mr-2" />
              Training Modules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pillar.modules.map((module, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded border"
                style={{ 
                  backgroundColor: module.completed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(201, 213, 221, 0.1)',
                  borderColor: module.completed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(201, 213, 221, 0.3)'
                }}
              >
                <div className="flex items-center flex-1">
                  {module.completed ? (
                    <CheckCircle className="w-6 h-6 mr-3" style={{ color: '#10B981' }} />
                  ) : (
                    <Lock className="w-6 h-6 mr-3" style={{ color: '#BDBBBB' }} />
                  )}
                  <div>
                    <h4 className="font-semibold" style={{ color: module.completed ? '#10B981' : '#C9D5DD' }}>
                      {module.title}
                    </h4>
                    <p className="text-sm" style={{ color: '#BDBBBB' }}>
                      {module.description}
                    </p>
                  </div>
                </div>
                <Button 
                  variant={module.completed ? "outline" : "default"}
                  disabled={!module.completed && index > 0 && !pillar.modules[index - 1].completed}
                  className="ml-4"
                  style={module.completed ? {
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: 'rgba(16, 185, 129, 0.3)',
                    color: '#10B981'
                  } : {
                    background: 'linear-gradient(to right, #E0B848, #B08B18)',
                    color: 'black'
                  }}
                >
                  {module.completed ? 'Review' : 'Start'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button 
            onClick={() => navigate('/assessment')}
            className="h-16 text-lg font-semibold text-black"
            style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
          >
            <Brain className="w-6 h-6 mr-2" />
            Take Assessment
          </Button>
          <Button 
            onClick={() => navigate('/morning-session')}
            variant="outline"
            className="h-16 text-lg font-semibold"
            style={{ 
              backgroundColor: `${pillar.color}20`, 
              borderColor: `${pillar.color}40`,
              color: pillar.color
            }}
          >
            <Activity className="w-6 h-6 mr-2" />
            Begin Training Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PillarDetail;
