
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useTrialAccess } from "@/hooks/useTrialAccess";
import { supabase } from "@/integrations/supabase/client";
import { Medal, Flame, Calendar, User as UserIcon, Crown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper to calculate session streak
function calculateStreak(sessionDates: string[]): number {
  if (!sessionDates.length) return 0;
  const sortedDates = sessionDates
    .map(d => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());
  let streak = 1;
  let prev = sortedDates[0];
  for (let i = 1; i < sortedDates.length; i++) {
    const diff = Math.floor((prev.getTime() - sortedDates[i].getTime()) / (1000 * 3600 * 24));
    if (diff === 1) {
      streak += 1;
    } else if (diff > 1) {
      break;
    }
    prev = sortedDates[i];
  }
  // Only show streak if today's session completed, otherwise 0
  const today = new Date();
  const isToday =
    sortedDates[0].getFullYear() === today.getFullYear() &&
    sortedDates[0].getMonth() === today.getMonth() &&
    sortedDates[0].getDate() === today.getDate();
  return isToday ? streak : 0;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { isInTrial, trialDaysLeft, hasTrialExpired, trialStartDate, loading: trialLoading } = useTrialAccess();

  // State to hold booking/session data
  const [sessionHistory, setSessionHistory] = useState<any[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;
      setLoadingSessions(true);
      const { data, error } = await supabase
        .from("bookings")
        .select("session_date, session_time, session_type, status")
        .eq("user_id", user.id)
        .order("session_date", { ascending: false });
      if (!error && data) {
        setSessionHistory(data);
      }
      setLoadingSessions(false);
    };
    fetchSessions();
  }, [user]);

  // Calculate live stats
  const completedSessions = sessionHistory
    .filter(s => s.status === "completed")
    .sort((a, b) => new Date(b.session_date).getTime() - new Date(a.session_date).getTime());

  const sessionStreak = calculateStreak(completedSessions.map(s => s.session_date));
  const totalSessions = completedSessions.length;

  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString()
    : "Unknown";

  return (
    <div className="max-w-xl mx-auto mt-6 p-4">
      <Card className="mb-6 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center gap-3">
          <UserIcon className="w-8 h-8 text-yellow-400" />
          <div>
            <CardTitle className="text-lg text-yellow-200 font-semibold">
              {user?.user_metadata?.full_name ?? user?.email ?? "Your Profile"}
            </CardTitle>
            <div className="text-xs text-gray-300">Joined: {joinDate}</div>
          </div>
        </CardHeader>
        <CardContent className="flex gap-4 mt-2">
          <div className="flex items-center gap-2 bg-gray-800 rounded px-3 py-2">
            <Flame className="w-5 h-5 text-red-400" />
            <span className="text-sm">{loadingSessions ? "--" : sessionStreak} day streak</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 rounded px-3 py-2">
            <Medal className="w-5 h-5 text-yellow-400" />
            <span className="text-sm">{loadingSessions ? "--" : totalSessions} sessions</span>
          </div>
        </CardContent>
      </Card>

      {/* Trial Status Card */}
      {!trialLoading && (
        <Card className="mb-6 bg-gray-950 border border-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              {isInTrial ? (
                <>
                  <Crown className="w-5 h-5 text-yellow-400" />
                  Free Trial Active
                </>
              ) : hasTrialExpired ? (
                <>
                  <Clock className="w-5 h-5 text-red-400" />
                  Trial Expired
                </>
              ) : (
                <>
                  <Crown className="w-5 h-5 text-gray-400" />
                  Trial Status
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isInTrial && (
              <div className="space-y-2">
                <p className="text-yellow-200">
                  {trialDaysLeft} {trialDaysLeft === 1 ? 'day' : 'days'} remaining
                </p>
                <p className="text-xs text-gray-400">
                  Trial started: {trialStartDate?.toLocaleDateString()}
                </p>
              </div>
            )}
            {hasTrialExpired && (
              <div className="space-y-2">
                <p className="text-red-300">Your free trial has ended</p>
                <p className="text-xs text-gray-400">Upgrade to continue accessing premium features</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="bg-gray-950 border border-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-base">Session History</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingSessions ? (
            <p className="text-gray-500 text-sm">Loading session history...</p>
          ) : completedSessions.length === 0 ? (
            <ul className="space-y-3 mt-1">
              <li className="flex items-center gap-2 text-gray-400 italic">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span>No session data yet</span>
              </li>
            </ul>
          ) : (
            <ul className="space-y-3 mt-1">
              {completedSessions.slice(0, 5).map((session, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>
                    {session.session_date} {session.session_time && <>{session.session_time}</>}
                  </span>
                  <span className="ml-auto text-xs bg-green-800 px-2 py-1 rounded">Completed</span>
                </li>
              ))}
              {completedSessions.length > 5 && (
                <li className="text-xs text-gray-400 italic">Showing latest 5 of {completedSessions.length} sessions</li>
              )}
            </ul>
          )}
          <Button variant="secondary" className="mt-5 w-full text-gray-900 font-semibold">
            Download Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;

