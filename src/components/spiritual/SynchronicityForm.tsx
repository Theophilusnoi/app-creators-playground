import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VoiceInput } from "@/components/ui/voice-input";
import { Sparkles, Save, X, AlertCircle } from "lucide-react";
import { useSynchronicities } from '@/hooks/useSynchronicities';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

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
  const { user } = useAuth();
  const { addSynchronicity } = useSynchronicities();
  const { toast } = useToast();
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
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleVoiceTranscript = (field: string) => (transcript: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev] + ' ' + transcript
    }));
  };

  const validateForm = () => {
    console.log('🔍 Validating form data:', formData);
    const errors: string[] = [];

    if (!formData.title.trim()) {
      errors.push('Title is required');
    }
    if (!formData.description.trim()) {
      errors.push('Description is required');
    }
    if (!formData.synchronicity_type) {
      errors.push('Synchronicity type is required');
    }
    if (formData.significance < 1 || formData.significance > 5) {
      errors.push('Significance must be between 1 and 5');
    }
    if (!formData.date_occurred) {
      errors.push('Date is required');
    }

    console.log('🔍 Validation errors:', errors);
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Form submission started');

    // Check authentication first
    if (!user) {
      console.error('❌ No user found during submission');
      toast({
        title: "Authentication Required",
        description: "Please log in to record synchronicities",
        variant: "destructive"
      });
      return;
    }

    // Validate form
    if (!validateForm()) {
      console.error('❌ Form validation failed');
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    console.log('📝 Submitting form with data:', formData);

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
      
      console.log('✅ Form submission successful');
      onClose();
    } catch (error: any) {
      console.error('💥 Form submission error:', error);
      // Error is already handled in the hook
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
        {/* Authentication Warning */}
        {!user && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm">Please log in to record synchronicities</span>
          </div>
        )}

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-300 font-medium">Please fix the following errors:</span>
            </div>
            <ul className="text-red-300 text-sm list-disc list-inside">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-purple-200">Title *</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Brief title for this synchronicity"
              required
              className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
            />
          </div>

          <div>
            <Label className="text-purple-200">Type *</Label>
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
              <Label className="text-purple-200">Date Occurred *</Label>
              <Input
                type="date"
                value={formData.date_occurred}
                onChange={(e) => setFormData({...formData, date_occurred: e.target.value})}
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
            
            <div>
              <Label className="text-purple-200">Significance (1-5) *</Label>
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
            <div className="flex justify-between items-center mb-2">
              <Label className="text-purple-200">Description *</Label>
              <VoiceInput 
                onTranscript={handleVoiceTranscript('description')}
                className="border-purple-500/30 text-purple-200 hover:bg-purple-700/30"
              />
            </div>
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
            <div className="flex justify-between items-center mb-2">
              <Label className="text-purple-200">Meaning (Optional)</Label>
              <VoiceInput 
                onTranscript={handleVoiceTranscript('meaning')}
                className="border-purple-500/30 text-purple-200 hover:bg-purple-700/30"
              />
            </div>
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
              disabled={loading || !user}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50"
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
