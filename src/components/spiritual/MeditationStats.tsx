import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Target, Award } from "lucide-react";
import { meditationService, MeditationStats as StatsType } from '@/services/meditationService';

export const MeditationStats: React.FC = () => {
  const [stats, setStats] = useState<StatsType>({
    totalSessions: 0,
    totalMinutes: 0,
    currentStreak: 0,
    longestStreak: 0,
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const userStats = await meditationService.getUserStats();
      setStats(userStats);
    } catch (error) {
      console.error('Error loading meditation stats:', error);
      // Keep default stats on error
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-black/30 border-purple-500/30 backdrop-blur-sm animate-pulse">
            <CardContent className="p-4 text-center">
              <div className="h-8 bg-purple-400/20 rounded mb-2"></div>
              <div className="h-4 bg-purple-400/10 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getStreakBadge = (streak: number) => {
    if (streak >= 30) return { color: "bg-yellow-500", text: "Master" };
    if (streak >= 14) return { color: "bg-purple-500", text: "Dedicated" };
    if (streak >= 7) return { color: "bg-green-500", text: "Consistent" };
    if (streak >= 3) return { color: "bg-blue-500", text: "Building" };
    return { color: "bg-gray-500", text: "Starting" };
  };

  const streakBadge = getStreakBadge(stats.currentStreak);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-2xl font-bold text-white">{stats.totalMinutes}</span>
            </div>
            <div className="text-sm text-purple-200">Minutes Practiced</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-2xl font-bold text-white">{stats.totalSessions}</span>
            </div>
            <div className="text-sm text-purple-200">Total Sessions</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-orange-400 mr-2" />
              <span className="text-2xl font-bold text-white">{stats.currentStreak}</span>
            </div>
            <div className="text-sm text-purple-200">Current Streak</div>
            <Badge className={`${streakBadge.color} text-white text-xs mt-1`}>
              {streakBadge.text}
            </Badge>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-2xl font-bold text-white">{Math.round(stats.completionRate)}%</span>
            </div>
            <div className="text-sm text-purple-200">Completion Rate</div>
          </CardContent>
        </Card>
      </div>

      {stats.longestStreak > 0 && (
        <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-400" />
              Personal Best
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-1">
                {stats.longestStreak} days
              </div>
              <div className="text-purple-200 text-sm">
                Your longest meditation streak! Keep building consistency.
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
