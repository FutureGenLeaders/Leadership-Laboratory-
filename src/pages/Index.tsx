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
import { supabase } from "@/integrations/supabase/client"; // <-- FIXED: Added import
import MonthlyMotivation from "@/components/MonthlyMotivation";

// Mock for MorningSessionProps
const DEFAULT_LEVEL = 1; // Change this to a number (e.g., 1) to match the expected prop type

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
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Sacred Circle</h1>
        <Auth onSuccess={() => navigate('/level-selection')} />
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

        {/* Notification toasts handled with useToast */}

        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome, {user.user_metadata?.full_name || user.email}!</h1>
          <p className="text-gray-300">Begin your journey to nervous system leadership.</p>
        </section>

        {/* MVP: Leaderboard */}
        <Leaderboard />

        {/* Trial Banner */}
        <TrialBanner />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Your Daily Protocol Dashboard</h2>
          {/* Pass required props to MorningSession */}
          <MorningSession level={DEFAULT_LEVEL} onComplete={() => {}} />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Unlock Your Potential</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Masterclass Library</CardTitle>
                <CardDescription className="text-gray-400">Dive into curated content.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Access a wealth of knowledge to deepen your understanding.</p>
                <Button variant="secondary" onClick={() => navigate('/masterclass-library')}>Explore Now</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Sacred Circle</CardTitle>
                <CardDescription className="text-gray-400">Connect with like-minded leaders.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Engage in discussions and share experiences.</p>
                <Button variant="secondary" onClick={() => navigate('/sacred-circle')}>Join the Circle</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Strategic Sessions</CardTitle>
                <CardDescription className="text-gray-400">Transform your business.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Book strategic sessions to elevate your business acumen.</p>
                <Button variant="secondary" onClick={() => navigate('/strategic-sessions')}>Book Now</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Subscription Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Basic Access</CardTitle>
                <CardDescription className="text-gray-400">Free</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Access to core content and community features.</p>
                <Button variant="outline" disabled>Current Plan</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Premium Membership</CardTitle>
                <CardDescription className="text-gray-400">$49/month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Unlock exclusive content, sessions, and personalized support.</p>
                <Button onClick={() => navigate('/booking')}>Upgrade Now</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Executive Circle</CardTitle>
                <CardDescription className="text-gray-400">$499/month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">The ultimate package with 1:1 coaching and VIP access.</p>
                <Button onClick={() => navigate('/booking')}>Explore Benefits</Button>
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
