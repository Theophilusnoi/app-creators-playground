import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Crown, Eye, Heart, Star, Shield, Flame, Moon, Sun } from 'lucide-react';

interface SoulArchetype {
  id: string;
  name: string;
  title: string;
  description: string;
  strengths: string[];
  challenges: string[];
  palmIndicators: string[];
  tarotCards: string[];
  chakraAlignment: string;
  spiritualGifts: string[];
  lifeLesson: string;
  avatar: string;
  color: string;
  element: string;
  rulingPlanet: string;
}

interface UserSoulProfile {
  archetype: SoulArchetype;
  dominanceLevel: number;
  secondaryArchetype?: SoulArchetype;
  evolutionStage: 'Awakening' | 'Developing' | 'Mastering' | 'Embodying';
  birthData?: {
    date: string;
    time: string;
    location: string;
  };
}

export const SoulArchetypeSystem = () => {
  const [currentProfile, setCurrentProfile] = useState<UserSoulProfile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [birthData, setBirthData] = useState({
    date: '',
    time: '',
    location: ''
  });
  const [step, setStep] = useState<'input' | 'analyzing' | 'results'>('input');

  const soulArchetypes: SoulArchetype[] = [
    {
      id: 'seer',
      name: 'The Seer',
      title: 'Divine Oracle of Truth',
      description: 'You are a natural-born prophet with powerful third eye abilities and deep psychic insight.',
      strengths: ['Prophetic visions', 'Intuitive knowing', 'Dream interpretation', 'Energy reading'],
      challenges: ['Psychic overwhelm', 'Difficulty grounding', 'Isolation from others'],
      palmIndicators: ['Strong intuition line', 'Deep head line', 'Mystic cross'],
      tarotCards: ['The High Priestess', 'The Moon', 'Nine of Cups'],
      chakraAlignment: 'Third Eye & Crown',
      spiritualGifts: ['Clairvoyance', 'Precognition', 'Spiritual counseling'],
      lifeLesson: 'Learning to trust and share your visions with the world',
      avatar: '🔮',
      color: 'Indigo',
      element: 'Ether',
      rulingPlanet: 'Neptune'
    },
    {
      id: 'healer',
      name: 'The Healer',
      title: 'Sacred Channel of Divine Love',
      description: 'You are here to heal hearts, souls, and bodies through divine love and compassion.',
      strengths: ['Empathic healing', 'Energy transmission', 'Emotional alchemy', 'Heart wisdom'],
      challenges: ['Taking on others\' pain', 'Self-sacrifice', 'Boundary issues'],
      palmIndicators: ['Strong heart line', 'Healer marks', 'Venus mount prominence'],
      tarotCards: ['The Star', 'Six of Cups', 'Queen of Cups'],
      chakraAlignment: 'Heart & Solar Plexus',
      spiritualGifts: ['Energy healing', 'Emotional clearing', 'Divine love transmission'],
      lifeLesson: 'Healing yourself first to serve others from wholeness',
      avatar: '💖',
      color: 'Emerald',
      element: 'Water',
      rulingPlanet: 'Venus'
    },
    {
      id: 'sovereign',
      name: 'The Sovereign',
      title: 'Divine Leader of Sacred Purpose',
      description: 'You are called to lead spiritual communities and anchor divine will on Earth.',
      strengths: ['Natural leadership', 'Manifestation power', 'Divine authority', 'Vision casting'],
      challenges: ['Spiritual pride', 'Isolation', 'Heavy responsibility'],
      palmIndicators: ['Clear fate line', 'Jupiter mount', 'Leadership marks'],
      tarotCards: ['The Emperor', 'The Chariot', 'King of Wands'],
      chakraAlignment: 'Crown & Solar Plexus',
      spiritualGifts: ['Divine authority', 'Manifestation', 'Community building'],
      lifeLesson: 'Leading with humility and service to the divine plan',
      avatar: '👑',
      color: 'Gold',
      element: 'Fire',
      rulingPlanet: 'Sun'
    },
    {
      id: 'warrior',
      name: 'The Spiritual Warrior',
      title: 'Divine Protector of Light',
      description: 'You are here to protect sacred spaces and fight for spiritual truth and justice.',
      strengths: ['Spiritual protection', 'Clearing negative energy', 'Courage', 'Divine justice'],
      challenges: ['Spiritual battles', 'Aggression', 'Burnout from fighting'],
      palmIndicators: ['Strong Mars mount', 'Protection lines', 'Warrior marks'],
      tarotCards: ['Strength', 'Seven of Wands', 'Knight of Swords'],
      chakraAlignment: 'Solar Plexus & Root',
      spiritualGifts: ['Energy clearing', 'Psychic protection', 'Spiritual warfare'],
      lifeLesson: 'Learning when to fight and when to surrender to divine will',
      avatar: '⚔️',
      color: 'Crimson',
      element: 'Fire',
      rulingPlanet: 'Mars'
    },
    {
      id: 'mystic',
      name: 'The Mystic',
      title: 'Sacred Keeper of Ancient Wisdom',
      description: 'You are the guardian of sacred mysteries and ancient spiritual knowledge.',
      strengths: ['Ancient wisdom', 'Ritual mastery', 'Sacred symbols', 'Mystery teachings'],
      challenges: ['Living in the past', 'Difficulty adapting', 'Secretiveness'],
      palmIndicators: ['Mystic cross', 'Ring of Solomon', 'Deep wisdom lines'],
      tarotCards: ['The Hermit', 'The Hierophant', 'Two of Pentacles'],
      chakraAlignment: 'Third Eye & Throat',
      spiritualGifts: ['Sacred knowledge', 'Ritual creation', 'Symbol interpretation'],
      lifeLesson: 'Bringing ancient wisdom into modern spiritual practice',
      avatar: '🕯️',
      color: 'Deep Purple',
      element: 'Earth',
      rulingPlanet: 'Saturn'
    },
    {
      id: 'bridge_builder',
      name: 'The Bridge Builder',
      title: 'Divine Connector of Worlds',
      description: 'You connect different spiritual realms, traditions, and communities.',
      strengths: ['Communication', 'Translation', 'Unity building', 'Diplomacy'],
      challenges: ['Lack of belonging', 'Identity confusion', 'Overwhelm'],
      palmIndicators: ['Strong Mercury mount', 'Communication lines', 'Bridge markings'],
      tarotCards: ['Temperance', 'Two of Cups', 'Queen of Swords'],
      chakraAlignment: 'Throat & Heart',
      spiritualGifts: ['Spiritual translation', 'Community building', 'Harmony creation'],
      lifeLesson: 'Finding your own spiritual home while serving as a bridge for others',
      avatar: '🌉',
      color: 'Rainbow',
      element: 'Air',
      rulingPlanet: 'Mercury'
    }
  ];

  const analyzeSoulArchetype = async () => {
    setIsAnalyzing(true);
    setStep('analyzing');

    // Simulate soul analysis process
    await new Promise(resolve => setTimeout(resolve, 3000));

    // For demo purposes, randomly select archetype with some logic
    const selectedArchetype = soulArchetypes[Math.floor(Math.random() * soulArchetypes.length)];
    const dominanceLevel = Math.floor(Math.random() * 30) + 70; // 70-100%
    
    const profile: UserSoulProfile = {
      archetype: selectedArchetype,
      dominanceLevel,
      evolutionStage: dominanceLevel > 90 ? 'Embodying' : 
                     dominanceLevel > 80 ? 'Mastering' :
                     dominanceLevel > 70 ? 'Developing' : 'Awakening',
      birthData: birthData.date ? birthData : undefined
    };

    setCurrentProfile(profile);
    setIsAnalyzing(false);
    setStep('results');
  };

  const reset = () => {
    setStep('input');
    setCurrentProfile(null);
    setBirthData({ date: '', time: '', location: '' });
  };

  if (step === 'input') {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-center justify-center">
              <Crown className="w-6 h-6 text-gold-400" />
              🕉️ Soul Archetype Analysis
              <Crown className="w-6 h-6 text-gold-400" />
            </CardTitle>
            <p className="text-purple-200 text-center">
              Discover your divine soul archetype through cosmic alignment and spiritual analysis
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-to-r from-gold-900/20 to-purple-900/20 rounded-lg p-4">
              <h4 className="text-gold-200 font-medium mb-3">✨ Birth Information (Optional but Recommended)</h4>
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <label className="text-white text-sm font-medium mb-1 block">Birth Date</label>
                  <Input
                    type="date"
                    value={birthData.date}
                    onChange={(e) => setBirthData(prev => ({ ...prev, date: e.target.value }))}
                    className="bg-black/30 border-purple-400/60 text-white"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-1 block">Birth Time</label>
                  <Input
                    type="time"
                    value={birthData.time}
                    onChange={(e) => setBirthData(prev => ({ ...prev, time: e.target.value }))}
                    className="bg-black/30 border-purple-400/60 text-white"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-1 block">Birth Location</label>
                  <Input
                    type="text"
                    placeholder="City, Country"
                    value={birthData.location}
                    onChange={(e) => setBirthData(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-black/30 border-purple-400/60 text-white"
                  />
                </div>
              </div>
              <p className="text-purple-300 text-xs mt-2 italic">
                Birth data helps align your archetype with cosmic energies for deeper accuracy
              </p>
            </div>

            <div className="text-center">
              <Button
                onClick={analyzeSoulArchetype}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3"
                size="lg"
              >
                <Star className="w-5 h-5 mr-2" />
                Discover My Soul Archetype
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {soulArchetypes.map((archetype) => (
            <Card key={archetype.id} className="bg-black/30 border-purple-500/30 hover:border-purple-400 transition-all">
              <CardContent className="p-4">
                <div className="text-center mb-3">
                  <span className="text-3xl mb-2 block">{archetype.avatar}</span>
                  <h3 className="text-white font-semibold">{archetype.name}</h3>
                  <p className="text-purple-300 text-sm">{archetype.title}</p>
                </div>
                <p className="text-purple-200 text-xs">{archetype.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  <Badge variant="outline" className={`text-xs border-${archetype.color.toLowerCase()}-400 text-${archetype.color.toLowerCase()}-300`}>
                    {archetype.element}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-gray-400 text-gray-300">
                    {archetype.rulingPlanet}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'analyzing') {
    return (
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/50">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-xl">
            🌟 Analyzing Your Soul Essence 🌟
          </CardTitle>
          <p className="text-purple-200">Connecting with cosmic energies and divine records...</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="animate-spin w-16 h-16 border-4 border-purple-400 border-t-gold-400 rounded-full mx-auto mb-4"></div>
            <p className="text-white">Reading your akashic records and soul blueprint...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'results' && currentProfile) {
    const { archetype, dominanceLevel, evolutionStage } = currentProfile;
    
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/50">
          <CardHeader className="text-center">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-white text-2xl flex items-center justify-center gap-3">
                  <span className="text-4xl">{archetype.avatar}</span>
                  {archetype.name}
                  <span className="text-4xl">{archetype.avatar}</span>
                </CardTitle>
                <p className="text-gold-200 text-lg font-semibold mt-2">{archetype.title}</p>
                <Badge className={`mt-2 bg-${archetype.color.toLowerCase()}-600/30 text-${archetype.color.toLowerCase()}-200`}>
                  {dominanceLevel}% Soul Alignment
                </Badge>
                <Badge className="mt-2 ml-2 bg-purple-600/30 text-purple-200">
                  {evolutionStage} Stage
                </Badge>
              </div>
              <Button onClick={reset} variant="outline" size="sm" className="border-purple-400 text-purple-200">
                New Analysis
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-400" />
                Soul Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-100 leading-relaxed">{archetype.description}</p>
              <div className="mt-4">
                <h4 className="text-purple-200 font-medium mb-2">🌟 Spiritual Gifts:</h4>
                <div className="flex flex-wrap gap-1">
                  {archetype.spiritualGifts.map((gift, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-purple-600/20 text-purple-200">
                      {gift}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-green-400" />
                Cosmic Alignment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-green-200 font-medium">Element:</span>
                <span className="text-green-100 ml-2">{archetype.element}</span>
              </div>
              <div>
                <span className="text-green-200 font-medium">Ruling Planet:</span>
                <span className="text-green-100 ml-2">{archetype.rulingPlanet}</span>
              </div>
              <div>
                <span className="text-green-200 font-medium">Chakra Focus:</span>
                <span className="text-green-100 ml-2">{archetype.chakraAlignment}</span>
              </div>
              <div>
                <span className="text-green-200 font-medium">Sacred Color:</span>
                <span className="text-green-100 ml-2">{archetype.color}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-black/30 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Divine Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {archetype.strengths.map((strength, index) => (
                  <li key={index} className="text-blue-100 flex items-start gap-2">
                    <Star className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" />
                Growth Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {archetype.challenges.map((challenge, index) => (
                  <li key={index} className="text-orange-100 flex items-start gap-2">
                    <Flame className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-gold-900/20 to-purple-900/20 border-gold-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sun className="w-5 h-5 text-gold-400" />
              Your Sacred Life Lesson
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gold-100 text-lg leading-relaxed font-medium">
              {archetype.lifeLesson}
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-400" />
                Palm Reading Indicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {archetype.palmIndicators.map((indicator, index) => (
                  <li key={index} className="text-purple-100 text-sm">
                    • {indicator}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-pink-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Moon className="w-5 h-5 text-pink-400" />
                Resonant Tarot Cards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {archetype.tarotCards.map((card, index) => (
                  <li key={index} className="text-pink-100 text-sm">
                    • {card}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};