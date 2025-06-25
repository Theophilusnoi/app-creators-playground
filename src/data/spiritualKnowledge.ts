
export interface SpiritualConcept {
  id: string;
  name: string;
  tradition: string[];
  definition: string;
  keyPrinciples: string[];
  practices: string[];
  benefits: string[];
  relatedConcepts: string[];
  deeperWisdom: string;
}

export const spiritualKnowledge: Record<string, SpiritualConcept> = {
  meditation: {
    id: 'meditation',
    name: 'Meditation',
    tradition: ['Buddhist', 'Hindu', 'Universal'],
    definition: 'The practice of focused attention and awareness to achieve mental clarity and spiritual connection.',
    keyPrinciples: [
      'Present moment awareness',
      'Non-judgmental observation',
      'Letting go of attachment',
      'Cultivating inner stillness'
    ],
    practices: [
      'Mindfulness meditation',
      'Loving-kindness meditation',
      'Chakra meditation',
      'Breathing meditation',
      'Walking meditation'
    ],
    benefits: [
      'Reduced stress and anxiety',
      'Enhanced spiritual awareness',
      'Improved emotional regulation',
      'Deeper sense of inner peace',
      'Strengthened intuition'
    ],
    relatedConcepts: ['mindfulness', 'chakras', 'pranayama', 'samadhi'],
    deeperWisdom: 'Meditation is not about emptying the mind, but about recognizing the spacious awareness that is your true nature. In stillness, you discover the divine presence that has always been within you.'
  },
  
  manifestation: {
    id: 'manifestation',
    name: 'Manifestation',
    tradition: ['New Thought', 'Universal', 'Ancient Egyptian'],
    definition: 'The process of bringing desires and intentions into physical reality through spiritual practice and alignment.',
    keyPrinciples: [
      'Clarity of intention',
      'Emotional alignment',
      'Consistent visualization',
      'Inspired action',
      'Divine timing trust'
    ],
    practices: [
      'Vision boarding',
      'Affirmation practice',
      'Visualization meditation',
      'Gratitude journaling',
      'Energy alignment work'
    ],
    benefits: [
      'Achievement of desired outcomes',
      'Increased self-empowerment',
      'Stronger faith in universal support',
      'Enhanced creative abilities',
      'Deeper life purpose clarity'
    ],
    relatedConcepts: ['law_of_attraction', 'visualization', 'intention_setting', 'gratitude'],
    deeperWisdom: 'True manifestation occurs when your personal will aligns with divine will. You become a co-creator with the universe, manifesting not just for personal gain, but for the highest good of all.'
  },

  chakras: {
    id: 'chakras',
    name: 'Chakra System',
    tradition: ['Hindu', 'Tantric', 'Vedic'],
    definition: 'Seven main energy centers in the human body that regulate physical, emotional, and spiritual well-being.',
    keyPrinciples: [
      'Energy flows through seven main centers',
      'Each chakra governs specific aspects of life',
      'Balance creates harmony and health',
      'Blockages cause physical and emotional issues'
    ],
    practices: [
      'Chakra meditation',
      'Crystal healing',
      'Sound healing with mantras',
      'Color visualization',
      'Yoga poses for each chakra'
    ],
    benefits: [
      'Balanced energy flow',
      'Enhanced spiritual awareness',
      'Improved emotional stability',
      'Better physical health',
      'Stronger intuitive abilities'
    ],
    relatedConcepts: ['kundalini', 'prana', 'meditation', 'yoga'],
    deeperWisdom: 'The chakras are not just energy centers but gateways to higher consciousness. As you balance and open each chakra, you ascend the ladder of spiritual evolution, ultimately uniting with divine consciousness.'
  },

  karma: {
    id: 'karma',
    name: 'Karma',
    tradition: ['Hindu', 'Buddhist', 'Jain'],
    definition: 'The universal law of cause and effect governing actions and their consequences across lifetimes.',
    keyPrinciples: [
      'Every action has consequences',
      'Intentions matter as much as actions',
      'What you give out returns to you',
      'Past actions influence present circumstances'
    ],
    practices: [
      'Mindful action',
      'Karma yoga (selfless service)',
      'Ethical living',
      'Compassionate behavior',
      'Self-reflection and accountability'
    ],
    benefits: [
      'Greater personal responsibility',
      'Understanding of life patterns',
      'Motivation for positive action',
      'Freedom from victim mentality',
      'Accelerated spiritual growth'
    ],
    relatedConcepts: ['dharma', 'reincarnation', 'moksha', 'ethical_living'],
    deeperWisdom: 'Karma is not punishment but education. Each experience, whether pleasant or challenging, offers an opportunity for the soul to learn, grow, and evolve toward its ultimate liberation.'
  }
};

export const getRelatedConcepts = (conceptId: string): SpiritualConcept[] => {
  const concept = spiritualKnowledge[conceptId];
  if (!concept) return [];
  
  return concept.relatedConcepts
    .map(id => spiritualKnowledge[id])
    .filter(Boolean);
};

export const searchConcepts = (query: string): SpiritualConcept[] => {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(spiritualKnowledge).filter(concept =>
    concept.name.toLowerCase().includes(lowercaseQuery) ||
    concept.definition.toLowerCase().includes(lowercaseQuery) ||
    concept.keyPrinciples.some(principle => principle.toLowerCase().includes(lowercaseQuery)) ||
    concept.practices.some(practice => practice.toLowerCase().includes(lowercaseQuery))
  );
};
