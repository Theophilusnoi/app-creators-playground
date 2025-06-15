
import { supabase } from '@/integrations/supabase/client';

export interface MeditationSession {
  id?: string;
  user_id?: string;
  meditation_type: string;
  planned_duration: number;
  actual_duration?: number;
  completed: boolean;
  created_at?: string;
  completed_at?: string;
  notes?: string;
  difficulty_level: string;
}

export interface MeditationStats {
  totalSessions: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
}

class MeditationService {
  async createSession(sessionData: Omit<MeditationSession, 'id' | 'user_id' | 'created_at'>): Promise<MeditationSession | null> {
    try {
      const { data, error } = await supabase
        .from('meditation_sessions')
        .insert([{
          ...sessionData,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating meditation session:', error);
      return null;
    }
  }

  async completeSession(sessionId: string, actualDuration: number, notes?: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('meditation_sessions')
        .update({
          completed: true,
          actual_duration: actualDuration,
          completed_at: new Date().toISOString(),
          notes
        })
        .eq('id', sessionId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error completing meditation session:', error);
      return false;
    }
  }

  async getUserStats(): Promise<MeditationStats> {
    try {
      const { data: sessions, error } = await supabase
        .from('meditation_sessions')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const completedSessions = sessions?.filter(s => s.completed) || [];
      const totalMinutes = completedSessions.reduce((sum, s) => sum + (s.actual_duration || 0), 0);
      
      // Calculate streak
      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;
      
      const today = new Date();
      const sortedSessions = [...completedSessions].reverse();
      
      for (let i = 0; i < sortedSessions.length; i++) {
        const sessionDate = new Date(sortedSessions[i].created_at!);
        const daysDiff = Math.floor((today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff <= 1) {
          tempStreak++;
          if (i === sortedSessions.length - 1 || daysDiff === 0) {
            currentStreak = tempStreak;
          }
        } else {
          tempStreak = 0;
        }
        
        longestStreak = Math.max(longestStreak, tempStreak);
      }

      return {
        totalSessions: sessions?.length || 0,
        totalMinutes,
        currentStreak,
        longestStreak,
        completionRate: sessions?.length ? (completedSessions.length / sessions.length) * 100 : 0
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return {
        totalSessions: 0,
        totalMinutes: 0,
        currentStreak: 0,
        longestStreak: 0,
        completionRate: 0
      };
    }
  }

  async getRecentSessions(limit: number = 10): Promise<MeditationSession[]> {
    try {
      const { data, error } = await supabase
        .from('meditation_sessions')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching recent sessions:', error);
      return [];
    }
  }
}

export const meditationService = new MeditationService();
