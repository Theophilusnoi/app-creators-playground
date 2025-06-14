
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { voiceService, VoiceOptions, VoiceResponse } from '@/utils/voiceService';
import { useToast } from '@/hooks/use-toast';

export const useVoiceService = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const { i18n } = useTranslation();
  const { toast } = useToast();

  const generateAndPlay = useCallback(async (options: Omit<VoiceOptions, 'locale'>) => {
    setIsGenerating(true);
    
    try {
      const voiceOptions: VoiceOptions = {
        ...options,
        locale: i18n.language
      };

      const response: VoiceResponse = await voiceService.generateSpeech(voiceOptions);

      if (response.success && response.audioUrl) {
        // Stop any currently playing audio
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.remove();
        }

        const audio = new Audio(response.audioUrl);
        setCurrentAudio(audio);

        audio.onended = () => {
          voiceService.cleanup(response.audioUrl);
          setCurrentAudio(null);
        };

        audio.onerror = () => {
          toast({
            title: "Voice Error",
            description: "Failed to play audio guidance. Showing text instead.",
            variant: "destructive"
          });
          voiceService.cleanup(response.audioUrl);
          setCurrentAudio(null);
        };

        await audio.play();
        return true;
      } else {
        toast({
          title: "Voice Unavailable",
          description: response.error || "Voice service temporarily unavailable",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Voice generation error:', error);
      toast({
        title: "Voice Error", 
        description: "Failed to generate voice guidance",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsGenerating(false);
    }
  }, [currentAudio, i18n.language, toast]);

  const stopAudio = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.remove();
      setCurrentAudio(null);
    }
  }, [currentAudio]);

  const setApiKey = useCallback((key: string) => {
    voiceService.setApiKey(key);
  }, []);

  return {
    generateAndPlay,
    stopAudio,
    setApiKey,
    isGenerating,
    isPlaying: !!currentAudio
  };
};
