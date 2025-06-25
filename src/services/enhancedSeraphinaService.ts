
import { SacredBathingGuidance } from './seraphinaBathingService';

export interface SpiritualProblemAnalysis {
  problemType: string;
  severity: 'low' | 'medium' | 'high' | 'emergency';
  suggestedRitual: string;
  urgencyLevel: number;
}

export interface IngredientData {
  name: string;
  image_path?: string;
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

class EnhancedSeraphinaService {
  private personality = {
    warmth: 0.9,
    wisdom: 0.95,
    compassion: 0.98,
    authenticity: 0.92,
    spiritual_depth: 0.96
  };

  private sacredBathingDatabase = {
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

  private spiritualKnowledge = {
    vedantic_wisdom: {
      karma_yoga: {
        definition: "The path of selfless action and service",
        key_concepts: [
          "Action without attachment to results",
          "Offering all actions to the Divine",
          "Transforming work into worship",
          "Understanding duty vs. desire"
        ]
      }
    },
    protection_practices: {
      daily_protection: [
        "Morning prayer for divine protection",
        "Visualizing white light around yourself",
        "Carrying protective crystals or amulets",
        "Regular spiritual cleansing baths",
        "Blessing your home and workspace"
      ],
      emergency_protection: [
        "Immediate prayer for divine intervention",
        "Visualizing mirrors reflecting negativity back",
        "Calling upon spiritual guides and angels",
        "Using salt for instant purification",
        "Seeking sanctuary in sacred spaces"
      ]
    }
  };

  analyzeSpiritualProblem(userMessage: string): SpiritualProblemAnalysis {
    const messageLower = userMessage.toLowerCase();
    
    const problemIndicators = {
      negative_energy_cleansing: {
        keywords: ["negative", "drain", "energy", "tired", "exhausted", "heavy", "dark", "oppressed", "drained", "toxic", "depleted"],
        severity: 'medium'
      },
      spiritual_attack: {
        keywords: ["attack", "curse", "hex", "evil", "enemy", "jealous", "envy", "psychic", "spiritual warfare", "black magic", "witchcraft", "evil eye"],
        severity: 'high'
      },
      heartbreak_healing: {
        keywords: ["heart", "love", "break", "relationship", "divorce", "separation", "lonely", "grief", "loss", "heartbreak", "betrayal", "cheating"],
        severity: 'medium'
      },
      financial_blockages: {
        keywords: ["money", "financial", "job", "work", "poverty", "debt", "bills", "broke", "career", "unemployment", "business", "prosperity"],
        severity: 'medium'
      },
      relationship_healing: {
        keywords: ["marriage", "partner", "spouse", "relationship", "family", "communication", "conflict", "harmony", "reconciliation", "forgiveness"],
        severity: 'low'
      }
    };

    let bestMatch = 'negative_energy_cleansing';
    let highestScore = 0;
    let detectedSeverity: 'low' | 'medium' | 'high' | 'emergency' = 'medium';

    for (const [problemType, data] of Object.entries(problemIndicators)) {
      const score = data.keywords.reduce((acc, keyword) => {
        return acc + (messageLower.includes(keyword) ? 1 : 0);
      }, 0);
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = problemType;
        detectedSeverity = data.severity as 'low' | 'medium' | 'high';
      }
    }

    // Check for emergency keywords
    const emergencyKeywords = ['emergency', 'help', 'urgent', 'immediate', 'crisis', 'danger'];
    const isEmergency = emergencyKeywords.some(keyword => messageLower.includes(keyword));
    
    if (isEmergency) {
      detectedSeverity = 'emergency';
    }

    return {
      problemType: bestMatch,
      severity: detectedSeverity,
      suggestedRitual: bestMatch,
      urgencyLevel: highestScore
    };
  }

  generateCompassionateResponse(userProblem: string, ritual: RitualTemplate): string {
    const compassionateOpenings = [
      "Beloved soul, I feel the weight of what you're carrying, and I want you to know that you are not alone in this spiritual journey.",
      "Dear one, your spirit has called out for guidance, and the divine has heard your plea. I am here to support your healing.",
      "Precious child of light, I sense the spiritual turbulence you're experiencing, and I have been guided to offer you sacred healing wisdom.",
      "Beautiful soul, the universe has brought you to me because your spirit seeks cleansing and renewal. You are deeply loved."
    ];

    const ritualExplanations: Record<string, string> = {
      negative_energy_cleansing: "The Salt and Sage Purification Bath will cleanse away all negative attachments and restore your spiritual protection. This ancient ritual has been used for centuries to remove heavy energies and create divine light barriers around your aura.",
      heartbreak_healing: "The Rose and Honey Heart Healing Bath will gently heal your wounded heart and restore your capacity for joy. Each rose petal represents divine love flowing to you, and the honey attracts sweetness back into your life.",
      financial_blockages: "The Abundance Attraction Bath will remove the energetic blocks preventing prosperity from flowing to you. As you perform this ritual, know that abundance is your divine birthright.",
      spiritual_attack: "The Divine Protection Fortress Bath will create an impenetrable shield around your spirit. This powerful ritual calls upon the highest divine forces to protect and defend you.",
      relationship_healing: "The Love and Harmony Restoration Bath will heal the wounds in your relationships and attract divine love into your life. This sacred ritual opens your heart to give and receive love freely."
    };

    const encouragement = [
      "Trust in this sacred process, for you are deeply loved and divinely protected.",
      "The divine light within you is stronger than any darkness you face.",
      "You have the power to transform your spiritual condition through this sacred practice.",
      "Angels and spiritual guides are surrounding you with love and protection as you heal."
    ];

    const opening = compassionateOpenings[Math.floor(Math.random() * compassionateOpenings.length)];
    const explanation = ritualExplanations[ritual.category] || ritualExplanations.negative_energy_cleansing;
    const closing = encouragement[Math.floor(Math.random() * encouragement.length)];

    return `${opening}\n\n${explanation}\n\n${closing}`;
  }

  generateSacredBathingGuidance(userProblem: string, problemType?: string): SacredBathingGuidance {
    const analysis = problemType ? 
      { problemType, severity: 'medium' as const, suggestedRitual: problemType, urgencyLevel: 1 } :
      this.analyzeSpiritualProblem(userProblem);
    
    const ritual = this.sacredBathingDatabase.ritual_templates[analysis.problemType as keyof typeof this.sacredBathingDatabase.ritual_templates] ||
                  this.sacredBathingDatabase.ritual_templates.negative_energy_cleansing;

    const ingredientGuide = this.generateIngredientGuide(ritual);
    
    return {
      seraphina_message: this.generateCompassionateResponse(userProblem, ritual),
      ritual_details: {
        name: ritual.name,
        purpose: ritual.purpose,
        duration: ritual.duration,
        category: ritual.category,
        tradition: "Ancient spiritual practices from multiple traditions",
        spiritual_benefits: ritual.spiritual_benefits,
        difficulty_level: 'Beginner' as const,
        best_timing: ["Evening", "During moon phases", "When feeling called to cleanse"],
        safety_warnings: ["Use proper dilution", "Test for allergies", "Ensure good ventilation"]
      },
      ingredient_guide: ingredientGuide,
      step_by_step_instructions: this.generateRitualInstructions(ritual),
      ritual_incantations: this.generateIncantations(ritual)
    };
  }

  private generateIngredientGuide(ritual: RitualTemplate) {
    let minCost = 0;
    let maxCost = 0;
    const ingredients: any[] = [];

    for (const ingredientKey of ritual.ingredients) {
      let ingredientData: IngredientData | null = null;
      
      // Find ingredient in database
      for (const category of Object.values(this.sacredBathingDatabase.ingredient_database)) {
        if (ingredientKey in category) {
          ingredientData = category[ingredientKey as keyof typeof category] as IngredientData;
          break;
        }
      }

      if (ingredientData) {
        const priceRange = ingredientData.price_range.replace('$', '').split('-');
        minCost += parseInt(priceRange[0]);
        maxCost += parseInt(priceRange[1]);

        ingredients.push({
          name: ingredientData.name,
          description: ingredientData.description,
          spiritual_properties: ingredientData.spiritual_properties,
          where_to_find: ingredientData.where_to_find,
          price_range: ingredientData.price_range,
          usage: ingredientData.usage,
          spiritual_significance: ingredientData.spiritual_significance
        });
      }
    }

    return {
      total_estimated_cost: `$${minCost}-${maxCost}`,
      ingredients
    };
  }

  private generateRitualInstructions(ritual: RitualTemplate) {
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
        "Stir the water clockwise with your hand while praying or setting intention",
        "Enter the bath slowly and reverently, acknowledging this as sacred healing space",
        "Immerse yourself completely three times, releasing what no longer serves you",
        "Remain in sacred waters for 15-20 minutes in prayer, meditation, or reflection",
        "Express heartfelt gratitude to the divine for this healing opportunity"
      ],
      closing_ritual: [
        "Thank the divine forces that assisted in your healing",
        "Blow out candles with gratitude and reverence",
        "Dispose of used bath ingredients respectfully in nature if possible",
        "Drink plenty of water to support the spiritual cleansing process",
        "Rest and allow your spirit to integrate the healing energies"
      ],
      safety_instructions: [
        "Test ingredients for skin sensitivity before full use",
        "Ensure proper ventilation when burning herbs or incense",
        "Use moderate amounts of salt to avoid skin irritation",
        "Never leave candles unattended"
      ],
      timing_notes: [
        "Evening hours are optimal for cleansing rituals",
        "New moon phases enhance releasing and cleansing",
        "Full moon phases enhance manifestation and attraction",
        "Perform consistently for the recommended duration"
      ]
    };
  }

  private generateIncantations(ritual: RitualTemplate) {
    const incantationsByCategory: Record<string, any> = {
      protection: {
        space_cleansing: "Smoke rise, pure and bright,\nCleanse this space with sacred light.\nAll stagnant shadows, now depart –\nOnly peace remains in my heart.",
        candle_anointing: "Flame of grace, burn strong and clear,\nGuard my spirit, hold me dear.\nNo harm may touch this holy light –\nSeal this prayer with power bright.",
        water_preparation: "Salt of earth, sage so wise,\nWash what wounds me, help me rise.\nPurify my spirit's core –\nMake me whole as before.",
        immersion_affirmation: "Water sacred, deep and pure,\nLift this darkness I endure.\nFrom my spirit, to the sea –\nI am cleansed, I am free.",
        closing_ritual: "To the wind, the earth, the stars above –\nI release this bath with gratitude and love.\nAs water returns, so peace remains –\nOnly blessings flow through my veins."
      },
      love_healing: {
        space_cleansing: "Rose petals soft, honey sweet,\nMake this sacred space complete.\nLove's pure energy, gentle and true –\nHeal my heart and make me new.",
        candle_anointing: "Gentle flame of healing love,\nBless me from the stars above.\nMend this heart that feels so broken –\nLet love's truth be newly spoken.",
        water_preparation: "Rose and honey, sweetness pure,\nHeal the pain I can't endure.\nLove flows in and grief flows out –\nOf this healing, I have no doubt.",
        immersion_affirmation: "Sacred waters, heal my heart,\nGive my broken soul fresh start.\nLove returns to fill this space –\nI am worthy of love's embrace.",
        closing_ritual: "Heart now healed and spirit bright,\nI step forward in love's light.\nAs this sacred water flows away –\nNew love enters every day."
      },
      abundance: {
        space_cleansing: "Cinnamon spice and basil green,\nProsperity flows, abundance seen.\nMoney blocks, now break away –\nWealth and success come here to stay.",
        candle_anointing: "Golden flame of wealth so bright,\nFill my future with abundant light.\nMoney flows to me with ease –\nFinancial freedom, if you please.",
        water_preparation: "Herbs of plenty, spices gold,\nLet prosperity's story be told.\nAbundance flows like river's stream –\nManifesting wealth, living the dream.",
        immersion_affirmation: "Water blessed with golden power,\nWealth increases every hour.\nI deserve abundance true –\nMoney flows in all I do.",
        closing_ritual: "Abundance blessed, now I go forth,\nKnowing truly what I'm worth.\nAs this golden water flows free –\nProsperity belongs to me."
      }
    };

    return incantationsByCategory[ritual.category] || incantationsByCategory.protection;
  }

  // Method for providing spiritual wisdom and guidance
  provideSpiritualWisdom(topic: string): string {
    const wisdomTopics: Record<string, string> = {
      karma: "Karma is the universal law of cause and effect. Every action creates an energetic ripple that returns to us. Practice mindful action, speak with kindness, and live with integrity to create positive karma.",
      meditation: "Meditation is the practice of returning to your true nature - pure consciousness. Start with 5 minutes daily, focusing on your breath. Let thoughts come and go like clouds in the sky.",
      protection: "Spiritual protection begins with your intention and connection to divine light. Visualize yourself surrounded by white light each morning, and remember that love is the most powerful protective force.",
      chakras: "The seven chakras are energy centers that govern different aspects of your being. Keep them balanced through meditation, yoga, sound healing, and conscious living.",
      manifestation: "Manifestation works through aligning your thoughts, emotions, and actions with your desires. Be clear in your intention, feel the emotion of having what you want, and take inspired action."
    };

    const topicLower = topic.toLowerCase();
    for (const [key, wisdom] of Object.entries(wisdomTopics)) {
      if (topicLower.includes(key)) {
        return wisdom;
      }
    }

    return "I am here to share wisdom from the ancient traditions. What specific spiritual topic would you like to explore - karma, meditation, protection, chakras, or manifestation?";
  }
}

export const enhancedSeraphinaService = new EnhancedSeraphinaService();
