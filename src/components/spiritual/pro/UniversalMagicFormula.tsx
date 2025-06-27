
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Heart, 
  Triangle, 
  Circle, 
  Droplets, 
  Clock, 
  Shield, 
  Sparkles,
  Star,
  Flame,
  Wind,
  Mountain,
  Waves
} from 'lucide-react';

interface UniversalMagicFormulaProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
}

const SEVEN_PILLARS = [
  {
    id: 'intention',
    name: 'Sacred Intention (Sankalpa)',
    description: 'Establishing divine will alignment',
    icon: Heart,
    color: 'from-pink-600 to-rose-600',
    practices: [
      'Clear intention setting meditation',
      'Heart-centered alignment breathing',
      'Divine will invocation',
      'Purpose clarification ritual'
    ]
  },
  {
    id: 'harmony',
    name: 'Elemental Harmony',
    description: 'Balancing the five elements',
    icon: Triangle,
    color: 'from-green-600 to-emerald-600',
    practices: [
      'Earth grounding exercises',
      'Water flow meditation',
      'Fire energy activation',
      'Air breathing techniques',
      'Space consciousness expansion'
    ]
  },
  {
    id: 'divine-names',
    name: 'Divine Names & Sacred Sounds',
    description: 'Mantric activation of divine forces',
    icon: Sparkles,
    color: 'from-purple-600 to-violet-600',
    practices: [
      'OM chanting (108 repetitions)',
      'Divine name repetition',
      'Sacred sound vibrations',
      'Mantra meditation'
    ]
  },
  {
    id: 'timing',
    name: 'Celestial Timing',
    description: 'Cosmic alignment and muhurta',
    icon: Clock,
    color: 'from-blue-600 to-indigo-600',
    practices: [
      'Lunar phase alignment',
      'Planetary hour selection',
      'Seasonal ceremony timing',
      'Personal biorhythm sync'
    ]
  },
  {
    id: 'geometry',
    name: 'Sacred Geometry',
    description: 'Symbolic activation and yantra',
    icon: Triangle,
    color: 'from-yellow-600 to-orange-600',
    practices: [
      'Yantra construction',
      'Mandala meditation',
      'Sacred symbol visualization',
      'Geometric pattern alignment'
    ]
  },
  {
    id: 'boundaries',
    name: 'Protective Boundaries',
    description: 'Energetic shielding and kavach',
    icon: Shield,
    color: 'from-red-600 to-pink-600',
    practices: [
      'Energetic shielding visualization',
      'Protective circle casting',
      'Divine armor invocation',
      'Boundary reinforcement'
    ]
  }
];

const SPECIALIZED_FORMULAS = [
  {
    name: 'Healing & Recovery',
    elements: ['Water', 'Earth', 'Divine Light'],
    timing: 'Waxing Moon, Morning Hours',
    duration: '21 minutes'
  },
  {
    name: 'Abundance & Prosperity',
    elements: ['Fire', 'Earth', 'Jupiter Energy'],
    timing: 'New Moon, Thursday',
    duration: '45 minutes'
  },
  {
    name: 'Protection & Clearing',
    elements: ['Fire', 'Air', 'Mars Energy'],
    timing: 'Full Moon, Tuesday',
    duration: '30 minutes'
  },
  {
    name: 'Love & Relationships',
    elements: ['Water', 'Air', 'Venus Energy'],
    timing: 'Friday, Venus Hour',
    duration: '35 minutes'
  }
];

export const UniversalMagicFormula: React.FC<UniversalMagicFormulaProps> = ({
  userProfile,
  setUserProfile
}) => {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<'overview' | 'seven-pillars' | 'protocol' | 'specialized' | 'live-practice'>('overview');
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [intention, setIntention] = useState('');
  const [isProtocolActive, setIsProtocolActive] = useState(false);
  const [practiceTimer, setPracticeTimer] = useState(0);

  const handleActivatePillar = (pillarId: string) => {
    setSelectedPillar(pillarId);
    const pillar = SEVEN_PILLARS.find(p => p.id === pillarId);
    
    toast({
      title: `${pillar?.name} Activated`,
      description: "Sacred energy alignment in progress",
    });
  };

  const handleStartProtocol = () => {
    if (!intention.trim()) {
      toast({
        title: "Set Your Intention",
        description: "Please enter your sacred intention before beginning",
        variant: "destructive"
      });
      return;
    }

    setIsProtocolActive(true);
    setPracticeTimer(21 * 60); // 21 minutes in seconds
    
    // Save to user profile
    const updatedProfile = {
      ...userProfile,
      activeRitual: {
        type: 'Universal Magic Formula',
        intention,
        startTime: new Date().toISOString(),
        duration: 21
      }
    };
    setUserProfile(updatedProfile);
    localStorage.setItem('spiritualMindProfile', JSON.stringify(updatedProfile));
    
    toast({
      title: "Universal Protocol Activated",
      description: "Sacred transformation sequence initiated",
    });
  };

  const handleLivePractice = () => {
    setActiveView('live-practice');
    toast({
      title: "Live Practice Mode",
      description: "Real-time guidance activated",
    });
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'overview', label: 'Overview', icon: Star },
          { id: 'seven-pillars', label: 'Seven Pillars', icon: Triangle },
          { id: 'protocol', label: 'Protocol', icon: Circle },
          { id: 'specialized', label: 'Specialized Formulas', icon: Droplets },
          { id: 'live-practice', label: 'Live Practice', icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              variant={activeView === tab.id ? 'default' : 'outline'}
              className={`${
                activeView === tab.id 
                  ? 'bg-purple-600 text-white' 
                  : 'border-purple-500/50 text-purple-200 hover:bg-purple-600/20'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Overview */}
      {activeView === 'overview' && (
        <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-200 flex items-center gap-2">
              <Star className="w-6 h-6" />
              Universal Magic Formula Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-purple-100">
              <p className="mb-4">
                The Universal Magic Formula is a comprehensive system that integrates ancient wisdom 
                with modern understanding of consciousness and energy work.
              </p>
              <p className="mb-4">
                This formula works through seven foundational pillars that create a complete 
                framework for spiritual practice and manifestation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SEVEN_PILLARS.slice(0, 4).map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.id} className={`p-4 rounded-lg bg-gradient-to-r ${pillar.color}/20 border border-purple-500/30`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-purple-300" />
                      <h4 className="text-purple-200 font-medium">{pillar.name}</h4>
                    </div>
                    <p className="text-purple-300 text-sm">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="flex gap-4">
              <Button
                onClick={() => setActiveView('seven-pillars')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Explore Seven Pillars
              </Button>
              <Button
                onClick={() => setActiveView('protocol')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Start Protocol
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seven Pillars */}
      {activeView === 'seven-pillars' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEVEN_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const isActive = selectedPillar === pillar.id;
              
              return (
                <Card 
                  key={pillar.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-purple-600/30 to-indigo-600/30 border-purple-400/50 scale-105' 
                      : 'bg-black/20 border-purple-500/30 hover:bg-purple-900/20'
                  }`}
                  onClick={() => handleActivatePillar(pillar.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${pillar.color}/30`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">{pillar.name}</h4>
                        <p className="text-purple-300 text-xs">{pillar.description}</p>
                      </div>
                    </div>
                    
                    {isActive && (
                      <div className="space-y-2 animate-fade-in">
                        <h5 className="text-purple-200 text-sm font-medium">Practices:</h5>
                        {pillar.practices.map((practice, index) => (
                          <div key={index} className="text-purple-300 text-xs">
                            • {practice}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Protocol */}
      {activeView === 'protocol' && (
        <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-200 flex items-center gap-2">
              <Circle className="w-6 h-6" />
              Sacred Protocol Activation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-indigo-200 font-medium mb-2">
                  Set Your Sacred Intention
                </label>
                <Textarea
                  value={intention}
                  onChange={(e) => setIntention(e.target.value)}
                  placeholder="What spiritual transformation are you seeking? (e.g., emotional healing, protection, abundance, love attraction)"
                  className="bg-black/20 border-indigo-400/30 text-white placeholder:text-indigo-300/70 min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-indigo-800/20 p-4 rounded-lg border border-indigo-600/30">
                  <h4 className="text-indigo-200 font-medium mb-2">Duration</h4>
                  <p className="text-indigo-100 text-sm">21 minutes (sacred number)</p>
                </div>
                <div className="bg-indigo-800/20 p-4 rounded-lg border border-indigo-600/30">
                  <h4 className="text-indigo-200 font-medium mb-2">Timing</h4>
                  <p className="text-indigo-100 text-sm">Optimal current moment</p>
                </div>
                <div className="bg-indigo-800/20 p-4 rounded-lg border border-indigo-600/30">
                  <h4 className="text-indigo-200 font-medium mb-2">State</h4>
                  <Badge className={`${isProtocolActive ? 'bg-green-600/20 text-green-200' : 'bg-gray-600/20 text-gray-300'}`}>
                    {isProtocolActive ? 'Active' : 'Ready'}
                  </Badge>
                </div>
              </div>
              
              <Button
                onClick={handleStartProtocol}
                disabled={isProtocolActive}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg py-3"
              >
                {isProtocolActive ? 'Protocol Active...' : 'Activate Sacred Protocol'}
              </Button>
              
              {isProtocolActive && (
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30 animate-pulse-glow">
                  <h4 className="text-green-200 font-medium mb-2">Protocol Active</h4>
                  <p className="text-green-100 text-sm">
                    Sacred transformation sequence is running. Stay present and allow the energy to flow.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Specialized Formulas */}
      {activeView === 'specialized' && (
        <div className="space-y-4">
          {SPECIALIZED_FORMULAS.map((formula, index) => (
            <Card key={index} className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border-purple-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-purple-200 font-semibold">{formula.name}</h4>
                  <Badge className="bg-purple-600/20 text-purple-200">{formula.duration}</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-purple-300">Elements: </span>
                    <span className="text-purple-100">{formula.elements.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-purple-300">Timing: </span>
                    <span className="text-purple-100">{formula.timing}</span>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => {
                        toast({
                          title: `${formula.name} Formula`,
                          description: "Specialized protocol activated",
                        });
                      }}
                    >
                      Activate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Live Practice */}
      {activeView === 'live-practice' && (
        <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-200 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Live Practice Session
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-8">
              <div className="animate-pulse-glow w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-green-200 mb-2">Live Guidance Active</h3>
              <p className="text-green-300 mb-6">
                Real-time spiritual practice guidance with AI-enhanced sacred wisdom
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <Button
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  onClick={() => {
                    toast({
                      title: "Voice Guidance Activated",
                      description: "Sacred voice instructions now active",
                    });
                  }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Voice Guidance
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => {
                    toast({
                      title: "Energy Tracking Active",
                      description: "Monitoring your energetic state",
                    });
                  }}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Energy Tracking
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
