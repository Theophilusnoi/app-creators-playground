import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpiritualAssessment } from '@/components/spiritual/SpiritualAssessment';
import { ProgressVisualization } from '@/components/spiritual/ProgressVisualization';
import { RecommendationsSystem } from '@/components/spiritual/RecommendationsSystem';
import { SoulGuideChat } from '@/components/spiritual/SoulGuideChat';
import { CommunityHub } from '@/components/spiritual/CommunityHub';
import { GamificationDashboard } from '@/components/spiritual/GamificationDashboard';
import { MoodTracker } from '@/components/spiritual/MoodTracker';
import { ReferralSystem } from '@/components/spiritual/ReferralSystem';
import { MeditationTracker } from '@/components/spiritual/MeditationTracker';
import { DreamForm } from '@/components/spiritual/DreamForm';
import { ShadowWorkForm } from '@/components/spiritual/ShadowWorkForm';
import { SynchronicityForm } from '@/components/spiritual/SynchronicityForm';
import { CulturalAdapter } from '@/components/spiritual/CulturalAdapter';
import { 
  Brain, 
  TrendingUp, 
  Lightbulb, 
  MessageCircle, 
  Users, 
  Trophy, 
  Heart,
  Gift,
  Play,
  Moon,
  Eye,
  Sparkles,
  Globe
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function SpiritualDashboard() {
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">SpiritualMind Pro</h1>
          <p className="text-purple-200">Your journey to inner wisdom and enlightenment</p>
          <Button 
            onClick={() => navigate('/meditation')} 
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Enter Meditation Environment
          </Button>
        </div>

        <Tabs defaultValue="seraphina" className="w-full">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-13 bg-black/30 mb-8">
            <TabsTrigger value="seraphina" className="data-[state=active]:bg-purple-600">
              <MessageCircle className="w-4 h-4 mr-2" />
              Seraphina
            </TabsTrigger>
            <TabsTrigger value="cultural" className="data-[state=active]:bg-purple-600">
              <Globe className="w-4 h-4 mr-2" />
              Cultural
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-purple-600">
              <Users className="w-4 h-4 mr-2" />
              Community
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-purple-600">
              <Trophy className="w-4 h-4 mr-2" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="mood" className="data-[state=active]:bg-purple-600">
              <Heart className="w-4 h-4 mr-2" />
              Mood
            </TabsTrigger>
            <TabsTrigger value="meditation" className="data-[state=active]:bg-purple-600">
              <Play className="w-4 h-4 mr-2" />
              Meditate
            </TabsTrigger>
            <TabsTrigger value="dreams" className="data-[state=active]:bg-purple-600">
              <Moon className="w-4 h-4 mr-2" />
              Dreams
            </TabsTrigger>
            <TabsTrigger value="shadow" className="data-[state=active]:bg-purple-600">
              <Eye className="w-4 h-4 mr-2" />
              Shadow
            </TabsTrigger>
            <TabsTrigger value="sync" className="data-[state=active]:bg-purple-600">
              <Sparkles className="w-4 h-4 mr-2" />
              Sync
            </TabsTrigger>
            <TabsTrigger value="assessment" className="data-[state=active]:bg-purple-600">
              <Brain className="w-4 h-4 mr-2" />
              Assessment
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-purple-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-purple-600">
              <Lightbulb className="w-4 h-4 mr-2" />
              Guidance
            </TabsTrigger>
            <TabsTrigger value="referrals" className="data-[state=active]:bg-purple-600">
              <Gift className="w-4 h-4 mr-2" />
              Invite
            </TabsTrigger>
          </TabsList>

          <TabsContent value="seraphina">
            <SoulGuideChat />
          </TabsContent>

          <TabsContent value="cultural">
            <CulturalAdapter />
          </TabsContent>

          <TabsContent value="community">
            <CommunityHub />
          </TabsContent>

          <TabsContent value="progress">
            <GamificationDashboard />
          </TabsContent>

          <TabsContent value="mood">
            <MoodTracker />
          </TabsContent>

          <TabsContent value="meditation">
            <MeditationTracker />
          </TabsContent>

          <TabsContent value="dreams">
            <DreamForm />
          </TabsContent>

          <TabsContent value="shadow">
            <ShadowWorkForm />
          </TabsContent>

          <TabsContent value="sync">
            <SynchronicityForm />
          </TabsContent>

          <TabsContent value="assessment">
            {!hasCompletedAssessment ? (
              <SpiritualAssessment onComplete={() => setHasCompletedAssessment(true)} />
            ) : (
              <div className="text-center text-white">
                <h2 className="text-2xl font-bold mb-4">Assessment Complete!</h2>
                <p className="text-purple-200">
                  Check your recommendations and progress in the other tabs.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="insights">
            <ProgressVisualization />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationsSystem />
          </TabsContent>

          <TabsContent value="referrals">
            <ReferralSystem />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
