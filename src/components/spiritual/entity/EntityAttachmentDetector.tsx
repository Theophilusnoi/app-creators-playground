
import React, { useState, useEffect } from 'react';
import { Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { analyzeForEntityAttachment } from './entityAnalyzer';
import { getSeverityColor, getSeverityName, getEntityTypeDescription } from './entityUtils';
import { EntityIndicators } from './EntityIndicators';
import { EntityRemovalActions } from './EntityRemovalActions';
import { EntityAffirmation } from './EntityAffirmation';
import { DetectedEntity, EntityAttachmentDetectorProps } from './entityTypes';

export const EntityAttachmentDetector: React.FC<EntityAttachmentDetectorProps> = ({
  message,
  onEntityDetected,
  onActivateRemoval
}) => {
  const [detectedEntity, setDetectedEntity] = useState<DetectedEntity | null>(null);

  useEffect(() => {
    const entity = analyzeForEntityAttachment(message);
    setDetectedEntity(entity);
    
    if (entity) {
      onEntityDetected(entity.severity, entity.type);
    }
  }, [message, onEntityDetected]);

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

            <EntityIndicators indicators={detectedEntity.indicators} />

            <EntityRemovalActions 
              severity={detectedEntity.severity} 
              onActivateRemoval={onActivateRemoval} 
            />

            <EntityAffirmation severity={detectedEntity.severity} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
