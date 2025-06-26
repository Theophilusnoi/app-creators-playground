import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Sparkles, 
  Circle, 
  Triangle, 
  Square, 
  Shapes, 
  Eye,
  Clock,
  Star,
  Shield,
  Heart,
  Zap,
  Brain,
  Flame,
  Moon,
  Sun
} from 'lucide-react';

interface UniversalMagicFormulaProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
}

const SEVEN_PILLARS = [
  {
    id: 'sacred-intention',
    name: 'Sacred Intention (Sankalpa)',
    icon: Heart,
    description: 'Establishing divine will alignment',
    practices: ['Intention Clarification', 'Divine Alignment', 'Purpose Setting'],
    mastery: 0
  },
  {
    id: 'elemental-harmony',
    name: 'Elemental Harmony',
    icon: Shapes,
    description: 'Balancing the five elements',
    practices: ['Earth Grounding', 'Water Flow', 'Fire Ignition', 'Air Clarity', 'Space Expansion'],
    mastery: 0
  },
  {
    id: 'divine-names',
    name: 'Divine Names & Sacred Sounds',
    icon: Sparkles,
    description: 'Mantric activation of divine forces',
    practices: ['Universal Mantras', 'Divine Name Invocation', 'Sound Healing'],
    mastery: 0
  },
  {
    id: 'celestial-timing',
    name: 'Celestial Timing',
    icon: Moon,
    description: 'Cosmic alignment and muhurta',
    practices: ['Lunar Phases', 'Planetary Hours', 'Seasonal Energies'],
    mastery: 0
  },
  {
    id: 'sacred-geometry',
    name: 'Sacred Geometry',
    icon: Triangle,
    description: 'Symbolic activation and yantra',
    practices: ['Circle Creation', 'Triangle Power', 'Pentagram Activation'],
    mastery: 0
  },
  {
    id: 'protective-boundaries',
    name: 'Protective Boundaries',
    icon: Shield,
    description: 'Energetic shielding and kavach',
    practices: ['Divine Light Shield', 'Sacred Space', 'Energy Clearing'],
    mastery: 0
  },
  {
    id: 'integration',
    name: 'Integration & Embodiment',
    icon: Brain,
    description: 'Dharana and manifestation',
    practices: ['Gratitude Grounding', 'Embodiment Work', 'Daily Integration'],
    mastery: 0
  }
];

const MANIFESTATION_PROTOCOL = [
  { phase: 1, name: 'Preparation & Purification', duration: '10 min', completed: false },
  { phase: 2, name: 'Invocation & Alignment', duration: '15 min', completed: false },
  { phase: 3, name: 'Intention Crystallization', duration: '10 min', completed: false },
  { phase: 4, name: 'Elemental Integration', duration: '20 min', completed: false },
  { phase: 5, name: 'Sacred Geometry Activation', duration: '15 min', completed: false },
  { phase: 6, name: 'Mantric Empowerment', duration: '10 min', completed: false },
  { phase: 7, name: 'Energy Projection & Release', duration: '15 min', completed: false },
  { phase: 8, name: 'Gratitude & Integration', duration: '10 min', completed: false }
];

const SPECIALIZED_FORMULAS = [
  {
    id: 'protection',
    name: 'Spiritual Protection & Purification',
    icon: Shield,
    description: 'Divine light shield and negative energy clearing',
    elements: ['Divine Light Shield', 'Purification Sequence', 'Protection Anchoring']
  },
  {
    id: 'abundance',
    name: 'Abundance & Prosperity',
    icon: Star,
    description: 'Material and spiritual prosperity manifestation',
    elements: ['Abundance Consciousness', 'Prosperity Visualization', 'Gratitude Multiplication']
  },
  {
    id: 'love',
    name: 'Love & Relationships',
    icon: Heart,
    description: 'Harmonious relationships and divine love',
    elements: ['Heart Chakra Activation', 'Self-Love Foundation', 'Divine Love Invocation']
  },
  {
    id: 'healing',
    name: 'Healing & Wellness',
    icon: Zap,
    description: 'Physical, emotional, and spiritual healing',
    elements: ['Divine Healing Light', 'Cellular Regeneration', 'Emotional Release']
  },
  {
    id: 'success',
    name: 'Success & Achievement',
    icon: Sun,
    description: 'Goal achievement aligned with divine purpose',
    elements: ['Divine Purpose Alignment', 'Success Consciousness', 'Inspired Action']
  },
  {
    id: 'wisdom',
    name: 'Wisdom & Spiritual Development',
    icon: Eye,
    description: 'Accelerated spiritual growth and enlightenment',
    elements: ['Wisdom Invocation', 'Intuition Development', 'Service Commitment']
  }
];

export const UniversalMagicFormula: React.FC<UniversalMagicFormulaProps> = ({
  userProfile,
  setUserProfile
}) => {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<'overview' | 'pillars' | 'protocol' | 'formulas' | 'practice'>('overview');
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [protocolProgress, setProtocolProgress] = useState(0);
  const [isProtocolActive, setIsProtocolActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);

  const startProtocol = () => {
    setIsProtocolActive(true);
    setCurrentPhase(0);
    setProtocolProgress(0);
    toast({
      title: "Universal Manifestation Protocol Activated",
      description: "Beginning the 8-phase sacred manifestation process",
    });
  };

  const completePhase = () => {
    if (currentPhase < MANIFESTATION_PROTOCOL.length - 1) {
      const newPhase = currentPhase + 1;
      setCurrentPhase(newPhase);
      setProtocolProgress(((newPhase) / MANIFESTATION_PROTOCOL.length) * 100);
      
      toast({
        title: `Phase ${newPhase} Complete`,
        description: `Proceeding to: ${MANIFESTATION_PROTOCOL[newPhase].name}`,
      });
    } else {
      setIsProtocolActive(false);
      setProtocolProgress(100);
      toast({
        title: "Protocol Complete! 🎉",
        description: "Your manifestation has been released to divine timing",
      });
    }
  };

  const currentProtocolPhase = MANIFESTATION_PROTOCOL[currentPhase];

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => setActiveView('overview')}
          variant={activeView === 'overview' ? 'default' : 'outline'}
          className={activeView === 'overview' ? 'bg-purple-600' : 'border-purple-500/50 text-purple-200'}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Overview
        </Button>
        <Button
          onClick={() => setActiveView('pillars')}
          variant={activeView === 'pillars' ? 'default' : 'outline'}
          className={activeView === 'pillars' ? 'bg-purple-600' : 'border-purple-500/50 text-purple-200'}
        >
          <Triangle className="w-4 h-4 mr-2" />
          Seven Pillars
        </Button>
        <Button
          onClick={() => setActiveView('protocol')}
          variant={activeView === 'protocol' ? 'default' : 'outline'}
          className={activeView === 'protocol' ? 'bg-purple-600' : 'border-purple-500/50 text-purple-200'}
        >
          <Circle className="w-4 h-4 mr-2" />
          Protocol
        </Button>
        <Button
          onClick={() => setActiveView('formulas')}
          variant={activeView === 'formulas' ? 'default' : 'outline'}
          className={activeView === 'formulas' ? 'bg-purple-600' : 'border-purple-500/50 text-purple-200'}
        >
          <Flame className="w-4 h-4 mr-2" />
          Specialized Formulas
        </Button>
        <Button
          onClick={() => setActiveView('practice')}
          variant={activeView === 'practice' ? 'default' : 'outline'}
          className={activeView === 'practice' ? 'bg-purple-600' : 'border-purple-500/50 text-purple-200'}
        >
          <Star className="w-4 h-4 mr-2" />
          Live Practice
        </Button>
      </div>

      {/* Main Content */}
      {activeView === 'overview' && (
        <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-200 text-xl flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Enhanced Universal Magic Formula
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-purple-300 text-sm leading-relaxed">
              <p className="mb-4">
                A revolutionary synthesis of the world's most powerful ancient magical traditions, 
                carefully adapted for contemporary spiritual practice. This enhanced formula provides 
                a comprehensive framework for manifesting positive transformation in all aspects of life.
              </p>
              <p className="mb-4">
                Drawing from the profound wisdom of the 108 sacred formulas, the celestial magic of 
                the Picatrix, the divine authority of the Key of Solomon, the creative force of Egyptian 
                Heka, and the protective power of Vedic mantras.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-800/20 p-4 rounded-lg border border-purple-600/30">
                <h4 className="text-purple-200 font-semibold mb-2 flex items-center gap-2">
                  <Triangle className="w-4 h-4" />
                  Seven Pillars System
                </h4>
                <p className="text-purple-300 text-sm">
                  Comprehensive framework addressing every aspect of magical practice from intention to embodiment.
                </p>
              </div>
              
              <div className="bg-indigo-800/20 p-4 rounded-lg border border-indigo-600/30">
                <h4 className="text-indigo-200 font-semibold mb-2 flex items-center gap-2">
                  <Circle className="w-4 h-4" />
                  8-Phase Protocol
                </h4>
                <p className="text-indigo-300 text-sm">
                  Systematic manifestation process that can be adapted for any positive intention or goal.
                </p>
              </div>
              
              <div className="bg-violet-800/20 p-4 rounded-lg border border-violet-600/30">
                <h4 className="text-violet-200 font-semibold mb-2 flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Specialized Formulas
                </h4>
                <p className="text-violet-300 text-sm">
                  Targeted approaches for specific areas: protection, abundance, love, healing, success, and wisdom.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 p-4 rounded-lg border border-amber-600/30">
              <h4 className="text-amber-200 font-semibold mb-2">Ancient Wisdom Sources</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                <div className="text-amber-300">• 108 Sacred Formulas</div>
                <div className="text-amber-300">• Picatrix Celestial Magic</div>
                <div className="text-amber-300">• Key of Solomon</div>
                <div className="text-amber-300">• Egyptian Heka</div>
                <div className="text-amber-300">• Vedic Mantras</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeView === 'pillars' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEVEN_PILLARS.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <Card 
                  key={pillar.id}
                  className={`cursor-pointer transition-colors ${
                    selectedPillar === pillar.id
                      ? 'bg-purple-800/30 border-purple-400/50'
                      : 'bg-purple-900/20 border-purple-600/30 hover:bg-purple-800/20'
                  }`}
                  onClick={() => setSelectedPillar(selectedPillar === pillar.id ? null : pillar.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-purple-600/20 p-2 rounded-lg">
                        <IconComponent className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-200 font-semibold text-sm">{pillar.name}</h4>
                        <p className="text-purple-300 text-xs mt-1">{pillar.description}</p>
                      </div>
                    </div>
                    
                    {selectedPillar === pillar.id && (
                      <div className="space-y-3 mt-4 pt-3 border-t border-purple-600/30">
                        <div>
                          <h5 className="text-purple-200 font-medium text-xs mb-2">Core Practices:</h5>
                          <ul className="space-y-1">
                            {pillar.practices.map((practice, i) => (
                              <li key={i} className="text-purple-300 text-xs flex items-center">
                                <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                                {practice}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-purple-200 text-xs">Mastery Progress</span>
                            <span className="text-purple-200 text-xs">{pillar.mastery}%</span>
                          </div>
                          <Progress value={pillar.mastery} className="h-1" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {activeView === 'protocol' && (
        <Card className="bg-indigo-900/20 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-200 flex items-center gap-2">
              <Circle className="w-6 h-6" />
              Universal Manifestation Protocol
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Protocol Progress */}
            <div className="bg-indigo-800/20 p-4 rounded-lg border border-indigo-600/30">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-indigo-200 font-semibold">Protocol Progress</h4>
                <Badge className={`${isProtocolActive ? 'bg-green-600/20 text-green-200' : 'bg-gray-600/20 text-gray-300'}`}>
                  {isProtocolActive ? 'Active' : 'Ready'}
                </Badge>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-indigo-300 text-sm">Completion</span>
                <span className="text-indigo-300 text-sm">{Math.round(protocolProgress)}%</span>
              </div>
              <Progress value={protocolProgress} className="h-2 mb-4" />
              
              {!isProtocolActive ? (
                <Button onClick={startProtocol} className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Begin Universal Protocol
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="bg-indigo-700/20 p-3 rounded-lg border border-indigo-500/30">
                    <h5 className="text-indigo-200 font-medium mb-1">
                      Phase {currentPhase + 1}: {currentProtocolPhase.name}
                    </h5>
                    <p className="text-indigo-300 text-sm mb-2">Duration: {currentProtocolPhase.duration}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-400" />
                      <span className="text-indigo-300 text-sm">Practice this phase, then continue</span>
                    </div>
                  </div>
                  <Button onClick={completePhase} className="w-full bg-green-600 hover:bg-green-700">
                    Complete Phase {currentPhase + 1}
                  </Button>
                </div>
              )}
            </div>

            {/* Phase Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MANIFESTATION_PROTOCOL.map((phase, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border ${
                    index === currentPhase && isProtocolActive
                      ? 'bg-indigo-700/30 border-indigo-400/50'
                      : index < currentPhase && isProtocolActive
                        ? 'bg-green-800/20 border-green-600/30'
                        : 'bg-indigo-800/20 border-indigo-600/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-indigo-200 font-medium text-sm">
                      Phase {phase.phase}: {phase.name}
                    </h5>
                    <Badge className={`text-xs ${
                      index === currentPhase && isProtocolActive
                        ? 'bg-blue-600/20 text-blue-200'
                        : index < currentPhase && isProtocolActive
                          ? 'bg-green-600/20 text-green-200'
                          : 'bg-gray-600/20 text-gray-300'
                    }`}>
                      {index === currentPhase && isProtocolActive ? 'Active' : 
                       index < currentPhase && isProtocolActive ? 'Complete' : 'Pending'}
                    </Badge>
                  </div>
                  <p className="text-indigo-300 text-xs">Duration: {phase.duration}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeView === 'formulas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SPECIALIZED_FORMULAS.map((formula) => {
            const IconComponent = formula.icon;
            return (
              <Card key={formula.id} className="bg-purple-900/20 border-purple-600/30 hover:bg-purple-800/20 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-purple-600/20 p-2 rounded-lg">
                      <IconComponent className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-purple-200 font-semibold text-sm mb-1">{formula.name}</h4>
                      <p className="text-purple-300 text-xs">{formula.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-purple-200 font-medium text-xs">Key Elements:</h5>
                    {formula.elements.map((element, index) => (
                      <div key={index} className="text-purple-300 text-xs flex items-center">
                        <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                        {element}
                      </div>
                    ))}
                  </div>
                  
                  <Button size="sm" className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                    Practice Formula
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {activeView === 'practice' && (
        <Card className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-amber-500/30">
          <CardHeader>
            <CardTitle className="text-amber-200 flex items-center gap-2">
              <Star className="w-6 h-6" />
              Live Magic Practice Session
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-amber-200 mb-2">Guided Practice Coming Soon</h3>
              <p className="text-amber-300 mb-6">
                Interactive magical practice sessions with real-time guidance and energy tracking.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-amber-800/20 p-4 rounded-lg border border-amber-600/30">
                  <h4 className="text-amber-200 font-medium mb-2">Real-Time Guidance</h4>
                  <p className="text-amber-300 text-sm">Step-by-step instructions with timing</p>
                </div>
                <div className="bg-orange-800/20 p-4 rounded-lg border border-orange-600/30">
                  <h4 className="text-orange-200 font-medium mb-2">Energy Tracking</h4>
                  <p className="text-orange-300 text-sm">Monitor your energetic state during practice</p>
                </div>
                <div className="bg-red-800/20 p-4 rounded-lg border border-red-600/30">
                  <h4 className="text-red-200 font-medium mb-2">Progress Analytics</h4>
                  <p className="text-red-300 text-sm">Detailed feedback and development insights</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
