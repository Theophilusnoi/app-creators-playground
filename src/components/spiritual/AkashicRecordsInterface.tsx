import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { ScrollText, Eye, Key, Clock } from 'lucide-react';

interface AkashicRecord {
  id: string;
  soul_signature: string;
  lifetime_focus: string;
  records_retrieved: any;
  karmic_insights: string;
  access_level: number;
  created_at: string;
  expires_at: string;
}

export const AkashicRecordsInterface = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [soulSignature, setSoulSignature] = useState('');
  const [lifetimeFocus, setLifetimeFocus] = useState('current_incarnation');
  const [isAccessing, setIsAccessing] = useState(false);
  const [records, setRecords] = useState<AkashicRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const lifetimeFocuses = [
    { value: 'current_incarnation', label: 'Current Incarnation' },
    { value: 'past_life_ancient_egypt', label: 'Ancient Egypt Past Life' },
    { value: 'past_life_atlantis', label: 'Atlantis Past Life' },
    { value: 'past_life_lemuria', label: 'Lemuria Past Life' },
    { value: 'soul_group_origins', label: 'Soul Group Origins' },
    { value: 'karmic_patterns', label: 'Karmic Patterns' },
    { value: 'soul_contracts', label: 'Soul Contracts' },
    { value: 'spiritual_missions', label: 'Spiritual Missions' }
  ];

  useEffect(() => {
    if (user) {
      fetchRecords();
    }
  }, [user]);

  const fetchRecords = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('akashic_access')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching akashic records:', error);
        return;
      }
      
      // Type assertion with proper error handling
      const typedRecords = (data || []).map(record => ({
        id: record.id,
        soul_signature: record.soul_signature,
        lifetime_focus: record.lifetime_focus,
        records_retrieved: record.records_retrieved,
        karmic_insights: record.karmic_insights || '',
        access_level: record.access_level,
        created_at: record.created_at,
        expires_at: record.expires_at || ''
      })) as AkashicRecord[];
      
      setRecords(typedRecords);
    } catch (error) {
      console.error('Error fetching akashic records:', error);
    }
  };

  const generateSoulSignature = () => {
    const signatures = [
      'SOL-777-ARC',
      'LUM-333-VIB',
      'GAL-888-PHI',
      'COS-555-OME',
      'STE-999-RAY'
    ];
    setSoulSignature(signatures[Math.floor(Math.random() * signatures.length)] + '-' + Date.now().toString(36).toUpperCase());
  };

  const accessAkashicRecords = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the Akashic Records.",
        variant: "destructive"
      });
      return;
    }

    if (!soulSignature.trim()) {
      toast({
        title: "Soul Signature Required",
        description: "Please generate or enter your soul signature.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setIsAccessing(true);

    try {
      // Simulate akashic records access
      await new Promise(resolve => setTimeout(resolve, 3500));

      const accessLevel = Math.floor(Math.random() * 7) + 1;
      const karmicInsights = generateKarmicInsights(lifetimeFocus);
      const recordsData = generateRecordsData(lifetimeFocus, accessLevel);
      
      const { error } = await supabase
        .from('akashic_access')
        .insert({
          user_id: user.id,
          soul_signature: soulSignature,
          lifetime_focus: lifetimeFocus,
          records_retrieved: recordsData,
          karmic_insights: karmicInsights,
          access_level: accessLevel,
          verification_hash: generateVerificationHash(),
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        });

      if (error) {
        console.error('Error saving akashic access:', error);
      }

      toast({
        title: "Akashic Records Accessed! 📜",
        description: `Level ${accessLevel} access granted to ${lifetimeFocus.replace('_', ' ')}`,
      });

      await fetchRecords();

    } catch (error) {
      console.error('Error accessing akashic records:', error);
      
      toast({
        title: "Records Retrieved ✨",
        description: "Soul memories accessed locally.",
      });
    } finally {
      setLoading(false);
      setIsAccessing(false);
    }
  };

  const generateKarmicInsights = (focus: string) => {
    const insights = {
      current_incarnation: "Your soul chose this lifetime to master unconditional love and release judgment patterns.",
      past_life_ancient_egypt: "You were a temple healer who carried forward the sacred knowledge of light healing.",
      past_life_atlantis: "You witnessed the fall of Atlantis and carry wisdom about the responsible use of advanced technology.",
      past_life_lemuria: "You were a keeper of Earth's crystalline grid and maintain deep connection to Gaia's consciousness.",
      soul_group_origins: "Your soul family originates from the Pleiades star system and serves as bridges between dimensions.",
      karmic_patterns: "You are clearing ancestral patterns of scarcity and stepping into your role as an abundance conduit.",
      soul_contracts: "You have agreements to assist in the planetary ascension by anchoring higher frequencies.",
      spiritual_missions: "Your mission involves awakening others to their multidimensional nature through example."
    };
    return insights[focus as keyof typeof insights] || "Soul wisdom is being revealed according to divine timing.";
  };

  const generateRecordsData = (focus: string, level: number) => {
    return {
      access_level: level,
      timestamp: new Date().toISOString(),
      focus_area: focus,
      soul_memories: Array.from({length: level}, (_, i) => ({
        memory_id: `MEM-${i + 1}`,
        clarity: Math.random() * 0.9 + 0.1,
        emotional_charge: Math.random() * 0.8 + 0.2,
        lesson_integrated: Math.random() > 0.3
      })),
      karmic_threads: Math.floor(Math.random() * 5) + 1,
      soul_gifts_revealed: Math.floor(Math.random() * 3) + 1
    };
  };

  const generateVerificationHash = () => {
    return 'VH-' + Math.random().toString(36).substring(2, 15).toUpperCase();
  };

  const getAccessLevelColor = (level: number) => {
    if (level >= 6) return 'text-yellow-400';
    if (level >= 4) return 'text-purple-400';
    return 'text-blue-400';
  };

  const getAccessLevelLabel = (level: number) => {
    if (level >= 6) return 'Cosmic';
    if (level >= 4) return 'Advanced';
    return 'Initiate';
  };

  return (
    <div className="space-y-6">
      {/* Akashic Records Access Interface */}
      <Card className="bg-purple-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-purple-400" />
            Akashic Records Interface
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-purple-200">Soul Signature</Label>
            <div className="flex gap-2">
              <Input
                value={soulSignature}
                onChange={(e) => setSoulSignature(e.target.value)}
                placeholder="Enter or generate soul signature..."
                className="bg-black/30 border-purple-500/30 text-white"
                disabled={isAccessing}
              />
              <Button
                onClick={generateSoulSignature}
                variant="outline"
                className="border-purple-500/30 text-purple-200"
                disabled={isAccessing}
              >
                <Key className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-purple-200">Lifetime Focus</Label>
            <select
              value={lifetimeFocus}
              onChange={(e) => setLifetimeFocus(e.target.value)}
              className="w-full p-3 rounded bg-black/30 border border-purple-500/30 text-white"
              disabled={isAccessing}
            >
              {lifetimeFocuses.map(focus => (
                <option key={focus.value} value={focus.value}>
                  {focus.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={accessAkashicRecords}
            disabled={loading || isAccessing || !soulSignature}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            {isAccessing ? (
              <>
                <Eye className="w-4 h-4 mr-2 animate-pulse" />
                Accessing Soul Records...
              </>
            ) : (
              <>
                <ScrollText className="w-4 h-4 mr-2" />
                {loading ? 'Connecting...' : 'Access Akashic Records'}
              </>
            )}
          </Button>

          {isAccessing && (
            <div className="p-4 rounded-lg bg-purple-900/30 border border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-purple-200">Soul memory retrieval in progress...</span>
              </div>
              <p className="text-purple-300 text-sm">
                Accessing {lifetimeFocus.replace('_', ' ')} with signature {soulSignature}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Akashic Records History */}
      <Card className="bg-indigo-900/20 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            Soul Memory Archive
          </CardTitle>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <p className="text-center text-indigo-200 py-4">
              No akashic records accessed yet. Begin your soul memory journey!
            </p>
          ) : (
            <div className="space-y-3">
              {records.slice(0, 5).map((record) => (
                <div key={record.id} className="p-4 rounded-lg bg-indigo-900/30 border border-indigo-500/20">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-indigo-600 text-white">
                        {record.lifetime_focus.replace('_', ' ')}
                      </Badge>
                      <Badge className={`${getAccessLevelColor(record.access_level)} border-current`} variant="outline">
                        Level {record.access_level} - {getAccessLevelLabel(record.access_level)}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-indigo-200 text-sm mb-2">
                    <strong>Karmic Insights:</strong> {record.karmic_insights}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-indigo-400 text-xs">
                      Accessed: {new Date(record.created_at).toLocaleString()}
                    </p>
                    <p className="text-indigo-400 text-xs">
                      Soul Signature: {record.soul_signature}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
