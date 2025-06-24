
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Globe, Star, Brain, Sparkles, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SevenLayerProtectionProps {
  userProfile?: any;
  quantumShieldActive?: boolean;
}

export const SevenLayerProtection: React.FC<SevenLayerProtectionProps> = ({
  userProfile,
  quantumShieldActive
}) => {
  const { toast } = useToast();
  const [activeLayers, setActiveLayers] = useState<number[]>([]);
  const [layerStrength, setLayerStrength] = useState<Record<number, number>>({});

  const protectionLayers = [
    {
      id: 1,
      name: 'Sankalpa Shield',
      source: 'Vedic Sankalpa',
      implementation: 'AI-formulated intention statements + EEG neurofeedback',
      zodiacOpt: 'Cardinal signs → Active defense, Mutable signs → Adaptive shielding',
      color: 'purple',
      strength: layerStrength[1] || 0
    },
    {
      id: 2,
      name: 'Elemental Barrier',
      source: 'Egyptian Heka',
      implementation: 'AR elemental invocation (earth=salt, water=mist, fire=thermal)',
      zodiacOpt: 'Fire signs → Boosted fire wall, Water signs → Enhanced fluid defense',
      color: 'blue',
      strength: layerStrength[2] || 0
    },
    {
      id: 3,
      name: 'Mantric Resonance',
      source: 'Key of Solomon',
      implementation: 'Bone-conduction mantras (72 sacred names) + vocal biometric tuning',
      zodiacOpt: 'Air signs → Sonic amplification, Earth signs → Grounding frequencies',
      color: 'green',
      strength: layerStrength[3] || 0
    },
    {
      id: 4,
      name: 'Celestial Timing',
      source: 'Picatrix',
      implementation: 'Astro-aligned activation windows (Saturn=banishing, Venus=love protection)',
      zodiacOpt: 'Moon signs → Lunar phase sync, Rising signs → Planetary hour focus',
      color: 'yellow',
      strength: layerStrength[4] || 0
    },
    {
      id: 5,
      name: 'Geometric Wards',
      source: 'Vedic Yantras',
      implementation: 'AR sacred geometry (Sri Yantra for home, Metatron\'s Cube for devices)',
      zodiacOpt: 'Fixed signs → Permanent wards, Cardinal signs → Dynamic reconfiguration',
      color: 'indigo',
      strength: layerStrength[5] || 0
    },
    {
      id: 6,
      name: 'Kavach Armor',
      source: 'Vedic Kavach',
      implementation: 'Bioresponsive light shield (color changes with threat) + haptics',
      zodiacOpt: 'Scorpio → Psychic mirror, Taurus → Crystal grid integration',
      color: 'red',
      strength: layerStrength[6] || 0
    },
    {
      id: 7,
      name: 'Dharana Integration',
      source: 'Egyptian Ma\'at',
      implementation: 'Neural lace protocol (muscle memory via theta wave entrainment)',
      zodiacOpt: 'All signs → 7-day neuroadaptation',
      color: 'gold',
      strength: layerStrength[7] || 0
    }
  ];

  const activateLayer = async (layerId: number) => {
    const layer = protectionLayers.find(l => l.id === layerId);
    if (!layer) return;

    setActiveLayers(prev => [...prev, layerId]);
    
    // Simulate layer strength building
    let strength = 0;
    const strengthInterval = setInterval(() => {
      strength += Math.random() * 15 + 5;
      if (strength >= 100) {
        strength = 100;
        clearInterval(strengthInterval);
        toast({
          title: `${layer.name} Activated`,
          description: `${layer.source} protection layer is now fully operational`,
        });
      } else {
        setLayerStrength(prev => ({ ...prev, [layerId]: strength }));
      }
    }, 200);

    toast({
      title: "Layer Activation Initiated",
      description: `Activating ${layer.name} using ${layer.source} protocols...`,
    });
  };

  const getLayerIcon = (layerId: number) => {
    const icons = {
      1: Shield, 2: Globe, 3: Volume2, 4: Star, 5: Sparkles, 6: Zap, 7: Brain
    };
    return icons[layerId as keyof typeof icons] || Shield;
  };

  const getColorClasses = (color: string, active: boolean) => {
    const colors = {
      purple: active ? 'border-purple-500 bg-purple-900/30' : 'border-purple-500/30 bg-purple-900/10',
      blue: active ? 'border-blue-500 bg-blue-900/30' : 'border-blue-500/30 bg-blue-900/10',
      green: active ? 'border-green-500 bg-green-900/30' : 'border-green-500/30 bg-green-900/10',
      yellow: active ? 'border-yellow-500 bg-yellow-900/30' : 'border-yellow-500/30 bg-yellow-900/10',
      indigo: active ? 'border-indigo-500 bg-indigo-900/30' : 'border-indigo-500/30 bg-indigo-900/10',
      red: active ? 'border-red-500 bg-red-900/30' : 'border-red-500/30 bg-red-900/10',
      gold: active ? 'border-yellow-400 bg-yellow-900/30' : 'border-yellow-400/30 bg-yellow-900/10'
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Shield className="w-6 h-6 text-purple-400" />
            Seven-Layer Protection Architecture
          </CardTitle>
          <p className="text-purple-200">Synthesizing 5,000 Years of Magical Wisdom</p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-200">Overall Protection Strength</span>
              <span className="text-white font-bold">
                {Math.round(Object.values(layerStrength).reduce((a, b) => a + b, 0) / 7)}%
              </span>
            </div>
            <Progress 
              value={Object.values(layerStrength).reduce((a, b) => a + b, 0) / 7} 
              className="h-3"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {protectionLayers.map((layer) => {
          const Icon = getLayerIcon(layer.id);
          const isActive = activeLayers.includes(layer.id);
          
          return (
            <Card 
              key={layer.id}
              className={`${getColorClasses(layer.color, isActive)} transition-all duration-300`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${layer.color}-600/20`}>
                      <Icon className={`w-5 h-5 text-${layer.color}-400`} />
                    </div>
                    <div>
                      <div className="text-lg">Layer {layer.id}: {layer.name}</div>
                      <div className="text-sm text-gray-300 font-normal">
                        Ancient Source: {layer.source}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <Badge className="bg-green-600/20 text-green-200">
                        {Math.round(layer.strength)}% Active
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      onClick={() => activateLayer(layer.id)}
                      disabled={isActive}
                      className={`bg-${layer.color}-600 hover:bg-${layer.color}-700`}
                    >
                      {isActive ? 'Active' : 'Activate'}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-300 font-semibold">Modern Implementation:</span>
                    <p className="text-gray-200 text-sm mt-1">{layer.implementation}</p>
                  </div>
                  <div>
                    <span className="text-gray-300 font-semibold">Zodiac Optimization:</span>
                    <p className="text-gray-200 text-sm mt-1">{layer.zodiacOpt}</p>
                  </div>
                  {isActive && layer.strength < 100 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Activation Progress</span>
                        <span className="text-white text-sm">{Math.round(layer.strength)}%</span>
                      </div>
                      <Progress value={layer.strength} className="h-2" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {activeLayers.length === 7 && (
        <Card className="bg-gradient-to-r from-gold-900/30 to-purple-900/30 border-gold-500/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gold-200">🌟 Seven-Layer Shield Complete! 🌟</h3>
              <p className="text-gold-300">
                All protection layers are now active. You are defended by the combined wisdom of 
                Vedic, Egyptian, and Solomonic traditions.
              </p>
              <Badge className="bg-gold-600/20 text-gold-200 text-lg px-4 py-2">
                MAXIMUM PROTECTION ACHIEVED
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
