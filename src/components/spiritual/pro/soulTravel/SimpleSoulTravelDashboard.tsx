
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Clock, Shield, BookOpen, AlertTriangle, CheckCircle, Moon, Heart, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SimpleSoulTravelDashboardProps {
  className?: string;
}

const SimpleSoulTravelDashboard: React.FC<SimpleSoulTravelDashboardProps> = ({ className = "" }) => {
  const { toast } = useToast();
  const [showHealthDisclaimer, setShowHealthDisclaimer] = useState(true);
  const [activeTab, setActiveTab] = useState('training');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [healthAccepted, setHealthAccepted] = useState(false);

  const handleHealthAccept = () => {
    setHealthAccepted(true);
    setShowHealthDisclaimer(false);
    toast({
      title: "Health Disclaimer Accepted",
      description: "You can now access the Soul Travel Academy features.",
    });
  };

  const handleHealthDecline = () => {
    toast({
      title: "Health Requirements Not Met",
      description: "Please address health concerns before practicing astral projection.",
      variant: "destructive"
    });
  };

  const startSession = () => {
    if (!healthAccepted) {
      toast({
        title: "Health Clearance Required",
        description: "Please accept the health disclaimer first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSessionActive(true);
    setSessionTime(0);
    toast({
      title: "Session Started",
      description: "Your astral projection session has begun. Stay focused and safe.",
    });
  };

  const endSession = () => {
    setIsSessionActive(false);
    toast({
      title: "Session Ended",
      description: `Session completed. Duration: ${Math.floor(sessionTime / 60)}:${(sessionTime % 60).toString().padStart(2, '0')}`,
    });
  };

  const tabs = [
    { id: 'training', name: 'Training', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'safety', name: 'Safety', icon: <Shield className="w-4 h-4" /> },
    { id: 'guide', name: 'Guide', icon: <BookOpen className="w-4 h-4" /> }
  ];

  // Health Disclaimer Modal
  if (showHealthDisclaimer) {
    return (
      <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
        <Card className="bg-purple-900/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white text-center flex items-center justify-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              Health & Safety Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-purple-100 space-y-4">
              <p className="font-semibold">
                IMPORTANT: Please read and understand these health warnings before proceeding.
              </p>
              
              <div className="space-y-3">
                <p>• Astral projection practices may not be suitable for individuals with certain mental health conditions</p>
                <p>• Do not practice if you have a history of dissociative disorders, psychosis, or severe anxiety</p>
                <p>• Pregnant women should consult healthcare providers before engaging in consciousness-altering practices</p>
                <p>• Stop immediately if you experience distressing symptoms or adverse effects</p>
                <p>• This practice is not a substitute for professional medical or psychological treatment</p>
              </div>

              <p className="text-sm text-purple-200 mt-4">
                By proceeding, you acknowledge that you have read and understood these health warnings, do not have contraindicated conditions, and understand that you practice at your own risk. You agree to stop immediately and seek professional help if you experience any adverse effects.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleHealthAccept}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              >
                I Understand & Accept Responsibility
              </Button>
              <Button
                onClick={handleHealthDecline}
                variant="outline"
                className="border-red-300 text-red-300 hover:bg-red-900/20 px-8 py-3"
              >
                I Cannot Safely Practice
              </Button>
            </div>

            <p className="text-xs text-purple-300 text-center">
              This disclaimer is for educational purposes only and does not constitute medical advice. Always consult qualified healthcare professionals for health concerns.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <div className="text-white font-semibold">Beginner</div>
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
            <Badge variant={healthAccepted ? "default" : "destructive"} className="text-xs">
              Health: {healthAccepted ? "Cleared" : "Pending"}
            </Badge>
            <Badge variant="default" className="text-xs">
              Training: Complete
            </Badge>
            <Badge variant="default" className="text-xs">
              Protocols: 4/4 Active
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-white text-lg font-bold">0</div>
            <div className="text-purple-300 text-sm">Sessions</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-white text-lg font-bold">0h</div>
            <div className="text-purple-300 text-sm">Practice Time</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-white text-lg font-bold">0/5</div>
            <div className="text-purple-300 text-sm">Challenges</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-white text-lg font-bold">0%</div>
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
      <div className="min-h-[400px]">
        {activeTab === 'training' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Projection Session
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-3xl font-bold ${
                    isSessionActive ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'
                  }`}>
                    {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="mt-2 text-purple-200 text-sm">
                    {isSessionActive ? 'Session Active' : 'Ready to Begin'}
                  </div>
                </div>

                <div className="flex gap-3">
                  {!isSessionActive ? (
                    <Button
                      onClick={startSession}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Begin Projection
                    </Button>
                  ) : (
                    <Button
                      onClick={endSession}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      End Session
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {/* Prerequisites Section */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Essential Prerequisites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Moon className="w-4 h-4 text-blue-300" />
                        <h4 className="text-blue-300 font-semibold">Deep Relaxation Mastery</h4>
                      </div>
                      <p className="text-blue-200 text-sm">Ability to achieve complete physical relaxation and enter hypnagogic states</p>
                    </div>
                    
                    <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-green-300" />
                        <h4 className="text-green-300 font-semibold">Meditation Experience</h4>
                      </div>
                      <p className="text-green-200 text-sm">At least 2-3 months of regular meditation practice (20+ minutes daily)</p>
                    </div>
                    
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-purple-300" />
                        <h4 className="text-purple-300 font-semibold">Mental & Emotional Stability</h4>
                      </div>
                      <p className="text-purple-200 text-sm">Clear mental state, balanced emotions, and absence of fear regarding the practice</p>
                    </div>
                    
                    <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-yellow-300" />
                        <h4 className="text-yellow-300 font-semibold">Protection Knowledge</h4>
                      </div>
                      <p className="text-yellow-200 text-sm">Understanding of spiritual protection methods and safety protocols</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Techniques Section */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Techniques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <h4 className="text-white font-semibold">Rope Technique</h4>
                      <p className="text-purple-200 text-sm">Visualize climbing an invisible rope above your body</p>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <h4 className="text-white font-semibold">Roll-Out Method</h4>
                      <p className="text-blue-200 text-sm">Imagine rolling out of your physical body</p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <h4 className="text-white font-semibold">Lift-Out Technique</h4>
                      <p className="text-green-200 text-sm">Visualize floating upward from your body</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'safety' && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Safety Protocols</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="text-green-300 font-semibold mb-2">White Light Protection</h4>
                  <p className="text-green-200 text-sm">Always surround yourself with protective white light before beginning</p>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-blue-300 font-semibold mb-2">Spirit Guides</h4>
                  <p className="text-blue-200 text-sm">Call upon your spirit guides for protection and guidance</p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="text-purple-300 font-semibold mb-2">Grounding</h4>
                  <p className="text-purple-200 text-sm">Maintain connection to your physical body through grounding techniques</p>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <h4 className="text-yellow-300 font-semibold mb-2">Clear Intention</h4>
                  <p className="text-yellow-200 text-sm">Set clear, positive intentions before each session</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'guide' && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Soul Travel Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-2">Getting Started</h4>
                <div className="text-purple-200 text-sm space-y-2">
                  <p>1. <strong>Prepare Your Environment:</strong> Find a quiet, comfortable space</p>
                  <p>2. <strong>Activate Safety Protocols:</strong> Ensure all protection measures are in place</p>
                  <p>3. <strong>Choose Your Technique:</strong> Select a projection method that resonates with you</p>
                  <p>4. <strong>Set Clear Intentions:</strong> Define what you want to achieve</p>
                  <p>5. <strong>Begin Your Session:</strong> Start with short sessions and gradually increase duration</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Best Practices</h4>
                <div className="text-purple-200 text-sm space-y-2">
                  <p>• Practice regularly but don't force results</p>
                  <p>• Maintain a positive, fearless mindset</p>
                  <p>• Keep a journal to track your experiences</p>
                  <p>• Ground yourself thoroughly after each session</p>
                  <p>• Never practice under the influence of substances</p>
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
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SimpleSoulTravelDashboard;
