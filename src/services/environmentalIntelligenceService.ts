
interface ContextData {
  time: string;
  weather?: string;
  location?: string;
  dayOfWeek: string;
  isWorkingHours: boolean;
}

interface RitualSuggestion {
  ritualId: string;
  confidence: number;
  reason: string;
}

export class EnvironmentalIntelligenceService {
  private static instance: EnvironmentalIntelligenceService;
  private contextRules: Array<{
    conditions: Partial<ContextData>;
    ritualIds: string[];
    confidence: number;
    reason: string;
  }> = [
    {
      conditions: { time: 'morning', weather: 'clear' },
      ritualIds: ['1', '2'], // Sunrise Gratitude, Tea Ceremony
      confidence: 0.9,
      reason: 'Perfect morning conditions for mindful practices'
    },
    {
      conditions: { time: 'afternoon', isWorkingHours: true },
      ritualIds: ['6'], // 3-Minute Breath Altar
      confidence: 0.8,
      reason: 'Quick centering during work hours'
    },
    {
      conditions: { time: 'evening', dayOfWeek: 'friday' },
      ritualIds: ['3'], // Work-to-Home Threshold
      confidence: 0.85,
      reason: 'Transition from work week to weekend'
    },
    {
      conditions: { weather: 'rainy' },
      ritualIds: ['2', '5'], // Tea Ceremony, Mirror Dialogue
      confidence: 0.7,
      reason: 'Indoor practices perfect for rainy weather'
    },
    {
      conditions: { time: 'night' },
      ritualIds: ['4'], // Full Moon Release (if near full moon)
      confidence: 0.6,
      reason: 'Evening energy perfect for release work'
    }
  ];

  static getInstance(): EnvironmentalIntelligenceService {
    if (!EnvironmentalIntelligenceService.instance) {
      EnvironmentalIntelligenceService.instance = new EnvironmentalIntelligenceService();
    }
    return EnvironmentalIntelligenceService.instance;
  }

  async getCurrentContext(): Promise<ContextData> {
    const now = new Date();
    const hour = now.getHours();
    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    let timeOfDay = 'morning';
    if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
    else if (hour >= 21 || hour < 6) timeOfDay = 'night';

    const isWorkingHours = hour >= 9 && hour <= 17 && !['saturday', 'sunday'].includes(dayOfWeek);

    // Simple weather simulation (in production, you'd use a real weather API)
    const weatherConditions = ['clear', 'cloudy', 'rainy', 'sunny'];
    const weather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

    return {
      time: timeOfDay,
      weather,
      dayOfWeek,
      isWorkingHours,
      location: 'home' // Would be determined by GPS in production
    };
  }

  async getSuggestedRituals(): Promise<RitualSuggestion[]> {
    const context = await this.getCurrentContext();
    const suggestions: RitualSuggestion[] = [];

    for (const rule of this.contextRules) {
      let matches = true;
      
      for (const [key, value] of Object.entries(rule.conditions)) {
        if (context[key as keyof ContextData] !== value) {
          matches = false;
          break;
        }
      }

      if (matches) {
        for (const ritualId of rule.ritualIds) {
          suggestions.push({
            ritualId,
            confidence: rule.confidence,
            reason: rule.reason
          });
        }
      }
    }

    // Sort by confidence and remove duplicates
    return suggestions
      .sort((a, b) => b.confidence - a.confidence)
      .filter((suggestion, index, arr) => 
        arr.findIndex(s => s.ritualId === suggestion.ritualId) === index
      )
      .slice(0, 3); // Return top 3 suggestions
  }

  scheduleSmartReminders(callback: (suggestions: RitualSuggestion[]) => void) {
    // Check for suggestions every 30 minutes
    const checkInterval = setInterval(async () => {
      const suggestions = await this.getSuggestedRituals();
      if (suggestions.length > 0) {
        callback(suggestions);
      }
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(checkInterval);
  }
}

export const environmentalIntelligence = EnvironmentalIntelligenceService.getInstance();
