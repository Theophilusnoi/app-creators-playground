
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface FireKeeperSession {
  id: string;
  session_type: string;
  duration: number;
  timestamp: string;
  level: string;
}

interface FireKeeperProgress {
  totalSessions: number;
  unlockedTraditions: string[];
  thirdEyeLevel: number;
  recentSessions: FireKeeperSession[];
}

export const useFireKeeperData = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<FireKeeperProgress>({
    totalSessions: 0,
    unlockedTraditions: [],
    thirdEyeLevel: 0,
    recentSessions: []
  });
  const [loading, setLoading] = useState(true);

  const loadProgress = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data: practices, error } = await supabase
        .from('spiritual_practices')
        .select('*')
        .eq('user_id', user.id)
        .eq('practice_type', 'fire_keeper_session')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading Fire Keeper progress:', error);
        return;
      }

      const sessions = practices || [];
      const totalSessions = sessions.length;
      
      // Calculate unlocked traditions based on progress
      const traditions = [];
      if (totalSessions >= 1) traditions.push('Fire Breathing Techniques');
      if (totalSessions >= 3) traditions.push('Solar Plexus Activation');
      if (totalSessions >= 6) traditions.push('Fire Element Meditation');
      if (totalSessions >= 10) traditions.push('Transformation Rituals');
      
      // Calculate third eye level (0-100)
      const thirdEyeLevel = Math.min(totalSessions * 8, 100);
      
      // Format recent sessions
      const recentSessions = sessions.slice(0, 5).map(session => ({
        id: session.id,
        session_type: session.practice_details?.session_type || 'Unknown',
        duration: session.practice_details?.duration || 20,
        timestamp: session.created_at || '',
        level: session.practice_details?.level || 'beginner'
      }));

      setProgress({
        totalSessions,
        unlockedTraditions: traditions,
        thirdEyeLevel,
        recentSessions
      });

    } catch (error) {
      console.error('Error loading Fire Keeper data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSession = async (sessionType: string, duration: number = 20, level: string = 'beginner') => {
    if (!user) return;

    try {
      const { error } = await supabase.from('spiritual_practices').insert({
        user_id: user.id,
        practice_type: 'fire_keeper_session',
        practice_details: {
          session_type: sessionType,
          duration,
          level,
          timestamp: new Date().toISOString()
        }
      });

      if (error) {
        console.error('Error adding Fire Keeper session:', error);
        return;
      }

      // Reload progress after adding session
      await loadProgress();
    } catch (error) {
      console.error('Error adding Fire Keeper session:', error);
    }
  };

  useEffect(() => {
    loadProgress();
  }, [user]);

  return {
    progress,
    loading,
    addSession,
    refreshProgress: loadProgress
  };
};
