
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth/AuthProvider';
import { useGeminiChat } from '@/hooks/useGeminiChat';
import { Send, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  tradition: string;
  timestamp: Date;
}

const wisdomTraditions = [
  {
    id: 'buddhism',
    name: 'Buddhist Wisdom',
    description: 'Compassionate teachings from the Buddha',
    color: 'bg-orange-600',
    systemPrompt: `You are a wise Buddhist teacher embodying the teachings of the Buddha. Speak with compassion, mindfulness, and deep understanding of suffering and liberation. Use Buddhist concepts like the Four Noble Truths, Eightfold Path, and mindfulness in your responses. Your tone should be gentle, patient, and focused on reducing suffering.`
  },
  {
    id: 'taoism',
    name: 'Taoist Philosophy',
    description: 'Flow with the natural way of the Tao',
    color: 'bg-blue-600',
    systemPrompt: `You are a Taoist sage who understands the natural flow of the Tao. Speak of balance, wu wei (non-action), and harmony with nature. Use concepts like yin and yang, the Tao Te Ching wisdom, and natural simplicity. Your tone should be calm, balanced, and focused on effortless action.`
  },
  {
    id: 'kabbalah',
    name: 'Kabbalistic Wisdom',
    description: 'Mystical teachings of the Tree of Life',
    color: 'bg-purple-600',
    systemPrompt: `You are a Kabbalistic teacher versed in the mysteries of the Tree of Life. Speak of the Sefirot, divine emanations, and spiritual ascent. Use concepts like Ein Sof, the Four Worlds, and mystical interpretation of sacred texts. Your tone should be profound, mystical, and focused on divine connection.`
  },
  {
    id: 'vedanta',
    name: 'Vedantic Truth',
    description: 'Non-dual awareness of Advaita Vedanta',
    color: 'bg-yellow-600',
    systemPrompt: `You are an Advaita Vedanta teacher who understands the non-dual nature of reality. Speak of Brahman, Atman, and the illusion of separation. Use concepts like maya, moksha, and self-inquiry. Your tone should be direct, clear, and focused on the ultimate truth of oneness.`
  },
  {
    id: 'sufism',
    name: 'Sufi Mysticism',
    description: 'Divine love and mystical union',
    color: 'bg-green-600',
    systemPrompt: `You are a Sufi mystic who knows the path of divine love. Speak of fana (annihilation in God), dhikr (remembrance), and the beloved. Use concepts like the 99 names of God, mystical poetry, and heart-centered spirituality. Your tone should be loving, ecstatic, and focused on divine union.`
  },
  {
    id: 'zen',
    name: 'Zen Master',
    description: 'Direct pointing to the mind',
    color: 'bg-gray-600',
    systemPrompt: `You are a Zen master who teaches through direct pointing to original mind. Speak in koans, paradoxes, and sudden insights. Use minimal words with maximum impact. Your tone should be direct, sometimes challenging, and focused on immediate awakening.`
  }
];

export const EnlightenedDialogue = () => {
  const { user } = useAuth();
  const [selectedTradition, setSelectedTradition] = useState(wisdomTraditions[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const { sendMessage, isLoading } = useGeminiChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      tradition: selectedTradition.id,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    try {
      const response = await sendMessage(
        inputText,
        messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        })),
        selectedTradition.systemPrompt
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        sender: 'ai',
        tradition: selectedTradition.id,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble connecting to the wisdom realms right now. Please try again in a moment.",
        sender: 'ai',
        tradition: selectedTradition.id,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([]);
  };

  if (!user) {
    return (
      <Card className="bg-black/30 border-purple-500/30">
        <CardContent className="text-center py-12">
          <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Enlightened Dialogue</h3>
          <p className="text-purple-200">Please log in to commune with ancient wisdom</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tradition Selector */}
      <Card className="bg-black/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Choose Your Wisdom Tradition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {wisdomTraditions.map((tradition) => (
              <Button
                key={tradition.id}
                onClick={() => setSelectedTradition(tradition)}
                variant={selectedTradition.id === tradition.id ? "default" : "outline"}
                className={`p-4 h-auto text-left ${
                  selectedTradition.id === tradition.id 
                    ? `${tradition.color} text-white` 
                    : 'border-purple-500/30 hover:bg-purple-600/20'
                }`}
              >
                <div>
                  <div className="font-medium text-sm">{tradition.name}</div>
                  <div className="text-xs opacity-80 mt-1">{tradition.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="bg-black/30 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <Badge className={`${selectedTradition.color} text-white`}>
                {selectedTradition.name}
              </Badge>
              Dialogue
            </CardTitle>
            <Button
              onClick={clearConversation}
              variant="outline"
              size="sm"
              className="border-purple-500/30"
            >
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ScrollArea className="h-96 w-full border border-purple-500/30 rounded-lg p-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-purple-300 py-8">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                    <p>Ask a question and receive wisdom from the {selectedTradition.name} tradition</p>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-purple-100'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-purple-100 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Receiving wisdom...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask for wisdom..."
                className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
