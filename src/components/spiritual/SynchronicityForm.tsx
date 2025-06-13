
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Sparkles, Save } from "lucide-react";

export const SynchronicityForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    significance: 3,
    tags: '',
    date_occurred: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Using the dreams table to store synchronicity data temporarily
      const { error } = await supabase
        .from('dreams')
        .insert([{
          user_id: user.id,
          title: `Synchronicity: ${formData.title}`,
          description: formData.description,
          emotions: formData.tags.split(',').map(tag => tag.trim()),
          interpretation: `Significance level: ${formData.significance}/5`,
          date: formData.date_occurred
        }]);

      if (error) throw error;
      
      alert('Synchronicity recorded successfully!');
      setFormData({
        title: '',
        description: '',
        significance: 3,
        tags: '',
        date_occurred: new Date().toISOString().split('T')[0]
      });
    } catch (error: any) {
      alert('Error saving synchronicity: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          Record Synchronicity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-purple-200">Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Brief title for this synchronicity"
              required
              className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-purple-200">Date Occurred</Label>
              <Input
                type="date"
                value={formData.date_occurred}
                onChange={(e) => setFormData({...formData, date_occurred: e.target.value})}
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
            
            <div>
              <Label className="text-purple-200">Significance (1-5)</Label>
              <Input
                type="number"
                value={formData.significance}
                onChange={(e) => setFormData({...formData, significance: parseInt(e.target.value)})}
                min="1"
                max="5"
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-purple-200">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the synchronicity in detail..."
              required
              className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              rows={4}
            />
          </div>
          
          <div>
            <Label className="text-purple-200">Tags</Label>
            <Input
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="nature, numbers, animals, etc. (comma-separated)"
              className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Record Synchronicity'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
