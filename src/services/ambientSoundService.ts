
import { SoundProfile, SoundLayer, AmbientContext } from './ambient/ambientTypes';
import { soundProfiles } from './ambient/soundProfileData';
import { AudioEngine } from './ambient/audioEngine';

class AmbientSoundService {
  private audioEngine = new AudioEngine();
  private currentProfile: SoundProfile | null = null;

  async initialize(): Promise<boolean> {
    return await this.audioEngine.initialize();
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
      weather: 'clear' as const,
      userSensitivity: 3 // Default medium sensitivity
    };
  }

  selectOptimalProfile(context: AmbientContext, meditationType?: string): SoundProfile | null {
    const compatibleProfiles = soundProfiles.filter(profile => {
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
    return compatibleProfiles[0] || soundProfiles[0];
  }

  async startProfile(profile: SoundProfile, context: AmbientContext): Promise<boolean> {
    // Clear existing layers
    this.audioEngine.stopAll();
    
    this.currentProfile = profile;
    
    // Start compatible layers
    for (const layer of profile.layers) {
      if (this.isLayerCompatible(layer, context)) {
        await this.audioEngine.startLayer(layer, context);
      }
    }
    
    this.audioEngine.scheduleNaturalVariations();
    return true;
  }

  private isLayerCompatible(layer: SoundLayer, context: AmbientContext): boolean {
    return layer.timeOfDay.includes(context.timeOfDay) &&
           (!context.weather || layer.weather.includes(context.weather));
  }

  adjustLayer(layerId: string, volume: number): void {
    this.audioEngine.adjustLayer(layerId, volume);
  }

  setMasterVolume(volume: number): void {
    this.audioEngine.setMasterVolume(volume);
  }

  stopAll(): void {
    this.audioEngine.stopAll();
  }

  getSoundProfiles(): SoundProfile[] {
    return [...soundProfiles];
  }

  getCurrentProfile(): SoundProfile | null {
    return this.currentProfile;
  }

  getActiveLayers(): SoundLayer[] {
    return this.audioEngine.getActiveLayers();
  }
}

export const ambientSoundService = new AmbientSoundService();
export type { SoundProfile, SoundLayer, AmbientContext };
