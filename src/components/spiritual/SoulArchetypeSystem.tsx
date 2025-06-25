
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Crown, Star, Heart, Shield, Eye, Zap, BookOpen, Compass, Flame, Moon } from 'lucide-react';

interface ArchetypeResult {
  archetype: string;
  percentage: number;
  description: string;
  strengths: string[];
  challenges: string[];
  growthPath: string[];
  spiritualGifts: string[];
  shadowWork: string[];
  dailyPractices: string[];
  lifeTheme: string;
  soulPurpose: string;
  relationships: string[];
  careerPath: string[];
  crystals: string[];
  colors: string[];
  elementalConnection: string;
  chakraFocus: string[];
}

const archetypes = [
  {
    id: 'healer',
    name: 'The Healer',
    icon: Heart,
    description: 'Compassionate soul focused on healing others and the world',
    color: 'text-green-400',
    element: 'Water',
    lifeTheme: 'Service through healing and nurturing',
    soulPurpose: 'To bring healing and restoration to all beings'
  },
  {
    id: 'visionary',
    name: 'The Visionary',
    icon: Eye,
    description: 'Intuitive guide who sees beyond the veil of reality',
    color: 'text-purple-400',
    element: 'Ether',
    lifeTheme: 'Bridging worlds and revealing hidden truths',
    soulPurpose: 'To illuminate the path forward for humanity'
  },
  {
    id: 'warrior',
    name: 'The Warrior',
    icon: Shield,
    description: 'Courageous protector fighting for justice and truth',
    color: 'text-red-400',
    element: 'Fire',
    lifeTheme: 'Protection and righteous action',
    soulPurpose: 'To defend truth and protect the innocent'
  },
  {
    id: 'sage',
    name: 'The Sage',
    icon: Star,
    description: 'Wise teacher sharing ancient knowledge and wisdom',
    color: 'text-blue-400',
    element: 'Air',
    lifeTheme: 'Wisdom sharing and guidance',
    soulPurpose: 'To preserve and transmit sacred knowledge'
  },
  {
    id: 'mystic',
    name: 'The Mystic',
    icon: Zap,
    description: 'Bridge between worlds, master of spiritual mysteries',
    color: 'text-yellow-400',
    element: 'Spirit',
    lifeTheme: 'Divine connection and transcendence',
    soulPurpose: 'To unite heaven and earth through spiritual practice'
  },
  {
    id: 'guardian',
    name: 'The Guardian',
    icon: Crown,
    description: 'Sacred protector maintaining cosmic balance',
    color: 'text-indigo-400',
    element: 'Earth',
    lifeTheme: 'Sacred duty and cosmic order',
    soulPurpose: 'To maintain balance and protect sacred knowledge'
  }
];

const questions = [
  {
    id: 1,
    text: "When facing a difficult situation, I tend to:",
    options: [
      { text: "Seek to understand and heal the root cause", archetype: 'healer', weight: 3 },
      { text: "Look for the deeper spiritual meaning", archetype: 'visionary', weight: 3 },
      { text: "Take action to protect those involved", archetype: 'warrior', weight: 3 },
      { text: "Research and analyze all possibilities", archetype: 'sage', weight: 3 },
      { text: "Meditate and connect with divine guidance", archetype: 'mystic', weight: 3 },
      { text: "Ensure everyone's safety and wellbeing", archetype: 'guardian', weight: 3 }
    ]
  },
  {
    id: 2,
    text: "My greatest spiritual gift is:",
    options: [
      { text: "Empathy and emotional healing", archetype: 'healer', weight: 3 },
      { text: "Intuitive sight and prophecy", archetype: 'visionary', weight: 3 },
      { text: "Courage and righteous strength", archetype: 'warrior', weight: 3 },
      { text: "Wisdom and knowledge sharing", archetype: 'sage', weight: 3 },
      { text: "Connection to higher realms", archetype: 'mystic', weight: 3 },
      { text: "Protection and guidance", archetype: 'guardian', weight: 3 }
    ]
  },
  {
    id: 3,
    text: "In my spiritual practice, I'm drawn to:",
    options: [
      { text: "Healing rituals and energy work", archetype: 'healer', weight: 2 },
      { text: "Divination and prophetic dreams", archetype: 'visionary', weight: 2 },
      { text: "Banishing and protection spells", archetype: 'warrior', weight: 2 },
      { text: "Study of ancient texts and wisdom", archetype: 'sage', weight: 2 },
      { text: "Deep meditation and transcendence", archetype: 'mystic', weight: 2 },
      { text: "Sacred geometry and cosmic order", archetype: 'guardian', weight: 2 }
    ]
  }
];

export const SoulArchetypeSystem = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<ArchetypeResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnswer = (archetype: string, weight: number) => {
    setAnswers(prev => ({
      ...prev,
      [archetype]: (prev[archetype] || 0) + weight
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      analyzeResults();
    }
  };

  const analyzeResults = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const totalPoints = Object.values(answers).reduce((sum, points) => sum + points, 0);
      
      const archetypeResults: ArchetypeResult[] = archetypes.map(archetype => {
        const points = answers[archetype.id] || 0;
        const percentage = Math.round((points / totalPoints) * 100) || 0;
        
        return {
          archetype: archetype.name,
          percentage,
          description: archetype.description,
          strengths: generateStrengths(archetype.id),
          challenges: generateChallenges(archetype.id),
          growthPath: generateGrowthPath(archetype.id),
          spiritualGifts: generateSpiritualGifts(archetype.id),
          shadowWork: generateShadowWork(archetype.id),
          dailyPractices: generateDailyPractices(archetype.id),
          lifeTheme: archetype.lifeTheme,
          soulPurpose: archetype.soulPurpose,
          relationships: generateRelationships(archetype.id),
          careerPath: generateCareerPath(archetype.id),
          crystals: generateCrystals(archetype.id),
          colors: generateColors(archetype.id),
          elementalConnection: archetype.element,
          chakraFocus: generateChakraFocus(archetype.id)
        };
      }).sort((a, b) => b.percentage - a.percentage);

      setResults(archetypeResults);
      setShowResults(true);
      setIsAnalyzing(false);

      toast({
        title: "Soul Archetype Analysis Complete! ✨",
        description: `Your primary archetype is ${archetypeResults[0].archetype}`,
      });
    }, 2000);
  };

  const generateStrengths = (archetypeId: string): string[] => {
    const strengthsMap: Record<string, string[]> = {
      healer: ["Deep empathy and compassion", "Natural healing abilities", "Emotional intelligence", "Nurturing presence", "Ability to comfort others", "Energy sensitivity"],
      visionary: ["Prophetic insight", "Intuitive wisdom", "Creative vision", "Spiritual sight", "Future awareness", "Symbolic thinking"],
      warrior: ["Courage and bravery", "Protective instincts", "Strong willpower", "Justice-oriented", "Leadership qualities", "Determination"],
      sage: ["Ancient wisdom", "Teaching ability", "Analytical mind", "Knowledge seeker", "Patient guidance", "Deep understanding"],
      mystic: ["Divine connection", "Transcendent awareness", "Magical abilities", "Spiritual mastery", "Psychic sensitivity", "Universal consciousness"],
      guardian: ["Protective nature", "Cosmic awareness", "Sacred duty", "Balance keeper", "Organizational skills", "Reliable presence"]
    };
    return strengthsMap[archetypeId] || [];
  };

  const generateChallenges = (archetypeId: string): string[] => {
    const challengesMap: Record<string, string[]> = {
      healer: ["Absorbing others' pain", "Neglecting self-care", "Emotional overwhelm", "Boundary issues", "Burnout tendency", "Over-giving"],
      visionary: ["Difficulty grounding visions", "Misunderstood by others", "Information overload", "Scattered focus", "Impractical ideas", "Isolation"],
      warrior: ["Righteous anger", "Burnout from fighting", "Difficulty with surrender", "Aggressive tendencies", "Impatience", "Conflict addiction"],
      sage: ["Analysis paralysis", "Isolation from others", "Perfectionism", "Information hoarding", "Intellectual pride", "Overthinking"],
      mystic: ["Disconnection from physical world", "Spiritual bypassing", "Integration challenges", "Reality confusion", "Addiction to transcendence", "Escapism"],
      guardian: ["Burden of responsibility", "Rigid thinking", "Difficulty with change", "Control issues", "Worry and anxiety", "Overprotectiveness"]
    };
    return challengesMap[archetypeId] || [];
  };

  const generateGrowthPath = (archetypeId: string): string[] => {
    const growthMap: Record<string, string[]> = {
      healer: ["Practice self-healing first", "Set energetic boundaries", "Develop discernment", "Learn to receive", "Honor your own needs", "Balance giving and receiving"],
      visionary: ["Ground visions in action", "Develop communication skills", "Practice patience", "Focus on one vision at a time", "Build practical skills", "Connect with like-minded souls"],
      warrior: ["Learn strategic thinking", "Cultivate inner peace", "Practice forgiveness", "Channel anger constructively", "Develop diplomacy", "Embrace vulnerability"],
      sage: ["Share knowledge freely", "Embrace uncertainty", "Connect with community", "Practice humility", "Apply wisdom practically", "Learn from others"],
      mystic: ["Integrate spiritual insights", "Maintain physical health", "Serve others", "Ground your practice", "Balance transcendence with presence", "Share your gifts"],
      guardian: ["Embrace flexibility", "Trust the process", "Delegate responsibility", "Practice self-compassion", "Accept imperfection", "Allow others to grow"]
    };
    return growthMap[archetypeId] || [];
  };

  const generateSpiritualGifts = (archetypeId: string): string[] => {
    const giftsMap: Record<string, string[]> = {
      healer: ["Energy healing", "Emotional alchemy", "Plant medicine", "Therapeutic touch", "Chakra balancing", "Aura cleansing"],
      visionary: ["Clairvoyance", "Prophetic dreams", "Symbolic interpretation", "Future sight", "Psychic abilities", "Divine downloads"],
      warrior: ["Psychic protection", "Entity removal", "Banishing rituals", "Spiritual warfare", "Courage transmission", "Righteous anger"],
      sage: ["Ancient wisdom", "Sacred texts", "Teaching gifts", "Akashic records", "Historical knowledge", "Universal principles"],
      mystic: ["Astral projection", "Meditation mastery", "Divine union", "Cosmic consciousness", "Kundalini activation", "Samadhi states"],
      guardian: ["Sacred geometry", "Cosmic order", "Protection rituals", "Guardian angels", "Collective healing", "Earth healing"]
    };
    return giftsMap[archetypeId] || [];
  };

  const generateShadowWork = (archetypeId: string): string[] => {
    const shadowMap: Record<string, string[]> = {
      healer: ["Wounded healer complex", "Savior complex", "Martyrdom patterns", "Emotional vampirism", "Codependency", "Self-neglect"],
      visionary: ["Grandiosity", "Spiritual superiority", "Delusions of grandeur", "Impracticality", "Escapism", "Disconnection"],
      warrior: ["Shadow warrior", "Destructive anger", "Violent tendencies", "Domination", "Righteousness", "Aggression"],
      sage: ["Know-it-all attitude", "Intellectual arrogance", "Isolation", "Perfectionism", "Judgment", "Condescension"],
      mystic: ["Spiritual bypassing", "Addiction to bliss", "Reality avoidance", "Superiority complex", "Withdrawal", "Dissociation"],
      guardian: ["Control freak", "Rigidity", "Overprotection", "Paranoia", "Burden complex", "Inflexibility"]
    };
    return shadowMap[archetypeId] || [];
  };

  const generateDailyPractices = (archetypeId: string): string[] => {
    const practicesMap: Record<string, string[]> = {
      healer: ["Morning self-healing ritual", "Boundary setting meditation", "Nature connection", "Crystal healing", "Emotional release work", "Gratitude practice"],
      visionary: ["Dream journaling", "Meditation on third eye", "Vision boarding", "Intuitive drawing", "Oracle card readings", "Future self meditation"],
      warrior: ["Protection visualization", "Martial arts or exercise", "Courage affirmations", "Justice meditation", "Anger transformation", "Strength training"],
      sage: ["Sacred text study", "Teaching or mentoring", "Wisdom journaling", "Research and learning", "Knowledge sharing", "Ancient practices"],
      mystic: ["Deep meditation", "Breathwork", "Kundalini yoga", "Cosmic consciousness", "Divine union practice", "Transcendent meditation"],
      guardian: ["Earth connection ritual", "Protection prayers", "Community service", "Order and organization", "Sacred geometry", "Guardian meditation"]
    };
    return practicesMap[archetypeId] || [];
  };

  const generateRelationships = (archetypeId: string): string[] => {
    const relationshipsMap: Record<string, string[]> = {
      healer: ["Attracts wounded souls", "Natural caregiver in relationships", "Needs healing-focused partners", "Drawn to therapeutic connections"],
      visionary: ["Seeks spiritually aware partners", "Needs understanding of visions", "Attracts fellow seekers", "Requires mental stimulation"],
      warrior: ["Protective of loved ones", "Needs respect and loyalty", "Attracts those needing protection", "Values courage in others"],
      sage: ["Teaching role in relationships", "Needs intellectual equals", "Attracts students and seekers", "Values wisdom and growth"],
      mystic: ["Seeks soul connections", "Needs spiritual depth", "Attracts other mystics", "Values transcendent love"],
      guardian: ["Protective and loyal", "Needs stable partners", "Attracts those needing security", "Values commitment and duty"]
    };
    return relationshipsMap[archetypeId] || [];
  };

  const generateCareerPath = (archetypeId: string): string[] => {
    const careerMap: Record<string, string[]> = {
      healer: ["Healthcare professional", "Therapist or counselor", "Energy healer", "Massage therapist", "Nurse", "Alternative medicine"],
      visionary: ["Artist or creative", "Spiritual teacher", "Prophet or oracle", "Designer", "Futurist", "Innovator"],
      warrior: ["Military or law enforcement", "Activist", "Lawyer", "Security", "Personal trainer", "Protector roles"],
      sage: ["Teacher or professor", "Researcher", "Writer", "Librarian", "Consultant", "Advisor"],
      mystic: ["Spiritual guide", "Meditation teacher", "Shaman", "Psychic", "Monk or nun", "Retreat leader"],
      guardian: ["Manager or organizer", "Conservationist", "Museum curator", "Archivist", "Community leader", "Protector of traditions"]
    };
    return careerMap[archetypeId] || [];
  };

  const generateCrystals = (archetypeId: string): string[] => {
    const crystalsMap: Record<string, string[]> = {
      healer: ["Rose Quartz", "Green Aventurine", "Prehnite", "Malachite", "Amazonite", "Chrysocolla"],
      visionary: ["Amethyst", "Labradorite", "Moonstone", "Fluorite", "Lapis Lazuli", "Sodalite"],
      warrior: ["Red Jasper", "Carnelian", "Hematite", "Garnet", "Bloodstone", "Tiger's Eye"],
      sage: ["Clear Quartz", "Selenite", "Apophyllite", "Azurite", "Sapphire", "Celestite"],
      mystic: ["Moldavite", "Phenacite", "Danburite", "Scolecite", "Petalite", "Herderite"],
      guardian: ["Black Tourmaline", "Smoky Quartz", "Obsidian", "Shungite", "Pyrite", "Jet"]
    };
    return crystalsMap[archetypeId] || [];
  };

  const generateColors = (archetypeId: string): string[] => {
    const colorsMap: Record<string, string[]> = {
      healer: ["Green", "Pink", "Soft Blue", "Lavender", "Mint", "Pearl White"],
      visionary: ["Purple", "Indigo", "Silver", "Iridescent", "Deep Blue", "Cosmic Purple"],
      warrior: ["Red", "Orange", "Gold", "Crimson", "Rust", "Bronze"],
      sage: ["Blue", "White", "Light Blue", "Sapphire", "Crystal Clear", "Sky Blue"],
      mystic: ["Violet", "Gold", "White Light", "Rainbow", "Opalescent", "Divine Light"],
      guardian: ["Black", "Brown", "Dark Green", "Charcoal", "Deep Purple", "Earth Tones"]
    };
    return colorsMap[archetypeId] || [];
  };

  const generateChakraFocus = (archetypeId: string): string[] => {
    const chakraMap: Record<string, string[]> = {
      healer: ["Heart Chakra", "Sacral Chakra", "Solar Plexus"],
      visionary: ["Third Eye Chakra", "Crown Chakra", "Throat Chakra"],
      warrior: ["Root Chakra", "Solar Plexus", "Sacral Chakra"],
      sage: ["Throat Chakra", "Third Eye", "Crown Chakra"],
      mystic: ["Crown Chakra", "Third Eye", "Heart Chakra"],
      guardian: ["Root Chakra", "Heart Chakra", "Solar Plexus"]
    };
    return chakraMap[archetypeId] || [];
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResults([]);
    setShowResults(false);
  };

  if (!user) {
    return (
      <Card className="bg-black/30 border-purple-500/30">
        <CardContent className="text-center py-12">
          <Crown className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Soul Archetype Analysis</h3>
          <p className="text-purple-200">Please log in to discover your spiritual archetype</p>
        </CardContent>
      </Card>
    );
  }

  if (isAnalyzing) {
    return (
      <Card className="bg-black/30 border-purple-500/30">
        <CardContent className="text-center py-12">
          <div className="animate-spin w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-white mb-2">Analyzing Your Soul Signature...</h3>
          <p className="text-purple-200">The cosmic energies are aligning your results</p>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const primaryArchetype = results[0];
    const secondaryArchetype = results[1];
    const primaryArchetypeData = archetypes.find(a => a.name === primaryArchetype.archetype);
    const PrimaryIcon = primaryArchetypeData?.icon || Crown;

    return (
      <div className="space-y-6">
        {/* Primary Archetype Overview */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white text-2xl">
              <PrimaryIcon className={`w-8 h-8 ${primaryArchetypeData?.color || 'text-purple-400'}`} />
              Your Soul Archetype: {primaryArchetype.archetype}
            </CardTitle>
            <p className="text-purple-200 text-lg">{primaryArchetype.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <Compass className="w-5 h-5" />
                    Life Theme & Soul Purpose
                  </h4>
                  <p className="text-purple-200 mb-2"><strong>Life Theme:</strong> {primaryArchetype.lifeTheme}</p>
                  <p className="text-purple-200"><strong>Soul Purpose:</strong> {primaryArchetype.soulPurpose}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Elemental Connection
                  </h4>
                  <Badge className="bg-purple-600 text-white text-lg px-3 py-1">
                    {primaryArchetype.elementalConnection}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-pink-400 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Chakra Focus
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {primaryArchetype.chakraFocus.map((chakra, index) => (
                      <Badge key={index} variant="outline" className="border-pink-400 text-pink-200">
                        {chakra}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-3">Sacred Colors</h4>
                  <div className="flex flex-wrap gap-2">
                    {primaryArchetype.colors.map((color, index) => (
                      <Badge key={index} className="bg-green-600/20 text-green-200 border-green-400">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Spiritual Gifts */}
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Your Spiritual Gifts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {primaryArchetype.spiritualGifts.map((gift, index) => (
                  <li key={index} className="text-purple-200 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    {gift}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Shadow Work */}
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Moon className="w-5 h-5 text-gray-400" />
                Shadow Work Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {primaryArchetype.shadowWork.map((shadow, index) => (
                  <li key={index} className="text-purple-200 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    {shadow}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Daily Practices */}
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Daily Spiritual Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {primaryArchetype.dailyPractices.map((practice, index) => (
                  <li key={index} className="text-purple-200 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-blue-400" />
                    {practice}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Sacred Tools */}
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Crown className="w-5 h-5 text-indigo-400" />
                Sacred Crystals & Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h5 className="text-purple-300 font-medium mb-2">Recommended Crystals:</h5>
                  <div className="flex flex-wrap gap-2">
                    {primaryArchetype.crystals.map((crystal, index) => (
                      <Badge key={index} variant="outline" className="border-indigo-400 text-indigo-200">
                        {crystal}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Growth Path & Relationships */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-green-400" />
                Spiritual Growth Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {primaryArchetype.growthPath.map((step, index) => (
                  <li key={index} className="text-purple-200 flex items-center gap-2">
                    <Badge className="bg-green-600 text-white">{index + 1}</Badge>
                    {step}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-400" />
                Relationship Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {primaryArchetype.relationships.map((pattern, index) => (
                  <li key={index} className="text-purple-200 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-400" />
                    {pattern}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Career Path */}
        <Card className="bg-black/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-orange-400" />
              Career & Life Path Alignment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {primaryArchetype.careerPath.map((career, index) => (
                <Badge key={index} className="bg-orange-600/20 text-orange-200 border-orange-400 text-center p-2">
                  {career}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Secondary Archetype */}
        {secondaryArchetype && secondaryArchetype.percentage > 15 && (
          <Card className="bg-black/30 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-400" />
                Secondary Archetype: {secondaryArchetype.archetype} ({secondaryArchetype.percentage}%)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-200 mb-4">{secondaryArchetype.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-blue-300 font-medium mb-2">Additional Strengths:</h5>
                  <ul className="text-sm text-blue-200 space-y-1">
                    {secondaryArchetype.strengths.slice(0, 3).map((strength, index) => (
                      <li key={index}>• {strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-blue-300 font-medium mb-2">Integration Opportunities:</h5>
                  <ul className="text-sm text-blue-200 space-y-1">
                    {secondaryArchetype.growthPath.slice(0, 3).map((path, index) => (
                      <li key={index}>• {path}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Archetype Percentages */}
        <Card className="bg-black/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white">Complete Archetypal Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.map((result, index) => {
                const archetypeData = archetypes.find(a => a.name === result.archetype);
                const ArchetypeIcon = archetypeData?.icon || Star;
                
                return (
                  <div key={index} className="flex items-center gap-3">
                    <ArchetypeIcon className={`w-5 h-5 ${archetypeData?.color || 'text-purple-400'}`} />
                    <span className="text-white font-medium w-32">{result.archetype}</span>
                    <Progress value={result.percentage} className="flex-1 h-2" />
                    <span className="text-purple-300 w-12 text-right">{result.percentage}%</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={resetAssessment}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          Retake Assessment
        </Button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="bg-black/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          <Crown className="w-6 h-6 text-purple-400" />
          Soul Archetype Assessment
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-purple-300">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-6">{currentQ.text}</h3>
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option.archetype, option.weight)}
                variant="outline"
                className="p-4 h-auto text-left border-purple-500/30 hover:bg-purple-600/20 hover:border-purple-400"
              >
                <span className="text-purple-200">{option.text}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
