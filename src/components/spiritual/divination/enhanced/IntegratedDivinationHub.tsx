
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedPalmReaderWithCamera } from './EnhancedPalmReaderWithCamera';
import { EnhancedTarotReaderAdvanced } from './EnhancedTarotReaderAdvanced';
import { SeraphinaChat } from './SeraphinaChat';
import { Hand, Zap, Heart } from 'lucide-react';

export const IntegratedDivinationHub = () => {
  const [activeTab, setActiveTab] = useState('palm');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            🔮 Sacred Divination Hub Pro
          </h1>
          <p className="text-xl text-purple-200">
            Advanced Camera Integration • Enhanced AI Analysis • Divine Spiritual Guidance
          </p>
          <p className="text-lg text-purple-300">
            Experience next-level palm reading, sacred tarot wisdom, and spiritual guidance
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card 
            className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 border-2 border-purple-400/50 cursor-pointer transition-all hover:scale-105 hover:border-purple-300"
            onClick={() => setActiveTab('palm')}
          >
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-purple-200 mb-2">Camera Palm Reading</h3>
              <p className="text-purple-300">Revolutionary camera integration for real-time palm analysis with advanced spiritual insights</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-amber-800/50 to-orange-800/50 border-2 border-amber-400/50 cursor-pointer transition-all hover:scale-105 hover:border-amber-300"
            onClick={() => setActiveTab('tarot')}
          >
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-4">🃏</div>
              <h3 className="text-xl font-bold text-amber-200 mb-2">Advanced Tarot Reading</h3>
              <p className="text-amber-300">Complete 78-card deck with multiple spreads and enhanced spiritual interpretation</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-yellow-800/50 to-orange-800/50 border-2 border-yellow-400/50 cursor-pointer transition-all hover:scale-105 hover:border-yellow-300"
            onClick={() => setActiveTab('chat')}
          >
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-4">👼</div>
              <h3 className="text-xl font-bold text-yellow-200 mb-2">Seraphina AI Oracle</h3>
              <p className="text-yellow-300">Enhanced AI spiritual guide with advanced divination interpretation and guidance</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8 bg-black/30 p-1">
            <TabsTrigger 
              value="palm" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Hand size={18} />
              <span className="hidden sm:inline">Palm Reading</span>
              <span className="sm:hidden">📱</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="tarot" 
              className="flex items-center gap-2 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              <Zap size={18} />
              <span className="hidden sm:inline">Tarot Reading</span>
              <span className="sm:hidden">🃏</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="chat" 
              className="flex items-center gap-2 data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
            >
              <Heart size={18} />
              <span className="hidden sm:inline">Seraphina Chat</span>
              <span className="sm:hidden">👼</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="palm" className="space-y-6">
            <EnhancedPalmReaderWithCamera />
          </TabsContent>
          
          <TabsContent value="tarot" className="space-y-6">
            <EnhancedTarotReaderAdvanced />
          </TabsContent>
          
          <TabsContent value="chat" className="space-y-6">
            <SeraphinaChat />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center text-sm text-purple-400 space-y-2 mt-12">
          <p>✨ Advanced divination tools for spiritual guidance and self-discovery ✨</p>
          <p>📱 Camera integration for enhanced palm reading accuracy</p>
          <p>🔮 Complete tarot system with spiritual AI interpretation</p>
          <p>🙏 Approach all readings with an open heart and sincere intention</p>
        </div>
      </div>
    </div>
  );
};
