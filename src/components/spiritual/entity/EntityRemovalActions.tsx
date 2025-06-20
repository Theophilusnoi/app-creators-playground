
import React from 'react';
import { Button } from "@/components/ui/button";
import { Zap, Shield, AlertTriangle } from "lucide-react";

interface EntityRemovalActionsProps {
  severity: number;
  onActivateRemoval: (removalType: string) => void;
}

export const EntityRemovalActions: React.FC<EntityRemovalActionsProps> = ({
  severity,
  onActivateRemoval
}) => {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      <Button
        size="sm"
        onClick={() => onActivateRemoval('entity_clearing')}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        <Zap className="w-3 h-3 mr-1" />
        Clear Entity
      </Button>

      {severity >= 2 && (
        <Button
          size="sm"
          onClick={() => onActivateRemoval('compassionate_release')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Shield className="w-3 h-3 mr-1" />
          Compassionate Release
        </Button>
      )}

      {severity >= 3 && (
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
  );
};
