
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Crown, Star, Heart, Shield, Eye, Zap } from 'lucide-react';

interface ArchetypeResult {
  archetype: string;
  percentage: number;
  description: string;
  strengths: string[];
  challenges: string[];
  growthPath: string[];
}

const archetypes = [
  {
    id: 'healer',
    name: 'The Healer',
    icon: Heart,
    description: 'Compassionate soul focused on healing others and the world',
    color: 'text-green-400'
  },
  {
    id: 'visionary',
    name: 'The Visionary',
    icon: Eye,
    description: 'Intuitive guide who sees beyond the veil of reality',
    color: 'text-purple-400'
  },
  {
    id: 'warrior',
    name: 'The Warrior',
    icon: Shield,
    description: 'Courageous protector fighting for justice and truth',
    color: 'text-red-400'
  },
  {
    id: 'sage',
    name: 'The Sage',
    icon: Star,
    description: 'Wise teacher sharing ancient knowledge and wisdom',
    color: 'text-blue-400'
  },
  {
    id: 'mystic',
    name: 'The Mystic',
    icon: Zap,
    description: 'Bridge between worlds, master of spiritual mysteries',
    color: 'text-yellow-400'
  },
  {
    id: 'guardian',
    name: 'The Guardian',
    icon: Crown,
    description: 'Sacred protector maintaining cosmic balance',
    color: 'text-indigo-400'
  }
];

const questions = [
  {
    id: 1,
    text: "When facing a difficult situation, I tend to:",
    options: [
      { text: "Seek to understand and heal the root cause", archetype: 'healer', weight: 3 },
      { text: "Look for the deeper spiritual meaning", archetype: 'visionary', weight: 3 },
      { text: "Take action to protect those involved", archetype: 'warrior', weight: 3 },
      { text: "Research and analyze all possibilities", archetype: 'sage', weight: 3 },
      { text: "Meditate and connect with divine guidance", archetype: 'mystic', weight: 3 },
      { text: "Ensure everyone's safety and wellbeing", archetype: 'guardian', weight: 3 }
    ]
  },
  {
    id: 2,
    text: "My greatest spiritual gift is:",
    options: [
      { text: "Empathy and emotional healing", archetype: 'healer', weight: 3 },
      { text: "Intuitive sight and prophecy", archetype: 'visionary', weight: 3 },
      { text: "Courage and righteous strength", archetype: 'warrior', weight: 3 },
      { text: "Wisdom and knowledge sharing", archetype: 'sage', weight: 3 },
      { text: "Connection to higher realms", archetype: 'mystic', weight: 3 },
      { text: "Protection and guidance", archetype: 'guardian', weight: 3 }
    ]
  },
  {
    id: 3,
    text: "In my spiritual practice, I'm drawn to:",
    options: [
      { text: "Healing rituals and energy work", archetype: 'healer', weight: 2 },
      { text: "Divination and prophetic dreams", archetype: 'visionary', weight: 2 },
      { text: "Banishing and protection spells", archetype: 'warrior', weight: 2 },
      { text: "Study of ancient texts and wisdom", archetype: 'sage', weight: 2 },
      { text: "Deep meditation and transcendence", archetype: 'mystic', weight: 2 },
      { text: "Sacred geometry and cosmic order", archetype: 'guardian', weight: 2 }
    ]
  }
];

export const SoulArchetypeSystem = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<ArchetypeResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnswer = (archetype: string, weight: number) => {
    setAnswers(prev => ({
      ...prev,
      [archetype]: (prev[archetype] || 0) + weight
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      analyzeResults();
    }
  };

  const analyzeResults = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const totalPoints = Object.values(answers).reduce((sum, points) => sum + points, 0);
      
      const archetypeResults: ArchetypeResult[] = archetypes.map(archetype => {
        const points = answers[archetype.id] || 0;
        const percentage = Math.round((points / totalPoints) * 100) || 0;
        
        return {
          archetype: archetype.name,
          percentage,
          description: archetype.description,
          strengths: generateStrengths(archetype.id),
          challenges: generateChallenges(archetype.id),
          growthPath: generateGrowthPath(archetype.id)
        };
      }).sort((a, b) => b.percentage - a.percentage);

      setResults(archetypeResults);
      setShowResults(true);
      setIsAnalyzing(false);

      toast({
        title: "Soul Archetype Analysis Complete! ✨",
        description: `Your primary archetype is ${archetypeResults[0].archetype}`,
      });
    }, 2000);
  };

  const generateStrengths = (archetypeId: string): string[] => {
    const strengthsMap: Record<string, string[]> = {
      healer: ["Deep empathy", "Natural healing abilities", "Emotional intelligence", "Compassionate nature"],
      visionary: ["Prophetic insight", "Intuitive wisdom", "Creative vision", "Spiritual sight"],
      warrior: ["Courage and bravery", "Protective instincts", "Strong will", "Justice-oriented"],
      sage: ["Ancient wisdom", "Teaching ability", "Analytical mind", "Knowledge seeker"],
      mystic: ["Divine connection", "Transcendent awareness", "Magical abilities", "Spiritual mastery"],
      guardian: ["Protective nature", "Cosmic awareness", "Sacred duty", "Balance keeper"]
    };
    return strengthsMap[archetypeId] || [];
  };

  const generateChallenges = (archetypeId: string): string[] => {
    const challengesMap: Record<string, string[]> = {
      healer: ["Absorbing others' pain", "Neglecting self-care", "Emotional overwhelm"],
      visionary: ["Difficulty grounding visions", "Misunderstood by others", "Information overload"],
      warrior: ["Righteous anger", "Burnout from fighting", "Difficulty with surrender"],
      sage: ["Analysis paralysis", "Isolation from others", "Perfectionism"],
      mystic: ["Disconnection from physical world", "Spiritual bypassing", "Integration challenges"],
      guardian: ["Burden of responsibility", "Rigid thinking", "Difficulty with change"]
    };
    return challengesMap[archetypeId] || [];
  };

  const generateGrowthPath = (archetypeId: string): string[] => {
    const growthMap: Record<string, string[]> = {
      healer: ["Practice self-healing first", "Set energetic boundaries", "Develop discernment"],
      visionary: ["Ground visions in action", "Develop communication skills", "Practice patience"],
      warrior: ["Learn strategic thinking", "Cultivate inner peace", "Practice forgiveness"],
      sage: ["Share knowledge freely", "Embrace uncertainty", "Connect with community"],
      mystic: ["Integrate spiritual insights", "Maintain physical health", "Serve others"],
      guardian: ["Embrace flexibility", "Trust the process", "Delegate responsibility"]
    };
    return growthMap[archetypeId] || [];
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResults([]);
    setShowResults(false);
  };

  if (!user) {
    return (
      <Card className="bg-black/30 border-purple-500/30">
        <CardContent className="text-center py-12">
          <Crown className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Soul Archetype Analysis</h3>
          <p className="text-purple-200">Please log in to discover your spiritual archetype</p>
        </CardContent>
      </Card>
    );
  }

  if (isAnalyzing) {
    return (
      <Card className="bg-black/30 border-purple-500/30">
        <CardContent className="text-center py-12">
          <div className="animate-spin w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-white mb-2">Analyzing Your Soul Signature...</h3>
          <p className="text-purple-200">The cosmic energies are aligning your results</p>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const primaryArchetype = results[0];
    const primaryArchetypeData = archetypes.find(a => a.name === primaryArchetype.archetype);
    const PrimaryIcon = primaryArchetypeData?.icon || Crown;

    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white text-2xl">
              <PrimaryIcon className={`w-8 h-8 ${primaryArchetypeData?.color || 'text-purple-400'}`} />
              Your Soul Archetype: {primaryArchetype.archetype}
            </CardTitle>
            <p className="text-purple-200 text-lg">{primaryArchetype.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-green-400 mb-3">✨ Your Strengths</h4>
                <ul className="space-y-2">
                  {primaryArchetype.strengths.map((strength, index) => (
                    <li key={index} className="text-purple-200 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-red-400 mb-3">⚡ Growth Areas</h4>
                <ul className="space-y-2">
                  {primaryArchetype.challenges.map((challenge, index) => (
                    <li key={index} className="text-purple-200 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-400" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-3">🌟 Your Growth Path</h4>
              <ul className="space-y-2">
                {primaryArchetype.growthPath.map((step, index) => (
                  <li key={index} className="text-purple-200 flex items-center gap-2">
                    <Badge className="bg-indigo-600 text-white">{index + 1}</Badge>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-purple-400 mb-3">All Archetype Percentages</h4>
              <div className="space-y-3">
                {results.map((result, index) => {
                  const archetypeData = archetypes.find(a => a.name === result.archetype);
                  const ArchetypeIcon = archetypeData?.icon || Star;
                  
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <ArchetypeIcon className={`w-5 h-5 ${archetypeData?.color || 'text-purple-400'}`} />
                      <span className="text-white font-medium w-32">{result.archetype}</span>
                      <Progress value={result.percentage} className="flex-1 h-2" />
                      <span className="text-purple-300 w-12 text-right">{result.percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={resetAssessment}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Retake Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="bg-black/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          <Crown className="w-6 h-6 text-purple-400" />
          Soul Archetype Assessment
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-purple-300">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-6">{currentQ.text}</h3>
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option.archetype, option.weight)}
                variant="outline"
                className="p-4 h-auto text-left border-purple-500/30 hover:bg-purple-600/20 hover:border-purple-400"
              >
                <span className="text-purple-200">{option.text}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
