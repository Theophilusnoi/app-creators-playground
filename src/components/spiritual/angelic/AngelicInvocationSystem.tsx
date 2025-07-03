import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Shield, Crown, Zap, Users } from 'lucide-react';

interface Archangel {
  name: string;
  title: string;
  domain: string[];
  color: string;
  element: string;
  day: string;
  invocation: string;
  seal: string;
  prayer: string;
  when_to_call: string;
}

interface AngelicSession {
  archangel: string;
  purpose: string;
  duration: number;
  active: boolean;
}

export const AngelicInvocationSystem = () => {
  const [activeSession, setActiveSession] = useState<AngelicSession | null>(null);
  const [sessionProgress, setSessionProgress] = useState(0);

  const archangels: Archangel[] = [
    {
      name: 'Michael',
      title: 'Prince of Light, Divine Warrior',
      domain: ['Protection', 'Courage', 'Truth', 'Justice'],
      color: 'Blue',
      element: 'Fire',
      day: 'Sunday',
      invocation: 'Archangel Michael, Prince of Light and Divine Warrior, I call upon your mighty presence.',
      seal: '🔥',
      prayer: 'Sacred Michael, surround me with your blue flame of protection. Grant me courage to face all challenges and wisdom to discern truth from illusion. Shield me from all harm and guide my path with divine justice.',
      when_to_call: 'When you need protection, courage, or are facing spiritual warfare'
    },
    {
      name: 'Gabriel',
      title: 'Messenger of God, Herald of Divine Will',
      domain: ['Communication', 'Dreams', 'Creativity', 'Prophecy'],
      color: 'White',
      element: 'Water',
      day: 'Monday',
      invocation: 'Archangel Gabriel, divine messenger and herald of sacred truth, I invoke your presence.',
      seal: '💫',
      prayer: 'Beloved Gabriel, open the channels of divine communication within me. Help me receive your messages through dreams, visions, and inspiration. Cleanse my voice to speak only truth and beauty.',
      when_to_call: 'When seeking divine messages, creative inspiration, or clarity in communication'
    },
    {
      name: 'Raphael',
      title: 'Divine Healer, God Who Heals',
      domain: ['Healing', 'Travel', 'Science', 'Knowledge'],
      color: 'Green',
      element: 'Air',
      day: 'Wednesday',
      invocation: 'Archangel Raphael, divine physician and healer of God, I call upon your healing presence.',
      seal: '🌿',
      prayer: 'Gentle Raphael, place your healing hands upon my body, mind, and soul. Restore me to perfect wholeness and guide my path toward optimal health. Protect my journeys and illuminate my understanding.',
      when_to_call: 'When you need physical, emotional, or spiritual healing'
    },
    {
      name: 'Uriel',
      title: 'Fire of God, Light of Divine Wisdom',
      domain: ['Wisdom', 'Truth', 'Justice', 'Divine Insight'],
      color: 'Gold',
      element: 'Earth',
      day: 'Thursday',
      invocation: 'Archangel Uriel, sacred flame of divine wisdom, I invoke your illuminating presence.',
      seal: '⚡',
      prayer: 'Wise Uriel, illuminate my mind with divine understanding. Help me see through illusion to truth, guide my decisions with your wisdom, and kindle the fire of spiritual knowledge within my soul.',
      when_to_call: 'When seeking wisdom, divine insight, or spiritual illumination'
    },
    {
      name: 'Jophiel',
      title: 'Beauty of God, Divine Artist',
      domain: ['Beauty', 'Inspiration', 'Creativity', 'Joy'],
      color: 'Yellow',
      element: 'Air',
      day: 'Friday',
      invocation: 'Archangel Jophiel, divine artist and beauty of God, I call upon your inspiring presence.',
      seal: '🌻',
      prayer: 'Beautiful Jophiel, help me see the divine beauty in all things. Inspire my creativity, fill my heart with joy, and help me create beauty wherever I go. Illuminate my thoughts with positivity and grace.',
      when_to_call: 'When seeking inspiration, beauty, or needing to shift perspective to joy'
    },
    {
      name: 'Chamuel',
      title: 'He Who Sees God, Angel of Love',
      domain: ['Love', 'Relationships', 'Peace', 'Forgiveness'],
      color: 'Pink',
      element: 'Water',
      day: 'Tuesday',
      invocation: 'Archangel Chamuel, divine angel of unconditional love, I invoke your loving presence.',
      seal: '💖',
      prayer: 'Loving Chamuel, fill my heart with divine love and compassion. Help me find love in all its forms, heal my relationships, and guide me to inner peace. Teach me to love myself as God loves me.',
      when_to_call: 'When seeking love, healing relationships, or needing heart healing'
    },
    {
      name: 'Zadkiel',
      title: 'Righteousness of God, Angel of Mercy',
      domain: ['Mercy', 'Forgiveness', 'Transformation', 'Memory'],
      color: 'Violet',
      element: 'Fire',
      day: 'Saturday',
      invocation: 'Archangel Zadkiel, angel of divine mercy and transformation, I call upon your grace.',
      seal: '🔮',
      prayer: 'Merciful Zadkiel, help me forgive myself and others with divine compassion. Transform my pain into wisdom, my fear into faith. Help me remember my divine nature and release all that no longer serves.',
      when_to_call: 'When needing forgiveness, transformation, or spiritual alchemy'
    }
  ];

  const startInvocation = (archangel: Archangel, purpose: string) => {
    setActiveSession({
      archangel: archangel.name,
      purpose,
      duration: 10, // 10 minutes
      active: true
    });
    setSessionProgress(0);

    // Simulate invocation progress
    const interval = setInterval(() => {
      setSessionProgress(prev => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setActiveSession(null);
            setSessionProgress(0);
          }, 2000);
          return 100;
        }
        return next;
      });
    }, 6000); // 10 minutes = 600 seconds, so 6 seconds per percent
  };

  if (activeSession) {
    const archangel = archangels.find(a => a.name === activeSession.archangel);
    return (
      <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-2 border-purple-500/50">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-xl flex items-center justify-center gap-2">
            <Crown className="w-6 h-6 text-gold-400 animate-pulse" />
            Invoking Archangel {archangel?.name}
            <Crown className="w-6 h-6 text-gold-400 animate-pulse" />
          </CardTitle>
          <div className="w-full bg-purple-900/50 rounded-full h-4 mt-4">
            <div 
              className="bg-gradient-to-r from-gold-400 to-white h-4 rounded-full transition-all duration-500"
              style={{ width: `${sessionProgress}%` }}
            />
          </div>
          <p className="text-purple-200 text-sm mt-2">Divine Connection: {Math.round(sessionProgress)}%</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center">
            <span className="text-6xl animate-pulse">{archangel?.seal}</span>
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-4 rounded-lg">
            <h4 className="text-gold-200 font-semibold mb-3 text-center">🙏 Sacred Invocation</h4>
            <p className="text-white text-center italic">"{archangel?.invocation}"</p>
          </div>

          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-lg">
            <h4 className="text-blue-200 font-semibold mb-3 text-center">✨ Divine Prayer</h4>
            <p className="text-blue-100 text-sm text-center italic">"{archangel?.prayer}"</p>
          </div>

          <div className="text-center mt-4">
            <p className="text-white text-sm">
              🌟 Feel the divine presence of Archangel {archangel?.name} surrounding you with {archangel?.color.toLowerCase()} light 🌟
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-center justify-center">
            <Crown className="w-6 h-6 text-gold-400" />
            👼 Angelic Invocation System
            <Crown className="w-6 h-6 text-gold-400" />
          </CardTitle>
          <p className="text-purple-200 text-center">
            Call upon the mighty Archangels for divine guidance, protection, and assistance in your spiritual journey
          </p>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {archangels.map((archangel) => (
          <Card key={archangel.name} className="bg-black/30 border-purple-500/30 hover:border-purple-400 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{archangel.seal}</span>
                  <div>
                    <CardTitle className="text-white text-lg">
                      Archangel {archangel.name}
                    </CardTitle>
                    <p className="text-purple-300 text-sm">{archangel.title}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge variant="outline" className={`text-xs border-${archangel.color.toLowerCase()}-400 text-${archangel.color.toLowerCase()}-300`}>
                    {archangel.color} Ray
                  </Badge>
                  <Badge variant="outline" className="text-xs border-gray-400 text-gray-300">
                    {archangel.day}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div>
                <h4 className="text-purple-200 text-sm font-medium mb-1">🌟 Domains:</h4>
                <div className="flex flex-wrap gap-1">
                  {archangel.domain.map((domain) => (
                    <Badge key={domain} variant="secondary" className="text-xs bg-purple-600/20 text-purple-200">
                      {domain}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-blue-200 text-sm font-medium mb-1">🕯️ When to Call:</h4>
                <p className="text-blue-100 text-xs">{archangel.when_to_call}</p>
              </div>

              <Button
                onClick={() => startInvocation(archangel, 'Divine Guidance')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <Star className="w-4 h-4 mr-2" />
                Invoke {archangel.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-gold-900/20 to-purple-900/20 rounded-lg p-4">
        <h4 className="text-gold-200 font-medium mb-2 text-center">🌟 Weekly Angel Focus Schedule</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="text-center">
            <p className="text-blue-300 font-medium">Week 1</p>
            <p className="text-blue-200">Michael - Protection</p>
          </div>
          <div className="text-center">
            <p className="text-white-300 font-medium">Week 2</p>
            <p className="text-white-200">Gabriel - Communication</p>
          </div>
          <div className="text-center">
            <p className="text-green-300 font-medium">Week 3</p>
            <p className="text-green-200">Raphael - Healing</p>
          </div>
          <div className="text-center">
            <p className="text-gold-300 font-medium">Week 4</p>
            <p className="text-gold-200">Uriel - Wisdom</p>
          </div>
        </div>
      </div>
    </div>
  );
};