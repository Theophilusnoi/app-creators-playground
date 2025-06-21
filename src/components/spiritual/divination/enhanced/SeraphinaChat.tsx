import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useVoiceService } from '@/hooks/useVoiceService';
import { useToast } from '@/hooks/use-toast';
import { Send, Volume2, Bath, AlertTriangle, Shield, Activity, Search, ShoppingCart } from 'lucide-react';
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

export const SeraphinaChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'seraphina',
      content: '🌟 Greetings, beloved soul! I am Enhanced Seraphina, your comprehensive divine spiritual guide. I now offer expanded sacred bathing wisdom from ancient traditions worldwide, guided spiritual assessment, progress tracking, and complete visual ingredient guides. I can help with protection, love healing, abundance, spiritual cleansing, moon water rituals, crystal healing, essential oil chakra work, and spiritual emergencies. How may I assist your spiritual journey today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('chat');
  const [currentGuidance, setCurrentGuidance] = useState<any>(null);
  const [currentRitual, setCurrentRitual] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { generateAndPlay } = useVoiceService();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateSeraphinaResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Enhanced emergency detection
    const emergencyKeywords = ['emergency', 'attack', 'help', 'scared', 'urgent', 'immediate', 'now', 'crisis'];
    const spiritualAttackKeywords = ['spiritual attack', 'curse', 'hex', 'evil', 'demon', 'possession', 'dark entity'];
    
    if (emergencyKeywords.some(keyword => lowerMessage.includes(keyword)) || 
        spiritualAttackKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "🚨 I sense you are experiencing a spiritual emergency. I am immediately providing you with divine protection guidance. You are not alone - the divine forces of light are surrounding you with protection right now.";
    }
    
    // Enhanced sacred bathing detection
    const bathingKeywords = ['bath', 'bathing', 'cleanse', 'cleansing', 'ritual', 'purification', 'moon water', 'crystal', 'essential oil', 'chakra'];
    if (bathingKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "🛁 I sense you are seeking sacred bathing guidance for spiritual healing. I can now offer you enhanced rituals from ancient traditions worldwide, including moon water cleansing, crystal-infused baths, and essential oil chakra alignment. Let me provide you with a personalized sacred bathing experience.";
    }
    
    // Assessment request detection
    if (lowerMessage.includes('assess') || lowerMessage.includes('question') || lowerMessage.includes('guidance')) {
      return "✨ I can provide you with a comprehensive spiritual assessment through guided sacred questioning. This will help me understand your unique spiritual needs and provide the most appropriate healing guidance for your journey.";
    }
    
    // Progress tracking detection
    if (lowerMessage.includes('progress') || lowerMessage.includes('track') || lowerMessage.includes('journey')) {
      return "📊 I can help you track your spiritual healing journey with our progress monitoring system. This allows you to document your experiences, feelings, and growth throughout your sacred bathing rituals.";
    }

    // Enhanced greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('greetings')) {
      const greetings = [
        "🌟 Greetings, beloved soul! I now offer enhanced spiritual guidance with expanded sacred bathing traditions, guided assessment, progress tracking, and visual ingredient guides. What aspect of your spiritual journey needs attention today?",
        "✨ Welcome, precious one! I have been upgraded with ancient sacred bathing wisdom from cultures worldwide, comprehensive assessment tools, and progress tracking capabilities. How can I support your spiritual healing?",
        "🙏 Divine blessings to you! I offer complete spiritual guidance including traditional moon water rituals, crystal healing baths, essential oil chakra work, and emergency protection. What brings you to seek spiritual wisdom today?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Enhanced spiritual guidance responses
    const responses = [
      "🌟 I sense your spiritual energy and am here to provide comprehensive guidance. Would you like me to conduct a spiritual assessment, recommend sacred bathing rituals, or provide emergency protection?",
      "✨ Your soul is calling for healing and transformation. I can offer enhanced sacred bathing wisdom, progress tracking, and personalized spiritual guidance based on ancient traditions.",
      "🙏 The divine has guided you here for a reason. Let me help you with enhanced spiritual practices, detailed ingredient guides, and comprehensive healing support."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const checkForEmergency = (message: string): boolean => {
    const emergencyKeywords = ['emergency', 'attack', 'help', 'scared', 'urgent', 'immediate', 'crisis'];
    const spiritualAttackKeywords = ['spiritual attack', 'curse', 'hex', 'evil', 'demon', 'possession'];
    
    return emergencyKeywords.some(keyword => message.toLowerCase().includes(keyword)) ||
           spiritualAttackKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  const checkForBathingRequest = (message: string): boolean => {
    const bathingKeywords = ['bath', 'bathing', 'cleanse', 'cleansing', 'ritual', 'purification', 'moon water', 'crystal', 'essential oil'];
    const problemKeywords = ['negative', 'drain', 'attack', 'curse', 'heart', 'love', 'money', 'financial', 'protection', 'relationship'];
    
    return bathingKeywords.some(keyword => message.toLowerCase().includes(keyword)) ||
           (problemKeywords.some(keyword => message.toLowerCase().includes(keyword)) && 
            (message.toLowerCase().includes('help') || message.toLowerCase().includes('healing')));
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    const isEmergency = checkForEmergency(userMessage.content);
    const isBathingRequest = checkForBathingRequest(userMessage.content);

    setTimeout(() => {
      const response = generateSeraphinaResponse(userMessage.content);
      
      let seraphinaMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'seraphina',
        content: response,
        timestamp: new Date(),
        isEmergency
      };

      if (isBathingRequest && !isEmergency) {
        const guidance = enhancedSeraphinaBathingService.generateEnhancedSacredBathingGuidance(userMessage.content);
        seraphinaMessage.bathingGuidance = guidance;
        seraphinaMessage.content = guidance.seraphina_message;
      }

      setMessages(prev => [...prev, seraphinaMessage]);
      setIsTyping(false);

      generateAndPlay({
        text: seraphinaMessage.content.replace(/[🌟✨🙏💕❤️🌹⚡🛡️🔥💰🌿🌈💫🛁🚨📊]/g, ''),
        emotion: isEmergency ? 'urgent' : 'compassionate'
      });
    }, 1500);
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
              Complete spiritual guidance with expanded sacred bathing traditions, assessment & progress tracking
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
                  <div className="text-sm opacity-90">Complete Spiritual Guidance & Sacred Healing Oracle</div>
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
                      <p className="leading-relaxed">{message.content}</p>
                      
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
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-2 border-yellow-400/30 rounded-2xl p-4 max-w-[80%]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">👼</span>
                        <span className="font-semibold text-yellow-200">Enhanced Seraphina</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                    placeholder="Ask Enhanced Seraphina for comprehensive spiritual guidance, assessment, sacred bathing, or progress tracking..."
                    className="flex-1 bg-white/10 border-2 border-yellow-400/50 text-white placeholder-yellow-300/70 focus:border-yellow-400 focus:ring-yellow-400 text-lg py-3"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 py-3"
                    size="lg"
                  >
                    <Send size={20} className="mr-2" />
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
                    onClick={() => setInputMessage('Tell me about expanded sacred bathing traditions')}
                    className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:opacity-90 text-xs py-2"
                    size="sm"
                  >
                    🛁 Sacred Traditions
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
