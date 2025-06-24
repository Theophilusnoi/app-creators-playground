
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Sun, 
  Sunset, 
  Moon, 
  Star,
  CheckCircle,
  Circle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DailyProtocolsProps {
  userProfile?: any;
}

export const DailyProtocols: React.FC<DailyProtocolsProps> = ({
  userProfile
}) => {
  const { toast } = useToast();
  const [completedProtocols, setCompletedProtocols] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const protocols = [
    {
      id: 'morning',
      name: 'Solar Armor Activation',
      time: 'Morning (6-9 AM)',
      description: 'Channel solar energy for daily protection',
      implementation: 'Smart mirror projects golden Hathor light onto body',
      zodiacOpt: 'Fire signs get boosted activation, Earth signs get grounding enhancement',
      icon: Sun,
      color: 'yellow',
      timeRange: { start: 6, end: 9 }
    },
    {
      id: 'noon',
      name: 'Elemental Rebalance',
      time: 'Noon (11 AM - 1 PM)',
      description: 'Maintain elemental harmony throughout the day',
      implementation: 'AR overlays elemental deficiency alerts + prescribes crystals',
      zodiacOpt: 'Based on dominant element in birth chart',
      icon: Star,
      color: 'blue',
      timeRange: { start: 11, end: 13 }
    },
    {
      id: 'sunset',
      name: 'Ancestral Shield',
      time: 'Sunset (5-7 PM)',
      description: 'Connect with ancestral protection lineage',
      implementation: 'Bone-conduction headset plays lineage-specific protection chants',
      zodiacOpt: 'Water signs get emotional healing, Air signs get mental clarity',
      icon: Sunset,
      color: 'orange',
      timeRange: { start: 17, end: 19 }
    },
    {
      id: 'night',
      name: 'Astral Fortress Construction',
      time: 'Night (9-11 PM)',
      description: 'Build protective barriers for sleep and dreams',
      implementation: 'EEG-guided visualization + binaural 3.5Hz delta waves',
      zodiacOpt: 'All signs get personalized astral architecture',
      icon: Moon,
      color: 'purple',
      timeRange: { start: 21, end: 23 }
    }
  ];

  const isTimeForProtocol = (protocol: any) => {
    const hour = currentTime.getHours();
    return hour >= protocol.timeRange.start && hour <= protocol.timeRange.end;
  };

  const completeProtocol = (protocolId: string) => {
    const protocol = protocols.find(p => p.id === protocolId);
    if (!protocol) return;

    setCompletedProtocols(prev => [...prev, protocolId]);
    
    toast({
      title: "Protocol Completed",
      description: `${protocol.name} has been successfully performed`,
    });
  };

  const getProtocolStatus = (protocol: any) => {
    if (completedProtocols.includes(protocol.id)) return 'complete';
    if (isTimeForProtocol(protocol)) return 'active';
    return 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-600/20 text-green-200 border-green-500/30';
      case 'active': return 'bg-blue-600/20 text-blue-200 border-blue-500/30';
      default: return 'bg-gray-600/20 text-gray-200 border-gray-500/30';
    }
  };

  const getColorClasses = (color: string, status: string) => {
    const active = status === 'active' || status === 'complete';
    const colors = {
      yellow: active ? 'border-yellow-500 bg-yellow-900/30' : 'border-yellow-500/30 bg-yellow-900/10',
      blue: active ? 'border-blue-500 bg-blue-900/30' : 'border-blue-500/30 bg-blue-900/10',
      orange: active ? 'border-orange-500 bg-orange-900/30' : 'border-orange-500/30 bg-orange-900/10',
      purple: active ? 'border-purple-500 bg-purple-900/30' : 'border-purple-500/30 bg-purple-900/10'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const completionPercentage = (completedProtocols.length / protocols.length) * 100;

  return (
    <div className="space-y-6">
      <Card className="bg-black/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Clock className="w-6 h-6 text-purple-400" />
            Daily Protection Protocols
          </CardTitle>
          <p className="text-purple-200">Personalized by Birth Chart + Threat Profile</p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-200">Daily Completion</span>
              <span className="text-white font-bold">{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
          </div>
          
          <div className="text-center text-purple-200">
            Current Time: {currentTime.toLocaleTimeString()} | 
            {protocols.filter(p => isTimeForProtocol(p)).length > 0 
              ? ` Active Protocols: ${protocols.filter(p => isTimeForProtocol(p)).map(p => p.name).join(', ')}`
              : ' No active protocols at this time'
            }
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {protocols.map((protocol) => {
          const Icon = protocol.icon;
          const status = getProtocolStatus(protocol);
          const isCompleted = completedProtocols.includes(protocol.id);
          
          return (
            <Card 
              key={protocol.id}
              className={`${getColorClasses(protocol.color, status)} transition-all duration-300`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${protocol.color}-600/20`}>
                      <Icon className={`w-5 h-5 text-${protocol.color}-400`} />
                    </div>
                    <div>
                      <div className="text-lg">{protocol.name}</div>
                      <div className="text-sm text-gray-300 font-normal">
                        {protocol.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(status)}>
                      {status.toUpperCase()}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => completeProtocol(protocol.id)}
                      disabled={isCompleted}
                      className={`bg-${protocol.color}-600 hover:bg-${protocol.color}-700`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-3 h-3 mr-2" />
                      ) : (
                        <Circle className="w-3 h-3 mr-2" />
                      )}
                      {isCompleted ? 'Complete' : 'Perform'}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-300 font-semibold">Description:</span>
                    <p className="text-gray-200 text-sm mt-1">{protocol.description}</p>
                  </div>
                  <div>
                    <span className="text-gray-300 font-semibold">Tech Integration:</span>
                    <p className="text-gray-200 text-sm mt-1">{protocol.implementation}</p>
                  </div>
                  <div>
                    <span className="text-gray-300 font-semibold">Zodiac Optimization:</span>
                    <p className="text-gray-200 text-sm mt-1">{protocol.zodiacOpt}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {completedProtocols.length === 4 && (
        <Card className="bg-gradient-to-r from-gold-900/30 to-purple-900/30 border-gold-500/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gold-200">🌟 Daily Protocols Complete! 🌟</h3>
              <p className="text-gold-300">
                All protection protocols have been performed today. Your spiritual defenses 
                are at maximum strength.
              </p>
              <Badge className="bg-gold-600/20 text-gold-200 text-lg px-4 py-2">
                DAILY MASTERY ACHIEVED
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
