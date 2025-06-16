import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { useGeminiChat } from '@/hooks/useGeminiChat';
import { VoicePlayer } from './VoicePlayer';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  CheckCircle2,
  Loader2
} from "lucide-react";

interface MeditationTimerProps {
  onComplete: (sessionData: {
    meditation_type: string;
    planned_duration: number;
    actual_duration: number;
  }) => void;
}

interface MeditationType {
  value: string;
  label: string;
  description: string;
}

const MEDITATION_TYPES: MeditationType[] = [
  {
    value: 'mindfulness',
    label: 'Mindfulness Meditation',
    description: 'Focus on present moment awareness'
  },
  {
    value: 'breathwork',
    label: 'Breathwork Meditation',
    description: 'Control and awareness of breath'
  },
  {
    value: 'visualization',
    label: 'Visualization Meditation',
    description: 'Using mental imagery for relaxation'
  },
  {
    value: 'loving_kindness',
    label: 'Loving-Kindness Meditation',
    description: 'Cultivating feelings of love and compassion'
  },
  {
    value: 'body_scan',
    label: 'Body Scan Meditation',
    description: 'Systematic attention to body sensations'
  }
];

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
  };

  const resumeMeditation = () => {
    setIsActive(true);
  };

  const resetMeditation = () => {
    setIsActive(false);
    setTimeRemaining(duration * 60);
    setCurrentPhase('preparation');
    setStartTime(null);
    setAiGuidanceText('');
  };

  const skipForward = () => {
    setTimeRemaining(prev => Math.max(0, prev - 30));
  };

  const skipBack = () => {
    setTimeRemaining(prev => Math.min(duration * 60, prev + 30));
  };

  const completeMeditation = () => {
    if (!startTime) return;

    const actualDurationMs = Date.now() - startTime;
    const actualDurationMinutes = Math.round(actualDurationMs / 60000);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-black/30 border-green-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          Sacred Meditation Timer
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {currentPhase === 'preparation' && (
          <div className="space-y-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white w-full">
                <SelectValue placeholder="Select Meditation Type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-gray-600">
                {MEDITATION_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="text-white hover:bg-gray-700">
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="space-y-2">
              <h4 className="text-white font-semibold">Duration ({duration} min)</h4>
              <Slider
                value={[duration]}
                max={60}
                min={1}
                step={1}
                onValueChange={(value) => setDuration(value[0])}
                className="text-purple-500"
              />
            </div>

            <Button 
              onClick={startMeditation}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isGeneratingGuidance}
            >
              {isGeneratingGuidance ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Guidance...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Begin Meditation
                </>
              )}
            </Button>
          </div>
        )}

        {currentPhase === 'active' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {formatTime(timeRemaining)}
              </div>
              <p className="text-green-200">Focus on your breath...</p>
            </div>

            {aiGuidanceText && (
              <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/50 rounded-lg p-6 text-center mb-6">
                <div className="text-sm text-purple-200 mb-2">Guided by Seraphina</div>
                <div className="text-purple-100 leading-relaxed text-sm whitespace-pre-line mb-4">
                  {aiGuidanceText}
                </div>
                <VoicePlayer 
                  script={aiGuidanceText} 
                  tone="nurturing_gentle"
                />
              </div>
            )}

            <div className="flex justify-around">
              <Button onClick={skipBack} variant="outline" size="icon" className="border-gray-600 text-white hover:bg-gray-700">
                <SkipBack className="w-5 h-5" />
              </Button>
              <Button onClick={isActive ? pauseMeditation : resumeMeditation} variant="outline" size="icon" className="border-gray-600 text-white hover:bg-gray-700">
                {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button onClick={skipForward} variant="outline" size="icon" className="border-gray-600 text-white hover:bg-gray-700">
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>

            <Button onClick={resetMeditation} variant="secondary" className="w-full bg-gray-700 hover:bg-gray-600 text-white">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        )}

        {currentPhase === 'completion' && (
          <div className="text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Meditation Complete</h3>
            <p className="text-green-200">
              Your mind has been stilled and your spirit renewed.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
