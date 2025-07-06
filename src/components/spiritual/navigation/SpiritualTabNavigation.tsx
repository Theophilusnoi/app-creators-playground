
import React from 'react';
import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, Flame, Globe, Users, TrendingUp, Heart, Play, Moon, 
  Shield, Crown, Brain, Lightbulb, Eye, Zap, Target, UserPlus 
} from 'lucide-react';

interface SpiritualTabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SpiritualTabNavigation: React.FC<SpiritualTabNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <>
      {/* Primary Tab Navigation - Always visible */}
      <TabsList className="grid w-full bg-black/30 p-2 gap-1 mb-6 grid-cols-2 sm:grid-cols-4 min-h-[80px] sm:min-h-[60px]">
        <TabsTrigger 
          value="seraphina" 
          className="flex flex-col items-center justify-center gap-1 p-3 data-[state=active]:bg-purple-600/50 text-xs sm:text-sm h-full"
        >
          <Sparkles className="w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-center leading-tight font-medium">Seraphina</span>
        </TabsTrigger>
        <TabsTrigger 
          value="rituals" 
          className="flex flex-col items-center justify-center gap-1 p-3 data-[state=active]:bg-red-600/50 text-xs sm:text-sm h-full"
        >
          <Flame className="w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-center leading-tight font-medium">Rituals</span>
        </TabsTrigger>
        <TabsTrigger 
          value="cultural" 
          className="flex flex-col items-center justify-center gap-1 p-3 data-[state=active]:bg-orange-600/50 text-xs sm:text-sm h-full"
        >
          <Globe className="w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-center leading-tight font-medium">Cultural</span>
        </TabsTrigger>
        <TabsTrigger 
          value="community" 
          className="flex flex-col items-center justify-center gap-1 p-3 data-[state=active]:bg-blue-600/50 text-xs sm:text-sm h-full"
        >
          <Users className="w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-center leading-tight font-medium">Community</span>
        </TabsTrigger>
      </TabsList>

      {/* Secondary Navigation - Mobile optimized grid */}
      <div className="mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 p-3 bg-black/20 rounded-lg">
          <Button 
            onClick={() => onTabChange('progress')} 
            variant={activeTab === 'progress' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs"
          >
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">Progress</span>
          </Button>
          <Button 
            onClick={() => onTabChange('mood')} 
            variant={activeTab === 'mood' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs"
          >
            <Heart className="w-4 h-4" />
            <span className="font-medium">Mood</span>
          </Button>
          <Button 
            onClick={() => onTabChange('meditate')} 
            variant={activeTab === 'meditate' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs"
          >
            <Play className="w-4 h-4" />
            <span className="font-medium">Meditate</span>
          </Button>
          <Button 
            onClick={() => onTabChange('dreams')} 
            variant={activeTab === 'dreams' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs"
          >
            <Moon className="w-4 h-4" />
            <span className="font-medium">Dreams</span>
          </Button>
          <Button 
            onClick={() => onTabChange('protection')} 
            variant={activeTab === 'protection' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs"
          >
            <Shield className="w-4 h-4" />
            <span className="font-medium">Shield</span>
          </Button>
          <Button 
            onClick={() => onTabChange('angels')} 
            variant={activeTab === 'angels' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs"
          >
            <Crown className="w-4 h-4" />
            <span className="font-medium">Angels</span>
          </Button>
          <Button 
            onClick={() => onTabChange('insights')} 
            variant={activeTab === 'insights' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs"
          >
            <Brain className="w-4 h-4" />
            <span className="font-medium">Insights</span>
          </Button>
          <Button 
            onClick={() => onTabChange('guidance')} 
            variant={activeTab === 'guidance' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs"
          >
            <Lightbulb className="w-4 h-4" />
            <span className="font-medium">Guide</span>
          </Button>
          <Button 
            onClick={() => onTabChange('shadow')} 
            variant={activeTab === 'shadow' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs"
          >
            <Eye className="w-4 h-4" />
            <span className="font-medium">Shadow</span>
          </Button>
          <Button 
            onClick={() => onTabChange('sync')} 
            variant={activeTab === 'sync' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs"
          >
            <Zap className="w-4 h-4" />
            <span className="font-medium">Sync</span>
          </Button>
          <Button 
            onClick={() => onTabChange('assessment')} 
            variant={activeTab === 'assessment' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs"
          >
            <Target className="w-4 h-4" />
            <span className="font-medium">Assessment</span>
          </Button>
          <Button 
            onClick={() => onTabChange('invite')} 
            variant={activeTab === 'invite' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span className="font-medium">Invite</span>
          </Button>
        </div>
      </div>
    </>
  );
};
