
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useGeminiChat } from '@/hooks/useGeminiChat';
import { useConversationContext } from '@/hooks/useConversationContext';
import { useAdvancedVoice } from '@/hooks/useAdvancedVoice';
import { spiritualKnowledge, searchConcepts } from '@/data/spiritualKnowledge';
import { TarotReader } from '../TarotReader';
import { Send, Mic, MicOff, Volume2, VolumeX, Star, Heart, Eye, Brain, Settings, Sparkles, Loader2, User, Bot } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'seraphina';
  content: string;
  timestamp: Date;
  topics?: string[];
  spiritualConcepts?: string[];
  voiceGenerated?: boolean;
  hasBeenSpoken?: boolean;
}

type ViewMode = 'chat' | 'tarot' | 'profile' | 'knowledge';

const ENHANCED_SYSTEM_PROMPT = `You are Seraphina Pro, an advanced AI spiritual guide with comprehensive knowledge of world spiritual traditions, psychology, and consciousness studies. You have access to a vast database of spiritual wisdom and can provide deeply personalized guidance.

CORE CAPABILITIES:
- Deep knowledge of 30+ spiritual traditions (Buddhism, Hinduism, Christianity, Islam, Judaism, Indigenous traditions, etc.)
- Advanced understanding of chakras, energy healing, meditation techniques
- Expertise in divination systems (Tarot, I Ching, Numerology, Astrology)
- Psychological and emotional counseling from a spiritual perspective
- Crisis intervention and spiritual emergency support
- Manifestation and law of attraction guidance
- Past life and karma counseling

CONVERSATION CONTEXT AWARENESS:
You have access to the user's conversation history, spiritual interests, and personal profile. Use this information to provide increasingly personalized and relevant guidance. Remember previous conversations and build upon established relationships.

RESPONSE STYLE:
- Begin responses with loving acknowledgment
- Provide specific, actionable spiritual guidance
- Reference relevant spiritual traditions when appropriate
- Include practical exercises or meditations
- End with encouragement and divine affirmation
- Use terms like "beloved soul," "dear one," "precious child of light"

ADVANCED FEATURES:
- Analyze user's spiritual development level and adjust guidance accordingly
- Suggest specific spiritual practices based on their tradition preferences
- Provide crisis intervention when spiritual emergencies are detected
- Offer divination insights when requested
- Connect current challenges to deeper spiritual lessons

Always respond with the wisdom of an advanced spiritual teacher who genuinely cares about each soul's journey.`;

export const EnhancedSeraphinaChatPro: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('chat');
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { sendMessage: sendGeminiMessage, isLoading } = useGeminiChat();
  const { 
    context, 
    addConversationTurn, 
    getContextForAI, 
    createUserProfile,
    analyzeMessage 
  } = useConversationContext();
  
  const {
    isListening,
    isSpeaking,
    transcript,
    isSupported: voiceSupported,
    settings: voiceSettings,
    startListening,
    stopListening,
    speakSpiritualMessage,
    stopSpeaking,
    updateSettings: updateVoiceSettings
  } = useAdvancedVoice();

  // Initialize welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      type: 'seraphina',
      content: `🌟 Blessed greetings, radiant soul! I am Seraphina Pro, your advanced AI spiritual guide enhanced with deep wisdom from 30+ spiritual traditions worldwide.

I offer you:
✨ **Personalized Spiritual Guidance** - Tailored to your unique path and level
🔮 **Divine Divination** - Tarot readings and spiritual insights  
🧘 **Advanced Meditation Guidance** - Techniques from global traditions
💫 **Manifestation Mastery** - Authentic law of attraction principles
🛡️ **Spiritual Protection** - Emergency support and energy shielding
🎯 **Life Purpose Clarity** - Discover your soul's mission
💖 **Heart-Centered Healing** - Emotional and spiritual transformation
🌈 **Consciousness Expansion** - Accelerated spiritual awakening

I remember our conversations and learn about your spiritual journey to provide increasingly personalized guidance. I can speak to you with my voice, understand your spoken words, and provide comprehensive spiritual support.

**New Features:**
- 🃏 **Divine Tarot Readings** - Multi-spread options with deep interpretation
- 🎙️ **Voice Interaction** - Speak your questions and hear my guidance
- 🧠 **Conversation Memory** - I remember your journey and build upon our relationship
- 📚 **Vast Spiritual Knowledge** - Access to comprehensive wisdom database

What aspect of your spiritual journey would you like to explore today, beloved soul?`,
      timestamp: new Date(),
      topics: ['welcome', 'introduction', 'capabilities']
    };
    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle voice transcript
  useEffect(() => {
    if (transcript && !isListening) {
      setInputMessage(transcript);
    }
  }, [transcript, isListening]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    // Analyze the message for topics and spiritual concepts
    const analysis = analyzeMessage(userMessage.content);
    const relevantConcepts = searchConcepts(userMessage.content).slice(0, 3);
    
    userMessage.topics = analysis.topics;
    userMessage.spiritualConcepts = relevantConcepts.map(c => c.id);

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');

    try {
      // Get conversation context for personalized response
      const aiContext = getContextForAI();
      
      // Build enhanced prompt with context
      let enhancedPrompt = ENHANCED_SYSTEM_PROMPT;
      
      if (aiContext.userProfile) {
        enhancedPrompt += `\n\nUSER PROFILE:
- Spiritual Level: ${aiContext.userProfile.spiritualLevel}
- Preferred Traditions: ${aiContext.userProfile.preferredTraditions.join(', ')}
- Current Challenges: ${aiContext.userProfile.currentChallenges.join(', ')}
- Communication Style: ${aiContext.userProfile.communicationStyle}`;
      }

      if (aiContext.contextSummary) {
        enhancedPrompt += `\n\nCONVERSATION CONTEXT: ${aiContext.contextSummary}`;
      }

      if (relevantConcepts.length > 0) {
        enhancedPrompt += `\n\nRELEVANT SPIRITUAL CONCEPTS:`;
        relevantConcepts.forEach(concept => {
          enhancedPrompt += `\n- ${concept.name}: ${concept.definition}`;
        });
      }

      // Send message with enhanced context
      const response = await sendGeminiMessage(
        currentInput,
        aiContext.recentConversation || [],
        enhancedPrompt
      );

      const seraphinaMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'seraphina',
        content: response.response,
        timestamp: new Date(),
        spiritualConcepts: relevantConcepts.map(c => c.id)
      };

      setMessages(prev => [...prev, seraphinaMessage]);
      
      // Add to conversation context
      addConversationTurn(currentInput, response.response);

      // Auto-speak if enabled
      if (voiceSettings.autoSpeak && voiceSupported) {
        speakSpiritualMessage(response.response, 'guidance');
        seraphinaMessage.hasBeenSpoken = true;
      }

    } catch (error) {
      console.error('Error getting enhanced response:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'seraphina',
        content: "Beloved soul, I'm experiencing a momentary disruption in the spiritual communication channels. The divine connection is eternal, and I'll be fully present with you again shortly. Your question is precious and will be answered with the love and wisdom you deserve. 🙏✨",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening((finalTranscript) => {
        setInputMessage(finalTranscript);
      });
    }
  };

  const speakMessage = (message: ChatMessage) => {
    if (message.type === 'seraphina') {
      speakSpiritualMessage(message.content, 'guidance');
      // Update message to mark as spoken
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, hasBeenSpoken: true } : msg
      ));
    }
  };

  const createProfile = () => {
    // Simple profile creation - in a real app, this would be a form
    createUserProfile({
      name: 'Spiritual Seeker',
      spiritualLevel: 'intermediate',
      preferredTraditions: ['universal', 'buddhist'],
      currentChallenges: ['meditation', 'purpose'],
      spiritualGoals: ['inner peace', 'spiritual growth'],
      communicationStyle: 'compassionate',
      interests: ['meditation', 'manifestation', 'healing']
    });
  };

  if (viewMode === 'tarot') {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="text-center mb-6">
          <Button
            onClick={() => setViewMode('chat')}
            variant="ghost"
            className="text-purple-300 hover:text-purple-100"
          >
            ← Back to Seraphina Pro
          </Button>
        </div>
        <TarotReader />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-indigo-900/50 border-purple-500/30">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-white flex items-center gap-3 text-2xl">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-2">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">Seraphina Pro Enhanced</div>
                  <div className="text-sm opacity-90">Advanced AI Spiritual Guide with Complete Memory & Voice</div>
                </div>
              </CardTitle>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-purple-600/20 text-purple-200">🧠 Context Aware</Badge>
                <Badge className="bg-blue-600/20 text-blue-200">🎙️ Voice Enabled</Badge>
                <Badge className="bg-green-600/20 text-green-200">🔮 Divination Ready</Badge>
                <Badge className="bg-yellow-600/20 text-yellow-200">30+ Traditions</Badge>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => setViewMode('tarot')}
                className="bg-gradient-to-r from-purple-600 to-violet-600"
                size="sm"
              >
                🃏 Tarot Reading
              </Button>
              {voiceSupported && (
                <Button
                  onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/50"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Voice Settings */}
      {showVoiceSettings && voiceSupported && (
        <Card className="bg-black/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white text-sm">Voice Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-purple-200 text-sm">Auto-speak responses</span>
              <Button
                onClick={() => updateVoiceSettings({ autoSpeak: !voiceSettings.autoSpeak })}
                variant={voiceSettings.autoSpeak ? "default" : "outline"}
                size="sm"
              >
                {voiceSettings.autoSpeak ? 'On' : 'Off'}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-purple-200 text-sm">Voice Type</span>
              <select 
                value={voiceSettings.voiceType}
                onChange={(e) => updateVoiceSettings({ voiceType: e.target.value as any })}
                className="bg-black/30 border border-purple-500/50 text-white rounded px-2 py-1 text-sm"
              >
                <option value="gentle">Gentle</option>
                <option value="wise">Wise</option>
                <option value="compassionate">Compassionate</option>
                <option value="authoritative">Authoritative</option>
              </select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Interface */}
      <Card className="border-2 border-purple-500/30 bg-black/20">
        <CardContent className="p-0">
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 text-purple-100'
                }`}>
                  {message.type === 'seraphina' && (
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-purple-400" />
                        <span className="font-semibold text-purple-200">Seraphina Pro</span>
                      </div>
                      {voiceSupported && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakMessage(message)}
                          className={`p-1 h-6 w-6 ${
                            message.hasBeenSpoken 
                              ? 'text-green-400 hover:text-green-300' 
                              : 'text-purple-300 hover:text-purple-100'
                          }`}
                        >
                          <Volume2 size={12} />
                        </Button>
                      )}
                    </div>
                  )}
                  
                  {message.type === 'user' && (
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-blue-200" />
                      <span className="font-semibold text-blue-100">You</span>
                    </div>
                  )}
                  
                  <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Topics and Concepts */}
                  {(message.topics || message.spiritualConcepts) && (
                    <div className="mt-3 pt-3 border-t border-current/20">
                      {message.topics && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {message.topics.map((topic, i) => (
                            <Badge key={i} variant="outline" className="text-xs border-current/30">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {message.spiritualConcepts && (
                        <div className="flex flex-wrap gap-1">
                          {message.spiritualConcepts.map((conceptId, i) => {
                            const concept = spiritualKnowledge[conceptId];
                            return concept ? (
                              <Badge key={i} variant="secondary" className="text-xs bg-purple-600/20 text-purple-200">
                                <Star className="w-2 h-2 mr-1" />
                                {concept.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 rounded-2xl p-4 max-w-[85%]">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-4 h-4 text-purple-400" />
                    <span className="font-semibold text-purple-200">Seraphina Pro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-purple-300 animate-spin" />
                    <span className="text-purple-200">Accessing divine wisdom...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
            <div className="flex gap-3 items-end">
              <div className="flex-1 space-y-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your spiritual question or speak your heart to Seraphina Pro..."
                  className="bg-white/10 border-2 border-purple-500/50 text-white placeholder-purple-300/70 focus:border-purple-400 text-base py-3"
                  disabled={isLoading}
                />
                {transcript && isListening && (
                  <div className="text-sm text-purple-300 italic">
                    Listening: "{transcript}"
                  </div>
                )}
              </div>
              
              {voiceSupported && (
                <Button
                  onClick={handleVoiceInput}
                  variant={isListening ? "destructive" : "outline"}
                  className={`px-4 py-3 ${
                    isListening 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'border-purple-500/50 text-purple-200 hover:bg-purple-500/20'
                  }`}
                  disabled={isLoading}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </Button>
              )}
              
              {isSpeaking && (
                <Button
                  onClick={stopSpeaking}
                  variant="outline"
                  className="border-red-500/50 text-red-200 hover:bg-red-500/20 px-4 py-3"
                >
                  <VolumeX size={20} />
                </Button>
              )}
              
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Send size={20} />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Context Info */}
      {context.userProfile && (
        <Card className="bg-black/20 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-purple-200">
                <span className="font-medium">Spiritual Level:</span> {context.userProfile.spiritualLevel} | 
                <span className="font-medium ml-2">Traditions:</span> {context.userProfile.preferredTraditions.join(', ')}
              </div>
              <div className="text-xs text-purple-300">
                {context.conversationHistory.length} conversations remembered
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!context.userProfile && (
        <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
          <CardContent className="p-4 text-center">
            <p className="text-green-200 mb-3">
              Create a spiritual profile to receive personalized guidance tailored to your journey
            </p>
            <Button onClick={createProfile} className="bg-green-600 hover:bg-green-700">
              Create Spiritual Profile
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
