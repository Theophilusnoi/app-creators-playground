
import { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { voiceService, VoiceOptions, VoiceResponse } from '@/utils/voiceService';
import { useToast } from '@/hooks/use-toast';

export const useVoiceService = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<string>('');
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const pendingAudioRef = useRef<string | null>(null);
  const { i18n } = useTranslation();
  const { toast } = useToast();

  const generateAndPlay = useCallback(async (options: Omit<VoiceOptions, 'locale'>) => {
    setIsGenerating(true);
    setGenerationProgress('Preparing voice generation...');
    
    try {
      const voiceOptions: VoiceOptions = {
        ...options,
        locale: i18n.language || 'en'
      };

      console.log('Generating speech with advanced service:', voiceOptions);
      
      // Update progress for long texts
      if (options.text.length > 500) {
        setGenerationProgress('Processing long text in chunks...');
      }
      
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

        // Show success toast with additional info for chunked audio
        const successMessage = response.isChunked 
          ? `Divine Voice Ready (processed in ${response.chunkCount} parts)`
          : "Divine Voice Ready";
          
        toast({
          title: successMessage,
          description: "Your spiritual guidance is ready. Click the play button to listen.",
        });

        return true;
      } else {
        console.error('Advanced voice generation failed:', response.error);
        
        // Enhanced error messages
        let errorMessage = response.error || "Unable to generate voice at this time.";
        let errorTitle = "Voice Generation Failed";
        
        if (response.error?.includes('quota_exceeded')) {
          errorTitle = "ElevenLabs Quota Exceeded";
          errorMessage = "Your ElevenLabs quota is insufficient for this text length. Try shorter text or upgrade your plan.";
        }
        
        toast({
          title: errorTitle,
          description: errorMessage,
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Voice generation error:', error);
      
      let errorMessage = "Failed to generate voice guidance. Please try again.";
      if (error instanceof Error && error.message.includes('quota')) {
        errorMessage = "ElevenLabs quota exceeded. Please try with shorter text or upgrade your plan.";
      }
      
      toast({
        title: "Voice Error", 
        description: errorMessage,
        variant: "destructive"
      });
      return false;
    } finally {
      setIsGenerating(false);
      setGenerationProgress('');
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
    audioReady,
    generationProgress
  };
};
