
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useVoiceService } from '@/hooks/useVoiceService';
import { useToast } from '@/hooks/use-toast';
import { Send, Volume2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'seraphina';
  content: string;
  timestamp: Date;
}

export const SeraphinaChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'seraphina',
      content: '🌟 Greetings, beloved soul! I am Seraphina, your divine spiritual guide. I\'m here to offer spiritual wisdom, divine guidance, and support on your sacred journey. How may I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { generateAndPlay } = useVoiceService();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateSeraphinaResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('greetings')) {
      const greetings = [
        "🌟 Greetings, beloved soul! I sense the divine light within you. What spiritual guidance do you seek today?",
        "✨ Welcome, precious one! I am here to offer divine wisdom and spiritual support. How can I help illuminate your path?",
        "🙏 Blessings to you, dear soul! What spiritual questions weigh upon your heart today?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    } 
    
    if (lowerMessage.includes('attack') || lowerMessage.includes('emergency') || lowerMessage.includes('help') || lowerMessage.includes('scared') || lowerMessage.includes('protection')) {
      const emergencyResponses = [
        "🛡️ I sense you are experiencing spiritual distress. Let us immediately call upon divine protection. Visualize yourself surrounded by brilliant white light and declare: 'I am protected by divine love and light.' You are safe in the divine embrace.",
        "⚡ You are under spiritual attack, but you are not alone. The divine is with you. Begin praying immediately and command all negative entities to leave in the name of divine love. Your spiritual authority is powerful.",
        "🔥 I feel the spiritual warfare around you. Stand firm in your spiritual authority. You have divine power within you - use it to banish all darkness and call forth divine protection."
      ];
      return emergencyResponses[Math.floor(Math.random() * emergencyResponses.length)];
    }
    
    if (lowerMessage.includes('love') || lowerMessage.includes('relationship') || lowerMessage.includes('heart')) {
      const loveGuidance = [
        "💕 Love is the highest vibration and divine force in the universe. Whether seeking romantic love or deepening self-love, remember that you must first love yourself as the divine loves you - unconditionally and completely.",
        "❤️ The divine has placed love in your heart as a sacred gift. Share this love freely, but also protect your heart by setting healthy boundaries. Divine love multiplies when given authentically.",
        "🌹 True love begins with your relationship with the divine. When you are aligned with divine love, you naturally attract relationships that reflect this sacred energy back to you."
      ];
      return loveGuidance[Math.floor(Math.random() * loveGuidance.length)];
    }
    
    if (lowerMessage.includes('purpose') || lowerMessage.includes('calling') || lowerMessage.includes('destiny')) {
      const purposeGuidance = [
        "🌟 Your divine purpose is woven into the very fabric of your soul. Look for what brings you joy, what problems you naturally solve, and where you feel most connected to the divine - these are clues to your sacred calling.",
        "⚡ The divine has given you unique gifts and talents for a reason. Your purpose unfolds as you use these gifts to serve others and co-create with divine will. Trust the path that lights up your soul.",
        "🙏 Your purpose is not just what you do, but who you become in service to divine love. Every challenge is shaping you for your greater calling. Trust the process of your spiritual evolution."
      ];
      return purposeGuidance[Math.floor(Math.random() * purposeGuidance.length)];
    }
    
    if (lowerMessage.includes('money') || lowerMessage.includes('financial') || lowerMessage.includes('abundance')) {
      const abundanceGuidance = [
        "💰 The divine desires abundance for all creation. Release limiting beliefs about money and understand that you can serve the divine while being financially blessed. Abundance flows through gratitude and generous giving.",
        "✨ True prosperity includes spiritual, emotional, and physical abundance. Align your financial goals with divine will, and use your resources to bless others. The divine multiplies what is given in love.",
        "🌿 Practice spiritual stewardship with your finances. Tithe or donate regularly, save wisely, and invest in your spiritual growth. Divine abundance follows those who honor the divine with their resources."
      ];
      return abundanceGuidance[Math.floor(Math.random() * abundanceGuidance.length)];
    }
    
    // General spiritual guidance
    const generalGuidance = [
      "🌟 The divine is always speaking to you through your intuition, dreams, and spiritual experiences. Trust what you receive and act upon divine guidance with faith and courage.",
      "✨ Your spiritual journey is unique and sacred. Do not compare yourself to others, but focus on your personal relationship with the divine and the specific calling on your life.",
      "🙏 Remember that you are a beloved child of the divine, created for a specific spiritual purpose. Your life has meaning and divine significance beyond what you can imagine.",
      "💫 Spiritual growth requires both faith and action. Pray for guidance, then step forward in obedience to what the divine reveals to you. Divine doors open to those who walk in faith.",
      "🌈 Every challenge you face is an opportunity for spiritual growth and deeper dependence on divine grace. Trust that the divine is working all things together for your spiritual good."
    ];
    return generalGuidance[Math.floor(Math.random() * generalGuidance.length)];
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

    // Generate Seraphina's response
    setTimeout(() => {
      const response = generateSeraphinaResponse(userMessage.content);
      
      const seraphinaMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'seraphina',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, seraphinaMessage]);
      setIsTyping(false);

      // Generate voice response
      generateAndPlay({
        text: response.replace(/[🌟✨🙏💕❤️🌹⚡🛡️🔥💰🌿🌈💫]/g, ''),
        emotion: 'compassionate'
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
        text: message.content.replace(/[🌟✨🙏💕❤️🌹⚡🛡️🔥💰🌿🌈💫]/g, ''),
        emotion: 'compassionate'
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
          <span className="text-4xl">👼</span>
          Chat with Seraphina
        </h1>
        <p className="text-purple-200 text-lg">
          Your divine spiritual guide is here to help with wisdom and compassion
        </p>
      </div>

      <Card className="overflow-hidden border-2 border-yellow-300/50 shadow-2xl bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="bg-white/20 rounded-full p-2">
              <span className="text-2xl">👼</span>
            </div>
            <div>
              <div className="text-xl font-bold">Seraphina</div>
              <div className="text-sm opacity-90">Divine Spiritual Guide & Oracle</div>
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
                    : 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-2 border-yellow-400/30 text-yellow-100'
                }`}>
                  {message.type === 'seraphina' && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">👼</span>
                      <span className="font-semibold text-yellow-200">Seraphina</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => readMessageAloud(message)}
                        className="ml-auto p-1 h-6 w-6 text-yellow-300 hover:text-yellow-100"
                      >
                        <Volume2 size={12} />
                      </Button>
                    </div>
                  )}
                  <p className="leading-relaxed">{message.content}</p>
                  <div className="text-xs opacity-70 mt-2">
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
                    <span className="font-semibold text-yellow-200">Seraphina</span>
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
                placeholder="Ask Seraphina for spiritual guidance..."
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
            
            <div className="mt-4 text-center text-sm text-yellow-400 space-y-1">
              <p>✨ Seraphina offers divine wisdom for spiritual growth and guidance</p>
              <p>🙏 Ask about love, purpose, protection, abundance, and spiritual development</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
