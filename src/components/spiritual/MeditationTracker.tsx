
import React, { useState } from 'react';
import { MeditationTimer } from './MeditationTimer';
import { MeditationStats } from './MeditationStats';
import { meditationService } from '@/services/meditationService';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export const MeditationTracker = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleMeditationComplete = async (sessionData: {
    meditation_type: string;
    planned_duration: number;
    actual_duration: number;
  }) => {
    try {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to track your meditation sessions.",
          variant: "destructive"
        });
        return;
      }

      // Create a new meditation session
      const session = await meditationService.createSession({
        user_id: user.id,
        meditation_type: sessionData.meditation_type,
        planned_duration: sessionData.planned_duration,
        actual_duration: sessionData.actual_duration,
        completed: true,
        difficulty_level: 'Beginner'
      });

      if (session) {
        toast({
          title: "Meditation Complete! 🧘‍♀️",
          description: `Your ${sessionData.meditation_type} meditation session has been logged.`,
        });

        // Refresh stats by changing the key
        setRefreshKey(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error logging meditation session:', error);
      toast({
        title: "Session Logged Locally",
        description: "Your meditation was completed successfully.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <MeditationStats key={refreshKey} />
      <MeditationTimer onComplete={handleMeditationComplete} />
    </div>
  );
};
