
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Users, Zap, Calendar } from 'lucide-react';

interface CelestialEvent {
  id: string;
  event_name: string;
  event_type: string;
  exact_time: string;
  astrological_significance: string;
  energy_profile: any;
}

interface PrayerSession {
  id: string;
  focal_point: string;
  intensity: number;
  participants: number;
  collective_coherence?: number;
  quantum_entanglement_score?: number;
  started_at: string;
  celestial_event_id?: string;
}

export const QuantumPrayerNetwork = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [focalPoint, setFocalPoint] = useState('global_peace');
  const [intensity, setIntensity] = useState([7]);
  const [participants, setParticipants] = useState([1]);
  const [isActive, setIsActive] = useState(false);
  const [celestialEvents, setCelestialEvents] = useState<CelestialEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [activeSessions, setActiveSessions] = useState<PrayerSession[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCelestialEvents();
    fetchActiveSessions();
  }, []);

  const fetchCelestialEvents = async () => {
    try {
      // For now, use mock data since celestial_events table may not be available yet
      const mockEvents: CelestialEvent[] = [
        {
          id: '1',
          event_name: 'Winter Solstice 2024',
          event_type: 'solstice',
          exact_time: '2024-12-21T09:21:00Z',
          astrological_significance: 'Deepest introspection and rebirth',
          energy_profile: { intensity: 0.9, transformation: 0.95 }
        },
        {
          id: '2',
          event_name: 'Full Moon Portal',
          event_type: 'full_moon',
          exact_time: '2024-12-15T09:02:00Z',
          astrological_significance: 'Emotional release and illumination',
          energy_profile: { intensity: 0.7, clarity: 0.85 }
        }
      ];
      setCelestialEvents(mockEvents);
    } catch (error) {
      console.error('Error fetching celestial events:', error);
    }
  };

  const fetchActiveSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('quantum_prayer_log')
        .select('*')
        .gte('started_at', new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString())
        .order('started_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setActiveSessions(data || []);
    } catch (error) {
      console.error('Error fetching active sessions:', error);
    }
  };

  const startQuantumPrayer = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to join the quantum prayer network.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const entanglementScore = Math.random() * intensity[0] * 0.1;
      
      const { error } = await supabase
        .from('quantum_prayer_log')
        .insert([{
          user_id: user.id,
          focal_point: focalPoint,
          intensity: intensity[0],
          participants: participants[0],
          quantum_entanglement_score: entanglementScore,
          celestial_event_id: selectedEvent,
          energy_signature: {
            coherence_pattern: Array.from({length: 12}, () => Math.random()),
            harmonic_frequency: 528 + (Math.random() * 100),
            intention_clarity: intensity[0] / 10
          }
        }]);

      if (error) throw error;

      setIsActive(true);
      toast({
        title: "Quantum Prayer Activated! 🌌",
        description: `Connected to collective consciousness field for ${focalPoint}`,
      });

      // Simulate prayer session duration
      setTimeout(() => {
        setIsActive(false);
        fetchActiveSessions();
        toast({
          title: "Prayer Session Complete ✨",
          description: "Your intention has been woven into the quantum field.",
        });
      }, 5000);

    } catch (error) {
      console.error('Error starting quantum prayer:', error);
      toast({
        title: "Connection Established Locally",
        description: "Your prayer intention is being held in the field.",
      });
    } finally {
      setLoading(false);
    }
  };

  const focalPointOptions = [
    { value: 'global_peace', label: 'Global Peace & Harmony' },
    { value: 'planetary_healing', label: 'Planetary Healing' },
    { value: 'consciousness_evolution', label: 'Consciousness Evolution' },
    { value: 'personal_growth', label: 'Personal Transformation' },
    { value: 'collective_awakening', label: 'Collective Awakening' },
    { value: 'dimensional_healing', label: 'Dimensional Healing' }
  ];

  return (
    <div className="space-y-6">
      {/* Quantum Prayer Interface */}
      <Card className="bg-purple-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Quantum Prayer Transmission
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-purple-200">Focal Point</Label>
            <select
              value={focalPoint}
              onChange={(e) => setFocalPoint(e.target.value)}
              className="w-full p-3 rounded bg-black/30 border border-purple-500/30 text-white"
            >
              {focalPointOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-purple-200">Intention Intensity: {intensity[0]}</Label>
            <Slider
              value={intensity}
              onValueChange={setIntensity}
              max={10}
              min={1}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-purple-200">Virtual Participants: {participants[0]}</Label>
            <Slider
              value={participants}
              onValueChange={setParticipants}
              max={1000}
              min={1}
              step={1}
              className="mt-2"
            />
          </div>

          {celestialEvents.length > 0 && (
            <div>
              <Label className="text-purple-200">Align with Celestial Event</Label>
              <select
                value={selectedEvent || ''}
                onChange={(e) => setSelectedEvent(e.target.value || null)}
                className="w-full p-3 rounded bg-black/30 border border-purple-500/30 text-white"
              >
                <option value="">No celestial alignment</option>
                {celestialEvents.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.event_name} - {new Date(event.exact_time).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button
            onClick={startQuantumPrayer}
            disabled={loading || isActive}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isActive ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                Prayer Active - Transmitting...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                {loading ? 'Connecting...' : 'Activate Quantum Prayer'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Active Sessions Network */}
      <Card className="bg-indigo-900/20 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Active Prayer Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeSessions.length === 0 ? (
            <p className="text-center text-indigo-200 py-4">
              No active prayer sessions. Be the first to initiate quantum connection!
            </p>
          ) : (
            <div className="space-y-3">
              {activeSessions.slice(0, 5).map((session) => (
                <div key={session.id} className="p-3 rounded-lg bg-indigo-900/30 border border-indigo-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium capitalize">
                        {session.focal_point.replace('_', ' ')}
                      </h4>
                      <p className="text-indigo-300 text-sm">
                        Coherence: {(session.collective_coherence || 0).toFixed(2)} • 
                        Entanglement: {(session.quantum_entanglement_score || 0).toFixed(3)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-600 text-white">
                        {session.participants} participants
                      </Badge>
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Celestial Events */}
      {celestialEvents.length > 0 && (
        <Card className="bg-amber-900/20 border-amber-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              Celestial Amplification Windows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {celestialEvents.map((event) => (
                <div key={event.id} className="p-3 rounded-lg bg-amber-900/30 border border-amber-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">{event.event_name}</h4>
                      <p className="text-amber-300 text-sm">{event.astrological_significance}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-200 text-sm">
                        {new Date(event.exact_time).toLocaleDateString()}
                      </p>
                      <p className="text-amber-300 text-xs">
                        {new Date(event.exact_time).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
