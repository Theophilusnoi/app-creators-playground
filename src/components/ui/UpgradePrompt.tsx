
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Sparkles, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { useSubscription } from '@/contexts/SubscriptionContext';

interface UpgradePromptProps {
  feature: string;
  description: string;
  benefits: string[];
  requiredTier?: 'fire' | 'ether';
  className?: string;
  compact?: boolean;
}

const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  feature,
  description,
  benefits,
  requiredTier = 'fire',
  className = '',
  compact = false
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscribed } = useSubscription();

  const tierInfo = {
    fire: {
      name: 'Fire Keeper',
      color: 'from-orange-500 to-red-500',
      price: '$19.70/month',
      icon: <Crown className="w-5 h-5 text-yellow-400" />
    },
    ether: {
      name: 'Ether Walker',
      color: 'from-purple-500 to-indigo-500',
      price: '$49.70/month',
      icon: <Star className="w-5 h-5 text-purple-400" />
    }
  };

  const tier = tierInfo[requiredTier];

  const handleUpgrade = () => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate('/pricing');
    }
  };

  if (compact) {
    return (
      <Card className={`bg-gradient-to-r ${tier.color} bg-opacity-10 border-opacity-30 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {tier.icon}
              <div>
                <h4 className="font-semibold text-white">{feature}</h4>
                <p className="text-sm text-gray-300">Requires {tier.name}</p>
              </div>
            </div>
            <Button 
              onClick={handleUpgrade}
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              Upgrade
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-gray-900/50 border-purple-500/30 text-white backdrop-blur-sm ${className}`}>
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-full flex items-center justify-center`}>
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl flex items-center justify-center gap-2 mb-2">
          {tier.icon}
          <span>{feature}</span>
        </CardTitle>
        <p className="text-purple-200">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 rounded-lg border border-purple-500/30">
          <h3 className="font-semibold text-purple-200 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4" />
            What You'll Unlock:
          </h3>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-purple-300 text-sm flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-0.5 text-purple-400 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <Badge variant="secondary" className="mb-4 bg-yellow-600/20 text-yellow-300 border-yellow-500/30">
            {tier.name} Plan - {tier.price}
          </Badge>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={handleUpgrade}
              className={`bg-gradient-to-r ${tier.color} hover:opacity-90 px-6 py-3`}
              size="lg"
            >
              {!user ? 'Sign In & Upgrade' : 'Upgrade Now'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              onClick={() => navigate('/pricing')}
              variant="outline"
              className="border-purple-400 text-purple-200 hover:bg-purple-600/20 px-6 py-3"
              size="lg"
            >
              View All Plans
            </Button>
          </div>
        </div>

        {!user && (
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
            <p className="text-yellow-200 text-sm text-center">
              <strong>New to SpiritualMind?</strong> Create your free account to explore basic features before upgrading.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpgradePrompt;
