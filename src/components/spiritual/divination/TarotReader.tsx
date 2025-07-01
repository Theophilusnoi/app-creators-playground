
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { tarotDeck, drawCards } from '@/data/tarotDeck';
import { spreadConfigurations } from '@/data/tarotSpreads';
import { generateOverallMessage, generateSpiritualGuidance, generateActionSteps, generateMeditation, saveReadingToHistory } from '@/utils/tarotUtils';
import { TarotReading, TarotReadingCard } from '@/types/tarot';
import { Star, Sparkles, Heart, Eye, Shuffle } from 'lucide-react';

export const TarotReader: React.FC = () => {
  const [selectedSpread, setSelectedSpread] = useState('three-card');
  const [question, setQuestion] = useState('');
  const [currentReading, setCurrentReading] = useState<TarotReading | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDrawCards = async () => {
    if (!question.trim()) {
      alert('Please enter a question for the cards to answer.');
      return;
    }

    setIsDrawing(true);
    
    // Simulate card drawing animation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const spread = spreadConfigurations[selectedSpread];
    const drawnCards = drawCards(tarotDeck, spread.positions.length);
    
    const readingCards: TarotReadingCard[] = drawnCards.map((card, index) => ({
      ...card,
      position: spread.positions[index],
      isReversed: Math.random() < 0.3, // 30% chance of reversed card
      positionMeaning: generatePositionMeaning(card, spread.positions[index], selectedSpread)
    }));

    const reading: TarotReading = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      question: question,
      spreadType: selectedSpread,
      spreadName: spread.name,
      cards: readingCards,
      overallMessage: generateOverallMessage(readingCards, selectedSpread),
      spiritualGuidance: generateSpiritualGuidance(readingCards),
      actionSteps: generateActionSteps(readingCards),
      meditation: generateMeditation(readingCards)
    };

    setCurrentReading(reading);
    saveReadingToHistory(reading);
    setIsDrawing(false);
  };

  const generatePositionMeaning = (card: any, position: string, spreadType: string): string => {
    return `In the position of ${position}, ${card.name} brings the energy of ${card.meaning.toLowerCase()}.`;
  };

  const resetReading = () => {
    setCurrentReading(null);
    setQuestion('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-purple-900/70 to-indigo-900/70 border-purple-400/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white font-bold text-2xl flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" />
            Divine Tarot Guidance
          </CardTitle>
          <p className="text-gray-100 text-lg font-medium">
            Receive sacred wisdom and spiritual guidance through the ancient art of tarot
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-white text-base font-semibold">Your Question</label>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What guidance do you seek from the universe?"
                className="bg-black/40 border-purple-400/60 text-white placeholder-gray-300 text-base font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-white text-base font-semibold">Card Spread</label>
              <Select value={selectedSpread} onValueChange={setSelectedSpread}>
                <SelectTrigger className="bg-black/40 border-purple-400/60 text-white text-base font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(spreadConfigurations).map(([key, spread]) => (
                    <SelectItem key={key} value={key}>
                      {spread.name} ({spread.positions.length} cards)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="text-center">
            <Button
              onClick={handleDrawCards}
              disabled={!question.trim() || isDrawing}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-8 py-3"
              size="lg"
            >
              {isDrawing ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Drawing Cards...
                </>
              ) : (
                <>
                  <Shuffle className="w-5 h-5 mr-2" />
                  Draw Cards
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {currentReading && (
        <div className="space-y-6">
          {/* Reading Header */}
          <Card className="bg-black/50 border-purple-400/40 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white font-bold text-xl">{currentReading.spreadName}</CardTitle>
                  <p className="text-gray-100 font-medium text-lg mt-2">"{currentReading.question}"</p>
                </div>
                <Button onClick={resetReading} variant="outline" size="sm" className="border-purple-400 text-purple-200 hover:bg-purple-600/20">
                  New Reading
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Cards Display */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentReading.cards.map((card, index) => (
              <Card key={index} className="bg-gradient-to-br from-purple-900/60 to-blue-900/60 border-purple-400/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-bold text-lg">{card.name}</h3>
                      <p className="text-gray-100 font-semibold text-base">{card.position}</p>
                    </div>
                    {card.isReversed && (
                      <Badge variant="secondary" className="bg-red-600/30 text-red-200 border-red-400 font-medium">
                        Reversed
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-32 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-lg flex items-center justify-center border border-yellow-400/50">
                    <div className="text-center">
                      <Star className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                      <p className="text-yellow-100 text-base font-bold">{card.name}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-white text-base font-medium leading-relaxed">
                      {card.isReversed ? card.reversed : card.meaning}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-100 text-sm font-medium italic">
                      {card.positionMeaning}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {card.keywords.slice(0, 3).map((keyword, i) => (
                      <Badge key={i} variant="outline" className="border-purple-400/60 text-white text-xs font-medium">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reading Interpretation */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-black/50 border-purple-400/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white font-bold text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-400" />
                  Overall Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-base font-medium leading-relaxed">
                  {currentReading.overallMessage}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-purple-400/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white font-bold text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  Spiritual Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-base font-medium leading-relaxed">
                  {currentReading.spiritualGuidance}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-black/50 border-purple-400/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white font-bold text-lg">Action Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {currentReading.actionSteps.map((step, index) => (
                    <li key={index} className="text-white text-base font-medium flex items-start gap-2">
                      <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-purple-400/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white font-bold text-lg">Meditation Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-base font-medium leading-relaxed">
                  {currentReading.meditation}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
```
