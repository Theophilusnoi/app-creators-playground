
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, Star, Sparkles, Heart, Eye, ArrowRight, 
  CheckCircle, AlertTriangle, Leaf, Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JourneySetupProps {
  selectedJourney: string;
  onJourneyStart: (setupData: any) => void;
  onBack: () => void;
}

const JourneySetup: React.FC<JourneySetupProps> = ({ selectedJourney, onJourneyStart, onBack }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [intention, setIntention] = useState('');
  const [selectedProtection, setSelectedProtection] = useState<string[]>([]);
  const [emotionalState, setEmotionalState] = useState('');
  const [safetyChecklist, setSafetyChecklist] = useState({
    quietSpace: false,
    comfortablePosition: false,
    noDisturb: false,
    groundingObject: false
  });

  const protectionOptions = [
    {
      id: 'light_shield',
      name: 'Light Shield',
      icon: <Sparkles className="w-5 h-5" />,
      description: 'Surround yourself with protective white light',
      color: 'bg-yellow-100 border-yellow-300 text-yellow-800'
    },
    {
      id: 'angel_circle',
      name: 'Angel Circle',
      icon: <Star className="w-5 h-5" />,
      description: 'Call upon angels for protection and guidance',
      color: 'bg-blue-100 border-blue-300 text-blue-800'
    },
    {
      id: 'grounding_cord',
      name: 'Grounding Cord',
      icon: <Leaf className="w-5 h-5" />,
      description: 'Maintain connection to Earth energy',
      color: 'bg-green-100 border-green-300 text-green-800'
    },
    {
      id: 'spirit_guide',
      name: 'Spirit Guide Call',
      icon: <Heart className="w-5 h-5" />,
      description: 'Request your spirit guides to accompany you',
      color: 'bg-purple-100 border-purple-300 text-purple-800'
    }
  ];

  const emotionalStates = ['Calm', 'Excited', 'Curious', 'Nervous', 'Peaceful', 'Energetic'];

  const handleProtectionToggle = (protectionId: string) => {
    setSelectedProtection(prev => 
      prev.includes(protectionId) 
        ? prev.filter(id => id !== protectionId)
        : [...prev, protectionId]
    );
  };

  const handleSafetyToggle = (item: keyof typeof safetyChecklist) => {
    setSafetyChecklist(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleNext = () => {
    if (currentStep === 1 && !intention.trim()) {
      toast({
        title: "Intention Required",
        description: "Please set your intention for this journey",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2 && selectedProtection.length === 0) {
      toast({
        title: "Protection Required",
        description: "Please select at least one protection method",
        variant: "destructive"
      });
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStartJourney = () => {
    const allSafetyChecked = Object.values(safetyChecklist).every(Boolean);
    
    if (!allSafetyChecked) {
      toast({
        title: "Safety Check Incomplete",
        description: "Please complete all safety requirements",
        variant: "destructive"
      });
      return;
    }

    const setupData = {
      journeyType: selectedJourney,
      intention,
      protection: selectedProtection,
      emotionalState,
      safetyChecklist,
      timestamp: new Date().toISOString()
    };

    onJourneyStart(setupData);
  };

  const stepTitles = [
    "Set Your Intention",
    "Choose Protection",
    "Emotional Check-in",
    "Safety Verification"
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6" style={{ backgroundColor: '#F5FFF5' }}>
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              {selectedJourney} Journey Setup
            </CardTitle>
            <Button 
              onClick={onBack}
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
            >
              Back
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-green-100">Step {currentStep} of 4:</span>
            <span className="text-white font-semibold">{stepTitles[currentStep - 1]}</span>
          </div>
          <Progress value={(currentStep / 4) * 100} className="mt-2 bg-white/20" />
        </CardHeader>
      </Card>

      {/* Step Content */}
      <Card className="bg-white/80 border-green-200">
        <CardContent className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-800 mb-2">What is your intention today?</h3>
                <p className="text-green-600">Be clear and specific about what guidance or experience you seek</p>
              </div>
              
              <div className="space-y-4">
                <Textarea
                  value={intention}
                  onChange={(e) => setIntention(e.target.value)}
                  placeholder="I seek guidance about... / I want to connect with... / I wish to heal..."
                  className="min-h-[120px] border-green-300 focus:border-green-500"
                />
                
                <div className="grid grid-cols-2 gap-2">
                  {['Healing', 'Guidance', 'Past Life', 'Spirit Guide', 'Wisdom', 'Clarity'].map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      className="border-green-300 text-green-700 hover:bg-green-50"
                      onClick={() => setIntention(prev => prev + (prev ? ', ' : '') + suggestion.toLowerCase())}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-800 mb-2">Choose Your Protection Methods</h3>
                <p className="text-green-600">Select the protective energies that resonate with you</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {protectionOptions.map((protection) => (
                  <div
                    key={protection.id}
                    onClick={() => handleProtectionToggle(protection.id)}
                    className={`
                      p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${selectedProtection.includes(protection.id) 
                        ? protection.color + ' border-current' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {protection.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{protection.name}</h4>
                        <p className="text-sm opacity-80">{protection.description}</p>
                      </div>
                      {selectedProtection.includes(protection.id) && (
                        <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Heart className="w-12 h-12 text-pink-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-800 mb-2">How are you feeling right now?</h3>
                <p className="text-green-600">Understanding your emotional state helps ensure a safe journey</p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {emotionalStates.map((state) => (
                    <Button
                      key={state}
                      variant={emotionalState === state ? "default" : "outline"}
                      className={
                        emotionalState === state 
                          ? "bg-green-600 hover:bg-green-700" 
                          : "border-green-300 text-green-700 hover:bg-green-50"
                      }
                      onClick={() => setEmotionalState(state)}
                    >
                      {state}
                    </Button>
                  ))}
                </div>
                
                <Textarea
                  placeholder="Any additional thoughts or concerns about this journey?"
                  className="border-green-300 focus:border-green-500"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-800 mb-2">Safety Verification</h3>
                <p className="text-green-600">Ensure your environment is prepared for a safe journey</p>
              </div>
              
              <div className="space-y-4">
                {[
                  { key: 'quietSpace', label: 'I am in a quiet, private space', icon: <Leaf className="w-4 h-4" /> },
                  { key: 'comfortablePosition', label: 'I am in a comfortable position', icon: <Heart className="w-4 h-4" /> },
                  { key: 'noDisturb', label: 'I will not be disturbed for the next hour', icon: <Clock className="w-4 h-4" /> },
                  { key: 'groundingObject', label: 'I have a grounding object nearby', icon: <Star className="w-4 h-4" /> }
                ].map((item) => (
                  <div
                    key={item.key}
                    onClick={() => handleSafetyToggle(item.key as keyof typeof safetyChecklist)}
                    className={`
                      flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${safetyChecklist[item.key as keyof typeof safetyChecklist]
                        ? 'bg-green-100 border-green-300 text-green-800'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }
                    `}
                  >
                    {item.icon}
                    <span className="flex-1 font-medium">{item.label}</span>
                    {safetyChecklist[item.key as keyof typeof safetyChecklist] && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          variant="outline"
          className="border-green-300 text-green-700 hover:bg-green-50"
        >
          Previous
        </Button>
        
        {currentStep < 4 ? (
          <Button
            onClick={handleNext}
            className="bg-green-600 hover:bg-green-700"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleStartJourney}
            className="bg-green-600 hover:bg-green-700"
            disabled={!Object.values(safetyChecklist).every(Boolean)}
          >
            Begin Journey
            <Sparkles className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default JourneySetup;
