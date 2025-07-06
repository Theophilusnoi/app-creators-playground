import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Sparkles, Shuffle, Star, BookOpen, Calendar, 
  Eye, Heart, Zap, Gift
} from 'lucide-react';

interface OracleCard {
  id: number;
  name: string;
  meaning: string;
  reversed_meaning: string;
  category: string;
  imagery: string;
  is_reversed: boolean;
}

interface Reading {
  id: string;
  question?: string;
  cards_drawn: OracleCard[];
  interpretation: string;
  reading_type: string;
  accuracy_rating?: number;
  follow_up_actions: string[];
  created_at: string;
  is_bookmarked: boolean;
}

const ORACLE_CARDS: OracleCard[] = [
  {
    id: 1,
    name: "Golden Opportunity",
    meaning: "A new financial opportunity is approaching. Be ready to seize it with confidence.",
    reversed_meaning: "Missed opportunities or hesitation blocking your path to wealth.",
    category: "opportunity",
    imagery: "🌟",
    is_reversed: false
  },
  {
    id: 2,
    name: "Abundance Flow",
    meaning: "Money and resources are flowing freely into your life. Embrace gratitude.",
    reversed_meaning: "Blocked abundance, need to clear limiting beliefs about money.",
    category: "abundance",
    imagery: "💰",
    is_reversed: false
  },
  {
    id: 3,
    name: "Investment Wisdom",
    meaning: "Your investment decisions are guided by divine wisdom. Trust your intuition.",
    reversed_meaning: "Poor investment choices ahead. Seek guidance before proceeding.",
    category: "investment",
    imagery: "📈",
    is_reversed: false
  },
  {
    id: 4,
    name: "Career Elevation",
    meaning: "Professional growth and recognition are coming. Your talents will be rewarded.",
    reversed_meaning: "Career stagnation or workplace challenges requiring patience.",
    category: "career",
    imagery: "🏆",
    is_reversed: false
  },
  {
    id: 5,
    name: "Debt Release",
    meaning: "Financial burdens are lifting. A path to debt freedom is opening.",
    reversed_meaning: "Debt increasing or difficulty finding resolution. Seek professional help.",
    category: "debt",
    imagery: "🔓",
    is_reversed: false
  },
  {
    id: 6,
    name: "Prosperity Mindset",
    meaning: "Your thoughts are aligning with wealth consciousness. Keep affirming abundance.",
    reversed_meaning: "Negative money beliefs are sabotaging your success. Clear mental blocks.",
    category: "mindset",
    imagery: "🧠",
    is_reversed: false
  }
];

const READING_TYPES = [
  { id: 'general', name: 'General Wealth Reading', description: '3-card spread for overall financial guidance' },
  { id: 'career', name: 'Career & Income', description: 'Focus on professional growth and earning potential' },
  { id: 'investment', name: 'Investment Guidance', description: 'Insights for financial decisions and investments' },
  { id: 'business', name: 'Business Success', description: 'Guidance for entrepreneurs and business owners' }
];

export const WealthOracleReading: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [selectedReadingType, setSelectedReadingType] = useState('general');
  const [drawnCards, setDrawnCards] = useState<OracleCard[]>([]);
  const [interpretation, setInterpretation] = useState('');
  const [isReading, setIsReading] = useState(false);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    getCurrentUser();
    fetchReadings();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUser(user.id);
    }
  };

  const fetchReadings = async () => {
    try {
      const { data, error } = await supabase
        .from('oracle_readings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      // Transform the data to handle JSONB fields properly with proper type casting
      const transformedData = (data || []).map(reading => ({
        ...reading,
        cards_drawn: Array.isArray(reading.cards_drawn) ? reading.cards_drawn as unknown as OracleCard[] : [] as OracleCard[],
        follow_up_actions: Array.isArray(reading.follow_up_actions) ? reading.follow_up_actions as unknown as string[] : [] as string[],
        question: reading.question || undefined,
        accuracy_rating: reading.accuracy_rating || undefined,
        is_bookmarked: reading.is_bookmarked || false,
        reading_type: reading.reading_type || 'general'
      })) as Reading[];
      
      setReadings(transformedData);
    } catch (error) {
      console.error('Error fetching readings:', error);
    }
  };

  const drawCards = () => {
    setIsReading(true);
    setDrawnCards([]);
    setInterpretation('');

    // Simulate card drawing animation
    setTimeout(() => {
      const numberOfCards = selectedReadingType === 'general' ? 3 : 1;
      const shuffled = [...ORACLE_CARDS].sort(() => Math.random() - 0.5);
      const drawn = shuffled.slice(0, numberOfCards).map(card => ({
        ...card,
        is_reversed: Math.random() < 0.3 // 30% chance of reversed card
      }));
      
      setDrawnCards(drawn);
      generateInterpretation(drawn);
      setIsReading(false);
    }, 2000);
  };

  const generateInterpretation = (cards: OracleCard[]) => {
    let baseInterpretation = "";
    
    if (selectedReadingType === 'general') {
      baseInterpretation = `Your three-card wealth reading reveals: `;
      cards.forEach((card, index) => {
        const meaning = card.is_reversed ? card.reversed_meaning : card.meaning;
        const position = index === 0 ? "Past influences" : index === 1 ? "Present situation" : "Future potential";
        baseInterpretation += `${position}: ${card.name} - ${meaning}. `;
      });
    } else {
      const card = cards[0];
      const meaning = card.is_reversed ? card.reversed_meaning : card.meaning;
      baseInterpretation = `For your ${selectedReadingType} question, the oracle reveals: ${card.name} - ${meaning}`;
    }

    if (question.trim()) {
      baseInterpretation += ` This directly relates to your question about "${question}" by suggesting that the universe is preparing to align circumstances in your favor.`;
    }

    baseInterpretation += " Remember, you have the power to manifest your desired financial reality through focused intention and aligned action.";

    setInterpretation(baseInterpretation);
  };

  const saveReading = async () => {
    if (!drawnCards.length || !currentUser) {
      toast({
        title: "Cannot save reading",
        description: "Please complete a reading first and ensure you're logged in",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('oracle_readings')
        .insert({
          question: question || undefined,
          cards_drawn: drawnCards as any,
          interpretation: interpretation,
          reading_type: selectedReadingType,
          user_id: currentUser
        });

      if (error) throw error;

      toast({
        title: "🔮 Reading Saved!",
        description: "Your oracle reading has been saved to your collection"
      });

      fetchReadings();
    } catch (error) {
      console.error('Error saving reading:', error);
      toast({
        title: "Error",
        description: "Failed to save reading",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const rateReading = async (readingId: string, rating: number) => {
    try {
      const { error } = await supabase
        .from('oracle_readings')
        .update({ accuracy_rating: rating })
        .eq('id', readingId);

      if (error) throw error;
      fetchReadings();
      
      toast({
        title: "Thank you for your feedback!",
        description: "Your rating helps improve the oracle's accuracy"
      });
    } catch (error) {
      console.error('Error rating reading:', error);
    }
  };

  const toggleBookmark = async (readingId: string, isBookmarked: boolean) => {
    try {
      const { error } = await supabase
        .from('oracle_readings')
        .update({ is_bookmarked: !isBookmarked })
        .eq('id', readingId);

      if (error) throw error;
      fetchReadings();
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Oracle Reading Interface */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-200 flex items-center gap-2 justify-center">
            <Sparkles className="w-6 h-6" />
            Wealth Oracle Reading
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-purple-200 text-sm font-medium mb-2 block">
                Your Question (Optional)
              </label>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What do I need to know about my financial future?"
                className="bg-black/20 border-purple-500/30 text-purple-100"
              />
            </div>
            
            <div>
              <label className="text-purple-200 text-sm font-medium mb-2 block">
                Reading Type
              </label>
              <select
                value={selectedReadingType}
                onChange={(e) => setSelectedReadingType(e.target.value)}
                className="w-full bg-black/20 border border-purple-500/30 text-purple-100 rounded-md px-3 py-2"
              >
                {READING_TYPES.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={drawCards}
              disabled={isReading}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
            >
              <Shuffle className="w-5 h-5 mr-2" />
              {isReading ? 'Drawing Cards...' : 'Draw Oracle Cards'}
            </Button>
          </div>

          {/* Card Display */}
          {isReading && (
            <div className="text-center py-8">
              <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-purple-300">The oracle is revealing your cards...</p>
            </div>
          )}

          {drawnCards.length > 0 && !isReading && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {drawnCards.map((card, index) => (
                  <div key={card.id} className="bg-black/30 p-4 rounded-lg border border-purple-500/20 text-center">
                    <div className="text-4xl mb-2">{card.imagery}</div>
                    <h3 className="text-purple-200 font-medium mb-2">
                      {card.name} {card.is_reversed && '(Reversed)'}
                    </h3>
                    <p className="text-purple-300 text-sm">
                      {card.is_reversed ? card.reversed_meaning : card.meaning}
                    </p>
                    <Badge variant="outline" className="mt-2 border-purple-500/30 text-purple-300">
                      {card.category}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Interpretation */}
              <div className="bg-black/30 p-6 rounded-lg border border-purple-500/20">
                <h4 className="text-purple-200 font-medium mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Oracle's Interpretation
                </h4>
                <p className="text-purple-100 leading-relaxed">{interpretation}</p>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={saveReading}
                  disabled={loading}
                  className="bg-green-600/20 hover:bg-green-600/40 text-green-200 border border-green-500/30"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Reading'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reading History */}
      <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-200 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Your Reading History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {readings.length === 0 ? (
            <p className="text-blue-300 text-center py-8">No readings saved yet. Complete your first oracle reading above!</p>
          ) : (
            <div className="space-y-4">
              {readings.map((reading) => (
                <div key={reading.id} className="bg-black/20 p-4 rounded border border-blue-500/20">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex gap-2 mb-2">
                        <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                          {READING_TYPES.find(t => t.id === reading.reading_type)?.name || reading.reading_type}
                        </Badge>
                        <span className="text-blue-400 text-sm">
                          {new Date(reading.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {reading.question && (
                        <p className="text-blue-200 font-medium mb-2">Q: {reading.question}</p>
                      )}
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleBookmark(reading.id, reading.is_bookmarked)}
                      className={reading.is_bookmarked ? 'text-yellow-400' : 'text-gray-400'}
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-blue-200 mb-3 text-sm">{reading.interpretation}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-blue-400">
                      {reading.cards_drawn.length} card{reading.cards_drawn.length > 1 ? 's' : ''} drawn
                    </div>
                    
                    {!reading.accuracy_rating && (
                      <div className="flex gap-1">
                        <span className="text-xs text-blue-400 mr-2">Rate accuracy:</span>
                        {[1, 2, 3, 4, 5].map(rating => (
                          <Button
                            key={rating}
                            size="sm"
                            variant="ghost"
                            onClick={() => rateReading(reading.id, rating)}
                            className="text-yellow-400 hover:text-yellow-300 p-1"
                          >
                            <Star className="w-3 h-3" />
                          </Button>
                        ))}
                      </div>
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
};
