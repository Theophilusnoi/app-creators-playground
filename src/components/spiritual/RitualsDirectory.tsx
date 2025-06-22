
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { RitualSequencer } from './RitualSequencer';
import { 
  Sunrise, 
  ArrowRightLeft, 
  Moon, 
  Eye, 
  Pause, 
  Clock, 
  Target, 
  Users,
  Search,
  Filter,
  Star,
  CheckCircle2,
  Play
} from 'lucide-react';

interface Ritual {
  id: string;
  name: string;
  description: string;
  purpose: string;
  duration: string;
  frequency: string;
  category: string;
  tradition?: string;
  steps: string[];
  benefits: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const ritualCategories = [
  {
    id: 'morning',
    name: 'Morning Anchors',
    icon: Sunrise,
    color: 'from-yellow-600 to-orange-600',
    description: 'Set mindful tone for the day'
  },
  {
    id: 'transitional',
    name: 'Transitional',
    icon: ArrowRightLeft,
    color: 'from-blue-600 to-indigo-600',
    description: 'Shift energy between roles'
  },
  {
    id: 'lunar',
    name: 'Lunar Cycles',
    icon: Moon,
    color: 'from-purple-600 to-violet-600',
    description: 'Align with natural rhythms'
  },
  {
    id: 'shadow',
    name: 'Shadow Work',
    icon: Eye,
    color: 'from-gray-600 to-purple-600',
    description: 'Integrate unconscious patterns'
  },
  {
    id: 'sacred-pauses',
    name: 'Sacred Pauses',
    icon: Pause,
    color: 'from-green-600 to-teal-600',
    description: 'Re-center during chaos'
  }
];

const sampleRituals: Ritual[] = [
  {
    id: '1',
    name: 'Sunrise Gratitude Meditation',
    description: 'A gentle morning practice to welcome the day with appreciation',
    purpose: 'Set mindful tone for the day',
    duration: '10-15 minutes',
    frequency: 'Daily',
    category: 'morning',
    difficulty: 'Beginner' as const,
    steps: [
      'Find a comfortable position facing east',
      'Take 5 deep breaths to center yourself',
      'Reflect on 3 things you\'re grateful for',
      'Set an intention for the day',
      'Close with a moment of silence'
    ],
    benefits: [
      'Increased daily positivity',
      'Better emotional regulation',
      'Enhanced mindfulness throughout the day'
    ]
  },
  {
    id: '2',
    name: 'Intentional Tea Ceremony',
    description: 'Transform your morning beverage into a mindful ritual',
    purpose: 'Cultivate presence and intention',
    duration: '15-20 minutes',
    frequency: 'Daily',
    category: 'morning',
    difficulty: 'Beginner',
    steps: [
      'Choose your tea mindfully',
      'Heat water with full attention',
      'Pour water slowly and deliberately',
      'Hold the warm cup and breathe in the aroma',
      'Drink slowly, savoring each sip',
      'Reflect on the warmth spreading through your body'
    ],
    benefits: [
      'Enhanced mindfulness',
      'Reduced morning anxiety',
      'Improved focus for the day'
    ]
  },
  {
    id: '3',
    name: 'Work-to-Home Threshold Ritual',
    description: 'Create a clear energetic boundary between work and personal life',
    purpose: 'Shift energy between roles',
    duration: '5-10 minutes',
    frequency: 'Daily',
    category: 'transitional',
    difficulty: 'Beginner',
    steps: [
      'Before entering your home, pause at the threshold',
      'Take 3 deep breaths to release the workday',
      'Visualize leaving work stress outside',
      'Set an intention for your evening',
      'Step across the threshold mindfully'
    ],
    benefits: [
      'Better work-life balance',
      'Reduced stress carry-over',
      'More present with family'
    ]
  },
  {
    id: '4',
    name: 'Full Moon Release Writing',
    description: 'Release what no longer serves you under the full moon\'s energy',
    purpose: 'Align with natural rhythms and let go',
    duration: '30-45 minutes',
    frequency: 'Monthly',
    category: 'lunar',
    difficulty: 'Intermediate',
    steps: [
      'Gather paper, pen, and a safe burning vessel',
      'Sit under the moonlight or by a window',
      'Write down what you want to release',
      'Read each item aloud with intention',
      'Safely burn the paper (if possible) or bury it',
      'Thank the moon for its support'
    ],
    benefits: [
      'Emotional release and healing',
      'Connection to lunar cycles',
      'Clarity on life priorities'
    ]
  },
  {
    id: '5',
    name: 'Mirror Dialogue Practice',
    description: 'Have an honest conversation with your reflection',
    purpose: 'Integrate unconscious patterns',
    duration: '15-20 minutes',
    frequency: 'Weekly',
    category: 'shadow',
    difficulty: 'Advanced',
    steps: [
      'Stand or sit before a mirror in private',
      'Look into your own eyes for 1 minute',
      'Ask: "What do you need me to know?"',
      'Listen without judgment to what arises',
      'Write down any insights in a journal',
      'Thank yourself for the courage to look'
    ],
    benefits: [
      'Increased self-awareness',
      'Integration of shadow aspects',
      'Improved self-compassion'
    ]
  },
  {
    id: '6',
    name: '3-Minute Breath Altar',
    description: 'A quick centering practice for chaotic moments',
    purpose: 'Re-center during chaos',
    duration: '3 minutes',
    frequency: 'As needed',
    category: 'sacred-pauses',
    difficulty: 'Beginner',
    steps: [
      'Find any quiet space, even a bathroom',
      'Place your hands on your heart',
      'Breathe in for 4 counts',
      'Hold for 4 counts',
      'Breathe out for 6 counts',
      'Repeat for 3 minutes'
    ],
    benefits: [
      'Immediate stress relief',
      'Quick emotional regulation',
      'Return to centered state'
    ]
  }
];

// Sample ritual sequences for the sequencer
const ritualSequences = [
  {
    id: 'sunrise-gratitude',
    name: 'Sunrise Gratitude Meditation',
    description: 'Meet the day with open hands - A 7-minute morning anchor',
    totalDuration: 420000, // 7 minutes in milliseconds
    powerLevel: 8,
    steps: [
      {
        id: 'preparation',
        name: 'Sacred Container',
        description: 'Sit facing a window, palms up on knees. Dim artificial lights and silence devices.',
        duration: 60000, // 1 minute
        affirmation: 'I release expectations and welcome what arises',
        visualization: 'Feel the earth supporting you from below'
      },
      {
        id: 'grounding',
        name: 'Earth Connection',
        description: 'Feel your body supported by the earth. Let your breath flow naturally.',
        duration: 120000, // 2 minutes
        affirmation: 'Breathing in - I receive, breathing out - I give thanks',
        visualization: 'Imagine roots extending from your body deep into the earth'
      },
      {
        id: 'gratitude-reflection',
        name: 'Gratitude Blessing',
        description: 'Bring to mind three specific things you\'re grateful for today.',
        duration: 180000, // 3 minutes
        affirmation: 'My heart overflows with appreciation',
        visualization: 'See each blessing as a golden light filling your heart'
      },
      {
        id: 'intention-setting',
        name: 'Daily Intention',
        description: 'Set one quality you wish to embody throughout this day.',
        duration: 60000, // 1 minute
        affirmation: 'I carry this intention with love and courage',
        visualization: 'See yourself moving through the day with this quality'
      }
    ]
  },
  {
    id: 'full-moon-release',
    name: 'Full Moon Release Writing',
    description: 'Release what no longer serves under the moon\'s transformative energy',
    totalDuration: 1800000, // 30 minutes
    powerLevel: 9,
    steps: [
      {
        id: 'moon-connection',
        name: 'Lunar Attunement',
        description: 'Sit under moonlight or by a window. Feel the moon\'s presence.',
        duration: 300000, // 5 minutes
        affirmation: 'I align with the moon\'s wisdom and power',
        visualization: 'Silver moonlight flowing through your entire being'
      },
      {
        id: 'release-writing',
        name: 'Sacred Writing',
        description: 'Write down everything you\'re ready to release. Be honest and specific.',
        duration: 900000, // 15 minutes
        affirmation: 'I release with love and gratitude',
        visualization: 'Each word you write dissolves old patterns'
      },
      {
        id: 'ritual-burning',
        name: 'Transformative Release',
        description: 'Read each item aloud with intention, then safely burn or bury the paper.',
        duration: 300000, // 5 minutes
        affirmation: 'I transform limitation into liberation',
        visualization: 'Watch the smoke carry your releases to the cosmos'
      },
      {
        id: 'gratitude-seal',
        name: 'Moon Gratitude',
        description: 'Thank the moon for its support in your transformation.',
        duration: 300000, // 5 minutes
        affirmation: 'I am grateful for this sacred release',
        visualization: 'Feel the moon\'s blessing sealing your transformation'
      }
    ]
  }
];

export const RitualsDirectory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [completedRituals, setCompletedRituals] = useState<Set<string>>(new Set());
  const [showSequencer, setShowSequencer] = useState(false);

  const filteredRituals = sampleRituals.filter(ritual => {
    const matchesCategory = selectedCategory === 'all' || ritual.category === selectedCategory;
    const matchesSearch = ritual.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ritual.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleRitualComplete = (ritualId: string) => {
    const newCompleted = new Set(completedRituals);
    if (newCompleted.has(ritualId)) {
      newCompleted.delete(ritualId);
    } else {
      newCompleted.add(ritualId);
    }
    setCompletedRituals(newCompleted);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-600';
      case 'Intermediate': return 'bg-yellow-600';
      case 'Advanced': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const handleStartRitual = (ritualId: string) => {
    setShowSequencer(true);
  };

  const handleSequenceComplete = (sequenceId: string) => {
    console.log(`Completed ritual sequence: ${sequenceId}`);
    setCompletedRituals(prev => new Set([...prev, sequenceId]));
    setShowSequencer(false);
  };

  if (showSequencer) {
    return (
      <RitualSequencer 
        sequences={ritualSequences}
        onSequenceComplete={handleSequenceComplete}
        onClose={() => setShowSequencer(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white mb-2">
            🌟 Rituals Directory
          </CardTitle>
          <CardDescription className="text-purple-200 text-lg">
            A curated library of transformative practices for your spiritual journey
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Search and Filter */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
              <Input
                placeholder="Search rituals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-purple-900/20 border-purple-500/30 text-white crisp-text"
              />
            </div>
            <Button
              onClick={() => setSearchTerm('')}
              variant="outline"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 crisp-text"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-gray-900/90 border-2 border-gray-600 p-1 gap-1">
          <TabsTrigger 
            value="all"
            className="text-white font-bold text-xs lg:text-sm bg-gray-800 border border-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-shadow-sm px-2 py-3 min-h-[48px] flex items-center justify-center crisp-text"
          >
            All
          </TabsTrigger>
          {ritualCategories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger 
                key={category.id}
                value={category.id}
                className="text-white font-bold text-xs lg:text-sm bg-gray-800 border border-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-shadow-sm px-2 py-3 min-h-[48px] flex flex-col items-center justify-center crisp-text"
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="truncate text-xs">{category.name.split(' ')[0]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-6 mt-6">
          {/* Category Description */}
          {selectedCategory !== 'all' && (
            <Card className="bg-purple-900/20 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                {(() => {
                  const category = ritualCategories.find(cat => cat.id === selectedCategory);
                  if (!category) return null;
                  const Icon = category.icon;
                  return (
                    <div className="flex items-center gap-4">
                      <div className={`bg-gradient-to-r ${category.color} p-3 rounded-full flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-white crisp-text mb-1">{category.name}</h3>
                        <p className="text-purple-200 crisp-text">{category.description}</p>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* Rituals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRituals.map((ritual) => {
              const isCompleted = completedRituals.has(ritual.id);
              
              return (
                <Card key={ritual.id} className="bg-black/30 border-purple-500/30 backdrop-blur-sm h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg text-white font-bold crisp-text leading-tight">
                        {ritual.name}
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleRitualComplete(ritual.id)}
                        className={`flex-shrink-0 ${isCompleted ? 'text-green-400' : 'text-gray-400'} hover:text-green-300`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge className={`${getDifficultyColor(ritual.difficulty)} text-white text-xs crisp-text`}>
                        {ritual.difficulty}
                      </Badge>
                      <Badge className="bg-blue-600 text-white text-xs crisp-text">
                        <Clock className="w-3 h-3 mr-1" />
                        {ritual.duration}
                      </Badge>
                      <Badge className="bg-indigo-600 text-white text-xs crisp-text">
                        {ritual.frequency}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-purple-200 text-sm mb-4 crisp-text">{ritual.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-purple-300 mb-2 crisp-text">Purpose:</h4>
                      <p className="text-purple-100 text-sm crisp-text">{ritual.purpose}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-purple-300 mb-2 crisp-text">Steps:</h4>
                      <ol className="space-y-1">
                        {ritual.steps.map((step, index) => (
                          <li key={index} className="text-purple-100 text-sm flex items-start gap-2 crisp-text">
                            <span className="text-purple-400 font-bold flex-shrink-0 min-w-[16px]">{index + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="mt-auto">
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white crisp-text"
                        size="sm"
                        onClick={() => handleStartRitual(ritual.id)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Ritual
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredRituals.length === 0 && (
            <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="text-center py-12">
                <Target className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2 crisp-text">No rituals found</h3>
                <p className="text-purple-300 crisp-text">
                  Try adjusting your search or explore different categories.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
