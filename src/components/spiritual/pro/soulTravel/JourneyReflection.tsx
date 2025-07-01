
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, Star, Heart, Eye, Save, Share, 
  Sparkles, Leaf, Clock, Users, Tag
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JourneyReflectionProps {
  sessionData: any;
  onSave: (reflectionData: any) => void;
  onShare: (reflectionData: any) => void;
  onComplete: () => void;
}

const JourneyReflection: React.FC<JourneyReflectionProps> = ({ 
  sessionData, 
  onSave, 
  onShare, 
  onComplete 
}) => {
  const { toast } = useToast();
  const [reflection, setReflection] = useState('');
  const [insights, setInsights] = useState('');
  const [beings, setBeings] = useState('');
  const [emotions, setEmotions] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [mood, setMood] = useState(5);
  const [title, setTitle] = useState('');

  const availableTags = [
    '#PastLife', '#Guide', '#Healing', '#Warning', '#Wisdom',
    '#Angels', '#Ancestors', '#Animals', '#Nature', '#Cosmic',
    '#Chakras', '#Energy', '#Symbols', '#Colors', '#Sounds'
  ];

  const moodEmojis = ['😰', '😕', '😐', '🙂', '😊', '😌', '✨', '🌟', '💫', '🌈'];

  const reflectionPrompts = [
    "What did you learn about yourself?",
    "Who or what did you encounter?",
    "What messages did you receive?",
    "How do you feel different now?",
    "What needs healing or attention?",
    "What guidance were you given?"
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSave = () => {
    const reflectionData = {
      id: Date.now(),
      sessionData,
      title: title || `${sessionData.journeyType} Journey`,
      reflection,
      insights,
      beings,
      emotions,
      tags: selectedTags,
      mood,
      timestamp: new Date().toISOString(),
      duration: sessionData.duration
    };

    onSave(reflectionData);
    
    toast({
      title: "Journey Saved",
      description: "Your journey has been recorded in your journal",
    });
  };

  const handleShareToCommunity = () => {
    const reflectionData = {
      title: title || `${sessionData.journeyType} Journey`,
      reflection,
      insights,
      tags: selectedTags,
      mood,
      journeyType: sessionData.journeyType,
      timestamp: new Date().toISOString()
    };

    onShare(reflectionData);
    
    toast({
      title: "Shared with Community",
      description: "Your experience has been shared with the community circle",
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6" style={{ backgroundColor: '#F5FFF5' }}>
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Journey Reflection</h2>
              <p className="text-green-100">Record your experiences and insights</p>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Session Summary */}
      <Card className="bg-white/80 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Session Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-green-800 font-semibold">Journey Type</div>
              <div className="text-green-600">{sessionData.journeyType}</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-green-800 font-semibold">Duration</div>
              <div className="text-green-600">{formatDuration(sessionData.duration)}</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-green-800 font-semibold">Completed</div>
              <div className="text-green-600">{sessionData.completed ? 'Yes' : 'Partial'}</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-green-800 font-semibold">Phase</div>
              <div className="text-green-600 capitalize">{sessionData.phase}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mood Check */}
      <Card className="bg-white/80 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            How do you feel now?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-2 mb-4">
            {moodEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => setMood(index + 1)}
                className={`text-2xl p-2 rounded-full transition-all ${
                  mood === index + 1 ? 'bg-green-200 scale-125' : 'hover:bg-green-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="text-center">
            <span className="text-green-600 font-medium">
              {mood <= 3 ? 'Challenging' : mood <= 6 ? 'Balanced' : 'Transformed'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Reflection Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Journey Title
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`${sessionData.journeyType} Journey - ${new Date().toLocaleDateString()}`}
              className="border-green-300 focus:border-green-500"
            />
          </CardContent>
        </Card>

        <Card className="bg-white/80 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Experience Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-green-600 text-white'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reflection */}
      <div className="space-y-6">
        <Card className="bg-white/80 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              What did you experience?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Describe your journey, what you saw, felt, or experienced..."
              className="min-h-[120px] border-green-300 focus:border-green-500"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
              {reflectionPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs border-green-300 text-green-700 hover:bg-green-50"
                  onClick={() => setReflection(prev => prev + (prev ? '\n\n' : '') + prompt + '\n')}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/80 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={insights}
                onChange={(e) => setInsights(e.target.value)}
                placeholder="What wisdom or understanding did you gain?"
                className="min-h-[100px] border-green-300 focus:border-green-500"
              />
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Beings Encountered</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={beings}
                onChange={(e) => setBeings(e.target.value)}
                placeholder="Did you meet any guides, spirits, or beings?"
                className="min-h-[100px] border-green-300 focus:border-green-500"
              />
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/80 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Emotional Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={emotions}
              onChange={(e) => setEmotions(e.target.value)}
              placeholder="How did this journey affect you emotionally? What feelings came up?"
              className="min-h-[100px] border-green-300 focus:border-green-500"
            />
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 px-8"
          disabled={!reflection.trim()}
        >
          <Save className="w-4 h-4 mr-2" />
          Save to Journal
        </Button>
        
        <Button
          onClick={handleShareToCommunity}
          variant="outline"
          className="border-green-300 text-green-700 hover:bg-green-50 px-8"
          disabled={!reflection.trim()}
        >
          <Share className="w-4 h-4 mr-2" />
          Share with Community
        </Button>
        
        <Button
          onClick={onComplete}
          variant="outline"
          className="border-green-300 text-green-700 hover:bg-green-50"
        >
          Return to Dashboard
        </Button>
      </div>

      {/* Grounding Reminder */}
      <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Leaf className="w-6 h-6 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">Grounding Reminder</h4>
              <p className="text-green-700 text-sm">
                Take a moment to ground yourself. Feel your connection to the Earth. 
                Drink water and eat something if needed. Honor your journey experience.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JourneyReflection;
