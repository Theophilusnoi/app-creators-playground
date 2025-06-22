
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Cloud, Sun, CloudRain } from 'lucide-react';
import { AmbientContext } from '@/services/ambient/ambientTypes';

interface WeatherBadgeProps {
  context: AmbientContext;
}

export const WeatherBadge: React.FC<WeatherBadgeProps> = ({ context }) => {
  const getWeatherIcon = () => {
    switch (context.weather) {
      case 'rainy': return <CloudRain className="w-4 h-4" />;
      case 'cloudy': return <Cloud className="w-4 h-4" />;
      default: return <Sun className="w-4 h-4" />;
    }
  };

  const getTimeOfDayColor = () => {
    switch (context.timeOfDay) {
      case 'dawn': return 'from-orange-500 to-pink-500';
      case 'morning': return 'from-yellow-400 to-orange-400';
      case 'afternoon': return 'from-blue-400 to-cyan-400';
      case 'evening': return 'from-purple-500 to-indigo-500';
      case 'night': return 'from-indigo-600 to-purple-700';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getWeatherIcon()}
      <Badge className={`bg-gradient-to-r ${getTimeOfDayColor()} text-white font-bold text-sm`}>
        {context.timeOfDay}
      </Badge>
    </div>
  );
};
