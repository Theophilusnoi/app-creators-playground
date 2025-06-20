
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Flame, ArrowLeft, AlertTriangle } from "lucide-react";

interface CurseBreakingSystemProps {
  curseType: string;
  severity: number;
  onComplete: (type: string) => void;
  onClose: () => void;
}

export const CurseBreakingSystem: React.FC<CurseBreakingSystemProps> = ({
  curseType,
  severity,
  onComplete,
  onClose
}) => {
  const [activeBreaking, setActiveBreaking] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const CURSE_BREAKING_RITUALS = {
    generational_breaking: {
      name: '🔗 Generational Curse Breaking',
      description: 'Break ancestral patterns and family curses',
      duration: 10000,
      steps: [
        "Honor your ancestors while rejecting their curses",
        "Visualize the family tree and identify curse patterns",
        "Cut the generational cords with divine authority",
        "Forgive your ancestors for passing down the curse",
        "Declare yourself the curse-breaker for your lineage",
        "Establish new generational blessings for your descendants"
      ],
      affirmations: [
        "I break all generational curses in my family line",
        "The cycle of negative patterns ends with me",
        "I choose blessing over curse for my lineage",
        "Divine love heals my family's ancestral wounds"
      ]
    },
    spoken_curse_neutralization: {
      name: '🗣️ Spoken Curse Neutralization',
      description: 'Neutralize words spoken against you',
      duration: 6000,
      steps: [
        "Identify the source and words of the curse",
        "Reject the power of the spoken words",
        "Send the curse back to its source transformed as blessing",
        "Speak counter-blessings over yourself",
        "Seal your aura against future spoken attacks",
        "Forgive the person who cursed you"
      ],
      affirmations: [
        "No weapon formed against me in words shall prosper",
        "I reject all negative words spoken over my life",
        "Divine truth overrides all false declarations",
        "I speak life and blessing over myself"
      ]
    },
    object_curse_cleansing: {
      name: '📿 Cursed Object Cleansing',
      description: 'Remove curses from objects and spaces',
      duration: 8000,
      steps: [
        "Identify all cursed or negative objects in your space",
        "Sprinkle salt or sage around the objects",
        "Command all negative energy to leave the objects",
        "Visualize divine light cleansing each item",
        "Either bless the objects or remove them from your space",
        "Seal your space with protective energy"
      ],
      affirmations: [
        "All objects in my space are cleansed and blessed",
        "No cursed item has power in my sacred space",
        "Divine light purifies all that belongs to me",
        "My environment supports only love and growth"
      ]
    },
    comprehensive_curse_breaking: {
      name: '⚡ Comprehensive Curse Breaking',
      description: 'Complete curse removal for severe cases',
      duration: 15000,
      steps: [
        "Call upon the highest divine power for intervention",
        "Identify all sources and types of curses affecting you",
        "Break curses by generation, source, and type systematically",
        "Use spiritual fire to burn away all curse energy",
        "Replace curse energy with divine blessing and protection",
        "Create a permanent shield against future curses",
        "Establish yourself as blessed and highly favored",
        "Seal the breaking with gratitude and divine authority"
      ],
      affirmations: [
        "I am completely free from all curses, known and unknown",
        "Divine blessing flows through every area of my life",
        "I am protected by divine love from all negative forces",
        "Every curse is broken by the power of divine light"
      ]
    }
  };

  const activateBreaking = async (breakingKey: string) => {
    const breaking = CURSE_BREAKING_RITUALS[breakingKey as keyof typeof CURSE_BREAKING_RITUALS];
    if (!breaking) return;

    setActiveBreaking(breakingKey);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (100 / (breaking.duration / 100));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setActiveBreaking(null);
            setProgress(0);
            onComplete(breakingKey);
          }, 500);
          return 100;
        }
        return next;
      });
    }, 100);
  };

  if (activeBreaking) {
    const breaking = CURSE_BREAKING_RITUALS[activeBreaking as keyof typeof CURSE_BREAKING_RITUALS];

    return (
      <Card className="bg-gradient-to-br from-purple-900/30 to-orange-900/30 border-2 border-orange-500/50">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-xl flex items-center justify-center gap-2">
            <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
            {breaking.name}
            <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
          </CardTitle>
          <div className="w-full bg-orange-900/50 rounded-full h-3 mt-4">
            <div 
              className="bg-gradient-to-r from-orange-400 to-yellow-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-orange-200 text-sm mt-2">{Math.round(progress)}% Complete</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-orange-900/20 p-4 rounded-lg">
            <h4 className="text-orange-200 font-semibold mb-3">⚡ Breaking Steps:</h4>
            <div className="space-y-2">
              {breaking.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">{index + 1}.</span>
                  <span className="text-orange-100 text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-900/20 p-4 rounded-lg">
            <h4 className="text-yellow-200 font-semibold mb-3">🗣️ Declare Freedom:</h4>
            <div className="space-y-2">
              {breaking.affirmations.map((affirmation, index) => (
                <div key={index} className="text-yellow-100 text-sm italic font-medium">
                  "• {affirmation}"
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-white text-sm font-bold">
              ⚡ The curse power is breaking! Freedom is coming! ⚡
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/30 border-orange-500/30">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="border-orange-500/50 text-orange-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-400" />
            Curse Breaking System
            <Zap className="w-5 h-5 text-orange-400" />
          </CardTitle>
        </div>
        <p className="text-orange-200">
          Curse Type: {curseType.replace('_', ' ').toUpperCase()} • Severity: {severity}/4
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-orange-900/20 p-4 rounded-lg mb-4">
          <h3 className="text-orange-200 font-semibold mb-2">Understanding Curses</h3>
          <p className="text-orange-100 text-sm">
            Curses are negative energy patterns that can affect your life through spoken words, 
            generational patterns, objects, or intentional spiritual attacks. You have the divine 
            power to break any curse and establish blessing in its place.
          </p>
        </div>

        <div className="grid gap-3">
          {Object.entries(CURSE_BREAKING_RITUALS).map(([key, breaking]) => (
            <Button
              key={key}
              onClick={() => activateBreaking(key)}
              className={`w-full p-4 h-auto bg-gradient-to-r ${
                key === 'comprehensive_curse_breaking' ? 'from-orange-600 to-red-600' :
                key === 'generational_breaking' ? 'from-purple-600 to-orange-600' :
                key === 'object_curse_cleansing' ? 'from-blue-600 to-orange-600' :
                'from-orange-600 to-yellow-600'
              } hover:opacity-90 text-white`}
            >
              <div className="text-left w-full">
                <div className="font-semibold text-lg">{breaking.name}</div>
                <div className="text-sm opacity-90">{breaking.description}</div>
                <div className="text-xs mt-1 opacity-75">
                  Duration: {breaking.duration / 1000} seconds
                </div>
              </div>
            </Button>
          ))}
        </div>

        {severity >= 3 && (
          <div className="mt-4 p-3 bg-red-900/30 rounded-lg border border-red-500/50">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-200 font-semibold text-sm">High Severity Detected</span>
            </div>
            <p className="text-red-100 text-xs">
              This curse shows high severity. Consider starting with Comprehensive Curse Breaking 
              for maximum effectiveness.
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-orange-900/20 rounded-lg">
          <h4 className="text-orange-200 font-semibold mb-2">🛡️ After Breaking:</h4>
          <ul className="text-orange-100 text-sm space-y-1">
            <li>• Speak daily blessings over yourself</li>
            <li>• Avoid negative people and environments</li>
            <li>• Practice gratitude and positive affirmations</li>
            <li>• Maintain strong spiritual boundaries</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
