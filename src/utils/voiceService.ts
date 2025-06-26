
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
      
      const response = await fetch(`https://oyzbmwznxwsfhajvialr.supabase.co/functions/v1/generate-speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95emJtd3pueHdzZmhhanZpYWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MDI2MzcsImV4cCI6MjA2MDk3ODYzN30.ig0-A78kSPOM3UBd_bxfekPmDTWTV_e4fHAFBZCSXVA'}`,
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
        throw new Error(`API Error: ${response.status} - ${errorText}`);
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
        throw new Error(errorData.error || 'Unknown error occurred');
      }

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
