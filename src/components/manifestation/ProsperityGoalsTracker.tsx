
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Target, Plus, TrendingUp, DollarSign, Calendar, 
  CheckCircle, Clock, AlertCircle, Edit3, Trash2
} from 'lucide-react';

interface ProsperityGoal {
  id: string;
  goal_title: string;
  goal_description?: string;
  goal_category: string;
  target_amount?: number;
  current_amount: number;
  target_date?: string;
  priority_level: string;
  status: string;
  milestones: any[];
  action_steps: any[];
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

const GOAL_CATEGORIES = [
  'income', 'savings', 'debt_reduction', 'investment', 'business', 'career'
];

const PRIORITY_LEVELS = [
  'low', 'medium', 'high', 'urgent'
];

export const ProsperityGoalsTracker: React.FC = () => {
  const [goals, setGoals] = useState<ProsperityGoal[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [newGoal, setNewGoal] = useState({
    goal_title: '',
    goal_description: '',
    goal_category: 'income',
    target_amount: 0,
    current_amount: 0,
    target_date: '',
    priority_level: 'medium'
  });
  const { toast } = useToast();

  useEffect(() => {
    getCurrentUser();
    fetchGoals();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUser(user.id);
    }
  };

  const fetchGoals = async () => {
    try {
      const { data, error } = await supabase
        .from('prosperity_goals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to handle JSONB fields
      const transformedData = (data || []).map(goal => ({
        ...goal,
        milestones: Array.isArray(goal.milestones) ? goal.milestones : [],
        action_steps: Array.isArray(goal.action_steps) ? goal.action_steps : []
      }));
      
      setGoals(transformedData);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const addGoal = async () => {
    if (!newGoal.goal_title.trim() || !currentUser) {
      toast({
        title: "Missing Information",
        description: "Please fill in the goal title",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('prosperity_goals')
        .insert({
          goal_title: newGoal.goal_title,
          goal_description: newGoal.goal_description,
          goal_category: newGoal.goal_category,
          target_amount: newGoal.target_amount,
          current_amount: newGoal.current_amount,
          target_date: newGoal.target_date || null,
          priority_level: newGoal.priority_level,
          user_id: currentUser
        });

      if (error) throw error;

      toast({
        title: "🎯 Goal Added!",
        description: "Your prosperity goal has been created"
      });

      setNewGoal({
        goal_title: '',
        goal_description: '',
        goal_category: 'income',
        target_amount: 0,
        current_amount: 0,
        target_date: '',
        priority_level: 'medium'
      });
      setShowAddForm(false);
      fetchGoals();
    } catch (error) {
      console.error('Error adding goal:', error);
      toast({
        title: "Error",
        description: "Failed to add goal",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateGoalProgress = async (goalId: string, newAmount: number) => {
    try {
      const { error } = await supabase
        .from('prosperity_goals')
        .update({ current_amount: newAmount })
        .eq('id', goalId);

      if (error) throw error;
      fetchGoals();
      
      toast({
        title: "Progress Updated!",
        description: "Your goal progress has been saved"
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const completeGoal = async (goalId: string) => {
    try {
      const { error } = await supabase
        .from('prosperity_goals')
        .update({ 
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', goalId);

      if (error) throw error;
      fetchGoals();
      
      toast({
        title: "🎉 Goal Completed!",
        description: "Congratulations on achieving your prosperity goal!"
      });
    } catch (error) {
      console.error('Error completing goal:', error);
    }
  };

  const deleteGoal = async (goalId: string) => {
    try {
      const { error } = await supabase
        .from('prosperity_goals')
        .delete()
        .eq('id', goalId);

      if (error) throw error;
      fetchGoals();
      
      toast({
        title: "Goal Deleted",
        description: "Goal has been removed"
      });
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const calculateProgress = (current: number, target: number) => {
    if (!target) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-400 border-red-500/30';
      case 'high': return 'text-orange-400 border-orange-500/30';
      case 'medium': return 'text-yellow-400 border-yellow-500/30';
      case 'low': return 'text-green-400 border-green-500/30';
      default: return 'text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600/20 text-green-200 border-green-500/30';
      case 'active': return 'bg-blue-600/20 text-blue-200 border-blue-500/30';
      case 'paused': return 'bg-yellow-600/20 text-yellow-200 border-yellow-500/30';
      case 'cancelled': return 'bg-red-600/20 text-red-200 border-red-500/30';
      default: return 'bg-gray-600/20 text-gray-200 border-gray-500/30';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const activeGoals = goals.filter(goal => goal.status === 'active');
  const completedGoals = goals.filter(goal => goal.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-blue-200 text-sm">Active Goals</p>
                <p className="text-2xl font-bold text-blue-100">{activeGoals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-green-200 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-100">{completedGoals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-yellow-200 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-yellow-100">
                  {goals.length > 0 ? Math.round((completedGoals.length / goals.length) * 100) : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Goal Button */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-purple-200 font-medium">Ready to set a new prosperity goal?</h3>
              <p className="text-purple-300 text-sm">Create specific, measurable wealth-building objectives</p>
            </div>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Goal Form */}
      {showAddForm && (
        <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-200 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Create New Prosperity Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-indigo-200 text-sm font-medium mb-2 block">
                  Goal Title
                </label>
                <Input
                  value={newGoal.goal_title}
                  onChange={(e) => setNewGoal({...newGoal, goal_title: e.target.value})}
                  placeholder="Save $10,000 for emergency fund"
                  className="bg-black/20 border-indigo-500/30 text-indigo-100"
                />
              </div>

              <div>
                <label className="text-indigo-200 text-sm font-medium mb-2 block">
                  Category
                </label>
                <select
                  value={newGoal.goal_category}
                  onChange={(e) => setNewGoal({...newGoal, goal_category: e.target.value})}
                  className="w-full bg-black/20 border border-indigo-500/30 text-indigo-100 rounded-md px-3 py-2"
                >
                  {GOAL_CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-indigo-200 text-sm font-medium mb-2 block">
                Description
              </label>
              <Textarea
                value={newGoal.goal_description}
                onChange={(e) => setNewGoal({...newGoal, goal_description: e.target.value})}
                placeholder="Describe your goal and why it's important..."
                className="bg-black/20 border-indigo-500/30 text-indigo-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-indigo-200 text-sm font-medium mb-2 block">
                  Target Amount
                </label>
                <Input
                  type="number"
                  value={newGoal.target_amount}
                  onChange={(e) => setNewGoal({...newGoal, target_amount: parseFloat(e.target.value) || 0})}
                  className="bg-black/20 border-indigo-500/30 text-indigo-100"
                />
              </div>

              <div>
                <label className="text-indigo-200 text-sm font-medium mb-2 block">
                  Current Amount
                </label>
                <Input
                  type="number"
                  value={newGoal.current_amount}
                  onChange={(e) => setNewGoal({...newGoal, current_amount: parseFloat(e.target.value) || 0})}
                  className="bg-black/20 border-indigo-500/30 text-indigo-100"
                />
              </div>

              <div>
                <label className="text-indigo-200 text-sm font-medium mb-2 block">
                  Target Date
                </label>
                <Input
                  type="date"
                  value={newGoal.target_date}
                  onChange={(e) => setNewGoal({...newGoal, target_date: e.target.value})}
                  className="bg-black/20 border-indigo-500/30 text-indigo-100"
                />
              </div>

              <div>
                <label className="text-indigo-200 text-sm font-medium mb-2 block">
                  Priority
                </label>
                <select
                  value={newGoal.priority_level}
                  onChange={(e) => setNewGoal({...newGoal, priority_level: e.target.value})}
                  className="w-full bg-black/20 border border-indigo-500/30 text-indigo-100 rounded-md px-3 py-2"
                >
                  {PRIORITY_LEVELS.map(level => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={addGoal}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Target className="w-4 h-4 mr-2" />
                {loading ? 'Creating...' : 'Create Goal'}
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="border-indigo-500/30 text-indigo-200"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <Card className="bg-gradient-to-br from-gray-900/40 to-slate-900/40 border-gray-500/30">
        <CardHeader>
          <CardTitle className="text-gray-200 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Your Prosperity Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {goals.length === 0 ? (
            <p className="text-gray-300 text-center py-8">No goals set yet. Create your first prosperity goal above!</p>
          ) : (
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="bg-black/20 p-4 rounded border border-gray-500/20">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="text-gray-200 font-medium mb-1">{goal.goal_title}</h4>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline" className="border-blue-500/30 text-blue-300 text-xs">
                          {goal.goal_category.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(goal.priority_level)}`}>
                          {goal.priority_level} priority
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(goal.status)}`}>
                          {goal.status}
                        </Badge>
                      </div>
                      {goal.goal_description && (
                        <p className="text-gray-300 text-sm mb-3">{goal.goal_description}</p>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteGoal(goal.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {goal.target_amount && (
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Progress</span>
                        <span className="text-gray-200">
                          {formatCurrency(goal.current_amount)} / {formatCurrency(goal.target_amount)}
                        </span>
                      </div>
                      <Progress 
                        value={calculateProgress(goal.current_amount, goal.target_amount)} 
                        className="h-2"
                      />
                      <p className="text-xs text-gray-400">
                        {calculateProgress(goal.current_amount, goal.target_amount).toFixed(1)}% complete
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">
                      {goal.target_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Target: {new Date(goal.target_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {goal.status === 'active' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => completeGoal(goal.id)}
                            className="bg-green-600/20 hover:bg-green-600/40 text-green-200 border border-green-500/30"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-500/30 text-gray-200"
                          >
                            <Edit3 className="w-3 h-3 mr-1" />
                            Update
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
