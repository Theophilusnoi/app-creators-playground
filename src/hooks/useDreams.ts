
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
    console.log('Starting dream analysis for:', dreamId);
    
    if (!user) {
      console.error('No user found for dream analysis');
      throw new Error('Must be logged in to analyze dreams');
    }

    if (!content || content.trim().length === 0) {
      console.error('Empty dream content provided');
      throw new Error('Dream content cannot be empty');
    }

    try {
      const systemPrompt = `You are a Jungian dream analyst with deep knowledge of symbolism, archetypes, and the collective unconscious. Analyze this dream and provide:

1. Key symbols and their meanings
2. Possible archetypal themes
3. Emotional/psychological insights
4. Guidance for the dreamer

Keep the analysis compassionate, insightful, and practical. Focus on personal growth and self-understanding. Provide a meaningful interpretation that helps the dreamer understand their subconscious mind.`;

      console.log('Calling Gemini API for dream analysis...');
      
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

      console.log('Gemini response received:', response);

      if (!response || !response.response || response.response.trim().length === 0) {
        throw new Error('Empty response from AI analysis service');
      }

      // Enhanced symbol detection
      const symbolWords = [
        'water', 'ocean', 'sea', 'river', 'lake', 'swimming', 'drowning', 'rain', 'flood',
        'flying', 'falling', 'floating', 'soaring', 'wings',
        'animal', 'animals', 'dog', 'cat', 'snake', 'bird', 'wolf', 'lion', 'bear', 'spider',
        'death', 'dying', 'dead', 'funeral', 'grave', 'cemetery', 'ghost',
        'house', 'home', 'building', 'room', 'door', 'window', 'stairs', 'basement', 'attic',
        'tree', 'forest', 'woods', 'garden', 'flower', 'plant', 'grass',
        'fire', 'flame', 'burning', 'smoke', 'explosion',
        'darkness', 'dark', 'shadow', 'night', 'black',
        'light', 'bright', 'sun', 'moon', 'star', 'white', 'gold',
        'mirror', 'reflection', 'glass', 'window',
        'car', 'driving', 'vehicle', 'journey', 'travel', 'road', 'path',
        'baby', 'child', 'children', 'birth', 'pregnancy',
        'wedding', 'marriage', 'bride', 'groom', 'kiss',
        'school', 'teacher', 'student', 'exam', 'test', 'classroom',
        'blood', 'wound', 'injury', 'healing', 'medicine',
        'money', 'gold', 'treasure', 'jewelry', 'wealth'
      ];
      
      const contentLower = content.toLowerCase();
      const detectedSymbols = symbolWords.filter(symbol => 
        contentLower.includes(symbol)
      );

      console.log('Detected symbols:', detectedSymbols);

      // Update the dream with analysis and detected symbols
      const { error: updateError } = await supabase
        .from('dreams')
        .update({ 
          analysis: response.response,
          symbols: detectedSymbols
        })
        .eq('id', dreamId)
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Error updating dream analysis:', updateError);
        throw updateError;
      }

      console.log('Dream analysis updated successfully');

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
        description: error.message || "Could not analyze your dream. Please try again.",
        variant: "destructive"
      });
      throw error;
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
        'water', 'ocean', 'sea', 'river', 'lake', 'rain',
        'flying', 'falling', 'floating', 'wings',
        'animal', 'animals', 'dog', 'cat', 'snake', 'bird',
        'death', 'dying', 'dead', 'ghost',
        'house', 'home', 'building', 'room', 'door',
        'tree', 'forest', 'woods', 'garden',
        'fire', 'flame', 'burning',
        'darkness', 'dark', 'shadow',
        'light', 'bright', 'sun', 'moon',
        'mirror', 'reflection',
        'car', 'driving', 'vehicle'
      ];
      
      const contentLower = dreamData.content.toLowerCase();
      const detectedSymbols = symbolWords.filter(symbol => 
        contentLower.includes(symbol)
      );

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
