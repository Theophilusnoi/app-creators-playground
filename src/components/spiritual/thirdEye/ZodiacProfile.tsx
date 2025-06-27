
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Star, Moon, Sun, Flame, Waves, Wind, Mountain, Eye } from 'lucide-react';

interface ZodiacProfileProps {
  profile: any;
  onProfileUpdate: (profile: any) => void;
}

const zodiacSigns = {
  aries: { name: 'Aries', element: 'fire', icon: '♈', color: 'text-red-400', dates: 'Mar 21 - Apr 19' },
  taurus: { name: 'Taurus', element: 'earth', icon: '♉', color: 'text-green-400', dates: 'Apr 20 - May 20' },
  gemini: { name: 'Gemini', element: 'air', icon: '♊', color: 'text-yellow-400', dates: 'May 21 - Jun 20' },
  cancer: { name: 'Cancer', element: 'water', icon: '♋', color: 'text-blue-400', dates: 'Jun 21 - Jul 22' },
  leo: { name: 'Leo', element: 'fire', icon: '♌', color: 'text-orange-400', dates: 'Jul 23 - Aug 22' },
  virgo: { name: 'Virgo', element: 'earth', icon: '♍', color: 'text-green-400', dates: 'Aug 23 - Sep 22' },
  libra: { name: 'Libra', element: 'air', icon: '♎', color: 'text-pink-400', dates: 'Sep 23 - Oct 22' },
  scorpio: { name: 'Scorpio', element: 'water', icon: '♏', color: 'text-red-600', dates: 'Oct 23 - Nov 21' },
  sagittarius: { name: 'Sagittarius', element: 'fire', icon: '♐', color: 'text-purple-400', dates: 'Nov 22 - Dec 21' },
  capricorn: { name: 'Capricorn', element: 'earth', icon: '♑', color: 'text-gray-400', dates: 'Dec 22 - Jan 19' },
  aquarius: { name: 'Aquarius', element: 'air', icon: '♒', color: 'text-cyan-400', dates: 'Jan 20 - Feb 18' },
  pisces: { name: 'Pisces', element: 'water', icon: '♓', color: 'text-blue-600', dates: 'Feb 19 - Mar 20' }
};

const elementIcons = {
  fire: Flame,
  earth: Mountain,
  air: Wind,
  water: Waves
};

export const ZodiacProfile: React.FC<ZodiacProfileProps> = ({ profile, onProfileUpdate }) => {
  const { toast } = useToast();
  const [sun, setSun] = useState(profile?.sun || '');
  const [moon, setMoon] = useState(profile?.moon || '');
  const [rising, setRising] = useState(profile?.rising || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load from localStorage if available
    const savedProfile = localStorage.getItem('thirdEyeZodiacProfile');
    if (savedProfile && !profile) {
      const parsed = JSON.parse(savedProfile);
      setSun(parsed.sun || '');
      setMoon(parsed.moon || '');
      setRising(parsed.rising || '');
      onProfileUpdate(parsed);
    }
  }, [profile, onProfileUpdate]);

  const handleSaveProfile = async () => {
    if (!sun || !moon || !rising) {
      toast({
        title: "Incomplete Profile",
        description: "Please select all three signs to activate your celestial profile",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const newProfile = {
        sun,
        moon,
        rising,
        elements: {
          primary: zodiacSigns[sun as keyof typeof zodiacSigns]?.element || '',
          secondary: zodiacSigns[moon as keyof typeof zodiacSigns]?.element || '',
          rising: zodiacSigns[rising as keyof typeof zodiacSigns]?.element || ''
        },
        recommendations: generateRecommendations(sun, moon, rising),
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      localStorage.setItem('thirdEyeZodiacProfile', JSON.stringify(newProfile));
      
      onProfileUpdate(newProfile);
      
      toast({
        title: "Zodiac Profile Activated",
        description: "Your celestial blueprint has been integrated with Third Eye practices",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save zodiac profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateRecommendations = (sunSign: string, moonSign: string, risingSign: string) => {
    const recommendations: any = {
      crystals: [],
      breathwork: '',
      meditation: '',
      timing: '',
      rituals: []
    };
    
    // Sun sign recommendations
    if (sunSign) {
      const sign = zodiacSigns[sunSign as keyof typeof zodiacSigns];
      switch (sign.element) {
        case 'fire':
          recommendations.crystals = ['Ruby', 'Carnelian', 'Clear Quartz'];
          recommendations.breathwork = 'Dynamic breath of fire with golden light visualization';
          recommendations.meditation = 'Active sun gazing meditation (indirect)';
          recommendations.timing = 'Best practiced during sunrise or noon';
          recommendations.rituals = ['Solar activation', 'Fire element charging'];
          break;
        case 'earth':
          recommendations.crystals = ['Hematite', 'Smoky Quartz', 'Moss Agate'];
          recommendations.breathwork = 'Deep grounding breath with root chakra focus';
          recommendations.meditation = 'Earth connection and stability meditation';
          recommendations.timing = 'Most effective when practiced outdoors on soil';
          recommendations.rituals = ['Crystal grid grounding', 'Earth blessing'];
          break;
        case 'air':
          recommendations.crystals = ['Amethyst', 'Clear Quartz', 'Selenite'];
          recommendations.breathwork = 'Alternate nostril breathing with mental clarity focus';
          recommendations.meditation = 'Mindfulness with breath awareness';
          recommendations.timing = 'Practice during windy days or high altitude';
          recommendations.rituals = ['Incense activation', 'Air element invocation'];
          break;
        case 'water':
          recommendations.crystals = ['Moonstone', 'Labradorite', 'Aquamarine'];
          recommendations.breathwork = 'Gentle flowing breath with emotional balance';
          recommendations.meditation = 'Emotional healing and intuitive opening';
          recommendations.timing = 'Most powerful during full moon or near water';
          recommendations.rituals = ['Water blessing', 'Lunar attunement'];
          break;
      }
    }

    // Add moon sign influence
    if (moonSign) {
      const moonSignData = zodiacSigns[moonSign as keyof typeof zodiacSigns];
      recommendations.emotionalFocus = `${moonSignData.name} moon enhances ${moonSignData.element} emotional patterns`;
    }

    return recommendations;
  };

  const getElementIcon = (element: string) => {
    const Icon = elementIcons[element as keyof typeof elementIcons];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  const resetProfile = () => {
    setSun('');
    setMoon('');
    setRising('');
    localStorage.removeItem('thirdEyeZodiacProfile');
    onProfileUpdate(null);
    
    toast({
      title: "Profile Reset",
      description: "Zodiac profile has been cleared"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-200">
            <Star className="w-6 h-6" />
            Third Eye Zodiac Integration
          </CardTitle>
          <p className="text-purple-300 text-sm">
            Align your Third Eye practices with your celestial blueprint for enhanced results
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-purple-200 font-medium">
                <Sun className="w-4 h-4" />
                Sun Sign (Core Energy)
              </label>
              <Select value={sun} onValueChange={setSun}>
                <SelectTrigger className="bg-black/20 border-purple-400/30 text-white">
                  <SelectValue placeholder="Select sun sign" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-400/30 z-50">
                  {Object.entries(zodiacSigns).map(([key, sign]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-purple-600/20">
                      <div className="flex items-center gap-2">
                        <span className={`${sign.color} text-lg`}>{sign.icon}</span>
                        <span>{sign.name}</span>
                        <span className="text-xs text-gray-400">({sign.dates})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-purple-200 font-medium">
                <Moon className="w-4 h-4" />
                Moon Sign (Intuition)
              </label>
              <Select value={moon} onValueChange={setMoon}>
                <SelectTrigger className="bg-black/20 border-purple-400/30 text-white">
                  <SelectValue placeholder="Select moon sign" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-400/30 z-50">
                  {Object.entries(zodiacSigns).map(([key, sign]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-purple-600/20">
                      <div className="flex items-center gap-2">
                        <span className={`${sign.color} text-lg`}>{sign.icon}</span>
                        <span>{sign.name}</span>
                        <span className="text-xs text-gray-400">({sign.dates})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-purple-200 font-medium">
                <Eye className="w-4 h-4" />
                Rising Sign (Perception)
              </label>
              <Select value={rising} onValueChange={setRising}>
                <SelectTrigger className="bg-black/20 border-purple-400/30 text-white">
                  <SelectValue placeholder="Select rising sign" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-400/30 z-50">
                  {Object.entries(zodiacSigns).map(([key, sign]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-purple-600/20">
                      <div className="flex items-center gap-2">
                        <span className={`${sign.color} text-lg`}>{sign.icon}</span>
                        <span>{sign.name}</span>
                        <span className="text-xs text-gray-400">({sign.dates})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSaveProfile}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              disabled={!sun || !moon || !rising || isLoading}
            >
              {isLoading ? 'Activating...' : 'Activate Zodiac Profile'}
            </Button>
            {profile && (
              <Button
                onClick={resetProfile}
                variant="outline"
                className="border-purple-400/30 text-purple-200 hover:bg-purple-600/20"
              >
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {profile && (
        <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-400/50">
          <CardHeader>
            <CardTitle className="text-indigo-200">Your Celestial Third Eye Blueprint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2 bg-indigo-800/20 p-4 rounded-lg">
                <div className="text-lg font-semibold text-white flex items-center justify-center gap-2">
                  <Sun className="w-5 h-5" />
                  {zodiacSigns[profile.sun as keyof typeof zodiacSigns]?.icon} Sun
                </div>
                <Badge className="bg-red-600/20 text-red-200">
                  {getElementIcon(profile.elements.primary)}
                  <span className="ml-1 capitalize">{profile.elements.primary}</span>
                </Badge>
              </div>
              <div className="space-y-2 bg-indigo-800/20 p-4 rounded-lg">
                <div className="text-lg font-semibold text-white flex items-center justify-center gap-2">
                  <Moon className="w-5 h-5" />
                  {zodiacSigns[profile.moon as keyof typeof zodiacSigns]?.icon} Moon
                </div>
                <Badge className="bg-blue-600/20 text-blue-200">
                  {getElementIcon(profile.elements.secondary)}
                  <span className="ml-1 capitalize">{profile.elements.secondary}</span>
                </Badge>
              </div>
              <div className="space-y-2 bg-indigo-800/20 p-4 rounded-lg">
                <div className="text-lg font-semibold text-white flex items-center justify-center gap-2">
                  <Eye className="w-5 h-5" />
                  {zodiacSigns[profile.rising as keyof typeof zodiacSigns]?.icon} Rising
                </div>
                <Badge className="bg-purple-600/20 text-purple-200">
                  {getElementIcon(profile.elements.rising)}
                  <span className="ml-1 capitalize">{profile.elements.rising}</span>
                </Badge>
              </div>
            </div>

            {profile.recommendations && (
              <div className="space-y-4 mt-6">
                <h4 className="font-semibold text-indigo-200">Personalized Third Eye Recommendations</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-indigo-800/20 p-4 rounded-lg">
                    <h5 className="text-indigo-300 font-medium mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Recommended Crystals
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {profile.recommendations.crystals?.map((crystal: string) => (
                        <Badge key={crystal} className="bg-indigo-600/20 text-indigo-200">
                          {crystal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-indigo-800/20 p-4 rounded-lg">
                    <h5 className="text-indigo-300 font-medium mb-2">Optimal Timing</h5>
                    <p className="text-indigo-100 text-sm">{profile.recommendations.timing}</p>
                  </div>
                </div>

                <div className="bg-indigo-800/20 p-4 rounded-lg">
                  <h5 className="text-indigo-300 font-medium mb-2">Breathwork Focus</h5>
                  <p className="text-indigo-100 text-sm">{profile.recommendations.breathwork}</p>
                </div>

                <div className="bg-indigo-800/20 p-4 rounded-lg">
                  <h5 className="text-indigo-300 font-medium mb-2">Meditation Style</h5>
                  <p className="text-indigo-100 text-sm">{profile.recommendations.meditation}</p>
                </div>

                {profile.recommendations.emotionalFocus && (
                  <div className="bg-purple-800/20 p-4 rounded-lg">
                    <h5 className="text-purple-300 font-medium mb-2">Emotional Integration</h5>
                    <p className="text-purple-100 text-sm">{profile.recommendations.emotionalFocus}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
