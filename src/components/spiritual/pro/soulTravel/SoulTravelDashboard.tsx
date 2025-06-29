
import React, { useState, useEffect } from 'react';
import { Sparkles, BarChart3, Settings, BookOpen, Shield, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import ProjectionTimer from './ProjectionTimer';
import TechniqueSelector from './TechniqueSelector';
import SafetyProtocols from './SafetyProtocols';
import VerificationChallenges from './VerificationChallenges';

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

  const handleSessionStart = (sessionId: string, sessionData: any) => {
    if (!validatePreSession()) {
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
      title: "Session Started",
      description: `${selectedTechnique} technique session is now active`,
    });

    console.log('Session started:', newSession);
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
      
      toast({
        title: "Session Completed",
        description: `Duration: ${Math.floor(sessionData.duration / 60000)} minutes`,
      });

      console.log('Session completed:', completedSession);
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
    console.log('Technique selected:', technique);
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
        <Card className="bg-yellow-500/10 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-yellow-300 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Important Health Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-yellow-200 text-sm space-y-2 mb-4">
              <p><strong>Do not practice astral projection if you have:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>History of seizures or epilepsy</li>
                <li>Severe mental health conditions</li>
                <li>Heart conditions or blood pressure issues</li>
                <li>Recent trauma or emotional instability</li>
                <li>Are under the influence of substances</li>
              </ul>
              <p className="mt-3">
                <strong>Consult a healthcare provider</strong> before practicing if you have any medical concerns.
              </p>
            </div>
            <Button 
              onClick={() => setShowHealthDisclaimer(false)}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              I Understand
            </Button>
          </CardContent>
        </Card>
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
              <ProjectionTimer
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
                      Active Session
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-green-200 space-y-1">
                      <p>Technique: <span className="font-semibold">{currentSession.technique}</span></p>
                      <p>Started: <span className="font-semibold">{new Date(currentSession.startTime).toLocaleTimeString()}</span></p>
                      <p>Safety Protocols: <span className="font-semibold">{Object.values(currentSession.safetyProtocols).filter(Boolean).length}/4 Active</span></p>
                    </div>
                    <Button 
                      onClick={() => handleEmergency('difficulty_returning')}
                      className="mt-3 bg-red-600 hover:bg-red-700 text-white"
                      size="sm"
                    >
                      Emergency Return
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <TechniqueSelector
              onTechniqueSelect={handleTechniqueSelect}
              selectedTechnique={selectedTechnique}
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
            <h3 className="text-white text-xl font-semibold mb-4">Soul Travel Guide</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-2">Getting Started</h4>
                <div className="text-purple-200 text-sm space-y-2">
                  <p>1. <strong>Complete Health Screening:</strong> Ensure you meet all health requirements</p>
                  <p>2. <strong>Activate Safety Protocols:</strong> Always ensure all four safety measures are active</p>
                  <p>3. <strong>Choose Your Technique:</strong> Start with the Rope Technique if you're a beginner</p>
                  <p>4. <strong>Set Clear Intentions:</strong> Define what you want to achieve in your session</p>
                  <p>5. <strong>Practice Regularly:</strong> Consistency is key to developing projection abilities</p>
                  <p>6. <strong>Verify Experiences:</strong> Use verification challenges to validate your progress</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Safety First</h4>
                <div className="text-purple-200 text-sm space-y-2">
                  <p>• Never practice under the influence of substances</p>
                  <p>• Always maintain positive, fearless mindset</p>
                  <p>• Practice in a quiet, comfortable environment</p>
                  <p>• Set session time limits (max 1 hour for safety)</p>
                  <p>• Keep emergency contact information available</p>
                  <p>• Ground yourself thoroughly after each session</p>
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

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="text-blue-300 font-semibold mb-2">Remember</h4>
                <p className="text-blue-200 text-sm">
                  Astral projection is a natural ability that can be developed safely with proper training. 
                  The silver cord connecting you to your physical body cannot be broken, ensuring your safety 
                  at all times. Trust in the process and maintain positive intentions throughout your journey.
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
