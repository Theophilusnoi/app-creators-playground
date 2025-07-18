
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown, Zap, Sparkles, Gift, Mountain, Waves, Flame, Wind, Loader2 } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { WISDOM_TIERS } from '@/types/subscription';

const PricingPage = () => {
  const { createCheckout, subscriptionTier, subscribed, loading } = useSubscription();
  const { user } = useAuth();
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState<string>('');
  const [processingTier, setProcessingTier] = useState<string | null>(null);

  // Check for referral code in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      setReferralCode(refCode);
      toast({
        title: "Referral Code Applied!",
        description: "You'll get special benefits when you subscribe.",
      });
    }
  }, [toast]);

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'earth': return <Mountain className="w-6 h-6" />;
      case 'water': return <Waves className="w-6 h-6" />;
      case 'fire': return <Flame className="w-6 h-6" />;
      case 'ether': return <Wind className="w-6 h-6" />;
      default: return <Mountain className="w-6 h-6" />;
    }
  };

  const getElementGradient = (element: string) => {
    switch (element) {
      case 'earth': return 'from-green-500 to-emerald-500';
      case 'water': return 'from-blue-500 to-cyan-500';
      case 'fire': return 'from-red-500 to-orange-500';
      case 'ether': return 'from-purple-500 to-indigo-500';
      default: return 'from-green-500 to-emerald-500';
    }
  };

  const handleSubscribe = async (tierId: string) => {
    console.log('Subscribe button clicked for tier:', tierId);
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe to a tier.",
        variant: "destructive",
      });
      return;
    }

    if (processingTier || loading) {
      console.log('Already processing subscription or loading, skipping');
      return;
    }

    setProcessingTier(tierId);
    console.log('Starting subscription process for tier:', tierId);

    try {
      if (referralCode) {
        localStorage.setItem('referralCode', referralCode);
        console.log('Stored referral code:', referralCode);
      }
      
      console.log('Calling createCheckout with:', { tierId, referralCode });
      await createCheckout(tierId, referralCode);
      
    } catch (error) {
      console.error('Subscription error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: "Subscription Error",
        description: `Unable to start subscription: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setProcessingTier(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Spiritual Wisdom Tier
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Embark on a journey of spiritual awakening with our culturally-adapted wisdom tiers
          </p>
          {referralCode && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-white">
              <Gift className="w-4 h-4 mr-2" />
              Referral code active: {referralCode}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {WISDOM_TIERS.map((tier) => {
            const isCurrentTier = subscribed && subscriptionTier === tier.id;
            const isUpgrade = subscribed && subscriptionTier !== tier.id;
            const isProcessing = processingTier === tier.id;
            const isPopular = tier.id === 'water'; // Water Bearer is most popular
            
            return (
              <Card
                key={tier.id}
                className={`relative overflow-hidden bg-gray-800/90 border-gray-600 ${
                  isPopular ? 'border-2 border-yellow-400 scale-105' : ''
                } ${isCurrentTier ? 'ring-2 ring-green-400' : ''}`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`bg-gradient-to-r ${getElementGradient(tier.element)} text-white ${isPopular ? 'pt-12' : ''}`}>
                  <div className="flex items-center justify-center mb-4">
                    {getElementIcon(tier.element)}
                  </div>
                  <CardTitle className="text-xl text-center text-white">{tier.name}</CardTitle>
                  <div className="text-center text-sm opacity-90 mb-2 text-white">{tier.element} Element</div>
                  <CardDescription className="text-center text-gray-100">
                    {tier.description}
                  </CardDescription>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">${tier.monthlyPrice}</div>
                    <div className="text-sm opacity-80 text-white">/month</div>
                  </div>
                </CardHeader>

                <CardContent className="bg-gray-800 text-white p-6">
                  <ul className="space-y-3 mb-6">
                    {tier.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-200">{feature}</span>
                      </li>
                    ))}
                    {tier.features.length > 4 && (
                      <li className="text-purple-300 text-xs">
                        +{tier.features.length - 4} more features...
                      </li>
                    )}
                  </ul>

                  <Button
                    onClick={() => handleSubscribe(tier.id)}
                    disabled={isCurrentTier || isProcessing || loading}
                    className={`w-full ${
                      isCurrentTier
                        ? 'bg-green-600 hover:bg-green-700'
                        : `bg-gradient-to-r ${getElementGradient(tier.element)} hover:opacity-90`
                    } ${(isProcessing || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : isCurrentTier ? (
                      'Current Tier'
                    ) : !user ? (
                      'Login to Subscribe'
                    ) : isUpgrade ? (
                      'Upgrade'
                    ) : (
                      'Begin Journey'
                    )}
                  </Button>

                  {isCurrentTier && (
                    <div className="mt-2 text-center">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-600 text-white">
                        <Check className="w-3 h-3 mr-1" />
                        Active Subscription
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {!user && (
          <div className="text-center mt-8">
            <p className="text-gray-200">
              Don't have an account?{' '}
              <Button 
                variant="link" 
                className="text-blue-400 p-0 h-auto"
                onClick={() => window.location.href = '/auth'}
              >
                Sign up for free
              </Button>
            </p>
          </div>
        )}

        <div className="text-center mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Wisdom Through Cultural Integration</h2>
          <p className="text-gray-200 mb-6">
            Our unique approach adapts ancient wisdom traditions to your cultural background, 
            ensuring authentic spiritual growth that honors your heritage while expanding your consciousness.
          </p>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="bg-black/20 p-4 rounded-lg">
              <Mountain className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-green-200 font-semibold">Earth</div>
              <div className="text-gray-400">Grounding & Foundation</div>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <Waves className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-blue-200 font-semibold">Water</div>
              <div className="text-gray-400">Flow & Adaptation</div>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <Flame className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-red-200 font-semibold">Fire</div>
              <div className="text-gray-400">Power & Transformation</div>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <Wind className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-purple-200 font-semibold">Ether</div>
              <div className="text-gray-400">Mystery & Mastery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
