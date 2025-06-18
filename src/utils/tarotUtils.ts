
import { TarotCard, TarotReadingCard, TarotReading } from '@/types/tarot';
import { spreadConfigurations } from '@/data/tarotSpreads';

export const generatePositionMeaning = (card: TarotCard, position: string, spreadType: string): string => {
  const positionInterpretations: Record<string, Record<string, string>> = {
    'three-card': {
      'Past': `In your spiritual past, ${card.name} represents the foundation and lessons that have shaped your current journey.`,
      'Present': `Currently, ${card.name} indicates the spiritual energies and divine opportunities available to you right now.`,
      'Future': `Looking ahead, ${card.name} reveals the spiritual potential and divine outcomes awaiting you.`
    },
    'spiritual-guidance': {
      'Current Spiritual State': `Your current spiritual state is reflected by ${card.name}, indicating ${card.meaning.toLowerCase()}.`,
      'Divine Message': `The divine message for you through ${card.name} is about ${card.keywords.join(', ')}.`,
      'Action to Take': `The spiritual action you should take, guided by ${card.name}, involves ${card.meaning.toLowerCase()}.`
    },
    'celtic-cross': {
      'Present Situation': `Your current situation is deeply influenced by ${card.name}, bringing ${card.meaning.toLowerCase()}.`,
      'Challenge/Cross': `The spiritual challenge you face, represented by ${card.name}, requires ${card.keywords.join(', ')}.`,
      'Distant Past/Foundation': `The foundation of this situation, shown by ${card.name}, stems from ${card.meaning.toLowerCase()}.`,
      'Recent Past': `Recent events, illuminated by ${card.name}, have involved ${card.meaning.toLowerCase()}.`,
      'Possible Outcome': `A possible outcome, revealed by ${card.name}, suggests ${card.meaning.toLowerCase()}.`,
      'Immediate Future': `The immediate future, guided by ${card.name}, indicates ${card.meaning.toLowerCase()}.`,
      'Your Approach': `Your approach to this situation, through ${card.name}, should embrace ${card.keywords.join(', ')}.`,
      'External Influences': `External influences, shown by ${card.name}, bring ${card.meaning.toLowerCase()}.`,
      'Hopes and Fears': `Your inner hopes and fears, reflected by ${card.name}, center around ${card.meaning.toLowerCase()}.`,
      'Final Outcome': `The ultimate outcome, blessed by ${card.name}, promises ${card.meaning.toLowerCase()}.`
    }
  };

  return positionInterpretations[spreadType]?.[position] || 
         `In the position of ${position}, ${card.name} brings the energy of ${card.meaning.toLowerCase()}.`;
};

export const generateOverallMessage = (cards: TarotReadingCard[], spreadType: string): string => {
  const cardNames = cards.map(c => c.name).join(', ');
  const reversedCards = cards.filter(c => c.isReversed);
  
  const messages: Record<string, string> = {
    'three-card': `Your spiritual journey reveals a powerful progression through ${cardNames}. This reading indicates significant spiritual transformation and divine guidance supporting your path.`,
    'spiritual-guidance': `The divine speaks clearly through ${cardNames}, offering you profound spiritual guidance for your current situation.`,
    'celtic-cross': `This comprehensive reading through ${cardNames} reveals the complex spiritual dynamics at work in your life, offering deep insights for your spiritual evolution.`,
    'chakra-alignment': `Your energy centers, illuminated by ${cardNames}, show the current state of your spiritual alignment and areas for healing.`,
    'love-guidance': `In matters of the heart, ${cardNames} reveal divine wisdom about love, relationships, and emotional spiritual growth.`,
    'purpose-calling': `Your divine purpose, revealed through ${cardNames}, shows the sacred mission your soul came here to fulfill.`
  };
  
  let message = messages[spreadType] || `The cards ${cardNames} bring important spiritual messages for your journey.`;
  
  if (reversedCards.length > 0) {
    message += ` The reversed cards indicate areas where divine transformation and inner work are needed for your spiritual growth.`;
  }
  
  return message;
};

export const generateSpiritualGuidance = (cards: TarotReadingCard[]): string => {
  const guidanceMessages = [
    "Trust in the divine timing of your spiritual journey. Everything unfolds as it should for your highest good.",
    "Your spiritual gifts are awakening rapidly. Pay close attention to your intuitive insights, dreams, and synchronicities.",
    "The universe is actively supporting your spiritual growth. Remain open to divine guidance in all its forms.",
    "This is a sacred time of spiritual transformation. Embrace the changes with faith, courage, and divine trust.",
    "Your connection to the divine is strengthening powerfully. Dedicate time to meditation, prayer, and spiritual practice.",
    "The spiritual realm is sending you clear signs and synchronicities. Stay alert to divine messages throughout your day.",
    "You are being called to step into your spiritual authority and help others find their path to truth and healing.",
    "Divine protection surrounds you completely. Release all fears and trust in the loving guidance of your spiritual guides."
  ];
  
  return guidanceMessages[Math.floor(Math.random() * guidanceMessages.length)];
};

export const generateActionSteps = (cards: TarotReadingCard[]): string[] => {
  const actions = [
    "Begin a daily meditation practice to strengthen your direct connection to divine wisdom",
    "Keep a sacred spiritual journal to record insights, dreams, and divine messages you receive",
    "Spend time in nature regularly to ground your spiritual energy and connect with Earth's healing",
    "Practice daily gratitude to align yourself with divine abundance and raise your vibration",
    "Seek out spiritual community and connect with other souls on the awakening path",
    "Trust your intuition completely and act courageously on the spiritual guidance you receive",
    "Create a sacred space in your home for prayer, meditation, and spiritual contemplation",
    "Study spiritual texts and teachings that resonate with your soul's evolution",
    "Practice forgiveness daily to release old karma and align with divine love",
    "Engage in regular energy healing practices like Reiki, chakra balancing, or crystal work"
  ];
  
  return actions.sort(() => Math.random() - 0.5).slice(0, 3);
};

export const generateMeditation = (cards: TarotReadingCard[]): string => {
  const meditations = [
    "Visualize yourself surrounded by brilliant divine white light, feeling completely protected, loved, and guided by your spiritual team.",
    "Focus on your breath and imagine divine golden energy flowing through you with each inhale, cleansing and empowering your entire being.",
    "Meditate deeply on the spiritual lessons revealed in your reading, asking your guides for even deeper understanding and clarity.",
    "Connect consciously with your spiritual guides, angels, and ascended masters, asking for continued guidance on your sacred path.",
    "Practice loving-kindness meditation, sending divine light and unconditional love to yourself, your loved ones, and all beings everywhere.",
    "Visualize roots of light extending from your being into the Earth, grounding you in divine love while connecting you to cosmic wisdom.",
    "Imagine yourself as a beacon of divine light, radiating love, peace, and healing energy to everyone you encounter on your spiritual journey."
  ];
  
  return meditations[Math.floor(Math.random() * meditations.length)];
};

export const saveReadingToHistory = (reading: TarotReading): void => {
  try {
    const savedReadings = JSON.parse(localStorage.getItem('tarotReadings') || '[]');
    savedReadings.unshift(reading);
    localStorage.setItem('tarotReadings', JSON.stringify(savedReadings.slice(0, 50))); // Keep last 50
  } catch (error) {
    console.error('Failed to save reading to history:', error);
  }
};

export const getReadingHistory = (): TarotReading[] => {
  try {
    return JSON.parse(localStorage.getItem('tarotReadings') || '[]');
  } catch (error) {
    console.error('Failed to load reading history:', error);
    return [];
  }
};
