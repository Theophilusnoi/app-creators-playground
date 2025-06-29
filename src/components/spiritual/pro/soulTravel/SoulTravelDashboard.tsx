import React, { useState, useEffect } from 'react';
import { Sparkles, BarChart3, Settings, BookOpen, Shield, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import SessionManager from './SessionManager';
import TechniqueLibrary from './TechniqueLibrary';
import SafetyProtocols from './SafetyProtocols';
import VerificationChallenges from './VerificationChallenges';
import HealthDisclaimer from './HealthDisclaimer';
import { SafetyValidator, useSafetyMonitoring } from './SafetyValidator';

interface UserProgress {
  totalSessions: number;
  totalMinutes: number;
  level: string;
  challenges: Record<string, any>;
  sessions: any[];
  completedRequirements: string[];
  healthClearance: boolean;
  safetyTrainingComplete: boolean;
}

interface SafetyProtocolsState {
  whiteLight: boolean;
  spiritGuides: boolean;
  grounding: boolean;
  intention: boolean;
}

interface SoulTravelDashboardProps {
  userId?: string;
  userLevel?: string;
  onProgressUpdate?: (progress: UserProgress) => void;
  className?: string;
}

const SoulTravelDashboard: React.FC<SoulTravelDashboardProps> = ({ 
  userId = 'demo',
  userLevel = 'beginner',
  onProgressUpdate,
  className = ""
}) => {
  const { toast } = useToast();
  const safetyMonitoring = useSafetyMonitoring();
  const [activeTab, setActiveTab] = useState('training');
  const [selectedTechnique, setSelectedTechnique] = useState('rope');
  const [safetyProtocols, setSafetyProtocols] = useState<SafetyProtocolsState>({
    whiteLight: true,
    spiritGuides: true,
    grounding: true,
    intention: true
  });
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalSessions: 0,
    totalMinutes: 0,
    level: userLevel,
    challenges: {},
    sessions: [],
    completedRequirements: [],
    healthClearance: false,
    safetyTrainingComplete: false
  });
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [showHealthDisclaimer, setShowHealthDisclaimer] = useState(true);
  const [emergencyMode, setEmergencyMode] = useState(false);

  const tabs = [
    { id: 'training', name: 'Training', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'verification', name: 'Verification', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'safety', name: 'Safety', icon: <Settings className="w-4 h-4" /> },
    { id: 'guide', name: 'Guide', icon: <BookOpen className="w-4 h-4" /> }
  ];

  // Feature gating based on user progress
  const canAccess = (feature: string) => {
    const requirements = {
      basicProjection: [],
      intermediateProjection: ['safety_training_complete', 'basic_sessions_completed'],
      advancedTechniques: ['verification_challenges_completed', 'clean_safety_record'],
      communityFeatures: ['profile_complete', 'intermediate_level']
    };

    const featureReq = requirements[feature as keyof typeof requirements] || [];
    return featureReq.every(req => userProgress.completedRequirements.includes(req));
  };

  // Safety validation before sessions
  const validatePreSession = () => {
    const checks = {
      healthClearance: userProgress.healthClearance,
      safetyTraining: userProgress.safetyTrainingComplete,
      protocolsActive: Object.values(safetyProtocols).every(Boolean),
      environmentSafe: true, // This would be user-confirmed
      emotionalState: true // This would be user-confirmed
    };

    const passed = Object.values(checks).every(Boolean);
    const failedChecks = Object.keys(checks).filter(key => !checks[key as keyof typeof checks]);

    if (!passed) {
      toast({
        title: "Safety Requirements Not Met",
        description: `Please address: ${failedChecks.join(', ')}`,
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  // Emergency protocol handler
  const handleEmergency = (emergencyType: string) => {
    setEmergencyMode(true);
    
    const protocols = {
      difficulty_returning: {
        message: "Focus on physical body sensations. Visualize silver cord connection.",
        actions: ['end_session', 'log_incident', 'activate_grounding']
      },
      negative_encounter: {
        message: "Activate white light protection. Call upon spirit guides.",
        actions: ['end_session', 'activate_protection', 'emergency_contact']
      },
      disorientation: {
        message: "Stop all projection activity. Focus on breathing.",
        actions: ['end_session', 'activate_grounding', 'log_incident']
      }
    };

    const protocol = protocols[emergencyType as keyof typeof protocols] || protocols.disorientation;
    
    toast({
      title: "Emergency Protocol Activated",
      description: protocol.message,
      variant: "destructive"
    });

    // Auto-end current session
    if (currentSession) {
      handleSessionEnd(currentSession.id, {
        endTime: new Date(),
        duration: Date.now() - new Date(currentSession.startTime).getTime(),
        emergency: true,
        emergencyType
      });
    }

    // Reset emergency mode after 5 seconds
    setTimeout(() => setEmergencyMode(false), 5000);
  };

  useEffect(() => {
    // Load user progress from localStorage
    const savedProgress = localStorage.getItem(`soulTravel_${userId}`);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setUserProgress(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, [userId]);

  useEffect(() => {
    // Save progress whenever it changes
    if (userId) {
      localStorage.setItem(`soulTravel_${userId}`, JSON.stringify(userProgress));
      if (onProgressUpdate) {
        onProgressUpdate(userProgress);
      }
    }
  }, [userProgress, userId, onProgressUpdate]);

  // Enhanced session handlers
  const handleSessionStart = (sessionId: string, sessionData: any) => {
    const user = { age: 25, hasHealthRestrictions: false, healthClearance: userProgress.healthClearance };
    
    if (!safetyMonitoring.validateSession(user, sessionData)) {
      return;
    }

    const newSession = {
      id: sessionId,
      ...sessionData,
      technique: selectedTechnique,
      safetyProtocols: { ...safetyProtocols },
      startTime: new Date().toISOString()
    };
    
    setCurrentSession(newSession);
    
    toast({
      title: "Projection Session Started",
      description: `${selectedTechnique} technique is now active. Stay focused and safe.`,
    });

    console.log('Enhanced session started:', newSession);
  };

  const handleSessionEnd = (sessionId: string, sessionData: any) => {
    if (currentSession) {
      const completedSession = {
        ...currentSession,
        ...sessionData,
        endTime: new Date().toISOString()
      };

      setUserProgress(prev => ({
        ...prev,
        totalSessions: prev.totalSessions + 1,
        totalMinutes: prev.totalMinutes + Math.floor(sessionData.duration / 60000),
        sessions: [...prev.sessions, completedSession]
      }));

      setCurrentSession(null);
      
      if (sessionData.emergency) {
        safetyMonitoring.logIncident({
          userId,
          sessionId,
          incidentType: 'emergency_end',
          description: 'Session ended via emergency protocol',
          severity: 'medium'
        });
      }

      toast({
        title: sessionData.emergency ? "Emergency Session End" : "Session Completed",
        description: `Duration: ${Math.floor(sessionData.duration / 60000)} minutes. ${sessionData.emergency ? 'Please ground yourself and rest.' : 'Great work!'}`,
        variant: sessionData.emergency ? "destructive" : "default"
      });

      console.log('Enhanced session completed:', completedSession);
    }
  };

  const handleSessionUpdate = (currentTime: number, sessionId: string) => {
    if (currentSession) {
      setCurrentSession((prev: any) => ({
        ...prev,
        currentDuration: currentTime
      }));
    }
  };

  const handleTechniqueSelect = (technique: any) => {
    setSelectedTechnique(technique.id);
    toast({
      title: "Technique Selected",
      description: `${technique.name} selected. Review the steps before beginning your session.`,
    });
    console.log('Enhanced technique selected:', technique);
  };

  const handleProtocolChange = (protocols: Record<string, boolean>) => {
    const updatedProtocols: SafetyProtocolsState = {
      whiteLight: protocols.whiteLight ?? safetyProtocols.whiteLight,
      spiritGuides: protocols.spiritGuides ?? safetyProtocols.spiritGuides,
      grounding: protocols.grounding ?? safetyProtocols.grounding,
      intention: protocols.intention ?? safetyProtocols.intention
    };
    setSafetyProtocols(updatedProtocols);
  };

  const handleChallengeStart = (challenge: any) => {
    console.log('Challenge started:', challenge);
  };

  const handleChallengeComplete = (challenge: any, result: any) => {
    setUserProgress(prev => ({
      ...prev,
      challenges: {
        ...prev.challenges,
        [challenge.id]: result
      }
    }));
    
    toast({
      title: "Challenge Completed",
      description: `${challenge.name} - Accuracy: ${result.accuracy}%`,
    });

    console.log('Challenge completed:', challenge, result);
  };

  const getProgressStats = () => {
    const completedChallenges = Object.values(userProgress.challenges).filter((c: any) => c.completed).length;
    const totalChallenges = 5;
    const averageAccuracy = Object.values(userProgress.challenges)
      .filter((c: any) => c.completed && c.accuracy)
      .reduce((sum, c: any, _, arr) => sum + c.accuracy / arr.length, 0);

    return {
      completedChallenges,
      totalChallenges,
      averageAccuracy: Math.round(averageAccuracy) || 0,
      totalSessions: userProgress.totalSessions,
      totalHours: Math.round(userProgress.totalMinutes / 60 * 10) / 10
    };
  };

  const stats = getProgressStats();

  return (
    <div className={`max-w-6xl mx-auto space-y-6 ${className}`}>
      {/* Health Disclaimer */}
      {showHealthDisclaimer && (
        <HealthDisclaimer
          onAccept={() => {
            setShowHealthDisclaimer(false);
            setUserProgress(prev => ({ ...prev, healthClearance: true }));
          }}
          onDecline={() => {
            toast({
              title: "Health Requirements Not Met",
              description: "Please address health concerns before practicing astral projection.",
              variant: "destructive"
            });
          }}
        />
      )}

      {/* Emergency Mode Overlay */}
      {emergencyMode && (
        <Card className="bg-red-500/20 border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 text-red-200">
              <Shield className="w-6 h-6" />
              <div>
                <h4 className="font-semibold">Emergency Protocol Active</h4>
                <p className="text-sm">Safety measures have been activated. Grounding and return procedures initiated.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-2xl font-bold flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            Soul Travel Academy
          </h2>
          <div className="text-right">
            <div className="text-purple-200 text-sm">Current Level</div>
            <div className="text-white font-semibold capitalize">{userProgress.level}</div>
          </div>
        </div>
        
        <p className="text-purple-200 mb-4">
          Master the art of conscious out-of-body experiences through structured training, safety protocols, and objective verification.
        </p>

        {/* Safety Status */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm font-medium">Safety Status</span>
          </div>
          <div className="flex gap-2">
            <Badge variant={userProgress.healthClearance ? "default" : "destructive"} className="text-xs">
              Health: {userProgress.healthClearance ? "Cleared" : "Pending"}
            </Badge>
            <Badge variant={userProgress.safetyTrainingComplete ? "default" : "destructive"} className="text-xs">
              Training: {userProgress.safetyTrainingComplete ? "Complete" : "Required"}
            </Badge>
            <Badge variant={Object.values(safetyProtocols).every(Boolean) ? "default" : "destructive"} className="text-xs">
              Protocols: {Object.values(safetyProtocols).filter(Boolean).length}/4 Active
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-white text-lg font-bold">{stats.totalSessions}</div>
            <div className="text-purple-300 text-sm">Sessions</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-white text-lg font-bold">{stats.totalHours}h</div>
            <div className="text-purple-300 text-sm">Practice Time</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-white text-lg font-bold">{stats.completedChallenges}/{stats.totalChallenges}</div>
            <div className="text-purple-300 text-sm">Challenges</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-white text-lg font-bold">{stats.averageAccuracy}%</div>
            <div className="text-purple-300 text-sm">Accuracy</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
              ${activeTab === tab.id 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }
            `}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'training' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <SessionManager
                selectedTechnique={selectedTechnique}
                safetyProtocols={safetyProtocols as unknown as Record<string, boolean>}
                onSessionStart={handleSessionStart}
                onSessionEnd={handleSessionEnd}
                onSessionUpdate={handleSessionUpdate}
                maxDuration={3600}
              />
              
              {currentSession && (
                <Card className="bg-green-500/10 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-green-300 text-lg flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Active Session Monitor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-green-200 space-y-2">
                      <p><strong>Technique:</strong> {currentSession.technique}</p>
                      <p><strong>Started:</strong> {new Date(currentSession.startTime).toLocaleTimeString()}</p>
                      <p><strong>Safety Status:</strong> {Object.values(currentSession.safetyProtocols).filter(Boolean).length}/4 Protocols Active</p>
                      <div className="bg-green-500/10 rounded p-2 mt-3">
                        <p className="text-xs text-green-300">
                          🧘‍♂️ Focus on your chosen technique<br/>
                          🛡️ Trust your safety protocols<br/>
                          ⚡ Use Emergency Return if needed
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => safetyMonitoring.handleEmergency('difficulty_returning', currentSession)}
                      className="mt-3 bg-red-600 hover:bg-red-700 text-white w-full"
                      size="sm"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Emergency Return Protocol
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <TechniqueLibrary
              selectedTechnique={selectedTechnique}
              onTechniqueSelect={handleTechniqueSelect}
              userLevel={userProgress.level}
            />
          </div>
        )}

        {activeTab === 'verification' && (
          <VerificationChallenges
            userProgress={userProgress}
            onChallengeStart={handleChallengeStart}
            onChallengeComplete={handleChallengeComplete}
          />
        )}

        {activeTab === 'safety' && (
          <SafetyProtocols
            onProtocolChange={handleProtocolChange}
            initialProtocols={safetyProtocols as unknown as Record<string, boolean>}
            showEmergencyTools={true}
          />
        )}

        {activeTab === 'guide' && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <h3 className="text-white text-xl font-semibold mb-4">Enhanced Soul Travel Guide</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-2">🚀 Getting Started</h4>
                <div className="text-purple-200 text-sm space-y-2">
                  <p>1. <strong>Complete Health Screening:</strong> Accept the health disclaimer to unlock features</p>
                  <p>2. <strong>Activate Safety Protocols:</strong> Ensure all four safety measures are active</p>
                  <p>3. <strong>Choose Your Technique:</strong> Select from our comprehensive technique library</p>
                  <p>4. <strong>Start Your Session:</strong> Use the enhanced session manager for safe practice</p>
                  <p>5. <strong>Track Progress:</strong> Complete verification challenges to advance</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">🛡️ Enhanced Safety Features</h4>
                <div className="text-purple-200 text-sm space-y-2">
                  <p>• <strong>Real-time Monitoring:</strong> Automatic session duration tracking</p>
                  <p>• <strong>Emergency Protocols:</strong> One-click emergency return system</p>
                  <p>• <strong>Safety Validation:</strong> Pre-session safety checks</p>
                  <p>• <strong>Incident Logging:</strong> Automatic safety event recording</p>
                  <p>• <strong>Progressive Limits:</strong> Duration limits based on experience</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">📚 Technique Mastery</h4>
                <div className="text-purple-200 text-sm space-y-2">
                  <p>• <strong>Structured Learning:</strong> Techniques unlock based on skill level</p>
                  <p>• <strong>Detailed Instructions:</strong> Step-by-step guidance for each method</p>
                  <p>• <strong>Expert Tips:</strong> Advanced insights for better results</p>
                  <p>• <strong>Progress Tracking:</strong> Monitor your development over time</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Emergency Procedures</h4>
                <div className="text-purple-200 text-sm space-y-2">
                  <p><strong>Difficulty Returning:</strong> Focus on physical body, use grounding techniques</p>
                  <p><strong>Negative Encounter:</strong> Activate white light protection, call on spirit guides</p>
                  <p><strong>Disorientation:</strong> Stop projection, focus on breathing, seek support</p>
                  <p><strong>Fear During Projection:</strong> Use emergency return button, activate protection</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="text-purple-300 font-semibold mb-2">✨ Remember</h4>
                <p className="text-purple-200 text-sm">
                  This enhanced system provides comprehensive safety monitoring and structured learning. 
                  The silver cord connecting you to your physical body cannot be broken. Trust the process, 
                  follow safety protocols, and maintain positive intentions throughout your journey.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoulTravelDashboard;
