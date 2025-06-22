
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Globe, 
  Users, 
  Trophy, 
  Heart,
  Play,
  Moon,
  Eye,
  Sparkles,
  Brain,
  TrendingUp,
  Lightbulb,
  Gift,
  MessageCircle,
  Crown,
  Zap,
  CreditCard,
  BookOpen
} from "lucide-react";

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'seraphina', label: 'Seraphina', icon: MessageCircle, color: 'from-purple-600 to-indigo-600' },
  { id: 'subscription', label: 'Subscription', icon: CreditCard, color: 'from-emerald-600 to-green-600' },
  { id: 'rituals', label: 'Rituals', icon: Shield, color: 'from-blue-600 to-purple-600' },
  { id: 'wisdom', label: 'Wisdom', icon: BookOpen, color: 'from-amber-600 to-orange-600' },
  { id: 'guidance', label: 'Guidance', icon: Lightbulb, color: 'from-cyan-600 to-blue-600' },
  { id: 'cultural', label: 'Cultural', icon: Globe, color: 'from-green-600 to-blue-600' },
  { id: 'community', label: 'Community', icon: Users, color: 'from-pink-600 to-red-600' },
  { id: 'progress', label: 'Progress', icon: Trophy, color: 'from-yellow-600 to-orange-600' },
  { id: 'mood', label: 'Mood', icon: Heart, color: 'from-red-600 to-pink-600' },
  { id: 'meditation', label: 'Meditate', icon: Play, color: 'from-indigo-600 to-purple-600' },
  { id: 'dreams', label: 'Dreams', icon: Moon, color: 'from-blue-600 to-indigo-600' },
  { id: 'shadow', label: 'Shadow', icon: Eye, color: 'from-gray-600 to-purple-600' },
  { id: 'sync', label: 'Sync', icon: Sparkles, color: 'from-purple-600 to-pink-600' },
  { id: 'assessment', label: 'Assessment', icon: Brain, color: 'from-cyan-600 to-blue-600' },
  { id: 'insights', label: 'Insights', icon: TrendingUp, color: 'from-green-600 to-cyan-600' },
  { id: 'recommendations', label: 'Old Guidance', icon: Lightbulb, color: 'from-orange-600 to-yellow-600' },
  { id: 'angelic', label: 'Angels', icon: Crown, color: 'from-gold-500 to-yellow-500' },
  { id: 'divination', label: 'Divination', icon: Zap, color: 'from-violet-600 to-purple-600' },
  { id: 'referrals', label: 'Invite', icon: Gift, color: 'from-red-600 to-orange-600' },
  { id: 'third-eye', label: 'Third Eye', icon: Eye },
];

export const TopNavigation: React.FC<TopNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full bg-black/20 backdrop-blur-sm rounded-lg p-4 mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-16 gap-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                relative flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 h-auto min-h-[60px]
                ${isActive 
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105` 
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:scale-102'
                }
              `}
              variant="ghost"
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium text-center leading-tight">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute inset-0 rounded-lg border-2 border-white/30 pointer-events-none" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
