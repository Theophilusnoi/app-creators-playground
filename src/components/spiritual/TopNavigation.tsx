
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Heart, User, Wand2, TrendingUp, Book, CreditCard, 
  Globe, Users, Smile, Clock, Moon, Eye, Zap, 
  Lightbulb, Star, Target, Gift, Shield, Brain 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const navigationTabs = [
    { id: 'seraphina', label: 'Seraphina', icon: Heart },
    { id: 'archetype', label: 'Archetype', icon: User },
    { id: 'rituals', label: 'Rituals', icon: Wand2 },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'knowledge-base', label: 'Knowledge', icon: Book },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'cultural', label: 'Cultural', icon: Globe },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'mood', label: 'Mood', icon: Smile },
    { id: 'meditation', label: 'Meditation', icon: Clock },
    { id: 'dreams', label: 'Dreams', icon: Moon },
    { id: 'shadow', label: 'Shadow', icon: Eye },
    { id: 'sync', label: 'Sync', icon: Zap },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
    { id: 'angelic', label: 'Angelic', icon: Star },
    { id: 'divination', label: 'Divination', icon: Target },
    { id: 'third-eye', label: 'Third Eye', icon: Gift },
    { id: 'referrals', label: 'Referrals', icon: Shield },
    { id: 'wisdom', label: 'Wisdom', icon: Brain },
    { id: 'guidance', label: 'Guidance', icon: Heart }
  ];

  return (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-4 border-b border-purple-500/30">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Spiritual Dashboard</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate('/pro')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
          >
            ✨ Pro Features
          </Button>
          <Button
            onClick={() => navigate('/quantum-dashboard')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold"
          >
            🌌 Quantum
          </Button>
        </div>
      </div>

      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-1 bg-black/20 p-2 h-auto">
        {navigationTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 p-3 min-h-[64px] data-[state=active]:bg-purple-600/50 data-[state=active]:text-white text-purple-300 mobile-tab"
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-xs font-bold text-center leading-tight">
                {tab.label}
              </span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
};
