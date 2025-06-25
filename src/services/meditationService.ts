
// Meditation service with local data storage since meditation_sessions table doesn't exist

export interface MeditationSession {
  id: string;
  user_id: string;
  type: string;
  duration: number;
  completed: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

class MeditationService {
  private sessions: MeditationSession[] = [];

  async getUserSessions(userId: string): Promise<MeditationSession[]> {
    try {
      console.log('📡 Fetching meditation sessions locally for user:', userId);
      
      // Use mock data since meditation_sessions table doesn't exist
      const mockSessions: MeditationSession[] = [
        {
          id: '1',
          user_id: userId,
          type: 'Mindfulness',
          duration: 600, // 10 minutes in seconds
          completed: true,
          notes: 'Felt very peaceful and centered',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      
      this.sessions = mockSessions;
      console.log('✅ Meditation sessions loaded locally:', mockSessions);
      return mockSessions;
    } catch (error) {
      console.error('Error fetching meditation sessions:', error);
      throw error;
    }
  }

  async createSession(sessionData: Omit<MeditationSession, 'id' | 'created_at' | 'updated_at'>): Promise<MeditationSession> {
    try {
      console.log('📡 Creating meditation session locally:', sessionData);
      
      const newSession: MeditationSession = {
        id: Date.now().toString(),
        ...sessionData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Save locally since meditation_sessions table doesn't exist
      this.sessions.push(newSession);
      console.log('✅ Meditation session created locally:', newSession);
      
      return newSession;
    } catch (error) {
      console.error('Error creating meditation session:', error);
      throw error;
    }
  }

  async updateSession(id: string, updates: Partial<MeditationSession>): Promise<MeditationSession> {
    try {
      console.log('📡 Updating meditation session locally:', id, updates);
      
      const sessionIndex = this.sessions.findIndex(s => s.id === id);
      if (sessionIndex === -1) {
        throw new Error('Session not found');
      }
      
      const updatedSession = {
        ...this.sessions[sessionIndex],
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      this.sessions[sessionIndex] = updatedSession;
      console.log('✅ Meditation session updated locally:', updatedSession);
      
      return updatedSession;
    } catch (error) {
      console.error('Error updating meditation session:', error);
      throw error;
    }
  }

  async deleteSession(id: string): Promise<void> {
    try {
      console.log('📡 Deleting meditation session locally:', id);
      
      this.sessions = this.sessions.filter(s => s.id !== id);
      console.log('✅ Meditation session deleted locally');
    } catch (error) {
      console.error('Error deleting meditation session:', error);
      throw error;
    }
  }
}

export const meditationService = new MeditationService();
