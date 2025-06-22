
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Star, 
  Sun, 
  Moon, 
  Globe,
  Bell,
  Palette
} from 'lucide-react';

interface ZodiacIntegrationProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
}

export const ZodiacIntegration: React.FC<ZodiacIntegrationProps> = ({ 
  userProfile, 
  setUserProfile 
}) => {
  const { toast } = useToast();
  const [selectedSign, setSelectedSign] = useState(userProfile?.zodiac || 'aries');
  const [astroAlerts, setAstroAlerts] = useState(true);

  const zodiacData = {
    aries: { element: 'Fire', planet: 'Mars', color: '#FF6B6B', stone: 'Ruby' },
    taurus: { element: 'Earth', planet: 'Venus', color: '#4ECDC4', stone: 'Rose Quartz' },
    gemini: { element: 'Air', planet: 'Mercury', color: '#45B7D1', stone: 'Citrine' },
    cancer: { element: 'Water', planet: 'Moon', color: '#96CEB4', stone: 'Moonstone' },
    leo: { element: 'Fire', planet: 'Sun', color: '#FFEAA7', stone: 'Sunstone' },
    virgo: { element: 'Earth', planet: 'Mercury', color: '#DDA0DD', stone: 'Moss Agate' },
    libra: { element: 'Air', planet: 'Venus', color: '#FAB1A0', stone: 'Lapis Lazuli' },
    scorpio: { element: 'Water', planet: 'Pluto', color: '#6C5CE7', stone: 'Obsidian' },
    sagittarius: { element: 'Fire', planet: 'Jupiter', color: '#A29BFE', stone: 'Turquoise' },
    capricorn: { element: 'Earth', planet: 'Saturn', color: '#636E72', stone: 'Hematite' },
    aquarius: { element: 'Air', planet: 'Uranus', color: '#74B9FF', stone: 'Amethyst' },
    pisces: { element: 'Water', planet: 'Neptune', color: '#FD79A8', stone: 'Aquamarine' }
  };

  const planetaryHours = [
    { planet: 'Sun', time: '6:00 AM', energy: 'Leadership, Vitality' },
    { planet: 'Venus', time: '7:00 AM', energy: 'Love, Beauty, Harmony' },
    { planet: 'Mercury', time: '8:00 AM', energy: 'Communication, Learning' },
    { planet: 'Moon', time: '9:00 AM', energy: 'Intuition, Emotions' }
  ];

  const currentSign = zodiacData[selectedSign as keyof typeof zodiacData];

  const updateZodiacSign = (sign: string) => {
    setSelectedSign(sign);
    const updatedProfile = { ...userProfile, zodiac: sign };
    setUserProfile(updatedProfile);
    localStorage.setItem('spiritualMindProfile', JSON.stringify(updatedProfile));
    
    toast({
      title: "Zodiac Sign Updated",
      description: `Celestial alignment set to ${sign.charAt(0).toUpperCase() + sign.slice(1)}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Birth Chart Analysis */}
      <Card className="bg-indigo-900/20 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-200 flex items-center gap-2">
            <Star className="w-6 h-6" />
            Celestial Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-indigo-200">Sun Sign:</span>
                <Badge 
                  className="text-white border-0"
                  style={{ backgroundColor: currentSign.color }}
                >
                  {selectedSign.charAt(0).toUpperCase() + selectedSign.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-indigo-200">Element:</span>
                <span className="text-indigo-100">{currentSign.element}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-indigo-200">Ruling Planet:</span>
                <span className="text-indigo-100">{currentSign.planet}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-indigo-200">Power Stone:</span>
                <span className="text-indigo-100">{currentSign.stone}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-indigo-800/20 p-4 rounded-lg border border-indigo-600/30">
                <h4 className="text-indigo-200 font-semibold mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Energy Color
                </h4>
                <div 
                  className="w-full h-12 rounded-lg border border-indigo-400/30"
                  style={{ backgroundColor: currentSign.color }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zodiac Selection */}
      <Card className="bg-purple-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-200">Select Your Sign</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {Object.keys(zodiacData).map((sign) => (
              <Button
                key={sign}
                onClick={() => updateZodiacSign(sign)}
                variant={selectedSign === sign ? "default" : "outline"}
                className={`${
                  selectedSign === sign 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'border-purple-400/30 text-purple-200 hover:bg-purple-600/20'
                }`}
              >
                {sign.charAt(0).toUpperCase() + sign.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Planetary Hours */}
      <Card className="bg-yellow-900/20 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-200 flex items-center gap-2">
            <Sun className="w-6 h-6" />
            Today's Planetary Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {planetaryHours.map((hour, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-yellow-800/20 rounded-lg border border-yellow-600/30"
              >
                <div className="flex items-center gap-3">
                  <Badge className="bg-yellow-600/20 text-yellow-200">
                    {hour.time}
                  </Badge>
                  <span className="text-yellow-100 font-semibold">{hour.planet}</span>
                </div>
                <span className="text-yellow-200 text-sm">{hour.energy}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Astro Alerts */}
      <Card className="bg-green-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-200 flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Celestial Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-green-200">Astro-Alerts Enabled:</span>
            <Button
              onClick={() => setAstroAlerts(!astroAlerts)}
              className={`${
                astroAlerts 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {astroAlerts ? 'ON' : 'OFF'}
            </Button>
          </div>
          
          {astroAlerts && (
            <div className="space-y-2">
              <div className="bg-green-800/20 p-3 rounded-lg border border-green-600/30">
                <div className="flex items-center gap-2 mb-1">
                  <Moon className="w-4 h-4 text-green-400" />
                  <span className="text-green-200 font-semibold text-sm">New Moon Tonight</span>
                </div>
                <p className="text-green-300 text-xs">Optimal for intention setting and new beginnings</p>
              </div>
              
              <div className="bg-orange-800/20 p-3 rounded-lg border border-orange-600/30">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-200 font-semibold text-sm">Mercury Direct Tomorrow</span>
                </div>
                <p className="text-orange-300 text-xs">Third eye practices are now safe to resume</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
