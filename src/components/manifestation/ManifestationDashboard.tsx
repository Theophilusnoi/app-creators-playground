
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { 
  Coins, Sparkles, BookOpen, Moon, Users, Target, 
  Home, Crown, Flame, Gem, TrendingUp, CalendarDays
} from 'lucide-react';
import { RitualBuilder } from './RitualBuilder';
import { WealthAffirmationGenerator } from './WealthAffirmationGenerator';
import { ProsperityVisualizationTemple } from './ProsperityVisualizationTemple';
import { MoonPhasePlanner } from './MoonPhasePlanner';
import { SacredSymbolGrid } from './SacredSymbolGrid';
import { WealthOracleReading } from './WealthOracleReading';
import { ProsperityJournal } from './ProsperityJournal';
import { KarmicFinanceAudit } from './KarmicFinanceAudit';
import { GroupRitualCircle } from './GroupRitualCircle';
import { ProsperityGoalsTracker } from './ProsperityGoalsTracker';

export const ManifestationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-yellow-950 to-orange-950 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Button 
            onClick={() => navigate('/dashboard')} 
            variant="outline" 
            className="border-amber-500/30 text-amber-200 hover:bg-amber-600/20"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="text-center sm:text-right">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 bg-clip-text">
              💰 Wealth & Abundance Manifestation 💰
            </h1>
            <p className="text-amber-200 mt-2">Transform your financial reality through ancient wisdom</p>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <TabsList className="w-full bg-black/30 p-2 gap-1 mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto">
            <TabsTrigger 
              value="overview" 
              className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-amber-600/50 text-xs h-16"
            >
              <Sparkles className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="rituals" 
              className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-orange-600/50 text-xs h-16"
            >
              <Flame className="w-4 h-4" />
              <span>Rituals</span>
            </TabsTrigger>
            <TabsTrigger 
              value="affirmations" 
              className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-yellow-600/50 text-xs h-16"
            >
              <Crown className="w-4 h-4" />
              <span>Affirmations</span>
            </TabsTrigger>
            <TabsTrigger 
              value="temple" 
              className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-amber-600/50 text-xs h-16"
            >
              <Gem className="w-4 h-4" />
              <span>Temple</span>
            </TabsTrigger>
            <TabsTrigger 
              value="lunar" 
              className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-blue-600/50 text-xs h-16"
            >
              <Moon className="w-4 h-4" />
              <span>Lunar</span>
            </TabsTrigger>
          </TabsList>

          {/* Secondary Navigation */}
          <div className="mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-3 bg-black/20 rounded-lg">
              <Button 
                onClick={() => setActiveTab('symbols')} 
                variant={activeTab === 'symbols' ? 'default' : 'outline'}
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Symbols</span>
              </Button>
              <Button 
                onClick={() => setActiveTab('oracle')} 
                variant={activeTab === 'oracle' ? 'default' : 'outline'}
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Oracle</span>
              </Button>
              <Button 
                onClick={() => setActiveTab('journal')} 
                variant={activeTab === 'journal' ? 'default' : 'outline'}
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Journal</span>
              </Button>
              <Button 
                onClick={() => setActiveTab('karmic')} 
                variant={activeTab === 'karmic' ? 'default' : 'outline'}
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
              >
                <Target className="w-4 h-4" />
                <span>Karmic</span>
              </Button>
              <Button 
                onClick={() => setActiveTab('community')} 
                variant={activeTab === 'community' ? 'default' : 'outline'}
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
              >
                <Users className="w-4 h-4" />
                <span>Community</span>
              </Button>
              <Button 
                onClick={() => setActiveTab('goals')} 
                variant={activeTab === 'goals' ? 'default' : 'outline'}
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs min-h-[60px]"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Goals</span>
              </Button>
            </div>
          </div>

          {/* Tab Contents */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Quick Stats */}
              <Card className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-yellow-200 flex items-center gap-2">
                    <Coins className="w-5 h-5" />
                    Active Manifestations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">12</div>
                  <p className="text-yellow-200 text-sm">Goals in progress</p>
                </CardContent>
              </Card>

              {/* Daily Affirmation */}
              <Card className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-orange-200 flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    Today's Affirmation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-200 italic text-sm">
                    "I am a magnet for abundance and prosperity flows to me effortlessly"
                  </p>
                </CardContent>
              </Card>

              {/* Moon Phase */}
              <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-200 flex items-center gap-2">
                    <Moon className="w-5 h-5" />
                    Current Moon Phase
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400 mb-2">🌕 Full Moon</div>
                  <p className="text-blue-200 text-sm">Perfect for releasing limiting beliefs</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card className="bg-gradient-to-br from-amber-900/40 to-yellow-900/40 border-amber-500/30">
                <CardHeader>
                  <CardTitle className="text-amber-200">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setActiveTab('rituals')} 
                    className="w-full bg-amber-600/20 hover:bg-amber-600/40 text-amber-200 border border-amber-500/30"
                  >
                    <Flame className="w-4 h-4 mr-2" />
                    Create New Ritual
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('affirmations')} 
                    className="w-full bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-200 border border-yellow-500/30"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Generate Affirmation
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('oracle')} 
                    className="w-full bg-purple-600/20 hover:bg-purple-600/40 text-purple-200 border border-purple-500/30"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Get Oracle Reading
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-200">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-200">Completed morning abundance ritual</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-yellow-200">Generated new career affirmations</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-blue-200">Joined group manifestation circle</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rituals" className="mt-6">
            <RitualBuilder />
          </TabsContent>

          <TabsContent value="affirmations" className="mt-6">
            <WealthAffirmationGenerator />
          </TabsContent>

          <TabsContent value="temple" className="mt-6">
            <ProsperityVisualizationTemple />
          </TabsContent>

          <TabsContent value="lunar" className="mt-6">
            <MoonPhasePlanner />
          </TabsContent>

          <TabsContent value="symbols" className="mt-6">
            <SacredSymbolGrid />
          </TabsContent>

          <TabsContent value="oracle" className="mt-6">
            <WealthOracleReading />
          </TabsContent>

          <TabsContent value="journal" className="mt-6">
            <ProsperityJournal />
          </TabsContent>

          <TabsContent value="karmic" className="mt-6">
            <KarmicFinanceAudit />
          </TabsContent>

          <TabsContent value="community" className="mt-6">
            <GroupRitualCircle />
          </TabsContent>

          <TabsContent value="goals" className="mt-6">
            <ProsperityGoalsTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
