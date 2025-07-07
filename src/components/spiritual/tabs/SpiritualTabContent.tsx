
import React, { Suspense } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load components for better performance - fixing export names
const SeraphinaChat = React.lazy(() => import('../divination/enhanced/SeraphinaChat').then(module => ({ default: module.SeraphinaChat })));
const RitualsDirectory = React.lazy(() => import('../RitualsDirectory').then(module => ({ default: module.RitualsDirectory })));
const CulturalAdapter = React.lazy(() => import('../CulturalAdapter').then(module => ({ default: module.CulturalAdapter })));
const CommunityHub = React.lazy(() => import('../CommunityHub').then(module => ({ default: module.CommunityHub })));
const ProgressVisualization = React.lazy(() => import('../ProgressVisualization').then(module => ({ default: module.ProgressVisualization })));
const MoodTracker = React.lazy(() => import('../MoodTracker').then(module => ({ default: module.MoodTracker })));
const DreamAnalysis = React.lazy(() => import('../DreamAnalysis').then(module => ({ default: module.DreamAnalysis })));
const ProtectionSuite = React.lazy(() => import('../ProtectionSuite').then(module => ({ default: module.ProtectionSuite })));
const AngelicAssistance = React.lazy(() => import('../AngelicAssistance'));
const CombinedInsights = React.lazy(() => import('../CombinedInsights').then(module => ({ default: module.CombinedInsights })));
const PersonalGuidanceSystem = React.lazy(() => import('../PersonalGuidanceSystem').then(module => ({ default: module.PersonalGuidanceSystem })));
const ShadowWorkTracker = React.lazy(() => import('../ShadowWorkTracker').then(module => ({ default: module.ShadowWorkTracker })));
const SynchronicityDecoder = React.lazy(() => import('../SynchronicityDecoder').then(module => ({ default: module.SynchronicityDecoder })));
const CombinedAssessment = React.lazy(() => import('../CombinedAssessment').then(module => ({ default: module.CombinedAssessment })));
const ReferralSystem = React.lazy(() => import('../ReferralSystem').then(module => ({ default: module.ReferralSystem })));

// Loading component
const LoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-48 w-full" />
  </div>
);

export const SpiritualTabContent: React.FC = () => {
  const handleStartProtectionRitual = (type: 'emergency' | 'curse-breaking' | 'daily') => {
    console.log('Starting protection ritual:', type);
    // Handle ritual start logic here
  };

  const handleExitToSafety = () => {
    console.log('Exiting to safety');
    // Handle exit to safety logic here
  };

  return (
    <>
      {/* Primary Tabs */}
      <TabsContent value="seraphina" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <SeraphinaChat />
        </Suspense>
      </TabsContent>

      <TabsContent value="rituals" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <RitualsDirectory />
        </Suspense>
      </TabsContent>

      <TabsContent value="cultural" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <CulturalAdapter />
        </Suspense>
      </TabsContent>

      <TabsContent value="community" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <CommunityHub />
        </Suspense>
      </TabsContent>

      {/* Secondary Tabs */}
      <TabsContent value="progress" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <ProgressVisualization />
        </Suspense>
      </TabsContent>

      <TabsContent value="mood" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <MoodTracker />
        </Suspense>
      </TabsContent>

      <TabsContent value="dreams" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <DreamAnalysis />
        </Suspense>
      </TabsContent>

      <TabsContent value="protection" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <ProtectionSuite 
            isEmergencyMode={false}
            onStartProtectionRitual={handleStartProtectionRitual}
            onExitToSafety={handleExitToSafety}
          />
        </Suspense>
      </TabsContent>

      <TabsContent value="angels" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <AngelicAssistance />
        </Suspense>
      </TabsContent>

      <TabsContent value="insights" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <CombinedInsights />
        </Suspense>
      </TabsContent>

      <TabsContent value="guidance" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <PersonalGuidanceSystem />
        </Suspense>
      </TabsContent>

      <TabsContent value="shadow" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <ShadowWorkTracker />
        </Suspense>
      </TabsContent>

      <TabsContent value="sync" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <SynchronicityDecoder />
        </Suspense>
      </TabsContent>

      <TabsContent value="assessment" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <CombinedAssessment />
        </Suspense>
      </TabsContent>

      <TabsContent value="invite" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <ReferralSystem />
        </Suspense>
      </TabsContent>
    </>
  );
};
