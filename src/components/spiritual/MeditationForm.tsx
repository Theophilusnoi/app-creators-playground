
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { VoiceInput } from "@/components/ui/voice-input";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Wind, Save } from "lucide-react";

export const MeditationForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    meditation_type: 'mindfulness',
    duration: 15,
    notes: '',
    mood_before: 5,
    mood_after: 7
  });
  const [loading, setLoading] = useState(false);

  const handleVoiceTranscript = (transcript: string) => {
    setFormData(prev => ({
      ...prev,
      notes: prev.notes + ' ' + transcript
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Using the dreams table to store meditation data temporarily
      const { error } = await supabase
        .from('dreams')
        .insert([{
          user_id: user.id,
          title: `Meditation: ${formData.meditation_type}`,
          content: formData.notes || `${formData.duration} minute ${formData.meditation_type} meditation`,
          emotions: [`mood_before_${formData.mood_before}`, `mood_after_${formData.mood_after}`],
          dream_date: new Date().toISOString().split('T')[0]
        }]);

      if (error) throw error;
      
      alert('Meditation session saved successfully!');
      setFormData({
        meditation_type: 'mindfulness',
        duration: 15,
        notes: '',
        mood_before: 5,
        mood_after: 7
      });
    } catch (error: any) {
      alert('Error saving meditation: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Wind className="w-5 h-5 text-purple-400" />
          Meditation Session
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-purple-200">Meditation Type</Label>
              <select
                value={formData.meditation_type}
                onChange={(e) => setFormData({...formData, meditation_type: e.target.value})}
                className="w-full p-2 rounded bg-black/20 border border-purple-500/30 text-white"
              >
                <option value="mindfulness">Mindfulness</option>
                <option value="guided">Guided</option>
                <option value="transcendental">Transcendental</option>
                <option value="loving-kindness">Loving-Kindness</option>
                <option value="body-scan">Body Scan</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <Label className="text-purple-200">Duration (minutes)</Label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                min="1"
                max="120"
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-purple-200">Mood Before (1-10)</Label>
              <Input
                type="number"
                value={formData.mood_before}
                onChange={(e) => setFormData({...formData, mood_before: parseInt(e.target.value)})}
                min="1"
                max="10"
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
            
            <div>
              <Label className="text-purple-200">Mood After (1-10)</Label>
              <Input
                type="number"
                value={formData.mood_after}
                onChange={(e) => setFormData({...formData, mood_after: parseInt(e.target.value)})}
                min="1"
                max="10"
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-purple-200">Notes</Label>
              <VoiceInput 
                onTranscript={handleVoiceTranscript}
                className="border-purple-500/30 text-purple-200 hover:bg-purple-700/30"
              />
            </div>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="How was your meditation session?"
              className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              rows={4}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Session'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
