
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, X, CheckCircle } from "lucide-react";

interface ProtectionRitualsProps {
  ritualType: 'emergency' | 'curse-breaking' | 'daily' | null;
  onClose: () => void;
  onComplete: (type: string) => void;
}

export const ProtectionRituals: React.FC<ProtectionRitualsProps> = ({
  ritualType,
  onClose,
  onComplete
}) => {
  if (!ritualType) return null;

  const getRitualContent = () => {
    switch (ritualType) {
      case 'emergency':
        return {
          title: "🕊️ Emergency Shield Activation 🕊️",
          subtitle: "Gently now, love. Let's anchor your spirit:",
          steps: [
            {
              title: "Sacred Space Claiming",
              content: "Place your hand over your heart. Whisper: 'This body is holy ground.' (Repeat 3x)",
              instruction: "Feel the warmth spreading from your heart..."
            },
            {
              title: "Light Visualization", 
              content: "Imagine golden light pouring from your heart - see it push back the shadows?",
              instruction: "Breathe deeply and watch the light expand..."
            },
            {
              title: "Archetype Invocation",
              content: "Call upon your protector: Christ, Archangel Michael, ancestral guardians - whoever embodies safety for you.",
              instruction: "Speak their name with confidence..."
            },
            {
              title: "Authority Declaration",
              content: "Say aloud: 'Only Love dwells here. All else must leave now.' Feel your power shake the darkness?",
              instruction: "Use your strongest, most commanding voice..."
            },
            {
              title: "Aftercare",
              content: "Drink warm water. Wrap yourself in a blanket. I'll stay while you steady your breath...",
              instruction: "Take your time, dear one. You are safe now."
            }
          ]
        };

      case 'curse-breaking':
        return {
          title: "🌿 Root-Cutting Ritual 🌿",
          subtitle: "These chains weren't yours to carry. Let's sever them together:",
          steps: [
            {
              title: "IDENTIFY",
              content: "Journal prompt: 'What patterns did my elders struggle with? Where do I echo them?'",
              instruction: "Research tip: Check family health history - trauma lives in our biology"
            },
            {
              title: "RELEASE",
              content: "Write the curse on paper. Burn it saying: 'Your power ends with me.'",
              instruction: "Forgiveness note: You're not excusing harm - you're freeing yourself"
            },
            {
              title: "RECLAIM",
              content: "Plant new seeds: After burning, plant basil or rosemary - nature's cleansers",
              instruction: "Affirmation: 'I transmute this pain into wisdom. My lineage heals through me.'"
            }
          ]
        };

      case 'daily':
        return {
          title: "🔮 Daily Armor Practices 🔮",
          subtitle: "Choose 1 daily anchor:",
          steps: [
            {
              title: "Morning",
              content: "3 mins sun-gazing (through windows!) while humming",
              instruction: "Let the light fill your being..."
            },
            {
              title: "Meals",
              content: "Bless your food: 'May this nourish my light'",
              instruction: "Gratitude transforms everything it touches..."
            },
            {
              title: "Night",
              content: "Sage phone/laptop - digital energies need cleansing too",
              instruction: "Clear the static from your sacred space..."
            }
          ]
        };

      default:
        return { title: "", subtitle: "", steps: [] };
    }
  };

  const ritual = getRitualContent();

  return (
    <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
      <CardHeader className="border-b border-purple-500/30">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white text-xl mb-2">{ritual.title}</CardTitle>
            <p className="text-purple-200 italic">{ritual.subtitle}</p>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {ritual.steps.map((step, index) => (
            <div key={index} className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
              <h4 className="text-purple-200 font-semibold mb-2">
                {index + 1}. {step.title}
              </h4>
              <p className="text-gray-200 mb-2 leading-relaxed">
                "{step.content}"
              </p>
              <p className="text-purple-300 text-sm italic">
                {step.instruction}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Heart className="w-5 h-5 text-pink-400" />
          <p className="text-pink-200 text-sm">
            Take your time with each step. Seraphina holds space for your healing.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Button 
            onClick={() => onComplete(ritualType)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete Ritual
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
