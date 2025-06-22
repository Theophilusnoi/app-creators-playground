
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
    <div className="text-center space-y-6 p-4">
      <div className="text-6xl md:text-8xl font-mono font-bold text-white drop-shadow-2xl bg-black/40 rounded-lg py-4 px-6 backdrop-blur-sm border border-white/20">
        {formatTime(timeRemaining)}
      </div>
      <div className="space-y-2">
        <Progress value={progressValue} className="h-4 bg-black/50 border border-white/30" />
        <div className="text-white text-lg font-semibold drop-shadow-lg">
          {Math.round(progressValue)}% Complete
        </div>
      </div>
    </div>
  );
};
