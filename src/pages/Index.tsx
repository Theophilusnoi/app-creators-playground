
import { useAuth } from '@/components/auth/AuthProvider';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Users, Crown, Zap, Heart, Star, Shield, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const { subscribed } = useSubscription();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Eye className="w-8 h-8 text-purple-400" />,
      title: "AI Palm Reading",
      description: "Advanced palm analysis with spiritual insights"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-blue-400" />,
      title: "Tarot Guidance",
      description: "Digital tarot readings with deep interpretations"
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-400" />,
      title: "Dream Analysis",
      description: "Decode your dreams and their spiritual messages"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "Spiritual Protection",
      description: "Tools and rituals for energetic protection"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      title: "Meditation Guide",
      description: "Personalized meditation practices and timers"
    },
    {
      icon: <Crown className="w-8 h-8 text-gold-400" />,
      title: "Ancient Wisdom",
      description: "Access to deep spiritual knowledge and teachings"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">SpiritualMind</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Your AI-powered spiritual companion for palmistry, divination, dream analysis, and ancient wisdom practices
          </p>
          
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Badge variant="outline" className="border-green-400 text-green-400">
                  Welcome back, {user.email}
                </Badge>
                {subscribed && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                    Premium Member
                  </Badge>
                )}
              </div>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
              >
                Enter Your Spiritual Dashboard
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg mr-4"
              >
                Start Your Journey
              </Button>
              <Button 
                onClick={() => navigate('/pricing')}
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 text-lg"
              >
                View Pricing
              </Button>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-black/30 border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subscription Tiers Preview */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Choose Your Spiritual Path</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-green-800/50 to-emerald-800/50 border-2 border-green-400/50">
              <CardHeader>
                <CardTitle className="text-green-200 text-2xl">Earth Keeper</CardTitle>
                <div className="text-3xl font-bold text-white">$19<span className="text-lg">/month</span></div>
              </CardHeader>
              <CardContent>
                <p className="text-green-300 mb-4">Ground yourself in fundamental spiritual practices</p>
                <ul className="text-green-200 space-y-2 text-left">
                  <li>• Basic meditation library</li>
                  <li>• Dream journal with AI analysis</li>
                  <li>• Mood tracking and insights</li>
                  <li>• Community discussions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-800/50 to-cyan-800/50 border-2 border-blue-400/50 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black">
                Most Popular
              </Badge>
              <CardHeader>
                <CardTitle className="text-blue-200 text-2xl">Water Bearer</CardTitle>
                <div className="text-3xl font-bold text-white">$29<span className="text-lg">/month</span></div>
              </CardHeader>
              <CardContent>
                <p className="text-blue-300 mb-4">Flow deeper into cultural wisdom and healing</p>
                <ul className="text-blue-200 space-y-2 text-left">
                  <li>• All Earth Keeper features</li>
                  <li>• Advanced archetype profiling</li>
                  <li>• Cultural wisdom access</li>
                  <li>• AI shadow work guidance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <Button 
              onClick={() => navigate('/pricing')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
            >
              View All Plans
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 border-purple-400/50 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Begin Your Spiritual Journey?</h3>
              <p className="text-gray-300 mb-6">
                Join thousands of seekers exploring their spiritual path with AI-powered guidance
              </p>
              {!user && (
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
                >
                  Get Started Free
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
