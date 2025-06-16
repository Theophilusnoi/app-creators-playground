
import React from 'react';
import { MeditationTimer } from './MeditationTimer';
import { MeditationStats } from './MeditationStats';

export const MeditationTracker = () => {
  const handleMeditationComplete = () => {
    // Handle meditation completion - could trigger stats refresh or show completion message
    console.log('Meditation completed successfully');
  };

  return (
    <div className="space-y-6">
      <MeditationStats />
      <MeditationTimer onComplete={handleMeditationComplete} />
    </div>
  );
};
