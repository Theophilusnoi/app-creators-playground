
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Moon, TrendingUp, Eye, Calendar } from 'lucide-react';
import { Dream } from '@/hooks/useDreams';

interface DreamStatsProps {
  dreams: Dream[];
}

export const DreamStats: React.FC<DreamStatsProps> = ({ dreams }) => {
  // Calculate dream frequency by month
  const dreamsByMonth = dreams.reduce((acc, dream) => {
    const month = new Date(dream.dream_date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const frequencyData = Object.entries(dreamsByMonth)
    .map(([month, count]) => ({ month, count }))
    .slice(-6); // Last 6 months

  // Most common emotions
  const emotionCounts = dreams.reduce((acc, dream) => {
    dream.emotions?.forEach(emotion => {
      acc[emotion] = (acc[emotion] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const emotionData = Object.entries(emotionCounts)
    .map(([emotion, count]) => ({ emotion, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  // Most common symbols
  const symbolCounts = dreams.reduce((acc, dream) => {
    dream.symbols?.forEach(symbol => {
      acc[symbol] = (acc[symbol] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topSymbols = Object.entries(symbolCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Dream Frequency */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-purple-400" />
            Dream Frequency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={frequencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  color: '#F3F4F6'
                }} 
              />
              <Bar dataKey="count" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Emotion Distribution */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
            Common Emotions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={emotionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ emotion, percent }) => `${emotion} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {emotionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Symbols */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Eye className="w-5 h-5 mr-2 text-purple-400" />
            Recurring Symbols
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topSymbols.map(([symbol, count]) => (
              <div key={symbol} className="flex justify-between items-center">
                <span className="text-purple-200 capitalize">{symbol}</span>
                <div className="flex items-center">
                  <div className="w-20 bg-purple-900/30 rounded-full h-2 mr-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full" 
                      style={{ width: `${(count / Math.max(...topSymbols.map(s => s[1]))) * 100}%` }}
                    />
                  </div>
                  <span className="text-purple-300 text-sm">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Moon className="w-5 h-5 mr-2 text-purple-400" />
            Dream Journal Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-purple-200">Total Dreams</span>
              <span className="text-white font-medium">{dreams.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Dreams This Month</span>
              <span className="text-white font-medium">
                {dreams.filter(d => new Date(d.dream_date).getMonth() === new Date().getMonth()).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Analyzed Dreams</span>
              <span className="text-white font-medium">
                {dreams.filter(d => d.analysis).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Average per Week</span>
              <span className="text-white font-medium">
                {dreams.length > 0 ? Math.round((dreams.length / Math.max(1, Math.ceil((Date.now() - new Date(dreams[dreams.length - 1]?.dream_date || Date.now()).getTime()) / (7 * 24 * 60 * 60 * 1000)))) * 10) / 10 : 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
