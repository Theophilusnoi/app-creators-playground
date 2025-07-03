import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flame, Moon, Sun, Star, Heart, Shield } from 'lucide-react';

interface Ritual {
  id: string;
  name: string;
  intention: string;
  moon_phase: string;
  elements: string[];
  duration: string;
  steps: string[];
  materials: string[];
  timing: string;
  created_at: Date;
}

interface RitualTemplate {
  name: string;
  category: string;
  intention: string;
  moon_phase: string;
  materials: string[];
  steps: string[];
  duration: string;
  timing: string;
}

export const RitualBuilder = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'templates' | 'my_rituals'>('templates');
  const [newRitual, setNewRitual] = useState<Partial<Ritual>>({
    name: '',
    intention: '',
    moon_phase: '',
    elements: [],
    materials: [],
    steps: [],
    duration: '',
    timing: ''
  });
  const [myRituals, setMyRituals] = useState<Ritual[]>([]);

  const ritualTemplates: RitualTemplate[] = [
    {
      name: '🌟 Divine Protection Ritual',
      category: 'Protection',
      intention: 'Create a powerful shield of divine light around yourself and your space',
      moon_phase: 'Any',
      materials: ['White candle', 'Sea salt', 'Frankincense incense', 'Clear quartz crystal'],
      steps: [
        'Cast a circle with sea salt around your sacred space',
        'Light the white candle in the center',
        'Light frankincense incense and let the smoke purify the space',
        'Hold the clear quartz and visualize white light emanating from it',
        'Chant: "Divine light surrounds me, protects me, guides me"',
        'See the light expanding to fill your entire space',
        'Thank the divine forces and close the circle'
      ],
      duration: '20 minutes',
      timing: 'Best performed at sunset or during Mercury hours'
    },
    {
      name: '🌙 New Moon Manifestation',
      category: 'Manifestation',
      intention: 'Plant seeds of intention and call forth your deepest desires',
      moon_phase: 'New Moon',
      materials: ['Black candle', 'Paper and pen', 'Bay leaves', 'Small bowl', 'Matches'],
      steps: [
        'Create sacred space by lighting the black candle',
        'Write your intentions on the paper with complete faith',
        'Write each intention on a separate bay leaf',
        'Hold each bay leaf and speak your intention aloud',
        'Safely burn the bay leaves in the bowl',
        'Bury the ashes in earth or keep on your altar',
        'Thank the Moon goddess for her support'
      ],
      duration: '30 minutes',
      timing: 'Within 24 hours of the New Moon'
    },
    {
      name: '🔥 Spiritual Marriage Breaking',
      category: 'Liberation',
      intention: 'Dissolve unwanted spiritual unions and reclaim your sovereignty',
      moon_phase: 'Waning Moon',
      materials: ['Red candle', 'Black tourmaline', 'Sage bundle', 'Scissors', 'Photo or symbol'],
      steps: [
        'Smudge yourself and space with sage',
        'Light the red candle and declare your intention',
        'Hold the black tourmaline for protection',
        'Visualize all unwanted spiritual cords and bonds',
        'Use scissors to symbolically cut these connections',
        'Declare: "I am free, I am sovereign, I choose my path"',
        'Bury or safely dispose of any symbolic materials',
        'Seal with gratitude and self-love affirmations'
      ],
      duration: '25 minutes',
      timing: 'During waning moon, preferably on Saturday (Saturn day)'
    },
    {
      name: '💖 Heart Chakra Healing Bath',
      category: 'Healing',
      intention: 'Open and heal the heart chakra, release emotional wounds',
      moon_phase: 'Full Moon',
      materials: ['Rose petals', 'Green candles', 'Rose quartz', 'Epsom salt', 'Rose essential oil'],
      steps: [
        'Run a warm bath and add Epsom salt and rose petals',
        'Light green candles around the bathroom',
        'Add 3 drops of rose essential oil to the water',
        'Hold rose quartz over your heart before entering',
        'Soak while visualizing green healing light in your heart',
        'Speak loving affirmations to yourself',
        'Thank your heart for all it has endured',
        'Keep the rose quartz with you for continued healing'
      ],
      duration: '45 minutes',
      timing: 'During Venus hours or on Friday evenings'
    },
    {
      name: '⚡ Spiritual Warfare Clearing',
      category: 'Clearing',
      intention: 'Remove negative entities, attachments, and spiritual attacks',
      moon_phase: 'Waning Moon',
      materials: ['White sage', 'Palo santo', 'Black salt', 'Holy water', 'Iron nail'],
      steps: [
        'Begin with intense sage smudging of entire space',
        'Sprinkle black salt in all corners and doorways',
        'Sprinkle holy water while commanding all negativity to leave',
        'Hold iron nail and declare: "All dark forces must flee"',
        'Burn palo santo to invite in divine protection',
        'Visualize walls of white light surrounding your space',
        'Seal with prayers to your guardian angels',
        'Maintain this protection with daily affirmations'
      ],
      duration: '40 minutes',
      timing: 'Best on Tuesday (Mars day) or during Mars hours'
    },
    {
      name: '🌟 Akashic Records Opening',
      category: 'Divination',
      intention: 'Access your soul\'s records and receive divine guidance',
      moon_phase: 'Full Moon',
      materials: ['Purple candle', 'Amethyst', 'Journal and pen', 'Meditation cushion', 'Sandalwood incense'],
      steps: [
        'Light sandalwood incense to raise vibration',
        'Light purple candle and hold amethyst',
        'Enter deep meditation focusing on your third eye',
        'Request permission to access your Akashic Records',
        'Ask your questions and receive information',
        'Write down all impressions in your journal',
        'Thank the Record Keepers and close the session',
        'Ground yourself with deep breathing'
      ],
      duration: '60 minutes',
      timing: 'During Jupiter hours or on Thursday'
    }
  ];

  const handleCreateRitual = () => {
    if (!newRitual.name || !newRitual.intention) return;

    const ritual: Ritual = {
      id: Date.now().toString(),
      name: newRitual.name || '',
      intention: newRitual.intention || '',
      moon_phase: newRitual.moon_phase || 'Any',
      elements: newRitual.elements || [],
      duration: newRitual.duration || '30 minutes',
      steps: newRitual.steps || [],
      materials: newRitual.materials || [],
      timing: newRitual.timing || 'Any time',
      created_at: new Date()
    };

    setMyRituals([...myRituals, ritual]);
    setNewRitual({});
    setActiveTab('my_rituals');
  };

  const saveTemplateAsRitual = (template: RitualTemplate) => {
    const ritual: Ritual = {
      id: Date.now().toString(),
      name: template.name,
      intention: template.intention,
      moon_phase: template.moon_phase,
      elements: [],
      duration: template.duration,
      steps: template.steps,
      materials: template.materials,
      timing: template.timing,
      created_at: new Date()
    };

    setMyRituals([...myRituals, ritual]);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Protection': return <Shield className="w-4 h-4" />;
      case 'Manifestation': return <Star className="w-4 h-4" />;
      case 'Liberation': return <Flame className="w-4 h-4" />;
      case 'Healing': return <Heart className="w-4 h-4" />;
      case 'Clearing': return <Sun className="w-4 h-4" />;
      case 'Divination': return <Moon className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Protection': return 'border-blue-400 text-blue-300 bg-blue-600/20';
      case 'Manifestation': return 'border-purple-400 text-purple-300 bg-purple-600/20';
      case 'Liberation': return 'border-red-400 text-red-300 bg-red-600/20';
      case 'Healing': return 'border-green-400 text-green-300 bg-green-600/20';
      case 'Clearing': return 'border-yellow-400 text-yellow-300 bg-yellow-600/20';
      case 'Divination': return 'border-indigo-400 text-indigo-300 bg-indigo-600/20';
      default: return 'border-gray-400 text-gray-300 bg-gray-600/20';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-center justify-center">
            <Flame className="w-6 h-6 text-purple-400" />
            🔮 Sacred Ritual Builder
            <Flame className="w-6 h-6 text-purple-400" />
          </CardTitle>
          <p className="text-purple-200 text-center">
            Create and customize powerful rituals aligned with lunar phases and cosmic timing
          </p>
        </CardHeader>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-black/30 p-2 rounded-lg">
        <Button
          variant={activeTab === 'templates' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('templates')}
          className="flex-1"
        >
          📜 Templates
        </Button>
        <Button
          variant={activeTab === 'create' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('create')}
          className="flex-1"
        >
          ✨ Create
        </Button>
        <Button
          variant={activeTab === 'my_rituals' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('my_rituals')}
          className="flex-1"
        >
          🗂️ My Rituals ({myRituals.length})
        </Button>
      </div>

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          {ritualTemplates.map((template, index) => (
            <Card key={index} className="bg-black/30 border-purple-500/30">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      {getCategoryIcon(template.category)}
                      {template.name}
                    </CardTitle>
                    <p className="text-purple-300 text-sm mt-1">{template.intention}</p>
                  </div>
                  <Badge className={`${getCategoryColor(template.category)}`}>
                    {template.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-purple-200 text-sm font-medium mb-2">🌙 Moon Phase:</h4>
                    <p className="text-purple-100 text-sm">{template.moon_phase}</p>
                  </div>
                  <div>
                    <h4 className="text-blue-200 text-sm font-medium mb-2">⏰ Duration:</h4>
                    <p className="text-blue-100 text-sm">{template.duration}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-green-200 text-sm font-medium mb-2">🧿 Materials Needed:</h4>
                  <div className="flex flex-wrap gap-1">
                    {template.materials.map((material, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs bg-green-600/20 text-green-200">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-200 text-sm font-medium mb-2">📝 Ritual Steps:</h4>
                  <div className="space-y-1">
                    {template.steps.slice(0, 3).map((step, idx) => (
                      <p key={idx} className="text-yellow-100 text-xs">
                        {idx + 1}. {step}
                      </p>
                    ))}
                    {template.steps.length > 3 && (
                      <p className="text-yellow-200 text-xs italic">
                        ...and {template.steps.length - 3} more steps
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => saveTemplateAsRitual(template)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Save to My Rituals
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Tab */}
      {activeTab === 'create' && (
        <Card className="bg-black/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white">Create Your Sacred Ritual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-purple-200 text-sm font-medium mb-2 block">Ritual Name</label>
                <Input
                  value={newRitual.name || ''}
                  onChange={(e) => setNewRitual({...newRitual, name: e.target.value})}
                  placeholder="Enter your ritual name"
                  className="bg-black/30 border-purple-500/50 text-white"
                />
              </div>
              <div>
                <label className="text-purple-200 text-sm font-medium mb-2 block">Moon Phase</label>
                <Select value={newRitual.moon_phase} onValueChange={(value) => setNewRitual({...newRitual, moon_phase: value})}>
                  <SelectTrigger className="bg-black/30 border-purple-500/50 text-white">
                    <SelectValue placeholder="Select moon phase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new_moon">New Moon</SelectItem>
                    <SelectItem value="waxing_crescent">Waxing Crescent</SelectItem>
                    <SelectItem value="first_quarter">First Quarter</SelectItem>
                    <SelectItem value="waxing_gibbous">Waxing Gibbous</SelectItem>
                    <SelectItem value="full_moon">Full Moon</SelectItem>
                    <SelectItem value="waning_gibbous">Waning Gibbous</SelectItem>
                    <SelectItem value="last_quarter">Last Quarter</SelectItem>
                    <SelectItem value="waning_crescent">Waning Crescent</SelectItem>
                    <SelectItem value="any">Any Phase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-purple-200 text-sm font-medium mb-2 block">Intention</label>
              <Textarea
                value={newRitual.intention || ''}
                onChange={(e) => setNewRitual({...newRitual, intention: e.target.value})}
                placeholder="What is the purpose of this ritual?"
                className="bg-black/30 border-purple-500/50 text-white"
                rows={3}
              />
            </div>

            <Button
              onClick={handleCreateRitual}
              disabled={!newRitual.name || !newRitual.intention}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Create Sacred Ritual
            </Button>
          </CardContent>
        </Card>
      )}

      {/* My Rituals Tab */}
      {activeTab === 'my_rituals' && (
        <div className="space-y-4">
          {myRituals.length === 0 ? (
            <Card className="bg-black/30 border-purple-500/30">
              <CardContent className="text-center py-8">
                <p className="text-purple-200">No rituals created yet. Start with a template or create your own!</p>
              </CardContent>
            </Card>
          ) : (
            myRituals.map((ritual) => (
              <Card key={ritual.id} className="bg-black/30 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{ritual.name}</CardTitle>
                  <p className="text-purple-300 text-sm">{ritual.intention}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs border-blue-400 text-blue-300">
                      {ritual.moon_phase}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-green-400 text-green-300">
                      {ritual.duration}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};