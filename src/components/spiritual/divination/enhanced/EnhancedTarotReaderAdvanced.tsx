
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVoiceService } from '@/hooks/useVoiceService';
import { useToast } from '@/hooks/use-toast';
import { Zap, Volume2, Sparkles, Save, RefreshCw, History } from 'lucide-react';
import { TarotCard, TarotReadingCard, TarotReading } from '@/types/tarot';
import { completeTarotDeck } from '@/data/tarotDeck';
import { spreadConfigurations } from '@/data/tarotSpreads';
import { 
  generatePositionMeaning, 
  generateOverallMessage, 
  generateSpiritualGuidance, 
  generateActionSteps, 
  generateMeditation,
  saveReadingToHistory,
  getReadingHistory
} from '@/utils/tarotUtils';

export const EnhancedTarotReaderAdvanced: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [selectedSpread, setSelectedSpread] = useState('three-card');
  const [isDrawing, setIsDrawing] = useState(false);
  const [tarotReading, setTarotReading] = useState<TarotReading | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [readingHistory, setReadingHistory] = useState<TarotReading[]>([]);
  const { generateAndPlay } = useVoiceService();
  const { toast } = useToast();

  const shuffleAndSelectCards = async () => {
    if (!question.trim()) {
      toast({
        title: "Question Required",
        description: "Please enter your sacred question before drawing cards.",
        variant: "destructive"
      });
      return;
    }

    setIsDrawing(true);
    setTarotReading(null);

    // Simulate card drawing with enhanced animation
    setTimeout(() => {
      const spread = spreadConfigurations[selectedSpread];
      const shuffled = [...completeTarotDeck].sort(() => Math.random() - 0.5);
      const numCards = spread.positions.length;
      const selectedCards = shuffled.slice(0, numCards);

      const readingCards: TarotReadingCard[] = selectedCards.map((card, index) => ({
        ...card,
        position: spread.positions[index],
        isReversed: Math.random() < 0.25, // 25% chance of reversed
        positionMeaning: generatePositionMeaning(card, spread.positions[index], selectedSpread)
      }));

      const reading: TarotReading = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        question: question.trim(),
        spreadType: selectedSpread,
        spreadName: spread.name,
        cards: readingCards,
        overallMessage: generateOverallMessage(readingCards, selectedSpread),
        spiritualGuidance: generateSpiritualGuidance(readingCards),
        actionSteps: generateActionSteps(readingCards),
        meditation: generateMeditation(readingCards)
      };

      setTarotReading(reading);
      setIsDrawing(false);

      toast({
        title: "Divine Cards Drawn",
        description: "The sacred cards have revealed their divine wisdom",
      });

      // Generate voice reading
      const cardNames = readingCards.map(c => `${c.name}${c.isReversed ? ' reversed' : ''}`).join(', ');
      generateAndPlay({
        text: `Your sacred ${spread.name} reading reveals ${cardNames}. The divine has spoken through these powerful cards about your spiritual journey.`,
        emotion: 'compassionate'
      });
    }, 3000);
  };

  const readCardAloud = (card: TarotReadingCard) => {
    const meaning = card.isReversed ? card.reversed : card.meaning;
    const text = `In your ${card.position.toLowerCase()}, ${card.name} ${card.isReversed ? 'reversed' : ''} brings the divine energy of ${meaning}. ${card.spiritualMessage}`;
    
    generateAndPlay({
      text: text,
      emotion: 'calm'
    });
  };

  const saveReading = () => {
    if (tarotReading) {
      saveReadingToHistory(tarotReading);
      setReadingHistory(getReadingHistory());
      toast({
        title: "Reading Saved",
        description: "Your sacred reading has been saved to your spiritual journal!",
      });
    }
  };

  const loadReadingHistory = () => {
    setReadingHistory(getReadingHistory());
    setShowHistory(true);
  };

  const loadHistoricalReading = (reading: TarotReading) => {
    setTarotReading(reading);
    setQuestion(reading.question);
    setSelectedSpread(reading.spreadType);
    setShowHistory(false);
  };

  const newReading = () => {
    setTarotReading(null);
    setQuestion('');
    setShowHistory(false);
  };

  if (showHistory) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
            <History className="text-amber-500" size={40} />
            📚 Sacred Reading History
          </h1>
          <p className="text-purple-200 text-lg">
            Your spiritual journey through the cards
          </p>
        </div>

        <Card className="border-2 border-amber-300/50 shadow-2xl bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <History size={28} />
              Spiritual Reading Journal
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-amber-200">
                📖 {readingHistory.length} Sacred Reading{readingHistory.length !== 1 ? 's' : ''}
              </h3>
              <Button
                onClick={() => setShowHistory(false)}
                variant="outline"
                className="border-amber-400 text-amber-200 hover:bg-amber-600/20"
              >
                🔮 New Reading
              </Button>
            </div>

            {readingHistory.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-amber-300 text-lg mb-4">No saved readings yet</p>
                <p className="text-amber-400">Start your spiritual journey by creating your first reading!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {readingHistory.map((reading) => (
                  <div
                    key={reading.id}
                    className="bg-white/10 rounded-lg p-4 cursor-pointer transition-all hover:bg-white/15 hover:scale-102"
                    onClick={() => loadHistoricalReading(reading)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-amber-200 text-lg">{reading.spreadName}</h4>
                      <span className="text-xs text-amber-400">
                        {new Date(reading.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-amber-100 mb-2 line-clamp-2">{reading.question}</p>
                    <div className="flex flex-wrap gap-2">
                      {reading.cards.slice(0, 3).map((card, index) => (
                        <span key={index} className="text-xs bg-amber-600/20 text-amber-300 px-2 py-1 rounded">
                          {card.name}
                        </span>
                      ))}
                      {reading.cards.length > 3 && (
                        <span className="text-xs text-amber-400">+{reading.cards.length - 3} more</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
          <Zap className="text-amber-500" size={40} />
          🔮 Sacred Tarot Oracle Pro
        </h1>
        <p className="text-purple-200 text-lg">
          Complete 78-card deck • Advanced spreads • Divine spiritual guidance
        </p>
      </div>

      <Card className="overflow-hidden border-2 border-amber-300/50 shadow-2xl bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Zap size={28} />
            Divine Tarot Wisdom Pro
            <div className="ml-auto flex gap-2">
              <Button
                onClick={loadReadingHistory}
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <History size={16} className="mr-2" />
                History
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Question and Spread Selection */}
            {!tarotReading && (
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-amber-200 mb-4">
                    🙏 Enter Your Sacred Question
                  </label>
                  <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask the divine for guidance... (e.g., 'What guidance do I need for my spiritual path?', 'How can I align with my highest purpose?')"
                    className="w-full bg-white/10 border-2 border-amber-400/50 text-white placeholder-amber-300/70 focus:border-amber-400 focus:ring-amber-400 min-h-[120px] text-lg"
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
                    <SelectContent className="bg-gray-800 border-amber-400">
                      {Object.entries(spreadConfigurations).map(([key, spread]) => (
                        <SelectItem key={key} value={key} className="text-white hover:bg-amber-600/20">
                          <div>
                            <div className="font-semibold">{spread.name}</div>
                            <div className="text-sm opacity-80">{spread.description}</div>
                            <div className="text-xs text-amber-400">{spread.positions.length} cards</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Current Spread Preview */}
                <div className="bg-white/10 rounded-lg p-4 max-w-lg mx-auto">
                  <h3 className="text-amber-200 font-semibold mb-2">
                    {spreadConfigurations[selectedSpread].name}
                  </h3>
                  <p className="text-amber-300 text-sm mb-3">
                    {spreadConfigurations[selectedSpread].description}
                  </p>
                  <div className="text-xs text-amber-400">
                    <strong>Positions:</strong> {spreadConfigurations[selectedSpread].positions.join(' • ')}
                  </div>
                </div>

                {/* Tarot Deck Animation */}
                <div className="text-center space-y-6">
                  <div className="flex justify-center gap-4 flex-wrap">
                    {Array.from({ length: Math.min(spreadConfigurations[selectedSpread].positions.length, 7) }, (_, index) => (
                      <div
                        key={index}
                        className={`w-16 h-24 md:w-20 md:h-32 bg-gradient-to-br from-purple-800 to-indigo-900 border-2 border-amber-400 rounded-xl flex items-center justify-center text-2xl md:text-3xl transform transition-all duration-1000 ${
                          isDrawing ? 'animate-pulse scale-110' : 'hover:scale-105'
                        }`}
                        style={{
                          animationDelay: `${index * 0.3}s`,
                        }}
                      >
                        🔮
                      </div>
                    ))}
                    {spreadConfigurations[selectedSpread].positions.length > 7 && (
                      <div className="w-16 h-24 md:w-20 md:h-32 flex items-center justify-center text-amber-400 text-sm">
                        +{spreadConfigurations[selectedSpread].positions.length - 7} more
                      </div>
                    )}
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
                    <div className="space-y-2">
                      <p className="text-amber-300 text-lg animate-pulse">
                        🌟 The sacred deck is being shuffled by divine hands...
                      </p>
                      <p className="text-amber-400 text-sm">
                        ✨ Your spiritual guides are selecting the perfect cards for your journey
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tarot Reading Results */}
            {tarotReading && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 rounded-2xl p-6 border border-amber-300/30">
                  <h3 className="text-2xl font-bold text-amber-200 mb-4">
                    ✨ Your Divine Reading
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-amber-100 text-lg">
                        <strong>Sacred Question:</strong> {tarotReading.question}
                      </p>
                    </div>
                    <div>
                      <p className="text-amber-300">
                        <strong>Spread:</strong> {tarotReading.spreadName}
                      </p>
                      <p className="text-amber-400 text-sm">
                        <strong>Date:</strong> {new Date(tarotReading.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tarotReading.cards.map((card, index) => (
                      <div
                        key={`${card.id}-${index}`}
                        className="bg-white/10 rounded-xl p-6 text-center cursor-pointer transition-all hover:scale-105 hover:bg-white/15 border border-amber-400/30"
                        onClick={() => readCardAloud(card)}
                      >
                        <div className="text-5xl mb-4">
                          {card.isReversed ? '🔄' : '🌟'}
                        </div>
                        <h4 className="font-bold text-lg text-amber-200 mb-2">
                          {card.position}
                        </h4>
                        <h5 className="font-semibold text-amber-100 mb-2">
                          {card.name}
                        </h5>
                        {card.isReversed && (
                          <div className="text-red-300 text-sm mb-2">🔄 Reversed - Shadow Wisdom</div>
                        )}
                        <p className="text-amber-100 text-sm mb-3">
                          <strong>Divine Meaning:</strong> {card.isReversed ? card.reversed : card.meaning}
                        </p>
                        <p className="text-amber-200 text-xs mb-4 italic">
                          {card.spiritualMessage}
                        </p>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 border-amber-400 text-amber-200 hover:bg-amber-600/20"
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

                  <div className="mt-8 space-y-6">
                    <div className="bg-white/10 rounded-lg p-6">
                      <h4 className="font-semibold text-amber-200 mb-3 text-xl">🌟 Divine Overall Message</h4>
                      <p className="text-amber-100 leading-relaxed">{tarotReading.overallMessage}</p>
                    </div>

                    <div className="bg-white/10 rounded-lg p-6">
                      <h4 className="font-semibold text-amber-200 mb-3 text-xl">🙏 Sacred Spiritual Guidance</h4>
                      <p className="text-amber-100 leading-relaxed">{tarotReading.spiritualGuidance}</p>
                    </div>

                    <div className="bg-white/10 rounded-lg p-6">
                      <h4 className="font-semibold text-amber-200 mb-3 text-xl">⚡ Divine Action Steps</h4>
                      <ul className="text-amber-100 space-y-2">
                        {tarotReading.actionSteps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-amber-400 mt-1">✨</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/10 rounded-lg p-6">
                      <h4 className="font-semibold text-amber-200 mb-3 text-xl">🧘 Sacred Meditation Guidance</h4>
                      <p className="text-amber-100 leading-relaxed italic">{tarotReading.meditation}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4 flex-wrap">
                  <Button
                    onClick={saveReading}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3"
                  >
                    <Save size={20} className="mr-2" />
                    💾 Save to Spiritual Journal
                  </Button>
                  <Button
                    onClick={newReading}
                    variant="outline"
                    className="border-amber-400 text-amber-200 hover:bg-amber-600/20 px-6 py-3"
                  >
                    <RefreshCw size={20} className="mr-2" />
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
        <p>✨ Advanced spreads: Celtic Cross, Chakra Alignment, Love Guidance, Divine Purpose</p>
        <p>🔮 AI-enhanced analysis for deeper divine insights and spiritual guidance</p>
        <p>📚 Reading history and spiritual journal for tracking your divine journey</p>
        <p>🙏 Trust the sacred messages you receive - they come from the divine realm through ancient wisdom</p>
      </div>
    </div>
  );
};
