
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { WISDOM_TIERS } from '@/types/subscription';
import { useNavigate } from 'react-router-dom';
import { 
  Crown, 
  Calendar, 
  Settings, 
  Sparkles,
  ArrowUpCircle
} from 'lucide-react';

export const SubscriptionStatusCard: React.FC = () => {
  const navigate = useNavigate();
  const { subscribed, subscriptionTier, subscriptionEnd, loading } = useSubscription();

  const currentTier = WISDOM_TIERS.find(tier => tier.id === subscriptionTier);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'earth': return '🌍';
      case 'water': return '🌊';
      case 'fire': return '🔥';
      case 'ether': return '✨';
      default: return '⭐';
    }
  };

  if (loading) {
    return (
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!subscribed) {
    return (
      <Card className="border-2 border-dashed border-purple-300 bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardContent className="p-6 text-center">
          <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-purple-800 mb-2">
            Unlock Your Spiritual Journey
          </h3>
          <p className="text-purple-600 mb-4 text-sm">
            Choose a wisdom tier to access premium features and personalized guidance
          </p>
          <Button 
            onClick={() => navigate('/pricing')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Crown className="w-4 h-4 mr-2" />
            View Plans
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentTier && (
              <div className="text-2xl">{getElementIcon(currentTier.element)}</div>
            )}
            <div>
              <CardTitle className="text-lg text-purple-800 flex items-center gap-2">
                {currentTier?.name || 'Active Plan'}
                <Badge className="bg-purple-600 text-white text-xs">
                  <Crown className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </CardTitle>
              {currentTier && (
                <p className="text-sm text-purple-600">{currentTier.description}</p>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span className="text-purple-700">
              {subscriptionEnd ? `Renews ${formatDate(subscriptionEnd)}` : 'Active'}
            </span>
          </div>
          {currentTier && (
            <span className="font-semibold text-purple-800">
              ${currentTier.monthlyPrice}/mo
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={() => navigate('/plan-management')}
            size="sm"
            variant="outline"
            className="flex items-center gap-2 text-purple-700 border-purple-300 hover:bg-purple-100"
          >
            <Settings className="w-4 h-4" />
            Manage
          </Button>
          <Button 
            onClick={() => navigate('/pricing')}
            size="sm"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
          >
            <ArrowUpCircle className="w-4 h-4" />
            Upgrade
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
