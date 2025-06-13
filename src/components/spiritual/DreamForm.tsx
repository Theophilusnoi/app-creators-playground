
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Moon, Save } from "lucide-react";

export const DreamForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    interpretation: '',
    recurring: false,
    dream_date: new Date().toISOString().split('T')[0],
    emotions: [] as string[]
  });
  const [loading, setLoading] = useState(false);

  const emotionOptions = ['joy', 'fear', 'confusion', 'excitement', 'peace', 'anxiety'];

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
          content: formData.content,
          interpretation: formData.interpretation,
          recurring: formData.recurring,
          dream_date: formData.dream_date,
          emotions: formData.emotions
        }]);

      if (error) throw error;
      
      alert('Dream journal saved successfully!');
      setFormData({
        title: '',
        content: '',
        interpretation: '',
        recurring: false,
        dream_date: new Date().toISOString().split('T')[0],
        emotions: []
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
          Record Dream
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-purple-200">Dream Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Title of your dream"
                required
                className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              />
            </div>
            
            <div>
              <Label className="text-purple-200">Date</Label>
              <Input
                type="date"
                value={formData.dream_date}
                onChange={(e) => setFormData({...formData, dream_date: e.target.value})}
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-purple-200">Dream Description</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recurring"
                  checked={formData.recurring}
                  onCheckedChange={(checked) => setFormData({...formData, recurring: checked as boolean})}
                />
                <Label htmlFor="recurring" className="text-purple-200">Recurring Dream</Label>
              </div>
            </div>
            
            <div>
              <Label className="text-purple-200">Emotions</Label>
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
