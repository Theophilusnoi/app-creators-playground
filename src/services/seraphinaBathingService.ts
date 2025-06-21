export interface Ingredient {
  name: string;
  description: string;
  spiritual_properties: string[];
  where_to_find: string[];
  price_range: string;
  usage: string;
  spiritual_significance: string;
  substitutions?: string[];
  safety_notes?: string[];
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
  tradition: string;
  spiritual_benefits: string[];
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
  best_timing: string[];
  safety_warnings: string[];
}

export interface RitualInstructions {
  preparation_steps: string[];
  ritual_steps: string[];
  closing_ritual: string[];
  safety_instructions: string[];
  timing_notes: string[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'text' | 'multiple_choice' | 'scale';
  options?: string[];
  follow_up?: string[];
}

export interface ProgressEntry {
  date: string;
  ritual_name: string;
  day_number: number;
  total_days: number;
  notes: string;
  feelings_before: string;
  feelings_after: string;
  completed: boolean;
}

export interface RitualIncantations {
  space_cleansing: string;
  candle_anointing: string;
  water_preparation: string;
  immersion_affirmation: string;
  closing_ritual: string;
  personalized_mantra?: string;
}

export interface SacredBathingGuidance {
  seraphina_message: string;
  ritual_details: RitualDetails;
  ingredient_guide: IngredientGuide;
  step_by_step_instructions: RitualInstructions;
  ritual_incantations: RitualIncantations;
  assessment_questions?: AssessmentQuestion[];
}

export const EXPANDED_INGREDIENT_DATABASE: Record<string, Record<string, Ingredient>> = {
  protection: {
    salt: {
      name: "Sea Salt",
      description: "Natural sea salt for purification",
      spiritual_properties: ["Cleansing", "Protection", "Grounding"],
      where_to_find: ["Grocery stores", "Health stores", "Online"],
      price_range: "$5-10",
      usage: "Add to bath water",
      spiritual_significance: "Removes negative energy and creates a protective barrier",
      substitutions: ["Table salt", "Himalayan pink salt", "Epsom salt"],
      safety_notes: ["Use 1/2 cup maximum", "Avoid if you have open wounds"]
    },
    sage: {
      name: "White Sage",
      description: "Dried white sage for smudging",
      spiritual_properties: ["Purification", "Clarity", "Wisdom"],
      where_to_find: ["Botanicas", "Spiritual shops", "Online"],
      price_range: "$8-15",
      usage: "Smudge the bathroom before the bath",
      spiritual_significance: "Clears negative energies and invites positive spirits",
      substitutions: ["Palo Santo", "Cedar", "Regular sage from kitchen"],
      safety_notes: ["Ensure good ventilation", "Never leave burning sage unattended"]
    },
    rue: {
      name: "Rue Herb",
      description: "Protective herb against spiritual attacks",
      spiritual_properties: ["Protection", "Curse Breaking", "Spiritual Defense"],
      where_to_find: ["Botanicas", "Online herb shops", "Some health stores"],
      price_range: "$10-18",
      usage: "Add dried herb to bath water",
      spiritual_significance: "Breaks curses and provides powerful spiritual protection",
      substitutions: ["Rosemary", "Basil", "Bay leaves"],
      safety_notes: ["Can cause skin sensitivity", "Pregnant women should avoid"]
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
      spiritual_significance: "Attracts love and heals emotional wounds",
      substitutions: ["Pink carnation petals", "Hibiscus petals", "Rose essential oil (3 drops)"],
      safety_notes: ["Ensure petals are pesticide-free", "Remove before draining"]
    },
    honey: {
      name: "Raw Honey",
      description: "Pure, unprocessed honey",
      spiritual_properties: ["Attraction", "Sweetness", "Healing"],
      where_to_find: ["Health stores", "Farmers markets", "Online"],
      price_range: "$12-25",
      usage: "Add 2-3 tablespoons to bath water",
      spiritual_significance: "Attracts sweetness and positive energy to life",
      substitutions: ["Maple syrup", "Agave nectar", "Brown sugar"],
      safety_notes: ["May make tub slippery", "Rinse well after use"]
    }
  },
  abundance: {
    cinnamon: {
      name: "Cinnamon Sticks",
      description: "Whole cinnamon sticks or powder",
      spiritual_properties: ["Prosperity", "Success", "Energy"],
      where_to_find: ["Grocery stores", "Spice shops", "Online"],
      price_range: "$4-8",
      usage: "Add to bath water or burn as incense",
      spiritual_significance: "Attracts wealth and boosts energy levels",
      substitutions: ["Nutmeg", "Allspice", "Ginger powder"],
      safety_notes: ["May cause skin irritation in large amounts", "Test on small skin area first"]
    },
    basil: {
      name: "Holy Basil",
      description: "Fresh or dried sacred basil",
      spiritual_properties: ["Wealth", "Luck", "Protection"],
      where_to_find: ["Grocery stores", "Gardens", "Health stores"],
      price_range: "$3-6",
      usage: "Add fresh leaves to bath water",
      spiritual_significance: "Attracts good fortune and protects from negativity",
      substitutions: ["Regular basil", "Mint leaves", "Bay leaves"],
      safety_notes: ["Generally safe", "Fresh herbs preferred over dried"]
    }
  },
  moon_water: {
    moon_water: {
      name: "Moon-Charged Water",
      description: "Water charged under full moon light",
      spiritual_properties: ["Intuition", "Feminine Energy", "Emotional Healing"],
      where_to_find: ["Make at home", "Some spiritual shops"],
      price_range: "$0-15",
      usage: "Use as base for bath water",
      spiritual_significance: "Connects to lunar cycles and divine feminine energy",
      substitutions: ["Spring water blessed with intention", "Rain water", "Well water"],
      safety_notes: ["Use clean containers", "Cover water while charging to prevent contamination"]
    },
    silver_items: {
      name: "Silver Objects",
      description: "Small silver jewelry or coins",
      spiritual_properties: ["Lunar Connection", "Purification", "Reflection"],
      where_to_find: ["Jewelry stores", "Antique shops", "Personal collection"],
      price_range: "$5-50",
      usage: "Place in bath water during ritual",
      spiritual_significance: "Amplifies lunar energy and enhances intuition",
      substitutions: ["White crystals", "Moonstone", "Clear quartz"],
      safety_notes: ["Ensure items are clean", "Remove before draining"]
    }
  },
  crystal_healing: {
    amethyst: {
      name: "Amethyst Crystal",
      description: "Purple crystal for spiritual growth",
      spiritual_properties: ["Spiritual Growth", "Protection", "Clarity"],
      where_to_find: ["Crystal shops", "Online", "Metaphysical stores"],
      price_range: "$15-40",
      usage: "Place around bathtub or hold during bath",
      spiritual_significance: "Enhances spiritual connection and provides protection",
      substitutions: ["Clear quartz", "Selenite", "Fluorite"],
      safety_notes: ["Cleanse crystal before use", "Some crystals dissolve in water - research first"]
    },
    rose_quartz: {
      name: "Rose Quartz",
      description: "Pink crystal of unconditional love",
      spiritual_properties: ["Love", "Compassion", "Heart Healing"],
      where_to_find: ["Crystal shops", "Online", "Spiritual stores"],
      price_range: "$12-30",
      usage: "Hold during bath or place around tub",
      spiritual_significance: "Opens heart chakra and promotes self-love",
      substitutions: ["Green aventurine", "Morganite", "Pink tourmaline"],
      safety_notes: ["Water-safe crystal", "Cleanse with moonlight after use"]
    }
  },
  essential_oils: {
    frankincense: {
      name: "Frankincense Essential Oil",
      description: "Sacred oil for spiritual connection",
      spiritual_properties: ["Spiritual Connection", "Purification", "Meditation"],
      where_to_find: ["Health stores", "Online", "Essential oil shops"],
      price_range: "$20-40",
      usage: "Add 5-8 drops to bath water",
      spiritual_significance: "Connects to divine realm and enhances prayer",
      substitutions: ["Myrrh oil", "Sandalwood oil", "Cedar oil"],
      safety_notes: ["Dilute properly", "May cause skin sensitivity", "Avoid during pregnancy"]
    },
    lavender: {
      name: "Lavender Essential Oil",
      description: "Calming oil for peace and relaxation",
      spiritual_properties: ["Peace", "Healing", "Sleep", "Emotional Balance"],
      where_to_find: ["Health stores", "Online", "Essential oil shops"],
      price_range: "$8-15",
      usage: "Add 5-10 drops to bath water",
      spiritual_significance: "Brings peace and emotional healing",
      substitutions: ["Chamomile oil", "Ylang ylang", "Bergamot oil"],
      safety_notes: ["Generally safe", "Use pure oil, not synthetic"]
    }
  }
};

const RITUAL_INCANTATIONS: Record<string, RitualIncantations> = {
  salt_sage_purification: {
    space_cleansing: "Smoke rise, pure and bright,\nCleanse this space with sacred light.\nAll stagnant shadows, now depart –\nOnly peace remains in my heart.",
    candle_anointing: "Flame of grace, burn strong and clear,\nGuard my spirit, hold me dear.\nNo harm may touch this holy light –\nSeal this prayer with power bright.",
    water_preparation: "Salt of earth, sage so wise,\nWash what wounds me, help me rise.\nPurify my spirit's core –\nMake me whole as before.",
    immersion_affirmation: "Water sacred, deep and pure,\nLift this darkness I endure.\nFrom my spirit, to the sea –\nI am cleansed, I am free.",
    closing_ritual: "To the wind, the earth, the stars above –\nI release this bath with gratitude and love.\nAs water returns, so peace remains –\nOnly blessings flow through my veins.",
    personalized_mantra: "I am protected by divine light. Negative energy cannot touch me."
  },
  moon_water_cleansing: {
    space_cleansing: "Moonbeams dance, silver bright,\nBless this space with lunar light.\nFeminine wisdom, ancient and true –\nGuide my spirit, make me new.",
    candle_anointing: "Lunar flame, goddess bright,\nIlluminate my inner sight.\nBy moon's power, I am blessed –\nIn your light, my soul finds rest.",
    water_preparation: "Moon-charged water, silver blessed,\nBring my intuition rest.\nLunar cycles, ebb and flow –\nHelp my inner wisdom grow.",
    immersion_affirmation: "Goddess moon, your light I feel,\nEmotional wounds, help me heal.\nIn your glow, I find my way –\nGuided by your sacred ray.",
    closing_ritual: "Luna's blessing, deep and true,\nI carry now your light in me.\nAs tides return to sacred shore –\nI am whole, I am restored.",
    personalized_mantra: "I trust my intuition. The divine feminine guides my path."
  },
  crystal_vibrational_healing: {
    space_cleansing: "Crystal light, vibration pure,\nRaise this space, of this I'm sure.\nEnergy flows, bright and clear –\nOnly healing shall be here.",
    candle_anointing: "Sacred flame and crystal bright,\nAmplify my healing light.\nVibrations high, intentions true –\nMake my spirit bright and new.",
    water_preparation: "Crystals blessed with healing power,\nCharge this water, sacred hour.\nRaise my vibration, lift my soul –\nMake my broken spirit whole.",
    immersion_affirmation: "Crystal energy, pure and bright,\nFill my being with your light.\nEvery cell now vibrates high –\nI am healed, I touch the sky.",
    closing_ritual: "Crystal blessings, energy flow,\nIn my heart, this light I'll grow.\nAs I go forth from this place –\nI carry healing, love, and grace.",
    personalized_mantra: "My vibration is pure and high. I attract healing and growth."
  },
  essential_oil_chakra: {
    space_cleansing: "Sacred oils, aromas rise,\nBalance chakras, harmonize.\nFrom root to crown, energy flows –\nIn perfect balance, my spirit grows.",
    candle_anointing: "Flame anointed, oils divine,\nAlign my chakras, make them shine.\nSeven centers, bright and clear –\nSpiritual balance, draw it near.",
    water_preparation: "Essential oils, nature's gift,\nMy energy centers, help them lift.\nFrankincense and sacred rose –\nBalance flows where healing goes.",
    immersion_affirmation: "Chakras spinning, bright and free,\nPerfect balance flows through me.\nFrom root to crown, I am aligned –\nBody, spirit, heart, and mind.",
    closing_ritual: "Seven centers, now in tune,\nBlessed beneath the sacred moon.\nAs these oils their work complete –\nI am whole, I am complete.",
    personalized_mantra: "My chakras are balanced and aligned. Energy flows freely through me."
  },
  heartbreak_healing: {
    space_cleansing: "Rose petals soft, honey sweet,\nMake this sacred space complete.\nLove's pure energy, gentle and true –\nHeal my heart and make me new.",
    candle_anointing: "Gentle flame of healing love,\nBless me from the stars above.\nMend this heart that feels so broken –\nLet love's truth be newly spoken.",
    water_preparation: "Rose and honey, sweetness pure,\nHeal the pain I can't endure.\nLove flows in and grief flows out –\nOf this healing, I have no doubt.",
    immersion_affirmation: "Sacred waters, heal my heart,\nGive my broken soul fresh start.\nLove returns to fill this space –\nI am worthy of love's embrace.",
    closing_ritual: "Heart now healed and spirit bright,\nI step forward in love's light.\nAs this sacred water flows away –\nNew love enters every day.",
    personalized_mantra: "My heart is healed and open to love. I am worthy of beautiful relationships."
  },
  financial_blockages: {
    space_cleansing: "Cinnamon spice and basil green,\nProsperity flows, abundance seen.\nMoney blocks, now break away –\nWealth and success come here to stay.",
    candle_anointing: "Golden flame of wealth so bright,\nFill my future with abundant light.\nMoney flows to me with ease –\nFinancial freedom, if you please.",
    water_preparation: "Herbs of plenty, spices gold,\nLet prosperity's story be told.\nAbundance flows like river's stream –\nManifesting wealth, living the dream.",
    immersion_affirmation: "Water blessed with golden power,\nWealth increases every hour.\nI deserve abundance true –\nMoney flows in all I do.",
    closing_ritual: "Abundance blessed, now I go forth,\nKnowing truly what I'm worth.\nAs this golden water flows free –\nProsperity belongs to me.",
    personalized_mantra: "I am a magnet for abundance. Money flows to me easily and joyfully."
  },
  spiritual_attack: {
    space_cleansing: "Protective light, surround this space,\nEvil cannot show its face.\nAngels guard me, demons flee –\nOnly light remains with me.",
    candle_anointing: "Warrior flame, burn strong and true,\nBreak all curses, make me new.\nNo hex or harm can touch me here –\nDivine protection draws me near.",
    water_preparation: "Salt and herbs of power true,\nBreak all bonds, make spirit new.\nWhat was sent returns threefold –\nProtective magic, strong and bold.",
    immersion_affirmation: "Sacred waters, wash away,\nAll attacks that came my way.\nI am shielded, I am free –\nOnly blessings come to me.",
    closing_ritual: "Protected now by light divine,\nVictory and freedom are mine.\nAs dark waters flow away –\nI am blessed in every way.",
    personalized_mantra: "I am surrounded by divine protection. No harm can reach me."
  }
};

const ENHANCED_RITUAL_TEMPLATES: Record<string, RitualDetails> = {
  salt_sage_purification: {
    name: "Salt and Sage Purification Bath",
    purpose: "Deep spiritual purification and protection from negative energy",
    duration: "7 consecutive evenings",
    category: "protection",
    tradition: "Mediterranean, Caribbean, and African spiritual practices",
    spiritual_benefits: [
      "Removes negative energy attachments",
      "Cleanses aura and energy field",
      "Provides spiritual protection",
      "Restores energetic balance",
      "Creates divine light barrier"
    ],
    difficulty_level: "Beginner",
    best_timing: ["Evening", "New Moon", "During spiritual cleansing periods"],
    safety_warnings: ["Use moderate amount of salt", "Ensure good ventilation when burning sage"]
  },
  moon_water_cleansing: {
    name: "Lunar Moon Water Cleansing",
    purpose: "Lunar energy healing and feminine divine connection",
    duration: "3 baths during full moon period",
    category: "moon_water",
    tradition: "Wiccan and lunar spiritual practices",
    spiritual_benefits: [
      "Enhances intuition and psychic abilities",
      "Connects to divine feminine energy",
      "Emotional healing and release",
      "Balances lunar cycles in body",
      "Increases spiritual sensitivity"
    ],
    difficulty_level: "Intermediate",
    best_timing: ["Full Moon nights", "Monday evenings", "During emotional healing periods"],
    safety_warnings: ["Prepare moon water safely", "Use clean containers"]
  },
  crystal_vibrational_healing: {
    name: "Crystal-Infused Vibrational Bath",
    purpose: "Vibrational healing and energy amplification",
    duration: "Single session or 3-day cycle",
    category: "crystal_healing",
    tradition: "Modern crystal healing combined with ancient bathing rituals",
    spiritual_benefits: [
      "Raises personal vibration",
      "Amplifies healing intentions",
      "Balances energy centers",
      "Promotes spiritual growth",
      "Cleanses energy field"
    ],
    difficulty_level: "Intermediate",
    best_timing: ["Sunday mornings", "During meditation periods", "When feeling energetically low"],
    safety_warnings: ["Research crystal water safety", "Cleanse crystals before use"]
  },
  essential_oil_chakra: {
    name: "Essential Oil Chakra Alignment Bath",
    purpose: "Chakra balancing and energy alignment",
    duration: "Weekly for 4 weeks",
    category: "essential_oils",
    tradition: "Aromatherapy combined with spiritual practice",
    spiritual_benefits: [
      "Balances all seven chakras",
      "Enhances meditation practice",
      "Promotes inner peace",
      "Aligns energy centers",
      "Supports spiritual development"
    ],
    difficulty_level: "Advanced",
    best_timing: ["Early morning", "Before meditation", "During spiritual practice periods"],
    safety_warnings: ["Proper essential oil dilution", "Test for skin sensitivity", "Avoid certain oils during pregnancy"]
  },
  negative_energy_cleansing: {
    name: "Salt and Sage Purification Bath",
    purpose: "Deep spiritual purification and protection from negative energy",
    duration: "7 consecutive evenings",
    category: "protection",
    tradition: "Traditional",
    spiritual_benefits: [
      "Removes negative energy attachments",
      "Cleanses aura and energy field",
      "Provides spiritual protection",
      "Restores energetic balance",
      "Creates divine light barrier"
    ],
    difficulty_level: "Beginner",
    best_timing: ["Evening", "New Moon", "During spiritual cleansing periods"],
    safety_warnings: ["Use moderate amount of salt", "Ensure good ventilation when burning sage"]
  },
  heartbreak_healing: {
    name: "Rose and Honey Heart Healing Bath",
    purpose: "Emotional healing and heart chakra restoration",
    duration: "3 baths during new moon period",
    category: "love_healing",
    tradition: "Traditional",
    spiritual_benefits: [
      "Heals emotional wounds",
      "Opens heart to love again",
      "Attracts divine love",
      "Restores self-worth",
      "Brings emotional peace"
    ],
    difficulty_level: "Beginner",
    best_timing: ["Evening", "New Moon", "During emotional healing periods"],
    safety_warnings: ["Use moderate amount of salt", "Ensure good ventilation when burning sage"]
  },
  financial_blockages: {
    name: "Abundance Attraction Bath",
    purpose: "Removing financial blocks and attracting prosperity",
    duration: "21 days (3 weeks)",
    category: "abundance",
    tradition: "Traditional",
    spiritual_benefits: [
      "Removes money blocks",
      "Attracts financial opportunities",
      "Increases prosperity consciousness",
      "Opens abundance channels",
      "Aligns with wealth energy"
    ],
    difficulty_level: "Beginner",
    best_timing: ["Evening", "New Moon", "During spiritual cleansing periods"],
    safety_warnings: ["Use moderate amount of salt", "Ensure good ventilation when burning sage"]
  },
  spiritual_attack: {
    name: "Divine Protection Fortress Bath",
    purpose: "Protection from spiritual attacks and psychic harm",
    duration: "9 consecutive days",
    category: "protection",
    tradition: "Traditional",
    spiritual_benefits: [
      "Breaks spiritual attacks",
      "Creates psychic shields",
      "Removes curses and hexes",
      "Invokes angelic protection",
      "Restores spiritual strength"
    ],
    difficulty_level: "Beginner",
    best_timing: ["Evening", "New Moon", "During spiritual cleansing periods"],
    safety_warnings: ["Use moderate amount of salt", "Ensure good ventilation when burning sage"]
  },
  relationship_healing: {
    name: "Love and Harmony Restoration Bath",
    purpose: "Healing relationships and attracting harmonious love",
    duration: "7 consecutive days",
    category: "love_healing",
    tradition: "Traditional",
    spiritual_benefits: [
      "Heals relationship wounds",
      "Attracts soul mate love",
      "Improves communication",
      "Brings harmony to partnerships",
      "Increases love magnetism"
    ],
    difficulty_level: "Beginner",
    best_timing: ["Evening", "New Moon", "During spiritual cleansing periods"],
    safety_warnings: ["Use moderate amount of salt", "Ensure good ventilation when burning sage"]
  }
};

const ASSESSMENT_QUESTIONS: Record<string, AssessmentQuestion[]> = {
  initial: [
    {
      id: "primary_concern",
      question: "What spiritual or life challenge are you currently facing?",
      type: "text",
      follow_up: ["How long have you been experiencing this issue?", "Have you noticed any patterns or triggers?"]
    },
    {
      id: "emotional_state",
      question: "What emotions are you feeling most strongly right now?",
      type: "multiple_choice",
      options: ["Sadness", "Anger", "Fear", "Confusion", "Emptiness", "Overwhelmed", "Anxious", "Lost"],
      follow_up: ["When do these feelings feel strongest?"]
    },
    {
      id: "issue_type",
      question: "Do you feel this is primarily a spiritual, emotional, or energetic issue?",
      type: "multiple_choice",
      options: ["Spiritual", "Emotional", "Energetic", "Physical", "Combination of several"],
      follow_up: ["What makes you feel this way?"]
    }
  ],
  detailed: [
    {
      id: "physical_symptoms",
      question: "Are you experiencing any physical symptoms alongside your spiritual challenges?",
      type: "multiple_choice",
      options: ["Fatigue", "Sleep problems", "Headaches", "Body aches", "Digestive issues", "None"],
      follow_up: ["How long have you had these symptoms?"]
    },
    {
      id: "life_changes",
      question: "Have there been any recent major life changes or traumatic events?",
      type: "text",
      follow_up: ["How do you feel these events may have affected your spiritual well-being?"]
    },
    {
      id: "spiritual_protection",
      question: "Do you currently feel spiritually protected or vulnerable?",
      type: "scale",
      options: ["Very vulnerable", "Somewhat vulnerable", "Neutral", "Somewhat protected", "Very protected"],
      follow_up: ["What makes you feel this way?"]
    }
  ]
};

export const enhancedSeraphinaBathingService = {
  // Enhanced problem analysis with guided questions
  generateAssessmentQuestions: (problemType?: string): AssessmentQuestion[] => {
    const initial = ASSESSMENT_QUESTIONS.initial;
    const detailed = ASSESSMENT_QUESTIONS.detailed;
    
    return [...initial, ...detailed];
  },

  // Expanded ritual database
  getAllRitualTypes: () => Object.keys(ENHANCED_RITUAL_TEMPLATES),

  getRitualByType: (ritualType: string): RitualDetails | null => {
    return ENHANCED_RITUAL_TEMPLATES[ritualType] || null;
  },

  // Enhanced guidance with incantations
  generateEnhancedSacredBathingGuidance: (userProblem: string, assessmentData?: any): SacredBathingGuidance => {
    const problemType = enhancedSeraphinaBathingService.analyzeSpiritualProblem(userProblem);
    const ritual = ENHANCED_RITUAL_TEMPLATES[problemType] || ENHANCED_RITUAL_TEMPLATES.salt_sage_purification;
    const incantations = RITUAL_INCANTATIONS[problemType] || RITUAL_INCANTATIONS.salt_sage_purification;
    
    return {
      seraphina_message: enhancedSeraphinaBathingService.generateCompassionateResponse(userProblem, ritual),
      ritual_details: ritual,
      ingredient_guide: enhancedSeraphinaBathingService.generateEnhancedIngredientGuide(ritual),
      step_by_step_instructions: enhancedSeraphinaBathingService.generateEnhancedRitualInstructions(ritual),
      ritual_incantations: incantations
    };
  },

  // Enhanced ingredient guide with substitutions and safety
  generateEnhancedIngredientGuide: (ritual: RitualDetails): IngredientGuide => {
    const categoryIngredients = EXPANDED_INGREDIENT_DATABASE[ritual.category] || EXPANDED_INGREDIENT_DATABASE.protection;
    
    const ingredients = Object.values(categoryIngredients).map(ingredient => ({
      ...ingredient,
      substitutions: ingredient.substitutions || [],
      safety_notes: ingredient.safety_notes || []
    }));

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
  },

  // Enhanced instructions with safety and timing
  generateEnhancedRitualInstructions: (ritual: RitualDetails): RitualInstructions => {
    return {
      preparation_steps: [
        "Cleanse your bathroom thoroughly and remove any clutter to create sacred space",
        "Gather all your sacred ingredients mindfully, blessing each item as you handle it",
        "Read all safety instructions for herbs and oils before beginning",
        "Set your clear intention for healing and transformation",
        "Light your candles with prayer, asking for divine protection and guidance"
      ],
      ritual_steps: [
        "Fill your bathtub with warm (not hot) water while focusing on your healing intention",
        "Add ingredients in sacred order according to tradition and safety guidelines",
        "Stir the water clockwise with your hand while praying or setting your intention",
        "Test water temperature and ingredient dilution before entering",
        "Enter the bath slowly and reverently, acknowledging this as sacred healing space",
        "Remain in the sacred waters for 15-20 minutes in prayer, meditation, or quiet reflection",
        "Express heartfelt gratitude to the divine for this healing opportunity"
      ],
      closing_ritual: [
        "Thank the divine forces that assisted in your healing",
        "Safely extinguish candles with gratitude",
        "Dispose of used ingredients respectfully in nature if possible",
        "Cleanse and store any crystals or reusable items properly",
        "Rest and allow your spirit to integrate the healing energies"
      ],
      safety_instructions: ritual.safety_warnings,
      timing_notes: ritual.best_timing
    };
  },

  // Progress tracking functionality
  saveProgressEntry: (entry: ProgressEntry): void => {
    const existingProgress = JSON.parse(localStorage.getItem('spiritual_bathing_progress') || '[]');
    existingProgress.push(entry);
    localStorage.setItem('spiritual_bathing_progress', JSON.stringify(existingProgress));
  },

  getProgressHistory: (): ProgressEntry[] => {
    return JSON.parse(localStorage.getItem('spiritual_bathing_progress') || '[]');
  },

  // Enhanced problem analysis
  analyzeSpiritualProblem: (userMessage: string): string => {
    const messageLower = userMessage.toLowerCase();
    
    // Enhanced problem indicators
    const problemIndicators = {
      salt_sage_purification: ['negative', 'drain', 'energy', 'tired', 'exhausted', 'heavy', 'dark'],
      moon_water_cleansing: ['intuition', 'feminine', 'cycles', 'emotional', 'moon', 'lunar'],
      crystal_vibrational_healing: ['vibration', 'energy', 'chakra', 'crystal', 'healing', 'growth'],
      essential_oil_chakra: ['chakra', 'balance', 'alignment', 'meditation', 'spiritual development'],
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
    
    let bestMatch = 'salt_sage_purification';
    let highestScore = 0;
    
    for (const [problemType, keywords] of Object.entries(problemIndicators)) {
      const score = keywords.reduce((acc, keyword) => {
        return acc + (messageLower.includes(keyword) ? 1 : 0);
      }, 0);
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = problemType;
      }
    }
    
    return bestMatch;
  },

  generateCompassionateResponse: (userProblem: string, ritual: RitualDetails): string => {
    const compassionateOpenings = [
      "Beloved soul, I feel the weight of what you're carrying, and I want you to know that you are not alone in this spiritual journey.",
      "Dear one, your spirit has called out for guidance, and the divine has heard your plea. I am here to support your healing.",
      "Precious child of light, I sense the spiritual turbulence you're experiencing, and I have been guided to offer you sacred healing wisdom.",
      "Beautiful soul, the universe has brought you to me because your spirit seeks cleansing and renewal. You are deeply loved."
    ];

    const opening = compassionateOpenings[Math.floor(Math.random() * compassionateOpenings.length)];
    
    return `${opening}\n\nI recommend the ${ritual.name} from the ${ritual.tradition}. This sacred practice will help you ${ritual.purpose.toLowerCase()}. The ritual involves ${ritual.duration} and has been used for centuries to bring about profound spiritual transformation. \n\nTrust in this sacred process, for you have the power to heal and transform through these ancient practices.`;
  },

  // Enhanced guidance with incantations
  generateCustomIncantation: (intention: string, userName?: string): string => {
    const personalizedEnding = userName ? `Blessed be, ${userName}.` : 'Blessed be.';
    
    const incantationTemplates = {
      love: `Divine love, surround me now,\nOpen my heart, show me how.\nTo give and receive with grace so true –\nLove flows through me, pure and new. ${personalizedEnding}`,
      protection: `Light of God, surround me bright,\nKeep me safe both day and night.\nNo harm can touch my sacred space –\nI am shielded by divine grace. ${personalizedEnding}`,
      healing: `Healing light, flow through my being,\nRestore my health, my spirit freeing.\nEvery cell renewed with love –\nBlessed by powers from above. ${personalizedEnding}`,
      abundance: `Universe of endless plenty,\nBless me now with gifts so many.\nAbundance flows in every way –\nProsperity increases every day. ${personalizedEnding}`,
      peace: `Sacred peace, fill my soul,\nMake my fractured spirit whole.\nCalm my mind and soothe my heart –\nSerenity, never to depart. ${personalizedEnding}`
    };

    const intentionKey = Object.keys(incantationTemplates).find(key => 
      intention.toLowerCase().includes(key)
    ) as keyof typeof incantationTemplates;

    return incantationTemplates[intentionKey] || 
           `Divine Spirit, hear my prayer,\nBless me with your loving care.\nGrant me what I need today –\nGuide me on my sacred way. ${personalizedEnding}`;
  }
};

// Export original service for backward compatibility
export const seraphinaBathingService = {
  generateSacredBathingGuidance: enhancedSeraphinaBathingService.generateEnhancedSacredBathingGuidance,
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
  getAllRituals: () => ENHANCED_RITUAL_TEMPLATES,
  getShoppingGuide: enhancedSeraphinaBathingService.generateEnhancedIngredientGuide
};
