
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Moon, Brain, Star } from "lucide-react";

interface Dream {
  id: string;
  title: string;
  content: string;
  dream_date: string;
  emotions?: string[];
  symbols?: string[];
  analysis?: string;
}

interface DreamJournalProps {
  dreams: Dream[];
  loading: boolean;
  onAddDream: () => void;
  onAnalyzeDream: (dreamId: string, content: string) => void;
  analyzingDream: string | null;
}

export const DreamJournal: React.FC<DreamJournalProps> = ({
  dreams,
  loading,
  onAddDream,
  onAnalyzeDream,
  analyzingDream
}) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
        <p className="text-purple-200 mt-2">Loading your dreams...</p>
      </div>
    );
  }

  if (dreams.length === 0) {
    return (
      <div className="text-center py-8">
        <Moon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <p className="text-purple-200 mb-4">No dreams recorded yet</p>
        <Button onClick={onAddDream} className="bg-purple-600 hover:bg-purple-700">
          Record Your First Dream
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {dreams.map((dream) => (
        <div key={dream.id} className="bg-purple-900/20 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-white">{dream.title}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-purple-400">{dream.dream_date}</span>
              {!dream.analysis && (
                <Button
                  size="sm"
                  onClick={() => onAnalyzeDream(dream.id, dream.content)}
                  disabled={analyzingDream === dream.id}
                  className="bg-blue-600 hover:bg-blue-700 text-xs"
                >
                  <Brain className="w-3 h-3 mr-1" />
                  {analyzingDream === dream.id ? 'Analyzing...' : 'Analyze'}
                </Button>
              )}
            </div>
          </div>
          
          <p className="text-purple-200 mb-3">{dream.content}</p>
          
          {dream.emotions && dream.emotions.length > 0 && (
            <div className="mb-3">
              <div className="text-sm text-purple-300 mb-1">Emotions:</div>
              <div className="flex flex-wrap gap-2">
                {dream.emotions.map((emotion, index) => (
                  <Badge key={index} variant="outline" className="border-blue-400 text-blue-200">
                    {emotion}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {dream.symbols && dream.symbols.length > 0 && (
            <div className="mb-3">
              <div className="text-sm text-purple-300 mb-1">Symbols:</div>
              <div className="flex flex-wrap gap-2">
                {dream.symbols.map((symbol, index) => (
                  <Badge key={index} variant="outline" className="border-purple-400 text-purple-200">
                    {symbol}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {dream.analysis && (
            <div className="bg-purple-800/30 rounded p-3">
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 mr-2 text-purple-400" />
                <span className="text-sm font-medium text-white">AI Analysis</span>
              </div>
              <p className="text-sm text-purple-200">{dream.analysis}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
