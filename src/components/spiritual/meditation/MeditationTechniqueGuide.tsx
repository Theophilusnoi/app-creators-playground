
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, Heart, Eye, Waves } from "lucide-react";

interface TechniqueStep {
  step: number;
  title: string;
  description: string;
  duration?: string;
}

interface MeditationTechnique {
  id: string;
  name: string;
  icon: React.ElementType;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  benefits: string[];
  preparation: string[];
  steps: TechniqueStep[];
  tips: string[];
  variations: string[];
}

const MEDITATION_TECHNIQUES: MeditationTechnique[] = [
  {
    id: 'mindfulness',
    name: 'Mindfulness Meditation',
    icon: Target,
    difficulty: 'Beginner',
    duration: '5-30 minutes',
    benefits: [
      'Increased present-moment awareness',
      'Reduced anxiety and stress',
      'Improved emotional regulation',
      'Enhanced focus and concentration',
      'Better sleep quality'
    ],
    preparation: [
      'Find a quiet, comfortable space',
      'Sit with spine straight but relaxed',
      'Close eyes or soften gaze downward',
      'Place hands comfortably on knees or lap',
      'Take three deep breaths to settle'
    ],
    steps: [
      {
        step: 1,
        title: 'Establish Your Posture',
        description: 'Sit comfortably with your back straight. Imagine a string gently pulling the top of your head toward the ceiling while your shoulders relax downward.',
        duration: '1 minute'
      },
      {
        step: 2,
        title: 'Begin Breath Awareness',
        description: 'Focus your attention on your natural breathing. Notice the sensation of air entering and leaving your nostrils.',
        duration: '2-3 minutes'
      },
      {
        step: 3,
        title: 'Observe Without Judgment',
        description: 'When thoughts, emotions, or sensations arise, simply notice them without trying to change or judge them. Label them gently as "thinking" and return to your breath.',
        duration: 'Ongoing'
      },
      {
        step: 4,
        title: 'Expand Awareness',
        description: 'Gradually expand your awareness to include sounds, physical sensations, and the space around you while maintaining breath awareness.',
        duration: 'Final 5 minutes'
      },
      {
        step: 5,
        title: 'Gentle Return',
        description: 'Slowly wiggle fingers and toes, take a deeper breath, and gently open your eyes when ready.',
        duration: '1 minute'
      }
    ],
    tips: [
      'Start with shorter sessions (5-10 minutes) and gradually increase',
      'Consistency is more important than duration',
      'Use a timer with a gentle bell sound',
      'Practice at the same time each day to build habit',
      'Be patient and kind with yourself'
    ],
    variations: [
      'Walking Mindfulness: Practice while walking slowly',
      'Eating Mindfulness: Focus completely on eating experience',
      'Body Scan: Move attention systematically through body parts',
      'Mindful Listening: Focus entirely on surrounding sounds'
    ]
  },
  {
    id: 'breathwork',
    name: 'Breathwork Meditation',
    icon: Waves,
    difficulty: 'Beginner',
    duration: '10-20 minutes',
    benefits: [
      'Calms nervous system',
      'Increases oxygen flow',
      'Reduces blood pressure',
      'Improves mental clarity',
      'Balances emotions'
    ],
    preparation: [
      'Sit or lie down comfortably',
      'Loosen tight clothing around chest/waist',
      'Place one hand on chest, one on belly',
      'Ensure spine is aligned',
      'Close eyes and relax face muscles'
    ],
    steps: [
      {
        step: 1,
        title: 'Natural Breath Observation',
        description: 'Begin by observing your natural breathing pattern without changing it. Notice which hand moves more - chest or belly.',
        duration: '2 minutes'
      },
      {
        step: 2,
        title: '4-7-8 Breathing Pattern',
        description: 'Inhale through nose for 4 counts, hold breath for 7 counts, exhale through mouth for 8 counts. Make a soft "whoosh" sound on exhale.',
        duration: '4-6 cycles'
      },
      {
        step: 3,
        title: 'Box Breathing',
        description: 'Inhale for 4 counts, hold for 4 counts, exhale for 4 counts, hold empty for 4 counts. Visualize drawing a square with your breath.',
        duration: '5-8 cycles'
      },
      {
        step: 4,
        title: 'Belly Breathing',
        description: 'Focus on deep diaphragmatic breathing. Belly should rise on inhale, chest stays relatively still. Exhale slowly and completely.',
        duration: '5 minutes'
      },
      {
        step: 5,
        title: 'Return to Natural',
        description: 'Allow breathing to return to its natural rhythm. Notice any changes in how you feel compared to when you started.',
        duration: '2 minutes'
      }
    ],
    tips: [
      'Never strain or force the breath',
      'If you feel dizzy, return to natural breathing',
      'Count silently to maintain rhythm',
      'Practice on empty stomach when possible',
      'Start with shorter holds and build up gradually'
    ],
    variations: [
      'Alternate Nostril Breathing: Use thumb and finger to alternate nostrils',
      'Three-Part Breath: Fill belly, ribs, then chest sequentially',
      'Breath of Fire: Quick, powerful exhales through nose',
      'Ocean Breath: Create soft "ocean" sound in throat'
    ]
  },
  {
    id: 'visualization',
    name: 'Visualization Meditation',
    icon: Eye,
    difficulty: 'Intermediate',
    duration: '15-30 minutes',
    benefits: [
      'Enhances creativity and imagination',
      'Reduces stress and anxiety',
      'Improves goal manifestation',
      'Develops mental focus',
      'Promotes deep relaxation'
    ],
    preparation: [
      'Choose a peaceful, comfortable location',
      'Sit or lie down with eyes closed',
      'Take several deep, centering breaths',
      'Set a clear intention for your practice',
      'Have a specific scene or goal in mind'
    ],
    steps: [
      {
        step: 1,
        title: 'Relaxation Induction',
        description: 'Progressively relax each part of your body from head to toe. Feel yourself becoming deeply calm and receptive.',
        duration: '3-5 minutes'
      },
      {
        step: 2,
        title: 'Create Your Sacred Space',
        description: 'Visualize a peaceful, beautiful place - real or imaginary. See it clearly: colors, textures, lighting. Make it vivid and detailed.',
        duration: '3-5 minutes'
      },
      {
        step: 3,
        title: 'Engage All Senses',
        description: 'Add sounds, smells, textures, and even tastes to your visualization. The more senses involved, the more powerful the experience.',
        duration: '5-10 minutes'
      },
      {
        step: 4,
        title: 'Manifest Your Intention',
        description: 'If working toward a goal, visualize yourself achieving it. See, feel, and experience your success as if it\'s happening now.',
        duration: '5-10 minutes'
      },
      {
        step: 5,
        title: 'Anchor the Experience',
        description: 'Before finishing, create a mental anchor (word, symbol, or gesture) that you can use to recall this peaceful state.',
        duration: '2 minutes'
      }
    ],
    tips: [
      'Don\'t worry if images aren\'t crystal clear - intention matters most',
      'Use guided visualizations when starting out',
      'Practice regularly to strengthen visualization skills',
      'Keep a journal of your experiences',
      'Use positive, present-tense imagery'
    ],
    variations: [
      'Healing Light Visualization: Direct healing energy to body parts',
      'Future Self Meditation: Connect with your wise future self',
      'Chakra Visualization: See and balance energy centers',
      'Nature Connection: Merge consciousness with natural elements'
    ]
  },
  {
    id: 'loving_kindness',
    name: 'Loving-Kindness Meditation',
    icon: Heart,
    difficulty: 'Beginner',
    duration: '15-25 minutes',
    benefits: [
      'Increases compassion and empathy',
      'Reduces negative emotions toward others',
      'Improves self-love and acceptance',
      'Enhances social connections',
      'Decreases symptoms of PTSD and depression'
    ],
    preparation: [
      'Sit comfortably with eyes closed',
      'Place hands on heart center',
      'Take several deep, heart-opening breaths',
      'Set intention to cultivate love and kindness',
      'Begin with self-compassion'
    ],
    steps: [
      {
        step: 1,
        title: 'Self-Love Foundation',
        description: 'Focus on yourself with unconditional love. Repeat: "May I be happy, may I be healthy, may I be safe, may I live with ease."',
        duration: '3-5 minutes'
      },
      {
        step: 2,
        title: 'Beloved Person',
        description: 'Bring to mind someone you love easily. Send them the same loving wishes: "May you be happy, may you be healthy, may you be safe, may you live with ease."',
        duration: '3-5 minutes'
      },
      {
        step: 3,
        title: 'Neutral Person',
        description: 'Think of someone neutral - perhaps a cashier or neighbor. Extend the same loving wishes to them with genuine care.',
        duration: '3-5 minutes'
      },
      {
        step: 4,
        title: 'Challenging Person',
        description: 'Bring to mind someone you have difficulty with. Start small. Send loving wishes, understanding their humanity and suffering.',
        duration: '3-5 minutes'
      },
      {
        step: 5,
        title: 'All Beings Everywhere',
        description: 'Expand to include all living beings: "May all beings be happy, may all beings be healthy, may all beings be safe, may all beings live with ease."',
        duration: '3-5 minutes'
      }
    ],
    tips: [
      'Start with easier people and gradually work to more challenging ones',
      'Customize phrases to feel authentic for you',
      'If resistance arises, return to self-love',
      'Visualize sending golden light from your heart',
      'Practice regularly to strengthen your compassion muscle'
    ],
    variations: [
      'Forgiveness Meditation: Focus specifically on releasing resentment',
      'Self-Compassion Practice: Spend entire session on self-love',
      'Group Loving-Kindness: Send love to specific communities',
      'Gratitude + Loving-Kindness: Combine appreciation with love-sending'
    ]
  },
  {
    id: 'body_scan',
    name: 'Body Scan Meditation',
    icon: Clock,
    difficulty: 'Beginner',
    duration: '20-45 minutes',
    benefits: [
      'Increases body awareness',
      'Releases physical tension',
      'Promotes deep relaxation',
      'Improves sleep quality',
      'Connects mind and body'
    ],
    preparation: [
      'Lie down comfortably on your back',
      'Support head and knees with pillows if needed',
      'Cover with blanket if cool',
      'Close eyes and allow body to settle',
      'Take three deep breaths to begin'
    ],
    steps: [
      {
        step: 1,
        title: 'Whole Body Awareness',
        description: 'Feel your entire body as one unified whole. Notice points of contact with the surface beneath you.',
        duration: '2-3 minutes'
      },
      {
        step: 2,
        title: 'Start at the Toes',
        description: 'Begin with your left big toe. Focus completely on this small area. Notice any sensations - warmth, coolness, tingling, or nothing at all.',
        duration: '1-2 minutes per area'
      },
      {
        step: 3,
        title: 'Systematic Movement',
        description: 'Move slowly through each toe, foot, ankle, calf, knee, thigh. Then repeat on right side. Maintain curious, non-judgmental attention.',
        duration: '15-20 minutes'
      },
      {
        step: 4,
        title: 'Torso and Arms',
        description: 'Scan pelvis, lower back, abdomen, chest, shoulders, arms, and hands. Notice areas of tension or relaxation.',
        duration: '10-15 minutes'
      },
      {
        step: 5,
        title: 'Head and Integration',
        description: 'Scan neck, face, and head. Then feel your body as a complete, integrated whole before slowly returning awareness to the room.',
        duration: '5 minutes'
      }
    ],
    tips: [
      'There\'s no "right" sensation to feel - whatever arises is perfect',
      'If you fall asleep, that\'s okay - your body needed rest',
      'Breathe into areas of tension without trying to change them',
      'Move slowly - rushing defeats the purpose',
      'Practice self-compassion if mind wanders frequently'
    ],
    variations: [
      'Quick Body Check: 5-minute version for busy days',
      'Emotional Body Scan: Notice where emotions are held in body',
      'Healing Light Scan: Send healing energy to each body part',
      'Tension Release Scan: Tense and release each muscle group'
    ]
  }
];

interface MeditationTechniqueGuideProps {
  techniqueId?: string;
  onClose: () => void;
}

export const MeditationTechniqueGuide: React.FC<MeditationTechniqueGuideProps> = ({
  techniqueId = 'mindfulness',
  onClose
}) => {
  const technique = MEDITATION_TECHNIQUES.find(t => t.id === techniqueId) || MEDITATION_TECHNIQUES[0];
  const Icon = technique.icon;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-200';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-200';
      case 'Advanced': return 'bg-red-500/20 text-red-200';
      default: return 'bg-gray-500/20 text-gray-200';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-purple-600/30 p-3 rounded-full">
                <Icon className="w-8 h-8 text-purple-200" />
              </div>
              <div>
                <CardTitle className="text-2xl text-white">{technique.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getDifficultyColor(technique.difficulty)}>
                    {technique.difficulty}
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-200">
                    {technique.duration}
                  </Badge>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-purple-200 hover:text-white text-2xl font-semibold"
            >
              ×
            </button>
          </div>
        </CardHeader>
      </Card>

      {/* Benefits */}
      <Card className="bg-black/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-300">Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {technique.benefits.map((benefit, index) => (
              <li key={index} className="text-green-100 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                {benefit}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Preparation */}
      <Card className="bg-black/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-300">Preparation</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {technique.preparation.map((step, index) => (
              <li key={index} className="text-blue-100 flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Step-by-Step Guide */}
      <Card className="bg-black/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300">Step-by-Step Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {technique.steps.map((step, index) => (
            <div key={index} className="border-l-4 border-purple-500/50 pl-4 py-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold">
                  Step {step.step}: {step.title}
                </h4>
                {step.duration && (
                  <Badge className="bg-purple-500/20 text-purple-200 text-xs">
                    {step.duration}
                  </Badge>
                )}
              </div>
              <p className="text-purple-100 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-black/30 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-300">Helpful Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {technique.tips.map((tip, index) => (
              <li key={index} className="text-yellow-100 flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">💡</span>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Variations */}
      <Card className="bg-black/30 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-300">Variations to Try</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {technique.variations.map((variation, index) => {
              const [title, description] = variation.split(': ');
              return (
                <div key={index} className="bg-orange-900/20 p-3 rounded-lg border border-orange-500/20">
                  <h5 className="text-orange-200 font-semibold mb-1">{title}</h5>
                  <p className="text-orange-100 text-sm">{description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
