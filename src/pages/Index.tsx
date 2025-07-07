
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth/AuthProvider';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { SubscriptionStatusCard } from '@/components/subscription/SubscriptionStatusCard';
import { 
  Sparkles, 
  Crown, 
  Zap, 
  Heart, 
  Moon, 
  Shield,
  Star,
  Brain,
  Compass,
  Users
} from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscribed, checkSubscription } = useSubscription();

  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user, checkSubscription]);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Spiritual Guidance",
      description: "Chat with Seraphina, your personal spiritual assistant",
      action: () => navigate('/dashboard'),
      color: "purple"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Mood & Energy Tracking",
      description: "Track your spiritual and emotional well-being",
      action: () => navigate('/dashboard'),
      color: "pink"
    },
    {
      icon: <Moon className="w-6 h-6" />,
      title: "Dream Analysis",
      description: "Decode the messages from your subconscious",
      action: () => navigate('/dashboard'),
      color: "blue"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Spiritual Protection",
      description: "Daily rituals and protection practices",
      action: () => navigate('/dashboard'),
      color: "green"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Divination Tools",
      description: "Tarot, palm reading, and oracle guidance",
      action: () => navigate('/dashboard'),
      color: "yellow"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Quantum Consciousness",
      description: "Advanced spiritual technologies and practices",
      action: () => navigate('/quantum-dashboard'),
      color: "indigo",
      premium: true
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'pink': return 'text-pink-600 bg-pink-50 border-pink-200';
      case 'blue': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'green': return 'text-green-600 bg-green-50 border-green-200';
      case 'yellow': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'indigo': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text mb-4">
            ✨ Spiritual Mind ✨
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your AI-powered companion for spiritual growth and enlightenment
          </p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => navigate('/auth')}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Begin Your Journey
              </Button>
              <Button 
                onClick={() => navigate('/pricing')}
                variant="outline"
                size="lg"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-3"
              >
                <Crown className="w-5 h-5 mr-2" />
                View Plans
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
              >
                <Compass className="w-5 h-5 mr-2" />
                Enter Dashboard
              </Button>
              {!subscribed && (
                <Button 
                  onClick={() => navigate('/pricing')}
                  variant="outline"
                  size="lg"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-3"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Upgrade Plan
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Subscription Status for logged in users */}
        {user && (
          <div className="max-w-md mx-auto mb-12">
            <SubscriptionStatusCard />
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`transition-all duration-300 hover:shadow-lg cursor-pointer border-2 ${getColorClasses(feature.color)}`}
              onClick={feature.action}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getColorClasses(feature.color)}`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                  {feature.premium && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Pro
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Life?</h2>
          <p className="text-xl mb-6 text-purple-100">
            Join thousands of spiritual seekers on their journey to enlightenment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Button 
                  onClick={() => navigate('/auth')}
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join Now - Free
                </Button>
                <Button 
                  onClick={() => navigate('/pricing')}
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 px-8 py-3"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Unlock Premium
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3"
              >
                <Compass className="w-5 h-5 mr-2" />
                Continue Your Journey
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
