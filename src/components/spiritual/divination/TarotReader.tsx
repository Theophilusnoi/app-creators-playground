import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useVoiceService } from '@/hooks/useVoiceService';
import { Zap, Volume2 } from 'lucide-react';

interface TarotCard {
  id: number;
  name: string;
  upright: string;
  reversed: string;
  description: string;
  symbol: string;
}

const tarotDeck: TarotCard[] = [
  {
    id: 1,
    name: "The Fool",
    upright: "New beginnings, spontaneity, adventure, innocence",
    reversed: "Recklessness, risk-taking, naivety, foolishness",
    description: "Represents unlimited potential and new journeys ahead",
    symbol: "🃏"
  },
  {
    id: 2,
    name: "The Magician",
    upright: "Manifestation, resourcefulness, power, inspired action",
    reversed: "Manipulation, trickery, untapped talents, illusion",
    description: "Symbolizes the power to create your reality through will",
    symbol: "🎩"
  },
  {
    id: 3,
    name: "The High Priestess",
    upright: "Intuition, subconscious, divine feminine, mystery",
    reversed: "Secrets, disconnected intuition, withdrawal, silence",
    description: "Represents inner wisdom and unconscious knowledge",
    symbol: "🌙"
  },
  {
    id: 4,
    name: "The Empress",
    upright: "Femininity, beauty, nature, abundance, nurturing",
    reversed: "Creative block, dependence, smothering, barrenness",
    description: "Symbol of fertility, nurturing and natural abundance",
    symbol: "👑"
  },
  {
    id: 5,
    name: "The Emperor",
    upright: "Authority, structure, control, fatherhood, leadership",
    reversed: "Domination, rigidity, lack of control, tyranny",
    description: "Represents structure, stability and masculine power",
    symbol: "⚔️"
  },
  {
    id: 6,
    name: "The Lovers",
    upright: "Love, harmony, relationships, choices, alignment",
    reversed: "Disharmony, imbalance, misalignment, conflict",
    description: "Symbolizes relationships and important life choices",
    symbol: "💕"
  },
  {
    id: 7,
    name: "The Chariot",
    upright: "Control, willpower, success, determination, direction",
    reversed: "Lack of control, aggression, no direction, defeat",
    description: "Represents triumph through maintaining control",
    symbol: "🏇"
  },
  {
    id: 8,
    name: "Strength",
    upright: "Strength, courage, patience, control, compassion",
    reversed: "Weakness, self-doubt, lack of confidence, raw emotion",
    description: "Shows inner strength and the power of gentle persuasion",
    symbol: "🦁"
  }
];

export const TarotReader: React.FC = () => {
  const [tarotCards, setTarotCards] = useState<TarotCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isReading, setIsReading] = useState(false);
  const { generateAndPlay } = useVoiceService();

  const drawTarotCards = (count: number = 3) => {
    const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    setTarotCards(selected);
    setSelectedCard(null);
    setIsReading(false);
  };

  const readTarotCard = (card: TarotCard) => {
    setSelectedCard(card);
    setIsReading(true);
    
    generateAndPlay({
      text: `You've drawn ${card.name}. ${card.description}. In the upright position, it means: ${card.upright}. This card suggests a time of transformation and growth in your life.`,
      emotion: 'calm'
    });
    
    setTimeout(() => setIsReading(false), 3000);
  };

  return (
    <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          <Zap className="text-amber-400" />
          Tarot Wisdom
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <Button 
            onClick={() => drawTarotCards(3)}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
          >
            <Zap className="mr-2" size={16} />
            Draw 3-Card Spread
          </Button>
          <p className="mt-2 text-sm text-purple-300">
            Past • Present • Future
          </p>
        </div>
        
        {tarotCards.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {tarotCards.map((card, index) => (
                <div 
                  key={card.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedCard?.id === card.id 
                      ? 'ring-4 ring-amber-400 scale-105' 
                      : 'hover:scale-105'
                  }`}
                  onClick={() => readTarotCard(card)}
                >
                  <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-2 border-amber-500/30 rounded-xl w-full aspect-[2/3] flex items-center justify-center text-6xl">
                    {card.symbol}
                  </div>
                  <div className="mt-2 text-center">
                    <h4 className="font-medium text-white">{card.name}</h4>
                    <p className="text-sm text-amber-300">
                      {['Past', 'Present', 'Future'][index]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedCard && (
              <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-lg p-6 border border-amber-500/30">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-2 border-amber-500/30 rounded-xl w-full aspect-[2/3] flex items-center justify-center text-8xl">
                      {selectedCard.symbol}
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 space-y-4">
                    <h3 className="text-xl font-bold text-amber-200 mb-2">
                      {selectedCard.name}
                    </h3>
                    
                    <div>
                      <h4 className="font-semibold text-amber-300">Upright Meaning:</h4>
                      <p className="text-purple-100">{selectedCard.upright}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-amber-300">Reversed Meaning:</h4>
                      <p className="text-purple-100">{selectedCard.reversed}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-amber-300">Interpretation:</h4>
                      <p className="text-purple-100">{selectedCard.description}</p>
                    </div>
                    
                    {isReading && (
                      <div className="mt-4 p-3 bg-amber-900/30 rounded-lg flex items-center border border-amber-500/30">
                        <div className="animate-pulse mr-3">
                          <Volume2 className="text-amber-400" />
                        </div>
                        <p className="text-amber-200">
                          Reading your card...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔮</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Draw Your Cards</h3>
            <p className="text-purple-200">
              The tarot reveals insights about your past, present, and future. 
              Click above to draw a 3-card spread and discover what the universe has to say.
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 p-4 border-t border-amber-500/30">
        <p className="text-sm text-amber-300 mx-auto">
          ✨ Tarot readings offer guidance, not fixed predictions. Use them for insight and self-reflection.
        </p>
      </CardFooter>
    </Card>
  );
};
