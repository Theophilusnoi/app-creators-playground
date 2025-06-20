
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Flame, Cross, Star, Heart } from "lucide-react";

interface SpiritualProtectionSystemProps {
  threatLevel: number;
  threatType: string;
  onProtectionComplete: (type: string) => void;
  onClose: () => void;
}

export const SpiritualProtectionSystem: React.FC<SpiritualProtectionSystemProps> = ({
  threatLevel,
  threatType,
  onProtectionComplete,
  onClose
}) => {
  const [activeProtection, setActiveProtection] = useState<string | null>(null);
  const [protectionProgress, setProtectionProgress] = useState(0);

  const getProtectionRituals = () => {
    const baseProtections = [
      {
        id: 'emergency_shield',
        name: '🛡️ Emergency Spiritual Shield',
        description: 'Immediate divine protection barrier',
        duration: 3000,
        intensity: 'high',
        suitable: threatLevel >= 1
      },
      {
        id: 'divine_armor',
        name: '⚔️ Armor of God Activation',
        description: 'Complete spiritual armor deployment',
        duration: 5000,
        intensity: 'maximum',
        suitable: threatLevel >= 2
      }
    ];

    const advancedProtections = [
      {
        id: 'spiritual_warfare',
        name: '⚡ Active Spiritual Warfare',
        description: 'Offensive spiritual combat protocols',
        duration: 7000,
        intensity: 'extreme',
        suitable: threatLevel >= 3
      },
      {
        id: 'divine_intervention',
        name: '🔥 Divine Intervention Call',
        description: 'Direct call for heavenly assistance',
        duration: 10000,
        intensity: 'ultimate',
        suitable: threatLevel >= 4
      }
    ];

    const threatSpecific = getThreatSpecificProtections(threatType);

    return [...baseProtections, ...advancedProtections, ...threatSpecific].filter(p => p.suitable);
  };

  const getThreatSpecificProtections = (threat: string) => {
    const protections: any[] = [];

    switch (threat) {
      case 'spiritual_marriage':
        protections.push({
          id: 'marriage_breaking',
          name: '💔 Spiritual Marriage Breaking',
          description: 'Complete spiritual divorce ritual',
          duration: 8000,
          intensity: 'maximum',
          suitable: true
        });
        break;
      case 'generational_curse':
        protections.push({
          id: 'generational_breaking',
          name: '🔗 Generational Curse Breaking',
          description: 'Break ancestral spiritual chains',
          duration: 9000,
          intensity: 'maximum',
          suitable: true
        });
        break;
      case 'entity_attachment':
        protections.push({
          id: 'entity_removal',
          name: '👻 Entity Attachment Removal',
          description: 'Force entity detachment and banishment',
          duration: 6000,
          intensity: 'high',
          suitable: true
        });
        break;
      case 'witchcraft_attack':
        protections.push({
          id: 'witchcraft_breaking',
          name: '🔮 Witchcraft Breaking Ritual',
          description: 'Neutralize all witchcraft and spells',
          duration: 7000,
          intensity: 'high',
          suitable: true
        });
        break;
    }

    return protections;
  };

  const activateProtection = async (protectionId: string) => {
    const protection = getProtectionRituals().find(p => p.id === protectionId);
    if (!protection) return;

    setActiveProtection(protectionId);
    setProtectionProgress(0);

    // Simulate protection activation with progress
    const interval = setInterval(() => {
      setProtectionProgress(prev => {
        const next = prev + (100 / (protection.duration / 100));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setActiveProtection(null);
            setProtectionProgress(0);
            onProtectionComplete(protectionId);
          }, 500);
          return 100;
        }
        return next;
      });
    }, 100);
  };

  const getProtectionContent = (protectionId: string) => {
    const contents: Record<string, { steps: string[], affirmations: string[] }> = {
      emergency_shield: {
        steps: [
          "Place your hand over your heart and feel your divine essence",
          "Visualize brilliant white light surrounding your entire being",
          "Declare: 'I am surrounded by divine protection'",
          "Feel the impenetrable shield of love around you"
        ],
        affirmations: [
          "I am protected by divine light",
          "No weapon formed against me shall prosper",
          "I walk in divine safety and security"
        ]
      },
      divine_armor: {
        steps: [
          "Put on the Belt of Truth around your waist",
          "Place the Breastplate of Righteousness over your heart",
          "Secure the Shoes of Peace on your feet",
          "Take up the Shield of Faith to deflect attacks",
          "Place the Helmet of Salvation on your head",
          "Wield the Sword of the Spirit in your hand"
        ],
        affirmations: [
          "I am fully armored in divine protection",
          "Every piece of spiritual armor is secure",
          "I stand victorious in divine strength"
        ]
      },
      spiritual_warfare: {
        steps: [
          "Take authority over all spiritual attacks",
          "Command all dark forces to flee in Jesus' name",
          "Deploy spiritual fire to burn away negativity",
          "Establish divine victory over all enemies",
          "Seal the breakthrough with thanksgiving"
        ],
        affirmations: [
          "I have authority over all spiritual forces",
          "Victory is mine through divine power",
          "All darkness flees from divine light"
        ]
      },
      marriage_breaking: {
        steps: [
          "Renounce all unwanted spiritual marriages",
          "Declare complete spiritual divorce",
          "Remove all spiritual rings and bonds",
          "Command all spiritual spouses to leave",
          "Seal your freedom with divine blessing"
        ],
        affirmations: [
          "I am free from all unwanted spiritual unions",
          "My spiritual marriage status is my choice",
          "I belong only to divine love"
        ]
      }
    };

    return contents[protectionId] || { steps: [], affirmations: [] };
  };

  if (activeProtection) {
    const protection = getProtectionRituals().find(p => p.id === activeProtection);
    const content = getProtectionContent(activeProtection);

    return (
      <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-2 border-purple-500/50">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-xl flex items-center justify-center gap-2">
            <Flame className="w-6 h-6 text-purple-400 animate-pulse" />
            {protection?.name}
            <Flame className="w-6 h-6 text-purple-400 animate-pulse" />
          </CardTitle>
          <div className="w-full bg-purple-900/50 rounded-full h-3 mt-4">
            <div 
              className="bg-gradient-to-r from-purple-400 to-blue-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${protectionProgress}%` }}
            />
          </div>
          <p className="text-purple-200 text-sm mt-2">{Math.round(protectionProgress)}% Complete</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-purple-900/20 p-4 rounded-lg">
            <h4 className="text-purple-200 font-semibold mb-3">🙏 Follow These Steps:</h4>
            <div className="space-y-2">
              {content.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">{index + 1}.</span>
                  <span className="text-purple-100 text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-900/20 p-4 rounded-lg">
            <h4 className="text-blue-200 font-semibold mb-3">✨ Declare These Affirmations:</h4>
            <div className="space-y-2">
              {content.affirmations.map((affirmation, index) => (
                <div key={index} className="text-blue-100 text-sm italic">
                  "• {affirmation}"
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
    <Card className="bg-black/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-400" />
          Emergency Spiritual Protection
          <Shield className="w-5 h-5 text-purple-400" />
        </CardTitle>
        <p className="text-purple-200">
          Threat Level: {threatLevel}/4 • Type: {threatType.replace('_', ' ').toUpperCase()}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {getProtectionRituals().map((protection) => (
            <Button
              key={protection.id}
              onClick={() => activateProtection(protection.id)}
              className={`w-full p-4 h-auto bg-gradient-to-r ${
                protection.intensity === 'ultimate' ? 'from-purple-600 to-red-600' :
                protection.intensity === 'extreme' ? 'from-red-600 to-orange-600' :
                protection.intensity === 'maximum' ? 'from-orange-600 to-yellow-600' :
                'from-blue-600 to-purple-600'
              } hover:opacity-90 text-white`}
            >
              <div className="text-left w-full">
                <div className="font-semibold text-lg">{protection.name}</div>
                <div className="text-sm opacity-90">{protection.description}</div>
                <div className="text-xs mt-1 opacity-75">
                  Intensity: {protection.intensity.toUpperCase()}
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-purple-500/50 text-purple-200"
          >
            Close Protection System
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
