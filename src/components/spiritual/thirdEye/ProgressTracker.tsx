
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Eye, Star, CheckCircle2, Lock } from 'lucide-react';

interface ProgressTrackerProps {
  progress: any;
  milestones: any[];
  stages: any[];
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress, milestones, stages }) => {
  const getActivationLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-600/20 text-blue-200';
      case 'Intermediate': return 'bg-purple-600/20 text-purple-200';
      case 'Advanced': return 'bg-gold-600/20 text-yellow-200';
      default: return 'bg-gray-600/20 text-gray-200';
    }
  };

  const getActivationDescription = (level: string) => {
    switch (level) {
      case 'Beginner': return 'Your pineal gland is beginning to respond to spiritual practices.';
      case 'Intermediate': return 'You\'re developing consistent third eye sensitivity and awareness.';
      case 'Advanced': return 'Your Ajna chakra is highly activated with regular spiritual insights.';
      default: return 'Continue your practice to unlock your inner vision.';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-200">
            <Eye className="w-6 h-6" />
            Third Eye Activation Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-white">
              {Math.round(progress.overallProgress)}%
            </div>
            <div className="text-purple-200">Activated</div>
            <Progress value={progress.overallProgress} className="h-3" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-black/20 rounded-lg p-3">
              <Clock className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
              <div className="text-xl font-semibold text-white">{progress.totalTime}</div>
              <div className="text-sm text-indigo-200">Minutes Practiced</div>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
              <div className="text-xl font-semibold text-white">{progress.milestones.length}</div>
              <div className="text-sm text-yellow-200">Milestones Unlocked</div>
            </div>
          </div>

          <div className="text-center">
            <Badge className={`${getActivationLevelColor(progress.activationLevel)} text-lg px-4 py-2`}>
              {progress.activationLevel} Level
            </Badge>
            <p className="text-purple-200 text-sm mt-2">
              {getActivationDescription(progress.activationLevel)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-indigo-200">
            <Trophy className="w-6 h-6" />
            Achievement Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  milestone.unlocked
                    ? 'bg-green-600/20 border-green-400/50 text-green-200'
                    : 'bg-gray-800/20 border-gray-600/30 text-gray-400'
                }`}
              >
                {milestone.unlocked ? (
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                ) : (
                  <Lock className="w-6 h-6 text-gray-500" />
                )}
                <div className="flex-1">
                  <div className="font-semibold">{milestone.name}</div>
                  <div className="text-sm opacity-80">{milestone.description}</div>
                </div>
                {milestone.unlocked && (
                  <Star className="w-5 h-5 text-yellow-400" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stage Breakdown */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-200">
            <Star className="w-6 h-6" />
            Stage Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stages.map((stage, index) => {
              const stageProgress = progress.stageProgress[index];
              const Icon = stage.icon;
              
              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    stageProgress?.completed
                      ? 'bg-green-600/20 border-green-400/50'
                      : 'bg-gray-800/20 border-gray-600/30'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${
                    stageProgress?.completed ? 'text-green-400' : 'text-gray-500'
                  }`} />
                  <div className="flex-1">
                    <div className={`font-semibold ${
                      stageProgress?.completed ? 'text-green-200' : 'text-gray-400'
                    }`}>
                      {stage.title}
                    </div>
                    <div className={`text-sm ${
                      stageProgress?.completed ? 'text-green-300' : 'text-gray-500'
                    }`}>
                      {stage.description}
                    </div>
                    {stageProgress?.completed && stageProgress.timestamp && (
                      <div className="text-xs text-green-400 mt-1">
                        Completed: {new Date(stageProgress.timestamp).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  {stageProgress?.completed && (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
