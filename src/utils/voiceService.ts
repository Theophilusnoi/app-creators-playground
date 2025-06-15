
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
      
      // Use fetch directly to get binary data instead of supabase.functions.invoke
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`${supabase.supabaseUrl}/functions/v1/generate-speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || supabase.supabaseKey}`,
        },
        body: JSON.stringify({
          text: options.text,
          locale: options.locale,
          emotion: options.emotion
        })
      });

      console.log('Edge function response status:', response.status);
      console.log('Response content-type:', response.headers.get('content-type'));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Edge function error:', errorText);
        throw new Error(errorText);
      }

      // Check if response is audio data
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('audio')) {
        // Get binary audio data
        const audioBuffer = await response.arrayBuffer();
        console.log('Received audio buffer, size:', audioBuffer.byteLength);
        
        // Create blob and URL
        const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        return {
          success: true,
          audioUrl
        };
      } else {
        // Handle JSON error response
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unknown error');
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
