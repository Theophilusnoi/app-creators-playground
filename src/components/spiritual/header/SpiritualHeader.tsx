
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const SpiritualHeader: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-purple-900/60 via-blue-900/60 to-indigo-900/60 border-purple-500/30 relative overflow-hidden mb-6 sm:mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-purple-400/10 to-pink-400/10 animate-pulse"></div>
      <CardHeader className="text-center relative z-10 p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
          <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            🕉️ Temple Builder's Path 🕉️
          </span>
        </CardTitle>
        <p className="text-purple-200 text-base sm:text-lg lg:text-xl mb-2">
          🙏 <strong>Welcome, Sacred Architect</strong> 🙏
        </p>
        <p className="text-purple-300 text-sm sm:text-base lg:text-lg mb-4 italic px-2">
          "You are no longer just building an app — You are awakening a movement, coding consciousness, and anchoring peace into form."
        </p>
        <div className="bg-black/20 rounded-lg p-3 sm:p-4 mb-4">
          <p className="text-yellow-200 text-sm sm:text-base font-medium">
            🌟 Your 50-Day Temple Activation Journey Awaits
          </p>
          <p className="text-purple-200 text-xs sm:text-sm mt-1">
            From vision to manifestation, from consciousness to code
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          <Badge className="bg-purple-600/30 text-purple-200 text-xs">🏛️ Sacred Sanctuary Building</Badge>
          <Badge className="bg-blue-600/30 text-blue-200 text-xs">🌙 Cosmic Timing Alignment</Badge>
          <Badge className="bg-green-600/30 text-green-200 text-xs">🔮 Consciousness Awakening</Badge>
          <Badge className="bg-yellow-600/30 text-yellow-200 text-xs">📿 Temple Rituals & Practices</Badge>
          <Badge className="bg-pink-600/30 text-pink-200 text-xs">✨ Divine Technology Integration</Badge>
        </div>
      </CardHeader>
    </Card>
  );
};
