
import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface VoicePlayerProps {
  script: string;
  tone?: 'neutral' | 'urgent_calm' | 'ritual_authority' | 'nurturing_gentle';
  voiceId?: string;
  onComplete?: () => void;
}

interface ToneProfile {
  stability: number;
  similarity: number;
  pitch: number;
  rate: number;
  type: string;
}

const TONE_SETTINGS: Record<string, ToneProfile> = {
  urgent_calm: { 
    stability: 0.2, 
    similarity: 0.7, 
    pitch: 15, 
    rate: 0.8,
    type: 'crisis'
  },
  ritual_authority: { 
    stability: 0.05, 
    similarity: 0.9, 
    pitch: -10, 
    rate: 0.7,
    type: 'ritual'
  },
  nurturing_gentle: { 
    stability: 0.35, 
    similarity: 0.8, 
    pitch: 5, 
    rate: 0.65,
    type: 'aftercare'
  },
  neutral: { 
    stability: 0.25, 
    similarity: 0.75, 
    pitch: 0, 
    rate: 1.0,
    type: 'normal'
  }
};

export const VoicePlayer: React.FC<VoicePlayerProps> = ({ 
  script, 
  tone = 'neutral', 
  voiceId = 'EXAVITQu4vr4xnSDxMaL',
  onComplete 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const generateSpeech = async () => {
    if (!script.trim()) return;

    setIsLoading(true);
    try {
      const settings = TONE_SETTINGS[tone];
      
      // Create SSML with prosody modifications
      const ssmlText = `
        <speak>
          <prosody pitch="${settings.pitch >= 0 ? '+' : ''}${settings.pitch}%" rate="${settings.rate}">
            ${script}
          </prosody>
        </speak>
      `;

      // Note: In a real implementation, you'd call your Supabase edge function here
      // For now, we'll simulate the audio generation
      console.log('Generating speech with settings:', { ssmlText, settings, voiceId });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would be the actual audio URL from ElevenLabs
      setAudioUrl('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYeCD6P2e/PfDAFJHfF79SOQQoUXLPn7KdTEwlAn+D0u2YeCD2R3O/NbS8EKIjN8t2LPQoRU67q6qxTEgdEpOL1tmIcB0OQ2fTShS8HJYjNOA==');
      
    } catch (error) {
      console.error('Error generating speech:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayback = async () => {
    if (!audioUrl && !isLoading) {
      await generateSpeech();
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      onComplete?.();
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [onComplete]);

  return (
    <div className="voice-player bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
      <div className="flex items-center gap-3 mb-3">
        <Button
          onClick={togglePlayback}
          disabled={isLoading}
          size="sm"
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isLoading ? (
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
          ) : isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>

        <Button
          onClick={toggleMute}
          size="sm"
          variant="outline"
          className="border-purple-500/50"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>

        <ToneBars tone={tone} />
      </div>

      <div className="text-sm text-purple-200 mb-2">
        Voice Mode: <span className="font-semibold capitalize">{tone.replace('_', ' ')}</span>
      </div>

      <div className="text-xs text-purple-300 bg-purple-900/50 p-2 rounded">
        {script.substring(0, 100)}{script.length > 100 ? '...' : ''}
      </div>

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          className="hidden"
        />
      )}
    </div>
  );
};

interface ToneBarsProps {
  tone: string;
}

const ToneBars: React.FC<ToneBarsProps> = ({ tone }) => {
  const profiles: Record<string, number[]> = {
    urgent_calm: [80, 60, 95, 70, 85],
    ritual_authority: [40, 90, 30, 95, 50],
    nurturing_gentle: [60, 50, 70, 55, 65],
    neutral: [50, 50, 50, 50, 50]
  };

  const bars = profiles[tone] || profiles.neutral;

  return (
    <div className="flex items-end gap-1 h-6">
      {bars.map((height, i) => (
        <div
          key={i}
          className="bg-purple-400 w-1 rounded-sm transition-all duration-500"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
};
