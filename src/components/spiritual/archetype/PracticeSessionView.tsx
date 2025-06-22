
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, RotateCcw, Check } from "lucide-react";
import { CulturalTradition } from '@/types/archetype';

interface PracticeSessionViewProps {
  tradition: CulturalTradition;
  onBack: () => void;
}

interface PracticeStep {
  id: string;
  title: string;
  duration: number; // in minutes
  instructions: string;
  mantra?: string;
}

export const PracticeSessionView: React.FC<PracticeSessionViewProps> = ({
  tradition,
  onBack
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const getPracticeSteps = (): PracticeStep[] => {
    const practiceSteps = {
      'buddhist': [
        {
          id: 'preparation',
          title: 'Sacred Space Preparation',
          duration: 5,
          instructions: 'Find a quiet space. Sit comfortably with your spine straight. Light incense if available. Place your hands in meditation mudra (right hand on left, thumbs touching).',
          mantra: 'Buddham saranam gacchami, Dhammam saranam gacchami, Sangham saranam gacchami'
        },
        {
          id: 'breathing',
          title: 'Mindful Breathing',
          duration: 10,
          instructions: 'Focus on your natural breath. Count breaths from 1 to 10, then start over. When mind wanders, gently return to counting. This develops concentration (samatha).',
          mantra: 'Breathing in, I know this is an in-breath. Breathing out, I know this is an out-breath.'
        },
        {
          id: 'loving-kindness',
          title: 'Metta (Loving-Kindness)',
          duration: 15,
          instructions: 'Begin with yourself: "May I be happy, may I be peaceful, may I be free from suffering." Extend to loved ones, neutral people, difficult people, and all beings.',
          mantra: 'May all beings be happy. May all beings be peaceful. May all beings be free.'
        },
        {
          id: 'contemplation',
          title: 'Dharma Contemplation',
          duration: 10,
          instructions: 'Reflect on impermanence: "All conditioned things are impermanent. All things arise and pass away." Contemplate how this applies to your current experiences.',
          mantra: 'Gate gate pāragate pārasaṃgate bodhi svāhā'
        }
      ],
      'celtic': [
        {
          id: 'grounding',
          title: 'Earth Connection',
          duration: 5,
          instructions: 'Stand barefoot on earth if possible, or visualize roots growing from your feet into the ground. Feel the ancient wisdom of the land flowing up through you.',
          mantra: 'I am rooted in the sacred earth, connected to all that came before.'
        },
        {
          id: 'tree-wisdom',
          title: 'Tree Spirit Communication',
          duration: 15,
          instructions: 'Sit with your back against a tree or visualize your sacred tree. Ask for guidance and listen with your heart. Each tree offers different wisdom.',
          mantra: 'Ancient tree, wise and true, share your wisdom, make me new.'
        },
        {
          id: 'ancestor-calling',
          title: 'Ancestor Invocation',
          duration: 10,
          instructions: 'Light a candle and call upon your ancestors for guidance. Speak their names if known, or simply say "Ancestors of my blood and spirit, I honor you."',
          mantra: 'Ancestors wise, hear my call, guide my steps through rise and fall.'
        },
        {
          id: 'blessing',
          title: 'Celtic Blessing',
          duration: 5,
          instructions: 'End with gratitude to the land, ancestors, and Celtic spirits. Ask for their continued protection and guidance in your daily life.',
          mantra: 'May the road rise up to meet you, may the wind be always at your back.'
        }
      ],
      'norse': [
        {
          id: 'preparation',
          title: 'Warrior\'s Stance',
          duration: 5,
          instructions: 'Stand tall with feet shoulder-width apart. Feel your inner warrior awakening. Honor the gods and your ancestors who watch over you.',
          mantra: 'By Odin\'s wisdom, Thor\'s strength, and Freya\'s love, I stand ready.'
        },
        {
          id: 'rune-casting',
          title: 'Rune Wisdom Seeking',
          duration: 15,
          instructions: 'Draw or visualize three runes for past, present, future. Meditate on their meanings and how they apply to your current path.',
          mantra: 'Runes of power, runes of might, guide me through the sacred night.'
        },
        {
          id: 'inner-journey',
          title: 'Journey to Asgard',
          duration: 15,
          instructions: 'Visualize climbing Yggdrasil, the World Tree. Journey to Asgard and seek counsel from the gods. What wisdom do they offer?',
          mantra: 'Up the tree of worlds I climb, seeking wisdom beyond time.'
        },
        {
          id: 'oath-taking',
          title: 'Sacred Oath',
          duration: 5,
          instructions: 'Make a sacred oath to live with honor this day. Speak it aloud with conviction. The gods witness your commitment.',
          mantra: 'By my word and sacred oath, I walk the path of honor both.'
        }
      ],
      'egyptian': [
        {
          id: 'purification',
          title: 'Sacred Purification',
          duration: 5,
          instructions: 'Visualize yourself being purified by the waters of the Nile. Feel all negativity washing away as you prepare for sacred work.',
          mantra: 'By the power of Ra, I am purified. By the wisdom of Thoth, I am prepared.'
        },
        {
          id: 'maat-balance',
          title: 'Ma\'at Balance Meditation',
          duration: 15,
          instructions: 'Visualize the scales of Ma\'at weighing your heart. What needs to come into balance in your life? Ask for guidance to live in truth.',
          mantra: 'Ma\'at, goddess of truth and justice, balance my heart with your feather.'
        },
        {
          id: 'ankh-breathing',
          title: 'Ankh Life Force Breathing',
          duration: 10,
          instructions: 'Visualize breathing golden light through an ankh symbol at your heart. This is the breath of eternal life flowing through you.',
          mantra: 'Ankh of life, breath of gods, fill me with eternal light.'
        },
        {
          id: 'pyramid-ascension',
          title: 'Pyramid Consciousness',
          duration: 10,
          instructions: 'Visualize yourself inside the Great Pyramid. Ascend to the King\'s Chamber and receive the initiation of higher consciousness.',
          mantra: 'In the pyramid of light, I ascend to divine sight.'
        }
      ],
      'indigenous': [
        {
          id: 'smudging',
          title: 'Sacred Smudging',
          duration: 5,
          instructions: 'Light sage, cedar, or sweetgrass. Let the smoke purify your space and being. Offer prayers of gratitude to the four directions.',
          mantra: 'Great Spirit, purify this space, bless all beings with your grace.'
        },
        {
          id: 'four-directions',
          title: 'Four Directions Prayer',
          duration: 15,
          instructions: 'Face each direction (East-new beginnings, South-growth, West-introspection, North-wisdom) and offer prayers, asking for guidance from each direction\'s power.',
          mantra: 'To the East, South, West, and North, I call your wisdom forth.'
        },
        {
          id: 'animal-spirit',
          title: 'Animal Spirit Connection',
          duration: 10,
          instructions: 'Call upon your animal spirit guide. Ask what medicine they bring you today. Listen with your heart for their guidance.',
          mantra: 'Animal spirits, teachers true, share your medicine, make me new.'
        },
        {
          id: 'gratitude-offering',
          title: 'Gratitude Offering',
          duration: 5,
          instructions: 'Offer tobacco, cornmeal, or prayers to Mother Earth. Thank her for sustaining all life and ask how you can give back.',
          mantra: 'Mother Earth, provider true, I offer my gratitude to you.'
        }
      ],
      'hindu': [
        {
          id: 'preparation',
          title: 'Sacred Preparation',
          duration: 5,
          instructions: 'Sit facing east if possible. Light a candle or diya. Place your hands in prayer position (anjali mudra) at your heart center.',
          mantra: 'Om Gam Ganapataye Namaha (removing obstacles)'
        },
        {
          id: 'pranayama',
          title: 'Pranayama (Sacred Breathing)',
          duration: 15,
          instructions: 'Practice alternate nostril breathing (Nadi Shodhana). Inhale left nostril, exhale right. Inhale right, exhale left. This balances your energy.',
          mantra: 'Om So Hum (I am That)'
        },
        {
          id: 'mantra-meditation',
          title: 'Mantra Meditation',
          duration: 15,
          instructions: 'Chant your chosen mantra 108 times using a mala (prayer beads) if available. Let the sacred sound vibrate through your entire being.',
          mantra: 'Om Namah Shivaya (I bow to the divine within)'
        },
        {
          id: 'gratitude',
          title: 'Gratitude and Dedication',
          duration: 5,
          instructions: 'Offer your practice to the divine and all beings. Express gratitude for the teachings and ask for continued guidance on your spiritual path.',
          mantra: 'Lokah Samastah Sukhino Bhavantu (May all beings be happy and free)'
        }
      ]
    };

    return practiceSteps[tradition.id as keyof typeof practiceSteps] || [
      {
        id: 'basic',
        title: 'Sacred Practice',
        duration: 20,
        instructions: 'Engage in contemplative practice according to this sacred tradition.',
        mantra: 'May wisdom and peace fill my heart.'
      }
    ];
  };

  const steps = getPracticeSteps();
  const currentStepData = steps[currentStep];

  React.useEffect(() => {
    if (currentStepData) {
      setTimeRemaining(currentStepData.duration * 60);
    }
  }, [currentStep, currentStepData]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsActive(false);
            if (!completedSteps.includes(currentStep)) {
              setCompletedSteps(prev => [...prev, currentStep]);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining, currentStep, completedSteps]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressValue = currentStepData ? ((currentStepData.duration * 60 - timeRemaining) / (currentStepData.duration * 60)) * 100 : 0;

  const startPause = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeRemaining(currentStepData.duration * 60);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsActive(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsActive(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-6 border-purple-400 text-purple-200 hover:bg-purple-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Teachings
          </Button>
          
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {tradition.name} Practice Session
            </h1>
            <p className="text-purple-200 text-lg">Sacred Practice Guidance</p>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">Session Progress</h3>
              <Badge className="bg-purple-600">
                Step {currentStep + 1} of {steps.length}
              </Badge>
            </div>
            <div className="flex gap-2 mb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-2 rounded ${
                    completedSteps.includes(index) 
                      ? 'bg-green-500' 
                      : index === currentStep 
                        ? 'bg-purple-500' 
                        : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Step */}
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>{currentStepData.title}</span>
              {completedSteps.includes(currentStep) && (
                <Check className="w-6 h-6 text-green-400" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Timer */}
            <div className="text-center space-y-4">
              <div className="text-6xl font-mono font-bold text-white bg-gray-800 rounded-lg py-4 px-6 border border-gray-600">
                {formatTime(timeRemaining)}
              </div>
              <Progress value={progressValue} className="h-4 bg-gray-800 border border-gray-600" />
              <div className="text-white text-lg font-semibold">
                {Math.round(progressValue)}% Complete
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={startPause}
                className={`${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isActive ? 'Pause' : 'Start'}
              </Button>
              <Button
                onClick={resetTimer}
                variant="outline"
                className="border-gray-500 text-gray-300 hover:bg-gray-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-purple-900/20 rounded-lg p-6">
              <h4 className="text-white font-semibold mb-3">Practice Instructions:</h4>
              <p className="text-purple-100 leading-relaxed mb-4">
                {currentStepData.instructions}
              </p>
              {currentStepData.mantra && (
                <div className="bg-gray-800 rounded-lg p-4 border border-purple-400">
                  <h5 className="text-purple-200 font-semibold mb-2">Sacred Mantra:</h5>
                  <p className="text-purple-100 italic">
                    "{currentStepData.mantra}"
                  </p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                onClick={prevStep}
                disabled={currentStep === 0}
                variant="outline"
                className="border-purple-500 text-purple-300 hover:bg-purple-700 disabled:opacity-50"
              >
                Previous Step
              </Button>
              <Button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
              >
                Next Step
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
