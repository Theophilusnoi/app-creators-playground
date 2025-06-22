
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface PracticeTimerProps {
  timeRemaining: number;
  duration: number;
}

export const PracticeTimer: React.FC<PracticeTimerProps> = ({ 
  timeRemaining, 
  duration 
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSeconds = duration * 60;
  const progressValue = ((totalSeconds - timeRemaining) / totalSeconds) * 100;

  return (
    <div className="text-center space-y-4">
      <div className="text-4xl font-mono text-white">
        {formatTime(timeRemaining)}
      </div>
      <Progress value={progressValue} className="h-3" />
    </div>
  );
};
