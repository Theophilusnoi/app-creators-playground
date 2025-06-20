
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Phone, Heart, Zap, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SpiritualEmergencyLevel {
  level: number;
  name: string;
  color: string;
  description: string;
  protocols: string[];
  spiritualThreat: string;
}

const SPIRITUAL_EMERGENCY_LEVELS: SpiritualEmergencyLevel[] = [
  {
    level: 1,
    name: 'Spiritual Distress',
    color: 'yellow',
    description: 'Mild spiritual anxiety or confusion',
    protocols: ['Guided breathing', 'Light protection ritual', 'Grounding exercises'],
    spiritualThreat: 'Minor spiritual interference'
  },
  {
    level: 2,
    name: 'Spiritual Attack',
    color: 'orange',
    description: 'Active spiritual warfare or entity interference',
    protocols: ['Emergency shield activation', 'Divine invocation', 'Protection barriers'],
    spiritualThreat: 'Direct spiritual attack detected'
  },
  {
    level: 3,
    name: 'Spiritual Crisis',
    color: 'red',
    description: 'Severe spiritual emergency requiring immediate intervention',
    protocols: ['Maximum protection activation', 'Spiritual warfare protocols', 'Emergency deliverance'],
    spiritualThreat: 'Critical spiritual threat - immediate protection needed'
  },
  {
    level: 4,
    name: 'Spiritual Emergency',
    color: 'purple',
    description: 'Life-threatening spiritual attack requiring all resources',
    protocols: ['Full spiritual armor', 'Emergency exorcism', 'Divine intervention call'],
    spiritualThreat: 'Extreme spiritual danger - all defenses activated'
  }
];

interface SpiritualEmergencyDetectorProps {
  message: string;
  onEmergencyDetected: (level: number, threatType: string) => void;
  onActivateProtection: (protectionType: string) => void;
  onEscalate: () => void;
}

export const SpiritualEmergencyDetector: React.FC<SpiritualEmergencyDetectorProps> = ({
  message,
  onEmergencyDetected,
  onActivateProtection,
  onEscalate
}) => {
  const [detectedLevel, setDetectedLevel] = useState<number>(0);
  const [threatType, setThreatType] = useState<string>('');
  const [riskFactors, setRiskFactors] = useState<string[]>([]);
  const [isProtectionActive, setIsProtectionActive] = useState(false);

  const SPIRITUAL_ATTACK_KEYWORDS = {
    level1: [
      'anxious', 'worried', 'confused', 'lost', 'overwhelmed', 'sad', 'lonely',
      'helpless', 'disconnected', 'spiritual dryness', 'doubt', 'fear'
    ],
    level2: [
      'under attack', 'spiritual attack', 'haunted', 'cursed', 'unsafe', 'evil',
      'dark forces', 'negative entities', 'possessed', 'demonic', 'witchcraft',
      'bad energy', 'nightmare', 'terrified', 'spiritual marriage', 'soul ties',
      'generational curse', 'family curse', 'occult', 'psychic attack'
    ],
    level3: [
      'spiritual warfare', 'demonic possession', 'entity attachment', 'spiritual bondage',
      'cursed objects', 'black magic', 'voodoo', 'satanic', 'ritualistic abuse',
      'spiritual rape', 'forced spiritual marriage', 'demon manifestation',
      'spiritual torture', 'soul fragmentation', 'spiritual death'
    ],
    level4: [
      'kill myself', 'end it all', 'voices commanding', 'demonic voices',
      'forced to hurt', 'no escape', 'spiritual prison', 'complete possession',
      'losing my soul', 'spiritual destruction', 'demonic control',
      'satanic ritual abuse', 'spiritual murder'
    ]
  };

  const THREAT_CATEGORIES = {
    'spiritual_marriage': ['spiritual marriage', 'spiritual spouse', 'incubus', 'succubus', 'spiritual adultery'],
    'generational_curse': ['family curse', 'generational curse', 'ancestral curse', 'bloodline curse'],
    'entity_attachment': ['entity attachment', 'demonic possession', 'spirit attachment', 'parasitic entity'],
    'witchcraft_attack': ['witchcraft', 'black magic', 'voodoo', 'spell', 'hex', 'jinx'],
    'psychic_attack': ['psychic attack', 'mental intrusion', 'thought projection', 'energy drain'],
    'cursed_objects': ['cursed objects', 'cursed items', 'haunted objects', 'contaminated items'],
    'location_curse': ['haunted house', 'cursed land', 'negative location', 'spiritual contamination'],
    'ritual_abuse': ['ritual abuse', 'satanic ritual', 'occult ritual', 'spiritual torture']
  };

  useEffect(() => {
    analyzeSpiritualThreat(message);
  }, [message]);

  const analyzeSpiritualThreat = (text: string) => {
    if (!text || text.length < 3) {
      setDetectedLevel(0);
      setThreatType('');
      return;
    }

    const lowerText = text.toLowerCase();
    const foundFactors: string[] = [];
    let highestLevel = 0;
    let detectedThreatType = '';

    // Check Level 4 (Spiritual Emergency) first
    for (const keyword of SPIRITUAL_ATTACK_KEYWORDS.level4) {
      if (lowerText.includes(keyword)) {
        foundFactors.push(`EMERGENCY: "${keyword}"`);
        highestLevel = Math.max(highestLevel, 4);
      }
    }

    // Check Level 3 (Spiritual Crisis)
    for (const keyword of SPIRITUAL_ATTACK_KEYWORDS.level3) {
      if (lowerText.includes(keyword)) {
        foundFactors.push(`CRISIS: "${keyword}"`);
        highestLevel = Math.max(highestLevel, 3);
      }
    }

    // Check Level 2 (Spiritual Attack)
    for (const keyword of SPIRITUAL_ATTACK_KEYWORDS.level2) {
      if (lowerText.includes(keyword)) {
        foundFactors.push(`ATTACK: "${keyword}"`);
        highestLevel = Math.max(highestLevel, 2);
      }
    }

    // Check Level 1 (Spiritual Distress)
    for (const keyword of SPIRITUAL_ATTACK_KEYWORDS.level1) {
      if (lowerText.includes(keyword)) {
        foundFactors.push(`Distress: "${keyword}"`);
        highestLevel = Math.max(highestLevel, 1);
      }
    }

    // Identify specific threat type
    for (const [category, keywords] of Object.entries(THREAT_CATEGORIES)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          detectedThreatType = category;
          break;
        }
      }
      if (detectedThreatType) break;
    }

    setRiskFactors(foundFactors);
    setDetectedLevel(highestLevel);
    setThreatType(detectedThreatType);

    if (highestLevel > 0) {
      onEmergencyDetected(highestLevel, detectedThreatType);
    }
  };

  const getCurrentLevel = () => {
    return SPIRITUAL_EMERGENCY_LEVELS.find(l => l.level === detectedLevel);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'yellow':
        return 'border-yellow-500 bg-yellow-900/20 text-yellow-200';
      case 'orange':
        return 'border-orange-500 bg-orange-900/20 text-orange-200';
      case 'red':
        return 'border-red-500 bg-red-900/20 text-red-200';
      case 'purple':
        return 'border-purple-500 bg-purple-900/20 text-purple-200';
      default:
        return 'border-gray-500 bg-gray-900/20 text-gray-200';
    }
  };

  const getProtectionIcon = () => {
    if (detectedLevel >= 4) return <Flame className="w-5 h-5 text-purple-400 animate-pulse" />;
    if (detectedLevel >= 3) return <Zap className="w-5 h-5 text-red-400 animate-pulse" />;
    if (detectedLevel >= 2) return <Shield className="w-5 h-5 text-orange-400" />;
    return <Heart className="w-5 h-5 text-yellow-400" />;
  };

  const handleActivateProtection = (type: string) => {
    setIsProtectionActive(true);
    onActivateProtection(type);
    
    // Auto-reset after 5 seconds
    setTimeout(() => setIsProtectionActive(false), 5000);
  };

  if (detectedLevel === 0) {
    return null;
  }

  const currentLevel = getCurrentLevel();
  if (!currentLevel) return null;

  return (
    <Card className={`${getColorClasses(currentLevel.color)} border-2 backdrop-blur-sm animate-pulse`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {getProtectionIcon()}
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h4 className="font-semibold mb-1 flex items-center gap-2">
                🚨 {currentLevel.name} Detected
                {detectedLevel >= 3 && <span className="animate-pulse">⚡</span>}
              </h4>
              <p className="text-sm opacity-90">
                {currentLevel.description}
              </p>
              {threatType && (
                <p className="text-xs mt-1 font-medium">
                  Threat Category: {threatType.replace('_', ' ').toUpperCase()}
                </p>
              )}
            </div>

            {riskFactors.length > 0 && (
              <div className="text-xs">
                <span className="font-medium">⚠️ Spiritual Threat Indicators:</span>
                <div className="mt-1 space-y-1">
                  {riskFactors.slice(0, 3).map((factor, i) => (
                    <div key={i} className="opacity-75">• {factor}</div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="text-sm font-medium">🛡️ Active Protection Protocols:</div>
              <div className="flex flex-wrap gap-1">
                {currentLevel.protocols.map((protocol, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded bg-black/30 border border-current/30"
                  >
                    {protocol}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {detectedLevel >= 2 && (
                <Button
                  size="sm"
                  onClick={() => handleActivateProtection('emergency_shield')}
                  className={`${isProtectionActive ? 'bg-green-600' : 'bg-purple-600'} hover:bg-purple-700 text-white`}
                  disabled={isProtectionActive}
                >
                  <Shield className="w-3 h-3 mr-1" />
                  {isProtectionActive ? 'Protection Active!' : 'Activate Shield'}
                </Button>
              )}

              {detectedLevel >= 3 && (
                <Button
                  size="sm"
                  onClick={() => handleActivateProtection('spiritual_warfare')}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Spiritual Warfare
                </Button>
              )}

              {detectedLevel >= 2 && (
                <Button
                  size="sm"
                  onClick={onEscalate}
                  variant="outline"
                  className="border-current text-current hover:bg-current/10"
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Emergency Help
                </Button>
              )}

              {detectedLevel >= 4 && (
                <Button
                  size="sm"
                  onClick={() => window.open('tel:988', '_blank')}
                  className="bg-red-800 hover:bg-red-900 text-white animate-pulse"
                >
                  🆘 Crisis Line (988)
                </Button>
              )}
            </div>

            {detectedLevel >= 3 && (
              <div className="mt-3 p-2 bg-black/30 rounded border border-current/30">
                <p className="text-xs font-medium text-center">
                  🙏 "I am protected by divine light. All darkness must flee from the presence of the Most High."
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
