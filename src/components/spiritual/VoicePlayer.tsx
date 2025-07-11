
import React from 'react';
import { Button } from "@/components/ui/button";
import { useVoiceService } from '@/hooks/useVoiceService';
import { useToast } from '@/hooks/use-toast';
import { Volume2, VolumeX, Play, Loader2, AlertCircle } from "lucide-react";

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
    audioReady,
    generationProgress
  } = useVoiceService();

  const handleGenerate = async () => {
    // Show warning for very long texts
    if (script.length > 1500) {
      toast({
        title: "Long Text Detected",
        description: "This text will be processed in chunks. Generation may take longer.",
      });
    }

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
  };

  const handlePlay = () => {
    if (audioReady) {
      playReadyAudio();
    } else {
      handleGenerate();
    }
  };

  // Show text length warning
  const isLongText = script.length > 1000;
  const estimatedChunks = Math.ceil(script.length / 500);

  return (
    <div className="flex flex-col gap-3">
      {isLongText && (
        <div className="flex items-center gap-2 p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span className="text-amber-200 text-sm">
            Long text detected ({script.length} chars) - will be processed in ~{estimatedChunks} chunks
          </span>
        </div>
      )}

      <div className="flex gap-3">
        {!audioReady && !isPlaying && (
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-3 px-6 py-3 h-auto min-h-[50px] rounded-full text-white bg-purple-600 hover:bg-purple-700 font-bold text-lg shadow-xl border-2 border-purple-400/50 backdrop-blur-sm crisp-text"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {generationProgress || "Generating Voice..."}
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
            className="flex items-center gap-3 px-6 py-3 h-auto min-h-[50px] rounded-full text-white bg-green-600 hover:bg-green-700 font-bold text-lg shadow-xl border-2 border-green-400/50 backdrop-blur-sm crisp-text"
          >
            <Play className="w-5 h-5" />
            Play Sacred Voice
          </Button>
        )}

        {isPlaying && (
          <Button
            onClick={stopAudio}
            className="flex items-center gap-3 px-6 py-3 h-auto min-h-[50px] rounded-full text-white bg-red-500 hover:bg-red-600 font-bold text-lg shadow-xl border-2 border-red-400/50 backdrop-blur-sm crisp-text"
          >
            <VolumeX className="w-5 h-5" />
            Stop Voice
          </Button>
        )}
      </div>

      {generationProgress && (
        <div className="text-center text-purple-300 text-sm">
          {generationProgress}
        </div>
      )}
    </div>
  );
};
