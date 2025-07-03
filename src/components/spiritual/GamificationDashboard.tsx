
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
    } else {
      // Set loading to false if no user to prevent infinite loading
      setLoading(false);
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
          title: '🏛️ Foundation Stone',
          description: 'Begin your sacred temple building journey - first meditation session',
          badge_icon: '🌱',
          points: 10,
          unlocked: true,
          progress: 1,
          max_progress: 1
        },
        {
          id: '2',
          title: '🔥 Root Awakening',
          description: 'Complete Days 1-7: The Root Awakening phase of Temple Building',
          badge_icon: '🕉️',
          points: 77,
          unlocked: true,
          progress: 7,
          max_progress: 7
        },
        {
          id: '3',
          title: '✨ Sacred Architect',
          description: 'Reach Day 21: Clarity & Communication mastery in temple consciousness',
          badge_icon: '🏛️',
          points: 333,
          unlocked: false,
          progress: 7,
          max_progress: 21
        },
        {
          id: '4',
          title: '🌙 Shadow Temple Keeper',
          description: 'Complete 7 shadow work sessions - master the dark temple chambers',
          badge_icon: '🔮',
          points: 108,
          unlocked: false,
          progress: 2,
          max_progress: 7
        },
        {
          id: '5',
          title: '💫 Dream Temple Walker',
          description: 'Navigate 13 dream experiences - unlock astral temple access',
          badge_icon: '🌙',
          points: 144,
          unlocked: false,
          progress: 4,
          max_progress: 13
        },
        {
          id: '6',
          title: '🙏 Temple Community Master',
          description: 'Unite 7 sacred souls in temple building circles',
          badge_icon: '👥',
          points: 222,
          unlocked: false,
          progress: 1,
          max_progress: 7
        },
        {
          id: '7',
          title: '🎭 Cosmic Timing Initiate',
          description: 'Align 5 practices with astrological sacred timing',
          badge_icon: '🌟',
          points: 555,
          unlocked: false,
          progress: 0,
          max_progress: 5
        },
        {
          id: '8',
          title: '👑 Temple Master Builder',
          description: 'Complete the full 50-Day Temple Activation Journey',
          badge_icon: '👑',
          points: 1111,
          unlocked: false,
          progress: 7,
          max_progress: 50
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
      '🌱 Foundation Builder': 0,
      '🔥 Temple Initiate': 500,
      '🏛️ Sacred Architect': 2000,
      '✨ Temple Master': 5000,
      '👑 Divine Consciousness': 10000
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
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-purple-400/10 to-pink-400/10 rounded-lg animate-pulse"></div>
        <div className="relative z-10 p-6">
          <h2 className="text-4xl font-bold text-white mb-2">🏛️ Temple Builder's Progress</h2>
          <p className="text-purple-200 text-xl mb-3">Your 50-Day Sacred Awakening Journey</p>
          <div className="bg-gradient-to-r from-yellow-900/30 to-purple-900/30 rounded-lg p-4 mb-4">
            <p className="text-yellow-200 font-medium">🕉️ Sacred Architect Status</p>
            <p className="text-purple-300 text-sm italic">
              "Each practice builds your temple of consciousness, each milestone awakens divine potential"
            </p>
          </div>
        </div>
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
