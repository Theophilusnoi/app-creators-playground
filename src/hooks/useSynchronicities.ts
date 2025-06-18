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

  // Test database connection
  const testConnection = async () => {
    try {
      console.log('🔍 Testing database connection...');
      const { data, error } = await supabase.from('synchronicities').select('count').limit(1);
      if (error) {
        console.error('❌ Database connection test failed:', error);
        return false;
      }
      console.log('✅ Database connection test successful');
      return true;
    } catch (err) {
      console.error('❌ Database connection test error:', err);
      return false;
    }
  };

  const fetchSynchronicities = async () => {
    console.log('🔍 Fetching synchronicities...');
    console.log('👤 Current user:', user?.id || 'No user');
    
    if (!user) {
      console.log('⚠️ No user found, skipping fetch');
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Test connection first
      const connectionOk = await testConnection();
      if (!connectionOk) {
        throw new Error('Database connection failed');
      }
      
      console.log('📡 Executing query for user:', user.id);
      const { data, error } = await supabase
        .from('synchronicities')
        .select('*')
        .eq('user_id', user.id)
        .order('date_occurred', { ascending: false });

      if (error) {
        console.error('❌ Query error:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      console.log('✅ Query successful, records found:', data?.length || 0);
      console.log('📄 Data:', data);
      setSynchronicities(data || []);
    } catch (err: any) {
      console.error('💥 Fetch synchronicities error:', err);
      setError(err.message || 'Failed to load synchronicities');
      toast({
        title: "Error Loading Synchronicities",
        description: err.message || "Could not load your synchronicities. Please try again.",
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
    console.log('🚀 Starting addSynchronicity...');
    console.log('📝 Form data:', synchronicityData);
    console.log('👤 Current user:', user?.id || 'No user');

    // Authentication check
    if (!user) {
      const errorMsg = 'Must be logged in to save synchronicities';
      console.error('❌ Authentication error:', errorMsg);
      toast({
        title: "Authentication Required",
        description: errorMsg,
        variant: "destructive"
      });
      throw new Error(errorMsg);
    }

    // Validate required fields
    const requiredFields = ['title', 'description', 'synchronicity_type'];
    const missingFields = requiredFields.filter(field => !synchronicityData[field as keyof typeof synchronicityData]);
    
    if (missingFields.length > 0) {
      const errorMsg = `Missing required fields: ${missingFields.join(', ')}`;
      console.error('❌ Validation error:', errorMsg);
      toast({
        title: "Validation Error",
        description: errorMsg,
        variant: "destructive"
      });
      throw new Error(errorMsg);
    }

    try {
      console.log('📡 Inserting synchronicity...');
      
      const insertData = {
        user_id: user.id,
        title: synchronicityData.title.trim(),
        description: synchronicityData.description.trim(),
        synchronicity_type: synchronicityData.synchronicity_type,
        significance: synchronicityData.significance,
        tags: synchronicityData.tags,
        meaning: synchronicityData.meaning?.trim() || null,
        date_occurred: synchronicityData.date_occurred
      };

      console.log('📄 Insert data:', insertData);

      const { data, error } = await supabase
        .from('synchronicities')
        .insert([insertData])
        .select();

      if (error) {
        console.error('❌ Insert error:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('✅ Insert successful:', data);
      await fetchSynchronicities();
      
      toast({
        title: "Synchronicity Recorded",
        description: "Your synchronicity has been saved successfully",
      });
      
    } catch (error: any) {
      console.error('💥 Add synchronicity error:', error);
      const errorMessage = error.message || "Failed to save your synchronicity";
      toast({
        title: "Error Saving Synchronicity",
        description: errorMessage,
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
    console.log('🔄 useEffect triggered, user changed:', user?.id || 'No user');
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
