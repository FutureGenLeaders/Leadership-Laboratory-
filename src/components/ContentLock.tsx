
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Lock, Crown, Calendar, Award, Zap, Star } from 'lucide-react';

interface ContentLockProps {
  requiredLevel?: 'foundation' | 'mastery' | 'executive';
  userLevel?: 'free' | 'foundation' | 'mastery' | 'executive';
  contentType?: 'lesson' | 'assessment' | 'masterclass' | 'session';
  title: string;
  description: string;
  children?: React.ReactNode;
  unlockDate?: string;
  completionRequired?: boolean;
  weekNumber?: number;
  releaseDate?: Date;
  timeUntilRelease?: string;
}

const LEVEL_HIERARCHY = {
  free: 0,
  foundation: 1,
  mastery: 2,
  executive: 3
};

const LEVEL_COLORS = {
  foundation: 'text-blue-400',
  mastery: 'text-purple-400',
  executive: 'text-yellow-400'
};

const LEVEL_ICONS = {
  foundation: Star,
  mastery: Zap,
  executive: Crown
};

const ContentLock: React.FC<ContentLockProps> = ({
  requiredLevel = 'foundation',
  userLevel = 'free',
  contentType = 'lesson',
  title,
  description,
  children,
  unlockDate,
  completionRequired = false,
  weekNumber,
  releaseDate,
  timeUntilRelease
}) => {
  const [timeUntilUnlock, setTimeUntilUnlock] = useState<string>('');
  
  const hasAccess = LEVEL_HIERARCHY[userLevel] >= LEVEL_HIERARCHY[requiredLevel];
  const effectiveUnlockDate = unlockDate || (releaseDate ? releaseDate.toISOString() : undefined);
  const isUnlocked = !effectiveUnlockDate || new Date() >= new Date(effectiveUnlockDate);
  
  useEffect(() => {
    if (effectiveUnlockDate && !isUnlocked) {
      const updateCountdown = () => {
        const now = new Date().getTime();
        const target = new Date(effectiveUnlockDate).getTime();
        const difference = target - now;
        
        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          
          setTimeUntilUnlock(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeUntilUnlock('Available now!');
        }
      };
      
      updateCountdown();
      const interval = setInterval(updateCountdown, 60000);
      return () => clearInterval(interval);
    }
  }, [effectiveUnlockDate, isUnlocked]);

  if (hasAccess && isUnlocked) {
    return <>{children}</>;
  }

  const IconComponent = LEVEL_ICONS[requiredLevel];
  const levelColor = LEVEL_COLORS[requiredLevel];
  const displayTimeUntilRelease = timeUntilRelease || timeUntilUnlock;

  return (
    <Card className="bg-gray-900 border-gray-700 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-black/50 z-10" />
      
      {/* Blurred content preview */}
      {children && (
        <div className="absolute inset-0 filter blur-sm opacity-30">
          {children}
        </div>
      )}
      
      {/* Lock content */}
      <div className="relative z-20 p-6 flex items-center justify-center min-h-[300px]">
        <div className="text-center space-y-6 max-w-md">
          <div className="flex items-center justify-center gap-3">
            {!hasAccess ? (
              <Lock className="w-12 h-12 text-gray-400" />
            ) : (
              <Calendar className="w-12 h-12 text-yellow-400" />
            )}
            <IconComponent className={`w-12 h-12 ${levelColor}`} />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 mb-4">{description}</p>
            
            {!hasAccess ? (
              <Badge className={`${levelColor} bg-transparent border-current mb-4`}>
                {requiredLevel.charAt(0).toUpperCase() + requiredLevel.slice(1)} Level Required
              </Badge>
            ) : !isUnlocked ? (
              <div className="space-y-2">
                {weekNumber && (
                  <Badge className="text-yellow-400 bg-transparent border-current">
                    Week {weekNumber}
                  </Badge>
                )}
                {displayTimeUntilRelease && (
                  <Badge className="text-yellow-400 bg-transparent border-current">
                    Unlocks in: {displayTimeUntilRelease}
                  </Badge>
                )}
                {effectiveUnlockDate && (
                  <p className="text-sm text-gray-500">
                    Available on {new Date(effectiveUnlockDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ) : null}
          </div>
          
          {!hasAccess && (
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Upgrade to access this {contentType} and unlock your full potential
              </p>
              
              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-semibold">
                  Upgrade to {requiredLevel.charAt(0).toUpperCase() + requiredLevel.slice(1)}
                </Button>
                
                {requiredLevel !== 'foundation' && (
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                    View All Plans
                  </Button>
                )}
              </div>
              
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h4 className="text-white font-semibold mb-2">What you'll get:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  {requiredLevel === 'foundation' && (
                    <>
                      <li>• 4 Consciousness Lessons per month</li>
                      <li>• Progress tracking & insights</li>
                      <li>• Community access</li>
                    </>
                  )}
                  {requiredLevel === 'mastery' && (
                    <>
                      <li>• Everything in Foundation</li>
                      <li>• Advanced assessments</li>
                      <li>• Biometric integration</li>
                      <li>• AI-powered personalization</li>
                    </>
                  )}
                  {requiredLevel === 'executive' && (
                    <>
                      <li>• Everything in Mastery</li>
                      <li>• 1-on-1 coaching sessions</li>
                      <li>• Priority support</li>
                      <li>• Exclusive masterclasses</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
          
          {hasAccess && !isUnlocked && (
            <div className="space-y-4">
              <Award className="w-16 h-16 text-yellow-400 mx-auto" />
              <p className="text-gray-300">
                You have access! This content will unlock automatically on the scheduled date.
              </p>
              <Progress value={75} className="h-2" />
              <p className="text-sm text-gray-500">
                Stay consistent with your current lessons to maximize readiness
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ContentLock;
