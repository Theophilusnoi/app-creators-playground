
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { VoicePlayer } from './VoicePlayer';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';

interface AngelEntity {
  id: number;
  name: string;
  title: string;
  color: string;
  symbol: string;
  meditationGuide: string;
  domain: string;
}

interface AngelMeditationInterfaceProps {
  angel: AngelEntity;
  onBack: () => void;
}

export const AngelMeditationInterface: React.FC<AngelMeditationInterfaceProps> = ({
  angel,
  onBack
}) => {
  const [isActive, setIsActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [totalDuration] = useState(10 * 60); // 10 minutes default
  const [phase, setPhase] = useState<'preparation' | 'meditation' | 'completion'>('preparation');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeElapsed < totalDuration) {
      interval = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;
          if (newTime >= totalDuration) {
            setIsActive(false);
            setPhase('completion');
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeElapsed, totalDuration]);

  const startMeditation = () => {
    setIsActive(true);
    setPhase('meditation');
    setTimeElapsed(0);
  };

  const pauseMeditation = () => {
    setIsActive(false);
  };

  const resumeMeditation = () => {
    setIsActive(true);
  };

  const resetMeditation = () => {
    setIsActive(false);
    setTimeElapsed(0);
    setPhase('preparation');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (timeElapsed / totalDuration) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-purple-200 hover:text-white hover:bg-purple-400/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Angels
          </Button>
        </div>

        {/* Main Meditation Card */}
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl border-2"
                style={{ 
                  backgroundColor: `${angel.color}20`,
                  borderColor: `${angel.color}40`
                }}
              >
                {angel.symbol}
              </div>
            </div>
            <CardTitle className="text-2xl text-white">
              Meditation with {angel.name}
            </CardTitle>
            <p className="text-purple-200">{angel.title}</p>
            <p className="text-purple-300 text-sm">Domain: {angel.domain}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {phase === 'preparation' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Meditation Guidance</h3>
                  <p className="text-purple-100 leading-relaxed whitespace-pre-line">
                    {angel.meditationGuide}
                  </p>
                </div>

                <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Preparation Steps:</h4>
                  <ul className="text-purple-200 space-y-2">
                    <li>• Find a quiet, comfortable space</li>
                    <li>• Sit with your spine straight but relaxed</li>
                    <li>• Close your eyes and take three deep breaths</li>
                    <li>• Set your intention to connect with {angel.name}</li>
                    <li>• Let go of any expectations</li>
                  </ul>
                </div>

                <div className="flex justify-center space-x-4">
                  <VoicePlayer 
                    script={`Welcome to your meditation with ${angel.name}, ${angel.title}. ${angel.meditationGuide} Take your time to prepare, and when you're ready, begin your meditation.`}
                    tone="nurturing_gentle"
                  />
                  <Button
                    onClick={startMeditation}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Begin Meditation
                  </Button>
                </div>
              </div>
            )}

            {phase === 'meditation' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">
                    {formatTime(timeElapsed)}
                  </div>
                  <p className="text-green-200 mb-4">
                    Connecting with {angel.name}...
                  </p>
                  <Progress 
                    value={progressPercentage} 
                    className="w-full h-2 mb-4"
                  />
                  <p className="text-purple-200 text-sm">
                    {formatTime(totalDuration - timeElapsed)} remaining
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/50 rounded-lg p-6 text-center">
                  <div className="text-purple-100 leading-relaxed mb-4">
                    Focus on your breath and visualize {angel.name}'s presence surrounding you with {angel.color} light.
                  </div>
                  <div className="text-sm text-purple-300">
                    "Allow the divine energy of {angel.name} to flow through you"
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={isActive ? pauseMeditation : resumeMeditation}
                    variant="outline"
                    className="border-purple-500/50 text-purple-200 hover:bg-purple-700/30"
                  >
                    {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isActive ? 'Pause' : 'Resume'}
                  </Button>
                  <Button
                    onClick={resetMeditation}
                    variant="outline"
                    className="border-gray-500/50 text-gray-200 hover:bg-gray-700/30"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            )}

            {phase === 'completion' && (
              <div className="space-y-6 text-center">
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Meditation Complete
                </h3>
                <p className="text-green-200 text-lg mb-4">
                  You have successfully connected with {angel.name}
                </p>
                <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border border-green-500/50 rounded-lg p-6">
                  <p className="text-green-100 leading-relaxed">
                    Take a moment to express gratitude to {angel.name} for their guidance and protection. 
                    Carry this divine connection with you throughout your day.
                  </p>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={resetMeditation}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Meditate Again
                  </Button>
                  <Button
                    onClick={onBack}
                    variant="outline"
                    className="border-purple-500/50 text-purple-200 hover:bg-purple-700/30"
                  >
                    Return to Angels
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
