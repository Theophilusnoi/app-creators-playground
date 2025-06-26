
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RitualsDirectory } from './RitualsDirectory';
import { SacredBathingSystem } from './SacredBathingSystem';
import { Flame, Droplets } from 'lucide-react';

export const CombinedRituals = () => {
  const [activeMode, setActiveMode] = useState('rituals');

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Flame className="w-6 h-6 text-purple-400" />
            Sacred Rituals & Bathing Ceremonies
          </CardTitle>
          <p className="text-purple-200">
            Access ancient rituals and sacred bathing practices for spiritual transformation
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeMode} onValueChange={setActiveMode} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/30">
          <TabsTrigger 
            value="rituals" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-600"
          >
            <Flame className="w-4 h-4" />
            Ritual Directory
          </TabsTrigger>
          <TabsTrigger 
            value="bathing" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-600"
          >
            <Droplets className="w-4 h-4" />
            Sacred Bathing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rituals" className="mt-4">
          <RitualsDirectory />
        </TabsContent>

        <TabsContent value="bathing" className="mt-4">
          <SacredBathingSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
};
