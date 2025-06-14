
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from '@/components/auth/AuthProvider';
import { Trophy, Star, Target, Flame, Award, TrendingUp } from "lucide-react";

interface UserStreak {
  activity_type: string;
  current_streak: number;
  longest_streak: number;
  total_sessions: number;
  total_minutes: number;
  level_name: string;
  level_points: number;
  experience_points: number;
  badges_earned: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  badge_icon: string;
  points: number;
  unlocked: boolean;
  progress: number;
  max_progress: number;
}

export const GamificationDashboard = () => {
  const { user } = useAuth();
  const [streaks, setStreaks] = useState<UserStreak[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentLevel, setCurrentLevel] = useState('Novice');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadGamificationData();
    }
  }, [user]);

  const loadGamificationData = async () => {
    setLoading(true);
    
    try {
      // Mock data for demonstration
      const mockStreaks: UserStreak[] = [
        {
          activity_type: 'meditation',
          current_streak: 7,
          longest_streak: 15,
          total_sessions: 45,
          total_minutes: 1350,
          level_name: 'Seeker',
          level_points: 450,
          experience_points: 1250,
          badges_earned: ['first_meditation', 'week_warrior', 'mindful_minute']
        },
        {
          activity_type: 'journaling',
          current_streak: 3,
          longest_streak: 8,
          total_sessions: 12,
          total_minutes: 240,
          level_name: 'Novice',
          level_points: 120,
          experience_points: 300,
          badges_earned: ['first_journal']
        },
        {
          activity_type: 'overall',
          current_streak: 5,
          longest_streak: 12,
          total_sessions: 60,
          total_minutes: 1800,
          level_name: 'Seeker',
          level_points: 600,
          experience_points: 1650,
          badges_earned: ['daily_practice', 'consistency_champion']
        }
      ];

      const mockAchievements: Achievement[] = [
        {
          id: '1',
          title: 'First Steps',
          description: 'Complete your first meditation session',
          badge_icon: '🌱',
          points: 10,
          unlocked: true,
          progress: 1,
          max_progress: 1
        },
        {
          id: '2',
          title: 'Week Warrior',
          description: 'Maintain a 7-day meditation streak',
          badge_icon: '🔥',
          points: 50,
          unlocked: true,
          progress: 7,
          max_progress: 7
        },
        {
          id: '3',
          title: 'Mindful Month',
          description: 'Practice meditation for 30 consecutive days',
          badge_icon: '🏆',
          points: 200,
          unlocked: false,
          progress: 7,
          max_progress: 30
        },
        {
          id: '4',
          title: 'Wisdom Seeker',
          description: 'Complete 5 shadow work sessions',
          badge_icon: '🔮',
          points: 75,
          unlocked: false,
          progress: 2,
          max_progress: 5
        },
        {
          id: '5',
          title: 'Dream Walker',
          description: 'Log 10 dream experiences',
          badge_icon: '🌙',
          points: 60,
          unlocked: false,
          progress: 4,
          max_progress: 10
        },
        {
          id: '6',
          title: 'Community Builder',
          description: 'Join 3 community circles',
          badge_icon: '👥',
          points: 40,
          unlocked: false,
          progress: 1,
          max_progress: 3
        }
      ];

      setStreaks(mockStreaks);
      setAchievements(mockAchievements);
      setTotalPoints(1650);
      setCurrentLevel('Seeker');
      
    } catch (error) {
      console.error('Error loading gamification data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelProgress = () => {
    const levelThresholds = {
      'Novice': 0,
      'Seeker': 500,
      'Practitioner': 2000,
      'Sage': 5000,
      'Enlightened': 10000
    };
    
    const currentThreshold = levelThresholds[currentLevel as keyof typeof levelThresholds] || 0;
    const nextLevel = Object.entries(levelThresholds).find(([_, threshold]) => threshold > totalPoints);
    const nextThreshold = nextLevel ? nextLevel[1] : 10000;
    
    const progress = ((totalPoints - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    return { progress: Math.min(progress, 100), nextLevel: nextLevel?.[0] || 'Enlightened' };
  };

  const { progress: levelProgress, nextLevel } = getLevelProgress();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading progress...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Your Spiritual Journey</h2>
        <p className="text-purple-200">Track your progress and celebrate milestones</p>
      </div>

      {/* Level and Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Current Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-300">{currentLevel}</h3>
              <p className="text-sm text-gray-400">Next: {nextLevel}</p>
              <Progress value={levelProgress} className="mt-2" />
              <p className="text-xs text-gray-400 mt-1">{Math.round(levelProgress)}% to next level</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Total Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-yellow-400">{totalPoints.toLocaleString()}</h3>
              <p className="text-sm text-gray-400">Experience Points</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              Best Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-orange-400">
                {Math.max(...streaks.map(s => s.longest_streak))}
              </h3>
              <p className="text-sm text-gray-400">Days in a row</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Streaks */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Current Streaks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {streaks.map((streak) => (
              <div key={streak.activity_type} className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-white font-semibold capitalize mb-2">
                  {streak.activity_type.replace('_', ' ')}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Current Streak</span>
                    <span className="text-orange-400 font-bold">{streak.current_streak} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Sessions</span>
                    <span className="text-white">{streak.total_sessions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Time</span>
                    <span className="text-white">{Math.round(streak.total_minutes / 60)}h {streak.total_minutes % 60}m</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="w-5 h-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 ${
                  achievement.unlocked
                    ? 'bg-purple-900/30 border-purple-500'
                    : 'bg-gray-800/30 border-gray-600'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{achievement.badge_icon}</span>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">{achievement.description}</p>
                    
                    {!achievement.unlocked && (
                      <div className="mt-2">
                        <Progress 
                          value={(achievement.progress / achievement.max_progress) * 100} 
                          className="h-2"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          {achievement.progress}/{achievement.max_progress}
                        </p>
                      </div>
                    )}
                    
                    <Badge 
                      variant="outline" 
                      className={`mt-2 ${
                        achievement.unlocked 
                          ? 'border-yellow-400 text-yellow-400' 
                          : 'border-gray-500 text-gray-500'
                      }`}
                    >
                      {achievement.points} points
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
