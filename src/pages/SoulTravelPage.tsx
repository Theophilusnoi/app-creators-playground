
import React, { useState } from 'react';
import SoulJourneyDashboard from '@/components/spiritual/pro/soulTravel/SoulJourneyDashboard';
import JourneySetup from '@/components/spiritual/pro/soulTravel/JourneySetup';
import JourneySession from '@/components/spiritual/pro/soulTravel/JourneySession';
import JourneyReflection from '@/components/spiritual/pro/soulTravel/JourneyReflection';
import SimpleSoulTravelDashboard from '@/components/spiritual/pro/soulTravel/SimpleSoulTravelDashboard';
import { useToast } from '@/hooks/use-toast';

const SoulTravelPage: React.FC = () => {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedJourney, setSelectedJourney] = useState('');
  const [setupData, setSetupData] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [useSimpleView, setUseSimpleView] = useState(false);

  const handleJourneySelect = (journeyType: string) => {
    setSelectedJourney(journeyType);
    setCurrentView('setup');
  };

  const handleJourneyStart = (data: any) => {
    setSetupData(data);
    setCurrentView('session');
    
    toast({
      title: "Journey Starting",
      description: "Your soul journey experience is beginning. Stay safe and trust the process.",
    });
  };

  const handleSessionEnd = (data: any) => {
    setSessionData(data);
    setCurrentView('reflection');
    
    toast({
      title: "Journey Complete",
      description: "Welcome back. Take time to reflect on your experience.",
    });
  };

  const handleEmergencyEnd = () => {
    setCurrentView('dashboard');
    setSetupData(null);
    setSessionData(null);
    
    toast({
      title: "Safe Return",
      description: "You have returned safely. Ground yourself and rest if needed.",
    });
  };

  const handleReflectionSave = (reflectionData: any) => {
    // Save to localStorage for now
    const existingJournals = JSON.parse(localStorage.getItem('soulJourneyJournals') || '[]');
    existingJournals.push(reflectionData);
    localStorage.setItem('soulJourneyJournals', JSON.stringify(existingJournals));
    
    // Update stats
    const stats = JSON.parse(localStorage.getItem('soulJourneyStats') || '{"totalJourneys":0,"favoriteType":"Astral","totalTime":0,"badges":[]}');
    stats.totalJourneys += 1;
    stats.totalTime += reflectionData.duration;
    localStorage.setItem('soulJourneyStats', JSON.stringify(stats));
  };

  const handleReflectionShare = (reflectionData: any) => {
    // For now, just save to community storage
    const communityPosts = JSON.parse(localStorage.getItem('soulJourneyCommunity') || '[]');
    communityPosts.unshift({
      ...reflectionData,
      id: Date.now(),
      author: 'Anonymous Traveler',
      likes: 0,
      comments: []
    });
    localStorage.setItem('soulJourneyCommunity', JSON.stringify(communityPosts));
  };

  const handleReflectionComplete = () => {
    setCurrentView('dashboard');
    setSetupData(null);
    setSessionData(null);
    setSelectedJourney('');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSetupData(null);
    setSessionData(null);
    setSelectedJourney('');
  };

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
