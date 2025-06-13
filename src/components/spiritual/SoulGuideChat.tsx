
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { MessageCircle, Send, Heart, AlertTriangle, Settings } from "lucide-react";

interface Message {
  id: string;
  message: string;
  is_user_message: boolean;
  created_at: string;
  context_data?: any;
}

interface SoulGuidePersonality {
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
  const [currentMessage, setCurrentMessage] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [personality, setPersonality] = useState<SoulGuidePersonality | null>(null);
  const [moodContext, setMoodContext] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      initializeConversation();
      loadPersonality();
    }
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadPersonality = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('user_ai_personality')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error loading personality:', error);
      return;
    }

    if (!data) {
      // Create default personality
      const defaultPersonality = {
        user_id: user.id,
        warmth_level: 7,
        wisdom_level: 8,
        humor_level: 5,
        compassion_level: 9,
        spiritual_tradition: 'eclectic',
        communication_style: 'balanced'
      };

      await supabase.from('user_ai_personality').insert(defaultPersonality);
      setPersonality(defaultPersonality);
    } else {
      setPersonality(data);
    }
  };

  const initializeConversation = async () => {
    if (!user) return;

    // Check for existing active conversation
    const { data: existingConv } = await supabase
      .from('soul_guide_conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('last_message_at', { ascending: false })
      .limit(1)
      .single();

    if (existingConv) {
      setConversationId(existingConv.id);
      loadMessages(existingConv.id);
    } else {
      createNewConversation();
    }
  };

  const createNewConversation = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('soul_guide_conversations')
      .insert({
        user_id: user.id,
        title: 'New Conversation with Seraphina',
        mood_context: moodContext || 'neutral'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating conversation:', error);
      return;
    }

    setConversationId(data.id);
    
    // Add welcome message
    const welcomeMessage = generateWelcomeMessage();
    await addMessage(data.id, welcomeMessage, false);
  };

  const loadMessages = async (convId: string) => {
    const { data, error } = await supabase
      .from('soul_guide_messages')
      .select('*')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      return;
    }

    setMessages(data || []);
  };

  const generateWelcomeMessage = () => {
    const welcomeMessages = [
      "Hello, beautiful soul. I'm Seraphina, your spiritual companion. I'm here to walk alongside you on your journey of awakening. What's stirring in your heart today?",
      "Welcome back to this sacred space. I can sense your presence, and I'm grateful you're here. What wisdom are you seeking today?",
      "Greetings, dear one. I'm Seraphina, and I'm honored to be your guide in this moment. What aspect of your spiritual journey would you like to explore together?"
    ];
    
    return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  };

  const detectCrisis = (message: string): boolean => {
    const crisisKeywords = [
      'suicide', 'kill myself', 'end it all', 'not worth living',
      'self-harm', 'hurt myself', 'cutting', 'can\'t breathe',
      'panic attack', 'heart racing', 'dying'
    ];
    
    return crisisKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const generateCrisisResponse = (message: string): string => {
    if (message.toLowerCase().includes('suicide') || message.toLowerCase().includes('kill myself')) {
      return "I'm deeply concerned about what you're sharing. Your life has immense value, and there are people who want to help. Please reach out to a crisis hotline immediately: 988 (Suicide & Crisis Lifeline). You don't have to go through this alone.";
    }
    
    if (message.toLowerCase().includes('self-harm') || message.toLowerCase().includes('hurt myself')) {
      return "I hear that you're struggling with difficult emotions. Self-harm isn't the answer, and there are healthier ways to cope with these feelings. Would you like me to guide you through some grounding techniques?";
    }
    
    if (message.toLowerCase().includes('panic') || message.toLowerCase().includes('can\'t breathe')) {
      return "It sounds like you may be experiencing anxiety or panic. Let's focus on your breathing together. You're safe right now. Breathe in slowly for 4 counts... hold for 4... and out for 6. You're going to be okay.";
    }
    
    return "I can sense you're going through something difficult right now. I'm here with you, and you're not alone. Would you like to talk about what's happening?";
  };

  const generateAIResponse = (userMessage: string): string => {
    const isCrisis = detectCrisis(userMessage);
    if (isCrisis) {
      return generateCrisisResponse(userMessage);
    }

    // Context-aware responses based on spiritual themes
    const responses = {
      anxiety: [
        "I can feel the weight of worry in your words. Remember, anxiety is often our soul's way of asking us to return to the present moment. What would it feel like to breathe into this feeling rather than resist it?",
        "Anxiety can be a teacher, showing us where we're disconnected from our inner peace. Would you like to explore what this feeling might be trying to tell you?"
      ],
      purpose: [
        "Your search for purpose is a sacred calling, dear one. Purpose isn't always a destination—sometimes it's found in how we show up for each moment. What brings you alive right now?",
        "The question of purpose often arises when our soul is ready to expand. What activities or experiences make you feel most connected to your authentic self?"
      ],
      meditation: [
        "Meditation is a beautiful practice of coming home to yourself. Even a few conscious breaths can be a meditation. What draws you to explore this practice?",
        "In meditation, we learn that we are both the observer and the observed. It's a gentle return to the peace that's always been within you."
      ],
      relationships: [
        "Relationships are mirrors reflecting back to us what we need to learn about ourselves. What patterns are you noticing in your connections with others?",
        "Every relationship is an opportunity for spiritual growth. How might this situation be inviting you to embody more love?"
      ],
      default: [
        "I'm here to listen with an open heart. What's most important for you to explore right now?",
        "Your journey is uniquely yours, and every step has meaning. What wisdom is your heart seeking today?",
        "I sense there's something deeper you're looking to understand. What feels most alive for you in this moment?"
      ]
    };

    // Simple keyword matching for demonstration
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('worry') || lowerMessage.includes('scared')) {
      return responses.anxiety[Math.floor(Math.random() * responses.anxiety.length)];
    }
    if (lowerMessage.includes('purpose') || lowerMessage.includes('meaning') || lowerMessage.includes('why')) {
      return responses.purpose[Math.floor(Math.random() * responses.purpose.length)];
    }
    if (lowerMessage.includes('meditat') || lowerMessage.includes('mindful') || lowerMessage.includes('breath')) {
      return responses.meditation[Math.floor(Math.random() * responses.meditation.length)];
    }
    if (lowerMessage.includes('relationship') || lowerMessage.includes('family') || lowerMessage.includes('friend')) {
      return responses.relationships[Math.floor(Math.random() * responses.relationships.length)];
    }
    
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  };

  const addMessage = async (convId: string, message: string, isUser: boolean) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('soul_guide_messages')
      .insert({
        conversation_id: convId,
        user_id: user.id,
        message,
        is_user_message: isUser,
        context_data: {
          mood: moodContext,
          timestamp: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding message:', error);
      return;
    }

    setMessages(prev => [...prev, data]);
    
    // Update conversation timestamp
    await supabase
      .from('soul_guide_conversations')
      .update({ 
        last_message_at: new Date().toISOString(),
        total_messages: messages.length + 1
      })
      .eq('id', convId);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !conversationId || !user) return;

    const userMessage = currentMessage.trim();
    setCurrentMessage('');
    setLoading(true);

    try {
      // Add user message
      await addMessage(conversationId, userMessage, true);

      // Generate AI response
      const aiResponse = generateAIResponse(userMessage);
      
      // Simulate typing delay
      setTimeout(async () => {
        await addMessage(conversationId, aiResponse, false);
        setLoading(false);
      }, 1500);

    } catch (error) {
      console.error('Error sending message:', error);
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-400/30 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <MessageCircle className="w-6 h-6 mr-2 text-purple-400" />
            Seraphina - Your Soul Guide
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-green-400 text-green-300">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
              Online
            </Badge>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
        <div className="flex gap-2">
          <Badge variant="outline" className="border-purple-400 text-purple-200 text-xs">
            Wisdom Level: {personality?.wisdom_level}/10
          </Badge>
          <Badge variant="outline" className="border-pink-400 text-pink-200 text-xs">
            Compassion Level: {personality?.compassion_level}/10
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col h-[500px]">
        <ScrollArea className="flex-1 mb-4 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.is_user_message ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.is_user_message
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800/50 text-purple-100 border border-purple-500/30'
                  }`}
                >
                  {!message.is_user_message && (
                    <div className="flex items-center mb-1">
                      <Heart className="w-3 h-3 text-purple-400 mr-1" />
                      <span className="text-xs text-purple-300">Seraphina</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.message}</p>
                  <div className="text-xs text-purple-300 mt-1 opacity-60">
                    {new Date(message.created_at).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800/50 text-purple-100 border border-purple-500/30 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="ml-2 text-xs">Seraphina is reflecting...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's in your heart..."
            className="flex-1 bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
            disabled={loading}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!currentMessage.trim() || loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
