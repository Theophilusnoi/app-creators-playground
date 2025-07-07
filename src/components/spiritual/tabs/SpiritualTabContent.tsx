
import React, { Suspense } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load components for better performance
const EnhancedSeraphinaChat = React.lazy(() => import('../divination/enhanced/SeraphinaChat'));
const RitualsDirectory = React.lazy(() => import('../RitualsDirectory'));
const CulturalAdapter = React.lazy(() => import('../CulturalAdapter'));
const CommunityHub = React.lazy(() => import('../CommunityHub'));
const ProgressVisualization = React.lazy(() => import('../ProgressVisualization'));
const MoodTracker = React.lazy(() => import('../MoodTracker'));
const DreamAnalysis = React.lazy(() => import('../DreamAnalysis'));
const ProtectionSuite = React.lazy(() => import('../ProtectionSuite'));
const AngelicAssistance = React.lazy(() => import('../AngelicAssistance'));
const CombinedInsights = React.lazy(() => import('../CombinedInsights'));
const PersonalGuidanceSystem = React.lazy(() => import('../PersonalGuidanceSystem'));
const ShadowWorkTracker = React.lazy(() => import('../ShadowWorkTracker'));
const SynchronicityDecoder = React.lazy(() => import('../SynchronicityDecoder'));
const CombinedAssessment = React.lazy(() => import('../CombinedAssessment'));
const ReferralSystem = React.lazy(() => import('../ReferralSystem'));

// Loading component
const LoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-48 w-full" />
  </div>
);

export const SpiritualTabContent: React.FC = () => {
  return (
    <>
      {/* Primary Tabs */}
      <TabsContent value="seraphina" className="space-y-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <EnhancedSeraphinaChat />
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
          <ProtectionSuite />
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
