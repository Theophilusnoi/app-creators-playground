
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedSeraphinaChatPro } from './divination/enhanced/EnhancedSeraphinaChatPro';
import { TarotReader } from './divination/TarotReader';
import { SacredBathingSystem } from './SacredBathingSystem';
import { SpiritualKnowledgeBase } from './SpiritualKnowledgeBase';
import { 
  Sparkles, 
  Star, 
  Heart, 
  Brain, 
  Mic, 
  Eye, 
  Book, 
  Bath,
  MessageCircle
} from 'lucide-react';

export const SpiritualHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('seraphina');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-blue-950 to-indigo-950 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-900/60 via-blue-900/60 to-indigo-900/60 border-purple-500/30">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                ✨ SpiritualMind Pro Enhanced ✨
              </span>
            </CardTitle>
            <p className="text-purple-200 text-xl mb-4">
              Complete AI-Powered Spiritual Guidance Platform
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-purple-600/30 text-purple-200 text-sm">🧠 Advanced AI Context</Badge>
              <Badge className="bg-blue-600/30 text-blue-200 text-sm">🎙️ Voice Integration</Badge>
              <Badge className="bg-green-600/30 text-green-200 text-sm">🔮 Divine Divination</Badge>
              <Badge className="bg-yellow-600/30 text-yellow-200 text-sm">📚 Vast Knowledge Base</Badge>
              <Badge className="bg-pink-600/30 text-pink-200 text-sm">🛁 Sacred Rituals</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black/30">
            <TabsTrigger 
              value="seraphina" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600/50"
            >
              <Sparkles className="w-4 h-4" />
              Seraphina Pro
            </TabsTrigger>
            <TabsTrigger 
              value="tarot" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600/50"
            >
              <Star className="w-4 h-4" />
              Tarot Reading
            </TabsTrigger>
            <TabsTrigger 
              value="bathing" 
              className="flex items-center gap-2 data-[state=active]:bg-green-600/50"
            >
              <Bath className="w-4 h-4" />
              Sacred Bathing
            </TabsTrigger>
            <TabsTrigger 
              value="knowledge" 
              className="flex items-center gap-2 data-[state=active]:bg-yellow-600/50"
            >
              <Book className="w-4 h-4" />
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger 
              value="classic" 
              className="flex items-center gap-2 data-[state=active]:bg-pink-600/50"
            >
              <MessageCircle className="w-4 h-4" />
              Classic Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="seraphina" className="mt-6">
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-bold text-white">🌟 Seraphina Pro Enhanced</h3>
                    <p className="text-purple-200">
                      Advanced AI spiritual guide with complete conversation memory, voice interaction, 
                      and personalized guidance from 30+ spiritual traditions
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-black/20 rounded-lg p-4">
                        <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <h4 className="text-white font-medium">Context Awareness</h4>
                        <p className="text-purple-300 text-sm">Remembers your journey and provides increasingly personalized guidance</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-4">
                        <Mic className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <h4 className="text-white font-medium">Voice Integration</h4>
                        <p className="text-blue-300 text-sm">Speak your questions and hear Seraphina's wisdom with spiritual voice tones</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-4">
                        <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                        <h4 className="text-white font-medium">Deep Wisdom</h4>
                        <p className="text-pink-300 text-sm">Access to authentic spiritual knowledge from world traditions</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <EnhancedSeraphinaChatPro />
            </div>
          </TabsContent>

          <TabsContent value="tarot" className="mt-6">
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-500/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">🃏 Divine Tarot Guidance</h3>
                    <p className="text-blue-200">
                      Receive sacred wisdom through authentic tarot readings with multiple spread options
                    </p>
                  </div>
                </CardContent>
              </Card>
              <TarotReader />
            </div>
          </TabsContent>

          <TabsContent value="bathing" className="mt-6">
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-green-900/40 to-teal-900/40 border-green-500/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">🛁 Sacred Bathing Rituals</h3>
                    <p className="text-green-200">
                      Personalized cleansing rituals and spiritual bathing guidance
                    </p>
                  </div>
                </CardContent>
              </Card>
              <SacredBathingSystem />
            </div>
          </TabsContent>

          <TabsContent value="knowledge" className="mt-6">
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-yellow-500/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">📚 Spiritual Knowledge Base</h3>
                    <p className="text-yellow-200">
                      Explore comprehensive spiritual wisdom from traditions worldwide
                    </p>
                  </div>
                </CardContent>
              </Card>
              <SpiritualKnowledgeBase />
            </div>
          </TabsContent>

          <TabsContent value="classic" className="mt-6">
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-pink-500/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">💬 Classic Seraphina Chat</h3>
                    <p className="text-pink-200">
                      Original spiritual guidance chat interface
                    </p>
                  </div>
                </CardContent>
              </Card>
              {/* You can import and use your original EnhancedSeraphinaChat here */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
