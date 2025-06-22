
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
  weather?: 'clear' | 'cloudy' | 'rainy' | 'windy' | 'snow';
  location?: string;
  meditationType?: string;
  userSensitivity: number; // 1-5 scale
}
