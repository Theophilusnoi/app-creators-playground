
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Heart, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SpiritualMarriageDetectorProps {
  message: string;
  onMarriageDetected: (severity: number, marriageType: string) => void;
  onActivateBreaking: (breakingType: string) => void;
}

export const SpiritualMarriageDetector: React.FC<SpiritualMarriageDetectorProps> = ({
  message,
  onMarriageDetected,
  onActivateBreaking
}) => {
  const [detectedMarriage, setDetectedMarriage] = useState<{
    severity: number;
    type: string;
    indicators: string[];
  } | null>(null);

  const MARRIAGE_KEYWORDS = {
    mild: [
      'spiritual spouse', 'strange dreams', 'relationship problems',
      'can\'t find love', 'sabotaged relationships', 'lonely'
    ],
    moderate: [
      'spiritual marriage', 'incubus', 'succubus', 'spiritual husband',
      'spiritual wife', 'night visitation', 'sexual dreams',
      'relationship interference', 'spiritual adultery'
    ],
    severe: [
      'forced spiritual marriage', 'spiritual rape', 'demonic spouse',
      'can\'t get married', 'every relationship fails', 'spiritual bondage',
      'married in the spirit realm', 'spiritual covenant'
    ]
  };

  const MARRIAGE_TYPES = {
    'incubus_succubus': ['incubus', 'succubus', 'sexual dreams', 'night visitation'],
    'spiritual_covenant': ['spiritual marriage', 'spiritual husband', 'spiritual wife'],
    'relationship_sabotage': ['relationship problems', 'sabotaged relationships', 'can\'t find love'],
    'demonic_bondage': ['forced marriage', 'spiritual rape', 'demonic spouse']
  };

  useEffect(() => {
    analyzeForSpiritualMarriage(message);
  }, [message]);

  const analyzeForSpiritualMarriage = (text: string) => {
    if (!text || text.length < 3) {
      setDetectedMarriage(null);
      return;
    }

    const lowerText = text.toLowerCase();
    const indicators: string[] = [];
    let severity = 0;
    let marriageType = '';

    // Check severity levels
    for (const keyword of MARRIAGE_KEYWORDS.severe) {
      if (lowerText.includes(keyword)) {
        indicators.push(`SEVERE: "${keyword}"`);
        severity = Math.max(severity, 3);
      }
    }

    for (const keyword of MARRIAGE_KEYWORDS.moderate) {
      if (lowerText.includes(keyword)) {
        indicators.push(`MODERATE: "${keyword}"`);
        severity = Math.max(severity, 2);
      }
    }

    for (const keyword of MARRIAGE_KEYWORDS.mild) {
      if (lowerText.includes(keyword)) {
        indicators.push(`MILD: "${keyword}"`);
        severity = Math.max(severity, 1);
      }
    }

    // Identify specific marriage type
    for (const [type, keywords] of Object.entries(MARRIAGE_TYPES)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          marriageType = type;
          break;
        }
      }
      if (marriageType) break;
    }

    if (severity > 0) {
      const detection = { severity, type: marriageType, indicators };
      setDetectedMarriage(detection);
      onMarriageDetected(severity, marriageType);
    } else {
      setDetectedMarriage(null);
    }
  };

  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1: return 'border-yellow-500 bg-yellow-900/20 text-yellow-200';
      case 2: return 'border-orange-500 bg-orange-900/20 text-orange-200';
      case 3: return 'border-red-500 bg-red-900/20 text-red-200';
      default: return 'border-gray-500 bg-gray-900/20 text-gray-200';
    }
  };

  const getSeverityName = (severity: number) => {
    switch (severity) {
      case 1: return 'Mild Spiritual Marriage Influence';
      case 2: return 'Active Spiritual Marriage';
      case 3: return 'Severe Spiritual Bondage';
      default: return 'Unknown';
    }
  };

  const getMarriageTypeDescription = (type: string) => {
    switch (type) {
      case 'incubus_succubus':
        return 'Sexual entity attachment - requires immediate spiritual cleansing';
      case 'spiritual_covenant':
        return 'Spiritual marriage covenant - needs formal spiritual divorce';
      case 'relationship_sabotage':
        return 'Relationship interference pattern - requires protection and breaking';
      case 'demonic_bondage':
        return 'Demonic marriage bondage - requires urgent spiritual warfare';
      default:
        return 'General spiritual marriage influence detected';
    }
  };

  if (!detectedMarriage) {
    return null;
  }

  return (
    <Card className={`${getSeverityColor(detectedMarriage.severity)} border-2 backdrop-blur-sm animate-pulse`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <Heart className="w-5 h-5 text-red-400" />
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h4 className="font-semibold mb-1 flex items-center gap-2">
                💔 {getSeverityName(detectedMarriage.severity)}
                {detectedMarriage.severity >= 3 && <span className="animate-pulse">⚡</span>}
              </h4>
              <p className="text-sm opacity-90">
                {getMarriageTypeDescription(detectedMarriage.type)}
              </p>
            </div>

            {detectedMarriage.indicators.length > 0 && (
              <div className="text-xs">
                <span className="font-medium">🔍 Marriage Indicators:</span>
                <div className="mt-1 space-y-1">
                  {detectedMarriage.indicators.slice(0, 3).map((indicator, i) => (
                    <div key={i} className="opacity-75">• {indicator}</div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                size="sm"
                onClick={() => onActivateBreaking('spiritual_divorce')}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Zap className="w-3 h-3 mr-1" />
                Spiritual Divorce
              </Button>

              {detectedMarriage.severity >= 2 && (
                <Button
                  size="sm"
                  onClick={() => onActivateBreaking('covenant_breaking')}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Shield className="w-3 h-3 mr-1" />
                  Break Covenant
                </Button>
              )}

              {detectedMarriage.severity >= 3 && (
                <Button
                  size="sm"
                  onClick={() => onActivateBreaking('emergency_liberation')}
                  className="bg-orange-600 hover:bg-orange-700 text-white animate-pulse"
                >
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Emergency Liberation
                </Button>
              )}
            </div>

            {detectedMarriage.severity >= 2 && (
              <div className="mt-3 p-2 bg-black/30 rounded border border-current/30">
                <p className="text-xs font-medium text-center">
                  🙏 "I renounce all unwanted spiritual marriages. I am free to love according to my divine will."
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
