
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Crown, Heart, Play, Pause, Volume2, VolumeX, 
  RefreshCw, Save, Star, BookOpen, Sparkles
} from 'lucide-react';

interface Affirmation {
  id: string;
  affirmation_text: string;
  category: string;
  usage_count: number;
  effectiveness_rating?: number;
  is_favorite: boolean;
}

const AFFIRMATION_CATEGORIES = [
  'general', 'career', 'business', 'investment', 
  'abundance', 'success', 'prosperity', 'money'
];

const SAMPLE_AFFIRMATIONS = {
  general: [
    "I am a magnet for abundance and prosperity flows to me effortlessly",
    "Money comes to me easily and frequently from multiple sources",
    "I deserve to be wealthy and financially free"
  ],
  career: [
    "I attract the perfect career opportunities that align with my purpose",
    "My skills and talents are highly valued and well compensated",
    "I am successful in all my professional endeavors"
  ],
  business: [
    "My business grows and prospers beyond my expectations",
    "I make smart business decisions that lead to massive profits",
    "Customers love my products and pay me generously"
  ],
  investment: [
    "I make wise investment choices that multiply my wealth",
    "Money I invest returns to me multiplied",
    "I have the knowledge and intuition to invest successfully"
  ]
};

export const WealthAffirmationGenerator: React.FC = () => {
  const [userGoal, setUserGoal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [savedAffirmations, setSavedAffirmations] = useState<Affirmation[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSavedAffirmations();
    generateDailyAffirmation();
  }, []);

  const fetchSavedAffirmations = async () => {
    try {
      const { data, error } = await supabase
        .from('wealth_affirmations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setSavedAffirmations(data || []);
    } catch (error) {
      console.error('Error fetching affirmations:', error);
    }
  };

  const generateDailyAffirmation = () => {
    const categoryAffirmations = SAMPLE_AFFIRMATIONS[selectedCategory as keyof typeof SAMPLE_AFFIRMATIONS];
    const randomAffirmation = categoryAffirmations[Math.floor(Math.random() * categoryAffirmations.length)];
    setCurrentAffirmation(randomAffirmation);
  };

  const generatePersonalizedAffirmation = async () => {
    if (!userGoal.trim()) {
      toast({
        title: "Please enter your goal",
        description: "Tell us what you want to manifest for a personalized affirmation",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    try {
      // In a real implementation, this would call an AI service
      // For now, we'll create a personalized affirmation based on the goal
      const personalizedAffirmation = `I am successfully manifesting ${userGoal.toLowerCase()} with ease and grace. The universe supports my ${selectedCategory} goals and I am worthy of this abundance.`;
      setCurrentAffirmation(personalizedAffirmation);
      
      toast({
        title: "✨ Personalized Affirmation Generated!",
        description: "Your custom affirmation is ready"
      });
    } catch (error) {
      console.error('Error generating affirmation:', error);
      toast({
        title: "Error",
        description: "Failed to generate personalized affirmation",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const saveAffirmation = async () => {
    if (!currentAffirmation.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('wealth_affirmations')
        .insert({
          affirmation_text: currentAffirmation,
          category: selectedCategory,
          personalization_data: { goal: userGoal }
        });

      if (error) throw error;

      toast({
        title: "💎 Affirmation Saved!",
        description: "Added to your personal collection"
      });

      fetchSavedAffirmations();
    } catch (error) {
      console.error('Error saving affirmation:', error);
      toast({
        title: "Error",
        description: "Failed to save affirmation",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (affirmationId: string, isFavorite: boolean) => {
    try {
      const { error } = await supabase
        .from('wealth_affirmations')
        .update({ is_favorite: !isFavorite })
        .eq('id', affirmationId);

      if (error) throw error;
      fetchSavedAffirmations();
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const rateEffectiveness = async (affirmationId: string, rating: number) => {
    try {
      const { error } = await supabase
        .from('wealth_affirmations')
        .update({ effectiveness_rating: rating })
        .eq('id', affirmationId);

      if (error) throw error;
      fetchSavedAffirmations();
      
      toast({
        title: "Thank you for your feedback!",
        description: "Your rating helps improve our recommendations"
      });
    } catch (error) {
      console.error('Error rating affirmation:', error);
    }
  };

  const playAffirmation = () => {
    if (!isMuted && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentAffirmation);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopAffirmation = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isPlaying) {
      stopAffirmation();
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Affirmation Display */}
      <Card className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-200 flex items-center gap-2 justify-center">
            <Crown className="w-6 h-6" />
            Your Affirmation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-black/20 p-6 rounded-lg border border-yellow-500/20">
            <p className="text-lg sm:text-xl font-medium text-yellow-100 leading-relaxed italic">
              "{currentAffirmation}"
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={isPlaying ? stopAffirmation : playAffirmation}
              className="bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-200 border border-yellow-500/30"
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? 'Stop' : 'Listen'}
            </Button>

            <Button
              onClick={toggleMute}
              variant="outline"
              className="border-yellow-500/30 text-yellow-200"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>

            <Button
              onClick={generateDailyAffirmation}
              variant="outline"
              className="border-yellow-500/30 text-yellow-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              New Affirmation
            </Button>

            <Button
              onClick={saveAffirmation}
              disabled={loading}
              className="bg-green-600/20 hover:bg-green-600/40 text-green-200 border border-green-500/30"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personalization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-200 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Personalize Your Affirmation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-purple-200 text-sm font-medium mb-2 block">
                What do you want to manifest?
              </label>
              <Input
                value={userGoal}
                onChange={(e) => setUserGoal(e.target.value)}
                placeholder="e.g., a successful business, dream job, financial freedom..."
                className="bg-black/20 border-purple-500/30 text-purple-100"
              />
            </div>

            <div>
              <label className="text-purple-200 text-sm font-medium mb-2 block">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-black/20 border border-purple-500/30 text-purple-100 rounded-md px-3 py-2"
              >
                {AFFIRMATION_CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={generatePersonalizedAffirmation}
              disabled={generating}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Crown className="w-4 h-4 mr-2" />
              {generating ? 'Generating...' : 'Generate Personal Affirmation'}
            </Button>
          </CardContent>
        </Card>

        {/* Quick Categories */}
        <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-200 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Quick Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {AFFIRMATION_CATEGORIES.map(category => (
                <Button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    generateDailyAffirmation();
                  }}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Affirmations */}
      <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-200 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Your Saved Affirmations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {savedAffirmations.length === 0 ? (
            <p className="text-green-300 text-center py-8">No affirmations saved yet. Save your first affirmation above!</p>
          ) : (
            <div className="space-y-4">
              {savedAffirmations.map((affirmation) => (
                <div key={affirmation.id} className="bg-black/20 p-4 rounded border border-green-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="border-green-500/30 text-green-300">
                      {affirmation.category}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleFavorite(affirmation.id, affirmation.is_favorite)}
                      className={affirmation.is_favorite ? 'text-yellow-400' : 'text-gray-400'}
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-green-200 mb-3 italic">"{affirmation.affirmation_text}"</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-green-400">
                      Used {affirmation.usage_count} times
                    </div>
                    
                    {!affirmation.effectiveness_rating && (
                      <div className="flex gap-1">
                        <span className="text-xs text-green-400 mr-2">Rate effectiveness:</span>
                        {[1, 2, 3, 4, 5].map(rating => (
                          <Button
                            key={rating}
                            size="sm"
                            variant="ghost"
                            onClick={() => rateEffectiveness(affirmation.id, rating)}
                            className="text-yellow-400 hover:text-yellow-300 p-1"
                          >
                            <Star className="w-3 h-3" />
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
