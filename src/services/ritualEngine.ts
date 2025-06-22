
import { generateGeminiResponse } from './geminiService';

export interface RitualContext {
  userLocation: {
    latitude: number;
    longitude: number;
    timezone: string;
  };
  astrologicalData: {
    sunSign: string;
    moonPhase: string;
    currentTransits: string[];
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
  };
  personalData: {
    archetype: string;
    tradition: string;
    spiritualGoals: string[];
    currentChallenges: string[];
  };
  environmentalData: {
    season: string;
    weather: string;
    localPlants: string[];
    nearbyWaterSources: string[];
    sacredSites: string[];
  };
  biometricData?: {
    heartRateVariability: number;
    stressLevel: number;
    energyLevel: number;
    sleepQuality: number;
  };
}

export interface PersonalizedRitual {
  id: string;
  title: string;
  tradition: string;
  purpose: string;
  duration: number; // minutes
  optimalTiming: {
    date: string;
    time: string;
    lunarPhase: string;
    astrologicalAlignment: string;
  };
  location: {
    type: 'indoor' | 'outdoor' | 'water' | 'earth' | 'fire';
    direction: string;
    setup: string[];
  };
  materials: {
    essential: string[];
    optional: string[];
    substitutions: Record<string, string>;
  };
  steps: RitualStep[];
  incantations: {
    opening: string;
    main: string;
    closing: string;
  };
  adaptations: {
    weather: Record<string, string>;
    timeConstraints: Record<string, string>;
    materialSubstitutions: Record<string, string>;
  };
  followUp: {
    integration: string[];
    journaling: string[];
    nextSteps: string[];
  };
}

export interface RitualStep {
  id: string;
  type: 'preparation' | 'invocation' | 'main_action' | 'offering' | 'integration' | 'closing';
  duration: number; // minutes
  instruction: string;
  visualization: string;
  mantra?: string;
  breathwork?: string;
  movement?: string;
  biometricCue?: string; // for integration with wearables
}

export class LivingRitualEngine {
  async generatePersonalizedRitual(
    context: RitualContext,
    intention: string,
    urgency: 'low' | 'medium' | 'high' = 'medium'
  ): Promise<PersonalizedRitual> {
    const systemPrompt = `You are a master ritual designer with deep knowledge of world spiritual traditions. 
    Create a personalized ritual that:
    1. Honors the user's cultural archetype and tradition
    2. Aligns with current astrological and environmental conditions
    3. Incorporates local/seasonal elements
    4. Adapts to the user's current life situation
    5. Provides practical, respectful guidance
    
    CRITICAL: Always approach traditions with reverence and authenticity. Include territory acknowledgments when appropriate.
    Provide specific, actionable steps that can be safely performed.`;

    const ritualPrompt = `Create a personalized ritual for:

INTENTION: ${intention}
URGENCY: ${urgency}

USER CONTEXT:
- Archetype: ${context.personalData.archetype}
- Tradition: ${context.personalData.tradition}
- Current challenges: ${context.personalData.currentChallenges.join(', ')}
- Spiritual goals: ${context.personalData.spiritualGoals.join(', ')}

TIMING & ENVIRONMENT:
- Current moon phase: ${context.astrologicalData.moonPhase}
- Sun sign: ${context.astrologicalData.sunSign}
- Season: ${context.environmentalData.season}
- Weather: ${context.environmentalData.weather}
- Sunrise: ${context.astrologicalData.sunrise}
- Sunset: ${context.astrologicalData.sunset}

LOCATION:
- Timezone: ${context.userLocation.timezone}
- Local plants: ${context.environmentalData.localPlants.join(', ')}
- Water sources: ${context.environmentalData.nearbyWaterSources.join(', ')}

${context.biometricData ? `
BIOMETRIC DATA:
- Energy level: ${context.biometricData.energyLevel}/10
- Stress level: ${context.biometricData.stressLevel}/10
- HRV: ${context.biometricData.heartRateVariability}
- Sleep quality: ${context.biometricData.sleepQuality}/10
` : ''}

Please provide a complete ritual structure with specific timing, materials, and step-by-step guidance.
Include cultural acknowledgments and safety considerations.
Adapt the complexity based on urgency level (high = simpler, more immediate; low = more elaborate).`;

    try {
      const response = await generateGeminiResponse({
        message: ritualPrompt,
        systemPrompt,
        personality: {
          warmth_level: 8,
          wisdom_level: 9,
          compassion_level: 9,
          humor_level: 2,
          communication_style: 'wise_guide'
        }
      });

      // Parse the AI response into structured ritual format
      return this.parseRitualResponse(response.response, context, intention);
    } catch (error) {
      console.error('Error generating personalized ritual:', error);
      throw new Error('Failed to generate personalized ritual');
    }
  }

  private parseRitualResponse(
    aiResponse: string, 
    context: RitualContext, 
    intention: string
  ): PersonalizedRitual {
    // This would parse the AI response into the structured format
    // For now, returning a sample structure
    return {
      id: `ritual_${Date.now()}`,
      title: `${context.personalData.archetype} ${intention} Ritual`,
      tradition: context.personalData.tradition,
      purpose: intention,
      duration: 30,
      optimalTiming: {
        date: new Date().toISOString().split('T')[0],
        time: context.astrologicalData.sunrise,
        lunarPhase: context.astrologicalData.moonPhase,
        astrologicalAlignment: context.astrologicalData.currentTransits[0] || 'Mercury favorable'
      },
      location: {
        type: 'outdoor',
        direction: 'east',
        setup: ['Clear sacred space', 'Face sunrise direction', 'Create altar with natural elements']
      },
      materials: {
        essential: ['White candle', 'Natural water', 'Salt or sand'],
        optional: ['Crystals', 'Incense', 'Fresh flowers'],
        substitutions: {
          'White candle': 'LED candle or smartphone flashlight',
          'Natural water': 'Tap water blessed with intention',
          'Salt': 'Rice or breadcrumbs'
        }
      },
      steps: [
        {
          id: 'prep1',
          type: 'preparation',
          duration: 5,
          instruction: 'Create sacred space and center yourself',
          visualization: 'Visualize roots growing from your feet into the earth',
          breathwork: '4-7-8 breathing pattern'
        },
        {
          id: 'invoke1',
          type: 'invocation',
          duration: 10,
          instruction: 'Call upon your archetypal guides',
          visualization: `See ${context.personalData.archetype} energy surrounding you`,
          mantra: `I call upon the wisdom of ${context.personalData.archetype}`
        },
        {
          id: 'main1',
          type: 'main_action',
          duration: 10,
          instruction: 'Perform the core ritual action',
          visualization: 'See your intention manifesting as golden light',
          movement: 'Sacred gestures aligned with your tradition'
        },
        {
          id: 'close1',
          type: 'closing',
          duration: 5,
          instruction: 'Express gratitude and close sacred space',
          visualization: 'See protective light sealing the space',
          mantra: 'So it is, blessed be'
        }
      ],
      incantations: {
        opening: `Sacred ${context.personalData.tradition} ancestors, I call upon your wisdom...`,
        main: `By the power of ${context.personalData.archetype}, I manifest ${intention}...`,
        closing: `In gratitude and reverence, I seal this sacred work...`
      },
      adaptations: {
        weather: {
          'rain': 'Move indoors, use bowl of water to represent rain blessing',
          'wind': 'Use wind as ally for releasing and transformation',
          'snow': 'Incorporate purity and crystalline energy themes'
        },
        timeConstraints: {
          '5_minutes': 'Focus on intention-setting and visualization only',
          '15_minutes': 'Simplified version with essential elements only'
        },
        materialSubstitutions: {
          'no_candle': 'Use smartphone flashlight or visualized flame',
          'no_water': 'Use saliva or breath as water element'
        }
      },
      followUp: {
        integration: [
          'Journal about insights received during ritual',
          'Notice synchronicities in the following days',
          'Practice gratitude for guidance received'
        ],
        journaling: [
          'What did I feel during the ritual?',
          'What messages or insights came through?',
          'How can I integrate this wisdom into daily life?'
        ],
        nextSteps: [
          'Schedule follow-up ritual in 7 days',
          'Share experience with spiritual community if desired',
          'Adjust practice based on results manifested'
        ]
      }
    };
  }

  async getOptimalTiming(
    latitude: number,
    longitude: number,
    intention: string,
    tradition: string
  ): Promise<{
    nextOptimal: Date;
    reason: string;
    alternatives: Array<{ date: Date; reason: string }>;
  }> {
    // This would integrate with astronomical APIs to find optimal timing
    // For now, returning sample data
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    return {
      nextOptimal: tomorrow,
      reason: `New moon energy optimal for ${intention} work in ${tradition} tradition`,
      alternatives: [
        { 
          date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), 
          reason: 'Mercury direct supports clear communication' 
        },
        { 
          date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), 
          reason: 'Weekly power day aligns with your archetype' 
        }
      ]
    };
  }

  async adaptForBiometrics(
    ritual: PersonalizedRitual,
    currentBiometrics: {
      heartRate: number;
      hrvScore: number;
      stressLevel: number;
      energyLevel: number;
    }
  ): Promise<PersonalizedRitual> {
    // Adapt ritual based on current biometric state
    const adaptedRitual = { ...ritual };

    if (currentBiometrics.stressLevel > 7) {
      // High stress - add more grounding elements
      adaptedRitual.steps.unshift({
        id: 'stress_relief',
        type: 'preparation',
        duration: 5,
        instruction: 'Extended grounding practice for stress relief',
        visualization: 'Stress flowing out through your feet into the earth',
        breathwork: 'Extended exhale breathing (4-2-6-2 pattern)',
        biometricCue: 'Continue until HRV improves by 20%'
      });
    }

    if (currentBiometrics.energyLevel < 4) {
      // Low energy - simplify and energize
      adaptedRitual.duration = Math.max(15, adaptedRitual.duration / 2);
      adaptedRitual.steps = adaptedRitual.steps.filter(step => 
        ['preparation', 'main_action', 'closing'].includes(step.type)
      );
    }

    return adaptedRitual;
  }
}

export const ritualEngine = new LivingRitualEngine();
