
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
    <div className="text-center space-y-4 md:space-y-6 p-2 md:p-4 mobile-optimized">
      <div className="text-4xl md:text-6xl lg:text-8xl font-mono font-bold text-white bg-gray-800 rounded-lg py-3 md:py-4 px-4 md:px-6 border border-gray-600 crisp-text">
        {formatTime(timeRemaining)}
      </div>
      <div className="space-y-2">
        <Progress value={progressValue} className="h-3 md:h-4 bg-gray-800 border border-gray-600" />
        <div className="text-white text-base md:text-lg font-semibold crisp-text">
          {Math.round(progressValue)}% Complete
        </div>
      </div>
    </div>
  );
};
