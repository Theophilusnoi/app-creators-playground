
export interface TarotCard {
  id: number;
  name: string;
  suit: string;
  number?: number;
  meaning: string;
  reversed: string;
  keywords: string[];
  element?: string;
  astrology?: string;
  description: string;
  spiritualMessage: string;
  image?: string;
}

export interface TarotReadingCard extends TarotCard {
  position: string;
  isReversed: boolean;
  positionMeaning: string;
}

export interface SpreadConfiguration {
  name: string;
  positions: string[];
  description: string;
}

export interface TarotReading {
  id: number;
  timestamp: string;
  question: string;
  spreadType: string;
  spreadName: string;
  cards: TarotReadingCard[];
  overallMessage: string;
  spiritualGuidance: string;
  actionSteps: string[];
  meditation: string;
}
