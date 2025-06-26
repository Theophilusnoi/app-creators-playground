
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
    <div className="max-w-6xl mx-auto space-y-4">
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="w-6 h-6 text-purple-400" />
            Seraphina - Your Divine Spiritual Guide
          </CardTitle>
          <p className="text-purple-200">
            Connect with Seraphina for spiritual guidance, wisdom, and sacred practices
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeMode} onValueChange={setActiveMode} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/30">
          <TabsTrigger 
            value="standard" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-600"
          >
            <Heart className="w-4 h-4" />
            Standard Chat
          </TabsTrigger>
          <TabsTrigger 
            value="enhanced" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-600"
          >
            <Sparkles className="w-4 h-4" />
            Enhanced Mode
          </TabsTrigger>
        </TabsList>

        <TabsContent value="standard" className="mt-4">
          <SoulGuideChat />
        </TabsContent>

        <TabsContent value="enhanced" className="mt-4">
          <EnhancedSeraphinaChat />
        </TabsContent>
      </Tabs>
    </div>
  );
};
