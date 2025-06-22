
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { useGeminiChat } from '@/hooks/useGeminiChat';
import { AmbientController } from './ambient/AmbientController';
import { MeditationSetup } from './meditation/MeditationSetup';
import { MeditationDisplay } from './meditation/MeditationDisplay';
import { MeditationControls } from './meditation/MeditationControls';

interface MeditationTimerProps {
  onComplete: (sessionData: {
    meditation_type: string;
    planned_duration: number;
    actual_duration: number;
  }) => void;
}

export const MeditationTimer = ({ onComplete }: MeditationTimerProps) => {
  const { toast } = useToast();
  const { generateMeditationGuidance, isLoading: isGeneratingGuidance } = useGeminiChat();
  const [selectedType, setSelectedType] = useState<string>('mindfulness');
  const [duration, setDuration] = useState<number>(5);
  const [timeRemaining, setTimeRemaining] = useState<number>(duration * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = useState<'preparation' | 'active' | 'completion'>('preparation');
  const [aiGuidanceText, setAiGuidanceText] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    setTimeRemaining(duration * 60);
  }, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      setIsActive(false);
      setCurrentPhase('completion');
      completeMeditation();
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const generatePersonalizedGuidance = async () => {
    if (!selectedType || duration <= 0) return;

    try {
      const response = await generateMeditationGuidance(
        selectedType,
        duration,
        'universal'
      );
      setAiGuidanceText(response.response);
    } catch (error) {
      console.error('Error generating meditation guidance:', error);
      setAiGuidanceText('Begin by finding a comfortable position and allowing your breath to flow naturally...');
    }
  };

  const startMeditation = async () => {
    if (!selectedType || duration <= 0) return;
    
    setIsActive(true);
    setTimeRemaining(duration * 60);
    setCurrentPhase('active');
    setStartTime(Date.now());
    
    // Generate AI guidance
    await generatePersonalizedGuidance();
  };

  const pauseMeditation = () => {
    setIsActive(false);
    console.log('Meditation paused');
  };

  const resumeMeditation = () => {
    setIsActive(true);
    console.log('Meditation resumed');
  };

  const resetMeditation = () => {
    setIsActive(false);
    setTimeRemaining(duration * 60);
    setCurrentPhase('preparation');
    setStartTime(null);
    setAiGuidanceText('');
    console.log('Meditation reset');
  };

  const skipForward = () => {
    setTimeRemaining(prev => {
      const newTime = Math.max(0, prev - 30);
      console.log('Skipped forward 30 seconds, new time:', newTime);
      return newTime;
    });
  };

  const skipBack = () => {
    setTimeRemaining(prev => {
      const newTime = Math.min(duration * 60, prev + 30);
      console.log('Skipped back 30 seconds, new time:', newTime);
      return newTime;
    });
  };

  const completeMeditation = () => {
    if (!startTime) return;

    const actualDurationMs = Date.now() - startTime;
    const actualDurationMinutes = Math.round(actualDurationMs / 60000);

    console.log('Meditation completed:', {
      meditation_type: selectedType,
      planned_duration: duration,
      actual_duration: actualDurationMinutes
    });

    onComplete({
      meditation_type: selectedType,
      planned_duration: duration,
      actual_duration: actualDurationMinutes
    });

    setTimeout(() => {
      setCurrentPhase('preparation');
      setStartTime(null);
      setAiGuidanceText('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/30 border-green-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            Sacred Meditation Timer
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {currentPhase === 'preparation' && (
            <MeditationSetup
              selectedType={selectedType}
              duration={duration}
              isGeneratingGuidance={isGeneratingGuidance}
              onTypeChange={setSelectedType}
              onDurationChange={setDuration}
              onStart={startMeditation}
            />
          )}

          <MeditationDisplay
            phase={currentPhase}
            timeRemaining={timeRemaining}
            aiGuidanceText={aiGuidanceText}
          />

          {currentPhase === 'active' && (
            <MeditationControls
              isActive={isActive}
              onPlayPause={isActive ? pauseMeditation : resumeMeditation}
              onSkipForward={skipForward}
              onSkipBack={skipBack}
              onReset={resetMeditation}
            />
          )}
        </CardContent>
      </Card>

      {/* Ambient Sound Controller */}
      <AmbientController 
        meditationType={selectedType}
        onVolumeChange={(volume) => console.log('Ambient volume changed:', volume)}
      />
    </div>
  );
};
