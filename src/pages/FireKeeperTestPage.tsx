
import React, { useState, useEffect } from 'react';
import { TestModeManager } from '@/components/subscription/TestModeManager';
import { FireKeeperFeatureGate } from '@/components/spiritual/FireKeeperFeatureGate';
import { FireKeeperAIMentorDemo } from '@/components/spiritual/demo/FireKeeperAIMentorDemo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFireKeeperAccess } from '@/hooks/useFireKeeperAccess';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Flame, 
  Book, 
  Eye, 
  Moon, 
  Users, 
  Sparkles,
  TestTube,
  Play,
  CheckCircle,
  Lock
} from 'lucide-react';

const FireKeeperTestPage = () => {
  const { hasFireKeeperAccess, accessType } = useFireKeeperAccess();
  const { toast } = useToast();
  const [practiceSessions, setPracticeSessions] = useState<number>(0);
  const [unlockedTraditions, setUnlockedTraditions] = useState<string[]>([]);
  const [thirdEyeProgress, setThirdEyeProgress] = useState<number>(0);

  useEffect(() => {
    loadUserProgress();
  }, []);

  const loadUserProgress = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load spiritual practices
    const { data: practices } = await supabase
      .from('spiritual_practices')
      .select('*')
      .eq('user_id', user.id)
      .eq('practice_type', 'fire_keeper_session');

    setPracticeSessions(practices?.length || 0);

    // Simulate unlocked traditions based on progress
    const traditions = [];
    if (practices && practices.length > 0) traditions.push('Fire Breathing Techniques');
    if (practices && practices.length > 2) traditions.push('Solar Plexus Activation');
    if (practices && practices.length > 5) traditions.push('Fire Element Meditation');
    if (practices && practices.length > 10) traditions.push('Transformation Rituals');
    
    setUnlockedTraditions(traditions);
    setThirdEyeProgress(Math.min((practices?.length || 0) * 10, 100));
  };

  const startPracticeSession = async (practiceType: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to start practice sessions.",
        variant: "destructive"
      });
      return;
    }

    try {
      await supabase.from('spiritual_practices').insert({
        user_id: user.id,
        practice_type: 'fire_keeper_session',
        practice_details: {
          session_type: practiceType,
          duration: 20,
          timestamp: new Date().toISOString(),
          level: 'beginner'
        }
      });

      toast({
        title: "Practice Session Started",
        description: `Beginning ${practiceType} practice session.`,
      });

      // Reload progress
      loadUserProgress();
    } catch (error) {
      console.error('Error starting practice:', error);
      toast({
        title: "Session Error",
        description: "Unable to start practice session. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="w-8 h-8 text-orange-400" />
            <h1 className="text-4xl font-bold text-white">Fire Keeper Testing & Demo</h1>
          </div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Test Fire Keeper subscription features and explore functional capabilities
          </p>
          
          {hasFireKeeperAccess && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <Badge className={accessType === 'full' ? 'bg-orange-600' : 'bg-purple-600'}>
                {accessType === 'full' ? (
                  <>
                    <Flame className="w-3 h-3 mr-1" />
                    Full Fire Keeper Access
                  </>
                ) : (
                  <>
                    <TestTube className="w-3 h-3 mr-1" />
                    Demo Mode Active
                  </>
                )}
              </Badge>
              <Badge variant="secondary">
                Sessions Completed: {practiceSessions}
              </Badge>
            </div>
          )}
        </div>

        {/* Test Mode Manager */}
        <TestModeManager />

        {/* Fire Keeper Features Demo */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Fire Keeper Features - Functional Testing
          </h2>

          {/* AI Mentor Sessions */}
          <FireKeeperFeatureGate
            featureId="ai-mentor"
            featureName="Weekly 1:1 AI Mentor Sessions"
            description="Personalized spiritual guidance with advanced AI"
            demoContent={<FireKeeperAIMentorDemo />}
          >
            <FireKeeperAIMentorDemo />
          </FireKeeperFeatureGate>

          {/* Sacred Traditions */}
          <FireKeeperFeatureGate
            featureId="sacred-traditions"
            featureName="Sacred Tradition Access"
            description="Limited access to ancient spiritual practices"
          >
            <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Book className="w-5 h-5" />
                  Sacred Traditions Library
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { name: 'Fire Breathing Techniques', description: 'Ancient Pranayama practices for energy cultivation', unlocked: unlockedTraditions.includes('Fire Breathing Techniques') },
                    { name: 'Solar Plexus Activation', description: 'Traditional chakra opening rituals', unlocked: unlockedTraditions.includes('Solar Plexus Activation') },
                    { name: 'Fire Element Meditation', description: 'Concentration practices from various traditions', unlocked: unlockedTraditions.includes('Fire Element Meditation') },
                    { name: 'Transformation Rituals', description: 'Sacred ceremonies for personal change', unlocked: unlockedTraditions.includes('Transformation Rituals') }
                  ].map((tradition, index) => (
                    <div key={index} className={`bg-black/20 p-3 rounded-lg border ${tradition.unlocked ? 'border-green-500/30' : 'border-gray-600/30'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        {tradition.unlocked ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-500" />
                        )}
                        <h4 className={`font-medium ${tradition.unlocked ? 'text-purple-200' : 'text-gray-400'}`}>
                          {tradition.name}
                        </h4>
                      </div>
                      <p className="text-gray-300 text-sm">{tradition.description}</p>
                      {tradition.unlocked && (
                        <Button
                          size="sm"
                          className="mt-2 bg-purple-600 hover:bg-purple-700"
                          onClick={() => startPracticeSession(tradition.name)}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Start Practice
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center text-sm text-gray-400">
                  Complete practice sessions to unlock more traditions
                </div>
              </CardContent>
            </Card>
          </FireKeeperFeatureGate>

          {/* Advanced Third Eye Practices */}
          <FireKeeperFeatureGate
            featureId="third-eye"
            featureName="Advanced Third Eye Practices"
            description="Enhanced psychic development and intuition training"
          >
            <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Third Eye Development Center
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold">Development Progress: {thirdEyeProgress}%</h3>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${thirdEyeProgress}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    {[
                      { name: 'Clairvoyance Development', unlocked: thirdEyeProgress >= 20 },
                      { name: 'Psychic Protection', unlocked: thirdEyeProgress >= 50 },
                      { name: 'Energy Reading', unlocked: thirdEyeProgress >= 80 }
                    ].map((skill, index) => (
                      <div key={index} className={`bg-black/20 p-2 rounded flex items-center gap-2 ${skill.unlocked ? 'border border-indigo-500/30' : 'border border-gray-600/30'}`}>
                        {skill.unlocked ? (
                          <CheckCircle className="w-4 h-4 text-indigo-400" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-500" />
                        )}
                        <div className={skill.unlocked ? 'text-indigo-200' : 'text-gray-400'}>
                          {skill.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => startPracticeSession('Third Eye Development')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Practice Third Eye Activation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FireKeeperFeatureGate>

          {/* Lucid Dreaming Protocols */}
          <FireKeeperFeatureGate
            featureId="lucid-dreaming"
            featureName="Lucid Dreaming Protocols"
            description="Advanced dream consciousness and astral projection techniques"
          >
            <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Moon className="w-5 h-5" />
                  Dream Consciousness Laboratory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-blue-200 font-medium">Lucidity Techniques</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        Reality checking protocols
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        Dream journaling systems
                      </li>
                      <li className="flex items-center gap-2">
                        <Lock className="w-3 h-3 text-gray-500" />
                        Wake-back-to-bed methods
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-blue-200 font-medium">Advanced Practices</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <Lock className="w-3 h-3 text-gray-500" />
                        Shared dreaming sessions
                      </li>
                      <li className="flex items-center gap-2">
                        <Lock className="w-3 h-3 text-gray-500" />
                        Astral projection training
                      </li>
                      <li className="flex items-center gap-2">
                        <Lock className="w-3 h-3 text-gray-500" />
                        Dream healing protocols
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => startPracticeSession('Dream Journal')}
                  >
                    <Moon className="w-4 h-4 mr-2" />
                    Start Dream Journal
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-500/30 text-blue-200"
                    onClick={() => startPracticeSession('Reality Check Training')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Reality Check Training
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FireKeeperFeatureGate>
        </div>
      </div>
    </div>
  );
};

export default FireKeeperTestPage;
