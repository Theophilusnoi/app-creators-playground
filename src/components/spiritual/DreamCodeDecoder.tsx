import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Moon, Star, Eye, Heart, Zap } from 'lucide-react';

interface DreamEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  symbols: string[];
  interpretation: string;
  tarotConnection: string;
  chakraConnection: string;
  angelMessage: string;
  emotions: string[];
}

const DreamCodeDecoder: React.FC = () => {
  const [dreamText, setDreamText] = useState('');
  const [dreamTitle, setDreamTitle] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<DreamEntry | null>(null);
  const [dreamHistory, setDreamHistory] = useState<DreamEntry[]>([
    {
      id: '1',
      date: '2024-03-15',
      title: 'Flying Over Water',
      content: 'I was flying over a vast ocean, feeling completely free. Golden light surrounded me.',
      symbols: ['Flying', 'Water', 'Golden Light', 'Freedom'],
      interpretation: 'This dream represents your spiritual ascension and emotional liberation. The ocean symbolizes your subconscious depths, while flying indicates your soul\'s desire to transcend earthly limitations.',
      tarotConnection: 'The Star - Hope, guidance, and spiritual connection',
      chakraConnection: 'Heart Chakra - Opening to divine love and freedom',
      angelMessage: 'Archangel Michael is guiding you toward spiritual freedom and protection',
      emotions: ['Freedom', 'Joy', 'Transcendence']
    }
  ]);

  const dreamSymbolDatabase = {
    'water': {
      meaning: 'Emotions, subconscious, purification, life force',
      chakra: 'Sacral Chakra',
      tarot: 'Cups Suit',
      angel: 'Archangel Gabriel'
    },
    'flying': {
      meaning: 'Spiritual ascension, freedom, transcendence',
      chakra: 'Crown Chakra',
      tarot: 'The Star, The Fool',
      angel: 'Archangel Raphael'
    },
    'light': {
      meaning: 'Divine guidance, enlightenment, spiritual awakening',
      chakra: 'Crown Chakra',
      tarot: 'The Sun',
      angel: 'Archangel Uriel'
    },
    'animals': {
      meaning: 'Instincts, spirit guides, power animals',
      chakra: 'Root Chakra',
      tarot: 'Strength, The Hermit',
      angel: 'Archangel Raguel'
    },
    'death': {
      meaning: 'Transformation, rebirth, ending of cycles',
      chakra: 'Root Chakra',
      tarot: 'Death card, The Tower',
      angel: 'Archangel Azrael'
    }
  };

  const analyzeDream = async () => {
    if (!dreamText.trim() || !dreamTitle.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const foundSymbols = Object.keys(dreamSymbolDatabase).filter(symbol => 
        dreamText.toLowerCase().includes(symbol)
      );
      
      const analysis: DreamEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        title: dreamTitle,
        content: dreamText,
        symbols: foundSymbols.length > 0 ? foundSymbols : ['Unknown'],
        interpretation: generateInterpretation(dreamText, foundSymbols),
        tarotConnection: generateTarotConnection(foundSymbols),
        chakraConnection: generateChakraConnection(foundSymbols),
        angelMessage: generateAngelMessage(foundSymbols),
        emotions: extractEmotions(dreamText)
      };
      
      setCurrentAnalysis(analysis);
      setDreamHistory(prev => [analysis, ...prev]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const generateInterpretation = (text: string, symbols: string[]): string => {
    const interpretations = [
      'This dream reflects your soul\'s journey toward spiritual awakening and inner transformation.',
      'Your subconscious is processing deep emotional healing and spiritual growth.',
      'This vision reveals your connection to divine guidance and higher consciousness.',
      'Your dream indicates a powerful shift in your spiritual awareness and life path.',
      'This sacred dream shows your soul preparing for a new phase of spiritual evolution.'
    ];
    
    return interpretations[Math.floor(Math.random() * interpretations.length)];
  };

  const generateTarotConnection = (symbols: string[]): string => {
    const tarotConnections = [
      'The High Priestess - Deep intuitive wisdom is emerging',
      'The Star - Divine guidance and hope illuminate your path',
      'The Moon - Trust your intuition through uncertain times',
      'The Hermit - Inner wisdom guides your spiritual journey',
      'The World - Completion of a spiritual cycle approaches'
    ];
    
    return tarotConnections[Math.floor(Math.random() * tarotConnections.length)];
  };

  const generateChakraConnection = (symbols: string[]): string => {
    const chakraConnections = [
      'Third Eye Chakra - Psychic abilities and intuition are awakening',
      'Heart Chakra - Love and compassion are expanding in your life',
      'Crown Chakra - Divine connection and spiritual awareness grow',
      'Throat Chakra - Your authentic voice seeks expression',
      'Solar Plexus - Personal power and confidence are emerging'
    ];
    
    return chakraConnections[Math.floor(Math.random() * chakraConnections.length)];
  };

  const generateAngelMessage = (symbols: string[]): string => {
    const angelMessages = [
      'Archangel Gabriel whispers: "Trust the divine messages coming through your dreams"',
      'Archangel Michael declares: "You are protected on your spiritual journey"',
      'Archangel Raphael heals: "Allow divine healing to flow through your dream visions"',
      'Archangel Uriel illuminates: "Divine wisdom is being revealed to you"',
      'Archangel Metatron guides: "Your soul is ascending to higher consciousness"'
    ];
    
    return angelMessages[Math.floor(Math.random() * angelMessages.length)];
  };

  const extractEmotions = (text: string): string[] => {
    const emotionKeywords = {
      'fear': ['scared', 'afraid', 'terrified', 'anxious'],
      'joy': ['happy', 'joyful', 'blissful', 'peaceful'],
      'love': ['loving', 'compassionate', 'warm', 'connected'],
      'power': ['strong', 'powerful', 'confident', 'capable'],
      'mystery': ['mysterious', 'unknown', 'hidden', 'secret']
    };
    
    const foundEmotions: string[] = [];
    Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
      if (keywords.some(keyword => text.toLowerCase().includes(keyword))) {
        foundEmotions.push(emotion);
      }
    });
    
    return foundEmotions.length > 0 ? foundEmotions : ['Neutral'];
  };

  const saveDream = () => {
    setDreamText('');
    setDreamTitle('');
    setCurrentAnalysis(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <Card className="border-2 border-purple-300/50 shadow-2xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
          <CardTitle className="text-center text-2xl flex items-center justify-center gap-3">
            <Moon className="w-8 h-8" />
            🌙 Dream Code Decoder
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <p className="text-center text-purple-200 text-lg">
            Decode the sacred messages hidden in your dreams through ancient wisdom and divine insight
          </p>
        </CardContent>
      </Card>

      {/* Dream Input */}
      <Card className="border-2 border-blue-300/50 shadow-2xl bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
          <CardTitle className="text-xl">✨ Record Your Dream</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block text-blue-200 font-semibold mb-2">Dream Title</label>
            <Input
              value={dreamTitle}
              onChange={(e) => setDreamTitle(e.target.value)}
              placeholder="Give your dream a meaningful title..."
              className="bg-white/10 border-blue-400/50 text-white placeholder-blue-300/70"
            />
          </div>
          
          <div>
            <label className="block text-blue-200 font-semibold mb-2">Dream Description</label>
            <Textarea
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
              placeholder="Describe your dream in detail... Include symbols, emotions, colors, people, places, and any significant elements you remember."
              className="bg-white/10 border-blue-400/50 text-white placeholder-blue-300/70 min-h-[150px]"
            />
          </div>
          
          <Button
            onClick={analyzeDream}
            disabled={isAnalyzing || !dreamText.trim() || !dreamTitle.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 py-3 text-lg"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <Star className="w-5 h-5 animate-spin" />
                Decoding Divine Messages...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Decode Dream Wisdom
              </span>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Dream Analysis */}
      {currentAnalysis && (
        <Card className="border-2 border-amber-300/50 shadow-2xl bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
            <CardTitle className="text-xl">🔮 Divine Dream Analysis</CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-amber-200 mb-2">{currentAnalysis.title}</h3>
              <p className="text-amber-300 text-sm">Dreamed on {currentAnalysis.date}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Symbols */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-amber-200 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Sacred Symbols
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentAnalysis.symbols.map((symbol, index) => (
                    <Badge key={index} className="bg-amber-600/20 text-amber-300 border border-amber-400/30">
                      {symbol}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Emotions */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-amber-200 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Emotional Essence
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentAnalysis.emotions.map((emotion, index) => (
                    <Badge key={index} className="bg-pink-600/20 text-pink-300 border border-pink-400/30">
                      {emotion}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Interpretations */}
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">🌟 Spiritual Interpretation</h4>
                <p className="text-amber-100">{currentAnalysis.interpretation}</p>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">🃏 Tarot Connection</h4>
                <p className="text-amber-100">{currentAnalysis.tarotConnection}</p>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">⚡ Chakra Alignment</h4>
                <p className="text-amber-100">{currentAnalysis.chakraConnection}</p>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">👼 Angel Message</h4>
                <p className="text-amber-100 italic">"{currentAnalysis.angelMessage}"</p>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={saveDream}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 px-8"
              >
                Save to Dream Journal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dream History */}
      <Card className="border-2 border-indigo-300/50 shadow-2xl bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
          <CardTitle className="text-xl">📚 Sacred Dream Journal</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            {dreamHistory.map((dream) => (
              <div key={dream.id} className="bg-white/10 rounded-lg p-4 hover:bg-white/15 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-indigo-200">{dream.title}</h4>
                  <span className="text-xs text-indigo-400">{dream.date}</span>
                </div>
                <p className="text-indigo-300 text-sm mb-2 line-clamp-2">{dream.content}</p>
                <div className="flex flex-wrap gap-1">
                  {dream.symbols.slice(0, 3).map((symbol, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-indigo-600/20 text-indigo-300">
                      {symbol}
                    </Badge>
                  ))}
                  {dream.symbols.length > 3 && (
                    <span className="text-xs text-indigo-400">+{dream.symbols.length - 3} more</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DreamCodeDecoder;