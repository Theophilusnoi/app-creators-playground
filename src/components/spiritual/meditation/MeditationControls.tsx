
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from "lucide-react";

interface MeditationControlsProps {
  isActive: boolean;
  onPlayPause: () => void;
  onSkipForward: () => void;
  onSkipBack: () => void;
  onReset: () => void;
}

export const MeditationControls: React.FC<MeditationControlsProps> = ({
  isActive,
  onPlayPause,
  onSkipForward,
  onSkipBack,
  onReset
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-around">
        <Button 
          onClick={onSkipBack} 
          variant="outline" 
          size="icon" 
          className="border-gray-600 text-white hover:bg-gray-700"
        >
          <SkipBack className="w-5 h-5" />
        </Button>
        <Button 
          onClick={onPlayPause} 
          variant="outline" 
          size="icon" 
          className="border-gray-600 text-white hover:bg-gray-700"
        >
          {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        <Button 
          onClick={onSkipForward} 
          variant="outline" 
          size="icon" 
          className="border-gray-600 text-white hover:bg-gray-700"
        >
          <SkipForward className="w-5 h-5" />
        </Button>
      </div>

      <Button 
        onClick={onReset} 
        variant="secondary" 
        className="w-full bg-gray-700 hover:bg-gray-600 text-white"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset
      </Button>
    </div>
  );
};
