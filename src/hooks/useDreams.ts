
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { generateGeminiResponse } from '@/services/geminiService';
import { useToast } from '@/hooks/use-toast';

export interface Dream {
  id: string;
  title: string;
  content: string;
  emotions: string[];
  symbols: string[];
  analysis: string | null;
  dream_date: string;
  created_at: string;
}

export const useDreams = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDreams = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('dreams')
        .select('*')
        .eq('user_id', user.id)
        .order('dream_date', { ascending: false });

      if (error) {
        console.error('Error fetching dreams:', error);
        throw error;
      }
      
      setDreams(data || []);
    } catch (err: any) {
      console.error('Dreams fetch error:', err);
      setError(err.message || 'Failed to load dreams');
      toast({
        title: "Error Loading Dreams",
        description: "Could not load your dreams. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const analyzeDream = async (dreamId: string, content: string) => {
    try {
      const systemPrompt = `You are a Jungian dream analyst with deep knowledge of symbolism, archetypes, and the collective unconscious. Analyze this dream and provide:

1. Key symbols and their meanings
2. Possible archetypal themes
3. Emotional/psychological insights
4. Guidance for the dreamer

Keep the analysis compassionate, insightful, and practical. Focus on personal growth and self-understanding.`;

      const response = await generateGeminiResponse({
        message: `Please analyze this dream: "${content}"`,
        systemPrompt,
        personality: {
          warmth_level: 8,
          wisdom_level: 9,
          compassion_level: 9,
          humor_level: 3,
          communication_style: 'gentle_wise'
        }
      });

      // Enhanced symbol detection
      const symbolWords = [
        'water', 'ocean', 'sea', 'river', 'lake', 'swimming', 'drowning',
        'flying', 'falling', 'floating', 'soaring',
        'animal', 'animals', 'dog', 'cat', 'snake', 'bird', 'wolf', 'lion',
        'death', 'dying', 'dead', 'funeral', 'grave', 'cemetery',
        'house', 'home', 'building', 'room', 'door', 'window',
        'tree', 'forest', 'woods', 'garden', 'flower', 'plant',
        'fire', 'flame', 'burning', 'smoke',
        'darkness', 'dark', 'shadow', 'night',
        'light', 'bright', 'sun', 'moon', 'star',
        'mirror', 'reflection', 'glass',
        'stairs', 'ladder', 'climbing', 'steps',
        'car', 'driving', 'vehicle', 'journey', 'travel',
        'baby', 'child', 'children', 'birth',
        'wedding', 'marriage', 'bride', 'groom',
        'school', 'teacher', 'student', 'exam', 'test'
      ];
      
      const symbolMatches = content.toLowerCase().match(
        new RegExp(`\\b(${symbolWords.join('|')})(s|es|ing|ed)?\\b`, 'g')
      );
      
      const detectedSymbols = symbolMatches ? [...new Set(symbolMatches)] : [];

      // Update the dream with analysis and detected symbols
      const { error } = await supabase
        .from('dreams')
        .update({ 
          analysis: response.response,
          symbols: detectedSymbols
        })
        .eq('id', dreamId)
        .eq('user_id', user!.id);

      if (error) {
        console.error('Error updating dream analysis:', error);
        throw error;
      }

      // Refresh dreams to get updated data
      await fetchDreams();
      
      toast({
        title: "Dream Analysis Complete",
        description: "Your dream has been analyzed and insights have been added.",
      });
      
      return response.response;
    } catch (error: any) {
      console.error('Dream analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze your dream. Please try again.",
        variant: "destructive"
      });
      throw new Error('Failed to analyze dream');
    }
  };

  const addDream = async (dreamData: {
    title: string;
    content: string;
    emotions: string[];
    dream_date: string;
  }) => {
    if (!user) {
      throw new Error('Must be logged in to save dreams');
    }

    try {
      // Basic symbol detection for new dreams
      const symbolWords = [
        'water', 'ocean', 'sea', 'river', 'lake',
        'flying', 'falling', 'floating',
        'animal', 'animals', 'dog', 'cat', 'snake', 'bird',
        'death', 'dying', 'dead',
        'house', 'home', 'building', 'room', 'door',
        'tree', 'forest', 'woods', 'garden',
        'fire', 'flame', 'burning',
        'darkness', 'dark', 'shadow',
        'light', 'bright', 'sun', 'moon',
        'mirror', 'reflection',
        'stairs', 'ladder', 'climbing',
        'car', 'driving', 'vehicle'
      ];
      
      const symbolMatches = dreamData.content.toLowerCase().match(
        new RegExp(`\\b(${symbolWords.join('|')})(s|es|ing|ed)?\\b`, 'g')
      );
      
      const detectedSymbols = symbolMatches ? [...new Set(symbolMatches)] : [];

      const { error } = await supabase
        .from('dreams')
        .insert([{
          user_id: user.id,
          title: dreamData.title,
          content: dreamData.content,
          emotions: dreamData.emotions,
          symbols: detectedSymbols,
          dream_date: dreamData.dream_date,
          analysis: null
        }]);

      if (error) {
        console.error('Error saving dream:', error);
        throw error;
      }

      await fetchDreams();
      
      toast({
        title: "Dream Saved",
        description: "Your dream has been recorded successfully",
      });
      
    } catch (error: any) {
      console.error('Error adding dream:', error);
      toast({
        title: "Error Saving Dream",
        description: error.message || "Failed to save your dream",
        variant: "destructive"
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchDreams();
  }, [user]);

  return {
    dreams,
    loading,
    error,
    fetchDreams,
    analyzeDream,
    addDream
  };
};
