
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { useVoiceService } from '@/hooks/useVoiceService';
import { stageContent } from './stageContent';
import { PracticeTimer } from './PracticeTimer';
import { PracticeControls } from './PracticeControls';
import { StageContent } from './StageContent';
import { useZodiacAdjustments } from './useZodiacAdjustments';

interface ActivationStageProps {
  stage: any;
  stageIndex: number;
  zodiacProfile: any;
  onComplete: (stageData: any) => void;
}

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
  const { getZodiacAdjustments } = useZodiacAdjustments();

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
        <div className="space-y-4">
          <PracticeTimer 
            timeRemaining={timeRemaining}
            duration={currentStage.duration}
          />
          
          <PracticeControls
            isActive={isActive}
            timeRemaining={timeRemaining}
            duration={currentStage.duration}
            isCompleted={isCompleted}
            onStart={startPractice}
            onPause={pausePractice}
            onReset={resetPractice}
            onComplete={completeStage}
          />
        </div>

        {/* Stage Content */}
        <StageContent
          items={currentStage.items}
          incantation={currentStage.incantation}
          instructions={currentStage.instructions}
          zodiacAdjustment={getZodiacAdjustments(zodiacProfile)}
        />
      </CardContent>
    </Card>
  );
};
