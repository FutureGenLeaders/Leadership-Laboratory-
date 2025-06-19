
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
import { CheckCircle, AlertTriangle, Target, Users, Brain, Zap } from 'lucide-react';

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
            <p className="text-2xl md:text-3xl text-yellow-400 mb-4 font-semibold">
              Transform from Performance-Driven to Presence-Based Leadership
            </p>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Master your nervous system, eliminate decision fatigue, and lead with unshakeable presence through ancient wisdom and modern neuroscience. <span className="text-yellow-400 font-semibold">Stop Reacting. Start Leading.</span>
            </p>
            <div className="max-w-md mx-auto">
              <Auth onSuccess={() => navigate('/level-selection')} />
            </div>
          </div>

          {/* Problem Identification */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Are You Leading from Reaction or Response?</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-red-900/20 p-6 rounded-lg border border-red-700">
                <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-red-400 mb-4">Leading from Reaction</h3>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li>• Dreading difficult conversations and avoiding conflict</li>
                  <li>• Making decisions from fatigue instead of clarity</li>
                  <li>• Feeling burned out and running on empty</li>
                  <li>• Leading others while your nervous system is dysregulated</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-6 rounded-lg border border-green-700">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-400 mb-4">Leading from Response</h3>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li>• Master conflict transformation instead of avoiding conversations</li>
                  <li>• Eliminate decision-making fatigue through conscious frameworks</li>
                  <li>• Regulate your nervous system for sustainable presence</li>
                  <li>• Replace burnout with boundless energy through somatic practices</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Solution Clarity */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Conscious Leadership Changes Everything</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              When you master your internal state, external leadership becomes effortless. Our program develops the nervous system regulation, emotional intelligence, and ancient wisdom that creates unshakeable leadership presence.
            </p>
            
            {/* Evidence-Based Leadership Transformation */}
            <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-700 max-w-5xl mx-auto mb-16">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">Evidence-Based Leadership Transformation</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className="text-gray-300">Monthly lessons combining ancient wisdom with neuroscience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className="text-gray-300">Daily somatic practices for nervous system regulation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className="text-gray-300">Group coaching calls with like-minded leaders</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className="text-gray-300">Conflict resolution mastery training</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className="text-gray-300">Decision-making frameworks that eliminate fatigue</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className="text-gray-300">Burnout prevention through presence-based leadership</span>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-8">Your Leadership Transformation Journey</h3>
              <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 text-center">
                  <div className="bg-yellow-400 text-black rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4 font-bold">1</div>
                  <h4 className="text-white font-semibold mb-2">Take Assessment</h4>
                  <p className="text-sm text-gray-300">Identify your leadership growth edges</p>
                </div>
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 text-center">
                  <div className="bg-yellow-400 text-black rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4 font-bold">2</div>
                  <h4 className="text-white font-semibold mb-2">Choose Level</h4>
                  <p className="text-sm text-gray-300">Select membership based on transformation commitment</p>
                </div>
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 text-center">
                  <div className="bg-yellow-400 text-black rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4 font-bold">3</div>
                  <h4 className="text-white font-semibold mb-2">Access Lessons</h4>
                  <p className="text-sm text-gray-300">Build conscious leadership capacity monthly</p>
                </div>
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 text-center">
                  <div className="bg-yellow-400 text-black rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4 font-bold">4</div>
                  <h4 className="text-white font-semibold mb-2">Daily Practice</h4>
                  <p className="text-sm text-gray-300">Master nervous system regulation</p>
                </div>
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 text-center">
                  <div className="bg-yellow-400 text-black rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4 font-bold">5</div>
                  <h4 className="text-white font-semibold mb-2">Group Support</h4>
                  <p className="text-sm text-gray-300">Integrate learning with peer coaching</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Tiers */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Choose Your Leadership Transformation Level</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <SubscriptionButton
                plan="foundation"
                price={77}
                billing="monthly"
                onSubscribe={(plan) => console.log('Subscribe to:', plan)}
                className="transform hover:scale-105 transition-all duration-300"
              />
              <SubscriptionButton
                plan="mastery"
                price={444}
                billing="monthly"
                onSubscribe={(plan) => console.log('Subscribe to:', plan)}
                className="transform hover:scale-105 transition-all duration-300"
              />
              <SubscriptionButton
                plan="executive"
                price={777}
                billing="monthly"
                onSubscribe={(plan) => console.log('Subscribe to:', plan)}
                className="transform hover:scale-105 transition-all duration-300"
              />
            </div>
            
            {/* Call to Action */}
            <div className="mt-12">
              <Button 
                size="lg" 
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl px-8 py-4"
                onClick={() => navigate('/assessment')}
              >
                Start Your Leadership Transformation
              </Button>
              <p className="text-gray-400 mt-4">Take the assessment & choose your path to conscious leadership</p>
            </div>
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
