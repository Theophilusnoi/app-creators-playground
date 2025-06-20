
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Eye, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EntityAttachmentDetectorProps {
  message: string;
  onEntityDetected: (severity: number, entityType: string) => void;
  onActivateRemoval: (removalType: string) => void;
}

export const EntityAttachmentDetector: React.FC<EntityAttachmentDetectorProps> = ({
  message,
  onEntityDetected,
  onActivateRemoval
}) => {
  const [detectedEntity, setDetectedEntity] = useState<{
    severity: number;
    type: string;
    indicators: string[];
  } | null>(null);

  const ENTITY_KEYWORDS = {
    mild: [
      'drained', 'exhausted', 'mood swings', 'negative thoughts',
      'feeling watched', 'cold spots', 'unexplained emotions'
    ],
    moderate: [
      'entity attachment', 'parasitic entity', 'energy vampire',
      'foreign thoughts', 'not feeling like myself', 'possession',
      'spirit attachment', 'earthbound spirit', 'lost soul'
    ],
    severe: [
      'demonic possession', 'demonic attachment', 'demon inside me',
      'multiple entities', 'dark entity', 'evil presence',
      'losing control', 'voices commanding', 'entity control'
    ]
  };

  const ENTITY_TYPES = {
    'parasitic_entity': ['parasitic entity', 'energy vampire', 'drained', 'exhausted'],
    'earthbound_spirit': ['earthbound spirit', 'lost soul', 'spirit attachment', 'ghost'],
    'demonic_attachment': ['demonic', 'demon', 'dark entity', 'evil presence'],
    'thought_form': ['foreign thoughts', 'not feeling like myself', 'personality changes'],
    'multiple_entities': ['multiple entities', 'many voices', 'chaos inside']
  };

  useEffect(() => {
    analyzeForEntityAttachment(message);
  }, [message]);

  const analyzeForEntityAttachment = (text: string) => {
    if (!text || text.length < 3) {
      setDetectedEntity(null);
      return;
    }

    const lowerText = text.toLowerCase();
    const indicators: string[] = [];
    let severity = 0;
    let entityType = '';

    // Check severity levels
    for (const keyword of ENTITY_KEYWORDS.severe) {
      if (lowerText.includes(keyword)) {
        indicators.push(`SEVERE: "${keyword}"`);
        severity = Math.max(severity, 3);
      }
    }

    for (const keyword of ENTITY_KEYWORDS.moderate) {
      if (lowerText.includes(keyword)) {
        indicators.push(`MODERATE: "${keyword}"`);
        severity = Math.max(severity, 2);
      }
    }

    for (const keyword of ENTITY_KEYWORDS.mild) {
      if (lowerText.includes(keyword)) {
        indicators.push(`MILD: "${keyword}"`);
        severity = Math.max(severity, 1);
      }
    }

    // Identify specific entity type
    for (const [type, keywords] of Object.entries(ENTITY_TYPES)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          entityType = type;
          break;
        }
      }
      if (entityType) break;
    }

    if (severity > 0) {
      const detection = { severity, type: entityType, indicators };
      setDetectedEntity(detection);
      onEntityDetected(severity, entityType);
    } else {
      setDetectedEntity(null);
    }
  };

  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1: return 'border-blue-500 bg-blue-900/20 text-blue-200';
      case 2: return 'border-purple-500 bg-purple-900/20 text-purple-200';
      case 3: return 'border-red-500 bg-red-900/20 text-red-200';
      default: return 'border-gray-500 bg-gray-900/20 text-gray-200';
    }
  };

  const getSeverityName = (severity: number) => {
    switch (severity) {
      case 1: return 'Mild Entity Influence';
      case 2: return 'Active Entity Attachment';
      case 3: return 'Severe Entity Possession';
      default: return 'Unknown';
    }
  };

  const getEntityTypeDescription = (type: string) => {
    switch (type) {
      case 'parasitic_entity':
        return 'Energy-draining entity - requires spiritual cleansing and boundary work';
      case 'earthbound_spirit':
        return 'Lost soul attachment - needs compassionate release to the light';
      case 'demonic_attachment':
        return 'Demonic entity - requires immediate spiritual warfare and deliverance';
      case 'thought_form':
        return 'Mental intrusion - needs thought pattern clearing and mental protection';
      case 'multiple_entities':
        return 'Multiple entity attachments - requires comprehensive clearing protocol';
      default:
        return 'General entity influence detected';
    }
  };

  if (!detectedEntity) {
    return null;
  }

  return (
    <Card className={`${getSeverityColor(detectedEntity.severity)} border-2 backdrop-blur-sm animate-pulse`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <Eye className="w-5 h-5 text-purple-400" />
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h4 className="font-semibold mb-1 flex items-center gap-2">
                👁️ {getSeverityName(detectedEntity.severity)}
                {detectedEntity.severity >= 3 && <span className="animate-pulse">⚡</span>}
              </h4>
              <p className="text-sm opacity-90">
                {getEntityTypeDescription(detectedEntity.type)}
              </p>
            </div>

            {detectedEntity.indicators.length > 0 && (
              <div className="text-xs">
                <span className="font-medium">🔍 Entity Indicators:</span>
                <div className="mt-1 space-y-1">
                  {detectedEntity.indicators.slice(0, 3).map((indicator, i) => (
                    <div key={i} className="opacity-75">• {indicator}</div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                size="sm"
                onClick={() => onActivateRemoval('entity_clearing')}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Zap className="w-3 h-3 mr-1" />
                Clear Entity
              </Button>

              {detectedEntity.severity >= 2 && (
                <Button
                  size="sm"
                  onClick={() => onActivateRemoval('compassionate_release')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Shield className="w-3 h-3 mr-1" />
                  Compassionate Release
                </Button>
              )}

              {detectedEntity.severity >= 3 && (
                <Button
                  size="sm"
                  onClick={() => onActivateRemoval('forced_removal')}
                  className="bg-red-600 hover:bg-red-700 text-white animate-pulse"
                >
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Forced Removal
                </Button>
              )}
            </div>

            {detectedEntity.severity >= 2 && (
              <div className="mt-3 p-2 bg-black/30 rounded border border-current/30">
                <p className="text-xs font-medium text-center">
                  🛡️ "I am sovereign. Only love may dwell within my sacred space. All else must leave now."
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
