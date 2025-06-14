
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
  private apiKey: string = '';
  private baseUrl = 'https://api.elevenlabs.io/v1';

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async generateSpeech(options: VoiceOptions): Promise<VoiceResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'ElevenLabs API key not configured'
      };
    }

    try {
      const voiceId = this.getVoiceForLocale(options.locale);
      const response = await fetch(`${this.baseUrl}/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify({
          text: options.text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: this.getStabilityForEmotion(options.emotion),
            similarity_boost: 0.8,
            style: 0.2,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      return {
        success: true,
        audioUrl
      };
    } catch (error) {
      console.error('Voice generation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private getVoiceForLocale(locale: string): string {
    const voiceMap: Record<string, string> = {
      'en': 'EXAVITQu4vr4xnSDxMaL', // Sarah
      'es': 'XB0fDUnXU5powFXDhCwa', // Charlotte (multilingual)
      'hi': 'Xb7hH8MSUJpSbSDYk0k2', // Alice (multilingual)
      'ar': 'pFZP5JQG7iQjIQuC4Bku', // Lily (multilingual)
      'fr': 'cgSgspJ2msm6clMCkdW9'  // Jessica (multilingual)
    };

    return voiceMap[locale] || voiceMap['en'];
  }

  private getStabilityForEmotion(emotion?: string): number {
    switch (emotion) {
      case 'calm': return 0.8;
      case 'urgent': return 0.3;
      case 'compassionate': return 0.6;
      default: return 0.7;
    }
  }

  cleanup(audioUrl?: string) {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  }
}

export const voiceService = new VoiceService();
