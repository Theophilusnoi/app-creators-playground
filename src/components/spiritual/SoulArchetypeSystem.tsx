
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        setCurrentPhase('profile');
        setActiveTab('profile');
      }
    } catch (error) {
      console.error('Error loading archetype data:', error);
    }
  };

  const handleAssessmentComplete = (primary: SoulArchetype, secondary?: SoulArchetype) => {
    setPrimaryArchetype(primary);
    setSecondaryArchetype(secondary);
    setSpiritualMaturity(30); // Initial maturity after assessment
    
    // Save to localStorage
    if (user) {
      const data = {
        primaryArchetype: primary,
        secondaryArchetype: secondary,
        spiritualMaturity: 30,
        userLevel: 'beginner',
        completedAt: new Date().toISOString()
      };
      localStorage.setItem(`archetype_${user.id}`, JSON.stringify(data));
    }
    
    setCurrentPhase('profile');
    setActiveTab('profile');
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
      toast({
        title: "Sacred Wisdom Unlocked",
        description: `Access granted to ${tradition.name} teachings`,
      });
    }
  };

  const handleTierSelection = (tier: any) => {
    toast({
      title: "Wisdom Tier Selected",
      description: `Upgrading to ${tier.name} - ${tier.description}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Soul Archetype System</h1>
        <p className="text-purple-200">Discover your spiritual blueprint and unlock your sacred potential</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assessment">
            <Sparkles className="w-4 h-4 mr-2" />
            Assessment
          </TabsTrigger>
          <TabsTrigger value="profile" disabled={!primaryArchetype}>
            <Crown className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="wisdom" disabled={!primaryArchetype}>
            <Shield className="w-4 h-4 mr-2" />
            Wisdom Access
          </TabsTrigger>
          <TabsTrigger value="tiers">
            <Heart className="w-4 h-4 mr-2" />
            Wisdom Tiers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assessment" className="space-y-6">
          {currentPhase === 'assessment' && !primaryArchetype && (
            <ArchetypeAssessment onComplete={handleAssessmentComplete} />
          )}
          
          {primaryArchetype && (
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
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          {primaryArchetype && (
            <ArchetypeProfile
              primaryArchetype={primaryArchetype}
              secondaryArchetype={secondaryArchetype}
              spiritualMaturity={spiritualMaturity}
              onStartGrowthPath={handleStartGrowthPath}
            />
          )}
        </TabsContent>

        <TabsContent value="wisdom" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="tiers" className="space-y-6">
          <WisdomTierSelector
            currentTier="earth"
            onSelectTier={handleTierSelection}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
