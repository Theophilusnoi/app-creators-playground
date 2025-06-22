
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
    <div className="space-y-6 mobile-optimized">
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
              className="bg-purple-600 hover:bg-purple-700 text-white min-h-[48px] crisp-text font-semibold"
            >
              Continue to Practice
            </Button>
          </div>
        </div>
      )}
      
      {!showNarrative && (
        <Card className="bg-gray-800 border-gray-700 shadow-2xl mobile-backdrop">
          <CardHeader className="pb-4">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-4 text-white">
              <div className="bg-gray-700 rounded-full p-4 border-2 border-gray-600 shadow-xl self-start">
                <Icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="flex-1">
                <div className="text-2xl md:text-3xl font-bold crisp-text">{currentStage.title}</div>
                <div className="text-base md:text-lg text-gray-300 font-medium mt-2 crisp-text">{stage.description}</div>
              </div>
              <div className="flex flex-col gap-2 self-start">
                {isCompleted && (
                  <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
                )}
                <Button
                  onClick={() => setShowNarrative(true)}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-white hover:bg-gray-700 crisp-text"
                >
                  View Guide
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8 pb-8">
            {/* Timer and Controls */}
            <div className="bg-gray-900 rounded-xl p-4 md:p-6 border-2 border-gray-700 shadow-2xl">
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
