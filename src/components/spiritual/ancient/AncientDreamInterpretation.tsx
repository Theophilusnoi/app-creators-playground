
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, Scroll, Sparkles, BookOpen, Moon, Lightbulb } from "lucide-react";
import { ancientDreamService } from '@/services/ancientDreamService';
import { InterpretationResult, CulturalTradition, DreamSymbol } from '@/types/dreamInterpretation';

export const AncientDreamInterpretation: React.FC = () => {
  const [dreamText, setDreamText] = useState('');
  const [selectedTradition, setSelectedTradition] = useState<CulturalTradition>('egyptian');
  const [interpretation, setInterpretation] = useState<InterpretationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const traditions = [
    { value: 'egyptian' as CulturalTradition, label: 'Egyptian', icon: '𓂀' },
    { value: 'mesopotamian' as CulturalTradition, label: 'Mesopotamian', icon: '𒀭' },
    { value: 'greek' as CulturalTradition, label: 'Greek', icon: 'Ω' },
    { value: 'islamic' as CulturalTradition, label: 'Islamic', icon: '☪' },
    { value: 'vedic' as CulturalTradition, label: 'Vedic', icon: 'ॐ' },
    { value: 'chinese' as CulturalTradition, label: 'Chinese', icon: '易' },
    { value: 'shamanic' as CulturalTradition, label: 'Shamanic', icon: '🦅' }
  ];

  const handleInterpretation = async () => {
    if (!dreamText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate processing delay for authenticity
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = ancientDreamService.interpretDream(dreamText, selectedTradition);
    setInterpretation(result);
    setIsAnalyzing(false);
  };

  const selectedTraditionInfo = traditions.find(t => t.value === selectedTradition);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Scroll className="w-8 h-8 text-amber-400" />
          Ancient Dream Interpretation
        </h2>
        <p className="text-purple-200 text-lg">
          Based on authentic historical texts and traditional sources
        </p>
      </div>

      <Tabs defaultValue="interpret" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="interpret">
            <Eye className="w-4 h-4 mr-2" />
            Interpret Dream
          </TabsTrigger>
          <TabsTrigger value="symbols">
            <BookOpen className="w-4 h-4 mr-2" />
            Symbol Library
          </TabsTrigger>
          <TabsTrigger value="techniques">
            <Lightbulb className="w-4 h-4 mr-2" />
            Lucid Techniques
          </TabsTrigger>
        </TabsList>

        <TabsContent value="interpret" className="space-y-6">
          {/* Dream Input Section */}
          <Card className="bg-black/30 border-amber-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Moon className="w-5 h-5 text-amber-400" />
                Record Your Dream
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-amber-200 font-semibold">Cultural Tradition</label>
                <Select value={selectedTradition} onValueChange={(value) => setSelectedTradition(value as CulturalTradition)}>
                  <SelectTrigger className="bg-gray-800/50 border-amber-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-amber-600">
                    {traditions.map((tradition) => (
                      <SelectItem key={tradition.value} value={tradition.value} className="text-white hover:bg-gray-700">
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{tradition.icon}</span>
                          {tradition.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-amber-200 font-semibold">Dream Description</label>
                <Textarea
                  value={dreamText}
                  onChange={(e) => setDreamText(e.target.value)}
                  placeholder="Describe your dream in detail... Include symbols, colors, emotions, and actions you remember."
                  className="bg-gray-800/50 border-amber-600 text-white placeholder-gray-400 min-h-32"
                />
              </div>

              <Button
                onClick={handleInterpretation}
                disabled={!dreamText.trim() || isAnalyzing}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Consulting Ancient Texts...
                  </>
                ) : (
                  <>
                    <Scroll className="w-4 h-4 mr-2" />
                    Interpret with {selectedTraditionInfo?.label} Wisdom
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Interpretation Results */}
          {interpretation && (
            <Card className="bg-black/30 border-amber-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Ancient Interpretation ({selectedTraditionInfo?.label} Tradition)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Primary Symbols */}
                {interpretation.primary_symbols.length > 0 && (
                  <div>
                    <h4 className="text-amber-200 font-semibold mb-3 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Recognized Symbols
                    </h4>
                    <div className="grid gap-3">
                      {interpretation.primary_symbols.map((symbol) => (
                        <div key={symbol.symbol_id} className="bg-amber-900/20 rounded-lg p-3 border border-amber-500/30">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-white font-semibold">{symbol.symbol_name}</h5>
                            <Badge className="bg-amber-600 text-white">
                              {symbol.universal_archetype}
                            </Badge>
                          </div>
                          <p className="text-amber-100 text-sm mb-2">{symbol.physical_description}</p>
                          
                          {/* Show interpretation for selected tradition */}
                          {symbol.interpretations
                            .filter(interp => interp.tradition_name.toLowerCase() === selectedTradition)
                            .map((interp) => (
                              <div key={interp.interpretation_id} className="bg-amber-800/20 rounded p-2">
                                <p className="text-amber-200 text-sm font-medium">Meaning: {interp.meaning}</p>
                                <p className="text-amber-300 text-xs mt-1">Context: {interp.context_rules}</p>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cultural Interpretation */}
                <div>
                  <h4 className="text-amber-200 font-semibold mb-2">Cultural Interpretation</h4>
                  <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-500/30">
                    <p className="text-white leading-relaxed">{interpretation.cultural_interpretation}</p>
                  </div>
                </div>

                {/* Prescribed Ritual */}
                <div>
                  <h4 className="text-amber-200 font-semibold mb-2">Prescribed Action</h4>
                  <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                    <p className="text-green-100 leading-relaxed">{interpretation.prescribed_ritual}</p>
                  </div>
                </div>

                {/* Universal Archetypes */}
                {interpretation.universal_archetypes.length > 0 && (
                  <div>
                    <h4 className="text-amber-200 font-semibold mb-2">Universal Archetypes</h4>
                    <div className="flex flex-wrap gap-2">
                      {interpretation.universal_archetypes.map((archetype, index) => (
                        <Badge key={index} variant="outline" className="border-purple-400 text-purple-200">
                          {archetype}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sources */}
                {interpretation.sources_cited.length > 0 && (
                  <div>
                    <h4 className="text-amber-200 font-semibold mb-2">Ancient Sources</h4>
                    <div className="space-y-2">
                      {interpretation.sources_cited.map((source) => (
                        <div key={source.source_id} className="bg-gray-800/30 rounded p-3 border border-gray-600">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-white font-medium">{source.source_name}</span>
                            <Badge className="bg-blue-600 text-white text-xs">
                              {source.culture} • {source.approx_date}
                            </Badge>
                          </div>
                          {source.original_excerpt && (
                            <p className="text-gray-300 text-sm font-mono mb-1">{source.original_excerpt}</p>
                          )}
                          <p className="text-gray-200 text-sm italic">"{source.translation}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confidence Score */}
                <div className="text-center">
                  <Badge className="bg-indigo-600 text-white">
                    Interpretation Confidence: {Math.round(interpretation.confidence_score * 100)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="symbols" className="space-y-6">
          <Card className="bg-black/30 border-amber-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                Ancient Symbol Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {ancientDreamService.getAllSymbols().map((symbol) => (
                    <div key={symbol.symbol_id} className="bg-amber-900/20 rounded-lg p-4 border border-amber-500/30">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-semibold">{symbol.symbol_name}</h4>
                        <Badge className="bg-purple-600 text-white">
                          {symbol.universal_archetype}
                        </Badge>
                      </div>
                      <p className="text-amber-200 text-sm mb-3">{symbol.physical_description}</p>
                      
                      <div className="space-y-2">
                        {symbol.interpretations.map((interp) => (
                          <div key={interp.interpretation_id} className="bg-gray-800/30 rounded p-2">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-amber-300 font-medium">{interp.tradition_name}</span>
                              {interp.is_verified && (
                                <Badge className="bg-green-600 text-white text-xs">Verified</Badge>
                              )}
                            </div>
                            <p className="text-white text-sm">{interp.meaning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="techniques" className="space-y-6">
          <Card className="bg-black/30 border-amber-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                Ancient Lucid Dreaming Techniques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ancientDreamService.getLucidTechniques().map((technique) => (
                  <div key={technique.technique_id} className="bg-amber-900/20 rounded-lg p-4 border border-amber-500/30">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-white font-semibold">{technique.name}</h4>
                      <Badge className="bg-indigo-600 text-white">
                        {technique.tradition}
                      </Badge>
                    </div>
                    
                    <div className="grid gap-3 text-sm">
                      <div>
                        <span className="text-amber-300 font-medium">Preparation: </span>
                        <span className="text-white">{technique.preparation}</span>
                      </div>
                      <div>
                        <span className="text-amber-300 font-medium">Sleep Posture: </span>
                        <span className="text-white">{technique.sleep_posture}</span>
                      </div>
                      <div>
                        <span className="text-amber-300 font-medium">Visualization: </span>
                        <span className="text-white">{technique.visualization}</span>
                      </div>
                      {technique.mantra && (
                        <div>
                          <span className="text-amber-300 font-medium">Mantra: </span>
                          <span className="text-amber-100 italic">"{technique.mantra}"</span>
                        </div>
                      )}
                      <div>
                        <span className="text-amber-300 font-medium">Duration: </span>
                        <span className="text-white">{technique.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
