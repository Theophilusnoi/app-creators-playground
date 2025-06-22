
export interface SoundLayer {
  id: string;
  name: string;
  type: 'nature' | 'instrument' | 'tonal' | 'drone';
  category: string;
  volume: number;
  density: 'sparse' | 'medium' | 'dense';
  pan: number;
  timeOfDay: ('dawn' | 'morning' | 'afternoon' | 'evening' | 'night')[];
  weather: ('clear' | 'cloudy' | 'rainy' | 'windy' | 'snow')[];
  culturalOrigin?: string;
  audioUrl: string;
  loop: boolean;
}

export interface SoundProfile {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  layers: SoundLayer[];
  contextRules: {
    timeRange?: { start: string; end: string };
    weather?: string[];
    location?: string[];
    meditationType?: string[];
  };
  isActive: boolean;
}

export interface AmbientContext {
  time: Date;
  timeOfDay: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night';
  weather?: string;
  location?: string;
  meditationType?: string;
  userSensitivity: number; // 1-5 scale
}

class AmbientSoundService {
  private audioContext: AudioContext | null = null;
  private layers: Map<string, {
    source: AudioBufferSource;
    gainNode: GainNode;
    pannerNode: StereoPannerNode;
    buffer: AudioBuffer;
    config: SoundLayer;
  }> = new Map();
  private masterGain: GainNode | null = null;
  private scheduler: NodeJS.Timeout | null = null;
  private currentProfile: SoundProfile | null = null;

  private soundProfiles: SoundProfile[] = [
    {
      id: 'forest-dawn',
      name: 'Forest Dawn',
      description: 'Gentle awakening with birdsong and nature',
      coverImage: '/images/forest-dawn.jpg',
      isActive: false,
      contextRules: {
        timeRange: { start: '05:00', end: '09:00' },
        weather: ['clear', 'cloudy'],
        meditationType: ['mindfulness', 'breathwork']
      },
      layers: [
        {
          id: 'dawn-birds',
          name: 'Dawn Chorus',
          type: 'nature',
          category: 'birds',
          volume: 0.7,
          density: 'medium',
          pan: -0.3,
          timeOfDay: ['dawn', 'morning'],
          weather: ['clear', 'cloudy'],
          audioUrl: '/sounds/nature/dawn_chorus.mp3',
          loop: true
        },
        {
          id: 'forest-breeze',
          name: 'Forest Breeze',
          type: 'nature',
          category: 'wind',
          volume: 0.4,
          density: 'sparse',
          pan: 0.2,
          timeOfDay: ['dawn', 'morning'],
          weather: ['clear'],
          audioUrl: '/sounds/nature/forest_breeze.mp3',
          loop: true
        }
      ]
    },
    {
      id: 'evening-serenity',
      name: 'Evening Serenity',
      description: 'Peaceful evening with crickets and gentle instruments',
      coverImage: '/images/evening-serenity.jpg',
      isActive: false,
      contextRules: {
        timeRange: { start: '18:00', end: '22:00' },
        meditationType: ['loving_kindness', 'body_scan']
      },
      layers: [
        {
          id: 'night-crickets',
          name: 'Night Crickets',
          type: 'nature',
          category: 'insects',
          volume: 0.5,
          density: 'medium',
          pan: 0,
          timeOfDay: ['evening', 'night'],
          weather: ['clear', 'cloudy'],
          audioUrl: '/sounds/nature/night_crickets.mp3',
          loop: true
        },
        {
          id: 'tibetan-bowl',
          name: 'Tibetan Singing Bowl',
          type: 'instrument',
          category: 'percussion',
          volume: 0.6,
          density: 'sparse',
          pan: 0,
          timeOfDay: ['evening', 'night'],
          weather: ['clear', 'cloudy', 'rainy'],
          audioUrl: '/sounds/instruments/tibetan_bowl.mp3',
          loop: false
        }
      ]
    },
    {
      id: 'rain-contemplation',
      name: 'Rain Contemplation',
      description: 'Soothing rain sounds for deep introspection',
      coverImage: '/images/rain-contemplation.jpg',
      isActive: false,
      contextRules: {
        weather: ['rainy'],
        meditationType: ['mindfulness', 'visualization']
      },
      layers: [
        {
          id: 'gentle-rain',
          name: 'Gentle Rain',
          type: 'nature',
          category: 'water',
          volume: 0.8,
          density: 'dense',
          pan: 0,
          timeOfDay: ['dawn', 'morning', 'afternoon', 'evening', 'night'],
          weather: ['rainy'],
          audioUrl: '/sounds/nature/gentle_rain.mp3',
          loop: true
        },
        {
          id: 'piano-pad',
          name: 'Ambient Piano',
          type: 'instrument',
          category: 'strings',
          volume: 0.3,
          density: 'sparse',
          pan: 0.1,
          timeOfDay: ['afternoon', 'evening'],
          weather: ['rainy'],
          audioUrl: '/sounds/instruments/ambient_piano.mp3',
          loop: true
        }
      ]
    }
  ];

  async initialize(): Promise<boolean> {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = 0.5;
      return true;
    } catch (error) {
      console.error('Failed to initialize ambient sound service:', error);
      return false;
    }
  }

  getCurrentContext(): AmbientContext {
    const now = new Date();
    const hour = now.getHours();
    
    let timeOfDay: AmbientContext['timeOfDay'] = 'morning';
    if (hour >= 5 && hour < 8) timeOfDay = 'dawn';
    else if (hour >= 8 && hour < 12) timeOfDay = 'morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
    else timeOfDay = 'night';

    return {
      time: now,
      timeOfDay,
      weather: 'clear', // Would integrate with weather API
      userSensitivity: 3 // Default medium sensitivity
    };
  }

  selectOptimalProfile(context: AmbientContext, meditationType?: string): SoundProfile | null {
    const compatibleProfiles = this.soundProfiles.filter(profile => {
      const rules = profile.contextRules;
      
      // Check time range
      if (rules.timeRange) {
        const startHour = parseInt(rules.timeRange.start.split(':')[0]);
        const endHour = parseInt(rules.timeRange.end.split(':')[0]);
        const currentHour = context.time.getHours();
        
        if (currentHour < startHour || currentHour >= endHour) {
          return false;
        }
      }
      
      // Check weather
      if (rules.weather && context.weather && !rules.weather.includes(context.weather)) {
        return false;
      }
      
      // Check meditation type
      if (rules.meditationType && meditationType && !rules.meditationType.includes(meditationType)) {
        return false;
      }
      
      return true;
    });

    // Return highest scoring profile
    return compatibleProfiles[0] || this.soundProfiles[0];
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

  async startProfile(profile: SoundProfile, context: AmbientContext): Promise<boolean> {
    if (!this.audioContext || !this.masterGain) {
      console.error('Audio context not initialized');
      return false;
    }

    // Clear existing layers
    this.stopAll();
    
    this.currentProfile = profile;
    
    // Start compatible layers
    for (const layer of profile.layers) {
      if (this.isLayerCompatible(layer, context)) {
        await this.startLayer(layer, context);
      }
    }
    
    this.scheduleNaturalVariations();
    return true;
  }

  private isLayerCompatible(layer: SoundLayer, context: AmbientContext): boolean {
    return layer.timeOfDay.includes(context.timeOfDay) &&
           (!context.weather || layer.weather.includes(context.weather));
  }

  private async startLayer(layer: SoundLayer, context: AmbientContext): Promise<void> {
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

  private scheduleNaturalVariations(): void {
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

  getSoundProfiles(): SoundProfile[] {
    return [...this.soundProfiles];
  }

  getCurrentProfile(): SoundProfile | null {
    return this.currentProfile;
  }

  getActiveLayers(): SoundLayer[] {
    return Array.from(this.layers.values()).map(layer => layer.config);
  }
}

export const ambientSoundService = new AmbientSoundService();
