
import React from 'react';
import { MeditationTimer } from './MeditationTimer';
import { MeditationStats } from './MeditationStats';

export const MeditationTracker = () => {
  return (
    <div className="space-y-6">
      <MeditationStats />
      <MeditationTimer />
    </div>
  );
};
