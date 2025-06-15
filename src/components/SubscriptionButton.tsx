
import React from "react";
import { Button } from "@/components/ui/button";

interface SubscriptionButtonProps {
  tier: "gold" | "silver" | "red";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const TIER_STYLES = {
  gold: {
    bg: "bg-gradient-to-r from-[#E0B848] to-[#B08B18]",
    text: "text-black",
    border: "border-yellow-400",
    ring: "focus-visible:ring-yellow-400",
  },
  silver: {
    bg: "bg-gradient-to-r from-[#DEE2E6] to-[#B0B6BC]",
    text: "text-gray-900",
    border: "border-gray-300",
    ring: "focus-visible:ring-gray-300",
  },
  red: {
    bg: "bg-gradient-to-r from-[#AD1E2D] to-[#7A151F]",
    text: "text-white",
    border: "border-red-800",
    ring: "focus-visible:ring-red-800",
  },
};

export default function SubscriptionButton({
  tier,
  children,
  onClick,
  className = "",
}: SubscriptionButtonProps) {
  const style = TIER_STYLES[tier];
  return (
    <Button
      className={`
        w-full py-3 px-6 rounded-full shadow-sm 
        text-base font-bold uppercase transition-all border-2
        ${style.bg} ${style.text} ${style.border} ${style.ring}
        hover:scale-105
        ${className}
      `}
      onClick={onClick}
      style={{
        minHeight: 56,
        boxShadow: tier === "silver"
          ? "0 2px 12px 0 rgba(176,182,188, 0.10)"
          : tier === "gold"
          ? "0 2px 12px 0 rgba(224,184,72,0.17)"
          : "0 2px 12px 0 rgba(173,30,45,0.12)"
      }}
    >
      {children}
    </Button>
  );
}
