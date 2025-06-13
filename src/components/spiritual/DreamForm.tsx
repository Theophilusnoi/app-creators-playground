
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Moon, Save } from "lucide-react";

export const DreamForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    interpretation: '',
    emotions: [] as string[],
    recurring: false,
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  const emotionOptions = ['joy', 'fear', 'confusion', 'excitement', 'peace', 'anxiety', 'love', 'sadness'];

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
        .from('dreams')
        .insert([{
          user_id: user.id,
          title: formData.title,
          content: formData.description,
          analysis: formData.interpretation,
          emotions: formData.emotions,
          dream_date: formData.date
        }]);

      if (error) throw error;
      
      alert('Dream journal saved successfully!');
      setFormData({
        title: '',
        description: '',
        interpretation: '',
        emotions: [],
        recurring: false,
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error: any) {
      alert('Error saving dream: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Moon className="w-5 h-5 text-purple-400" />
          Dream Journal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-purple-200">Dream Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Give your dream a title"
                required
                className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              />
            </div>
            
            <div>
              <Label className="text-purple-200">Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-purple-200">Dream Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe your dream in detail..."
              required
              className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              rows={4}
            />
          </div>
          
          <div>
            <Label className="text-purple-200">Your Interpretation</Label>
            <Textarea
              value={formData.interpretation}
              onChange={(e) => setFormData({...formData, interpretation: e.target.value})}
              placeholder="What do you think this dream means?"
              className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              rows={3}
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
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="recurring"
              checked={formData.recurring}
              onCheckedChange={(checked) => setFormData({...formData, recurring: checked as boolean})}
            />
            <Label htmlFor="recurring" className="text-purple-300">This is a recurring dream</Label>
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Dream'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
