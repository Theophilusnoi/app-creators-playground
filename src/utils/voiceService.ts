
import { supabase } from '@/integrations/supabase/client'

export interface VoiceOptions {
  text: string;
  locale: string;
  voice?: string;
  emotion?: 'calm' | 'urgent' | 'compassionate';
  speed?: number;
}

export interface VoiceResponse {
  success: boolean;
  audioUrl?: string;
  error?: string;
}

class VoiceService {
  async generateSpeech(options: VoiceOptions): Promise<VoiceResponse> {
    try {
      console.log('Calling Supabase edge function with options:', options);
      
      const { data, error } = await supabase.functions.invoke('generate-speech', {
        body: {
          text: options.text,
          locale: options.locale,
          emotion: options.emotion
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to generate speech');
      }

      if (data) {
        // If data is returned as JSON with error
        if (data.error) {
          throw new Error(data.error);
        }
        
        // If data is an ArrayBuffer (audio data)
        const audioBlob = new Blob([data], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        return {
          success: true,
          audioUrl
        };
      }

      throw new Error('No data received from voice service');

    } catch (error) {
      console.error('Voice generation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Voice generation failed'
      };
    }
  }

  cleanup(audioUrl?: string) {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  }
}

export const voiceService = new VoiceService();
