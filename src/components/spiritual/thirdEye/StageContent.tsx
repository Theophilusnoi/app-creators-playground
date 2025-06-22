
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { useVoiceService } from '@/hooks/useVoiceService';

interface StageContentProps {
  items: string[];
  incantation: string;
  instructions: string;
  zodiacAdjustment?: string;
}

export const StageContent: React.FC<StageContentProps> = ({
  items,
  incantation,
  instructions,
  zodiacAdjustment
}) => {
  const { generateAndPlay } = useVoiceService();

  return (
    <div className="space-y-6">
      {/* Practice Items */}
      <div className="bg-black/20 rounded-lg p-4">
        <h4 className="font-semibold text-white mb-3">Practice Elements:</h4>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="text-white/90 flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Zodiac Adjustments */}
      {zodiacAdjustment && (
        <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-400/30 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-200 mb-2">Your Zodiac Adjustment:</h4>
          <p className="text-yellow-100 text-sm">{zodiacAdjustment}</p>
        </div>
      )}

      {/* Sacred Incantation */}
      <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-400/30 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-purple-200">Sacred Incantation:</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => generateAndPlay({ text: incantation, emotion: 'compassionate' })}
            className="text-purple-300 hover:text-purple-100"
          >
            <Volume2 className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-purple-100 italic leading-relaxed">
          "{incantation}"
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-black/20 rounded-lg p-4">
        <h4 className="font-semibold text-white mb-2">Instructions:</h4>
        <p className="text-white/90 text-sm leading-relaxed">
          {instructions}
        </p>
      </div>
    </div>
  );
};
