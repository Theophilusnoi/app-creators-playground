
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Heart,
  Sparkles,
  Book,
  Droplets,
  Shield,
  Users,
  TrendingUp,
  Smile,
  Clock,
  Moon,
  Zap,
  Eye,
  Target,
  Star,
  BarChart3,
  Lightbulb,
  Crown,
  Wand2,
  Gift,
  Brain,
  UserCheck,
  CreditCard,
  Flame
} from 'lucide-react';

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ activeTab, onTabChange }) => {
  const navigationTabs = [
    { id: 'archetype', label: 'Soul Archetype', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'seraphina', label: 'Seraphina Chat', icon: <Heart className="w-4 h-4" /> },
    { id: 'enhanced-seraphina', label: 'Enhanced Seraphina', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'sacred-bathing', label: 'Sacred Bathing', icon: <Droplets className="w-4 h-4" /> },
    { id: 'knowledge-base', label: 'Spiritual Knowledge', icon: <Book className="w-4 h-4" /> },
    { id: 'subscription', label: 'Subscription', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'rituals', label: 'Rituals', icon: <Flame className="w-4 h-4" /> },
    { id: 'cultural', label: 'Cultural Wisdom', icon: <Star className="w-4 h-4" /> },
    { id: 'community', label: 'Community', icon: <Users className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'mood', label: 'Mood Tracker', icon: <Smile className="w-4 h-4" /> },
    { id: 'meditation', label: 'Meditation', icon: <Clock className="w-4 h-4" /> },
    { id: 'dreams', label: 'Dreams', icon: <Moon className="w-4 h-4" /> },
    { id: 'shadow', label: 'Shadow Work', icon: <Zap className="w-4 h-4" /> },
    { id: 'sync', label: 'Synchronicity', icon: <Target className="w-4 h-4" /> },
    { id: 'assessment', label: 'Assessment', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'insights', label: 'Insights', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'recommendations', label: 'Recommendations', icon: <Star className="w-4 h-4" /> },
    { id: 'angelic', label: 'Angelic Assistance', icon: <Crown className="w-4 h-4" /> },
    { id: 'divination', label: 'Divination', icon: <Wand2 className="w-4 h-4" /> },
    { id: 'third-eye', label: 'Third Eye', icon: <Eye className="w-4 h-4" /> },
    { id: 'referrals', label: 'Referrals', icon: <Gift className="w-4 h-4" /> },
    { id: 'wisdom', label: 'Philosophy', icon: <Brain className="w-4 h-4" /> },
    { id: 'guidance', label: 'Personal Guidance', icon: <Shield className="w-4 h-4" /> }
  ];

  return (
    <div className="w-full mb-6">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-1 h-auto p-1 bg-black/20 backdrop-blur-sm">
        {navigationTabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 p-3 text-xs rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-purple-200 hover:text-white hover:bg-purple-500/20'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:block">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};
