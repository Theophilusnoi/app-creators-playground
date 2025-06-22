
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
  CheckCircle,
  Clock,
  Brain,
  Wind
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
  const [currentStage, setCurrentStage] = useState('foundation');
  const [practiceActive, setPracticeActive] = useState(false);
  const [ethicsAffirmed, setEthicsAffirmed] = useState(false);
  const [sessionTimer, setSessionTimer] = useState(0);

  const trainingStages = {
    'foundation': {
      name: 'Foundation Building',
      description: 'Concentration meditation & energy awareness development',
      duration: '4 weeks',
      progress: 78,
      validation: 'Daily meditation tracking (20-30 min)',
      safetyLevel: 'Safe',
      techniques: [
        'Breathing technique: 4-4-8 pattern',
        'Single-pointed concentration on candle flame',
        'Palm energy sensing between hands',
        'Basic visualization of simple objects'
      ],
      ancientWisdom: 'Egyptian Ka energy preparation - developing ethereal double awareness'
    },
    'object-connection': {
      name: 'Object Connection',
      description: 'Establishing energetic links with target materials',
      duration: '4 weeks',
      progress: 45,
      validation: 'Psi wheel construction & observation',
      safetyLevel: 'Monitored',
      techniques: [
        'Psi wheel creation (paper pyramid on needle)',
        'Energetic merging visualization',
        'Candle flame responsiveness testing',
        'Connection bridge from solar plexus to object'
      ],
      ancientWisdom: 'Buddhist siddhi development - mind-matter interface recognition'
    },
    'micromovement': {
      name: 'Micromovement Mastery',
      description: 'First detectable object influence under controlled conditions',
      duration: '8 weeks',
      progress: 23,
      validation: 'Laser grid tracker (0.01mm precision)',
      safetyLevel: 'Restricted',
      techniques: [
        'Feather levitation in vacuum chamber',
        'Intention transmission through energy bridge',
        'Thermal influence on lightweight materials',
        'Electromagnetic field focusing techniques'
      ],
      ancientWisdom: 'Yoruba Ase power - drum-rhythm synchronized intention'
    },
    'macro-control': {
      name: 'Macro Object Control',
      description: 'Multi-object coordination & precision manipulation',
      duration: '12+ weeks',
      progress: 8,
      validation: 'AR force vector visualization',
      safetyLevel: 'Expert Only',
      techniques: [
        'Multiple object simultaneous influence',
        'Complex geometric pattern creation',
        'Distance variation exercises',
        'Sustained manipulation protocols'
      ],
      ancientWisdom: 'Ancient Egyptian hieroglyphic focus - temple hologram integration'
    }
  };

  const safetyProtocols = [
    'No living organisms (cellular interference risk)',
    'Objects under 500g only (energy conservation)',
    'Electronics prohibited (EM field disruption)',
    'Daily ethical affirmation required',
    'Maximum 45 minutes per session',
    'Mercury retrograde practice suspension',
    'Chakra alignment verification before advanced work'
  ];

  const energyPrinciples = [
    'Matter as vibrating energy patterns (quantum perspective)',
    'Chakra system coordination: Root-Brow-Crown-Hands',
    'Bioelectromagnetic field extension and focusing',
    'Consciousness-matter interface through Ka/ethereal double',
    'Energy field resonance rather than force application'
  ];

  const startPractice = () => {
    if (!ethicsAffirmed) {
      toast({
        title: "Ethics Affirmation Required",
        description: "Please confirm your commitment to responsible practice",
        variant: "destructive",
      });
      return;
    }
    
    setPracticeActive(true);
    const currentTraining = trainingStages[currentStage as keyof typeof trainingStages];
    toast({
      title: "Training Session Activated",
      description: `${currentTraining.name} - ${currentTraining.duration} program`,
    });
  };

  const stopPractice = () => {
    setPracticeActive(false);
    toast({
      title: "Session Complete",
      description: "Neural pathways recorded • Energy patterns analyzed",
    });
  };

  const affirmEthics = () => {
    setEthicsAffirmed(true);
    toast({
      title: "Ethical Commitment Confirmed",
      description: "\"I wield consciousness energy only for collective wisdom and growth\"",
    });
  };

  const currentTraining = trainingStages[currentStage as keyof typeof trainingStages];

  return (
    <div className="space-y-6">
      {/* Ancient Wisdom Context */}
      <Card className="bg-amber-900/20 border-amber-500/30">
        <CardHeader>
          <CardTitle className="text-amber-200 flex items-center gap-2">
            <Eye className="w-6 h-6" />
            Ancient Telekinetic Traditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-amber-800/20 p-3 rounded-lg border border-amber-600/30">
              <h4 className="text-amber-200 font-semibold mb-2">Egyptian Ka Energy</h4>
              <p className="text-amber-300">Hieroglyphic symbols as consciousness conduits, ethereal double development</p>
            </div>
            <div className="bg-amber-800/20 p-3 rounded-lg border border-amber-600/30">
              <h4 className="text-amber-200 font-semibold mb-2">Buddhist Siddhis</h4>
              <p className="text-amber-300">Systematic mind-matter interface through ethical meditation practice</p>
            </div>
            <div className="bg-amber-800/20 p-3 rounded-lg border border-amber-600/30">
              <h4 className="text-amber-200 font-semibold mb-2">Yoruba Ase Power</h4>
              <p className="text-amber-300">Rhythm-synchronized intention through sacred drum patterns</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ethics Affirmation */}
      <Card className="bg-yellow-900/20 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-200 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Ethical Commitment Protocol
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-800/20 p-4 rounded-lg border border-yellow-600/30">
            <p className="text-yellow-100 italic text-center text-lg font-medium">
              "I commit to developing consciousness abilities within ethical boundaries, using telekinetic practice only for wisdom, growth, and the collective good of all beings."
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-yellow-200">Daily Affirmation Status:</span>
            {ethicsAffirmed ? (
              <Badge className="bg-green-600/20 text-green-200">
                <CheckCircle className="w-4 h-4 mr-1" />
                Confirmed Today
              </Badge>
            ) : (
              <Button onClick={affirmEthics} className="bg-yellow-600 hover:bg-yellow-700">
                Affirm Ethical Practice
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progressive Training Stages */}
      <Card className="bg-purple-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-200 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Progressive Training System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(trainingStages).map(([key, stage]) => (
            <div 
              key={key}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                currentStage === key 
                  ? 'bg-purple-800/30 border-purple-400/50' 
                  : 'bg-gray-800/20 border-gray-600/30 hover:bg-gray-800/30'
              }`}
              onClick={() => setCurrentStage(key)}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-purple-100 font-semibold text-lg">{stage.name}</h3>
                  <p className="text-purple-300 text-sm">{stage.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600/20 text-blue-200">
                    <Clock className="w-3 h-3 mr-1" />
                    {stage.duration}
                  </Badge>
                  <Badge className={`${
                    stage.safetyLevel === 'Safe' ? 'bg-green-600/20 text-green-200' :
                    stage.safetyLevel === 'Monitored' ? 'bg-yellow-600/20 text-yellow-200' :
                    stage.safetyLevel === 'Restricted' ? 'bg-orange-600/20 text-orange-200' :
                    'bg-red-600/20 text-red-200'
                  }`}>
                    {stage.safetyLevel}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-200">Mastery Progress</span>
                  <span className="text-purple-200">{stage.progress}%</span>
                </div>
                <Progress value={stage.progress} className="h-2" />
                
                <div className="text-xs text-purple-400 bg-purple-900/30 p-2 rounded">
                  <strong>Ancient Wisdom:</strong> {stage.ancientWisdom}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div>
                    <strong className="text-purple-200">Validation:</strong>
                    <span className="text-purple-300 ml-1">{stage.validation}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Active Training Session */}
      <Card className="bg-indigo-900/20 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-200 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Active Training: {currentTraining.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-indigo-800/20 p-4 rounded-lg border border-indigo-600/30">
            <h4 className="text-indigo-200 font-semibold mb-3">Core Techniques:</h4>
            <ul className="space-y-2">
              {currentTraining.techniques.map((technique, index) => (
                <li key={index} className="text-indigo-300 text-sm flex items-start">
                  <Wind className="w-3 h-3 mr-2 mt-1 text-indigo-400 flex-shrink-0" />
                  {technique}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-300 text-sm mb-2">{currentTraining.description}</p>
              <p className="text-indigo-400 text-xs">Duration: {currentTraining.duration}</p>
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
              {practiceActive ? 'End Session' : 'Begin Training'}
            </Button>
          </div>
          
          {practiceActive && (
            <div className="bg-indigo-800/20 p-4 rounded-lg border border-indigo-600/30">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-indigo-400" />
                <span className="text-indigo-200 font-semibold">Consciousness Monitoring Active</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-indigo-300">
                <div>Neural coherence: Tracking</div>
                <div>Energy field: Stabilizing</div>
                <div>Chakra alignment: Monitoring</div>
                <div>Intention clarity: Measuring</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Energy Principles */}
      <Card className="bg-cyan-900/20 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-200 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Scientific Energy Principles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {energyPrinciples.map((principle, index) => (
              <div key={index} className="flex items-start gap-2 text-cyan-200 text-sm">
                <Zap className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Safety Protocols */}
      <Card className="bg-red-900/20 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-200 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Enhanced Safety Protocols
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyProtocols.map((protocol, index) => (
              <div key={index} className="flex items-start gap-2 text-red-200 text-sm">
                <Shield className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>{protocol}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-red-800/20 p-3 rounded-lg border border-red-600/30">
            <p className="text-red-200 text-sm font-medium">
              <strong>Important:</strong> All telekinetic training focuses on neuroplasticity development and consciousness expansion. Physical effects, when achieved, result from refined energy awareness rather than supernatural force.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
