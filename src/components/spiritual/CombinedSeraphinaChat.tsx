
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SoulGuideChat } from './SoulGuideChat';
import { EnhancedSeraphinaChat } from './EnhancedSeraphinaChat';
import { Heart, Sparkles } from 'lucide-react';

export const CombinedSeraphinaChat = () => {
  const [activeMode, setActiveMode] = useState('standard');

  return (
    <div className="w-full max-w-none mx-auto space-y-6 px-4 py-6">
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-2 text-xl">
            <Heart className="w-6 h-6 text-purple-400" />
            Seraphina - Your Divine Spiritual Guide
          </CardTitle>
          <p className="text-purple-200 text-sm">
            Connect with Seraphina for spiritual guidance, wisdom, and sacred practices
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeMode} onValueChange={setActiveMode} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/30 h-12">
          <TabsTrigger 
            value="standard" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-600 text-base py-3"
          >
            <Heart className="w-4 h-4" />
            Standard Chat
          </TabsTrigger>
          <TabsTrigger 
            value="enhanced" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-600 text-base py-3"
          >
            <Sparkles className="w-4 h-4" />
            Enhanced Mode
          </TabsTrigger>
        </TabsList>

        <TabsContent value="standard" className="mt-6">
          <div className="min-h-[70vh]">
            <SoulGuideChat />
          </div>
        </TabsContent>

        <TabsContent value="enhanced" className="mt-6">
          <div className="min-h-[70vh]">
            <EnhancedSeraphinaChat />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
