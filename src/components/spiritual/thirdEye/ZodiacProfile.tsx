
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Star, Moon, Sun, Flame, Waves, Wind, Mountain } from 'lucide-react';

interface ZodiacProfileProps {
  profile: any;
  onProfileUpdate: (profile: any) => void;
}

const zodiacSigns = {
  aries: { name: 'Aries', element: 'fire', icon: '♈', color: 'text-red-400' },
  taurus: { name: 'Taurus', element: 'earth', icon: '♉', color: 'text-green-400' },
  gemini: { name: 'Gemini', element: 'air', icon: '♊', color: 'text-yellow-400' },
  cancer: { name: 'Cancer', element: 'water', icon: '♋', color: 'text-blue-400' },
  leo: { name: 'Leo', element: 'fire', icon: '♌', color: 'text-orange-400' },
  virgo: { name: 'Virgo', element: 'earth', icon: '♍', color: 'text-green-400' },
  libra: { name: 'Libra', element: 'air', icon: '♎', color: 'text-pink-400' },
  scorpio: { name: 'Scorpio', element: 'water', icon: '♏', color: 'text-red-600' },
  sagittarius: { name: 'Sagittarius', element: 'fire', icon: '♐', color: 'text-purple-400' },
  capricorn: { name: 'Capricorn', element: 'earth', icon: '♑', color: 'text-gray-400' },
  aquarius: { name: 'Aquarius', element: 'air', icon: '♒', color: 'text-cyan-400' },
  pisces: { name: 'Pisces', element: 'water', icon: '♓', color: 'text-blue-600' }
};

const elementIcons = {
  fire: Flame,
  earth: Mountain,
  air: Wind,
  water: Waves
};

export const ZodiacProfile: React.FC<ZodiacProfileProps> = ({ profile, onProfileUpdate }) => {
  const [sun, setSun] = useState(profile?.sun || '');
  const [moon, setMoon] = useState(profile?.moon || '');
  const [rising, setRising] = useState(profile?.rising || '');

  const handleSaveProfile = () => {
    const newProfile = {
      sun,
      moon,
      rising,
      elements: {
        primary: zodiacSigns[sun as keyof typeof zodiacSigns]?.element || '',
        secondary: zodiacSigns[moon as keyof typeof zodiacSigns]?.element || '',
        rising: zodiacSigns[rising as keyof typeof zodiacSigns]?.element || ''
      },
      recommendations: generateRecommendations(sun, moon, rising)
    };
    onProfileUpdate(newProfile);
  };

  const generateRecommendations = (sunSign: string, moonSign: string, risingSign: string) => {
    const recommendations: any = {};
    
    // Sun sign recommendations
    if (sunSign) {
      const sign = zodiacSigns[sunSign as keyof typeof zodiacSigns];
      switch (sign.element) {
        case 'fire':
          recommendations.crystals = ['Ruby', 'Carnelian', 'Clear Quartz'];
          recommendations.breathwork = 'Golden light visualization with dynamic breathing';
          break;
        case 'earth':
          recommendations.crystals = ['Hematite', 'Smoky Quartz', 'Moss Agate'];
          recommendations.breathwork = 'Grounding breath with root chakra focus';
          break;
        case 'air':
          recommendations.crystals = ['Amethyst', 'Clear Quartz', 'Selenite'];
          recommendations.breathwork = 'Alternate nostril breathing with mental clarity focus';
          break;
        case 'water':
          recommendations.crystals = ['Moonstone', 'Labradorite', 'Aquamarine'];
          recommendations.breathwork = 'Gentle flowing breath with emotional balance';
          break;
      }
    }

    return recommendations;
  };

  const getElementIcon = (element: string) => {
    const Icon = elementIcons[element as keyof typeof elementIcons];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-200">
            <Star className="w-6 h-6" />
            Zodiac Profile Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-purple-200 font-medium">
                <Sun className="w-4 h-4" />
                Sun Sign
              </label>
              <Select value={sun} onValueChange={setSun}>
                <SelectTrigger className="bg-black/20 border-purple-400/30 text-white">
                  <SelectValue placeholder="Select sun sign" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-400/30">
                  {Object.entries(zodiacSigns).map(([key, sign]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-purple-600/20">
                      <span className={`${sign.color} mr-2`}>{sign.icon}</span>
                      {sign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-purple-200 font-medium">
                <Moon className="w-4 h-4" />
                Moon Sign
              </label>
              <Select value={moon} onValueChange={setMoon}>
                <SelectTrigger className="bg-black/20 border-purple-400/30 text-white">
                  <SelectValue placeholder="Select moon sign" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-400/30">
                  {Object.entries(zodiacSigns).map(([key, sign]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-purple-600/20">
                      <span className={`${sign.color} mr-2`}>{sign.icon}</span>
                      {sign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-purple-200 font-medium">
                <Star className="w-4 h-4" />
                Rising Sign
              </label>
              <Select value={rising} onValueChange={setRising}>
                <SelectTrigger className="bg-black/20 border-purple-400/30 text-white">
                  <SelectValue placeholder="Select rising sign" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-400/30">
                  {Object.entries(zodiacSigns).map(([key, sign]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-purple-600/20">
                      <span className={`${sign.color} mr-2`}>{sign.icon}</span>
                      {sign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSaveProfile}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600"
            disabled={!sun || !moon || !rising}
          >
            Save Zodiac Profile
          </Button>
        </CardContent>
      </Card>

      {profile && (
        <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-400/50">
          <CardHeader>
            <CardTitle className="text-indigo-200">Your Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-lg font-semibold text-white">
                  {zodiacSigns[profile.sun as keyof typeof zodiacSigns]?.icon} Sun
                </div>
                <Badge className="bg-red-600/20 text-red-200">
                  {getElementIcon(profile.elements.primary)}
                  <span className="ml-1">{profile.elements.primary}</span>
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-semibold text-white">
                  {zodiacSigns[profile.moon as keyof typeof zodiacSigns]?.icon} Moon
                </div>
                <Badge className="bg-blue-600/20 text-blue-200">
                  {getElementIcon(profile.elements.secondary)}
                  <span className="ml-1">{profile.elements.secondary}</span>
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-semibold text-white">
                  {zodiacSigns[profile.rising as keyof typeof zodiacSigns]?.icon} Rising
                </div>
                <Badge className="bg-purple-600/20 text-purple-200">
                  {getElementIcon(profile.elements.rising)}
                  <span className="ml-1">{profile.elements.rising}</span>
                </Badge>
              </div>
            </div>

            {profile.recommendations && (
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-indigo-200 mb-2">Recommended Crystals:</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.recommendations.crystals?.map((crystal: string) => (
                      <Badge key={crystal} className="bg-indigo-600/20 text-indigo-200">
                        {crystal}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-200 mb-2">Breathwork Focus:</h4>
                  <p className="text-indigo-100 text-sm">{profile.recommendations.breathwork}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
