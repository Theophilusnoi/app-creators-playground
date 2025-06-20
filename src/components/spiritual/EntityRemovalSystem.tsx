
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Zap, Shield, Flame, ArrowLeft, Heart } from "lucide-react";

interface EntityRemovalSystemProps {
  entityType: string;
  severity: number;
  onComplete: (type: string) => void;
  onClose: () => void;
}

export const EntityRemovalSystem: React.FC<EntityRemovalSystemProps> = ({
  entityType,
  severity,
  onComplete,
  onClose
}) => {
  const [activeRemoval, setActiveRemoval] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const REMOVAL_PROTOCOLS = {
    entity_clearing: {
      name: '✨ Gentle Entity Clearing',
      description: 'Compassionate removal with love and light',
      duration: 7000,
      steps: [
        "Center yourself in divine love and protection",
        "Acknowledge the entity with compassion",
        "Firmly but kindly ask the entity to leave",
        "Offer the entity guidance to the light",
        "Fill the space with divine love and healing light",
        "Seal your energy field with protective barriers"
      ],
      affirmations: [
        "I am filled with divine love and light",
        "Only love may dwell within my sacred space",
        "I release all attachments with compassion",
        "Divine protection surrounds me always"
      ]
    },
    compassionate_release: {
      name: '💙 Compassionate Soul Release',
      description: 'Help lost souls find their way to the light',
      duration: 9000,
      steps: [
        "Recognize the entity as a lost soul needing help",
        "Send love and compassion to the attached soul",
        "Call upon divine beings to assist with the crossing",
        "Create a bridge of light for the soul to follow",
        "Guide the soul gently into the divine light",
        "Send blessings and healing to the departed soul",
        "Close the spiritual doorways and seal your space"
      ],
      affirmations: [
        "I offer love and assistance to all lost souls",
        "Divine light guides all beings to their highest good",
        "Healing and peace flow through this sacred work",
        "I am a bridge between earth and heaven"
      ]
    },
    forced_removal: {
      name: '⚔️ Forced Entity Removal',
      description: 'Immediate removal of resistant entities',
      duration: 12000,
      steps: [
        "Assert your divine authority and sovereignty",
        "Command the entity to identify itself",
        "Use divine fire to weaken the entity's hold",
        "Call upon archangels for immediate assistance",
        "Force the entity out through divine command",
        "Banish the entity to its appropriate realm",
        "Cleanse and purify your entire energy field",
        "Establish impenetrable spiritual defenses"
      ],
      affirmations: [
        "I AM SOVEREIGN! You have no power here!",
        "By divine authority, I command you to LEAVE NOW!",
        "Divine fire burns away all unwanted attachments",
        "I am protected by the highest divine forces"
      ]
    },
    comprehensive_cleansing: {
      name: '🔥 Complete Entity Cleansing',
      description: 'Total clearing for severe infestations',
      duration: 15000,
      steps: [
        "Call upon the highest divine powers for intervention",
        "Scan your entire energy system for all attachments",
        "Remove entities one by one with appropriate methods",
        "Clear all energy cords and attachment points",
        "Purify your chakras, aura, and energy bodies",
        "Repair any damage to your spiritual boundaries",
        "Install permanent protection and early warning systems",
        "Seal the work with gratitude and divine blessing"
      ],
      affirmations: [
        "I am completely free from all entity attachments",
        "Divine light purifies every aspect of my being",
        "My energy field is sovereign and protected",
        "I maintain perfect spiritual hygiene and boundaries"
      ]
    }
  };

  const activateRemoval = async (removalKey: string) => {
    const removal = REMOVAL_PROTOCOLS[removalKey as keyof typeof REMOVAL_PROTOCOLS];
    if (!removal) return;

    setActiveRemoval(removalKey);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (100 / (removal.duration / 100));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setActiveRemoval(null);
            setProgress(0);
            onComplete(removalKey);
          }, 500);
          return 100;
        }
        return next;
      });
    }, 100);
  };

  if (activeRemoval) {
    const removal = REMOVAL_PROTOCOLS[activeRemoval as keyof typeof REMOVAL_PROTOCOLS];

    return (
      <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-2 border-purple-500/50">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-xl flex items-center justify-center gap-2">
            <Flame className="w-6 h-6 text-purple-400 animate-pulse" />
            {removal.name}
            <Flame className="w-6 h-6 text-purple-400 animate-pulse" />
          </CardTitle>
          <div className="w-full bg-purple-900/50 rounded-full h-3 mt-4">
            <div 
              className="bg-gradient-to-r from-purple-400 to-blue-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-purple-200 text-sm mt-2">{Math.round(progress)}% Complete</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-purple-900/20 p-4 rounded-lg">
            <h4 className="text-purple-200 font-semibold mb-3">👁️ Removal Steps:</h4>
            <div className="space-y-2">
              {removal.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">{index + 1}.</span>
                  <span className="text-purple-100 text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-900/20 p-4 rounded-lg">
            <h4 className="text-blue-200 font-semibold mb-3">💫 Sacred Declarations:</h4>
            <div className="space-y-2">
              {removal.affirmations.map((affirmation, index) => (
                <div key={index} className="text-blue-100 text-sm italic font-medium">
                  "• {affirmation}"
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-white text-sm font-bold">
              ✨ Feel the entity releasing! Your space is being reclaimed! ✨
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/30 border-purple-500/30">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="border-purple-500/50 text-purple-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-400" />
            Entity Removal System
            <Eye className="w-5 h-5 text-purple-400" />
          </CardTitle>
        </div>
        <p className="text-purple-200">
          Entity Type: {entityType.replace('_', ' ').toUpperCase()} • Severity: {severity}/3
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-purple-900/20 p-4 rounded-lg mb-4">
          <h3 className="text-purple-200 font-semibold mb-2">Understanding Entity Attachments</h3>
          <p className="text-purple-100 text-sm">
            Entity attachments occur when foreign spiritual beings connect to your energy field. 
            Most entities are lost souls or energy forms seeking help. You have the right to 
            maintain sovereignty over your spiritual space.
          </p>
        </div>

        <div className="grid gap-3">
          {Object.entries(REMOVAL_PROTOCOLS).map(([key, removal]) => (
            <Button
              key={key}
              onClick={() => activateRemoval(key)}
              className={`w-full p-4 h-auto bg-gradient-to-r ${
                key === 'comprehensive_cleansing' ? 'from-purple-600 to-red-600' :
                key === 'forced_removal' ? 'from-red-600 to-orange-600' :
                key === 'compassionate_release' ? 'from-blue-600 to-purple-600' :
                'from-purple-600 to-blue-600'
              } hover:opacity-90 text-white`}
            >
              <div className="text-left w-full">
                <div className="font-semibold text-lg">{removal.name}</div>
                <div className="text-sm opacity-90">{removal.description}</div>
                <div className="text-xs mt-1 opacity-75">
                  Duration: {removal.duration / 1000} seconds
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-purple-900/20 rounded-lg">
          <h4 className="text-purple-200 font-semibold mb-2">🛡️ Prevention & Maintenance:</h4>
          <ul className="text-purple-100 text-sm space-y-1">
            <li>• Regular spiritual cleansing and protection</li>
            <li>• Avoid negative environments and people</li>
            <li>• Maintain strong energetic boundaries</li>
            <li>• Practice discernment with spiritual activities</li>
          </ul>
        </div>

        <div className="mt-4 p-3 bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-blue-400" />
            <span className="text-blue-200 font-semibold text-sm">Compassionate Approach</span>
          </div>
          <p className="text-blue-100 text-xs">
            Remember that most entities are lost souls needing guidance. Approach with firmness 
            but also compassion when possible.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
