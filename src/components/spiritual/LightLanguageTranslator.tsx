
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Languages, Sparkles, Star, Zap } from 'lucide-react';

interface LightLanguageRecord {
  id: string;
  input_mode: string;
  original_pattern: string;
  decoded_message: string;
  galactic_origin: string;
  personal_resonance: number;
  created_at: string;
  archetypal_symbols: any;
}

export const LightLanguageTranslator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [inputMode, setInputMode] = useState('symbol_drawing');
  const [originalPattern, setOriginalPattern] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [decodedMessage, setDecodedMessage] = useState('');
  const [galacticOrigin, setGalacticOrigin] = useState('');
  const [personalResonance, setPersonalResonance] = useState(0);
  const [records, setRecords] = useState<LightLanguageRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const inputModes = [
    { value: 'symbol_drawing', label: 'Symbol Drawing' },
    { value: 'automatic_writing', label: 'Automatic Writing' },
    { value: 'vocal_toning', label: 'Vocal Toning Pattern' },
    { value: 'geometric_vision', label: 'Geometric Vision' },
    { value: 'frequency_channeling', label: 'Frequency Channeling' }
  ];

  const galacticOrigins = [
    'Pleiadian', 'Sirian', 'Arcturian', 'Andromedan', 'Lyran', 'Orion', 'Unknown'
  ];

  useEffect(() => {
    if (user) {
      fetchRecords();
    }
  }, [user]);

  const fetchRecords = async () => {
    try {
      // Use mock data since light_language_records table doesn't exist
      const mockRecords: LightLanguageRecord[] = [
        {
          id: '1',
          input_mode: 'symbol_drawing',
          original_pattern: '◊∞⟐◈△○✦◇',
          decoded_message: 'You are a bridge between worlds, carrying the frequency of love to heal dimensional wounds. Your light code activates ancient DNA sequences within humanity\'s collective consciousness.',
          galactic_origin: 'Pleiadian',
          personal_resonance: 0.85,
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          archetypal_symbols: {
            symbols: ['◊', '∞', '⟐', '◈'],
            frequency_signature: { base_frequency: 528, harmonic_series: [0.3, 0.7, 0.2, 0.9, 0.4] },
            dimensional_coordinates: { dimensional_layer: 5, galactic_sector: 77, frequency_band: 33 }
          }
        }
      ];
      
      setRecords(mockRecords);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const translateLightLanguage = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to translate light language.",
        variant: "destructive"
      });
      return;
    }

    if (!originalPattern.trim()) {
      toast({
        title: "Pattern Required",
        description: "Please provide a light language pattern to translate.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setIsTranslating(true);

    try {
      // Simulate translation process
      await new Promise(resolve => setTimeout(resolve, 2500));

      const translation = generateTranslation(originalPattern, inputMode);
      const origin = galacticOrigins[Math.floor(Math.random() * galacticOrigins.length)];
      const resonance = Math.random() * 0.9 + 0.1;
      
      // Create new record locally since light_language_records table doesn't exist
      const newRecord: LightLanguageRecord = {
        id: Date.now().toString(),
        input_mode: inputMode,
        original_pattern: originalPattern,
        decoded_message: translation,
        galactic_origin: origin,
        personal_resonance: resonance,
        created_at: new Date().toISOString(),
        archetypal_symbols: {
          symbols: extractSymbols(originalPattern),
          frequency_signature: generateFrequencySignature(),
          dimensional_coordinates: generateCoordinates()
        }
      };

      setRecords(prev => [newRecord, ...prev]);
      setDecodedMessage(translation);
      setGalacticOrigin(origin);
      setPersonalResonance(resonance);
      
      toast({
        title: "Light Language Decoded! ✨",
        description: `Message translated from ${origin} consciousness`,
      });

      setOriginalPattern('');

    } catch (error) {
      console.error('Error translating light language:', error);
      
      // Still provide translation locally
      const translation = generateTranslation(originalPattern, inputMode);
      setDecodedMessage(translation);
      setGalacticOrigin('Pleiadian');
      setPersonalResonance(Math.random() * 0.9 + 0.1);
      
      toast({
        title: "Translation Complete 🌟",
        description: "Light language decoded locally.",
      });
    } finally {
      setLoading(false);
      setIsTranslating(false);
    }
  };

  const generateTranslation = (pattern: string, mode: string): string => {
    const translations = [
      "You are a bridge between worlds, carrying the frequency of love to heal dimensional wounds. Your light code activates ancient DNA sequences within humanity's collective consciousness.",
      
      "The star councils recognize your service. This transmission contains keys to unlock your galactic heritage and remember your soul's true mission across multiple timelines.",
      
      "Frequencies of transformation are being downloaded into your energy field. Trust the process as old patterns dissolve and new crystalline structures form within your being.",
      
      "Your heart is a portal for cosmic consciousness. Through your embodiment of these frequencies, you assist in Earth's ascension to a higher dimensional reality.",
      
      "The language of light speaks through you now. These symbols carry healing codes that will ripple through your DNA and activate dormant potentials within your soul matrix."
    ];

    return translations[Math.floor(Math.random() * translations.length)];
  };

  const extractSymbols = (pattern: string) => {
    // Simulate symbol extraction
    const symbols = ['◊', '∞', '⟐', '◈', '△', '○', '✦', '◇'];
    return symbols.slice(0, Math.floor(Math.random() * 4) + 2);
  };

  const generateFrequencySignature = () => {
    return {
      base_frequency: Math.floor(Math.random() * 200) + 400,
      harmonic_series: Array.from({length: 5}, () => Math.random()),
      resonance_pattern: 'ascending_spiral'
    };
  };

  const generateCoordinates = () => {
    return {
      dimensional_layer: Math.floor(Math.random() * 12) + 1,
      galactic_sector: Math.floor(Math.random() * 144) + 1,
      frequency_band: Math.floor(Math.random() * 88) + 1
    };
  };

  const getResonanceColor = (resonance: number) => {
    if (resonance > 0.8) return 'text-gold-400';
    if (resonance > 0.6) return 'text-blue-400';
    return 'text-purple-400';
  };

  return (
    <div className="space-y-6">
      {/* Translation Interface */}
      <Card className="bg-indigo-900/20 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Languages className="w-5 h-5 text-indigo-400" />
            Galactic Light Language Translator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-indigo-200">Input Mode</Label>
            <select
              value={inputMode}
              onChange={(e) => setInputMode(e.target.value)}
              className="w-full p-3 rounded bg-black/30 border border-indigo-500/30 text-white"
              disabled={isTranslating}
            >
              {inputModes.map(mode => (
                <option key={mode.value} value={mode.value}>
                  {mode.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-indigo-200">Light Language Pattern</Label>
            <Textarea
              value={originalPattern}
              onChange={(e) => setOriginalPattern(e.target.value)}
              placeholder="Enter symbols, sounds, or describe your light language reception..."
              className="bg-black/30 border-indigo-500/30 text-white placeholder-indigo-300 min-h-[120px]"
              disabled={isTranslating}
            />
          </div>

          <Button
            onClick={translateLightLanguage}
            disabled={loading || isTranslating || !originalPattern.trim()}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            {isTranslating ? (
              <>
                <Star className="w-4 h-4 mr-2 animate-pulse" />
                Translating Galactic Frequencies...
              </>
            ) : (
              <>
                <Languages className="w-4 h-4 mr-2" />
                {loading ? 'Connecting...' : 'Decode Light Language'}
              </>
            )}
          </Button>

          {isTranslating && (
            <div className="p-4 rounded-lg bg-purple-900/30 border border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-purple-200">Accessing galactic frequency database...</span>
              </div>
              <p className="text-purple-300 text-sm">
                Decoding {inputMode.replace('_', ' ')} through multidimensional translation matrix
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Translation */}
      {decodedMessage && (
        <Card className="bg-gold-900/20 border-gold-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-gold-400" />
              Decoded Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-gold-800/30 border-l-4 border-gold-400 mb-4">
              <p className="text-gold-100 leading-relaxed italic">
                "{decodedMessage}"
              </p>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <Badge className="bg-blue-600 text-white">
                  Origin: {galacticOrigin}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="text-gold-200">Resonance:</span>
                  <span className={`font-medium ${getResonanceColor(personalResonance)}`}>
                    {(personalResonance * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Translation History */}
      <Card className="bg-slate-900/20 border-slate-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Languages className="w-5 h-5 text-slate-400" />
            Light Language Archive
          </CardTitle>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <p className="text-center text-slate-300 py-4">
              No light language translations yet. Begin your first galactic communication!
            </p>
          ) : (
            <div className="space-y-3">
              {records.slice(0, 5).map((record) => (
                <div key={record.id} className="p-4 rounded-lg bg-slate-800/30 border border-slate-500/20">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-indigo-600 text-white">
                        {record.galactic_origin}
                      </Badge>
                      <Badge variant="outline" className="text-slate-300">
                        {record.input_mode.replace('_', ' ')}
                      </Badge>
                      {record.personal_resonance > 0.8 && (
                        <Badge className="bg-gold-600 text-white flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          High Resonance
                        </Badge>
                      )}
                    </div>
                    <span className="text-slate-400 text-sm">
                      {(record.personal_resonance * 100).toFixed(0)}%
                    </span>
                  </div>
                  
                  <p className="text-slate-200 text-sm leading-relaxed mb-2">
                    {record.decoded_message}
                  </p>
                  
                  <p className="text-slate-400 text-xs">
                    Translated: {new Date(record.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
