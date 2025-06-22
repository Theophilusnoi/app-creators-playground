
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
    <Card className={`bg-gradient-to-br ${stage.color}/20 backdrop-blur-sm border-2 border-white/20 shadow-2xl mb-6`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-4 text-white">
          <div className="bg-white/30 backdrop-blur-sm rounded-full p-3 border-2 border-white/40">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">Stage {stageIndex + 1}: Understanding Your Journey</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-white/20 text-white">
                <Clock className="w-3 h-3 mr-1" />
                {duration} minutes
              </Badge>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="bg-black/40 rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-blue-400" />
              <h4 className="font-semibold text-white">Purpose of This Stage</h4>
            </div>
            <p className="text-white/90 leading-relaxed">{currentNarrative.purpose}</p>
          </div>

          <div className="bg-black/40 rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-pink-400" />
              <h4 className="font-semibold text-white">What You Might Experience</h4>
            </div>
            <p className="text-white/90 leading-relaxed">{currentNarrative.expectation}</p>
          </div>

          <div className="bg-black/40 rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-green-400" />
              <h4 className="font-semibold text-white">Why This Duration</h4>
            </div>
            <p className="text-white/90 leading-relaxed">{currentNarrative.whyDuration}</p>
          </div>

          <div className="bg-black/40 rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <h4 className="font-semibold text-white">Building Your Journey</h4>
            </div>
            <p className="text-white/90 leading-relaxed">{currentNarrative.buildUp}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
