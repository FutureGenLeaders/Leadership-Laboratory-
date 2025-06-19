
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
    color: 'blue',
    features: [
      '4 Consciousness Lessons/month',
      'Progress Tracking',
      'Community Access',
      'Basic Assessments'
    ],
    popular: false
  },
  mastery: {
    name: 'Mastery',
    icon: Zap,
    color: 'purple',
    features: [
      'Everything in Foundation',
      'Advanced Assessments',
      'Biometric Integration',
      'AI Personalization',
      'Masterclass Library'
    ],
    popular: true
  },
  executive: {
    name: 'Executive Circle',
    icon: Crown,
    color: 'yellow',
    features: [
      'Everything in Mastery',
      '1-on-1 Coaching Sessions',
      'Priority Support',
      'Exclusive Content',
      'Strategic Planning'
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

  const getButtonVariant = () => {
    if (isCurrentPlan) return 'outline';
    if (config.color === 'yellow') return 'default';
    return 'default';
  };

  const getButtonColor = () => {
    if (isCurrentPlan) return 'border-gray-600 text-gray-400';
    if (config.color === 'blue') return 'bg-blue-600 hover:bg-blue-700 text-white';
    if (config.color === 'purple') return 'bg-purple-600 hover:bg-purple-700 text-white';
    if (config.color === 'yellow') return 'bg-yellow-600 hover:bg-yellow-700 text-black';
    return '';
  };

  return (
    <Card className={`relative ${config.popular ? 'ring-2 ring-purple-500' : ''} ${className}`}>
      {config.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1">
          Most Popular
        </Badge>
      )}
      
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <IconComponent className={`w-8 h-8 text-${config.color}-400`} />
            <h3 className="text-2xl font-bold text-white">{config.name}</h3>
          </div>
          
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">
              ${price}
              <span className="text-lg font-normal text-gray-400">
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
              <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <Button
          onClick={handleSubscribe}
          disabled={isCurrentPlan || isLoading}
          className={`w-full font-semibold ${getButtonColor()}`}
          variant={getButtonVariant()}
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
          <p className="text-xs text-green-400 text-center">
            Unlock advanced features immediately
          </p>
        )}
        
        {isCurrentPlan && (
          <p className="text-xs text-gray-500 text-center">
            You have full access to all features
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionButton;
