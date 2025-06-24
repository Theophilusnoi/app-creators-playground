
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { ProFeaturesDemo } from '@/components/spiritual/pro/ProFeaturesDemo';
import { StripeSetupGuide } from '@/components/stripe/StripeSetupGuide';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, Crown } from 'lucide-react';

const ProFeaturesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscribed, subscriptionTier } = useSubscription();

  const isProUser = subscribed && (subscriptionTier === 'pro' || subscriptionTier === 'ether' || subscriptionTier === 'fire');

  const handleSignInClick = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Crown className="w-10 h-10 text-yellow-400" />
            SpiritualMind Pro Features
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Experience the complete spiritual mastery platform with advanced consciousness technologies
          </p>
          
          {!user && (
            <Card className="bg-yellow-900/20 border-yellow-500/30 max-w-md mx-auto mt-6">
              <CardContent className="pt-6 text-center">
                <LogIn className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-yellow-200 font-semibold mb-2">Demo Mode Active</h3>
                <p className="text-yellow-300 text-sm mb-4">
                  Sign in to access your subscription or start a free trial
                </p>
                <Button 
                  onClick={handleSignInClick}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  Sign In to Continue
                </Button>
              </CardContent>
            </Card>
          )}

          {user && isProUser && (
            <Card className="bg-green-900/20 border-green-500/30 max-w-md mx-auto mt-6">
              <CardContent className="pt-6 text-center">
                <Crown className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-green-200 font-semibold mb-2">Pro Member</h3>
                <p className="text-green-300 text-sm">
                  Welcome back! You have full access to all Pro features.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pro Features Demo */}
        <ProFeaturesDemo userProfile={user} />

        {/* Stripe Setup Guide */}
        <StripeSetupGuide />
      </div>
    </div>
  );
};

export default ProFeaturesPage;
