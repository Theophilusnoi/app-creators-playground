
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Zap, Heart, Moon, Shield, BarChart3, Coins, Crown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SpiritualNavigationProps {
  onQuickAction: (tab: string) => void;
}

export const SpiritualNavigation: React.FC<SpiritualNavigationProps> = ({ onQuickAction }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const quickActions = [
    { icon: Zap, label: "Quick Ritual", action: () => onQuickAction('rituals') },
    { icon: Heart, label: "Mood Check", action: () => onQuickAction('mood') },
    { icon: Moon, label: "Dream Log", action: () => onQuickAction('dreams') },
    { icon: Shield, label: "Protection", action: () => onQuickAction('protection') },
    { icon: Crown, label: "Angels", action: () => onQuickAction('angels') }
  ];

  return (
    <div className="flex flex-col gap-4 mb-4 sm:mb-6">
      <Button onClick={() => navigate('/')} variant="outline" className="border-purple-500/30 text-purple-200 hover:bg-purple-600/20 w-full sm:w-auto self-start">
        <Home className="w-4 h-4 mr-2" />
        Home
      </Button>
      
      {/* Quick Actions - Better mobile layout */}
      <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3">
        {quickActions.map((action, index) => (
          <Button 
            key={index} 
            onClick={action.action} 
            size={isMobile ? "default" : "sm"} 
            variant="outline" 
            className="border-purple-400/30 text-purple-200 hover:bg-purple-600/20 flex items-center justify-center gap-2 py-3 sm:py-2"
          >
            <action.icon className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Additional Navigation - Better mobile spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Button onClick={() => navigate('/quantum-dashboard')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 sm:py-2">
          <Zap className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="font-medium">Quantum Dashboard</span>
        </Button>
        <Button onClick={() => navigate('/gamification')} variant="outline" className="border-green-500/30 text-green-200 hover:bg-green-600/20 py-3 sm:py-2">
          <BarChart3 className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="font-medium">Progress Tracker</span>
        </Button>
        <Button onClick={() => navigate('/manifestation')} className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 py-3 sm:py-2">
          <Coins className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="font-medium">Wealth Manifestation</span>
        </Button>
      </div>
    </div>
  );
};
