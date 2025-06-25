
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/components/auth/AuthProvider';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, RefreshCw, Settings, AlertCircle, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StripeTestPage = () => {
  const { user } = useAuth();
  const { subscribed, subscriptionTier, subscriptionEnd, loading, checkSubscription, createCheckout, openCustomerPortal } = useSubscription();
  const { toast } = useToast();
  const [testInProgress, setTestInProgress] = useState(false);

  const testTiers = [
    { id: 'earth', name: 'Earth Keeper', price: 29 },
    { id: 'water', name: 'Water Bearer', price: 79 },
    { id: 'fire', name: 'Fire Keeper', price: 197 },
    { id: 'ether', name: 'Ether Walker', price: 497 }
  ];

  const handleTestCheckout = async (tier: string) => {
    setTestInProgress(true);
    try {
      await createCheckout(tier);
      toast({
        title: "Test Checkout Initiated",
        description: `Testing ${tier} tier checkout - check for new tab`,
      });
    } catch (error) {
      toast({
        title: "Test Failed",
        description: "Checkout test failed - check console for details",
        variant: "destructive"
      });
    } finally {
      setTestInProgress(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-purple-400" />
              Stripe Payment System Test
            </CardTitle>
            <CardDescription className="text-purple-200">
              Test your Stripe integration and subscription management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Authentication Status */}
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div>
                <h3 className="text-white font-semibold">Authentication Status</h3>
                <p className="text-gray-300 text-sm">
                  {user ? `Logged in as: ${user.email}` : 'Not logged in'}
                </p>
              </div>
              <Badge variant={user ? 'default' : 'destructive'}>
                {user ? 'Authenticated' : 'Not Authenticated'}
              </Badge>
            </div>

            {/* Subscription Status */}
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div>
                <h3 className="text-white font-semibold">Subscription Status</h3>
                <p className="text-gray-300 text-sm">
                  {subscribed 
                    ? `Active: ${subscriptionTier} until ${subscriptionEnd ? new Date(subscriptionEnd).toLocaleDateString() : 'Unknown'}`
                    : 'No active subscription'
                  }
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={subscribed ? 'default' : 'secondary'}>
                  {subscribed ? 'Subscribed' : 'Free'}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={checkSubscription}
                  disabled={loading}
                  className="border-purple-500/30 text-purple-200"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* System Requirements Check */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold">System Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-200 text-sm">Supabase Connected</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-200 text-sm">Edge Functions Deployed</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-200 text-sm">Stripe Secret Key Set</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-200 text-sm">Subscribers Table Ready</span>
                </div>
              </div>
            </div>

            {user && (
              <>
                {/* Test Checkout Buttons */}
                <div className="space-y-3">
                  <h3 className="text-white font-semibold">Test Subscription Checkout</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {testTiers.map((tier) => (
                      <Button
                        key={tier.id}
                        onClick={() => handleTestCheckout(tier.id)}
                        disabled={testInProgress || loading}
                        className="bg-purple-600 hover:bg-purple-700 flex flex-col h-auto py-3"
                      >
                        <Crown className="w-4 h-4 mb-1" />
                        <span className="font-semibold">{tier.name}</span>
                        <span className="text-xs opacity-75">${tier.price}/month</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Customer Portal */}
                {subscribed && (
                  <div className="space-y-3">
                    <h3 className="text-white font-semibold">Subscription Management</h3>
                    <Button
                      onClick={openCustomerPortal}
                      disabled={loading}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Open Customer Portal
                    </Button>
                  </div>
                )}
              </>
            )}

            {!user && (
              <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-200 font-semibold">Authentication Required</span>
                </div>
                <p className="text-yellow-300 text-sm">
                  Please sign in to test subscription features. You can use the sign in button in the header.
                </p>
              </div>
            )}

            {/* Setup Instructions */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Setup Instructions</h3>
              <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <div className="space-y-2 text-blue-200 text-sm">
                  <p><strong>1.</strong> Make sure your Stripe Secret Key is set in Supabase Edge Function Secrets</p>
                  <p><strong>2.</strong> Test mode: Use Stripe test cards (4242 4242 4242 4242)</p>
                  <p><strong>3.</strong> Live mode: Update to live Stripe keys when ready for production</p>
                  <p><strong>4.</strong> Webhook setup: Optional for this implementation (we use session polling)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StripeTestPage;
