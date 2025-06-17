
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Shield, Zap, Heart, AlertTriangle, Eye, Sparkles, Clock, CheckCircle, HelpCircle } from 'lucide-react';
import { ARVisualizationPlaceholder } from './ARVisualizationPlaceholder';

interface RitualActivation {
  ritual: any;
  safetyCheck: {
    passed: boolean;
    incidents: Array<{
      type: string;
      message: string;
      severity: 'low' | 'medium' | 'high';
    }>;
    disclaimer: string;
  };
  arComponents: any;
  biometricRequirements: any;
  userProfile: any;
  emergencyProtocols: any;
}

interface SituationCard {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  urgency: 'low' | 'medium' | 'high';
}

const SPIRITUAL_SITUATIONS: SituationCard[] = [
  {
    value: 'protection',
    label: 'Spiritual Protection',
    description: 'Shield against negative energies and psychic attacks',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-blue-600 to-cyan-600',
    urgency: 'high'
  },
  {
    value: 'healing',
    label: 'Spiritual Healing',
    description: 'Physical, emotional, and spiritual restoration',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-green-600 to-emerald-600',
    urgency: 'medium'
  },
  {
    value: 'divine_guidance',
    label: 'Divine Guidance',
    description: 'Seek wisdom and direction from higher sources',
    icon: <Eye className="w-6 h-6" />,
    color: 'from-purple-600 to-violet-600',
    urgency: 'low'
  },
  {
    value: 'cleansing',
    label: 'Spiritual Cleansing',
    description: 'Remove spiritual impurities and reset energy',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-yellow-600 to-orange-600',
    urgency: 'medium'
  },
  {
    value: 'banishing',
    label: 'Banishing Ritual',
    description: 'Remove unwanted spiritual influences',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-red-600 to-pink-600',
    urgency: 'high'
  },
  {
    value: 'spiritual_attack',
    label: 'Spiritual Attack Response',
    description: 'Emergency response to active spiritual assault',
    icon: <AlertTriangle className="w-6 h-6" />,
    color: 'from-red-700 to-red-900',
    urgency: 'high'
  }
];

export const RitualActivationSystem: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedSituation, setSelectedSituation] = useState<string>('');
  const [isActivating, setIsActivating] = useState(false);
  const [currentActivation, setCurrentActivation] = useState<RitualActivation | null>(null);
  const [showARViewer, setShowARViewer] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  // Auto-detect emergency situations
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emergency = urlParams.get('emergency');
    if (emergency) {
      setEmergencyMode(true);
      setSelectedSituation('spiritual_attack');
      handleRitualActivation('spiritual_attack');
    }
  }, []);

  const handleRitualActivation = async (situation: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to activate spiritual rituals.",
        variant: "destructive"
      });
      return;
    }

    setIsActivating(true);
    setSelectedSituation(situation);

    try {
      console.log('Activating ritual for situation:', situation);

      const { data, error } = await supabase.functions.invoke('activate-ritual', {
        body: { 
          situation,
          userTradition: localStorage.getItem(`tradition_${user.id}`) || 'eclectic'
        }
      });

      if (error) throw error;

      console.log('Ritual activation response:', data);
      setCurrentActivation(data);

      // Check safety status
      const highSeverityIncidents = data.safetyCheck.incidents.filter(
        (incident: any) => incident.severity === 'high'
      );

      if (highSeverityIncidents.length > 0) {
        toast({
          title: "Safety Warning ⚠️",
          description: "High-risk factors detected. Please review safety guidelines.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Ritual Activated ✨",
          description: `${SPIRITUAL_SITUATIONS.find(s => s.value === situation)?.label} ritual prepared.`,
        });
        
        if (data.arComponents.hasAR) {
          setShowARViewer(true);
        }
      }

    } catch (error) {
      console.error('Error activating ritual:', error);
      toast({
        title: "Activation Error",
        description: "Failed to activate ritual. Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsActivating(false);
    }
  };

  const handleEmergencyExit = () => {
    setShowARViewer(false);
    setCurrentActivation(null);
    setEmergencyMode(false);
    toast({
      title: "Safe Exit Complete",
      description: "You have safely exited the ritual space.",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-500 border-red-500';
      case 'medium': return 'text-yellow-500 border-yellow-500';
      case 'low': return 'text-blue-500 border-blue-500';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Emergency Mode Banner */}
        {emergencyMode && (
          <Alert className="border-red-500 bg-red-900/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-200">
              Emergency Spiritual Response Mode Activated - Immediate protection protocols engaged
            </AlertDescription>
          </Alert>
        )}

        {/* Main Activation Interface */}
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-400" />
              Sacred Ritual Activation System
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!currentActivation ? (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl text-white mb-2">Select Your Current Spiritual Need</h3>
                  <p className="text-purple-200">Choose the situation that best describes your current spiritual requirement</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SPIRITUAL_SITUATIONS.map((situation) => (
                    <Card
                      key={situation.value}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                        selectedSituation === situation.value 
                          ? 'border-purple-500 bg-purple-900/50' 
                          : 'border-gray-600 bg-gray-800/50 hover:border-purple-400'
                      }`}
                      onClick={() => handleRitualActivation(situation.value)}
                    >
                      <CardContent className="p-4">
                        <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${situation.color} flex items-center justify-center mb-3`}>
                          <div className="text-white">
                            {situation.icon}
                          </div>
                        </div>
                        <h4 className="text-white font-semibold mb-2">{situation.label}</h4>
                        <p className="text-gray-300 text-sm mb-3">{situation.description}</p>
                        <div className="flex justify-between items-center">
                          <Badge 
                            variant="outline" 
                            className={`${getSeverityColor(situation.urgency)} text-xs`}
                          >
                            {situation.urgency.toUpperCase()} PRIORITY
                          </Badge>
                          {isActivating && selectedSituation === situation.value && (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <RitualActivationDisplay 
                activation={currentActivation}
                onEmergencyExit={handleEmergencyExit}
                showARViewer={showARViewer}
                onToggleAR={() => setShowARViewer(!showARViewer)}
                selectedSituation={selectedSituation}
              />
            )}
          </CardContent>
        </Card>

        {/* Emergency Exit Button - Always Visible */}
        {(currentActivation || emergencyMode) && (
          <div className="fixed bottom-6 right-6">
            <Button
              onClick={handleEmergencyExit}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-lg"
              size="lg"
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              Emergency Exit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Ritual Activation Display Component
const RitualActivationDisplay: React.FC<{
  activation: RitualActivation;
  onEmergencyExit: () => void;
  showARViewer: boolean;
  onToggleAR: () => void;
  selectedSituation: string;
}> = ({ activation, onEmergencyExit, showARViewer, onToggleAR, selectedSituation }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');

  const instructions = activation.ritual.instructions;
  const steps = instructions?.steps || [];

  const handleStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
      toast({
        title: "Step Completed ✓",
        description: `Step ${stepIndex + 1} marked as complete`,
      });
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAskQuestion = () => {
    if (userQuestion.trim()) {
      toast({
        title: "Question Submitted",
        description: "Your question about ritual performance has been recorded for guidance.",
      });
      setUserQuestion('');
      setShowQuestionDialog(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Ritual Information Header */}
      <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          {activation.ritual.sacred_texts?.title} - Psalm {activation.ritual.psalm_number}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2 text-purple-200">
            <Clock className="w-4 h-4" />
            Duration: {instructions?.duration || '20-30 minutes'}
          </div>
          <div className="text-purple-200">
            Steps: {steps.length} total
          </div>
          <div className="text-purple-200">
            Completed: {completedSteps.length}/{steps.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Preparation Steps */}
      {instructions?.preparation && (
        <Card className="bg-blue-900/20 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-200 text-lg">Preparation Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-blue-100 font-semibold mb-3">Before starting, please ensure you have:</p>
              <ul className="space-y-2">
                {instructions.preparation.map((prep: string, index: number) => (
                  <li key={index} className="text-blue-100 flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    {prep}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step-by-Step Instructions */}
      {steps.length > 0 && (
        <Card className="bg-gray-900/30 border-gray-600/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <div className="flex gap-2">
                <Button 
                  onClick={handlePrevStep} 
                  disabled={currentStep === 0}
                  variant="outline" 
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
                >
                  Previous
                </Button>
                <Button 
                  onClick={handleNextStep} 
                  disabled={currentStep === steps.length - 1}
                  variant="outline" 
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {steps[currentStep] && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-semibold text-white">
                    {steps[currentStep].action}
                  </h4>
                  <Button
                    onClick={() => handleStepComplete(currentStep)}
                    className={`${
                      completedSteps.includes(currentStep) 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                    size="sm"
                  >
                    {completedSteps.includes(currentStep) ? (
                      <><CheckCircle className="w-4 h-4 mr-1" /> Completed</>
                    ) : (
                      'Mark Complete'
                    )}
                  </Button>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30">
                  <h5 className="text-white font-semibold mb-3">What to do:</h5>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    {steps[currentStep].details}
                  </p>
                  
                  {steps[currentStep].specific_actions && (
                    <div className="mb-4">
                      <h6 className="text-purple-300 font-semibold mb-2">Specific Actions:</h6>
                      <ul className="space-y-1">
                        {steps[currentStep].specific_actions.map((action: string, index: number) => (
                          <li key={index} className="text-gray-300 flex items-start gap-2">
                            <span className="text-purple-400">▶</span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {steps[currentStep].timing && (
                  <div className="flex items-center gap-2 text-purple-300 bg-purple-900/20 rounded-lg p-3">
                    <Clock className="w-4 h-4" />
                    <span>Timing: {steps[currentStep].timing}</span>
                  </div>
                )}
                
                {steps[currentStep].visualization && (
                  <div className="bg-purple-900/30 rounded-lg p-4 border-l-4 border-purple-500">
                    <h5 className="text-purple-200 font-semibold mb-2">Visualization Guide:</h5>
                    <p className="text-purple-100 italic">
                      {steps[currentStep].visualization}
                    </p>
                  </div>
                )}

                {steps[currentStep].expected_sensations && (
                  <div className="bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-400">
                    <h5 className="text-blue-200 font-semibold mb-2">What You Might Experience:</h5>
                    <p className="text-blue-100">
                      {steps[currentStep].expected_sensations}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Required Materials and Step Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-green-900/20 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-200">Required Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {activation.ritual.required_materials?.map((material: string, index: number) => (
                <Badge key={index} variant="outline" className="text-white border-green-400">
                  {material.replace(/_/g, ' ')}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/20 border-gray-500/30">
          <CardHeader>
            <CardTitle className="text-gray-200">Step Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {steps.map((step: any, index: number) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                    index === currentStep 
                      ? 'bg-purple-600/30 border border-purple-500' 
                      : 'hover:bg-gray-800/50'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  {completedSteps.includes(index) ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
                  )}
                  <span className={`text-sm ${
                    index === currentStep ? 'text-white font-semibold' : 'text-gray-300'
                  }`}>
                    {step.action}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ask Question Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => setShowQuestionDialog(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3"
          size="lg"
        >
          <HelpCircle className="w-5 h-5 mr-2" />
          Ask Question About Ritual Performance
        </Button>
      </div>

      {/* Question Dialog */}
      {showQuestionDialog && (
        <Card className="bg-indigo-900/20 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-200">Ask About Ritual Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="What would you like to know about performing this ritual correctly?"
              className="w-full h-24 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
            />
            <div className="flex gap-2 justify-end">
              <Button
                onClick={() => setShowQuestionDialog(false)}
                variant="outline"
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAskQuestion}
                className="bg-indigo-600 hover:bg-indigo-700"
                disabled={!userQuestion.trim()}
              >
                Submit Question
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Safety Incidents */}
      {activation.safetyCheck.incidents.length > 0 && (
        <div className="space-y-2">
          {activation.safetyCheck.incidents.map((incident, index) => (
            <Alert key={index} className={`border-${incident.severity === 'high' ? 'red' : incident.severity === 'medium' ? 'yellow' : 'blue'}-500`}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-white">
                <strong>{incident.type.replace(/_/g, ' ').toUpperCase()}:</strong> {incident.message}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Cultural Disclaimer */}
      <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
        <p className="text-blue-200 text-sm">
          <strong>Cultural Guidance:</strong> {activation.safetyCheck.disclaimer}
        </p>
      </div>

      {/* AR Viewer Toggle */}
      {activation.arComponents.hasAR && (
        <div className="flex justify-center">
          <Button
            onClick={onToggleAR}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            size="lg"
          >
            <Eye className="w-5 h-5 mr-2" />
            {showARViewer ? 'Exit AR View' : 'Enter AR Sacred Space'}
          </Button>
        </div>
      )}

      {/* Enhanced AR Visualization */}
      {showARViewer && (
        <ARVisualizationPlaceholder 
          ritualType={selectedSituation}
          sealSvg={activation.ritual.seal_svg}
        />
      )}
    </div>
  );
};
