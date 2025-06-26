
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

  const handleAssessmentComplete = () => {
    setActiveTab('seraphina');
  };

  const handleSignInClick = () => {
    navigate('/auth');
  };

  // Show loading state while authentication is being determined
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-xl">Loading your spiritual dashboard...</span>
        </div>
      </div>
    );
  }

  // Show sign-in prompt if no user is authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <LogIn className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
            <p className="text-purple-200 mb-6">
              Please sign in to access your spiritual dashboard and begin your journey with Seraphina.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={handleSignInClick}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Go to Sign In
              </Button>
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full border-purple-400/50 text-purple-200 hover:bg-purple-400/20"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="container mx-auto px-4 py-6 relative z-10">
          <TabsContent value="seraphina" className="mt-0">
            <CombinedSeraphinaChat />
          </TabsContent>

          <TabsContent value="archetype" className="mt-0">
            <CombinedAssessment onAssessmentComplete={handleAssessmentComplete} />
          </TabsContent>

          <TabsContent value="rituals" className="mt-0">
            <CombinedRituals />
          </TabsContent>

          <TabsContent value="insights" className="mt-0">
            <CombinedInsights />
          </TabsContent>

          <TabsContent value="knowledge-base" className="mt-0">
            <SpiritualKnowledgeBase />
          </TabsContent>

          <TabsContent value="subscription" className="mt-0">
            <SubscriptionStatus />
          </TabsContent>

          <TabsContent value="cultural" className="mt-0">
            <CulturalAdapter />
          </TabsContent>

          <TabsContent value="community" className="mt-0">
            <CommunityHub />
          </TabsContent>

          <TabsContent value="mood" className="mt-0">
            <MoodTracker />
          </TabsContent>

          <TabsContent value="meditation" className="mt-0">
            <MeditationTracker />
          </TabsContent>

          <TabsContent value="dreams" className="mt-0">
            <DreamAnalysis />
          </TabsContent>

          <TabsContent value="shadow" className="mt-0">
            <ShadowWorkTracker />
          </TabsContent>

          <TabsContent value="sync" className="mt-0">
            <SynchronicityDetector />
          </TabsContent>

          <TabsContent value="recommendations" className="mt-0">
            <RecommendationsSystem />
          </TabsContent>

          <TabsContent value="angelic" className="mt-0">
            <AngelicAssistance />
          </TabsContent>

          <TabsContent value="divination" className="mt-0">
            <DivinationHub />
          </TabsContent>

          <TabsContent value="third-eye" className="mt-0">
            <ThirdEyeActivation />
          </TabsContent>

          <TabsContent value="referrals" className="mt-0">
            <ReferralSystem />
          </TabsContent>

          <TabsContent value="wisdom" className="mt-0">
            <WisdomPhilosophy />
          </TabsContent>

          <TabsContent value="guidance" className="mt-0">
            <PersonalGuidanceSystem />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SpiritualDashboard;
