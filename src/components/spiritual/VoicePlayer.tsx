
import React from 'react';
import { Button } from "@/components/ui/button";
import { useVoiceService } from '@/hooks/useVoiceService';
import { useToast } from '@/hooks/use-toast';
import { Volume2, VolumeX, Play } from "lucide-react";

interface VoicePlayerProps {
  script: string;
  tone?: string;
}

export const VoicePlayer: React.FC<VoicePlayerProps> = ({ script, tone }) => {
  const { toast } = useToast();
  const {
    generateAndPlay,
    playReadyAudio,
    stopAudio,
    isGenerating,
    isPlaying,
    audioReady
  } = useVoiceService();

  const handleGenerate = async () => {
    const success = await generateAndPlay({
      text: script,
      emotion: tone === 'nurturing_gentle' ? 'compassionate' : undefined,
    });
    
    if (!success) {
      toast({
        title: "Voice generation failed",
        description: "Could not generate voice. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handlePlay = () => {
    if (audioReady) {
      playReadyAudio();
    } else {
      handleGenerate();
    }
  };

  return (
    <div className="my-2 flex gap-2">
      {!audioReady && !isPlaying && (
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-white bg-purple-600 hover:bg-purple-700"
        >
          <Volume2 className="w-5 h-5" />
          {isGenerating ? "Generating..." : "Generate Voice"}
        </Button>
      )}

      {audioReady && !isPlaying && (
        <Button
          onClick={playReadyAudio}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-white bg-green-600 hover:bg-green-700"
        >
          <Play className="w-5 h-5" />
          Play Voice
        </Button>
      )}

      {isPlaying && (
        <Button
          onClick={stopAudio}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-white bg-purple-400 hover:bg-purple-300"
        >
          <VolumeX className="w-5 h-5" />
          Stop
        </Button>
      )}
    </div>
  );
};
