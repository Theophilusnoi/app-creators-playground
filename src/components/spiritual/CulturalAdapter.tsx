
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Cross, Lotus, Sun, Shield, Heart } from "lucide-react";

interface Archetype {
  id: string;
  name: string;
  description: string;
  tradition: string;
  icon: string;
  attributes: string[];
}

interface TraditionConfig {
  light_color: string;
  deity: string;
  symbol: string;
  prayer: string;
  color_scheme: string;
}

const TRADITION_CONFIGS: Record<string, TraditionConfig> = {
  christian: {
    light_color: 'white',
    deity: 'Holy Spirit',
    symbol: 'cross',
    prayer: 'Blood of Jesus protect me',
    color_scheme: 'from-blue-900 to-white'
  },
  buddhist: {
    light_color: 'golden',
    deity: 'White Tara',
    symbol: 'lotus',
    prayer: 'Om Tare Tuttare Ture Svaha',
    color_scheme: 'from-orange-900 to-yellow-500'
  },
  hindu: {
    light_color: 'saffron',
    deity: 'Hanuman',
    symbol: 'om',
    prayer: 'Jai Hanuman, remove all obstacles',
    color_scheme: 'from-red-900 to-orange-500'
  },
  indigenous: {
    light_color: 'earth tones',
    deity: 'Ancestor Spirits',
    symbol: 'sacred circle',
    prayer: 'Grandfathers, shield me with wisdom',
    color_scheme: 'from-green-900 to-amber-600'
  },
  secular: {
    light_color: 'silver',
    deity: 'Inner Light',
    symbol: 'shield',
    prayer: 'My resilience is unbreakable',
    color_scheme: 'from-gray-900 to-silver'
  },
  eclectic: {
    light_color: 'rainbow',
    deity: 'Universal Source',
    symbol: 'spiral',
    prayer: 'All healing energies surround me',
    color_scheme: 'from-purple-900 to-pink-500'
  }
};

const SAMPLE_ARCHETYPES: Archetype[] = [
  {
    id: '1',
    name: 'Archangel Michael',
    description: 'Divine warrior against darkness',
    tradition: 'christian',
    icon: 'cross',
    attributes: ['Protective', 'Powerful', 'Just']
  },
  {
    id: '2',
    name: 'White Tara',
    description: 'Embodiment of protective compassion',
    tradition: 'buddhist',
    icon: 'lotus',
    attributes: ['Compassionate', 'Wise', 'Healing']
  },
  {
    id: '3',
    name: 'Spiritual Firewall',
    description: 'Psychological boundary system',
    tradition: 'secular',
    icon: 'shield',
    attributes: ['Logical', 'Strong', 'Reliable']
  },
  {
    id: '4',
    name: 'Guardian Ancestors',
    description: 'Wisdom keepers and protectors',
    tradition: 'indigenous',
    icon: 'sun',
    attributes: ['Ancient', 'Wise', 'Connected']
  }
];

export const CulturalAdapter: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tradition, setTradition] = useState<string>('eclectic');
  const [selectedArchetype, setSelectedArchetype] = useState<string>('');
  const [availableArchetypes, setAvailableArchetypes] = useState<Archetype[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUserPreferences();
    filterArchetypes();
  }, [tradition]);

  const loadUserPreferences = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('soul_guide_conversations')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading preferences:', error);
        return;
      }

      // For now, we'll store preferences in localStorage until we add a proper table
      const savedTradition = localStorage.getItem(`tradition_${user.id}`);
      const savedArchetype = localStorage.getItem(`archetype_${user.id}`);
      
      if (savedTradition) setTradition(savedTradition);
      if (savedArchetype) setSelectedArchetype(savedArchetype);
    } catch (error) {
      console.error('Error loading user preferences:', error);
    }
  };

  const filterArchetypes = () => {
    const filtered = SAMPLE_ARCHETYPES.filter(
      arch => arch.tradition === tradition || tradition === 'eclectic'
    );
    setAvailableArchetypes(filtered);
  };

  const savePreferences = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Save to localStorage for now
      localStorage.setItem(`tradition_${user.id}`, tradition);
      localStorage.setItem(`archetype_${user.id}`, selectedArchetype);

      toast({
        title: "Preferences Saved",
        description: "Your spiritual language has been updated.",
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const adaptContent = (baseContent: string): string => {
    const config = TRADITION_CONFIGS[tradition] || TRADITION_CONFIGS.eclectic;
    const selectedArch = availableArchetypes.find(a => a.id === selectedArchetype);

    let adapted = baseContent
      .replace(/{light_color}/g, config.light_color)
      .replace(/{deity}/g, config.deity)
      .replace(/{symbol}/g, config.symbol)
      .replace(/{prayer}/g, config.prayer);

    if (selectedArch) {
      adapted = adapted
        .replace(/{protector}/g, selectedArch.name)
        .replace(/{attributes}/g, selectedArch.attributes.slice(0, 3).join(', '));
    }

    return adapted;
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'cross': return <Cross className="w-6 h-6" />;
      case 'lotus': return <Lotus className="w-6 h-6" />;
      case 'sun': return <Sun className="w-6 h-6" />;
      case 'shield': return <Shield className="w-6 h-6" />;
      default: return <Heart className="w-6 h-6" />;
    }
  };

  const currentConfig = TRADITION_CONFIGS[tradition] || TRADITION_CONFIGS.eclectic;

  return (
    <div className="space-y-6">
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-400" />
            My Spiritual Language
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-purple-200">
              Spiritual Tradition
            </label>
            <Select value={tradition} onValueChange={setTradition}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Select your tradition" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="christian">Christian</SelectItem>
                <SelectItem value="buddhist">Buddhist</SelectItem>
                <SelectItem value="hindu">Hindu</SelectItem>
                <SelectItem value="indigenous">Indigenous</SelectItem>
                <SelectItem value="secular">Secular/Scientific</SelectItem>
                <SelectItem value="eclectic">Eclectic/Universal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-purple-200">
              Primary Protector Archetype
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableArchetypes.map((archetype) => (
                <div
                  key={archetype.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedArchetype === archetype.id
                      ? 'border-purple-500 bg-purple-900/50'
                      : 'border-gray-600 bg-gray-800/50 hover:border-purple-400'
                  }`}
                  onClick={() => setSelectedArchetype(archetype.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-purple-400">
                      {getIconComponent(archetype.icon)}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{archetype.name}</h4>
                      <p className="text-gray-400 text-sm">{archetype.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {archetype.attributes.map((attr, i) => (
                          <span
                            key={i}
                            className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded"
                          >
                            {attr}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-purple-200">
              Protection Preview
            </label>
            <div className={`p-4 rounded-lg bg-gradient-to-r ${currentConfig.color_scheme} text-white`}>
              <p className="text-sm">
                {adaptContent(
                  "Visualize {light_color} light surrounding you. {deity} stands as your guardian. " +
                  "Feel the power of the {symbol} protecting you. Speak with me: '{prayer}'"
                )}
              </p>
            </div>
          </div>

          <Button
            onClick={savePreferences}
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? 'Saving...' : 'Save My Spiritual Language'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
