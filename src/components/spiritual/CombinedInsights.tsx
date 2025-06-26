
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmergencyAnalyticsDashboard } from './EmergencyAnalyticsDashboard';
import { ProgressVisualization } from './ProgressVisualization';
import { Lightbulb, TrendingUp } from 'lucide-react';

export const CombinedInsights = () => {
  const [activeMode, setActiveMode] = useState('insights');

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            Spiritual Insights & Progress Tracking
          </CardTitle>
          <p className="text-purple-200">
            Monitor your spiritual journey and gain deep insights into your development
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeMode} onValueChange={setActiveMode} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/30">
          <TabsTrigger 
            value="insights" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-600"
          >
            <Lightbulb className="w-4 h-4" />
            Analytics & Insights
          </TabsTrigger>
          <TabsTrigger 
            value="progress" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-600"
          >
            <TrendingUp className="w-4 h-4" />
            Progress Tracking
          </TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="mt-4">
          <EmergencyAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="progress" className="mt-4">
          <ProgressVisualization />
        </TabsContent>
      </Tabs>
    </div>
  );
};
