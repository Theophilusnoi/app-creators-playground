import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Star, 
  Users, 
  Flame, 
  Compass, 
  Mic, 
  Camera,
  CheckCircle,
  Circle,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuantumShieldActivationProps {
  quantumShieldActive?: boolean;
  setQuantumShieldActive?: (active: boolean) => void;
  setUserProfile?: (profile: any) => void;
}

export const QuantumShieldActivation: React.FC<QuantumShieldActivationProps> = ({
  quantumShieldActive = false,
  setQuantumShieldActive,
  setUserProfile
}) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [ancestorNames, setAncestorNames] = useState<string[]>(['']);

  const activationSteps = [
    {
      id: 1,
      name: 'Bloodline Consecration',
      description: 'Speak names of 7 ancestors → AI builds genetic protection profile',
      icon: Users,
      color: 'purple',
      duration: '2 minutes',
      action: 'speakAncestors'
    },
    {
      id: 2,
      name: 'Elemental Attunement',
      description: 'Burn zodiac-specific herb bundle (e.g., sage for fire, cedar for earth)',
      icon: Flame,
      color: 'red',
      duration: '1 minute',
      action: 'burnHerbs'
    },
    {
      id: 3,
      name: 'Sacred Geometry Tattoo',
      description: 'AR projects temporary Yantra onto palm (72-hour charge)',
      icon: Compass,
      color: 'blue',
      duration: '1 minute',
      action: 'projectYantra'
    },
    {
      id: 4,
      name: 'Divine Name Embodiment',
      description: 'Chant AI-generated mantra blending 3 traditions (e.g., "AUM MICHAEL SEKHEM")',
      icon: Mic,
      color: 'gold',
      duration: '2 minutes',
      action: 'chantMantra'
    },
    {
      id: 5,
      name: 'Celestial Anchor',
      description: 'Phone captures night sky → calculates personal star alignment',
      icon: Camera,
      color: 'indigo',
      duration: '1 minute',
      action: 'captureStars'
    }
  ];

  const addAncestor = () => {
    if (ancestorNames.length < 7) {
      setAncestorNames([...ancestorNames, '']);
    }
  };

  const updateAncestorName = (index: number, name: string) => {
    const newNames = [...ancestorNames];
    newNames[index] = name;
    setAncestorNames(newNames);
  };

  const removeAncestor = (index: number) => {
    if (ancestorNames.length > 1) {
      const newNames = ancestorNames.filter((_, i) => i !== index);
      setAncestorNames(newNames);
    }
  };

  const performStep = async (stepId: number) => {
    const step = activationSteps.find(s => s.id === stepId);
    if (!step) return;

    setCurrentStep(stepId);
    
    // Special handling for bloodline consecration
    if (step.action === 'speakAncestors' && ancestorNames.filter(name => name.trim()).length < 3) {
      toast({
        title: "Insufficient Ancestor Names",
        description: "Please provide at least 3 ancestor names to continue",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Ritual Step Initiated",
      description: `Beginning ${step.name}...`,
    });

    // Simulate ritual duration
    const duration = step.duration === '2 minutes' ? 3000 : 2000;
    
    setTimeout(() => {
      setCompletedSteps(prev => [...prev, stepId]);
      setCurrentStep(0);
      
      toast({
        title: "Step Complete",
        description: `${step.name} successfully performed`,
      });

      // Check if all steps are complete
      if (completedSteps.length + 1 === activationSteps.length) {
        setTimeout(() => {
          if (setQuantumShieldActive) {
            setQuantumShieldActive(true);
          }
          toast({
            title: "🌟 Quantum Shield Activated! 🌟",
            description: "Your shield is now quantum-entangled with benevolent cosmic forces.",
          });
        }, 1000);
      }
    }, duration);
  };

  const getStepStatus = (stepId: number) => {
    if (completedSteps.includes(stepId)) return 'complete';
    if (currentStep === stepId) return 'active';
    return 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-600/20 text-green-200 border-green-500/30';
      case 'active': return 'bg-blue-600/20 text-blue-200 border-blue-500/30';
      default: return 'bg-gray-600/20 text-gray-200 border-gray-500/30';
    }
  };

  const progressPercentage = (completedSteps.length / activationSteps.length) * 100;

  if (quantumShieldActive) {
    return (
      <Card className="bg-gradient-to-r from-gold-900/30 to-purple-900/30 border-gold-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Sparkles className="w-16 h-16 text-gold-400 mx-auto" />
            <h3 className="text-3xl font-bold text-gold-200">Quantum Shield Active!</h3>
            <p className="text-gold-300 text-lg">
              Your shield is now quantum-entangled with benevolent cosmic forces.
            </p>
            <Badge className="bg-gold-600/20 text-gold-200 text-xl px-6 py-3">
              PROTECTION STATUS: MAXIMUM
            </Badge>
            <div className="mt-6 text-gold-200">
              <p className="italic">
                "True protection harmonizes Egyptian heka, Vedic mantras, and Solomonic seals - 
                not as separate traditions, but as facets of one universal defensive science."
              </p>
              <p className="mt-2 text-sm">- Grandmaster Neteru, Lineage Holder</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Star className="w-6 h-6 text-purple-400" />
            7-Minute Quantum Shield Installation
          </CardTitle>
          <p className="text-purple-200">Activation Ritual (User Onboarding)</p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-200">Activation Progress</span>
              <span className="text-white font-bold">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Bloodline Consecration Special Interface */}
      {currentStep === 1 || (!completedSteps.includes(1) && currentStep === 0) ? (
        <Card className="bg-purple-900/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-400" />
              Bloodline Consecration
            </CardTitle>
            <p className="text-purple-200">Enter the names of your ancestors (minimum 3, maximum 7)</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ancestorNames.map((name, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`Ancestor ${index + 1} name`}
                    value={name}
                    onChange={(e) => updateAncestorName(index, e.target.value)}
                    className="bg-black/30 border-purple-500/30 text-white"
                  />
                  {ancestorNames.length > 1 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeAncestor(index)}
                      className="border-red-500/30 text-red-400"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              
              <div className="flex gap-2">
                {ancestorNames.length < 7 && (
                  <Button
                    size="sm"
                    onClick={addAncestor}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Add Ancestor
                  </Button>
                )}
                <Button
                  onClick={() => performStep(1)}
                  disabled={ancestorNames.filter(name => name.trim()).length < 3}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Begin Consecration
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {activationSteps.map((step) => {
            const Icon = step.icon;
            const status = getStepStatus(step.id);
            const isCompleted = completedSteps.includes(step.id);
            const isActive = currentStep === step.id;
            
            return (
              <Card 
                key={step.id}
                className={`bg-black/30 border-${step.color}-500/30 transition-all duration-300 ${
                  isActive ? 'ring-2 ring-blue-500/50' : ''
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${step.color}-600/20`}>
                        <Icon className={`w-5 h-5 text-${step.color}-400`} />
                      </div>
                      <div>
                        <div className="text-lg">Step {step.id}: {step.name}</div>
                        <div className="text-sm text-gray-300 font-normal">
                          Duration: {step.duration}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(status)}>
                        {status.toUpperCase()}
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => performStep(step.id)}
                        disabled={isCompleted || isActive}
                        className={`bg-${step.color}-600 hover:bg-${step.color}-700`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-3 h-3 mr-2" />
                        ) : (
                          <Circle className="w-3 h-3 mr-2" />
                        )}
                        {isCompleted ? 'Complete' : isActive ? 'In Progress...' : 'Begin'}
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200 text-sm">{step.description}</p>
                  {isActive && (
                    <div className="mt-3">
                      <Progress value={50} className="h-2" />
                      <p className="text-blue-300 text-sm mt-2">Performing ritual step...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
