import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Lightbulb, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Target, 
  CheckCircle, 
  AlertTriangle,
  BarChart3,
  PieChart,
  RefreshCw,
  Sparkles
} from 'lucide-react';

const CostOptimization = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const suggestions = [
    {
      id: 1,
      type: 'subscription',
      title: 'Reduce Software Subscriptions',
      description: 'You have 3 unused software subscriptions that haven\'t been accessed in 60+ days.',
      potentialSavings: 240,
      difficulty: 'easy',
      timeToImplement: '5 minutes',
      impact: 'high',
      status: 'pending',
      category: 'Software & Tools',
      details: [
        'Adobe Creative Suite - Last used 75 days ago',
        'Figma Pro - Last used 90 days ago', 
        'Notion Pro - Last used 45 days ago'
      ]
    },
    {
      id: 2,
      type: 'tax',
      title: 'Claim Home Office Deduction',
      description: 'Based on your expenses, you may qualify for additional home office tax deductions.',
      potentialSavings: 450,
      difficulty: 'medium',
      timeToImplement: '30 minutes',
      impact: 'high',
      status: 'pending',
      category: 'Tax Optimization',
      details: [
        'Office space: 200 sq ft of 1,200 sq ft home',
        'Utilities allocation: $75/month',
        'Internet allocation: $45/month'
      ]
    },
    {
      id: 3,
      type: 'vendor',
      title: 'Negotiate Better Rates',
      description: 'Your internet and phone bills are above market average for similar services.',
      potentialSavings: 180,
      difficulty: 'medium',
      timeToImplement: '2 hours',
      impact: 'medium',
      status: 'in-progress',
      category: 'Utilities & Services',
      details: [
        'Internet: $89/month (market avg: $65/month)',
        'Phone: $55/month (market avg: $35/month)'
      ]
    },
    {
      id: 4,
      type: 'expense',
      title: 'Optimize Office Supplies',
      description: 'Switch to bulk purchasing for frequently used office supplies.',
      potentialSavings: 120,
      difficulty: 'easy',
      timeToImplement: '15 minutes',
      impact: 'medium',
      status: 'pending',
      category: 'Office Expenses',
      details: [
        'Paper: Save 30% with bulk orders',
        'Ink cartridges: Save 40% with compatible brands',
        'Office supplies: Join business wholesale club'
      ]
    },
    {
      id: 5,
      type: 'automation',
      title: 'Automate Invoice Processing',
      description: 'Reduce time spent on manual invoice entry by 80% with automated processing.',
      potentialSavings: 300,
      difficulty: 'hard',
      timeToImplement: '1 week',
      impact: 'high',
      status: 'completed',
      category: 'Process Improvement',
      details: [
        'Current time spent: 5 hours/week',
        'With automation: 1 hour/week',
        'Time savings valued at $75/hour'
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPotentialSavings = suggestions.reduce((sum, suggestion) => sum + suggestion.potentialSavings, 0);
  const completedSavings = suggestions
    .filter(s => s.status === 'completed')
    .reduce((sum, suggestion) => sum + suggestion.potentialSavings, 0);

  const handleApplySuggestion = (id: number) => {
    toast({
      title: "Suggestion Applied",
      description: "We'll help you implement this cost-saving measure.",
    });
  };

  const refreshSuggestions = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
    toast({
      title: "Suggestions Updated",
      description: "AI has analyzed your latest data for new optimization opportunities.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Sparkles className="text-purple-600" />
              AI Cost Optimization
            </h1>
            <p className="text-muted-foreground">Intelligent recommendations to reduce your business expenses</p>
          </div>
          <Button onClick={refreshSuggestions} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Suggestions
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Potential Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${totalPotentialSavings.toFixed(0)}/month
              </div>
              <p className="text-xs text-muted-foreground">
                ${(totalPotentialSavings * 12).toFixed(0)} annually
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Savings Realized</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ${completedSavings.toFixed(0)}/month
              </div>
              <Progress 
                value={(completedSavings / totalPotentialSavings) * 100} 
                className="mt-2" 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {suggestions.filter(s => s.status === 'pending').length}
              </div>
              <p className="text-xs text-muted-foreground">
                {suggestions.filter(s => s.status === 'in-progress').length} in progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Implementation Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((completedSavings / totalPotentialSavings) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Optimization progress
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="suggestions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
            <TabsTrigger value="trends">Expense Trends</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="suggestions" className="space-y-6">
            <div className="grid gap-6">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Lightbulb className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {suggestion.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(suggestion.status)}>
                        {suggestion.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="text-2xl font-bold text-green-600">
                              ${suggestion.potentialSavings}/month
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          <Badge className={getDifficultyColor(suggestion.difficulty)}>
                            {suggestion.difficulty}
                          </Badge>
                          <Badge className={getImpactColor(suggestion.impact)}>
                            {suggestion.impact} impact
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {suggestion.timeToImplement}
                          </Badge>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-2">Implementation Details:</h4>
                          <ul className="space-y-1">
                            {suggestion.details.map((detail, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-between">
                        <div className="bg-muted/20 p-4 rounded-lg">
                          <h4 className="font-medium text-sm mb-2">Projected Impact</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Monthly Savings:</span>
                              <span className="font-medium">${suggestion.potentialSavings}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Annual Savings:</span>
                              <span className="font-medium">${suggestion.potentialSavings * 12}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>ROI:</span>
                              <span className="font-medium text-green-600">∞%</span>
                            </div>
                          </div>
                        </div>
                        
                        {suggestion.status === 'pending' && (
                          <Button 
                            className="mt-4" 
                            onClick={() => handleApplySuggestion(suggestion.id)}
                          >
                            <Target className="w-4 h-4 mr-2" />
                            Apply Suggestion
                          </Button>
                        )}
                        
                        {suggestion.status === 'completed' && (
                          <Button variant="outline" className="mt-4" disabled>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completed
                          </Button>
                        )}
                        
                        {suggestion.status === 'in-progress' && (
                          <Button variant="secondary" className="mt-4" disabled>
                            <Clock className="w-4 h-4 mr-2" />
                            In Progress
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Expense Trends (6 Months)
                  </CardTitle>
                  <CardDescription>Monthly expense breakdown by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">Expense trends chart will be rendered here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Cost Distribution
                  </CardTitle>
                  <CardDescription>Current month expense categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">Cost distribution chart will be rendered here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    AI-Generated Insights
                  </CardTitle>
                  <CardDescription>Deep analysis of your spending patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-medium text-blue-900 mb-2">Pattern Recognition</h4>
                    <p className="text-sm text-blue-800">
                      Your software expenses have increased by 35% over the last 3 months, primarily due to new subscriptions. 
                      Consider consolidating tools or negotiating annual discounts.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-medium text-green-900 mb-2">Opportunity Identified</h4>
                    <p className="text-sm text-green-800">
                      Based on your business growth trajectory, switching to annual billing for your core tools 
                      could save you $400+ annually while improving cash flow predictability.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-medium text-yellow-900 mb-2">Seasonal Trend</h4>
                    <p className="text-sm text-yellow-800">
                      Your marketing expenses typically spike 40% in Q4. Planning ahead with annual media budgets 
                      could help you secure better rates and more predictable costs.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-medium text-purple-900 mb-2">Benchmark Analysis</h4>
                    <p className="text-sm text-purple-800">
                      Compared to similar businesses, your operational efficiency is 15% above average. 
                      Your main optimization opportunities lie in vendor management and subscription optimization.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CostOptimization;