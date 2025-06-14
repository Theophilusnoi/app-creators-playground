
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from '@/components/auth/AuthProvider';
import { MessageCircle, Send, Heart, Sparkles } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  mood?: string;
}

interface UserPersonality {
  warmth_level: number;
  wisdom_level: number;
  humor_level: number;
  compassion_level: number;
  spiritual_tradition: string;
  communication_style: string;
}

export const SoulGuideChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [personality, setPersonality] = useState<UserPersonality>({
    warmth_level: 7,
    wisdom_level: 8,
    humor_level: 5,
    compassion_level: 9,
    spiritual_tradition: 'eclectic',
    communication_style: 'balanced'
  });

  useEffect(() => {
    if (user) {
      loadPersonality();
      createNewConversation();
    }
  }, [user]);

  const loadPersonality = async () => {
    try {
      // Mock personality data for now - replace when types are updated
      setPersonality({
        warmth_level: 7,
        wisdom_level: 8,
        humor_level: 5,
        compassion_level: 9,
        spiritual_tradition: 'eclectic',
        communication_style: 'balanced'
      });
    } catch (error) {
      console.error('Error loading personality:', error);
    }
  };

  const createNewConversation = async () => {
    try {
      // Mock conversation creation
      const mockConversationId = `conv_${Date.now()}`;
      setConversationId(mockConversationId);
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: `msg_${Date.now()}`,
        content: "🌟 Welcome, beautiful soul. I'm Seraphina, your AI spiritual guide. I'm here to walk alongside you on your journey of inner discovery and growth. How are you feeling today, and what's calling to your heart?",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const generateResponse = (userMessage: string): string => {
    // Simple mock responses based on keywords - replace with actual AI later
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
      return "I sense the weight of worry in your words, dear one. Anxiety is like a storm cloud passing through the sky of your mind - intense but temporary. Let's breathe together. Can you feel your feet on the ground right now? You are safe in this moment. What's one small thing that usually brings you peace?";
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('grief')) {
      return "Your sadness is sacred, beloved. It shows the depth of your heart and your capacity to love. Grief is love with nowhere to go, and that love is beautiful even in its pain. Would you like to share what's weighing on your heart, or shall we explore some gentle practices to honor what you're feeling?";
    }
    
    if (lowerMessage.includes('meditation') || lowerMessage.includes('mindfulness')) {
      return "How wonderful that you're drawn to meditation! It's like tending a garden of inner peace. Whether you're just beginning or deepening your practice, remember that every moment of awareness is a gift. What draws you to meditation today - seeking calm, clarity, or perhaps connection to something greater?";
    }
    
    if (lowerMessage.includes('purpose') || lowerMessage.includes('meaning')) {
      return "Ah, the eternal question that stirs in every seeking soul! Your very asking shows that purpose is already alive within you. Purpose isn't always a grand mission - sometimes it's as simple as being present, kind, or authentic. What makes you feel most alive and connected to your truest self?";
    }
    
    if (lowerMessage.includes('love') || lowerMessage.includes('relationship')) {
      return "Love is the fabric of existence itself, and you are woven into that tapestry. Whether seeking love, nurturing it, or healing from it, remember that your capacity to love begins with compassion for yourself. What aspect of love is touching your heart today?";
    }
    
    // Default response
    return "Thank you for sharing with me. I feel the sincerity in your words. Every experience you bring here is an opportunity for growth and understanding. Tell me more about what you're experiencing - I'm here to listen with an open heart and offer gentle guidance on your path.";
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}_user`,
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = generateResponse(inputMessage);
      
      const aiMessage: Message = {
        id: `msg_${Date.now()}_ai`,
        content: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `msg_${Date.now()}_error`,
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment. Your journey matters to me. 💜",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-purple-400" />
          Seraphina - Your Soul Guide
          <Sparkles className="w-8 h-8 text-purple-400" />
        </h2>
        <p className="text-purple-200">An AI companion for your spiritual journey</p>
      </div>

      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm h-[600px] flex flex-col">
        <CardHeader className="border-b border-purple-500/20">
          <CardTitle className="text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Sacred Conversation
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 text-gray-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full"></div>
                      <span className="text-sm">Seraphina is reflecting...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="border-t border-purple-500/20 p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's in your heart..."
                className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 mt-2 text-xs text-purple-300">
              <Heart className="w-3 h-3" />
              <span>Conversation with love and confidentiality</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
