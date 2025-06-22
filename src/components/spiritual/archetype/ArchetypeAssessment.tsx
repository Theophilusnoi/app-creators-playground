
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles, Heart, Mountain } from "lucide-react";
import { ARCHETYPES } from '@/data/archetypes';
import { SoulArchetype } from '@/types/archetype';
import { useToast } from '@/hooks/use-toast';

interface AssessmentQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    archetypes: string[];
    weight: number;
  }[];
}

const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'sacred-space',
    question: 'When you imagine your ideal sacred space, what calls to you most deeply?',
    options: [
      { text: 'A forest grove with ancient oaks and stone circles', archetypes: ['warrior-sage', 'wise-woman'], weight: 3 },
      { text: 'A mountain cave overlooking vast landscapes', archetypes: ['mountain-sage', 'sphinx-guardian'], weight: 3 },
      { text: 'A riverbank with flowing water and singing birds', archetypes: ['earth-keeper', 'compassionate-warrior'], weight: 3 },
      { text: 'A temple with incense, music, and dancing flames', archetypes: ['cosmic-dancer', 'rhythm-keeper'], weight: 3 },
      { text: 'A modern laboratory filled with crystals and sacred geometry', archetypes: ['quantum-bridge'], weight: 3 }
    ]
  },
  {
    id: 'spiritual-calling',
    question: 'What feels like your deepest spiritual calling?',
    options: [
      { text: 'Protecting and guiding others on their journey', archetypes: ['warrior-sage', 'compassionate-warrior'], weight: 3 },
      { text: 'Preserving and sharing ancient wisdom', archetypes: ['sphinx-guardian', 'wise-woman'], weight: 3 },
      { text: 'Healing the Earth and all her creatures', archetypes: ['earth-keeper', 'wise-woman'], weight: 3 },
      { text: 'Creating beauty and inspiring transformation', archetypes: ['cosmic-dancer', 'rhythm-keeper'], weight: 3 },
      { text: 'Seeking ultimate truth and enlightenment', archetypes: ['mountain-sage'], weight: 3 },
      { text: 'Building bridges between worlds and communities', archetypes: ['quantum-bridge', 'rhythm-keeper'], weight: 3 }
    ]
  },
  {
    id: 'power-source',
    question: 'Where do you feel most connected to spiritual power?',
    options: [
      { text: 'In fierce determination and righteous anger', archetypes: ['warrior-sage'], weight: 3 },
      { text: 'In deep stillness and meditation', archetypes: ['mountain-sage', 'compassionate-warrior'], weight: 3 },
      { text: 'In wild nature and elemental forces', archetypes: ['earth-keeper', 'wise-woman'], weight: 3 },
      { text: 'In ecstatic dance and creative expression', archetypes: ['cosmic-dancer', 'rhythm-keeper'], weight: 3 },
      { text: 'In ancient symbols and mysterious knowledge', archetypes: ['sphinx-guardian'], weight: 3 },
      { text: 'In scientific wonder and quantum possibilities', archetypes: ['quantum-bridge'], weight: 3 }
    ]
  },
  {
    id: 'shadow-challenge',
    question: 'What shadow aspect do you most need to integrate?',
    options: [
      { text: 'My tendency to control and over-protect others', archetypes: ['warrior-sage'], weight: 2 },
      { text: 'My isolation and disconnection from community', archetypes: ['mountain-sage', 'wise-woman'], weight: 2 },
      { text: 'My emotional overwhelm and taking on others\' pain', archetypes: ['earth-keeper', 'compassionate-warrior'], weight: 2 },
      { text: 'My drama addiction and emotional intensity', archetypes: ['cosmic-dancer', 'rhythm-keeper'], weight: 2 },
      { text: 'My secretiveness and spiritual superiority', archetypes: ['sphinx-guardian'], weight: 2 },
      { text: 'My overthinking and imposter syndrome', archetypes: ['quantum-bridge'], weight: 2 }
    ]
  },
  {
    id: 'gift-expression',
    question: 'How do your spiritual gifts most naturally express?',
    options: [
      { text: 'Through leadership and protective action', archetypes: ['warrior-sage'], weight: 3 },
      { text: 'Through healing touch and plant medicine', archetypes: ['wise-woman', 'earth-keeper'], weight: 3 },
      { text: 'Through deep meditation and philosophical insight', archetypes: ['mountain-sage'], weight: 3 },
      { text: 'Through art, music, and transformational performance', archetypes: ['cosmic-dancer', 'rhythm-keeper'], weight: 3 },
      { text: 'Through ancient rituals and initiation ceremonies', archetypes: ['sphinx-guardian'], weight: 3 },
      { text: 'Through compassionate service and conflict resolution', archetypes: ['compassionate-warrior'], weight: 3 },
      { text: 'Through innovative integration of science and spirit', archetypes: ['quantum-bridge'], weight: 3 }
    ]
  }
];

interface ArchetypeAssessmentProps {
  onComplete: (primaryArchetype: SoulArchetype, secondaryArchetype?: SoulArchetype) => void;
}

export const ArchetypeAssessment: React.FC<ArchetypeAssessmentProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [archetypeScores, setArchetypeScores] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const handleAnswer = (optionIndex: number) => {
    const question = ASSESSMENT_QUESTIONS[currentQuestion];
    const option = question.options[optionIndex];
    
    // Update answers
    const newAnswers = { ...answers, [question.id]: optionIndex };
    setAnswers(newAnswers);
    
    // Update archetype scores
    const newScores = { ...archetypeScores };
    option.archetypes.forEach(archetypeId => {
      newScores[archetypeId] = (newScores[archetypeId] || 0) + option.weight;
    });
    setArchetypeScores(newScores);
    
    // Move to next question or complete assessment
    if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeAssessment(newScores);
    }
  };

  const completeAssessment = (scores: Record<string, number>) => {
    // Find top two archetypes
    const sortedArchetypes = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2);
    
    const primaryArchetypeId = sortedArchetypes[0]?.[0];
    const secondaryArchetypeId = sortedArchetypes[1]?.[0];
    
    const primaryArchetype = ARCHETYPES.find(a => a.id === primaryArchetypeId);
    const secondaryArchetype = ARCHETYPES.find(a => a.id === secondaryArchetypeId);
    
    if (primaryArchetype) {
      toast({
        title: "Soul Archetype Revealed",
        description: `Your primary archetype is ${primaryArchetype.name} from the ${primaryArchetype.tradition} tradition.`,
      });
      onComplete(primaryArchetype, secondaryArchetype);
    }
  };

  const progress = ((currentQuestion + 1) / ASSESSMENT_QUESTIONS.length) * 100;
  const question = ASSESSMENT_QUESTIONS[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            Soul Archetype Assessment
          </CardTitle>
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-purple-200 text-sm">
              Question {currentQuestion + 1} of {ASSESSMENT_QUESTIONS.length}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-purple-900/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              {question.question}
            </h3>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-4 border-purple-500/50 text-purple-100 hover:bg-purple-700/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-purple-400 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="flex-1">{option.text}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-purple-300 text-sm">
              Choose the option that resonates most deeply with your soul
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
