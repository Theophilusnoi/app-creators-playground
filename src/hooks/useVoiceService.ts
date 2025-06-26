
import { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { voiceService, VoiceOptions, VoiceResponse } from '@/utils/voiceService';
import { useToast } from '@/hooks/use-toast';

export const useVoiceService = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const pendingAudioRef = useRef<string | null>(null);
  const { i18n } = useTranslation();
  const { toast } = useToast();

  const generateAndPlay = useCallback(async (options: Omit<VoiceOptions, 'locale'>) => {
    setIsGenerating(true);
    
    try {
      const voiceOptions: VoiceOptions = {
        ...options,
        locale: i18n.language || 'en'
      };

      console.log('Generating speech with options:', voiceOptions);
      const response: VoiceResponse = await voiceService.generateSpeech(voiceOptions);

      if (response.success && response.audioUrl) {
        // Stop any currently playing audio
        if (currentAudioRef.current) {
          currentAudioRef.current.pause();
          currentAudioRef.current.currentTime = 0;
          voiceService.cleanup(currentAudioRef.current.src);
        }

        // Store the audio URL for user-initiated playback
        pendingAudioRef.current = response.audioUrl;
        setAudioReady(true);

        // Show success toast
        toast({
          title: "Divine Voice Ready",
          description: "Your spiritual guidance is ready. Click the play button to listen.",
        });

        return true;
      } else {
        console.error('Voice generation failed:', response.error);
        toast({
          title: "Voice Generation Failed",
          description: response.error || "Unable to generate voice at this time. Please try again.",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Voice generation error:', error);
      toast({
        title: "Voice Error", 
        description: "Failed to generate voice guidance. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsGenerating(false);
    }
  }, [i18n.language, toast]);

  const playReadyAudio = useCallback(async () => {
    if (!pendingAudioRef.current) {
      toast({
        title: "No Audio Ready",
        description: "Please generate the reading first",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create new audio element
      const audio = new Audio();
      currentAudioRef.current = audio;
      
      // Set up event handlers
      audio.onended = () => {
        console.log('Audio playback ended');
        setIsPlaying(false);
        setAudioReady(false);
        voiceService.cleanup(pendingAudioRef.current!);
        pendingAudioRef.current = null;
        currentAudioRef.current = null;
      };

      audio.onerror = (error) => {
        console.error('Audio playback error:', error);
        toast({
          title: "Playback Error",
          description: "Failed to play audio guidance. Please try again.",
          variant: "destructive"
        });
        setIsPlaying(false);
        setAudioReady(false);
        voiceService.cleanup(pendingAudioRef.current!);
        pendingAudioRef.current = null;
        currentAudioRef.current = null;
      };

      // Set source and play (user-initiated, so should work)
      audio.src = pendingAudioRef.current;
      setIsPlaying(true);
      await audio.play();
      console.log('Audio playback started successfully');
      
    } catch (error) {
      console.error('Failed to play audio:', error);
      setIsPlaying(false);
      toast({
        title: "Playback Failed",
        description: "Could not start audio playback. Please try again.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const stopAudio = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      const audioUrl = currentAudioRef.current.src;
      voiceService.cleanup(audioUrl);
      currentAudioRef.current = null;
      setIsPlaying(false);
    }
    
    // Clean up pending audio as well
    if (pendingAudioRef.current) {
      voiceService.cleanup(pendingAudioRef.current);
      pendingAudioRef.current = null;
      setAudioReady(false);
    }
  }, []);

  return {
    generateAndPlay,
    playReadyAudio,
    stopAudio,
    isGenerating,
    isPlaying,
    audioReady
  };
};
