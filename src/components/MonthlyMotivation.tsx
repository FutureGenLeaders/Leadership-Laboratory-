
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Flame } from "lucide-react";

// Example motivation - for a real app, rotate monthly or fetch from the server.
const MONTHLY_QUOTES = [
  {
    quote: "Great leaders are not born, they are made through consistency and conscious practice.",
    author: "Unknown",
  },
  {
    quote: "This month, let your leadership presence be the catalyst for positive change.",
    author: "The Leadership Laboratory",
  },
  {
    quote: "Self-regulation is not a skill, it is the foundation of all wise action.",
    author: "Dr. Sarah Sanusi",
  }
];

function getMonthlyQuote() {
  // Use the current month as an index to rotate quotes
  const date = new Date();
  const idx = date.getMonth() % MONTHLY_QUOTES.length;
  return MONTHLY_QUOTES[idx];
}

const MonthlyMotivation: React.FC = () => {
  const quote = getMonthlyQuote();
  return (
    <Card className="mb-6 animate-fade-in bg-gradient-to-br from-orange-100 via-yellow-50 to-yellow-200 shadow">
      <CardHeader className="flex flex-row items-center gap-2">
        <Flame className="text-orange-400 w-6 h-6 mr-2" />
        <CardTitle className="text-lg font-bold text-gray-700">Monthly Motivation</CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="text-xl italic text-gray-800 mb-2">&ldquo;{quote.quote}&rdquo;</blockquote>
        <CardDescription className="text-right text-gray-600">— {quote.author}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default MonthlyMotivation;
