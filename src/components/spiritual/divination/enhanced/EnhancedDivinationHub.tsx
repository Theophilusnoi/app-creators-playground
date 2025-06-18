
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedPalmReaderWithCamera } from './EnhancedPalmReaderWithCamera';
import { EnhancedTarotReaderAdvanced } from './EnhancedTarotReaderAdvanced';
import { SeraphinaChat } from './SeraphinaChat';
import { IntegratedDivinationHub } from './IntegratedDivinationHub';
import { Hand, Zap, Heart, Sparkles } from 'lucide-react';

export const EnhancedDivinationHub = () => {
  const [activeTab, setActiveTab] = useState('integrated');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            🔮 Enhanced SpiritualMind Pro
          </h1>
          <p className="text-xl text-purple-200">
            Advanced Divination Hub with Camera Integration & Enhanced AI
          </p>
          <p className="text-lg text-purple-300">
            Experience next-level spiritual guidance with cutting-edge technology
          </p>
        </div>

        {/* Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto mb-8 bg-black/30 p-1">
            <TabsTrigger 
              value="integrated" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
            >
              <Sparkles size={18} />
              <span className="hidden sm:inline">Integrated Hub</span>
              <span className="sm:hidden">🔮</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="palm" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Hand size={18} />
              <span className="hidden sm:inline">Camera Palm</span>
              <span className="sm:hidden">📱</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="tarot" 
              className="flex items-center gap-2 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              <Zap size={18} />
              <span className="hidden sm:inline">Advanced Tarot</span>
              <span className="sm:hidden">🃏</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="chat" 
              className="flex items-center gap-2 data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
            >
              <Heart size={18} />
              <span className="hidden sm:inline">Seraphina AI</span>
              <span className="sm:hidden">👼</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="integrated" className="space-y-6">
            <IntegratedDivinationHub />
          </TabsContent>
          
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
          <p>✨ Enhanced divination tools with advanced AI and camera integration ✨</p>
          <p>📱 Revolutionary palm reading technology for precise spiritual analysis</p>
          <p>🃏 Complete tarot system with multiple spreads and enhanced interpretations</p>
          <p>🙏 Advanced spiritual guidance from Seraphina AI with divine wisdom</p>
        </div>
      </div>
    </div>
  );
};
