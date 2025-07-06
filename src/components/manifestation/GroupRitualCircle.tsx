
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, Plus, Calendar, Clock, MapPin, 
  UserPlus, UserMinus, Play, Crown, Star
} from 'lucide-react';

interface GroupRitual {
  id: string;
  title: string;
  description: string;
  ritual_type: string;
  scheduled_datetime: string;
  duration: number;
  max_participants: number;
  current_participants: number;
  shared_intention: string;
  status: string;
  creator_id: string;
  created_at: string;
}

interface Participant {
  id: string;
  user_id: string;
  participation_status: string;
  energy_rating?: number;
  contribution_notes?: string;
}

const RITUAL_TYPES = [
  { id: 'abundance', name: 'Abundance Manifestation', emoji: '💰', color: 'from-yellow-600 to-amber-600' },
  { id: 'prosperity', name: 'Prosperity Circle', emoji: '🌟', color: 'from-green-600 to-emerald-600' },
  { id: 'full_moon', name: 'Full Moon Ritual', emoji: '🌕', color: 'from-blue-600 to-purple-600' },
  { id: 'new_moon', name: 'New Moon Intentions', emoji: '🌑', color: 'from-indigo-600 to-purple-600' },
  { id: 'healing', name: 'Financial Healing', emoji: '💚', color: 'from-pink-600 to-rose-600' },
  { id: 'gratitude', name: 'Gratitude Circle', emoji: '🙏', color: 'from-orange-600 to-red-600' }
];

export const GroupRitualCircle: React.FC = () => {
  const [groupRituals, setGroupRituals] = useState<GroupRitual[]>([]);
  const [myRituals, setMyRituals] = useState<GroupRitual[]>([]);
  const [participants, setParticipants] = useState<{ [key: string]: Participant[] }>({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [newRitual, setNewRitual] = useState({
    title: '',
    description: '',
    ritual_type: 'abundance',
    scheduled_datetime: '',
    duration: 60,
    max_participants: 20,
    shared_intention: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    getCurrentUser();
    fetchGroupRituals();
    fetchMyRituals();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUser(user.id);
    }
  };

  const fetchGroupRituals = async () => {
    try {
      const { data, error } = await supabase
        .from('group_rituals')
        .select('*')
        .eq('status', 'scheduled')
        .gte('scheduled_datetime', new Date().toISOString())
        .order('scheduled_datetime', { ascending: true });

      if (error) throw error;
      setGroupRituals(data || []);

      // Fetch participants for each ritual
      if (data) {
        const participantsData: { [key: string]: Participant[] } = {};
        for (const ritual of data) {
          const { data: parts } = await supabase
            .from('group_ritual_participants')
            .select('*')
            .eq('ritual_id', ritual.id);
          participantsData[ritual.id] = parts || [];
        }
        setParticipants(participantsData);
      }
    } catch (error) {
      console.error('Error fetching group rituals:', error);
    }
  };

  const fetchMyRituals = async () => {
    try {
      if (!currentUser) return;

      const { data, error } = await supabase
        .from('group_rituals')
        .select('*')
        .eq('creator_id', currentUser)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMyRituals(data || []);
    } catch (error) {
      console.error('Error fetching my rituals:', error);
    }
  };

  const createRitual = async () => {
    if (!newRitual.title.trim() || !newRitual.scheduled_datetime || !currentUser) {
      toast({
        title: "Missing Information",
        description: "Please fill in the title and schedule date/time",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('group_rituals')
        .insert({
          title: newRitual.title,
          description: newRitual.description,
          ritual_type: newRitual.ritual_type,
          scheduled_datetime: newRitual.scheduled_datetime,
          duration: newRitual.duration,
          max_participants: newRitual.max_participants,
          shared_intention: newRitual.shared_intention,
          creator_id: currentUser
        });

      if (error) throw error;

      toast({
        title: "🎉 Ritual Created!",
        description: "Your group ritual has been scheduled"
      });

      setNewRitual({
        title: '',
        description: '',
        ritual_type: 'abundance',
        scheduled_datetime: '',
        duration: 60,
        max_participants: 20,
        shared_intention: ''
      });
      setShowCreateForm(false);
      
      fetchGroupRituals();
      fetchMyRituals();
    } catch (error) {
      console.error('Error creating ritual:', error);
      toast({
        title: "Error",
        description: "Failed to create ritual",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const joinRitual = async (ritualId: string) => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to join rituals",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('group_ritual_participants')
        .insert({
          ritual_id: ritualId,
          user_id: currentUser,
          participation_status: 'joined'
        });

      if (error) throw error;

      toast({
        title: "✨ Joined Ritual!",
        description: "You're now part of this sacred circle"
      });

      fetchGroupRituals();
    } catch (error) {
      console.error('Error joining ritual:', error);
      toast({
        title: "Error",
        description: "Failed to join ritual",
        variant: "destructive"
      });
    }
  };

  const leaveRitual = async (ritualId: string) => {
    if (!currentUser) return;

    try {
      const { error } = await supabase
        .from('group_ritual_participants')
        .delete()
        .eq('ritual_id', ritualId)
        .eq('user_id', currentUser);

      if (error) throw error;

      toast({
        title: "Left Ritual",
        description: "You've left the ritual circle"
      });

      fetchGroupRituals();
    } catch (error) {
      console.error('Error leaving ritual:', error);
    }
  };

  const isUserParticipant = (ritualId: string): boolean => {
    if (!currentUser) return false;
    const ritualParticipants = participants[ritualId] || [];
    return ritualParticipants.some(p => p.user_id === currentUser);
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  const getRitualTypeInfo = (type: string) => {
    return RITUAL_TYPES.find(t => t.id === type) || RITUAL_TYPES[0];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-600/20 text-blue-200 border-blue-500/30';
      case 'active': return 'bg-green-600/20 text-green-200 border-green-500/30';
      case 'completed': return 'bg-purple-600/20 text-purple-200 border-purple-500/30';
      default: return 'bg-gray-600/20 text-gray-200 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Ritual Button */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-purple-200 font-medium">Ready to lead a group ritual?</h3>
              <p className="text-purple-300 text-sm">Create a sacred circle for collective manifestation</p>
            </div>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Ritual
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Ritual Form */}
      {showCreateForm && (
        <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-200 flex items-center gap-2">
              <Crown className="w-5 h-5" />
              Create Group Ritual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-indigo-200 text-sm font-medium mb-2 block">
                  Ritual Title
                </label>
                <Input
                  value={newRitual.title}
                  onChange={(e) => setNewRitual({...newRitual, title: e.target.value})}
                  placeholder="Abundance Full Moon Circle"
                  className="bg-black/20 border-indigo-500/30 text-indigo-100"
                />
              </div>

              <div>
                <label className="text-indigo-200 text-sm font-medium mb-2 block">
                  Ritual Type
                </label>
                <select
                  value={newRitual.ritual_type}
                  onChange={(e) => setNewRitual({...newRitual, ritual_type: e.target.value})}
                  className="w-full bg-black/20 border border-indigo-500/30 text-indigo-100 rounded-md px-3 py-2"
                >
                  {RITUAL_TYPES.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.emoji} {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-indigo-200 text-sm font-medium mb-2 block">
                Description
              </label>
              <Textarea
                value={newRitual.description}
                onChange={(e) => setNewRitual({...newRitual, description: e.target.value})}
                placeholder="Describe the ritual purpose and what participants can expect..."
                className="bg-black/20 border-indigo-500/30 text-indigo-100"
              />
            </div>

            <div>
              <label className="text-indigo-200 text-sm font-medium mb-2 block">
                Shared Intention
              </label>
              <Input
                value={newRitual.shared_intention}
                onChange={(e) => setNewRitual({...newRitual, shared_intention: e.target.value})}
                placeholder="We manifest abundant wealth for all participants"
                className="bg-black/20 border-indigo-500/30 text-indigo-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-indigo-200 text-sm font-medium mb-2 block">
                  Date & Time
                </label>
                <Input
                  type="datetime-local"
                  value={newRitual.scheduled_datetime}
                  onChange={(e) => setNewRitual({...newRitual, scheduled_datetime: e.target.value})}
                  className="bg-black/20 border-indigo-500/30 text-indigo-100"
                />
              </div>

              <div>
                <label className="text-indigo-200 text-sm font-medium mb-2 block">
                  Duration (minutes)
                </label>
                <Input
                  type="number"
                  value={newRitual.duration}
                  onChange={(e) => setNewRitual({...newRitual, duration: parseInt(e.target.value) || 60})}
                  className="bg-black/20 border-indigo-500/30 text-indigo-100"
                />
              </div>

              <div>
                <label className="text-indigo-200 text-sm font-medium mb-2 block">
                  Max Participants
                </label>
                <Input
                  type="number"
                  value={newRitual.max_participants}
                  onChange={(e) => setNewRitual({...newRitual, max_participants: parseInt(e.target.value) || 20})}
                  className="bg-black/20 border-indigo-500/30 text-indigo-100"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={createRitual}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Crown className="w-4 h-4 mr-2" />
                {loading ? 'Creating...' : 'Create Ritual'}
              </Button>
              <Button
                onClick={() => setShowCreateForm(false)}
                variant="outline"
                className="border-indigo-500/30 text-indigo-200"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Group Rituals */}
      <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-200 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Available Group Rituals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {groupRituals.length === 0 ? (
            <p className="text-blue-300 text-center py-8">No group rituals scheduled. Create the first one!</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {groupRituals.map((ritual) => {
                const typeInfo = getRitualTypeInfo(ritual.ritual_type);
                const isParticipant = isUserParticipant(ritual.id);
                
                return (
                  <div key={ritual.id} className="bg-black/20 p-4 rounded border border-blue-500/20">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-blue-200 font-medium mb-1">{ritual.title}</h4>
                        <div className="flex gap-2 mb-2">
                          <Badge className={`bg-gradient-to-r ${typeInfo.color} text-white text-xs`}>
                            {typeInfo.emoji} {typeInfo.name}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(ritual.status)}`}>
                            {ritual.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-blue-300 text-sm mb-3">{ritual.description}</p>

                    {ritual.shared_intention && (
                      <div className="bg-blue-900/20 p-2 rounded mb-3">
                        <span className="text-blue-400 text-xs font-medium">Shared Intention: </span>
                        <span className="text-blue-200 text-sm italic">"{ritual.shared_intention}"</span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 text-xs text-blue-300 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDateTime(ritual.scheduled_datetime)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ritual.duration} minutes
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {ritual.current_participants}/{ritual.max_participants} joined
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Energy: High
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {isParticipant ? (
                        <Button
                          onClick={() => leaveRitual(ritual.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-500/30 text-red-200 hover:bg-red-600/20"
                        >
                          <UserMinus className="w-3 h-3 mr-1" />
                          Leave
                        </Button>
                      ) : (
                        <Button
                          onClick={() => joinRitual(ritual.id)}
                          size="sm"
                          disabled={ritual.current_participants >= ritual.max_participants}
                          className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-200 border border-blue-500/30"
                        >
                          <UserPlus className="w-3 h-3 mr-1" />
                          Join Circle
                        </Button>
                      )}
                      
                      {ritual.status === 'active' && (
                        <Button
                          size="sm"
                          className="bg-green-600/20 hover:bg-green-600/40 text-green-200 border border-green-500/30"
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Enter Ritual
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* My Created Rituals */}
      {myRituals.length > 0 && (
        <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-200 flex items-center gap-2">
              <Crown className="w-5 h-5" />
              My Created Rituals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myRituals.map((ritual) => {
                const typeInfo = getRitualTypeInfo(ritual.ritual_type);
                
                return (
                  <div key={ritual.id} className="bg-black/20 p-4 rounded border border-green-500/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-green-200 font-medium mb-1">{ritual.title}</h4>
                        <div className="flex gap-2 mb-2">
                          <Badge className={`bg-gradient-to-r ${typeInfo.color} text-white text-xs`}>
                            {typeInfo.emoji} {typeInfo.name}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(ritual.status)}`}>
                            {ritual.status}
                          </Badge>
                        </div>
                        <div className="text-green-300 text-sm">
                          {ritual.current_participants}/{ritual.max_participants} participants • {formatDateTime(ritual.scheduled_datetime)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
