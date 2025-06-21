
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Volume2, 
  VolumeOff,
  Heart,
  Sparkles,
  Moon,
  Shield,
  Flame
} from 'lucide-react';

interface IncantationStepProps {
  id: string;
  title: string;
  description: string;
  text: string;
  color: string;
  index: number;
  isPlaying: boolean;
  isGenerating: boolean;
  onPlay: () => void;
}

export const IncantationStep: React.FC<IncantationStepProps> = ({
  id,
  title,
  description,
  text,
  color,
  index,
  isPlaying,
  isGenerating,
  onPlay
}) => {
  const getStepIcon = (step: string) => {
    if (step.includes('space')) return <Sparkles className="w-5 h-5" />;
    if (step.includes('candle')) return <Flame className="w-5 h-5" />;
    if (step.includes('water')) return <Moon className="w-5 h-5" />;
    if (step.includes('immersion')) return <Heart className="w-5 h-5" />;
    if (step.includes('closing')) return <Shield className="w-5 h-5" />;
    return <Sparkles className="w-5 h-5" />;
  };

  return (
    <Card className={`bg-gradient-to-br ${color}/20 border-2 border-current/30`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          <div className="bg-white/20 rounded-full p-2">
            {getStepIcon(id)}
          </div>
          <div>
            <div className="text-lg">Step {index + 1}: {title}</div>
            <div className="text-sm opacity-90 font-normal">{description}</div>
          </div>
          <Button
            onClick={onPlay}
            variant="ghost"
            size="sm"
            className="ml-auto text-white/80 hover:text-white"
            disabled={isGenerating}
          >
            {isPlaying ? 
              <VolumeOff className="w-5 h-5" /> : 
              <Volume2 className="w-5 h-5" />
            }
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-black/20 rounded-lg p-4 border border-white/20">
          <pre className="text-white leading-relaxed whitespace-pre-wrap font-serif text-lg">
            {text}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};
