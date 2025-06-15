
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
      const { data, error } = await supabase.functions.invoke('generate-speech', {
        body: {
          text: options.text,
          locale: options.locale,
          emotion: options.emotion
        }
      })

      if (error) {
        throw new Error(error.message)
      }

      // The edge function now returns binary audio data directly
      if (data) {
        // Convert the response to a Blob with the correct MIME type
        let audioBlob: Blob;
        
        if (data instanceof ArrayBuffer) {
          audioBlob = new Blob([data], { type: 'audio/mpeg' });
        } else if (data instanceof Uint8Array) {
          audioBlob = new Blob([data], { type: 'audio/mpeg' });
        } else {
          // Fallback: treat as binary data
          audioBlob = new Blob([data], { type: 'audio/mpeg' });
        }
        
        const audioUrl = URL.createObjectURL(audioBlob);
        
        return {
          success: true,
          audioUrl
        };
      }

      throw new Error('No audio data received');
    } catch (error) {
      console.error('Voice generation failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  cleanup(audioUrl?: string) {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
  }
}

export const voiceService = new VoiceService()
