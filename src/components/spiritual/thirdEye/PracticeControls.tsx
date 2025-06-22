
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, CheckCircle2 } from 'lucide-react';

interface PracticeControlsProps {
  isActive: boolean;
  timeRemaining: number;
  duration: number;
  isCompleted: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onComplete: () => void;
}

export const PracticeControls: React.FC<PracticeControlsProps> = ({
  isActive,
  timeRemaining,
  duration,
  isCompleted,
  onStart,
  onPause,
  onReset,
  onComplete
}) => {
  const totalSeconds = duration * 60;

  return (
    <div className="flex justify-center gap-3">
      {!isActive && timeRemaining === totalSeconds && (
        <Button onClick={onStart} className="bg-green-600 hover:bg-green-700">
          <Play className="w-4 h-4 mr-2" />
          Begin Practice
        </Button>
      )}
      
      {timeRemaining < totalSeconds && (
        <>
          <Button onClick={onPause} variant="outline">
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button onClick={onReset} variant="outline">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </>
      )}
      
      {isCompleted && (
        <Button onClick={onComplete} className="bg-purple-600 hover:bg-purple-700">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Complete Stage
        </Button>
      )}
    </div>
  );
};
