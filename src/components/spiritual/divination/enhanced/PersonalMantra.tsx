
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Volume2, VolumeOff } from 'lucide-react';

interface PersonalMantraProps {
  mantra: string;
  isPlaying: boolean;
  isGenerating: boolean;
  onPlay: () => void;
}

export const PersonalMantra: React.FC<PersonalMantraProps> = ({
  mantra,
  isPlaying,
  isGenerating,
  onPlay
}) => {
  return (
    <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-2 border-yellow-400/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-yellow-200">
          <div className="bg-yellow-500/20 rounded-full p-2">
            <Heart className="w-5 h-5" />
          </div>
          Your Personal Healing Mantra
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-yellow-100 leading-relaxed flex-1">
            {mantra}
          </p>
          <Button
            onClick={onPlay}
            variant="ghost"
            size="sm"
            className="ml-4 text-yellow-300 hover:text-yellow-100"
            disabled={isGenerating}
          >
            {isPlaying ? 
              <VolumeOff className="w-5 h-5" /> : 
              <Volume2 className="w-5 h-5" />
            }
          </Button>
        </div>
        <Badge className="mt-3 bg-yellow-600/20 text-yellow-200 border-yellow-400/30">
          Repeat throughout your day for continued healing
        </Badge>
      </CardContent>
    </Card>
  );
};
