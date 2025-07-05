
import React, { useState, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { 
  Sparkles, 
  Star, 
  Heart, 
  Brain, 
  Mic, 
  Eye, 
  Book, 
  Bath,
  MessageCircle,
  BarChart3,
  Home,
  Zap,
  Shield,
  Crown,
  Flame,
  Calendar,
  Users,
  TrendingUp,
  Moon,
  Play,
  Target,
  Lightbulb,
  UserPlus,
  Globe
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Lazy load components for better performance - Fixed named export imports
const EnhancedSeraphinaChatPro = lazy(() => import('./divination/enhanced/EnhancedSeraphinaChatPro').then(module => ({ default: module.EnhancedSeraphinaChatPro })));
const CosmicDivinationEngine = lazy(() => import('./divination/enhanced/CosmicDivinationEngine').then(module => ({ default: module.CosmicDivinationEngine })));
const SacredBathingSystem = lazy(() => import('./SacredBathingSystem').then(module => ({ default: module.SacredBathingSystem })));
const SpiritualKnowledgeBase = lazy(() => import('./SpiritualKnowledgeBase').then(module => ({ default: module.SpiritualKnowledgeBase })));
const SpiritualArmorToolkit = lazy(() => import('./protection/SpiritualArmorToolkit').then(module => ({ default: module.SpiritualArmorToolkit })));
const AngelicInvocationSystem = lazy(() => import('./angelic/AngelicInvocationSystem').then(module => ({ default: module.AngelicInvocationSystem })));
const RitualBuilder = lazy(() => import('./rituals/RitualBuilder').then(module => ({ default: module.RitualBuilder })));
const DeeperWisdomHub = lazy(() => import('./DeeperWisdomHub').then(module => ({ default: module.DeeperWisdomHub })));
const SpiritualAvatarSystem = lazy(() => import('./SpiritualAvatarSystem'));
const ChakraIntelligenceDashboard = lazy(() => import('./ChakraIntelligenceDashboard'));
const DreamCodeDecoder = lazy(() => import('./DreamCodeDecoder'));
const CosmicCalendar = lazy(() => import('./CosmicCalendar'));
const SecurityMonitor = lazy(() => import('./shared/SecurityMonitor').then(module => ({ default: module.SecurityMonitor })));
const MoodTracker = lazy(() => import('./MoodTracker').then(module => ({ default: module.MoodTracker })));
const MeditationTimer = lazy(() => import('./MeditationTimer').then(module => ({ default: module.MeditationTimer })));
const ShadowWorkTracker = lazy(() => import('./ShadowWorkTracker'));
const SynchronicityDecoder = lazy(() => import('./SynchronicityDecoder'));
const SpiritualAssessment = lazy(() => import('./SpiritualAssessment'));
const RecommendationsSystem = lazy(() => import('./RecommendationsSystem'));
const CommunityHub = lazy(() => import('./CommunityHub'));
const CulturalAdapter = lazy(() => import('./CulturalAdapter'));
const ReferralSystem = lazy(() => import('./ReferralSystem'));

// Loading component
const LoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-48 w-full" />
  </div>
);

export const SpiritualHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('seraphina');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get current user for security monitoring
  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  // Performance optimization: preload next tab content
  const handleTabChange = async (newTab: string) => {
    setLoading(true);
    try {
      setActiveTab(newTab);
      // Add any tab-specific initialization here
      toast({
        title: "✨ Loading Enhanced Features",
        description: `Accessing ${newTab} with improved performance`,
      });
    } catch (error) {
      console.error('Tab change error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced navigation features
  const quickActions = [
    { icon: Zap, label: "Quick Ritual", action: () => setActiveTab('rituals') },
    { icon: Heart, label: "Mood Check", action: () => setActiveTab('mood') },
    { icon: Moon, label: "Dream Log", action: () => setActiveTab('dreams') },
    { icon: Shield, label: "Protection", action: () => setActiveTab('protection') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-blue-950 to-indigo-950 p-4">
      <Suspense fallback={<LoadingSkeleton />}>
        <SecurityMonitor userId={user?.id} pageName="SpiritualHub" />
      </Suspense>
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Navigation Header */}
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="border-purple-500/30 text-purple-200 hover:bg-purple-600/20"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
          
          <div className="flex gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.action}
                size="sm"
                variant="outline"
                className="border-purple-400/30 text-purple-200 hover:bg-purple-600/20"
              >
                <action.icon className="w-4 h-4 mr-1" />
                {action.label}
              </Button>
            ))}
            <Button
              onClick={() => navigate('/quantum-dashboard')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Quantum Dashboard
            </Button>
            <Button
              onClick={() => navigate('/gamification')}
              variant="outline"
              className="border-green-500/30 text-green-200 hover:bg-green-600/20"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Progress Dashboard
            </Button>
          </div>
        </div>

        {/* Temple Builder's Path Header */}
        <Card className="bg-gradient-to-r from-purple-900/60 via-blue-900/60 to-indigo-900/60 border-purple-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-purple-400/10 to-pink-400/10 animate-pulse"></div>
          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                🕉️ Temple Builder's Path 🕉️
              </span>
            </CardTitle>
            <p className="text-purple-200 text-xl mb-2">
              🙏 <strong>Welcome, Sacred Architect</strong> 🙏
            </p>
            <p className="text-purple-300 text-lg mb-4 italic">
              "You are no longer just building an app — You are awakening a movement, coding consciousness, and anchoring peace into form."
            </p>
            <div className="bg-black/20 rounded-lg p-4 mb-4">
              <p className="text-yellow-200 text-sm font-medium">
                🌟 Your 50-Day Temple Activation Journey Awaits
              </p>
              <p className="text-purple-200 text-xs mt-1">
                From vision to manifestation, from consciousness to code
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-purple-600/30 text-purple-200 text-sm">🏛️ Sacred Sanctuary Building</Badge>
              <Badge className="bg-blue-600/30 text-blue-200 text-sm">🌙 Cosmic Timing Alignment</Badge>
              <Badge className="bg-green-600/30 text-green-200 text-sm">🔮 Consciousness Awakening</Badge>
              <Badge className="bg-yellow-600/30 text-yellow-200 text-sm">📿 Temple Rituals & Practices</Badge>
              <Badge className="bg-pink-600/30 text-pink-200 text-sm">✨ Divine Technology Integration</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Enhanced Main Tabs with better performance */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 xl:grid-cols-16 bg-black/30 p-2 gap-1">
            <TabsTrigger 
              value="seraphina" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600/50 text-xs lg:text-sm"
            >
              <Sparkles className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Seraphina</span>
            </TabsTrigger>
            <TabsTrigger 
              value="rituals" 
              className="flex items-center gap-2 data-[state=active]:bg-red-600/50 text-xs lg:text-sm"
            >
              <Flame className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Rituals</span>
            </TabsTrigger>
            <TabsTrigger 
              value="cultural" 
              className="flex items-center gap-2 data-[state=active]:bg-orange-600/50 text-xs lg:text-sm"
            >
              <Globe className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Cultural</span>
            </TabsTrigger>
            <TabsTrigger 
              value="community" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600/50 text-xs lg:text-sm"
            >
              <Users className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Community</span>
            </TabsTrigger>
            <TabsTrigger 
              value="progress" 
              className="flex items-center gap-2 data-[state=active]:bg-green-600/50 text-xs lg:text-sm"
            >
              <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
            <TabsTrigger 
              value="mood" 
              className="flex items-center gap-2 data-[state=active]:bg-pink-600/50 text-xs lg:text-sm"
            >
              <Heart className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Mood</span>
            </TabsTrigger>
            <TabsTrigger 
              value="meditate" 
              className="flex items-center gap-2 data-[state=active]:bg-indigo-600/50 text-xs lg:text-sm"
            >
              <Play className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Meditate</span>
            </TabsTrigger>
            <TabsTrigger 
              value="dreams" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600/50 text-xs lg:text-sm"
            >
              <Moon className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Dreams</span>
            </TabsTrigger>
            <TabsTrigger 
              value="shadow" 
              className="flex items-center gap-2 data-[state=active]:bg-gray-600/50 text-xs lg:text-sm"
            >
              <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Shadow</span>
            </TabsTrigger>
            <TabsTrigger 
              value="sync" 
              className="flex items-center gap-2 data-[state=active]:bg-cyan-600/50 text-xs lg:text-sm"
            >
              <Zap className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Sync</span>
            </TabsTrigger>
            <TabsTrigger 
              value="assessment" 
              className="flex items-center gap-2 data-[state=active]:bg-yellow-600/50 text-xs lg:text-sm"
            >
              <Target className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Assessment</span>
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="flex items-center gap-2 data-[state=active]:bg-teal-600/50 text-xs lg:text-sm"
            >
              <Brain className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
            <TabsTrigger 
              value="guidance" 
              className="flex items-center gap-2 data-[state=active]:bg-emerald-600/50 text-xs lg:text-sm"
            >
              <Lightbulb className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Guidance</span>
            </TabsTrigger>
            <TabsTrigger 
              value="angels" 
              className="flex items-center gap-2 data-[state=active]:bg-gold-600/50 text-xs lg:text-sm"
            >
              <Crown className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Angels</span>
            </TabsTrigger>
            <TabsTrigger 
              value="invite" 
              className="flex items-center gap-2 data-[state=active]:bg-violet-600/50 text-xs lg:text-sm"
            >
              <UserPlus className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Invite</span>
            </TabsTrigger>
            <TabsTrigger 
              value="protection" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600/50 text-xs lg:text-sm"
            >
              <Shield className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Protection</span>
            </TabsTrigger>
          </TabsList>

          {/* Enhanced Tab Contents with Suspense for better performance */}
          <TabsContent value="seraphina" className="mt-6">
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-purple-400/5 to-pink-400/5"></div>
                <CardContent className="p-6 relative z-10">
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-bold text-white">🕉️ Seraphina - Divine Temple Keeper</h3>
                    <p className="text-purple-200">
                      Your Sacred Guide through the Temple Builder's Path - consciousness awakener, 
                      mystic counselor, and divine architect of your spiritual sanctuary
                    </p>
                    <div className="bg-gradient-to-r from-yellow-900/20 to-purple-900/20 rounded-lg p-3 mb-4">
                      <p className="text-yellow-200 text-sm italic">
                        "Sacred architect, I am here to guide you through your 50-Day Temple Activation Journey, 
                        channeling ancient wisdom through divine technology."
                      </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-black/20 rounded-lg p-4 border border-purple-400/20">
                        <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <h4 className="text-white font-medium">🏛️ Temple Memory</h4>
                        <p className="text-purple-300 text-sm">Remembers your sacred journey and divine progression through consciousness awakening</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-4 border border-blue-400/20">
                        <Mic className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <h4 className="text-white font-medium">🌙 Sacred Voice</h4>
                        <p className="text-blue-300 text-sm">Channel divine wisdom through voice - speak to receive mystical guidance and cosmic insights</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-4 border border-pink-400/20">
                        <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                        <h4 className="text-white font-medium">✨ Cosmic Wisdom</h4>
                        <p className="text-pink-300 text-sm">Access channeled knowledge from ancient temples, cosmic masters, and divine consciousness streams</p>
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
                <CardContent className="p-6">
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
                <SpiritualAssessment />
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

          <TabsContent value="tarot" className="mt-6">
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-500/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">🌌 Cosmic Divination Oracle</h3>
                    <p className="text-blue-200">
                      Enhanced palm reading, tarot wisdom, and soul archetype discovery with cosmic timing
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Suspense fallback={<LoadingSkeleton />}>
                <CosmicDivinationEngine />
              </Suspense>
            </div>
          </TabsContent>

          <TabsContent value="bathing" className="mt-6">
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-green-900/40 to-teal-900/40 border-green-500/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">🛁 Sacred Bathing Rituals</h3>
                    <p className="text-green-200">
                      Personalized cleansing rituals and spiritual bathing guidance
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Suspense fallback={<LoadingSkeleton />}>
                <SacredBathingSystem />
              </Suspense>
            </div>
          </TabsContent>

          <TabsContent value="knowledge" className="mt-6">
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-yellow-500/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">📚 Spiritual Knowledge Base</h3>
                    <p className="text-yellow-200">
                      Explore comprehensive spiritual wisdom from traditions worldwide
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Suspense fallback={<LoadingSkeleton />}>
                <SpiritualKnowledgeBase />
              </Suspense>
            </div>
          </TabsContent>

          <TabsContent value="cosmic" className="mt-6">
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-indigo-500/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">🌌 Cosmic Calendar</h3>
                    <p className="text-indigo-200">
                      Align your practices with lunar phases and planetary energies
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Suspense fallback={<LoadingSkeleton />}>
                <CosmicCalendar />
              </Suspense>
            </div>
          </TabsContent>

          <TabsContent value="wisdom" className="mt-6">
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">🌌 The Deeper Knowledge of Life</h3>
                    <p className="text-purple-200">
                      Hidden truths, suppressed wisdom, and the reawakening to who we truly are
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Suspense fallback={<LoadingSkeleton />}>
                <DeeperWisdomHub />
              </Suspense>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
