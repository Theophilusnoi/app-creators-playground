
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Crown, Shield, Heart } from "lucide-react";
import { ArchetypeAssessment } from './archetype/ArchetypeAssessment';
import { ArchetypeProfile } from './archetype/ArchetypeProfile';
import { CulturalWisdomGate } from './archetype/CulturalWisdomGate';
import { WisdomTierSelector } from './subscription/WisdomTierSelector';
import { SoulArchetype } from '@/types/archetype';
import { CULTURAL_TRADITIONS } from '@/data/archetypes';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export const SoulArchetypeSystem: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentPhase, setCurrentPhase] = useState<'assessment' | 'profile' | 'growth'>('assessment');
  const [primaryArchetype, setPrimaryArchetype] = useState<SoulArchetype | null>(null);
  const [secondaryArchetype, setSecondaryArchetype] = useState<SoulArchetype | null>(null);
  const [spiritualMaturity, setSpiritualMaturity] = useState(25);
  const [userLevel, setUserLevel] = useState<'beginner' | 'initiated' | 'advanced'>('beginner');
  const [activeTab, setActiveTab] = useState('assessment');
  const [practiceHours, setPracticeHours] = useState(0);
  const [wisdomPoints, setWisdomPoints] = useState(0);

  useEffect(() => {
    loadUserArchetypeData();
  }, [user]);

  const loadUserArchetypeData = () => {
    if (!user) return;
    
    try {
      const savedData = localStorage.getItem(`archetype_${user.id}`);
      if (savedData) {
        const data = JSON.parse(savedData);
        setPrimaryArchetype(data.primaryArchetype);
        setSecondaryArchetype(data.secondaryArchetype);
        setSpiritualMaturity(data.spiritualMaturity || 25);
        setUserLevel(data.userLevel || 'beginner');
        setPracticeHours(data.practiceHours || 0);
        setWisdomPoints(data.wisdomPoints || 0);
        setCurrentPhase('profile');
        setActiveTab('profile');
        
        // Auto-advance user level based on practice and wisdom
        updateUserLevel(data.practiceHours || 0, data.wisdomPoints || 0);
      }
    } catch (error) {
      console.error('Error loading archetype data:', error);
    }
  };

  const updateUserLevel = (hours: number, points: number) => {
    let newLevel: 'beginner' | 'initiated' | 'advanced' = 'beginner';
    
    if (hours >= 100 && points >= 500) {
      newLevel = 'advanced';
    } else if (hours >= 25 && points >= 100) {
      newLevel = 'initiated';
    }
    
    if (newLevel !== userLevel) {
      setUserLevel(newLevel);
      toast({
        title: "Spiritual Level Advanced!",
        description: `You have reached ${newLevel} level. New wisdom traditions are now available.`,
      });
    }
  };

  const handleAssessmentComplete = (primary: SoulArchetype, secondary?: SoulArchetype) => {
    const initialPoints = 50; // Starting wisdom points for completing assessment
    const initialHours = 5; // Starting practice hours
    
    setPrimaryArchetype(primary);
    setSecondaryArchetype(secondary);
    setSpiritualMaturity(30);
    setPracticeHours(initialHours);
    setWisdomPoints(initialPoints);
    
    // Save to localStorage
    if (user) {
      const data = {
        primaryArchetype: primary,
        secondaryArchetype: secondary,
        spiritualMaturity: 30,
        userLevel: 'beginner',
        practiceHours: initialHours,
        wisdomPoints: initialPoints,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem(`archetype_${user.id}`, JSON.stringify(data));
    }
    
    setCurrentPhase('profile');
    setActiveTab('profile');
    
    toast({
      title: "Soul Archetype Revealed!",
      description: `You have been granted ${initialPoints} wisdom points and ${initialHours} practice hours to begin your journey.`,
    });
  };

  const handleStartGrowthPath = () => {
    setCurrentPhase('growth');
    setActiveTab('wisdom');
    toast({
      title: "Growth Path Activated",
      description: "Your archetypal development journey begins now!",
    });
  };

  const handleWisdomAccess = (traditionId: string) => {
    const tradition = CULTURAL_TRADITIONS.find(t => t.id === traditionId);
    if (tradition) {
      // Award wisdom points for accessing new traditions
      const newPoints = wisdomPoints + 25;
      const newHours = practiceHours + 2;
      
      setWisdomPoints(newPoints);
      setPracticeHours(newHours);
      
      // Update saved data
      if (user && primaryArchetype) {
        const savedData = localStorage.getItem(`archetype_${user.id}`);
        if (savedData) {
          const data = JSON.parse(savedData);
          data.wisdomPoints = newPoints;
          data.practiceHours = newHours;
          localStorage.setItem(`archetype_${user.id}`, JSON.stringify(data));
        }
      }
      
      updateUserLevel(newHours, newPoints);
      
      toast({
        title: "Sacred Wisdom Unlocked",
        description: `Access granted to ${tradition.name} teachings. +25 wisdom points earned!`,
      });
    }
  };

  const handleTierSelection = (tier: any) => {
    toast({
      title: "Wisdom Tier Selected",
      description: `Upgrading to ${tier.name} - ${tier.description}`,
    });
  };

  const handlePracticeSession = () => {
    const newHours = practiceHours + 1;
    const newPoints = wisdomPoints + 10;
    
    setPracticeHours(newHours);
    setWisdomPoints(newPoints);
    
    // Update saved data
    if (user && primaryArchetype) {
      const savedData = localStorage.getItem(`archetype_${user.id}`);
      if (savedData) {
        const data = JSON.parse(savedData);
        data.practiceHours = newHours;
        data.wisdomPoints = newPoints;
        localStorage.setItem(`archetype_${user.id}`, JSON.stringify(data));
      }
    }
    
    updateUserLevel(newHours, newPoints);
    
    toast({
      title: "Practice Session Complete",
      description: "+1 practice hour and +10 wisdom points earned!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Soul Archetype System</h1>
        <p className="text-purple-200">Discover your spiritual blueprint and unlock your sacred potential</p>
        
        {/* Progress Indicators */}
        {primaryArchetype && (
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-purple-400 text-purple-200">
                Level: {userLevel}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-green-400 text-green-200">
                Practice: {practiceHours}h
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-yellow-400 text-yellow-200">
                Wisdom: {wisdomPoints}pts
              </Badge>
            </div>
          </div>
        )}
      </div>

      {/* Custom Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab('assessment')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'assessment'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-purple-300 hover:bg-purple-700 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Assessment
        </button>
        
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'profile'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-purple-300 hover:bg-purple-700 hover:text-white'
          }`}
        >
          <Crown className="w-4 h-4" />
          Profile
        </button>
        
        <button
          onClick={() => setActiveTab('wisdom')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'wisdom'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-purple-300 hover:bg-purple-700 hover:text-white'
          }`}
        >
          <Shield className="w-4 h-4" />
          Wisdom Access
        </button>
        
        <button
          onClick={() => setActiveTab('tiers')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'tiers'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-purple-300 hover:bg-purple-700 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          Wisdom Tiers
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'assessment' && (
          <div className="space-y-6">
            {!primaryArchetype ? (
              <ArchetypeAssessment onComplete={handleAssessmentComplete} />
            ) : (
              <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Assessment Complete!</h3>
                  <p className="text-purple-200 mb-4">
                    Your soul archetype has been revealed. Explore your profile to begin your journey.
                  </p>
                  <Button onClick={() => setActiveTab('profile')} className="bg-purple-600 hover:bg-purple-700">
                    View My Archetype Profile
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            {primaryArchetype ? (
              <>
                <ArchetypeProfile
                  primaryArchetype={primaryArchetype}
                  secondaryArchetype={secondaryArchetype}
                  spiritualMaturity={spiritualMaturity}
                  onStartGrowthPath={handleStartGrowthPath}
                />
                
                {/* Practice Session Button */}
                <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-white mb-4">Daily Practice</h3>
                    <p className="text-purple-200 mb-4">
                      Complete practice sessions to earn wisdom points and advance your spiritual level.
                    </p>
                    <Button 
                      onClick={handlePracticeSession}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      Complete Practice Session (+1h, +10pts)
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Complete Assessment First</h3>
                  <p className="text-purple-200 mb-4">
                    You need to complete the Soul Archetype Assessment to access your profile.
                  </p>
                  <Button onClick={() => setActiveTab('assessment')} className="bg-purple-600 hover:bg-purple-700">
                    Take Assessment
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'wisdom' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Cultural Wisdom Access</h2>
              <p className="text-purple-200">
                Connect with sacred traditions from around the world
              </p>
              <div className="mt-4">
                <p className="text-sm text-purple-200">
                  Progress Requirements: Initiated (25h + 100pts) • Advanced (100h + 500pts)
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CULTURAL_TRADITIONS.map((tradition) => (
                <CulturalWisdomGate
                  key={tradition.id}
                  tradition={tradition}
                  userLevel={userLevel}
                  onAccessGranted={() => handleWisdomAccess(tradition.id)}
                  onAccessDenied={(reason) => {
                    toast({
                      title: "Access Restricted",
                      description: reason,
                      variant: "destructive"
                    });
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tiers' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Wisdom Tier Selection</h2>
              <p className="text-purple-200">
                Choose your spiritual development path
              </p>
            </div>
            
            <WisdomTierSelector
              currentTier="earth"
              onSelectTier={handleTierSelection}
            />
          </div>
        )}
      </div>
    </div>
  );
};
