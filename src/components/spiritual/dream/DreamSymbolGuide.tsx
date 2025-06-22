
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

const dreamSymbols = [
  { symbol: "Water", meaning: "Emotions, unconscious, flow of life", frequency: "High" },
  { symbol: "Flying", meaning: "Freedom, transcendence, rising above", frequency: "Medium" },
  { symbol: "Animals", meaning: "Instincts, natural wisdom, shadow aspects", frequency: "High" },
  { symbol: "Death", meaning: "Transformation, endings and beginnings", frequency: "Low" },
  { symbol: "Houses", meaning: "Self, psyche structure, different aspects of being", frequency: "Medium" }
];

export const DreamSymbolGuide: React.FC = () => {
  return (
    <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Eye className="w-5 h-5 mr-2 text-purple-400" />
          Symbol Guide
        </CardTitle>
        <CardDescription className="text-purple-200">
          Common dream symbols and their meanings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {dreamSymbols.map((item, index) => (
          <div key={index} className="bg-purple-900/20 rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-white">{item.symbol}</h4>
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  item.frequency === 'High' ? 'border-green-400 text-green-300' :
                  item.frequency === 'Medium' ? 'border-yellow-400 text-yellow-300' :
                  'border-red-400 text-red-300'
                }`}
              >
                {item.frequency}
              </Badge>
            </div>
            <p className="text-sm text-purple-300">{item.meaning}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
