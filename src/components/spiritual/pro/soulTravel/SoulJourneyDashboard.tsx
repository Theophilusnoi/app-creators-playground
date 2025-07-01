
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, Play, BookOpen, Shield, Users, Settings, 
  Moon, Brain, Waves, Leaf, Star, Clock, Heart
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useToast } from '@/hooks/use-toast';
import { ProNavigationBar } from '@/components/spiritual/pro/ProNavigationBar';

interface SoulJourneyDashboardProps {
  className?: string;
  onJourneySelect?: (journeyType: string) => void;
}

interface JourneyStats {
  totalJourneys: number;
  favoriteType: string;
  totalTime: number;
  badges: string[];
}

const SoulJourneyDashboard: React.FC<SoulJourneyDashboardProps> = ({ 
  className = "",
  onJourneySelect 
}) => {
  const { user } = useAuth();
  const { subscribed, subscriptionTier } = useSubscription();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [journeyStats, setJourneyStats] = useState<JourneyStats>({
    totalJourneys: 0,
    favoriteType: 'Astral',
    totalTime: 0,
    badges: []
  });

  const isProUser = subscribed && (subscriptionTier === 'pro' || subscriptionTier === 'ether' || subscriptionTier === 'fire');

  useEffect(() => {
    const savedStats = localStorage.getItem('soulJourneyStats');
    if (savedStats) {
      setJourneyStats(JSON.parse(savedStats));
    }
  }, []);

  const journeyTypes = [
    {
      id: 'astral',
      name: 'Astral Projection',
      icon: <Star className="w-6 h-6" />,
      description: 'Explore beyond the physical realm',
      gradient: 'from-purple-500 to-indigo-500',
      color: '#2E8B57'
    },
    {
      id: 'shamanic',
      name: 'Shamanic Journey',
      icon: <Leaf className="w-6 h-6" />,
      description: 'Connect with spirit guides and power animals',
      gradient: 'from-green-500 to-emerald-500',
      color: '#8FBC8F'
    },
    {
      id: 'lucid',
      name: 'Lucid Dreaming',
      icon: <Moon className="w-6 h-6" />,
      description: 'Master conscious dreaming states',
      gradient: 'from-blue-500 to-purple-500',
      color: '#90EE90'
    },
    {
      id: 'pastlife',
      name: 'Past-Life Regression',
      icon: <Clock className="w-6 h-6" />,
      description: 'Access memories from previous incarnations',
      gradient: 'from-amber-500 to-orange-500',
      color: '#2E8B57'
    }
  ];

  const quickFeatures = [
    {
      id: 'guided',
      name: 'Guided Meditations',
      icon: <Play className="w-5 h-5" />,
      description: 'Pre-recorded journey guides',
      count: 24
    },
    {
      id: 'drumming',
      name: 'Shamanic Drumming',
      icon: <Waves className="w-5 h-5" />,
      description: '4Hz theta wave tracks',
      count: 12
    },
    {
      id: 'binaural',
      name: 'Binaural Beats',
      icon: <Brain className="w-5 h-5" />,
      description: 'Brainwave entrainment',
      count: 18
    },
    {
      id: 'journal',
      name: 'Dream Journal',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Record your experiences',
      count: journeyStats.totalJourneys
    },
    {
      id: 'protection',
      name: 'Protection Rituals',
      icon: <Shield className="w-5 h-5" />,
      description: 'Safety and grounding',
      count: 8
    },
    {
      id: 'community',
      name: 'Community Circle',
      icon: <Users className="w-5 h-5" />,
      description: 'Share and connect',
      count: 156
    }
  ];

  const handleJourneyStart = (journeyName: string) => {
    if (!isProUser) {
      toast({
        title: "Pro Feature Required",
        description: "Upgrade to access Soul Journey features",
        variant: "destructive"
      });
      return;
    }

    if (onJourneySelect) {
      onJourneySelect(journeyName);
    } else {
      toast({
        title: "Journey Preparation",
        description: `Preparing your ${journeyName} journey...`,
      });
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'journeys', name: 'Journeys', icon: <Star className="w-4 h-4" /> },
    { id: 'tools', name: 'Tools', icon: <Settings className="w-4 h-4" /> },
    { id: 'community', name: 'Community', icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <div className={`max-w-6xl mx-auto space-y-6 ${className}`} style={{ backgroundColor: '#F5FFF5' }}>
      {/* Navigation */}
      <ProNavigationBar 
        backLabel="Back to Pro Features"
        showHome={true}
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            Soul Journey – Explore Beyond the Physical
          </h1>
          <div className="text-right">
            <div className="text-green-100 text-sm">Journey Level</div>
            <div className="text-white font-semibold">
              {journeyStats.totalJourneys < 5 ? 'Novice' : journeyStats.totalJourneys < 15 ? 'Traveler' : 'Master'}
            </div>
          </div>
        </div>
        
        <p className="text-green-100 mb-6 text-lg">
          Unlock the ancient and transformative practice of Soul Traveling, where consciousness transcends 
          the physical body to explore spiritual realms, meet spirit guides, and access higher wisdom.
        </p>

        {/* Safety Banner */}
        <div className="bg-yellow-400/20 border border-yellow-300/30 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 text-yellow-100">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Safety Reminder:</span>
            <span className="text-sm">Ensure you're in a safe and quiet environment before starting.</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-white text-xl font-bold">{journeyStats.totalJourneys}</div>
            <div className="text-green-200 text-sm">Total Journeys</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-white text-xl font-bold">{Math.floor(journeyStats.totalTime / 60)}h</div>
            <div className="text-green-200 text-sm">Journey Time</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-white text-xl font-bold">{journeyStats.favoriteType}</div>
            <div className="text-green-200 text-sm">Favorite Type</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-white text-xl font-bold">{journeyStats.badges.length}</div>
            <div className="text-green-200 text-sm">Badges Earned</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
              ${activeTab === tab.id 
                ? 'bg-green-600 text-white' 
                : 'bg-white/70 text-green-800 hover:bg-green-100'
              }
            `}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Journey Types */}
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Choose Your Journey Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {journeyTypes.map((journey) => (
                  <Card 
                    key={journey.id}
                    className="bg-white/80 backdrop-blur-sm border-green-200 hover:bg-white/90 transition-all duration-300 cursor-pointer group"
                    onClick={() => handleJourneyStart(journey.name)}
                  >
                    <CardHeader className="pb-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${journey.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        {journey.icon}
                      </div>
                      <CardTitle className="text-green-800 flex items-center justify-between">
                        {journey.name}
                        <Star className="w-4 h-4 text-green-500 group-hover:text-yellow-500 transition-colors" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-green-700 text-sm mb-3">{journey.description}</p>
                      {!isProUser && (
                        <Badge variant="outline" className="border-green-400 text-green-600">
                          Pro Feature
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Access Features */}
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Quick Access Tools</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickFeatures.map((feature) => (
                  <Card key={feature.id} className="bg-white/70 border-green-200 hover:bg-white/80 transition-all cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3 mx-auto">
                        {feature.icon}
                      </div>
                      <h4 className="font-semibold text-green-800 mb-1">{feature.name}</h4>
                      <p className="text-xs text-green-600 mb-2">{feature.description}</p>
                      <Badge variant="secondary" className="bg-green-200 text-green-800 text-xs">
                        {feature.count} {feature.id === 'journal' ? 'entries' : 'available'}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'journeys' && (
          <div className="bg-white/70 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">Your Journey History</h3>
            <div className="text-center py-12">
              <Leaf className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <p className="text-green-600 mb-4">Your journey log will appear here</p>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setActiveTab('overview')}
              >
                Start Your First Journey
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-4">
            <Card className="bg-white/70 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Sacred Space Creator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 mb-4">Customize your personal sacred space for journeys</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Background</h4>
                    <p className="text-sm text-green-600">Forest, Cave, Mountain, Stars</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Spirit Guide</h4>
                    <p className="text-sm text-green-600">Wolf, Eagle, Dragon, Angel</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="bg-white/70 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">Community Circle</h3>
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <p className="text-green-600 mb-4">Connect with fellow soul travelers</p>
              <Button className="bg-green-600 hover:bg-green-700">
                Join Community
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Final Wisdom Note */}
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Heart className="w-6 h-6 text-green-600 mt-1" />
          <div>
            <h4 className="font-semibold text-green-800 mb-2">Soul Wisdom</h4>
            <p className="text-green-700 text-sm leading-relaxed">
              "Soul Traveling is not just about going somewhere—it's about coming back more whole. 
              With every journey, you reclaim lost parts of yourself, gain clarity, and connect with 
              the infinite intelligence of your soul."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoulJourneyDashboard;
