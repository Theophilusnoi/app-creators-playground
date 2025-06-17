import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Radio, Zap, Target, AlertTriangle } from 'lucide-react';

interface MorphogeneticField {
  id: string;
  field_type: string;
  current_resonance: number;
  tuning_frequency: number;
  harmonic_convergence: boolean;
  created_at: string;
}

export const MorphogeneticFieldTuning = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedFieldType, setSelectedFieldType] = useState('personal_healing');
  const [tuningFrequency, setTuningFrequency] = useState([528]);
  const [isTuning, setIsTuning] = useState(false);
  const [currentResonance, setCurrentResonance] = useState(0);
  const [fields, setFields] = useState<MorphogeneticField[]>([]);
  const [loading, setLoading] = useState(false);

  const fieldTypes = [
    { value: 'personal_healing', label: 'Personal Healing Field', color: 'text-green-400' },
    { value: 'abundance_manifestation', label: 'Abundance Manifestation', color: 'text-yellow-400' },
    { value: 'relationship_harmony', label: 'Relationship Harmony', color: 'text-pink-400' },
    { value: 'creativity_flow', label: 'Creativity Flow', color: 'text-purple-400' },
    { value: 'protection_shield', label: 'Protection Shield', color: 'text-blue-400' },
    { value: 'spiritual_awakening', label: 'Spiritual Awakening', color: 'text-indigo-400' }
  ];

  const sacredFrequencies = [
    { value: 396, label: '396 Hz - Liberation from Fear' },
    { value: 417, label: '417 Hz - Undoing Situations' },
    { value: 528, label: '528 Hz - Love Frequency' },
    { value: 639, label: '639 Hz - Harmonious Relationships' },
    { value: 741, label: '741 Hz - Awakening Intuition' },
    { value: 852, label: '852 Hz - Returning to Spirit' },
    { value: 963, label: '963 Hz - Divine Connection' }
  ];

  useEffect(() => {
    if (user) {
      fetchFields();
    }
  }, [user]);

  const fetchFields = async () => {
    try {
      const { data, error } = await supabase
        .from('morphogenetic_fields')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFields(data || []);
    } catch (error) {
      console.error('Error fetching fields:', error);
    }
  };

  const tuneField = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to tune morphogenetic fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setIsTuning(true);

    try {
      // Simulate field tuning process
      await new Promise(resolve => setTimeout(resolve, 3000));

      const resonance = Math.random() * 0.9 + 0.1;
      const harmonic = resonance > 0.85;
      
      const { error } = await supabase
        .from('morphogenetic_fields')
        .insert([{
          user_id: user.id,
          field_type: selectedFieldType,
          current_resonance: resonance,
          tuning_frequency: tuningFrequency[0],
          harmonic_convergence: harmonic,
          baseline_signature: {
            initial_frequency: tuningFrequency[0],
            timestamp: new Date().toISOString(),
            user_intention: selectedFieldType
          },
          calibration_data: {
            tuning_session: {
              frequency: tuningFrequency[0],
              duration: 3000,
              resonance_achieved: resonance,
              harmonic_state: harmonic
            }
          }
        }]);

      if (error) throw error;

      setCurrentResonance(resonance);
      
      if (harmonic) {
        toast({
          title: "Harmonic Convergence Achieved! ✨",
          description: `Your ${selectedFieldType.replace('_', ' ')} field is now in perfect resonance.`,
        });
      } else {
        toast({
          title: "Field Tuning Complete 🎵",
          description: `Morphogenetic field calibrated to ${tuningFrequency[0]} Hz`,
        });
      }

      await fetchFields();

    } catch (error) {
      console.error('Error tuning field:', error);
      
      // Still show local results
      const resonance = Math.random() * 0.9 + 0.1;
      setCurrentResonance(resonance);
      
      toast({
        title: "Field Resonance Established 🌊",
        description: "Local field tuning complete.",
      });
    } finally {
      setLoading(false);
      setIsTuning(false);
    }
  };

  const getResonanceColor = (resonance: number) => {
    if (resonance > 0.85) return 'text-green-400';
    if (resonance > 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getResonanceLabel = (resonance: number) => {
    if (resonance > 0.85) return 'Harmonic';
    if (resonance > 0.6) return 'Stable';
    return 'Unstable';
  };

  return (
    <div className="space-y-6">
      {/* Field Tuning Interface */}
      <Card className="bg-blue-900/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-blue-400" />
            Morphogenetic Field Tuning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-blue-200">Field Type</Label>
            <select
              value={selectedFieldType}
              onChange={(e) => setSelectedFieldType(e.target.value)}
              className="w-full p-3 rounded bg-black/30 border border-blue-500/30 text-white"
              disabled={isTuning}
            >
              {fieldTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-blue-200">Sacred Frequency: {tuningFrequency[0]} Hz</Label>
            <Slider
              value={tuningFrequency}
              onValueChange={setTuningFrequency}
              max={963}
              min={396}
              step={1}
              className="mt-2"
            />
            <div className="mt-2 text-sm text-blue-300">
              {sacredFrequencies.find(f => Math.abs(f.value - tuningFrequency[0]) < 50)?.label || 'Custom Frequency'}
            </div>
          </div>

          <Button
            onClick={tuneField}
            disabled={loading || isTuning}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isTuning ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                Calibrating Field Resonance...
              </>
            ) : (
              <>
                <Target className="w-4 h-4 mr-2" />
                {loading ? 'Connecting...' : 'Tune Morphogenetic Field'}
              </>
            )}
          </Button>

          {isTuning && (
            <div className="p-4 rounded-lg bg-blue-900/30 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-blue-200">Field calibration in progress...</span>
              </div>
              <p className="text-blue-300 text-sm">
                Synchronizing with {selectedFieldType.replace('_', ' ')} at {tuningFrequency[0]} Hz
              </p>
            </div>
          )}

          {currentResonance > 0 && (
            <div className="p-4 rounded-lg bg-gray-900/30 border border-gray-500/30">
              <div className="flex items-center justify-between">
                <span className="text-white">Current Resonance:</span>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${getResonanceColor(currentResonance)}`}>
                    {(currentResonance * 100).toFixed(1)}%
                  </span>
                  <Badge className={`${currentResonance > 0.85 ? 'bg-green-600' : currentResonance > 0.6 ? 'bg-yellow-600' : 'bg-red-600'} text-white`}>
                    {getResonanceLabel(currentResonance)}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Fields */}
      <Card className="bg-purple-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-purple-400" />
            Active Morphogenetic Fields
          </CardTitle>
        </CardHeader>
        <CardContent>
          {fields.length === 0 ? (
            <p className="text-center text-purple-200 py-4">
              No active fields. Tune your first morphogenetic field to begin!
            </p>
          ) : (
            <div className="space-y-3">
              {fields.slice(0, 5).map((field) => {
                const fieldType = fieldTypes.find(t => t.value === field.field_type);
                return (
                  <div key={field.id} className="p-4 rounded-lg bg-purple-900/30 border border-purple-500/20">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={`${fieldType?.color} border-current`} variant="outline">
                          {fieldType?.label}
                        </Badge>
                        {field.harmonic_convergence && (
                          <Badge className="bg-gold-600 text-white flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Harmonic
                          </Badge>
                        )}
                      </div>
                      <span className="text-purple-300 text-sm">
                        {field.tuning_frequency} Hz
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-purple-200 text-sm">Resonance:</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${getResonanceColor(field.current_resonance)}`}>
                          {(field.current_resonance * 100).toFixed(1)}%
                        </span>
                        {field.current_resonance < 0.6 && (
                          <AlertTriangle className="w-4 h-4 text-orange-400" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-purple-400 text-xs mt-2">
                      Tuned: {new Date(field.created_at).toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
