
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/components/auth/AuthProvider';
import { WISDOM_TIERS } from '@/types/subscription';
import { useToast } from '@/hooks/use-toast';
import { 
  Crown, 
  Sparkles, 
  Check, 
  ExternalLink, 
  Calendar,
  CreditCard,
  Settings,
  ArrowUpCircle,
  ArrowDownCircle
} from 'lucide-react';

export const PlanManagement: React.FC = () => {
  const { user } = useAuth();
  const { subscribed, subscriptionTier, subscriptionEnd, loading, createCheckout, openCustomerPortal } = useSubscription();
  const { toast } = useToast();
  const [upgradeLoading, setUpgradeLoading] = useState<string | null>(null);

  const currentTier = WISDOM_TIERS.find(tier => tier.id === subscriptionTier);
  const currentTierIndex = currentTier ? WISDOM_TIERS.findIndex(tier => tier.id === subscriptionTier) : -1;

  const handleUpgrade = async (tierId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to upgrade your subscription",
        variant: "destructive"
      });
      return;
    }

    setUpgradeLoading(tierId);
    try {
      await createCheckout(tierId);
    } catch (error) {
      console.error('Upgrade error:', error);
    } finally {
      setUpgradeLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      await openCustomerPortal();
    } catch (error) {
      console.error('Customer portal error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

  const getElementColor = (element: string) => {
    switch (element) {
      case 'earth': return 'text-green-600 border-green-200 bg-green-50';
      case 'water': return 'text-blue-600 border-blue-200 bg-blue-50';
      case 'fire': return 'text-red-600 border-red-200 bg-red-50';
      case 'ether': return 'text-purple-600 border-purple-200 bg-purple-50';
      default: return 'text-gray-600 border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
        <p className="text-gray-600">Manage your spiritual journey subscription</p>
      </div>

      {/* Current Plan Status */}
      {subscribed && currentTier && (
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{getElementIcon(currentTier.element)}</div>
                <div>
                  <CardTitle className="text-xl text-purple-800">
                    Current Plan: {currentTier.name}
                  </CardTitle>
                  <p className="text-purple-600">{currentTier.description}</p>
                </div>
              </div>
              <Badge className="bg-purple-600 text-white">
                <Crown className="w-4 h-4 mr-1" />
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-sm">
                  {subscriptionEnd ? `Renews on ${formatDate(subscriptionEnd)}` : 'Active subscription'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-purple-600" />
                <span className="text-sm">${currentTier.monthlyPrice}/month</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleManageSubscription} variant="outline" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Manage Subscription
              </Button>
              <Button onClick={handleManageSubscription} variant="outline" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Billing Portal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {subscribed ? 'Upgrade or Change Your Plan' : 'Choose Your Spiritual Path'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WISDOM_TIERS.map((tier, index) => {
            const isCurrentPlan = tier.id === subscriptionTier;
            const isUpgrade = currentTierIndex >= 0 && index > currentTierIndex;
            const isDowngrade = currentTierIndex >= 0 && index < currentTierIndex;
            const isLoading = upgradeLoading === tier.id;

            return (
              <Card 
                key={tier.id} 
                className={`relative transition-all duration-300 hover:shadow-lg ${
                  isCurrentPlan 
                    ? 'border-2 border-purple-400 shadow-purple-100' 
                    : 'border border-gray-200 hover:border-purple-300'
                }`}
              >
                {isCurrentPlan && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white px-3 py-1">
                      <Crown className="w-3 h-3 mr-1" />
                      Current Plan
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="text-3xl mb-2">{getElementIcon(tier.element)}</div>
                  <CardTitle className="text-lg font-bold">{tier.name}</CardTitle>
                  <p className="text-sm text-gray-600 mb-4">{tier.description}</p>
                  <div className="text-center">
                    <span className="text-3xl font-bold text-gray-900">${tier.monthlyPrice}</span>
                    <span className="text-sm text-gray-600">/month</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Key Features */}
                  <div className="space-y-2">
                    {tier.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {tier.features.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{tier.features.length - 3} more features
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    {isCurrentPlan ? (
                      <Button 
                        onClick={handleManageSubscription}
                        variant="outline" 
                        className="w-full"
                        disabled={loading}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Manage Plan
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleUpgrade(tier.id)}
                        className={`w-full ${
                          isUpgrade 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : isDowngrade 
                            ? 'bg-orange-600 hover:bg-orange-700'
                            : 'bg-purple-600 hover:bg-purple-700'
                        }`}
                        disabled={loading || isLoading}
                      >
                        {isLoading ? (
                          <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        ) : isUpgrade ? (
                          <ArrowUpCircle className="w-4 h-4 mr-2" />
                        ) : isDowngrade ? (
                          <ArrowDownCircle className="w-4 h-4 mr-2" />
                        ) : (
                          <Crown className="w-4 h-4 mr-2" />
                        )}
                        {isUpgrade ? 'Upgrade' : isDowngrade ? 'Downgrade' : 'Select Plan'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Help Section */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Billing Questions</h4>
              <p className="text-gray-600">Access your billing history and manage payment methods through the billing portal.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Plan Changes</h4>
              <p className="text-gray-600">Upgrades take effect immediately. Downgrades take effect at the end of your current billing period.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
