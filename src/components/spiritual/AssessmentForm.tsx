
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { TrendingUp, Save } from "lucide-react";

export const AssessmentForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    spiritual_level: 'seeker',
    awareness: 7,
    presence: 6,
    compassion: 8,
    recommendations: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('spiritual_assessments')
        .insert([{
          user_id: user.id,
          spiritual_level: formData.spiritual_level,
          assessment_data: {
            awareness: formData.awareness,
            presence: formData.presence,
            compassion: formData.compassion,
            notes: formData.notes
          },
          recommendations: formData.recommendations.split('\n').filter(r => r.trim().length > 0)
        }]);

      if (error) throw error;
      
      alert('Spiritual assessment saved successfully!');
      setFormData({
        spiritual_level: 'seeker',
        awareness: 7,
        presence: 6,
        compassion: 8,
        recommendations: '',
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
          <TrendingUp className="w-5 h-5 text-purple-400" />
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
          
          <div>
            <Label className="text-purple-200">Assessment Areas</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div>
                <Label className="text-purple-300">Self-Awareness (1-10)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.awareness}
                  onChange={(e) => setFormData({...formData, awareness: Number(e.target.value)})}
                  className="bg-black/20 border-purple-500/30 text-white"
                />
              </div>
              
              <div>
                <Label className="text-purple-300">Presence (1-10)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.presence}
                  onChange={(e) => setFormData({...formData, presence: Number(e.target.value)})}
                  className="bg-black/20 border-purple-500/30 text-white"
                />
              </div>
              
              <div>
                <Label className="text-purple-300">Compassion (1-10)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.compassion}
                  onChange={(e) => setFormData({...formData, compassion: Number(e.target.value)})}
                  className="bg-black/20 border-purple-500/30 text-white"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-purple-200">Recommendations</Label>
            <Textarea
              value={formData.recommendations}
              onChange={(e) => setFormData({...formData, recommendations: e.target.value})}
              placeholder="Suggestions for growth..."
              className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              rows={3}
            />
          </div>
          
          <div>
            <Label className="text-purple-200">Personal Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Your reflections on your spiritual journey..."
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
