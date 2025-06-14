
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Flame, 
  Zap, 
  Sprout, 
  Eye,
  Play,
  CheckCircle,
  Target,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PillarDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [completedPractices, setCompletedPractices] = useState<string[]>([]);

  const pillars = {
    "1": {
      title: "Sacred Team Conflict Mastery",
      description: "Transform team tensions into breakthrough clarity",
      icon: Flame,
      color: "from-red-500 to-orange-500",
      progress: 65,
      practices: [
        {
          id: "conflict-reframe",
          title: "3-Minute Conflict Reframe",
          duration: "3 min",
          description: "Transform one team frustration into strategic opportunity",
          steps: [
            "Identify the specific team tension or conflict",
            "Feel the emotional charge without resistance", 
            "Ask: 'What breakthrough wants to emerge here?'",
            "Visualize the transformed team dynamic",
            "Choose one action to catalyze this transformation"
          ]
        },
        {
          id: "sacred-listening",
          title: "Sacred Listening Activation",
          duration: "5 min",
          description: "Practice deep presence during difficult conversations",
          steps: [
            "Set intention to hear beyond words",
            "Drop into heart-centered awareness",
            "Listen for the unspoken need or fear",
            "Respond from wisdom, not reaction",
            "Close with appreciation for the exchange"
          ]
        },
        {
          id: "tension-clarity",
          title: "Tension-to-Clarity Meditation",
          duration: "10 min",
          description: "Convert team stress into organizational wisdom",
          steps: [
            "Sit quietly and breathe into your heart center",
            "Bring the team tension into your awareness",
            "Feel the energy without needing to fix it",
            "Ask: 'What wants to be born from this tension?'",
            "Receive the insight and commit to action"
          ]
        }
      ],
      insights: [
        "Conflict is creativity trying to emerge through resistance",
        "The leader who can hold tension without reactivity creates space for breakthrough",
        "Sacred conversations transform teams faster than policy changes",
        "Every team tension contains the seed of the next level of collaboration"
      ]
    },
    "2": {
      title: "Antifragile Decision Architecture",
      description: "Make powerful decisions under pressure",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      progress: 78,
      practices: [
        {
          id: "decision-hygiene",
          title: "Morning Decision Hygiene",
          duration: "5 min",
          description: "Prepare nervous system for high-stakes choices",
          steps: [
            "Ground yourself in present moment awareness",
            "Set intention for clear, aligned decisions",
            "Identify your most important decision today",
            "Feel into your body's wisdom about this choice",
            "Commit to deciding from clarity, not urgency"
          ]
        },
        {
          id: "uncertainty-training",
          title: "Uncertainty Training",
          duration: "7 min",
          description: "Build comfort with incomplete information",
          steps: [
            "Acknowledge what you don't know about a key decision",
            "Breathe into the discomfort of not knowing",
            "Ask: 'What would I choose if I trusted my wisdom?'",
            "Feel the difference between fear-based and wisdom-based choosing",
            "Practice making decisions with 70% information"
          ]
        },
        {
          id: "intuition-calibration",
          title: "Intuition Calibration",
          duration: "8 min",
          description: "Strengthen inner knowing alongside analytical thinking",
          steps: [
            "Present a decision to your analytical mind",
            "Now drop into your body and feel the decision",
            "Notice any discrepancy between mind and body wisdom",
            "Ask your intuition: 'What am I not seeing?'",
            "Integrate both perspectives into final choice"
          ]
        }
      ],
      insights: [
        "Antifragile decisions get stronger under pressure",
        "The best leaders decide quickly from deep wisdom, not fast thinking",
        "Uncertainty is information, not a problem to solve",
        "Your intuition processes more data than your conscious mind"
      ]
    },
    "3": {
      title: "Executive Burnout Recovery",
      description: "Maintain peak performance without depletion",
      icon: Sprout,
      color: "from-green-500 to-emerald-500",
      progress: 42,
      practices: [
        {
          id: "energy-audit",
          title: "Sacred Energy Audit",
          duration: "2 min",
          description: "Assess current vitality levels across all dimensions",
          steps: [
            "Scan your physical energy: How does your body feel?",
            "Check mental clarity: Is your thinking sharp or foggy?",
            "Feel emotional state: What emotions are present?",
            "Sense spiritual connection: Do you feel aligned with purpose?",
            "Rate each dimension 1-10 and identify what needs attention"
          ]
        },
        {
          id: "power-recovery",
          title: "Power Recovery Protocol",
          duration: "10 min",
          description: "Rapid restoration practice for different exhaustion types",
          steps: [
            "Identify your specific type of depletion",
            "Choose corresponding recovery: breath, movement, or stillness",
            "Engage fully in the restoration practice",
            "Feel energy returning to your system",
            "Set intention to maintain this renewed state"
          ]
        },
        {
          id: "sustainable-intensity",
          title: "Sustainable Intensity Training",
          duration: "15 min",
          description: "Push limits while maintaining renewable energy",
          steps: [
            "Choose a challenging but not overwhelming task",
            "Engage with full focus while monitoring energy",
            "Notice the moment intensity becomes unsustainable",
            "Back off slightly and find the sustainable edge",
            "Practice maintaining high performance at this level"
          ]
        }
      ],
      insights: [
        "Burnout is a spiritual crisis disguised as a productivity problem",
        "True recovery happens when you reconnect with your deeper purpose",
        "Sustainable intensity requires honoring your natural rhythms",
        "Energy sovereignty means choosing your energetic state consciously"
      ]
    },
    "4": {
      title: "Crisis Leadership Performance",
      description: "Thrive as an unshakeable leader during chaos",
      icon: Eye,
      color: "from-purple-500 to-indigo-500",
      progress: 55,
      practices: [
        {
          id: "unshakeable-presence",
          title: "Unshakeable Presence Training",
          duration: "12 min",
          description: "Maintain centered leadership during storms",
          steps: [
            "Imagine yourself in a recent crisis situation",
            "Feel the chaos and uncertainty around you",
            "Find your center - the still point within the storm",
            "Practice responding from this center, not reacting from chaos",
            "Anchor this centered state as your default crisis mode"
          ]
        },
        {
          id: "confidence-transmission",
          title: "Team Confidence Transmission",
          duration: "8 min",
          description: "Stabilize others during uncertainty",
          steps: [
            "Connect with your own unshakeable confidence",
            "Visualize your team in a state of anxiety or fear",
            "Feel your stability and send it to them energetically",
            "Practice speaking from this grounded presence",
            "Notice how your centered energy affects others"
          ]
        },
        {
          id: "crisis-opportunity",
          title: "Crisis-to-Opportunity Converter",
          duration: "10 min",
          description: "Extract competitive advantages from disruption",
          steps: [
            "Identify a current crisis or major challenge",
            "List all the obvious problems and threats",
            "Now ask: 'What unique opportunities does this create?'",
            "See the crisis as accelerating necessary changes",
            "Choose one opportunity to pursue immediately"
          ]
        }
      ],
      insights: [
        "Crisis reveals who you really are underneath your professional persona",
        "Unshakeable leaders are made, not born - through conscious practice",
        "Your team's confidence is directly linked to your energetic state",
        "Every crisis contains the seeds of your next level of leadership"
      ]
    }
  };

  const currentPillar = pillars[id as keyof typeof pillars];
  
  if (!currentPillar) {
    return <div>Pillar not found</div>;
  }

  const IconComponent = currentPillar.icon;

  const handleCompletePractice = (practiceId: string) => {
    if (!completedPractices.includes(practiceId)) {
      setCompletedPractices([...completedPractices, practiceId]);
      toast({
        title: "Sacred Practice Complete! ✨",
        description: "Your consciousness grows stronger with each practice.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 text-purple-300 hover:text-yellow-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Dashboard
        </Button>

        {/* Header */}
        <Card className="mb-8 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-4 rounded-full bg-gradient-to-r ${currentPillar.color} mr-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-yellow-300">
                    {currentPillar.title}
                  </CardTitle>
                  <CardDescription className="text-purple-200 text-lg">
                    {currentPillar.description}
                  </CardDescription>
                </div>
              </div>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-lg px-4 py-2">
                {currentPillar.progress}% Mastery
              </Badge>
            </div>
            <Progress value={currentPillar.progress} className="mt-4" />
          </CardHeader>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="practices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-purple-900/30">
            <TabsTrigger value="practices" className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300">
              Daily Practices
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300">
              Sacred Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="practices" className="space-y-6">
            {currentPillar.practices.map((practice) => (
              <Card key={practice.id} className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 border-purple-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-yellow-300 flex items-center">
                        {completedPractices.includes(practice.id) ? (
                          <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                        ) : (
                          <Target className="w-5 h-5 mr-2 text-purple-400" />
                        )}
                        {practice.title}
                      </CardTitle>
                      <CardDescription className="text-purple-200">
                        {practice.description}
                      </CardDescription>
                    </div>
                    <Badge className="flex items-center bg-blue-500/20 text-blue-300 border-blue-500/30">
                      <Clock className="w-3 h-3 mr-1" />
                      {practice.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-purple-800/20 rounded-lg p-4 border border-purple-500/10">
                      <h4 className="font-semibold text-purple-200 mb-3">Practice Steps:</h4>
                      <ol className="space-y-2">
                        {practice.steps.map((step, index) => (
                          <li key={index} className="flex items-start text-purple-100">
                            <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <Button 
                      onClick={() => handleCompletePractice(practice.id)}
                      disabled={completedPractices.includes(practice.id)}
                      className={`w-full ${
                        completedPractices.includes(practice.id)
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700'
                      } text-black font-semibold`}
                    >
                      {completedPractices.includes(practice.id) ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Practice Complete
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Begin Practice
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-2xl text-yellow-300 flex items-center">
                  <Eye className="w-6 h-6 mr-2" />
                  Sacred Insights
                </CardTitle>
                <CardDescription className="text-yellow-200">
                  Wisdom from the masters who have walked this path
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentPillar.insights.map((insight, index) => (
                    <div key={index} className="bg-yellow-500/5 rounded-lg p-4 border border-yellow-500/10">
                      <p className="text-yellow-100 text-lg leading-relaxed italic">
                        "{insight}"
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PillarDetail;
