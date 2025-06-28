
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

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleTabClick = (tabId: string) => {
    console.log(`Switching to tab: ${tabId}`);
    onTabChange(tabId);
  };

  return (
    <div className="h-full bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 border-r border-purple-500/30 flex flex-col">
      <div className="p-4 border-b border-purple-500/30">
        <h1 className="text-xl font-bold text-white mb-4">Spiritual Dashboard</h1>
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => handleNavigation('/pro')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold transition-all duration-300 hover:scale-105 text-sm"
          >
            ✨ Pro Features
          </Button>
          <Button
            onClick={() => handleNavigation('/quantum-dashboard')}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold transition-all duration-300 hover:scale-105 text-sm"
          >
            🌌 Quantum
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <TabsList className="flex flex-col w-full h-auto bg-transparent gap-2">
          {navigationTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center justify-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-purple-600/80 text-white border-purple-400/70 border-2 scale-105 shadow-lg' 
                    : 'bg-gray-800/40 text-purple-300 hover:bg-purple-600/40 hover:text-white hover:scale-102'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                <span className="font-medium text-left flex-1">
                  {tab.label}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
    </div>
  );
};
