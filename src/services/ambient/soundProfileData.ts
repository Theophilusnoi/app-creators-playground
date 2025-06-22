
import { SoundProfile } from './ambientTypes';

export const soundProfiles: SoundProfile[] = [
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
