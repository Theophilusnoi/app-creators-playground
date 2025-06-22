
import { SoundLayer, AmbientContext } from './ambientTypes';

export class AudioEngine {
  private audioContext: AudioContext | null = null;
  private layers: Map<string, {
    source: AudioBufferSourceNode;
    gainNode: GainNode;
    pannerNode: StereoPannerNode;
    buffer: AudioBuffer;
    config: SoundLayer;
  }> = new Map();
  private masterGain: GainNode | null = null;
  private scheduler: NodeJS.Timeout | null = null;

  async initialize(): Promise<boolean> {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = 0.5;
      return true;
    } catch (error) {
      console.error('Failed to initialize audio engine:', error);
      return false;
    }
  }

  async loadAudioBuffer(url: string): Promise<AudioBuffer | null> {
    try {
      // In a real implementation, this would fetch actual audio files
      // For now, we'll create a simple tone buffer for testing
      const sampleRate = this.audioContext!.sampleRate;
      const duration = 10; // 10 seconds
      const buffer = this.audioContext!.createBuffer(2, sampleRate * duration, sampleRate);
      
      for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < channelData.length; i++) {
          // Create a simple sine wave tone
          channelData[i] = Math.sin(2 * Math.PI * 220 * i / sampleRate) * 0.1;
        }
      }
      
      return buffer;
    } catch (error) {
      console.error('Failed to load audio buffer:', error);
      return null;
    }
  }

  async startLayer(layer: SoundLayer, context: AmbientContext): Promise<void> {
    if (!this.audioContext || !this.masterGain) return;

    const buffer = await this.loadAudioBuffer(layer.audioUrl);
    if (!buffer) return;

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    const pannerNode = this.audioContext.createStereoPanner();

    // Configure nodes
    source.buffer = buffer;
    source.loop = layer.loop;
    
    // Adjust volume based on user sensitivity
    const adjustedVolume = layer.volume * (1 - (context.userSensitivity - 3) * 0.1);
    gainNode.gain.value = Math.max(0.1, Math.min(1, adjustedVolume));
    
    pannerNode.pan.value = layer.pan;

    // Connect audio graph
    source.connect(gainNode);
    gainNode.connect(pannerNode);
    pannerNode.connect(this.masterGain);

    // Apply density effects
    this.applyDensityEffect(gainNode, layer.density);

    // Store layer
    this.layers.set(layer.id, {
      source,
      gainNode,
      pannerNode,
      buffer,
      config: layer
    });

    // Start playback
    source.start();
  }

  private applyDensityEffect(gainNode: GainNode, density: SoundLayer['density']): void {
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    
    switch (density) {
      case 'sparse':
        // Create gentle volume variation
        gainNode.gain.setValueCurveAtTime([0.3, 0.7, 0.3], now, 20);
        break;
      case 'medium':
        // Moderate variation
        gainNode.gain.setValueCurveAtTime([0.5, 1.0, 0.5], now, 15);
        break;
      case 'dense':
        // Consistent volume
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        break;
    }
  }

  adjustLayer(layerId: string, volume: number): void {
    const layer = this.layers.get(layerId);
    if (layer && this.audioContext) {
      layer.gainNode.gain.setTargetAtTime(volume, this.audioContext.currentTime, 0.3);
    }
  }

  setMasterVolume(volume: number): void {
    if (this.masterGain && this.audioContext) {
      this.masterGain.gain.setTargetAtTime(volume, this.audioContext.currentTime, 0.5);
    }
  }

  stopAll(): void {
    this.layers.forEach((layer) => {
      try {
        layer.source.stop();
      } catch (error) {
        // Source might already be stopped
      }
    });
    this.layers.clear();
    
    if (this.scheduler) {
      clearInterval(this.scheduler);
      this.scheduler = null;
    }
  }

  getActiveLayers(): SoundLayer[] {
    return Array.from(this.layers.values()).map(layer => layer.config);
  }

  scheduleNaturalVariations(): void {
    if (this.scheduler) clearInterval(this.scheduler);
    
    this.scheduler = setInterval(() => {
      this.layers.forEach((layer, id) => {
        if (layer.config.type === 'nature' && layer.config.category === 'birds') {
          // Add random bird call variations
          this.addBirdCallVariation(layer);
        }
      });
    }, 5000 + Math.random() * 10000); // Random interval 5-15 seconds
  }

  private addBirdCallVariation(layer: any): void {
    if (!this.audioContext) return;
    
    const variation = Math.random() * 0.3 + 0.1; // 0.1 to 0.4
    const now = this.audioContext.currentTime;
    
    layer.gainNode.gain.setTargetAtTime(
      layer.config.volume * (1 + variation),
      now,
      0.5
    );
    
    setTimeout(() => {
      if (this.audioContext) {
        layer.gainNode.gain.setTargetAtTime(
          layer.config.volume,
          this.audioContext.currentTime,
          0.5
        );
      }
    }, 2000);
  }
}
