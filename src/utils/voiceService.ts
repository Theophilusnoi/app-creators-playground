
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

      // Check if we received an error response (JSON)
      if (data && typeof data === 'object' && data.error) {
        throw new Error(data.error)
      }

      // The edge function returns binary audio data directly
      if (data instanceof ArrayBuffer || data instanceof Uint8Array) {
        const audioBlob = new Blob([data], { type: 'audio/mpeg' })
        const audioUrl = URL.createObjectURL(audioBlob)
        return {
          success: true,
          audioUrl
        }
      }

      // Fallback: if data is not binary, try to create blob anyway
      const audioBlob = new Blob([data], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(audioBlob)

      return {
        success: true,
        audioUrl
      }
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
