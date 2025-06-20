
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Lock } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useNavigate } from 'react-router-dom';

interface PremiumFeatureGateProps {
  requiredTier?: 'basic' | 'premium' | 'pro';
  featureName: string;
  description: string;
  children?: React.ReactNode;
}

const tierHierarchy = {
  basic: 1,
  premium: 2,
  pro: 3,
};

const PremiumFeatureGate: React.FC<PremiumFeatureGateProps> = ({
  requiredTier = 'basic',
  featureName,
  description,
  children,
}) => {
  const { subscribed, subscriptionTier } = useSubscription();
  const navigate = useNavigate();

  const hasAccess = subscribed && subscriptionTier && 
    tierHierarchy[subscriptionTier as keyof typeof tierHierarchy] >= tierHierarchy[requiredTier];

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <Card className="bg-gray-900 border-gray-700 text-white">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-xl flex items-center justify-center space-x-2">
          <Crown className="w-5 h-5 text-yellow-400" />
          <span>Premium Feature</span>
        </CardTitle>
        <CardDescription className="text-gray-300">
          {featureName}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="text-center space-y-4">
        <p className="text-gray-400">{description}</p>
        
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 rounded-lg border border-purple-500/30">
          <p className="text-sm text-purple-300 mb-3">
            Upgrade to <span className="font-semibold capitalize">{requiredTier}</span> plan to unlock this feature
          </p>
          <Button 
            onClick={() => navigate('/pricing')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
          >
            View Plans
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumFeatureGate;
