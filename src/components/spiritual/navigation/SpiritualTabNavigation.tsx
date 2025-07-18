
import React from 'react';
import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleMeditateClick = () => {
    navigate('/meditation');
  };

  return (
    <>
      {/* Primary Tab Navigation - Fixed visibility for mobile */}
      <TabsList className="w-full bg-black/30 p-2 gap-1 mb-6 grid grid-cols-2 sm:grid-cols-4 h-auto">
        <TabsTrigger 
          value="seraphina" 
          className="flex flex-col items-center justify-center gap-1 p-3 data-[state=active]:bg-purple-600/50 text-xs sm:text-sm h-16 sm:h-14"
        >
          <Sparkles className="w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-center leading-tight font-medium">Seraphina</span>
        </TabsTrigger>
        <TabsTrigger 
          value="rituals" 
          className="flex flex-col items-center justify-center gap-1 p-3 data-[state=active]:bg-red-600/50 text-xs sm:text-sm h-16 sm:h-14"
        >
          <Flame className="w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-center leading-tight font-medium">Rituals</span>
        </TabsTrigger>
        <TabsTrigger 
          value="cultural" 
          className="flex flex-col items-center justify-center gap-1 p-3 data-[state=active]:bg-orange-600/50 text-xs sm:text-sm h-16 sm:h-14"
        >
          <Globe className="w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-center leading-tight font-medium">Cultural</span>
        </TabsTrigger>
        <TabsTrigger 
          value="community" 
          className="flex flex-col items-center justify-center gap-1 p-3 data-[state=active]:bg-blue-600/50 text-xs sm:text-sm h-16 sm:h-14"
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
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
          >
            <TrendingUp className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-center">Progress</span>
          </Button>
          <Button 
            onClick={() => onTabChange('mood')} 
            variant={activeTab === 'mood' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
          >
            <Heart className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-center">Mood</span>
          </Button>
          <Button 
            onClick={handleMeditateClick}
            variant="outline"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px] bg-indigo-600/20 border-indigo-500/50 text-indigo-200 hover:bg-indigo-600/40"
          >
            <Play className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-center">Meditate</span>
          </Button>
          <Button 
            onClick={() => onTabChange('dreams')} 
            variant={activeTab === 'dreams' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
          >
            <Moon className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-center">Dreams</span>
          </Button>
          <Button 
            onClick={() => onTabChange('protection')} 
            variant={activeTab === 'protection' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
          >
            <Shield className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-center">Shield</span>
          </Button>
          <Button 
            onClick={() => onTabChange('angels')} 
            variant={activeTab === 'angels' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
          >
            <Crown className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-center">Angels</span>
          </Button>
          <Button 
            onClick={() => onTabChange('insights')} 
            variant={activeTab === 'insights' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
          >
            <Brain className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-center">Insights</span>
          </Button>
          <Button 
            onClick={() => onTabChange('guidance')} 
            variant={activeTab === 'guidance' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
          >
            <Lightbulb className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-center">Guide</span>
          </Button>
          <Button 
            onClick={() => onTabChange('shadow')} 
            variant={activeTab === 'shadow' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
          >
            <Eye className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-center">Shadow</span>
          </Button>  
          <Button 
            onClick={() => onTabChange('sync')} 
            variant={activeTab === 'sync' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
          >
            <Zap className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-center">Sync</span>
          </Button>
          <Button 
            onClick={() => onTabChange('assessment')} 
            variant={activeTab === 'assessment' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
          >
            <Target className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-center">Assessment</span>
          </Button>
          <Button 
            onClick={() => onTabChange('invite')} 
            variant={activeTab === 'invite' ? 'default' : 'outline'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
          >
            <UserPlus className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-center">Invite</span>
          </Button>
        </div>
      </div>
    </>
  );
};
