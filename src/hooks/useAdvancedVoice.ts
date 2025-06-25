
import React, { useState, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VoiceSettings {
  autoSpeak: boolean;
  voiceType: 'gentle' | 'wise' | 'compassionate' | 'authoritative';
  speechRate: number;
  speechPitch: number;
  language: string;
}

export const useAdvancedVoice = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [settings, setSettings] = useState<VoiceSettings>({
    autoSpeak: false,
    voiceType: 'compassionate',
    speechRate: 0.9,
    speechPitch: 1.0,
    language: 'en-US'
  });

  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const { toast } = useToast();

  // Initialize speech services
  const initializeSpeechServices = useCallback(() => {
    // Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = settings.language;
      setIsSupported(true);
    }

    // Speech Synthesis
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    }
  }, [settings.language]);

  // Start voice recognition
  const startListening = useCallback((onTranscript?: (text: string) => void) => {
    if (!recognitionRef.current) {
      initializeSpeechServices();
    }

    if (!recognitionRef.current) {
      toast({
        title: "Voice Not Supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive"
      });
      return;
    }

    try {
      setTranscript('');
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        const fullTranscript = (finalTranscript + interimTranscript).trim();
        setTranscript(fullTranscript);
        
        if (onTranscript && finalTranscript) {
          onTranscript(finalTranscript.trim());
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          toast({
            title: "Microphone Access Denied",
            description: "Please allow microphone access to use voice features",
            variant: "destructive"
          });
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
      setIsListening(true);
      
      toast({
        title: "🎤 Listening",
        description: "Speak your spiritual question or message",
      });
    } catch (err) {
      console.error("Error starting recognition:", err);
      setIsListening(false);
    }
  }, [toast, initializeSpeechServices]);

  // Stop voice recognition
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      
      toast({
        title: "🔇 Stopped Listening",
        description: "Voice recording complete",
      });
    }
  }, [isListening, toast]);

  // Speak text with spiritual tone
  const speakText = useCallback((text: string, options?: Partial<VoiceSettings>) => {
    if (!synthesisRef.current) {
      initializeSpeechServices();
    }

    if (!synthesisRef.current) {
      toast({
        title: "Voice Not Available",
        description: "Text-to-speech is not supported in your browser",
        variant: "destructive"
      });
      return;
    }

    // Cancel any ongoing speech
    synthesisRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const effectiveSettings = { ...settings, ...options };

    // Configure voice based on spiritual tone
    const voices = synthesisRef.current.getVoices();
    let selectedVoice = null;

    // Try to find a suitable voice
    const femaleVoices = voices.filter(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('serena')
    );

    if (femaleVoices.length > 0) {
      selectedVoice = femaleVoices[0];
    } else {
      // Fallback to any English voice
      const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
      selectedVoice = englishVoices[0] || voices[0];
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Adjust speech parameters based on spiritual context
    switch (effectiveSettings.voiceType) {
      case 'gentle':
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        utterance.volume = 0.8;
        break;
      case 'wise':
        utterance.rate = 0.7;
        utterance.pitch = 0.9;
        utterance.volume = 0.9;
        break;
      case 'compassionate':
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        utterance.volume = 0.85;
        break;
      case 'authoritative':
        utterance.rate = 0.9;
        utterance.pitch = 0.95;
        utterance.volume = 0.95;
        break;
    }

    utterance.rate = effectiveSettings.speechRate;
    utterance.pitch = effectiveSettings.speechPitch;
    utterance.lang = effectiveSettings.language;

    utterance.onstart = () => {
      setIsSpeaking(true);
      toast({
        title: "🕊️ Speaking",
        description: "Seraphina is sharing divine wisdom",
      });
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (error) => {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
      toast({
        title: "Voice Error",
        description: "Could not speak the message",
        variant: "destructive"
      });
    };

    synthesisRef.current.speak(utterance);
  }, [settings, toast, initializeSpeechServices]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Process spiritual text for better speech
  const processSpiritualText = useCallback((text: string): string => {
    // Remove emojis and special characters for better speech
    let processedText = text.replace(/[🌟✨🙏💫🔮💜❤️🌈☮️🕊️]/g, '');
    
    // Add pauses for spiritual emphasis
    processedText = processedText.replace(/\. /g, '. ... ');
    processedText = processedText.replace(/\? /g, '? ... ');
    processedText = processedText.replace(/! /g, '! ... ');
    
    // Expand common spiritual abbreviations
    processedText = processedText.replace(/\bOM\b/g, 'Om');
    processedText = processedText.replace(/\bAUM\b/g, 'Aum');
    
    return processedText.trim();
  }, []);

  // Speak spiritual message with appropriate tone
  const speakSpiritualMessage = useCallback((text: string, messageType: 'guidance' | 'blessing' | 'wisdom' | 'emergency' = 'guidance') => {
    const processedText = processSpiritualText(text);
    
    const voiceSettingsMap: Record<string, Partial<VoiceSettings>> = {
      guidance: { voiceType: 'compassionate', speechRate: 0.85 },
      blessing: { voiceType: 'gentle', speechRate: 0.8 },
      wisdom: { voiceType: 'wise', speechRate: 0.75 },
      emergency: { voiceType: 'authoritative', speechRate: 0.9 }
    };

    const voiceSettings = voiceSettingsMap[messageType];
    speakText(processedText, voiceSettings);
  }, [speakText, processSpiritualText]);

  // Update voice settings
  const updateSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Initialize on mount
  React.useEffect(() => {
    initializeSpeechServices();
  }, [initializeSpeechServices]);

  return {
    isListening,
    isSpeaking,
    transcript,
    isSupported,
    settings,
    startListening,
    stopListening,
    speakText,
    speakSpiritualMessage,
    stopSpeaking,
    updateSettings,
    processSpiritualText
  };
};
