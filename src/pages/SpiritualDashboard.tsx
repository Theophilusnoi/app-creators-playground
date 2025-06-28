
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { TopNavigation } from '@/components/spiritual/TopNavigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, Loader2 } from 'lucide-react';
import SubscriptionStatus from '@/components/subscription/SubscriptionStatus';

// Import combined components
import { CombinedSeraphinaChat } from '@/components/spiritual/CombinedSeraphinaChat';
import { CombinedAssessment } from '@/components/spiritual/CombinedAssessment';
import { CombinedRituals } from '@/components/spiritual/CombinedRituals';
import { CombinedInsights } from '@/components/spiritual/CombinedInsights';

// Import individual components that remain separate
import { CulturalAdapter } from '@/components/spiritual/CulturalAdapter';
import { CommunityHub } from '@/components/spiritual/CommunityHub';
import { MoodTracker } from '@/components/spiritual/MoodTracker';
import { MeditationTracker } from '@/components/spiritual/MeditationTracker';
import { DreamAnalysis } from '@/components/spiritual/DreamAnalysis';
import { ShadowWorkTracker } from '@/components/spiritual/ShadowWorkTracker';
import { SynchronicityDetector } from '@/components/spiritual/SynchronicityDetector';
import { RecommendationsSystem } from '@/components/spiritual/RecommendationsSystem';
import AngelicAssistance from '@/components/spiritual/AngelicAssistance';
import DivinationHub from '@/components/spiritual/DivinationHub';
import { ThirdEyeActivation } from '@/components/spiritual/ThirdEyeActivation';
import { ReferralSystem } from '@/components/spiritual/ReferralSystem';
import { WisdomPhilosophy } from '@/components/spiritual/WisdomPhilosophy';
import { PersonalGuidanceSystem } from '@/components/spiritual/PersonalGuidanceSystem';
import { SpiritualKnowledgeBase } from '@/components/spiritual/SpiritualKnowledgeBase';

const SpiritualDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('seraphina');
  const [isLoaded, setIsLoaded] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAssessmentComplete = () => {
    setActiveTab('seraphina');
  };

  const handleSignInClick = () => {
    navigate('/auth');
  };

  const handleTabChange = (newTab: string) => {
    console.log(`Tab change requested: ${newTab}`);
    setContentLoading(true);
    
    setTimeout(() => {
      setActiveTab(newTab);
      setContentLoading(false);
      console.log(`Tab changed to: ${newTab}`);
    }, 200);
  };

  // Show loading state while authentication is being determined
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="flex items-center gap-3 text-white animate-fade-in">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-xl">Loading your spiritual dashboard...</span>
        </div>
      </div>
    );
  }

  // Show sign-in prompt if no user is authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4 animate-fade-in">
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm max-w-md w-full animate-scale-in">
          <CardContent className="pt-6 text-center">
            <LogIn className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
            <p className="text-purple-200 mb-6">
              Please sign in to access your spiritual dashboard and begin your journey with Seraphina.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={handleSignInClick}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Go to Sign In
              </Button>
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full border-purple-400/50 text-purple-200 hover:bg-purple-400/20 transition-all duration-300"
              >
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render the dashboard for authenticated users
  return (
    <div className={`min-h-screen w-full bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex h-screen w-full">
        {/* Navigation Panel - 35% width */}
        <div className="w-[35%] flex flex-col border-r border-purple-500/30">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full flex flex-col">
            <TopNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          </Tabs>
        </div>

        {/* Content Panel - 65% width */}
        <div className="w-[65%] flex flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full">
            {contentLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-400 mx-auto mb-2" />
                  <p className="text-purple-200 text-sm">Loading content...</p>
                </div>
              </div>
            )}
            
            <div className={`transition-all duration-300 h-full overflow-auto ${contentLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <TabsContent value="seraphina" className="mt-0 animate-fade-in focus:outline-none h-full">
                <CombinedSeraphinaChat />
              </TabsContent>

              <TabsContent value="archetype" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <CombinedAssessment onAssessmentComplete={handleAssessmentComplete} />
                </div>
              </TabsContent>

              <TabsContent value="rituals" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <CombinedRituals />
                </div>
              </TabsContent>

              <TabsContent value="insights" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <CombinedInsights />
                </div>
              </TabsContent>

              <TabsContent value="knowledge-base" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <SpiritualKnowledgeBase />
                </div>
              </TabsContent>

              <TabsContent value="subscription" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <SubscriptionStatus />
                </div>
              </TabsContent>

              <TabsContent value="cultural" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <CulturalAdapter />
                </div>
              </TabsContent>

              <TabsContent value="community" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <CommunityHub />
                </div>
              </TabsContent>

              <TabsContent value="mood" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <MoodTracker />
                </div>
              </TabsContent>

              <TabsContent value="meditation" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <MeditationTracker />
                </div>
              </TabsContent>

              <TabsContent value="dreams" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <DreamAnalysis />
                </div>
              </TabsContent>

              <TabsContent value="shadow" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <ShadowWorkTracker />
                </div>
              </TabsContent>

              <TabsContent value="sync" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <SynchronicityDetector />
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <RecommendationsSystem />
                </div>
              </TabsContent>

              <TabsContent value="angelic" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <AngelicAssistance />
                </div>
              </TabsContent>

              <TabsContent value="divination" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <DivinationHub />
                </div>
              </TabsContent>

              <TabsContent value="third-eye" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <ThirdEyeActivation />
                </div>
              </TabsContent>

              <TabsContent value="referrals" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <ReferralSystem />
                </div>
              </TabsContent>

              <TabsContent value="wisdom" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <WisdomPhilosophy />
                </div>
              </TabsContent>

              <TabsContent value="guidance" className="mt-0 animate-fade-in focus:outline-none h-full">
                <div className="p-6 h-full">
                  <PersonalGuidanceSystem />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SpiritualDashboard;
