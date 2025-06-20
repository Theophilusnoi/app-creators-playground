
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Swords, Clock, Zap } from "lucide-react";
import { AdvancedShieldSystem } from './AdvancedShieldSystem';
import { RitualSequencer } from './RitualSequencer';
import { SpiritualWarfareSystem } from './SpiritualWarfareSystem';

interface Phase3ManagerProps {
  threatLevel: number;
  threatType: string;
  onPhaseComplete: (result: string) => void;
  onClose: () => void;
}

export const Phase3Manager: React.FC<Phase3ManagerProps> = ({
  threatLevel,
  threatType,
  onPhaseComplete,
  onClose
}) => {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);

  const RITUAL_SEQUENCES = [
    {
      id: 'complete_cleansing',
      name: '🔥 Complete Spiritual Cleansing',
      description: 'Comprehensive purification of your entire energy system',
      totalDuration: 25000,
      powerLevel: 8,
      steps: [
        {
          id: 'preparation',
          name: 'Sacred Space Preparation',
          description: 'Create and consecrate your ritual space',
          duration: 5000,
          affirmation: 'This space is holy and consecrated for divine work',
          visualization: 'See brilliant white light filling your space'
        },
        {
          id: 'invocation',
          name: 'Divine Invocation',
          description: 'Call upon highest divine powers for assistance',
          duration: 5000,
          affirmation: 'I call upon the highest divine powers to assist me',
          visualization: 'Sense the presence of divine beings around you'
        },
        {
          id: 'cleansing',
          name: 'Energy System Cleansing',
          description: 'Purify all chakras, aura layers, and energy bodies',
          duration: 8000,
          affirmation: 'Divine light purifies every aspect of my being',
          visualization: 'See golden light washing through your entire energy system'
        },
        {
          id: 'protection',
          name: 'Protective Seal Installation',
          description: 'Install permanent protective barriers',
          duration: 4000,
          affirmation: 'I am permanently protected by divine love',
          visualization: 'Feel impenetrable shields forming around you'
        },
        {
          id: 'blessing',
          name: 'Divine Blessing Reception',
          description: 'Receive and anchor divine blessings',
          duration: 3000,
          affirmation: 'I receive and embody divine blessings',
          visualization: 'Golden light fills you with peace and power'
        }
      ]
    },
    {
      id: 'power_restoration',
      name: '⚡ Spiritual Power Restoration',
      description: 'Reclaim and amplify your spiritual authority',
      totalDuration: 18000,
      powerLevel: 9,
      steps: [
        {
          id: 'recognition',
          name: 'Divine Identity Recognition',
          description: 'Remember and claim your divine nature',
          duration: 4000,
          affirmation: 'I am a divine being with infinite power',
          visualization: 'See yourself as a being of pure light and power'
        },
        {
          id: 'authority',
          name: 'Spiritual Authority Activation',
          description: 'Activate your inherent spiritual authority',
          duration: 5000,
          affirmation: 'I exercise my divine authority over all spiritual forces',
          visualization: 'Feel crown of divine authority upon your head'
        },
        {
          id: 'power_reclaim',
          name: 'Power Reclamation',
          description: 'Reclaim all stolen or diminished spiritual power',
          duration: 6000,
          affirmation: 'All my power returns to me now, multiplied',
          visualization: 'See streams of golden energy returning to you'
        },
        {
          id: 'amplification',
          name: 'Power Amplification',
          description: 'Amplify your spiritual power beyond previous levels',
          duration: 3000,
          affirmation: 'My spiritual power is amplified beyond all limits',
          visualization: 'Feel your power expanding like the sun'
        }
      ]
    }
  ];

  const handleSystemComplete = (result: string) => {
    setActiveSystem(null);
    onPhaseComplete(`Phase 3 Advanced Protection: ${result}`);
  };

  if (activeSystem === 'shields') {
    return (
      <AdvancedShieldSystem
        threatLevel={threatLevel}
        onShieldActivated={(type, duration) => handleSystemComplete(`Shield ${type} activated for ${duration}ms`)}
        onClose={() => setActiveSystem(null)}
      />
    );
  }

  if (activeSystem === 'rituals') {
    return (
      <RitualSequencer
        sequences={RITUAL_SEQUENCES}
        onSequenceComplete={(id) => handleSystemComplete(`Ritual sequence ${id} completed`)}
        onClose={() => setActiveSystem(null)}
      />
    );
  }

  if (activeSystem === 'warfare') {
    return (
      <SpiritualWarfareSystem
        threatType={threatType}
        threatLevel={threatLevel}
        onBattleComplete={(result) => handleSystemComplete(`Warfare: ${result}`)}
        onClose={() => setActiveSystem(null)}
      />
    );
  }

  return (
    <Card className="bg-black/30 border-gold-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          ⚡ Phase 3: Advanced Protection Features
        </CardTitle>
        <p className="text-gold-200">
          Advanced spiritual technologies for maximum protection and power
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-gold-900/20 p-4 rounded-lg mb-4">
          <h3 className="text-gold-200 font-semibold mb-2">Phase 3 Capabilities</h3>
          <p className="text-gold-100 text-sm">
            Advanced protection systems that go beyond basic spiritual defense. These features 
            provide sophisticated spiritual technology for complex threats and power restoration.
          </p>
        </div>

        <div className="grid gap-3">
          <Button
            onClick={() => setActiveSystem('shields')}
            className="w-full p-4 h-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 text-white"
          >
            <div className="text-left w-full">
              <div className="font-semibold text-lg flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Advanced Shield Systems
              </div>
              <div className="text-sm opacity-90">
                Multi-layered divine protection with angelic fortress capabilities
              </div>
            </div>
          </Button>

          <Button
            onClick={() => setActiveSystem('rituals')}
            className="w-full p-4 h-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white"
          >
            <div className="text-left w-full">
              <div className="font-semibold text-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Ritual Sequencer
              </div>
              <div className="text-sm opacity-90">
                Guided step-by-step spiritual rituals with precise timing
              </div>
            </div>
          </Button>

          <Button
            onClick={() => setActiveSystem('warfare')}
            className="w-full p-4 h-auto bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-90 text-white"
          >
            <div className="text-left w-full">
              <div className="font-semibold text-lg flex items-center gap-2">
                <Swords className="w-5 h-5" />
                Spiritual Warfare System
              </div>
              <div className="text-sm opacity-90">
                Advanced combat protocols for spiritual battles
              </div>
            </div>
          </Button>
        </div>

        <div className="mt-6 p-4 bg-gold-900/20 rounded-lg">
          <h4 className="text-gold-200 font-semibold mb-2">⚡ Phase 3 Benefits:</h4>
          <ul className="text-gold-100 text-sm space-y-1">
            <li>• Maximum spiritual protection and power</li>
            <li>• Advanced threat neutralization capabilities</li>
            <li>• Sophisticated spiritual technology access</li>
            <li>• Complete spiritual sovereignty establishment</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-gold-500/50 text-gold-200"
          >
            Close Advanced Systems
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
