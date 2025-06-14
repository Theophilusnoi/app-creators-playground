
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  TrendingUp, 
  Users, 
  Activity,
  BarChart3,
  RefreshCw
} from "lucide-react";

interface EmergencyMetrics {
  totalEmergencies: number;
  averageResponseTime: number;
  responseTimes: Array<{ timestamp: string; value: number }>;
  traditionDistribution: Array<{ tradition: string; count: number }>;
  resolutionRates: Array<{ crisis_level: number; rate: number }>;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend, color = "blue" }) => {
  const colorMap = {
    blue: "border-blue-500/30 bg-blue-900/20",
    green: "border-green-500/30 bg-green-900/20", 
    amber: "border-amber-500/30 bg-amber-900/20",
    purple: "border-purple-500/30 bg-purple-900/20"
  };

  return (
    <Card className={`${colorMap[color as keyof typeof colorMap]} border backdrop-blur-sm`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-300">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            {trend && (
              <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                {trend}
              </p>
            )}
          </div>
          <div className="text-white/80">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SimpleBarChart: React.FC<{ 
  data: Array<{ tradition: string; count: number }>;
  title: string;
}> = ({ data, title }) => {
  const maxCount = Math.max(...data.map(d => d.count), 1);
  
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300 capitalize">{item.tradition || 'Unknown'}</span>
                <span className="text-white">{item.count}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ResolutionChart: React.FC<{ 
  data: Array<{ crisis_level: number; rate: number }>;
}> = ({ data }) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-lg">Resolution Rates by Crisis Level</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => {
            const levelNames = { 1: 'Distress', 2: 'Crisis', 3: 'Emergency' };
            const colors = { 1: 'bg-yellow-500', 2: 'bg-orange-500', 3: 'bg-red-500' };
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">
                    Level {item.crisis_level} - {levelNames[item.crisis_level as keyof typeof levelNames]}
                  </span>
                  <span className="text-white font-semibold">{item.rate}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className={`${colors[item.crisis_level as keyof typeof colors]} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${item.rate}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

const ResponseTimeChart: React.FC<{ 
  data: Array<{ timestamp: string; value: number }>;
}> = ({ data }) => {
  if (!data.length) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Response Times (Last 24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-400 py-8">
            No response time data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxTime = Math.max(...data.map(d => d.value), 1);
  
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-lg">Response Times (Last 24h)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.slice(-10).map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
                <span className="text-white">{item.value}s</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div 
                  className="bg-green-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${(item.value / maxTime) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const EmergencyAnalyticsDashboard: React.FC = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<EmergencyMetrics>({
    totalEmergencies: 0,
    averageResponseTime: 0,
    responseTimes: [],
    traditionDistribution: [],
    resolutionRates: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadMetrics = async () => {
    try {
      const { data, error } = await supabase.rpc('get_emergency_metrics');
      
      if (error) {
        console.error('Error loading metrics:', error);
        return;
      }

      if (data) {
        setMetrics({
          totalEmergencies: data.totalEmergencies || 0,
          averageResponseTime: data.averageResponseTime || 0,
          responseTimes: data.responseTimes || [],
          traditionDistribution: data.traditionDistribution || [],
          resolutionRates: data.resolutionRates || []
        });
      }
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error in loadMetrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadMetrics();
      
      // Set up real-time subscription
      const subscription = supabase
        .channel('emergency-updates')
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'spiritual_emergencies' 
        }, () => {
          console.log('Emergency data updated, refreshing metrics...');
          loadMetrics();
        })
        .subscribe();

      // Auto-refresh every 30 seconds
      const interval = setInterval(loadMetrics, 30000);

      return () => {
        supabase.removeChannel(subscription);
        clearInterval(interval);
      };
    }
  }, [user]);

  const handleRefresh = () => {
    setIsLoading(true);
    loadMetrics();
  };

  if (isLoading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  const overallResolutionRate = metrics.resolutionRates.length > 0 
    ? Math.round(metrics.resolutionRates.reduce((acc, curr) => acc + curr.rate, 0) / metrics.resolutionRates.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <Activity className="w-8 h-8 text-purple-400" />
            Emergency Response Analytics
          </h2>
          <p className="text-gray-300">
            Real-time monitoring of spiritual emergency interventions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <Button
            onClick={handleRefresh}
            size="sm"
            variant="outline"
            className="border-purple-500/50 text-purple-200"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Emergencies"
          value={metrics.totalEmergencies}
          icon={<AlertTriangle className="w-6 h-6" />}
          color="amber"
        />
        <MetricCard
          title="Avg Response Time"
          value={`${metrics.averageResponseTime}s`}
          icon={<Clock className="w-6 h-6" />}
          trend="< 2min target"
          color="blue"
        />
        <MetricCard
          title="Resolution Rate"
          value={`${overallResolutionRate}%`}
          icon={<Shield className="w-6 h-6" />}
          trend="> 85% target"
          color="green"
        />
        <MetricCard
          title="Active Protocols"
          value="3"
          icon={<Users className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleBarChart 
          data={metrics.traditionDistribution}
          title="Emergencies by Spiritual Tradition"
        />
        <ResolutionChart data={metrics.resolutionRates} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <ResponseTimeChart data={metrics.responseTimes} />
      </div>

      {/* Protocol Status */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Active Emergency Protocols
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-yellow-200 font-medium">Level 1 - Distress</span>
                <span className="text-yellow-400 text-sm">Active</span>
              </div>
              <p className="text-xs text-yellow-100/80">
                Guided breathing, grounding exercises, light visualization
              </p>
            </div>
            
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-orange-200 font-medium">Level 2 - Crisis</span>
                <span className="text-orange-400 text-sm">Active</span>
              </div>
              <p className="text-xs text-orange-100/80">
                Emergency shield, divine invocation, protective rituals
              </p>
            </div>
            
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-red-200 font-medium">Level 3 - Emergency</span>
                <span className="text-red-400 text-sm">Active</span>
              </div>
              <p className="text-xs text-red-100/80">
                Human specialist connection, crisis hotline, emergency services
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
