
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Eye, Sparkles, Clock, Search, TrendingUp, AlertTriangle } from 'lucide-react';

interface SynchronicityEvent {
  id: string;
  type: string;
  description: string;
  symbols: string[];
  interpretation: string;
  significance: 'low' | 'medium' | 'high';
  timestamp: Date;
  patterns: string[];
}

const synchronicityTypes = [
  { id: 'numbers', name: 'Number Patterns', description: 'Recurring numbers like 11:11, 333, 777' },
  { id: 'animals', name: 'Animal Messengers', description: 'Meaningful animal encounters' },
  { id: 'nature', name: 'Nature Signs', description: 'Weather, celestial, and natural phenomena' },
  { id: 'people', name: 'People & Conversations', description: 'Meaningful encounters and messages' },
  { id: 'objects', name: 'Objects & Symbols', description: 'Recurring objects or symbols' },
  { id: 'dreams', name: 'Dream Connections', description: 'Dreams manifesting in waking life' }
];

const symbolDatabase = {
  numbers: {
    '111': 'New beginnings, manifestation portal opening',
    '222': 'Balance, cooperation, trust the process',
    '333': 'Spiritual guidance, ascended masters present',
    '444': 'Angels surrounding you, divine protection',
    '555': 'Major life changes approaching',
    '777': 'Spiritual awakening, divine wisdom',
    '888': 'Abundance and prosperity flowing',
    '999': 'Completion of a cycle, new chapter beginning'
  },
  animals: {
    'butterfly': 'Transformation, rebirth, soul evolution',
    'owl': 'Wisdom, intuition, seeing through illusions',
    'hawk': 'Higher perspective, spiritual messenger',
    'rabbit': 'Fertility, new opportunities, quick thinking',
    'deer': 'Gentleness, grace, spiritual authority',
    'crow': 'Magic, transformation, divine messages',
    'cat': 'Independence, mystery, psychic abilities',
    'dog': 'Loyalty, protection, unconditional love'
  },
  nature: {
    'rainbow': 'Divine promise, bridge between worlds',
    'lightning': 'Sudden illumination, divine power',
    'wind': 'Change, spirit communication, new direction',
    'rain': 'Cleansing, renewal, emotional release',
    'sunrise': 'New beginnings, hope, spiritual awakening',
    'full moon': 'Culmination, completion, psychic enhancement',
    'clouds': 'Divine messages, spiritual guidance'
  }
} as const;

export const SynchronicityDecoder = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<SynchronicityEvent[]>([]);
  const [newEvent, setNewEvent] = useState({
    type: 'numbers',
    description: '',
    symbols: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [patterns, setPatterns] = useState<string[]>([]);

  const analyzePatterns = () => {
    if (events.length < 2) return [];
    
    const recentEvents = events.slice(-10);
    const detectedPatterns = [];
    
    // Check for recurring symbols
    const symbolCounts: Record<string, number> = {};
    recentEvents.forEach(event => {
      event.symbols.forEach(symbol => {
        symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
      });
    });
    
    Object.entries(symbolCounts).forEach(([symbol, count]) => {
      if (count >= 3) {
        detectedPatterns.push(`Recurring symbol: ${symbol} (${count} times)`);
      }
    });
    
    // Check for timing patterns
    const timePatterns = recentEvents.filter(event => {
      const hour = event.timestamp.getHours();
      return hour === 11 || hour === 3 || hour === 7; // Common spiritual hours
    });
    
    if (timePatterns.length >= 2) {
      detectedPatterns.push('Spiritual timing pattern detected');
    }
    
    return detectedPatterns;
  };

  useEffect(() => {
    const detectedPatterns = analyzePatterns();
    setPatterns(detectedPatterns);
  }, [events]);

  const interpretSynchronicity = (type: string, description: string, symbols: string[]): string => {
    const lowerDesc = description.toLowerCase();
    let interpretation = '';
    
    // Look for known symbols with proper type checking
    symbols.forEach(symbol => {
      const symbolKey = symbol.toLowerCase();
      const typeKey = type as keyof typeof symbolDatabase;
      
      if (symbolDatabase[typeKey] && typeof symbolDatabase[typeKey] === 'object') {
        const symbolMap = symbolDatabase[typeKey] as Record<string, string>;
        if (symbolMap[symbolKey]) {
          interpretation += `${symbol}: ${symbolMap[symbolKey]}. `;
        }
      }
    });
    
    // General interpretations based on type
    if (!interpretation) {
      switch (type) {
        case 'numbers':
          interpretation = 'The universe is sending you numerical codes. Pay attention to the timing and frequency of these numbers appearing.';
          break;
        case 'animals':
          interpretation = 'Animal spirits are bringing you messages. Consider the qualities this animal represents and how they relate to your current life situation.';
          break;
        case 'nature':
          interpretation = 'Nature is speaking to you through signs and omens. These natural phenomena often reflect your inner spiritual state.';
          break;
        case 'people':
          interpretation = 'The universe is orchestrating meaningful encounters. Pay attention to the messages and wisdom being shared.';
          break;
        case 'objects':
          interpretation = 'Physical objects are appearing as spiritual messengers. Consider their symbolic meaning and personal significance.';
          break;
        case 'dreams':
          interpretation = 'Your subconscious is communicating through dreams that manifest in reality. This shows strong psychic sensitivity.';
          break;
        default:
          interpretation = 'The universe is speaking to you through meaningful coincidences. Trust your intuition about their significance.';
      }
    }
    
    return interpretation;
  };

  const getSignificanceLevel = (type: string, symbols: string[]): 'low' | 'medium' | 'high' => {
    // Check if symbols are in our database with proper type checking
    const knownSymbols = symbols.filter(symbol => {
      const symbolKey = symbol.toLowerCase();
      const typeKey = type as keyof typeof symbolDatabase;
      
      if (symbolDatabase[typeKey] && typeof symbolDatabase[typeKey] === 'object') {
        const symbolMap = symbolDatabase[typeKey] as Record<string, string>;
        return symbolMap[symbolKey] !== undefined;
      }
      return false;
    });
    
    if (knownSymbols.length >= 2) return 'high';
    if (knownSymbols.length === 1) return 'medium';
    return 'low';
  };

  const addSynchronicity = () => {
    if (!newEvent.description.trim()) {
      toast({
        title: "Please describe the synchronicity",
        description: "We need details to provide accurate interpretation.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    setTimeout(() => {
      const symbols = newEvent.symbols.split(',').map(s => s.trim()).filter(s => s);
      const interpretation = interpretSynchronicity(newEvent.type, newEvent.description, symbols);
      const significance = getSignificanceLevel(newEvent.type, symbols);
      
      const event: SynchronicityEvent = {
        id: Date.now().toString(),
        type: newEvent.type,
        description: newEvent.description,
        symbols,
        interpretation,
        significance,
        timestamp: new Date(),
        patterns: patterns
      };
      
      setEvents(prev => [event, ...prev]);
      
      // Reset form
      setNewEvent({
        type: 'numbers',
        description: '',
        symbols: ''
      });
      
      setIsAnalyzing(false);
      
      toast({
        title: "Synchronicity Decoded! ✨",
        description: `${significance.charAt(0).toUpperCase() + significance.slice(1)} significance level detected.`,
      });
    }, 1500);
  };

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'high': return 'text-red-400 border-red-500';
      case 'medium': return 'text-yellow-400 border-yellow-500';
      default: return 'text-green-400 border-green-500';
    }
  };

  const getSignificanceIcon = (significance: string) => {
    switch (significance) {
      case 'high': return AlertTriangle;
      case 'medium': return Eye;
      default: return Sparkles;
    }
  };

  if (!user) {
    return (
      <Card className="bg-black/30 border-purple-500/30">
        <CardContent className="text-center py-12">
          <Eye className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Synchronicity Decoder</h3>
          <p className="text-purple-200">Please log in to track meaningful coincidences</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="record" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/30">
          <TabsTrigger value="record">Record Event</TabsTrigger>
          <TabsTrigger value="history">Event History</TabsTrigger>
          <TabsTrigger value="patterns">Pattern Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="record" className="space-y-6">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Eye className="w-5 h-5 text-purple-400" />
                Record Synchronicity Event
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-purple-200 block mb-2">Event Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-2 rounded bg-black/20 border border-purple-500/30 text-white"
                >
                  {synchronicityTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name} - {type.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-purple-200 block mb-2">Description</label>
                <Textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the synchronicity event in detail..."
                  className="bg-black/20 border-purple-500/30 text-white"
                  rows={4}
                />
              </div>

              <div>
                <label className="text-purple-200 block mb-2">Symbols/Keywords (comma-separated)</label>
                <Input
                  value={newEvent.symbols}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, symbols: e.target.value }))}
                  placeholder="e.g., 333, butterfly, rainbow"
                  className="bg-black/20 border-purple-500/30 text-white"
                />
              </div>

              <Button
                onClick={addSynchronicity}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                    Decoding...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Decode Synchronicity
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-blue-400" />
                Synchronicity History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {events.length === 0 ? (
                <div className="text-center py-8">
                  <Eye className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-purple-200">No synchronicity events recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => {
                    const SignificanceIcon = getSignificanceIcon(event.significance);
                    
                    return (
                      <div key={event.id} className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/30">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <SignificanceIcon className="w-5 h-5 text-purple-400" />
                            <div>
                              <h3 className="text-white font-medium capitalize">{event.type.replace('_', ' ')}</h3>
                              <p className="text-purple-300 text-sm">{event.description}</p>
                            </div>
                          </div>
                          <Badge className={`${getSignificanceColor(event.significance)} capitalize`} variant="outline">
                            {event.significance}
                          </Badge>
                        </div>
                        
                        {event.symbols.length > 0 && (
                          <div className="mb-3">
                            <span className="text-purple-200 text-sm font-medium">Symbols: </span>
                            {event.symbols.map((symbol, index) => (
                              <Badge key={index} className="bg-indigo-600 text-white mr-1 mb-1">
                                {symbol}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <div className="bg-black/30 p-3 rounded-lg mb-3">
                          <h4 className="text-green-400 font-medium mb-1">Interpretation:</h4>
                          <p className="text-purple-200 text-sm">{event.interpretation}</p>
                        </div>
                        
                        <div className="text-xs text-purple-400">
                          {event.timestamp.toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Pattern Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {patterns.length === 0 ? (
                <div className="text-center py-8">
                  <TrendingUp className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-purple-200">No patterns detected yet. Record more events to see patterns emerge.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Detected Patterns</h3>
                  {patterns.map((pattern, index) => (
                    <div key={index} className="p-3 rounded-lg bg-green-900/20 border border-green-500/30">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-green-400" />
                        <span className="text-green-200">{pattern}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 p-4 rounded-lg bg-blue-900/20 border border-blue-500/30">
                    <h4 className="text-blue-400 font-medium mb-2">Pattern Guidance:</h4>
                    <p className="text-blue-200 text-sm">
                      The universe is speaking to you through recurring symbols and patterns. 
                      Pay special attention to these recurring elements as they may hold important 
                      messages for your spiritual journey.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
