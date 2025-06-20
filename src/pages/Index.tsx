
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Auth from '@/components/Auth';
import MorningSession from '@/components/MorningSession';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TrialBanner from '@/components/TrialBanner';
import PersonalizedInsights from "@/components/PersonalizedInsights";
import Leaderboard from "@/components/Leaderboard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import MonthlyMotivation from "@/components/MonthlyMotivation";
import SubscriptionButton from "@/components/SubscriptionButton";
import { CheckCircle, AlertTriangle, Target, Users, Brain, Zap, Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DEFAULT_LEVEL = 1;

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState('en');
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  // Fetch basic stats for insights MVP
  const [stats, setStats] = React.useState({ streak: 0, totalSessions: 0 });
  React.useEffect(() => {
    // MVP: fetch all sessions for this user from Supabase
    async function getStats() {
      if (!user) return;
      const { data, error } = await supabase
        .from("bookings")
        .select("session_date, status")
        .eq("user_id", user.id)
        .order("session_date", { ascending: false });
      if (data) {
        // Completed sessions only
        const completed = data.filter((d: any) => d.status === "completed");
        // Calculate streak
        const completedDates = completed.map((s: any) => s.session_date).sort((a: any, b: any) => new Date(b).getTime() - new Date(a).getTime());
        let streak = 0;
        if (completedDates.length) {
          let current = new Date(completedDates[0]);
          streak = 1;
          for (let i = 1; i < completedDates.length; i++) {
            const prev = new Date(completedDates[i - 1]);
            const curr = new Date(completedDates[i]);
            const diff = Math.floor((prev.getTime() - curr.getTime()) / (1000 * 3600 * 24));
            if (diff === 1) {
              streak += 1;
            } else {
              break;
            }
          }
        }
        setStats({ streak, totalSessions: completed.length });
      }
    }
    getStats();

    // Trigger welcome notification as a demo (MVP notifications)
    if (user) {
      toast({
        title: `Welcome back${user.user_metadata?.full_name ? ', ' + user.user_metadata.full_name : ''}!`,
        description: 'Ready for another day in The Leadership Laboratory?',
      });
    }
  }, [user]);

  const getDripMessage = (plan: string) => {
    switch (plan) {
      case 'foundation':
        return "📅 WEEKLY DELIVERY: You'll receive 2 powerful lessons per month (every 2 weeks) + 1 weekly group coaching call. Content is delivered gradually to ensure deep integration without overwhelm.";
      case 'mastery':
        return "📅 WEEKLY DELIVERY: You'll receive 1 advanced lesson every week + 1 weekly group coaching call. Steady, consistent transformation that builds mastery over time.";
      case 'executive':
        return "📅 WEEKLY DELIVERY: You'll receive 1 executive-level lesson every week + 1 exclusive weekly coaching call. Elite transformation delivered at the perfect pace for integration.";
      default:
        return "";
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-golden">
        {/* Language Selector */}
        <div className="absolute top-4 right-4 z-50">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32 bg-gray-800 border-golden">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Languages" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-golden">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-golden mb-6">
              MASTER CONFLICT. MASTER LIFE.
            </h1>
            <p className="text-2xl md:text-3xl text-red-600 mb-4 font-semibold">
              Stop letting conflict control your decisions and burn you out
            </p>
            <p className="text-xl md:text-2xl text-golden mb-8 max-w-4xl mx-auto">
              Transform from a performance-driven leader constantly battling stress and burnout into a presence-based powerhouse who thrives in any situation. Master your nervous system, dominate every conflict, and live a fucking kick-ass life where nothing can shake your core.
            </p>
            <div className="max-w-md mx-auto">
              <Auth onSuccess={() => navigate('/level-selection')} />
            </div>
          </div>

          {/* Problem Identification */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-golden mb-8">TIRED OF CONFLICT CONTROLLING YOUR LIFE?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              You're a high-performer, but every workplace drama, difficult conversation, and personal conflict leaves you drained, reactive, and making decisions from a place of stress instead of strength.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-gray-900 p-6 rounded-lg border border-red-600">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-xl font-bold text-red-400 mb-4">REACTIVE DECISIONS</h3>
                <p className="text-gray-300">You make choices when triggered, then regret them later. Your best thinking gets hijacked by emotional reactions.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-red-600">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-red-400 mb-4">BURNOUT CYCLES</h3>
                <p className="text-gray-300">Every conflict drains your energy. You're constantly recovering from workplace drama instead of building momentum.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-red-600">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-xl font-bold text-red-400 mb-4">PERFORMANCE MASK</h3>
                <p className="text-gray-300">You're always 'on' - performing strength while internally feeling overwhelmed by the next challenge.</p>
              </div>
            </div>
          </div>

          {/* Solution Clarity */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-golden mb-8">IMAGINE LIVING COMPLETELY UNSHAKEABLE</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              What if conflict became your playground? What if every difficult situation made you stronger, clearer, and more confident?
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
              <div className="bg-gray-900 p-6 rounded-lg border border-golden">
                <div className="text-4xl mb-4">⚔️</div>
                <h3 className="text-xl font-bold text-golden mb-4">CONFLICT MASTERY</h3>
                <p className="text-gray-300">Transform every difficult conversation into an opportunity. Navigate workplace politics with ease and grace.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-golden">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-golden mb-4">NERVOUS SYSTEM REGULATION</h3>
                <p className="text-gray-300">Stay calm, centered, and strategic even when others are losing their minds around you.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-golden">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-golden mb-4">DECISION CLARITY</h3>
                <p className="text-gray-300">Make powerful choices from presence, not pressure. Your best thinking available in any situation.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-golden">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-xl font-bold text-golden mb-4">UNLIMITED ENERGY</h3>
                <p className="text-gray-300">Stop getting drained by drama. Use every challenge as fuel for your next level of leadership.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-golden">
                <div className="text-4xl mb-4">👑</div>
                <h3 className="text-xl font-bold text-golden mb-4">AUTHENTIC PRESENCE</h3>
                <p className="text-gray-300">Lead from your true power. No more performance masks - just raw, unshakeable confidence.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-golden">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold text-golden mb-4">KICK-ASS LIFE</h3>
                <p className="text-gray-300">Love your life regardless of external circumstances. Nothing can touch your inner peace and power.</p>
              </div>
            </div>
          </div>

          {/* Individual Subscription Tiers */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-golden mb-8">Choose Your Leadership Transformation Level</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div 
                className="relative"
                onMouseEnter={() => setHoveredPlan('foundation')}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                <SubscriptionButton
                  plan="foundation"
                  price={77}
                  billing="monthly"
                  onSubscribe={(plan) => console.log('Subscribe to:', plan)}
                  className="transform hover:scale-105 transition-all duration-300"
                />
                {hoveredPlan === 'foundation' && (
                  <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-gray-800 border border-golden rounded-lg z-10">
                    <p className="text-sm text-golden">{getDripMessage('foundation')}</p>
                  </div>
                )}
              </div>
              <div 
                className="relative"
                onMouseEnter={() => setHoveredPlan('mastery')}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                <SubscriptionButton
                  plan="mastery"
                  price={444}
                  billing="monthly"
                  onSubscribe={(plan) => console.log('Subscribe to:', plan)}
                  className="transform hover:scale-105 transition-all duration-300"
                />
                {hoveredPlan === 'mastery' && (
                  <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-gray-800 border border-golden rounded-lg z-10">
                    <p className="text-sm text-golden">{getDripMessage('mastery')}</p>
                  </div>
                )}
              </div>
              <div 
                className="relative"
                onMouseEnter={() => setHoveredPlan('executive')}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                <SubscriptionButton
                  plan="executive"
                  price={777}
                  billing="monthly"
                  onSubscribe={(plan) => console.log('Subscribe to:', plan)}
                  className="transform hover:scale-105 transition-all duration-300"
                />
                {hoveredPlan === 'executive' && (
                  <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-gray-800 border border-golden rounded-lg z-10">
                    <p className="text-sm text-golden">{getDripMessage('executive')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bulk/Organization Pricing */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-golden mb-8">Organization & Team Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="bg-gray-900 border-golden">
                <CardHeader>
                  <CardTitle className="text-golden">Team Package</CardTitle>
                  <CardDescription className="text-gray-300">10-24 Leaders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-golden mb-4">$50/month</div>
                  <p className="text-sm text-gray-300 mb-4">per leader</p>
                  <ul className="text-left space-y-2 text-gray-300">
                    <li>• Foundation Track for all team members</li>
                    <li>• Weekly team coaching calls</li>
                    <li>• Team progress dashboard</li>
                    <li>• Priority email support</li>
                  </ul>
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white">
                    Contact for Team Setup
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-golden ring-2 ring-golden">
                <CardHeader>
                  <CardTitle className="text-golden">Enterprise Package</CardTitle>
                  <CardDescription className="text-gray-300">25-99 Leaders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-golden mb-4">$35/month</div>
                  <p className="text-sm text-gray-300 mb-4">per leader</p>
                  <ul className="text-left space-y-2 text-gray-300">
                    <li>• Mastery Track for all leaders</li>
                    <li>• Weekly enterprise coaching</li>
                    <li>• Advanced analytics dashboard</li>
                    <li>• Dedicated account manager</li>
                  </ul>
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white">
                    Schedule Enterprise Demo
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-golden">
                <CardHeader>
                  <CardTitle className="text-golden">Corporate Package</CardTitle>
                  <CardDescription className="text-gray-300">100+ Leaders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-golden mb-4">Custom</div>
                  <p className="text-sm text-gray-300 mb-4">pricing</p>
                  <ul className="text-left space-y-2 text-gray-300">
                    <li>• Executive Circle access for all</li>
                    <li>• Custom coaching programs</li>
                    <li>• White-label options</li>
                    <li>• C-suite strategy sessions</li>
                  </ul>
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white">
                    Custom Enterprise Quote
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
            
          {/* Call to Action */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-8 py-4"
              onClick={() => navigate('/assessment')}
            >
              DISCOVER YOUR LEADERSHIP TRANSFORMATION
            </Button>
            <p className="text-gray-400 mt-4">Take the Assessment & Choose Your Path to Conscious Leadership</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* NEW: Monthly Motivation Card */}
        <MonthlyMotivation />

        {/* MVP: Personalized Insights card */}
        <PersonalizedInsights
          fullName={user.user_metadata?.full_name}
          streak={stats.streak}
          totalSessions={stats.totalSessions}
        />

        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold text-golden">Welcome, {user.user_metadata?.full_name || user.email}!</h1>
          <p className="text-gray-300">Begin your journey to nervous system leadership and presence mastery.</p>
        </section>

        {/* MVP: Leaderboard */}
        <Leaderboard />

        {/* Trial Banner */}
        <TrialBanner />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-golden mb-4">Your Daily Presence Protocol Dashboard</h2>
          <MorningSession level={DEFAULT_LEVEL} onComplete={() => {}} />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-golden mb-4">Unlock Your Presence Potential</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-golden">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-golden">Masterclass Library</CardTitle>
                <CardDescription className="text-gray-400">Dive into curated consciousness content.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Access ancient wisdom and modern science for presence mastery.</p>
                <Button variant="secondary" onClick={() => navigate('/masterclass-library')}>Explore Now</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-golden">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-golden">Sacred Circle</CardTitle>
                <CardDescription className="text-gray-400">Connect with conscious leaders.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Engage in deep discussions about presence-based leadership.</p>
                <Button variant="secondary" onClick={() => navigate('/sacred-circle')}>Join the Circle</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-golden">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-golden">Strategic Sessions</CardTitle>
                <CardDescription className="text-gray-400">Transform your leadership presence.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Book strategic sessions to elevate your consciousness-based leadership.</p>
                <Button variant="secondary" onClick={() => navigate('/strategic-sessions')}>Book Now</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* PROFILE NAVIGATION LINK */}
      <div className="flex justify-end mt-4 mb-2">
        <button
          onClick={() => navigate("/profile")}
          className="text-golden underline underline-offset-4 text-sm hover:text-yellow-300 transition-colors"
          aria-label="Go to Profile"
        >
          My Profile & Progress
        </button>
      </div>
    </div>
  );
};

export default Index;
