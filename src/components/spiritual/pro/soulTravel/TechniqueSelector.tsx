
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Clock, Zap, Anchor, Eye, Mountain } from 'lucide-react';

interface Technique {
  id: string;
  name: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  icon: React.ReactNode;
  description: string;
  steps: string[];
  benefits: string[];
  warnings?: string[];
}

interface TechniqueSelectorProps {
  onTechniqueSelect: (technique: Technique) => void;
  selectedTechnique: string;
  userLevel: string;
  className?: string;
}

const TechniqueSelector: React.FC<TechniqueSelectorProps> = ({
  onTechniqueSelect,
  selectedTechnique,
  userLevel,
  className = ""
}) => {
  const [selectedTab, setSelectedTab] = useState('techniques');

  const techniques: Technique[] = [
    {
      id: 'rope',
      name: 'Rope Technique',
      difficulty: 'beginner',
      duration: '20-30 min',
      icon: <Anchor className="w-5 h-5" />,
      description: 'Visualize climbing an invisible rope to separate your astral body from the physical.',
      steps: [
        'Lie on your back in a comfortable position',
        'Imagine an invisible rope hanging from the ceiling above you',
        'Visualize reaching up with your astral hands (not physical)',
        'Pull yourself up the rope using only your astral body',
        'Apply single-point energetic pressure through rope visualization',
        'Continue until you feel separation from your physical body'
      ],
      benefits: [
        'Excellent for beginners',
        'Uses focused visualization',
        'Creates dynamic energetic pressure',
        'High success rate for first-time projectors'
      ]
    },
    {
      id: 'monroe',
      name: 'Monroe 8-Step Method',
      difficulty: 'intermediate',
      duration: '4-6 hours',
      icon: <Clock className="w-5 h-5" />,
      description: 'William Buhlman\'s early morning method using sleep cycles for optimal projection.',
      steps: [
        'Set clear intention hours before bedtime',
        'Reinforce intention throughout the day',
        'Set alarm for 4 hours after expected sleep time',
        'Upon waking, get up for 15 minutes to achieve alertness',
        'Move to practice area (not your bed)',
        'Saturate mind with immediate OBE intention',
        'Visualize walking around your house away from your body',
        'Hold intention as last conscious thought while drifting off'
      ],
      benefits: [
        'Uses natural sleep cycles',
        'High success rate',
        'Systematic approach',
        'Builds on REM state awareness'
      ]
    },
    {
      id: 'vibration',
      name: 'Vibrational State Method',
      difficulty: 'intermediate',
      duration: '30-45 min',
      icon: <Zap className="w-5 h-5" />,
      description: 'Focus on achieving and working with the vibrational state for separation.',
      steps: [
        'Achieve deep physical relaxation',
        'Enter hypnagogic state (between wake and sleep)',
        'Notice vibrations beginning in your body',
        'Don\'t fear the vibrations - welcome them',
        'Allow vibrations to intensify and spread',
        'Use mental commands to separate during peak vibrations'
      ],
      benefits: [
        'Works with natural body rhythms',
        'Clear indication of readiness',
        'Powerful separation method',
        'Builds energy sensitivity'
      ],
      warnings: [
        'Vibrations can be intense',
        'May cause initial fear response'
      ]
    },
    {
      id: 'rollout',
      name: 'Roll-Out Technique',
      difficulty: 'beginner',
      duration: '15-25 min',
      icon: <Mountain className="w-5 h-5" />,
      description: 'Simple method of rolling your astral body out of your physical body.',
      steps: [
        'Lie on your back and achieve deep relaxation',
        'Focus on your entire body as one unit',
        'Imagine your astral body as slightly offset from physical',
        'Visualize rolling to your right or left',
        'Use only mental effort, no physical movement',
        'Feel yourself rolling out and away from your physical body'
      ],
      benefits: [
        'Very gentle approach',
        'Natural rolling motion',
        'Less intimidating than other methods',
        'Good for those who fear separation'
      ]
    },
    {
      id: 'target',
      name: 'Target Technique',
      difficulty: 'advanced',
      duration: '45-60 min',
      icon: <Eye className="w-5 h-5" />,
      description: 'Focus on a specific target location to draw your consciousness there.',
      steps: [
        'Choose a specific location you want to visit',
        'Study the location thoroughly beforehand',
        'Achieve deep meditative state',
        'Visualize the target location in vivid detail',
        'Feel yourself being drawn to that location',
        'Maintain focus until you sense arrival'
      ],
      benefits: [
        'Purposeful projection',
        'Great for verification',
        'Develops remote viewing skills',
        'Builds confidence through success'
      ],
      warnings: [
        'Requires strong visualization',
        'May need multiple attempts'
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-200';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-200';
      case 'advanced': return 'bg-red-500/20 text-red-200';
      default: return 'bg-gray-500/20 text-gray-200';
    }
  };

  const filteredTechniques = techniques.filter(technique => {
    if (userLevel === 'beginner') return technique.difficulty === 'beginner';
    if (userLevel === 'intermediate') return technique.difficulty !== 'advanced';
    return true; // Advanced users can access all techniques
  });

  const selectedTechniqueData = techniques.find(t => t.id === selectedTechnique);

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Book className="w-5 h-5" />
            Projection Techniques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-2 bg-black/30">
              <TabsTrigger value="techniques">Browse Techniques</TabsTrigger>
              <TabsTrigger value="selected">Selected Method</TabsTrigger>
            </TabsList>

            <TabsContent value="techniques" className="space-y-4">
              <div className="grid gap-4">
                {filteredTechniques.map((technique) => (
                  <Card 
                    key={technique.id}
                    className={`
                      cursor-pointer transition-all border
                      ${selectedTechnique === technique.id 
                        ? 'bg-purple-500/20 border-purple-400' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }
                    `}
                    onClick={() => onTechniqueSelect(technique)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-purple-400">
                            {technique.icon}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{technique.name}</h4>
                            <p className="text-purple-300 text-sm">{technique.duration}</p>
                          </div>
                        </div>
                        <Badge className={getDifficultyColor(technique.difficulty)}>
                          {technique.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="text-purple-200 text-sm mb-3">{technique.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {technique.benefits.slice(0, 2).map((benefit, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="selected" className="space-y-4">
              {selectedTechniqueData ? (
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        {selectedTechniqueData.icon}
                        {selectedTechniqueData.name}
                      </CardTitle>
                      <Badge className={getDifficultyColor(selectedTechniqueData.difficulty)}>
                        {selectedTechniqueData.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-purple-200">{selectedTechniqueData.description}</p>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-2">Step-by-Step Instructions:</h4>
                      <ol className="space-y-2">
                        {selectedTechniqueData.steps.map((step, index) => (
                          <li key={index} className="text-purple-200 text-sm flex items-start gap-3">
                            <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {selectedTechniqueData.benefits.map((benefit, index) => (
                          <li key={index} className="text-green-200 text-sm flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedTechniqueData.warnings && (
                      <div>
                        <h4 className="text-white font-semibold mb-2">Important Notes:</h4>
                        <ul className="space-y-1">
                          {selectedTechniqueData.warnings.map((warning, index) => (
                            <li key={index} className="text-yellow-200 text-sm flex items-center gap-2">
                              <span className="text-yellow-400">⚠</span>
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-8">
                  <p className="text-purple-200">Select a technique to view detailed instructions</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechniqueSelector;
