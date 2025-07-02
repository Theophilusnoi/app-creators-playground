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
import UpgradePrompt from '@/components/ui/UpgradePrompt';

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
            <UpgradePrompt
              feature="Soul Journey Experience"
              description="Unlock the ancient and transformative practice of Soul Traveling with comprehensive guidance and safety protocols."
              benefits={[
                "Complete Soul Journey dashboard with guided experiences",
                "Multiple journey types (Astral, Past Life, Spirit Guide encounters)",
                "Advanced safety protocols and emergency return features",
                "Journey reflection and community sharing tools",
                "Progress tracking and spiritual development metrics"
              ]}
              requiredTier="fire"
            />
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
