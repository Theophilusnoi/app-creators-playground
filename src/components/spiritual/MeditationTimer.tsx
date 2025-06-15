
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Play, Pause, RotateCcw, Star, Volume2 } from "lucide-react";
import { BreathingGuide } from './BreathingGuide';
import { useVoiceService } from '@/hooks/useVoiceService';
import { meditationService } from '@/services/meditationService';
import { useToast } from '@/hooks/use-toast';

interface MeditationType {
  id: number;
  name: string;
  description: string;
  duration: number[];
  difficulty: string;
  instructions: string;
  voiceGuidance: string[];
}

const meditationTypes: MeditationType[] = [
  {
    id: 1,
    name: "Mindfulness",
    description: "Present moment awareness",
    duration: [5, 10, 15, 20],
    difficulty: "Beginner",
    instructions: "Focus on your breath and observe thoughts without judgment",
    voiceGuidance: [
      "Welcome to mindfulness meditation. Find a comfortable position and close your eyes.",
      "Begin by taking three deep breaths, feeling yourself settle into this moment.",
      "Now, simply observe your natural breath without trying to change it.",
      "When thoughts arise, gently acknowledge them and return to your breath.",
      "You're doing beautifully. Continue to rest in this peaceful awareness."
    ]
  },
  {
    id: 2,
    name: "Shadow Integration",
    description: "Working with difficult emotions",
    duration: [10, 15, 20, 30],
    difficulty: "Intermediate",
    instructions: "Embrace and integrate difficult emotions with compassion",
    voiceGuidance: [
      "Today we explore shadow integration. Breathe deeply and create a safe inner space.",
      "Allow any difficult emotions or thoughts to surface without resistance.",
      "Meet these aspects of yourself with curiosity and compassion.",
      "Remember, integration comes through acceptance, not rejection.",
      "You are whole and complete, embracing all parts of yourself."
    ]
  },
  {
    id: 3,
    name: "Loving Kindness",
    description: "Cultivating compassion",
    duration: [10, 15, 20, 25],
    difficulty: "Beginner",
    instructions: "Send love and kindness to yourself and others",
    voiceGuidance: [
      "Let's cultivate loving kindness. Begin by placing a hand on your heart.",
      "Start by sending love to yourself: 'May I be happy, may I be peaceful.'",
      "Now extend this love to someone dear to you.",
      "Gradually include neutral people, then those you find challenging.",
      "Feel your heart expanding with boundless compassion for all beings."
    ]
  },
  {
    id: 4,
    name: "Chakra Alignment",
    description: "Energy center balancing",
    duration: [15, 20, 30, 45],
    difficulty: "Advanced",
    instructions: "Balance and align your seven energy centers",
    voiceGuidance: [
      "We'll journey through your chakras. Visualize a column of light through your spine.",
      "Starting at the base, see a red light spinning slowly, grounding you.",
      "Move up to orange at your sacrum, yellow at your solar plexus.",
      "Green light at your heart, blue at your throat, indigo at your third eye.",
      "Finally, violet light at your crown, connecting you to divine consciousness."
    ]
  }
];

export const MeditationTimer: React.FC = () => {
  const [selectedMeditation, setSelectedMeditation] = useState(meditationTypes[0]);
  const [selectedDuration, setSelectedDuration] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedDuration * 60);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [guidanceStep, setGuidanceStep] = useState(0);
  const [showBreathingGuide, setShowBreathingGuide] = useState(false);

  const { generateAndPlay, isGenerating } = useVoiceService();
  const { toast } = useToast();

  // Timer countdown logic
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            setSessionComplete(true);
            completeSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive, timeLeft]);

  // Voice guidance at intervals
  useEffect(() => {
    if (isActive && !sessionComplete) {
      const totalDuration = selectedDuration * 60;
      const elapsed = totalDuration - timeLeft;
      const intervalTime = Math.floor(totalDuration / selectedMeditation.voiceGuidance.length);
      
      if (elapsed > 0 && elapsed % intervalTime === 0) {
        const stepIndex = Math.floor(elapsed / intervalTime) - 1;
        if (stepIndex >= 0 && stepIndex < selectedMeditation.voiceGuidance.length && stepIndex !== guidanceStep) {
          setGuidanceStep(stepIndex);
          playGuidance(selectedMeditation.voiceGuidance[stepIndex]);
        }
      }
    }
  }, [timeLeft, isActive, selectedMeditation, guidanceStep, sessionComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = async () => {
    // Create new session in database
    const session = await meditationService.createSession({
      meditation_type: selectedMeditation.name,
      planned_duration: selectedDuration,
      completed: false,
      difficulty_level: selectedMeditation.difficulty
    });

    if (session) {
      setCurrentSessionId(session.id!);
      setIsActive(true);
      setTimeLeft(selectedDuration * 60);
      setSessionComplete(false);
      setGuidanceStep(0);
      
      // Play initial guidance
      playGuidance(selectedMeditation.voiceGuidance[0]);
      
      toast({
        title: "Meditation Started",
        description: `Beginning ${selectedDuration}-minute ${selectedMeditation.name} session`,
      });
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(selectedDuration * 60);
    setSessionComplete(false);
    setCurrentSessionId(null);
    setGuidanceStep(0);
    setShowBreathingGuide(false);
  };

  const completeSession = async () => {
    if (currentSessionId) {
      const actualDuration = Math.round((selectedDuration * 60 - timeLeft) / 60);
      const success = await meditationService.completeSession(currentSessionId, actualDuration);
      
      if (success) {
        toast({
          title: "Session Complete! 🧘‍♀️",
          description: `You meditated for ${actualDuration} minutes. Well done!`,
        });
      }
    }
  };

  const playGuidance = useCallback(async (text: string) => {
    await generateAndPlay({
      text,
      emotion: 'compassionate'
    });
  }, [generateAndPlay]);

  const toggleBreathingGuide = () => {
    setShowBreathingGuide(!showBreathingGuide);
  };

  const progressPercentage = ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100;

  return (
    <div className="space-y-6">
      {/* Meditation Selection */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Choose Your Practice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Meditation Types */}
          <div className="space-y-3">
            {meditationTypes.map((meditation) => (
              <div
                key={meditation.id}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedMeditation.id === meditation.id
                    ? 'bg-purple-600/30 border border-purple-400'
                    : 'bg-purple-900/20 hover:bg-purple-800/30'
                }`}
                onClick={() => !isActive && setSelectedMeditation(meditation)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white">{meditation.name}</h3>
                    <p className="text-sm text-purple-300">{meditation.description}</p>
                  </div>
                  <Badge variant="outline" className="border-purple-400 text-purple-200">
                    {meditation.difficulty}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Duration Selection */}
          <div className="space-y-3">
            <label className="text-white font-medium">Duration</label>
            <div className="grid grid-cols-4 gap-2">
              {selectedMeditation.duration.map((duration) => (
                <Button
                  key={duration}
                  variant={selectedDuration === duration ? "default" : "outline"}
                  size="sm"
                  onClick={() => !isActive && setSelectedDuration(duration)}
                  disabled={isActive}
                  className={selectedDuration === duration 
                    ? "bg-purple-600 hover:bg-purple-700" 
                    : "border-purple-400 text-purple-200 hover:bg-purple-400/20"
                  }
                >
                  {duration}m
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meditation Timer */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Heart className="w-5 h-5 mr-2 text-purple-400" />
            Meditation Timer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="text-center">
            {showBreathingGuide && isActive ? (
              <BreathingGuide isActive={isActive} pattern="simple" />
            ) : (
              <div className="w-48 h-48 mx-auto rounded-full border-4 border-purple-500/30 flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-indigo-900/30">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-purple-300">
                    {selectedMeditation.name}
                  </div>
                </div>
              </div>
            )}
            
            <Progress 
              value={progressPercentage} 
              className="mt-4 h-2"
            />
          </div>

          {/* Instructions */}
          <div className="bg-purple-900/20 rounded-lg p-4 text-center">
            <p className="text-purple-200 text-sm">
              {selectedMeditation.instructions}
            </p>
          </div>

          {/* Timer Controls */}
          <div className="flex justify-center space-x-4">
            {!isActive ? (
              <Button 
                onClick={startTimer}
                disabled={isGenerating}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Session
              </Button>
            ) : (
              <Button 
                onClick={pauseTimer}
                variant="outline"
                className="border-purple-400 text-purple-200"
              >
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
            )}
            
            <Button 
              onClick={resetTimer}
              variant="outline"
              className="border-purple-400 text-purple-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>

            <Button 
              onClick={toggleBreathingGuide}
              variant="outline"
              className="border-purple-400 text-purple-200"
            >
              <Heart className="w-4 h-4 mr-2" />
              {showBreathingGuide ? 'Hide' : 'Show'} Guide
            </Button>
          </div>

          {/* Session Complete */}
          {sessionComplete && (
            <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 text-center">
              <Star className="w-8 h-8 mx-auto text-green-300 mb-2" />
              <h3 className="font-medium text-green-300 mb-1">Session Complete!</h3>
              <p className="text-green-200 text-sm">
                You've completed {selectedDuration} minutes of {selectedMeditation.name}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
