
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { TrendingUp, Award, Target } from "lucide-react";

interface Assessment {
  id: string;
  created_at: string;
  awareness: number;
  presence: number;
  compassion: number;
  wisdom: number;
  inner_peace: number;
  overall_score: number;
  spiritual_level: string;
}

export const ProgressVisualization = () => {
  const { user } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAssessments();
    }
  }, [user]);

  const fetchAssessments = async () => {
    try {
      const { data, error } = await supabase
        .from('spiritual_assessments')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setAssessments(data || []);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center text-purple-200">Loading your spiritual progress...</div>
        </CardContent>
      </Card>
    );
  }

  if (assessments.length === 0) {
    return (
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center text-purple-200">
            Complete your first assessment to see your progress visualization
          </div>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for line chart
  const progressData = assessments.map((assessment, index) => ({
    assessment: `Assessment ${index + 1}`,
    date: new Date(assessment.created_at).toLocaleDateString(),
    awareness: assessment.awareness,
    presence: assessment.presence,
    compassion: assessment.compassion,
    wisdom: assessment.wisdom,
    inner_peace: assessment.inner_peace,
    overall: Number(assessment.overall_score)
  }));

  // Prepare data for radar chart (latest assessment)
  const latestAssessment = assessments[assessments.length - 1];
  const radarData = [
    { subject: 'Awareness', A: latestAssessment.awareness, fullMark: 10 },
    { subject: 'Presence', A: latestAssessment.presence, fullMark: 10 },
    { subject: 'Compassion', A: latestAssessment.compassion, fullMark: 10 },
    { subject: 'Wisdom', A: latestAssessment.wisdom, fullMark: 10 },
    { subject: 'Inner Peace', A: latestAssessment.inner_peace, fullMark: 10 }
  ];

  const improvement = assessments.length > 1 
    ? Number(latestAssessment.overall_score) - Number(assessments[0].overall_score)
    : 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {Number(latestAssessment.overall_score).toFixed(1)}
            </div>
            <div className="text-purple-200 text-sm">Current Overall Score</div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white capitalize">
              {latestAssessment.spiritual_level}
            </div>
            <div className="text-purple-200 text-sm">Spiritual Level</div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className={`text-2xl font-bold ${improvement >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {improvement >= 0 ? '+' : ''}{improvement.toFixed(1)}
            </div>
            <div className="text-purple-200 text-sm">Total Improvement</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Over Time Chart */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Spiritual Progress Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="assessment" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                domain={[0, 10]}
                stroke="#9CA3AF"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '6px',
                  color: '#F3F4F6'
                }}
              />
              <Line type="monotone" dataKey="overall" stroke="#8B5CF6" strokeWidth={3} name="Overall Score" />
              <Line type="monotone" dataKey="awareness" stroke="#10B981" strokeWidth={2} name="Awareness" />
              <Line type="monotone" dataKey="presence" stroke="#F59E0B" strokeWidth={2} name="Presence" />
              <Line type="monotone" dataKey="compassion" stroke="#EF4444" strokeWidth={2} name="Compassion" />
              <Line type="monotone" dataKey="wisdom" stroke="#3B82F6" strokeWidth={2} name="Wisdom" />
              <Line type="monotone" dataKey="inner_peace" stroke="#06B6D4" strokeWidth={2} name="Inner Peace" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Current State Radar Chart */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Current Spiritual Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 10]}
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
              />
              <Radar 
                name="Scores" 
                dataKey="A" 
                stroke="#8B5CF6" 
                fill="#8B5CF6" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
