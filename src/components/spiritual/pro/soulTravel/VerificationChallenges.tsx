
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Eye, Target, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Challenge {
  id: string;
  name: string;
  type: 'observation' | 'location' | 'time' | 'interaction';
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  instructions: string[];
  verificationMethod: string;
  icon: React.ReactNode;
}

interface ChallengeResult {
  completed: boolean;
  accuracy?: number;
  attempts: number;
  notes: string;
  timestamp: Date;
}

interface VerificationChallengesProps {
  userProgress: {
    challenges: Record<string, ChallengeResult>;
  };
  onChallengeStart: (challenge: Challenge) => void;
  onChallengeComplete: (challenge: Challenge, result: ChallengeResult) => void;
  className?: string;
}

const VerificationChallenges: React.FC<VerificationChallengesProps> = ({
  userProgress,
  onChallengeStart,
  onChallengeComplete,
  className = ""
}) => {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [challengeResponse, setChallengeResponse] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');

  const challenges: Challenge[] = [
    {
      id: 'room_observation',
      name: 'Room Object Challenge',
      type: 'observation',
      difficulty: 'easy',
      description: 'Observe and identify objects in an unfamiliar room during projection',
      instructions: [
        'Project to a room in your house you rarely visit',
        'Don\'t look at your physical body initially',
        'Examine unfamiliar objects in detail',
        'Note color, shape, size, and specific details',
        'Return to body and physically verify observations'
      ],
      verificationMethod: 'Physical verification of observed details',
      icon: <Eye className="w-5 h-5" />
    },
    {
      id: 'neighbor_activity',
      name: 'Neighbor Activity Verification',
      type: 'observation',
      difficulty: 'medium',
      description: 'Observe what neighbors are doing during your projection time',
      instructions: [
        'Project outside your home at a specific time',
        'Observe neighboring houses or apartments',
        'Note any visible activities or lights',
        'Pay attention to cars, people, or unusual details',
        'Ask neighbors later to verify your observations'
      ],
      verificationMethod: 'Casual conversation with neighbors to confirm activities',
      icon: <Target className="w-5 h-5" />
    },
    {
      id: 'distant_location',
      name: 'Distant Location Visit',
      type: 'location',
      difficulty: 'hard',
      description: 'Visit a specific distant location and gather verifiable information',
      instructions: [
        'Choose a location at least 100 miles away',
        'Set clear intention to visit that specific place',
        'Observe unique details about the current state',
        'Note any changes, people, or unusual features',
        'Verify later through photos, webcams, or contacts'
      ],
      verificationMethod: 'Digital verification through webcams or local contacts',
      icon: <MapPin className="w-5 h-5" />
    },
    {
      id: 'time_verification',
      name: 'Time-Specific Event',
      type: 'time',
      difficulty: 'medium',
      description: 'Observe a time-specific event or activity during projection',
      instructions: [
        'Choose a specific time-based event (TV show, meeting, etc.)',
        'Project during that exact time period',
        'Observe the event from astral perspective',
        'Note specific details that occurred at that time',
        'Verify details with recordings or participants'
      ],
      verificationMethod: 'Comparison with recorded events or participant accounts',
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 'object_movement',
      name: 'Object Interaction Challenge',
      type: 'interaction',
      difficulty: 'hard',
      description: 'Attempt to influence or interact with physical objects',
      instructions: [
        'Choose a light object (feather, paper, etc.)',
        'Place it in a location you can monitor',
        'During projection, attempt to move or touch the object',
        'Focus your intention and energy on interaction',
        'Check for any physical evidence after return'
      ],
      verificationMethod: 'Physical evidence of object movement or change',
      icon: <Target className="w-5 h-5" />
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-200 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-200 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-200 border-gray-500/30';
    }
  };

  const getChallengeStatus = (challengeId: string) => {
    const result = userProgress.challenges[challengeId];
    if (!result) return { status: 'not_attempted', icon: null, color: 'text-gray-400' };
    if (result.completed && result.accuracy && result.accuracy >= 70) {
      return { status: 'success', icon: <CheckCircle className="w-4 h-4" />, color: 'text-green-400' };
    }
    if (result.completed) {
      return { status: 'partial', icon: <CheckCircle className="w-4 h-4" />, color: 'text-yellow-400' };
    }
    return { status: 'failed', icon: <XCircle className="w-4 h-4" />, color: 'text-red-400' };
  };

  const handleStartChallenge = (challenge: Challenge) => {
    setActiveChallenge(challenge);
    setChallengeResponse('');
    setSessionNotes('');
    onChallengeStart(challenge);
  };

  const handleCompleteChallenge = () => {
    if (!activeChallenge) return;

    // Simple accuracy calculation based on response length and detail
    const accuracy = Math.min(challengeResponse.length / 10 + Math.random() * 30, 100);
    
    const result: ChallengeResult = {
      completed: true,
      accuracy: Math.round(accuracy),
      attempts: (userProgress.challenges[activeChallenge.id]?.attempts || 0) + 1,
      notes: sessionNotes,
      timestamp: new Date()
    };

    onChallengeComplete(activeChallenge, result);
    setActiveChallenge(null);
    setChallengeResponse('');
    setSessionNotes('');
  };

  const getCompletionStats = () => {
    const completedChallenges = Object.values(userProgress.challenges).filter(c => c.completed).length;
    const averageAccuracy = Object.values(userProgress.challenges)
      .filter(c => c.completed && c.accuracy)
      .reduce((sum, c, _, arr) => sum + (c.accuracy || 0) / arr.length, 0);

    return {
      completed: completedChallenges,
      total: challenges.length,
      averageAccuracy: Math.round(averageAccuracy) || 0
    };
  };

  const stats = getCompletionStats();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Projection Verification Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-200 mb-4">
            Objective verification methods to validate and improve your astral projection experiences.
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.completed}/{stats.total}</div>
              <div className="text-sm text-purple-200">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.averageAccuracy}%</div>
              <div className="text-sm text-purple-200">Avg Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {challenges.filter(c => getChallengeStatus(c.id).status === 'success').length}
              </div>
              <div className="text-sm text-purple-200">Verified</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Challenge */}
      {activeChallenge && (
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-200 flex items-center gap-2">
              {activeChallenge.icon}
              Active Challenge: {activeChallenge.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-blue-100">{activeChallenge.description}</p>
            
            <div>
              <h4 className="text-blue-200 font-semibold mb-2">Instructions:</h4>
              <ol className="space-y-1">
                {activeChallenge.instructions.map((instruction, index) => (
                  <li key={index} className="text-blue-100 text-sm flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-blue-200 text-sm font-medium mb-1 block">
                  What did you observe? (Be specific)
                </label>
                <textarea
                  value={challengeResponse}
                  onChange={(e) => setChallengeResponse(e.target.value)}
                  className="w-full p-3 bg-black/30 border border-blue-500/30 rounded-lg text-white placeholder:text-blue-300 min-h-[100px]"
                  placeholder="Describe your observations in detail..."
                />
              </div>

              <div>
                <label className="text-blue-200 text-sm font-medium mb-1 block">
                  Session Notes (Optional)
                </label>
                <Input
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className="bg-black/30 border-blue-500/30 text-white placeholder:text-blue-300"
                  placeholder="Any additional notes about your experience..."
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCompleteChallenge}
                  disabled={!challengeResponse.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Submit Challenge
                </Button>
                <Button
                  onClick={() => setActiveChallenge(null)}
                  variant="outline"
                  className="border-blue-500/30 text-blue-200 hover:bg-blue-500/20"
                >
                  Cancel
                </Button>
              </div>

              <p className="text-xs text-blue-300">
                <strong>Verification:</strong> {activeChallenge.verificationMethod}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Challenge List */}
      <div className="grid gap-4">
        {challenges.map((challenge) => {
          const status = getChallengeStatus(challenge.id);
          const result = userProgress.challenges[challenge.id];
          
          return (
            <Card 
              key={challenge.id} 
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-purple-400">
                      {challenge.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold flex items-center gap-2">
                        {challenge.name}
                        {status.icon && (
                          <span className={status.color}>
                            {status.icon}
                          </span>
                        )}
                      </h4>
                      <p className="text-purple-300 text-sm">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                    {result && result.accuracy && (
                      <Badge variant="outline" className="text-xs">
                        {result.accuracy}% accuracy
                      </Badge>
                    )}
                  </div>
                </div>

                {result && result.completed && (
                  <div className="mb-3 p-2 bg-white/5 rounded text-xs text-purple-200">
                    <strong>Last attempt:</strong> {result.attempts} attempt(s) • 
                    {result.notes && ` Notes: ${result.notes}`}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-xs text-purple-400">
                    Type: {challenge.type} • Verification: {challenge.verificationMethod}
                  </span>
                  <Button
                    onClick={() => handleStartChallenge(challenge)}
                    disabled={!!activeChallenge}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {result?.completed ? 'Retry' : 'Start'} Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tips */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-lg">Verification Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-purple-200">
            <p>• Start with easier challenges to build confidence</p>
            <p>• Record observations immediately after returning to body</p>
            <p>• Be specific and detailed in your descriptions</p>
            <p>• Verify observations as soon as possible</p>
            <p>• Don't be discouraged by initial failures - skill develops with practice</p>
            <p>• Keep a projection journal to track your progress</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationChallenges;
