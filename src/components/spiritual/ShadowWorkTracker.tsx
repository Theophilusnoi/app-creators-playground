
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Moon, Star, Heart, Eye, Info } from "lucide-react";
import { ProcessNarrative } from './shared/ProcessNarrative';
import { spiritualNarratives } from '@/data/spiritualNarratives';

const shadowWorkExercises = [
  {
    id: 1,
    title: "Emotional Triggers Awareness",
    description: "Identify what situations or people trigger strong emotional reactions in you",
    difficulty: "Beginner",
    duration: "10 minutes",
    prompt: "Think about a recent situation that triggered a strong emotional response. What was happening? What emotions came up? Can you see any patterns?"
  },
  {
    id: 2,
    title: "Projection Recognition",
    description: "Explore what qualities you judge in others that might exist within yourself",
    difficulty: "Intermediate",
    duration: "15 minutes",
    prompt: "Consider someone who really irritates you. What specific qualities bother you about them? How might these qualities exist within you in some form?"
  },
  {
    id: 3,
    title: "Inner Child Dialogue",
    description: "Connect with and heal wounded aspects of your younger self",
    difficulty: "Advanced",
    duration: "20 minutes",
    prompt: "Imagine yourself as a child when you felt hurt or misunderstood. What would you say to comfort that child? What did they need to hear?"
  }
];

export const ShadowWorkTracker = () => {
  const [selectedExercise, setSelectedExercise] = useState(shadowWorkExercises[0]);
  const [reflection, setReflection] = useState('');
  const [completedToday, setCompletedToday] = useState(false);
  const [weeklyProgress, setWeeklyProgress] = useState(3);
  const [showNarrative, setShowNarrative] = useState(true);

  const handleCompleteExercise = () => {
    if (reflection.trim()) {
      setCompletedToday(true);
      setWeeklyProgress(prev => Math.min(prev + 1, 7));
      // Here you would save to Supabase
      console.log('Shadow work reflection:', reflection);
    }
  };

  const handleBeginPractice = () => {
    setShowNarrative(false);
  };

  const narrative = spiritualNarratives.shadowWork;
  
  // Flatten the benefits array from ProcessBenefit[] to string[]
  const flattenedBenefits = narrative.benefits.flatMap(benefitCategory => 
    benefitCategory.benefits
  );

  return (
    <div>
      <ProcessNarrative
        open={showNarrative}
        onClose={() => setShowNarrative(false)}
        onBegin={handleBeginPractice}
        title={narrative.title}
        subtitle={narrative.subtitle}
        introduction={narrative.introduction}
        steps={narrative.steps}
        benefits={flattenedBenefits}
        guidelines={narrative.guidelines}
        headerIcon={narrative.headerIcon}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Header with Info Button */}
        <div className="lg:col-span-3 flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Shadow Work Practice</h2>
          <Button
            onClick={() => setShowNarrative(true)}
            variant="outline"
            size="sm"
            className="border-purple-400/50 text-purple-200 hover:bg-purple-400/20"
          >
            <Info className="w-4 h-4 mr-2" />
            View Guide
          </Button>
        </div>

        {/* Exercise Selection */}
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Moon className="w-5 h-5 mr-2 text-purple-400" />
              Shadow Work Exercises
            </CardTitle>
            <CardDescription className="text-purple-200">
              Choose an exercise for today's inner work
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {shadowWorkExercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedExercise.id === exercise.id
                    ? 'bg-purple-600/30 border border-purple-400'
                    : 'bg-purple-900/20 hover:bg-purple-800/30'
                }`}
                onClick={() => setSelectedExercise(exercise)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">{exercise.title}</h3>
                  <Badge variant="outline" className="text-xs border-purple-400 text-purple-200">
                    {exercise.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-purple-300 mb-2">{exercise.description}</p>
                <div className="flex items-center text-xs text-purple-400">
                  <Star className="w-3 h-3 mr-1" />
                  {exercise.duration}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Current Exercise */}
        <Card className="lg:col-span-2 bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">{selectedExercise.title}</CardTitle>
            <CardDescription className="text-purple-200">
              {selectedExercise.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-purple-900/30 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Reflection Prompt</h4>
              <p className="text-purple-200 italic">{selectedExercise.prompt}</p>
            </div>

            <div className="space-y-4">
              <label className="text-white font-medium">Your Reflection</label>
              <Textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Take time to reflect deeply and write whatever comes up for you..."
                className="min-h-32 bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                disabled={completedToday}
              />
            </div>

            {!completedToday ? (
              <Button 
                onClick={handleCompleteExercise}
                disabled={!reflection.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Heart className="w-4 h-4 mr-2" />
                Complete Today's Shadow Work
              </Button>
            ) : (
              <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center text-green-300">
                  <Star className="w-5 h-5 mr-2" />
                  <span className="font-medium">Shadow work completed for today!</span>
                </div>
                <p className="text-green-200 text-sm mt-1">
                  Take time to integrate these insights throughout your day.
                </p>
              </div>
            )}

            {/* Weekly Progress */}
            <Card className="bg-purple-900/20 border-purple-500/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm text-white">Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-200">{weeklyProgress}/7 days</span>
                  <span className="text-sm text-purple-300">{Math.round((weeklyProgress/7)*100)}%</span>
                </div>
                <Progress value={(weeklyProgress/7)*100} className="h-2" />
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
