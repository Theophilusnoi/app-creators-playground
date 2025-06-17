
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Moon, Calendar, Brain, Sparkles, Loader2 } from "lucide-react";
import { Dream, useDreams } from '@/hooks/useDreams';

interface DreamListViewProps {
  dreams: Dream[];
}

export const DreamListView: React.FC<DreamListViewProps> = ({ dreams }) => {
  const { analyzeDream } = useDreams();
  const [analyzingDreamId, setAnalyzingDreamId] = React.useState<string | null>(null);

  const handleAnalyze = async (dreamId: string, content: string) => {
    setAnalyzingDreamId(dreamId);
    try {
      await analyzeDream(dreamId, content);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setAnalyzingDreamId(null);
    }
  };

  if (dreams.length === 0) {
    return (
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Moon className="w-16 h-16 text-purple-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Dreams Yet</h3>
          <p className="text-purple-300 text-center">
            Start recording your dreams to build your personal dream journal and unlock deeper insights.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {dreams.map((dream) => (
        <Card key={dream.id} className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Moon className="w-5 h-5 text-purple-400" />
                  {dream.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-purple-300 text-sm mt-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(dream.dream_date).toLocaleDateString()}
                </div>
              </div>
              {!dream.analysis && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAnalyze(dream.id, dream.content)}
                  disabled={analyzingDreamId === dream.id}
                  className="border-purple-500/30 text-purple-200 hover:bg-purple-700/30"
                >
                  {analyzingDreamId === dream.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-1" />
                      Analyze
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-purple-200 font-medium mb-2">Dream Content</h4>
              <p className="text-white leading-relaxed">{dream.content}</p>
            </div>

            {dream.emotions && dream.emotions.length > 0 && (
              <div>
                <h4 className="text-purple-200 font-medium mb-2">Emotions</h4>
                <div className="flex flex-wrap gap-2">
                  {dream.emotions.map((emotion, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-900/50 text-purple-200 border-purple-500/30"
                    >
                      {emotion}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {dream.symbols && dream.symbols.length > 0 && (
              <div>
                <h4 className="text-purple-200 font-medium mb-2 flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Symbols Detected
                </h4>
                <div className="flex flex-wrap gap-2">
                  {dream.symbols.map((symbol, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-purple-400 text-purple-300 hover:bg-purple-600/20"
                    >
                      {symbol}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {dream.analysis && (
              <div>
                <h4 className="text-purple-200 font-medium mb-2 flex items-center gap-1">
                  <Brain className="w-4 h-4" />
                  Dream Analysis
                </h4>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <p className="text-purple-100 leading-relaxed whitespace-pre-wrap">
                    {dream.analysis}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
