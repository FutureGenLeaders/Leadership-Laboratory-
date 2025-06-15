
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";

type InsightsProps = {
  fullName?: string;
  streak: number;
  totalSessions: number;
};

export const PersonalizedInsights: React.FC<InsightsProps> = ({ fullName, streak, totalSessions }) => {
  let message = "Let's get started on your leadership journey!";
  if (totalSessions && streak) {
    message = `🔥 Keep up your ${streak}-day streak, ${fullName || "leader"}! You've completed ${totalSessions} sessions.`;
  } else if (totalSessions) {
    message = `You've completed ${totalSessions} sessions so far. Consistency leads to mastery!`;
  } else if (streak) {
    message = `You're on a ${streak}-day streak! Great momentum.`;
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white mb-6 animate-fade-in">
      <CardHeader className="flex items-center gap-2">
        <Flame className="w-5 h-5 text-orange-400" />
        <CardTitle className="text-lg">Personalized Insight</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-base font-medium">{message}</div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedInsights;
