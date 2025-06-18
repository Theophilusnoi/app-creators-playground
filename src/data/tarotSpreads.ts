
import { SpreadConfiguration } from '@/types/tarot';

export const spreadConfigurations: Record<string, SpreadConfiguration> = {
  'three-card': {
    name: 'Past, Present, Future',
    positions: ['Past', 'Present', 'Future'],
    description: 'A classic spread revealing the timeline of your spiritual journey'
  },
  'celtic-cross': {
    name: 'Celtic Cross',
    positions: [
      'Present Situation', 'Challenge/Cross', 'Distant Past/Foundation', 
      'Recent Past', 'Possible Outcome', 'Immediate Future',
      'Your Approach', 'External Influences', 'Hopes and Fears', 'Final Outcome'
    ],
    description: 'A comprehensive 10-card spread for deep spiritual insight'
  },
  'spiritual-guidance': {
    name: 'Spiritual Guidance',
    positions: ['Current Spiritual State', 'Divine Message', 'Action to Take'],
    description: 'A focused spread for receiving direct divine guidance'
  },
  'chakra-alignment': {
    name: 'Chakra Alignment',
    positions: [
      'Root Chakra', 'Sacral Chakra', 'Solar Plexus', 'Heart Chakra',
      'Throat Chakra', 'Third Eye', 'Crown Chakra'
    ],
    description: 'A 7-card spread for spiritual energy alignment and chakra healing'
  },
  'love-guidance': {
    name: 'Love & Relationships',
    positions: ['Your Heart', 'Their Heart', 'Divine Guidance', 'Potential Outcome'],
    description: 'Sacred wisdom about love, relationships, and heart connections'
  },
  'purpose-calling': {
    name: 'Divine Purpose',
    positions: ['Current Path', 'Divine Calling', 'Hidden Talents', 'Next Steps'],
    description: 'Discover your sacred life purpose and spiritual mission'
  }
};
