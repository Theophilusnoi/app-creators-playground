
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Clock, Target, Heart, Lightbulb, Info } from 'lucide-react';

interface StageNarrativeProps {
  stageIndex: number;
  stage: any;
  duration: number;
}

export const StageNarrative: React.FC<StageNarrativeProps> = ({ stageIndex, stage, duration }) => {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  const termDefinitions: Record<string, { title: string; explanation: string; benefits: string[] }> = {
    'sacred foundation': {
      title: 'Sacred Foundation',
      explanation: 'A sacred foundation refers to the energetic and spiritual preparation needed before engaging in advanced spiritual practices. It involves creating a protected, consecrated space within your energy field that acts as a stable base for higher consciousness work.',
      benefits: [
        'Prevents spiritual overwhelm and energy imbalances',
        'Creates a protective barrier against negative influences',
        'Establishes clear intention and focus for your practice',
        'Connects you to divine guidance and protection'
      ]
    },
    'negative energies': {
      title: 'Negative Energies',
      explanation: 'Negative energies are dense, low-vibrational forces that can accumulate in your energy field from stress, negative thoughts, toxic environments, or interactions with others. These energies can block spiritual progress and cause physical or emotional discomfort.',
      benefits: [
        'Clearing improves mental clarity and emotional stability',
        'Removes energetic blockages that limit spiritual growth',
        'Increases your natural psychic sensitivity',
        'Enhances overall well-being and vitality'
      ]
    },
    'protective boundaries': {
      title: 'Protective Boundaries',
      explanation: 'Protective boundaries are energetic shields that you consciously create around your aura and energy field. These boundaries filter out harmful energies while allowing positive, beneficial energies to flow freely.',
      benefits: [
        'Prevents energy drain from others',
        'Maintains your spiritual sovereignty',
        'Allows safe exploration of higher consciousness',
        'Protects against psychic attacks or interference'
      ]
    },
    'pineal gland': {
      title: 'Pineal Gland',
      explanation: 'The pineal gland is a small, pine cone-shaped endocrine gland located in the center of your brain. Often called the "third eye," it produces melatonin and is believed to be the physical seat of spiritual vision and higher consciousness.',
      benefits: [
        'Activates natural psychic abilities and intuition',
        'Regulates sleep cycles and circadian rhythms',
        'Enhances spiritual awareness and perception',
        'Facilitates deeper meditation and altered states'
      ]
    },
    'dormant neural pathways': {
      title: 'Dormant Neural Pathways',
      explanation: 'These are unused or underutilized connections in your brain that can be activated through specific practices. When awakened, these pathways can enhance cognitive function, intuitive abilities, and spiritual perception.',
      benefits: [
        'Increases mental processing speed and clarity',
        'Enhances creative and intuitive thinking',
        'Improves memory and cognitive flexibility',
        'Unlocks latent psychic and spiritual abilities'
      ]
    },
    'Third Eye center': {
      title: 'Third Eye Center (Ajna Chakra)',
      explanation: 'The Third Eye center, or Ajna chakra, is located between your eyebrows and is the energy center associated with intuition, inner wisdom, and spiritual sight. It\'s the gateway to higher consciousness and psychic perception.',
      benefits: [
        'Develops clairvoyant and psychic abilities',
        'Enhances intuitive decision-making',
        'Provides access to higher wisdom and guidance',
        'Increases spiritual awareness and insight'
      ]
    },
    'sacred geometric patterns': {
      title: 'Sacred Geometric Patterns',
      explanation: 'Sacred geometry consists of universal patterns and mathematical relationships found throughout nature and the cosmos. These patterns, like the Sri Yantra or Flower of Life, carry specific vibrational frequencies that can program consciousness.',
      benefits: [
        'Harmonizes and balances your energy field',
        'Creates lasting changes in consciousness',
        'Connects you to universal cosmic patterns',
        'Enhances manifestation and spiritual power'
      ]
    },
    'higher wisdom': {
      title: 'Higher Wisdom',
      explanation: 'Higher wisdom refers to knowledge and understanding that comes from your higher self, spirit guides, or divine consciousness. This wisdom transcends ordinary thinking and provides profound insights into life\'s deeper meanings.',
      benefits: [
        'Provides clarity on life purpose and direction',
        'Offers solutions to complex personal challenges',
        'Connects you to universal truths and principles',
        'Enhances spiritual maturity and understanding'
      ]
    }
  };

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

  const renderTextWithLinks = (text: string) => {
    const terms = Object.keys(termDefinitions);
    let result = text;
    
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      result = result.replace(regex, `<span class="clickable-term" data-term="${term}">$1</span>`);
    });
    
    return result;
  };

  const handleTermClick = (term: string) => {
    setSelectedTerm(term);
  };

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
            <div 
              className="text-gray-300 leading-relaxed text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: renderTextWithLinks(currentNarrative.purpose) }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.classList.contains('clickable-term')) {
                  const term = target.getAttribute('data-term');
                  if (term) handleTermClick(term);
                }
              }}
              style={{
                cursor: 'pointer'
              }}
            />
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
            <div 
              className="text-gray-300 leading-relaxed text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: renderTextWithLinks(currentNarrative.buildUp) }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.classList.contains('clickable-term')) {
                  const term = target.getAttribute('data-term');
                  if (term) handleTermClick(term);
                }
              }}
              style={{
                cursor: 'pointer'
              }}
            />
          </div>
        </div>

        {/* Term Definition Dialog */}
        {selectedTerm && termDefinitions[selectedTerm] && (
          <Dialog open={!!selectedTerm} onOpenChange={() => setSelectedTerm(null)}>
            <DialogContent className="bg-gray-800 border-gray-600 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-purple-300">
                  <Info className="w-5 h-5" />
                  {termDefinitions[selectedTerm].title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {termDefinitions[selectedTerm].explanation}
                </p>
                <div>
                  <h4 className="font-semibold text-cyan-300 mb-2">Benefits:</h4>
                  <ul className="space-y-1 text-sm">
                    {termDefinitions[selectedTerm].benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-cyan-100">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0 mt-2"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>

      <style jsx>{`
        .clickable-term {
          color: #a78bfa;
          text-decoration: underline;
          cursor: pointer;
          font-weight: 600;
          transition: color 0.2s ease;
        }
        .clickable-term:hover {
          color: #c4b5fd;
          text-shadow: 0 0 4px rgba(167, 139, 250, 0.5);
        }
      `}</style>
    </Card>
  );
};
