
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Trophy, Star, Flame, Target, Award, TrendingUp } from "lucide-react";

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
  weekly_goal: number;
  monthly_goal: number;
}

export const GamificationDashboard = () => {
  const { user } = useAuth();
  const [streaks, setStreaks] = useState<UserStreak[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState('Novice');
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadGamificationData();
    }
  }, [user]);

  const loadGamificationData = async () => {
    if (!user) return;

    try {
      // Load user streaks
      const { data: streaksData } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id);

      if (streaksData && streaksData.length > 0) {
        setStreaks(streaksData);
        
        // Calculate total points and determine level
        const total = streaksData.reduce((sum, streak) => sum + streak.experience_points, 0);
        setTotalPoints(total);
        
        // Determine overall level
        const overallStreak = streaksData.find(s => s.activity_type === 'overall');
        if (overallStreak) {
          setLevel(overallStreak.level_name);
        }

        // Calculate weekly progress
        const thisWeekSessions = streaksData.reduce((sum, streak) => {
          // This would be calculated based on actual session data
          return sum + Math.min(streak.current_streak, 7);
        }, 0);
        setWeeklyProgress((thisWeekSessions / 7) * 100);

        // Collect all badges
        const allBadges = streaksData.flatMap(s => s.badges_earned || []);
        setAchievements([...new Set(allBadges)]);
      } else {
        // Initialize default streak for new users
        await initializeUserStreaks();
      }

    } catch (error) {
      console.error('Error loading gamification data:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializeUserStreaks = async () => {
    if (!user) return;

    const defaultStreaks = [
      { activity_type: 'meditation', weekly_goal: 7, monthly_goal: 30 },
      { activity_type: 'journaling', weekly_goal: 5, monthly_goal: 20 },
      { activity_type: 'assessment', weekly_goal: 1, monthly_goal: 4 },
      { activity_type: 'overall', weekly_goal: 10, monthly_goal: 50 }
    ];

    try {
      const { data } = await supabase
        .from('user_streaks')
        .insert(
          defaultStreaks.map(streak => ({
            user_id: user.id,
            ...streak
          }))
        )
        .select();

      if (data) {
        setStreaks(data);
      }
    } catch (error) {
      console.error('Error initializing streaks:', error);
    }
  };

  const updateStreak = async (activityType: string, sessionMinutes: number = 0) => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('user_streaks')
        .upsert({
          user_id: user.id,
          activity_type: activityType,
          last_activity_date: today,
          total_sessions: 1, // This would increment in a real implementation
          total_minutes: sessionMinutes,
          experience_points: 10 // Base points per session
        })
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setStreaks(prev => 
        prev.map(s => 
          s.activity_type === activityType ? data : s
        )
      );

    } catch (error) {
      console.error('Error updating streak:', error);
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

    const currentThreshold = levelThresholds[level as keyof typeof levelThresholds] || 0;
    const nextLevel = Object.keys(levelThresholds).find(l => levelThresholds[l as keyof typeof levelThresholds] > totalPoints);
    const nextThreshold = nextLevel ? levelThresholds[nextLevel as keyof typeof levelThresholds] : 10000;

    return ((totalPoints - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  };

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'meditation': return '🧘';
      case 'journaling': return '📝';
      case 'assessment': return '📊';
      case 'shadow_work': return '🌑';
      case 'dream_analysis': return '💭';
      default: return '✨';
    }
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-purple-400';
    if (streak >= 14) return 'text-blue-400';
    if (streak >= 7) return 'text-green-400';
    if (streak >= 3) return 'text-yellow-400';
    return 'text-gray-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading your progress...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-400/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
            Spiritual Level: {level}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-purple-200">Experience Points</span>
              <span className="text-yellow-400 font-semibold">{totalPoints.toLocaleString()}</span>
            </div>
            <Progress value={getLevelProgress()} className="h-3" />
            <div className="text-center">
              <Badge variant="outline" className="border-purple-400 text-purple-200">
                {Math.round(getLevelProgress())}% to next level
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-400" />
            This Week's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={weeklyProgress} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="text-purple-200">Weekly Goal</span>
              <span className="text-green-400">{Math.round(weeklyProgress)}% Complete</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Streaks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {streaks.map((streak) => (
          <Card key={streak.activity_type} className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{getActivityIcon(streak.activity_type)}</span>
                <Flame className={`w-5 h-5 ${getStreakColor(streak.current_streak)}`} />
              </div>
              <CardTitle className="text-white text-sm capitalize">
                {streak.activity_type.replace('_', ' ')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getStreakColor(streak.current_streak)}`}>
                    {streak.current_streak}
                  </div>
                  <div className="text-xs text-purple-300">Current Streak</div>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-purple-300">Best:</span>
                  <span className="text-white">{streak.longest_streak}</span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-purple-300">Total:</span>
                  <span className="text-white">{streak.total_sessions}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievements */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-400" />
            Achievements ({achievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievements.length > 0 ? (
              achievements.map((badge, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-2">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs text-purple-200">{badge}</div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-purple-300">
                <Star className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Complete activities to earn your first badges!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
            Boost Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button 
              onClick={() => updateStreak('meditation', 10)}
              className="p-3 bg-purple-600/30 rounded-lg hover:bg-purple-600/50 transition-colors"
            >
              <div className="text-center">
                <div className="text-xl mb-1">🧘</div>
                <div className="text-xs text-white">Meditate</div>
              </div>
            </button>
            
            <button 
              onClick={() => updateStreak('journaling', 15)}
              className="p-3 bg-purple-600/30 rounded-lg hover:bg-purple-600/50 transition-colors"
            >
              <div className="text-center">
                <div className="text-xl mb-1">📝</div>
                <div className="text-xs text-white">Journal</div>
              </div>
            </button>
            
            <button 
              onClick={() => updateStreak('shadow_work', 20)}
              className="p-3 bg-purple-600/30 rounded-lg hover:bg-purple-600/50 transition-colors"
            >
              <div className="text-center">
                <div className="text-xl mb-1">🌑</div>
                <div className="text-xs text-white">Shadow Work</div>
              </div>
            </button>
            
            <button 
              onClick={() => updateStreak('assessment', 5)}
              className="p-3 bg-purple-600/30 rounded-lg hover:bg-purple-600/50 transition-colors"
            >
              <div className="text-center">
                <div className="text-xl mb-1">📊</div>
                <div className="text-xs text-white">Assessment</div>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
