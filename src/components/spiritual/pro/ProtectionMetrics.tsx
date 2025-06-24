
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Brain, 
  Heart, 
  Zap, 
  Star,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

interface ProtectionMetricsProps {
  auricIntegrity?: number;
  threatLevel?: number;
}

export const ProtectionMetrics: React.FC<ProtectionMetricsProps> = ({
  auricIntegrity = 85,
  threatLevel = 0
}) => {
  const [metrics, setMetrics] = useState({
    auricCohesion: auricIntegrity,
    psychicIntrusions: Math.floor(Math.random() * 3),
    energyVampireDrain: Math.floor(Math.random() * 8) + 2,
    celestialAlignment: Math.floor(Math.random() * 4) + 1,
    ancestralSupport: Math.floor(Math.random() * 21) + 80
  });

  const [trends, setTrends] = useState({
    auricCohesion: 'up',
    psychicIntrusions: 'down',
    energyVampireDrain: 'stable',
    celestialAlignment: 'up',
    ancestralSupport: 'up'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        auricCohesion: Math.min(100, Math.max(60, prev.auricCohesion + (Math.random() * 4 - 2))),
        psychicIntrusions: Math.max(0, Math.min(7, prev.psychicIntrusions + Math.floor(Math.random() * 3 - 1))),
        energyVampireDrain: Math.max(0, Math.min(15, prev.energyVampireDrain + Math.floor(Math.random() * 3 - 1))),
        celestialAlignment: Math.max(0, Math.min(5, prev.celestialAlignment + Math.floor(Math.random() * 3 - 1))),
        ancestralSupport: Math.min(100, Math.max(70, prev.ancestralSupport + (Math.random() * 6 - 3)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const protectionParameters = [
    {
      id: 'auric-cohesion',
      name: 'Auric Cohesion',
      value: metrics.auricCohesion,
      unit: '% opacity',
      measurement: 'Kirlian camera + AI analysis',
      optimal: '95-100% opacity',
      current: `${Math.round(metrics.auricCohesion)}%`,
      status: metrics.auricCohesion >= 95 ? 'optimal' : metrics.auricCohesion >= 80 ? 'good' : 'attention',
      icon: Star,
      color: 'purple'
    },
    {
      id: 'psychic-intrusions',
      name: 'Psychic Intrusions',
      value: (7 - metrics.psychicIntrusions) * 14.3, // Convert to percentage (inverted)
      unit: 'events/week',
      measurement: 'EEG anomaly detection',
      optimal: '0-2 events/week',
      current: `${metrics.psychicIntrusions} events/week`,
      status: metrics.psychicIntrusions <= 2 ? 'optimal' : metrics.psychicIntrusions <= 4 ? 'good' : 'attention',
      icon: Brain,
      color: 'blue'
    },
    {
      id: 'energy-drain',
      name: 'Energy Vampire Drain',
      value: Math.max(0, 100 - (metrics.energyVampireDrain * 6.67)), // Convert to protection percentage
      unit: '% energy loss/day',
      measurement: 'HRV + galvanic skin response',
      optimal: '<5% energy loss/day',
      current: `${metrics.energyVampireDrain}% loss/day`,
      status: metrics.energyVampireDrain <= 5 ? 'optimal' : metrics.energyVampireDrain <= 10 ? 'good' : 'attention',
      icon: Zap,
      color: 'yellow'
    },
    {
      id: 'celestial-alignment',
      name: 'Celestial Alignment',
      value: Math.max(0, 100 - (metrics.celestialAlignment * 20)), // Convert orb variance to alignment percentage
      unit: '° orb variance',
      measurement: 'Astrological deviation index',
      optimal: '<3° orb variance',
      current: `${metrics.celestialAlignment}° variance`,
      status: metrics.celestialAlignment <= 3 ? 'optimal' : metrics.celestialAlignment <= 5 ? 'good' : 'attention',
      icon: Star,
      color: 'indigo'
    },
    {
      id: 'ancestral-support',
      name: 'Ancestral Support',
      value: metrics.ancestralSupport,
      unit: 'Hz resonance',
      measurement: 'Voice analysis during chants',
      optimal: '80-100 Hz resonance',
      current: `${Math.round(metrics.ancestralSupport)} Hz`,
      status: metrics.ancestralSupport >= 80 ? 'optimal' : metrics.ancestralSupport >= 70 ? 'good' : 'attention',
      icon: Heart,
      color: 'red'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-600/20 text-green-200 border-green-500/30';
      case 'good': return 'bg-yellow-600/20 text-yellow-200 border-yellow-500/30';
      default: return 'bg-red-600/20 text-red-200 border-red-500/30';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Minus;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const overallScore = Math.round(
    protectionParameters.reduce((sum, param) => sum + param.value, 0) / protectionParameters.length
  );

  return (
    <div className="space-y-6">
      <Card className="bg-black/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Activity className="w-6 h-6 text-green-400" />
            Protection Efficacy Metrics
          </CardTitle>
          <p className="text-green-200">Quantifying Spiritual Security</p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-200">Overall Protection Score</span>
              <span className="text-white font-bold text-2xl">{overallScore}%</span>
            </div>
            <Progress value={overallScore} className="h-4" />
            <div className="mt-2 text-center">
              <Badge className={getStatusColor(overallScore >= 90 ? 'optimal' : overallScore >= 75 ? 'good' : 'attention')}>
                {overallScore >= 90 ? 'OPTIMAL PROTECTION' : overallScore >= 75 ? 'GOOD PROTECTION' : 'NEEDS ATTENTION'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {protectionParameters.map((param) => {
          const Icon = param.icon;
          const TrendIcon = getTrendIcon(trends[param.id as keyof typeof trends]);
          
          return (
            <Card 
              key={param.id}
              className={`bg-black/30 border-${param.color}-500/30`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${param.color}-600/20`}>
                      <Icon className={`w-5 h-5 text-${param.color}-400`} />
                    </div>
                    <div>
                      <div className="text-lg">{param.name}</div>
                      <div className="text-sm text-gray-300 font-normal">
                        {param.measurement}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendIcon className={`w-4 h-4 ${getTrendColor(trends[param.id as keyof typeof trends])}`} />
                    <Badge className={getStatusColor(param.status)}>
                      {param.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Current Reading</span>
                    <span className="text-white font-bold">{param.current}</span>
                  </div>
                  <Progress value={param.value} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Optimal Range: {param.optimal}</span>
                    <span className={`font-medium ${
                      param.value >= 80 ? 'text-green-400' : 
                      param.value >= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {Math.round(param.value)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {overallScore >= 95 && (
        <Card className="bg-gradient-to-r from-gold-900/30 to-green-900/30 border-gold-500/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gold-200">📊 Peak Protection Achieved! 📊</h3>
              <p className="text-gold-300">
                All protection metrics are operating at optimal levels. Your spiritual security 
                system is performing at maximum efficiency.
              </p>
              <Badge className="bg-gold-600/20 text-gold-200 text-lg px-4 py-2">
                PERFECT PROTECTION METRICS
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
