
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { ProFeaturesDemo } from '@/components/spiritual/pro/ProFeaturesDemo';
import { StripeSetupGuide } from '@/components/stripe/StripeSetupGuide';
import { ProNavigationBar } from '@/components/spiritual/pro/ProNavigationBar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, Crown, ArrowRight } from 'lucide-react';

const ProFeaturesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscribed, subscriptionTier } = useSubscription();

  const isProUser = subscribed && (subscriptionTier === 'pro' || subscriptionTier === 'ether' || subscriptionTier === 'fire');

  const handleSignInClick = () => {
    navigate('/auth');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleGetStarted = () => {
    if (!user) {
      navigate('/auth');
    } else if (!isProUser) {
      navigate('/pricing');
    } else {
      navigate('/pro');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation Bar */}
        <ProNavigationBar 
          onBack={handleBackToDashboard}
          backLabel="Back to Dashboard"
        />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Crown className="w-10 h-10 text-yellow-400" />
            SpiritualMind Pro Features
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-6">
            Experience the complete spiritual mastery platform with advanced consciousness technologies
          </p>
          
          {/* Call to Action */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
            >
              {!user ? 'Get Started' : !isProUser ? 'Upgrade Now' : 'Access Pro Features'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            {!user && (
              <Button
                onClick={handleSignInClick}
                variant="outline"
                className="border-purple-300 text-purple-200 hover:bg-purple-600/20 px-8 py-3 text-lg"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </Button>
            )}
          </div>
          
          {/* Status Cards */}
          {!user && (
            <Card className="bg-yellow-900/20 border-yellow-500/30 max-w-md mx-auto mt-6">
              <CardContent className="pt-6 text-center">
                <LogIn className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-yellow-200 font-semibold mb-2">Demo Mode Active</h3>
                <p className="text-yellow-300 text-sm">
                  Sign in to access your subscription or start a free trial
                </p>
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

          {user && !isProUser && (
            <Card className="bg-purple-900/20 border-purple-500/30 max-w-md mx-auto mt-6">
              <CardContent className="pt-6 text-center">
                <Crown className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-purple-200 font-semibold mb-2">Ready to Upgrade</h3>
                <p className="text-purple-300 text-sm">
                  Unlock all advanced spiritual technologies below
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
