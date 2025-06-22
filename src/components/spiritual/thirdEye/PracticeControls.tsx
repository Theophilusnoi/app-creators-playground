
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
    <div className="flex justify-center gap-4 p-4">
      {!isActive && timeRemaining === totalSeconds && (
        <Button 
          onClick={onStart} 
          className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 h-auto min-h-[60px] shadow-xl border-2 border-green-400/50"
        >
          <Play className="w-6 h-6 mr-3" />
          Begin Practice
        </Button>
      )}
      
      {timeRemaining < totalSeconds && (
        <>
          <Button 
            onClick={onPause} 
            variant="outline" 
            className="bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/30 font-bold text-lg px-6 py-4 h-auto min-h-[60px] shadow-xl"
          >
            {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          <Button 
            onClick={onReset} 
            variant="outline"
            className="bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/30 font-bold text-lg px-6 py-4 h-auto min-h-[60px] shadow-xl"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
        </>
      )}
      
      {isCompleted && (
        <Button 
          onClick={onComplete} 
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-8 py-4 h-auto min-h-[60px] shadow-xl border-2 border-purple-400/50"
        >
          <CheckCircle2 className="w-6 h-6 mr-3" />
          Complete Stage
        </Button>
      )}
    </div>
  );
};
