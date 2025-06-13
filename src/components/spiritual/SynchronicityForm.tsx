
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Sparkles, Save } from "lucide-react";

export const SynchronicityForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    significance_level: 3,
    tags: '',
    date_occurred: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('synchronicities')
        .insert([{
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          significance_level: formData.significance_level,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
          date_occurred: formData.date_occurred
        }]);

      if (error) throw error;
      
      alert('Synchronicity recorded successfully!');
      setFormData({
        title: '',
        description: '',
        significance_level: 3,
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-purple-200">Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Meaningful coincidence"
                required
                className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              />
            </div>
            
            <div>
              <Label className="text-purple-200">Date Occurred</Label>
              <Input
                type="date"
                value={formData.date_occurred}
                onChange={(e) => setFormData({...formData, date_occurred: e.target.value})}
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-purple-200">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the synchronicity..."
              required
              className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-purple-200">Significance (1-5)</Label>
              <Input
                type="number"
                min="1"
                max="5"
                value={formData.significance_level}
                onChange={(e) => setFormData({...formData, significance_level: Number(e.target.value)})}
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
            
            <div>
              <Label className="text-purple-200">Tags</Label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="nature, numbers, animals..."
                className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Synchronicity'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
