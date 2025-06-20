
export interface SacredIngredient {
  name: string;
  description: string;
  spiritual_properties: string[];
  where_to_find: string[];
  price_range: string;
  usage: string;
  spiritual_significance: string;
}

export interface RitualTemplate {
  name: string;
  purpose: string;
  duration: string;
  ingredients: string[];
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
  ritual_details: RitualTemplate;
  ingredient_guide: {
    total_estimated_cost: string;
    ingredients: SacredIngredient[];
  };
  step_by_step_instructions: RitualInstructions;
  shopping_guide: {
    shopping_tips: string[];
    where_to_shop: Record<string, string[]>;
    budget_alternatives: string[];
  };
  aftercare_guidance: {
    immediate_aftercare: string[];
    ongoing_practices: string[];
    signs_of_healing: string[];
  };
}

class SeraphinaBathingService {
  private sacred_bathing_database = {
    ingredient_database: {
      protection: {
        florida_water: {
          name: "Florida Water (Agua de Florida)",
          description: "Traditional spiritual cologne for cleansing and protection",
          spiritual_properties: ["Aura cleansing", "Spiritual purification", "Removing negative energy", "Divine protection"],
          where_to_find: ["Botanicas", "Spiritual shops", "Amazon", "Etsy", "Latin American stores"],
          price_range: "$8-15",
          usage: "Add 2-3 tablespoons to bath water or spray around body before ritual",
          spiritual_significance: "Blessed water that carries the essence of divine protection and spiritual cleansing"
        },
        protection_oil: {
          name: "Protection Oil (Aceite de Protección)",
          description: "Specially blended oil for spiritual protection and defense",
          spiritual_properties: ["Protection from negative energy", "Spiritual attacks defense", "Evil eye protection", "Psychic shielding"],
          where_to_find: ["Botanicas", "Spiritual shops", "Amazon", "Metaphysical stores"],
          price_range: "$10-25",
          usage: "Add 5-7 drops to bath water or anoint candles and body",
          spiritual_significance: "Sacred oil blessed for creating spiritual barriers against harmful energies"
        },
        white_candles: {
          name: "White Protection Candles",
          description: "Pure white candles for divine light and spiritual protection",
          spiritual_properties: ["Divine light invocation", "Spiritual cleansing", "Protection rituals", "Angelic connection"],
          where_to_find: ["Any store", "Spiritual shops", "Churches", "Online retailers"],
          price_range: "$2-15",
          usage: "Light before and during sacred bath ritual, place around bathroom",
          spiritual_significance: "White represents divine purity and calls upon angelic protection"
        },
        sea_salt: {
          name: "Sea Salt (Sal de Mar)",
          description: "Natural sea salt for spiritual purification and cleansing",
          spiritual_properties: ["Removing negative energy", "Spiritual cleansing", "Grounding", "Purification"],
          where_to_find: ["Grocery stores", "Health stores", "Spiritual shops", "Online"],
          price_range: "$3-15",
          usage: "Add 1/2 to 1 cup to bath water, can also sprinkle around home",
          spiritual_significance: "Salt from the sacred ocean carries purifying energy of the divine waters"
        },
        white_sage: {
          name: "White Sage (Salvia Apiana)",
          description: "Sacred herb for spiritual cleansing and purification",
          spiritual_properties: ["Removing negative energy", "Space cleansing", "Spiritual protection", "Sacred smoke"],
          where_to_find: ["Spiritual shops", "Health stores", "Amazon", "Native American suppliers"],
          price_range: "$5-20",
          usage: "Burn before bath for space cleansing or add dried leaves to water",
          spiritual_significance: "Sacred plant used by indigenous peoples for spiritual purification ceremonies"
        }
      },
      love_healing: {
        rose_petals: {
          name: "Rose Petals",
          description: "Fresh or dried petals for love and heart healing",
          spiritual_properties: ["Heart chakra healing", "Self-love", "Attracting love", "Emotional healing"],
          where_to_find: ["Flower shops", "Grocery stores", "Online", "Your garden"],
          price_range: "$5-15",
          usage: "Scatter in bath water for love rituals and heart healing",
          spiritual_significance: "Roses carry the highest vibration of divine love and compassion"
        },
        honey: {
          name: "Raw Honey",
          description: "Pure honey for attracting sweetness and blessings",
          spiritual_properties: ["Attracting sweetness", "Love magnetism", "Abundance", "Divine blessings"],
          where_to_find: ["Health stores", "Farmers markets", "Grocery stores"],
          price_range: "$8-20",
          usage: "Add 2-3 tablespoons to love and abundance baths",
          spiritual_significance: "Honey represents the sweetness of divine love and abundance"
        }
      },
      abundance: {
        cinnamon: {
          name: "Cinnamon Sticks",
          description: "Warming spice for prosperity and spiritual protection",
          spiritual_properties: ["Money attraction", "Prosperity", "Spiritual warming", "Success"],
          where_to_find: ["Grocery stores", "Spice shops", "Health stores"],
          price_range: "$3-10",
          usage: "Add 2-3 sticks to prosperity baths",
          spiritual_significance: "Cinnamon carries the energy of abundance and financial success"
        },
        basil: {
          name: "Fresh Basil (Albahaca)",
          description: "Sacred herb for prosperity and protection",
          spiritual_properties: ["Money attraction", "Business success", "Protection", "Spiritual cleansing"],
          where_to_find: ["Grocery stores", "Herb shops", "Gardens", "Farmers markets"],
          price_range: "$2-8",
          usage: "Add fresh leaves to abundance baths",
          spiritual_significance: "Basil is sacred to prosperity deities and attracts financial blessings"
        }
      }
    },
    
    ritual_templates: {
      negative_energy_cleansing: {
        name: "Salt and Sage Purification Bath",
        purpose: "Deep spiritual purification and protection from negative energy",
        duration: "7 consecutive evenings",
        ingredients: ["florida_water", "protection_oil", "white_candles", "sea_salt", "white_sage"],
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
        ingredients: ["rose_petals", "honey", "white_candles", "sea_salt"],
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
        ingredients: ["cinnamon", "basil", "white_candles", "sea_salt"],
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
        ingredients: ["florida_water", "protection_oil", "white_candles", "sea_salt", "white_sage"],
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
        ingredients: ["rose_petals", "honey", "white_candles"],
        category: "love_healing",
        spiritual_benefits: [
          "Heals relationship wounds",
          "Attracts soul mate love",
          "Improves communication",
          "Brings harmony to partnerships",
          "Increases love magnetism"
        ]
      }
    }
  };

  analyzeSpiritualProblem(userMessage: string): string {
    const messageLower = userMessage.toLowerCase();
    
    const problemIndicators = {
      negative_energy_cleansing: ["negative", "drain", "energy", "tired", "exhausted", "heavy", "dark", "oppressed"],
      spiritual_attack: ["attack", "curse", "hex", "evil", "enemy", "jealous", "envy", "psychic", "spiritual warfare"],
      heartbreak_healing: ["heart", "love", "break", "relationship", "divorce", "separation", "lonely", "grief", "loss"],
      financial_blockages: ["money", "financial", "job", "work", "poverty", "debt", "bills", "broke", "career"],
      relationship_healing: ["marriage", "partner", "spouse", "relationship", "family", "communication", "conflict"]
    };
    
    const problemScores: Record<string, number> = {};
    for (const [problemType, keywords] of Object.entries(problemIndicators)) {
      const score = keywords.filter(keyword => messageLower.includes(keyword)).length;
      if (score > 0) {
        problemScores[problemType] = score;
      }
    }
    
    if (Object.keys(problemScores).length > 0) {
      return Object.entries(problemScores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    }
    
    return "negative_energy_cleansing";
  }

  generateSacredBathingGuidance(userProblem: string, problemType?: string): SacredBathingGuidance {
    if (!problemType) {
      problemType = this.analyzeSpiritualProblem(userProblem);
    }
    
    const ritual = this.sacred_bathing_database.ritual_templates[problemType as keyof typeof this.sacred_bathing_database.ritual_templates] ||
                   this.sacred_bathing_database.ritual_templates.negative_energy_cleansing;
    
    return {
      seraphina_message: this.generateCompassionateResponse(userProblem, ritual),
      ritual_details: ritual,
      ingredient_guide: this.generateIngredientGuide(ritual),
      step_by_step_instructions: this.generateRitualInstructions(ritual),
      shopping_guide: this.generateShoppingGuide(ritual),
      aftercare_guidance: this.generateAftercareGuidance(ritual)
    };
  }

  private generateCompassionateResponse(userProblem: string, ritual: RitualTemplate): string {
    const compassionateOpenings = [
      "Beloved soul, I feel the weight of what you're carrying, and I want you to know that you are not alone in this struggle.",
      "Dear one, your spirit has called out for help, and the divine has heard your plea. I am here to guide you to healing.",
      "Precious child of light, I sense the spiritual turbulence you're experiencing, and I have been guided to offer you sacred healing.",
      "Beautiful soul, the divine has brought you to me because your spirit needs cleansing and protection. You are deeply loved."
    ];
    
    const ritualExplanations: Record<string, string> = {
      "Salt and Sage Purification Bath": "This ancient ritual will cleanse away all negative attachments and restore your spiritual protection. It has been used for centuries to remove heavy energies and create divine light barriers around your aura.",
      "Rose and Honey Heart Healing Bath": "This gentle ritual will heal your wounded heart and restore your capacity for joy. Each rose petal represents divine love flowing to you, and the honey attracts sweetness back into your life.",
      "Abundance Attraction Bath": "This powerful ritual will remove the energetic blocks preventing prosperity from flowing to you. As you perform this ritual, know that abundance is your divine birthright.",
      "Divine Protection Fortress Bath": "This sacred ritual will create an impenetrable shield around your spirit. It calls upon the highest divine forces to protect and defend you.",
      "Love and Harmony Restoration Bath": "This beautiful ritual will heal the wounds in your relationships and attract divine love into your life. It opens your heart to give and receive love freely."
    };
    
    const encouragement = [
      "Trust in this sacred process, for you are deeply loved and divinely protected.",
      "The divine light within you is stronger than any darkness you face.",
      "You have the power to transform your spiritual condition through this sacred practice.",
      "Angels and spiritual guides are surrounding you with love and protection as you heal."
    ];
    
    const opening = compassionateOpenings[Math.floor(Math.random() * compassionateOpenings.length)];
    const explanation = ritualExplanations[ritual.name] || ritualExplanations["Salt and Sage Purification Bath"];
    const closing = encouragement[Math.floor(Math.random() * encouragement.length)];
    
    return `${opening}\n\n${explanation}\n\n${closing}`;
  }

  private generateIngredientGuide(ritual: RitualTemplate) {
    let minCost = 0;
    let maxCost = 0;
    const ingredients: SacredIngredient[] = [];
    
    for (const ingredientKey of ritual.ingredients) {
      let ingredientData: SacredIngredient | null = null;
      
      for (const category of Object.values(this.sacred_bathing_database.ingredient_database)) {
        if (ingredientKey in category) {
          ingredientData = category[ingredientKey as keyof typeof category];
          break;
        }
      }
      
      if (ingredientData) {
        const priceRange = ingredientData.price_range.replace("$", "").split("-");
        minCost += parseInt(priceRange[0]);
        maxCost += parseInt(priceRange[1]);
        ingredients.push(ingredientData);
      }
    }
    
    return {
      total_estimated_cost: `$${minCost}-${maxCost}`,
      ingredients
    };
  }

  private generateRitualInstructions(ritual: RitualTemplate): RitualInstructions {
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
  }

  private generateShoppingGuide(ritual: RitualTemplate) {
    return {
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
    };
  }

  private generateAftercareGuidance(ritual: RitualTemplate) {
    return {
      immediate_aftercare: [
        "Drink plenty of pure water to support the spiritual cleansing process",
        "Rest well and avoid stressful activities for the remainder of the day",
        "Eat light, nourishing foods to support your body's energy",
        "Avoid negative people or environments immediately after the ritual",
        "Journal about your experience and any insights received"
      ],
      ongoing_practices: [
        `Repeat this ritual for ${ritual.duration} as recommended`,
        "Continue daily prayers or meditation to maintain spiritual protection",
        "Practice gratitude daily for the healing you are receiving",
        "Pay attention to positive changes and synchronicities in your life",
        "Share your blessings with others through acts of kindness"
      ],
      signs_of_healing: [
        "Feeling lighter and more energetic",
        "Improved sleep and fewer nightmares",
        "Increased intuition and spiritual awareness",
        "Better relationships and communication",
        "Positive opportunities appearing in your life",
        "Greater sense of peace and protection"
      ]
    };
  }
}

export const seraphinaBathingService = new SeraphinaBathingService();
