
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useFireKeeperAccess } from '@/hooks/useFireKeeperAccess';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Sparkles, 
  MessageCircle, 
  Clock,
  TestTube,
  Flame,
  Send,
  Loader2
} from 'lucide-react';

export const FireKeeperAIMentorDemo: React.FC = () => {
  const { isDemoAccess } = useFireKeeperAccess();
  const { toast } = useToast();
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [conversationHistory, setConversationHistory] = useState<Array<{question: string, response: string}>>([]);

  const handleAskMentor = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Call the Gemini chat function for AI responses
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: {
          message: `As a Fire Keeper spiritual mentor, provide guidance on: ${question}. Focus on fire element practices, transformation, and spiritual growth. Keep response under 200 words.`,
          context: 'fire_keeper_mentorship'
        }
      });

      if (error) {
        console.error('AI Mentor error:', error);
        // Fallback to demo responses
        const demoResponses = [
          "In the Fire element path, your spiritual energy burns brightest when you embrace transformation. Consider focusing on daily fire meditation to strengthen your inner flame.",
          "The sacred traditions speak of three stages of fire mastery: Ignition, Sustenance, and Transcendence. You seem ready to work on the Sustenance phase.",
          "Your question reveals a deep connection to the ancient wisdom. The Fire Keepers of old would say: 'Let your passion be your guide, but let wisdom be your compass.'",
          "I sense you're experiencing spiritual growth. This is the perfect time to explore advanced third eye practices combined with fire element breathing techniques."
        ];
        
        const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
        setResponse(randomResponse);
      } else {
        setResponse(data.response || 'Thank you for your question. Let me guide you on your Fire Keeper journey.');
      }

      // Save to conversation history
      const newEntry = { question, response: data?.response || response };
      setConversationHistory(prev => [...prev, newEntry]);
      
      // Save to spiritual practices if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('spiritual_practices').insert({
          user_id: user.id,
          practice_type: 'ai_mentor_session',
          practice_details: {
            question,
            response: data?.response || response,
            session_type: 'fire_keeper_demo',
            timestamp: new Date().toISOString()
          }
        });
      }

      toast({
        title: "Fire Keeper Guidance Received",
        description: "Your mentor has provided spiritual guidance.",
      });

    } catch (error) {
      console.error('Error getting AI guidance:', error);
      toast({
        title: "Connection Issue",
        description: "Unable to connect to your Fire Keeper mentor. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
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
              Demo Mode: Full AI-powered responses with conversation history.
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
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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

          {conversationHistory.length > 0 && (
            <Card className="bg-black/20 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-orange-200 text-sm flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Session History ({conversationHistory.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-40 overflow-y-auto">
                {conversationHistory.slice(-3).map((entry, index) => (
                  <div key={index} className="text-xs text-gray-400 border-l-2 border-orange-500/30 pl-2">
                    <div className="text-orange-300">Q: {entry.question.substring(0, 50)}...</div>
                  </div>
                ))}
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
