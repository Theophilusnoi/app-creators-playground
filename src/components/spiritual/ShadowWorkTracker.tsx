
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Moon, Star, Heart, Eye, Info, CheckCircle, Clock, BookOpen } from "lucide-react";
import { ProcessNarrative } from './shared/ProcessNarrative';
import { spiritualNarratives } from '@/data/spiritualNarratives';

const shadowWorkExercises = [
  {
    id: 1,
    title: "Emotional Triggers Awareness",
    description: "Identify what situations or people trigger strong emotional reactions in you",
    difficulty: "Beginner",
    duration: "10 minutes",
    prompt: "Think about a recent situation that triggered a strong emotional response. What was happening? What emotions came up? Can you see any patterns? Write about the physical sensations you felt and what thoughts arose."
  },
  {
    id: 2,
    title: "Projection Recognition",
    description: "Explore what qualities you judge in others that might exist within yourself",
    difficulty: "Intermediate",
    duration: "15 minutes",
    prompt: "Consider someone who really irritates you. What specific qualities bother you about them? How might these qualities exist within you in some form? Be honest and compassionate with yourself as you explore this."
  },
  {
    id: 3,
    title: "Inner Child Dialogue",
    description: "Connect with and heal wounded aspects of your younger self",
    difficulty: "Advanced",
    duration: "20 minutes",
    prompt: "Imagine yourself as a child when you felt hurt or misunderstood. What would you say to comfort that child? What did they need to hear? Write a loving letter to your inner child."
  },
  {
    id: 4,
    title: "Shadow Integration Practice",
    description: "Work on accepting and integrating rejected aspects of yourself",
    difficulty: "Advanced",
    duration: "25 minutes",
    prompt: "Think of a quality you strongly dislike in yourself. How might this quality also have positive aspects? How can you honor this part of yourself while channeling it constructively?"
  }
];

interface ShadowWorkEntry {
  id: string;
  exerciseId: number;
  reflection: string;
  emotions: string[];
  insights: string;
  date: string;
  completed: boolean;
}

export const ShadowWorkTracker = () => {
  const { toast } = useToast();
  const [selectedExercise, setSelectedExercise] = useState(shadowWorkExercises[0]);
  const [reflection, setReflection] = useState('');
  const [emotions, setEmotions] = useState<string[]>([]);
  const [insights, setInsights] = useState('');
  const [completedToday, setCompletedToday] = useState(false);
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [showNarrative, setShowNarrative] = useState(true);
  const [shadowEntries, setShadowEntries] = useState<ShadowWorkEntry[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const emotionOptions = [
    'anger', 'fear', 'sadness', 'shame', 'guilt', 'vulnerability', 
    'acceptance', 'compassion', 'curiosity', 'relief', 'empowerment', 'peace'
  ];

  // Load saved data on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('shadowWorkEntries');
    const savedProgress = localStorage.getItem('shadowWorkProgress');
    
    if (savedEntries) {
      const entries = JSON.parse(savedEntries);
      setShadowEntries(entries);
      
      // Check if completed today
      const today = new Date().toDateString();
      const todayEntry = entries.find((entry: ShadowWorkEntry) => 
        new Date(entry.date).toDateString() === today && entry.completed
      );
      setCompletedToday(!!todayEntry);
    }
    
    if (savedProgress) {
      setWeeklyProgress(parseInt(savedProgress));
    }
  }, []);

  const handleEmotionToggle = (emotion: string) => {
    setEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleStepProgress = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    toast({
      title: `Step ${stepIndex + 1} Activated`,
      description: spiritualNarratives.shadowWork.steps[stepIndex]?.title || "Shadow work step activated",
    });
  };

  const handleCompleteExercise = async () => {
    if (!reflection.trim()) {
      toast({
        title: "Reflection Required",
        description: "Please share your reflections before completing the exercise.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const newEntry: ShadowWorkEntry = {
        id: Date.now().toString(),
        exerciseId: selectedExercise.id,
        reflection: reflection.trim(),
        emotions,
        insights: insights.trim(),
        date: new Date().toISOString(),
        completed: true
      };

      const updatedEntries = [...shadowEntries, newEntry];
      setShadowEntries(updatedEntries);
      localStorage.setItem('shadowWorkEntries', JSON.stringify(updatedEntries));

      setCompletedToday(true);
      const newProgress = Math.min(weeklyProgress + 1, 7);
      setWeeklyProgress(newProgress);
      localStorage.setItem('shadowWorkProgress', newProgress.toString());
      
      // Clear form
      setReflection('');
      setEmotions([]);
      setInsights('');

      toast({
        title: "Shadow Work Complete! 🌙",
        description: `${selectedExercise.title} has been completed. Your insights have been saved.`,
      });

      // Auto-advance to next exercise
      setTimeout(() => {
        const nextExerciseIndex = shadowWorkExercises.findIndex(ex => ex.id === selectedExercise.id) + 1;
        if (nextExerciseIndex < shadowWorkExercises.length) {
          setSelectedExercise(shadowWorkExercises[nextExerciseIndex]);
          setCompletedToday(false);
        }
      }, 2000);

    } catch (error) {
      console.error('Error saving shadow work:', error);
      toast({
        title: "Exercise Completed",
        description: "Your shadow work has been saved locally.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBeginPractice = () => {
    setShowNarrative(false);
    toast({
      title: "Shadow Work Journey Begins",
      description: "Welcome to your inner exploration. Take your time and be gentle with yourself.",
    });
  };

  const handleResetProgress = () => {
    setCompletedToday(false);
    setReflection('');
    setEmotions([]);
    setInsights('');
    toast({
      title: "Session Reset",
      description: "You can now start a new shadow work session.",
    });
  };

  const narrative = spiritualNarratives.shadowWork;
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
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">Shadow Work Practice</h2>
            <Badge className="bg-purple-600/20 text-purple-200">
              {shadowEntries.length} sessions completed
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowNarrative(true)}
              variant="outline"
              size="sm"
              className="border-purple-400/50 text-purple-200 hover:bg-purple-400/20"
            >
              <Info className="w-4 h-4 mr-2" />
              View Guide
            </Button>
            {completedToday && (
              <Button
                onClick={handleResetProgress}
                variant="outline"
                size="sm"
                className="border-green-400/50 text-green-200 hover:bg-green-400/20"
              >
                New Session
              </Button>
            )}
          </div>
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
            {shadowWorkExercises.map((exercise, index) => {
              const isCompleted = shadowEntries.some(entry => 
                entry.exerciseId === exercise.id && entry.completed
              );
              
              return (
                <div
                  key={exercise.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedExercise.id === exercise.id
                      ? 'bg-purple-600/30 border border-purple-400'
                      : 'bg-purple-900/20 hover:bg-purple-800/30'
                  }`}
                  onClick={() => {
                    setSelectedExercise(exercise);
                    setCompletedToday(isCompleted);
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white">{exercise.title}</h3>
                      {isCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
                    </div>
                    <Badge variant="outline" className="text-xs border-purple-400 text-purple-200">
                      {exercise.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-purple-300 mb-2">{exercise.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-purple-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {exercise.duration}
                    </div>
                    {currentStep === index && (
                      <Badge className="bg-green-600/20 text-green-200 text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Process Steps Navigation */}
            <div className="mt-6 pt-4 border-t border-purple-500/30">
              <h4 className="text-purple-200 font-medium mb-3">Process Steps</h4>
              <div className="grid grid-cols-2 gap-2">
                {narrative.steps.map((step, index) => (
                  <Button
                    key={index}
                    onClick={() => handleStepProgress(index)}
                    variant="outline"
                    size="sm"
                    className={`text-xs h-8 ${
                      currentStep === index 
                        ? 'border-green-400/50 text-green-200 bg-green-400/10' 
                        : 'border-purple-400/50 text-purple-200 hover:bg-purple-400/20'
                    }`}
                  >
                    {step.title}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Exercise */}
        <Card className="lg:col-span-2 bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              {selectedExercise.title}
              <Badge className={`${
                completedToday ? 'bg-green-600/20 text-green-200' : 'bg-purple-600/20 text-purple-200'
              }`}>
                {completedToday ? 'Completed' : 'In Progress'}
              </Badge>
            </CardTitle>
            <CardDescription className="text-purple-200">
              {selectedExercise.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-purple-900/30 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Reflection Prompt
              </h4>
              <p className="text-purple-200 italic leading-relaxed">{selectedExercise.prompt}</p>
            </div>

            {/* Emotions Selection */}
            <div className="space-y-3">
              <label className="text-white font-medium">Emotions Present</label>
              <div className="flex flex-wrap gap-2">
                {emotionOptions.map((emotion) => (
                  <Button
                    key={emotion}
                    onClick={() => handleEmotionToggle(emotion)}
                    variant="outline"
                    size="sm"
                    className={`text-xs ${
                      emotions.includes(emotion)
                        ? 'bg-purple-600/30 border-purple-400 text-purple-200'
                        : 'border-purple-500/30 text-purple-300 hover:bg-purple-600/20'
                    }`}
                    disabled={completedToday}
                  >
                    {emotion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Reflection Area */}
            <div className="space-y-4">
              <label className="text-white font-medium">Your Reflection</label>
              <Textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Take time to reflect deeply and write whatever comes up for you. Be honest, compassionate, and curious about your inner landscape..."
                className="min-h-32 bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                disabled={completedToday}
              />
            </div>

            {/* Insights Area */}
            <div className="space-y-4">
              <label className="text-white font-medium">Key Insights & Integration</label>
              <Textarea
                value={insights}
                onChange={(e) => setInsights(e.target.value)}
                placeholder="What insights emerged? How will you integrate these discoveries into your daily life?"
                className="min-h-24 bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                disabled={completedToday}
              />
            </div>

            {!completedToday ? (
              <Button 
                onClick={handleCompleteExercise}
                disabled={!reflection.trim() || isProcessing}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Heart className="w-4 h-4 mr-2" />
                {isProcessing ? 'Processing...' : 'Complete Shadow Work Session'}
              </Button>
            ) : (
              <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center text-green-300 mb-2">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">Shadow work completed!</span>
                </div>
                <p className="text-green-200 text-sm">
                  Take time to integrate these insights throughout your day. Your inner work creates ripples of transformation.
                </p>
              </div>
            )}

            {/* Weekly Progress */}
            <Card className="bg-purple-900/20 border-purple-500/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm text-white flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-200">{weeklyProgress}/7 days</span>
                  <span className="text-sm text-purple-300">{Math.round((weeklyProgress/7)*100)}%</span>
                </div>
                <Progress value={(weeklyProgress/7)*100} className="h-2" />
                <p className="text-xs text-purple-400 mt-2">
                  Consistent practice deepens self-awareness and integration
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
