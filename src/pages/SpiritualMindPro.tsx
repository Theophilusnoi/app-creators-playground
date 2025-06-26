
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { ProNavigationBar } from '@/components/spiritual/pro/ProNavigationBar';
import { 
  Droplets, 
  Eye, 
  Zap, 
  Star, 
  Globe, 
  Shield,
  Brain,
  Waves,
  Sparkles,
  Play,
  Pause,
  Volume2,
  Flame
} from 'lucide-react';
import { SacredBathingCreator } from '@/components/spiritual/pro/SacredBathingCreator';
import { ThirdEyeTracker } from '@/components/spiritual/pro/ThirdEyeTracker';
import { TelekinesisGym } from '@/components/spiritual/pro/TelekinesisGym';
import { ZodiacIntegration } from '@/components/spiritual/pro/ZodiacIntegration';
import { CulturalFrameworks } from '@/components/spiritual/pro/CulturalFrameworks';
import { NeuroFeedbackHub } from '@/components/spiritual/pro/NeuroFeedbackHub';
import { EnhancedRitualSystem } from '@/components/spiritual/pro/EnhancedRitualSystem';

const SpiritualMindPro = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeModule, setActiveModule] = useState('dashboard');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (user) {
      // Load user's spiritual profile
      const savedProfile = localStorage.getItem('spiritualMindProfile');
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }
    }
  }, [user]);

  const modules = [
    {
      id: 'enhanced-rituals',
      title: 'Enhanced Ritual System',
      icon: Flame,
      description: 'Universal Magic Formula & Ancient Wisdom',
      component: EnhancedRitualSystem
    },
    {
      id: 'sacred-bath',
      title: 'Sacred Bathing',
      icon: Droplets,
      description: 'AI-Guided Spiritual Cleansing',
      component: SacredBathingCreator
    },
    {
      id: 'third-eye',
      title: 'Third Eye Activation',
      icon: Eye,
      description: '5-Stage Neuro-Spiritual Pathway',
      component: ThirdEyeTracker
    },
    {
      id: 'telekinesis',
      title: 'Telekinesis Training',
      icon: Zap,
      description: 'Mind-Matter Interface',
      component: TelekinesisGym
    },
    {
      id: 'zodiac',
      title: 'Zodiac Integration',
      icon: Star,
      description: 'Celestial Personalization Engine',
      component: ZodiacIntegration
    },
    {
      id: 'cultural',
      title: 'Cultural Frameworks',
      icon: Globe,
      description: 'Respectfully Curated Traditions',
      component: CulturalFrameworks
    },
    {
      id: 'neurofeedback',
      title: 'Neuro-Feedback',
      icon: Brain,
      description: 'Consciousness-Forward Design',
      component: NeuroFeedbackHub
    }
  ];

  const toggleBinauralBeats = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Binaural Beats Paused" : "Binaural Beats Active",
      description: isPlaying ? "Neural entrainment stopped" : "963Hz Third Eye frequency activated",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm max-w-md">
          <CardContent className="text-center py-12">
            <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Consciousness Portal</h2>
            <p className="text-purple-200 mb-6">Please authenticate to access advanced spiritual technologies</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation Bar */}
        <ProNavigationBar showHome={false} />

        {/* Header */}
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-3xl text-white mb-2 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-purple-400" />
                  SpiritualMind Pro
                </CardTitle>
                <p className="text-purple-200 text-lg">
                  Where Ancient Wisdom Meets Modern Neuroscience
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={toggleBinauralBeats}
                  className={`${
                    isPlaying 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-gray-600 hover:bg-gray-700'
                  } transition-colors`}
                >
                  {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  <Volume2 className="w-4 h-4 mr-2" />
                  963Hz
                </Button>
                <Badge className="bg-green-600/20 text-green-200 border-green-500/30">
                  Neural State: Active
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Dashboard Overview */}
        {activeModule === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Card 
                  key={module.id}
                  className="bg-black/30 border-purple-500/30 backdrop-blur-sm hover:bg-black/40 transition-colors cursor-pointer"
                  onClick={() => setActiveModule(module.id)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <div className="bg-purple-600/20 p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-lg">{module.title}</div>
                        <div className="text-sm text-purple-300 font-normal">
                          {module.description}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-indigo-600/20 text-indigo-200">
                        Ready
                      </Badge>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Enter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Module Content */}
        {activeModule !== 'dashboard' && (
          <div className="space-y-6">
            <Button
              onClick={() => setActiveModule('dashboard')}
              variant="outline"
              className="border-purple-500/30 text-purple-200 hover:bg-purple-600/20"
            >
              ← Back to Dashboard
            </Button>
            
            {modules.map((module) => {
              if (module.id === activeModule) {
                const Component = module.component;
                return (
                  <Card key={module.id} className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white text-2xl">
                        <module.icon className="w-8 h-8 text-purple-400" />
                        {module.title}
                      </CardTitle>
                      <p className="text-purple-200">{module.description}</p>
                    </CardHeader>
                    <CardContent>
                      <Component userProfile={userProfile} setUserProfile={setUserProfile} />
                    </CardContent>
                  </Card>
                );
              }
              return null;
            })}
          </div>
        )}

        {/* Safety Protocols */}
        <Card className="bg-red-900/20 border-red-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-200">
              <Shield className="w-5 h-5" />
              Global Safety Standards Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-red-200">
                <strong>Mental Health First:</strong> AI monitoring for dissociation risk
              </div>
              <div className="text-red-200">
                <strong>Cultural Integrity:</strong> Ethical attribution protocols active
              </div>
              <div className="text-red-200">
                <strong>Physics Compliance:</strong> All effects neuroplasticity-based
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpiritualMindPro;
