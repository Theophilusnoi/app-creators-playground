
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { stageContent } from './stageContent';
import { PracticeTimer } from './PracticeTimer';
import { PracticeControls } from './PracticeControls';
import { StageContent } from './StageContent';
import { StageNarrative } from './StageNarrative';
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
  const [showNarrative, setShowNarrative] = useState(true);
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
    <div className="space-y-6">
      {/* Stage Narrative */}
      {showNarrative && (
        <div>
          <StageNarrative
            stageIndex={stageIndex}
            stage={stage}
            duration={currentStage.duration}
          />
          <div className="text-center mb-4">
            <Button
              onClick={() => setShowNarrative(false)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Continue to Practice
            </Button>
          </div>
        </div>
      )}
      
      {!showNarrative && (
        <Card className={`bg-gradient-to-br ${stage.color}/30 backdrop-blur-sm border-2 border-white/30 shadow-2xl`}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-4 text-white">
              <div className="bg-white/30 backdrop-blur-sm rounded-full p-4 border-2 border-white/40 shadow-xl">
                <Icon className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="text-3xl font-bold drop-shadow-lg">{currentStage.title}</div>
                <div className="text-lg opacity-90 font-medium mt-2 drop-shadow-lg">{stage.description}</div>
              </div>
              <div className="flex flex-col gap-2">
                {isCompleted && (
                  <CheckCircle2 className="w-10 h-10 text-green-400 drop-shadow-lg" />
                )}
                <Button
                  onClick={() => setShowNarrative(true)}
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/20"
                >
                  View Guide
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8 pb-8">
            {/* Timer and Controls */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20 shadow-2xl">
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
      )}
    </div>
  );
};
