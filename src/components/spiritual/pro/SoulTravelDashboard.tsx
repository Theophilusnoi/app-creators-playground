import React, { useState, useEffect } from 'react';
import { Sparkles, BarChart3, Settings, BookOpen } from 'lucide-react';
import ProjectionTimer from './soulTravel/ProjectionTimer';
import TechniqueSelector from './soulTravel/TechniqueSelector';
import SafetyProtocols from './soulTravel/SafetyProtocols';
import VerificationChallenges from './soulTravel/VerificationChallenges';

interface UserProgress {
  totalSessions: number;
  totalMinutes: number;
  level: string;
  challenges: Record<string, any>;
  sessions: any[];
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
    sessions: []
  });
  const [currentSession, setCurrentSession] = useState<any>(null);

  const tabs = [
    { id: 'training', name: 'Training', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'verification', name: 'Verification', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'safety', name: 'Safety', icon: <Settings className="w-4 h-4" /> },
    { id: 'guide', name: 'Guide', icon: <BookOpen className="w-4 h-4" /> }
  ];

  useEffect(() => {
    // Load user progress from localStorage or API
    const savedProgress = localStorage.getItem(`soulTravel_${userId}`);
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
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
    const newSession = {
      id: sessionId,
      ...sessionData,
      technique: selectedTechnique,
      safetyProtocols: { ...safetyProtocols }
    };
    
    setCurrentSession(newSession);
    console.log('Session started:', newSession);
  };

  const handleSessionEnd = (sessionId: string, sessionData: any) => {
    if (currentSession) {
      const completedSession = {
        ...currentSession,
        ...sessionData
      };

      setUserProgress(prev => ({
        ...prev,
        totalSessions: prev.totalSessions + 1,
        totalMinutes: prev.totalMinutes + Math.floor(sessionData.duration / 60),
        sessions: [...prev.sessions, completedSession]
      }));

      setCurrentSession(null);
      console.log('Session completed:', completedSession);
    }
  };

  const handleSessionUpdate = (currentTime: number, sessionId: string) => {
    // Update current session time
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
    // Ensure we only update the protocols that exist in our state structure
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
    console.log('Challenge completed:', challenge, result);
  };

  const getProgressStats = () => {
    const completedChallenges = Object.values(userProgress.challenges).filter((c: any) => c.completed).length;
    const totalChallenges = 5; // Total number of challenges
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
              />
              
              {currentSession && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="text-green-300 font-semibold mb-2">Active Session</h4>
                  <div className="text-sm text-green-200 space-y-1">
                    <p>Technique: {currentSession.technique}</p>
                    <p>Started: {new Date(currentSession.startTime).toLocaleTimeString()}</p>
                    <p>Safety Protocols: {Object.values(currentSession.safetyProtocols).filter(Boolean).length}/4 Active</p>
                  </div>
                </div>
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
            initialProtocols={safetyProtocols}
          />
        )}

        {activeTab === 'guide' && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <h3 className="text-white text-xl font-semibold mb-4">Soul Travel Guide</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-2">Getting Started</h4>
                <div className="text-purple-200 text-sm space-y-2">
                  <p>1. <strong>Activate Safety Protocols:</strong> Always ensure all four safety measures are active before beginning</p>
                  <p>2. <strong>Choose Your Technique:</strong> Start with the Rope Technique if you're a beginner</p>
                  <p>3. <strong>Set Clear Intentions:</strong> Define what you want to achieve in your session</p>
                  <p>4. <strong>Practice Regularly:</strong> Consistency is key to developing projection abilities</p>
                  <p>5. <strong>Verify Experiences:</strong> Use verification challenges to validate your progress</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Best Practices</h4>
                <div className="text-purple-200 text-sm space-y-2">
                  <p>• Practice in a quiet, comfortable environment</p>
                  <p>• Maintain a positive, fearless mindset</p>
                  <p>• Keep a projection journal to track progress</p>
                  <p>• Start with short sessions and gradually increase duration</p>
                  <p>• Ground yourself thoroughly after each session</p>
                  <p>• Never practice under the influence of substances</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Troubleshooting</h4>
                <div className="text-purple-200 text-sm space-y-2">
                  <p><strong>Can't separate:</strong> Try different techniques, ensure deep relaxation, practice patience</p>
                  <p><strong>Fear during projection:</strong> Activate white light protection, call on spirit guides</p>
                  <p><strong>Difficulty returning:</strong> Focus on physical body, use grounding techniques</p>
                  <p><strong>Unclear experiences:</strong> Practice verification challenges to improve clarity</p>
                  <p><strong>Inconsistent results:</strong> Maintain regular practice schedule, check safety protocols</p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="text-blue-300 font-semibold mb-2">Remember</h4>
                <p className="text-blue-200 text-sm">
                  Astral projection is a natural ability that can be developed with practice. The silver cord connecting 
                  you to your physical body cannot be broken, ensuring your safety at all times. Trust in the process 
                  and maintain positive intentions throughout your journey.
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
