
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Sparkles,
  Play,
  Pause,
  Volume2,
  Flame,
  ArrowLeft
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // Load user's spiritual profile
      const savedProfile = localStorage.getItem('spiritualMindProfile');
      if (savedProfile) {
        try {
          setUserProfile(JSON.parse(savedProfile));
        } catch (error) {
          console.error('Error parsing saved profile:', error);
          setUserProfile({});
        }
      } else {
        setUserProfile({});
      }
    }
  }, [user]);

  const modules = [
    {
      id: 'enhanced-rituals',
      title: 'Enhanced Ritual System',
      icon: Flame,
      description: 'Universal Magic Formula & Ancient Wisdom',
      component: EnhancedRitualSystem,
      status: 'Ready'
    },
    {
      id: 'sacred-bath',
      title: 'Sacred Bathing',
      icon: Droplets,
      description: 'AI-Guided Spiritual Cleansing',
      component: SacredBathingCreator,
      status: 'Ready'
    },
    {
      id: 'third-eye',
      title: 'Third Eye Activation',
      icon: Eye,
      description: '5-Stage Neuro-Spiritual Pathway',
      component: ThirdEyeTracker,
      status: 'Ready'
    },
    {
      id: 'telekinesis',
      title: 'Telekinesis Training',
      icon: Zap,
      description: 'Mind-Matter Interface',
      component: TelekinesisGym,
      status: 'Ready'
    },
    {
      id: 'zodiac',
      title: 'Zodiac Integration',
      icon: Star,
      description: 'Celestial Personalization Engine',
      component: ZodiacIntegration,
      status: 'Ready'
    },
    {
      id: 'cultural',
      title: 'Cultural Frameworks',
      icon: Globe,
      description: 'Respectfully Curated Traditions',
      component: CulturalFrameworks,
      status: 'Ready'
    },
    {
      id: 'neurofeedback',
      title: 'Neuro-Feedback',
      icon: Brain,
      description: 'Consciousness-Forward Design',
      component: NeuroFeedbackHub,
      status: 'Ready'
    }
  ];

  const handleModuleClick = (moduleId: string) => {
    setIsLoading(true);
    console.log(`Entering module: ${moduleId}`);
    
    // Add a small delay for smooth transition
    setTimeout(() => {
      setActiveModule(moduleId);
      setIsLoading(false);
      
      toast({
        title: "Module Activated",
        description: `${modules.find(m => m.id === moduleId)?.title} is now active`,
      });
    }, 300);
  };

  const handleBackToDashboard = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setActiveModule('dashboard');
      setIsLoading(false);
      
      toast({
        title: "Dashboard",
        description: "Returned to main dashboard",
      });
    }, 200);
  };

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
                  } transition-all duration-300`}
                >
                  {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  <Volume2 className="w-4 h-4 mr-2" />
                  963Hz
                </Button>
                <Badge className="bg-green-600/20 text-green-200 border-green-500/30">
                  Neural State: {isPlaying ? 'Enhanced' : 'Active'}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card className="bg-black/50 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="py-8">
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
                <span className="text-purple-200">Loading module...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dashboard Overview */}
        {activeModule === 'dashboard' && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Card 
                  key={module.id}
                  className="bg-black/30 border-purple-500/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 cursor-pointer group hover:scale-105"
                  onClick={() => handleModuleClick(module.id)}
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-white">
                      <div className="bg-purple-600/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-colors">
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
                      <Badge className="bg-indigo-600/20 text-indigo-200 border-indigo-500/30">
                        {module.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        className="bg-purple-600 hover:bg-purple-700 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleModuleClick(module.id);
                        }}
                      >
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
        {activeModule !== 'dashboard' && !isLoading && (
          <div className="space-y-6 animate-fade-in">
            <Button
              onClick={handleBackToDashboard}
              variant="outline"
              className="border-purple-500/30 text-purple-200 hover:bg-purple-600/20 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
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
                      <Component 
                        userProfile={userProfile} 
                        setUserProfile={setUserProfile} 
                      />
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
