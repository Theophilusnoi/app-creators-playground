
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const UsageInstructions: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-2 border-indigo-400/50">
      <CardHeader>
        <CardTitle className="text-indigo-200">How to Use These Incantations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-indigo-100">
        <Tabs defaultValue="spoken" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/20">
            <TabsTrigger value="spoken">Spoken Aloud</TabsTrigger>
            <TabsTrigger value="whispered">Whispered</TabsTrigger>
            <TabsTrigger value="written">Written & Dissolved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="spoken" className="mt-4">
            <div className="space-y-3">
              <h4 className="font-medium text-indigo-200">Speaking the Words of Power</h4>
              <ul className="space-y-2 text-sm">
                <li>• Speak clearly and with intention during each ritual step</li>
                <li>• Voice vibration activates spiritual energy</li>
                <li>• Feel the meaning of each word as you speak</li>
                <li>• Repeat 3 times if you feel called to do so</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="whispered" className="mt-4">
            <div className="space-y-3">
              <h4 className="font-medium text-indigo-200">Whispered Prayers</h4>
              <ul className="space-y-2 text-sm">
                <li>• Whisper over ingredients before adding to bath</li>
                <li>• Creates intimate connection with spiritual forces</li>
                <li>• Perfect for private or shared living spaces</li>
                <li>• Your intention is more important than volume</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="written" className="mt-4">
            <div className="space-y-3">
              <h4 className="font-medium text-indigo-200">Written & Dissolved Method</h4>
              <ul className="space-y-2 text-sm">
                <li>• Write incantations on biodegradable paper</li>
                <li>• Dissolve in bathwater while setting intention</li>
                <li>• Physically releasing words into water amplifies power</li>
                <li>• Use natural ink or pencil for safe dissolution</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
