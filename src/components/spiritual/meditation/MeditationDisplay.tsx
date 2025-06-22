
import React from 'react';
import { CheckCircle2 } from "lucide-react";
import { VoicePlayer } from '../VoicePlayer';

interface MeditationDisplayProps {
  phase: 'preparation' | 'active' | 'completion';
  timeRemaining: number;
  aiGuidanceText: string;
}

export const MeditationDisplay: React.FC<MeditationDisplayProps> = ({
  phase,
  timeRemaining,
  aiGuidanceText
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (phase === 'completion') {
    return (
      <div className="text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Meditation Complete</h3>
        <p className="text-green-200">
          Your mind has been stilled and your spirit renewed.
        </p>
      </div>
    );
  }

  if (phase === 'active') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400">
            {formatTime(timeRemaining)}
          </div>
          <p className="text-green-200">Focus on your breath...</p>
        </div>

        {aiGuidanceText && (
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/50 rounded-lg p-6 text-center mb-6">
            <div className="text-sm text-purple-200 mb-2">Guided by Seraphina</div>
            <div className="text-purple-100 leading-relaxed text-sm whitespace-pre-line mb-4">
              {aiGuidanceText}
            </div>
            <VoicePlayer 
              script={aiGuidanceText} 
              tone="nurturing_gentle"
            />
          </div>
        )}
      </div>
    );
  }

  return null;
};
