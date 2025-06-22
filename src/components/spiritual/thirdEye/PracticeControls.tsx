
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
    <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 p-2 md:p-4 mobile-optimized">
      {!isActive && timeRemaining === totalSeconds && (
        <Button 
          onClick={onStart} 
          className="bg-green-600 hover:bg-green-700 text-white font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto min-h-[50px] shadow-xl border-2 border-green-400 crisp-text"
        >
          <Play className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
          Begin Practice
        </Button>
      )}
      
      {timeRemaining < totalSeconds && (
        <>
          <Button 
            onClick={onPause} 
            variant="outline" 
            className="bg-gray-700 border-2 border-gray-600 text-white hover:bg-gray-600 font-bold text-base md:text-lg px-4 md:px-6 py-3 md:py-4 h-auto min-h-[50px] shadow-xl crisp-text"
          >
            {isActive ? <Pause className="w-5 h-5 md:w-6 md:h-6" /> : <Play className="w-5 h-5 md:w-6 md:h-6" />}
          </Button>
          <Button 
            onClick={onReset} 
            variant="outline"
            className="bg-gray-700 border-2 border-gray-600 text-white hover:bg-gray-600 font-bold text-base md:text-lg px-4 md:px-6 py-3 md:py-4 h-auto min-h-[50px] shadow-xl crisp-text"
          >
            <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
        </>
      )}
      
      {isCompleted && (
        <Button 
          onClick={onComplete} 
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto min-h-[50px] shadow-xl border-2 border-purple-400 crisp-text"
        >
          <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
          Complete Stage
        </Button>
      )}
    </div>
  );
};
