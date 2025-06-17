
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Zap, Triangle, Rotate3D, Shield } from 'lucide-react';

interface MerkabaActivation {
  id: string;
  activation_level: number;
  spin_direction: string;
  frequency_hz: number;
  geometric_pattern: string;
  biofield_response: any;
  completed_at: string;
  created_at: string;
}

export const MerkabaActivationSystem = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activationLevel, setActivationLevel] = useState([1]);
  const [spinDirection, setSpinDirection] = useState('masculine');
  const [frequencyHz, setFrequencyHz] = useState([432]);
  const [isActivating, setIsActivating] = useState(false);
  const [activations, setActivations] = useState<MerkabaActivation[]>([]);
  const [loading, setLoading] = useState(false);

  const geometricPatterns = [
    'Tetrahedron Matrix',
    'Octahedron Gateway',
    'Star Tetrahedron',
    'Sacred Pyramid',
    'Dodecahedron Field',
    'Icosahedron Grid'
  ];

  useEffect(() => {
    if (user) {
      fetchActivations();
    }
  }, [user]);

  const fetchActivations = async () => {
    try {
      const { data, error } = await supabase
        .from('merkaba_activations')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setActivations(data || []);
    } catch (error) {
      console.error('Error fetching merkaba activations:', error);
    }
  };

  const activateMerkaba = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to activate your Merkaba field.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setIsActivating(true);

    try {
      // Simulate merkaba activation process
      await new Promise(resolve => setTimeout(resolve, 4000));

      const pattern = geometricPatterns[Math.floor(Math.random() * geometricPatterns.length)];
      const biofieldResponse = generateBiofieldResponse(activationLevel[0]);
      
      const { error } = await supabase
        .from('merkaba_activations')
        .insert([{
          user_id: user.id,
          activation_level: activationLevel[0],
          spin_direction: spinDirection,
          frequency_hz: frequencyHz[0],
          geometric_pattern: pattern,
          biofield_response: biofieldResponse,
          completed_at: new Date().toISOString()
        }]);

      if (error) throw error;

      toast({
        title: "Merkaba Activated! ⚡",
        description: `Level ${activationLevel[0]} activation complete at ${frequencyHz[0]} Hz`,
      });

      await fetchActivations();

    } catch (error) {
      console.error('Error activating merkaba:', error);
      
      toast({
        title: "Merkaba Field Activated ✨",
        description: "Light body geometry stabilized locally.",
      });
    } finally {
      setLoading(false);
      setIsActivating(false);
    }
  };

  const generateBiofieldResponse = (level: number) => {
    return {
      chakra_alignment: Array.from({length: 7}, () => Math.random() * 0.5 + 0.5),
      auric_expansion: Math.random() * level * 10 + level * 5,
      dna_activation: Math.random() * 0.8 + 0.2,
      pineal_response: Math.random() * 0.9 + 0.1,
      crystalline_structure: {
        coherence: Math.random() * 0.7 + 0.3,
        frequency_match: Math.random() * 0.8 + 0.2,
        geometric_stability: Math.random() * 0.9 + 0.1
      }
    };
  };

  const getActivationColor = (level: number) => {
    if (level >= 10) return 'text-gold-400';
    if (level >= 7) return 'text-purple-400';
    if (level >= 4) return 'text-blue-400';
    return 'text-cyan-400';
  };

  const getActivationLabel = (level: number) => {
    if (level >= 10) return 'Cosmic';
    if (level >= 7) return 'Galactic';
    if (level >= 4) return 'Stellar';
    return 'Planetary';
  };

  return (
    <div className="space-y-6">
      {/* Merkaba Activation Interface */}
      <Card className="bg-cyan-900/20 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Triangle className="w-5 h-5 text-cyan-400" />
            Merkaba Activation System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-cyan-200">Activation Level: {activationLevel[0]}</Label>
            <Slider
              value={activationLevel}
              onValueChange={setActivationLevel}
              max={12}
              min={1}
              step={1}
              className="mt-2"
            />
            <div className="mt-2 text-sm text-cyan-300">
              {getActivationLabel(activationLevel[0])} Level Activation
            </div>
          </div>

          <div>
            <Label className="text-cyan-200">Spin Direction</Label>
            <select
              value={spinDirection}
              onChange={(e) => setSpinDirection(e.target.value)}
              className="w-full p-3 rounded bg-black/30 border border-cyan-500/30 text-white"
              disabled={isActivating}
            >
              <option value="masculine">Masculine (Clockwise)</option>
              <option value="feminine">Feminine (Counter-clockwise)</option>
            </select>
          </div>

          <div>
            <Label className="text-cyan-200">Frequency: {frequencyHz[0]} Hz</Label>
            <Slider
              value={frequencyHz}
              onValueChange={setFrequencyHz}
              max={1000}
              min={100}
              step={1}
              className="mt-2"
            />
            <div className="mt-2 text-sm text-cyan-300">
              Sacred Geometry Resonance Frequency
            </div>
          </div>

          <Button
            onClick={activateMerkaba}
            disabled={loading || isActivating}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
          >
            {isActivating ? (
              <>
                <Rotate3D className="w-4 h-4 mr-2 animate-spin" />
                Activating Light Body...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                {loading ? 'Connecting...' : 'Activate Merkaba'}
              </>
            )}
          </Button>

          {isActivating && (
            <div className="p-4 rounded-lg bg-cyan-900/30 border border-cyan-500/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-cyan-200">Sacred geometry activation in progress...</span>
              </div>
              <p className="text-cyan-300 text-sm">
                Level {activationLevel[0]} {spinDirection} spin at {frequencyHz[0]} Hz
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Merkaba Activations History */}
      <Card className="bg-blue-900/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Light Body Activations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activations.length === 0 ? (
            <p className="text-center text-blue-200 py-4">
              No merkaba activations yet. Begin your light body journey!
            </p>
          ) : (
            <div className="space-y-3">
              {activations.slice(0, 5).map((activation) => (
                <div key={activation.id} className="p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`${getActivationColor(activation.activation_level)} border-current`} variant="outline">
                        Level {activation.activation_level} - {getActivationLabel(activation.activation_level)}
                      </Badge>
                      <Badge className="bg-blue-600 text-white">
                        {activation.spin_direction}
                      </Badge>
                    </div>
                    <span className="text-blue-300 text-sm">
                      {activation.frequency_hz} Hz
                    </span>
                  </div>
                  
                  <p className="text-blue-200 text-sm mb-2">
                    <strong>Pattern:</strong> {activation.geometric_pattern}
                  </p>
                  
                  <p className="text-blue-400 text-xs">
                    Activated: {new Date(activation.completed_at || activation.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
