export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'inactive' | 'trialing' | 'past_due' | 'canceled' | 'unpaid';
  startDate: string;
  endDate?: string;
  trialStartDate?: string;
  trialEndDate?: string;
  cancelAtPeriodEnd: boolean;
  created: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAt?: string;
  canceledAt?: string;
  endedAt?: string;
}

export interface Plan {
  id: string;
  name: string;
  stripePriceId: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  description?: string;
  features?: string[];
}

export interface WisdomTier {
  id: string;
  name: string;
  element: 'earth' | 'water' | 'fire' | 'ether';
  description: string;
  features: string[];
  restrictions: string[];
  monthlyPrice: number;
  yearlyPrice: number;
  stripePriceId: string; // Monthly price ID
  stripeYearlyPriceId: string; // Yearly price ID
  culturalAccess: ('open' | 'initiated' | 'sacred')[];
  mentorAccess: boolean;
  ancientLibraryAccess: boolean;
  communityLevel: 'general' | 'pods' | 'council' | 'mystery';
  comingSoon?: boolean;
}

export const WISDOM_TIERS: WisdomTier[] = [
  {
    id: 'earth',
    name: 'Earth Keeper',
    element: 'earth',
    description: 'Ground yourself in fundamental spiritual practices',
    features: [
      'Basic meditation library',
      'Dream journal with AI analysis',
      'Mood tracking and insights',
      'Cultural adaptation (open traditions)',
      'Community discussions',
      'Monthly group rituals'
    ],
    restrictions: [
      'Limited AI conversations (50/month)',
      'Basic archetype assessment',
      'No AI mentor access'
    ],
    monthlyPrice: 19,
    yearlyPrice: 190,
    stripePriceId: 'price_earth_monthly', // Replace with actual Stripe price ID
    stripeYearlyPriceId: 'price_earth_yearly', // Replace with actual Stripe price ID
    culturalAccess: ['open'],
    mentorAccess: false,
    ancientLibraryAccess: false,
    communityLevel: 'general'
  },
  {
    id: 'water',
    name: 'Water Bearer',
    element: 'water',
    description: 'Flow deeper into cultural wisdom and healing practices',
    features: [
      'All Earth Keeper features',
      'Advanced archetype profiling',
      'Cultural wisdom (initiated traditions)',
      'Personalized ritual generator',
      'Sacred pod communities (7 members)',
      'Biometric meditation adaptation',
      'AI shadow work guidance'
    ],
    restrictions: [
      'Limited AI mentor sessions (2/month)',
      'No ancient mystery access'
    ],
    monthlyPrice: 29,
    yearlyPrice: 290,
    stripePriceId: 'price_water_monthly', // Replace with actual Stripe price ID
    stripeYearlyPriceId: 'price_water_yearly', // Replace with actual Stripe price ID
    culturalAccess: ['open', 'initiated'],
    mentorAccess: true,
    ancientLibraryAccess: false,
    communityLevel: 'pods'
  },
  {
    id: 'fire',
    name: 'Fire Keeper',
    element: 'fire',
    description: 'Ignite your spiritual power with AI mentorship',
    features: [
      'All Water Bearer features',
      'Weekly 1:1 AI mentor sessions',
      'Sacred tradition access (limited)',
      'Ancient library (curated selections)',
      'Council community access',
      'Lucid dreaming protocols',
      'Advanced third eye practices',
      'Neuro-spiritual integration'
    ],
    restrictions: [
      'Selected ancient mysteries only'
    ],
    monthlyPrice: 49,
    yearlyPrice: 490,
    stripePriceId: 'price_fire_monthly', // Replace with actual Stripe price ID
    stripeYearlyPriceId: 'price_fire_yearly', // Replace with actual Stripe price ID
    culturalAccess: ['open', 'initiated', 'sacred'],
    mentorAccess: true,
    ancientLibraryAccess: true,
    communityLevel: 'council'
  },
  {
    id: 'ether',
    name: 'Ether Walker',
    element: 'ether',
    description: 'Master the ancient mysteries with unlimited AI guidance',
    features: [
      'All Fire Keeper features',
      'Unlimited AI mentor access',
      'Full ancient mystery library',
      'Mystery school initiation paths',
      'Elder council participation',
      'Co-create new spiritual technologies',
      'Quantum consciousness experiments',
      'Morphic field research access'
    ],
    restrictions: [],
    monthlyPrice: 59,
    yearlyPrice: 590,
    stripePriceId: 'price_ether_monthly', // Replace with actual Stripe price ID
    stripeYearlyPriceId: 'price_ether_yearly', // Replace with actual Stripe price ID
    culturalAccess: ['open', 'initiated', 'sacred'],
    mentorAccess: true,
    ancientLibraryAccess: true,
    communityLevel: 'mystery'
  }
];
