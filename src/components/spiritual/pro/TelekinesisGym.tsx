import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Zap, 
  Target, 
  Eye, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Brain,
  Wind,
  BookOpen,
  BarChart3,
  Users
} from 'lucide-react';

// Import new components
import { TroubleshootingGuide } from './telekinesis/TroubleshootingGuide';
import { SafetyProtocols } from './telekinesis/SafetyProtocols';
import { ProgressTracker } from './telekinesis/ProgressTracker';
import { EthicalGuidelines } from './telekinesis/EthicalGuidelines';

interface TelekinesisGymProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
}

export const TelekinesisGym: React.FC<TelekinesisGymProps> = ({ 
  userProfile, 
  setUserProfile 
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('training');
  const [currentStage, setCurrentStage] = useState('foundation');
  const [practiceActive, setPracticeActive] = useState(false);
  const [ethicsCompleted, setEthicsCompleted] = useState(userProfile?.telekinesisEthics || false);
  const [safetyCompleted, setSafetyCompleted] = useState(userProfile?.telekinesisSafety || false);

  const trainingStages = {
    'foundation': {
      name: 'Foundation Building',
      description: 'Concentration meditation & energy awareness development',
      duration: '4 weeks',
      progress: userProfile?.telekinesisProgress?.foundation || 78,
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
      progress: userProfile?.telekinesisProgress?.objectConnection || 45,
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
      progress: userProfile?.telekinesisProgress?.micromovement || 23,
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
      progress: userProfile?.telekinesisProgress?.macroControl || 8,
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

  const navigationTabs = [
    { id: 'ethics', label: 'Ethical Guidelines', icon: Shield, required: true },
    { id: 'safety', label: 'Safety Protocols', icon: AlertTriangle, required: true },
    { id: 'training', label: 'Training System', icon: Target, enabled: ethicsCompleted && safetyCompleted },
    { id: 'progress', label: 'Progress Tracking', icon: BarChart3, enabled: ethicsCompleted && safetyCompleted },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: Brain, enabled: true }
  ];

  const handleEthicsComplete = (completed: boolean) => {
    setEthicsCompleted(completed);
    const updatedProfile = { ...userProfile, telekinesisEthics: completed };
    setUserProfile(updatedProfile);
    localStorage.setItem('spiritualMindProfile', JSON.stringify(updatedProfile));
    
    if (completed) {
      toast({
        title: "Ethical Commitment Complete",
        description: "You have made your sacred commitment to ethical practice",
      });
    }
  };

  const handleSafetyComplete = (completed: boolean) => {
    setSafetyCompleted(completed);
    const updatedProfile = { ...userProfile, telekinesisSafety: completed };
    setUserProfile(updatedProfile);
    localStorage.setItem('spiritualMindProfile', JSON.stringify(updatedProfile));
    
    if (completed) {
      toast({
        title: "Safety Protocols Acknowledged",
        description: "You may now proceed with telekinetic training",
      });
    }
  };

  const startPractice = () => {
    if (!ethicsCompleted || !safetyCompleted) {
      toast({
        title: "Requirements Not Met",
        description: "Please complete ethics and safety requirements first",
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

  const canAccessTab = (tab: any) => {
    if (tab.required) return true;
    return tab.enabled;
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <Card className="bg-gray-900/20 border-gray-500/30">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {navigationTabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              const isAccessible = canAccessTab(tab);
              
              return (
                <Button
                  key={tab.id}
                  onClick={() => isAccessible && setActiveTab(tab.id)}
                  disabled={!isAccessible}
                  variant={isActive ? "default" : "outline"}
                  className={`flex items-center gap-2 ${
                    isActive 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : isAccessible
                        ? 'border-gray-400/30 text-gray-200 hover:bg-gray-600/20'
                        : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                  {tab.required && <Badge className="bg-red-600/20 text-red-200 ml-1">Required</Badge>}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Conditional Content Based on Active Tab */}
      {activeTab === 'ethics' && !ethicsCompleted && (
        <EthicalGuidelines onEthicsComplete={handleEthicsComplete} />
      )}

      {activeTab === 'ethics' && ethicsCompleted && (
        <Card className="bg-green-900/20 border-green-500/30">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-green-200 text-xl font-semibold mb-2">Ethical Commitment Complete</h3>
            <p className="text-green-300">You have made your sacred commitment to ethical telekinetic practice.</p>
          </CardContent>
        </Card>
      )}

      {activeTab === 'safety' && !safetyCompleted && (
        <SafetyProtocols onSafetyCheckComplete={handleSafetyComplete} />
      )}

      {activeTab === 'safety' && safetyCompleted && (
        <Card className="bg-green-900/20 border-green-500/30">
          <CardContent className="pt-6 text-center">
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-green-200 text-xl font-semibold mb-2">Safety Protocols Acknowledged</h3>
            <p className="text-green-300">You have acknowledged all safety guidelines and may proceed with training.</p>
          </CardContent>
        </Card>
      )}

      {activeTab === 'training' && (
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
                    
                    
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div>
                        <strong className="text-purple-200">Validation:</strong>
                        <span className="text-purple-300 ml-1">{stage.validation}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-xs text-purple-400 bg-purple-900/30 p-2 rounded">
                      <strong>Ancient Wisdom:</strong> {stage.ancientWisdom}
                    </div>
                    
                    <div className="bg-indigo-800/20 p-3 rounded-lg border border-indigo-600/30">
                      <h4 className="text-indigo-200 font-semibold mb-2">Core Techniques:</h4>
                      <ul className="space-y-1">
                        {stage.techniques.map((technique, index) => (
                          <li key={index} className="text-indigo-300 text-sm flex items-start">
                            <Wind className="w-3 h-3 mr-2 mt-1 text-indigo-400 flex-shrink-0" />
                            {technique}
                          </li>
                        ))}
                      </ul>
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
                Active Training: {trainingStages[currentStage as keyof typeof trainingStages].name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-300 text-sm mb-2">
                    {trainingStages[currentStage as keyof typeof trainingStages].description}
                  </p>
                  <p className="text-indigo-400 text-xs">
                    Duration: {trainingStages[currentStage as keyof typeof trainingStages].duration}
                  </p>
                </div>
                <Button
                  onClick={practiceActive ? stopPractice : startPractice}
                  className={`${
                    practiceActive 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
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
        </div>
      )}

      {activeTab === 'progress' && (
        <ProgressTracker userProfile={userProfile} setUserProfile={setUserProfile} />
      )}

      {activeTab === 'troubleshooting' && (
        <TroubleshootingGuide userProfile={userProfile} />
      )}
    </div>
  );
};
