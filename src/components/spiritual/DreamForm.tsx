
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Moon, Save, Mic, MicOff } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useVoiceService } from '@/hooks/useVoiceService';

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

interface DreamFormProps {
  onClose?: () => void;
}

export const DreamForm: React.FC<DreamFormProps> = ({ onClose }) => {
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
  const [isListening, setIsListening] = useState(false);
  const [recordingText, setRecordingText] = useState('');
  const { toast } = useToast();
  const { generateAndPlay, isGenerating } = useVoiceService();

  const emotionOptions = ['joy', 'fear', 'confusion', 'excitement', 'peace', 'anxiety', 'love', 'sadness'];

  // SpeechRecognition setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setRecordingText(prev => prev + ' ' + transcript);
        } else {
          interimTranscript += transcript;
        }
      }
      
      // Update the form data with the combined text
      setFormData(prev => ({
        ...prev,
        description: prev.description + ' ' + interimTranscript
      }));
    };
  }

  const startListening = () => {
    if (!recognition) {
      toast({
        title: "Voice Recording Not Supported",
        description: "Your browser doesn't support voice recording",
        variant: "destructive"
      });
      return;
    }
    
    try {
      recognition.start();
      setIsListening(true);
      toast({
        title: "Recording Started",
        description: "Speak clearly to record your dream",
      });
    } catch (err) {
      console.error("Error starting recognition:", err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      
      if (recordingText) {
        setFormData(prev => ({
          ...prev,
          description: prev.description + ' ' + recordingText
        }));
        setRecordingText('');
      }
      
      toast({
        title: "Recording Stopped",
        description: "Your recording has been added to the dream description",
      });
    }
  };

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

    if (!formData.title || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and description for your dream",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Extract potential symbols from the dream content
      const symbolWords = ["water", "flying", "animal", "death", "house", "tree", "fire", 
                          "darkness", "light", "mirror", "door", "stair", "snake", "bird", 
                          "cat", "dog", "ocean", "mountain", "forest", "temple", "church"];
                          
      const symbolMatches = formData.description.toLowerCase().match(
        new RegExp(`\\b(${symbolWords.join('|')})(s|es)?\\b`, 'g')
      );
      
      const detectedSymbols = symbolMatches ? [...new Set(symbolMatches)] : [];

      const { error } = await supabase
        .from('dreams')
        .insert([{
          user_id: user.id,
          title: formData.title,
          content: formData.description,
          analysis: null, // Will be filled by AI analysis later
          emotions: formData.emotions,
          symbols: detectedSymbols,
          dream_date: formData.date
        }]);

      if (error) throw error;
      
      toast({
        title: "Dream Saved",
        description: "Your dream has been recorded successfully",
      });

      // Offer voice confirmation
      try {
        await generateAndPlay("Your dream has been saved to your journal. Would you like to analyze it now for deeper insights?");
      } catch (voiceError) {
        console.error('Voice playback error:', voiceError);
      }
      
      if (onClose) onClose();
      
      setFormData({
        title: '',
        description: '',
        interpretation: '',
        emotions: [],
        recurring: false,
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error: any) {
      toast({
        title: "Error Saving Dream",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Moon className="w-5 h-5 text-purple-400" />
          Record New Dream
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
            <div className="flex justify-between items-center mb-1">
              <Label className="text-purple-200">Dream Description</Label>
              {recognition && (
                <div>
                  {isListening ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={stopListening}
                      className="h-8"
                    >
                      <MicOff className="w-4 h-4 mr-1" />
                      Stop Recording
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={startListening}
                      className="border-purple-500/30 text-purple-200 hover:bg-purple-700/30 h-8"
                    >
                      <Mic className="w-4 h-4 mr-1" />
                      Voice Record
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder={isListening ? "Speaking..." : "Describe your dream in detail..."}
              required
              className={`bg-black/20 border-purple-500/30 text-white placeholder-purple-300 min-h-32 ${
                isListening ? 'border-green-500 ring-1 ring-green-500' : ''
              }`}
            />
            
            {isListening && (
              <div className="flex items-center mt-2 text-green-400 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                Recording... (speak clearly)
              </div>
            )}
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
          
          <div className="flex gap-3">
            <Button 
              type="submit" 
              disabled={loading || isGenerating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Dream'}
            </Button>
            
            {onClose && (
              <Button 
                type="button"
                variant="outline" 
                onClick={onClose}
                className="border-purple-500/30 text-purple-200"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
