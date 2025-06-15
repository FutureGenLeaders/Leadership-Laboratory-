
import React from 'react';
import { useTrialAccess } from '@/hooks/useTrialAccess';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TrialBanner: React.FC = () => {
  const { isInTrial, trialDaysLeft, hasTrialExpired, loading } = useTrialAccess();
  const navigate = useNavigate();

  if (loading) return null;

  if (hasTrialExpired) {
    return (
      <Card className="mb-6 bg-gradient-to-r from-red-900/20 to-red-800/20 border-red-600/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-red-400" />
              <div>
                <h3 className="text-white font-semibold">Trial Expired</h3>
                <p className="text-red-300 text-sm">Your 14-day free trial has ended. Upgrade to continue accessing premium features.</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/booking')}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Upgrade Now
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isInTrial) {
    return (
      <Card className="mb-6 bg-gradient-to-r from-yellow-900/20 to-amber-800/20 border-yellow-600/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-yellow-400" />
              <div>
                <h3 className="text-white font-semibold">Free Trial Active</h3>
                <p className="text-yellow-200 text-sm">
                  {trialDaysLeft} {trialDaysLeft === 1 ? 'day' : 'days'} remaining in your free trial
                </p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/booking')}
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
            >
              Upgrade Early
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default TrialBanner;
