
import React from 'react';
import { Button } from "@/components/ui/button";
import { useVoiceService } from '@/hooks/useVoiceService';
import { useToast } from '@/hooks/use-toast';
import { Volume2, VolumeX } from "lucide-react";

interface VoicePlayerProps {
  script: string;
  tone?: string;
}

export const VoicePlayer: React.FC<VoicePlayerProps> = ({ script, tone }) => {
  const { toast } = useToast();
  const {
    generateAndPlay,
    stopAudio,
    isGenerating,
    isPlaying
  } = useVoiceService();

  const handlePlay = async () => {
    const success = await generateAndPlay({
      text: script,
      emotion: tone === 'nurturing_gentle' ? 'compassionate' : undefined,
    });
    
    if (!success) {
      toast({
        title: "Voice playback failed",
        description: "Could not play voice. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="my-2">
      <Button
        onClick={isPlaying ? stopAudio : handlePlay}
        disabled={isGenerating}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-white ${
          isPlaying 
            ? "bg-purple-400 hover:bg-purple-300" 
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        {isPlaying ? "Stop" : isGenerating ? "Loading..." : "Play Voice"}
      </Button>
    </div>
  );
};
