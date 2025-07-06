import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Eye, Calculator, Star, AlertCircle, CheckCircle, 
  TrendingUp, Heart, Shield, Crown, Zap, Calendar
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
      LIFE_PATH_MEANINGS[lifePath as keyof typeof LIFE_PATH_MEANINGS]?.financial || "Follow your natural path to prosperity"
    ];
    
    if (lifePath === 1) {
      guidance.push("Start your own business or take leadership roles");
      guidance.push("Invest in yourself and your unique ideas");
    }
    
    if (lifePath === 8) {
      guidance.push("Focus on long-term wealth building strategies");
      guidance.push("Consider real estate and business investments");
    }
    
    return guidance;
  };

  const generateRemedies = (karmaDebt: number[], lifePath: number): string[] => {
    const remedies = [];
    
    if (karmaDebt.includes(13)) {
      remedies.push("Practice daily discipline with money - create and stick to budgets");
      remedies.push("Work harder than usual to overcome past-life laziness");
    }
    
    if (karmaDebt.includes(16)) {
      remedies.push("Practice generosity and humility with wealth");
      remedies.push("Help others financially when possible");
    }
    
    if (lifePath === 7) {
      remedies.push("Meditate daily to balance spiritual and material pursuits");
    }
    
    if (remedies.length === 0) {
      remedies.push("Continue your current path - no major karmic corrections needed");
    }
    
    return remedies;
  };

  const generateLuckyNumbers = (lifePath: number, destiny: number, birthDay: number): number[] => {
    return [lifePath, destiny, birthDay, lifePath + destiny].filter((num, index, arr) => arr.indexOf(num) === index);
  };

  const generateFavorableDays = (lifePath: number): string[] => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const favorableDays = [];
    
    // Simple mapping based on life path
    if ([1, 10, 19, 28].includes(lifePath)) favorableDays.push('Sunday');
    if ([2, 11, 20, 29].includes(lifePath)) favorableDays.push('Monday');
    if ([3, 12, 21, 30].includes(lifePath)) favorableDays.push('Thursday');
    if ([4, 13, 22, 31].includes(lifePath)) favorableDays.push('Sunday');
    if ([5, 14, 23].includes(lifePath)) favorableDays.push('Wednesday');
    if ([6, 15, 24].includes(lifePath)) favorableDays.push('Friday');
    if ([7, 16, 25].includes(lifePath)) favorableDays.push('Monday');
    if ([8, 17, 26].includes(lifePath)) favorableDays.push('Saturday');
    if ([9, 18, 27].includes(lifePath)) favorableDays.push('Tuesday');
    
    return favorableDays.length ? favorableDays : ['Sunday'];
  };

  const getKarmaDebtSeverity = (debt: number[]): 'low' | 'medium' | 'high' => {
    if (debt.length === 0) return 'low';
    if (debt.length <= 2) return 'medium';
    return 'high';
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-200 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Karmic Finance Audit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-purple-200 text-sm font-medium mb-2 block">
                Full Name
              </label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full birth name"
                className="bg-black/20 border-purple-500/30 text-purple-100"
              />
            </div>
            
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
          </div>

          <Button
            onClick={generateProfile}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Calculator className="w-4 h-4 mr-2" />
            {loading ? 'Analyzing...' : 'Generate Karmic Profile'}
          </Button>

          {loading && (
            <div className="bg-black/20 p-4 rounded border border-purple-500/20">
              <p className="text-purple-200 text-center">
                {['Calculating Life Path Number...', 'Analyzing Destiny Number...', 'Scanning for Karmic Debts...', 'Generating Financial Guidance...', 'Preparing Remedies...'][currentStep]}
              </p>
              <Progress value={(currentStep + 1) * 20} className="mt-3" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Karmic Profile Results */}
      {profile && (
        <>
          {/* Core Numbers */}
          <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-200 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Your Core Numbers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-black/20 rounded border border-blue-500/20">
                  <h4 className="text-blue-200 font-medium mb-2">Life Path Number</h4>
                  <div className="text-3xl font-bold text-blue-100 mb-2">{profile.lifePathNumber}</div>
                  <p className="text-blue-300 text-sm">
                    {LIFE_PATH_MEANINGS[profile.lifePathNumber as keyof typeof LIFE_PATH_MEANINGS]?.traits}
                  </p>
                </div>
                
                <div className="text-center p-4 bg-black/20 rounded border border-blue-500/20">
                  <h4 className="text-blue-200 font-medium mb-2">Destiny Number</h4>
                  <div className="text-3xl font-bold text-blue-100 mb-2">{profile.destinyNumber}</div>
                  <p className="text-blue-300 text-sm">Your life purpose energy</p>
                </div>
                
                <div className="text-center p-4 bg-black/20 rounded border border-blue-500/20">
                  <h4 className="text-blue-200 font-medium mb-2">Birth Day</h4>
                  <div className="text-3xl font-bold text-blue-100 mb-2">{profile.birthDay}</div>
                  <p className="text-blue-300 text-sm">Your natural talents</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Karmic Debt Analysis */}
          <Card className={`bg-gradient-to-br border ${
            profile.karmaDebt.length > 0 
              ? 'from-red-900/40 to-orange-900/40 border-red-500/30' 
              : 'from-green-900/40 to-emerald-900/40 border-green-500/30'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${
                profile.karmaDebt.length > 0 ? 'text-red-200' : 'text-green-200'
              }`}>
                {profile.karmaDebt.length > 0 ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                Karmic Debt Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.karmaDebt.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-red-200">Severity:</span>
                    <Badge className={`${getSeverityColor(getKarmaDebtSeverity(profile.karmaDebt))} bg-black/20`}>
                      {getKarmaDebtSeverity(profile.karmaDebt).toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.karmaDebt.map(debt => (
                      <div key={debt} className="bg-black/20 p-4 rounded border border-red-500/20">
                        <h4 className="text-red-200 font-medium mb-2">Karma Debt {debt}</h4>
                        <p className="text-red-300 text-sm">
                          {KARMA_DEBT_MEANINGS[debt as keyof typeof KARMA_DEBT_MEANINGS]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-green-200 text-xl font-medium mb-2">No Karmic Debt Detected</h3>
                  <p className="text-green-300">You have a clean karmic slate for financial abundance!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-200 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Financial Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-green-200">{strength}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Challenges */}
          <Card className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-200 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Financial Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-yellow-200">{challenge}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Financial Guidance */}
          <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30">
            <CardHeader>
              <CardTitle className="text-indigo-200 flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Personalized Financial Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.financialGuidance.map((guidance, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <p className="text-indigo-200">{guidance}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Remedies */}
          <Card className="bg-gradient-to-br from-pink-900/40 to-rose-900/40 border-pink-500/30">
            <CardHeader>
              <CardTitle className="text-pink-200 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Karmic Remedies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.remedies.map((remedy, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                    <p className="text-pink-200">{remedy}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lucky Numbers & Favorable Days */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-amber-900/40 to-yellow-900/40 border-amber-500/30">
              <CardHeader>
                <CardTitle className="text-amber-200 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Lucky Numbers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {profile.luckyNumbers.map(number => (
                    <div key={number} className="text-center p-3 bg-black/20 rounded border border-amber-500/20">
                      <div className="text-2xl font-bold text-amber-100">{number}</div>
                    </div>
                  ))}
                </div>
                <p className="text-amber-300 text-sm mt-3 text-center">
                  Use these numbers for important financial decisions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-200 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Favorable Days
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {profile.favorableDays.map(day => (
                    <div key={day} className="flex items-center gap-2 p-2 bg-black/20 rounded border border-cyan-500/20">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      <span className="text-cyan-200">{day}</span>
                    </div>
                  ))}
                </div>
                <p className="text-cyan-300 text-sm mt-3 text-center">
                  Best days for financial planning and investments
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
