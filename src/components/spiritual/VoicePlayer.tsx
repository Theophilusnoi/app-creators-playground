
import React from 'react';
import { Button } from "@/components/ui/button";
import { useVoiceService } from '@/hooks/useVoiceService';
import { useToast } from '@/hooks/use-toast';
import { Volume2, VolumeX, Play, Loader2 } from "lucide-react";

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
      emotion: tone === 'nurturing_gentle' ? 'compassionate' : 'compassionate',
    });
    
    if (success && audioReady) {
      // Auto-play after generation since user initiated the action
      setTimeout(() => {
        playReadyAudio();
      }, 500);
    }
    
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
    <div className="flex gap-3">
      {!audioReady && !isPlaying && (
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-3 px-6 py-3 h-auto min-h-[50px] rounded-full text-white bg-purple-600 hover:bg-purple-700 font-bold text-lg shadow-xl border-2 border-purple-400/50 backdrop-blur-sm"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Voice...
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5" />
              Generate & Play Voice
            </>
          )}
        </Button>
      )}

      {audioReady && !isPlaying && (
        <Button
          onClick={playReadyAudio}
          className="flex items-center gap-3 px-6 py-3 h-auto min-h-[50px] rounded-full text-white bg-green-600 hover:bg-green-700 font-bold text-lg shadow-xl border-2 border-green-400/50 backdrop-blur-sm"
        >
          <Play className="w-5 h-5" />
          Play Sacred Voice
        </Button>
      )}

      {isPlaying && (
        <Button
          onClick={stopAudio}
          className="flex items-center gap-3 px-6 py-3 h-auto min-h-[50px] rounded-full text-white bg-red-500 hover:bg-red-600 font-bold text-lg shadow-xl border-2 border-red-400/50 backdrop-blur-sm"
        >
          <VolumeX className="w-5 h-5" />
          Stop Voice
        </Button>
      )}
    </div>
  );
};
