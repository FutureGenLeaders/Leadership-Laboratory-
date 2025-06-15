
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "@supabase/supabase-js";
import { useAuth } from "@/contexts/AuthContext";
import { useTrialAccess } from "@/hooks/useTrialAccess";
import { Medal, Flame, Calendar, User as UserIcon, Crown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { isInTrial, trialDaysLeft, hasTrialExpired, trialStartDate, loading: trialLoading } = useTrialAccess();

  // Mocked streaks/session data - replace with real data (next step)
  const sessionStreak = 4; // days in a row
  const totalSessions = 17;
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
            <span className="text-sm">{sessionStreak} day streak</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 rounded px-3 py-2">
            <Medal className="w-5 h-5 text-yellow-400" />
            <span className="text-sm">{totalSessions} sessions</span>
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
          {/* Stub list — fetch in next steps */}
          <ul className="space-y-3 mt-1">
            <li className="flex items-center gap-2 text-gray-300">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>2024-06-14 Morning Activation</span>
              <span className="ml-auto text-xs bg-green-800 px-2 py-1 rounded">Completed</span>
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>2024-06-13 Evening Integration</span>
              <span className="ml-auto text-xs bg-green-800 px-2 py-1 rounded">Completed</span>
            </li>
            <li className="flex items-center gap-2 text-gray-400 italic">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span>No more session data yet</span>
            </li>
          </ul>
          <Button variant="secondary" className="mt-5 w-full text-gray-900 font-semibold">
            Download Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
