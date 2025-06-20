
export interface TraditionalFramework {
  tradition: string;
  sourceTexts: string[];
  keyInterpretations: {
    lifeLine: string;
    heartLine: string;
    headLine: string;
    fateLine: string;
    mounts: Record<string, string>;
    handShapes?: Record<string, string>;
  };
}

export interface LineInterpretationRule {
  feature: string;
  traditionalMeaning: string;
  modernAdjustment: string;
  culturalContext: string;
}

export const TRADITIONAL_FRAMEWORKS: TraditionalFramework[] = [
  {
    tradition: "Indian Ayurvedic",
    sourceTexts: ["Lal Kitab", "Hasta Sanjeevani"],
    keyInterpretations: {
      lifeLine: "Prana (vital energy) flow and major life transitions",
      heartLine: "Emotional balance and relationship patterns according to Vedic principles",
      headLine: "Mental constitution and intellectual dharma",
      fateLine: "Karmic path and spiritual destiny",
      mounts: {
        jupiter: "Leadership potential and guru energy",
        venus: "Creative expression and devotional capacity",
        saturn: "Karmic lessons and spiritual discipline",
        mercury: "Communication gifts and business acumen",
        apollo: "Artistic talents and solar energy",
        mars: "Warrior spirit and vital strength"
      }
    }
  },
  {
    tradition: "Chinese Chiromancy",
    sourceTexts: ["Zhan Bu", "Shou Xiang"],
    keyInterpretations: {
      lifeLine: "Qi flow and longevity indicators",
      heartLine: "Emotional harmony and relationship fortune",
      headLine: "Wisdom cultivation and mental clarity",
      fateLine: "Career path and destiny influences",
      mounts: {
        jupiter: "Authority and social standing",
        venus: "Love fortune and artistic nature",
        saturn: "Patience and endurance qualities",
        mercury: "Intelligence and adaptability",
        apollo: "Fame potential and creative success",
        mars: "Courage and competitive spirit"
      },
      handShapes: {
        fire: "Impulsive, passionate, natural leader",
        water: "Intuitive, sensitive, emotionally deep",
        earth: "Practical, grounded, reliable",
        wood: "Adaptable, resilient, growth-oriented"
      }
    }
  }
];

export const LINE_INTERPRETATION_RULES: LineInterpretationRule[] = [
  {
    feature: "deep_life_line",
    traditionalMeaning: "Strong vital force and long life",
    modernAdjustment: "Excellent health potential and resilience",
    culturalContext: "Vedic tradition emphasizes prana strength"
  },
  {
    feature: "broken_life_line",
    traditionalMeaning: "Significant life disruption or trauma",
    modernAdjustment: "Periods requiring resilience building and healing",
    culturalContext: "Chinese palmistry sees as transformation points"
  },
  {
    feature: "curved_heart_line",
    traditionalMeaning: "Passionate and emotional nature",
    modernAdjustment: "Strong capacity for deep emotional connections",
    culturalContext: "Greek tradition links to romantic destiny"
  },
  {
    feature: "straight_head_line",
    traditionalMeaning: "Logical and analytical mind",
    modernAdjustment: "Excellent problem-solving abilities",
    culturalContext: "Western palmistry emphasizes rational thinking"
  },
  {
    feature: "star_on_apollo_mount",
    traditionalMeaning: "Artistic fame or recognition",
    modernAdjustment: "Creative breakthrough potential",
    culturalContext: "Renaissance palmistry symbol of divine inspiration"
  }
];
