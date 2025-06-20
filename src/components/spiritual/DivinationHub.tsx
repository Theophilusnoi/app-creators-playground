
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PalmReader } from './divination/PalmReader';
import { TarotReader } from './divination/TarotReader';
import { EnhancedPalmReaderWithCamera } from './divination/enhanced/EnhancedPalmReaderWithCamera';
import { EnhancedTarotReaderAdvanced } from './divination/enhanced/EnhancedTarotReaderAdvanced';
import { SeraphinaChat } from './divination/enhanced/SeraphinaChat';
import { Hand, Zap, Sparkles, Camera, Heart } from 'lucide-react';

const DivinationHub = () => {
  const [activeTab, setActiveTab] = useState('palm');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Divination Hub</h2>
        <p className="text-purple-200">Unveil hidden insights through palmistry and tarot wisdom</p>
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
            <p className="text-purple-300">Advanced camera integration for real-time palm analysis with enhanced spiritual insights</p>
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
          onClick={() => setActiveTab('seraphina')}
        >
          <CardContent className="p-6 text-center">
            <div className="text-5xl mb-4">👼</div>
            <h3 className="text-xl font-bold text-yellow-200 mb-2">Seraphina AI Oracle</h3>
            <p className="text-yellow-300">Enhanced AI spiritual guide with advanced divination interpretation and guidance</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto mb-6 bg-black/30">
          <TabsTrigger value="palm" className="flex items-center gap-2 data-[state=active]:bg-purple-600">
            <Camera size={16} />
            Camera Palm
          </TabsTrigger>
          <TabsTrigger value="classic-palm" className="flex items-center gap-2 data-[state=active]:bg-purple-600">
            <Hand size={16} />
            Classic Palm
          </TabsTrigger>
          <TabsTrigger value="tarot" className="flex items-center gap-2 data-[state=active]:bg-purple-600">
            <Zap size={16} />
            Tarot
          </TabsTrigger>
          <TabsTrigger value="seraphina" className="flex items-center gap-2 data-[state=active]:bg-purple-600">
            <Heart size={16} />
            Seraphina
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="palm">
          <EnhancedPalmReaderWithCamera />
        </TabsContent>
        
        <TabsContent value="classic-palm">
          <PalmReader />
        </TabsContent>
        
        <TabsContent value="tarot">
          <EnhancedTarotReaderAdvanced />
        </TabsContent>
        
        <TabsContent value="seraphina">
          <SeraphinaChat />
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-center text-sm text-purple-400">
        <p>✨ Divination tools offer guidance, but your choices create your destiny ✨</p>
      </div>
    </div>
  );
};

export default DivinationHub;
