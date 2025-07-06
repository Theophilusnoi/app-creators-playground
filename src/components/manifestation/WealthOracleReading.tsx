
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Eye, Shuffle, BookOpen, Star, Heart, 
  TrendingUp, AlertCircle, CheckCircle, Bookmark
} from 'lucide-react';

interface OracleCard {
  id: string;
  name: string;
  image: string;
  keywords: string[];
  upright_meaning: string;
  reversed_meaning: string;
  financial_guidance: string;
  action_advice: string;
}

interface Reading {
  id: string;
  question: string;
  cards_drawn: OracleCard[];
  interpretation: string;
  reading_type: string;
  created_at: string;
  is_bookmarked: boolean;
}

const ORACLE_CARDS: OracleCard[] = [
  {
    id: 'abundance',
    name: 'Abundance',
    image: '💰',
    keywords: ['prosperity', 'wealth', 'overflow', 'blessing'],
    upright_meaning: 'A time of great financial prosperity and abundance is coming your way',
    reversed_meaning: 'Blocks to abundance - examine your beliefs about deserving wealth',
    financial_guidance: 'Multiple income streams will open up. Stay open to unexpected opportunities.',
    action_advice: 'Invest in yourself and your skills. Network with successful people.'
  },
  {
    id: 'opportunity',
    name: 'Golden Opportunity',
    image: '🌟',
    keywords: ['chance', 'timing', 'breakthrough', 'fortune'],
    upright_meaning: 'A golden opportunity is presenting itself - act quickly',
    reversed_meaning: 'Missed opportunities - stay more alert to chances around you',
    financial_guidance: 'Perfect timing for investments or business ventures. Trust your instincts.',
    action_advice: 'Take calculated risks. Don\'t let fear hold you back from prosperity.'
  },
  {
    id: 'wisdom',
    name: 'Financial Wisdom',
    image: '🦉',
    keywords: ['knowledge', 'strategy', 'planning', 'insight'],
    upright_meaning: 'Your financial wisdom is growing - trust your judgment',
    reversed_meaning: 'Seek advice before making major financial decisions',
    financial_guidance: 'Your intuition about money matters is sharp right now. Follow it.',
    action_advice: 'Create a solid financial plan. Educate yourself about investments.'
  },
  {
    id: 'transformation',
    name: 'Financial Transformation',
    image: '🦋',
    keywords: ['change', 'growth', 'evolution', 'breakthrough'],
    upright_meaning: 'Major positive changes in your financial situation are unfolding',
    reversed_meaning: 'Resistance to necessary financial changes is holding you back',
    financial_guidance: 'Your relationship with money is transforming for the better.',
    action_advice: 'Embrace new ways of earning and managing money. Release old patterns.'
  },
  {
    id: 'partnership',
    name: 'Profitable Partnership',
    image: '🤝',
    keywords: ['collaboration', 'teamwork', 'alliance', 'support'],
    upright_meaning: 'Beneficial partnerships will boost your financial success',
    reversed_meaning: 'Be cautious of financial partnerships - review terms carefully',
    financial_guidance: 'Joint ventures and collaborations will be highly profitable.',
    action_advice: 'Seek out strategic partnerships. Build your professional network.'
  },
  {
    id: 'creativity',
    name: 'Creative Wealth',
    image: '🎨',
    keywords: ['innovation', 'artistic', 'unique', 'expression'],
    upright_meaning: 'Your creative talents are your pathway to wealth',
    reversed_meaning: 'Don\'t undervalue your creative abilities - they\'re worth more than you think',
    financial_guidance: 'Monetizing your creativity will bring surprising financial rewards.',
    action_advice: 'Invest in developing your creative skills. Find unique ways to add value.'
  },
  {
    id: 'patience',
    name: 'Patient Investment',
    image: '🌱',
    keywords: ['growth', 'time', 'nurturing', 'development'],
    upright_meaning: 'Slow and steady investments will yield excellent returns',
    reversed_meaning: 'Impatience with investments may cause you to miss out on gains',
    financial_guidance: 'Long-term thinking will serve your wealth-building better than quick schemes.',
    action_advice: 'Focus on sustainable growth. Avoid get-rich-quick schemes.'
  },
  {
    id: 'generosity',
    name: 'Generous Return',
    image: '🎁',
    keywords: ['giving', 'receiving', 'circulation', 'karma'],
    upright_meaning: 'Your generosity creates a cycle of abundance that returns to you multiplied',
    reversed_meaning: 'Fear of giving is blocking the flow of abundance to you',
    financial_guidance: 'What you give comes back to you multiplied. Be generous wisely.',
    action_advice: 'Practice strategic generosity. Help others succeed financially.'
  },
  {
    id: 'clarity',
    name: 'Financial Clarity',
    image: '🔍',
    keywords: ['vision', 'understanding', 'focus', 'direction'],
    upright_meaning: 'Clear vision about your financial path is emerging',
    reversed_meaning: 'Confusion about money matters - seek clarity before acting',
    financial_guidance: 'Your financial goals are becoming crystal clear. Follow this vision.',
    action_advice: 'Write down your financial goals clearly. Create specific action plans.'
  },
  {
    id: 'breakthrough',
    name: 'Financial Breakthrough',
    image: '⚡',
    keywords: ['sudden', 'powerful', 'breakthrough', 'success'],
    upright_meaning: 'A sudden financial breakthrough is about to occur',
    reversed_meaning: 'Blocks are preventing your breakthrough - identify and clear them',
    financial_guidance: 'Expect unexpected windfalls or sudden improvements in income.',
    action_advice: 'Stay alert for breakthrough opportunities. Be ready to act quickly.'
  }
];

const READING_TYPES = [
  { id: 'general', name: 'General Wealth Guidance', cards: 1 },
  { id: 'three_card', name: 'Past-Present-Future', cards: 3 },
  { id: 'decision', name: 'Financial Decision', cards: 2 },
  { id: 'career', name: 'Career & Money', cards: 3 },
  { id: 'investment', name: 'Investment Guidance', cards: 2 }
];

export const WealthOracleReading: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [selectedType, setSelectedType] = useState('general');
  const [currentReading, setCurrentReading] = useState<any>(null);
  const [drawnCards, setDrawnCards] = useState<OracleCard[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [savedReadings, setSavedReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSavedReadings();
  }, []);

  const fetchSavedReadings = async () => {
    try {
      const { data, error } = await supabase
        .from('oracle_readings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setSavedReadings(data || []);
    } catch (error) {
      console.error('Error fetching readings:', error);
    }
  };

  const drawCards = async () => {
    const readingType = READING_TYPES.find(t => t.id === selectedType);
    if (!readingType) return;

    setIsDrawing(true);
    
    // Simulate card drawing animation
    setTimeout(() => {
      const shuffledCards = [...ORACLE_CARDS].sort(() => Math.random() - 0.5);
      const selectedCards = shuffledCards.slice(0, readingType.cards);
      
      setDrawnCards(selectedCards);
      generateInterpretation(selectedCards);
      setIsDrawing(false);
    }, 2000);
  };

  const generateInterpretation = (cards: OracleCard[]) => {
    let interpretation = '';
    
    if (selectedType === 'general') {
      interpretation = `The ${cards[0].name} card reveals: ${cards[0].upright_meaning}. ${cards[0].financial_guidance} ${cards[0].action_advice}`;
    } else if (selectedType === 'three_card') {
      interpretation = `Past influences: ${cards[0].name} - ${cards[0].upright_meaning}. Present situation: ${cards[1].name} - ${cards[1].upright_meaning}. Future potential: ${cards[2].name} - ${cards[2].upright_meaning}.`;
    } else if (selectedType === 'decision') {
      interpretation = `Option A (${cards[0].name}): ${cards[0].financial_guidance} Option B (${cards[1].name}): ${cards[1].financial_guidance}`;
    } else {
      interpretation = cards.map(card => `${card.name}: ${card.upright_meaning}`).join(' ');
    }

    setCurrentReading({
      question: question || `${READING_TYPES.find(t => t.id === selectedType)?.name} Reading`,
      cards_drawn: cards,
      interpretation,
      reading_type: selectedType
    });
  };

  const saveReading = async () => {
    if (!currentReading) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('oracle_readings')
        .insert({
          question: currentReading.question,
          cards_drawn: currentReading.cards_drawn,
          interpretation: currentReading.interpretation,
          reading_type: currentReading.reading_type
        });

      if (error) throw error;

      toast({
        title: "🔮 Reading Saved!",
        description: "Your oracle reading has been saved to your collection"
      });

      fetchSavedReadings();
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

  const toggleBookmark = async (readingId: string, isBookmarked: boolean) => {
    try {
      const { error } = await supabase
        .from('oracle_readings')
        .update({ is_bookmarked: !isBookmarked })
        .eq('id', readingId);

      if (error) throw error;
      fetchSavedReadings();
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Reading Setup */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-200 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Wealth Oracle Reading
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {READING_TYPES.map(type => (
                <Button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  variant={selectedType === type.id ? 'default' : 'outline'}
                  size="sm"
                  className="text-xs"
                >
                  {type.name}
                  <span className="ml-1 text-xs opacity-70">({type.cards} card{type.cards > 1 ? 's' : ''})</span>
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={drawCards}
            disabled={isDrawing}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            {isDrawing ? 'Drawing Cards...' : 'Draw Oracle Cards'}
          </Button>
        </CardContent>
      </Card>

      {/* Card Drawing Animation */}
      {isDrawing && (
        <Card className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border-yellow-500/30">
          <CardContent className="p-8 text-center">
            <div className="text-6xl animate-pulse mb-4">🔮</div>
            <h3 className="text-2xl font-bold text-yellow-200 mb-2">
              Consulting the Oracle...
            </h3>
            <p className="text-yellow-300">
              The cards are being drawn for your reading
            </p>
          </CardContent>
        </Card>
      )}

      {/* Current Reading */}
      {currentReading && !isDrawing && (
        <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Your Reading
              </div>
              <Button
                onClick={saveReading}
                disabled={loading}
                size="sm"
                className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-200"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Save Reading
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-blue-200 font-medium mb-2">Question:</h4>
              <p className="text-blue-300 italic">"{currentReading.question}"</p>
            </div>

            {/* Drawn Cards */}
            <div>
              <h4 className="text-blue-200 font-medium mb-3">Cards Drawn:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {drawnCards.map((card, index) => (
                  <div key={card.id} className="bg-black/20 p-4 rounded border border-blue-500/20 text-center">
                    <div className="text-4xl mb-2">{card.image}</div>
                    <h5 className="text-blue-200 font-medium mb-2">{card.name}</h5>
                    <div className="flex flex-wrap gap-1 justify-center mb-2">
                      {card.keywords.map(keyword => (
                        <Badge key={keyword} variant="outline" className="text-xs border-blue-500/30 text-blue-300">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-blue-300 text-sm">{card.upright_meaning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interpretation */}
            <div className="bg-black/20 p-6 rounded border border-blue-500/20">
              <h4 className="text-blue-200 font-medium mb-3 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Oracle's Guidance:
              </h4>
              <p className="text-blue-100 leading-relaxed">{currentReading.interpretation}</p>
            </div>

            {/* Action Advice */}
            <div className="bg-green-900/20 p-4 rounded border border-green-500/20">
              <h4 className="text-green-200 font-medium mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Recommended Actions:
              </h4>
              <ul className="space-y-1">
                {drawnCards.map((card, index) => (
                  <li key={index} className="text-green-300 text-sm">
                    • {card.action_advice}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Saved Readings */}
      <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-200 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Your Oracle Readings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {savedReadings.length === 0 ? (
            <p className="text-green-300 text-center py-8">No readings saved yet. Draw your first oracle reading above!</p>
          ) : (
            <div className="space-y-4">
              {savedReadings.map((reading) => (
                <div key={reading.id} className="bg-black/20 p-4 rounded border border-green-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-green-200 font-medium">{reading.question}</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="border-green-500/30 text-green-300 text-xs">
                          {reading.reading_type.replace('_', ' ')}
                        </Badge>
                        <span className="text-green-400 text-xs">
                          {new Date(reading.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleBookmark(reading.id, reading.is_bookmarked)}
                      className={reading.is_bookmarked ? 'text-yellow-400' : 'text-gray-400'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-green-300 text-sm line-clamp-3">{reading.interpretation}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
