import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Heart, Eye, Star, Shield } from 'lucide-react';

interface SpiritualAvatar {
  id: string;
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
  archetype: string;
  activeChakras: string[];
  wings: boolean;
  aura: string;
  completedRituals: number;
  meditationStreak: number;
  angelicConnections: number;
}

const SpiritualAvatarSystem: React.FC = () => {
  const [avatar, setAvatar] = useState<SpiritualAvatar>({
    id: '1',
    name: 'Awakening Soul',
    level: 3,
    experience: 750,
    maxExperience: 1000,
    archetype: 'The Seeker',
    activeChakras: ['root', 'heart', 'throat'],
    wings: false,
    aura: 'silver',
    completedRituals: 12,
    meditationStreak: 7,
    angelicConnections: 2
  });

  const getAvatarDisplay = () => {
    const { level, archetype, wings, aura, activeChakras } = avatar;
    
    let avatarEmoji = '🧘‍♂️';
    let glowEffect = '';
    
    if (level >= 10) avatarEmoji = '👑';
    else if (level >= 7) avatarEmoji = '🌟';
    else if (level >= 5) avatarEmoji = '✨';
    
    if (wings) avatarEmoji = '👼';
    if (activeChakras.length >= 6) glowEffect = 'animate-pulse';
    
    return { avatarEmoji, glowEffect };
  };

  const getEvolutionMilestones = () => {
    return [
      { level: 5, reward: 'Third Eye Activation', icon: <Eye className="w-4 h-4" /> },
      { level: 7, reward: 'Angel Wings Unlock', icon: <Star className="w-4 h-4" /> },
      { level: 10, reward: 'Crown Chakra Mastery', icon: <Crown className="w-4 h-4" /> },
      { level: 15, reward: 'Divine Protection Shield', icon: <Shield className="w-4 h-4" /> },
      { level: 20, reward: 'Cosmic Consciousness', icon: <Star className="w-4 h-4" /> }
    ];
  };

  const addExperience = (amount: number, activity: string) => {
    setAvatar(prev => {
      const newExp = prev.experience + amount;
      const newLevel = newExp >= prev.maxExperience ? prev.level + 1 : prev.level;
      const remainingExp = newExp >= prev.maxExperience ? newExp - prev.maxExperience : newExp;
      const newMaxExp = newLevel > prev.level ? prev.maxExperience + 500 : prev.maxExperience;
      
      return {
        ...prev,
        experience: remainingExp,
        maxExperience: newMaxExp,
        level: newLevel
      };
    });
  };

  const { avatarEmoji, glowEffect } = getAvatarDisplay();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Avatar Display */}
      <Card className="border-2 border-purple-300/50 shadow-2xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
          <CardTitle className="text-center text-2xl">
            🌟 Your Spiritual Avatar
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Avatar Visual */}
            <div className={`text-8xl ${glowEffect}`}>
              {avatarEmoji}
            </div>
            
            {/* Avatar Info */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-purple-200">{avatar.name}</h3>
              <p className="text-purple-300">Level {avatar.level} • {avatar.archetype}</p>
              
              {/* Experience Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-purple-400">
                  <span>Experience</span>
                  <span>{avatar.experience}/{avatar.maxExperience}</span>
                </div>
                <Progress value={(avatar.experience / avatar.maxExperience) * 100} className="h-3" />
              </div>
            </div>

            {/* Active Abilities */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-purple-200 font-semibold">Rituals</span>
                </div>
                <p className="text-2xl font-bold text-yellow-400">{avatar.completedRituals}</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-pink-400" />
                  <span className="text-purple-200 font-semibold">Meditation</span>
                </div>
                <p className="text-2xl font-bold text-pink-400">{avatar.meditationStreak} days</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-blue-400" />
                  <span className="text-purple-200 font-semibold">Angels</span>
                </div>
                <p className="text-2xl font-bold text-blue-400">{avatar.angelicConnections}</p>
              </div>
            </div>

            {/* Active Chakras */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-purple-200">⚡ Active Chakras</h4>
              <div className="flex justify-center gap-2 flex-wrap">
                {avatar.activeChakras.map((chakra) => (
                  <Badge key={chakra} variant="secondary" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    {chakra.charAt(0).toUpperCase() + chakra.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evolution Milestones */}
      <Card className="border-2 border-amber-300/50 shadow-2xl bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
          <CardTitle className="text-xl">🏆 Evolution Milestones</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            {getEvolutionMilestones().map((milestone, index) => (
              <div 
                key={index}
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  avatar.level >= milestone.level 
                    ? 'bg-green-600/20 border border-green-400/30' 
                    : 'bg-white/10 border border-white/20'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  avatar.level >= milestone.level 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {milestone.icon}
                </div>
                
                <div className="flex-1">
                  <p className="font-semibold text-purple-200">Level {milestone.level}</p>
                  <p className="text-purple-300 text-sm">{milestone.reward}</p>
                </div>
                
                {avatar.level >= milestone.level && (
                  <Badge className="bg-green-600 text-white">Unlocked</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Actions */}
      <Card className="border-2 border-indigo-300/50 shadow-2xl bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
          <CardTitle className="text-xl">⚡ Gain Experience</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button 
              onClick={() => addExperience(50, 'meditation')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
            >
              Complete Meditation (+50 XP)
            </Button>
            
            <Button 
              onClick={() => addExperience(100, 'tarot')}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:opacity-90"
            >
              Tarot Reading (+100 XP)
            </Button>
            
            <Button 
              onClick={() => addExperience(75, 'ritual')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90"
            >
              Protection Ritual (+75 XP)
            </Button>
            
            <Button 
              onClick={() => addExperience(150, 'angel')}
              className="bg-gradient-to-r from-pink-600 to-rose-600 hover:opacity-90"
            >
              Angel Connection (+150 XP)
            </Button>
            
            <Button 
              onClick={() => addExperience(200, 'breakthrough')}
              className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:opacity-90"
            >
              Spiritual Breakthrough (+200 XP)
            </Button>
            
            <Button 
              onClick={() => addExperience(125, 'dream')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90"
            >
              Dream Analysis (+125 XP)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpiritualAvatarSystem;