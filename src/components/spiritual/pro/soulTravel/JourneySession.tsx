
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Play, Pause, Square, Volume2, VolumeX, Settings,
  Sparkles, Star, Leaf, Moon, Clock, AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JourneySessionProps {
  setupData: any;
  onSessionEnd: (sessionData: any) => void;
  onEmergencyEnd: () => void;
}

const JourneySession: React.FC<JourneySessionProps> = ({ setupData, onSessionEnd, onEmergencyEnd }) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1800); // 30 minutes default
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [phase, setPhase] = useState('preparation');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          
          // Phase transitions
          if (newTime === 300 && phase === 'preparation') {
            setPhase('journey');
            toast({
              title: "Journey Phase",
              description: "You are now entering the journey phase. Let go and trust the process.",
            });
          } else if (newTime === duration - 300 && phase === 'journey') {
            setPhase('integration');
            toast({
              title: "Integration Phase",
              description: "Beginning to return. Take note of any final insights.",
            });
          }
          
          if (newTime >= duration) {
            handleSessionEnd();
            return duration;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration, phase]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    const newPlaying = !isPlaying;
    setIsPlaying(newPlaying);
    
    if (newPlaying && currentTime === 0) {
      toast({
        title: "Journey Beginning",
        description: "Your soul journey has begun. Focus on your breath and intention.",
      });
    }
  };

  const handleSessionEnd = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsPlaying(false);
    
    const sessionData = {
      ...setupData,
      endTime: new Date().toISOString(),
      duration: currentTime,
      completed: currentTime >= duration * 0.8,
      phase: phase,
      actualDuration: currentTime
    };
    
    console.log('Ending session with data:', sessionData);
    onSessionEnd(sessionData);
  };

  const handleEmergencyStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsPlaying(false);
    
    toast({
      title: "Emergency Return",
      description: "Returning to your body safely. Take deep breaths and ground yourself.",
      variant: "destructive"
    });
    
    onEmergencyEnd();
  };

  const getPhaseIcon = () => {
    switch (phase) {
      case 'preparation': return <Star className="w-5 h-5" />;
      case 'journey': return <Sparkles className="w-5 h-5" />;
      case 'integration': return <Leaf className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'preparation': return 'from-blue-500 to-purple-500';
      case 'journey': return 'from-purple-500 to-pink-500';
      case 'integration': return 'from-green-500 to-blue-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  const getGuidanceText = () => {
    switch (phase) {
      case 'preparation':
        return "Focus on your breath and intention. Allow your body to relax completely.";
      case 'journey':
        return "Trust the process. Observe without judgment. Follow your inner guidance.";
      case 'integration':
        return "Begin to return your awareness to your physical body. Remember your experiences.";
      default:
        return "Welcome to your soul journey experience.";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6" style={{ backgroundColor: '#1a1a2e', minHeight: '100vh' }}>
      {/* Header */}
      <Card className="relative bg-black/50 backdrop-blur-md border-purple-500/30 text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getPhaseColor()} flex items-center justify-center`}>
                {getPhaseIcon()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{setupData.journeyType || 'Soul Journey'}</h2>
                <p className="text-purple-200 text-sm capitalize">{phase} Phase</p>
              </div>
            </div>
            <Button
              onClick={handleEmergencyStop}
              variant="destructive"
              size="sm"
              className="bg-red-600/80 hover:bg-red-700"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Emergency Return
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Main Session Display */}
      <Card className="relative bg-black/50 backdrop-blur-md border-purple-500/30">
        <CardContent className="p-8">
          {/* Visual Element */}
          <div className="text-center mb-8">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 border border-purple-400/30 flex items-center justify-center mb-6 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r ${getPhaseColor()} opacity-20 ${isPlaying ? 'animate-pulse' : ''}`} />
              <div className="text-6xl font-bold text-white">
                {formatTime(currentTime)}
              </div>
            </div>
            
            <div className="max-w-md mx-auto">
              <Progress 
                value={(currentTime / duration) * 100} 
                className="h-2 mb-4 bg-purple-900/50" 
              />
              <p className="text-purple-200 text-lg font-medium mb-2">
                {getGuidanceText()}
              </p>
              <p className="text-purple-300 text-sm">
                Duration: {formatTime(duration)} | Remaining: {formatTime(duration - currentTime)}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              onClick={handlePlayPause}
              size="lg"
              className="w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </Button>
            
            <Button
              onClick={handleSessionEnd}
              variant="outline"
              className="border-purple-400 text-purple-200 hover:bg-purple-600/20"
            >
              <Square className="w-4 h-4 mr-2" />
              End Session
            </Button>
          </div>

          {/* Session Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-purple-900/30 rounded-lg p-3 text-center">
              <div className="text-purple-300 text-sm">Intention</div>
              <div className="text-white text-xs font-medium truncate">
                {setupData.intention ? setupData.intention.substring(0, 20) + '...' : 'Not set'}
              </div>
            </div>
            <div className="bg-purple-900/30 rounded-lg p-3 text-center">
              <div className="text-purple-300 text-sm">Protection</div>
              <div className="text-white text-xs font-medium">
                {setupData.protection ? setupData.protection.length : 0} Methods
              </div>
            </div>
            <div className="bg-purple-900/30 rounded-lg p-3 text-center">
              <div className="text-purple-300 text-sm">State</div>
              <div className="text-white text-xs font-medium">
                {setupData.emotionalState || 'Calm'}
              </div>
            </div>
            <div className="bg-purple-900/30 rounded-lg p-3 text-center">
              <div className="text-purple-300 text-sm">Phase</div>
              <div className="text-white text-xs font-medium capitalize">
                {phase}
              </div>
            </div>
          </div>

          {/* Breathing Guide */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Moon className="w-4 h-4 text-purple-300" />
              <span className="text-purple-300 text-sm">Breathing Guide</span>
            </div>
            <div className={`w-8 h-8 rounded-full bg-purple-400/50 mx-auto ${isPlaying ? 'animate-pulse' : ''}`} />
            <p className="text-purple-300 text-xs mt-2">
              {isPlaying ? 'Breathe in... breathe out...' : 'Focus on your natural breath'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Protection Reminders */}
      <Card className="bg-black/50 backdrop-blur-md border-green-500/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm font-medium">Active Protection</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {setupData.protection && setupData.protection.length > 0 ? (
              setupData.protection.map((protection: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded-full border border-green-500/30"
                >
                  {protection.replace('_', ' ')}
                </span>
              ))
            ) : (
              <span className="px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded-full border border-green-500/30">
                Light Shield Active
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JourneySession;
