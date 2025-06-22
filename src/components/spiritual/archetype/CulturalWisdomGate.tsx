
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Heart, Crown, AlertTriangle, Check } from "lucide-react";
import { CulturalTradition } from '@/types/archetype';
import { CulturalWisdomPage } from './CulturalWisdomPage';

interface CulturalWisdomGateProps {
  tradition: CulturalTradition;
  userLevel: 'beginner' | 'initiated' | 'advanced';
  onAccessGranted: () => void;
  onAccessDenied: (reason: string) => void;
}

export const CulturalWisdomGate: React.FC<CulturalWisdomGateProps> = ({
  tradition,
  userLevel,
  onAccessGranted,
  onAccessDenied
}) => {
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  const [understandsResponsibility, setUnderstandsResponsibility] = useState(false);
  const [showWisdomPage, setShowWisdomPage] = useState(false);

  const canAccess = () => {
    switch (tradition.accessLevel) {
      case 'open':
        return true;
      case 'initiated':
        return userLevel === 'initiated' || userLevel === 'advanced';
      case 'sacred':
        return userLevel === 'advanced';
      default:
        return false;
    }
  };

  const handleAccessRequest = () => {
    if (!hasAcknowledged || !understandsResponsibility) {
      onAccessDenied('Please acknowledge all requirements before proceeding.');
      return;
    }

    if (!canAccess()) {
      onAccessDenied(`This sacred content requires ${tradition.accessLevel} level access. Continue your spiritual journey to unlock higher wisdom.`);
      return;
    }

    setShowWisdomPage(true);
    onAccessGranted();
  };

  const getAccessIcon = () => {
    switch (tradition.accessLevel) {
      case 'open': return <Heart className="w-5 h-5 text-green-400" />;
      case 'initiated': return <Shield className="w-5 h-5 text-yellow-400" />;
      case 'sacred': return <Crown className="w-5 h-5 text-purple-400" />;
      default: return <AlertTriangle className="w-5 h-5 text-red-400" />;
    }
  };

  // Show the dedicated wisdom page if access has been granted
  if (showWisdomPage) {
    return (
      <CulturalWisdomPage
        tradition={tradition}
        onBack={() => setShowWisdomPage(false)}
      />
    );
  }

  return (
    <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-white">
          <div className="flex items-start gap-3 mb-3">
            {getAccessIcon()}
            <div className="min-w-0 flex-1">
              <h2 className="text-lg md:text-xl font-bold break-words">{tradition.name}</h2>
              <p className="text-purple-200 text-sm mt-1">{tradition.region}</p>
            </div>
            <Badge 
              variant={tradition.verified ? "default" : "secondary"}
              className={`${tradition.verified ? "bg-green-600" : "bg-gray-600"} flex-shrink-0`}
            >
              {tradition.verified ? "Elder Verified" : "Historical"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Territory Acknowledgment */}
        <Alert className="border-purple-500/50 bg-purple-900/20">
          <Heart className="w-4 h-4 flex-shrink-0" />
          <AlertDescription className="text-purple-100 leading-relaxed">
            <strong className="block mb-2">Territory Acknowledgment:</strong>
            {tradition.territoryAcknowledgment}
          </AlertDescription>
        </Alert>

        {/* Elder Council */}
        {tradition.verified && (
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Wisdom Keepers</h4>
            <div className="space-y-2">
              {tradition.elderCouncil.map((elder, index) => (
                <div key={index} className="flex items-start gap-2 text-purple-200">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{elder}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Access Requirements */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Sacred Responsibility</h4>
          
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasAcknowledged}
                onChange={(e) => setHasAcknowledged(e.target.checked)}
                className="mt-1 flex-shrink-0"
              />
              <span className="text-purple-100 text-sm leading-relaxed">
                I acknowledge the sacred nature of this wisdom and commit to approaching it with reverence, 
                respect, and understanding that I am receiving teachings from living traditions.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={understandsResponsibility}
                onChange={(e) => setUnderstandsResponsibility(e.target.checked)}
                className="mt-1 flex-shrink-0"
              />
              <span className="text-purple-100 text-sm leading-relaxed">
                I understand that these teachings carry responsibility and I will not appropriate, 
                commercialize, or misrepresent this sacred knowledge. I will practice with humility 
                and seek proper guidance when needed.
              </span>
            </label>
          </div>
        </div>

        {/* Access Status */}
        <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-purple-200 text-sm">Required Access Level:</span>
            <Badge className={`
              ${tradition.accessLevel === 'open' ? 'bg-green-600' : 
                tradition.accessLevel === 'initiated' ? 'bg-yellow-600' : 'bg-purple-600'}
            `}>
              {tradition.accessLevel}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-purple-200 text-sm">Your Level:</span>
            <Badge variant="secondary">{userLevel}</Badge>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleAccessRequest}
          disabled={!hasAcknowledged || !understandsResponsibility}
          className={`w-full ${
            canAccess() 
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
              : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
          }`}
        >
          {canAccess() ? 'Enter Sacred Space' : `Requires ${tradition.accessLevel} Level`}
        </Button>

        {!canAccess() && (
          <Alert className="border-yellow-500/50 bg-yellow-900/20">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <AlertDescription className="text-yellow-100 leading-relaxed">
              Continue your spiritual journey through practice, study, and service to unlock higher levels of wisdom. 
              Some teachings require proper preparation and initiation to be received safely and respectfully.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
