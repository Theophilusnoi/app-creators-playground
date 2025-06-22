
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Brain, Zap, Shield, Star, Clock, CheckCircle2 } from 'lucide-react';
import { ActivationStage } from './thirdEye/ActivationStage';
import { ZodiacProfile } from './thirdEye/ZodiacProfile';
import { ProgressTracker } from './thirdEye/ProgressTracker';
import { SafetyProtocols } from './thirdEye/SafetyProtocols';
import { WelcomeModal } from './thirdEye/WelcomeModal';
import { useThirdEyeProgress } from '@/hooks/useThirdEyeProgress';

interface ThirdEyeActivationProps {
  onComplete?: (data: any) => void;
}

export const ThirdEyeActivation: React.FC<ThirdEyeActivationProps> = ({ onComplete }) => {
  const [activeStage, setActiveStage] = useState(0);
  const [zodiacProfile, setZodiacProfile] = useState<any>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const { progress, updateProgress, milestones } = useThirdEyeProgress();

  const stages = [
    {
      id: 'preparation',
      title: 'Preparation & Grounding',
      icon: Shield,
      color: 'from-purple-600 to-indigo-600',
      description: 'Calibrate mind/body for subtle energy work'
    },
    {
      id: 'pranayama',
      title: 'Pranayama & Energy Channeling',
      icon: Brain,
      color: 'from-indigo-600 to-blue-600',
      description: 'Stimulate pineal gland via breathwork'
    },
    {
      id: 'focal',
      title: 'Focal Meditation',
      icon: Eye,
      color: 'from-blue-600 to-cyan-600',
      description: 'Train attention on Ajna (brow point)'
    },
    {
      id: 'symbol',
      title: 'Symbol Activation',
      icon: Star,
      color: 'from-cyan-600 to-teal-600',
      description: 'Imprint sacred geometry onto subconscious'
    },
    {
      id: 'integration',
      title: 'Clairvoyant Integration',
      icon: Zap,
      color: 'from-teal-600 to-green-600',
      description: 'Transform visions into actionable intuition'
    }
  ];

  const handleStageComplete = (stageData: any) => {
    updateProgress(activeStage, stageData);
    if (activeStage < stages.length - 1) {
      setActiveStage(activeStage + 1);
    } else {
      onComplete?.(progress);
    }
  };

  const handleWelcomeClose = () => {
    setShowWelcome(false);
  };

  const handleBeginJourney = () => {
    setShowWelcome(false);
    setActiveStage(0);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Welcome Modal */}
      <WelcomeModal
        open={showWelcome}
        onClose={handleWelcomeClose}
        onBegin={handleBeginJourney}
      />

      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-900/80 to-indigo-900/80 border-purple-400/50 shadow-xl">
        <CardHeader className="text-center p-4 md:p-6">
          <CardTitle className="text-3xl md:text-4xl font-bold text-white mb-4 text-shadow-lg">
            🌌 Third Eye Activation Suite
          </CardTitle>
          <p className="text-purple-100 text-base md:text-lg font-semibold text-shadow-md">
            Awaken Your Inner Vision through Ancient Wisdom & Neuroscience
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mt-4">
            <Badge className="bg-purple-700/90 text-white border-purple-400 font-bold text-sm px-4 py-2">
              Stage {activeStage + 1} of {stages.length}
            </Badge>
            <Badge className="bg-indigo-700/90 text-white border-indigo-400 font-bold text-sm px-4 py-2">
              {Math.round(progress.overallProgress)}% Activated
            </Badge>
            <Button
              onClick={() => setShowWelcome(true)}
              variant="outline"
              size="sm"
              className="border-2 border-purple-300 text-white bg-purple-600/50 hover:bg-purple-500/70 font-bold text-shadow-sm"
            >
              View Guide
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="activation" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-gray-900/90 border-2 border-gray-600 p-1 gap-1">
          <TabsTrigger 
            value="activation" 
            className="text-white font-bold text-xs lg:text-sm bg-gray-800 border border-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-shadow-sm px-2 py-3 whitespace-nowrap overflow-hidden text-ellipsis min-h-[48px] flex items-center justify-center"
          >
            <span className="truncate">Activation</span>
          </TabsTrigger>
          <TabsTrigger 
            value="profile"
            className="text-white font-bold text-xs lg:text-sm bg-gray-800 border border-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-shadow-sm px-2 py-3 whitespace-nowrap overflow-hidden text-ellipsis min-h-[48px] flex items-center justify-center"
          >
            <span className="truncate">Zodiac</span>
          </TabsTrigger>
          <TabsTrigger 
            value="progress"
            className="text-white font-bold text-xs lg:text-sm bg-gray-800 border border-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-shadow-sm px-2 py-3 whitespace-nowrap overflow-hidden text-ellipsis min-h-[48px] flex items-center justify-center"
          >
            <span className="truncate">Progress</span>
          </TabsTrigger>
          <TabsTrigger 
            value="safety"
            className="text-white font-bold text-xs lg:text-sm bg-gray-800 border border-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-shadow-sm px-2 py-3 whitespace-nowrap overflow-hidden text-ellipsis min-h-[48px] flex items-center justify-center"
          >
            <span className="truncate">Safety</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activation" className="space-y-6">
          {/* Stage Progress */}
          <Card className="bg-gray-900/90 border-gray-600 shadow-xl">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <h3 className="text-xl font-bold text-white text-shadow-sm">Activation Progress</h3>
                <div className="text-purple-200 font-semibold text-shadow-sm">
                  <Clock className="w-5 h-5 inline mr-2" />
                  {progress.totalTime} minutes practiced
                </div>
              </div>
              <Progress value={progress.overallProgress} className="mb-6 h-3 bg-gray-800 border border-gray-600" />
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {stages.map((stage, index) => {
                  const Icon = stage.icon;
                  const isCompleted = progress.stageProgress[index]?.completed;
                  const isCurrent = index === activeStage;
                  
                  return (
                    <div
                      key={stage.id}
                      className={`p-3 md:p-4 rounded-lg border-2 text-center transition-all cursor-pointer min-h-[100px] flex flex-col justify-center ${
                        isCompleted
                          ? 'bg-green-700/90 border-green-400 text-white shadow-xl'
                          : isCurrent
                          ? 'bg-purple-700/90 border-purple-400 text-white shadow-xl'
                          : 'bg-gray-800/90 border-gray-500 text-gray-200'
                      }`}
                      onClick={() => setActiveStage(index)}
                    >
                      <Icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2" />
                      <div className="text-xs md:text-sm font-bold text-shadow-sm leading-tight">
                        {stage.title.split(' ').slice(0, 2).join(' ')}
                      </div>
                      {isCompleted && <CheckCircle2 className="w-4 h-4 mx-auto mt-2 text-green-200" />}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Current Stage */}
          <ActivationStage
            stage={stages[activeStage]}
            stageIndex={activeStage}
            zodiacProfile={zodiacProfile}
            onComplete={handleStageComplete}
          />
        </TabsContent>

        <TabsContent value="profile">
          <ZodiacProfile
            profile={zodiacProfile}
            onProfileUpdate={setZodiacProfile}
          />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressTracker
            progress={progress}
            milestones={milestones}
            stages={stages}
          />
        </TabsContent>

        <TabsContent value="safety">
          <SafetyProtocols zodiacProfile={zodiacProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
