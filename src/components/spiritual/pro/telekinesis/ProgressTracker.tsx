
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Zap, 
  Brain, 
  Eye,
  Clock,
  BarChart3,
  Star
} from 'lucide-react';

interface ProgressTrackerProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  userProfile, 
  setUserProfile 
}) => {
  const { toast } = useToast();
  const [selectedMetric, setSelectedMetric] = useState('overall');

  const progressMetrics = {
    overall: {
      title: 'Overall Development',
      icon: TrendingUp,
      value: userProfile?.telekinesisProgress?.overall || 15,
      description: 'Combined assessment of all telekinetic abilities'
    },
    concentration: {
      title: 'Concentration Duration',
      icon: Brain,
      value: userProfile?.telekinesisProgress?.concentration || 32,
      description: 'Ability to maintain focused attention without distraction'
    },
    visualization: {
      title: 'Visualization Clarity',
      icon: Eye,
      value: userProfile?.telekinesisProgress?.visualization || 28,
      description: 'Clarity and detail of mental imagery during practice'
    },
    energyAwareness: {
      title: 'Energy Awareness',
      icon: Zap,
      value: userProfile?.telekinesisProgress?.energyAwareness || 24,
      description: 'Sensitivity to personal and environmental energy fields'
    },
    objectConnection: {
      title: 'Object Connection',
      icon: Target,
      value: userProfile?.telekinesisProgress?.objectConnection || 18,
      description: 'Ability to establish energetic link with target objects'
    }
  };

  const weeklyStats = {
    practiceHours: userProfile?.telekinesisProgress?.weeklyHours || 3.5,
    sessions: userProfile?.telekinesisProgress?.weeklySessions || 7,
    successes: userProfile?.telekinesisProgress?.weeklySuccesses || 2,
    plateauDays: userProfile?.telekinesisProgress?.plateauDays || 0
  };

  const milestones = [
    { 
      name: 'First Energy Sensation', 
      achieved: userProfile?.telekinesisProgress?.milestones?.energySensation || false,
      description: 'Successfully felt energy between palms'
    },
    { 
      name: 'Object Observation Mastery', 
      achieved: userProfile?.telekinesisProgress?.milestones?.objectObservation || false,
      description: 'Can visualize objects with perfect clarity'
    },
    { 
      name: 'Energetic Connection', 
      achieved: userProfile?.telekinesisProgress?.milestones?.energeticConnection || false,
      description: 'Established connection with target object'
    },
    { 
      name: 'First Micro-Movement', 
      achieved: userProfile?.telekinesisProgress?.milestones?.microMovement || false,
      description: 'Observed subtle object influence'
    },
    { 
      name: 'Consistent Results', 
      achieved: userProfile?.telekinesisProgress?.milestones?.consistentResults || false,
      description: 'Reproducible effects under controlled conditions'
    }
  ];

  const updateProgress = (metric: string, increment: number) => {
    const currentValue = progressMetrics[metric as keyof typeof progressMetrics]?.value || 0;
    const newValue = Math.min(currentValue + increment, 100);
    
    const updatedProfile = {
      ...userProfile,
      telekinesisProgress: {
        ...userProfile?.telekinesisProgress,
        [metric]: newValue
      }
    };
    
    setUserProfile(updatedProfile);
    localStorage.setItem('spiritualMindProfile', JSON.stringify(updatedProfile));
    
    toast({
      title: "Progress Updated",
      description: `${progressMetrics[metric as keyof typeof progressMetrics].title} increased to ${newValue}%`,
    });
  };

  const achieveMilestone = (milestoneIndex: number) => {
    const milestone = milestones[milestoneIndex];
    if (milestone.achieved) return;

    const updatedProfile = {
      ...userProfile,
      telekinesisProgress: {
        ...userProfile?.telekinesisProgress,
        milestones: {
          ...userProfile?.telekinesisProgress?.milestones,
          [Object.keys(userProfile?.telekinesisProgress?.milestones || {})[milestoneIndex] || `milestone${milestoneIndex}`]: true
        }
      }
    };
    
    setUserProfile(updatedProfile);
    localStorage.setItem('spiritualMindProfile', JSON.stringify(updatedProfile));
    
    toast({
      title: "Milestone Achieved! 🎉",
      description: `Congratulations on achieving: ${milestone.name}`,
    });
  };

  const currentMetric = progressMetrics[selectedMetric as keyof typeof progressMetrics];

  return (
    <div className="space-y-6">
      {/* Overall Progress Overview */}
      <Card className="bg-blue-900/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-200 flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Progress Tracking & Development
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-blue-200">Overall Development</span>
                <Badge className="bg-purple-600/20 text-purple-200">
                  {progressMetrics.overall.value}%
                </Badge>
              </div>
              <Progress value={progressMetrics.overall.value} className="h-3" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-blue-200">
                <strong>This Week:</strong> {weeklyStats.practiceHours}h practiced
              </div>
              <div className="text-blue-200">
                <strong>Sessions:</strong> {weeklyStats.sessions} completed
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Progress Metrics */}
      <Card className="bg-purple-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-200">Skill Development Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {Object.entries(progressMetrics).map(([key, metric]) => {
              const IconComponent = metric.icon;
              return (
                <Button
                  key={key}
                  onClick={() => setSelectedMetric(key)}
                  variant={selectedMetric === key ? "default" : "outline"}
                  className={`flex-col h-auto p-3 ${
                    selectedMetric === key 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'border-purple-400/30 text-purple-200 hover:bg-purple-600/20'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mb-1" />
                  <span className="text-xs text-center">{metric.title}</span>
                  <Badge className="mt-1 bg-purple-800/30 text-purple-200 text-xs">
                    {metric.value}%
                  </Badge>
                </Button>
              );
            })}
          </div>

          {currentMetric && (
            <div className="bg-purple-800/20 p-4 rounded-lg border border-purple-600/30">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-purple-200 font-semibold flex items-center gap-2">
                  <currentMetric.icon className="w-4 h-4" />
                  {currentMetric.title}
                </h4>
                <div className="flex gap-2">
                  <Button
                    onClick={() => updateProgress(selectedMetric, 5)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    +5%
                  </Button>
                  <Button
                    onClick={() => updateProgress(selectedMetric, 1)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    +1%
                  </Button>
                </div>
              </div>
              <p className="text-purple-300 text-sm mb-3">{currentMetric.description}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-200 text-sm">Progress</span>
                <span className="text-purple-200 text-sm">{currentMetric.value}%</span>
              </div>
              <Progress value={currentMetric.value} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Milestones & Achievements */}
      <Card className="bg-yellow-900/20 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-200 flex items-center gap-2">
            <Star className="w-6 h-6" />
            Development Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  milestone.achieved 
                    ? 'bg-green-800/20 border-green-600/30' 
                    : 'bg-yellow-800/20 border-yellow-600/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    milestone.achieved 
                      ? 'bg-green-600 text-white' 
                      : 'bg-yellow-600 text-white'
                  }`}>
                    {milestone.achieved ? '✓' : index + 1}
                  </div>
                  <div>
                    <h4 className={`font-semibold ${
                      milestone.achieved ? 'text-green-200' : 'text-yellow-200'
                    }`}>
                      {milestone.name}
                    </h4>
                    <p className={`text-xs ${
                      milestone.achieved ? 'text-green-300' : 'text-yellow-300'
                    }`}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
                {!milestone.achieved && (
                  <Button
                    onClick={() => achieveMilestone(index)}
                    size="sm"
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    Achieve
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Statistics */}
      <Card className="bg-green-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-200 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Weekly Practice Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-200">{weeklyStats.practiceHours}</div>
              <div className="text-green-300 text-sm">Hours Practiced</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-200">{weeklyStats.sessions}</div>
              <div className="text-green-300 text-sm">Sessions Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-200">{weeklyStats.successes}</div>
              <div className="text-green-300 text-sm">Successful Attempts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-200">{weeklyStats.plateauDays}</div>
              <div className="text-green-300 text-sm">Plateau Days</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
