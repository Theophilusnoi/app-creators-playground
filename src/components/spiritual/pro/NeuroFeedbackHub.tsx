
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Waves, 
  Eye, 
  Activity,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface NeuroFeedbackHubProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
}

export const NeuroFeedbackHub: React.FC<NeuroFeedbackHubProps> = ({ 
  userProfile, 
  setUserProfile 
}) => {
  const { toast } = useToast();
  const [eegConnected, setEegConnected] = useState(false);
  const [gsrConnected, setGsrConnected] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [brainwaveData, setBrainwaveData] = useState({
    alpha: 45,
    beta: 30,
    theta: 60,
    delta: 20,
    gamma: 35
  });
  const [stressLevel, setStressLevel] = useState(25);

  useEffect(() => {
    // Simulate real-time brainwave data
    if (sessionActive) {
      const interval = setInterval(() => {
        setBrainwaveData(prev => ({
          alpha: Math.max(0, Math.min(100, prev.alpha + (Math.random() - 0.5) * 10)),
          beta: Math.max(0, Math.min(100, prev.beta + (Math.random() - 0.5) * 8)),
          theta: Math.max(0, Math.min(100, prev.theta + (Math.random() - 0.5) * 12)),
          delta: Math.max(0, Math.min(100, prev.delta + (Math.random() - 0.5) * 6)),
          gamma: Math.max(0, Math.min(100, prev.gamma + (Math.random() - 0.5) * 15))
        }));
        setStressLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 8)));
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [sessionActive]);

  const startSession = () => {
    if (!eegConnected) {
      toast({
        title: "EEG Device Required",
        description: "Please connect your EEG headset to begin neuro-feedback",
        variant: "destructive",
      });
      return;
    }
    
    setSessionActive(true);
    toast({
      title: "Neuro-Feedback Session Started",
      description: "Real-time brainwave monitoring active",
    });
  };

  const stopSession = () => {
    setSessionActive(false);
    toast({
      title: "Session Complete",
      description: "Neural patterns recorded and analyzed",
    });
  };

  const connectDevice = (device: 'eeg' | 'gsr') => {
    if (device === 'eeg') {
      setEegConnected(true);
      toast({
        title: "EEG Connected",
        description: "Brainwave monitoring ready",
      });
    } else {
      setGsrConnected(true);
      toast({
        title: "GSR Sensor Connected",
        description: "Stress level monitoring active",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Device Connection Status */}
      <Card className="bg-indigo-900/20 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-200 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Device Connection Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-indigo-800/20 rounded-lg border border-indigo-600/30">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-400" />
                <span className="text-indigo-200">EEG Headset</span>
              </div>
              {eegConnected ? (
                <Badge className="bg-green-600/20 text-green-200">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Connected
                </Badge>
              ) : (
                <Button 
                  onClick={() => connectDevice('eeg')}
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Connect
                </Button>
              )}
            </div>
            
            <div className="flex items-center justify-between p-3 bg-indigo-800/20 rounded-lg border border-indigo-600/30">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400" />
                <span className="text-indigo-200">GSR Sensor</span>
              </div>
              {gsrConnected ? (
                <Badge className="bg-green-600/20 text-green-200">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Connected
                </Badge>
              ) : (
                <Button 
                  onClick={() => connectDevice('gsr')}
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Connect
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Brainwave Data */}
      <Card className="bg-purple-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-200 flex items-center gap-2">
            <Waves className="w-6 h-6" />
            Real-Time Brainwave Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-purple-200">Monitoring Status:</span>
            <Button
              onClick={sessionActive ? stopSession : startSession}
              className={`${
                sessionActive 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {sessionActive ? 'Stop Monitoring' : 'Start Session'}
            </Button>
          </div>
          
          <div className="space-y-3">
            {Object.entries(brainwaveData).map(([wave, value]) => (
              <div key={wave} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-purple-200 capitalize">
                    {wave} Waves
                    {wave === 'alpha' && ' (Relaxation)'}
                    {wave === 'beta' && ' (Focus)'}
                    {wave === 'theta' && ' (Meditation)'}
                    {wave === 'delta' && ' (Deep Sleep)'}
                    {wave === 'gamma' && ' (Consciousness)'}
                  </span>
                  <span className="text-purple-100">{Math.round(value)}%</span>
                </div>
                <Progress 
                  value={value} 
                  className={`h-2 ${
                    wave === 'theta' ? 'opacity-100' : 'opacity-70'
                  }`}
                />
              </div>
            ))}
          </div>
          
          {sessionActive && brainwaveData.theta > 70 && (
            <div className="bg-green-800/20 p-3 rounded-lg border border-green-600/30">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-200 font-semibold">Optimal Meditation State Detected</span>
              </div>
              <p className="text-green-300 text-sm mt-1">
                Theta waves indicate deep meditative consciousness
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stress Level Monitoring */}
      <Card className="bg-yellow-900/20 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-200 flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            Stress Level Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-yellow-200">Current Stress Level:</span>
            <Badge className={`${
              stressLevel < 30 ? 'bg-green-600/20 text-green-200' :
              stressLevel < 60 ? 'bg-yellow-600/20 text-yellow-200' :
              'bg-red-600/20 text-red-200'
            }`}>
              {Math.round(stressLevel)}%
            </Badge>
          </div>
          
          <Progress 
            value={stressLevel} 
            className="h-3"
          />
          
          {sessionActive && stressLevel > 75 && (
            <div className="bg-red-800/20 p-3 rounded-lg border border-red-600/30">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-200 font-semibold">High Stress Detected</span>
              </div>
              <p className="text-red-300 text-sm mt-1">
                Session paused for safety - please take a break
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Binaural Beat Adjustment */}
      <Card className="bg-cyan-900/20 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-200 flex items-center gap-2">
            <Eye className="w-6 h-6" />
            Adaptive Binaural Beats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-800/20 p-3 rounded-lg border border-cyan-600/30">
              <h4 className="text-cyan-200 font-semibold mb-2">Current Frequency</h4>
              <p className="text-cyan-100">
                {brainwaveData.theta > 50 ? '6Hz (Deep Theta)' : '10Hz (Alpha)'}
              </p>
            </div>
            
            <div className="bg-cyan-800/20 p-3 rounded-lg border border-cyan-600/30">
              <h4 className="text-cyan-200 font-semibold mb-2">Auto-Adjustment</h4>
              <p className="text-cyan-100">
                {sessionActive ? 'Active' : 'Standby'}
              </p>
            </div>
          </div>
          
          <p className="text-cyan-300 text-sm">
            Binaural beats automatically adjust based on your real-time brainwave patterns
            to optimize your spiritual practice experience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
