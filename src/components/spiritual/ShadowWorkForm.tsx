
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Mask, Save } from "lucide-react";

export const ShadowWorkForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    exercise_type: 'self-reflection',
    reflection: '',
    insights: '',
    integration_notes: '',
    emotions: [] as string[]
  });
  const [loading, setLoading] = useState(false);

  const emotionOptions = ['shame', 'anger', 'fear', 'vulnerability', 'acceptance', 'sadness', 'joy'];

  const handleEmotionChange = (emotion: string, checked: boolean) => {
    if (checked) {
      setFormData({...formData, emotions: [...formData.emotions, emotion]});
    } else {
      setFormData({...formData, emotions: formData.emotions.filter(e => e !== emotion)});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('shadow_work_sessions')
        .insert([{
          user_id: user.id,
          exercise_type: formData.exercise_type,
          reflection: formData.reflection,
          emotions: formData.emotions,
          insights: formData.insights,
          integration_notes: formData.integration_notes
        }]);

      if (error) throw error;
      
      alert('Shadow work session saved successfully!');
      setFormData({
        exercise_type: 'self-reflection',
        reflection: '',
        insights: '',
        integration_notes: '',
        emotions: []
      });
    } catch (error: any) {
      alert('Error saving shadow work: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Mask className="w-5 h-5 text-purple-400" />
          Shadow Work Session
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-purple-200">Exercise Type</Label>
            <select
              value={formData.exercise_type}
              onChange={(e) => setFormData({...formData, exercise_type: e.target.value})}
              className="w-full p-2 rounded bg-black/20 border border-purple-500/30 text-white"
            >
              <option value="self-reflection">Self-Reflection</option>
              <option value="journaling">Journaling</option>
              <option value="projection-awareness">Projection Awareness</option>
              <option value="inner-dialogue">Inner Dialogue</option>
              <option value="archetype-exploration">Archetype Exploration</option>
            </select>
          </div>
          
          <div>
            <Label className="text-purple-200">Reflection</Label>
            <Textarea
              value={formData.reflection}
              onChange={(e) => setFormData({...formData, reflection: e.target.value})}
              placeholder="What did you discover during this session?"
              required
              className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              rows={4}
            />
          </div>
          
          <div>
            <Label className="text-purple-200">Emotions Experienced</Label>
            <div className="flex flex-wrap gap-3 mt-2">
              {emotionOptions.map((emotion) => (
                <div key={emotion} className="flex items-center space-x-2">
                  <Checkbox
                    id={emotion}
                    checked={formData.emotions.includes(emotion)}
                    onCheckedChange={(checked) => handleEmotionChange(emotion, checked as boolean)}
                  />
                  <Label htmlFor={emotion} className="text-purple-300 capitalize">{emotion}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <Label className="text-purple-200">Key Insights</Label>
            <Textarea
              value={formData.insights}
              onChange={(e) => setFormData({...formData, insights: e.target.value})}
              placeholder="What insights did you gain?"
              className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              rows={3}
            />
          </div>
          
          <div>
            <Label className="text-purple-200">Integration Notes</Label>
            <Textarea
              value={formData.integration_notes}
              onChange={(e) => setFormData({...formData, integration_notes: e.target.value})}
              placeholder="How will you integrate these discoveries?"
              className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              rows={3}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Shadow Work'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
