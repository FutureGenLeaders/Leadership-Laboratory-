
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import LevelSelection from "@/components/LevelSelection";
import MonthlyProgression from "@/components/MonthlyProgression";
import AssessmentMetrics from "@/components/AssessmentMetrics";
import DivineFeminine from "@/components/DivineFeminine";
import { 
  Flame, 
  Zap, 
  Sprout, 
  Eye,
  Star,
  ChevronRight,
  Shield,
  Sun,
  Play,
  GraduationCap,
  Users,
  User,
  Calendar,
  Brain,
  Activity
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCallback } from "react";
// Removed SubscriptionButton

const SUBSCRIPTION_OPTIONS = [
  {
    id: 1,
    name: "Strategic Focus",
    price: 77,
    priceId: "price_STRATEGIC",
    accentColor: "#E0B848",
    tier: "gold",
    badge: "Plan Entry",
    description: "Launch your leadership upgrade with our foundational neuroscience-based strategies. Ideal for executives seeking nervous system calibration for day-to-day performance.",
    highlight: "Professional onboarding, plus weekly neuroscience briefings",
  },
  {
    id: 2,
    name: "Advanced Leadership",
    price: 277,
    priceId: "price_ADVANCED",
    accentColor: "#DEE2E6",
    tier: "silver",
    badge: "Small Circle",
    description: "For ambitious leaders ready to achieve regulated excellence fast. Unlock advanced group coaching, all trainings, and exclusive templates.",
    highlight: "Priority access plus leadership cohort & live coaching",
  },
  {
    id: 3,
    name: "Mastery Mode",
    price: 777,
    priceId: "price_MASTERY",
    accentColor: "#AD1E2D",
    tier: "red",
    badge: "VIP",
    description: "For transformative executives only. Includes 1:1 strategy counsel, private events, and VIP network access.",
    highlight: "Direct consulting & private neuroscience consultation",
  },
];

// --- Utility function to check for supabase on window with correct type
function getSupabase() {
  return (window as any).supabase || undefined;
}

const Index = () => {
  const navigate = useNavigate();
  const [nervousSystemOptimization, setNervousSystemOptimization] = useState(73);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [showLevelSelection, setShowLevelSelection] = useState(false);

  const pillars = [
    {
      id: 1,
      title: "Nervous System Team Dynamics",
      description: "Transform team tensions through neuroscience-based conflict resolution",
      icon: Flame,
      color: "from-red-500 to-red-600",
      progress: 65,
      dailyChallenge: "Practice regulated response training with one challenging team member",
      neuroscienceLink: "Vagal tone optimization reduces cortisol during conflict"
    },
    {
      id: 2,
      title: "Cognitive Load Decision Architecture", 
      description: "Peak performance decision-making under pressure using brain optimization",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
      progress: 78,
      dailyChallenge: "Execute uncertainty training protocol with incomplete information",
      neuroscienceLink: "Prefrontal cortex regulation enhances strategic thinking"
    },
    {
      id: 3,
      title: "Executive Nervous System Recovery",
      description: "Maintain peak cognitive performance without burnout using neuroscience protocols",
      icon: Sprout,
      color: "from-gray-400 to-gray-500", 
      progress: 42,
      dailyChallenge: "Complete nervous system recovery audit and optimization protocol",
      neuroscienceLink: "Parasympathetic activation restores executive function"
    },
    {
      id: 4,
      title: "Crisis Nervous System Performance",
      description: "Optimal brain function during chaos through regulated leadership presence",
      icon: Eye,
      color: "from-red-600 to-red-700",
      progress: 55,
      dailyChallenge: "Practice unshakeable nervous system training under simulated pressure",
      neuroscienceLink: "Coherent heart-brain patterns enhance decision quality"
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

  // updated handleSubscribe for safer supabase access
  const handleSubscribe = useCallback(async (priceId: string, tierName: string) => {
    const supabase = getSupabase();
    if (!supabase) {
      toast({
        title: "Supabase connection required",
        description: "Please connect your Supabase project before subscribing.",
      });
      return;
    }
    toast({
      title: "Redirecting to Stripe...",
      description: `Opening checkout for ${tierName}`,
    });
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId },
      });
      if (data?.url) {
        window.open(data.url, "_blank");
      } else if (error) {
        toast({
          title: "Stripe checkout error",
          description: error.message || "There was an issue creating your checkout session.",
        });
      }
    } catch (err: any) {
      toast({
        title: "Unexpected error",
        description: err?.message || "Could not redirect to Stripe.",
      });
    }
  }, []);

  if (showLevelSelection) {
    return <LevelSelection onLevelSelect={handleLevelSelect} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header and intro content stays at the top */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 mr-3" style={{ color: '#E0B848' }} />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent"
                style={{ background: `linear-gradient(to right, #E0B848, #B08B18, #E0B848)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              The Leadership Laboratory
            </h1>
            <Activity className="w-12 h-12 ml-3" style={{ color: '#E0B848' }} />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: '#C9D5DD' }}>
            Where Pressure Becomes Presence
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: '#BDBBBB' }}>
            Transform from reactive stress leadership into neuroscience-optimized peak performance. 
            Your advanced nervous system training platform delivering precision protocols for sustained executive excellence exactly when high-stakes decisions matter most.
          </p>
          <Badge className="text-lg px-4 py-2" style={{ backgroundColor: 'rgba(224, 184, 72, 0.2)', color: '#E0B848', borderColor: 'rgba(224, 184, 72, 0.3)' }}>
            <Brain className="w-4 h-4 mr-2" />
            Neuroscience Optimization Active
          </Badge>
        </div>

        {/* ------ SUBSCRIPTION PLANS SECTION NOW BELOW HEADER ------ */}
        <div className="max-w-4xl mx-auto pt-0 pb-14 mb-10">
          <h2 className="text-3xl font-bold text-center mb-7" style={{ color: "#E0B848" }}>
            Subscribe for Mindful Neuroscience Leadership Training
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {SUBSCRIPTION_OPTIONS.map((option) => (
              <div
                key={option.id}
                className={`
                  bg-gray-950 rounded-2xl p-7 flex flex-col shadow-md transition-transform hover:scale-105
                  cursor-pointer border-2 group
                  hover:ring-2
                  ${option.tier === "gold" ? "hover:ring-yellow-400" : option.tier === "silver" ? "hover:ring-gray-200" : "hover:ring-red-800"}
                `}
                style={{
                  minHeight: 410,
                  borderWidth: '2px',
                  borderRadius: '1.25rem',
                  borderColor:
                    option.tier === "gold"
                      ? "#E0B848"
                      : option.tier === "silver"
                      ? "#DEE2E6"
                      : "#AD1E2D",
                  borderStyle: "solid",
                  boxShadow:
                    option.tier === "silver"
                      ? "0 2px 12px 0 rgba(176,182,188, 0.10)"
                      : option.tier === "gold"
                      ? "0 2px 12px 0 rgba(224,184,72,0.17)"
                      : "0 2px 12px 0 rgba(173,30,45,0.12)",
                  transition: "box-shadow 0.2s, border-color 0.2s"
                }}
                onClick={() => handleSubscribe(option.priceId, option.name)}
                tabIndex={0}
                role="button"
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") handleSubscribe(option.priceId, option.name);
                }}
              >
                <div className="flex flex-col flex-1 mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-xs px-2 py-1 rounded border font-semibold"
                      style={{
                        borderColor: option.accentColor,
                        color: option.accentColor,
                        background: option.tier === "red" ? "rgba(173,30,45,0.08)" : "rgba(224,184,72,0.06)",
                      }}
                    >
                      {option.badge}
                    </span>
                    <span className="text-xs italic opacity-70" style={{ color: "#fff" }}>{option.name}</span>
                  </div>
                  <h3 className="text-2xl font-bold my-2" style={{ color: "#fff" }}>
                    {option.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-4xl font-bold"
                      style={{ color: "#fff" }}
                    >
                      ${option.price}
                    </span>
                    <span className="text-sm text-gray-300 font-normal">/month</span>
                  </div>
                  <p className="text-sm leading-relaxed mt-3 mb-3" style={{ color: "#fff" }}>
                    {option.description}
                  </p>
                  <div
                    className="rounded bg-gray-800/30 border p-2 text-xs font-medium mb-2"
                    style={{
                      color: "#fff",
                      borderColor: option.accentColor,
                      background: option.tier === "red"
                        ? "rgba(173, 30, 45, 0.08)"
                        : "rgba(224,184,72,0.09)",
                    }}
                  >
                    {option.highlight}
                  </div>
                </div>
                <div className="mt-auto text-center font-semibold text-white opacity-80 tracking-wide pointer-events-none select-none">
                  Click to subscribe
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center mt-5" style={{ color: "#939393" }}>
            Secure payment via Stripe. Cancel anytime in your account. If you need a special arrangement,{" "}
            <a
              className="underline"
              href="mailto:support@yoursite.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#E0B848" }}
            >
              contact us
            </a>.
          </p>
        </div>
        {/* ---- END SUBSCRIPTION ---- */}

        {/* Sacred Geometry Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-yellow-400 rotate-45 animate-pulse" style={{ borderColor: '#E0B848' }}></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-red-500 rounded-full animate-pulse delay-1000" style={{ borderColor: '#AD1E2D' }}></div>
          <div className="absolute bottom-32 left-1/3 w-28 h-28 border border-yellow-500 transform rotate-12 animate-pulse delay-2000" style={{ borderColor: '#B08B18' }}></div>
        </div>

        {/* Level Selection Status */}
        {selectedLevel && (
          <div className="text-center mb-8">
            <Badge className="text-lg px-6 py-3" style={{ 
              backgroundColor: `${getLevelInfo().color}20`, 
              color: getLevelInfo().color, 
              borderColor: `${getLevelInfo().color}40` 
            }}>
              Current Training Protocol: {getLevelInfo().name}
            </Badge>
            <Button 
              variant="ghost" 
              onClick={() => setShowLevelSelection(true)}
              className="ml-4 text-sm"
              style={{ color: '#C9D5DD' }}
            >
              Change Protocol
            </Button>
          </div>
        )}

        {/* Morning Nervous System Check-in */}
        <Card className="mb-12 bg-gradient-to-r border" style={{ 
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))', 
          borderColor: 'rgba(173, 30, 45, 0.3)' 
        }}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center" style={{ color: '#E0B848' }}>
              <Brain className="w-6 h-6 mr-2" />
              Nervous System Optimization Analysis
              <Activity className="w-6 h-6 ml-2" />
            </CardTitle>
            <CardDescription style={{ color: '#C9D5DD' }}>
              Your daily neuroscience-based leadership assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2" style={{ color: '#E0B848' }}>{nervousSystemOptimization}%</div>
              <p className="text-lg" style={{ color: '#C9D5DD' }}>Nervous System Coherence</p>
              <Progress value={nervousSystemOptimization} className="w-full max-w-md mx-auto mt-4" />
            </div>
            
            <div className="rounded-lg p-6 border" style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.3)', 
              borderColor: 'rgba(173, 30, 45, 0.2)' 
            }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#E0B848' }}>Today's Neuroscience Protocol:</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#C9D5DD' }}>
                Your nervous system scan reads <span className="font-semibold" style={{ color: '#E0B848' }}>"Peak Performance Ready"</span>. 
                {selectedLevel ? (
                  <>Transform one team tension into breakthrough clarity today using your <span className="font-semibold" style={{ color: getLevelInfo().color }}>{getLevelInfo().name}</span> neuroscience protocols.</>
                ) : (
                  <>Begin with nervous system activation to calibrate your brain for <span className="font-semibold" style={{ color: '#E0B848' }}>'Regulated Excellence'</span>.</>
                )}
              </p>
              <div className="mt-4 p-3 rounded border" style={{ 
                backgroundColor: 'rgba(224, 184, 72, 0.1)', 
                borderColor: 'rgba(224, 184, 72, 0.2)' 
              }}>
                <p className="text-sm font-medium" style={{ color: '#E0B848' }}>
                  <Activity className="w-4 h-4 inline mr-2" />
                  Neuroscience Insight: Regulated nervous systems show 340% better decision quality under pressure
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => selectedLevel ? navigate('/morning-session', { state: { level: selectedLevel } }) : setShowLevelSelection(true)}
                className="font-semibold text-lg py-6 text-black"
                style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
              >
                <Sun className="w-5 h-5 mr-2" />
                Morning Activation
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
                Peak State Reset
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
                <Brain className="w-5 h-5 mr-2" />
                Neural Integration
              </Button>
            </div>

            {!selectedLevel && (
              <Button 
                onClick={() => setShowLevelSelection(true)}
                className="w-full font-semibold text-lg py-6 text-black"
                style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
              >
                <Shield className="w-5 h-5 mr-2" />
                Choose Your Nervous System Training Path
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>

        {/* NEW: Assessment Metrics Dashboard */}
        <div className="mb-12">
          <AssessmentMetrics />
        </div>

        {/* Monthly Universal Principles Progression */}
        <div className="mb-12">
          <MonthlyProgression />
        </div>

        {/* Video & Coaching Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#E0B848' }}>
            Video Learning & Coaching Platform
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Button 
              onClick={() => navigate('/monday-mastery')}
              className="h-24 flex flex-col items-center justify-center text-black transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
            >
              <Play className="w-6 h-6 mb-2" />
              <span className="font-semibold">Monday Mastery</span>
              <span className="text-sm opacity-80">Weekly Videos</span>
            </Button>
            
            <Button 
              onClick={() => navigate('/masterclass-library')}
              className="h-24 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'rgba(224, 184, 72, 0.2)', 
                borderColor: 'rgba(224, 184, 72, 0.3)',
                color: '#E0B848',
                border: '1px solid'
              }}
            >
              <GraduationCap className="w-6 h-6 mb-2" />
              <span className="font-semibold">Masterclass Library</span>
              <span className="text-sm opacity-80">Deep-Dive Training</span>
            </Button>
            
            <Button 
              onClick={() => navigate('/executive-circle')}
              className="h-24 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'rgba(173, 30, 45, 0.2)', 
                borderColor: 'rgba(173, 30, 45, 0.3)',
                color: '#AD1E2D',
                border: '1px solid'
              }}
            >
              <Users className="w-6 h-6 mb-2" />
              <span className="font-semibold">Executive Circle</span>
              <span className="text-sm opacity-80">Group Coaching</span>
            </Button>
            
            <Button 
              onClick={() => navigate('/strategic-sessions')}
              className="h-24 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'rgba(201, 213, 221, 0.2)', 
                borderColor: 'rgba(201, 213, 221, 0.3)',
                color: '#C9D5DD',
                border: '1px solid'
              }}
            >
              <User className="w-6 h-6 mb-2" />
              <span className="font-semibold">Strategic Sessions</span>
              <span className="text-sm opacity-80">Private 1:1 Coaching</span>
            </Button>
          </div>

          {/* Featured Content Highlight */}
          <Card className="bg-gradient-to-r border" style={{ 
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))', 
            borderColor: 'rgba(224, 184, 72, 0.3)' 
          }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#E0B848' }}>
                    This Week's Monday Mastery: Crisis Leadership Fundamentals
                  </h3>
                  <p style={{ color: '#C9D5DD' }}>
                    Master the core principles of leading through organizational crisis with strategic clarity
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge style={{ 
                    backgroundColor: 'rgba(224, 184, 72, 0.2)', 
                    color: '#E0B848', 
                    borderColor: 'rgba(224, 184, 72, 0.3)' 
                  }}>
                    <Calendar className="w-4 h-4 mr-1" />
                    New This Week
                  </Badge>
                  <Button 
                    onClick={() => navigate('/monday-mastery')}
                    variant="outline"
                    style={{ 
                      backgroundColor: 'rgba(224, 184, 72, 0.1)', 
                      borderColor: 'rgba(224, 184, 72, 0.3)',
                      color: '#E0B848'
                    }}
                  >
                    Watch Now
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Four Pillars - Updated with Neuroscience Language */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#E0B848' }}>
            The Four Pillars of Neuroscience-Based Leadership Excellence
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
                        {pillar.progress}% Optimized
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
                      <p className="text-sm font-medium mb-1" style={{ color: '#C9D5DD' }}>Today's Neural Training:</p>
                      <p className="text-sm mb-3" style={{ color: '#BDBBBB' }}>{pillar.dailyChallenge}</p>
                      <div className="flex items-center text-xs" style={{ color: '#E0B848' }}>
                        <Brain className="w-3 h-3 mr-1" />
                        {pillar.neuroscienceLink}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions - Updated */}
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
            Emergency Neural Regulation
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
            Cognitive Load Scanner
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
            <Brain className="w-6 h-6 mr-2" />
            Nervous System Recovery
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;

