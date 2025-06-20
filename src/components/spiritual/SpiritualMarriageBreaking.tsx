
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Zap, Shield, Flame, ArrowLeft } from "lucide-react";

interface SpiritualMarriageBreakingProps {
  marriageType: string;
  onComplete: (type: string) => void;
  onClose: () => void;
}

export const SpiritualMarriageBreaking: React.FC<SpiritualMarriageBreakingProps> = ({
  marriageType,
  onComplete,
  onClose
}) => {
  const [activeRitual, setActiveRitual] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const BREAKING_RITUALS = {
    spiritual_divorce: {
      name: '💔 Complete Spiritual Divorce',
      description: 'Formal dissolution of all unwanted spiritual marriages',
      duration: 8000,
      steps: [
        "Stand in your power and declare your sovereignty",
        "Visualize cutting all spiritual cords and bonds",
        "Remove all spiritual rings, jewelry, and symbols",
        "Renounce the spiritual marriage contract",
        "Command the spiritual spouse to leave permanently",
        "Seal your freedom with divine protection"
      ],
      affirmations: [
        "I hereby divorce myself from all unwanted spiritual spouses",
        "I am free from all spiritual marriage contracts",
        "My heart belongs only to my conscious choices",
        "I reclaim my right to love freely"
      ]
    },
    covenant_breaking: {
      name: '⚔️ Covenant Breaking Ritual',
      description: 'Break spiritual contracts and covenants',
      duration: 10000,
      steps: [
        "Call upon divine authority to witness the breaking",
        "Declare all spiritual covenants null and void",
        "Visualize burning all spiritual contracts",
        "Command all spiritual beings to honor the cancellation",
        "Create new protective boundaries around your heart",
        "Establish your divine right to choose your own path"
      ],
      affirmations: [
        "All spiritual covenants made against my will are hereby broken",
        "I nullify all contracts not made in love and freedom",
        "Divine law protects my right to spiritual autonomy",
        "I am sovereign over my own spiritual relationships"
      ]
    },
    emergency_liberation: {
      name: '🔥 Emergency Spiritual Liberation',
      description: 'Immediate freedom from spiritual bondage',
      duration: 12000,
      steps: [
        "Call upon the highest divine powers for immediate intervention",
        "Declare a spiritual emergency and demand immediate liberation",
        "Use divine fire to burn away all spiritual chains",
        "Command all demonic forces to release you NOW",
        "Establish impenetrable spiritual armor around yourself",
        "Anchor your freedom in divine law and protection",
        "Seal the liberation with gratitude and power"
      ],
      affirmations: [
        "I AM FREE! All spiritual bondage is broken NOW!",
        "Divine power liberates me from all unwanted attachments",
        "I claim my birthright of spiritual freedom",
        "No entity has power over my sovereign soul"
      ]
    }
  };

  const activateRitual = async (ritualKey: string) => {
    const ritual = BREAKING_RITUALS[ritualKey as keyof typeof BREAKING_RITUALS];
    if (!ritual) return;

    setActiveRitual(ritualKey);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (100 / (ritual.duration / 100));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setActiveRitual(null);
            setProgress(0);
            onComplete(ritualKey);
          }, 500);
          return 100;
        }
        return next;
      });
    }, 100);
  };

  if (activeRitual) {
    const ritual = BREAKING_RITUALS[activeRitual as keyof typeof BREAKING_RITUALS];

    return (
      <Card className="bg-gradient-to-br from-red-900/30 to-purple-900/30 border-2 border-red-500/50">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-xl flex items-center justify-center gap-2">
            <Flame className="w-6 h-6 text-red-400 animate-pulse" />
            {ritual.name}
            <Flame className="w-6 h-6 text-red-400 animate-pulse" />
          </CardTitle>
          <div className="w-full bg-red-900/50 rounded-full h-3 mt-4">
            <div 
              className="bg-gradient-to-r from-red-400 to-orange-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-red-200 text-sm mt-2">{Math.round(progress)}% Complete</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-red-900/20 p-4 rounded-lg">
            <h4 className="text-red-200 font-semibold mb-3">🔥 Liberation Steps:</h4>
            <div className="space-y-2">
              {ritual.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">{index + 1}.</span>
                  <span className="text-red-100 text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-900/20 p-4 rounded-lg">
            <h4 className="text-orange-200 font-semibold mb-3">💪 Declare Your Freedom:</h4>
            <div className="space-y-2">
              {ritual.affirmations.map((affirmation, index) => (
                <div key={index} className="text-orange-100 text-sm italic font-medium">
                  "• {affirmation}"
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-white text-sm font-bold">
              🔥 Feel the chains breaking! You are becoming FREE! 🔥
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/30 border-red-500/30">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="border-red-500/50 text-red-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400" />
            Spiritual Marriage Breaking System
            <Heart className="w-5 h-5 text-red-400" />
          </CardTitle>
        </div>
        <p className="text-red-200">
          Marriage Type: {marriageType.replace('_', ' ').toUpperCase()}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-red-900/20 p-4 rounded-lg mb-4">
          <h3 className="text-red-200 font-semibold mb-2">Understanding Spiritual Marriage</h3>
          <p className="text-red-100 text-sm">
            Spiritual marriages are unwanted spiritual bonds that can interfere with your free will, 
            relationships, and spiritual growth. You have the divine right to choose your own spiritual 
            connections and break any bonds that were not made in love and freedom.
          </p>
        </div>

        <div className="grid gap-3">
          {Object.entries(BREAKING_RITUALS).map(([key, ritual]) => (
            <Button
              key={key}
              onClick={() => activateRitual(key)}
              className={`w-full p-4 h-auto bg-gradient-to-r ${
                key === 'emergency_liberation' ? 'from-red-600 to-orange-600' :
                key === 'covenant_breaking' ? 'from-purple-600 to-red-600' :
                'from-red-600 to-pink-600'
              } hover:opacity-90 text-white`}
            >
              <div className="text-left w-full">
                <div className="font-semibold text-lg">{ritual.name}</div>
                <div className="text-sm opacity-90">{ritual.description}</div>
                <div className="text-xs mt-1 opacity-75">
                  Duration: {ritual.duration / 1000} seconds
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-red-900/20 rounded-lg">
          <h4 className="text-red-200 font-semibold mb-2">🛡️ After Breaking:</h4>
          <ul className="text-red-100 text-sm space-y-1">
            <li>• Maintain strong spiritual boundaries</li>
            <li>• Practice daily protection rituals</li>
            <li>• Trust your intuition about relationships</li>
            <li>• Seek healthy, conscious connections</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
