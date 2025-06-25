
import { SpreadConfiguration } from '@/types/tarot';

export const spreadConfigurations: Record<string, SpreadConfiguration> = {
  'three-card': {
    name: 'Three Card Spread',
    positions: ['Past', 'Present', 'Future'],
    description: 'A simple yet powerful spread revealing the flow of time and energy in your life.'
  },
  'spiritual-guidance': {
    name: 'Spiritual Guidance',
    positions: ['Current Spiritual State', 'Divine Message', 'Action to Take'],
    description: 'Receive direct spiritual guidance for your current path and next steps.'
  },
  'celtic-cross': {
    name: 'Celtic Cross',
    positions: [
      'Present Situation',
      'Challenge/Cross',
      'Distant Past/Foundation',
      'Recent Past',
      'Possible Outcome',
      'Immediate Future',
      'Your Approach',
      'External Influences',
      'Hopes and Fears',
      'Final Outcome'
    ],
    description: 'The most comprehensive tarot spread for deep spiritual insight and life guidance.'
  },
  'chakra-alignment': {
    name: 'Chakra Alignment',
    positions: ['Root', 'Sacral', 'Solar Plexus', 'Heart', 'Throat', 'Third Eye', 'Crown'],
    description: 'Discover the current state of your energy centers and how to achieve balance.'
  },
  'love-guidance': {
    name: 'Love & Relationships',
    positions: ['Your Energy', 'Their Energy', 'Connection', 'Challenges', 'Guidance'],
    description: 'Divine guidance for matters of the heart and relationships.'
  },
  'purpose-calling': {
    name: 'Life Purpose & Calling',
    positions: ['Soul Purpose', 'Current Path', 'Obstacles', 'Gifts', 'Next Steps'],
    description: 'Discover your divine purpose and calling in this lifetime.'
  }
};
