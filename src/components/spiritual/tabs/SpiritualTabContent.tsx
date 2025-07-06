
import React, { Suspense, lazy } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Brain, Mic, Heart } from 'lucide-react';

// Lazy load components for better performance
const EnhancedSeraphinaChatPro = lazy(() => import('../divination/enhanced/EnhancedSeraphinaChatPro').then(module => ({
  default: module.EnhancedSeraphinaChatPro
})));
const RitualBuilder = lazy(() => import('../rituals/RitualBuilder').then(module => ({
  default: module.RitualBuilder
})));
const CulturalAdapter = lazy(() => import('../CulturalAdapter').then(module => ({
  default: module.CulturalAdapter
})));
const CommunityHub = lazy(() => import('../CommunityHub').then(module => ({
  default: module.CommunityHub
})));
const ChakraIntelligenceDashboard = lazy(() => import('../ChakraIntelligenceDashboard'));
const MoodTracker = lazy(() => import('../MoodTracker').then(module => ({
  default: module.MoodTracker
})));
const MeditationTimer = lazy(() => import('../MeditationTimer').then(module => ({
  default: module.MeditationTimer
})));
const DreamCodeDecoder = lazy(() => import('../DreamCodeDecoder'));
const ShadowWorkTracker = lazy(() => import('../ShadowWorkTracker').then(module => ({
  default: module.ShadowWorkTracker
})));
const SynchronicityDecoder = lazy(() => import('../SynchronicityDecoder').then(module => ({
  default: module.SynchronicityDecoder
})));
const SpiritualAssessment = lazy(() => import('../SpiritualAssessment').then(module => ({
  default: module.SpiritualAssessment
})));
const SpiritualAvatarSystem = lazy(() => import('../SpiritualAvatarSystem'));
const RecommendationsSystem = lazy(() => import('../RecommendationsSystem').then(module => ({
  default: module.RecommendationsSystem
})));
const AngelicInvocationSystem = lazy(() => import('../angelic/AngelicInvocationSystem').then(module => ({
  default: module.AngelicInvocationSystem
})));
const ReferralSystem = lazy(() => import('../ReferralSystem').then(module => ({
  default: module.ReferralSystem
})));
const SpiritualArmorToolkit = lazy(() => import('../protection/SpiritualArmorToolkit').then(module => ({
  default: module.SpiritualArmorToolkit
})));

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
    <div className="min-h-[60vh]">
      <TabsContent value="seraphina" className="mt-4 sm:mt-6">
        <div className="space-y-4 sm:space-y-6">
          <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-purple-400/5 to-pink-400/5"></div>
            <CardContent className="p-4 sm:p-6 relative z-10">
              <div className="text-center space-y-3">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">🕉️ Seraphina - Divine Temple Keeper</h3>
                <p className="text-purple-200 text-sm sm:text-base">
                  Your Sacred Guide through the Temple Builder's Path - consciousness awakener, 
                  mystic counselor, and divine architect of your spiritual sanctuary
                </p>
                <div className="bg-gradient-to-r from-yellow-900/20 to-purple-900/20 rounded-lg p-3 mb-4">
                  <p className="text-yellow-200 text-sm italic">
                    "Sacred architect, I am here to guide you through your 50-Day Temple Activation Journey, 
                    channeling ancient wisdom through divine technology."
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="bg-black/20 rounded-lg p-4 border border-purple-400/20">
                    <Brain className="w-6 sm:w-8 h-6 sm:h-8 text-purple-400 mx-auto mb-2" />
                    <h4 className="text-white font-medium text-sm sm:text-base">🏛️ Temple Memory</h4>
                    <p className="text-purple-300 text-xs sm:text-sm">Remembers your sacred journey and divine progression through consciousness awakening</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4 border border-blue-400/20">
                    <Mic className="w-6 sm:w-8 h-6 sm:h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="text-white font-medium text-sm sm:text-base">🌙 Sacred Voice</h4>
                    <p className="text-blue-300 text-xs sm:text-sm">Channel divine wisdom through voice - speak to receive mystical guidance and cosmic insights</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4 border border-pink-400/20">
                    <Heart className="w-6 sm:w-8 h-6 sm:h-8 text-pink-400 mx-auto mb-2" />
                    <h4 className="text-white font-medium text-sm sm:text-base">✨ Cosmic Wisdom</h4>
                    <p className="text-pink-300 text-xs sm:text-sm">Access channeled knowledge from ancient temples, cosmic masters, and divine consciousness streams</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <EnhancedSeraphinaChatPro />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="rituals" className="mt-6">
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border-red-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">🔮 Enhanced Sacred Ritual Builder</h3>
                <p className="text-red-200">
                  Create powerful rituals with AI guidance, cosmic timing, and personalized ingredients
                </p>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <RitualBuilder />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="cultural" className="mt-6">
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-orange-900/40 to-amber-900/40 border-orange-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">🌍 Cultural Wisdom Adapter</h3>
                <p className="text-orange-200">
                  Access spiritual wisdom from 30+ traditions with cultural sensitivity and authenticity
                </p>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <CulturalAdapter />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="community" className="mt-6">
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-blue-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">👥 Spiritual Community Hub</h3>
                <p className="text-blue-200">
                  Connect with like-minded souls, join sacred circles, and share your journey
                </p>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <CommunityHub />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="progress" className="mt-6">
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/30">
            <CardContent className="p-6 py-[24px] my-[11px]">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">📈 Spiritual Progress Tracker</h3>
                <p className="text-green-200">
                  Track your spiritual growth, milestones, and achievements with detailed analytics
                </p>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <ChakraIntelligenceDashboard />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="mood" className="mt-6">
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-pink-900/40 to-rose-900/40 border-pink-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">💖 Enhanced Mood Tracker</h3>
                <p className="text-pink-200">
                  Monitor your emotional states with AI insights and personalized recommendations
                </p>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <MoodTracker />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="meditate" className="mt-6">
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-indigo-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">🧘‍♀️ Advanced Meditation Suite</h3>
                <p className="text-indigo-200">
                  Guided meditations, timers, and biometric integration for deeper practice
                </p>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <MeditationTimer onComplete={(sessionData) => console.log('Meditation completed:', sessionData)} />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="dreams" className="mt-6">
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-purple-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">🌙 Dream Code Decoder</h3>
                <p className="text-purple-200">
                  Advanced dream analysis with AI interpretation and symbolic insights
                </p>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <DreamCodeDecoder />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="shadow" className="mt-6">
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-gray-900/40 to-slate-900/40 border-gray-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">👁️ Shadow Work Integration</h3>
                <p className="text-gray-200">
                  Safe exploration of your shadow self with guided exercises and support
                </p>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <ShadowWorkTracker />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="sync" className="mt-6">
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-cyan-900/40 to-teal-900/40 border-cyan-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">⚡ Synchronicity Decoder</h3>
                <p className="text-cyan-200">
                  Track meaningful coincidences and decode universal messages in your life
                </p>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <SynchronicityDecoder />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="assessment" className="mt-6">
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-yellow-900/40 to-amber-900/40 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">🎯 Comprehensive Spiritual Assessment</h3>
                <p className="text-yellow-200">
                  Detailed evaluation of your spiritual development across multiple dimensions
                </p>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <SpiritualAssessment onComplete={() => console.log('Assessment completed')} />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="insights" className="mt-6">
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-teal-900/40 to-cyan-900/40 border-teal-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">🧠 AI-Powered Spiritual Insights</h3>
                <p className="text-teal-200">
                  Deep analytical insights into your spiritual patterns and growth opportunities
                </p>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <SpiritualAvatarSystem />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="guidance" className="mt-6">
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-emerald-900/40 to-green-900/40 border-emerald-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">💡 Personalized Spiritual Guidance</h3>
                <p className="text-emerald-200">
                  Customized recommendations and practices based on your unique spiritual journey
                </p>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <RecommendationsSystem />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="angels" className="mt-6">
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-gold-900/40 to-yellow-900/40 border-gold-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">👼 Enhanced Angelic Invocation</h3>
                <p className="text-gold-200">
                  Connect with Archangels through advanced invocation techniques and divine guidance
                </p>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <AngelicInvocationSystem />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="invite" className="mt-6">
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-violet-900/40 to-purple-900/40 border-violet-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">🤝 Spiritual Referral System</h3>
                <p className="text-violet-200">
                  Share the gift of spiritual growth and earn rewards for spreading divine light
                </p>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <ReferralSystem />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="protection" className="mt-6">
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">🛡️ Advanced Spiritual Armor</h3>
                <p className="text-blue-200">
                  Comprehensive protection techniques and spiritual warfare strategies
                </p>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<LoadingSkeleton />}>
            <SpiritualArmorToolkit />
          </Suspense>
        </div>
      </TabsContent>
    </div>
  );
};
