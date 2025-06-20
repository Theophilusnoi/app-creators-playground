
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown, Zap, Sparkles } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/components/auth/AuthProvider';

const PricingPage = () => {
  const { createCheckout, subscriptionTier, subscribed, loading } = useSubscription();
  const { user } = useAuth();

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      description: 'Essential spiritual guidance',
      icon: <Sparkles className="w-6 h-6" />,
      features: [
        'Daily spiritual insights',
        'Basic meditation tracking',
        'Community access',
        'Dream journal',
        'Mood tracking',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 19.99,
      description: 'Advanced spiritual practices',
      icon: <Zap className="w-6 h-6" />,
      features: [
        'All Basic features',
        'Advanced divination tools',
        'Personalized rituals',
        'Shadow work guidance',
        'Synchronicity detection',
        'Cultural adaptation',
      ],
      color: 'from-purple-500 to-pink-500',
      popular: true,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 49.99,
      description: 'Complete spiritual mastery',
      icon: <Crown className="w-6 h-6" />,
      features: [
        'All Premium features',
        'Angelic assistance',
        'Quantum spiritual tools',
        'Emergency spiritual support',
        'Priority community access',
        'One-on-one guidance sessions',
      ],
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  const handleSubscribe = (planId: string) => {
    createCheckout(planId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Spiritual Journey
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock your spiritual potential with our comprehensive guidance platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const isCurrentPlan = subscribed && subscriptionTier === plan.id;
            const isUpgrade = subscribed && subscriptionTier !== plan.id;
            
            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden ${
                  plan.popular ? 'border-2 border-yellow-400 scale-105' : 'border-gray-700'
                } ${isCurrentPlan ? 'ring-2 ring-green-400' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`bg-gradient-to-r ${plan.color} text-white ${plan.popular ? 'pt-12' : ''}`}>
                  <div className="flex items-center justify-center mb-4">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl text-center">{plan.name}</CardTitle>
                  <CardDescription className="text-center text-gray-100">
                    {plan.description}
                  </CardDescription>
                  <div className="text-center">
                    <div className="text-3xl font-bold">${plan.price}</div>
                    <div className="text-sm opacity-80">/month</div>
                  </div>
                </CardHeader>

                <CardContent className="bg-gray-900 text-white p-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading || isCurrentPlan || !user}
                    className={`w-full ${
                      isCurrentPlan
                        ? 'bg-green-600 hover:bg-green-700'
                        : `bg-gradient-to-r ${plan.color} hover:opacity-90`
                    }`}
                  >
                    {loading ? (
                      'Processing...'
                    ) : isCurrentPlan ? (
                      'Current Plan'
                    ) : !user ? (
                      'Login to Subscribe'
                    ) : isUpgrade ? (
                      'Upgrade'
                    ) : (
                      'Get Started'
                    )}
                  </Button>

                  {isCurrentPlan && (
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
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Button variant="link" className="text-blue-400">
                Sign up for free
              </Button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingPage;
