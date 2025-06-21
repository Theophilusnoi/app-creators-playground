
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { RitualIncantations } from '@/services/seraphinaBathingService';
import { useVoiceService } from '@/hooks/useVoiceService';
import { PersonalMantra } from './PersonalMantra';
import { IncantationStep } from './IncantationStep';
import { UsageInstructions } from './UsageInstructions';

interface IncantationGuideProps {
  onBack: () => void;
  incantations: RitualIncantations;
  ritualName: string;
}

export const IncantationGuide: React.FC<IncantationGuideProps> = ({ 
  onBack, 
  incantations, 
  ritualName 
}) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const { generateAndPlay, isGenerating } = useVoiceService();

  const playIncantation = async (text: string, id: string) => {
    if (currentlyPlaying === id) {
      setCurrentlyPlaying(null);
      return;
    }

    setCurrentlyPlaying(id);
    try {
      await generateAndPlay({
        text: text.replace(/\n/g, '. '),
        emotion: 'compassionate'
      });
    } finally {
      setCurrentlyPlaying(null);
    }
  };

  const incantationSteps = [
    {
      id: 'space_cleansing',
      title: 'Space Cleansing',
      description: 'Purify your sacred space before beginning',
      text: incantations.space_cleansing,
      color: 'from-purple-600 to-violet-600'
    },
    {
      id: 'candle_anointing',
      title: 'Candle Anointing',
      description: 'Bless your candle with sacred intention',
      text: incantations.candle_anointing,
      color: 'from-orange-600 to-red-600'
    },
    {
      id: 'water_preparation',
      title: 'Water Preparation',
      description: 'Charge your bathwater with spiritual energy',
      text: incantations.water_preparation,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'immersion_affirmation',
      title: 'Immersion Affirmation',
      description: 'Speak these words while soaking in sacred waters',
      text: incantations.immersion_affirmation,
      color: 'from-pink-600 to-rose-600'
    },
    {
      id: 'closing_ritual',
      title: 'Closing Ritual',
      description: 'Complete your ritual with gratitude',
      text: incantations.closing_ritual,
      color: 'from-green-600 to-emerald-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 text-purple-300 hover:text-purple-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Guide
        </Button>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Sacred Incantations & Prayers
        </h2>
        <p className="text-xl text-purple-200">Spiritual words of power for {ritualName}</p>
      </div>

      {/* Personalized Mantra */}
      {incantations.personalized_mantra && (
        <PersonalMantra
          mantra={incantations.personalized_mantra}
          isPlaying={currentlyPlaying === 'mantra'}
          isGenerating={isGenerating}
          onPlay={() => playIncantation(incantations.personalized_mantra!, 'mantra')}
        />
      )}

      {/* Ritual Incantations */}
      <div className="grid gap-6">
        {incantationSteps.map((step, index) => (
          <IncantationStep
            key={step.id}
            id={step.id}
            title={step.title}
            description={step.description}
            text={step.text}
            color={step.color}
            index={index}
            isPlaying={currentlyPlaying === step.id}
            isGenerating={isGenerating}
            onPlay={() => playIncantation(step.text, step.id)}
          />
        ))}
      </div>

      {/* Usage Instructions */}
      <UsageInstructions />
    </div>
  );
};
