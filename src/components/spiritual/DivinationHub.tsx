
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PalmReader } from './divination/PalmReader';
import { TarotReader } from './divination/TarotReader';
import { Hand, Zap } from 'lucide-react';

const DivinationHub = () => {
  const [activeTab, setActiveTab] = useState('palm');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Divination Hub</h2>
        <p className="text-purple-200">Unveil hidden insights through palmistry and tarot wisdom</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6 bg-black/30">
          <TabsTrigger value="palm" className="flex items-center gap-2 data-[state=active]:bg-purple-600">
            <Hand size={16} />
            Palm Reading
          </TabsTrigger>
          <TabsTrigger value="tarot" className="flex items-center gap-2 data-[state=active]:bg-purple-600">
            <Zap size={16} />
            Tarot Reading
          </TabsTrigger>
        </TabsList>
        
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
