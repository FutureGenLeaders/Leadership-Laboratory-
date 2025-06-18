import React from 'react';
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
import { Crown, Star, Zap } from 'lucide-react';

const DEFAULT_LEVEL = 1;

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              The Leadership Laboratory
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Master consciousness-based leadership through nervous system regulation, 
              conflict transformation, and presence mastery
            </p>
            <div className="max-w-md mx-auto">
              <Auth onSuccess={() => navigate('/level-selection')} />
            </div>
          </div>

          {/* Value Proposition */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Transform Your Leadership from the Inside Out</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Nervous System Mastery</h3>
                <p className="text-gray-300">Regulate your internal state to lead with unwavering presence under any pressure</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Conflict Transformation</h3>
                <p className="text-gray-300">Turn every conflict into an opportunity for deeper understanding and team growth</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Decision Mastery</h3>
                <p className="text-gray-300">Make decisions from presence rather than reactivity for consistently better outcomes</p>
              </div>
            </div>
          </div>

          {/* Membership Tiers */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Choose Your Transformation Path</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Basic Tier */}
              <Card className="bg-gray-900 border-gray-600 relative">
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    <Star className="w-8 h-8 text-gray-400" />
                  </div>
                  <CardTitle className="text-2xl text-white">Basic Foundation</CardTitle>
                  <CardDescription className="text-gray-400">Essential consciousness-based leadership</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-white">$77</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <p className="text-sm text-green-400">14-day free trial</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-gray-300">
                    <li>✓ 2 focused lessons per month (24/year)</li>
                    <li>✓ Monthly theme rotation: Conflict, Decision-Making, Burnout, Nervous System</li>
                    <li>✓ 1 group coaching session monthly</li>
                    <li>✓ Daily practices: Morning, afternoon, evening</li>
                    <li>✓ Progress tracking & badges</li>
                    <li>✓ Community forum access</li>
                    <li>✓ Mobile app & audio practices</li>
                  </ul>
                  <SubscriptionButton tier="silver" className="w-full mt-6">
                    Start Free Trial
                  </SubscriptionButton>
                </CardContent>
              </Card>

              {/* Premium Tier */}
              <Card className="bg-gray-900 border-yellow-500 relative transform scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">MOST POPULAR</span>
                </div>
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    <Crown className="w-8 h-8 text-yellow-400" />
                  </div>
                  <CardTitle className="text-2xl text-white">Premium Mastery</CardTitle>
                  <CardDescription className="text-gray-400">Comprehensive leadership transformation</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-white">$444</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <p className="text-sm text-green-400">14-day free trial</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-gray-300">
                    <li>✓ 4 comprehensive lessons monthly (48/year)</li>
                    <li>✓ Fixed structure: Conflict, Decision-Making, Burnout, Nervous System</li>
                    <li>✓ Premium small-group coaching + quarterly 1-on-1</li>
                    <li>✓ Enhanced daily practices (25/15/20 min)</li>
                    <li>✓ Biometric integration & AI insights</li>
                    <li>✓ Monthly consciousness assessments</li>
                    <li>✓ Private premium forum & peer matching</li>
                    <li>✓ Conscious Leadership Certification path</li>
                  </ul>
                  <SubscriptionButton tier="gold" className="w-full mt-6">
                    Start Free Trial
                  </SubscriptionButton>
                </CardContent>
              </Card>

              {/* Executive Circle */}
              <Card className="bg-gray-900 border-red-600 relative">
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    <Zap className="w-8 h-8 text-red-400" />
                  </div>
                  <CardTitle className="text-2xl text-white">Executive Circle</CardTitle>
                  <CardDescription className="text-gray-400">Elite consciousness leadership</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-white">$777</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <p className="text-sm text-green-400">14-day free trial</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-gray-300">
                    <li>✓ Everything in Premium PLUS:</li>
                    <li>✓ Advanced organizational shamanism modules</li>
                    <li>✓ 2 VIP coaching sessions + quarterly intensives</li>
                    <li>✓ Monthly executive mastermind (max 8 members)</li>
                    <li>✓ Quarterly direct mentor access</li>
                    <li>✓ VR conflict scenarios & AI practice partners</li>
                    <li>✓ Personal legacy development planning</li>
                    <li>✓ Global executive network access</li>
                  </ul>
                  <SubscriptionButton tier="red" className="w-full mt-6">
                    Start Free Trial
                  </SubscriptionButton>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Trust Building */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Join Thousands of Transformed Leaders</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              "This isn't just leadership training - it's a complete transformation of how you show up in the world. 
              The nervous system work alone has revolutionized my decision-making under pressure."
            </p>
            <p className="text-yellow-400 font-semibold">- Sarah Chen, CEO, TechForward Solutions</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
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
          <h1 className="text-3xl font-bold text-white">Welcome, {user.user_metadata?.full_name || user.email}!</h1>
          <p className="text-gray-300">Begin your journey to nervous system leadership and presence mastery.</p>
        </section>

        {/* MVP: Leaderboard */}
        <Leaderboard />

        {/* Trial Banner */}
        <TrialBanner />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Your Daily Presence Protocol Dashboard</h2>
          <MorningSession level={DEFAULT_LEVEL} onComplete={() => {}} />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Unlock Your Presence Potential</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Masterclass Library</CardTitle>
                <CardDescription className="text-gray-400">Dive into curated consciousness content.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Access ancient wisdom and modern science for presence mastery.</p>
                <Button variant="secondary" onClick={() => navigate('/masterclass-library')}>Explore Now</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Sacred Circle</CardTitle>
                <CardDescription className="text-gray-400">Connect with conscious leaders.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Engage in deep discussions about presence-based leadership.</p>
                <Button variant="secondary" onClick={() => navigate('/sacred-circle')}>Join the Circle</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Strategic Sessions</CardTitle>
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
          className="text-white underline underline-offset-4 text-sm hover:text-yellow-300 transition-colors"
          aria-label="Go to Profile"
        >
          My Profile & Progress
        </button>
      </div>
    </div>
  );
};

export default Index;
