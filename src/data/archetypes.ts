import { SoulArchetype, CulturalTradition } from '@/types/archetype';

export const ARCHETYPES: SoulArchetype[] = [
  {
    id: 'sage',
    name: 'The Sage',
    tradition: 'Ancient Greece',
    description: 'The Sage seeks truth and wisdom, using intellect and knowledge to understand the world.',
    attributes: ['Wise', 'Analytical', 'Objective', 'Mentor'],
    element: 'air',
    deity: 'Athena',
    colors: ['Blue', 'White'],
    symbols: ['Owl', 'Scroll', 'Spectacles'],
    challenges: ['Analysis paralysis', 'Detachment', 'Overthinking'],
    gifts: ['Clarity', 'Insight', 'Guidance']
  },
  {
    id: 'warrior',
    name: 'The Warrior',
    tradition: 'Ancient Rome',
    description: 'The Warrior is courageous and disciplined, fighting for justice and protecting the vulnerable.',
    attributes: ['Brave', 'Disciplined', 'Protective', 'Honorable'],
    element: 'fire',
    deity: 'Mars',
    colors: ['Red', 'Gold'],
    symbols: ['Sword', 'Shield', 'Armor'],
    challenges: ['Aggression', 'Recklessness', 'Domination'],
    gifts: ['Courage', 'Strength', 'Leadership']
  },
  {
    id: 'healer',
    name: 'The Healer',
    tradition: 'Ancient Egypt',
    description: 'The Healer nurtures and restores, bringing harmony and well-being to body, mind, and spirit.',
    attributes: ['Compassionate', 'Empathetic', 'Nurturing', 'Intuitive'],
    element: 'water',
    deity: 'Isis',
    colors: ['Green', 'Pink'],
    symbols: ['Caduceus', 'Lotus', 'Healing Hands'],
    challenges: ['Burnout', 'Emotional overwhelm', 'Sacrifice'],
    gifts: ['Healing', 'Empathy', 'Balance']
  },
  {
    id: 'artist',
    name: 'The Artist',
    tradition: 'Renaissance Italy',
    description: 'The Artist creates beauty and inspires, expressing emotions and visions through various art forms.',
    attributes: ['Creative', 'Imaginative', 'Expressive', 'Visionary'],
    element: 'ether',
    deity: 'Venus',
    colors: ['Purple', 'Silver'],
    symbols: ['Palette', 'Brush', 'Lyre'],
    challenges: ['Perfectionism', 'Self-doubt', 'Instability'],
    gifts: ['Creativity', 'Inspiration', 'Beauty']
  },
  {
    id: 'innovator',
    name: 'The Innovator',
    tradition: 'Silicon Valley',
    description: 'The Innovator is inventive and forward-thinking, pioneering new technologies and solutions to improve the world.',
    attributes: ['Ingenious', 'Resourceful', 'Adaptable', 'Driven'],
    element: 'air',
    deity: 'Prometheus',
    colors: ['Electric Blue', 'Chrome'],
    symbols: ['Lightbulb', 'Gears', 'Computer Circuit'],
    challenges: ['Burnout', 'Ethical dilemmas', 'Obsolescence'],
    gifts: ['Innovation', 'Efficiency', 'Progress']
  },
  {
    id: 'mystic',
    name: 'The Mystic',
    tradition: 'Ancient India',
    description: 'The Mystic seeks enlightenment and transcendence, exploring the depths of consciousness and the mysteries of the universe.',
    attributes: ['Intuitive', 'Spiritual', 'Contemplative', 'Connected'],
    element: 'water',
    deity: 'Shiva',
    colors: ['Indigo', 'Gold'],
    symbols: ['Third Eye', 'Mandala', 'Rosary'],
    challenges: ['Delusion', 'Isolation', 'Escapism'],
    gifts: ['Intuition', 'Insight', 'Transcendence']
  },
  {
    id: 'guardian',
    name: 'The Guardian',
    tradition: 'Feudal Japan',
    description: 'The Guardian is loyal and protective, upholding traditions and safeguarding communities with unwavering dedication.',
    attributes: ['Loyal', 'Protective', 'Honorable', 'Disciplined'],
    element: 'earth',
    deity: 'Hachiman',
    colors: ['Forest Green', 'Bronze'],
    symbols: ['Katana', 'Cherry Blossom', 'Stone Lantern'],
    challenges: ['Rigidity', 'Resistance to change', 'Overprotectiveness'],
    gifts: ['Loyalty', 'Security', 'Preservation']
  },
  {
    id: 'explorer',
    name: 'The Explorer',
    tradition: 'Age of Discovery',
    description: 'The Explorer seeks adventure and discovery, venturing into the unknown to expand horizons and uncover new possibilities.',
    attributes: ['Curious', 'Adventurous', 'Independent', 'Resilient'],
    element: 'fire',
    deity: 'Poseidon',
    colors: ['Ocean Blue', 'Burnt Orange'],
    symbols: ['Compass', 'Ship', 'Map'],
    challenges: ['Restlessness', 'Risk-taking', 'Rootlessness'],
    gifts: ['Discovery', 'Adaptability', 'Freedom']
  }
];

export const CULTURAL_TRADITIONS: CulturalTradition[] = [
  {
    id: 'buddhist',
    name: 'Buddhist Dharma',
    region: 'Asia, Global',
    verified: true,
    elderCouncil: [
      'Thich Nhat Hanh Community - Living mindfulness teacher',
      'Dalai Lama Teachings - Tibetan Buddhist wisdom',
      'Jack Kornfield - Western Buddhist integration',
      'Pema Chödrön - Contemporary Buddhist teachings'
    ],
    accessLevel: 'open',
    territoryAcknowledgment: 'We honor the Buddha, Dharma, and Sangha, and acknowledge the ancient wisdom traditions of India, Tibet, Thailand, Myanmar, Sri Lanka, and all lands where the Dharma has flourished. We approach these teachings with reverence for the countless teachers who have preserved and transmitted this wisdom across generations.'
  },
  {
    id: 'celtic',
    name: 'Celtic Wisdom',
    region: 'Ireland, Scotland, Wales, Brittany',
    verified: true,
    elderCouncil: [
      'Celtic Reconstructionist Communities - Modern practitioners',
      'Irish Traditional Music Keepers - Cultural wisdom holders',
      'Scottish Highland Clan Elders - Ancestral knowledge',
      'Welsh Bardic Circles - Poetic and mythological wisdom'
    ],
    accessLevel: 'initiated',
    territoryAcknowledgment: 'We acknowledge the sacred lands of the Celtic peoples - Ireland, Scotland, Wales, Cornwall, Brittany, and the Isle of Man. We honor the ancestors who lived in harmony with these lands and carried forward the wisdom of the druids, bards, and healers. We approach these teachings with respect for the living Celtic cultures and their ongoing traditions.'
  },
  {
    id: 'norse',
    name: 'Norse Heathenry',
    region: 'Scandinavia, Iceland',
    verified: true,
    elderCouncil: [
      'Icelandic Ásatrú Communities - Modern Norse practitioners',
      'Swedish Folklore Societies - Traditional knowledge keepers',
      'Norwegian Stave Church Historians - Cultural preservationists',
      'Danish Archaeological Societies - Ancient wisdom researchers'
    ],
    accessLevel: 'initiated',
    territoryAcknowledgment: 'We honor the lands of the Norse peoples - Norway, Sweden, Denmark, Iceland, and the broader Germanic territories. We acknowledge the ancestors who sailed these seas, lived by the ancient codes of honor, and preserved the wisdom of the Æsir and Vanir. We approach these teachings with respect for both historical accuracy and living heathen communities.'
  },
  {
    id: 'egyptian',
    name: 'Ancient Egyptian Mysteries',
    region: 'Egypt, North Africa',
    verified: true,
    elderCouncil: [
      'Egyptian Archaeological Society - Historical accuracy guardians',
      'Coptic Orthodox Elders - Living Egyptian spiritual tradition',
      'Kemetic Orthodox Community - Modern Egyptian religious practice',
      'Cairo Museum Egyptologists - Ancient wisdom researchers'
    ],
    accessLevel: 'sacred',
    territoryAcknowledgment: 'We acknowledge the sacred land of Kemet (ancient Egypt) and the Nile River that gave life to one of humanity\'s greatest civilizations. We honor the pharaohs, priests, scribes, and common people who created and preserved these mysteries. We approach these teachings with reverence for Egyptian sovereignty and the living descendants of this ancient wisdom.'
  },
  {
    id: 'indigenous',
    name: 'Indigenous Earth Wisdom',
    region: 'Turtle Island (North America)',
    verified: true,
    elderCouncil: [
      'National Congress of American Indians - Sovereign tribal representation',
      'Indigenous Women\'s Network - Traditional knowledge keepers',
      'Native American Church Elders - Spiritual practice guardians',
      'First Nations Environmental Alliance - Earth wisdom teachers'
    ],
    accessLevel: 'sacred',
    territoryAcknowledgment: 'We acknowledge that we are on the traditional territories of Indigenous peoples, the original stewards of Turtle Island. We honor the sovereignty of all tribal nations and recognize that Indigenous peoples continue to live and practice their sacred traditions on these lands. We approach these teachings with the utmost respect and understanding that we are guests seeking to learn from, not appropriate, Indigenous wisdom.'
  },
  {
    id: 'hindu',
    name: 'Sanatana Dharma',
    region: 'India, Southeast Asia',
    verified: true,
    elderCouncil: [
      'Shankaracharya Lineages - Traditional Advaita teachers',
      'Living Saints of Vrindavan - Bhakti tradition keepers',
      'Tamil Siddha Lineages - South Indian yoga masters',
      'Himalayan Ashram Elders - Mountain wisdom traditions'
    ],
    accessLevel: 'initiated',
    territoryAcknowledgment: 'We honor Bharat Mata (Mother India) and the ancient Indus Valley civilization that gave birth to these eternal teachings. We acknowledge the rishis, sages, and gurus who have preserved this wisdom through millennia, and we approach these teachings with reverence for the living traditions of India and the global Hindu community.'
  }
];
