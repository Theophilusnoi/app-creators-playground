
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

/**
 * ProjectionTimer - Core component for timing astral projection sessions
 * Features: Start/Stop/Reset functionality, session tracking, safety monitoring
 */
interface ProjectionTimerProps {
  onSessionStart?: (sessionId: string, sessionData: any) => void;
  onSessionEnd?: (sessionId: string, sessionData: any) => void;
  onSessionUpdate?: (currentTime: number, sessionId: string) => void;
  maxDuration?: number;
  className?: string;
}

const ProjectionTimer: React.FC<ProjectionTimerProps> = ({ 
  onSessionStart, 
  onSessionEnd, 
  onSessionUpdate,
  maxDuration = 3600, // 1 hour max session
  className = ""
}) => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && time < maxDuration) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          if (onSessionUpdate && sessionId) {
            onSessionUpdate(newTime, sessionId);
          }
          return newTime;
        });
      }, 1000);
    } else if (time >= maxDuration) {
      // Auto-stop at max duration for safety
      handleStop();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, maxDuration, sessionId, onSessionUpdate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    const newSessionId = `session_${Date.now()}`;
    setSessionId(newSessionId);
    setIsActive(true);
    
    if (onSessionStart) {
      onSessionStart(newSessionId, {
        startTime: new Date(),
        technique: 'default'
      });
    }
  };

  const handleStop = () => {
    setIsActive(false);
    
    if (onSessionEnd && sessionId) {
      onSessionEnd(sessionId, {
        endTime: new Date(),
        duration: time,
        completed: true
      });
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setSessionId(null);
  };

  const getTimerColor = () => {
    if (time >= maxDuration * 0.9) return 'text-red-400'; // Warning at 90%
    if (time >= maxDuration * 0.75) return 'text-yellow-400'; // Caution at 75%
    return 'text-white';
  };

  const getProgressPercentage = () => {
    return Math.min((time / maxDuration) * 100, 100);
  };

  return (
    <div className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
          Projection Session Timer
        </h3>
        
        {/* Main Timer Display */}
        <div className={`text-6xl font-bold mb-4 ${getTimerColor()}`}>
          {formatTime(time)}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        
        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              disabled={time >= maxDuration}
            >
              <Play className="w-4 h-4" />
              Begin Projection
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Pause className="w-4 h-4" />
              End Session
            </button>
          )}
          
          <button
            onClick={handleReset}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg flex items-center gap-2 transition-colors"
            disabled={isActive}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
        
        {/* Session Info */}
        {sessionId && (
          <div className="mt-4 text-sm text-purple-200">
            Session ID: {sessionId.slice(-8)}
          </div>
        )}
        
        {/* Safety Warning */}
        {time >= maxDuration * 0.75 && (
          <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-200 text-sm">
              ⚠️ Extended session detected. Consider ending soon for optimal safety.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectionTimer;
