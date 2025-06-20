
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Star, Eye, Flame, Crown } from "lucide-react";

interface AdvancedShieldSystemProps {
  threatLevel: number;
  onShieldActivated: (shieldType: string, duration: number) => void;
  onClose: () => void;
}

export const AdvancedShieldSystem: React.FC<AdvancedShieldSystemProps> = ({
  threatLevel,
  onShieldActivated,
  onClose
}) => {
  const [activeShield, setActiveShield] = useState<string | null>(null);
  const [shieldProgress, setShieldProgress] = useState(0);
  const [layeredShields, setLayeredShields] = useState<string[]>([]);

  const SHIELD_SYSTEMS = {
    basic_protection: {
      name: '🛡️ Basic Divine Shield',
      description: 'Standard divine light protection',
      duration: 8000,
      strength: 3,
      layers: ['divine_light', 'prayer_barrier'],
      suitable: threatLevel >= 1
    },
    angelic_fortress: {
      name: '👼 Angelic Fortress Shield',
      description: 'Multi-dimensional angelic protection grid',
      duration: 12000,
      strength: 7,
      layers: ['angelic_guards', 'divine_light', 'prayer_barrier', 'sacred_geometry'],
      suitable: threatLevel >= 2
    },
    archangel_protection: {
      name: '⚔️ Archangel Battle Formation',
      description: 'Four archangels combat protection',
      duration: 15000,
      strength: 9,
      layers: ['michael_sword', 'gabriel_strength', 'raphael_healing', 'uriel_wisdom'],
      suitable: threatLevel >= 3
    },
    divine_throne_shield: {
      name: '👑 Divine Throne Room Shield',
      description: 'Direct throne room of God protection',
      duration: 20000,
      strength: 10,
      layers: ['throne_light', 'seraphim_fire', 'cherubim_guard', 'divine_presence'],
      suitable: threatLevel >= 4
    }
  };

  const activateShield = async (shieldKey: string) => {
    const shield = SHIELD_SYSTEMS[shieldKey as keyof typeof SHIELD_SYSTEMS];
    if (!shield) return;

    setActiveShield(shieldKey);
    setShieldProgress(0);
    setLayeredShields([]);

    // Progressive layer activation
    let currentLayer = 0;
    const layerInterval = setInterval(() => {
      if (currentLayer < shield.layers.length) {
        setLayeredShields(prev => [...prev, shield.layers[currentLayer]]);
        currentLayer++;
      } else {
        clearInterval(layerInterval);
      }
    }, shield.duration / shield.layers.length);

    // Overall progress
    const progressInterval = setInterval(() => {
      setShieldProgress(prev => {
        const next = prev + (100 / (shield.duration / 100));
        if (next >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setActiveShield(null);
            setShieldProgress(0);
            setLayeredShields([]);
            onShieldActivated(shieldKey, shield.duration);
          }, 1000);
          return 100;
        }
        return next;
      });
    }, 100);
  };

  const getShieldVisualization = () => {
    if (!activeShield) return null;

    return (
      <div className="relative">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl" />
        <div className="relative z-10 grid grid-cols-2 gap-2 p-4">
          {layeredShields.map((layer, index) => (
            <div
              key={layer}
              className="bg-blue-500/30 p-2 rounded text-xs text-center animate-pulse"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              {layer.replace('_', ' ').toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (activeShield) {
    const shield = SHIELD_SYSTEMS[activeShield as keyof typeof SHIELD_SYSTEMS];

    return (
      <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/50">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-xl flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-blue-400 animate-pulse" />
            {shield.name}
            <Shield className="w-6 h-6 text-blue-400 animate-pulse" />
          </CardTitle>
          <div className="w-full bg-blue-900/50 rounded-full h-3 mt-4">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${shieldProgress}%` }}
            />
          </div>
          <p className="text-blue-200 text-sm mt-2">{Math.round(shieldProgress)}% Shield Power</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-blue-900/20 p-4 rounded-lg">
            <h4 className="text-blue-200 font-semibold mb-3">🛡️ Active Shield Layers:</h4>
            {getShieldVisualization()}
          </div>

          <div className="text-center mt-4">
            <p className="text-white text-sm font-bold">
              🌟 Divine protection is activating around you! 🌟
            </p>
            <p className="text-blue-200 text-xs mt-2">
              Strength Level: {shield.strength}/10 • Duration: {shield.duration/1000}s
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/30 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" />
          Advanced Shield System
          <Shield className="w-5 h-5 text-blue-400" />
        </CardTitle>
        <p className="text-blue-200">
          Threat Level: {threatLevel}/4 • Multi-layered Divine Protection
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-blue-900/20 p-4 rounded-lg mb-4">
          <h3 className="text-blue-200 font-semibold mb-2">Shield Technology</h3>
          <p className="text-blue-100 text-sm">
            Advanced layered protection systems that create multiple barriers between you and 
            spiritual threats. Each shield type offers different strength levels and protective layers.
          </p>
        </div>

        <div className="grid gap-3">
          {Object.entries(SHIELD_SYSTEMS)
            .filter(([_, shield]) => shield.suitable)
            .map(([key, shield]) => (
            <Button
              key={key}
              onClick={() => activateShield(key)}
              className={`w-full p-4 h-auto bg-gradient-to-r ${
                shield.strength >= 9 ? 'from-purple-600 to-gold-600' :
                shield.strength >= 7 ? 'from-blue-600 to-purple-600' :
                shield.strength >= 5 ? 'from-blue-600 to-cyan-600' :
                'from-blue-600 to-blue-800'
              } hover:opacity-90 text-white`}
            >
              <div className="text-left w-full">
                <div className="font-semibold text-lg">{shield.name}</div>
                <div className="text-sm opacity-90">{shield.description}</div>
                <div className="text-xs mt-1 opacity-75">
                  Strength: {shield.strength}/10 • Layers: {shield.layers.length}
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg">
          <h4 className="text-blue-200 font-semibold mb-2">🌟 Shield Benefits:</h4>
          <ul className="text-blue-100 text-sm space-y-1">
            <li>• Blocks negative energy and spiritual attacks</li>
            <li>• Creates sacred space around your energy field</li>
            <li>• Filters out unwanted spiritual influences</li>
            <li>• Amplifies your own divine connection</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-blue-500/50 text-blue-200"
          >
            Close Shield System
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
