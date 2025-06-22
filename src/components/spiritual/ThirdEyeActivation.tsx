
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
      description: 'Translate visions into actionable intuition'
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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Welcome Modal */}
      <WelcomeModal
        open={showWelcome}
        onClose={handleWelcomeClose}
        onBegin={handleBeginJourney}
      />

      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-400/30">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent mb-4">
            🌌 Third Eye Activation Suite
          </CardTitle>
          <p className="text-purple-200 text-lg">
            Awaken Your Inner Vision through Ancient Wisdom & Neuroscience
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge className="bg-purple-600/20 text-purple-200">
              Stage {activeStage + 1} of {stages.length}
            </Badge>
            <Badge className="bg-indigo-600/20 text-indigo-200">
              {Math.round(progress.overallProgress)}% Activated
            </Badge>
            <Button
              onClick={() => setShowWelcome(true)}
              variant="outline"
              size="sm"
              className="border-purple-400/50 text-purple-200 hover:bg-purple-400/20"
            >
              View Guide
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="activation" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/20">
          <TabsTrigger value="activation">Activation</TabsTrigger>
          <TabsTrigger value="profile">Zodiac Profile</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="activation" className="space-y-6">
          {/* Stage Progress */}
          <Card className="bg-black/20 border-purple-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Activation Progress</h3>
                <div className="text-purple-300">
                  <Clock className="w-5 h-5 inline mr-2" />
                  {progress.totalTime} minutes practiced
                </div>
              </div>
              <Progress value={progress.overallProgress} className="mb-4" />
              <div className="grid grid-cols-5 gap-2">
                {stages.map((stage, index) => {
                  const Icon = stage.icon;
                  const isCompleted = progress.stageProgress[index]?.completed;
                  const isCurrent = index === activeStage;
                  
                  return (
                    <div
                      key={stage.id}
                      className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                        isCompleted
                          ? 'bg-green-600/20 border-green-400/50 text-green-200'
                          : isCurrent
                          ? 'bg-purple-600/20 border-purple-400/50 text-purple-200'
                          : 'bg-gray-800/20 border-gray-600/30 text-gray-400'
                      }`}
                      onClick={() => setActiveStage(index)}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-xs font-medium">{stage.title.split(' ')[0]}</div>
                      {isCompleted && <CheckCircle2 className="w-4 h-4 mx-auto mt-1" />}
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
