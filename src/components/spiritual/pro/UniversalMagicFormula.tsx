
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Sparkles, 
  Shield, 
  Heart, 
  Zap, 
  Star, 
  Globe, 
  Compass,
  Clock,
  Geometric,
  Volume2,
  Sun,
  Moon,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Users,
  Crown,
  Eye,
  Target,
  Gift
} from 'lucide-react';

interface RitualProgress {
  currentPhase: number;
  phaseProgress: number;
  totalProgress: number;
  isActive: boolean;
  startTime?: Date;
}

interface UniversalMagicFormulaProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
}

const SEVEN_PILLARS = [
  {
    id: 'intention',
    name: 'Sacred Intention (Sankalpa)',
    icon: Target,
    description: 'Establish divine alignment and sacred purpose',
    color: 'from-purple-500 to-violet-600',
    duration: 5
  },
  {
    id: 'elemental',
    name: 'Elemental Harmony',
    icon: Globe,
    description: 'Balance the five elemental forces',
    color: 'from-green-500 to-emerald-600',
    duration: 8
  },
  {
    id: 'mantric',
    name: 'Divine Names & Sacred Sounds',
    icon: Volume2,
    description: 'Activate vibrational resonance',
    color: 'from-blue-500 to-cyan-600',
    duration: 10
  },
  {
    id: 'timing',
    name: 'Celestial Timing',
    icon: Clock,
    description: 'Align with cosmic rhythms',
    color: 'from-yellow-500 to-amber-600',
    duration: 3
  },
  {
    id: 'geometry',
    name: 'Sacred Geometry',
    icon: Geometric,
    description: 'Activate symbolic power',
    color: 'from-indigo-500 to-purple-600',
    duration: 7
  },
  {
    id: 'protection',
    name: 'Protective Boundaries',
    icon: Shield,
    description: 'Establish divine light shield',
    color: 'from-red-500 to-orange-600',
    duration: 6
  },
  {
    id: 'integration',
    name: 'Integration & Embodiment',
    icon: Crown,
    description: 'Anchor and embody divine qualities',
    color: 'from-pink-500 to-rose-600',
    duration: 8
  }
];

const SPECIALIZED_FORMULAS = [
  {
    id: 'protection',
    name: 'Spiritual Protection & Purification',
    icon: Shield,
    purpose: 'Shield against negative influences and purify energy field',
    duration: 15,
    color: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'abundance',
    name: 'Abundance & Prosperity',
    icon: Star,
    purpose: 'Manifest material and spiritual prosperity',
    duration: 20,
    color: 'from-yellow-600 to-amber-700'
  },
  {
    id: 'love',
    name: 'Love & Relationships',
    icon: Heart,
    purpose: 'Attract and maintain harmonious relationships',
    duration: 18,
    color: 'from-pink-600 to-rose-700'
  },
  {
    id: 'healing',
    name: 'Healing & Wellness',
    icon: Zap,
    purpose: 'Promote holistic health and vitality',
    duration: 25,
    color: 'from-green-600 to-emerald-700'
  },
  {
    id: 'success',
    name: 'Success & Achievement',
    icon: Target,
    purpose: 'Achieve goals aligned with divine purpose',
    duration: 22,
    color: 'from-orange-600 to-red-700'
  },
  {
    id: 'wisdom',
    name: 'Wisdom & Spiritual Development',
    icon: Eye,
    purpose: 'Accelerate spiritual growth and enlightenment',
    duration: 30,
    color: 'from-purple-600 to-violet-700'
  }
];

const UNIVERSAL_PROTOCOL_PHASES = [
  { name: 'Preparation & Purification', description: 'Cleanse body, mind, and environment' },
  { name: 'Invocation & Alignment', description: 'Connect with divine forces' },
  { name: 'Intention Crystallization', description: 'Clarify and energize your intention' },
  { name: 'Elemental Integration', description: 'Balance all five elements' },
  { name: 'Sacred Geometry Activation', description: 'Employ geometric power' },
  { name: 'Mantric Empowerment', description: 'Use sacred sound vibrations' },
  { name: 'Energy Projection & Release', description: 'Direct energy toward manifestation' },
  { name: 'Gratitude & Integration', description: 'Close and integrate the work' }
];

export const UniversalMagicFormula: React.FC<UniversalMagicFormulaProps> = ({
  userProfile,
  setUserProfile
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFormula, setSelectedFormula] = useState<string | null>(null);
  const [ritualProgress, setRitualProgress] = useState<RitualProgress>({
    currentPhase: 0,
    phaseProgress: 0,
    totalProgress: 0,
    isActive: false
  });
  const [currentPillar, setCurrentPillar] = useState(0);
  const [customIntention, setCustomIntention] = useState('');
  const { toast } = useToast();

  // Simulated ritual timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (ritualProgress.isActive) {
      interval = setInterval(() => {
        setRitualProgress(prev => {
          const newProgress = prev.phaseProgress + 1;
          const currentPhase = UNIVERSAL_PROTOCOL_PHASES[prev.currentPhase];
          const phaseComplete = newProgress >= 100;
          
          if (phaseComplete && prev.currentPhase < UNIVERSAL_PROTOCOL_PHASES.length - 1) {
            return {
              ...prev,
              currentPhase: prev.currentPhase + 1,
              phaseProgress: 0,
              totalProgress: ((prev.currentPhase + 1) / UNIVERSAL_PROTOCOL_PHASES.length) * 100
            };
          } else if (phaseComplete && prev.currentPhase === UNIVERSAL_PROTOCOL_PHASES.length - 1) {
            // Ritual complete
            toast({
              title: "🌟 Ritual Complete",
              description: "Your Universal Magic Formula has been successfully performed. Divine blessings are now manifesting.",
            });
            return {
              ...prev,
              isActive: false,
              phaseProgress: 100,
              totalProgress: 100
            };
          } else {
            return {
              ...prev,
              phaseProgress: newProgress,
              totalProgress: ((prev.currentPhase / UNIVERSAL_PROTOCOL_PHASES.length) * 100) + (newProgress / UNIVERSAL_PROTOCOL_PHASES.length)
            };
          }
        });
      }, 200); // Faster for demo purposes
    }
    
    return () => clearInterval(interval);
  }, [ritualProgress.isActive, toast]);

  const startRitual = (formulaId?: string) => {
    const formula = formulaId ? SPECIALIZED_FORMULAS.find(f => f.id === formulaId) : null;
    
    setRitualProgress({
      currentPhase: 0,
      phaseProgress: 0,
      totalProgress: 0,
      isActive: true,
      startTime: new Date()
    });
    
    toast({
      title: "🕯️ Ritual Initiated",
      description: formula 
        ? `Beginning ${formula.name} Formula` 
        : "Beginning Universal Manifestation Protocol",
    });
  };

  const pauseRitual = () => {
    setRitualProgress(prev => ({ ...prev, isActive: false }));
    toast({
      title: "⏸️ Ritual Paused",
      description: "Take your time. Resume when you're ready to continue.",
    });
  };

  const resumeRitual = () => {
    setRitualProgress(prev => ({ ...prev, isActive: true }));
    toast({
      title: "▶️ Ritual Resumed",
      description: "Continuing your sacred practice with divine guidance.",
    });
  };

  const resetRitual = () => {
    setRitualProgress({
      currentPhase: 0,
      phaseProgress: 0,
      totalProgress: 0,
      isActive: false
    });
    toast({
      title: "🔄 Ritual Reset",
      description: "Ready to begin anew with fresh intention and energy.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-violet-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3 text-2xl">
            <div className="bg-gradient-to-r from-purple-400 to-violet-400 rounded-full p-2">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold">Universal Magic Formula</div>
              <div className="text-sm opacity-90">Enhanced Synthesis of Ancient Wisdom</div>
            </div>
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge className="bg-purple-600/20 text-purple-200">108 Sacred Formulas</Badge>
            <Badge className="bg-indigo-600/20 text-indigo-200">Picatrix Wisdom</Badge>
            <Badge className="bg-violet-600/20 text-violet-200">Key of Solomon</Badge>
            <Badge className="bg-blue-600/20 text-blue-200">Egyptian Heka</Badge>
            <Badge className="bg-pink-600/20 text-pink-200">Vedic Mantras</Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-black/30">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
          <TabsTrigger value="pillars" className="data-[state=active]:bg-purple-600">Seven Pillars</TabsTrigger>
          <TabsTrigger value="protocol" className="data-[state=active]:bg-purple-600">Universal Protocol</TabsTrigger>
          <TabsTrigger value="formulas" className="data-[state=active]:bg-purple-600">Specialized Formulas</TabsTrigger>
          <TabsTrigger value="practice" className="data-[state=active]:bg-purple-600">Live Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-black/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-200">Enhanced Universal Magic Formula</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-purple-100 leading-relaxed">
                A revolutionary synthesis of the world's most powerful ancient magical traditions, 
                carefully adapted for contemporary spiritual practitioners. This enhanced formula 
                transcends individual traditions by weaving together their most potent elements 
                into a unified system that honors universal spiritual principles.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-purple-500/30">
                  <CardContent className="p-4">
                    <h4 className="text-purple-200 font-semibold mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Ancient Sources
                    </h4>
                    <ul className="text-purple-100 text-sm space-y-1">
                      <li>• 108 Sacred Formulas</li>
                      <li>• Celestial Magic of Picatrix</li>
                      <li>• Divine Authority of Key of Solomon</li>
                      <li>• Creative Force of Egyptian Heka</li>
                      <li>• Protective Power of Vedic Mantras</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-800/30 to-violet-800/30 border-indigo-500/30">
                  <CardContent className="p-4">
                    <h4 className="text-indigo-200 font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Core Principles
                    </h4>
                    <ul className="text-indigo-100 text-sm space-y-1">
                      <li>• Sacred Intention Alignment</li>
                      <li>• Natural Law Harmonization</li>
                      <li>• Universal Correspondence</li>
                      <li>• Vibrational Resonance</li>
                      <li>• Ethical Divine Service</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border border-amber-500/30 rounded-lg">
                <h4 className="text-amber-200 font-semibold mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Foundation Understanding
                </h4>
                <p className="text-amber-100 text-sm">
                  Magic is not supernatural manipulation, but conscious alignment with the natural 
                  forces that govern creation. By harmonizing with universal principles of 
                  correspondence, vibration, and intention, practitioners achieve extraordinary 
                  results while maintaining perfect ethical alignment with the highest good.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pillars" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEVEN_PILLARS.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Card 
                  key={pillar.id}
                  className={`bg-gradient-to-br ${pillar.color}/20 border-purple-500/30 hover:border-purple-400/50 transition-colors cursor-pointer`}
                  onClick={() => setCurrentPillar(index)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-lg">
                      <div className={`bg-gradient-to-r ${pillar.color} rounded-full p-2`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-base font-semibold">{pillar.name}</div>
                        <div className="text-xs opacity-80">{pillar.duration} minutes</div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-100 text-sm">{pillar.description}</p>
                    {currentPillar === index && (
                      <div className="mt-4 p-3 bg-black/20 rounded-lg">
                        <h5 className="text-purple-200 font-medium mb-2">Practice Focus:</h5>
                        <div className="text-purple-100 text-sm space-y-1">
                          {pillar.id === 'intention' && (
                            <>
                              <p>• Establish Sacred Intention (Sankalpa)</p>
                              <p>• Align personal will with cosmic will</p>
                              <p>• Activate divine Ba essence</p>
                              <p>• Feel-based intention crystallization</p>
                            </>
                          )}
                          {pillar.id === 'elemental' && (
                            <>
                              <p>• Balance five elements (Panchamahabhuta)</p>
                              <p>• Earth: Stability and manifestation</p>
                              <p>• Water: Emotion and intuition</p>
                              <p>• Fire: Will and transformation</p>
                              <p>• Air: Intellect and communication</p>
                              <p>• Space: Spiritual transcendence</p>
                            </>
                          )}
                          {pillar.id === 'mantric' && (
                            <>
                              <p>• Universal Divine Name Activation</p>
                              <p>• Vibrational resonance principles</p>
                              <p>• Seed sounds and expansion phrases</p>
                              <p>• Integration mantras</p>
                            </>
                          )}
                          {pillar.id === 'timing' && (
                            <>
                              <p>• Optimal celestial conditions</p>
                              <p>• Lunar phase alignment</p>
                              <p>• Planetary hour calculations</p>
                              <p>• Seasonal energy harmonization</p>
                            </>
                          )}
                          {pillar.id === 'geometry' && (
                            <>
                              <p>• Sacred geometric activation</p>
                              <p>• Universal pattern resonance</p>
                              <p>• Circle, triangle, square, pentagram</p>
                              <p>• Symbolic power conductance</p>
                            </>
                          )}
                          {pillar.id === 'protection' && (
                            <>
                              <p>• Divine Light Shield creation</p>
                              <p>• Sacred space establishment</p>
                              <p>• Positive energy filtration</p>
                              <p>• Transformative protection protocols</p>
                            </>
                          )}
                          {pillar.id === 'integration' && (
                            <>
                              <p>• Permanent spiritual development</p>
                              <p>• Divine quality embodiment</p>
                              <p>• Gratitude and grounding</p>
                              <p>• Daily life integration</p>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="protocol" className="space-y-6">
          <Card className="bg-black/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-200 flex items-center gap-2">
                <Compass className="w-5 h-5" />
                Universal Manifestation Protocol
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-100 mb-6">
                The systematic application of the Seven Pillars in an 8-phase protocol 
                that can be adapted for any positive intention or goal.
              </p>
              
              <div className="space-y-4">
                {UNIVERSAL_PROTOCOL_PHASES.map((phase, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border transition-all ${
                      ritualProgress.currentPhase === index && ritualProgress.isActive
                        ? 'bg-purple-600/20 border-purple-400/50 shadow-lg'
                        : 'bg-black/20 border-purple-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          ritualProgress.currentPhase > index 
                            ? 'bg-green-600 text-white' 
                            : ritualProgress.currentPhase === index && ritualProgress.isActive
                            ? 'bg-purple-600 text-white animate-pulse'
                            : 'bg-gray-600 text-gray-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="text-purple-200 font-medium">{phase.name}</h4>
                          <p className="text-purple-300 text-sm">{phase.description}</p>
                        </div>
                      </div>
                      {ritualProgress.currentPhase === index && ritualProgress.isActive && (
                        <div className="w-16">
                          <Progress 
                            value={ritualProgress.phaseProgress} 
                            className="h-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {ritualProgress.totalProgress > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-200 font-medium">Overall Progress</span>
                    <span className="text-purple-100">{Math.round(ritualProgress.totalProgress)}%</span>
                  </div>
                  <Progress value={ritualProgress.totalProgress} className="h-3" />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formulas" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SPECIALIZED_FORMULAS.map((formula) => {
              const Icon = formula.icon;
              return (
                <Card 
                  key={formula.id}
                  className={`bg-gradient-to-br ${formula.color}/20 border-purple-500/30 hover:border-purple-400/50 transition-colors cursor-pointer`}
                  onClick={() => setSelectedFormula(formula.id)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <div className={`bg-gradient-to-r ${formula.color} rounded-full p-2`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{formula.name}</div>
                        <div className="text-sm opacity-80">{formula.duration} minutes</div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-100 text-sm mb-4">{formula.purpose}</p>
                    
                    <div className="space-y-2">
                      <Button
                        onClick={() => startRitual(formula.id)}
                        className={`w-full bg-gradient-to-r ${formula.color} hover:opacity-90`}
                        disabled={ritualProgress.isActive}
                      >
                        Begin {formula.name}
                      </Button>
                      
                      {selectedFormula === formula.id && (
                        <div className="mt-4 p-3 bg-black/20 rounded-lg">
                          <h5 className="text-purple-200 font-medium mb-2">Formula Details:</h5>
                          <div className="text-purple-100 text-sm space-y-1">
                            {formula.id === 'protection' && (
                              <>
                                <p>• Divine Light Shield establishment</p>
                                <p>• Purification sequence with sacred breath</p>
                                <p>• Four-directional protection anchoring</p>
                                <p>• Daily maintenance practices</p>
                              </>
                            )}
                            {formula.id === 'abundance' && (
                              <>
                                <p>• Abundance consciousness activation</p>
                                <p>• Prosperity visualization with golden light</p>
                                <p>• Gratitude multiplication practice</p>
                                <p>• Generous action commitment</p>
                              </>
                            )}
                            {formula.id === 'love' && (
                              <>
                                <p>• Heart chakra activation and purification</p>
                                <p>• Self-love foundation establishment</p>
                                <p>• Divine love invocation</p>
                                <p>• Universal relationship blessing</p>
                              </>
                            )}
                            {formula.id === 'healing' && (
                              <>
                                <p>• Divine healing light activation</p>
                                <p>• Cellular regeneration visualization</p>
                                <p>• Emotional healing release</p>
                                <p>• Wellness lifestyle commitment</p>
                              </>
                            )}
                            {formula.id === 'success' && (
                              <>
                                <p>• Divine purpose alignment</p>
                                <p>• Success consciousness activation</p>
                                <p>• Goal crystallization process</p>
                                <p>• Inspired action practice</p>
                              </>
                            )}
                            {formula.id === 'wisdom' && (
                              <>
                                <p>• Wisdom invocation from highest sources</p>
                                <p>• Intuition development practice</p>
                                <p>• Knowledge integration process</p>
                                <p>• Service commitment dedication</p>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card className="bg-black/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-200 flex items-center gap-2">
                <Play className="w-5 h-5" />
                Live Ritual Practice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-purple-200 font-medium block mb-2">
                    Sacred Intention (Optional - for Universal Protocol)
                  </label>
                  <textarea
                    value={customIntention}
                    onChange={(e) => setCustomIntention(e.target.value)}
                    placeholder="Enter your sacred intention for this ritual... (e.g., 'By divine grace, I manifest perfect health and vitality for the highest good of all beings')"
                    className="w-full p-3 bg-black/30 border border-purple-500/30 rounded-lg text-purple-100 placeholder-purple-400/70 resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => startRitual()}
                    disabled={ritualProgress.isActive}
                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Begin Universal Protocol
                  </Button>
                  
                  {ritualProgress.isActive ? (
                    <Button
                      onClick={pauseRitual}
                      variant="outline"
                      className="border-orange-500/50 text-orange-200"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                  ) : ritualProgress.totalProgress > 0 && (
                    <Button
                      onClick={resumeRitual}
                      variant="outline"
                      className="border-green-500/50 text-green-200"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                  )}
                  
                  {ritualProgress.totalProgress > 0 && (
                    <Button
                      onClick={resetRitual}
                      variant="outline"
                      className="border-purple-500/50 text-purple-200"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  )}
                </div>
              </div>

              {ritualProgress.isActive && (
                <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold text-purple-200">
                        Phase {ritualProgress.currentPhase + 1}: {UNIVERSAL_PROTOCOL_PHASES[ritualProgress.currentPhase]?.name}
                      </h3>
                      <p className="text-purple-300">
                        {UNIVERSAL_PROTOCOL_PHASES[ritualProgress.currentPhase]?.description}
                      </p>
                      
                      <div className="space-y-2">
                        <Progress 
                          value={ritualProgress.phaseProgress} 
                          className="h-3"
                        />
                        <p className="text-purple-200 text-sm">
                          Phase Progress: {Math.round(ritualProgress.phaseProgress)}%
                        </p>
                      </div>

                      <div className="mt-6 p-4 bg-black/20 rounded-lg">
                        <h4 className="text-purple-200 font-medium mb-2">Guidance:</h4>
                        <div className="text-purple-100 text-sm text-left space-y-2">
                          {ritualProgress.currentPhase === 0 && (
                            <>
                              <p>• Take three deep cleansing breaths</p>
                              <p>• Visualize white light purifying your entire being</p>
                              <p>• Set your sacred space with intention</p>
                              <p>• Recite: "Divine Light flows through me, cleansing and purifying..."</p>
                            </>
                          )}
                          {ritualProgress.currentPhase === 1 && (
                            <>
                              <p>• Sit comfortably with spine erect</p>
                              <p>• Place hands in receptive mudra</p>
                              <p>• Invoke: "I call upon infinite wisdom, love, and power..."</p>
                              <p>• Feel the divine presence surrounding you</p>
                            </>
                          )}
                          {ritualProgress.currentPhase === 2 && (
                            <>
                              <p>• Clarify what you truly wish to manifest</p>
                              <p>• Ask: How will this serve my spiritual growth?</p>
                              <p>• Formulate with: "By divine grace, I manifest..."</p>
                              <p>• Energize with intentional breathing</p>
                            </>
                          )}
                          {ritualProgress.currentPhase === 3 && (
                            <>
                              <p>• Connect with Earth: stability and manifestation</p>
                              <p>• Connect with Water: emotion and intuition</p>
                              <p>• Connect with Fire: will and transformation</p>
                              <p>• Connect with Air: intellect and communication</p>
                              <p>• Connect with Space: spiritual transcendence</p>
                            </>
                          )}
                          {ritualProgress.currentPhase === 4 && (
                            <>
                              <p>• Visualize sacred circle of white light around you</p>
                              <p>• See golden triangle with your intention at center</p>
                              <p>• Ground with stability square beneath</p>
                              <p>• Encompass all with integration pentagram</p>
                            </>
                          )}
                          {ritualProgress.currentPhase === 5 && (
                            <>
                              <p>• Chant: "AUM GANESHA NAMAHA" (removing obstacles)</p>
                              <p>• Chant: "AUM SARASWATI NAMAHA" (divine wisdom)</p>
                              <p>• Chant: "AUM LAKSHMI NAMAHA" (divine abundance)</p>
                              <p>• Feel each mantra activating its divine energy</p>
                            </>
                          )}
                          {ritualProgress.currentPhase === 6 && (
                            <>
                              <p>• Gather energy from earth, sky, and heart</p>
                              <p>• Project intention as beam of light into universe</p>
                              <p>• Affirm: "I release this to divine wisdom and timing"</p>
                              <p>• Trust in the manifestation process</p>
                            </>
                          )}
                          {ritualProgress.currentPhase === 7 && (
                            <>
                              <p>• Express gratitude to all spiritual forces</p>
                              <p>• Ground the energy into your cellular structure</p>
                              <p>• Affirm: "This work is complete and perfect"</p>
                              <p>• Close with: "So it is, and so it shall be"</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {ritualProgress.totalProgress === 100 && !ritualProgress.isActive && (
                <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-green-200 mb-4">
                      🌟 Ritual Complete - Divine Blessings Activated 🌟
                    </h3>
                    <p className="text-green-100 mb-4">
                      Your Universal Magic Formula has been successfully performed. 
                      The seeds of manifestation have been planted in divine soil.
                    </p>
                    <div className="text-green-200 text-sm space-y-2">
                      <p>• Trust in divine timing and wisdom</p>
                      <p>• Watch for synchronicities and signs</p>
                      <p>• Maintain gratitude and positive expectation</p>
                      <p>• Take inspired action when guided</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
