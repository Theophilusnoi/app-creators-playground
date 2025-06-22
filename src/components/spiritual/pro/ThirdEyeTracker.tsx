
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Eye, 
  Zap, 
  Brain, 
  Volume2,
  Play,
  Pause,
  Shield
} from 'lucide-react';

interface ThirdEyeTrackerProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
}

export const ThirdEyeTracker: React.FC<ThirdEyeTrackerProps> = ({ 
  userProfile, 
  setUserProfile 
}) => {
  const { toast } = useToast();
  const [currentStage, setCurrentStage] = useState(1);
  const [activationProgress, setActivationProgress] = useState(23);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTimer, setSessionTimer] = useState(0);

  const stages = [
    { id: 1, name: 'Grounding', description: 'Zodiac crystal attunement', duration: '5 min' },
    { id: 2, name: 'Pineal Stimulation', description: '963Hz binaural beats', duration: '10 min' },
    { id: 3, name: 'Clairvoyant Integration', description: 'Dream pattern analysis', duration: '8 min' },
    { id: 4, name: 'Safety Protocols', description: 'Dissociation monitoring', duration: '2 min' },
    { id: 5, name: 'Integration', description: 'Neural pathway solidification', duration: '5 min' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  const startSession = () => {
    setIsSessionActive(true);
    setSessionTimer(0);
    toast({
      title: "Third Eye Session Started",
      description: `Stage ${currentStage}: ${stages[currentStage - 1].name}`,
    });
  };

  const pauseSession = () => {
    setIsSessionActive(false);
    toast({
      title: "Session Paused",
      description: "Resume when ready",
    });
  };

  const completeStage = () => {
    if (currentStage < 5) {
      setCurrentStage(prev => prev + 1);
      setActivationProgress(prev => Math.min(prev + 15, 100));
      toast({
        title: "Stage Complete!",
        description: `Moving to Stage ${currentStage + 1}`,
      });
    } else {
      setIsSessionActive(false);
      toast({
        title: "Third Eye Session Complete",
        description: "Pineal activation increased by 15%",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-indigo-900/20 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-200 flex items-center gap-2">
            <Eye className="w-6 h-6" />
            Third Eye Activation Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-indigo-100">Pineal Activation</span>
            <Badge className="bg-purple-600/20 text-purple-200">
              {activationProgress}%
            </Badge>
          </div>
          <Progress value={activationProgress} className="h-3" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-indigo-200">
              <strong>Current Stage:</strong> {stages[currentStage - 1].name}
            </div>
            <div className="text-indigo-200">
              <strong>Sessions Completed:</strong> 12
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Control */}
      <Card className="bg-purple-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-200 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Active Session Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-purple-100 font-semibold">
                Stage {currentStage}: {stages[currentStage - 1].name}
              </h3>
              <p className="text-purple-300 text-sm">
                {stages[currentStage - 1].description}
              </p>
            </div>
            <Badge className="bg-green-600/20 text-green-200">
              {stages[currentStage - 1].duration}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={isSessionActive ? pauseSession : startSession}
              className={`${
                isSessionActive 
                  ? 'bg-orange-600 hover:bg-orange-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSessionActive ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </>
              )}
            </Button>
            
            <div className="text-purple-100">
              Timer: {formatTime(sessionTimer)}
            </div>
            
            <Button
              onClick={completeStage}
              disabled={!isSessionActive}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
            >
              Complete Stage
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Binaural Beats Control */}
      <Card className="bg-cyan-900/20 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-200 flex items-center gap-2">
            <Volume2 className="w-6 h-6" />
            963Hz Pineal Frequency
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-cyan-100">Binaural Beat Status</span>
            <Badge className={`${
              isSessionActive 
                ? 'bg-green-600/20 text-green-200' 
                : 'bg-gray-600/20 text-gray-200'
            }`}>
              {isSessionActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-cyan-200">
            <div>Base Frequency: 963Hz</div>
            <div>Beat Frequency: 8Hz (Alpha)</div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Protocols */}
      <Card className="bg-red-900/20 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-200 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Safety Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="text-red-200">
              <strong>Mercury Retrograde:</strong> Clear ✓
            </div>
            <div className="text-red-200">
              <strong>Dissociation Risk:</strong> Low
            </div>
            <div className="text-red-200">
              <strong>Session Limit:</strong> 3/5 today
            </div>
            <div className="text-red-200">
              <strong>Neural Stress:</strong> Minimal
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
