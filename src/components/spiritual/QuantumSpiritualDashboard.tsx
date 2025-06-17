
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuantumPrayerNetwork } from './QuantumPrayerNetwork';
import { ParallelLifeIntegration } from './ParallelLifeIntegration';
import { ElementalChannels } from './ElementalChannels';
import { MorphogeneticFieldTuning } from './MorphogeneticFieldTuning';
import { LightLanguageTranslator } from './LightLanguageTranslator';
import { TimelineHealing } from './TimelineHealing';
import { GalacticCouncilInterface } from './GalacticCouncilInterface';
import { Sparkles, Zap, Globe, Radio, Languages, Clock, Star } from 'lucide-react';

export const QuantumSpiritualDashboard = () => {
  const [activeModule, setActiveModule] = useState('quantum-prayer');

  const modules = [
    {
      id: 'quantum-prayer',
      title: 'Quantum Prayer Network',
      icon: Sparkles,
      component: QuantumPrayerNetwork,
      description: 'Connect with collective consciousness through quantum entanglement'
    },
    {
      id: 'parallel-life',
      title: 'Parallel Life Integration',
      icon: Zap,
      component: ParallelLifeIntegration,
      description: 'Access wisdom from parallel selves across timelines'
    },
    {
      id: 'elemental-channels',
      title: 'Elemental Channels',
      icon: Globe,
      component: ElementalChannels,
      description: 'Communicate with elemental consciousness'
    },
    {
      id: 'morphogenetic-tuning',
      title: 'Field Tuning',
      icon: Radio,
      component: MorphogeneticFieldTuning,
      description: 'Tune and optimize your morphogenetic field'
    },
    {
      id: 'light-language',
      title: 'Light Language',
      icon: Languages,
      component: LightLanguageTranslator,
      description: 'Translate and decode galactic light languages'
    },
    {
      id: 'timeline-healing',
      title: 'Timeline Healing',
      icon: Clock,
      component: TimelineHealing,
      description: 'Heal across past, present, and future timelines'
    },
    {
      id: 'galactic-council',
      title: 'Galactic Council',
      icon: Star,
      component: GalacticCouncilInterface,
      description: 'Connect with galactic consciousness archetypes'
    }
  ];

  const activeModuleData = modules.find(m => m.id === activeModule);
  const ActiveComponent = activeModuleData?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-3xl text-white text-center">
              🌌 Quantum Spiritual Technologies 🌌
            </CardTitle>
            <p className="text-purple-200 text-center">
              Advanced consciousness technology for multidimensional spiritual exploration
            </p>
          </CardHeader>
        </Card>

        <Tabs value={activeModule} onValueChange={setActiveModule} className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-2 bg-black/20 p-2">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <TabsTrigger
                  key={module.id}
                  value={module.id}
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-purple-600/50 data-[state=active]:text-white text-purple-300"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium hidden sm:block">
                    {module.title.split(' ')[0]}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {modules.map((module) => (
            <TabsContent key={module.id} value={module.id} className="space-y-6">
              <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <module.icon className="w-8 h-8 text-purple-400" />
                    <div>
                      <CardTitle className="text-white text-2xl">{module.title}</CardTitle>
                      <p className="text-purple-200">{module.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {ActiveComponent && <ActiveComponent />}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
