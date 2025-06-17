
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { generateGeminiResponse } from '@/services/geminiService';

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
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDreams = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('dreams')
        .select('*')
        .eq('user_id', user.id)
        .order('dream_date', { ascending: false });

      if (error) throw error;
      setDreams(data || []);
    } catch (err: any) {
      setError(err.message);
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

      // Extract symbols from the analysis
      const symbolMatches = content.toLowerCase().match(/\b(water|flying|animals?|death|houses?|trees?|fire|darkness|light|mirrors?|doors?|stairs|snakes?|birds?|cats?|dogs?|ocean|mountains?|forests?|temples?|churches?)\b/g);
      const detectedSymbols = symbolMatches ? [...new Set(symbolMatches)] : [];

      // Update the dream with analysis and detected symbols
      const { error } = await supabase
        .from('dreams')
        .update({ 
          analysis: response.response,
          symbols: detectedSymbols
        })
        .eq('id', dreamId);

      if (error) throw error;

      // Refresh dreams to get updated data
      fetchDreams();
      
      return response.response;
    } catch (error: any) {
      console.error('Dream analysis error:', error);
      throw new Error('Failed to analyze dream');
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
    analyzeDream
  };
};
