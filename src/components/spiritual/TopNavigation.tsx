import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, MessageCircle, CreditCard, Settings, Users, BarChart3, Sun, Moon, Eye, Search, Plus, Download, Brain, Star, Shield, Heart, Crown } from "lucide-react";

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'archetype', label: 'Soul Blueprint', icon: Crown }, // Added new archetype system
  { id: 'seraphina', label: 'Seraphina', icon: MessageCircle },
  { id: 'subscription', label: 'Tiers', icon: CreditCard }, // Updated label to reflect wisdom tiers
  { id: 'rituals', label: 'Rituals', icon: Star },
  { id: 'cultural', label: 'Cultural', icon: Users },
  { id: 'community', label: 'Community', icon: Home },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
  { id: 'mood', label: 'Mood', icon: Sun },
  { id: 'meditation', label: 'Meditation', icon: Moon },
  { id: 'dreams', label: 'Dreams', icon: Eye },
  { id: 'shadow', label: 'Shadow Work', icon: Brain },
  { id: 'sync', label: 'Synchronicity', icon: Plus },
  { id: 'assessment', label: 'Assessment', icon: Search },
  { id: 'insights', label: 'Insights', icon: Download },
  { id: 'recommendations', label: 'Recommendations', icon: Heart },
  { id: 'angelic', label: 'Angelic', icon: Shield },
  { id: 'divination', label: 'Divination', icon: Settings },
  { id: 'third-eye', label: 'Third Eye', icon: Eye },
  { id: 'referrals', label: 'Referrals', icon: Users },
  { id: 'wisdom', label: 'Wisdom', icon: Star },
  { id: 'guidance', label: 'Guidance', icon: MessageCircle },
];

export const TopNavigation: React.FC<TopNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabsList className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2 mb-4">
      {navigationItems.map((item) => (
        <TabsTrigger
          key={item.id}
          value={item.id}
          onClick={() => onTabChange(item.id)}
          className={`flex flex-col items-center justify-center py-2 rounded-md text-sm
            ${activeTab === item.id
              ? 'bg-purple-700 text-white'
              : 'bg-gray-800 text-purple-300 hover:text-white hover:bg-purple-600'
            }`}
        >
          <item.icon className="w-4 h-4 mb-1" />
          {item.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
