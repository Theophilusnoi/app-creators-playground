
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Swords, Shield, Zap, Flame, Crown, Target } from "lucide-react";

interface SpiritualWarfareSystemProps {
  threatType: string;
  threatLevel: number;
  onBattleComplete: (result: string) => void;
  onClose: () => void;
}

export const SpiritualWarfareSystem: React.FC<SpiritualWarfareSystemProps> = ({
  threatType,
  threatLevel,
  onBattleComplete,
  onClose
}) => {
  const [activeBattle, setActiveBattle] = useState<string | null>(null);
  const [battleProgress, setBattleProgress] = useState(0);
  const [battlePhase, setBattlePhase] = useState<string>('preparation');

  const WARFARE_TACTICS = {
    defensive_stance: {
      name: '🛡️ Defensive Spiritual Stance',
      description: 'Establish strong defenses and wait for enemy to weaken',
      duration: 8000,
      effectiveness: 7,
      phases: ['shield_wall', 'prayer_barrier', 'angelic_support', 'victory_hold']
    },
    offensive_assault: {
      name: '⚔️ Direct Spiritual Assault',
      description: 'Aggressive attack on spiritual enemies',
      duration: 6000,
      effectiveness: 8,
      phases: ['battle_cry', 'charge_attack', 'spiritual_fire', 'enemy_rout']
    },
    strategic_warfare: {
      name: '🎯 Strategic Spiritual Warfare',
      description: 'Calculated multi-phase spiritual combat',
      duration: 12000,
      effectiveness: 9,
      phases: ['reconnaissance', 'positioning', 'coordinated_strike', 'enemy_banishment', 'area_securing', 'victory_blessing']
    },
    divine_intervention: {
      name: '👑 Call for Divine Intervention',
      description: 'Request direct heavenly assistance in battle',
      duration: 10000,
      effectiveness: 10,
      phases: ['throne_petition', 'angelic_deployment', 'divine_fire', 'enemy_destruction', 'holy_cleansing']
    }
  };

  const getBattleCommands = (tacticKey: string) => {
    const commands: Record<string, Record<string, string[]>> = {
      defensive_stance: {
        shield_wall: [
          "Raise your spiritual shield in the name of divine protection",
          "Declare: 'No weapon formed against me shall prosper'",
          "Visualize an impenetrable wall of light around you"
        ],
        prayer_barrier: [
          "Create a barrier through continuous prayer",
          "Speak: 'Divine love surrounds and protects me'",
          "Feel the power of prayer strengthening your defenses"
        ],
        angelic_support: [
          "Call upon your guardian angels for backup",
          "Request: 'Angels of God, come to my defense'",
          "See mighty angels taking position around you"
        ],
        victory_hold: [
          "Maintain your defensive position with confidence",
          "Affirm: 'I stand victorious in divine strength'",
          "Hold the ground you have claimed"
        ]
      },
      offensive_assault: {
        battle_cry: [
          "Shout your spiritual war cry with authority",
          "Declare: 'I come in the name of the Most High!'",
          "Let your voice echo with divine power"
        ],
        charge_attack: [
          "Advance against the enemy with courage",
          "Command: 'Flee from me, all forces of darkness!'",
          "Move forward in unwavering faith"
        ],
        spiritual_fire: [
          "Release spiritual fire upon your enemies",
          "Pray: 'Let divine fire consume all opposition'",
          "Visualize holy flames burning away all threats"
        ],
        enemy_rout: [
          "Chase the retreating enemy forces",
          "Shout: 'You have no power here anymore!'",
          "Ensure complete victory over all opposition"
        ]
      }
    };

    return commands[tacticKey] || {};
  };

  const startBattle = async (tacticKey: string) => {
    const tactic = WARFARE_TACTICS[tacticKey as keyof typeof WARFARE_TACTICS];
    if (!tactic) return;

    setActiveBattle(tacticKey);
    setBattleProgress(0);
    setBattlePhase('preparation');

    // Progress through battle phases
    let currentPhase = 0;
    const phaseInterval = setInterval(() => {
      if (currentPhase < tactic.phases.length) {
        setBattlePhase(tactic.phases[currentPhase]);
        currentPhase++;
      } else {
        clearInterval(phaseInterval);
        setBattlePhase('victory');
      }
    }, tactic.duration / tactic.phases.length);

    // Overall progress
    const progressInterval = setInterval(() => {
      setBattleProgress(prev => {
        const next = prev + (100 / (tactic.duration / 100));
        if (next >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setActiveBattle(null);
            setBattleProgress(0);
            setBattlePhase('preparation');
            onBattleComplete(`Victory achieved using ${tactic.name}`);
          }, 1000);
          return 100;
        }
        return next;
      });
    }, 100);
  };

  const getPhaseCommands = () => {
    if (!activeBattle) return [];
    const commands = getBattleCommands(activeBattle);
    return commands[battlePhase] || [];
  };

  if (activeBattle) {
    const tactic = WARFARE_TACTICS[activeBattle as keyof typeof WARFARE_TACTICS];
    const phaseCommands = getPhaseCommands();

    return (
      <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/50">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-xl flex items-center justify-center gap-2">
            <Swords className="w-6 h-6 text-red-400 animate-pulse" />
            {tactic.name}
            <Swords className="w-6 h-6 text-red-400 animate-pulse" />
          </CardTitle>
          <div className="w-full bg-red-900/50 rounded-full h-3 mt-4">
            <div 
              className="bg-gradient-to-r from-red-400 to-orange-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${battleProgress}%` }}
            />
          </div>
          <p className="text-red-200 text-sm mt-2">
            Battle Progress: {Math.round(battleProgress)}% • Phase: {battlePhase.replace('_', ' ').toUpperCase()}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-red-900/20 p-4 rounded-lg">
            <h4 className="text-red-200 font-semibold mb-3">⚔️ Current Battle Phase:</h4>
            <div className="space-y-3">
              {phaseCommands.map((command, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">{index + 1}.</span>
                  <span className="text-red-100 text-sm">{command}</span>
                </div>
              ))}
            </div>
          </div>

          {battlePhase === 'victory' && (
            <div className="bg-gold-900/20 p-4 rounded-lg border border-gold-500/50">
              <h4 className="text-gold-200 font-semibold mb-2">🏆 VICTORY ACHIEVED!</h4>
              <p className="text-gold-100 text-sm">
                The spiritual battle has been won! All enemy forces have been defeated and banished.
                Your spiritual territory is now secure.
              </p>
            </div>
          )}

          <div className="text-center mt-4">
            <p className="text-white text-sm font-bold">
              ⚔️ Fight with divine authority! Victory is yours! ⚔️
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/30 border-red-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Swords className="w-5 h-5 text-red-400" />
          Spiritual Warfare System
          <Swords className="w-5 h-5 text-red-400" />
        </CardTitle>
        <p className="text-red-200">
          Threat: {threatType.replace('_', ' ').toUpperCase()} • Level: {threatLevel}/4
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-red-900/20 p-4 rounded-lg mb-4">
          <h3 className="text-red-200 font-semibold mb-2">Spiritual Combat Protocols</h3>
          <p className="text-red-100 text-sm">
            Advanced spiritual warfare tactics for engaging and defeating spiritual enemies. 
            Choose your strategy based on the threat level and your combat preferences.
          </p>
        </div>

        <div className="grid gap-3">
          {Object.entries(WARFARE_TACTICS).map(([key, tactic]) => (
            <Button
              key={key}
              onClick={() => startBattle(key)}
              className={`w-full p-4 h-auto bg-gradient-to-r ${
                tactic.effectiveness >= 10 ? 'from-red-600 to-gold-600' :
                tactic.effectiveness >= 9 ? 'from-red-600 to-orange-600' :
                tactic.effectiveness >= 8 ? 'from-red-600 to-red-700' :
                'from-red-600 to-red-800'
              } hover:opacity-90 text-white`}
            >
              <div className="text-left w-full">
                <div className="font-semibold text-lg">{tactic.name}</div>
                <div className="text-sm opacity-90">{tactic.description}</div>
                <div className="text-xs mt-1 opacity-75">
                  Effectiveness: {tactic.effectiveness}/10 • Duration: {tactic.duration/1000}s
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-red-900/20 rounded-lg">
          <h4 className="text-red-200 font-semibold mb-2">⚔️ Warfare Principles:</h4>
          <ul className="text-red-100 text-sm space-y-1">
            <li>• Authority comes from divine connection</li>
            <li>• Faith and courage are your weapons</li>
            <li>• Spiritual battles are won in the mind first</li>
            <li>• Victory belongs to those who stand in truth</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-red-500/50 text-red-200"
          >
            Close Warfare System
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
