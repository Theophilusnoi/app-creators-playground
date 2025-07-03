export interface PalmLine {
  name: string;
  spiritualMeaning: string;
  chakraConnection: string;
  astrologyRuler: string;
  divinationFocus: string;
  lifeLesson: string;
}

export interface PalmMount {
  name: string;
  planet: string;
  spiritualGift: string;
  personality: string;
  chakraAlignment: string;
  divineMessage: string;
}

export const enhancedPalmLines: PalmLine[] = [
  {
    name: 'Life Line',
    spiritualMeaning: 'Your soul\'s journey through this incarnation and connection to Earth energy',
    chakraConnection: 'Root Chakra - Grounding and survival instincts',
    astrologyRuler: 'Mars - Life force and vitality',
    divinationFocus: 'Physical vitality, life path, spiritual endurance, earthly mission',
    lifeLesson: 'Learning to honor your physical vessel as a sacred temple for your soul'
  },
  {
    name: 'Heart Line',
    spiritualMeaning: 'Your capacity for divine love and emotional spiritual evolution',
    chakraConnection: 'Heart Chakra - Love, compassion, and emotional healing',
    astrologyRuler: 'Venus - Love, beauty, and harmony',
    divinationFocus: 'Relationships, emotional healing, capacity for love, heart-centered wisdom',
    lifeLesson: 'Opening your heart completely to give and receive unconditional divine love'
  },
  {
    name: 'Head Line',
    spiritualMeaning: 'Your mental approach to spiritual understanding and divine wisdom',
    chakraConnection: 'Third Eye Chakra - Intuition, wisdom, and psychic perception',
    astrologyRuler: 'Mercury - Communication, intellect, and divine messages',
    divinationFocus: 'Mental clarity, decision-making, intellectual spiritual growth, divine communication',
    lifeLesson: 'Balancing rational mind with intuitive wisdom for complete spiritual understanding'
  },
  {
    name: 'Fate Line',
    spiritualMeaning: 'Your soul\'s predetermined path and divine destiny in this lifetime',
    chakraConnection: 'Crown Chakra - Divine connection and spiritual purpose',
    astrologyRuler: 'Saturn - Karma, life lessons, and spiritual discipline',
    divinationFocus: 'Life purpose, karmic lessons, spiritual destiny, divine mission',
    lifeLesson: 'Surrendering to your soul\'s higher purpose while taking responsibility for your spiritual growth'
  },
  {
    name: 'Sun Line',
    spiritualMeaning: 'Your creative spiritual expression and ability to shine divine light',
    chakraConnection: 'Solar Plexus Chakra - Personal power and creative manifestation',
    astrologyRuler: 'Sun - Life force, creativity, and divine radiance',
    divinationFocus: 'Creative expression, public recognition, spiritual charisma, divine gifts sharing',
    lifeLesson: 'Using your creative gifts to serve divine purpose and inspire others'
  },
  {
    name: 'Mercury Line',
    spiritualMeaning: 'Your ability to communicate divine wisdom and spiritual insights',
    chakraConnection: 'Throat Chakra - Communication and spiritual expression',
    astrologyRuler: 'Mercury - Divine messages, learning, and spiritual teaching',
    divinationFocus: 'Communication skills, teaching ability, business acumen, divine message sharing',
    lifeLesson: 'Speaking your spiritual truth with clarity, compassion, and divine authority'
  },
  {
    name: 'Intuition Line',
    spiritualMeaning: 'Your psychic abilities and connection to divine guidance',
    chakraConnection: 'Third Eye Chakra - Psychic perception and divine insight',
    astrologyRuler: 'Neptune - Intuition, psychic gifts, and spiritual mysticism',
    divinationFocus: 'Psychic abilities, intuitive insights, spiritual sensitivity, divine guidance reception',
    lifeLesson: 'Trusting and developing your psychic gifts to serve spiritual healing and guidance'
  }
];

export const enhancedPalmMounts: PalmMount[] = [
  {
    name: 'Mount of Jupiter',
    planet: 'Jupiter',
    spiritualGift: 'Divine wisdom, spiritual leadership, and sacred teaching abilities',
    personality: 'Natural spiritual leader with strong moral compass and desire to guide others',
    chakraAlignment: 'Crown and Solar Plexus - Divine authority and personal power',
    divineMessage: 'You are called to lead others on the spiritual path with wisdom and compassion'
  },
  {
    name: 'Mount of Saturn',
    planet: 'Saturn',
    spiritualGift: 'Spiritual discipline, karmic understanding, and sacred responsibility',
    personality: 'Serious spiritual seeker with deep understanding of cosmic law and divine justice',
    chakraAlignment: 'Root Chakra - Grounding and spiritual discipline',
    divineMessage: 'Your spiritual path requires dedication and discipline, but leads to profound wisdom'
  },
  {
    name: 'Mount of Apollo (Sun)',
    planet: 'Sun',
    spiritualGift: 'Creative spiritual expression, divine inspiration, and light-working abilities',
    personality: 'Radiant soul with artistic gifts and ability to inspire others through beauty',
    chakraAlignment: 'Solar Plexus and Heart - Creative power and divine love expression',
    divineMessage: 'Your creative gifts are divine blessings meant to bring light and beauty to the world'
  },
  {
    name: 'Mount of Mercury',
    planet: 'Mercury',
    spiritualGift: 'Divine communication, spiritual teaching, and healing through words',
    personality: 'Natural communicator with gift for translating spiritual wisdom into practical guidance',
    chakraAlignment: 'Throat Chakra - Divine communication and truth expression',
    divineMessage: 'You are a divine messenger, here to communicate spiritual truth with clarity and love'
  },
  {
    name: 'Mount of Mars (Active)',
    planet: 'Mars',
    spiritualGift: 'Spiritual warrior energy, divine protection, and courage for sacred action',
    personality: 'Spiritual warrior with courage to fight for truth and protect the vulnerable',
    chakraAlignment: 'Solar Plexus - Personal power and divine courage',
    divineMessage: 'Channel your warrior energy in service of divine justice and spiritual protection'
  },
  {
    name: 'Mount of Mars (Passive)',
    planet: 'Mars',
    spiritualGift: 'Spiritual endurance, divine patience, and strength through surrender',
    personality: 'Patient soul with ability to endure spiritual challenges with grace and strength',
    chakraAlignment: 'Root Chakra - Grounding and spiritual endurance',
    divineMessage: 'Your spiritual strength comes through patience, persistence, and divine surrender'
  },
  {
    name: 'Mount of Venus',
    planet: 'Venus',
    spiritualGift: 'Divine love transmission, emotional healing, and beauty consciousness',
    personality: 'Loving soul with deep capacity for compassion and ability to heal through love',
    chakraAlignment: 'Heart Chakra - Divine love and emotional healing',
    divineMessage: 'Your love is a healing force that transforms all it touches with divine grace'
  },
  {
    name: 'Mount of Luna (Moon)',
    planet: 'Moon',
    spiritualGift: 'Psychic abilities, dream wisdom, and divine feminine intuition',
    personality: 'Intuitive mystic with strong connection to lunar cycles and psychic realms',
    chakraAlignment: 'Third Eye and Sacral - Intuitive wisdom and creative flow',
    divineMessage: 'Trust your psychic gifts and lunar wisdom - they connect you directly to divine guidance'
  }
];

export const palmAnalysisQuestions = [
  {
    category: 'Spiritual Purpose',
    questions: [
      'What is my soul\'s primary mission in this lifetime?',
      'How can I best serve divine purpose through my gifts?',
      'What spiritual lessons is my soul here to learn?'
    ]
  },
  {
    category: 'Psychic Abilities',
    questions: [
      'What psychic gifts do my palms reveal?',
      'How can I safely develop my intuitive abilities?',
      'What divine guidance am I receiving through my dreams?'
    ]
  },
  {
    category: 'Relationships & Love',
    questions: [
      'How can I heal my heart to give and receive love fully?',
      'What does my palm reveal about my soul mate connection?',
      'How can I use love as a spiritual practice?'
    ]
  },
  {
    category: 'Career & Service',
    questions: [
      'How can I align my work with my spiritual purpose?',
      'What gifts should I share with the world?',
      'How can I create abundance while serving the divine?'
    ]
  },
  {
    category: 'Health & Vitality',
    questions: [
      'What does my life line reveal about my physical vitality?',
      'How can I honor my body as a sacred temple?',
      'What spiritual practices will enhance my health?'
    ]
  }
];

export const getChakraFromPalmLine = (lineName: string): string => {
  const chakraMap: Record<string, string> = {
    'Life Line': 'Root Chakra',
    'Heart Line': 'Heart Chakra',
    'Head Line': 'Third Eye Chakra',
    'Fate Line': 'Crown Chakra',
    'Sun Line': 'Solar Plexus Chakra',
    'Mercury Line': 'Throat Chakra',
    'Intuition Line': 'Third Eye Chakra'
  };
  
  return chakraMap[lineName] || 'All Chakras';
};

export const getAstrologicalGuidanceForMount = (mountName: string): string => {
  const mount = enhancedPalmMounts.find(m => m.name === mountName);
  return mount?.divineMessage || 'The cosmos supports your spiritual journey.';
};

export const generateSpiritualPalmReading = (lines: string[], mounts: string[]): string => {
  const guidance = [
    'Your palms reveal a soul on a profound spiritual journey.',
    'The divine has blessed you with unique gifts meant to serve the world.',
    'Your hands show the map of your soul\'s evolution in this lifetime.',
    'Ancient wisdom flows through your palm lines, revealing your sacred purpose.',
    'Your spiritual gifts are awakening - trust the process and share your light.'
  ];
  
  return guidance[Math.floor(Math.random() * guidance.length)];
};