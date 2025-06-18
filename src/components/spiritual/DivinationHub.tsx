
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PalmReader } from './divination/PalmReader';
import { TarotReader } from './divination/TarotReader';
import { EnhancedDivinationHub } from './divination/enhanced/EnhancedDivinationHub';
import { Hand, Zap, Sparkles } from 'lucide-react';

const DivinationHub = () => {
  const [activeTab, setActiveTab] = useState('enhanced');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Divination Hub</h2>
        <p className="text-purple-200">Unveil hidden insights through palmistry and tarot wisdom</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-lg mx-auto mb-6 bg-black/30">
          <TabsTrigger value="enhanced" className="flex items-center gap-2 data-[state=active]:bg-purple-600">
            <Sparkles size={16} />
            Enhanced
          </TabsTrigger>
          <TabsTrigger value="palm" className="flex items-center gap-2 data-[state=active]:bg-purple-600">
            <Hand size={16} />
            Palm
          </TabsTrigger>
          <TabsTrigger value="tarot" className="flex items-center gap-2 data-[state=active]:bg-purple-600">
            <Zap size={16} />
            Tarot
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="enhanced">
          <EnhancedDivinationHub />
        </TabsContent>
        
        <TabsContent value="palm">
          <PalmReader />
        </TabsContent>
        
        <TabsContent value="tarot">
          <TarotReader />
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-center text-sm text-purple-400">
        <p>✨ Divination tools offer guidance, but your choices create your destiny ✨</p>
      </div>
    </div>
  );
};

export default DivinationHub;
