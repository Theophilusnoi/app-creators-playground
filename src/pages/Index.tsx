
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Moon, Star, Heart, Zap, Crown, ArrowRight, Play } from "lucide-react";
import FeaturePreviewModal from "@/components/ui/FeaturePreviewModal";
import { useAuth } from "@/components/auth/AuthProvider";
import { useSubscription } from "@/contexts/SubscriptionContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscribed } = useSubscription();
  const [previewModal, setPreviewModal] = useState<any>(null);

  const features = [
    {
      title: "Palm Reading",
      description: "Discover your destiny through the ancient art of palmistry",
      icon: <Sparkles className="w-8 h-8" />,
      tier: "free" as const,
      route: "/pro",
      preview: {
        type: "demo" as const,
        content: "palm-reading-demo",
        caption: "Experience AI-powered palm analysis with personalized insights"
      },
      benefits: [
        "Detailed line analysis and interpretations",
        "Personality insights from palm features",
        "Future predictions and guidance",
        "Save and track your readings over time"
      ]
    },
    {
      title: "Tarot Readings",
      description: "Unlock the wisdom of the cards with AI-guided interpretations",
      icon: <Moon className="w-8 h-8" />,
      tier: "fire" as const,
      route: "/pro",
      preview: {
        type: "demo" as const,
        content: "tarot-demo",
        caption: "Draw cards and receive deep, personalized interpretations"
      },
      benefits: [
        "Multiple spread types (Celtic Cross, 3-card, etc.)",
        "AI-powered card interpretations",
        "Daily card draws and guidance",
        "Reading history and pattern analysis"
      ]
    },
    {
      title: "Soul Travel",
      description: "Journey beyond the physical realm with guided astral projection",
      icon: <Star className="w-8 h-8" />,
      tier: "fire" as const,
      route: "/soul-travel",
      preview: {
        type: "demo" as const,
        content: "soul-travel-demo",
        caption: "Explore consciousness with safety protocols and guided sessions"
      },
      benefits: [
        "Guided astral projection techniques",
        "Safety protocols and emergency returns",
        "Session tracking and reflection journals", 
        "Community sharing and experiences"
      ]
    },
    {
      title: "Dream Analysis",
      description: "Decode the hidden messages in your dreams",
      icon: <Heart className="w-8 h-8" />,
      tier: "fire" as const,
      route: "/pro",
      preview: {
        type: "demo" as const,
        content: "dream-analysis-demo",
        caption: "AI-powered dream interpretation with symbolic analysis"
      },
      benefits: [
        "Symbol recognition and interpretation",
        "Dream pattern analysis over time",
        "Lucid dreaming guidance and techniques",
        "Personal dream dictionary building"
      ]
    }
  ];

  const handleFeatureClick = (feature: any) => {
    setPreviewModal(feature);
  };

  const handleGetStarted = () => {
    if (!user) {
      navigate('/auth');
    } else if (!subscribed) {
      navigate('/pricing');
    } else {
      navigate('/pro');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Unlock Your
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Spiritual Path
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Discover ancient wisdom through AI-powered spiritual guidance. 
            Explore palmistry, tarot, soul travel, and dream analysis with personalized insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 px-8 py-4 text-lg"
            >
              {!user ? 'Start Your Journey' : !subscribed ? 'Upgrade Now' : 'Enter Dashboard'}
              <Zap className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-purple-400 text-purple-200 hover:bg-purple-600/20 px-8 py-4 text-lg"
              onClick={() => setPreviewModal(features[0])}
            >
              <Play className="mr-2 w-5 h-5" />
              Preview Features
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center gap-8 text-purple-300 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>10,000+ Readings</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-400" />
              <span>98% Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span>AI-Powered Insights</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
              onClick={() => handleFeatureClick(feature)}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-white text-xl mb-2 flex items-center justify-center gap-2">
                  {feature.title}
                  {feature.tier !== 'free' && (
                    <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-300 text-xs">
                      {feature.tier === 'fire' ? 'Fire Keeper' : 'Ether Walker'}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-purple-200">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  className="w-full text-purple-300 hover:text-white hover:bg-purple-600/20"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Trusted by Spiritual Seekers Worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The palm reading was incredibly accurate. It helped me understand my life path better.",
                author: "Sarah M.",
                rating: 5
              },
              {
                quote: "Soul travel sessions transformed my meditation practice. The guidance is phenomenal.",
                author: "Michael R.",
                rating: 5
              },
              {
                quote: "Dream analysis revealed patterns I never noticed. It's like having a spiritual mentor.",
                author: "Elena K.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-6">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-purple-200 mb-4 italic">"{testimonial.quote}"</p>
                <p className="text-purple-300 font-medium">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-8 border border-purple-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Begin Your Spiritual Journey?
            </h2>
            <p className="text-purple-200 mb-6 text-lg">
              Join thousands who have discovered their true path through AI-powered spiritual guidance.
            </p>
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 px-12 py-4 text-lg"
            >
              Start Free Today
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Preview Modal */}
      {previewModal && (
        <FeaturePreviewModal
          isOpen={!!previewModal}
          onClose={() => setPreviewModal(null)}
          feature={previewModal}
        />
      )}
    </div>
  );
};

export default Index;
