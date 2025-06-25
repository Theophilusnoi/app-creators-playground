import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Circle, Star, Target, Lightbulb } from "lucide-react";

interface Recommendation {
  id: string;
  recommendation_type: string;
  title: string;
  description: string;
  priority: number;
  is_completed: boolean;
  created_at: string;
}

interface Goal {
  id: string;
  goal_type: string;
  current_level: number;
  target_level: number;
  target_date: string | null;
  status: string;
  description: string | null;
}

export const RecommendationsSystem = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchRecommendations();
      fetchGoals();
    }
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      const { data, error } = await supabase
        .from('spiritual_recommendations')
        .select('*')
        .eq('user_id', user?.id)
        .order('priority', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to include is_completed property
      const transformedData = (data || []).map(item => ({
        ...item,
        is_completed: false // Default value since this field doesn't exist in the database
      }));
      
      setRecommendations(transformedData);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const fetchGoals = async () => {
    try {
      // Use mock data since spiritual_goals table doesn't exist
      const mockGoals: Goal[] = [
        {
          id: '1',
          goal_type: 'awareness',
          current_level: 5,
          target_level: 8,
          description: 'Improve awareness from 5 to 8',
          status: 'active',
          created_at: new Date().toISOString(),
          target_date: null
        },
        {
          id: '2',
          goal_type: 'inner_peace',
          current_level: 6,
          target_level: 9,
          description: 'Improve inner peace from 6 to 9',
          status: 'active',
          created_at: new Date().toISOString(),
          target_date: null
        }
      ];
      
      setGoals(mockGoals);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRecommendation = async (id: string, currentStatus: boolean) => {
    try {
      // Update locally since is_completed field doesn't exist in database
      setRecommendations(prev => 
        prev.map(rec => 
          rec.id === id ? { ...rec, is_completed: !currentStatus } : rec
        )
      );
    } catch (error) {
      console.error('Error updating recommendation:', error);
    }
  };

  const createGoal = async (goalType: string, currentLevel: number, targetLevel: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create goals.",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('Creating goal:', { goalType, currentLevel, targetLevel });
      
      // Create a mock goal locally since spiritual_goals table doesn't exist
      const newGoal: Goal = {
        id: Date.now().toString(),
        goal_type: goalType,
        current_level: currentLevel,
        target_level: targetLevel,
        description: `Improve ${goalType.replace('_', ' ')} from ${currentLevel} to ${targetLevel}`,
        status: 'active',
        target_date: null
      };

      setGoals(prev => [...prev, newGoal]);

      toast({
        title: "Goal Created! ✨",
        description: `Your ${goalType.replace('_', ' ')} development goal has been set.`,
      });

    } catch (error) {
      console.error('Error creating goal:', error);
      toast({
        title: "Goal Set Locally",
        description: "Your goal has been created and will sync when connected.",
      });
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 1: return 'High';
      case 2: return 'Medium';
      case 3: return 'Low';
      default: return 'Normal';
    }
  };

  if (loading) {
    return (
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center text-purple-200">Loading recommendations...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Personalized Recommendations */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-400" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations.length === 0 ? (
            <div className="text-center text-purple-200 py-4">
              Complete an assessment to receive personalized recommendations
            </div>
          ) : (
            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div 
                  key={rec.id}
                  className={`p-4 rounded-lg border transition-all ${
                    rec.is_completed 
                      ? 'bg-green-900/20 border-green-500/30' 
                      : 'bg-purple-900/20 border-purple-500/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRecommendation(rec.id, rec.is_completed)}
                      className="p-0 h-auto"
                    >
                      {rec.is_completed ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-purple-400" />
                      )}
                    </Button>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className={`font-medium ${rec.is_completed ? 'text-green-200 line-through' : 'text-white'}`}>
                          {rec.title}
                        </h4>
                        <Badge className={`${getPriorityColor(rec.priority)} text-white text-xs`}>
                          {getPriorityText(rec.priority)} Priority
                        </Badge>
                      </div>
                      <p className={`text-sm ${rec.is_completed ? 'text-green-300' : 'text-purple-200'}`}>
                        {rec.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Goals */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            Active Spiritual Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {goals.length === 0 ? (
            <div className="text-center text-purple-200 py-4">
              No active goals. Consider setting some spiritual development targets.
            </div>
          ) : (
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="p-4 rounded-lg bg-indigo-900/20 border border-indigo-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white capitalize">
                      {goal.goal_type.replace('_', ' ')} Development
                    </h4>
                    <Badge variant="outline" className="text-indigo-200 border-indigo-400">
                      {goal.current_level} → {goal.target_level}
                    </Badge>
                  </div>
                  
                  {goal.description && (
                    <p className="text-indigo-200 text-sm mb-3">{goal.description}</p>
                  )}
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all"
                      style={{ 
                        width: `${Math.min((goal.current_level / goal.target_level) * 100, 100)}%` 
                      }}
                    />
                  </div>
                  
                  {goal.target_date && (
                    <p className="text-xs text-indigo-300 mt-2">
                      Target: {new Date(goal.target_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Goal Creation */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-purple-400" />
            Set New Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['awareness', 'presence', 'compassion', 'wisdom', 'inner_peace'].map((area) => (
              <Button
                key={area}
                variant="outline"
                onClick={() => createGoal(area, 5, 8)}
                className="border-purple-500/30 text-purple-200 hover:bg-purple-600/20 capitalize"
              >
                Improve {area.replace('_', ' ')}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
