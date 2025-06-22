
import { SoulArchetype, CulturalTradition } from '@/types/archetype';

export const SOUL_ARCHETYPES: SoulArchetype[] = [
  // Celtic/Norse Tradition
  {
    id: 'warrior-sage',
    name: 'Warrior-Sage',
    tradition: 'Celtic',
    description: 'The fierce protector who fights for justice and wisdom',
    attributes: ['Courage', 'Wisdom', 'Leadership', 'Protection'],
    element: 'fire',
    deity: 'Brigid',
    colors: ['red', 'gold', 'green'],
    symbols: ['sword', 'oak', 'flame'],
    challenges: ['Anger management', 'Perfectionism', 'Overprotection'],
    gifts: ['Natural leadership', 'Protective instincts', 'Strategic thinking']
  },
  {
    id: 'wise-woman',
    name: 'Wise Woman',
    tradition: 'Norse',
    description: 'The keeper of ancient wisdom and herbal knowledge',
    attributes: ['Intuition', 'Healing', 'Prophecy', 'Connection to Nature'],
    element: 'earth',
    deity: 'Frigg',
    colors: ['green', 'brown', 'silver'],
    symbols: ['herbs', 'moon', 'runes'],
    challenges: ['Isolation', 'Overwhelming empathy', 'Others\' skepticism'],
    gifts: ['Natural healing abilities', 'Prophetic dreams', 'Plant communication']
  },
  // Vedic Tradition
  {
    id: 'cosmic-dancer',
    name: 'Cosmic Dancer',
    tradition: 'Vedic',
    description: 'The divine artist who creates through movement and expression',
    attributes: ['Creativity', 'Joy', 'Transformation', 'Devotion'],
    element: 'ether',
    deity: 'Nataraja',
    colors: ['orange', 'gold', 'purple'],
    symbols: ['lotus', 'drum', 'flame'],
    challenges: ['Emotional intensity', 'Addiction to drama', 'Inconsistency'],
    gifts: ['Artistic expression', 'Transformational presence', 'Spiritual ecstasy']
  },
  {
    id: 'mountain-sage',
    name: 'Mountain Sage',
    tradition: 'Vedic',
    description: 'The solitary seeker of ultimate truth and liberation',
    attributes: ['Detachment', 'Meditation', 'Wisdom', 'Transcendence'],
    element: 'air',
    deity: 'Shiva',
    colors: ['white', 'blue', 'grey'],
    symbols: ['mountain', 'third eye', 'trident'],
    challenges: ['Disconnection from others', 'Spiritual bypassing', 'Rigidity'],
    gifts: ['Deep meditation states', 'Philosophical insight', 'Spiritual teaching']
  },
  // Egyptian Tradition
  {
    id: 'sphinx-guardian',
    name: 'Sphinx Guardian',
    tradition: 'Egyptian',
    description: 'The keeper of sacred mysteries and ancient knowledge',
    attributes: ['Mystery', 'Protection', 'Ancient Wisdom', 'Initiation'],
    element: 'earth',
    deity: 'Thoth',
    colors: ['gold', 'black', 'blue'],
    symbols: ['ankh', 'eye of horus', 'pyramid'],
    challenges: ['Secretiveness', 'Superiority complex', 'Fear of vulnerability'],
    gifts: ['Access to akashic records', 'Initiation abilities', 'Sacred geometry mastery']
  },
  // Native American Tradition
  {
    id: 'earth-keeper',
    name: 'Earth Keeper',
    tradition: 'Native American',
    description: 'The protector of Mother Earth and all her creatures',
    attributes: ['Connection to Nature', 'Healing', 'Ceremony', 'Community'],
    element: 'earth',
    deity: 'Gaia',
    colors: ['green', 'brown', 'turquoise'],
    symbols: ['medicine wheel', 'eagle', 'corn'],
    challenges: ['Environmental grief', 'Cultural appropriation concerns', 'Modern world disconnect'],
    gifts: ['Plant spirit communication', 'Weather sensitivity', 'Healing ceremonies']
  },
  // African/Yoruba Tradition
  {
    id: 'rhythm-keeper',
    name: 'Rhythm Keeper',
    tradition: 'Yoruba',
    description: 'The one who maintains the cosmic rhythm through music and dance',
    attributes: ['Rhythm', 'Community', 'Celebration', 'Ancestral Connection'],
    element: 'fire',
    deity: 'Oshun',
    colors: ['yellow', 'gold', 'orange'],
    symbols: ['drum', 'river', 'honey'],
    challenges: ['Overwhelm from others\' emotions', 'Difficulty with solitude', 'Ancestral trauma'],
    gifts: ['Rhythmic healing', 'Community building', 'Ancestral guidance']
  },
  // Buddhist Tradition
  {
    id: 'compassionate-warrior',
    name: 'Compassionate Warrior',
    tradition: 'Buddhist',
    description: 'The fierce protector of all sentient beings through loving kindness',
    attributes: ['Compassion', 'Mindfulness', 'Non-violence', 'Service'],
    element: 'water',
    deity: 'Avalokiteshvara',
    colors: ['white', 'pink', 'blue'],
    symbols: ['lotus', 'vajra', 'mala'],
    challenges: ['Spiritual bypassing', 'Martyrdom', 'Excessive self-sacrifice'],
    gifts: ['Boundless compassion', 'Conflict resolution', 'Healing presence']
  },
  // Secular/Universal
  {
    id: 'quantum-bridge',
    name: 'Quantum Bridge',
    tradition: 'Universal',
    description: 'The one who bridges science and spirituality for modern awakening',
    attributes: ['Integration', 'Innovation', 'Logic', 'Transcendence'],
    element: 'ether',
    deity: 'Higher Self',
    colors: ['silver', 'blue', 'white'],
    symbols: ['DNA helix', 'infinity', 'crystalline matrix'],
    challenges: ['Overthinking', 'Isolation from traditional communities', 'Imposter syndrome'],
    gifts: ['Scientific intuition', 'Systems thinking', 'Technology integration']
  }
];

export const CULTURAL_TRADITIONS: CulturalTradition[] = [
  {
    id: 'celtic',
    name: 'Celtic Wisdom',
    region: 'Ireland, Scotland, Wales, Brittany',
    verified: true,
    elderCouncil: ['Druid Council of Ireland', 'Scottish Celtic Society'],
    accessLevel: 'open',
    territoryAcknowledgment: 'We honor the ancient Celtic peoples and their sacred relationship with the land of Ireland, Scotland, Wales, and Brittany.'
  },
  {
    id: 'vedic',
    name: 'Vedic Tradition',
    region: 'India, Nepal, Tibet',
    verified: true,
    elderCouncil: ['Vedic Heritage Foundation', 'Himalayan Institute'],
    accessLevel: 'initiated',
    territoryAcknowledgment: 'We acknowledge the sacred wisdom of the Indian subcontinent and the unbroken lineage of Vedic knowledge keepers.'
  },
  {
    id: 'native-american',
    name: 'Indigenous American Wisdom',
    region: 'North and South America',
    verified: true,
    elderCouncil: ['National Congress of American Indians', 'Indigenous Spiritual Council'],
    accessLevel: 'sacred',
    territoryAcknowledgment: 'We acknowledge that we are on the ancestral lands of Indigenous peoples who have been stewards of this land since time immemorial.'
  },
  {
    id: 'yoruba',
    name: 'Yoruba Tradition',
    region: 'West Africa, Caribbean, Brazil',
    verified: true,
    elderCouncil: ['Yoruba World Congress', 'Ifa Heritage Institute'],
    accessLevel: 'initiated',
    territoryAcknowledgment: 'We honor the Yoruba people and their rich spiritual heritage that has blessed communities across Africa and the diaspora.'
  },
  {
    id: 'buddhist',
    name: 'Buddhist Dharma',
    region: 'Asia, Global',
    verified: true,
    elderCouncil: ['World Buddhist Sangha Council', 'Dalai Lama Office'],
    accessLevel: 'open',
    territoryAcknowledgment: 'We bow to the Buddha, the Dharma, and the Sangha, and honor all traditions that carry the light of awakening.'
  },
  {
    id: 'egyptian',
    name: 'Ancient Egyptian Mysteries',
    region: 'Egypt, Mediterranean',
    verified: false,
    elderCouncil: ['Egyptian Ministry of Antiquities', 'Hermetic Order'],
    accessLevel: 'sacred',
    territoryAcknowledgment: 'We honor the ancient wisdom of Kemet and the sacred mysteries of the Nile.'
  }
];
