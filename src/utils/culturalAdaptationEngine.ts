
export interface CulturalProfile {
  tradition: string;
  language: string;
  deity: string;
  protectionSymbol: string;
  lightColor: string;
  prayer: string;
  colorScheme: string;
  culturalReferences: string[];
}

export interface AdaptationContext {
  userTradition: string;
  emotionalState: 'calm' | 'distressed' | 'crisis';
  contentType: 'protection' | 'grounding' | 'healing' | 'general';
}

const CULTURAL_PROFILES: Record<string, CulturalProfile> = {
  christian: {
    tradition: 'Christian',
    language: 'en',
    deity: 'Holy Spirit',
    protectionSymbol: 'cross',
    lightColor: 'white',
    prayer: 'Blood of Jesus protect me',
    colorScheme: 'from-blue-900 to-white',
    culturalReferences: ['Archangel Michael', 'Divine Light', 'Sacred Heart']
  },
  buddhist: {
    tradition: 'Buddhist',
    language: 'en',
    deity: 'White Tara',
    protectionSymbol: 'lotus',
    lightColor: 'golden',
    prayer: 'Om Tare Tuttare Ture Svaha',
    colorScheme: 'from-orange-900 to-yellow-500',
    culturalReferences: ['Buddha', 'Dharma', 'Sangha']
  },
  hindu: {
    tradition: 'Hindu',
    language: 'en',
    deity: 'Hanuman',
    protectionSymbol: 'om',
    lightColor: 'saffron',
    prayer: 'Jai Hanuman, remove all obstacles',
    colorScheme: 'from-red-900 to-orange-500',
    culturalReferences: ['Ganesha', 'Devi', 'Shiva']
  },
  islamic: {
    tradition: 'Islamic',
    language: 'en',
    deity: 'Allah',
    protectionSymbol: 'crescent',
    lightColor: 'green',
    prayer: 'Bismillah, I seek refuge in Allah',
    colorScheme: 'from-green-900 to-emerald-500',
    culturalReferences: ['Rahman', 'Rahim', 'Barakallahu']
  },
  indigenous: {
    tradition: 'Indigenous',
    language: 'en',
    deity: 'Ancestor Spirits',
    protectionSymbol: 'sacred circle',
    lightColor: 'earth tones',
    prayer: 'Grandfathers, shield me with wisdom',
    colorScheme: 'from-green-900 to-amber-600',
    culturalReferences: ['Mother Earth', 'Four Directions', 'Spirit Animals']
  },
  secular: {
    tradition: 'Secular',
    language: 'en',
    deity: 'Inner Strength',
    protectionSymbol: 'shield',
    lightColor: 'silver',
    prayer: 'My resilience is unbreakable',
    colorScheme: 'from-gray-900 to-silver',
    culturalReferences: ['Inner Light', 'Natural Energy', 'Human Resilience']
  }
};

export class CulturalAdaptationEngine {
  private profiles: Map<string, CulturalProfile>;

  constructor() {
    this.profiles = new Map(Object.entries(CULTURAL_PROFILES));
  }

  adaptContent(
    baseContent: string, 
    context: AdaptationContext
  ): string {
    const profile = this.profiles.get(context.userTradition) || CULTURAL_PROFILES.secular;
    
    let adaptedContent = baseContent
      .replace(/{deity}/g, profile.deity)
      .replace(/{protectionSymbol}/g, profile.protectionSymbol)
      .replace(/{lightColor}/g, profile.lightColor)
      .replace(/{prayer}/g, profile.prayer)
      .replace(/{culturalReference}/g, this.selectCulturalReference(profile, context));

    // Adapt tone based on emotional state
    adaptedContent = this.adaptTone(adaptedContent, context.emotionalState);

    // Add tradition-specific context
    adaptedContent = this.addCulturalContext(adaptedContent, profile, context.contentType);

    return adaptedContent;
  }

  private selectCulturalReference(profile: CulturalProfile, context: AdaptationContext): string {
    const references = profile.culturalReferences;
    
    // Select based on content type
    switch (context.contentType) {
      case 'protection':
        return references[0] || profile.deity;
      case 'healing':
        return references[1] || profile.deity;
      default:
        return references[Math.floor(Math.random() * references.length)] || profile.deity;
    }
  }

  private adaptTone(content: string, emotionalState: string): string {
    switch (emotionalState) {
      case 'crisis':
        return content.replace(/gently/g, 'immediately').replace(/softly/g, 'firmly');
      case 'distressed':
        return content.replace(/quickly/g, 'calmly').replace(/rush/g, 'breathe');
      case 'calm':
        return content.replace(/urgent/g, 'peaceful').replace(/immediate/g, 'gentle');
      default:
        return content;
    }
  }

  private addCulturalContext(content: string, profile: CulturalProfile, contentType: string): string {
    const contextualPhrases = {
      protection: {
        christian: 'In the name of Jesus,',
        buddhist: 'With loving-kindness,',
        hindu: 'Om Gam Ganapataye Namaha,',
        islamic: 'Bismillah,',
        indigenous: 'With respect to the ancestors,',
        secular: 'Drawing upon your inner strength,'
      },
      grounding: {
        christian: 'Feel God\'s presence,',
        buddhist: 'Return to your breath,',
        hindu: 'Connect with Prithvi (Earth),',
        islamic: 'Remember Allah\'s creation,',
        indigenous: 'Feel Mother Earth beneath you,',
        secular: 'Focus on your physical body,'
      }
    };

    const phrase = contextualPhrases[contentType as keyof typeof contextualPhrases]?.[profile.tradition.toLowerCase()];
    return phrase ? `${phrase} ${content}` : content;
  }

  getProfile(tradition: string): CulturalProfile | undefined {
    return this.profiles.get(tradition);
  }

  addCustomProfile(tradition: string, profile: CulturalProfile): void {
    this.profiles.set(tradition, profile);
  }
}

export const culturalAdapter = new CulturalAdaptationEngine();
