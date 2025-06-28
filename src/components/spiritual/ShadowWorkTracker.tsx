
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Moon, Star, Heart, Eye, Info, CheckCircle, Clock, BookOpen, 
  Brain, Shield, Users, Target, TrendingUp, Calendar, AlertCircle,
  Lightbulb, Zap, MessageCircle, Award, Settings, Bell, Map
} from "lucide-react";
import { ProcessNarrative } from './shared/ProcessNarrative';
import { spiritualNarratives } from '@/data/spiritualNarratives';

const shadowWorkExercises = [
  {
    id: 1,
    title: "Emotional Triggers Awareness",
    description: "Identify what situations or people trigger strong emotional reactions in you",
    difficulty: "Beginner",
    duration: "10 minutes",
    category: "awareness",
    prompt: "Think about a recent situation that triggered a strong emotional response. What was happening? What emotions came up? Can you see any patterns? Write about the physical sensations you felt and what thoughts arose."
  },
  {
    id: 2,
    title: "Projection Recognition",
    description: "Explore what qualities you judge in others that might exist within yourself",
    difficulty: "Intermediate",
    duration: "15 minutes",
    category: "projection",
    prompt: "Consider someone who really irritates you. What specific qualities bother you about them? How might these qualities exist within you in some form? Be honest and compassionate with yourself as you explore this."
  },
  {
    id: 3,
    title: "Inner Child Dialogue",
    description: "Connect with and heal wounded aspects of your younger self",
    difficulty: "Advanced",
    duration: "20 minutes",
    category: "inner_child",
    prompt: "Imagine yourself as a child when you felt hurt or misunderstood. What would you say to comfort that child? What did they need to hear? Write a loving letter to your inner child."
  },
  {
    id: 4,
    title: "Shadow Integration Practice",
    description: "Work on accepting and integrating rejected aspects of yourself",
    difficulty: "Advanced",
    duration: "25 minutes",
    category: "integration",
    prompt: "Think of a quality you strongly dislike in yourself. How might this quality also have positive aspects? How can you honor this part of yourself while channeling it constructively?"
  },
  {
    id: 5,
    title: "Dreams and Shadow Messages",
    description: "Explore shadow content that appears in your dreams and unconscious imagery",
    difficulty: "Intermediate",
    duration: "15 minutes",
    category: "dreams",
    prompt: "Recall a recent dream that felt significant or disturbing. What shadow figures or themes appeared? What might your unconscious be trying to tell you?"
  },
  {
    id: 6,
    title: "Somatic Shadow Release",
    description: "Use body awareness to identify and release stored shadow energy",
    difficulty: "Intermediate",
    duration: "20 minutes",
    category: "somatic",
    prompt: "Scan your body slowly. Where do you feel tension, numbness, or discomfort? What emotions or memories arise when you focus on these areas? Breathe into these spaces with compassion."
  }
];

interface ShadowWorkEntry {
  id: string;
  exerciseId: number;
  reflection: string;
  emotions: string[];
  insights: string;
  intensity: number;
  bodyAwareness: string;
  integration: string;
  date: string;
  completed: boolean;
  category: string;
  triggers: string[];
  patterns: string[];
}

interface ShadowWorkProgress {
  totalSessions: number;
  weeklyGoal: number;
  currentStreak: number;
  longestStreak: number;
  categoriesExplored: string[];
  integrationLevel: number;
  emotionalAwareness: number;
  selfCompassion: number;
}

export const ShadowWorkTracker = () => {
  const { toast } = useToast();
  const [selectedExercise, setSelectedExercise] = useState(shadowWorkExercises[0]);
  const [activeTab, setActiveTab] = useState('practice');
  const [reflection, setReflection] = useState('');
  const [emotions, setEmotions] = useState<string[]>([]);
  const [insights, setInsights] = useState('');
  const [bodyAwareness, setBodyAwareness] = useState('');
  const [integration, setIntegration] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [patterns, setPatterns] = useState<string[]>([]);
  const [completedToday, setCompletedToday] = useState(false);
  const [showNarrative, setShowNarrative] = useState(true);
  const [shadowEntries, setShadowEntries] = useState<ShadowWorkEntry[]>([]);
  const [progress, setProgress] = useState<ShadowWorkProgress>({
    totalSessions: 0,
    weeklyGoal: 3,
    currentStreak: 0,
    longestStreak: 0,
    categoriesExplored: [],
    integrationLevel: 0,
    emotionalAwareness: 0,
    selfCompassion: 0
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [sharingEnabled, setSharingEnabled] = useState(false);

  const emotionOptions = [
    'anger', 'fear', 'sadness', 'shame', 'guilt', 'vulnerability', 
    'acceptance', 'compassion', 'curiosity', 'relief', 'empowerment', 'peace',
    'rage', 'terror', 'grief', 'humiliation', 'betrayal', 'abandonment',
    'love', 'gratitude', 'wonder', 'excitement', 'joy', 'freedom'
  ];

  const triggerCategories = [
    'criticism', 'rejection', 'abandonment', 'control', 'judgment', 'comparison',
    'authority', 'intimacy', 'success', 'failure', 'responsibility', 'boundaries'
  ];

  const commonPatterns = [
    'people-pleasing', 'perfectionism', 'avoidance', 'control', 'projection',
    'self-sabotage', 'victim-mentality', 'blame', 'defensiveness', 'withdrawal'
  ];

  // Load saved data on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('shadowWorkEntries');
    const savedProgress = localStorage.getItem('shadowWorkProgress');
    const savedSettings = localStorage.getItem('shadowWorkSettings');
    
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
      setProgress(JSON.parse(savedProgress));
    }

    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setDailyReminders(settings.dailyReminders ?? true);
      setPrivacyMode(settings.privacyMode ?? false);
      setSharingEnabled(settings.sharingEnabled ?? false);
    }
  }, []);

  const handleEmotionToggle = (emotion: string) => {
    setEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleTriggerToggle = (trigger: string) => {
    setTriggers(prev => 
      prev.includes(trigger) 
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const handlePatternToggle = (pattern: string) => {
    setPatterns(prev => 
      prev.includes(pattern) 
        ? prev.filter(p => p !== pattern)
        : [...prev, pattern]
    );
  };

  const calculateProgress = (entries: ShadowWorkEntry[]) => {
    const totalSessions = entries.filter(e => e.completed).length;
    const categoriesExplored = [...new Set(entries.map(e => e.category))];
    const currentStreak = calculateCurrentStreak(entries);
    const longestStreak = calculateLongestStreak(entries);
    const integrationLevel = Math.min(totalSessions * 2, 100);
    const emotionalAwareness = Math.min(categoriesExplored.length * 15, 100);
    const selfCompassion = Math.min(entries.filter(e => e.insights.length > 50).length * 5, 100);

    return {
      totalSessions,
      weeklyGoal: progress.weeklyGoal,
      currentStreak,
      longestStreak,
      categoriesExplored,
      integrationLevel,
      emotionalAwareness,
      selfCompassion
    };
  };

  const calculateCurrentStreak = (entries: ShadowWorkEntry[]) => {
    const sortedEntries = entries
      .filter(e => e.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let streak = 0;
    const today = new Date();
    let currentDate = new Date(today);
    
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date);
      const daysDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff <= 1) {
        streak++;
        currentDate = entryDate;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const calculateLongestStreak = (entries: ShadowWorkEntry[]) => {
    const sortedEntries = entries
      .filter(e => e.completed)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    let longestStreak = 0;
    let currentStreak = 0;
    let lastDate: Date | null = null;
    
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date);
      
      if (lastDate) {
        const daysDiff = Math.floor((entryDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          currentStreak++;
        } else {
          longestStreak = Math.max(longestStreak, currentStreak);
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }
      
      lastDate = entryDate;
    }
    
    return Math.max(longestStreak, currentStreak);
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
        bodyAwareness: bodyAwareness.trim(),
        integration: integration.trim(),
        intensity,
        triggers,
        patterns,
        date: new Date().toISOString(),
        completed: true,
        category: selectedExercise.category
      };

      const updatedEntries = [...shadowEntries, newEntry];
      setShadowEntries(updatedEntries);
      localStorage.setItem('shadowWorkEntries', JSON.stringify(updatedEntries));

      // Update progress
      const newProgress = calculateProgress(updatedEntries);
      setProgress(newProgress);
      localStorage.setItem('shadowWorkProgress', JSON.stringify(newProgress));

      setCompletedToday(true);
      
      // Clear form
      setReflection('');
      setEmotions([]);
      setInsights('');
      setBodyAwareness('');
      setIntegration('');
      setTriggers([]);
      setPatterns([]);
      setIntensity(5);

      toast({
        title: "Shadow Work Complete! 🌙",
        description: `${selectedExercise.title} has been completed. Your insights have been saved.`,
      });

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
    setBodyAwareness('');
    setIntegration('');
    setTriggers([]);
    setPatterns([]);
    setIntensity(5);
    toast({
      title: "Session Reset",
      description: "You can now start a new shadow work session.",
    });
  };

  const saveSettings = () => {
    const settings = {
      dailyReminders,
      privacyMode,
      sharingEnabled
    };
    localStorage.setItem('shadowWorkSettings', JSON.stringify(settings));
    toast({
      title: "Settings Saved",
      description: "Your shadow work preferences have been updated.",
    });
  };

  const narrative = spiritualNarratives.shadowWork;
  const flattenedBenefits = narrative.benefits.flatMap(benefitCategory => 
    benefitCategory.benefits
  );

  const weeklyProgress = Math.min((shadowEntries.filter(e => {
    const entryDate = new Date(e.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entryDate >= weekAgo && e.completed;
  }).length / progress.weeklyGoal) * 100, 100);

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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">Shadow Work Journey</h2>
            <Badge className="bg-purple-600/20 text-purple-200">
              {progress.totalSessions} sessions completed
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

        <TabsList className="grid grid-cols-6 w-full bg-black/30 mb-6">
          <TabsTrigger value="practice" className="data-[state=active]:bg-purple-600">
            <Heart className="w-4 h-4 mr-2" />
            Practice
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-purple-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-purple-600">
            <Lightbulb className="w-4 h-4 mr-2" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="community" className="data-[state=active]:bg-purple-600">
            <Users className="w-4 h-4 mr-2" />
            Community
          </TabsTrigger>
          <TabsTrigger value="guidance" className="data-[state=active]:bg-purple-600">
            <Map className="w-4 h-4 mr-2" />
            Guidance
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="practice">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

                {/* Emotional Intensity Scale */}
                <div className="space-y-3">
                  <label className="text-white font-medium">Emotional Intensity (1-10)</label>
                  <div className="px-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={intensity}
                      onChange={(e) => setIntensity(parseInt(e.target.value))}
                      className="w-full"
                      disabled={completedToday}
                    />
                    <div className="flex justify-between text-xs text-purple-300 mt-1">
                      <span>Gentle</span>
                      <span className="text-purple-200 font-medium">{intensity}</span>
                      <span>Intense</span>
                    </div>
                  </div>
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

                {/* Triggers Identification */}
                <div className="space-y-3">
                  <label className="text-white font-medium">Identified Triggers</label>
                  <div className="flex flex-wrap gap-2">
                    {triggerCategories.map((trigger) => (
                      <Button
                        key={trigger}
                        onClick={() => handleTriggerToggle(trigger)}
                        variant="outline"
                        size="sm"
                        className={`text-xs ${
                          triggers.includes(trigger)
                            ? 'bg-red-600/30 border-red-400 text-red-200'
                            : 'border-red-500/30 text-red-300 hover:bg-red-600/20'
                        }`}
                        disabled={completedToday}
                      >
                        {trigger}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Patterns Recognition */}
                <div className="space-y-3">
                  <label className="text-white font-medium">Behavioral Patterns</label>
                  <div className="flex flex-wrap gap-2">
                    {commonPatterns.map((pattern) => (
                      <Button
                        key={pattern}
                        onClick={() => handlePatternToggle(pattern)}
                        variant="outline"
                        size="sm"
                        className={`text-xs ${
                          patterns.includes(pattern)
                            ? 'bg-orange-600/30 border-orange-400 text-orange-200'
                            : 'border-orange-500/30 text-orange-300 hover:bg-orange-600/20'
                        }`}
                        disabled={completedToday}
                      >
                        {pattern}
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

                {/* Body Awareness */}
                <div className="space-y-4">
                  <label className="text-white font-medium">Body Awareness & Sensations</label>
                  <Textarea
                    value={bodyAwareness}
                    onChange={(e) => setBodyAwareness(e.target.value)}
                    placeholder="What do you notice in your body? Where do you feel tension, warmth, coldness, or other sensations? How does your body respond to these emotions?"
                    className="min-h-24 bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                    disabled={completedToday}
                  />
                </div>

                {/* Insights Area */}
                <div className="space-y-4">
                  <label className="text-white font-medium">Key Insights & Discoveries</label>
                  <Textarea
                    value={insights}
                    onChange={(e) => setInsights(e.target.value)}
                    placeholder="What insights emerged? What did you discover about yourself? What patterns or connections became clear?"
                    className="min-h-24 bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                    disabled={completedToday}
                  />
                </div>

                {/* Integration Area */}
                <div className="space-y-4">
                  <label className="text-white font-medium">Integration & Next Steps</label>
                  <Textarea
                    value={integration}
                    onChange={(e) => setIntegration(e.target.value)}
                    placeholder="How will you integrate these discoveries into your daily life? What specific actions or changes will you make? What do you want to remember from this session?"
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Weekly Progress */}
            <Card className="bg-purple-900/20 border-purple-500/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-200">{Math.floor(weeklyProgress / 100 * progress.weeklyGoal)}/{progress.weeklyGoal} sessions</span>
                  <span className="text-sm text-purple-300">{Math.round(weeklyProgress)}%</span>
                </div>
                <Progress value={weeklyProgress} className="h-2" />
                <p className="text-xs text-purple-400 mt-2">
                  Consistent practice deepens self-awareness
                </p>
              </CardContent>
            </Card>

            {/* Current Streak */}
            <Card className="bg-orange-900/20 border-orange-500/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm text-white flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-200">{progress.currentStreak}</div>
                  <div className="text-sm text-orange-300">days</div>
                  <div className="text-xs text-orange-400 mt-2">
                    Longest: {progress.longestStreak} days
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Integration Level */}
            <Card className="bg-green-900/20 border-green-500/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm text-white flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Integration Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-200">Self-Awareness</span>
                      <span className="text-green-300">{progress.emotionalAwareness}%</span>
                    </div>
                    <Progress value={progress.emotionalAwareness} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-200">Self-Compassion</span>
                      <span className="text-green-300">{progress.selfCompassion}%</span>
                    </div>
                    <Progress value={progress.selfCompassion} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-200">Integration</span>
                      <span className="text-green-300">{progress.integrationLevel}%</span>
                    </div>
                    <Progress value={progress.integrationLevel} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories Explored */}
            <Card className="bg-blue-900/20 border-blue-500/20 md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Shadow Work Categories Explored
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['awareness', 'projection', 'inner_child', 'integration', 'dreams', 'somatic'].map((category) => (
                    <Badge
                      key={category}
                      className={`${
                        progress.categoriesExplored.includes(category)
                          ? 'bg-blue-600/30 text-blue-200 border-blue-400'
                          : 'bg-gray-600/30 text-gray-400 border-gray-500'
                      }`}
                    >
                      {category.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-blue-400 mt-3">
                  {progress.categoriesExplored.length}/6 shadow work categories explored
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <div className="space-y-6">
            <Card className="bg-black/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Recent Insights & Reflections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shadowEntries.slice(-5).reverse().map((entry) => (
                    <div key={entry.id} className="border-l-4 border-purple-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-purple-200 font-medium">
                          {shadowWorkExercises.find(ex => ex.id === entry.exerciseId)?.title}
                        </h4>
                        <span className="text-xs text-purple-400">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                      {entry.insights && (
                        <p className="text-purple-300 text-sm mb-2">{entry.insights}</p>
                      )}
                      {entry.integration && (
                        <p className="text-green-300 text-sm italic">Integration: {entry.integration}</p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {entry.emotions.slice(0, 3).map((emotion) => (
                          <Badge key={emotion} className="bg-purple-600/20 text-purple-200 text-xs">
                            {emotion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="community">
          <div className="space-y-6">
            <Card className="bg-black/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Shadow Work Community
                </CardTitle>
                <CardDescription className="text-purple-200">
                  Connect with others on their shadow work journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-900/20 rounded-lg p-4">
                  <h4 className="text-purple-200 mb-2">Community Guidelines</h4>
                  <ul className="text-sm text-purple-300 space-y-1">
                    <li>• Maintain confidentiality and respect privacy</li>
                    <li>• Practice non-judgmental witnessing</li>
                    <li>• Share from your own experience, not advice</li>
                    <li>• Honor the vulnerability of others</li>
                  </ul>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                  <Users className="w-4 h-4 mr-2" />
                  Join Community Circle (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="guidance">
          <div className="space-y-6">
            <Card className="bg-black/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Map className="w-5 h-5" />
                  Personalized Shadow Work Guidance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-900/20 rounded-lg p-4">
                  <h4 className="text-purple-200 mb-2">Recommended Next Steps</h4>
                  <div className="space-y-2">
                    {progress.emotionalAwareness < 50 && (
                      <div className="flex items-center gap-2 text-sm text-purple-300">
                        <AlertCircle className="w-4 h-4" />
                        Focus on trigger awareness exercises to build emotional intelligence
                      </div>
                    )}
                    {progress.selfCompassion < 50 && (
                      <div className="flex items-center gap-2 text-sm text-purple-300">
                        <Heart className="w-4 h-4" />
                        Practice self-compassion techniques when exploring difficult emotions
                      </div>
                    )}
                    {progress.integrationLevel < 30 && (
                      <div className="flex items-center gap-2 text-sm text-purple-300">
                        <Target className="w-4 h-4" />
                        Continue regular practice to deepen your shadow work journey
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-blue-900/20 rounded-lg p-4">
                  <h4 className="text-blue-200 mb-2">Safety Reminders</h4>
                  <ul className="text-sm text-blue-300 space-y-1">
                    <li>• Go slowly and honor your emotional capacity</li>
                    <li>• Seek professional support for overwhelming emotions</li>
                    <li>• Practice grounding techniques if you feel destabilized</li>
                    <li>• Remember that healing is not linear</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-6">
            <Card className="bg-black/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Shadow Work Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-white font-medium">Daily Reminders</label>
                      <p className="text-sm text-purple-300">Receive gentle reminders for shadow work practice</p>
                    </div>
                    <Switch
                      checked={dailyReminders}
                      onCheckedChange={setDailyReminders}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-white font-medium">Privacy Mode</label>
                      <p className="text-sm text-purple-300">Enhanced privacy for sensitive reflections</p>
                    </div>
                    <Switch
                      checked={privacyMode}
                      onCheckedChange={setPrivacyMode}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-white font-medium">Community Sharing</label>
                      <p className="text-sm text-purple-300">Allow anonymous sharing of insights with community</p>
                    </div>
                    <Switch
                      checked={sharingEnabled}
                      onCheckedChange={setSharingEnabled}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white font-medium">Weekly Goal</label>
                    <select
                      value={progress.weeklyGoal}
                      onChange={(e) => setProgress(prev => ({ ...prev, weeklyGoal: parseInt(e.target.value) }))}
                      className="w-full bg-black/20 border border-purple-500/30 rounded-md p-2 text-white"
                    >
                      <option value={1}>1 session per week</option>
                      <option value={2}>2 sessions per week</option>
                      <option value={3}>3 sessions per week</option>
                      <option value={4}>4 sessions per week</option>
                      <option value={5}>5 sessions per week</option>
                      <option value={7}>Daily practice</option>
                    </select>
                  </div>
                </div>

                <Button onClick={saveSettings} className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
