import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Moon, Star, Zap, Crown } from 'lucide-react';

interface CosmicEvent {
  id: string;
  date: string;
  title: string;
  type: 'moon' | 'planet' | 'eclipse' | 'portal' | 'galactic';
  description: string;
  power: number;
  recommendations: string[];
  chakraFocus: string;
  angel: string;
}

const CosmicCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CosmicEvent | null>(null);

  const cosmicEvents: CosmicEvent[] = [
    {
      id: '1',
      date: '2024-03-25',
      title: 'Full Moon in Libra',
      type: 'moon',
      description: 'Perfect time for relationship healing and balance rituals',
      power: 85,
      recommendations: ['Rose quartz meditation', 'Partnership healing', 'Harmony rituals'],
      chakraFocus: 'Heart Chakra',
      angel: 'Archangel Chamuel'
    },
    {
      id: '2',
      date: '2024-04-08',
      title: 'Solar Eclipse Portal',
      type: 'eclipse',
      description: 'Powerful transformation window opens - major life shifts possible',
      power: 95,
      recommendations: ['Protection rituals', 'Life purpose meditation', 'Release ceremonies'],
      chakraFocus: 'Solar Plexus',
      angel: 'Archangel Michael'
    },
    {
      id: '3',
      date: '2024-04-19',
      title: 'Pleiades Gateway',
      type: 'galactic',
      description: 'Star wisdom downloads and cosmic consciousness expansion',
      power: 90,
      recommendations: ['Star meditation', 'Cosmic channeling', 'Light language activation'],
      chakraFocus: 'Crown Chakra',
      angel: 'Archangel Metatron'
    },
    {
      id: '4',
      date: '2024-04-23',
      title: 'Venus enters Gemini',
      type: 'planet',
      description: 'Enhanced communication in relationships and creative expression',
      power: 70,
      recommendations: ['Love letters', 'Creative projects', 'Social connection'],
      chakraFocus: 'Throat Chakra',
      angel: 'Archangel Gabriel'
    },
    {
      id: '5',
      date: '2024-05-01',
      title: 'Beltane Sacred Fire',
      type: 'portal',
      description: 'Ancient Celtic fire festival - manifestation and fertility magic',
      power: 88,
      recommendations: ['Fire ceremonies', 'Manifestation rituals', 'Earth connection'],
      chakraFocus: 'Sacral Chakra',
      angel: 'Archangel Uriel'
    }
  ];

  const getCurrentMoonPhase = () => {
    const phases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
    const today = new Date();
    const dayOfMonth = today.getDate();
    const phaseIndex = Math.floor((dayOfMonth / 30) * 8) % 8;
    return phases[phaseIndex];
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'moon': return <Moon className="w-4 h-4" />;
      case 'eclipse': return <Zap className="w-4 h-4" />;
      case 'galactic': return <Star className="w-4 h-4" />;
      case 'portal': return <Crown className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'moon': return 'bg-blue-600/20 text-blue-300 border-blue-400/30';
      case 'eclipse': return 'bg-red-600/20 text-red-300 border-red-400/30';
      case 'galactic': return 'bg-purple-600/20 text-purple-300 border-purple-400/30';
      case 'portal': return 'bg-amber-600/20 text-amber-300 border-amber-400/30';
      default: return 'bg-gray-600/20 text-gray-300 border-gray-400/30';
    }
  };

  const getPowerLevel = (power: number) => {
    if (power >= 90) return { text: 'Maximum Power', color: 'text-red-400' };
    if (power >= 80) return { text: 'High Power', color: 'text-orange-400' };
    if (power >= 70) return { text: 'Medium Power', color: 'text-yellow-400' };
    return { text: 'Gentle Energy', color: 'text-green-400' };
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return cosmicEvents
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Current Cosmic State */}
      <Card className="border-2 border-purple-300/50 shadow-2xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
          <CardTitle className="text-center text-2xl flex items-center justify-center gap-3">
            <Calendar className="w-8 h-8" />
            🌌 Cosmic Calendar & Portal Planner
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <div className="text-6xl">{getCurrentMoonPhase()}</div>
              <h3 className="text-2xl font-bold text-purple-200">Current Lunar Phase</h3>
              <p className="text-purple-300">
                {formatDate(new Date().toISOString().split('T')[0])}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-purple-200 font-semibold">Planetary Hour</span>
                </div>
                <p className="text-yellow-400 text-xl font-bold">Venus</p>
                <p className="text-purple-300 text-sm">Love & Creativity</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  <span className="text-purple-200 font-semibold">Portal Status</span>
                </div>
                <p className="text-amber-400 text-xl font-bold">Open</p>
                <p className="text-purple-300 text-sm">High Energy</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-green-400" />
                  <span className="text-purple-200 font-semibold">Best Activity</span>
                </div>
                <p className="text-green-400 text-xl font-bold">Meditation</p>
                <p className="text-purple-300 text-sm">Inner Work</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="border-2 border-blue-300/50 shadow-2xl bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
          <CardTitle className="text-xl">🔮 Upcoming Cosmic Events</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            {getUpcomingEvents().map((event) => (
              <div 
                key={event.id}
                className="bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/15 transition-all"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    {getEventTypeIcon(event.type)}
                    <h4 className="font-semibold text-blue-200 text-lg">{event.title}</h4>
                  </div>
                  <Badge className={getEventTypeColor(event.type)}>
                    {event.type}
                  </Badge>
                </div>
                
                <p className="text-blue-300 mb-3">{formatDate(event.date)}</p>
                <p className="text-blue-200 mb-3">{event.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 text-sm">Power Level:</span>
                    <span className={`font-semibold ${getPowerLevel(event.power).color}`}>
                      {getPowerLevel(event.power).text}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="text-blue-200 border-blue-400">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Card className="border-2 border-amber-300/50 shadow-2xl bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
            <CardTitle className="text-xl flex items-center gap-3">
              {getEventTypeIcon(selectedEvent.type)}
              {selectedEvent.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-amber-200 mb-2">📅 Date & Time</h4>
                  <p className="text-amber-100">{formatDate(selectedEvent.date)}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-amber-200 mb-2">⚡ Power Level</h4>
                  <p className={`font-bold ${getPowerLevel(selectedEvent.power).color}`}>
                    {selectedEvent.power}% - {getPowerLevel(selectedEvent.power).text}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-amber-200 mb-2">🎯 Chakra Focus</h4>
                  <p className="text-amber-100">{selectedEvent.chakraFocus}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-amber-200 mb-2">👼 Guardian Angel</h4>
                  <p className="text-amber-100">{selectedEvent.angel}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-amber-200 mb-2">📝 Description</h4>
                  <p className="text-amber-100">{selectedEvent.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-amber-200 mb-3">🌟 Recommended Practices</h4>
                  <div className="space-y-2">
                    {selectedEvent.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-100">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:opacity-90 px-8">
                Set Ritual Reminder
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedEvent(null)}
                className="ml-4 border-amber-400 text-amber-200 hover:bg-amber-600/20"
              >
                Close Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monthly Overview */}
      <Card className="border-2 border-indigo-300/50 shadow-2xl bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
          <CardTitle className="text-xl">📊 This Month's Cosmic Highlights</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Moon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <h4 className="font-semibold text-indigo-200">Full Moons</h4>
              <p className="text-2xl font-bold text-blue-400">2</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-red-400" />
              <h4 className="font-semibold text-indigo-200">Eclipses</h4>
              <p className="text-2xl font-bold text-red-400">1</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <h4 className="font-semibold text-indigo-200">Galactic Gates</h4>
              <p className="text-2xl font-bold text-purple-400">3</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Crown className="w-8 h-8 mx-auto mb-2 text-amber-400" />
              <h4 className="font-semibold text-indigo-200">Sacred Portals</h4>
              <p className="text-2xl font-bold text-amber-400">4</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CosmicCalendar;