import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useVoiceService } from '@/hooks/useVoiceService';
import { useToast } from '@/hooks/use-toast';
import { Send, Volume2, Bath, AlertTriangle, Shield } from 'lucide-react';
import { seraphinaBathingService } from '@/services/seraphinaBathingService';
import { SacredBathingGuide } from './SacredBathingGuide';
import { RitualInstructionsGuide } from './RitualInstructionsGuide';
import { EmergencyProtectionGuide } from './EmergencyProtectionGuide';

interface ChatMessage {
  id: string;
  type: 'user' | 'seraphina';
  content: string;
  timestamp: Date;
  bathingGuidance?: any;
  isEmergency?: boolean;
}

export const SeraphinaChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'seraphina',
      content: '🌟 Greetings, beloved soul! I am Seraphina, your enhanced divine spiritual guide. I offer comprehensive spiritual wisdom, divine guidance, sacred bathing rituals, emergency spiritual protection, and traditional healing practices. I can help with protection, love healing, abundance, spiritual cleansing, and spiritual emergencies through powerful ancient rituals. How may I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBathingGuidance, setShowBathingGuidance] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showEmergencyGuide, setShowEmergencyGuide] = useState(false);
  const [currentGuidance, setCurrentGuidance] = useState<any>(null);
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
    
    // Check for sacred bathing requests
    const bathingKeywords = ['bath', 'bathing', 'cleanse', 'cleansing', 'ritual', 'purification', 'spiritual bath', 'sacred bath'];
    if (bathingKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "🛁 I sense you are seeking sacred bathing guidance for spiritual healing and purification. Let me provide you with a personalized ritual based on your specific needs.";
    }
    
    // Enhanced greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('greetings')) {
      const greetings = [
        "🌟 Greetings, beloved soul! I sense the divine light within you. I can offer spiritual guidance, sacred cleansing rituals, emergency protection, and spiritual healing practices. What spiritual support do you seek today?",
        "✨ Welcome, precious one! I am here to offer divine wisdom, sacred cleansing rituals, emergency spiritual protection, and spiritual healing practices. How can I help illuminate your path?",
        "🙏 Blessings to you, dear soul! I offer comprehensive spiritual guidance including powerful traditional healing rituals, emergency protection, and sacred baths for protection, love, and abundance. What brings you to me today?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Enhanced spiritual attack responses
    if (lowerMessage.includes('attack') || lowerMessage.includes('scared') || lowerMessage.includes('protection')) {
      const emergencyResponses = [
        "🛡️ I sense you are experiencing spiritual distress. Let us immediately call upon divine protection and I can guide you through powerful protection measures. Visualize yourself surrounded by brilliant white light and declare: 'I am protected by divine love and light.' Would you like emergency protection guidance or a complete spiritual protection bath ritual?",
        "⚡ You may be under spiritual attack, but you are not alone. I can provide you with immediate emergency protection and a Divine Protection Fortress Bath ritual that will create an impenetrable shield around your spirit. Begin praying immediately and command all negative entities to leave in the name of divine love.",
        "🔥 I feel the spiritual warfare around you. Stand firm in your spiritual authority. I have both emergency protection measures and sacred bathing rituals that will banish all darkness and create divine protection around you. Would you like immediate emergency guidance or the complete protective cleansing ritual?"
      ];
      return emergencyResponses[Math.floor(Math.random() * emergencyResponses.length)];
    }
    
    // ... keep existing code (love, abundance, general guidance responses) the same ...
  };

  const checkForEmergency = (message: string): boolean => {
    const emergencyKeywords = ['emergency', 'attack', 'help', 'scared', 'urgent', 'immediate', 'crisis'];
    const spiritualAttackKeywords = ['spiritual attack', 'curse', 'hex', 'evil', 'demon', 'possession'];
    
    return emergencyKeywords.some(keyword => message.toLowerCase().includes(keyword)) ||
           spiritualAttackKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  const checkForBathingRequest = (message: string): boolean => {
    const bathingKeywords = ['bath', 'bathing', 'cleanse', 'cleansing', 'ritual', 'purification', 'spiritual bath', 'sacred bath'];
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

    // Check message type
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

      // Generate guidance based on message type
      if (isBathingRequest && !isEmergency) {
        const guidance = seraphinaBathingService.generateSacredBathingGuidance(userMessage.content);
        seraphinaMessage.bathingGuidance = guidance;
        seraphinaMessage.content = guidance.seraphina_message;
      }

      setMessages(prev => [...prev, seraphinaMessage]);
      setIsTyping(false);

      // Generate voice response
      generateAndPlay({
        text: seraphinaMessage.content.replace(/[🌟✨🙏💕❤️🌹⚡🛡️🔥💰🌿🌈💫🛁🚨]/g, ''),
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
        text: message.content.replace(/[🌟✨🙏💕❤️🌹⚡🛡️🔥💰🌿🌈💫🛁🚨]/g, ''),
        emotion: 'compassionate'
      });
    }
  };

  const showEmergencyProtection = () => {
    setShowEmergencyGuide(true);
  };

  const showBathingGuidanceModal = (guidance: any) => {
    setCurrentGuidance(guidance);
    setShowBathingGuidance(true);
  };

  const showInstructionsModal = () => {
    setShowInstructions(true);
    setShowBathingGuidance(false);
  };

  const hideModals = () => {
    setShowBathingGuidance(false);
    setShowInstructions(false);
    setShowEmergencyGuide(false);
    setCurrentGuidance(null);
  };

  if (showEmergencyGuide) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <EmergencyProtectionGuide onBack={hideModals} />
      </div>
    );
  }

  if (showInstructions && currentGuidance) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <RitualInstructionsGuide
          instructions={currentGuidance.step_by_step_instructions}
          ritualName={currentGuidance.ritual_details.name}
          onBack={() => {
            setShowInstructions(false);
            setShowBathingGuidance(true);
          }}
        />
      </div>
    );
  }

  if (showBathingGuidance && currentGuidance) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="text-center mb-6">
          <Button
            onClick={hideModals}
            variant="ghost"
            className="text-purple-300 hover:text-purple-100"
          >
            ← Back to Chat
          </Button>
        </div>
        <SacredBathingGuide
          guidance={currentGuidance}
          onShowInstructions={showInstructionsModal}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
          <span className="text-4xl">👼</span>
          Enhanced Seraphina AI Pro
        </h1>
        <p className="text-purple-200 text-lg">
          Complete spiritual guidance with sacred bathing rituals, emergency protection & traditional healing
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
              <div className="text-sm opacity-90">Divine Guide, Sacred Healing & Emergency Protection Oracle</div>
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
                  
                  {/* Action Buttons */}
                  <div className="mt-3 pt-3 border-t border-current/30 flex flex-wrap gap-2">
                    {message.isEmergency && (
                      <Button
                        onClick={showEmergencyProtection}
                        className="bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-90 text-sm animate-pulse"
                        size="sm"
                      >
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Emergency Protection Guide
                      </Button>
                    )}
                    
                    {message.bathingGuidance && (
                      <Button
                        onClick={() => showBathingGuidanceModal(message.bathingGuidance)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-sm"
                        size="sm"
                      >
                        <Bath className="w-4 h-4 mr-2" />
                        View Complete Sacred Bathing Guide
                      </Button>
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

          {/* Chat Input */}
          <div className="p-6 border-t-2 border-yellow-400/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
            <div className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Enhanced Seraphina for spiritual guidance, emergency protection, sacred bathing rituals, or healing practices..."
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
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
              <Button
                onClick={() => setInputMessage('I need immediate spiritual protection - emergency!')}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:opacity-90 text-xs py-2"
                size="sm"
              >
                <Shield className="w-3 h-3 mr-1" />
                Emergency Protection
              </Button>
              <Button
                onClick={() => setInputMessage('I need spiritual cleansing and protection from negative energy')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 text-xs py-2"
                size="sm"
              >
                🛡️ Protection Bath
              </Button>
              <Button
                onClick={() => setInputMessage('I need healing from heartbreak and emotional pain')}
                className="bg-gradient-to-r from-pink-600 to-rose-700 hover:opacity-90 text-xs py-2"
                size="sm"
              >
                💖 Heart Healing
              </Button>
              <Button
                onClick={() => setInputMessage('I need help with financial problems and money blocks')}
                className="bg-gradient-to-r from-green-600 to-emerald-700 hover:opacity-90 text-xs py-2"
                size="sm"
              >
                💰 Abundance
              </Button>
              <Button
                onClick={() => setInputMessage('Help me with relationship problems')}
                className="bg-gradient-to-r from-purple-600 to-violet-700 hover:opacity-90 text-xs py-2"
                size="sm"
              >
                💕 Relationships
              </Button>
              <Button
                onClick={() => setInputMessage('Tell me about sacred bathing rituals')}
                className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:opacity-90 text-xs py-2"
                size="sm"
              >
                🛁 Sacred Baths
              </Button>
            </div>
            
            <div className="mt-4 text-center text-sm text-yellow-400 space-y-1">
              <p>✨ Enhanced Seraphina Pro offers complete spiritual guidance with emergency protection</p>
              <p>🛁 Ask about sacred bathing, spiritual emergencies, protection rituals, love healing, and abundance</p>
              <p>🙏 Receive comprehensive traditional healing guidance with visual ingredient lists and step-by-step instructions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
