import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Moon, Sun, Star, Clock } from 'lucide-react';

interface MoonPhase {
  phase: string;
  illumination: number;
  icon: string;
  spiritual_meaning: string;
  ritual_suggestion: string;
}

interface PlanetaryHour {
  planet: string;
  hour: string;
  energy: string;
  best_for: string;
  color: string;
}

interface CosmicEvent {
  date: string;
  event: string;
  type: 'moon' | 'planetary' | 'eclipse' | 'portal';
  significance: string;
  ritual_opportunity: string;
}

export const CosmicCalendar = () => {
  const [currentMoonPhase, setCurrentMoonPhase] = useState<MoonPhase | null>(null);
  const [currentPlanetaryHour, setCurrentPlanetaryHour] = useState<PlanetaryHour | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<CosmicEvent[]>([]);

  useEffect(() => {
    loadCosmicData();
  }, []);

  const loadCosmicData = () => {
    // Simulate current moon phase
    setCurrentMoonPhase({
      phase: 'Waxing Crescent',
      illumination: 23,
      icon: '🌒',
      spiritual_meaning: 'Growth, intention setting, new beginnings',
      ritual_suggestion: 'Perfect time for manifestation rituals and planting seeds of intention'
    });

    // Simulate current planetary hour
    setCurrentPlanetaryHour({
      planet: 'Venus',
      hour: '2:00 PM - 3:00 PM',
      energy: 'Love, Beauty, Harmony',
      best_for: 'Relationship healing, artistic creation, self-love rituals',
      color: 'Green'
    });

    // Simulate upcoming cosmic events
    setUpcomingEvents([
      {
        date: 'March 10',
        event: 'Mercury Direct',
        type: 'planetary',
        significance: 'Communication clarity returns, technology flows smoothly',
        ritual_opportunity: 'Perfect timing for app launch and clear communication with your tribe'
      },
      {
        date: 'March 20',
        event: 'Sun enters Aries',
        type: 'planetary',
        significance: 'New astrological year begins, warrior energy awakens',
        ritual_opportunity: 'Launch "Awakening Challenge" - 7 Day Ritual Starter'
      },
      {
        date: 'April 5',
        event: 'Full Moon in Libra',
        type: 'moon',
        significance: 'Balance, relationships, harmony, justice',
        ritual_opportunity: 'Release Relationship Healing Through Ritual Module'
      },
      {
        date: 'April 19',
        event: 'New Moon in Aries',
        type: 'moon',
        significance: 'Fresh starts, courage, independence, leadership',
        ritual_opportunity: 'Launch User Avatar + Spiritual Identity Builder'
      },
      {
        date: 'May 5',
        event: 'Star of Sirius Portal Opens',
        type: 'portal',
        significance: 'Cosmic consciousness activation, ancient wisdom downloads',
        ritual_opportunity: 'Unlock cosmic consciousness module and advanced teachings'
      }
    ]);
  };

  const getPlanetaryHours = () => {
    const planetarySequence = [
      { planet: 'Sun', energy: 'Leadership, vitality, success', color: 'Gold' },
      { planet: 'Venus', energy: 'Love, beauty, harmony', color: 'Green' },
      { planet: 'Mercury', energy: 'Communication, learning, travel', color: 'Orange' },
      { planet: 'Moon', energy: 'Intuition, emotions, dreams', color: 'Silver' },
      { planet: 'Saturn', energy: 'Discipline, structure, protection', color: 'Black' },
      { planet: 'Jupiter', energy: 'Expansion, wisdom, abundance', color: 'Blue' },
      { planet: 'Mars', energy: 'Action, courage, strength', color: 'Red' }
    ];

    return planetarySequence;
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'moon': return 'border-blue-400 text-blue-300';
      case 'planetary': return 'border-purple-400 text-purple-300';
      case 'eclipse': return 'border-red-400 text-red-300';
      case 'portal': return 'border-gold-400 text-yellow-300';
      default: return 'border-gray-400 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-center justify-center">
            <Star className="w-6 h-6 text-purple-400" />
            🌌 Cosmic Calendar & Divine Timing
            <Star className="w-6 h-6 text-purple-400" />
          </CardTitle>
          <p className="text-purple-200 text-center">
            Align your spiritual practices with cosmic energies for maximum manifestation power
          </p>
        </CardHeader>
      </Card>

      {/* Current Moon Phase */}
      <Card className="bg-black/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Moon className="w-5 h-5 text-blue-400" />
            Current Moon Phase
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentMoonPhase && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{currentMoonPhase.icon}</span>
                <div>
                  <h3 className="text-white font-semibold">{currentMoonPhase.phase}</h3>
                  <p className="text-blue-300 text-sm">{currentMoonPhase.illumination}% Illuminated</p>
                </div>
              </div>
              <div className="bg-blue-900/20 p-3 rounded-lg">
                <h4 className="text-blue-200 font-medium mb-2">🌙 Spiritual Meaning:</h4>
                <p className="text-blue-100 text-sm">{currentMoonPhase.spiritual_meaning}</p>
              </div>
              <div className="bg-purple-900/20 p-3 rounded-lg">
                <h4 className="text-purple-200 font-medium mb-2">🕯️ Ritual Suggestion:</h4>
                <p className="text-purple-100 text-sm">{currentMoonPhase.ritual_suggestion}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Planetary Hour */}
      <Card className="bg-black/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-400" />
            Current Planetary Hour
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentPlanetaryHour && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-${currentPlanetaryHour.color.toLowerCase()}-500/30 flex items-center justify-center`}>
                  <span className="text-white font-bold">♀</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{currentPlanetaryHour.planet}</h3>
                  <p className="text-green-300 text-sm">{currentPlanetaryHour.hour}</p>
                </div>
              </div>
              <div className="bg-green-900/20 p-3 rounded-lg">
                <h4 className="text-green-200 font-medium mb-2">⚡ Current Energy:</h4>
                <p className="text-green-100 text-sm">{currentPlanetaryHour.energy}</p>
              </div>
              <div className="bg-yellow-900/20 p-3 rounded-lg">
                <h4 className="text-yellow-200 font-medium mb-2">🎯 Best For:</h4>
                <p className="text-yellow-100 text-sm">{currentPlanetaryHour.best_for}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Cosmic Events */}
      <Card className="bg-black/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            Upcoming Cosmic Events & Feature Releases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-semibold">{event.event}</h4>
                    <p className="text-gray-400 text-sm">{event.date}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getEventTypeColor(event.type)}`}
                  >
                    {event.type}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <h5 className="text-purple-200 text-sm font-medium">🌟 Significance:</h5>
                    <p className="text-purple-100 text-xs">{event.significance}</p>
                  </div>
                  <div>
                    <h5 className="text-blue-200 text-sm font-medium">🚀 Ritual Opportunity:</h5>
                    <p className="text-blue-100 text-xs">{event.ritual_opportunity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Planetary Hours Reference */}
      <Card className="bg-black/30 border-gold-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sun className="w-5 h-5 text-gold-400" />
            Planetary Hours Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {getPlanetaryHours().map((planet, index) => (
              <div key={index} className="bg-gray-800/30 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-${planet.color.toLowerCase()}-500/30 flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{planet.planet[0]}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">{planet.planet}</h4>
                    <p className="text-gray-400 text-xs">{planet.energy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};