
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Heart, TrendingUp, Calendar, Save } from "lucide-react";

interface MoodLog {
  id: string;
  mood_before: number;
  mood_after?: number;
  energy_level: number;
  stress_level: number;
  emotions_before: string[];
  emotions_after?: string[];
  session_type?: string;
  session_duration?: number;
  notes?: string;
  logged_at: string;
}

const emotionOptions = [
  'peaceful', 'anxious', 'grateful', 'sad', 'excited', 'angry',
  'content', 'worried', 'hopeful', 'frustrated', 'calm', 'overwhelmed',
  'joyful', 'confused', 'inspired', 'lonely', 'confident', 'fearful'
];

export const MoodTracker = () => {
  const { user } = useAuth();
  const [moodBefore, setMoodBefore] = useState([5]);
  const [moodAfter, setMoodAfter] = useState([5]);
  const [energyLevel, setEnergyLevel] = useState([5]);
  const [stressLevel, setStressLevel] = useState([5]);
  const [emotionsBefore, setEmotionsBefore] = useState<string[]>([]);
  const [emotionsAfter, setEmotionsAfter] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [sessionDuration, setSessionDuration] = useState(0);
  const [recentLogs, setRecentLogs] = useState<MoodLog[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadRecentMoodLogs();
    }
  }, [user]);

  const loadRecentMoodLogs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('mood_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('logged_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setRecentLogs(data || []);
    } catch (error) {
      console.error('Error loading mood logs:', error);
    }
  };

  const startTracking = () => {
    setIsTracking(true);
    // Reset after-session values
    setMoodAfter([5]);
    setEmotionsAfter([]);
  };

  const saveMoodLog = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const moodData = {
        user_id: user.id,
        mood_before: moodBefore[0],
        mood_after: isTracking ? moodAfter[0] : null,
        energy_level: energyLevel[0],
        stress_level: stressLevel[0],
        emotions_before: emotionsBefore,
        emotions_after: isTracking ? emotionsAfter : null,
        session_type: sessionType || null,
        session_duration: sessionDuration || null,
        notes: notes || null,
        logged_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('mood_logs')
        .insert(moodData);

      if (error) throw error;

      // Reset form
      setMoodBefore([5]);
      setMoodAfter([5]);
      setEnergyLevel([5]);
      setStressLevel([5]);
      setEmotionsBefore([]);
      setEmotionsAfter([]);
      setNotes('');
      setSessionType('');
      setSessionDuration(0);
      setIsTracking(false);

      // Reload recent logs
      loadRecentMoodLogs();

    } catch (error) {
      console.error('Error saving mood log:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleEmotion = (emotion: string, isBefore: boolean) => {
    if (isBefore) {
      setEmotionsBefore(prev => 
        prev.includes(emotion) 
          ? prev.filter(e => e !== emotion)
          : [...prev, emotion]
      );
    } else {
      setEmotionsAfter(prev => 
        prev.includes(emotion) 
          ? prev.filter(e => e !== emotion)
          : [...prev, emotion]
      );
    }
  };

  const getMoodEmoji = (mood: number) => {
    if (mood <= 2) return '😢';
    if (mood <= 4) return '😕';
    if (mood <= 6) return '😐';
    if (mood <= 8) return '🙂';
    return '😊';
  };

  const getWeeklyTrend = () => {
    if (recentLogs.length < 2) return null;
    
    const recentAvg = recentLogs.slice(0, 3).reduce((sum, log) => sum + (log.mood_after || log.mood_before), 0) / 3;
    const olderAvg = recentLogs.slice(-3).reduce((sum, log) => sum + (log.mood_after || log.mood_before), 0) / 3;
    
    if (recentAvg > olderAvg) return 'improving';
    if (recentAvg < olderAvg) return 'declining';
    return 'stable';
  };

  const weeklyTrend = getWeeklyTrend();

  return (
    <div className="space-y-6">
      {/* Current Mood Tracking */}
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Heart className="w-6 h-6 mr-2 text-pink-400" />
            How are you feeling?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Before */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-purple-200 font-medium">Mood</label>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getMoodEmoji(moodBefore[0])}</span>
                <span className="text-white font-semibold">{moodBefore[0]}/10</span>
              </div>
            </div>
            <Slider
              value={moodBefore}
              onValueChange={setMoodBefore}
              max={10}
              min={1}
              step={1}
              className="py-4"
            />
          </div>

          {/* Energy and Stress */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-purple-200">Energy</label>
                <span className="text-white">{energyLevel[0]}/10</span>
              </div>
              <Slider
                value={energyLevel}
                onValueChange={setEnergyLevel}
                max={10}
                min={1}
                step={1}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-purple-200">Stress</label>
                <span className="text-white">{stressLevel[0]}/10</span>
              </div>
              <Slider
                value={stressLevel}
                onValueChange={setStressLevel}
                max={10}
                min={1}
                step={1}
              />
            </div>
          </div>

          {/* Emotions */}
          <div className="space-y-3">
            <label className="text-purple-200 font-medium">Emotions {isTracking ? 'Before' : ''}</label>
            <div className="flex flex-wrap gap-2">
              {emotionOptions.map((emotion) => (
                <Badge
                  key={emotion}
                  variant={emotionsBefore.includes(emotion) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    emotionsBefore.includes(emotion)
                      ? 'bg-purple-600 text-white'
                      : 'border-purple-400 text-purple-200 hover:bg-purple-600/30'
                  }`}
                  onClick={() => toggleEmotion(emotion, true)}
                >
                  {emotion}
                </Badge>
              ))}
            </div>
          </div>

          {/* Session Type Selection */}
          <div className="space-y-3">
            <label className="text-purple-200 font-medium">Session Type (Optional)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['meditation', 'shadow_work', 'dream_analysis', 'journaling'].map((type) => (
                <Button
                  key={type}
                  variant={sessionType === type ? "default" : "outline"}
                  onClick={() => setSessionType(sessionType === type ? '' : type)}
                  className={`${
                    sessionType === type
                      ? 'bg-purple-600 text-white'
                      : 'border-purple-400 text-purple-200'
                  }`}
                >
                  {type.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>

          {/* After Session Tracking */}
          {isTracking && (
            <>
              <div className="border-t border-purple-500/30 pt-6">
                <h3 className="text-white font-medium mb-4">After Session</h3>
                
                {/* Mood After */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <label className="text-purple-200 font-medium">Mood After</label>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getMoodEmoji(moodAfter[0])}</span>
                      <span className="text-white font-semibold">{moodAfter[0]}/10</span>
                    </div>
                  </div>
                  <Slider
                    value={moodAfter}
                    onValueChange={setMoodAfter}
                    max={10}
                    min={1}
                    step={1}
                    className="py-4"
                  />
                </div>

                {/* Emotions After */}
                <div className="space-y-3">
                  <label className="text-purple-200 font-medium">Emotions After</label>
                  <div className="flex flex-wrap gap-2">
                    {emotionOptions.map((emotion) => (
                      <Badge
                        key={emotion}
                        variant={emotionsAfter.includes(emotion) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors ${
                          emotionsAfter.includes(emotion)
                            ? 'bg-purple-600 text-white'
                            : 'border-purple-400 text-purple-200 hover:bg-purple-600/30'
                        }`}
                        onClick={() => toggleEmotion(emotion, false)}
                      >
                        {emotion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Notes */}
          <div className="space-y-3">
            <label className="text-purple-200 font-medium">Notes (Optional)</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How are you feeling? What's on your mind?"
              className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!isTracking ? (
              <>
                <Button 
                  onClick={startTracking}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Start Session Tracking
                </Button>
                <Button 
                  onClick={saveMoodLog}
                  disabled={loading}
                  variant="outline"
                  className="border-purple-400 text-purple-200 hover:bg-purple-600/30"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Quick Save'}
                </Button>
              </>
            ) : (
              <Button 
                onClick={saveMoodLog}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Complete Session'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Trend Analysis */}
      {weeklyTrend && (
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
              Weekly Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className={`text-2xl ${
                weeklyTrend === 'improving' ? 'text-green-400' : 
                weeklyTrend === 'declining' ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {weeklyTrend === 'improving' ? '📈' : 
                 weeklyTrend === 'declining' ? '📉' : '➡️'}
              </div>
              <div>
                <p className="text-white font-medium capitalize">
                  Your mood is {weeklyTrend}
                </p>
                <p className="text-purple-200 text-sm">
                  Based on your recent {recentLogs.length} entries
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Logs */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-purple-400" />
            Recent Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLogs.length > 0 ? (
              recentLogs.map((log) => (
                <div key={log.id} className="bg-purple-900/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getMoodEmoji(log.mood_after || log.mood_before)}</span>
                      <span className="text-white font-medium">
                        {log.mood_before}/10
                        {log.mood_after && log.mood_after !== log.mood_before && (
                          <span className="text-purple-300"> → {log.mood_after}/10</span>
                        )}
                      </span>
                    </div>
                    <span className="text-xs text-purple-300">
                      {new Date(log.logged_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {log.emotions_before && log.emotions_before.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {log.emotions_before.map((emotion, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-purple-400 text-purple-200">
                          {emotion}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {log.notes && (
                    <p className="text-purple-200 text-sm">{log.notes}</p>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-purple-300 py-8">
                <Heart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Start tracking your mood to see patterns and progress!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
