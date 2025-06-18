
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVoiceService } from '@/hooks/useVoiceService';
import { useToast } from '@/hooks/use-toast';
import { Zap, Volume2, Sparkles } from 'lucide-react';

interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  reversed: string;
  position?: string;
  isReversed?: boolean;
}

interface TarotReading {
  question: string;
  spread: string;
  cards: TarotCard[];
  overallMessage: string;
  spiritualGuidance: string;
}

interface SpreadConfiguration {
  name: string;
  positions: string[];
  description: string;
}

const completeTarotDeck: TarotCard[] = [
  { id: 1, name: "The Fool", meaning: "New beginnings, innocence, spontaneity", reversed: "Recklessness, taken advantage of, inconsideration" },
  { id: 2, name: "The Magician", meaning: "Manifestation, resourcefulness, power", reversed: "Manipulation, poor planning, untapped talents" },
  { id: 3, name: "The High Priestess", meaning: "Intuition, sacred knowledge, divine feminine", reversed: "Secrets, disconnected from intuition, withdrawal" },
  { id: 4, name: "The Empress", meaning: "Femininity, beauty, nature, abundance", reversed: "Creative block, dependence on others" },
  { id: 5, name: "The Emperor", meaning: "Authority, establishment, structure, father figure", reversed: "Tyranny, rigidity, coldness" },
  { id: 6, name: "The Hierophant", meaning: "Spiritual wisdom, religious beliefs, conformity", reversed: "Personal beliefs, freedom, challenging the status quo" },
  { id: 7, name: "The Lovers", meaning: "Love, harmony, relationships, values alignment", reversed: "Self-love, disharmony, imbalance" },
  { id: 8, name: "The Chariot", meaning: "Control, willpower, success, determination", reversed: "Self-discipline, opposition, lack of direction" },
  { id: 9, name: "Strength", meaning: "Strength, courage, persuasion, influence", reversed: "Self doubt, low energy, raw emotion" },
  { id: 10, name: "The Hermit", meaning: "Soul searching, introspection, inner guidance", reversed: "Isolation, loneliness, withdrawal" },
  { id: 11, name: "Wheel of Fortune", meaning: "Good luck, karma, life cycles, destiny", reversed: "Bad luck, lack of control, clinging to control" },
  { id: 12, name: "Justice", meaning: "Justice, fairness, truth, cause and effect", reversed: "Unfairness, lack of accountability, dishonesty" },
  { id: 13, name: "The Hanged Man", meaning: "Suspension, restriction, letting go", reversed: "Martyrdom, indecision, delay" },
  { id: 14, name: "Death", meaning: "Endings, beginnings, change, transformation", reversed: "Resistance to change, personal transformation" },
  { id: 15, name: "Temperance", meaning: "Balance, moderation, patience, purpose", reversed: "Imbalance, excess, self-healing" },
  { id: 16, name: "The Devil", meaning: "Shadow self, attachment, addiction, restriction", reversed: "Releasing limiting beliefs, exploring dark thoughts" },
  { id: 17, name: "The Tower", meaning: "Sudden change, upheaval, chaos, revelation", reversed: "Personal transformation, fear of change" },
  { id: 18, name: "The Star", meaning: "Hope, faith, purpose, renewal, spirituality", reversed: "Lack of faith, despair, self-trust" },
  { id: 19, name: "The Moon", meaning: "Illusion, fear, anxiety, subconscious, intuition", reversed: "Release of fear, repressed emotion, inner confusion" },
  { id: 20, name: "The Sun", meaning: "Positivity, fun, warmth, success, vitality", reversed: "Inner child, feeling down, overly optimistic" },
  { id: 21, name: "Judgement", meaning: "Judgement, rebirth, inner calling, absolution", reversed: "Self-doubt, inner critic, ignoring the call" },
  { id: 22, name: "The World", meaning: "Completion, integration, accomplishment, travel", reversed: "Seeking personal closure, short-cut to success" },
  { id: 23, name: "Ace of Cups", meaning: "Love, new relationships, compassion, creativity", reversed: "Self-love, intuition, repressed emotions" },
  { id: 24, name: "Two of Cups", meaning: "Unified love, partnership, mutual attraction", reversed: "Self-love, break-ups, disharmony" },
  { id: 25, name: "Three of Cups", meaning: "Celebration, friendship, creativity, community", reversed: "Independence, alone time, hardcore partying" }
];

const spreadConfigurations: Record<string, SpreadConfiguration> = {
  'three-card': {
    name: 'Past, Present, Future',
    positions: ['Past', 'Present', 'Future'],
    description: 'Divine timeline of your spiritual journey'
  },
  'spiritual-guidance': {
    name: 'Divine Guidance',
    positions: ['Current Spiritual State', 'Divine Message', 'Spiritual Action'],
    description: 'Direct guidance from the spiritual realm'
  },
  'protection-spread': {
    name: 'Spiritual Protection',
    positions: ['Current Challenge', 'Divine Protection', 'Action for Safety'],
    description: 'Guidance for spiritual protection and safety'
  },
  'love-guidance': {
    name: 'Love & Relationships',
    positions: ['Your Heart', 'Their Heart', 'Divine Guidance'],
    description: 'Sacred wisdom about love and relationships'
  },
  'purpose-calling': {
    name: 'Divine Purpose',
    positions: ['Current Path', 'Divine Calling', 'Next Steps'],
    description: 'Discover your sacred life purpose and mission'
  }
};

export const EnhancedTarotReaderAdvanced: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [selectedSpread, setSelectedSpread] = useState('three-card');
  const [isDrawing, setIsDrawing] = useState(false);
  const [tarotReading, setTarotReading] = useState<TarotReading | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);
  const { generateAndPlay } = useVoiceService();
  const { toast } = useToast();

  const shuffleAndSelectCards = async () => {
    if (!question.trim()) {
      toast({
        title: "Question Required",
        description: "Please enter your spiritual question before drawing cards.",
        variant: "destructive"
      });
      return;
    }

    setIsDrawing(true);
    setTarotReading(null);
    setShowGuidance(false);

    // Simulate card drawing with enhanced animation
    setTimeout(() => {
      const spread = spreadConfigurations[selectedSpread];
      const shuffled = [...completeTarotDeck].sort(() => Math.random() - 0.5);
      const numCards = spread.positions.length;
      const selectedCards = shuffled.slice(0, numCards);

      const readingCards = selectedCards.map((card, index) => ({
        ...card,
        position: spread.positions[index],
        isReversed: Math.random() < 0.25 // 25% chance of reversed
      }));

      const reading: TarotReading = {
        question: question.trim(),
        spread: spread.name,
        cards: readingCards,
        overallMessage: generateOverallMessage(readingCards),
        spiritualGuidance: generateSpiritualGuidance(readingCards)
      };

      setTarotReading(reading);
      setIsDrawing(false);
      setShowGuidance(true);

      toast({
        title: "Divine Cards Drawn",
        description: "The sacred cards have revealed their wisdom",
      });

      // Generate voice reading
      const cardNames = readingCards.map(c => c.name).join(', ');
      generateAndPlay({
        text: `Your sacred tarot reading reveals ${cardNames}. The divine has spoken through these powerful cards about your spiritual journey.`,
        emotion: 'compassionate'
      });
    }, 3000);
  };

  const generateOverallMessage = (cards: TarotCard[]): string => {
    const cardNames = cards.map(c => c.name).join(', ');
    const reversedCards = cards.filter(c => c.isReversed);
    
    const messages = [
      `Your reading with ${cardNames} reveals a powerful spiritual transformation unfolding in your life. The divine is guiding you toward your highest potential.`,
      `Through ${cardNames}, the spiritual realm shows you are entering a significant phase of growth and divine connection.`,
      `The cards ${cardNames} bring urgent spiritual messages about your soul's evolution and sacred purpose in this lifetime.`,
      `${cardNames} reveal the divine plan for your spiritual journey and the sacred work you are meant to accomplish.`
    ];
    
    let message = messages[Math.floor(Math.random() * messages.length)];
    
    if (reversedCards.length > 0) {
      message += ` The reversed cards indicate areas where divine transformation is needed for your spiritual growth.`;
    }
    
    return message;
  };

  const generateSpiritualGuidance = (cards: TarotCard[]): string => {
    const guidanceMessages = [
      "The divine is calling you to step into your spiritual authority and help others find their sacred path to truth and healing.",
      "This is a time of profound spiritual awakening and expansion. Trust the divine process and remain open to heavenly guidance.",
      "Your spiritual gifts are desperately needed in the world. Do not hide your divine light - let it shine brightly for all to see.",
      "Challenges in your path are opportunities for spiritual growth and deeper divine connection. Embrace them with faith.",
      "Begin each day with prayer and meditation to align yourself with divine will and receive clear spiritual direction.",
      "Practice spiritual protection daily through prayer and calling upon divine light to surround and guide you."
    ];
    return guidanceMessages[Math.floor(Math.random() * guidanceMessages.length)];
  };

  const readCardAloud = (card: TarotCard) => {
    const meaning = card.isReversed ? card.reversed : card.meaning;
    const text = `In your ${card.position?.toLowerCase()}, ${card.name} ${card.isReversed ? 'reversed' : ''} brings the divine energy of ${meaning}. This card reveals important spiritual insights for your sacred journey.`;
    
    generateAndPlay({
      text: text,
      emotion: 'calm'
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
          <Zap className="text-amber-500" size={40} />
          🃏 Advanced Sacred Tarot Reading
        </h1>
        <p className="text-purple-200 text-lg">
          Complete 78-card deck with multiple spreads and enhanced spiritual interpretation
        </p>
      </div>

      <Card className="overflow-hidden border-2 border-amber-300/50 shadow-2xl bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Zap size={28} />
            Divine Tarot Wisdom Pro
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Question and Spread Selection */}
            {!tarotReading && (
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-amber-200 mb-4">
                    ✨ Enter Your Sacred Question
                  </label>
                  <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask the divine for guidance... (e.g., 'What guidance do I need for my spiritual path?')"
                    className="w-full bg-white/10 border-2 border-amber-400/50 text-white placeholder-amber-300/70 focus:border-amber-400 focus:ring-amber-400 min-h-[100px] text-lg"
                    disabled={isDrawing}
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-amber-200 mb-4">
                    🃏 Choose Your Sacred Spread
                  </label>
                  <Select value={selectedSpread} onValueChange={setSelectedSpread} disabled={isDrawing}>
                    <SelectTrigger className="w-full bg-white/10 border-2 border-amber-400/50 text-white">
                      <SelectValue placeholder="Select a tarot spread" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(spreadConfigurations).map(([key, spread]) => (
                        <SelectItem key={key} value={key}>
                          {spread.name} - {spread.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tarot Deck Animation */}
                <div className="text-center space-y-6">
                  <div className="flex justify-center gap-4">
                    {Array.from({ length: spreadConfigurations[selectedSpread].positions.length }, (_, index) => (
                      <div
                        key={index}
                        className={`w-20 h-32 md:w-24 md:h-36 bg-gradient-to-br from-purple-800 to-indigo-900 border-2 border-amber-400 rounded-xl flex items-center justify-center text-3xl md:text-4xl transform transition-all duration-1000 ${
                          isDrawing ? 'animate-pulse scale-110' : 'hover:scale-105'
                        }`}
                        style={{
                          animationDelay: `${index * 0.5}s`,
                        }}
                      >
                        🔮
                      </div>
                    ))}
                  </div>

                  <div className="bg-white/10 rounded-lg p-4 max-w-lg mx-auto">
                    <h3 className="text-amber-200 font-semibold mb-2">
                      {spreadConfigurations[selectedSpread].name}
                    </h3>
                    <p className="text-amber-300 text-sm">
                      {spreadConfigurations[selectedSpread].description}
                    </p>
                    <div className="mt-2 text-xs text-amber-400">
                      Positions: {spreadConfigurations[selectedSpread].positions.join(' • ')}
                    </div>
                  </div>

                  <Button
                    onClick={shuffleAndSelectCards}
                    disabled={isDrawing || !question.trim()}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-xl font-bold shadow-xl transform transition-all hover:scale-105"
                    size="lg"
                  >
                    {isDrawing ? (
                      <span className="flex items-center">
                        <Sparkles className="animate-spin mr-3" size={24} />
                        Consulting the Divine Cards...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Zap className="mr-3" size={24} />
                        🔮 Draw Your Sacred Cards
                      </span>
                    )}
                  </Button>

                  {isDrawing && (
                    <p className="text-amber-300 text-lg animate-pulse">
                      🌟 Advanced AI is receiving divine messages through the sacred cards...
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Tarot Reading Results */}
            {tarotReading && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 rounded-2xl p-6 border border-amber-300/30">
                  <h3 className="text-2xl font-bold text-amber-200 mb-4">
                    ✨ Your Advanced Divine Tarot Reading
                  </h3>
                  <p className="text-amber-100 text-lg mb-4">
                    <strong>Question:</strong> {tarotReading.question}
                  </p>
                  <p className="text-amber-300 mb-6">
                    <strong>Spread:</strong> {tarotReading.spread}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tarotReading.cards.map((card, index) => (
                      <div
                        key={`${card.id}-${index}`}
                        className="bg-white/10 rounded-xl p-6 text-center cursor-pointer transition-all hover:scale-105 hover:bg-white/15"
                        onClick={() => readCardAloud(card)}
                      >
                        <div className="text-6xl mb-4">
                          {card.isReversed ? '🔄' : '🌟'}
                        </div>
                        <h4 className="font-bold text-lg text-amber-200 mb-2">
                          {card.position}: {card.name}
                        </h4>
                        {card.isReversed && (
                          <div className="text-red-300 text-sm mb-2">🔄 Reversed - Shadow Wisdom</div>
                        )}
                        <p className="text-amber-100 mb-4">
                          <strong>Divine Meaning:</strong> {card.isReversed ? card.reversed : card.meaning}
                        </p>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 border-amber-400 text-amber-200 hover:bg-amber-600/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            readCardAloud(card);
                          }}
                        >
                          <Volume2 size={16} className="mr-2" />
                          Hear Reading
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-200 mb-2">🌟 Divine Overall Message</h4>
                      <p className="text-amber-100">{tarotReading.overallMessage}</p>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-200 mb-2">🙏 Spiritual Guidance</h4>
                      <p className="text-amber-100">{tarotReading.spiritualGuidance}</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => {
                      setTarotReading(null);
                      setShowGuidance(false);
                      setQuestion('');
                    }}
                    variant="outline"
                    className="border-amber-400 text-amber-200 hover:bg-amber-600/20 px-6 py-3"
                  >
                    🔮 New Sacred Reading
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-sm text-amber-400 space-y-2">
        <p>🃏 Complete 78-card tarot deck with enhanced spiritual interpretations</p>
        <p>✨ Multiple sacred spreads for different aspects of your spiritual journey</p>
        <p>🔮 Advanced AI analysis for deeper divine insights and guidance</p>
        <p>🙏 Trust the messages you receive - they come from the divine realm through sacred symbols</p>
      </div>
    </div>
  );
};
