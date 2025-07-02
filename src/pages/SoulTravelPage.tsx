import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { useSubscription } from '@/contexts/SubscriptionContext';
import SoulJourneyDashboard from '@/components/spiritual/pro/soulTravel/SoulJourneyDashboard';
import JourneySetup from '@/components/spiritual/pro/soulTravel/JourneySetup';
import JourneySession from '@/components/spiritual/pro/soulTravel/JourneySession';
import JourneyReflection from '@/components/spiritual/pro/soulTravel/JourneyReflection';
import SimpleSoulTravelDashboard from '@/components/spiritual/pro/soulTravel/SimpleSoulTravelDashboard';
import PremiumFeatureGate from '@/components/subscription/PremiumFeatureGate';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Lock, ArrowRight } from 'lucide-react';

const SoulTravelPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscribed, subscriptionTier, loading } = useSubscription();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedJourney, setSelectedJourney] = useState('');
  const [setupData, setSetupData] = useState<any>(null);
  const [sessionData, setSessionData] = useState<any>(null);
  const [useSimpleView, setUseSimpleView] = useState(false);

  // Check if user has access to Soul Travel features
  const hasAccess = subscribed && (
    subscriptionTier === 'fire' || 
    subscriptionTier === 'ether' || 
    subscriptionTier === 'pro'
  );

  const handleUpgrade = () => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate('/pricing');
    }
  };

  const handleJourneySelect = (journeyType: string) => {
    console.log('Journey selected:', journeyType);
    setSelectedJourney(journeyType);
    setCurrentView('setup');
  };

  const handleJourneyStart = (data: any) => {
    console.log('Journey starting with data:', data);
    setSetupData(data);
    setCurrentView('session');
    
    toast({
      title: "Journey Starting",
      description: "Your soul journey experience is beginning. Stay safe and trust the process.",
    });
  };

  const handleSessionEnd = (data: any) => {
    console.log('Session ending with data:', data);
    setSessionData(data);
    setCurrentView('reflection');
    
    toast({
      title: "Journey Complete",
      description: "Welcome back. Take time to reflect on your experience.",
    });
  };

  const handleEmergencyEnd = () => {
    console.log('Emergency end triggered');
    setCurrentView('dashboard');
    setSetupData(null);
    setSessionData(null);
    
    toast({
      title: "Safe Return",
      description: "You have returned safely. Ground yourself and rest if needed.",
    });
  };

  const handleReflectionSave = (reflectionData: any) => {
    console.log('Saving reflection:', reflectionData);
    try {
      const existingJournals = JSON.parse(localStorage.getItem('soulJourneyJournals') || '[]');
      const newEntry = {
        ...reflectionData,
        id: Date.now(),
        timestamp: new Date().toISOString()
      };
      existingJournals.push(newEntry);
      localStorage.setItem('soulJourneyJournals', JSON.stringify(existingJournals));
      
      // Update stats
      const stats = JSON.parse(localStorage.getItem('soulJourneyStats') || '{"totalJourneys":0,"favoriteType":"Astral","totalTime":0,"badges":[]}');
      stats.totalJourneys += 1;
      stats.totalTime += reflectionData.duration || 0;
      localStorage.setItem('soulJourneyStats', JSON.stringify(stats));
      
      toast({
        title: "Journey Saved",
        description: "Your journey has been recorded in your journal",
      });
    } catch (error) {
      console.error('Error saving reflection:', error);
      toast({
        title: "Save Error",
        description: "There was an issue saving your journey. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleReflectionShare = (reflectionData: any) => {
    console.log('Sharing reflection:', reflectionData);
    try {
      const communityPosts = JSON.parse(localStorage.getItem('soulJourneyCommunity') || '[]');
      const newPost = {
        ...reflectionData,
        id: Date.now(),
        author: 'Anonymous Traveler',
        likes: 0,
        comments: [],
        timestamp: new Date().toISOString()
      };
      communityPosts.unshift(newPost);
      localStorage.setItem('soulJourneyCommunity', JSON.stringify(communityPosts));
      
      toast({
        title: "Shared with Community",
        description: "Your experience has been shared with the community circle",
      });
    } catch (error) {
      console.error('Error sharing reflection:', error);
      toast({
        title: "Share Error",
        description: "There was an issue sharing your journey. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleReflectionComplete = () => {
    console.log('Reflection completed, returning to dashboard');
    setCurrentView('dashboard');
    setSetupData(null);
    setSessionData(null);
    setSelectedJourney('');
  };

  const handleBackToDashboard = () => {
    console.log('Returning to dashboard');
    setCurrentView('dashboard');
    setSetupData(null);
    setSessionData(null);
    setSelectedJourney('');
  };

  // Show upgrade gate if user doesn't have access
  if (!loading && !hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gray-900/50 border-purple-500/30 text-white backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <Lock className="w-10 h-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl flex items-center justify-center space-x-3 mb-4">
                  <Crown className="w-8 h-8 text-yellow-400" />
                  <span>Soul Journey - Premium Feature</span>
                </CardTitle>
                <p className="text-xl text-purple-200 mb-6">
                  Unlock the ancient and transformative practice of Soul Traveling
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-lg border border-purple-500/30">
                    <h3 className="text-lg font-semibold text-purple-200 mb-3">What You'll Get:</h3>
                    <ul className="text-left text-purple-300 space-y-2">
                      <li>• Complete Soul Journey dashboard with guided experiences</li>
                      <li>• Multiple journey types (Astral, Past Life, Spirit Guide encounters)</li>
                      <li>• Advanced safety protocols and emergency return features</li>
                      <li>• Journey reflection and community sharing tools</li>
                      <li>• Progress tracking and spiritual development metrics</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <p className="text-purple-300">
                      Upgrade to <span className="font-semibold text-yellow-400">Fire Keeper</span> or <span className="font-semibold text-yellow-400">Ether Walker</span> to access Soul Journey features
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        onClick={handleUpgrade}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 text-lg"
                        size="lg"
                      >
                        {!user ? 'Sign In & Upgrade' : 'View Pricing Plans'}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      
                      <Button 
                        onClick={() => navigate('/pro')}
                        variant="outline"
                        className="border-purple-400 text-purple-200 hover:bg-purple-600/20 px-8 py-3 text-lg"
                        size="lg"
                      >
                        Explore Pro Features
                      </Button>
                    </div>
                  </div>

                  {!user && (
                    <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                      <p className="text-yellow-200 text-sm">
                        <strong>New to SpiritualMind?</strong> Sign up for free to explore our basic features, then upgrade when you're ready for advanced soul travel experiences.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Toggle between simple and advanced view */}
        {currentView === 'dashboard' && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => setUseSimpleView(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !useSimpleView 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Complete Soul Journey
              </button>
              <button
                onClick={() => setUseSimpleView(true)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  useSimpleView 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Simple Practice Mode
              </button>
            </div>
          </div>
        )}

        {/* Render appropriate component based on current view and mode */}
        {currentView === 'dashboard' && (
          <>
            {useSimpleView ? (
              <SimpleSoulTravelDashboard />
            ) : (
              <SoulJourneyDashboard onJourneySelect={handleJourneySelect} />
            )}
          </>
        )}

        {currentView === 'setup' && (
          <JourneySetup
            selectedJourney={selectedJourney}
            onJourneyStart={handleJourneyStart}
            onBack={handleBackToDashboard}
          />
        )}

        {currentView === 'session' && setupData && (
          <JourneySession
            setupData={setupData}
            onSessionEnd={handleSessionEnd}
            onEmergencyEnd={handleEmergencyEnd}
          />
        )}

        {currentView === 'reflection' && sessionData && (
          <JourneyReflection
            sessionData={sessionData}
            onSave={handleReflectionSave}
            onShare={handleReflectionShare}
            onComplete={handleReflectionComplete}
          />
        )}
      </div>
    </div>
  );
};

export default SoulTravelPage;
