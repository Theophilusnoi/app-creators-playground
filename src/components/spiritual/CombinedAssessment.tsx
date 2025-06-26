
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SoulArchetypeSystem } from './SoulArchetypeSystem';
import { SpiritualAssessment } from './SpiritualAssessment';
import { UserCheck, BarChart3 } from 'lucide-react';

interface CombinedAssessmentProps {
  onAssessmentComplete?: () => void;
}

export const CombinedAssessment = ({ onAssessmentComplete }: CombinedAssessmentProps) => {
  const [activeMode, setActiveMode] = useState('archetype');

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-purple-400" />
            Soul Assessment & Archetype Discovery
          </CardTitle>
          <p className="text-purple-200">
            Discover your soul archetype and complete spiritual assessments for personalized guidance
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeMode} onValueChange={setActiveMode} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/30">
          <TabsTrigger 
            value="archetype" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-600"
          >
            <UserCheck className="w-4 h-4" />
            Soul Archetype
          </TabsTrigger>
          <TabsTrigger 
            value="assessment" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-600"
          >
            <BarChart3 className="w-4 h-4" />
            Spiritual Assessment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="archetype" className="mt-4">
          <SoulArchetypeSystem />
        </TabsContent>

        <TabsContent value="assessment" className="mt-4">
          <SpiritualAssessment onComplete={onAssessmentComplete || (() => {})} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
