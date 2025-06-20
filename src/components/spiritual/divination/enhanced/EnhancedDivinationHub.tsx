
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedPalmReaderWithCamera } from './EnhancedPalmReaderWithCamera';
import { Hand, Sparkles } from 'lucide-react';

export const EnhancedDivinationHub = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
          <Sparkles className="text-purple-600" size={40} />
          Enhanced Divination Hub
        </h1>
        <p className="text-purple-200 text-lg">
          Advanced camera integration for enhanced spiritual palm reading
        </p>
      </div>
      
      {/* Direct access to Enhanced Palm Reader */}
      <EnhancedPalmReaderWithCamera />
      
      <div className="text-center text-sm text-purple-400 space-y-2 mt-12">
        <p>✨ Enhanced divination tools for spiritual guidance and self-discovery ✨</p>
        <p>📱 Camera integration for enhanced palm reading accuracy</p>
        <p>🙏 Approach all readings with an open heart and sincere intention</p>
      </div>
    </div>
  );
};
