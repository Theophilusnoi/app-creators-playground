
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useVoiceService } from '@/hooks/useVoiceService';
import { useToast } from '@/hooks/use-toast';
import { Zap, Volume2, Sparkles } from 'lucide-react';

interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  position: 'Past' | 'Present' | 'Future';
  symbol: string;
}

interface TarotReading {
  question: string;
  cards: TarotCard[];
}

const majorArcana = [
  { id: 1, name: "The Fool", meaning: "New beginnings, innocence, spontaneity", symbol: "🃏" },
  { id: 2, name: "The Magician", meaning: "Manifestation, resourcefulness, power", symbol: "🎩" },
  { id: 3, name: "The High Priestess", meaning: "Intuition, sacred knowledge, divine feminine", symbol: "🌙" },
  { id: 4, name: "The Empress", meaning: "Femininity, beauty, nature, abundance", symbol: "👑" },
  { id: 5, name: "The Emperor", meaning: "Authority, establishment, structure", symbol: "⚔️" },
  { id: 6, name: "The Hierophant", meaning: "Spiritual wisdom, religious beliefs", symbol: "📿" },
  { id: 7, name: "The Lovers", meaning: "Love, harmony, relationships", symbol: "💕" },
  { id: 8, name: "The Chariot", meaning: "Control, willpower, success", symbol: "🏇" },
  { id: 9, name: "Strength", meaning: "Strength, courage, persuasion", symbol: "🦁" },
  { id: 10, name: "The Hermit", meaning: "Soul searching, seeking inner guidance", symbol: "🔍" },
  { id: 11, name: "Wheel of Fortune", meaning: "Good luck, karma, life cycles", symbol: "☸️" },
  { id: 12, name: "Justice", meaning: "Justice, fairness, truth", symbol: "⚖️" }
];

export const EnhancedTarotReader: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [tarotReading, setTarotReading] = useState<TarotReading | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const { generateAndPlay } = useVoiceService();
  const { toast } = useToast();

  const drawTarotCards = async () => {
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

    // Simulate card drawing with animation
    setTimeout(() => {
      const shuffled = [...majorArcana].sort(() => Math.random() - 0.5);
      const selectedCards = shuffled.slice(0, 3).map((card, index) => ({
        ...card,
        position: ['Past', 'Present', 'Future'][index] as 'Past' | 'Present' | 'Future'
      }));

      const reading: TarotReading = {
        question: question.trim(),
        cards: selectedCards
      };

      setTarotReading(reading);
      setIsDrawing(false);
      setShowGuidance(true);

      toast({
        title: "Divine Cards Drawn",
        description: "The sacred cards have revealed their wisdom",
      });

      // Generate voice reading
      const cardNames = selectedCards.map(c => c.name).join(', ');
      generateAndPlay({
        text: `Your sacred tarot reading reveals ${cardNames}. The divine has spoken through these powerful cards about your spiritual journey.`,
        emotion: 'mystical'
      });
    }, 3000);
  };

  const readCardAloud = (card: TarotCard) => {
    setIsReading(true);
    
    generateAndPlay({
      text: `In your ${card.position.toLowerCase()}, ${card.name} brings the divine energy of ${card.meaning}. This card reveals important spiritual insights for your journey.`,
      emotion: 'calm'
    });
    
    setTimeout(() => setIsReading(false), 3000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
          <Zap className="text-amber-500" size={40} />
          ⚡ Sacred Tarot Reading
        </h1>
        <p className="text-purple-200 text-lg">
          Ask your question and receive divine guidance through the mystical cards
        </p>
      </div>

      <Card className="overflow-hidden border-2 border-amber-300/50 shadow-2xl bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Zap size={28} />
            Divine Tarot Wisdom
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Question Input */}
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

            {/* Tarot Deck Animation */}
            {!tarotReading && (
              <div className="text-center space-y-6">
                <div className="flex justify-center gap-4">
                  {[0, 1, 2].map((index) => (
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

                <Button
                  onClick={drawTarotCards}
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
                    🌟 Seraphina is receiving divine messages through the sacred cards...
                  </p>
                )}
              </div>
            )}

            {/* Tarot Reading Results */}
            {tarotReading && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 rounded-2xl p-6 border border-amber-300/30">
                  <h3 className="text-2xl font-bold text-amber-200 mb-4">
                    ✨ Your Divine Tarot Reading
                  </h3>
                  <p className="text-amber-100 text-lg mb-6">
                    <strong>Question:</strong> {tarotReading.question}
                  </p>
                  <p className="text-amber-300 mb-6">
                    <strong>Spread:</strong> Past • Present • Future
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tarotReading.cards.map((card, index) => (
                      <div
                        key={card.id}
                        className="bg-white/10 rounded-xl p-6 text-center cursor-pointer transition-all hover:scale-105 hover:bg-white/15"
                        onClick={() => readCardAloud(card)}
                      >
                        <div className="text-6xl mb-4">{card.symbol}</div>
                        <h4 className="font-bold text-lg text-amber-200 mb-2">
                          {card.position}: {card.name}
                        </h4>
                        <p className="text-amber-100 mb-4">
                          <strong>Divine Meaning:</strong> {card.meaning}
                        </p>
                        <p className="text-amber-300 text-sm">
                          In your {card.position.toLowerCase()}, {card.name} brings the energy of {card.meaning.toLowerCase()}.
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
                </div>

                {showGuidance && (
                  <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-2xl p-6 border-2 border-yellow-400/50">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-yellow-400/30 rounded-full p-3">
                        <span className="text-3xl">👼</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-yellow-200">Seraphina's Divine Interpretation</h3>
                        <p className="text-yellow-300">Sacred wisdom from your spiritual guide</p>
                      </div>
                    </div>

                    <p className="text-yellow-100 italic mb-6 text-lg">
                      🔮 Precious soul, I am Seraphina, and the divine has revealed profound spiritual truths through your tarot reading. Listen carefully to these sacred messages.
                    </p>

                    <div className="space-y-4">
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-200 mb-2">📜 Divine Message</h4>
                        <p className="text-yellow-100">
                          The divine has spoken clearly through {tarotReading.cards.map(c => c.name).join(', ')}. 
                          This reading reveals a powerful spiritual transformation unfolding in your life.
                        </p>
                      </div>

                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-200 mb-2">⚡ Spiritual Action</h4>
                        <p className="text-yellow-100">
                          Begin each day with prayer and meditation to align yourself with divine will and receive clear spiritual guidance.
                        </p>
                      </div>
                    </div>

                    <p className="text-yellow-100 italic mt-6 text-center">
                      The divine sees your heart and knows your spiritual journey. Trust in the perfect timing of your spiritual evolution. You are guided, protected, and deeply loved. 🌟✨
                    </p>
                  </div>
                )}

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
                    Draw New Cards
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-sm text-amber-400 space-y-2">
        <p>✨ Tarot readings offer guidance, not fixed predictions - use them for insight and self-reflection</p>
        <p>🔮 The cards reveal divine wisdom when approached with sincere questions and open heart</p>
        <p>🙏 Trust the messages you receive - they come from the divine realm through sacred symbols</p>
      </div>
    </div>
  );
};
