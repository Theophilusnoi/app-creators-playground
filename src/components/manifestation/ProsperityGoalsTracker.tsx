
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Target, Plus, TrendingUp, Calendar, DollarSign, 
  CheckCircle, Edit3, Trash2, Award, Flag
} from 'lucide-react';

interface ProsperityGoal {
  id: string;
  goal_title: string;
  goal_description: string;
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
  { id: 'income', name: 'Income Increase', emoji: '💰', color: 'from-green-600 to-emerald-600' },
  { id: 'savings', name: 'Savings Goal', emoji: '🏦', color: 'from-blue-600 to-cyan-600' },
  { id: 'debt_reduction', name: 'Debt Reduction', emoji: '🔥', color: 'from-red-600 to-pink-600' },
  { id: 'investment', name: 'Investment Target', emoji: '📈', color: 'from-purple-600 to-indigo-600' },
  { id: 'business', name: 'Business Goal', emoji: '🚀', color: 'from-orange-600 to-yellow-600' },
  { id: 'career', name: 'Career Advancement', emoji: '🎯', color: 'from-teal-600 to-green-600' }
];

const PRIORITY_LEVELS = [
  { id: 'low', name: 'Low', color: 'bg-gray-600/20 text-gray-200' },
  { id: 'medium', name: 'Medium', color: 'bg-blue-600/20 text-blue-200' },
  { id: 'high', name: 'High', color: 'bg-orange-600/20 text-orange-200' },
  { id: 'urgent', name: 'Urgent', color: 'bg-red-600/20 text-red-200' }
];

export const ProsperityGoalsTracker: React.FC = () => {
  const [goals, setGoals] = useState<ProsperityGoal[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newGoal, setNewGoal] = useState({
    goal_title: '',
    goal_description: '',
    goal_category: 'income',
    target_amount: '',
    current_amount: '0',
    target_date: '',
    priority_level: 'medium'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const { data, error } = await supabase
        .from('prosperity_goals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const createGoal = async () => {
    if (!newGoal.goal_title.trim()) {
      toast({
        title: "Please enter a goal title",
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
          target_amount: newGoal.target_amount ? parseFloat(newGoal.target_amount) : null,
          current_amount: parseFloat(newGoal.current_amount) || 0,
          target_date: newGoal.target_date || null,
          priority_level: newGoal.priority_level
        });

      if (error) throw error;

      toast({
        title: "🎯 Goal Created!",
        description: "Your prosperity goal has been added to your tracker"
      });

      setNewGoal({
        goal_title: '',
        goal_description: '',
        goal_category: 'income',
        target_amount: '',
        current_amount: '0',
        target_date: '',
        priority_level: 'medium'
      });
      setShowCreateForm(false);
      fetchGoals();
    } catch (error) {
      console.error('Error creating goal:', error);
      toast({
        title: "Error",
        description: "Failed to create goal",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (goalId: string, newAmount: number) => {
    try {
      const goal = goals.find(g => g.id === goalId);
      if (!goal) return;

      const isCompleted = goal.target_amount && newAmount >= goal.target_amount;
      
      const { error } = await supabase
        .from('prosperity_goals')
        .update({ 
          current_amount: newAmount,
          status: isCompleted ? 'completed' : 'active',
          completed_at: isCompleted ? new Date().toISOString() : null
        })
        .eq('id', goalId);

      if (error) throw error;

      if (isCompleted) {
        toast({
          title: "🎉 Goal Completed!",
          description: `Congratulations on reaching your ${goal.goal_title} goal!`
        });
      }

      fetchGoals();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const deleteGoal = async (goalId: string) => {
    try {
      const { error } = await supabase
        .from('prosperity_goals')
        .delete()
        .eq('id', goalId);

      if (error) throw error;
      
      toast({
        title: "Goal Deleted",
        description: "Goal has been removed from your tracker"
      });
      
      fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const filteredGoals = goals.filter(goal => {
    const matchesCategory = filterCategory === 'all' || goal.goal_category === filterCategory;
    const matchesStatus = filterStatus === 'all' || goal.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  const calculateProgress = (current: number, target?: number): number => {
    if (!target || target === 0) return 0;
    return Math.round((current / target) * 100);
  };

  const getCategoryInfo = (category: string) => {
    return GOAL_CATEGORIES.find(c => c.id === category) || GOAL_CATEGORIES[0];
  };

  const getPriorityColor = (priority: string) => {
    return PRIORITY_LEVELS.find(p => p.id === priority)?.color || PRIORITY_LEVELS[1].color;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600/20 text-green-200 border-green-500/30';
      case 'active': return 'bg-blue-600/20 text-blue-200 border-blue-500/30';
      case 'paused': return 'bg-yellow-600/20 text-yellow-200 border-yellow-500/30';
      default: return 'bg-gray-600/20 text-gray-200 border-gray-500/30';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {goals.length}
            </div>
            <div className="text-blue-200 text-sm">Total Goals</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {goals.filter(g => g.status === 'active').length}
            </div>
            <div className="text-green-200 text-sm">Active Goals</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {goals.filter(g => g.status === 'completed').length}
            </div>
            <div className="text-purple-200 text-sm">Completed</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {Math.round(goals.filter(g => g.target_amount).reduce((acc, g) => 
                acc + calculateProgress(g.current_amount, g.target_amount), 0) / 
                Math.max(goals.filter(g => g.target_amount).length, 1))}%
            </div>
            <div className="text-yellow-200 text-sm">Avg Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-black/20 border border-purple-500/30 text-purple-100 rounded-md px-3 py-2"
              >
                <option value="all">All Categories</option>
                {GOAL_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-black/20 border border-purple-500/30 text-purple-100 rounded-md px-3 py-2"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
              </select>
            </div>

            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Goal
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Goal Form */}
      {showCreateForm && (
        <Card className="bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border-indigo-500/30">
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
                  {GOAL_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.emoji} {cat.name}
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
                placeholder="Why is this goal important to you?"
                className="bg-black/20 border-indigo-500/30 text-indigo-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-indigo-200 text-sm font-medium mb-2 block">
                  Target Amount ($)
                </label>
                <Input
                  type="number"
                  value={newGoal.target_amount}
                  onChange={(e) => setNewGoal({...newGoal, target_amount: e.target.value})}
                  placeholder="10000"
                  className="bg-black/20 border-indigo-500/30 text-indigo-100"
                />
              </div>

              <div>
                <label className="text-indigo-200 text-sm font-medium mb-2 block">
                  Current Amount ($)
                </label>
                <Input
                  type="number"
                  value={newGoal.current_amount}
                  onChange={(e) => setNewGoal({...newGoal, current_amount: e.target.value})}
                  placeholder="0"
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
                  {PRIORITY_LEVELS.map(priority => (
                    <option key={priority.id} value={priority.id}>
                      {priority.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={createGoal}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Target className="w-4 h-4 mr-2" />
                {loading ? 'Creating...' : 'Create Goal'}
              </Button>
              <Button
                onClick={() => setShowCreateForm(false)}
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
      <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-200 flex items-center gap-2">
            <Flag className="w-5 h-5" />
            Your Prosperity Goals ({filteredGoals.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredGoals.length === 0 ? (
            <p className="text-green-300 text-center py-8">
              {filterCategory !== 'all' || filterStatus !== 'all' 
                ? 'No goals match your current filters.' 
                : 'No goals created yet. Set your first prosperity goal above!'
              }
            </p>
          ) : (
            <div className="space-y-4">
              {filteredGoals.map((goal) => {
                const categoryInfo = getCategoryInfo(goal.goal_category);
                const progress = calculateProgress(goal.current_amount, goal.target_amount);
                const daysRemaining = goal.target_date ? getDaysRemaining(goal.target_date) : null;
                
                return (
                  <div key={goal.id} className="bg-black/20 p-4 rounded border border-green-500/20">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="text-green-200 font-medium mb-1">{goal.goal_title}</h4>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className={`bg-gradient-to-r ${categoryInfo.color} text-white text-xs`}>
                            {categoryInfo.emoji} {categoryInfo.name}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(goal.status)}`}>
                            {goal.status}
                          </Badge>
                          <Badge className={`text-xs ${getPriorityColor(goal.priority_level)}`}>
                            {goal.priority_level} priority
                          </Badge>
                        </div>
                        
                        {goal.goal_description && (
                          <p className="text-green-300 text-sm mb-3">{goal.goal_description}</p>
                        )}
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingGoal(goal.id)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
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

                    {/* Progress Section */}
                    {goal.target_amount && (
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-green-300">
                            {formatCurrency(goal.current_amount)} / {formatCurrency(goal.target_amount)}
                          </span>
                          <span className="text-green-400 font-medium">{progress}%</span>
                        </div>
                        <Progress value={progress} className="w-full h-2" />
                      </div>
                    )}

                    {/* Update Progress */}
                    <div className="flex items-center gap-2 mb-3">
                      <Input
                        type="number"
                        placeholder="Update amount"
                        className="bg-black/20 border-green-500/30 text-green-100 text-sm h-8 w-32"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const newAmount = parseFloat((e.target as HTMLInputElement).value);
                            if (!isNaN(newAmount)) {
                              updateProgress(goal.id, newAmount);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                      <span className="text-green-300 text-sm">Press Enter to update</span>
                    </div>

                    {/* Goal Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-green-300">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Created: {new Date(goal.created_at).toLocaleDateString()}
                      </div>
                      
                      {goal.target_date && (
                        <div className="flex items-center gap-1">
                          <Flag className="w-3 h-3" />
                          Target: {new Date(goal.target_date).toLocaleDateString()}
                        </div>
                      )}
                      
                      {daysRemaining !== null && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {daysRemaining > 0 ? `${daysRemaining} days left` : 
                           daysRemaining === 0 ? 'Due today' : 
                           `${Math.abs(daysRemaining)} days overdue`}
                        </div>
                      )}
                      
                      {goal.status === 'completed' && goal.completed_at && (
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          Completed: {new Date(goal.completed_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
