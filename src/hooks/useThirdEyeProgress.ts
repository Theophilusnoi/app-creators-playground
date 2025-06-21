
import { useState, useEffect } from 'react';

interface StageProgress {
  completed: boolean;
  duration: number;
  timestamp?: string;
  experiences?: string[];
}

interface ThirdEyeProgress {
  stageProgress: Record<number, StageProgress>;
  overallProgress: number;
  totalTime: number;
  milestones: string[];
  activationLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const useThirdEyeProgress = () => {
  const [progress, setProgress] = useState<ThirdEyeProgress>(() => {
    const saved = localStorage.getItem('thirdEyeProgress');
    return saved ? JSON.parse(saved) : {
      stageProgress: {},
      overallProgress: 0,
      totalTime: 0,
      milestones: [],
      activationLevel: 'Beginner'
    };
  });

  useEffect(() => {
    localStorage.setItem('thirdEyeProgress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (stageIndex: number, stageData: any) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      newProgress.stageProgress[stageIndex] = {
        completed: true,
        duration: stageData.duration,
        timestamp: stageData.timestamp,
        experiences: stageData.experiences || []
      };

      // Calculate overall progress
      const completedStages = Object.keys(newProgress.stageProgress).length;
      newProgress.overallProgress = (completedStages / 5) * 100;

      // Update total time
      newProgress.totalTime = Object.values(newProgress.stageProgress)
        .reduce((total, stage) => total + (stage.duration || 0), 0);

      // Update activation level and milestones
      if (newProgress.overallProgress >= 80 && !newProgress.milestones.includes('Advanced Practitioner')) {
        newProgress.activationLevel = 'Advanced';
        newProgress.milestones.push('Advanced Practitioner');
      } else if (newProgress.overallProgress >= 40 && !newProgress.milestones.includes('Intermediate Seeker')) {
        newProgress.activationLevel = 'Intermediate';
        newProgress.milestones.push('Intermediate Seeker');
      } else if (newProgress.overallProgress >= 20 && !newProgress.milestones.includes('Awakening Initiate')) {
        newProgress.milestones.push('Awakening Initiate');
      }

      return newProgress;
    });
  };

  const getMilestones = () => {
    const milestones = [
      { 
        name: 'First Activation', 
        description: 'Completed your first Third Eye practice session',
        unlocked: progress.overallProgress >= 20 
      },
      { 
        name: 'Intermediate Seeker', 
        description: 'Completed 40% of activation stages',
        unlocked: progress.overallProgress >= 40 
      },
      { 
        name: 'Advanced Practitioner', 
        description: 'Completed 80% of activation stages',
        unlocked: progress.overallProgress >= 80 
      },
      { 
        name: 'Ajna Master', 
        description: 'Completed all five activation stages',
        unlocked: progress.overallProgress >= 100 
      }
    ];

    return milestones;
  };

  return {
    progress,
    updateProgress,
    milestones: getMilestones()
  };
};
