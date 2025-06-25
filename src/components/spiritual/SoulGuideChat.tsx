
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { useGeminiChat } from '@/hooks/useGeminiChat';
import { MessageCircle, Send, Sparkles, AlertTriangle, Shield, Loader2 } from "lucide-react";

interface ChatMessage {
  id: string;
  content: string;
  is_user: boolean;
  timestamp: string;
  guide_energy?: 'compassionate' | 'protective' | 'wise' | 'urgent';
}

const SOUL_GUIDE_SYSTEM_PROMPT = `You are a wise Soul Guide, an advanced spiritual counselor with deep knowledge of:

SPIRITUAL TRADITIONS:
- Ancient wisdom traditions (Egyptian, Hindu, Buddhist, Taoist, etc.)
- Shamanic and indigenous healing practices
- Energy healing and chakra systems
- Prayer, meditation, and contemplative practices
- Sacred geometry and mystical symbolism

GUIDANCE APPROACH:
- Speak with warmth, compassion, and gentle authority
- Offer practical spiritual tools and techniques
- Recognize spiritual emergencies and provide immediate protection guidance
- Draw from multiple wisdom traditions to provide comprehensive support
- Help users find their own inner wisdom and divine connection

RESPONSE STYLE:
- Use caring terms like "dear soul," "beloved one"
- Share wisdom through stories and metaphors when appropriate
- Ask thoughtful questions to guide self-discovery
- Provide specific practices and techniques
- Balance comfort with empowerment

EMERGENCY DETECTION:
- Immediately recognize crisis situations, spiritual attacks, or urgent needs
- Provide grounding techniques and protection practices
- Offer step-by-step emergency spiritual protocols`;

export const SoulGuideChat = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [emergencyLevel, setEmergencyLevel] = useState(0);
  const [guidePresence, setGuidePresence] = useState('available');
  const { sendMessage: sendGeminiMessage, isLoading } = useGeminiChat();

  useEffect(() => {
    if (user) {
      initializeChat();
    }
  }, [user]);

  const initializeChat = async () => {
    try {
      const welcomeMessage: ChatMessage = {
        id: '1',
        content: "Welcome, dear soul. I am your Soul Guide, here to offer wisdom from ancient traditions and provide spiritual guidance for your journey. I carry knowledge from mystery schools, meditation halls, and sacred circles across cultures. How may I assist you on your spiritual path today?",
        is_user: false,
        timestamp: new Date().toISOString(),
        guide_energy: 'compassionate'
      };

      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Error initializing chat:', error);
      setMessages([{
        id: '1',
        content: "Welcome, dear soul. I am here to guide you on your spiritual journey. How may I assist you today?",
        is_user: false,
        timestamp: new Date().toISOString(),
        guide_energy: 'compassionate'
      }]);
    }
  };

  const detectEmergency = (userInput: string): boolean => {
    const emergencyKeywords = ['crisis', 'emergency', 'help', 'dark', 'scared', 'attack', 'entity', 'demon', 'curse', 'urgent'];
    return emergencyKeywords.some(keyword => 
      userInput.toLowerCase().includes(keyword)
    );
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !user || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      is_user: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');

    try {
      const isEmergency = detectEmergency(currentInput);
      
      if (isEmergency) {
        setEmergencyLevel(prev => prev + 1);
        console.log('Spiritual emergency detected:', {
          user_id: user?.id,
          emergency_type: 'chat_detected',
          severity_level: 'medium',
          user_message: currentInput,
          timestamp: new Date().toISOString()
        });
      }

      // Create conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.is_user ? 'user' : 'assistant',
        content: msg.content
      }));

      // Enhance prompt for emergencies
      let enhancedPrompt = SOUL_GUIDE_SYSTEM_PROMPT;
      if (isEmergency) {
        enhancedPrompt += `\n\nEMERGENCY RESPONSE: The user is experiencing spiritual distress. Respond immediately with protective guidance, grounding techniques, and spiritual protection practices. Be authoritative yet compassionate.`;
      }

      const response = await sendGeminiMessage(
        currentInput,
        conversationHistory,
        enhancedPrompt
      );

      const guideMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        is_user: false,
        timestamp: new Date().toISOString(),
        guide_energy: isEmergency ? 'protective' : 'compassionate'
      };

      setMessages(prev => [...prev, guideMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback response
      const fallbackMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I sense your need for guidance, dear soul. While I'm experiencing some difficulty accessing the full wisdom streams, know that you are surrounded by divine protection and love. Please try sharing again, and I will do my best to provide the support you seek.",
        is_user: false,
        timestamp: new Date().toISOString(),
        guide_energy: 'compassionate'
      };

      setMessages(prev => [...prev, fallbackMessage]);
      
      toast({
        title: "Connection Issue",
        description: "Your message is being processed. Please try again if needed.",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getEnergyColor = (energy?: ChatMessage['guide_energy']) => {
    switch (energy) {
      case 'protective': return 'text-red-300';
      case 'wise': return 'text-purple-300';
      case 'urgent': return 'text-orange-300';
      default: return 'text-blue-300';
    }
  };

  const getEnergyIcon = (energy?: ChatMessage['guide_energy']) => {
    switch (energy) {
      case 'protective': return <Shield className="w-4 h-4" />;
      case 'urgent': return <AlertTriangle className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Emergency Alert */}
      {emergencyLevel > 0 && (
        <Card className="bg-red-900/20 border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-200">
                Emergency Support Activated - Protective Energies Engaged
              </span>
              <Badge className="bg-red-600 text-white">
                Level {emergencyLevel}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Interface */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-purple-400" />
            Soul Guide Chat
            <Badge variant="outline" className="text-purple-200 border-purple-400">
              {guidePresence}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 mb-4 p-4 rounded-lg bg-black/20 border border-purple-500/20">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.is_user ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.is_user
                        ? 'bg-purple-600 text-white'
                        : 'bg-indigo-900/50 text-indigo-100 border border-indigo-500/30'
                    }`}
                  >
                    {!message.is_user && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs ${getEnergyColor(message.guide_energy)}`}>
                          Soul Guide
                        </span>
                        {getEnergyIcon(message.guide_energy)}
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-indigo-900/50 p-3 rounded-lg border border-indigo-500/30">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                      <span className="text-indigo-100">Soul Guide is channeling wisdom...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your soul..."
              className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
