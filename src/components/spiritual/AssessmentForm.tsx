
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

  const generateRecommendations = async (assessmentId: string, scores: any) => {
    const recommendations = [];
    
    // Generate recommendations based on lowest scores
    const scoreEntries = [
      { type: 'awareness', score: scores.awareness, title: 'Mindfulness Practice', description: 'Start with 10-minute daily mindfulness meditation to increase self-awareness' },
      { type: 'presence', score: scores.presence, title: 'Present Moment Exercises', description: 'Practice grounding techniques and breathing exercises to enhance presence' },
      { type: 'compassion', score: scores.compassion, title: 'Loving-Kindness Meditation', description: 'Develop compassion through loving-kindness meditation practice' },
      { type: 'wisdom', score: scores.wisdom, title: 'Shadow Work Practice', description: 'Explore deeper self-understanding through shadow work exercises' },
      { type: 'inner_peace', score: scores.inner_peace, title: 'Peace Cultivation', description: 'Focus on stress reduction and inner peace through meditation and reflection' }
    ];

    // Sort by lowest scores first (areas needing most improvement)
    scoreEntries.sort((a, b) => a.score - b.score);

    // Create recommendations for the 3 lowest scoring areas
    for (let i = 0; i < Math.min(3, scoreEntries.length); i++) {
      const area = scoreEntries[i];
      recommendations.push({
        user_id: user?.id,
        assessment_id: assessmentId,
        recommendation_type: area.type === 'awareness' || area.type === 'presence' || area.type === 'inner_peace' ? 'meditation' : 
                           area.type === 'wisdom' ? 'shadow_work' : 'meditation',
        title: area.title,
        description: area.description,
        priority: i + 1
      });
    }

    // Insert recommendations
    if (recommendations.length > 0) {
      try {
        const { error } = await supabase.from('spiritual_recommendations').insert(recommendations);
        if (error) {
          console.error('Error inserting recommendations:', error);
        }
      } catch (error) {
        console.error('Error inserting recommendations:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Insert into spiritual_assessments table
      const { data: assessment, error: assessmentError } = await supabase
        .from('spiritual_assessments')
        .insert([{
          user_id: user.id,
          spiritual_level: formData.spiritual_level,
          awareness: formData.awareness,
          presence: formData.presence,
          compassion: formData.compassion,
          wisdom: formData.wisdom,
          inner_peace: formData.inner_peace,
          notes: formData.notes
        }])
        .select()
        .single();

      if (assessmentError) {
        console.error('Assessment error:', assessmentError);
        alert('Error saving assessment. Please try again.');
        return;
      }

      // Generate recommendations based on assessment
      if (assessment?.id) {
        await generateRecommendations(assessment.id, formData);
      }
      
      alert('Spiritual assessment saved successfully! Check your recommendations for personalized guidance.');
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
      console.error('Error saving assessment:', error);
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
          
          <div className="grid grid-cols-3 gap-4">
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
              <Label className="text-purple-200">Wisdom (1-10)</Label>
              <Input
                type="number"
                value={formData.wisdom}
                onChange={(e) => setFormData({...formData, wisdom: parseInt(e.target.value)})}
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
