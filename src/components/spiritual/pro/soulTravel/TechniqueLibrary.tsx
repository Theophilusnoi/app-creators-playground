
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Star, Clock, Target } from 'lucide-react';

interface Technique {
  id: string;
  name: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  description: string;
  steps: string[];
  benefits: string[];
  prerequisites: string[];
  tips: string[];
}

interface TechniqueLibraryProps {
  selectedTechnique: string;
  onTechniqueSelect: (technique: Technique) => void;
  userLevel: string;
}

const techniques: Technique[] = [
  {
    id: 'rope',
    name: 'Rope Technique',
    difficulty: 'beginner',
    duration: '20-30 min',
    description: 'Visualize climbing an invisible rope above your body to initiate separation.',
    steps: [
      'Lie down in a comfortable position',
      'Achieve deep relaxation through progressive muscle relaxation',
      'Visualize a rope hanging above your solar plexus',
      'Imagine reaching up and grasping the rope with your astral hands',
      'Pull yourself up hand over hand',
      'Feel the separation sensation as you climb'
    ],
    benefits: ['Simple to learn', 'Effective for beginners', 'Clear visualization target'],
    prerequisites: ['Basic relaxation skills'],
    tips: ['Focus on the feeling of climbing, not just the visual', 'Practice during afternoon hours']
  },
  {
    id: 'monroe',
    name: 'Monroe Method',
    difficulty: 'intermediate',
    duration: '45-60 min',
    description: 'Robert Monroe\'s systematic approach using vibrational states.',
    steps: [
      'Enter deep relaxation state',
      'Reach the hypnagogic state (between wake and sleep)',
      'Deepen the state through visualization',
      'Experience vibrational state',
      'Control and direct the vibrations',
      'Separate from physical body'
    ],
    benefits: ['Well-documented method', 'Gradual progression', 'Strong foundation'],
    prerequisites: ['Experience with meditation', 'Familiarity with altered states'],
    tips: ['Use binaural beats if available', 'Practice patience with vibrational state']
  },
  {
    id: 'target',
    name: 'Target Technique',
    difficulty: 'intermediate',
    duration: '30-45 min',
    description: 'Focus on a specific location or object to draw your consciousness.',
    steps: [
      'Choose a familiar target location',
      'Relax and close your eyes',
      'Visualize the target in vivid detail',
      'Imagine yourself present at that location',
      'Feel yourself being drawn to the target',
      'Experience the shift in perspective'
    ],
    benefits: ['Goal-oriented approach', 'Easier verification', 'Practical applications'],
    prerequisites: ['Good visualization skills', 'Familiar target locations'],
    tips: ['Start with nearby, familiar locations', 'Use photos to enhance visualization']
  },
  {
    id: 'watchtower',
    name: 'Watchtower Method',
    difficulty: 'advanced',
    duration: '60-90 min',
    description: 'Advanced technique using consciousness transfer to pre-established viewpoints.',
    steps: [
      'Establish multiple "watchtower" viewpoints during waking hours',
      'Enter deep meditative state',
      'Recall the feeling of each watchtower location',
      'Transfer consciousness to the first watchtower',
      'Move between watchtowers fluidly',
      'Expand awareness from established points'
    ],
    benefits: ['Multiple exit points', 'Enhanced control', 'Verified locations'],
    prerequisites: ['Successful basic projections', 'Established meditation practice'],
    tips: ['Set up watchtowers during regular activities', 'Practice location memory exercises']
  },
  {
    id: 'phase',
    name: 'Phase Technique',
    difficulty: 'advanced',
    duration: '15-30 min',
    description: 'Direct separation method developed by Michael Raduga, best practiced upon waking.',
    steps: [
      'Wake up after 4-6 hours of sleep',
      'Remain motionless with eyes closed',
      'Attempt rapid separation techniques in sequence',
      'Try rolling out of body',
      'Try floating upward',
      'Try visualization of getting up'
    ],
    benefits: ['Quick results', 'High success rate', 'Multiple techniques'],
    prerequisites: ['Understanding of sleep cycles', 'Ability to wake naturally'],
    tips: ['Practice during morning hours', 'Cycle through techniques quickly']
  }
];

const TechniqueLibrary: React.FC<TechniqueLibraryProps> = ({
  selectedTechnique,
  onTechniqueSelect,
  userLevel
}) => {
  const [expandedTechnique, setExpandedTechnique] = useState<string | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const isAccessible = (technique: Technique) => {
    const levelOrder = ['beginner', 'intermediate', 'advanced'];
    const userLevelIndex = levelOrder.indexOf(userLevel);
    const techniqueIndex = levelOrder.indexOf(technique.difficulty);
    return userLevelIndex >= techniqueIndex;
  };

  const filteredTechniques = techniques.filter(isAccessible);

  return (
    <div className="space-y-4">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
        <h3 className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Projection Techniques
        </h3>
        <p className="text-purple-200 text-sm">
          Choose a technique that matches your experience level. Each method offers a different approach to achieving out-of-body experiences.
        </p>
      </div>

      {filteredTechniques.map((technique) => (
        <Card 
          key={technique.id} 
          className={`bg-white/10 backdrop-blur-sm border transition-all duration-200 ${
            selectedTechnique === technique.id 
              ? 'border-purple-500/50 ring-2 ring-purple-500/20' 
              : 'border-white/20 hover:border-white/30'
          }`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                {technique.name}
                {selectedTechnique === technique.id && (
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                )}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getDifficultyColor(technique.difficulty)}>
                  {technique.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-purple-300">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{technique.duration}</span>
                </div>
              </div>
            </div>
            <p className="text-purple-200 text-sm">{technique.description}</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={() => onTechniqueSelect(technique)}
                className={`flex-1 ${
                  selectedTechnique === technique.id
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-purple-600/50 hover:bg-purple-600'
                } text-white`}
              >
                {selectedTechnique === technique.id ? 'Selected' : 'Select Technique'}
              </Button>
              <Button
                onClick={() => setExpandedTechnique(
                  expandedTechnique === technique.id ? null : technique.id
                )}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                {expandedTechnique === technique.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>

            {expandedTechnique === technique.id && (
              <div className="space-y-4 pt-4 border-t border-white/20">
                <div>
                  <h4 className="text-white font-medium mb-2">Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    {technique.steps.map((step, index) => (
                      <li key={index} className="text-purple-200 text-sm">{step}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {technique.benefits.map((benefit, index) => (
                      <li key={index} className="text-green-200 text-sm">{benefit}</li>
                    ))}
                  </ul>
                </div>

                {technique.tips.length > 0 && (
                  <div>
                    <h4 className="text-white font-medium mb-2">Tips:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {technique.tips.map((tip, index) => (
                        <li key={index} className="text-yellow-200 text-sm">{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {technique.prerequisites.length > 0 && (
                  <div>
                    <h4 className="text-white font-medium mb-2">Prerequisites:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {technique.prerequisites.map((prereq, index) => (
                        <li key={index} className="text-orange-200 text-sm">{prereq}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {filteredTechniques.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="text-center py-8">
            <p className="text-purple-200">
              Complete more basic training to unlock additional techniques.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TechniqueLibrary;
