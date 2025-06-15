
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

      // The edge function returns audio data directly
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

  // Legacy method - no longer needed but kept for compatibility
  setApiKey(key: string) {
    // This method is now a no-op since we use Supabase secrets
    console.log('API key management is now handled by Supabase secrets')
  }

  cleanup(audioUrl?: string) {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
  }
}

export const voiceService = new VoiceService()
