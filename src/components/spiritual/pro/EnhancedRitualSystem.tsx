
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UniversalMagicFormula } from './UniversalMagicFormula';
import { 
  Sparkles, 
  Calendar, 
  Moon, 
  Sun, 
  Star,
  BookOpen,
  Users,
  Settings,
  Clock
} from 'lucide-react';

interface EnhancedRitualSystemProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
}

const LUNAR_CALENDAR = [
  {
    phase: 'New Moon',
    date: 'Dec 30, 2024',
    energy: 'New Beginnings',
    practices: ['Intention Setting', 'Seed Planting', 'New Projects'],
    icon: '🌑'
  },
  {
    phase: 'Waxing Moon',
    date: 'Jan 6, 2025',
    energy: 'Growth & Expansion',
    practices: ['Abundance Work', 'Skill Development', 'Momentum Building'],
    icon: '🌒'
  },
  {
    phase: 'Full Moon',
    date: 'Jan 13, 2025',
    energy: 'Manifestation Peak',
    practices: ['Healing Work', 'Major Manifestations', 'Completions'],
    icon: '🌕'
  },
  {
    phase: 'Waning Moon',
    date: 'Jan 21, 2025',
    energy: 'Release & Purification',
    practices: ['Forgiveness Work', 'Pattern Release', 'Energy Clearing'],
    icon: '🌘'
  }
];

const SEASONAL_CELEBRATIONS = [
  {
    name: 'Winter Solstice',
    date: 'Dec 21',
    theme: 'Return of Light',
    practices: ['Inner Work', 'Meditation', 'Year Intentions'],
    color: 'from-blue-600 to-indigo-700'
  },
  {
    name: 'Spring Equinox',
    date: 'Mar 20',
    theme: 'Renewal & Rebirth',
    practices: ['New Beginnings', 'Growth Projects', 'Life Force Celebration'],
    color: 'from-green-600 to-emerald-700'
  },
  {
    name: 'Summer Solstice',
    date: 'Jun 21',
    theme: 'Peak Solar Energy',
    practices: ['Manifestation Work', 'Achievement Celebration', 'Creative Expression'],
    color: 'from-yellow-600 to-orange-700'
  },
  {
    name: 'Autumn Equinox',
    date: 'Sep 22',
    theme: 'Harvest & Gratitude',
    practices: ['Wisdom Gathering', 'Gratitude Practices', 'Winter Preparation'],
    color: 'from-orange-600 to-red-700'
  }
];

export const EnhancedRitualSystem: React.FC<EnhancedRitualSystemProps> = ({
  userProfile,
  setUserProfile
}) => {
  const [activeView, setActiveView] = useState<'formula' | 'calendar' | 'community' | 'settings'>('formula');

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => setActiveView('formula')}
          variant={activeView === 'formula' ? 'default' : 'outline'}
          className={activeView === 'formula' ? 'bg-purple-600' : 'border-purple-500/50 text-purple-200'}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Magic Formula
        </Button>
        <Button
          onClick={() => setActiveView('calendar')}
          variant={activeView === 'calendar' ? 'default' : 'outline'}
          className={activeView === 'calendar' ? 'bg-purple-600' : 'border-purple-500/50 text-purple-200'}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Ritual Calendar
        </Button>
        <Button
          onClick={() => setActiveView('community')}
          variant={activeView === 'community' ? 'default' : 'outline'}
          className={activeView === 'community' ? 'bg-purple-600' : 'border-purple-500/50 text-purple-200'}
        >
          <Users className="w-4 h-4 mr-2" />
          Community
        </Button>
        <Button
          onClick={() => setActiveView('settings')}
          variant={activeView === 'settings' ? 'default' : 'outline'}
          className={activeView === 'settings' ? 'bg-purple-600' : 'border-purple-500/50 text-purple-200'}
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Main Content */}
      {activeView === 'formula' && (
        <UniversalMagicFormula userProfile={userProfile} setUserProfile={setUserProfile} />
      )}

      {activeView === 'calendar' && (
        <div className="space-y-6">
          {/* Lunar Calendar */}
          <Card className="bg-black/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-200 flex items-center gap-2">
                <Moon className="w-5 h-5" />
                Lunar Ritual Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {LUNAR_CALENDAR.map((lunar, index) => (
                  <Card key={index} className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
                    <CardContent className="p-4">
                      <div className="text-center mb-3">
                        <div className="text-2xl mb-1">{lunar.icon}</div>
                        <h4 className="text-indigo-200 font-semibold">{lunar.phase}</h4>
                        <p className="text-indigo-300 text-sm">{lunar.date}</p>
                      </div>
                      <div className="space-y-2">
                        <Badge className="w-full justify-center bg-indigo-600/20 text-indigo-200">
                          {lunar.energy}
                        </Badge>
                        <div className="text-indigo-100 text-xs space-y-1">
                          {lunar.practices.map((practice, i) => (
                            <div key={i}>• {practice}</div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seasonal Celebrations */}
          <Card className="bg-black/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-200 flex items-center gap-2">
                <Sun className="w-5 h-5" />
                Seasonal Spiritual Celebrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SEASONAL_CELEBRATIONS.map((season, index) => (
                  <Card key={index} className={`bg-gradient-to-br ${season.color}/20 border-purple-500/30`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-semibold">{season.name}</h4>
                        <Badge className="bg-white/20 text-white">{season.date}</Badge>
                      </div>
                      <p className="text-purple-100 text-sm mb-3">{season.theme}</p>
                      <div className="space-y-1">
                        {season.practices.map((practice, i) => (
                          <div key={i} className="text-purple-200 text-xs">• {practice}</div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeView === 'community' && (
        <Card className="bg-black/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-200 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Spiritual Community & Group Rituals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-purple-200 mb-2">Community Features Coming Soon</h3>
              <p className="text-purple-300 mb-6">
                Connect with fellow practitioners, join group rituals, and share spiritual insights.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                  <h4 className="text-purple-200 font-medium mb-2">Group Rituals</h4>
                  <p className="text-purple-300 text-sm">Participate in synchronized global rituals</p>
                </div>
                <div className="p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
                  <h4 className="text-indigo-200 font-medium mb-2">Sacred Sharing</h4>
                  <p className="text-indigo-300 text-sm">Share experiences and wisdom safely</p>
                </div>
                <div className="p-4 bg-violet-900/20 border border-violet-500/30 rounded-lg">
                  <h4 className="text-violet-200 font-medium mb-2">Mentorship</h4>
                  <p className="text-violet-300 text-sm">Learn from experienced practitioners</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeView === 'settings' && (
        <Card className="bg-black/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-200 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Ritual Practice Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-purple-200 font-medium">Daily Practice Routine</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                    <span className="text-purple-200">Morning Awakening Practice</span>
                    <Badge className="bg-green-600/20 text-green-200">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                    <span className="text-purple-200">Midday Renewal Practice</span>
                    <Badge className="bg-gray-600/20 text-gray-300">Disabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                    <span className="text-purple-200">Evening Integration Practice</span>
                    <Badge className="bg-green-600/20 text-green-200">Enabled</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-purple-200 font-medium">Notification Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
                    <span className="text-indigo-200">Lunar Phase Reminders</span>
                    <Badge className="bg-green-600/20 text-green-200">On</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
                    <span className="text-indigo-200">Seasonal Celebrations</span>
                    <Badge className="bg-green-600/20 text-green-200">On</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
                    <span className="text-indigo-200">Daily Practice Reminders</span>
                    <Badge className="bg-yellow-600/20 text-yellow-200">Custom</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-purple-500/30">
              <h4 className="text-purple-200 font-medium mb-4">Advanced Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="border-purple-500/50 text-purple-200">
                  <Clock className="w-4 h-4 mr-2" />
                  Timing Preferences
                </Button>
                <Button variant="outline" className="border-purple-500/50 text-purple-200">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Tradition Focus
                </Button>
                <Button variant="outline" className="border-purple-500/50 text-purple-200">
                  <Star className="w-4 h-4 mr-2" />
                  Personal Mantras
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
