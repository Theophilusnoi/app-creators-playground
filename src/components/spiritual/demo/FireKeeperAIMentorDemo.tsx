
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useFireKeeperAccess } from '@/hooks/useFireKeeperAccess';
import { 
  Sparkles, 
  MessageCircle, 
  Clock,
  TestTube,
  Flame,
  Send
} from 'lucide-react';

export const FireKeeperAIMentorDemo: React.FC = () => {
  const { isDemoAccess } = useFireKeeperAccess();
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleAskMentor = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI mentor response
    setTimeout(() => {
      const demoResponses = [
        "In the Fire element path, your spiritual energy burns brightest when you embrace transformation. Consider focusing on daily fire meditation to strengthen your inner flame.",
        "The sacred traditions speak of three stages of fire mastery: Ignition, Sustenance, and Transcendence. You seem ready to work on the Sustenance phase.",
        "Your question reveals a deep connection to the ancient wisdom. The Fire Keepers of old would say: 'Let your passion be your guide, but let wisdom be your compass.'",
        "I sense you're experiencing spiritual growth. This is the perfect time to explore advanced third eye practices combined with fire element breathing techniques."
      ];
      
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      setResponse(randomResponse);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card className="border-orange-500/30 bg-gradient-to-r from-orange-900/20 to-red-900/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-orange-400" />
            <CardTitle className="text-white">AI Spiritual Mentor</CardTitle>
          </div>
          {isDemoAccess && (
            <Badge className="bg-purple-600">
              <TestTube className="w-3 h-3 mr-1" />
              Demo Mode
            </Badge>
          )}
        </div>
        <p className="text-gray-300 text-sm">
          Weekly 1:1 sessions with your personalized Fire Keeper AI mentor
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {isDemoAccess && (
          <div className="bg-yellow-900/20 border border-yellow-500/30 p-3 rounded-lg">
            <p className="text-yellow-200 text-sm">
              <TestTube className="w-4 h-4 inline mr-2" />
              Demo Mode: This is a simplified version. Full version includes advanced spiritual analysis.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-white text-sm font-medium block mb-2">
              Ask your AI mentor:
            </label>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about spiritual practices, energy work, or your Fire Keeper journey..."
              className="bg-gray-800/50 border-orange-500/30 text-white"
              rows={3}
            />
          </div>

          <Button
            onClick={handleAskMentor}
            disabled={isLoading || !question.trim()}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Consulting mentor...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Ask Mentor
              </>
            )}
          </Button>

          {response && (
            <Card className="bg-black/30 border-orange-500/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-orange-600 p-2 rounded-full">
                    <Flame className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-orange-200 font-medium mb-2">Your Fire Keeper Mentor:</h4>
                    <p className="text-gray-200 text-sm leading-relaxed">{response}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="border-t border-orange-500/20 pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Clock className="w-4 h-4" />
            <span>Weekly sessions available • Advanced AI analysis • Personalized guidance</span>
          </div>
          
          {isDemoAccess && (
            <div className="mt-3">
              <Button 
                variant="outline" 
                size="sm"
                className="border-orange-500/30 text-orange-200"
                onClick={() => window.location.href = '/pricing'}
              >
                Upgrade for full AI mentor access
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
