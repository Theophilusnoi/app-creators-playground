
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Shield, Zap, Heart, AlertTriangle, Eye, Sparkles } from 'lucide-react';

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

// Ritual Activation Display Component
const RitualActivationDisplay: React.FC<{
  activation: RitualActivation;
  onEmergencyExit: () => void;
  showARViewer: boolean;
  onToggleAR: () => void;
}> = ({ activation, onEmergencyExit, showARViewer, onToggleAR }) => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      {/* Ritual Information */}
      <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-bold text-white mb-4">
          {activation.ritual.sacred_texts?.title} - Psalm {activation.ritual.psalm_number}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-purple-200 font-semibold mb-2">Instructions:</h4>
            <div className="text-white space-y-2">
              {activation.ritual.instructions?.steps?.map((step: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">{index + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-purple-200 font-semibold mb-2">Required Materials:</h4>
            <div className="flex flex-wrap gap-2">
              {activation.ritual.required_materials?.map((material: string, index: number) => (
                <Badge key={index} variant="outline" className="text-white border-purple-400">
                  {material.replace(/_/g, ' ')}
                </Badge>
              ))}
            </div>
            
            <div className="mt-4">
              <h4 className="text-purple-200 font-semibold mb-2">Duration:</h4>
              <p className="text-white">{activation.ritual.instructions?.duration || '15-30 minutes'}</p>
            </div>
          </div>
        </div>
      </div>

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

      {/* AR Visualization Placeholder */}
      {showARViewer && (
        <div className="bg-black rounded-lg p-8 border border-purple-500/50 min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h4 className="text-xl text-white mb-2">Sacred AR Space Active</h4>
            <p className="text-purple-200">AR visualization would appear here in production</p>
            <p className="text-sm text-gray-400 mt-2">
              Sacred geometry, protective circles, and guided visualizations
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
