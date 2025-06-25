
import { TarotCard } from '@/types/tarot';

export const tarotDeck: TarotCard[] = [
  // Major Arcana
  {
    id: 0,
    name: "The Fool",
    suit: "major_arcana",
    number: 0,
    meaning: "New beginnings, innocence, spontaneity, free spirit",
    reversed: "Recklessness, taken advantage of, inconsideration, foolishness",
    keywords: ["new beginnings", "innocence", "journey", "potential", "spontaneity"],
    element: "air",
    astrology: "Uranus",
    description: "The Fool represents the beginning of all journeys, both spiritual and physical. A figure stands at the edge of a cliff, ready to take a leap of faith.",
    spiritualMessage: "Trust in the universe and take that first step on your spiritual journey. Every master was once a beginner."
  },
  {
    id: 1,
    name: "The Magician",
    suit: "major_arcana",
    number: 1,
    meaning: "Manifestation, resourcefulness, power, inspired action",
    reversed: "Manipulation, poor planning, untapped talents, illusion",
    keywords: ["manifestation", "power", "skill", "concentration", "action"],
    element: "air",
    astrology: "Mercury",
    description: "The Magician stands with one hand pointing to heaven and one to earth, channeling divine energy into the material world.",
    spiritualMessage: "You have all the tools you need to manifest your desires. Focus your will and take inspired action."
  },
  {
    id: 2,
    name: "The High Priestess",
    suit: "major_arcana",
    number: 2,
    meaning: "Intuition, sacred knowledge, divine feminine, subconscious mind",
    reversed: "Secrets, disconnected from intuition, withdrawal, silence",
    keywords: ["intuition", "mystery", "subconscious", "inner voice", "wisdom"],
    element: "water",
    astrology: "Moon",
    description: "The High Priestess sits between two pillars, guardian of sacred mysteries and intuitive wisdom.",
    spiritualMessage: "Listen to your inner voice. The answers you seek lie within your intuitive knowing."
  },
  // Add more major arcana cards...
  {
    id: 21,
    name: "The World",
    suit: "major_arcana",
    number: 21,
    meaning: "Completion, accomplishment, travel, harmony, fulfillment",
    reversed: "Lack of closure, stagnation, obstacles, incomplete",
    keywords: ["completion", "fulfillment", "harmony", "success", "unity"],
    element: "earth",
    astrology: "Saturn",
    description: "The World represents the completion of the major life cycle and spiritual journey.",
    spiritualMessage: "You have achieved spiritual completion in this cycle. Celebrate your growth and prepare for the next level."
  },
  // Minor Arcana - Cups
  {
    id: 22,
    name: "Ace of Cups",
    suit: "cups",
    number: 1,
    meaning: "New love, emotional awakening, creativity, spirituality",
    reversed: "Emotional loss, blocked creativity, emptiness, spiritual disconnection",
    keywords: ["love", "emotion", "spirituality", "creativity", "intuition"],
    element: "water",
    description: "A hand emerges from clouds holding a golden cup overflowing with water.",
    spiritualMessage: "Open your heart to divine love and let it overflow into all areas of your life."
  },
  // Add more cards for a complete 78-card deck...
];

// Export the complete deck as well
export const completeTarotDeck = tarotDeck;

export const shuffleDeck = (deck: TarotCard[]): TarotCard[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const drawCards = (deck: TarotCard[], count: number): TarotCard[] => {
  const shuffled = shuffleDeck(deck);
  return shuffled.slice(0, count);
};
