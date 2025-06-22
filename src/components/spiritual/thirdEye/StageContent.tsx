
import React from 'react';
import { VoicePlayer } from '../VoicePlayer';

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
  return (
    <div className="space-y-8 p-2">
      {/* Practice Items */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20 shadow-2xl">
        <h4 className="font-bold text-white text-xl mb-4 drop-shadow-lg">Practice Elements:</h4>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="text-white font-semibold text-lg flex items-center drop-shadow-lg">
              <span className="w-3 h-3 bg-purple-400 rounded-full mr-4 shadow-lg"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Zodiac Adjustments */}
      {zodiacAdjustment && (
        <div className="bg-gradient-to-r from-yellow-900/60 to-orange-900/60 backdrop-blur-sm border-2 border-yellow-400/50 rounded-xl p-6 shadow-2xl">
          <h4 className="font-bold text-yellow-100 text-xl mb-3 drop-shadow-lg">Your Zodiac Adjustment:</h4>
          <p className="text-yellow-50 text-lg font-medium drop-shadow-lg leading-relaxed">{zodiacAdjustment}</p>
        </div>
      )}

      {/* Sacred Incantation */}
      <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 backdrop-blur-sm border-2 border-purple-400/50 rounded-xl p-6 shadow-2xl">
        <div className="mb-4">
          <h4 className="font-bold text-purple-100 text-xl mb-4 drop-shadow-lg">Sacred Incantation:</h4>
          <VoicePlayer script={incantation} tone="nurturing_gentle" />
        </div>
        <div className="bg-black/40 rounded-lg p-4 border border-purple-300/30">
          <p className="text-purple-50 italic text-lg font-medium leading-relaxed drop-shadow-lg">
            "{incantation}"
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20 shadow-2xl">
        <h4 className="font-bold text-white text-xl mb-4 drop-shadow-lg">Instructions:</h4>
        <p className="text-white font-medium text-lg leading-loose drop-shadow-lg">
          {instructions}
        </p>
      </div>
    </div>
  );
};
