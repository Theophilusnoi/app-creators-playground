
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, Heart, Lightbulb } from 'lucide-react';

interface StageNarrativeProps {
  stageIndex: number;
  stage: any;
  duration: number;
}

export const StageNarrative: React.FC<StageNarrativeProps> = ({ stageIndex, stage, duration }) => {
  const narratives = [
    {
      purpose: "Create a sacred foundation for your spiritual work by clearing negative energies and establishing protective boundaries.",
      expectation: "You may feel a sense of calm and safety as your energy field stabilizes and harmonizes.",
      whyDuration: "10 minutes allows time for proper grounding without overwhelming your system with too much energy work.",
      buildUp: "This stage prepares your energy body to safely receive higher frequencies in subsequent stages."
    },
    {
      purpose: "Activate your pineal gland through specific breathing techniques that increase oxygen flow and stimulate dormant neural pathways.",
      expectation: "You might experience tingling sensations, pressure between your eyebrows, or subtle shifts in consciousness.",
      whyDuration: "15 minutes provides sufficient time for your nervous system to adapt to increased energy flow.",
      buildUp: "Building on your grounded state, this breathwork opens the energetic channels needed for deeper perception."
    },
    {
      purpose: "Train your attention to focus precisely on the Third Eye center, developing the concentration needed for psychic perception.",
      expectation: "Visual phenomena like colors, patterns, or flashes of light may appear as your inner vision awakens.",
      whyDuration: "20 minutes allows your mind to settle into deep focus without mental fatigue.",
      buildUp: "With your energy activated, sustained focus begins to unlock your natural clairvoyant abilities."
    },
    {
      purpose: "Imprint sacred geometric patterns into your subconscious to create permanent pathways for accessing higher wisdom.",
      expectation: "Symbols may appear spontaneously, or you might receive insights and guidance from your higher self.",
      whyDuration: "15 minutes provides time for deep symbolic programming without overwhelming your psyche.",
      buildUp: "Your focused awareness now becomes a vessel for receiving and interpreting spiritual symbols."
    },
    {
      purpose: "Transform spiritual experiences into practical wisdom that enhances your daily decision-making and intuitive guidance.",
      expectation: "A sense of clarity and inner knowing that extends beyond the meditation into your everyday life.",
      whyDuration: "10 minutes helps you consciously integrate insights so they become accessible in daily situations.",
      buildUp: "This final stage completes your transformation, making your awakened abilities a living part of who you are."
    }
  ];

  const currentNarrative = narratives[stageIndex];
  const Icon = stage.icon;

  return (
    <Card className="bg-gray-800 border-gray-700 shadow-2xl mb-6 mobile-backdrop">
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-4 text-white">
          <div className="bg-gray-700 rounded-full p-3 border-2 border-gray-600 self-start">
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex-1">
            <div className="text-xl md:text-2xl font-bold crisp-text">Stage {stageIndex + 1}: Understanding Your Journey</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-gray-700 text-white border-gray-600">
                <Clock className="w-3 h-3 mr-1" />
                {duration} minutes
              </Badge>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              <h4 className="font-semibold text-white text-sm md:text-base crisp-text">Purpose of This Stage</h4>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">{currentNarrative.purpose}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />
              <h4 className="font-semibold text-white text-sm md:text-base crisp-text">What You Might Experience</h4>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">{currentNarrative.expectation}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
              <h4 className="font-semibold text-white text-sm md:text-base crisp-text">Why This Duration</h4>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">{currentNarrative.whyDuration}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              <h4 className="font-semibold text-white text-sm md:text-base crisp-text">Building Your Journey</h4>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">{currentNarrative.buildUp}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
