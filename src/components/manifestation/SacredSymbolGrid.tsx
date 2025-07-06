
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Sparkles, Star, Zap, Crown, Gem, 
  Circle, Triangle, Square, Diamond, Heart
} from 'lucide-react';

interface Symbol {
  id: string;
  name: string;
  symbol: string;
  description: string;
  tradition: string;
  purpose: string;
  activationWord: string;
  color: string;
}

const SACRED_SYMBOLS: Symbol[] = [
  {
    id: 'lakshmi-yantra',
    name: 'Lakshmi Yantra',
    symbol: '🕉️',
    description: 'Sacred geometry for attracting wealth and abundance',
    tradition: 'Hindu',
    purpose: 'Wealth attraction',
    activationWord: 'Om Shreem Mahalakshmiyei Namaha',
    color: 'from-yellow-600 to-amber-600'
  },
  {
    id: 'seal-solomon',
    name: 'Seal of Solomon',
    symbol: '✡️',
    description: 'Ancient symbol of divine protection and power',
    tradition: 'Kabbalistic',
    purpose: 'Divine protection and wisdom',
    activationWord: 'Adonai Elohim',
    color: 'from-blue-600 to-purple-600'
  },
  {
    id: 'abundance-sigil',
    name: 'Abundance Sigil',
    symbol: '💰',
    description: 'Modern prosperity symbol charged with intention',
    tradition: 'Modern Chaos Magic',
    purpose: 'Financial manifestation',
    activationWord: 'Abundantia Infinitus',
    color: 'from-green-600 to-emerald-600'
  },
  {
    id: 'money-rune',
    name: 'Fehu Rune',
    symbol: 'ᚠ',
    description: 'Nordic rune representing wealth and prosperity',
    tradition: 'Norse',
    purpose: 'Wealth and success',
    activationWord: 'Fehu Fehu Fehu',
    color: 'from-orange-600 to-red-600'
  },
  {
    id: 'golden-ratio',
    name: 'Golden Ratio Spiral',
    symbol: '🌀',
    description: 'Sacred geometry found in nature and abundance',
    tradition: 'Sacred Geometry',
    purpose: 'Natural flow of abundance',
    activationWord: 'Phi Sacred Flow',
    color: 'from-yellow-600 to-orange-600'
  },
  {
    id: 'triquetra',
    name: 'Triquetra',
    symbol: '☘️',
    description: 'Celtic symbol of triple abundance - mind, body, spirit',
    tradition: 'Celtic',
    purpose: 'Holistic prosperity',
    activationWord: 'Triple Blessing Flow',
    color: 'from-green-600 to-teal-600'
  },
  {
    id: 'ankh',
    name: 'Ankh',
    symbol: '☥',
    description: 'Egyptian symbol of eternal life and prosperity',
    tradition: 'Egyptian',
    purpose: 'Life force and abundance',
    activationWord: 'Ankh Djed Was',
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 'hamsa',
    name: 'Hamsa Hand',
    symbol: '🪬',
    description: 'Protective symbol that attracts good fortune',
    tradition: 'Middle Eastern',
    purpose: 'Protection and luck',
    activationWord: 'Blessed Protection Flow',
    color: 'from-indigo-600 to-blue-600'
  },
  {
    id: 'sri-yantra',
    name: 'Sri Yantra',
    symbol: '🔯',
    description: 'Most powerful yantra for wealth manifestation',
    tradition: 'Hindu Tantra',
    purpose: 'Supreme abundance',
    activationWord: 'Om Shreem Hreem Shreem',
    color: 'from-red-600 to-pink-600'
  }
];

export const SacredSymbolGrid: React.FC = () => {
  const [activeSymbol, setActiveSymbol] = useState<Symbol | null>(null);
  const [activatedSymbols, setActivatedSymbols] = useState<string[]>([]);
  const [isActivating, setIsActivating] = useState(false);
  const [intention, setIntention] = useState('');
  const { toast } = useToast();

  const activateSymbol = async (symbol: Symbol) => {
    if (!intention.trim()) {
      toast({
        title: "Set Your Intention",
        description: "Please enter what you want to manifest before activating the symbol",
        variant: "destructive"
      });
      return;
    }

    setIsActivating(true);
    setActiveSymbol(symbol);

    // Simulate activation process
    setTimeout(() => {
      setActivatedSymbols(prev => [...prev, symbol.id]);
      setIsActivating(false);
      
      toast({
        title: `✨ ${symbol.name} Activated!`,
        description: `Your intention has been charged with ${symbol.tradition} energy`
      });

      // Trigger vibration if available
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }, 2000);
  };

  const resetGrid = () => {
    setActivatedSymbols([]);
    setActiveSymbol(null);
    setIntention('');
    
    toast({
      title: "🔄 Grid Reset",
      description: "Sacred symbol grid has been cleared for new intentions"
    });
  };

  const isSymbolActivated = (symbolId: string) => {
    return activatedSymbols.includes(symbolId);
  };

  const getSymbolIcon = (symbol: Symbol) => {
    switch (symbol.id) {
      case 'lakshmi-yantra': return <Crown className="w-8 h-8" />;
      case 'seal-solomon': return <Star className="w-8 h-8" />;
      case 'abundance-sigil': return <Diamond className="w-8 h-8" />;
      case 'money-rune': return <Zap className="w-8 h-8" />;
      case 'golden-ratio': return <Circle className="w-8 h-8" />;
      case 'triquetra': return <Heart className="w-8 h-8" />;
      case 'ankh': return <Triangle className="w-8 h-8" />;
      case 'hamsa': return <Square className="w-8 h-8" />;
      case 'sri-yantra': return <Gem className="w-8 h-8" />;
      default: return <Sparkles className="w-8 h-8" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Intention Setting */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-200 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Set Your Sacred Intention
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-purple-200 text-sm font-medium mb-2 block">
              What do you want to manifest?
            </label>
            <textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="I intend to manifest..."
              className="w-full h-20 bg-black/20 border border-purple-500/30 text-purple-100 rounded-md px-3 py-2 resize-none"
            />
          </div>
          
          <div className="text-center">
            <p className="text-purple-300 text-sm">
              Activated Symbols: {activatedSymbols.length} / {SACRED_SYMBOLS.length}
            </p>
            {activatedSymbols.length > 0 && (
              <Button
                onClick={resetGrid}
                variant="outline"
                size="sm"
                className="mt-2 border-purple-500/30 text-purple-200"
              >
                Reset Grid
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Active Symbol Display */}
      {(activeSymbol || isActivating) && (
        <Card className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border-yellow-500/30">
          <CardContent className="p-8 text-center">
            {isActivating ? (
              <div className="space-y-4">
                <div className="text-6xl animate-pulse">⚡</div>
                <h3 className="text-2xl font-bold text-yellow-200">
                  Activating {activeSymbol?.name}...
                </h3>
                <p className="text-yellow-300">
                  Charging your intention with sacred energy
                </p>
                <div className="text-yellow-400 font-mono">
                  {activeSymbol?.activationWord}
                </div>
              </div>
            ) : activeSymbol && (
              <div className="space-y-4">
                <div className="text-6xl">✨</div>
                <h3 className="text-2xl font-bold text-yellow-200">
                  {activeSymbol.name} Activated!
                </h3>
                <p className="text-yellow-300">
                  Your intention is now charged with {activeSymbol.tradition} energy
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Symbol Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SACRED_SYMBOLS.map((symbol) => (
          <Card 
            key={symbol.id}
            className={`
              cursor-pointer transition-all duration-300 hover:scale-105 relative overflow-hidden
              ${isSymbolActivated(symbol.id) 
                ? `bg-gradient-to-br ${symbol.color} border-white/50 ring-2 ring-white/30` 
                : 'bg-gradient-to-br from-gray-900/40 to-gray-800/40 border-gray-500/30 hover:border-gray-400/50'
              }
            `}
            onClick={() => activateSymbol(symbol)}
          >
            {isSymbolActivated(symbol.id) && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-pulse"></div>
            )}
            
            <CardContent className="p-6 text-center relative">
              <div className={`text-4xl mb-4 ${isSymbolActivated(symbol.id) ? 'text-white animate-pulse' : 'text-gray-400'}`}>
                {getSymbolIcon(symbol)}
              </div>
              
              <h3 className={`font-bold mb-2 ${isSymbolActivated(symbol.id) ? 'text-white' : 'text-gray-300'}`}>
                {symbol.name}
              </h3>
              
              <p className={`text-sm mb-3 ${isSymbolActivated(symbol.id) ? 'text-white/90' : 'text-gray-400'}`}>
                {symbol.description}
              </p>
              
              <div className="space-y-2">
                <div className={`text-xs px-2 py-1 rounded ${
                  isSymbolActivated(symbol.id) 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-700/30 text-gray-400'
                }`}>
                  {symbol.tradition}
                </div>
                
                <div className={`text-xs font-medium ${
                  isSymbolActivated(symbol.id) ? 'text-white' : 'text-gray-300'
                }`}>
                  {symbol.purpose}
                </div>
                
                {isSymbolActivated(symbol.id) && (
                  <div className="text-xs italic text-white/80 mt-2">
                    "{symbol.activationWord}"
                  </div>
                )}
              </div>
              
              {isSymbolActivated(symbol.id) && (
                <div className="absolute top-2 right-2">
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-200 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            How to Use Sacred Symbols
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-blue-200 font-medium mb-3">Activation Process:</h4>
              <ul className="space-y-2 text-blue-300 text-sm">
                <li>1. Set a clear, specific intention</li>
                <li>2. Choose a symbol that resonates with your goal</li>
                <li>3. Click to activate and focus on your intention</li>
                <li>4. Repeat the activation word mentally</li>
                <li>5. Feel the energy charging your manifestation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-blue-200 font-medium mb-3">Best Practices:</h4>
              <ul className="space-y-2 text-blue-300 text-sm">
                <li>• Use in a quiet, sacred space</li>
                <li>• Activate symbols with genuine faith</li>
                <li>• Combine with meditation or prayer</li>
                <li>• Express gratitude after activation</li>
                <li>• Trust the process and let go</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-black/20 p-4 rounded border border-blue-500/20">
            <p className="text-blue-200 text-sm text-center italic">
              "Symbols are the bridge between the conscious and unconscious mind, 
              between intention and manifestation." - Sacred Geometry Tradition
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
