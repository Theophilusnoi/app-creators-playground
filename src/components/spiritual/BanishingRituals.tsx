import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Shield, Sparkles, Zap, Star, Eye, Heart, X, Play, Pause, RotateCcw } from "lucide-react";

interface BanishingRitual {
  id: string;
  name: string;
  tradition: string;
  duration: number;
  purpose: string;
  components: string[];
  steps: string[];
  tools?: string[];
  safetyNotes: string[];
}

interface BanishingRitualsProps {
  tradition?: string;
  purpose?: 'cleansing' | 'protection' | 'psychic_hygiene' | 'empowerment';
  onClose: () => void;
  onComplete: (ritualType: string) => void;
}

const BANISHING_RITUALS: BanishingRitual[] = [
  {
    id: 'lbrp',
    name: 'Lesser Banishing Ritual of the Pentagram',
    tradition: 'ceremonial',
    duration: 15,
    purpose: 'Creates sacred space and banishes negative influences',
    components: ['Pentagram gestures', 'Archangel invocations', 'Elemental balancing'],
    tools: ['None required - pure intention'],
    steps: [
      'Face East and perform the Qabalistic Cross',
      'Draw banishing Earth pentagram in East, vibrate "YHVH"',
      'Turn South, draw pentagram, vibrate "Adonai"',
      'Turn West, draw pentagram, vibrate "Eheieh"',
      'Turn North, draw pentagram, vibrate "AGLA"',
      'Return to center, invoke the four archangels',
      'Repeat Qabalistic Cross to seal'
    ],
    safetyNotes: [
      'Learn proper pronunciations before attempting',
      'Practice in a quiet, undisturbed space',
      'Ground yourself afterward with physical movement'
    ]
  },
  {
    id: 'sage_cleansing',
    name: 'Sacred Smoke Cleansing',
    tradition: 'folk',
    duration: 10,
    purpose: 'Clears stagnant energy from spaces and auras',
    components: ['Sacred herbs', 'Intention setting', 'Physical movement'],
    tools: ['White sage, cedar, or rosemary', 'Fire-safe bowl', 'Feather (optional)'],
    steps: [
      'Open windows and doors for energy to exit',
      'Light your sacred herb and set clear intention',
      'Start at the entrance, move clockwise through space',
      'Pay attention to corners, doorways, and windows',
      'Cleanse your own aura from feet to head',
      'Safely extinguish and express gratitude',
      'Sit in meditation to feel the cleared energy'
    ],
    safetyNotes: [
      'Ensure proper ventilation always',
      'Never leave burning herbs unattended',
      'Be respectful of cultural origins of practices'
    ]
  },
  {
    id: 'energy_shield',
    name: 'Auric Shield Visualization',
    tradition: 'energy_work',
    duration: 8,
    purpose: 'Creates protective energy field around the practitioner',
    components: ['Breath work', 'Visualization', 'Intention amplification'],
    tools: ['Black tourmaline or obsidian (optional)', 'Quiet space'],
    steps: [
      'Sit comfortably and take seven deep breaths',
      'Visualize roots growing from your base into Earth',
      'Draw golden light up from Earth through your spine',
      'Expand this light into an egg-shaped shield around you',
      'Program the shield: "Only love and light may enter"',
      'Visualize negative energy bouncing off harmlessly',
      'Anchor the shield with gratitude and intention'
    ],
    safetyNotes: [
      'Practice regularly to strengthen the technique',
      'Remember shields need periodic refreshing',
      'Always ground excess energy after practice'
    ]
  },
  {
    id: 'bell_clearing',
    name: 'Sacred Sound Banishing',
    tradition: 'universal',
    duration: 5,
    purpose: 'Uses sound vibration to clear negative energy',
    components: ['Sound vibration', 'Intentional movement', 'Energy direction'],
    tools: ['Bell, singing bowl, or chimes', 'Clear intention'],
    steps: [
      'Hold your sound tool with reverence',
      'State your intention to clear all negativity',
      'Ring bell/bowl starting at lowest point of space',
      'Move systematically through entire area',
      'Pay special attention to dark corners',
      'End with three strong, clear rings',
      'Sit in silence to feel the cleared vibration'
    ],
    safetyNotes: [
      'Use authentic tools when possible',
      'Trust your intuition about which areas need more attention',
      'Cleanse your sound tools regularly'
    ]
  }
];

export const BanishingRituals: React.FC<BanishingRitualsProps> = ({
  tradition = 'eclectic',
  purpose,
  onClose,
  onComplete
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedRitual, setSelectedRitual] = useState<BanishingRitual | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [ritualPhase, setRitualPhase] = useState<'preparation' | 'active' | 'integration'>('preparation');

  const filteredRituals = BANISHING_RITUALS.filter(ritual => {
    if (tradition === 'christian') return ritual.tradition === 'universal' || ritual.tradition === 'energy_work';
    if (tradition === 'secular') return ritual.tradition === 'energy_work' || ritual.tradition === 'universal';
    return true;
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsActive(false);
            handleStepComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const startRitual = (ritual: BanishingRitual) => {
    setSelectedRitual(ritual);
    setCurrentStep(0);
    setRitualPhase('preparation');
    
    // Log ritual start
    if (user) {
      supabase
        .from('daily_protection_logs' as any)
        .insert({
          user_id: user.id,
          practice_type: 'banishing_ritual',
          practice_details: { 
            ritual_name: ritual.name,
            tradition: ritual.tradition,
            started_at: new Date().toISOString()
          }
        })
        .then(() => console.log('Banishing ritual logged'));
    }
  };

  const beginActivePhase = () => {
    if (!selectedRitual) return;
    setRitualPhase('active');
    setIsActive(true);
    setTimeRemaining(Math.ceil(selectedRitual.duration * 60 / selectedRitual.steps.length));
  };

  const handleStepComplete = () => {
    if (!selectedRitual) return;
    
    if (currentStep < selectedRitual.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeRemaining(Math.ceil(selectedRitual.duration * 60 / selectedRitual.steps.length));
    } else {
      setRitualPhase('integration');
      setTimeout(() => {
        completeRitual();
      }, 3000);
    }
  };

  const completeRitual = async () => {
    if (!selectedRitual) return;

    try {
      if (user) {
        await supabase
          .from('daily_protection_logs' as any)
          .update({
            practice_details: { 
              ritual_name: selectedRitual.name,
              tradition: selectedRitual.tradition,
              completed_at: new Date().toISOString(),
              steps_completed: selectedRitual.steps.length
            }
          })
          .eq('user_id', user.id)
          .eq('practice_type', 'banishing_ritual');
      }

      toast({
        title: "Banishing Ritual Complete",
        description: `${selectedRitual.name} has cleared and protected your energy field.`,
      });

      onComplete(`banishing_${selectedRitual.id}`);
    } catch (error) {
      console.error('Error completing banishing ritual:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!selectedRitual) {
    return (
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              Sacred Banishing Rituals
            </CardTitle>
            <Button onClick={onClose} variant="outline" size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-purple-200 text-sm">
            Reclaim your sovereign space through ancient practices of energetic cleansing
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {filteredRituals.map((ritual) => (
              <Card key={ritual.id} className="bg-gray-800/50 border-gray-600 hover:border-purple-500/50 transition-colors cursor-pointer" onClick={() => startRitual(ritual)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold">{ritual.name}</h3>
                    <Badge variant="outline" className="text-purple-300 border-purple-500/50">
                      {ritual.duration} min
                    </Badge>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{ritual.purpose}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {ritual.components.map((component, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-purple-900/50 text-purple-200">
                        {component}
                      </Badge>
                    ))}
                  </div>
                  
                  {ritual.tools && (
                    <div className="text-xs text-gray-400">
                      <strong>Tools needed:</strong> {ritual.tools.join(', ')}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span className="text-amber-200 font-semibold text-sm">Safety & Wisdom</span>
            </div>
            <p className="text-amber-100 text-xs">
              Banishing rituals are acts of spiritual empowerment, not fear-based combat. 
              Always approach with respect, clear intention, and grounding practices afterward. 
              These are supplements to, not replacements for, professional mental health care.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (ritualPhase === 'preparation') {
    return (
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              {selectedRitual.name}
            </CardTitle>
            <Button onClick={() => setSelectedRitual(null)} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-purple-200">{selectedRitual.purpose}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
            <h4 className="text-blue-200 font-semibold mb-2 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Preparation Phase
            </h4>
            <ul className="text-blue-100 text-sm space-y-1">
              <li>• Ensure you have {selectedRitual.duration} minutes uninterrupted</li>
              <li>• Gather any needed tools: {selectedRitual.tools?.join(', ') || 'None required'}</li>
              <li>• Set clear intention for what you wish to banish/clear</li>
              <li>• Create sacred space (silence phone, light candle, etc.)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Ritual Steps Preview:</h4>
            <ScrollArea className="h-48">
              <ol className="space-y-2">
                {selectedRitual.steps.map((step, index) => (
                  <li key={index} className="flex gap-3 text-sm">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-300">{step}</span>
                  </li>
                ))}
              </ol>
            </ScrollArea>
          </div>

          <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-3">
            <h4 className="text-amber-200 font-semibold text-sm mb-2">Safety Notes:</h4>
            <ul className="text-amber-100 text-xs space-y-1">
              {selectedRitual.safetyNotes.map((note, index) => (
                <li key={index}>• {note}</li>
              ))}
            </ul>
          </div>

          <Button 
            onClick={beginActivePhase}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Begin Sacred Banishing
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (ritualPhase === 'active') {
    return (
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-center flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            {selectedRitual.name} - Active
          </CardTitle>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">
              {formatTime(timeRemaining)}
            </div>
            <p className="text-purple-200 text-sm">
              Step {currentStep + 1} of {selectedRitual.steps.length}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/50 rounded-lg p-6 text-center">
            <div className="text-lg font-semibold text-white mb-3">
              Current Step:
            </div>
            <div className="text-purple-100 leading-relaxed">
              {selectedRitual.steps[currentStep]}
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={() => setIsActive(!isActive)}
              variant="outline" 
              className="flex-1"
            >
              {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isActive ? 'Pause' : 'Resume'}
            </Button>
            <Button 
              onClick={handleStepComplete}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Complete Step
            </Button>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300 text-sm">Progress</span>
              <span className="text-gray-300 text-sm">
                {Math.round(((currentStep + 1) / selectedRitual.steps.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / selectedRitual.steps.length) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/30 border-green-500/30 backdrop-blur-sm">
      <CardContent className="p-8 text-center">
        <div className="mb-6">
          <Heart className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Banishing Complete</h3>
          <p className="text-green-200">
            Your energy field has been cleared and protected. Take a moment to feel the shift.
          </p>
        </div>
        
        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 mb-6">
          <p className="text-green-100 text-sm">
            ✨ Integration Phase: Sit quietly for a few moments and notice how your energy feels. 
            You may experience lightness, clarity, or peaceful presence. This is your sovereign space restored.
          </p>
        </div>

        <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">
          Return to Sacred Conversation
        </Button>
      </CardContent>
    </Card>
  );
};
