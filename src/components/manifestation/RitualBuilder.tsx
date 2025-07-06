
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Flame, Circle, Gem, Music, Clock, Plus, X, Save, 
  Play, Pause, RotateCcw, Star 
} from 'lucide-react';

interface RitualElement {
  id: string;
  type: 'candle' | 'crystal' | 'mantra' | 'sound' | 'visualization';
  name: string;
  duration?: number;
  instructions: string;
}

const RITUAL_ELEMENTS = {
  candle: [
    { name: 'Golden Candle', instructions: 'Light to attract abundance' },
    { name: 'Green Candle', instructions: 'Light for money manifestation' },
    { name: 'White Candle', instructions: 'Light for purification' }
  ],
  crystal: [
    { name: 'Citrine', instructions: 'Hold while visualizing wealth' },
    { name: 'Pyrite', instructions: 'Place on desk for business success' },
    { name: 'Green Aventurine', instructions: 'Carry for good luck' }
  ],
  mantra: [
    { name: 'Om Gam Ganapataye Namaha', instructions: 'Chant 108 times for obstacle removal' },
    { name: 'Om Shreem Mahalakshmiyei Namaha', instructions: 'Chant for wealth attraction' },
    { name: 'I Am Abundant', instructions: 'Repeat with conviction' }
  ],
  sound: [
    { name: '528 Hz Frequency', instructions: 'Play during visualization' },
    { name: 'Tibetan Singing Bowl', instructions: 'Ring to clear energy' },
    { name: 'Nature Sounds', instructions: 'Play for grounding' }
  ],
  visualization: [
    { name: 'Golden Light', instructions: 'Visualize golden light surrounding you' },
    { name: 'Money Rain', instructions: 'See money flowing down like rain' },
    { name: 'Successful Future', instructions: 'Visualize your wealthy future self' }
  ]
};

export const RitualBuilder: React.FC = () => {
  const [ritualTitle, setRitualTitle] = useState('');
  const [ritualDescription, setRitualDescription] = useState('');
  const [selectedElements, setSelectedElements] = useState<RitualElement[]>([]);
  const [duration, setDuration] = useState(30);
  const [frequency, setFrequency] = useState('once');
  const [loading, setLoading] = useState(false);
  const [rituals, setRituals] = useState<any[]>([]);
  const [activeRitual, setActiveRitual] = useState<any>(null);
  const [ritualTimer, setRitualTimer] = useState(0);
  const [isRitualActive, setIsRitualActive] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    getCurrentUser();
    fetchRituals();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRitualActive && ritualTimer > 0) {
      interval = setInterval(() => {
        setRitualTimer(time => {
          if (time <= 1) {
            setIsRitualActive(false);
            toast({
              title: "🎉 Ritual Complete!",
              description: "Your manifestation ritual has been completed successfully."
            });
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRitualActive, ritualTimer, toast]);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUser(user.id);
    }
  };

  const fetchRituals = async () => {
    try {
      const { data, error } = await supabase
        .from('manifestation_rituals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRituals(data || []);
    } catch (error) {
      console.error('Error fetching rituals:', error);
    }
  };

  const addElement = (type: keyof typeof RITUAL_ELEMENTS, element: any) => {
    const newElement: RitualElement = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      name: element.name,
      instructions: element.instructions,
      duration: type === 'mantra' ? 5 : undefined
    };
    setSelectedElements([...selectedElements, newElement]);
  };

  const removeElement = (id: string) => {
    setSelectedElements(selectedElements.filter(el => el.id !== id));
  };

  const saveRitual = async () => {
    if (!ritualTitle.trim() || !currentUser) {
      toast({
        title: "Error",
        description: "Please enter a ritual title and ensure you're logged in",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('manifestation_rituals')
        .insert({
          title: ritualTitle,
          description: ritualDescription,
          ritual_type: 'custom',
          elements: selectedElements as any,
          duration,
          frequency,
          user_id: currentUser,
          instructions: selectedElements.map(el => ({
            step: el.name,
            instruction: el.instructions,
            duration: el.duration
          })) as any
        });

      if (error) throw error;

      toast({
        title: "✨ Ritual Saved!",
        description: "Your manifestation ritual has been created successfully."
      });

      // Reset form
      setRitualTitle('');
      setRitualDescription('');
      setSelectedElements([]);
      setDuration(30);
      setFrequency('once');
      
      fetchRituals();
    } catch (error) {
      console.error('Error saving ritual:', error);
      toast({
        title: "Error",
        description: "Failed to save ritual. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const startRitual = (ritual: any) => {
    setActiveRitual(ritual);
    setRitualTimer(ritual.duration * 60); // Convert minutes to seconds
    setIsRitualActive(true);
    toast({
      title: "🕯️ Ritual Started",
      description: `Beginning ${ritual.title} - Duration: ${ritual.duration} minutes`
    });
  };

  const pauseRitual = () => {
    setIsRitualActive(!isRitualActive);
  };

  const resetRitual = () => {
    setIsRitualActive(false);
    setRitualTimer(activeRitual ? activeRitual.duration * 60 : 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getElementIcon = (type: string) => {
    switch (type) {
      case 'candle': return <Circle className="w-4 h-4" />;
      case 'crystal': return <Gem className="w-4 h-4" />;
      case 'mantra': return <Music className="w-4 h-4" />;
      case 'sound': return <Music className="w-4 h-4" />;
      case 'visualization': return <Star className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Ritual Timer */}
      {activeRitual && (
        <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-200 flex items-center gap-2">
              <Flame className="w-5 h-5" />
              Active Ritual: {activeRitual.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-300 mb-2">
                {formatTime(ritualTimer)}
              </div>
              <div className="flex justify-center gap-2">
                <Button 
                  onClick={pauseRitual}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/30"
                >
                  {isRitualActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button 
                  onClick={resetRitual}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/30"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ritual Builder */}
        <Card className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-orange-200 flex items-center gap-2">
              <Flame className="w-5 h-5" />
              Create New Ritual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-orange-200 text-sm font-medium mb-2 block">
                Ritual Title
              </label>
              <Input
                value={ritualTitle}
                onChange={(e) => setRitualTitle(e.target.value)}
                placeholder="e.g., Morning Abundance Ritual"
                className="bg-black/20 border-orange-500/30 text-orange-100"
              />
            </div>

            <div>
              <label className="text-orange-200 text-sm font-medium mb-2 block">
                Description
              </label>
              <Textarea
                value={ritualDescription}
                onChange={(e) => setRitualDescription(e.target.value)}
                placeholder="Describe your ritual's purpose..."
                className="bg-black/20 border-orange-500/30 text-orange-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-orange-200 text-sm font-medium mb-2 block">
                  Duration (minutes)
                </label>
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 30)}
                  className="bg-black/20 border-orange-500/30 text-orange-100"
                />
              </div>
              <div>
                <label className="text-orange-200 text-sm font-medium mb-2 block">
                  Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full bg-black/20 border border-orange-500/30 text-orange-100 rounded-md px-3 py-2"
                >
                  <option value="once">Once</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            {/* Selected Elements */}
            {selectedElements.length > 0 && (
              <div>
                <label className="text-orange-200 text-sm font-medium mb-2 block">
                  Selected Elements
                </label>
                <div className="space-y-2">
                  {selectedElements.map((element) => (
                    <div key={element.id} className="flex items-center justify-between bg-black/20 p-2 rounded border border-orange-500/20">
                      <div className="flex items-center gap-2">
                        {getElementIcon(element.type)}
                        <span className="text-orange-200 text-sm">{element.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeElement(element.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={saveRitual}
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Ritual'}
            </Button>
          </CardContent>
        </Card>

        {/* Element Library */}
        <Card className="bg-gradient-to-br from-amber-900/40 to-yellow-900/40 border-amber-500/30">
          <CardHeader>
            <CardTitle className="text-amber-200">Element Library</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(RITUAL_ELEMENTS).map(([type, elements]) => (
              <div key={type}>
                <h4 className="text-amber-200 font-medium mb-2 capitalize flex items-center gap-2">
                  {getElementIcon(type)}
                  {type}s
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {elements.map((element, index) => (
                    <div key={index} className="flex items-center justify-between bg-black/20 p-2 rounded border border-amber-500/20">
                      <div>
                        <div className="text-amber-200 text-sm font-medium">{element.name}</div>
                        <div className="text-amber-300 text-xs">{element.instructions}</div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => addElement(type as keyof typeof RITUAL_ELEMENTS, element)}
                        className="text-amber-400 hover:text-amber-300"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Saved Rituals */}
      <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-200 flex items-center gap-2">
            <Flame className="w-5 h-5" />
            Your Saved Rituals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {rituals.length === 0 ? (
            <p className="text-green-300 text-center py-8">No rituals created yet. Build your first ritual above!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rituals.map((ritual) => (
                <div key={ritual.id} className="bg-black/20 p-4 rounded border border-green-500/20">
                  <h4 className="text-green-200 font-medium mb-2">{ritual.title}</h4>
                  <p className="text-green-300 text-sm mb-3">{ritual.description}</p>
                  <div className="flex justify-between items-center text-xs text-green-400 mb-3">
                    <span>{ritual.duration} min</span>
                    <Badge variant="outline" className="border-green-500/30 text-green-300">
                      {ritual.frequency}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => startRitual(ritual)}
                    className="w-full bg-green-600/20 hover:bg-green-600/40 text-green-200 border border-green-500/30"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Ritual
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
