
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Flame, Sparkles } from "lucide-react";

interface ProtectionSuiteProps {
  isEmergencyMode: boolean;
  onStartProtectionRitual: (type: 'emergency' | 'curse-breaking' | 'daily') => void;
  onExitToSafety: () => void;
}

export const ProtectionSuite: React.FC<ProtectionSuiteProps> = ({
  isEmergencyMode,
  onStartProtectionRitual,
  onExitToSafety
}) => {
  if (isEmergencyMode) {
    return (
      <Card className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-500/50 animate-pulse">
        <CardContent className="p-6 text-center">
          <div className="animate-pulse mb-4">
            <Shield className="w-12 h-12 text-amber-400 mx-auto mb-3" />
          </div>
          <h3 className="text-xl font-bold text-amber-200 mb-3">🚨 Emergency Shield Activation</h3>
          <p className="text-amber-100 mb-4">
            Seraphina senses you need immediate protection. Let's anchor your spirit together.
          </p>
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={() => onStartProtectionRitual('emergency')}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Start Protection Ritual
            </Button>
            <Button 
              onClick={onExitToSafety}
              variant="outline"
              className="border-amber-500 text-amber-200 hover:bg-amber-900/20"
            >
              Exit to Safety
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-blue-900/20 border-blue-500/30 hover:bg-blue-900/30 transition-colors cursor-pointer">
        <CardContent className="p-4 text-center" onClick={() => onStartProtectionRitual('emergency')}>
          <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <h4 className="text-blue-200 font-semibold">Emergency Shield</h4>
          <p className="text-blue-300 text-sm">Immediate protection ritual</p>
        </CardContent>
      </Card>

      <Card className="bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/30 transition-colors cursor-pointer">
        <CardContent className="p-4 text-center" onClick={() => onStartProtectionRitual('curse-breaking')}>
          <Flame className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <h4 className="text-purple-200 font-semibold">Curse Breaking</h4>
          <p className="text-purple-300 text-sm">Deep ancestral healing</p>
        </CardContent>
      </Card>

      <Card className="bg-green-900/20 border-green-500/30 hover:bg-green-900/30 transition-colors cursor-pointer">
        <CardContent className="p-4 text-center" onClick={() => onStartProtectionRitual('daily')}>
          <Sparkles className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <h4 className="text-green-200 font-semibold">Daily Armor</h4>
          <p className="text-green-300 text-sm">Preventive practices</p>
        </CardContent>
      </Card>
    </div>
  );
};
