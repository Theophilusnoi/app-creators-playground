
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Brain, 
  Zap, 
  Eye, 
  Shield,
  TrendingDown,
  Users,
  Home
} from 'lucide-react';

interface TroubleshootingGuideProps {
  userProfile: any;
}

export const TroubleshootingGuide: React.FC<TroubleshootingGuideProps> = ({ userProfile }) => {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const commonIssues = {
    'inconsistent-results': {
      title: 'Inconsistent Results & Performance Variability',
      icon: TrendingDown,
      description: 'Success comes easily one day and seems impossible the next',
      causes: [
        'Physical factors: fatigue, illness, hormonal changes, blood sugar',
        'Emotional states: stress, anxiety, depression, emotional turbulence',
        'Environmental factors: electromagnetic fields, weather, lunar cycles',
        'Energy fluctuations and subtle environmental changes'
      ],
      solutions: [
        'Track physical variables alongside practice results',
        'Maintain detailed practice logs including conditions',
        'Practice when well-rested and emotionally balanced',
        'Identify optimal environmental conditions for practice',
        'Accept variability as normal part of development'
      ]
    },
    'mental-blocks': {
      title: 'Mental Blocks & Limiting Beliefs',
      icon: Brain,
      description: 'Unconscious resistance sabotaging conscious efforts',
      causes: [
        'Cultural conditioning emphasizing mind-matter separation',
        'Deep-seated beliefs about impossibility of telekinesis',
        'Fear of success and its implications',
        'Unconscious doubts despite conscious belief'
      ],
      solutions: [
        'Honest self-examination of beliefs and fears',
        'Gradual expansion of sense of what is possible',
        'Work with experienced teachers or counselors',
        'Affirmation work and visualization of success',
        'Address fear of success and its consequences'
      ]
    },
    'exhaustion': {
      title: 'Physical & Energetic Exhaustion',
      icon: Zap,
      description: 'Fatigue, headaches, or depletion after practice',
      causes: [
        'Excessive mental concentration creating physical tension',
        'Forcing results through willpower rather than natural flow',
        'Depleting personal energy reserves',
        'Practicing for too long without breaks'
      ],
      solutions: [
        'Practice with relaxed effort, not forced concentration',
        'Release unnecessary muscle tension during practice',
        'Take regular breaks during sessions',
        'Learn energy management and circulation techniques',
        'Draw energy from external sources like nature'
      ]
    },
    'no-progress': {
      title: 'Lack of Visible Progress',
      icon: Eye,
      description: 'No obvious advancement after weeks/months of practice',
      causes: [
        'Development occurring at subtle levels not yet visible',
        'Non-linear progress with normal plateau periods',
        'Focusing only on object movement as progress measure',
        'Unrealistic expectations based on media portrayals'
      ],
      solutions: [
        'Track multiple progress measures beyond object movement',
        'Monitor concentration, visualization, and energy awareness',
        'Set realistic expectations based on other practitioners',
        'Understand plateaus as normal integration periods',
        'Trust that each session contributes to development'
      ]
    },
    'interference': {
      title: 'Environmental Interference & Skeptical Observers',
      icon: Shield,
      description: 'External factors disrupting practice or demonstrations',
      causes: [
        'Air currents, vibrations, electromagnetic fields',
        'Skeptical observers creating psychological pressure',
        'Negative expectations affecting energetic environment',
        'Uncontrolled environmental conditions'
      ],
      solutions: [
        'Practice in controlled, interference-free environments',
        'Use protective barriers like glass containers',
        'Choose supportive observers over committed skeptics',
        'Develop abilities privately before demonstrating',
        'Educate observers about subtle nature of effects'
      ]
    },
    'plateaus': {
      title: 'Plateau Periods & Apparent Regression',
      icon: TrendingDown,
      description: 'Abilities seem stalled or moving backward',
      causes: [
        'Normal integration periods consolidating skills',
        'Attempting to advance too quickly',
        'System processing and integrating new capabilities',
        'Taking on challenges beyond current development'
      ],
      solutions: [
        'Maintain consistent practice during plateaus',
        'Focus on refining previously learned skills',
        'Trust development continues at subtle levels',
        'Avoid forcing progress through increased effort',
        'Use plateau time for consolidation work'
      ]
    },
    'integration': {
      title: 'Integration with Daily Life',
      icon: Home,
      description: 'Difficulty balancing development with ordinary life',
      causes: [
        'Time requirements conflicting with other responsibilities',
        'Sense of disconnection from ordinary activities',
        'Social challenges sharing experiences with others',
        'Becoming too absorbed in development work'
      ],
      solutions: [
        'Establish realistic, sustainable practice schedules',
        'Create boundaries between practice and daily life',
        'Develop discernment about sharing experiences',
        'Maintain balance with other life priorities',
        'Stay grounded in practical responsibilities'
      ]
    }
  };

  const currentIssue = selectedIssue ? commonIssues[selectedIssue as keyof typeof commonIssues] : null;

  return (
    <div className="space-y-6">
      <Card className="bg-orange-900/20 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-200 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Troubleshooting Common Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-orange-300 mb-4">
            Every practitioner encounters obstacles. Understanding these challenges and their solutions helps maintain progress and motivation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(commonIssues).map(([key, issue]) => {
              const IconComponent = issue.icon;
              return (
                <Button
                  key={key}
                  onClick={() => setSelectedIssue(selectedIssue === key ? null : key)}
                  variant={selectedIssue === key ? "default" : "outline"}
                  className={`justify-start h-auto p-3 ${
                    selectedIssue === key 
                      ? 'bg-orange-600 hover:bg-orange-700' 
                      : 'border-orange-400/30 text-orange-200 hover:bg-orange-600/20'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-left">{issue.title}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {currentIssue && (
        <Card className="bg-orange-800/20 border-orange-600/30">
          <CardHeader>
            <CardTitle className="text-orange-200 flex items-center gap-2">
              <currentIssue.icon className="w-5 h-5" />
              {currentIssue.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-orange-300">{currentIssue.description}</p>
            
            <div>
              <h4 className="text-orange-200 font-semibold mb-2">Common Causes:</h4>
              <ul className="space-y-1">
                {currentIssue.causes.map((cause, index) => (
                  <li key={index} className="text-orange-300 text-sm flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    {cause}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-orange-200 font-semibold mb-2">Solutions & Strategies:</h4>
              <ul className="space-y-1">
                {currentIssue.solutions.map((solution, index) => (
                  <li key={index} className="text-orange-300 text-sm flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
