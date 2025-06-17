
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { TopNavigation } from '@/components/spiritual/TopNavigation';
import { useAuth } from '@/components/auth/AuthProvider';

// Import all spiritual components
import { SoulGuideChat } from '@/components/spiritual/SoulGuideChat';
import { RitualActivationSystem } from '@/components/spiritual/RitualActivationSystem';
import { CulturalAdapter } from '@/components/spiritual/CulturalAdapter';
import { CommunityHub } from '@/components/spiritual/CommunityHub';
import { ProgressVisualization } from '@/components/spiritual/ProgressVisualization';
import { MoodTracker } from '@/components/spiritual/MoodTracker';
import { MeditationTracker } from '@/components/spiritual/MeditationTracker';
import { DreamAnalysis } from '@/components/spiritual/DreamAnalysis';
import { ShadowWorkTracker } from '@/components/spiritual/ShadowWorkTracker';
import { SynchronicityDetector } from '@/components/spiritual/SynchronicityDetector';
import { SpiritualAssessment } from '@/components/spiritual/SpiritualAssessment';
import { EmergencyAnalyticsDashboard } from '@/components/spiritual/EmergencyAnalyticsDashboard';
import { RecommendationsSystem } from '@/components/spiritual/RecommendationsSystem';
import AngelicAssistance from '@/components/spiritual/AngelicAssistance';
import { ReferralSystem } from '@/components/spiritual/ReferralSystem';

const SpiritualDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('seraphina');

  const handleAssessmentComplete = () => {
    // Navigate to Seraphina chat after assessment completion
    setActiveTab('seraphina');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Please log in to access the spiritual dashboard.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="container mx-auto px-4 py-6">
        <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="seraphina">
            <SoulGuideChat />
          </TabsContent>

          <TabsContent value="rituals">
            <RitualActivationSystem />
          </TabsContent>

          <TabsContent value="cultural">
            <CulturalAdapter />
          </TabsContent>

          <TabsContent value="community">
            <CommunityHub />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressVisualization />
          </TabsContent>

          <TabsContent value="mood">
            <MoodTracker />
          </TabsContent>

          <TabsContent value="meditation">
            <MeditationTracker />
          </TabsContent>

          <TabsContent value="dreams">
            <DreamAnalysis />
          </TabsContent>

          <TabsContent value="shadow">
            <ShadowWorkTracker />
          </TabsContent>

          <TabsContent value="sync">
            <SynchronicityDetector />
          </TabsContent>

          <TabsContent value="assessment">
            <SpiritualAssessment onComplete={handleAssessmentComplete} />
          </TabsContent>

          <TabsContent value="insights">
            <EmergencyAnalyticsDashboard />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationsSystem />
          </TabsContent>

          <TabsContent value="angelic">
            <AngelicAssistance />
          </TabsContent>

          <TabsContent value="referrals">
            <ReferralSystem />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SpiritualDashboard;
