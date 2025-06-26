
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
  isChunked?: boolean;
  chunkCount?: number;
}

class VoiceService {
  private maxChunkSize = 500; // Characters per chunk to stay within quota
  private chunkDelay = 1000; // Delay between chunks in ms

  // Split text into smaller chunks
  private chunkText(text: string): string[] {
    if (text.length <= this.maxChunkSize) {
      return [text];
    }

    const chunks: string[] = [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    let currentChunk = '';

    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      if (currentChunk.length + trimmedSentence.length + 1 <= this.maxChunkSize) {
        currentChunk += (currentChunk ? '. ' : '') + trimmedSentence;
      } else {
        if (currentChunk) {
          chunks.push(currentChunk + '.');
          currentChunk = trimmedSentence;
        } else {
          // If single sentence is too long, split by words
          const words = trimmedSentence.split(' ');
          let wordChunk = '';
          for (const word of words) {
            if (wordChunk.length + word.length + 1 <= this.maxChunkSize) {
              wordChunk += (wordChunk ? ' ' : '') + word;
            } else {
              if (wordChunk) chunks.push(wordChunk);
              wordChunk = word;
            }
          }
          if (wordChunk) currentChunk = wordChunk;
        }
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk + (currentChunk.endsWith('.') ? '' : '.'));
    }

    return chunks;
  }

  // Combine multiple audio blobs into one
  private async combineAudioBlobs(audioBlobs: Blob[]): Promise<Blob> {
    // For now, return the first blob. In a full implementation,
    // you'd want to use Web Audio API to properly concatenate audio
    if (audioBlobs.length === 1) {
      return audioBlobs[0];
    }

    // Simple concatenation - this works for basic cases
    const combinedBuffer = new ArrayBuffer(
      audioBlobs.reduce((total, blob) => total + blob.size, 0)
    );
    const combinedView = new Uint8Array(combinedBuffer);
    let offset = 0;

    for (const blob of audioBlobs) {
      const arrayBuffer = await blob.arrayBuffer();
      combinedView.set(new Uint8Array(arrayBuffer), offset);
      offset += arrayBuffer.byteLength;
    }

    return new Blob([combinedBuffer], { type: 'audio/mpeg' });
  }

  async generateSpeech(options: VoiceOptions): Promise<VoiceResponse> {
    try {
      console.log('Starting advanced voice generation with options:', {
        textLength: options.text.length,
        locale: options.locale,
        emotion: options.emotion
      });

      // Check if text needs chunking
      const chunks = this.chunkText(options.text);
      console.log(`Text split into ${chunks.length} chunks`);

      if (chunks.length === 1) {
        // Single chunk - use original logic
        return await this.generateSingleChunk(options);
      } else {
        // Multiple chunks - process sequentially
        return await this.generateChunkedSpeech(chunks, options);
      }

    } catch (error) {
      console.error('Advanced voice generation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Voice generation failed'
      };
    }
  }

  private async generateSingleChunk(options: VoiceOptions): Promise<VoiceResponse> {
    console.log('Generating single chunk speech');
    
    const { data, error } = await supabase.functions.invoke('generate-speech', {
      body: {
        text: options.text,
        locale: options.locale,
        emotion: options.emotion
      }
    });

    if (error) {
      console.error('Supabase function error:', error);
      
      // Handle specific quota exceeded error
      if (error.message && error.message.includes('quota_exceeded')) {
        throw new Error('ElevenLabs quota exceeded. Please try with shorter text or upgrade your plan.');
      }
      
      throw new Error(error.message || 'Failed to generate speech');
    }

    if (data) {
      if (data.error) {
        if (data.error.includes('quota_exceeded')) {
          throw new Error('ElevenLabs quota exceeded. Please try with shorter text or upgrade your plan.');
        }
        throw new Error(data.error);
      }
      
      const audioBlob = new Blob([data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      return {
        success: true,
        audioUrl
      };
    }

    throw new Error('No data received from voice service');
  }

  private async generateChunkedSpeech(chunks: string[], options: VoiceOptions): Promise<VoiceResponse> {
    console.log(`Generating chunked speech for ${chunks.length} chunks`);
    const audioBlobs: Blob[] = [];
    
    for (let i = 0; i < chunks.length; i++) {
      console.log(`Processing chunk ${i + 1}/${chunks.length}`);
      
      try {
        const chunkOptions = { ...options, text: chunks[i] };
        const result = await this.generateSingleChunk(chunkOptions);
        
        if (!result.success || !result.audioUrl) {
          throw new Error(`Failed to generate chunk ${i + 1}: ${result.error}`);
        }

        // Convert URL back to blob for combination
        const response = await fetch(result.audioUrl);
        const blob = await response.blob();
        audioBlobs.push(blob);
        
        // Clean up individual chunk URL
        URL.revokeObjectURL(result.audioUrl);
        
        // Add delay between chunks to respect rate limits
        if (i < chunks.length - 1) {
          await new Promise(resolve => setTimeout(resolve, this.chunkDelay));
        }
        
      } catch (error) {
        console.error(`Error processing chunk ${i + 1}:`, error);
        throw new Error(`Failed to process chunk ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Combine all audio blobs
    const combinedBlob = await this.combineAudioBlobs(audioBlobs);
    const audioUrl = URL.createObjectURL(combinedBlob);
    
    return {
      success: true,
      audioUrl,
      isChunked: true,
      chunkCount: chunks.length
    };
  }

  cleanup(audioUrl?: string) {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  }
}

export const voiceService = new VoiceService();
