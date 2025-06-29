
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, Square, AlertTriangle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SessionManagerProps {
  selectedTechnique: string;
  safetyProtocols: Record<string, boolean>;
  onSessionStart: (sessionId: string, sessionData: any) => void;
  onSessionEnd: (sessionId: string, sessionData: any) => void;
  onSessionUpdate: (currentTime: number, sessionId: string) => void;
  maxDuration?: number;
}

const SessionManager: React.FC<SessionManagerProps> = ({
  selectedTechnique,
  safetyProtocols,
  onSessionStart,
  onSessionEnd,
  onSessionUpdate,
  maxDuration = 3600
}) => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const validateSafety = useCallback(() => {
    const activeProtocols = Object.values(safetyProtocols).filter(Boolean).length;
    const totalProtocols = Object.keys(safetyProtocols).length;
    
    if (activeProtocols < totalProtocols) {
      toast({
        title: "Safety Check Failed",
        description: `${activeProtocols}/${totalProtocols} safety protocols active. Please activate all protocols before starting.`,
        variant: "destructive"
      });
      return false;
    }
    return true;
  }, [safetyProtocols, toast]);

  const handleStart = useCallback(() => {
    if (!validateSafety()) return;

    const newSessionId = `session_${Date.now()}`;
    const newStartTime = new Date();
    
    setSessionId(newSessionId);
    setStartTime(newStartTime);
    setIsActive(true);
    setCurrentTime(0);

    const sessionData = {
      technique: selectedTechnique,
      startTime: newStartTime.toISOString(),
      safetyProtocols: { ...safetyProtocols },
      maxDuration
    };

    onSessionStart(newSessionId, sessionData);
    
    toast({
      title: "Projection Session Started",
      description: `${selectedTechnique} technique activated. Stay safe and focused.`,
    });
  }, [selectedTechnique, safetyProtocols, maxDuration, onSessionStart, validateSafety, toast]);

  const handleEnd = useCallback(() => {
    if (!sessionId || !startTime) return;

    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

    const sessionData = {
      endTime: endTime.toISOString(),
      duration: duration * 1000, // Convert to milliseconds
      technique: selectedTechnique,
      completed: true
    };

    onSessionEnd(sessionId, sessionData);
    
    setIsActive(false);
    setCurrentTime(0);
    setSessionId(null);
    setStartTime(null);

    toast({
      title: "Session Completed",
      description: `Duration: ${formatTime(duration)}. Remember to ground yourself.`,
    });
  }, [sessionId, startTime, selectedTechnique, onSessionEnd, formatTime, toast]);

  const handleEmergencyEnd = useCallback(() => {
    if (!sessionId || !startTime) return;

    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

    const sessionData = {
      endTime: endTime.toISOString(),
      duration: duration * 1000,
      technique: selectedTechnique,
      emergency: true,
      completed: false
    };

    onSessionEnd(sessionId, sessionData);
    
    setIsActive(false);
    setCurrentTime(0);
    setSessionId(null);
    setStartTime(null);

    toast({
      title: "Emergency Return Activated",
      description: "Session ended safely. Focus on your physical body and breathe deeply.",
      variant: "destructive"
    });
  }, [sessionId, startTime, selectedTechnique, onSessionEnd, toast]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && sessionId) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          onSessionUpdate(newTime, sessionId);
          
          // Safety checks
          const warningTime = maxDuration * 0.75;
          if (newTime === warningTime) {
            toast({
              title: "Session Duration Warning",
              description: "You've been projecting for a while. Consider returning soon for optimal safety.",
              variant: "destructive"
            });
          }
          
          if (newTime >= maxDuration) {
            handleEmergencyEnd();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, sessionId, maxDuration, onSessionUpdate, toast, handleEmergencyEnd]);

  const getStatusColor = () => {
    if (!isActive) return 'bg-gray-500/20 text-gray-300';
    if (currentTime >= maxDuration * 0.75) return 'bg-red-500/20 text-red-300';
    if (currentTime >= maxDuration * 0.5) return 'bg-yellow-500/20 text-yellow-300';
    return 'bg-green-500/20 text-green-300';
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Projection Session
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timer Display */}
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-3xl font-bold ${getStatusColor()}`}>
            {formatTime(currentTime)}
          </div>
          <div className="mt-2 text-purple-200 text-sm">
            {isActive ? `${selectedTechnique} Active` : 'Ready to Begin'}
          </div>
        </div>

        {/* Session Info */}
        {isActive && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="text-blue-200 text-sm space-y-1">
              <p><strong>Technique:</strong> {selectedTechnique}</p>
              <p><strong>Started:</strong> {startTime?.toLocaleTimeString()}</p>
              <p><strong>Max Duration:</strong> {formatTime(maxDuration)}</p>
              <p><strong>Safety Protocols:</strong> {Object.values(safetyProtocols).filter(Boolean).length}/{Object.keys(safetyProtocols).length} Active</p>
            </div>
          </div>
        )}

        {/* Safety Status */}
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-400" />
          <span className="text-green-300 text-sm">Safety Protocols</span>
          <Badge variant={Object.values(safetyProtocols).every(Boolean) ? "default" : "destructive"} className="text-xs">
            {Object.values(safetyProtocols).filter(Boolean).length}/{Object.keys(safetyProtocols).length}
          </Badge>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          {!isActive ? (
            <Button
              onClick={handleStart}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              disabled={!selectedTechnique || !Object.values(safetyProtocols).every(Boolean)}
            >
              <Play className="w-4 h-4 mr-2" />
              Begin Projection
            </Button>
          ) : (
            <>
              <Button
                onClick={handleEnd}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Square className="w-4 h-4 mr-2" />
                End Session
              </Button>
              <Button
                onClick={handleEmergencyEnd}
                className="bg-red-600 hover:bg-red-700 text-white"
                size="sm"
              >
                <AlertTriangle className="w-4 h-4 mr-1" />
                Emergency Return
              </Button>
            </>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
          <p className="text-purple-200 text-xs">
            {!isActive 
              ? "Ensure all safety protocols are active before beginning your projection session."
              : "Focus on your chosen technique. Use Emergency Return if you experience any difficulties."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionManager;
