
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, Sparkles, Brain, Eye, Shield, Zap, 
  Star, Moon, Heart, ArrowRight, LogIn, Users,
  BookOpen, Target, Wand2
} from 'lucide-react';

const SpiritualMindPro = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscribed, subscriptionTier } = useSubscription();

  const isProUser = subscribed && (subscriptionTier === 'pro' || subscriptionTier === 'ether' || subscriptionTier === 'fire');

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleFeatureClick = (path: string) => {
    if (!user) {
      navigate('/auth');
    } else if (!isProUser) {
      navigate('/pricing');
    } else {
      navigate(path);
    }
  };

  const proFeatures = [
    {
      id: 'soul-travel',
      title: 'Soul Travel Academy',
      description: 'Master astral projection with structured training and safety protocols',
      icon: <Sparkles className="w-6 h-6" />,
      path: '/soul-travel',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'third-eye',
      title: 'Third Eye Activation',
      description: 'Develop psychic abilities and enhanced spiritual perception',
      icon: <Eye className="w-6 h-6" />,
      path: '/dashboard?tab=third-eye',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'telekinesis',
      title: 'Telekinesis Training',
      description: 'Learn to influence matter with focused intention and practice',
      icon: <Brain className="w-6 h-6" />,
      path: '/dashboard?tab=telekinesis',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'protection',
      title: 'Advanced Protection',
      description: 'Seven-layer spiritual protection and entity removal systems',
      icon: <Shield className="w-6 h-6" />,
      path: '/dashboard?tab=protection',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      id: 'divination',
      title: 'Enhanced Divination',
      description: 'Advanced palm reading, tarot, and spiritual guidance tools',
      icon: <Target className="w-6 h-6" />,
      path: '/dashboard?tab=divination',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'rituals',
      title: 'Sacred Rituals',
      description: 'Comprehensive ritual directory and sacred bathing ceremonies',
      icon: <Wand2 className="w-6 h-6" />,
      path: '/dashboard?tab=rituals',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Crown className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">
            SpiritualMind Pro
          </h1>
          
          <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-8">
            Unlock advanced spiritual technologies and consciousness expansion tools designed for serious practitioners
          </p>

          {/* User Status */}
          {!user ? (
            <Card className="bg-purple-900/30 border-purple-500/30 max-w-md mx-auto mb-8">
              <CardContent className="pt-6 text-center">
                <LogIn className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-purple-200 font-semibold mb-2">Authentication Required</h3>
                <p className="text-purple-300 text-sm mb-4">
                  Sign in to access your Pro features or start your journey
                </p>
                <Button 
                  onClick={handleAuthClick}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Sign In / Sign Up
                </Button>
              </CardContent>
            </Card>
          ) : isProUser ? (
            <Card className="bg-green-900/20 border-green-500/30 max-w-md mx-auto mb-8">
              <CardContent className="pt-6 text-center">
                <Crown className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-green-200 font-semibold mb-2">Pro Member Active</h3>
                <p className="text-green-300 text-sm">
                  Welcome back! Access all Pro features below.
                </p>
                <Badge className="mt-2 bg-green-600">{subscriptionTier?.toUpperCase()}</Badge>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-yellow-900/20 border-yellow-500/30 max-w-md mx-auto mb-8">
              <CardContent className="pt-6 text-center">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-yellow-200 font-semibold mb-2">Upgrade to Pro</h3>
                <p className="text-yellow-300 text-sm mb-4">
                  Unlock all advanced spiritual technologies
                </p>
                <Button 
                  onClick={() => navigate('/pricing')}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  View Pricing
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pro Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {proFeatures.map((feature) => (
            <Card 
              key={feature.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
              onClick={() => handleFeatureClick(feature.path)}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-white text-xl flex items-center justify-between">
                  {feature.title}
                  <ArrowRight className="w-5 h-5 text-purple-300 group-hover:translate-x-1 transition-transform" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-200 text-sm leading-relaxed">
                  {feature.description}
                </p>
                {!isProUser && (
                  <Badge variant="outline" className="mt-3 border-yellow-400 text-yellow-400">
                    Pro Feature
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button
            onClick={() => navigate('/dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3"
          >
            <Heart className="w-4 h-4 mr-2" />
            Main Dashboard
          </Button>
          
          <Button
            onClick={() => navigate('/quantum-dashboard')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3"
          >
            <Zap className="w-4 h-4 mr-2" />
            Quantum Dashboard
          </Button>
          
          <Button
            onClick={() => navigate('/meditation')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
          >
            <Moon className="w-4 h-4 mr-2" />
            Meditation Space
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                Advanced Consciousness Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200 space-y-2">
              <p>• AI-powered spiritual guidance and personalized practices</p>
              <p>• Real-time biofeedback and consciousness monitoring</p>
              <p>• Advanced protection protocols and entity detection</p>
              <p>• Personalized ritual creation and sacred technology</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 border-indigo-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-indigo-400" />
                Exclusive Community Access
              </CardTitle>
            </CardHeader>
            <CardContent className="text-indigo-200 space-y-2">
              <p>• Connect with advanced practitioners worldwide</p>
              <p>• Access to exclusive workshops and masterclasses</p>
              <p>• Priority support and personalized guidance</p>
              <p>• Beta access to new spiritual technologies</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SpiritualMindPro;
