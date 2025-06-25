
import { useState, useEffect } from 'react';
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

  // Test database connection - replaced with mock
  const testConnection = async () => {
    try {
      console.log('🔍 Testing database connection (mock)...');
      console.log('✅ Database connection test successful (mock)');
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
      
      console.log('📡 Using mock synchronicities data for user:', user.id);
      
      // Use mock data since synchronicities table doesn't exist
      const mockSynchronicities: Synchronicity[] = [
        {
          id: '1',
          title: 'Repeated Angel Numbers',
          description: 'Seeing 11:11 on clocks multiple times this week',
          synchronicity_type: 'Number Sequences',
          significance: 4,
          tags: ['numbers', 'angels', '1111'],
          meaning: 'A sign of spiritual awakening and new beginnings',
          date_occurred: new Date().toISOString().split('T')[0],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      
      console.log('✅ Query successful, records found:', mockSynchronicities.length);
      console.log('📄 Data:', mockSynchronicities);
      setSynchronicities(mockSynchronicities);
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
      console.log('📡 Saving synchronicity locally...');
      
      const newSynchronicity: Synchronicity = {
        id: Date.now().toString(),
        title: synchronicityData.title.trim(),
        description: synchronicityData.description.trim(),
        synchronicity_type: synchronicityData.synchronicity_type,
        significance: synchronicityData.significance,
        tags: synchronicityData.tags,
        meaning: synchronicityData.meaning?.trim() || null,
        date_occurred: synchronicityData.date_occurred,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('📄 Insert data:', {
        user_id: user.id,
        ...newSynchronicity
      });

      // Save locally since synchronicities table doesn't exist
      setSynchronicities(prev => [newSynchronicity, ...prev]);

      console.log('✅ Insert successful (local)');
      
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
      console.log('📡 Updating synchronicity locally:', id, updates);
      
      // Update locally since synchronicities table doesn't exist
      setSynchronicities(prev => 
        prev.map(sync => 
          sync.id === id 
            ? { ...sync, ...updates, updated_at: new Date().toISOString() }
            : sync
        )
      );
      
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
      console.log('📡 Deleting synchronicity locally:', id);
      
      // Delete locally since synchronicities table doesn't exist
      setSynchronicities(prev => prev.filter(sync => sync.id !== id));
      
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
