
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Heart, Crown, AlertTriangle, Check, BookOpen, Star, Scroll } from "lucide-react";
import { CULTURAL_TRADITIONS } from '@/data/archetypes';
import { CulturalTradition } from '@/types/archetype';

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
  const [accessGranted, setAccessGranted] = useState(false);

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

    setAccessGranted(true);
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

  const getWisdomContent = () => {
    const wisdomContent = {
      'celtic': {
        teachings: [
          'The Triple Goddess: Maiden, Mother, Crone - understanding life\'s sacred cycles',
          'Celtic Tree Calendar: Each moon cycle connected to sacred trees and their wisdom',
          'Ogham Script: Ancient alphabet connecting letters to trees and natural forces',
          'Samhain Wisdom: Honoring ancestors and the thinning of veils between worlds'
        ],
        practices: [
          'Daily tree meditation - connecting with the spirit of different trees',
          'Seasonal celebration rituals honoring the Celtic wheel of the year',
          'Ancestor communication through guided meditation',
          'Celtic knot meditation for understanding interconnectedness'
        ],
        symbols: ['Triskele', 'Celtic Knots', 'Tree of Life', 'Spiral'],
        deities: ['Brigid', 'Cernunnos', 'The Morrígan', 'Lugh']
      },
      'norse': {
        teachings: [
          'The Nine Realms: Understanding the cosmic tree Yggdrasil and interconnected worlds',
          'Rune Wisdom: Each rune as a gateway to universal forces and divination',
          'Wyrd and Fate: Understanding personal destiny and the web of fate',
          'Berserker Consciousness: Channeling primal power for transformation'
        ],
        practices: [
          'Daily rune meditation and casting for guidance',
          'Seidr practices for spiritual journeying and prophecy',
          'Blót rituals for honoring the gods and nature spirits',
          'Galdr - runic chanting for manifestation and protection'
        ],
        symbols: ['Mjölnir', 'Valknut', 'Vegvísir', 'Yggdrasil'],
        deities: ['Odin', 'Freya', 'Thor', 'Frigg']
      },
      'egyptian': {
        teachings: [
          'Ma\'at Principle: Living in harmony with cosmic order and truth',
          'Ka and Ba: Understanding the multiple aspects of the soul',
          'Duat Journey: The soul\'s journey through the underworld after death',
          'Neteru Wisdom: Working with Egyptian deities as cosmic principles'
        ],
        practices: [
          'Daily Ma\'at meditation for ethical living and balance',
          'Hieroglyphic meditation for connecting with ancient wisdom',
          'Pyramid energy work for consciousness expansion',
          'Egyptian deity invocation for specific life aspects'
        ],
        symbols: ['Ankh', 'Eye of Horus', 'Djed Pillar', 'Was Scepter'],
        deities: ['Isis', 'Osiris', 'Thoth', 'Hathor']
      }
    };

    return wisdomContent[tradition.id as keyof typeof wisdomContent] || {
      teachings: ['Ancient wisdom teachings from this tradition'],
      practices: ['Sacred practices for spiritual development'],
      symbols: ['Sacred symbols'],
      deities: ['Divine beings and archetypes']
    };
  };

  if (accessGranted) {
    const content = getWisdomContent();
    
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-green-400" />
              <div>
                <h2 className="text-2xl">{tradition.name} Sacred Teachings</h2>
                <p className="text-green-200 text-sm">Access Granted - Wisdom Unlocked</p>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Core Teachings */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Scroll className="w-5 h-5 text-yellow-400" />
                Core Teachings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.teachings.map((teaching, index) => (
                  <Card key={index} className="bg-black/30 border-purple-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Star className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <p className="text-purple-100 text-sm">{teaching}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sacred Practices */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-400" />
                Sacred Practices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.practices.map((practice, index) => (
                  <Card key={index} className="bg-black/30 border-pink-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Heart className="w-4 h-4 text-pink-400 mt-1 flex-shrink-0" />
                        <p className="text-pink-100 text-sm">{practice}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sacred Symbols */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-bold text-white mb-3">Sacred Symbols</h4>
                <div className="flex flex-wrap gap-2">
                  {content.symbols.map((symbol, index) => (
                    <Badge key={index} className="bg-blue-600/80 text-white">
                      {symbol}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white mb-3">Divine Archetypes</h4>
                <div className="flex flex-wrap gap-2">
                  {content.deities.map((deity, index) => (
                    <Badge key={index} className="bg-purple-600/80 text-white">
                      {deity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => setAccessGranted(false)}
                variant="outline"
                className="border-gray-500 text-gray-300 hover:bg-gray-700"
              >
                ← Back to Gate
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Begin Practice Session
              </Button>
              <Button 
                variant="outline"
                className="border-purple-500 text-purple-300 hover:bg-purple-700"
              >
                Download Study Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            {getAccessIcon()}
            <div>
              <h2 className="text-xl">{tradition.name}</h2>
              <p className="text-purple-200 text-sm">{tradition.region}</p>
            </div>
            <Badge 
              variant={tradition.verified ? "default" : "secondary"}
              className={tradition.verified ? "bg-green-600" : "bg-gray-600"}
            >
              {tradition.verified ? "Elder Verified" : "Historical"}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Territory Acknowledgment */}
          <Alert className="border-purple-500/50 bg-purple-900/20">
            <Heart className="w-4 h-4" />
            <AlertDescription className="text-purple-100">
              <strong>Territory Acknowledgment:</strong><br />
              {tradition.territoryAcknowledgment}
            </AlertDescription>
          </Alert>

          {/* Elder Council */}
          {tradition.verified && (
            <div>
              <h4 className="text-white font-semibold mb-2">Wisdom Keepers</h4>
              <div className="space-y-1">
                {tradition.elderCouncil.map((elder, index) => (
                  <div key={index} className="flex items-center gap-2 text-purple-200">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>{elder}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Access Requirements */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Sacred Responsibility</h4>
            
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasAcknowledged}
                  onChange={(e) => setHasAcknowledged(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-purple-100 text-sm">
                  I acknowledge the sacred nature of this wisdom and commit to approaching it with reverence, 
                  respect, and understanding that I am receiving teachings from living traditions.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={understandsResponsibility}
                  onChange={(e) => setUnderstandsResponsibility(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-purple-100 text-sm">
                  I understand that these teachings carry responsibility and I will not appropriate, 
                  commercialize, or misrepresent this sacred knowledge. I will practice with humility 
                  and seek proper guidance when needed.
                </span>
              </label>
            </div>
          </div>

          {/* Access Status */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-200">Required Access Level:</span>
              <Badge className={`
                ${tradition.accessLevel === 'open' ? 'bg-green-600' : 
                  tradition.accessLevel === 'initiated' ? 'bg-yellow-600' : 'bg-purple-600'}
              `}>
                {tradition.accessLevel}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-purple-200">Your Level:</span>
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
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription className="text-yellow-100">
                Continue your spiritual journey through practice, study, and service to unlock higher levels of wisdom. 
                Some teachings require proper preparation and initiation to be received safely and respectfully.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
