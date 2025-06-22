
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Scroll } from "lucide-react";
import { ancientDreamService } from '@/services/ancientDreamService';

export const AncientSymbolGuide: React.FC = () => {
  const symbols = ancientDreamService.getAllSymbols();

  return (
    <Card className="bg-black/30 border-amber-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          Ancient Symbol Guide
          <Badge className="bg-amber-600 text-white ml-2">
            Authentic Sources
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {symbols.map((symbol) => (
              <div key={symbol.symbol_id} className="bg-amber-900/20 rounded-lg p-4 border border-amber-500/30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-semibold text-lg">{symbol.symbol_name}</h4>
                  <Badge className="bg-purple-600 text-white">
                    {symbol.universal_archetype}
                  </Badge>
                </div>
                
                <p className="text-amber-200 mb-3 italic">{symbol.physical_description}</p>
                
                <div className="space-y-3">
                  <h5 className="text-amber-300 font-medium flex items-center gap-1">
                    <Scroll className="w-4 h-4" />
                    Traditional Interpretations
                  </h5>
                  
                  {symbol.interpretations.map((interp) => (
                    <div key={interp.interpretation_id} className="bg-gray-800/40 rounded p-3 border border-gray-600/50">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-amber-300 font-medium">{interp.tradition_name} Tradition</span>
                        {interp.is_verified && (
                          <Badge className="bg-green-600 text-white text-xs">
                            Historically Verified
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="text-white font-medium">Meaning: </span>
                          <span className="text-gray-200">{interp.meaning}</span>
                        </div>
                        <div>
                          <span className="text-white font-medium">Context: </span>
                          <span className="text-gray-300">{interp.context_rules}</span>
                        </div>
                        <div>
                          <span className="text-white font-medium">Prescribed Action: </span>
                          <span className="text-green-200">{interp.prescribed_action}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Show primary source if available */}
                  {symbol.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-amber-500/30">
                      <h6 className="text-amber-300 font-medium text-sm mb-2">Primary Source</h6>
                      {symbol.sources.slice(0, 1).map((source) => (
                        <div key={source.source_id} className="bg-gray-900/50 rounded p-2 text-xs">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-white font-medium">{source.source_name}</span>
                            <Badge className="bg-blue-600 text-white text-xs">
                              {source.culture} • {source.approx_date}
                            </Badge>
                          </div>
                          {source.original_excerpt && (
                            <p className="text-gray-400 font-mono mb-1">"{source.original_excerpt}"</p>
                          )}
                          <p className="text-gray-300 italic">Translation: "{source.translation}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
