
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { BarChart3, Save } from "lucide-react";

export const AssessmentForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    spiritual_level: 'seeker',
    awareness: 7,
    presence: 6,
    compassion: 8,
    wisdom: 6,
    inner_peace: 7,
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Using the dreams table to store assessment data temporarily
      const { error } = await supabase
        .from('dreams')
        .insert([{
          user_id: user.id,
          title: `Spiritual Assessment - ${formData.spiritual_level}`,
          content: formData.notes || 'Spiritual progress assessment',
          emotions: [`awareness_${formData.awareness}`, `presence_${formData.presence}`, `compassion_${formData.compassion}`],
          analysis: `Level: ${formData.spiritual_level}, Awareness: ${formData.awareness}/10, Presence: ${formData.presence}/10, Compassion: ${formData.compassion}/10`,
          dream_date: new Date().toISOString().split('T')[0]
        }]);

      if (error) throw error;
      
      alert('Spiritual assessment saved successfully!');
      setFormData({
        spiritual_level: 'seeker',
        awareness: 7,
        presence: 6,
        compassion: 8,
        wisdom: 6,
        inner_peace: 7,
        notes: ''
      });
    } catch (error: any) {
      alert('Error saving assessment: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-400" />
          Spiritual Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-purple-200">Current Spiritual Level</Label>
            <select
              value={formData.spiritual_level}
              onChange={(e) => setFormData({...formData, spiritual_level: e.target.value})}
              className="w-full p-2 rounded bg-black/20 border border-purple-500/30 text-white"
            >
              <option value="awakening">Awakening</option>
              <option value="seeker">Seeker</option>
              <option value="practitioner">Practitioner</option>
              <option value="guide">Guide</option>
              <option value="enlightened">Enlightened</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-purple-200">Self-Awareness (1-10)</Label>
              <Input
                type="number"
                value={formData.awareness}
                onChange={(e) => setFormData({...formData, awareness: parseInt(e.target.value)})}
                min="1"
                max="10"
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
            
            <div>
              <Label className="text-purple-200">Presence (1-10)</Label>
              <Input
                type="number"
                value={formData.presence}
                onChange={(e) => setFormData({...formData, presence: parseInt(e.target.value)})}
                min="1"
                max="10"
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-purple-200">Compassion (1-10)</Label>
              <Input
                type="number"
                value={formData.compassion}
                onChange={(e) => setFormData({...formData, compassion: parseInt(e.target.value)})}
                min="1"
                max="10"
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
            
            <div>
              <Label className="text-purple-200">Inner Peace (1-10)</Label>
              <Input
                type="number"
                value={formData.inner_peace}
                onChange={(e) => setFormData({...formData, inner_peace: parseInt(e.target.value)})}
                min="1"
                max="10"
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-purple-200">Personal Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Reflect on your spiritual journey and growth..."
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
            {loading ? 'Saving...' : 'Save Assessment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
