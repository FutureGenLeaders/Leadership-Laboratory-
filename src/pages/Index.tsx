import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Auth from '@/components/Auth';
import MorningSession from '@/components/MorningSession';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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
        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome, {user.user_metadata?.full_name || user.email}!</h1>
          <p className="text-gray-300">Begin your journey to nervous system leadership.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Your Daily Protocol Dashboard</h2>
          <MorningSession />
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
