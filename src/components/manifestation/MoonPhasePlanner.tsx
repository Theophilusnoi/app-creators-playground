
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Moon, Calendar, Plus, CheckCircle, Circle, 
  Sparkles, Target, Heart, Trash2, Edit3
} from 'lucide-react';

interface MoonPhase {
  name: string;
  emoji: string;
  description: string;
  bestFor: string[];
  energy: string;
}

interface MoonAction {
  id: string;
  moon_phase: string;
  action_type: string;
  action_description: string;
  completion_status: string;
  scheduled_date: string;
  results_notes?: string;
}

const MOON_PHASES: Record<string, MoonPhase> = {
  new_moon: {
    name: 'New Moon',
    emoji: '🌑',
    description: 'New beginnings and setting intentions',
    bestFor: ['Setting new financial goals', 'Starting new income streams', 'Manifesting career changes'],
    energy: 'Fresh start, planting seeds'
  },
  waxing_crescent: {
    name: 'Waxing Crescent',
    emoji: '🌒',
    description: 'Taking initial action on your intentions',
    bestFor: ['Taking first steps', 'Building momentum', 'Networking for opportunities'],
    energy: 'Growth, momentum building'
  },
  first_quarter: {
    name: 'First Quarter',
    emoji: '🌓',
    description: 'Overcoming challenges and making decisions',
    bestFor: ['Making tough financial decisions', 'Overcoming money blocks', 'Taking calculated risks'],
    energy: 'Decision making, perseverance'
  },
  waxing_gibbous: {
    name: 'Waxing Gibbous',
    emoji: '🌔',
    description: 'Refining and adjusting your approach',
    bestFor: ['Refining business strategies', 'Adjusting investment portfolios', 'Improving skills'],
    energy: 'Refinement, fine-tuning'
  },
  full_moon: {
    name: 'Full Moon',
    emoji: '🌕',
    description: 'Peak manifestation and celebration',
    bestFor: ['Celebrating achievements', 'Charging crystals', 'Abundance rituals'],
    energy: 'Peak power, manifestation'
  },
  waning_gibbous: {
    name: 'Waning Gibbous',
    emoji: '🌖',
    description: 'Gratitude and sharing your abundance',
    bestFor: ['Expressing gratitude', 'Helping others', 'Sharing knowledge'],
    energy: 'Gratitude, sharing'
  },
  last_quarter: {
    name: 'Last Quarter',
    emoji: '🌗',
    description: 'Releasing what no longer serves',
    bestFor: ['Releasing debt', 'Breaking bad money habits', 'Forgiving financial mistakes'],
    energy: 'Release, forgiveness'
  },
  waning_crescent: {
    name: 'Waning Crescent',
    emoji: '🌘',
    description: 'Rest, reflection, and preparation',
    bestFor: ['Reflecting on progress', 'Planning next cycle', 'Rest and recharge'],
    energy: 'Reflection, preparation'
  }
};

const ACTION_TYPES = [
  'intention_setting',
  'manifestation',
  'release',
  'gratitude',
  'ritual',
  'meditation',
  'journaling'
];

// Simple moon phase calculation (approximation)
const getCurrentMoonPhase = (): string => {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const moonCycle = dayOfYear % 29.5; // Approximate lunar cycle
  
  if (moonCycle < 1) return 'new_moon';
  if (moonCycle < 7) return 'waxing_crescent';
  if (moonCycle < 8) return 'first_quarter';
  if (moonCycle < 14) return 'waxing_gibbous';
  if (moonCycle < 15) return 'full_moon';
  if (moonCycle < 21) return 'waning_gibbous';
  if (moonCycle < 22) return 'last_quarter';
  return 'waning_crescent';
};

export const MoonPhasePlanner: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState(getCurrentMoonPhase());
  const [actions, setActions] = useState<MoonAction[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [newAction, setNewAction] = useState({
    action_type: 'intention_setting',
    action_description: '',
    scheduled_date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [editingAction, setEditingAction] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    getCurrentUser();
    fetchMoonActions();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUser(user.id);
    }
  };

  const fetchMoonActions = async () => {
    try {
      const { data, error } = await supabase
        .from('moon_phase_actions')
        .select('*')
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      setActions(data || []);
    } catch (error) {
      console.error('Error fetching moon actions:', error);
    }
  };

  const addMoonAction = async () => {
    if (!newAction.action_description.trim() || !currentUser) {
      toast({
        title: "Please enter an action description",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('moon_phase_actions')
        .insert({
          moon_phase: currentPhase,
          action_type: newAction.action_type,
          action_description: newAction.action_description,
          scheduled_date: newAction.scheduled_date,
          user_id: currentUser
        });

      if (error) throw error;

      toast({
        title: "🌙 Moon Action Added!",
        description: "Your lunar-aligned action has been scheduled"
      });

      setNewAction({
        action_type: 'intention_setting',
        action_description: '',
        scheduled_date: new Date().toISOString().split('T')[0]
      });

      fetchMoonActions();
    } catch (error) {
      console.error('Error adding moon action:', error);
      toast({
        title: "Error",
        description: "Failed to add moon action",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const completeAction = async (actionId: string, resultsNotes?: string) => {
    try {
      const { error } = await supabase
        .from('moon_phase_actions')
        .update({ 
          completion_status: 'completed',
          completed_at: new Date().toISOString(),
          results_notes: resultsNotes || ''
        })
        .eq('id', actionId);

      if (error) throw error;

      toast({
        title: "✨ Action Completed!",
        description: "Great job aligning with lunar energy"
      });

      fetchMoonActions();
    } catch (error) {
      console.error('Error completing action:', error);
    }
  };

  const deleteAction = async (actionId: string) => {
    try {
      const { error } = await supabase
        .from('moon_phase_actions')
        .delete()
        .eq('id', actionId);

      if (error) throw error;
      fetchMoonActions();
    } catch (error) {
      console.error('Error deleting action:', error);
    }
  };

  const getUpcomingPhases = () => {
    const phases = Object.keys(MOON_PHASES);
    const currentIndex = phases.indexOf(currentPhase);
    const upcoming = [];
    
    for (let i = 1; i <= 3; i++) {
      const nextIndex = (currentIndex + i) % phases.length;
      upcoming.push(phases[nextIndex]);
    }
    
    return upcoming;
  };

  const getActionsByPhase = (phase: string) => {
    return actions.filter(action => action.moon_phase === phase);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600/20 text-green-200 border-green-500/30';
      case 'pending': return 'bg-yellow-600/20 text-yellow-200 border-yellow-500/30';
      default: return 'bg-gray-600/20 text-gray-200 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Moon Phase */}
      <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30">
        <CardHeader className="text-center">
          <CardTitle className="text-blue-200 flex items-center justify-center gap-2">
            <Moon className="w-6 h-6" />
            Current Moon Phase
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl mb-4">{MOON_PHASES[currentPhase].emoji}</div>
          <h3 className="text-2xl font-bold text-blue-100">{MOON_PHASES[currentPhase].name}</h3>
          <p className="text-blue-200">{MOON_PHASES[currentPhase].description}</p>
          <div className="bg-black/20 p-4 rounded-lg">
            <h4 className="text-blue-200 font-medium mb-2">Energy: {MOON_PHASES[currentPhase].energy}</h4>
            <div className="space-y-1">
              {MOON_PHASES[currentPhase].bestFor.map((activity, index) => (
                <div key={index} className="text-blue-300 text-sm">• {activity}</div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Action */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-200 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Schedule Moon-Aligned Action
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-purple-200 text-sm font-medium mb-2 block">
                Action Type
              </label>
              <select
                value={newAction.action_type}
                onChange={(e) => setNewAction({...newAction, action_type: e.target.value})}
                className="w-full bg-black/20 border border-purple-500/30 text-purple-100 rounded-md px-3 py-2"
              >
                {ACTION_TYPES.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-purple-200 text-sm font-medium mb-2 block">
                Scheduled Date
              </label>
              <Input
                type="date"
                value={newAction.scheduled_date}
                onChange={(e) => setNewAction({...newAction, scheduled_date: e.target.value})}
                className="bg-black/20 border-purple-500/30 text-purple-100"
              />
            </div>
          </div>
          
          <div>
            <label className="text-purple-200 text-sm font-medium mb-2 block">
              Action Description
            </label>
            <Textarea
              value={newAction.action_description}
              onChange={(e) => setNewAction({...newAction, action_description: e.target.value})}
              placeholder="Describe what you want to accomplish..."
              className="bg-black/20 border-purple-500/30 text-purple-100"
            />
          </div>

          <Button
            onClick={addMoonAction}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            {loading ? 'Adding...' : 'Add Moon Action'}
          </Button>
        </CardContent>
      </Card>

      {/* Upcoming Moon Phases */}
      <Card className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-200 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Moon Phases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getUpcomingPhases().map((phase, index) => (
              <div key={phase} className="bg-black/20 p-4 rounded border border-cyan-500/20 text-center">
                <div className="text-3xl mb-2">{MOON_PHASES[phase].emoji}</div>
                <h4 className="text-cyan-200 font-medium">{MOON_PHASES[phase].name}</h4>
                <p className="text-cyan-300 text-xs mt-1">{MOON_PHASES[phase].energy}</p>
                <div className="text-cyan-400 text-xs mt-2">
                  In {index + 1} phase{index > 0 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Moon Actions List */}
      <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-200 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Your Moon Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {actions.length === 0 ? (
            <p className="text-green-300 text-center py-8">No moon actions scheduled yet. Add your first action above!</p>
          ) : (
            <div className="space-y-4">
              {actions.map((action) => (
                <div key={action.id} className="bg-black/20 p-4 rounded border border-green-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{MOON_PHASES[action.moon_phase]?.emoji}</span>
                      <div>
                        <h4 className="text-green-200 font-medium">{action.action_description}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="border-green-500/30 text-green-300 text-xs">
                            {MOON_PHASES[action.moon_phase]?.name}
                          </Badge>
                          <Badge variant="outline" className="border-blue-500/30 text-blue-300 text-xs">
                            {action.action_type.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Badge className={`text-xs ${getStatusColor(action.completion_status)}`}>
                        {action.completion_status}
                      </Badge>
                      
                      {action.completion_status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => completeAction(action.id)}
                          className="bg-green-600/20 hover:bg-green-600/40 text-green-200"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteAction(action.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-green-300 text-sm">
                    Scheduled: {new Date(action.scheduled_date).toLocaleDateString()}
                  </div>
                  
                  {action.results_notes && (
                    <div className="mt-2 p-2 bg-black/30 rounded border border-green-500/10">
                      <span className="text-green-400 text-xs">Results: </span>
                      <span className="text-green-300 text-sm">{action.results_notes}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
