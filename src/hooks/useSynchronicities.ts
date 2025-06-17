
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export interface Synchronicity {
  id: string;
  title: string;
  description: string;
  synchronicity_type: string;
  significance: number;
  tags: string[];
  meaning: string | null;
  date_occurred: string;
  created_at: string;
  updated_at: string;
}

export const useSynchronicities = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [synchronicities, setSynchronicities] = useState<Synchronicity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSynchronicities = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('synchronicities')
        .select('*')
        .eq('user_id', user.id)
        .order('date_occurred', { ascending: false });

      if (error) {
        console.error('Error fetching synchronicities:', error);
        throw error;
      }
      
      setSynchronicities(data || []);
    } catch (err: any) {
      console.error('Synchronicities fetch error:', err);
      setError(err.message || 'Failed to load synchronicities');
      toast({
        title: "Error Loading Synchronicities",
        description: "Could not load your synchronicities. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addSynchronicity = async (synchronicityData: {
    title: string;
    description: string;
    synchronicity_type: string;
    significance: number;
    tags: string[];
    meaning?: string;
    date_occurred: string;
  }) => {
    if (!user) {
      throw new Error('Must be logged in to save synchronicities');
    }

    try {
      const { error } = await supabase
        .from('synchronicities')
        .insert([{
          user_id: user.id,
          title: synchronicityData.title,
          description: synchronicityData.description,
          synchronicity_type: synchronicityData.synchronicity_type,
          significance: synchronicityData.significance,
          tags: synchronicityData.tags,
          meaning: synchronicityData.meaning || null,
          date_occurred: synchronicityData.date_occurred
        }]);

      if (error) {
        console.error('Error saving synchronicity:', error);
        throw error;
      }

      await fetchSynchronicities();
      
      toast({
        title: "Synchronicity Recorded",
        description: "Your synchronicity has been saved successfully",
      });
      
    } catch (error: any) {
      console.error('Error adding synchronicity:', error);
      toast({
        title: "Error Saving Synchronicity",
        description: error.message || "Failed to save your synchronicity",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateSynchronicity = async (id: string, updates: Partial<Synchronicity>) => {
    if (!user) {
      throw new Error('Must be logged in to update synchronicities');
    }

    try {
      const { error } = await supabase
        .from('synchronicities')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating synchronicity:', error);
        throw error;
      }

      await fetchSynchronicities();
      
      toast({
        title: "Synchronicity Updated",
        description: "Your synchronicity has been updated successfully",
      });
      
    } catch (error: any) {
      console.error('Error updating synchronicity:', error);
      toast({
        title: "Error Updating Synchronicity",
        description: error.message || "Failed to update your synchronicity",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteSynchronicity = async (id: string) => {
    if (!user) {
      throw new Error('Must be logged in to delete synchronicities');
    }

    try {
      const { error } = await supabase
        .from('synchronicities')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting synchronicity:', error);
        throw error;
      }

      await fetchSynchronicities();
      
      toast({
        title: "Synchronicity Deleted",
        description: "Your synchronicity has been deleted successfully",
      });
      
    } catch (error: any) {
      console.error('Error deleting synchronicity:', error);
      toast({
        title: "Error Deleting Synchronicity",
        description: error.message || "Failed to delete your synchronicity",
        variant: "destructive"
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchSynchronicities();
  }, [user]);

  return {
    synchronicities,
    loading,
    error,
    fetchSynchronicities,
    addSynchronicity,
    updateSynchronicity,
    deleteSynchronicity
  };
};
