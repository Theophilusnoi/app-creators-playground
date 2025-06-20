
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Zap, Sparkles, Calendar, RefreshCw } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';

const SubscriptionStatus = () => {
  const { 
    subscribed, 
    subscriptionTier, 
    subscriptionEnd, 
    loading, 
    checkSubscription, 
    openCustomerPortal 
  } = useSubscription();

  const getTierIcon = (tier: string | null) => {
    switch (tier) {
      case 'basic':
        return <Sparkles className="w-6 h-6 text-blue-400" />;
      case 'premium':
        return <Zap className="w-6 h-6 text-purple-400" />;
      case 'pro':
        return <Crown className="w-6 h-6 text-yellow-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-gray-400" />;
    }
  };

  const getTierName = (tier: string | null) => {
    switch (tier) {
      case 'basic':
        return 'Basic Plan';
      case 'premium':
        return 'Premium Plan';
      case 'pro':
        return 'Pro Plan';
      default:
        return 'Free Plan';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="bg-gray-900 border-gray-700 text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getTierIcon(subscriptionTier)}
            <div>
              <CardTitle className="text-xl">
                {getTierName(subscriptionTier)}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {subscribed ? 'Active Subscription' : 'Free Account'}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={checkSubscription}
            disabled={loading}
            className="border-gray-600 hover:bg-gray-800"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {subscribed && subscriptionEnd && (
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Calendar className="w-4 h-4" />
            <span>Renews on {formatDate(subscriptionEnd)}</span>
          </div>
        )}

        <div className="flex space-x-2">
          {subscribed ? (
            <Button
              onClick={openCustomerPortal}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
            >
              Manage Subscription
            </Button>
          ) : (
            <Button
              onClick={() => window.location.href = '/pricing'}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
            >
              Upgrade to Premium
            </Button>
          )}
        </div>

        {subscribed && (
          <div className="text-xs text-gray-400 bg-gray-800 p-3 rounded-lg">
            <p className="font-semibold mb-1">Premium Benefits Active:</p>
            <ul className="space-y-1">
              <li>• Advanced spiritual guidance</li>
              <li>• Personalized rituals and practices</li>
              <li>• Priority community support</li>
              {subscriptionTier === 'pro' && (
                <li>• Exclusive one-on-one sessions</li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionStatus;
