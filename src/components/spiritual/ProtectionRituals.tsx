
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
              content: "Find a quiet space and sit or stand comfortably. Place your dominant hand gently over your heart center. Take a deep breath and feel your heartbeat beneath your palm. Close your eyes and whisper with intention: 'This body is holy ground.' Feel the words resonate through your chest. Repeat this sacred declaration two more times, each time with more conviction and power.",
              instruction: "Detailed guidance: As you speak, visualize golden roots growing from your heart down through your body into the earth. Feel yourself becoming unshakeable, connected to the divine source of all protection. Your body is a temple, and you are both the guardian and the sacred flame within."
            },
            {
              title: "Light Visualization", 
              content: "Keep your hand on your heart and imagine a brilliant golden-white light beginning to glow from within your heart center. See this light as warm, protective, and infinitely loving. Watch as it expands beyond the boundaries of your physical body, creating a luminous bubble of safety around you.",
              instruction: "Feel the warmth: This light carries the frequency of pure love and divine protection. As it expands, it gently but firmly pushes away any negative energy, fear, or unwanted influences. See shadows retreating from your radiant presence."
            },
            {
              title: "Archetype Invocation",
              content: "Call upon your chosen protector with reverence and trust. Whether it's Christ's boundless love, Archangel Michael's fierce protection, your loving ancestors, or any divine being that embodies ultimate safety for you. Speak their name aloud: 'I call upon [Name] to stand guard with me now.'",
              instruction: "Feel their presence: Sense this protective energy joining with yours, amplifying your light and strength. You are not alone - you are surrounded by love and supported by forces greater than any challenge you face."
            },
            {
              title: "Authority Declaration",
              content: "Stand tall (or sit with dignity) and speak with the full authority of your divine nature. Say in your strongest, most commanding voice: 'Only Love dwells here. All fear, negativity, and harmful energy must leave now. I claim this space in the name of Light and Love.' Feel the power of these words shake the very foundation of any darkness.",
              instruction: "Own your power: You are a child of the Divine, and you have the absolute right to claim your space as sacred. Feel how your words carry the weight of universal truth and love."
            },
            {
              title: "Aftercare & Integration",
              content: "Slowly remove your hand from your heart and take three deep, centering breaths. Drink a full glass of warm water to ground your energy. Wrap yourself in a soft blanket or comfort item. Rest quietly for at least 5-10 minutes, allowing the protective energy to fully integrate into your being.",
              instruction: "Gentle integration: I'll hold space with you as you steady your breath and settle into this new sense of safety. You are protected, you are loved, and you are infinitely stronger than you know."
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
              <h4 className="text-purple-200 font-semibold mb-3">
                {index + 1}. {step.title}
              </h4>
              <div className="space-y-3">
                <p className="text-gray-200 leading-relaxed">
                  "{step.content}"
                </p>
                <div className="bg-purple-800/30 p-3 rounded border-l-4 border-purple-400">
                  <p className="text-purple-300 text-sm italic">
                    ✨ {step.instruction}
                  </p>
                </div>
              </div>
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
