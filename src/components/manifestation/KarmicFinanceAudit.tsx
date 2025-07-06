import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Eye, Calculator, Star, AlertCircle, CheckCircle, 
  TrendingUp, Heart, Shield, Crown, Zap
} from 'lucide-react';

interface KarmicProfile {
  lifePathNumber: number;
  destinyNumber: number;
  birthDay: number;
  karmaDebt: number[];
  strengths: string[];
  challenges: string[];
  financialGuidance: string[];
  remedies: string[];
  luckyNumbers: number[];
  favorableDays: string[];
}

const LIFE_PATH_MEANINGS = {
  1: { traits: 'Natural leader, independent, innovative', financial: 'Entrepreneurial success, self-employment thrives' },
  2: { traits: 'Cooperative, diplomatic, supportive', financial: 'Partnership investments, collaborative ventures' },
  3: { traits: 'Creative, expressive, optimistic', financial: 'Creative industries, communication, entertainment' },
  4: { traits: 'Practical, organized, hardworking', financial: 'Real estate, traditional investments, steady growth' },
  5: { traits: 'Adventurous, versatile, freedom-loving', financial: 'Travel industry, technology, diverse portfolios' },
  6: { traits: 'Nurturing, responsible, home-focused', financial: 'Service industries, healthcare, family businesses' },
  7: { traits: 'Analytical, spiritual, introspective', financial: 'Research, spirituality, niche markets' },
  8: { traits: 'Ambitious, material success, authority', financial: 'Corporate leadership, big business, wealth building' },
  9: { traits: 'Humanitarian, generous, wise', financial: 'Non-profits, global markets, philanthropic ventures' },
  11: { traits: 'Intuitive, inspirational, spiritual teacher', financial: 'Healing arts, spiritual services, innovative solutions' },
  22: { traits: 'Master builder, visionary, practical idealist', financial: 'Large-scale projects, infrastructure, legacy building' },
  33: { traits: 'Master teacher, healer, compassionate guide', financial: 'Education, healing, transformational services' }
};

const KARMA_DEBT_MEANINGS = {
  13: 'Past life laziness - work harder and be more disciplined with money',
  14: 'Past life abuse of freedom - need structure and moderation in spending',
  16: 'Past life ego and selfishness - practice humility and generous giving',
  19: 'Past life abuse of power - avoid get-rich-quick schemes, earn honestly'
};

export const KarmicFinanceAudit: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [profile, setProfile] = useState<KarmicProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const calculateLifePath = (date: string): number => {
    const digits = date.replace(/[^0-9]/g, '').split('').map(Number);
    let sum = digits.reduce((acc, digit) => acc + digit, 0);
    
    // Keep reducing until single digit, unless it's 11, 22, or 33
    while (sum > 9 && ![11, 22, 33].includes(sum)) {
      sum = sum.toString().split('').map(Number).reduce((acc, digit) => acc + digit, 0);
    }
    
    return sum;
  };

  const calculateDestinyNumber = (name: string): number => {
    const letterValues: { [key: string]: number } = {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
      J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
      S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
    };
    
    const sum = name.toUpperCase().replace(/[^A-Z]/g, '').split('')
      .reduce((acc, letter) => acc + (letterValues[letter] || 0), 0);
    
    let result = sum;
    while (result > 9 && ![11, 22, 33].includes(result)) {
      result = result.toString().split('').map(Number).reduce((acc, digit) => acc + digit, 0);
    }
    
    return result;
  };

  const findKarmaDebt = (date: string): number[] => {
    const debt: number[] = [];
    const dateStr = date.replace(/[^0-9]/g, '');
    
    // Check for karma debt numbers in birth date
    if (dateStr.includes('13')) debt.push(13);
    if (dateStr.includes('14')) debt.push(14);
    if (dateStr.includes('16')) debt.push(16);
    if (dateStr.includes('19')) debt.push(19);
    
    return debt;
  };

  const generateProfile = () => {
    if (!birthDate || !fullName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both your birth date and full name",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setCurrentStep(0);

    // Simulate calculation process
    const steps = [
      "Calculating Life Path Number...",
      "Analyzing Destiny Number...",
      "Scanning for Karmic Debts...",
      "Generating Financial Guidance...",
      "Preparing Remedies..."
    ];

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          
          const lifePathNumber = calculateLifePath(birthDate);
          const destinyNumber = calculateDestinyNumber(fullName);
          const birthDay = parseInt(birthDate.split('-')[2]);
          const karmaDebt = findKarmaDebt(birthDate);
          
          const newProfile: KarmicProfile = {
            lifePathNumber,
            destinyNumber,
            birthDay,
            karmaDebt,
            strengths: generateStrengths(lifePathNumber, destinyNumber),
            challenges: generateChallenges(lifePathNumber, karmaDebt),
            financialGuidance: generateFinancialGuidance(lifePathNumber, destinyNumber),
            remedies: generateRemedies(karmaDebt, lifePathNumber),
            luckyNumbers: generateLuckyNumbers(lifePathNumber, destinyNumber, birthDay),
            favorableDays: generateFavorableDays(lifePathNumber)
          };
          
          setProfile(newProfile);
          setLoading(false);
          
          toast({
            title: "🔮 Karmic Analysis Complete!",
            description: "Your financial karma profile is ready"
          });
          
          return prev;
        }
      });
    }, 1000);
  };

  const generateStrengths = (lifePath: number, destiny: number): string[] => {
    const strengths = [
      `Natural ${LIFE_PATH_MEANINGS[lifePath as keyof typeof LIFE_PATH_MEANINGS]?.traits.split(',')[0].toLowerCase()}`,
      "Strong intuition for financial opportunities",
      "Ability to attract wealth through aligned action"
    ];
    
    if (lifePath === 8 || destiny === 8) {
      strengths.push("Exceptional wealth-building potential");
    }
    
    if (lifePath === 11 || destiny === 11) {
      strengths.push("Intuitive investment insights");
    }
    
    return strengths;
  };

  const generateChallenges = (lifePath: number, karmaDebt: number[]): string[] => {
    const challenges = [];
    
    if (karmaDebt.length > 0) {
      karmaDebt.forEach(debt => {
        challenges.push(KARMA_DEBT_MEANINGS[debt as keyof typeof KARMA_DEBT_MEANINGS]);
      });
    }
    
    if (lifePath === 7) {
      challenges.push("May struggle with material focus - balance spirituality with practicality");
    }
    
    if (lifePath === 9) {
      challenges.push("Tendency to give away too much - maintain healthy financial boundaries");
    }
    
    return challenges.length ? challenges : ["No major karmic financial challenges detected"];
  };

  const generateFinancialGuidance = (lifePath: number, destiny: number): string[] => {
    const guidance = [
      LIFE_PATH_MEANINGS[lifePath as keyof typeof LIFE_PATH_MEANINGS]?.financial || "Follow your natural talents for wealth"
    ];
    
    if (lifePath !== destiny) {
      guidance.push(LIFE_PATH_MEANINGS[destiny as keyof typeof LIFE_PATH_MEANINGS]?.financial || "Diversify your income sources");
    }
    
    guidance.push("Trust your intuition when making financial decisions");
    guidance.push("Align your money goals with your soul purpose");
    
    return guidance;
  };

  const generateRemedies = (karmaDebt: number[], lifePath: number): string[] => {
    const remedies = [];
    
    if (karmaDebt.includes(13)) {
      remedies.push("Practice daily discipline with money - create and stick to budgets");
    }
    
    if (karmaDebt.includes(14)) {
      remedies.push("Avoid impulsive spending - wait 24 hours before major purchases");
    }
    
    if (karmaDebt.includes(16)) {
      remedies.push("Practice regular charitable giving - even small amounts help clear karma");
    }
    
    if (karmaDebt.includes(19)) {
      remedies.push("Focus on ethical earning - avoid shortcuts or manipulative tactics");
    }
    
    // Universal remedies
    remedies.push("Meditate on abundance affirmations daily");
    remedies.push("Keep a gratitude journal focused on financial blessings");
    
    if (lifePath === 8) {
      remedies.push("Use your power to help others succeed financially");
    }
    
    return remedies.length ? remedies : ["Continue your current positive financial practices"];
  };

  const generateLuckyNumbers = (lifePath: number, destiny: number, birthDay: number): number[] => {
    return [lifePath, destiny, birthDay, lifePath + destiny].filter((num, index, arr) => arr.indexOf(num) === index);
  };

  const generateFavorableDays = (lifePath: number): string[] => {
    const dayMap: { [key: number]: string[] } = {
      1: ['Sunday', 'Monday'],
      2: ['Monday', 'Friday'], 
      3: ['Thursday', 'Friday'],
      4: ['Saturday', 'Sunday'],
      5: ['Wednesday', 'Friday'],
      6: ['Friday', 'Saturday'],
      7: ['Monday', 'Sunday'],
      8: ['Saturday', 'Sunday'],
      9: ['Tuesday', 'Thursday'],
      11: ['Monday', 'Sunday'],
      22: ['Saturday', 'Sunday'],
      33: ['Friday', 'Saturday']
    };
    
    return dayMap[lifePath] || ['Sunday'];
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-200 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Karmic Finance Audit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-purple-300 text-sm">
            Discover your financial karma based on ancient numerology and Vedic astrology principles
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-purple-200 text-sm font-medium mb-2 block">
                Birth Date
              </label>
              <Input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="bg-black/20 border-purple-500/30 text-purple-100"
              />
            </div>
            
            <div>
              <label className="text-purple-200 text-sm font-medium mb-2 block">
                Full Name (as on birth certificate)
              </label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="bg-black/20 border-purple-500/30 text-purple-100"
              />
            </div>
          </div>

          <Button
            onClick={generateProfile}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            {loading ? 'Analyzing...' : 'Generate Karmic Profile'}
          </Button>
        </CardContent>
      </Card>

      {/* Loading Progress */}
      {loading && (
        <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">🔮</div>
            <h3 className="text-xl font-bold text-blue-200 mb-2">
              Analyzing Your Financial Karma
            </h3>
            <Progress value={(currentStep + 1) * 20} className="w-full mb-2" />
            <p className="text-blue-300 text-sm">
              {currentStep < 5 ? [
                "Calculating Life Path Number...",
                "Analyzing Destiny Number...",
                "Scanning for Karmic Debts...",
                "Generating Financial Guidance...",
                "Preparing Remedies..."
              ][currentStep] : "Complete!"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Karmic Profile Results */}
      {profile && !loading && (
        <div className="space-y-6">
          {/* Core Numbers */}
          <Card className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-200 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Your Core Numerology
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center bg-black/20 p-4 rounded border border-yellow-500/20">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{profile.lifePathNumber}</div>
                <h4 className="text-yellow-200 font-medium">Life Path</h4>
                <p className="text-yellow-300 text-sm mt-1">
                  {LIFE_PATH_MEANINGS[profile.lifePathNumber as keyof typeof LIFE_PATH_MEANINGS]?.traits}
                </p>
              </div>
              
              <div className="text-center bg-black/20 p-4 rounded border border-yellow-500/20">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{profile.destinyNumber}</div>
                <h4 className="text-yellow-200 font-medium">Destiny Number</h4>
                <p className="text-yellow-300 text-sm mt-1">Your life's purpose expression</p>
              </div>
              
              <div className="text-center bg-black/20 p-4 rounded border border-yellow-500/20">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{profile.birthDay}</div>
                <h4 className="text-yellow-200 font-medium">Birth Day</h4>
                <p className="text-yellow-300 text-sm mt-1">Natural talents and abilities</p>
              </div>
            </CardContent>
          </Card>

          {/* Karmic Debts */}
          {profile.karmaDebt.length > 0 && (
            <Card className="bg-gradient-to-br from-red-900/40 to-pink-900/40 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Karmic Debts to Clear
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profile.karmaDebt.map(debt => (
                  <div key={debt} className="bg-black/20 p-4 rounded border border-red-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-red-600/20 text-red-200">Debt {debt}</Badge>
                    </div>
                    <p className="text-red-200 text-sm">
                      {KARMA_DEBT_MEANINGS[debt as keyof typeof KARMA_DEBT_MEANINGS]}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Strengths & Challenges */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-200 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Financial Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {profile.strengths.map((strength, index) => (
                    <li key={index} className="text-green-200 text-sm flex items-start gap-2">
                      <Star className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-200 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Areas for Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {profile.challenges.map((challenge, index) => (
                    <li key={index} className="text-orange-200 text-sm flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Financial Guidance */}
          <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-200 flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Personalized Financial Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {profile.financialGuidance.map((guidance, index) => (
                  <li key={index} className="text-blue-200 bg-black/20 p-3 rounded border border-blue-500/20">
                    {guidance}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Remedies */}
          <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-200 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Karmic Remedies & Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {profile.remedies.map((remedy, index) => (
                  <li key={index} className="text-purple-200 text-sm flex items-start gap-2">
                    <Heart className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    {remedy}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Lucky Numbers & Days */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-indigo-200 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Lucky Numbers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.luckyNumbers.map(num => (
                    <Badge key={num} className="bg-indigo-600/20 text-indigo-200 text-lg px-3 py-1">
                      {num}
                    </Badge>
                  ))}
                </div>
                <p className="text-indigo-300 text-sm mt-3">
                  Use these numbers for important financial dates, amounts, or decisions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-900/40 to-cyan-900/40 border-teal-500/30">
              <CardHeader>
                <CardTitle className="text-teal-200 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Favorable Days
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.favorableDays.map(day => (
                    <Badge key={day} className="bg-teal-600/20 text-teal-200">
                      {day}
                    </Badge>
                  ))}
                </div>
                <p className="text-teal-300 text-sm mt-3">
                  Best days for important financial activities and decisions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
