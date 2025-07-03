import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Heart, Star, Crown, Flame } from 'lucide-react';

interface ArmorTechnique {
  id: string;
  name: string;
  type: 'affirmation' | 'visualization' | 'mantra' | 'mudra';
  description: string;
  instructions: string[];
  duration: string;
  element: string;
}

export const SpiritualArmorToolkit = () => {
  const [activeArmor, setActiveArmor] = useState<string | null>(null);
  const [armorProgress, setArmorProgress] = useState(0);

  const armorTechniques: ArmorTechnique[] = [
    {
      id: 'divine_light_shield',
      name: '🛡️ Divine Light Shield',
      type: 'visualization',
      description: 'Create an impenetrable barrier of white light around your entire being',
      instructions: [
        'Close your eyes and take three deep breaths',
        'Visualize brilliant white light emanating from your heart center',
        'See this light expanding to surround your entire body in a protective sphere',
        'Declare: "Divine light surrounds me, protects me, and guides me"',
        'Feel the shield strengthening with each breath'
      ],
      duration: '5 minutes',
      element: 'Light'
    },
    {
      id: 'archangel_michael_armor',
      name: '⚔️ Archangel Michael\'s Armor',
      type: 'affirmation',
      description: 'Call upon Archangel Michael for divine protection and courage',
      instructions: [
        'Stand tall with your feet planted firmly on the ground',
        'Place your hand over your heart and speak: "Archangel Michael, I call upon your protection"',
        'Visualize Michael\'s blue light surrounding you like spiritual armor',
        'Feel his strength becoming your strength',
        'Seal with: "I am protected by divine warrior light"'
      ],
      duration: '3 minutes',
      element: 'Fire'
    },
    {
      id: 'sacred_sound_barrier',
      name: '🔊 Sacred Sound Barrier',
      type: 'mantra',
      description: 'Use the power of sacred sound to create energetic protection',
      instructions: [
        'Sit in a comfortable position with spine straight',
        'Take three cleansing breaths',
        'Begin chanting "OM GAAM GANAPATAYE NAMAHA" 108 times',
        'Feel each vibration creating a protective sound field around you',
        'End with three long OM sounds'
      ],
      duration: '15 minutes',
      element: 'Sound'
    },
    {
      id: 'merkaba_activation',
      name: '🌟 Merkaba Light Vehicle',
      type: 'visualization',
      description: 'Activate your personal merkaba for multi-dimensional protection',
      instructions: [
        'Lie down comfortably and breathe deeply',
        'Visualize two triangular pyramids of light intersecting at your heart',
        'See the upper pyramid spinning clockwise, the lower counter-clockwise',
        'Feel yourself surrounded by this sacred geometric light vehicle',
        'Know that you are protected across all dimensions'
      ],
      duration: '10 minutes',
      element: 'Geometry'
    },
    {
      id: 'elemental_guardian_circle',
      name: '🌍 Elemental Guardian Circle',
      type: 'visualization',
      description: 'Call upon the four elemental guardians for complete protection',
      instructions: [
        'Face East and call: "I invoke the Guardian of Air for mental clarity"',
        'Face South and call: "I invoke the Guardian of Fire for spiritual strength"',
        'Face West and call: "I invoke the Guardian of Water for emotional balance"',
        'Face North and call: "I invoke the Guardian of Earth for physical protection"',
        'Stand in center feeling surrounded by all four guardians'
      ],
      duration: '7 minutes',
      element: 'All Elements'
    },
    {
      id: 'golden_egg_protection',
      name: '🥚 Golden Egg of Protection',
      type: 'visualization',
      description: 'Surround yourself in an impenetrable golden energy field',
      instructions: [
        'Sit quietly and breathe into your heart center',
        'Visualize golden light beginning to glow within your core',
        'See this light expanding to form a golden egg around your entire aura',
        'Make this egg impermeable to all negative energies',
        'Affirm: "I am safe within my golden sanctuary of light"'
      ],
      duration: '6 minutes',
      element: 'Gold Light'
    }
  ];

  const activateArmor = async (armorId: string) => {
    const armor = armorTechniques.find(a => a.id === armorId);
    if (!armor) return;

    setActiveArmor(armorId);
    setArmorProgress(0);

    // Simulate armor activation process
    const durationMs = parseInt(armor.duration) * 60 * 1000; // Convert minutes to ms
    const interval = setInterval(() => {
      setArmorProgress(prev => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setActiveArmor(null);
            setArmorProgress(0);
          }, 1000);
          return 100;
        }
        return next;
      });
    }, durationMs / 50);
  };

  if (activeArmor) {
    const armor = armorTechniques.find(a => a.id === activeArmor);
    return (
      <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-2 border-purple-500/50">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-xl flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-purple-400 animate-pulse" />
            {armor?.name}
            <Shield className="w-6 h-6 text-purple-400 animate-pulse" />
          </CardTitle>
          <div className="w-full bg-purple-900/50 rounded-full h-4 mt-4">
            <div 
              className="bg-gradient-to-r from-purple-400 to-gold-400 h-4 rounded-full transition-all duration-500"
              style={{ width: `${armorProgress}%` }}
            />
          </div>
          <p className="text-purple-200 text-sm mt-2">{Math.round(armorProgress)}% Protected</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-purple-900/20 p-4 rounded-lg">
            <h4 className="text-purple-200 font-semibold mb-3">🙏 Divine Instructions:</h4>
            <div className="space-y-3">
              {armor?.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">{index + 1}.</span>
                  <span className="text-purple-100 text-sm">{instruction}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-white text-sm">
              🌟 Feel the divine protection activating around you 🌟
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-center justify-center">
            <Shield className="w-6 h-6 text-purple-400" />
            🛡️ Sacred Armor Toolkit
            <Shield className="w-6 h-6 text-purple-400" />
          </CardTitle>
          <p className="text-purple-200 text-center">
            Divine protection techniques for spiritual warriors. Choose your sacred armor and feel the cosmic guardians surrounding you.
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {armorTechniques.map((armor) => (
          <Card key={armor.id} className="bg-black/30 border-purple-500/30 hover:border-purple-400 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs border-purple-400 text-purple-300">
                  {armor.element}
                </Badge>
                <Badge variant="outline" className="text-xs border-blue-400 text-blue-300">
                  {armor.duration}
                </Badge>
              </div>
              <CardTitle className="text-white text-lg">{armor.name}</CardTitle>
              <p className="text-purple-200 text-sm">{armor.description}</p>
            </CardHeader>
            
            <CardContent>
              <Button
                onClick={() => activateArmor(armor.id)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <Zap className="w-4 h-4 mr-2" />
                Activate Protection
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-yellow-900/20 to-purple-900/20 rounded-lg p-4">
        <p className="text-yellow-200 text-sm italic text-center">
          "Divine light surrounds me. Sacred sound protects me. Angels guide me. I am safe in spirit." 
          - Repeat 3x at sunrise for daily protection
        </p>
      </div>
    </div>
  );
};