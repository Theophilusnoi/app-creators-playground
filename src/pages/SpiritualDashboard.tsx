
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
    // Add smooth loading animation
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
    setContentLoading(true);
    // Add a small delay for smooth transition
    setTimeout(() => {
      setActiveTab(newTab);
      setContentLoading(false);
    }, 150);
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
    <div className={`min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TopNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        
        <div className="container mx-auto px-4 py-6 relative z-10">
          {contentLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
            </div>
          )}
          
          <div className={`transition-opacity duration-300 ${contentLoading ? 'opacity-0' : 'opacity-100'}`}>
            <TabsContent value="seraphina" className="mt-0 animate-fade-in">
              <CombinedSeraphinaChat />
            </TabsContent>

            <TabsContent value="archetype" className="mt-0 animate-fade-in">
              <CombinedAssessment onAssessmentComplete={handleAssessmentComplete} />
            </TabsContent>

            <TabsContent value="rituals" className="mt-0 animate-fade-in">
              <CombinedRituals />
            </TabsContent>

            <TabsContent value="insights" className="mt-0 animate-fade-in">
              <CombinedInsights />
            </TabsContent>

            <TabsContent value="knowledge-base" className="mt-0 animate-fade-in">
              <SpiritualKnowledgeBase />
            </TabsContent>

            <TabsContent value="subscription" className="mt-0 animate-fade-in">
              <SubscriptionStatus />
            </TabsContent>

            <TabsContent value="cultural" className="mt-0 animate-fade-in">
              <CulturalAdapter />
            </TabsContent>

            <TabsContent value="community" className="mt-0 animate-fade-in">
              <CommunityHub />
            </TabsContent>

            <TabsContent value="mood" className="mt-0 animate-fade-in">
              <MoodTracker />
            </TabsContent>

            <TabsContent value="meditation" className="mt-0 animate-fade-in">
              <MeditationTracker />
            </TabsContent>

            <TabsContent value="dreams" className="mt-0 animate-fade-in">
              <DreamAnalysis />
            </TabsContent>

            <TabsContent value="shadow" className="mt-0 animate-fade-in">
              <ShadowWorkTracker />
            </TabsContent>

            <TabsContent value="sync" className="mt-0 animate-fade-in">
              <SynchronicityDetector />
            </TabsContent>

            <TabsContent value="recommendations" className="mt-0 animate-fade-in">
              <RecommendationsSystem />
            </TabsContent>

            <TabsContent value="angelic" className="mt-0 animate-fade-in">
              <AngelicAssistance />
            </TabsContent>

            <TabsContent value="divination" className="mt-0 animate-fade-in">
              <DivinationHub />
            </TabsContent>

            <TabsContent value="third-eye" className="mt-0 animate-fade-in">
              <ThirdEyeActivation />
            </TabsContent>

            <TabsContent value="referrals" className="mt-0 animate-fade-in">
              <ReferralSystem />
            </TabsContent>

            <TabsContent value="wisdom" className="mt-0 animate-fade-in">
              <WisdomPhilosophy />
            </TabsContent>

            <TabsContent value="guidance" className="mt-0 animate-fade-in">
              <PersonalGuidanceSystem />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SpiritualDashboard;
