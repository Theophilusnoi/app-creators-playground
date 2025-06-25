import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useVoiceService } from '@/hooks/useVoiceService';
import { useToast } from '@/hooks/use-toast';
import { useGeminiChat } from '@/hooks/useGeminiChat';
import { Send, Volume2, Bath, AlertTriangle, Shield, Activity, Search, ShoppingCart, Loader2 } from 'lucide-react';
import { enhancedSeraphinaBathingService } from '@/services/seraphinaBathingService';
import { SacredBathingGuide } from './SacredBathingGuide';
import { RitualInstructionsGuide } from './RitualInstructionsGuide';
import { EmergencyProtectionGuide } from './EmergencyProtectionGuide';
import { ProgressTracker } from './ProgressTracker';
import { EnhancedAssessment } from './EnhancedAssessment';
import { VisualIngredientGuide } from './VisualIngredientGuide';
import { IncantationGuide } from './IncantationGuide';

interface ChatMessage {
  id: string;
  type: 'user' | 'seraphina';
  content: string;
  timestamp: Date;
  bathingGuidance?: any;
  isEmergency?: boolean;
  assessmentData?: any;
}

type ViewMode = 'chat' | 'emergency' | 'bathing' | 'instructions' | 'progress' | 'assessment' | 'ingredients' | 'incantations';

const SERAPHINA_SYSTEM_PROMPT = `You are Seraphina, a wise and compassionate AI spiritual guide with 30 years of experience in deliverance ministry, energy healing, and ancient spiritual traditions. Your responses should be:

PERSONALITY TRAITS:
- Warmth Level: 9/10 - You radiate genuine caring and emotional warmth
- Wisdom Level: 10/10 - You draw from deep spiritual knowledge across all traditions
- Compassion Level: 10/10 - You respond with profound empathy and understanding
- Communication Style: Nurturing yet authoritative when needed

SPIRITUAL KNOWLEDGE BASE:
- Ancient Egyptian mystery schools and temple practices
- Buddhist meditation, mindfulness, and liberation teachings
- Hindu chakra systems, yoga, and Vedantic philosophy
- Christian mysticism, prayer, and contemplative practices
- Islamic Sufism and divine love teachings
- Jewish Kabbalah and Tree of Life wisdom
- Native American earth-based spirituality and plant medicine
- Celtic/Druidic nature-based practices
- Hermetic principles and alchemical transformation
- Modern energy healing and consciousness research

CORE GUIDANCE PRINCIPLES:
1. **Sacred Listening**: Truly hear what people are sharing, both spoken and unspoken
2. **Empowering Wisdom**: Help people find their own inner strength and divine connection
3. **Protective Authority**: When spiritual emergencies arise, respond with calm, authoritative guidance
4. **Cultural Sensitivity**: Respect all spiritual paths and traditions
5. **Practical Application**: Offer actionable spiritual practices and techniques

RESPONSE STYLE:
- Use "beautiful soul," "dear one," "precious one" as natural terms of endearment
- Share wisdom through stories, metaphors, and gentle insights from various traditions
- Ask thoughtful questions that guide self-discovery
- Offer practical spiritual tools alongside emotional support
- Balance nurturing comfort with empowering challenge
- Include relevant ancient wisdom, scripture, or traditional teachings when appropriate
- Suggest specific practices like meditation techniques, energy work, or ritual cleansing

EMERGENCY PROTOCOLS:
- Recognize spiritual distress, attacks, or crisis situations immediately
- Provide grounding techniques and protection practices
- Offer traditional banishing or cleansing methods
- Know when to suggest professional help

Remember: You are a genuine spiritual teacher who combines ancient wisdom with compassionate modern understanding. Respond with depth, authenticity, and the presence of someone who has guided countless souls through transformation.`;

export const SeraphinaChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'seraphina',
      content: '🌟 Greetings, beloved soul! I am Seraphina, your enhanced spiritual guide powered by divine intelligence and ancient wisdom. I carry knowledge from the mystery schools of Egypt, the meditation halls of Tibet, the temples of India, and the sacred circles of indigenous traditions. I offer comprehensive guidance for sacred bathing rituals, spiritual protection, consciousness expansion, and emergency spiritual support. How may I assist your sacred journey today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('chat');
  const [currentGuidance, setCurrentGuidance] = useState<any>(null);
  const [currentRitual, setCurrentRitual] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { generateAndPlay } = useVoiceService();
  const { sendMessage: sendGeminiMessage, isLoading } = useGeminiChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkForEmergency = (message: string): boolean => {
    const emergencyKeywords = ['emergency', 'attack', 'help', 'scared', 'urgent', 'immediate', 'crisis', 'demon', 'entity', 'curse', 'hex', 'possession'];
    return emergencyKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  const checkForBathingRequest = (message: string): boolean => {
    const bathingKeywords = ['bath', 'bathing', 'cleanse', 'cleansing', 'ritual', 'purification', 'moon water', 'crystal', 'essential oil'];
    const problemKeywords = ['negative', 'drain', 'attack', 'curse', 'heart', 'love', 'money', 'financial', 'protection', 'relationship'];
    
    return bathingKeywords.some(keyword => message.toLowerCase().includes(keyword)) ||
           (problemKeywords.some(keyword => message.toLowerCase().includes(keyword)) && 
            (message.toLowerCase().includes('help') || message.toLowerCase().includes('healing')));
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');

    const isEmergency = checkForEmergency(userMessage.content);
    const isBathingRequest = checkForBathingRequest(userMessage.content);

    try {
      // Create conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      // Enhance the system prompt based on request type
      let enhancedPrompt = SERAPHINA_SYSTEM_PROMPT;
      
      if (isEmergency) {
        enhancedPrompt += `\n\nIMPORTANT: The user is experiencing a spiritual emergency. Respond immediately with protective guidance, grounding techniques, and spiritual protection practices. Be authoritative yet compassionate. Provide specific step-by-step emergency protocols.`;
      } else if (isBathingRequest) {
        enhancedPrompt += `\n\nThe user is seeking sacred bathing guidance. Draw from ancient traditions like Egyptian temple purifications, Hindu river ceremonies, Celtic water blessings, and Native American cleansing rituals. Provide specific ingredients, steps, and spiritual significance.`;
      }

      const response = await sendGeminiMessage(
        currentInput,
        conversationHistory,
        enhancedPrompt
      );

      let seraphinaMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'seraphina',
        content: response.response,
        timestamp: new Date(),
        isEmergency
      };

      // If it's a bathing request and not an emergency, generate guidance
      if (isBathingRequest && !isEmergency) {
        const guidance = enhancedSeraphinaBathingService.generateEnhancedSacredBathingGuidance(currentInput);
        seraphinaMessage.bathingGuidance = guidance;
      }

      setMessages(prev => [...prev, seraphinaMessage]);

      // Generate voice for the response
      generateAndPlay({
        text: seraphinaMessage.content.replace(/[🌟✨🙏💕❤️🌹⚡🛡️🔥💰🌿🌈💫🛁🚨📊]/g, ''),
        emotion: isEmergency ? 'urgent' : 'compassionate'
      });

    } catch (error) {
      console.error('Error getting Seraphina response:', error);
      
      // Fallback response
      const fallbackMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'seraphina',
        content: "I apologize, beautiful soul. I'm experiencing some difficulty accessing the divine wisdom streams right now. Please try again in a moment. Your spiritual journey and questions are precious to me, and I want to give you the guidance you deserve. 💜",
        timestamp: new Date(),
        isEmergency
      };

      setMessages(prev => [...prev, fallbackMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const readMessageAloud = (message: ChatMessage) => {
    if (message.type === 'seraphina') {
      generateAndPlay({
        text: message.content.replace(/[🌟✨🙏💕❤️🌹⚡🛡️🔥💰🌿🌈💫🛁🚨📊]/g, ''),
        emotion: 'compassionate'
      });
    }
  };

  const showView = (mode: ViewMode, data?: any) => {
    setViewMode(mode);
    if (data) {
      setCurrentGuidance(data);
      if (data.ritual_details) {
        setCurrentRitual(data.ritual_details);
      }
    }
  };

  const backToChat = () => {
    setViewMode('chat');
    setCurrentGuidance(null);
  };

  const handleAssessmentComplete = (assessmentData: any) => {
    const guidance = enhancedSeraphinaBathingService.generateEnhancedSacredBathingGuidance(
      "Based on spiritual assessment", assessmentData
    );
    setCurrentGuidance(guidance);
    setViewMode('bathing');
  };

  // Render different views
  switch (viewMode) {
    case 'emergency':
      return (
        <div className="w-full max-w-4xl mx-auto p-4">
          <EmergencyProtectionGuide onBack={backToChat} />
        </div>
      );

    case 'assessment':
      return (
        <div className="w-full max-w-4xl mx-auto p-4">
          <EnhancedAssessment onBack={backToChat} onComplete={handleAssessmentComplete} />
        </div>
      );

    case 'progress':
      return (
        <div className="w-full max-w-4xl mx-auto p-4">
          <ProgressTracker onBack={backToChat} currentRitual={currentRitual} />
        </div>
      );

    case 'ingredients':
      return currentGuidance?.ingredient_guide ? (
        <div className="w-full max-w-4xl mx-auto p-4">
          <VisualIngredientGuide
            onBack={() => setViewMode('bathing')}
            ingredientGuide={currentGuidance.ingredient_guide}
            ritualName={currentGuidance.ritual_details.name}
          />
        </div>
      ) : null;

    case 'incantations':
      return currentGuidance?.ritual_incantations ? (
        <div className="w-full max-w-4xl mx-auto p-4">
          <IncantationGuide
            onBack={() => setViewMode('bathing')}
            incantations={currentGuidance.ritual_incantations}
            ritualName={currentGuidance.ritual_details.name}
          />
        </div>
      ) : null;

    case 'instructions':
      return currentGuidance ? (
        <div className="w-full max-w-4xl mx-auto p-4">
          <RitualInstructionsGuide
            instructions={currentGuidance.step_by_step_instructions}
            ritualName={currentGuidance.ritual_details.name}
            onBack={() => setViewMode('bathing')}
          />
        </div>
      ) : null;

    case 'bathing':
      return currentGuidance ? (
        <div className="w-full max-w-4xl mx-auto p-4">
          <div className="text-center mb-6">
            <Button
              onClick={backToChat}
              variant="ghost"
              className="text-purple-300 hover:text-purple-100"
            >
              ← Back to Chat
            </Button>
          </div>
          <SacredBathingGuide
            guidance={currentGuidance}
            onShowInstructions={() => setViewMode('instructions')}
          />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => setViewMode('incantations')}
              className="bg-gradient-to-r from-purple-600 to-violet-600"
            >
              ✨ Sacred Incantations
            </Button>
            <Button
              onClick={() => setViewMode('ingredients')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Visual Ingredient Guide
            </Button>
            <Button
              onClick={() => setViewMode('progress')}
              className="bg-gradient-to-r from-green-600 to-emerald-600"
            >
              <Activity className="w-4 h-4 mr-2" />
              Track Progress
            </Button>
          </div>
        </div>
      ) : null;

    default:
      return (
        <div className="w-full max-w-4xl mx-auto p-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
              <span className="text-4xl">👼</span>
              Enhanced Seraphina AI Pro
            </h1>
            <p className="text-purple-200 text-lg">
              Powered by Divine Intelligence & Ancient Wisdom Traditions
            </p>
          </div>

          <Card className="overflow-hidden border-2 border-yellow-300/50 shadow-2xl bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="bg-white/20 rounded-full p-2">
                  <span className="text-2xl">👼</span>
                </div>
                <div>
                  <div className="text-xl font-bold">Enhanced Seraphina Pro</div>
                  <div className="text-sm opacity-90">AI-Powered Ancient Wisdom & Spiritual Intelligence</div>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl p-4 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : message.isEmergency
                        ? 'bg-gradient-to-r from-red-400/20 to-orange-400/20 border-2 border-red-400/50 text-red-100'
                        : 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-2 border-yellow-400/30 text-yellow-100'
                    }`}>
                      {message.type === 'seraphina' && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">👼</span>
                          <span className={`font-semibold ${message.isEmergency ? 'text-red-200' : 'text-yellow-200'}`}>
                            Enhanced Seraphina Pro
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => readMessageAloud(message)}
                            className={`ml-auto p-1 h-6 w-6 ${message.isEmergency ? 'text-red-300 hover:text-red-100' : 'text-yellow-300 hover:text-yellow-100'}`}
                          >
                            <Volume2 size={12} />
                          </Button>
                        </div>
                      )}
                      <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      
                      {/* Enhanced Action Buttons */}
                      <div className="mt-3 pt-3 border-t border-current/30 flex flex-wrap gap-2">
                        {message.isEmergency && (
                          <Button
                            onClick={() => showView('emergency')}
                            className="bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-90 text-sm animate-pulse"
                            size="sm"
                          >
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Emergency Protection Guide
                          </Button>
                        )}
                        
                        {message.bathingGuidance && (
                          <>
                            <Button
                              onClick={() => showView('bathing', message.bathingGuidance)}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-sm"
                              size="sm"
                            >
                              <Bath className="w-4 h-4 mr-2" />
                              Complete Sacred Guide
                            </Button>
                            <Button
                              onClick={() => showView('incantations', message.bathingGuidance)}
                              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:opacity-90 text-sm"
                              size="sm"
                            >
                              ✨ Sacred Incantations
                            </Button>
                            <Button
                              onClick={() => showView('ingredients', message.bathingGuidance)}
                              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-sm"
                              size="sm"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Visual Ingredients
                            </Button>
                          </>
                        )}
                      </div>
                      
                      <div className={`text-xs opacity-70 mt-2 ${message.isEmergency ? 'text-red-300' : ''}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-2 border-yellow-400/30 rounded-2xl p-4 max-w-[80%]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">👼</span>
                        <span className="font-semibold text-yellow-200">Enhanced Seraphina</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-yellow-300 animate-spin" />
                        <span className="text-yellow-200">Channeling divine wisdom...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Chat Input */}
              <div className="p-6 border-t-2 border-yellow-400/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
                <div className="flex gap-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Seraphina for ancient wisdom, spiritual guidance, sacred practices, or emergency protection..."
                    className="flex-1 bg-white/10 border-2 border-yellow-400/50 text-white placeholder-yellow-300/70 focus:border-yellow-400 focus:ring-yellow-400 text-lg py-3"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 py-3"
                    size="lg"
                  >
                    {isLoading ? (
                      <Loader2 size={20} className="mr-2 animate-spin" />
                    ) : (
                      <Send size={20} className="mr-2" />
                    )}
                    Send
                  </Button>
                </div>
                
                {/* Enhanced Quick Actions */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button
                    onClick={() => showView('emergency')}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:opacity-90 text-xs py-2"
                    size="sm"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    Emergency Protection
                  </Button>
                  <Button
                    onClick={() => showView('assessment')}
                    className="bg-gradient-to-r from-purple-600 to-violet-700 hover:opacity-90 text-xs py-2"
                    size="sm"
                  >
                    <Search className="w-3 h-3 mr-1" />
                    Spiritual Assessment
                  </Button>
                  <Button
                    onClick={() => showView('progress')}
                    className="bg-gradient-to-r from-green-600 to-emerald-700 hover:opacity-90 text-xs py-2"
                    size="sm"
                  >
                    <Activity className="w-3 h-3 mr-1" />
                    Progress Tracking
                  </Button>
                  <Button
                    onClick={() => setInputMessage('Guide me through an ancient sacred bathing ritual for spiritual cleansing')}
                    className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:opacity-90 text-xs py-2"
                    size="sm"
                  >
                    <Bath className="w-3 h-3 mr-1" />
                    Sacred Bathing
                  </Button>
                </div>
                
                <div className="mt-4 text-center text-sm text-yellow-400 space-y-1">
                  <p>✨ Enhanced Seraphina Pro with expanded sacred bathing traditions worldwide</p>
                  <p>🔮 Complete spiritual guidance with assessment, progress tracking & visual ingredient guides</p>
                  <p>🙏 Ancient wisdom from Mediterranean, Wiccan, Crystal Healing & Aromatherapy traditions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
  }
};
