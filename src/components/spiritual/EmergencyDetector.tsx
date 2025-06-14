
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmergencyLevel {
  level: number;
  name: string;
  color: string;
  description: string;
  protocols: string[];
}

const EMERGENCY_LEVELS: EmergencyLevel[] = [
  {
    level: 1,
    name: 'Spiritual Distress',
    color: 'yellow',
    description: 'Mild anxiety or spiritual confusion',
    protocols: ['Guided breathing', 'Light visualization', 'Grounding exercises']
  },
  {
    level: 2,
    name: 'Spiritual Crisis',
    color: 'orange',
    description: 'Significant spiritual emergency requiring immediate intervention',
    protocols: ['Emergency shield', 'Divine invocation', 'Protective rituals']
  },
  {
    level: 3,
    name: 'Critical Emergency',
    color: 'red',
    description: 'Severe crisis requiring human specialist intervention',
    protocols: ['Immediate human connection', 'Crisis hotline', 'Emergency services']
  }
];

interface EmergencyDetectorProps {
  message: string;
  onEmergencyDetected: (level: number) => void;
  onEscalate: () => void;
}

export const EmergencyDetector: React.FC<EmergencyDetectorProps> = ({
  message,
  onEmergencyDetected,
  onEscalate
}) => {
  const [detectedLevel, setDetectedLevel] = useState<number>(0);
  const [riskFactors, setRiskFactors] = useState<string[]>([]);

  const CRISIS_KEYWORDS = {
    level1: [
      'anxious', 'worried', 'confused', 'lost', 'overwhelmed',
      'sad', 'lonely', 'helpless', 'disconnected'
    ],
    level2: [
      'under attack', 'haunted', 'cursed', 'unsafe', 'evil',
      'dark forces', 'spiritual attack', 'possessed', 'demonic',
      'negative entities', 'can\'t sleep', 'strange things happening',
      'bad energy', 'nightmare', 'terrified'
    ],
    level3: [
      'kill myself', 'end it all', 'don\'t want to live', 'suicide',
      'hurt myself', 'no point living', 'better off dead',
      'voices telling me to', 'going to jump', 'going to hurt'
    ]
  };

  useEffect(() => {
    analyzeMessage(message);
  }, [message]);

  const analyzeMessage = (text: string) => {
    if (!text || text.length < 3) {
      setDetectedLevel(0);
      return;
    }

    const lowerText = text.toLowerCase();
    const foundFactors: string[] = [];
    let highestLevel = 0;

    // Check Level 3 (Critical) first
    for (const keyword of CRISIS_KEYWORDS.level3) {
      if (lowerText.includes(keyword)) {
        foundFactors.push(`Critical: "${keyword}"`);
        highestLevel = Math.max(highestLevel, 3);
      }
    }

    // Check Level 2 (Crisis)
    for (const keyword of CRISIS_KEYWORDS.level2) {
      if (lowerText.includes(keyword)) {
        foundFactors.push(`Crisis: "${keyword}"`);
        highestLevel = Math.max(highestLevel, 2);
      }
    }

    // Check Level 1 (Distress)
    for (const keyword of CRISIS_KEYWORDS.level1) {
      if (lowerText.includes(keyword)) {
        foundFactors.push(`Distress: "${keyword}"`);
        highestLevel = Math.max(highestLevel, 1);
      }
    }

    setRiskFactors(foundFactors);
    setDetectedLevel(highestLevel);

    if (highestLevel > 0) {
      onEmergencyDetected(highestLevel);
    }
  };

  const getCurrentLevel = () => {
    return EMERGENCY_LEVELS.find(l => l.level === detectedLevel);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'yellow':
        return 'border-yellow-500 bg-yellow-900/20 text-yellow-200';
      case 'orange':
        return 'border-orange-500 bg-orange-900/20 text-orange-200';
      case 'red':
        return 'border-red-500 bg-red-900/20 text-red-200';
      default:
        return 'border-gray-500 bg-gray-900/20 text-gray-200';
    }
  };

  if (detectedLevel === 0) {
    return null;
  }

  const currentLevel = getCurrentLevel();
  if (!currentLevel) return null;

  return (
    <Card className={`${getColorClasses(currentLevel.color)} border backdrop-blur-sm`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {detectedLevel === 3 ? (
              <AlertTriangle className="w-5 h-5 text-red-400" />
            ) : detectedLevel === 2 ? (
              <Shield className="w-5 h-5 text-orange-400" />
            ) : (
              <Heart className="w-5 h-5 text-yellow-400" />
            )}
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h4 className="font-semibold mb-1">
                {currentLevel.name} Detected
              </h4>
              <p className="text-sm opacity-90">
                {currentLevel.description}
              </p>
            </div>

            {riskFactors.length > 0 && (
              <div className="text-xs">
                <span className="font-medium">Detected indicators:</span>
                <div className="mt-1 space-y-1">
                  {riskFactors.slice(0, 3).map((factor, i) => (
                    <div key={i} className="opacity-75">• {factor}</div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="text-sm font-medium">Active Protocols:</div>
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

            {detectedLevel >= 2 && (
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={onEscalate}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Connect Specialist
                </Button>
                
                {detectedLevel === 3 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open('tel:988', '_blank')}
                    className="border-red-500 text-red-300 hover:bg-red-900/30"
                  >
                    Crisis Hotline (988)
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
