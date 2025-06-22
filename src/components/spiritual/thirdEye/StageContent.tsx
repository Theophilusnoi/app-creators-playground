
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
    <div className="space-y-6 md:space-y-8 p-2 mobile-optimized">
      {/* Practice Items */}
      <div className="bg-gray-900 rounded-xl p-4 md:p-6 border-2 border-gray-700 shadow-2xl">
        <h4 className="font-bold text-white text-lg md:text-xl mb-4 crisp-text">Practice Elements:</h4>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="text-white font-medium text-sm md:text-lg flex items-start crisp-text">
              <span className="w-3 h-3 bg-purple-400 rounded-full mr-4 mt-1 flex-shrink-0 shadow-lg"></span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Zodiac Adjustments */}
      {zodiacAdjustment && (
        <div className="bg-yellow-900 border-2 border-yellow-600 rounded-xl p-4 md:p-6 shadow-2xl">
          <h4 className="font-bold text-yellow-100 text-lg md:text-xl mb-3 crisp-text">Your Zodiac Adjustment:</h4>
          <p className="text-yellow-50 text-sm md:text-lg font-medium crisp-text leading-relaxed">{zodiacAdjustment}</p>
        </div>
      )}

      {/* Sacred Incantation */}
      <div className="bg-purple-900 border-2 border-purple-600 rounded-xl p-4 md:p-6 shadow-2xl">
        <div className="mb-4">
          <h4 className="font-bold text-purple-100 text-lg md:text-xl mb-4 crisp-text">Sacred Incantation:</h4>
          <VoicePlayer script={incantation} tone="nurturing_gentle" />
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-purple-400">
          <p className="text-purple-50 italic text-sm md:text-lg font-medium leading-relaxed crisp-text">
            "{incantation}"
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-900 rounded-xl p-4 md:p-6 border-2 border-gray-700 shadow-2xl">
        <h4 className="font-bold text-white text-lg md:text-xl mb-4 crisp-text">Instructions:</h4>
        <p className="text-white font-medium text-sm md:text-lg leading-relaxed crisp-text">
          {instructions}
        </p>
      </div>
    </div>
  );
};
