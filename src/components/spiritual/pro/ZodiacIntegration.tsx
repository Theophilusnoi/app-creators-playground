
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Star, 
  Sun, 
  Moon, 
  Globe,
  Bell,
  Palette,
  Calendar,
  Eye,
  Zap
} from 'lucide-react';

interface ZodiacIntegrationProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
}

const zodiacSigns = {
  aries: { name: 'Aries', element: 'Fire', planet: 'Mars', color: '#FF6B6B', stone: 'Ruby', dates: 'Mar 21 - Apr 19' },
  taurus: { name: 'Taurus', element: 'Earth', planet: 'Venus', color: '#4ECDC4', stone: 'Rose Quartz', dates: 'Apr 20 - May 20' },
  gemini: { name: 'Gemini', element: 'Air', planet: 'Mercury', color: '#45B7D1', stone: 'Citrine', dates: 'May 21 - Jun 20' },
  cancer: { name: 'Cancer', element: 'Water', planet: 'Moon', color: '#96CEB4', stone: 'Moonstone', dates: 'Jun 21 - Jul 22' },
  leo: { name: 'Leo', element: 'Fire', planet: 'Sun', color: '#FFEAA7', stone: 'Sunstone', dates: 'Jul 23 - Aug 22' },
  virgo: { name: 'Virgo', element: 'Earth', planet: 'Mercury', color: '#DDA0DD', stone: 'Moss Agate', dates: 'Aug 23 - Sep 22' },
  libra: { name: 'Libra', element: 'Air', planet: 'Venus', color: '#FAB1A0', stone: 'Lapis Lazuli', dates: 'Sep 23 - Oct 22' },
  scorpio: { name: 'Scorpio', element: 'Water', planet: 'Pluto', color: '#6C5CE7', stone: 'Obsidian', dates: 'Oct 23 - Nov 21' },
  sagittarius: { name: 'Sagittarius', element: 'Fire', planet: 'Jupiter', color: '#A29BFE', stone: 'Turquoise', dates: 'Nov 22 - Dec 21' },
  capricorn: { name: 'Capricorn', element: 'Earth', planet: 'Saturn', color: '#636E72', stone: 'Hematite', dates: 'Dec 22 - Jan 19' },
  aquarius: { name: 'Aquarius', element: 'Air', planet: 'Uranus', color: '#74B9FF', stone: 'Amethyst', dates: 'Jan 20 - Feb 18' },
  pisces: { name: 'Pisces', element: 'Water', planet: 'Neptune', color: '#FD79A8', stone: 'Aquamarine', dates: 'Feb 19 - Mar 20' }
};

export const ZodiacIntegration: React.FC<ZodiacIntegrationProps> = ({ 
  userProfile, 
  setUserProfile 
}) => {
  const { toast } = useToast();
  const [selectedSun, setSelectedSun] = useState(userProfile?.zodiac?.sun || '');
  const [selectedMoon, setSelectedMoon] = useState(userProfile?.zodiac?.moon || '');
  const [selectedRising, setSelectedRising] = useState(userProfile?.zodiac?.rising || '');
  const [astroAlerts, setAstroAlerts] = useState(userProfile?.zodiac?.astroAlerts ?? true);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    setIsProfileComplete(selectedSun && selectedMoon && selectedRising);
  }, [selectedSun, selectedMoon, selectedRising]);

  const planetaryHours = [
    { planet: 'Sun', time: '6:00 AM', energy: 'Leadership, Vitality', icon: Sun },
    { planet: 'Venus', time: '7:00 AM', energy: 'Love, Beauty, Harmony', icon: Star },
    { planet: 'Mercury', time: '8:00 AM', energy: 'Communication, Learning', icon: Zap },
    { planet: 'Moon', time: '9:00 AM', energy: 'Intuition, Emotions', icon: Moon }
  ];

  const saveZodiacProfile = () => {
    if (!selectedSun || !selectedMoon || !selectedRising) {
      toast({
        title: "Incomplete Profile",
        description: "Please select your Sun, Moon, and Rising signs",
        variant: "destructive"
      });
      return;
    }

    const zodiacProfile = {
      sun: selectedSun,
      moon: selectedMoon,
      rising: selectedRising,
      astroAlerts,
      elements: {
        primary: zodiacSigns[selectedSun as keyof typeof zodiacSigns]?.element,
        secondary: zodiacSigns[selectedMoon as keyof typeof zodiacSigns]?.element,
        rising: zodiacSigns[selectedRising as keyof typeof zodiacSigns]?.element
      },
      recommendations: generateRecommendations(selectedSun, selectedMoon, selectedRising),
      createdAt: new Date().toISOString()
    };

    const updatedProfile = { 
      ...userProfile, 
      zodiac: zodiacProfile 
    };
    
    setUserProfile(updatedProfile);
    localStorage.setItem('spiritualMindProfile', JSON.stringify(updatedProfile));
    
    toast({
      title: "Zodiac Profile Saved",
      description: `Your celestial blueprint has been activated!`,
    });
  };

  const generateRecommendations = (sun: string, moon: string, rising: string) => {
    const sunSign = zodiacSigns[sun as keyof typeof zodiacSigns];
    const moonSign = zodiacSigns[moon as keyof typeof zodiacSigns];
    
    const recommendations: any = {
      crystals: [],
      breathwork: '',
      meditation: '',
      rituals: []
    };

    // Sun sign recommendations
    switch (sunSign?.element) {
      case 'Fire':
        recommendations.crystals.push('Ruby', 'Carnelian', 'Clear Quartz');
        recommendations.breathwork = 'Golden light visualization with dynamic breathing';
        recommendations.meditation = 'Active visualization with solar energy';
        recommendations.rituals.push('Dawn sun salutation', 'Fire element activation');
        break;
      case 'Earth':
        recommendations.crystals.push('Hematite', 'Smoky Quartz', 'Moss Agate');
        recommendations.breathwork = 'Grounding breath with root chakra focus';
        recommendations.meditation = 'Earth connection meditation';
        recommendations.rituals.push('Grounding with crystals', 'Nature connection ritual');
        break;
      case 'Air':
        recommendations.crystals.push('Amethyst', 'Clear Quartz', 'Selenite');
        recommendations.breathwork = 'Alternate nostril breathing with mental clarity focus';
        recommendations.meditation = 'Mindfulness and mental clarity';
        recommendations.rituals.push('Incense burning', 'Wind element invocation');
        break;
      case 'Water':
        recommendations.crystals.push('Moonstone', 'Labradorite', 'Aquamarine');
        recommendations.breathwork = 'Gentle flowing breath with emotional balance';
        recommendations.meditation = 'Emotional healing meditation';
        recommendations.rituals.push('Water blessing', 'Lunar cycle rituals');
        break;
    }

    return recommendations;
  };

  const getCurrentSign = (type: 'sun' | 'moon' | 'rising') => {
    const signKey = type === 'sun' ? selectedSun : type === 'moon' ? selectedMoon : selectedRising;
    return zodiacSigns[signKey as keyof typeof zodiacSigns];
  };

  return (
    <div className="space-y-6">
      {/* Zodiac Profile Setup */}
      <Card className="bg-indigo-900/20 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-200 flex items-center gap-2">
            <Star className="w-6 h-6" />
            Celestial Profile Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-indigo-200 font-medium">
                <Sun className="w-4 h-4" />
                Sun Sign (Core Self)
              </label>
              <Select value={selectedSun} onValueChange={setSelectedSun}>
                <SelectTrigger className="bg-black/20 border-indigo-400/30 text-white">
                  <SelectValue placeholder="Select sun sign" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-indigo-400/30">
                  {Object.entries(zodiacSigns).map(([key, sign]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-indigo-600/20">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: sign.color }}
                        />
                        <span>{sign.name}</span>
                        <span className="text-xs text-gray-400">({sign.dates})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-indigo-200 font-medium">
                <Moon className="w-4 h-4" />
                Moon Sign (Emotions)
              </label>
              <Select value={selectedMoon} onValueChange={setSelectedMoon}>
                <SelectTrigger className="bg-black/20 border-indigo-400/30 text-white">
                  <SelectValue placeholder="Select moon sign" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-indigo-400/30">
                  {Object.entries(zodiacSigns).map(([key, sign]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-indigo-600/20">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: sign.color }}
                        />
                        <span>{sign.name}</span>
                        <span className="text-xs text-gray-400">({sign.dates})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-indigo-200 font-medium">
                <Eye className="w-4 h-4" />
                Rising Sign (Appearance)
              </label>
              <Select value={selectedRising} onValueChange={setSelectedRising}>
                <SelectTrigger className="bg-black/20 border-indigo-400/30 text-white">
                  <SelectValue placeholder="Select rising sign" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-indigo-400/30">
                  {Object.entries(zodiacSigns).map(([key, sign]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-indigo-600/20">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: sign.color }}
                        />
                        <span>{sign.name}</span>
                        <span className="text-xs text-gray-400">({sign.dates})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={saveZodiacProfile}
            disabled={!isProfileComplete}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            {isProfileComplete ? 'Save Celestial Profile' : 'Complete All Signs First'}
          </Button>
        </CardContent>
      </Card>

      {/* Current Profile Display */}
      {userProfile?.zodiac && (
        <Card className="bg-purple-900/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-200 flex items-center gap-2">
              <Palette className="w-6 h-6" />
              Your Celestial Blueprint
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['sun', 'moon', 'rising'] as const).map((type) => {
                const sign = getCurrentSign(type);
                const Icon = type === 'sun' ? Sun : type === 'moon' ? Moon : Eye;
                
                if (!sign) return null;
                
                return (
                  <div key={type} className="bg-purple-800/20 p-4 rounded-lg border border-purple-600/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-purple-300" />
                      <span className="text-purple-200 font-semibold capitalize">{type}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: sign.color }}
                        />
                        <span className="text-white font-medium">{sign.name}</span>
                      </div>
                      <div className="text-sm text-purple-300">
                        <div>Element: {sign.element}</div>
                        <div>Planet: {sign.planet}</div>
                        <div>Stone: {sign.stone}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {userProfile.zodiac.recommendations && (
              <div className="mt-6 space-y-4">
                <h4 className="text-purple-200 font-semibold">Personalized Recommendations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-800/20 p-4 rounded-lg">
                    <h5 className="text-purple-300 font-medium mb-2">Crystals</h5>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.zodiac.recommendations.crystals?.map((crystal: string) => (
                        <Badge key={crystal} className="bg-purple-600/20 text-purple-200">
                          {crystal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-purple-800/20 p-4 rounded-lg">
                    <h5 className="text-purple-300 font-medium mb-2">Breathwork</h5>
                    <p className="text-purple-100 text-sm">{userProfile.zodiac.recommendations.breathwork}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Planetary Hours */}
      <Card className="bg-yellow-900/20 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-200 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Today's Planetary Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {planetaryHours.map((hour, index) => {
              const Icon = hour.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-yellow-800/20 rounded-lg border border-yellow-600/30"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-yellow-400" />
                    <div>
                      <Badge className="bg-yellow-600/20 text-yellow-200 mr-2">
                        {hour.time}
                      </Badge>
                      <span className="text-yellow-100 font-semibold">{hour.planet}</span>
                    </div>
                  </div>
                  <span className="text-yellow-200 text-sm">{hour.energy}</span>
                </div>
              );
            })}
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
              onClick={() => {
                setAstroAlerts(!astroAlerts);
                if (userProfile?.zodiac) {
                  const updatedProfile = {
                    ...userProfile,
                    zodiac: { ...userProfile.zodiac, astroAlerts: !astroAlerts }
                  };
                  setUserProfile(updatedProfile);
                  localStorage.setItem('spiritualMindProfile', JSON.stringify(updatedProfile));
                }
              }}
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
                <p className="text-orange-300 text-xs">Communication and technology flow smoothly</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
