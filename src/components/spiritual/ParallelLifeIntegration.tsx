
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Zap, Shield, Brain, Clock } from 'lucide-react';

interface ParallelRecord {
  id: string;
  timeline_hash: string;
  wisdom_insights: string;
  healing_received: boolean;
  integration_level: number;
  timeline_encryption_key?: string;
  verified_crossing?: boolean;
  accessed_at: string;
}

export const ParallelLifeIntegration = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAccessing, setIsAccessing] = useState(false);
  const [timelineFocus, setTimelineFocus] = useState('');
  const [wisdomInsights, setWisdomInsights] = useState('');
  const [healingReceived, setHealingReceived] = useState(false);
  const [parallelRecords, setParallelRecords] = useState<ParallelRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchParallelRecords();
    }
  }, [user]);

  const fetchParallelRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('parallel_self_records')
        .select('*')
        .eq('user_id', user?.id)
        .order('accessed_at', { ascending: false });

      if (error) throw error;
      setParallelRecords(data || []);
    } catch (error) {
      console.error('Error fetching parallel records:', error);
    }
  };

  const generateTimelineHash = (focus: string) => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return `TL_${focus.replace(/\s+/g, '_').toUpperCase()}_${timestamp}_${random}`;
  };

  const accessParallelSelf = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access parallel timelines.",
        variant: "destructive"
      });
      return;
    }

    if (!timelineFocus.trim()) {
      toast({
        title: "Timeline Focus Required",
        description: "Please specify what aspect of your parallel self you want to access.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setIsAccessing(true);

    try {
      // Simulate quantum meditation access process
      await new Promise(resolve => setTimeout(resolve, 3000));

      const timelineHash = generateTimelineHash(timelineFocus);
      
      // Generate quantum insights simulation
      const insights = generateQuantumInsights(timelineFocus);
      const healingStatus = Math.random() > 0.3; // 70% chance of healing
      
      const { error } = await supabase
        .from('parallel_self_records')
        .insert([{
          user_id: user.id,
          timeline_hash: timelineHash,
          wisdom_insights: insights,
          healing_received: healingStatus,
          integration_level: Math.floor(Math.random() * 10) + 1,
          verified_crossing: true,
          timeline_signature: {
            quantum_coherence: Math.random(),
            dimensional_stability: Math.random() * 0.8 + 0.2,
            wisdom_clarity: Math.random() * 0.9 + 0.1,
            healing_potency: healingStatus ? Math.random() * 0.8 + 0.2 : 0
          }
        }]);

      if (error) throw error;

      setWisdomInsights(insights);
      setHealingReceived(healingStatus);
      
      toast({
        title: "Timeline Connection Established! ⚡",
        description: `Successfully connected to parallel self focused on: ${timelineFocus}`,
      });

      // Clear form and refresh records
      setTimelineFocus('');
      await fetchParallelRecords();

    } catch (error) {
      console.error('Error accessing parallel self:', error);
      
      // Still show insights locally even if database fails
      const insights = generateQuantumInsights(timelineFocus);
      setWisdomInsights(insights);
      setHealingReceived(Math.random() > 0.3);
      
      toast({
        title: "Parallel Connection Achieved ✨",
        description: "Timeline wisdom received and integrated locally.",
      });
    } finally {
      setLoading(false);
      setIsAccessing(false);
    }
  };

  const generateQuantumInsights = (focus: string): string => {
    const wisdomTemplates = [
      `In the timeline where you focused deeply on ${focus}, you discovered that the key lies in trusting your intuitive knowing over logical reasoning. Your parallel self learned to flow with synchronicities rather than forcing outcomes.`,
      
      `Your parallel self who mastered ${focus} wants you to know: "The breakthrough comes when you stop trying to control the process and instead become the process. Embody what you seek to become."`,
      
      `From the timeline of ${focus} mastery: "Every challenge was actually a portal to greater wisdom. What you're experiencing now is preparing you for gifts you can't yet imagine."`,
      
      `Your parallel self in the ${focus} reality shares: "The answer you seek is not outside you—it's in the frequency you choose to embody. Align your inner vibration with your desired outcome."`,
      
      `Timeline wisdom for ${focus}: "Stop looking for permission from others to be who you truly are. Your authentic expression is your greatest gift to the world. Trust your unique path."`
    ];

    return wisdomTemplates[Math.floor(Math.random() * wisdomTemplates.length)];
  };

  const timelineFocusOptions = [
    'Career fulfillment and purpose',
    'Healthy relationships and love',
    'Financial abundance and freedom',
    'Creative expression and artistry',
    'Spiritual awakening and wisdom',
    'Physical health and vitality',
    'Leadership and influence',
    'Inner peace and emotional healing',
    'Psychic abilities and intuition',
    'Service to humanity'
  ];

  return (
    <div className="space-y-6">
      {/* Quantum Access Interface */}
      <Card className="bg-indigo-900/20 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" />
            Parallel Timeline Access Portal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-indigo-200">Timeline Focus</Label>
            <select
              value={timelineFocus}
              onChange={(e) => setTimelineFocus(e.target.value)}
              className="w-full p-3 rounded bg-black/30 border border-indigo-500/30 text-white"
              disabled={isAccessing}
            >
              <option value="">Select a focus for parallel self access...</option>
              {timelineFocusOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={accessParallelSelf}
            disabled={loading || isAccessing || !timelineFocus}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            {isAccessing ? (
              <>
                <Brain className="w-4 h-4 mr-2 animate-pulse" />
                Quantum Meditation Active...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                {loading ? 'Connecting...' : 'Access Parallel Self'}
              </>
            )}
          </Button>

          {isAccessing && (
            <div className="p-4 rounded-lg bg-purple-900/30 border border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-purple-200">Quantum meditation in progress...</span>
              </div>
              <p className="text-purple-300 text-sm">
                Establishing dimensional bridge to parallel timeline focused on: {timelineFocus}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Session Insights */}
      {wisdomInsights && (
        <Card className="bg-purple-900/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              Parallel Self Wisdom
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-purple-800/30 border-l-4 border-purple-400">
              <p className="text-purple-100 leading-relaxed italic">
                "{wisdomInsights}"
              </p>
            </div>
            
            {healingReceived && (
              <div className="mt-4 p-3 rounded-lg bg-green-900/30 border border-green-500/30">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-green-200 font-medium">Cross-Timeline Healing Received</span>
                </div>
                <p className="text-green-300 text-sm mt-1">
                  Your parallel self has shared healing energy across dimensional boundaries.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Timeline Records */}
      <Card className="bg-slate-900/20 border-slate-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-400" />
            Timeline Access History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {parallelRecords.length === 0 ? (
            <p className="text-center text-slate-300 py-4">
              No parallel timelines accessed yet. Start your first quantum meditation session!
            </p>
          ) : (
            <div className="space-y-3">
              {parallelRecords.slice(0, 5).map((record) => (
                <div key={record.id} className="p-4 rounded-lg bg-slate-800/30 border border-slate-500/20">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-200 border-cyan-400">
                        {record.timeline_hash.split('_')[1]}
                      </Badge>
                      {record.verified_crossing && (
                        <Badge className="bg-green-600 text-white">
                          Verified
                        </Badge>
                      )}
                      {record.healing_received && (
                        <Badge className="bg-purple-600 text-white">
                          Healing
                        </Badge>
                      )}
                    </div>
                    <span className="text-slate-400 text-sm">
                      Level {record.integration_level}
                    </span>
                  </div>
                  
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {record.wisdom_insights}
                  </p>
                  
                  <p className="text-slate-400 text-xs mt-2">
                    Accessed: {new Date(record.accessed_at).toLocaleString()}
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
