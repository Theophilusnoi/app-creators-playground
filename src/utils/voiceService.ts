
export interface VoiceOptions {
  text: string;
  locale: string;
  emotion: 'calm' | 'urgent' | 'compassionate' | 'authoritative';
  tradition?: string;
}

export interface VoiceResponse {
  audioUrl: string;
  duration: number;
  success: boolean;
  error?: string;
}

const VOICE_MAPPING = {
  'en': 'EXAVITQu4vr4xnSDxMaL', // Sarah
  'es': 'XrExE9yKIg1WjnnlVkGX', // Matilda  
  'hi': 'TX3LPaxmHKxFdv7VOQHJ', // Liam
  'ar': 'cgSgspJ2msm6clMCkdW9', // Jessica
  'fr': 'pFZP5JQG7iQjIQuC4Bku'  // Lily
};

const EMOTION_SETTINGS = {
  calm: { stability: 0.8, similarity: 0.9, style: 0.2 },
  urgent: { stability: 0.3, similarity: 0.7, style: 0.8 },
  compassionate: { stability: 0.7, similarity: 0.85, style: 0.4 },
  authoritative: { stability: 0.9, similarity: 0.8, style: 0.6 }
};

export class VoiceService {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.elevenlabs.io/v1';

  setApiKey(key: string): void {
    this.apiKey = key;
  }

  async generateSpeech(options: VoiceOptions): Promise<VoiceResponse> {
    if (!this.apiKey) {
      return {
        audioUrl: '',
        duration: 0,
        success: false,
        error: 'ElevenLabs API key not configured'
      };
    }

    try {
      const voiceId = VOICE_MAPPING[options.locale as keyof typeof VOICE_MAPPING] || VOICE_MAPPING.en;
      const emotionSettings = EMOTION_SETTINGS[options.emotion];

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
            stability: emotionSettings.stability,
            similarity_boost: emotionSettings.similarity,
            style: emotionSettings.style,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Calculate approximate duration (rough estimate)
      const duration = Math.max(2, options.text.length * 0.1);

      return {
        audioUrl,
        duration,
        success: true
      };
    } catch (error) {
      console.error('Voice generation error:', error);
      return {
        audioUrl: '',
        duration: 0,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async preloadSpiritualPhrases(locale: string): Promise<void> {
    const commonPhrases = [
      'You are safe and protected',
      'Breathe deeply and ground yourself',
      'Call upon your spiritual guides',
      'You have the strength to overcome this'
    ];

    for (const phrase of commonPhrases) {
      await this.generateSpeech({
        text: phrase,
        locale,
        emotion: 'compassionate'
      });
    }
  }

  cleanup(audioUrl: string): void {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  }
}

export const voiceService = new VoiceService();
