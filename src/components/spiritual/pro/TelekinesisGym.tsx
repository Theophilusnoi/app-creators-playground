
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Zap, 
  Target, 
  Eye, 
  Shield,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface TelekinesisGymProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
}

export const TelekinesisGym: React.FC<TelekinesisGymProps> = ({ 
  userProfile, 
  setUserProfile 
}) => {
  const { toast } = useToast();
  const [currentStage, setCurrentStage] = useState('energy-sensitivity');
  const [practiceActive, setPracticeActive] = useState(false);
  const [ethicsAffirmed, setEthicsAffirmed] = useState(false);

  const stages = {
    'energy-sensitivity': {
      name: 'Energy Sensitivity',
      description: 'Psi wheel priming with thermal field detection',
      progress: 78,
      validation: 'Thermal gloves (EM field measurement)',
      safetyLevel: 'Safe'
    },
    'micromovement': {
      name: 'Micromovement',
      description: 'Feather levitation in controlled environment',
      progress: 34,
      validation: 'Laser grid tracker (0.01mm precision)',
      safetyLevel: 'Monitored'
    },
    'macro-control': {
      name: 'Macro Control',
      description: 'Multi-object coordination training',
      progress: 12,
      validation: 'AR force vector visualization',
      safetyLevel: 'Restricted'
    }
  };

  const safetyRestrictions = [
    'No living organisms',
    'Objects under 500g only',
    'Electronics prohibited (EM interference)',
    'Daily ethical affirmation required'
  ];

  const startPractice = () => {
    if (!ethicsAffirmed) {
      toast({
        title: "Ethics Affirmation Required",
        description: "Please confirm your ethical commitment before practicing",
        variant: "destructive",
      });
      return;
    }
    
    setPracticeActive(true);
    toast({
      title: "Practice Session Started",
      description: `${stages[currentStage as keyof typeof stages].name} training activated`,
    });
  };

  const stopPractice = () => {
    setPracticeActive(false);
    toast({
      title: "Session Complete",
      description: "Neural pathways recorded and analyzed",
    });
  };

  const affirmEthics = () => {
    setEthicsAffirmed(true);
    toast({
      title: "Ethics Confirmed",
      description: "\"I wield energy only for collective good\" - Affirmation recorded",
    });
  };

  return (
    <div className="space-y-6">
      {/* Ethics Affirmation */}
      <Card className="bg-yellow-900/20 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-200 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Daily Ethics Commitment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-800/20 p-4 rounded-lg border border-yellow-600/30">
            <p className="text-yellow-100 italic text-center text-lg">
              "I wield energy only for collective good"
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-yellow-200">Today's Affirmation:</span>
            {ethicsAffirmed ? (
              <Badge className="bg-green-600/20 text-green-200">
                <CheckCircle className="w-4 h-4 mr-1" />
                Confirmed
              </Badge>
            ) : (
              <Button onClick={affirmEthics} className="bg-yellow-600 hover:bg-yellow-700">
                Affirm Ethics
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stage Selection */}
      <Card className="bg-purple-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-200 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Training Stages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(stages).map(([key, stage]) => (
            <div 
              key={key}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                currentStage === key 
                  ? 'bg-purple-800/30 border-purple-400/50' 
                  : 'bg-gray-800/20 border-gray-600/30 hover:bg-gray-800/30'
              }`}
              onClick={() => setCurrentStage(key)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-purple-100 font-semibold">{stage.name}</h3>
                <Badge className={`${
                  stage.safetyLevel === 'Safe' ? 'bg-green-600/20 text-green-200' :
                  stage.safetyLevel === 'Monitored' ? 'bg-yellow-600/20 text-yellow-200' :
                  'bg-red-600/20 text-red-200'
                }`}>
                  {stage.safetyLevel}
                </Badge>
              </div>
              <p className="text-purple-300 text-sm mb-3">{stage.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-200">Progress</span>
                  <span className="text-purple-200">{stage.progress}%</span>
                </div>
                <Progress value={stage.progress} className="h-2" />
                <p className="text-purple-400 text-xs">{stage.validation}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Practice Control */}
      <Card className="bg-indigo-900/20 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-200 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Practice Session
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-indigo-100 font-semibold">
                {stages[currentStage as keyof typeof stages].name}
              </h3>
              <p className="text-indigo-300 text-sm">
                {stages[currentStage as keyof typeof stages].description}
              </p>
            </div>
            <Button
              onClick={practiceActive ? stopPractice : startPractice}
              disabled={!ethicsAffirmed}
              className={`${
                practiceActive 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              } disabled:opacity-50`}
            >
              {practiceActive ? 'Stop Practice' : 'Start Practice'}
            </Button>
          </div>
          
          {practiceActive && (
            <div className="bg-indigo-800/20 p-4 rounded-lg border border-indigo-600/30">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-indigo-400" />
                <span className="text-indigo-200 font-semibold">AR Visualization Active</span>
              </div>
              <p className="text-indigo-300 text-sm">
                Force vectors and energy fields are being tracked in real-time
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Safety Restrictions */}
      <Card className="bg-red-900/20 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-200 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Safety Restrictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyRestrictions.map((restriction, index) => (
              <div key={index} className="flex items-center gap-2 text-red-200">
                <Shield className="w-4 h-4 text-red-400" />
                <span className="text-sm">{restriction}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
