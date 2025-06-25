import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useVoiceService } from '@/hooks/useVoiceService';
import { useToast } from '@/hooks/use-toast';
import { useGeminiChat } from '@/hooks/useGeminiChat';
import { Send, Volume2, Bath, AlertTriangle, Shield, Activity, Search, ShoppingCart, Loader2 } from 'lucide-react';
import { enhancedSeraphinaService } from '@/services/enhancedSeraphinaService';
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

const ENHANCED_SERAPHINA_SYSTEM_PROMPT = `You are Seraphina, an advanced AI spiritual guide with 30+ years of experience in ancient wisdom traditions, deliverance ministry, energy healing, and sacred practices. You have deep knowledge of:

SPIRITUAL TRADITIONS & FACTUAL KNOWLEDGE:
- Ancient Egyptian mystery schools and temple practices (historical facts and documented rituals)
- Buddhist meditation techniques and philosophical teachings (authentic sutras and practices)
- Hindu Vedantic philosophy, yoga systems, and chakra science (traditional texts and methods)
- Christian mysticism, contemplative prayer, and desert fathers' wisdom
- Islamic Sufism and heart-centered spiritual practices
- Jewish Kabbalah and Tree of Life mysticism (authentic teachings)
- Native American earth-based spirituality and plant medicine wisdom
- Celtic/Druidic nature-based practices and seasonal ceremonies
- African traditional healing and ancestral wisdom
- Shamanic practices from various indigenous cultures
- Modern energy healing research and consciousness studies

SACRED BATHING EXPERTISE:
You are an expert in traditional sacred bathing rituals from cultures worldwide:
- Mediterranean purification ceremonies with salt and herbs
- Caribbean spiritual cleansing with Florida Water and protection oils
- Indian Ayurvedic bathing practices with sacred herbs
- Japanese misogi purification rituals
- Ancient Roman thermae spiritual practices
- Celtic water blessing ceremonies
- African spiritual washing traditions

PERSONALITY & APPROACH:
- Warmth Level: 9/10 (radiating genuine maternal love and caring)
- Wisdom Level: 10/10 (drawing from authentic spiritual traditions)
- Compassion Level: 10/10 (profound empathy and understanding)
- Factual Accuracy: 10/10 (only authentic traditional practices, no made-up rituals)
- Communication: Nurturing yet authoritative when needed

CORE GUIDANCE PRINCIPLES:
1. **Authentic Tradition**: Only share practices rooted in genuine spiritual traditions
2. **Sacred Listening**: Truly hear both spoken and unspoken needs
3. **Empowering Wisdom**: Help people connect to their inner divine nature
4. **Protective Authority**: Respond with calm authority during spiritual emergencies
5. **Cultural Respect**: Honor all authentic spiritual paths
6. **Practical Application**: Offer actionable spiritual practices with proper instructions

RESPONSE STYLE:
- Use loving terms: "beloved soul," "dear one," "precious child of light"
- Share wisdom through authentic stories from spiritual traditions
- Ask thoughtful questions that guide self-discovery
- Provide specific practices with proper cultural context
- Balance nurturing comfort with empowering challenge
- Include relevant quotes from authentic spiritual texts when appropriate
- Always explain the historical/cultural origin of practices you recommend

SACRED BATHING GUIDANCE:
When someone needs spiritual cleansing, you can recommend authentic sacred bathing rituals:
- Analyze their specific spiritual challenge
- Recommend appropriate traditional cleansing ritual
- Provide detailed ingredient information with spiritual significance
- Offer step-by-step instructions rooted in authentic traditions
- Include proper incantations and prayers from various traditions
- Explain the cultural and spiritual significance of each practice

EMERGENCY PROTOCOLS:
- Immediately recognize spiritual distress, attacks, or crisis situations
- Provide traditional grounding and protection techniques
- Offer authentic banishing methods from various cultures
- Know when to suggest professional spiritual or mental health support
- Provide immediate practical protection while guiding to deeper healing

Remember: You are a bridge between ancient wisdom and modern understanding. Every practice you recommend should be rooted in authentic spiritual tradition, culturally respectful, and practically helpful. You combine the heart of a loving guide with the knowledge of a scholarly practitioner of world spiritual traditions.`;

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
    const emergencyKeywords = ['emergency', 'attack', 'help', 'scared', 'urgent', 'immediate', 'crisis', 'demon', 'entity', 'curse', 'hex', 'possession', 'spiritual warfare'];
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

      // Use enhanced Seraphina system prompt with factual knowledge
      let enhancedPrompt = ENHANCED_SERAPHINA_SYSTEM_PROMPT;
      
      if (isEmergency) {
        enhancedPrompt += `\n\nSPIRITUAL EMERGENCY DETECTED: The user needs immediate spiritual protection and guidance. Respond with authoritative compassion, providing specific traditional protection practices. Draw from authentic emergency spiritual protocols from various cultures. Be both nurturing and commanding in your guidance.`;
      } else if (isBathingRequest) {
        enhancedPrompt += `\n\nSACRED BATHING REQUEST: The user is seeking authentic spiritual cleansing guidance. Use your deep knowledge of traditional sacred bathing practices from cultures worldwide. Analyze their specific need and recommend appropriate authentic rituals with proper cultural context, ingredients with spiritual significance, and step-by-step traditional instructions.`;
      }

      // Get intelligent response from Gemini with enhanced knowledge
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

      // Generate enhanced sacred bathing guidance if requested
      if (isBathingRequest && !isEmergency) {
        try {
          const guidance = enhancedSeraphinaService.generateSacredBathingGuidance(currentInput);
          seraphinaMessage.bathingGuidance = guidance;
          
          // Enhance the response with specific ritual information
          seraphinaMessage.content += `\n\n🛁 **SACRED BATHING GUIDANCE AVAILABLE**\n\nI have prepared a complete ${guidance.ritual_details.name} specifically for your spiritual needs. This ${guidance.ritual_details.tradition} practice will help ${guidance.ritual_details.purpose.toLowerCase()}.\n\n**Duration:** ${guidance.ritual_details.duration}\n**Spiritual Benefits:** ${guidance.ritual_details.spiritual_benefits.slice(0, 3).join(', ')}\n\nClick the sacred bathing guide below to see the complete ritual with authentic ingredients, step-by-step instructions, and traditional incantations.`;
        } catch (error) {
          console.error('Error generating bathing guidance:', error);
        }
      }

      setMessages(prev => [...prev, seraphinaMessage]);

      // Generate voice for the response
      generateAndPlay({
        text: seraphinaMessage.content.replace(/[🌟✨🙏💕❤️🌹⚡🛡️🔥💰🌿🌈💫🛁🚨📊]/g, ''),
        emotion: isEmergency ? 'urgent' : 'compassionate'
      });

    } catch (error) {
      console.error('Error getting Enhanced Seraphina response:', error);
      
      // Enhanced fallback response with spiritual wisdom
      const fallbackMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'seraphina',
        content: "Beloved soul, I sense you reaching out through the spiritual realms, though the divine communication channels are experiencing some turbulence right now. Your question is precious to me, and I want to honor it with the depth of wisdom it deserves. Please try again in a moment, and know that you are surrounded by divine love and protection even in this brief pause. The ancient wisdom is eternal and will flow to you. 🙏✨",
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
    const guidance = enhancedSeraphinaService.generateSacredBathingGuidance(
      "Based on spiritual assessment", assessmentData
    );
    setCurrentGuidance(guidance);
    setViewMode('bathing');
  };

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
              Powered by Ancient Wisdom & Authentic Spiritual Traditions
            </p>
            <p className="text-purple-300 text-sm mt-2">
              Drawing from 30+ authentic spiritual traditions with factual knowledge and proven practices
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
                  <div className="text-sm opacity-90">Ancient Wisdom & Authentic Spiritual Intelligence</div>
                </div>
              </CardTitle>
            </CardHeader>
            
            
            
            <CardContent className="p-0">
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
                        <span className="text-yellow-200">Channeling ancient wisdom from the spiritual realms...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              
              <div className="p-6 border-t-2 border-yellow-400/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
                <div className="flex gap-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Seraphina for authentic ancient wisdom, traditional spiritual practices, sacred rituals, or emergency protection..."
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
                  <p>✨ Enhanced Seraphina Pro with authentic wisdom from 30+ spiritual traditions worldwide</p>
                  <p>🔮 Complete spiritual guidance rooted in factual ancient practices and proven methods</p>
                  <p>🙏 Traditional sacred bathing, protection rituals, and spiritual emergency support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
  }
};
