
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Medal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type LeaderboardEntry = {
  full_name: string | null;
  email: string;
  count: number;
};

export const Leaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get top users by completed session count. Pseudocode assumes you have "user_id" and "status" in bookings.
    const getLeaders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select("user_id, status")
        .eq("status", "completed");
      if (error) {
        setLoading(false);
        return;
      }
      // Tally sessions per user
      const sessionCounts: { [key: string]: number } = {};
      data.forEach((b: any) => {
        if (b.user_id) sessionCounts[b.user_id] = (sessionCounts[b.user_id] || 0) + 1;
      });
      // Sort and get top 5
      const userIds = Object.keys(sessionCounts)
        .map(uid => ({ user_id: uid, count: sessionCounts[uid] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      // Look up names/emails
      let profiles: any[] = [];
      if (userIds.length) {
        const ids = userIds.map(u => u.user_id);
        const { data: profileData } = await supabase
          .from("user_profiles")
          .select("user_id, full_name, email")
          .in("user_id", ids);
        profiles = profileData || [];
      }
      // Merge list
      const leaderboard = userIds.map(u => {
        const profile = profiles.find(p => p.user_id === u.user_id);
        return {
          full_name: profile?.full_name || null,
          email: profile?.email || "Unknown",
          count: u.count,
        };
      });
      setLeaders(leaderboard);
      setLoading(false);
    };
    getLeaders();
  }, []);

  return (
    <Card className="bg-gradient-to-br from-yellow-800 via-yellow-900 to-yellow-950 text-white mb-6 animate-fade-in">
      <CardHeader className="flex items-center gap-2">
        <Medal className="w-5 h-5 text-yellow-400" />
        <CardTitle className="text-lg">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-gray-300">Loading top leaders...</div>
        ) : leaders.length === 0 ? (
          <div className="text-gray-300 italic">No leaderboard data yet.</div>
        ) : (
          <ul className="divide-y divide-yellow-700">
            {leaders.map((leader, i) => (
              <li key={i} className="flex justify-between py-2 items-center">
                <span className="font-semibold">
                  {leader.full_name ?? leader.email.split("@")[0]}
                </span>
                <span className="text-sm text-yellow-300">{leader.count} sessions</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
