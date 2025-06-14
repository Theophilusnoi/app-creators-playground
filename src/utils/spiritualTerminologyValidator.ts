
export interface SpiritualTerm {
  term: string;
  tradition: string;
  alternatives: string[];
  culturalSensitivity: 'safe' | 'caution' | 'prohibited';
  description: string;
}

export interface ValidationResult {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
  culturalWarnings: string[];
}

const SPIRITUAL_TERMS_DATABASE: SpiritualTerm[] = [
  {
    term: 'spirit animal',
    tradition: 'indigenous',
    alternatives: ['spirit guide', 'power animal', 'totem energy'],
    culturalSensitivity: 'prohibited',
    description: 'Sacred concept that should not be appropriated'
  },
  {
    term: 'namaste',
    tradition: 'hindu',
    alternatives: ['greeting with respect', 'honoring your light'],
    culturalSensitivity: 'caution',
    description: 'Sacred Hindu greeting requiring proper context'
  },
  {
    term: 'meditation',
    tradition: 'universal',
    alternatives: ['mindfulness practice', 'contemplation'],
    culturalSensitivity: 'safe',
    description: 'Universally accepted spiritual practice'
  },
  {
    term: 'sage burning',
    tradition: 'indigenous',
    alternatives: ['herb cleansing', 'aromatic purification'],
    culturalSensitivity: 'prohibited',
    description: 'Sacred Native American practice'
  }
];

const PROHIBITED_PHRASES = [
  'spiritual warfare',
  'kill negative energy',
  'destroy demons',
  'eliminate evil spirits'
];

export class SpiritualTerminologyValidator {
  private termsDatabase: Map<string, SpiritualTerm>;
  private prohibitedPhrases: Set<string>;

  constructor() {
    this.termsDatabase = new Map(
      SPIRITUAL_TERMS_DATABASE.map(term => [term.term.toLowerCase(), term])
    );
    this.prohibitedPhrases = new Set(PROHIBITED_PHRASES.map(p => p.toLowerCase()));
  }

  validateContent(content: string, userTradition?: string): ValidationResult {
    const issues: string[] = [];
    const suggestions: string[] = [];
    const culturalWarnings: string[] = [];
    
    const lowerContent = content.toLowerCase();

    // Check for prohibited phrases
    for (const phrase of this.prohibitedPhrases) {
      if (lowerContent.includes(phrase)) {
        issues.push(`Prohibited phrase detected: "${phrase}"`);
        suggestions.push(`Consider using peaceful language instead of "${phrase}"`);
      }
    }

    // Check for culturally sensitive terms
    for (const [termKey, termData] of this.termsDatabase) {
      if (lowerContent.includes(termKey)) {
        if (termData.culturalSensitivity === 'prohibited') {
          issues.push(`Culturally inappropriate term: "${termData.term}"`);
          suggestions.push(`Use alternative: ${termData.alternatives.join(' or ')}`);
          culturalWarnings.push(termData.description);
        } else if (termData.culturalSensitivity === 'caution') {
          if (userTradition && userTradition !== termData.tradition) {
            culturalWarnings.push(
              `"${termData.term}" is from ${termData.tradition} tradition. ${termData.description}`
            );
            suggestions.push(`Consider: ${termData.alternatives.join(' or ')}`);
          }
        }
      }
    }

    return {
      isValid: issues.length === 0,
      issues,
      suggestions,
      culturalWarnings
    };
  }

  getSafeAlternatives(term: string): string[] {
    const termData = this.termsDatabase.get(term.toLowerCase());
    return termData?.alternatives || [];
  }

  addCustomTerm(term: SpiritualTerm): void {
    this.termsDatabase.set(term.term.toLowerCase(), term);
  }
}

export const spiritualValidator = new SpiritualTerminologyValidator();
