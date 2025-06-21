
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Star, Zap, Check, ArrowRight } from 'lucide-react';

interface SubscriptionButtonProps {
  plan: 'foundation' | 'mastery' | 'executive';
  currentPlan?: 'free' | 'foundation' | 'mastery' | 'executive';
  price: number;
  billing: 'monthly' | 'annual';
  onSubscribe: (plan: string) => void;
  className?: string;
}

const PLAN_CONFIG = {
  foundation: {
    name: 'Foundation',
    icon: Star,
    color: 'gold',
    features: [
      '2 Consciousness Lessons/month',
      '1 Group Coaching Call/month',
      'Daily Somatic Practices',
      'Progress Tracking',
      'Community Access'
    ],
    popular: false
  },
  mastery: {
    name: 'Mastery',
    icon: Zap,
    color: 'gold',
    features: [
      '4 Consciousness Lessons/month',
      '1 Group Coaching Call/month',
      'Enhanced Daily Practices',
      'Advanced Assessments',
      'Biometric Integration',
      'AI Personalization'
    ],
    popular: true
  },
  executive: {
    name: 'Executive Circle',
    icon: Crown,
    color: 'gold',
    features: [
      '4 Consciousness Lessons/month',
      '1 Group Coaching Call/month',
      'Enhanced Daily Practices',
      '1-on-1 Coaching Sessions',
      'Priority Support',
      'Exclusive Content'
    ],
    popular: false
  }
};

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  plan,
  currentPlan = 'free',
  price,
  billing,
  onSubscribe,
  className
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const config = PLAN_CONFIG[plan];
  const IconComponent = config.icon;
  
  const isCurrentPlan = currentPlan === plan;
  const isUpgrade = getUpgradeLevel(currentPlan) < getUpgradeLevel(plan);
  const isDowngrade = getUpgradeLevel(currentPlan) > getUpgradeLevel(plan);

  function getUpgradeLevel(planType: string): number {
    const levels = { free: 0, foundation: 1, mastery: 2, executive: 3 };
    return levels[planType as keyof typeof levels] || 0;
  }

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      await onSubscribe(plan);
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isCurrentPlan) return 'Current Plan';
    if (isUpgrade) return `Upgrade to ${config.name}`;
    if (isDowngrade) return `Switch to ${config.name}`;
    return `Choose ${config.name}`;
  };

  return (
    <Card className={`premium-card relative ${config.popular ? 'ring-2 ring-yellow-400' : ''} ${className}`}>
      {config.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-red-600 text-black px-4 py-1 font-semibold">
          Most Popular
        </Badge>
      )}
      
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="feature-icon">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold accent-text">{config.name}</h3>
          </div>
          
          <div className="space-y-1">
            <div className="text-3xl font-bold accent-text">
              ${price}
              <span className="text-lg font-normal body-text">
                /{billing === 'monthly' ? 'mo' : 'yr'}
              </span>
            </div>
            {billing === 'annual' && (
              <Badge variant="outline" className="text-green-400 border-green-400">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {config.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 accent-text flex-shrink-0" />
              <span className="body-text text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <Button
          onClick={handleSubscribe}
          disabled={isCurrentPlan || isLoading}
          className={`w-full font-semibold ${
            isCurrentPlan 
              ? 'btn-premium-secondary opacity-50' 
              : 'btn-premium-primary'
          }`}
          variant={isCurrentPlan ? 'outline' : 'default'}
        >
          {isLoading ? (
            'Processing...'
          ) : (
            <div className="flex items-center gap-2">
              {getButtonText()}
              {!isCurrentPlan && <ArrowRight className="w-4 h-4" />}
            </div>
          )}
        </Button>

        {/* Additional Info */}
        {isUpgrade && (
          <p className="text-xs accent-text text-center">
            Unlock advanced features immediately
          </p>
        )}
        
        {isCurrentPlan && (
          <p className="text-xs body-text text-center">
            You have full access to all features
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionButton;
