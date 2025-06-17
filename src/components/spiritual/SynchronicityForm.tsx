
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Save, X } from "lucide-react";
import { useSynchronicities } from '@/hooks/useSynchronicities';

interface SynchronicityFormProps {
  onClose: () => void;
}

const synchronicityTypes = [
  "Number Sequences",
  "Animal Messengers", 
  "Repeated Words/Phrases",
  "Meaningful Coincidences",
  "Dreams & Reality"
];

export const SynchronicityForm: React.FC<SynchronicityFormProps> = ({ onClose }) => {
  const { addSynchronicity } = useSynchronicities();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    synchronicity_type: '',
    significance: 3,
    tags: '',
    meaning: '',
    date_occurred: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || !formData.synchronicity_type) {
      return;
    }

    setLoading(true);
    try {
      await addSynchronicity({
        title: formData.title,
        description: formData.description,
        synchronicity_type: formData.synchronicity_type,
        significance: formData.significance,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        meaning: formData.meaning || undefined,
        date_occurred: formData.date_occurred
      });
      
      onClose();
    } catch (error: any) {
      console.error('Error saving synchronicity:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Record Synchronicity
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-purple-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
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

          <div>
            <Label className="text-purple-200">Type</Label>
            <Select 
              value={formData.synchronicity_type}
              onValueChange={(value) => setFormData({...formData, synchronicity_type: value})}
            >
              <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                <SelectValue placeholder="Select synchronicity type" />
              </SelectTrigger>
              <SelectContent>
                {synchronicityTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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

          <div>
            <Label className="text-purple-200">Meaning (Optional)</Label>
            <Input
              value={formData.meaning}
              onChange={(e) => setFormData({...formData, meaning: e.target.value})}
              placeholder="What might this be telling you?"
              className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
            />
          </div>
          
          <div className="flex space-x-3">
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Record Synchronicity'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
