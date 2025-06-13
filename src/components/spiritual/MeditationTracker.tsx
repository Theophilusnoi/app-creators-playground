
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Clock, Play, Pause, RotateCcw } from "lucide-react";

const meditationTypes = [
  {
    id: 1,
    name: "Mindfulness",
    description: "Present moment awareness",
    duration: [5, 10, 15, 20],
    difficulty: "Beginner"
  },
  {
    id: 2,
    name: "Shadow Integration",
    description: "Working with difficult emotions",
    duration: [10, 15, 20, 30],
    difficulty: "Intermediate"
  },
  {
    id: 3,
    name: "Loving Kindness",
    description: "Cultivating compassion",
    duration: [10, 15, 20, 25],
    difficulty: "Beginner"
  },
  {
    id: 4,
    name: "Chakra Alignment",
    description: "Energy center balancing",
    duration: [15, 20, 30, 45],
    difficulty: "Advanced"
  }
];

const weeklyStats = {
  totalMinutes: 145,
  sessionCount: 8,
  longestStreak: 5,
  currentStreak: 3
};

export const MeditationTracker = () => {
  const [selectedMeditation, setSelectedMeditation] = useState(meditationTypes[0]);
  const [selectedDuration, setSelectedDuration] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedDuration * 60);
  const [sessionComplete, setSessionComplete] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsActive(true);
    setTimeLeft(selectedDuration * 60);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(selectedDuration * 60);
    setSessionComplete(false);
  };

  const completeSession = () => {
    setIsActive(false);
    setSessionComplete(true);
    // Here you would save to Supabase
    console.log('Meditation session completed:', {
      type: selectedMeditation.name,
      duration: selectedDuration
    });
  };

  return (
    <div className="space-y-6">
      {/* Weekly Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{weeklyStats.totalMinutes}</div>
            <div className="text-sm text-purple-200">Minutes This Week</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{weeklyStats.sessionCount}</div>
            <div className="text-sm text-purple-200">Sessions</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{weeklyStats.longestStreak}</div>
            <div className="text-sm text-purple-200">Longest Streak</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{weeklyStats.currentStreak}</div>
            <div className="text-sm text-purple-200">Current Streak</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meditation Selection */}
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Choose Your Practice</CardTitle>
            <CardDescription className="text-purple-200">
              Select a meditation type and duration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Meditation Types */}
            <div className="space-y-3">
              <label className="text-white font-medium">Meditation Type</label>
              {meditationTypes.map((meditation) => (
                <div
                  key={meditation.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedMeditation.id === meditation.id
                      ? 'bg-purple-600/30 border border-purple-400'
                      : 'bg-purple-900/20 hover:bg-purple-800/30'
                  }`}
                  onClick={() => setSelectedMeditation(meditation)}
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
                    onClick={() => setSelectedDuration(duration)}
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
              
              <Progress 
                value={((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100} 
                className="mt-4 h-2"
              />
            </div>

            {/* Timer Controls */}
            <div className="flex justify-center space-x-4">
              {!isActive ? (
                <Button 
                  onClick={startTimer}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Session
                </Button>
              ) : (
                <Button 
                  onClick={() => setIsActive(false)}
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

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={completeSession}
                disabled={!isActive && !sessionComplete}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Complete Session
              </Button>
              <Button variant="outline" className="border-purple-400 text-purple-200">
                <Clock className="w-4 h-4 mr-2" />
                View History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
