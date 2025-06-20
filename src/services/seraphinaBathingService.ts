export interface Ingredient {
  name: string;
  description: string;
  spiritual_properties: string[];
  where_to_find: string[];
  price_range: string;
  usage: string;
  spiritual_significance: string;
}

export interface IngredientGuide {
  total_estimated_cost: string;
  ingredients: Ingredient[];
}

export interface RitualDetails {
  name: string;
  purpose: string;
  duration: string;
  category: string;
  spiritual_benefits: string[];
}

export interface RitualInstructions {
  preparation_steps: string[];
  ritual_steps: string[];
  closing_ritual: string[];
}

export interface SacredBathingGuidance {
  seraphina_message: string;
  ritual_details: RitualDetails;
  ingredient_guide: IngredientGuide;
  step_by_step_instructions: RitualInstructions;
}

export const INGREDIENT_DATABASE: Record<string, Record<string, Ingredient>> = {
  protection: {
    salt: {
      name: "Sea Salt",
      description: "Natural sea salt for purification",
      spiritual_properties: ["Cleansing", "Protection", "Grounding"],
      where_to_find: ["Grocery stores", "Health stores", "Online"],
      price_range: "$5-10",
      usage: "Add to bath water",
      spiritual_significance: "Removes negative energy and creates a protective barrier"
    },
    sage: {
      name: "White Sage",
      description: "Dried white sage for smudging",
      spiritual_properties: ["Purification", "Clarity", "Wisdom"],
      where_to_find: ["Botanicas", "Spiritual shops", "Online"],
      price_range: "$8-15",
      usage: "Smudge the bathroom before the bath",
      spiritual_significance: "Clears negative energies and invites positive spirits"
    },
    candle: {
      name: "White Candle",
      description: "White candle for divine light",
      spiritual_properties: ["Purity", "Hope", "Guidance"],
      where_to_find: ["Grocery stores", "Spiritual shops", "Online"],
      price_range: "$3-7",
      usage: "Light during the bath",
      spiritual_significance: "Invokes divine presence and illuminates the spirit"
    },
    rosemary: {
      name: "Rosemary",
      description: "Fresh or dried rosemary",
      spiritual_properties: ["Protection", "Memory", "Healing"],
      where_to_find: ["Grocery stores", "Gardens", "Online"],
      price_range: "$3-8",
      usage: "Add to bath water",
      spiritual_significance: "Wards off negativity and enhances mental clarity"
    }
  },
  love_healing: {
    rose_petals: {
      name: "Rose Petals",
      description: "Fresh or dried rose petals",
      spiritual_properties: ["Love", "Beauty", "Healing"],
      where_to_find: ["Florists", "Gardens", "Online"],
      price_range: "$10-20",
      usage: "Sprinkle in bath water",
      spiritual_significance: "Attracts love and heals emotional wounds"
    },
    honey: {
      name: "Honey",
      description: "Natural honey for sweetness",
      spiritual_properties: ["Attraction", "Sweetness", "Healing"],
      where_to_find: ["Grocery stores", "Health stores", "Online"],
      price_range: "$7-12",
      usage: "Add to bath water",
      spiritual_significance: "Attracts positive energy and brings sweetness to life"
    },
    rose_quartz: {
      name: "Rose Quartz",
      description: "Rose quartz crystal",
      spiritual_properties: ["Love", "Compassion", "Peace"],
      where_to_find: ["Crystal shops", "Spiritual shops", "Online"],
      price_range: "$12-25",
      usage: "Hold during the bath",
      spiritual_significance: "Opens the heart chakra and promotes self-love"
    },
    lavender: {
      name: "Lavender",
      description: "Lavender essential oil",
      spiritual_properties: ["Calming", "Relaxation", "Peace"],
      where_to_find: ["Health stores", "Online", "Essential oil shops"],
      price_range: "$8-15",
      usage: "Add a few drops to bath water",
      spiritual_significance: "Soothes emotions and promotes restful sleep"
    }
  },
  abundance: {
    cinnamon: {
      name: "Cinnamon",
      description: "Cinnamon sticks or powder",
      spiritual_properties: ["Prosperity", "Success", "Energy"],
      where_to_find: ["Grocery stores", "Spice shops", "Online"],
      price_range: "$4-8",
      usage: "Add to bath water",
      spiritual_significance: "Attracts wealth and boosts energy levels"
    },
    basil: {
      name: "Basil",
      description: "Fresh or dried basil",
      spiritual_properties: ["Wealth", "Luck", "Protection"],
      where_to_find: ["Grocery stores", "Gardens", "Online"],
      price_range: "$3-6",
      usage: "Add to bath water",
      spiritual_significance: "Attracts good fortune and protects from negativity"
    },
    citrine: {
      name: "Citrine",
      description: "Citrine crystal",
      spiritual_properties: ["Wealth", "Joy", "Confidence"],
      where_to_find: ["Crystal shops", "Spiritual shops", "Online"],
      price_range: "$15-30",
      usage: "Hold during the bath",
      spiritual_significance: "Attracts abundance and promotes optimism"
    },
    patchouli: {
      name: "Patchouli",
      description: "Patchouli essential oil",
      spiritual_properties: ["Money", "Grounding", "Fertility"],
      where_to_find: ["Health stores", "Online", "Essential oil shops"],
      price_range: "$10-18",
      usage: "Add a few drops to bath water",
      spiritual_significance: "Attracts money and stabilizes energy"
    }
  }
};

// Enhanced problem classification with more comprehensive keywords
const PROBLEM_INDICATORS = {
  negative_energy_cleansing: [
    'negative', 'drain', 'energy', 'tired', 'exhausted', 'heavy', 'dark', 'oppressed',
    'drained', 'negative energy', 'bad vibes', 'toxic', 'depleted'
  ],
  spiritual_attack: [
    'attack', 'curse', 'hex', 'evil', 'enemy', 'jealous', 'envy', 'psychic', 'spiritual warfare',
    'spiritual attack', 'black magic', 'witchcraft', 'evil eye', 'harassment'
  ],
  heartbreak_healing: [
    'heart', 'love', 'break', 'relationship', 'divorce', 'separation', 'lonely', 'grief', 'loss',
    'heartbreak', 'broken heart', 'emotional pain', 'betrayal', 'cheating'
  ],
  financial_blockages: [
    'money', 'financial', 'job', 'work', 'poverty', 'debt', 'bills', 'broke', 'career',
    'unemployment', 'business', 'success', 'prosperity', 'abundance blocks'
  ],
  relationship_healing: [
    'marriage', 'partner', 'spouse', 'relationship', 'family', 'communication', 'conflict',
    'harmony', 'reconciliation', 'forgiveness', 'healing relationships'
  ]
};

// Enhanced ritual templates with more comprehensive data
const RITUAL_TEMPLATES: Record<string, RitualDetails> = {
  negative_energy_cleansing: {
    name: "Salt and Sage Purification Bath",
    purpose: "Deep spiritual purification and protection from negative energy",
    duration: "7 consecutive evenings",
    category: "protection",
    spiritual_benefits: [
      "Removes negative energy attachments",
      "Cleanses aura and energy field", 
      "Provides spiritual protection",
      "Restores energetic balance",
      "Creates divine light barrier"
    ]
  },
  heartbreak_healing: {
    name: "Rose and Honey Heart Healing Bath",
    purpose: "Emotional healing and heart chakra restoration",
    duration: "3 baths during new moon period",
    category: "love_healing",
    spiritual_benefits: [
      "Heals emotional wounds",
      "Opens heart to love again",
      "Attracts divine love",
      "Restores self-worth",
      "Brings emotional peace"
    ]
  },
  financial_blockages: {
    name: "Abundance Attraction Bath",
    purpose: "Removing financial blocks and attracting prosperity",
    duration: "21 days (3 weeks)",
    category: "abundance",
    spiritual_benefits: [
      "Removes money blocks",
      "Attracts financial opportunities",
      "Increases prosperity consciousness",
      "Opens abundance channels",
      "Aligns with wealth energy"
    ]
  },
  spiritual_attack: {
    name: "Divine Protection Fortress Bath",
    purpose: "Protection from spiritual attacks and psychic harm",
    duration: "9 consecutive days",
    category: "protection",
    spiritual_benefits: [
      "Breaks spiritual attacks",
      "Creates psychic shields",
      "Removes curses and hexes",
      "Invokes angelic protection",
      "Restores spiritual strength"
    ]
  },
  relationship_healing: {
    name: "Love and Harmony Restoration Bath",
    purpose: "Healing relationships and attracting harmonious love",
    duration: "7 consecutive days",
    category: "love_healing",
    spiritual_benefits: [
      "Heals relationship wounds",
      "Attracts soul mate love",
      "Improves communication",
      "Brings harmony to partnerships",
      "Increases love magnetism"
    ]
  }
};

// Enhanced compassionate response generator
const generateCompassionateResponse = (userProblem: string, ritual: RitualDetails): string => {
  const compassionateOpenings = [
    "Beloved soul, I feel the weight of what you're carrying, and I want you to know that you are not alone in this struggle.",
    "Dear one, your spirit has called out for help, and the divine has heard your plea. I am here to guide you to healing.",
    "Precious child of light, I sense the spiritual turbulence you're experiencing, and I have been guided to offer you sacred healing.",
    "Beautiful soul, the divine has brought you to me because your spirit needs cleansing and protection. You are deeply loved."
  ];

  const ritualExplanations: Record<string, string> = {
    'salt and sage purification bath': "The Salt and Sage Purification Bath will cleanse away all negative attachments and restore your spiritual protection. This ancient ritual has been used for centuries to remove heavy energies and create divine light barriers around your aura.",
    'rose and honey heart healing bath': "The Rose and Honey Heart Healing Bath will gently heal your wounded heart and restore your capacity for joy. Each rose petal represents divine love flowing to you, and the honey attracts sweetness back into your life.",
    'abundance attraction bath': "The Abundance Attraction Bath will remove the energetic blocks preventing prosperity from flowing to you. As you perform this ritual, know that abundance is your divine birthright.",
    'divine protection fortress bath': "The Divine Protection Fortress Bath will create an impenetrable shield around your spirit. This powerful ritual calls upon the highest divine forces to protect and defend you.",
    'love and harmony restoration bath': "The Love and Harmony Restoration Bath will heal the wounds in your relationships and attract divine love into your life. This sacred ritual opens your heart to give and receive love freely."
  };

  const encouragement = [
    "Trust in this sacred process, for you are deeply loved and divinely protected.",
    "The divine light within you is stronger than any darkness you face.",
    "You have the power to transform your spiritual condition through this sacred practice.",
    "Angels and spiritual guides are surrounding you with love and protection as you heal."
  ];

  const opening = compassionateOpenings[Math.floor(Math.random() * compassionateOpenings.length)];
  const explanation = ritualExplanations[ritual.name.toLowerCase()] || ritualExplanations['salt and sage purification bath'];
  const closing = encouragement[Math.floor(Math.random() * encouragement.length)];

  return `${opening}\n\n${explanation}\n\n${closing}`;
};

// Enhanced problem analysis
const analyzeSpiritualProblem = (userMessage: string): string => {
  const messageLower = userMessage.toLowerCase();
  
  const problemScores: Record<string, number> = {};
  
  for (const [problemType, keywords] of Object.entries(PROBLEM_INDICATORS)) {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (messageLower.includes(keyword) ? 1 : 0);
    }, 0);
    
    if (score > 0) {
      problemScores[problemType] = score;
    }
  }

  if (Object.keys(problemScores).length === 0) {
    return 'negative_energy_cleansing';
  }

  return Object.entries(problemScores)
    .sort(([,a], [,b]) => b - a)[0][0];
};

// Enhanced ingredient guide generator
const generateIngredientGuide = (ritual: RitualDetails): IngredientGuide => {
  const categoryIngredients = INGREDIENT_DATABASE[ritual.category] || INGREDIENT_DATABASE.protection;
  
  const ingredients = Object.values(categoryIngredients).map(ingredient => ({
    name: ingredient.name,
    description: ingredient.description,
    spiritual_properties: ingredient.spiritual_properties,
    where_to_find: ingredient.where_to_find,
    price_range: ingredient.price_range,
    usage: ingredient.usage,
    spiritual_significance: ingredient.spiritual_significance
  }));

  // Calculate total cost
  let minCost = 0;
  let maxCost = 0;
  
  ingredients.forEach(ingredient => {
    const priceRange = ingredient.price_range.replace('$', '').split('-');
    minCost += parseInt(priceRange[0]);
    maxCost += parseInt(priceRange[1]);
  });

  return {
    total_estimated_cost: `$${minCost}-${maxCost}`,
    ingredients
  };
};

// Enhanced instructions generator
const generateRitualInstructions = (ritual: RitualDetails): RitualInstructions => {
  return {
    preparation_steps: [
      "Cleanse your bathroom thoroughly and remove any clutter to create sacred space",
      "Gather all your sacred ingredients mindfully, blessing each item as you handle it",
      "Set your clear intention for healing and transformation", 
      "Light your white candles with prayer, asking for divine protection and guidance",
      "Create a peaceful atmosphere with soft music or silence for meditation"
    ],
    ritual_steps: [
      "Fill your bathtub with warm (not hot) water while focusing on your healing intention",
      "Add ingredients in sacred order: salt first for purification, then herbs, then oils",
      "Stir the water clockwise with your hand while praying or setting your intention",
      "Enter the bath slowly and reverently, acknowledging this as sacred healing space",
      "Immerse yourself completely three times, each time releasing what no longer serves you",
      "Remain in the sacred waters for 15-20 minutes in prayer, meditation, or quiet reflection",
      "Express heartfelt gratitude to the divine for this healing opportunity",
      "Let the water drain while you remain in the tub, visualizing all negativity flowing away",
      "Rinse with fresh water if desired, then step out feeling renewed and protected"
    ],
    closing_ritual: [
      "Thank the divine forces that assisted in your healing",
      "Blow out candles with gratitude (never just blow them out carelessly)",
      "Dispose of used bath ingredients respectfully in nature if possible",
      "Drink plenty of water to support the spiritual cleansing process",
      "Rest and allow your spirit to integrate the healing energies"
    ]
  };
};

// Enhanced main service function
export const seraphinaBathingService = {
  generateSacredBathingGuidance: (userProblem: string): SacredBathingGuidance => {
    const problemType = analyzeSpiritualProblem(userProblem);
    const ritual = RITUAL_TEMPLATES[problemType] || RITUAL_TEMPLATES.negative_energy_cleansing;
    
    return {
      seraphina_message: generateCompassionateResponse(userProblem, ritual),
      ritual_details: ritual,
      ingredient_guide: generateIngredientGuide(ritual),
      step_by_step_instructions: generateRitualInstructions(ritual)
    };
  },

  // New method for emergency spiritual protection
  getEmergencyProtection: () => ({
    immediate_protection: [
      "Say immediately: 'I call upon divine light to protect me now'",
      "Visualize brilliant white light surrounding you completely", 
      "Hold salt in your hand or sprinkle around you if available",
      "Call upon your spiritual guides and angels for protection"
    ],
    emergency_cleansing: [
      "Take a quick shower with salt and intention to cleanse",
      "Light a white candle if available and safe to do so",
      "Pray continuously for divine protection and intervention",
      "Stay in a safe, blessed space until you feel protected"
    ],
    follow_up: [
      "Complete a full sacred bathing ritual as soon as possible",
      "Strengthen your daily spiritual protection practices", 
      "Consider seeking guidance from a trusted spiritual advisor",
      "Continue prayer and positive affirmations throughout the day"
    ]
  }),

  // New method to get all available rituals
  getAllRituals: () => RITUAL_TEMPLATES,

  // New method to get shopping guide
  getShoppingGuide: (ritual: RitualDetails) => ({
    shopping_tips: [
      "Start with basic ingredients from grocery stores (salt, candles, honey)",
      "Visit local botanicas for authentic spiritual supplies (Florida Water, protection oils)",
      "Check online retailers like Amazon or Etsy for hard-to-find spiritual items",
      "Ask spiritual shop owners for recommendations and suitable substitutions",
      "You can substitute similar items if specific ones aren't available in your area",
      "Buy ingredients with positive intention and bless them before use"
    ],
    where_to_shop: {
      grocery_stores: ["Salt", "Honey", "Cinnamon", "Basil", "Basic candles"],
      botanicas: ["Florida Water", "Protection oils", "Spiritual candles", "Blessed items"],
      health_stores: ["Essential oils", "Sea salt", "Dried herbs", "Natural products"],
      spiritual_shops: ["Crystals", "Incense", "Ritual candles", "Blessed oils"],
      online: ["Specialty items", "Bulk herbs", "Spiritual supplies", "Hard-to-find ingredients"]
    },
    budget_alternatives: [
      "Use regular table salt if sea salt is unavailable",
      "White birthday candles work if ritual candles aren't available", 
      "Dried herbs from the spice section can substitute fresh herbs",
      "Make your own protection oil by blessing olive oil with intention",
      "Use spring water blessed with prayer if holy water isn't available"
    ]
  })
};
