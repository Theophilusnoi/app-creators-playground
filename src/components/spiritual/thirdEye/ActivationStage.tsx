
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, CheckCircle2, Timer, Volume2 } from 'lucide-react';
import { useVoiceService } from '@/hooks/useVoiceService';

interface ActivationStageProps {
  stage: any;
  stageIndex: number;
  zodiacProfile: any;
  onComplete: (stageData: any) => void;
}

const stageContent = {
  0: {
    title: 'Preparation & Grounding',
    items: ['🕯️ Light indigo candle', '💎 Place amethyst/fluorite nearby', '🌿 Burn frankincense resin'],
    incantation: 'Roots to earth, crown to sky – My inner vision wakes, yet I stay dry. Grounded in form, free in soul, I prepare to perceive the unseen whole.',
    duration: 10,
    instructions: 'Set up your sacred space with the listed items. Sit comfortably and speak the incantation three times while focusing on your breath.'
  },
  1: {
    title: 'Pranayama & Energy Channeling',
    items: ['🌬️ Alternate nostril breathing', '⏱️ 5-15 minute sessions', '🧠 Focus on pineal gland'],
    incantation: 'Breath of life, flow through me, Balance left and right I see. Energy rises, channels clear, Third eye opening, vision near.',
    duration: 15,
    instructions: 'Practice alternate nostril breathing (Nadi Shodhana). Use your thumb and ring finger to alternate closing nostrils. Inhale left, exhale right, inhale right, exhale left.'
  },
  2: {
    title: 'Focal Meditation',
    items: ['🕯️ Candle gazing (Trataka)', '👁️ 3 minutes no blinking', '🔵 Observe afterimage'],
    incantation: 'Flame of truth, light divine, Open now this eye of mine. Steady gaze and focused sight, Reveal to me the inner light.',
    duration: 12,
    instructions: 'Gaze at a candle flame without blinking for 3 minutes. Close your eyes and observe the afterimage. Trace the light from the image to your brow center.'
  },
  3: {
    title: 'Symbol Activation',
    items: ['🔯 Sacred geometry focus', '🕉️ AUM or KSHAM mantra', '📿 108 repetitions'],
    incantation: 'Seed of light, between my brows, Pierce illusion, end all doubts. Yantra\'s lines, mantra\'s sound – Awake, Ajna, profound!',
    duration: 18,
    instructions: 'Visualize sacred geometry (Sri Yantra or chosen symbol) at your third eye while chanting the seed mantra AUM or KSHAM 108 times.'
  },
  4: {
    title: 'Clairvoyant Integration',
    items: ['📔 Vision journaling', '🌙 Body scanning', '✨ Symbol interpretation'],
    incantation: 'Visions clear and insights true, Ancient wisdom flows through. Integration now complete, Inner sight and earth I meet.',
    duration: 20,
    instructions: 'Spend time journaling any visions, sensations, or symbols you received. Scan your body for tingling at the brow center. Record your experiences.'
  }
};

export const ActivationStage: React.FC<ActivationStageProps> = ({ 
  stage, 
  stageIndex, 
  zodiacProfile, 
  onComplete 
}) => {
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const { generateAndPlay } = useVoiceService();

  const currentStage = stageContent[stageIndex as keyof typeof stageContent];
  const Icon = stage.icon;

  useEffect(() => {
    setTimeRemaining(currentStage.duration * 60);
  }, [currentStage]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsActive(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const startPractice = () => {
    setIsActive(true);
    // Play the incantation
    generateAndPlay({
      text: currentStage.incantation,
      emotion: 'compassionate'
    });
  };

  const pausePractice = () => {
    setIsActive(!isActive);
  };

  const resetPractice = () => {
    setIsActive(false);
    setTimeRemaining(currentStage.duration * 60);
    setIsCompleted(false);
  };

  const completeStage = () => {
    onComplete({
      stageIndex,
      duration: currentStage.duration,
      completed: true,
      timestamp: new Date().toISOString()
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getZodiacAdjustments = () => {
    if (!zodiacProfile) return null;
    
    const adjustments: any = {
      fire: '🔥 Visualize golden light entering through your breath',
      earth: '🌱 Add grounding crystal (hematite) to your setup',
      air: '💨 Focus on silver winds clearing mental fog',
      water: '🌊 Use selenite for psychic purification'
    };

    return adjustments[zodiacProfile.elements?.primary];
  };

  return (
    <Card className={`bg-gradient-to-br ${stage.color}/20 border-2 border-current/30`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          <div className="bg-white/20 rounded-full p-3">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl">{currentStage.title}</div>
            <div className="text-sm opacity-90 font-normal">{stage.description}</div>
          </div>
          {isCompleted && (
            <CheckCircle2 className="w-8 h-8 text-green-400 ml-auto" />
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Timer and Controls */}
        <div className="text-center space-y-4">
          <div className="text-4xl font-mono text-white">
            {formatTime(timeRemaining)}
          </div>
          <Progress 
            value={((currentStage.duration * 60 - timeRemaining) / (currentStage.duration * 60)) * 100} 
            className="h-3"
          />
          
          <div className="flex justify-center gap-3">
            {!isActive && timeRemaining === currentStage.duration * 60 && (
              <Button onClick={startPractice} className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                Begin Practice
              </Button>
            )}
            
            {timeRemaining < currentStage.duration * 60 && (
              <>
                <Button onClick={pausePractice} variant="outline">
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button onClick={resetPractice} variant="outline">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </>
            )}
            
            {isCompleted && (
              <Button onClick={completeStage} className="bg-purple-600 hover:bg-purple-700">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Complete Stage
              </Button>
            )}
          </div>
        </div>

        {/* Practice Items */}
        <div className="bg-black/20 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-3">Practice Elements:</h4>
          <ul className="space-y-2">
            {currentStage.items.map((item, index) => (
              <li key={index} className="text-white/90 flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Zodiac Adjustments */}
        {zodiacProfile && getZodiacAdjustments() && (
          <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-400/30 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-200 mb-2">Your Zodiac Adjustment:</h4>
            <p className="text-yellow-100 text-sm">{getZodiacAdjustments()}</p>
          </div>
        )}

        {/* Sacred Incantation */}
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-400/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-purple-200">Sacred Incantation:</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => generateAndPlay({ text: currentStage.incantation, emotion: 'compassionate' })}
              className="text-purple-300 hover:text-purple-100"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-purple-100 italic leading-relaxed">
            "{currentStage.incantation}"
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-black/20 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-2">Instructions:</h4>
          <p className="text-white/90 text-sm leading-relaxed">
            {currentStage.instructions}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
