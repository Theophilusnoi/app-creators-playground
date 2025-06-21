
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Volume2, 
  VolumeOff,
  Heart,
  Sparkles,
  Moon,
  Shield,
  Candle
} from 'lucide-react';
import { RitualIncantations } from '@/services/seraphinaBathingService';
import { useVoiceService } from '@/hooks/useVoiceService';

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
  const { generateAndPlay, isLoading } = useVoiceService();

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

  const getStepIcon = (step: string) => {
    if (step.includes('space')) return <Sparkles className="w-5 h-5" />;
    if (step.includes('candle')) return <Candle className="w-5 h-5" />;
    if (step.includes('water')) return <Moon className="w-5 h-5" />;
    if (step.includes('immersion')) return <Heart className="w-5 h-5" />;
    if (step.includes('closing')) return <Shield className="w-5 h-5" />;
    return <Sparkles className="w-5 h-5" />;
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
        <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-2 border-yellow-400/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-yellow-200">
              <div className="bg-yellow-500/20 rounded-full p-2">
                <Heart className="w-5 h-5" />
              </div>
              Your Personal Healing Mantra
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-yellow-100 leading-relaxed flex-1">
                {incantations.personalized_mantra}
              </p>
              <Button
                onClick={() => playIncantation(incantations.personalized_mantra!, 'mantra')}
                variant="ghost"
                size="sm"
                className="ml-4 text-yellow-300 hover:text-yellow-100"
                disabled={isLoading}
              >
                {currentlyPlaying === 'mantra' ? 
                  <VolumeOff className="w-5 h-5" /> : 
                  <Volume2 className="w-5 h-5" />
                }
              </Button>
            </div>
            <Badge className="mt-3 bg-yellow-600/20 text-yellow-200 border-yellow-400/30">
              Repeat throughout your day for continued healing
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* Ritual Incantations */}
      <div className="grid gap-6">
        {incantationSteps.map((step, index) => (
          <Card key={step.id} className={`bg-gradient-to-br ${step.color}/20 border-2 border-current/30`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="bg-white/20 rounded-full p-2">
                  {getStepIcon(step.id)}
                </div>
                <div>
                  <div className="text-lg">Step {index + 1}: {step.title}</div>
                  <div className="text-sm opacity-90 font-normal">{step.description}</div>
                </div>
                <Button
                  onClick={() => playIncantation(step.text, step.id)}
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-white/80 hover:text-white"
                  disabled={isLoading}
                >
                  {currentlyPlaying === step.id ? 
                    <VolumeOff className="w-5 h-5" /> : 
                    <Volume2 className="w-5 h-5" />
                  }
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/20 rounded-lg p-4 border border-white/20">
                <pre className="text-white leading-relaxed whitespace-pre-wrap font-serif text-lg">
                  {step.text}
                </pre>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage Instructions */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-2 border-indigo-400/50">
        <CardHeader>
          <CardTitle className="text-indigo-200">How to Use These Incantations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-indigo-100">
          <Tabs defaultValue="spoken" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/20">
              <TabsTrigger value="spoken">Spoken Aloud</TabsTrigger>
              <TabsTrigger value="whispered">Whispered</TabsTrigger>
              <TabsTrigger value="written">Written & Dissolved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="spoken" className="mt-4">
              <div className="space-y-3">
                <h4 className="font-medium text-indigo-200">Speaking the Words of Power</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Speak clearly and with intention during each ritual step</li>
                  <li>• Voice vibration activates spiritual energy</li>
                  <li>• Feel the meaning of each word as you speak</li>
                  <li>• Repeat 3 times if you feel called to do so</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="whispered" className="mt-4">
              <div className="space-y-3">
                <h4 className="font-medium text-indigo-200">Whispered Prayers</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Whisper over ingredients before adding to bath</li>
                  <li>• Creates intimate connection with spiritual forces</li>
                  <li>• Perfect for private or shared living spaces</li>
                  <li>• Your intention is more important than volume</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="written" className="mt-4">
              <div className="space-y-3">
                <h4 className="font-medium text-indigo-200">Written & Dissolved Method</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Write incantations on biodegradable paper</li>
                  <li>• Dissolve in bathwater while setting intention</li>
                  <li>• Physically releasing words into water amplifies power</li>
                  <li>• Use natural ink or pencil for safe dissolution</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
