
import React, { useState } from 'react';
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
import { RitualActivationSystem } from '@/components/spiritual/RitualActivationSystem';
import { TopNavigation } from '@/components/spiritual/TopNavigation';
import { 
  Sparkles,
  Star
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function SpiritualDashboard() {
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  const [activeTab, setActiveTab] = useState('seraphina');
  const navigate = useNavigate();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'seraphina':
        return <SoulGuideChat />;
      case 'rituals':
        return <RitualActivationSystem />;
      case 'cultural':
        return <CulturalAdapter />;
      case 'community':
        return <CommunityHub />;
      case 'progress':
        return <GamificationDashboard />;
      case 'mood':
        return <MoodTracker />;
      case 'meditation':
        return <MeditationTracker />;
      case 'dreams':
        return <DreamForm />;
      case 'shadow':
        return <ShadowWorkForm />;
      case 'sync':
        return <SynchronicityForm />;
      case 'assessment':
        return !hasCompletedAssessment ? (
          <SpiritualAssessment onComplete={() => setHasCompletedAssessment(true)} />
        ) : (
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Assessment Complete!</h2>
            <p className="text-purple-200">
              Check your recommendations and progress in the other tabs.
            </p>
          </div>
        );
      case 'insights':
        return <ProgressVisualization />;
      case 'recommendations':
        return <RecommendationsSystem />;
      case 'referrals':
        return <ReferralSystem />;
      default:
        return <SoulGuideChat />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">SpiritualMind Pro</h1>
          <p className="text-purple-200">Your journey to inner wisdom and enlightenment</p>
          <div className="flex gap-4 justify-center mt-4">
            <Button 
              onClick={() => navigate('/meditation')} 
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Enter Meditation Environment
            </Button>
            <Button 
              onClick={() => navigate('/quantum-spiritual')} 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              <Star className="w-5 h-5 mr-2" />
              Quantum Spiritual Technologies
            </Button>
          </div>
        </div>

        <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="bg-black/30 border border-purple-500/30 backdrop-blur-sm rounded-lg p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
