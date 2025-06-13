
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Star, Heart, Eye, Moon } from "lucide-react";

interface SpiritualAssessmentProps {
  onComplete: () => void;
}

const assessmentQuestions = [
  {
    id: 1,
    category: "Awareness",
    question: "How often do you notice meaningful patterns or synchronicities in your daily life?",
    options: [
      { value: "rarely", label: "Rarely or never", points: 1 },
      { value: "sometimes", label: "Sometimes, but I dismiss them", points: 2 },
      { value: "often", label: "Often, and I pay attention", points: 3 },
      { value: "daily", label: "Daily, they guide my decisions", points: 4 }
    ]
  },
  {
    id: 2,
    category: "Shadow Work",
    question: "How comfortable are you with exploring difficult emotions or aspects of yourself?",
    options: [
      { value: "avoid", label: "I prefer to avoid them", points: 1 },
      { value: "acknowledge", label: "I acknowledge them but don't explore", points: 2 },
      { value: "explore", label: "I actively explore with curiosity", points: 3 },
      { value: "integrate", label: "I embrace and integrate them", points: 4 }
    ]
  },
  {
    id: 3,
    category: "Meditation",
    question: "What is your current relationship with meditation or contemplative practices?",
    options: [
      { value: "none", label: "No regular practice", points: 1 },
      { value: "occasional", label: "Occasional, when stressed", points: 2 },
      { value: "regular", label: "Regular daily practice", points: 3 },
      { value: "advanced", label: "Deep, transformative practice", points: 4 }
    ]
  },
  {
    id: 4,
    category: "Dreams",
    question: "How do you engage with your dreams and their messages?",
    options: [
      { value: "ignore", label: "I rarely remember or consider them", points: 1 },
      { value: "curious", label: "I'm curious but don't analyze", points: 2 },
      { value: "journal", label: "I journal and reflect on them", points: 3 },
      { value: "integrate", label: "I actively work with dream wisdom", points: 4 }
    ]
  }
];

export const SpiritualAssessment = ({ onComplete }: SpiritualAssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [assessmentQuestions[currentQuestion].id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    let totalPoints = 0;
    assessmentQuestions.forEach(question => {
      const answer = answers[question.id];
      const option = question.options.find(opt => opt.value === answer);
      if (option) totalPoints += option.points;
    });
    return totalPoints;
  };

  const getSpritualLevel = (points: number) => {
    if (points <= 6) return { level: "Awakening", description: "Beginning your conscious spiritual journey", icon: Star };
    if (points <= 10) return { level: "Exploring", description: "Actively seeking spiritual understanding", icon: Eye };
    if (points <= 14) return { level: "Integrating", description: "Weaving wisdom into daily life", icon: Heart };
    return { level: "Embodying", description: "Living from deep spiritual awareness", icon: Moon };
  };

  if (showResults) {
    const totalPoints = calculateResults();
    const { level, description, icon: LevelIcon } = getSpritualLevel(totalPoints);

    return (
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center mb-4">
            <LevelIcon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">Your Spiritual Profile</CardTitle>
          <CardDescription className="text-purple-200">
            Based on your responses, here's where you are on your journey
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{level}</h3>
            <p className="text-purple-200">{description}</p>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Personalized Recommendations</h4>
            <div className="space-y-2 text-sm text-purple-200">
              <p>• Begin with gentle shadow work exercises</p>
              <p>• Practice daily synchronicity awareness</p>
              <p>• Start a dream journal</p>
              <p>• Explore guided meditations</p>
            </div>
          </div>

          <Button 
            onClick={onComplete}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
          >
            Begin Your Journey with Seraphina
          </Button>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const question = assessmentQuestions[currentQuestion];

  return (
    <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-purple-300">Question {currentQuestion + 1} of {assessmentQuestions.length}</span>
          <span className="text-sm text-purple-300">{question.category}</span>
        </div>
        <Progress value={progress} className="mb-4" />
        <CardTitle className="text-xl text-white">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup 
          value={answers[question.id] || ""} 
          onValueChange={handleAnswer}
          className="space-y-4"
        >
          {question.options.map((option) => (
            <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 transition-colors">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="text-purple-100 cursor-pointer flex-1">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex justify-end">
          <Button 
            onClick={handleNext}
            disabled={!answers[question.id]}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {currentQuestion < assessmentQuestions.length - 1 ? 'Next' : 'Complete Assessment'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
