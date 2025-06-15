
import { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { voiceService, VoiceOptions, VoiceResponse } from '@/utils/voiceService';
import { useToast } from '@/hooks/use-toast';

export const useVoiceService = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const { i18n } = useTranslation();
  const { toast } = useToast();

  const generateAndPlay = useCallback(async (options: Omit<VoiceOptions, 'locale'>) => {
    setIsGenerating(true);
    
    try {
      const voiceOptions: VoiceOptions = {
        ...options,
        locale: i18n.language
      };

      console.log('Generating speech with options:', voiceOptions);
      const response: VoiceResponse = await voiceService.generateSpeech(voiceOptions);

      if (response.success && response.audioUrl) {
        // Stop any currently playing audio
        if (currentAudioRef.current) {
          currentAudioRef.current.pause();
          currentAudioRef.current.remove();
          currentAudioRef.current = null;
        }

        const audio = new Audio(response.audioUrl);
        currentAudioRef.current = audio;
        setIsPlaying(true);

        audio.onended = () => {
          console.log('Audio playback ended');
          voiceService.cleanup(response.audioUrl);
          setIsPlaying(false);
          currentAudioRef.current = null;
        };

        audio.onerror = (error) => {
          console.error('Audio playback error:', error);
          toast({
            title: "Voice Error",
            description: "Failed to play audio guidance. Please try again.",
            variant: "destructive"
          });
          voiceService.cleanup(response.audioUrl);
          setIsPlaying(false);
          currentAudioRef.current = null;
        };

        audio.onloadstart = () => {
          console.log('Audio loading started');
        };

        audio.oncanplay = () => {
          console.log('Audio can start playing');
        };

        try {
          await audio.play();
          console.log('Audio playback started successfully');
          return true;
        } catch (playError) {
          console.error('Audio play failed:', playError);
          toast({
            title: "Voice Error",
            description: "Could not start audio playback. Please try again.",
            variant: "destructive"
          });
          voiceService.cleanup(response.audioUrl);
          setIsPlaying(false);
          currentAudioRef.current = null;
          return false;
        }
      } else {
        console.error('Voice generation failed:', response.error);
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
  }, [i18n.language, toast]);

  const stopAudio = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.remove();
      currentAudioRef.current = null;
      setIsPlaying(false);
    }
  }, []);

  return {
    generateAndPlay,
    stopAudio,
    isGenerating,
    isPlaying
  };
};
