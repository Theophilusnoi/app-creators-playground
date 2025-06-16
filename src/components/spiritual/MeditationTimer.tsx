import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useGeminiChat } from '@/hooks/useGeminiChat';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  CheckCircle2,
  Loader2,
  BrainCircuit
} from "lucide-react";

interface MeditationTimerProps {
  onComplete: () => void;
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
  const { user } = useAuth();
  const { toast } = useToast();
  const { generateMeditationGuidance, isLoading: isGeneratingGuidance } = useGeminiChat();
  const [selectedType, setSelectedType] = useState<string>('mindfulness');
  const [duration, setDuration] = useState<number>(5);
  const [timeRemaining, setTimeRemaining] = useState<number>(duration * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = useState<'preparation' | 'active' | 'completion'>('preparation');
  const [aiGuidanceText, setAiGuidanceText] = useState<string>('');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      setIsActive(false);
      setCurrentPhase('completion');
      logMeditation();
      setTimeout(() => {
        onComplete();
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining, onComplete]);

  const generatePersonalizedGuidance = async () => {
    if (!selectedType || duration <= 0) return;

    try {
      const response = await generateMeditationGuidance(
        selectedType,
        duration,
        'universal' // Could be made dynamic based on user preference
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
    setCurrentPhase('preparation');
    
    // Generate AI guidance
    await generatePersonalizedGuidance();
    
    // Log meditation start
    if (user) {
      supabase
        .from('daily_protection_logs')
        .insert({
          user_id: user.id,
          practice_type: 'meditation',
          practice_details: { 
            meditation_type: selectedType,
            duration_minutes: duration,
            started_at: new Date().toISOString()
          }
        })
        .then(() => console.log('Meditation logged'));
    }
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
  };

  const skipForward = () => {
    setTimeRemaining(prev => Math.max(0, prev - 30));
  };

  const skipBack = () => {
    setTimeRemaining(prev => Math.min(duration * 60, prev + 30));
  };

  const logMeditation = async () => {
    try {
      if (user) {
        await supabase
          .from('daily_protection_logs')
          .update({
            practice_details: { 
              meditation_type: selectedType,
              duration_minutes: duration,
              completed_at: new Date().toISOString()
            }
          })
          .eq('user_id', user.id)
          .eq('practice_type', 'meditation');
      }

      toast({
        title: "Meditation Complete",
        description: "Your mind has been stilled and your spirit renewed.",
      });
    } catch (error) {
      console.error('Error logging meditation:', error);
    }
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
              <SelectContent className="bg-gray-800 text-white">
                {MEDITATION_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="space-y-2">
              <h4 className="text-white font-semibold">Duration ({duration} min)</h4>
              <Slider
                defaultValue={[duration]}
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

            {currentPhase === 'active' && aiGuidanceText && (
              <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/50 rounded-lg p-6 text-center mb-6">
                <div className="text-sm text-purple-200 mb-2">Guided by Seraphina</div>
                <div className="text-purple-100 leading-relaxed text-sm whitespace-pre-line">
                  {aiGuidanceText}
                </div>
              </div>
            )}

            <div className="flex justify-around">
              <Button onClick={skipBack} variant="outline" size="icon">
                <SkipBack className="w-5 h-5" />
              </Button>
              <Button onClick={isActive ? pauseMeditation : resumeMeditation} variant="outline" size="icon">
                {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button onClick={skipForward} variant="outline" size="icon">
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>

            <Button onClick={resetMeditation} variant="secondary" className="w-full">
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
