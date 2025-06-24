
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Zap, 
  Shield, 
  AlertTriangle, 
  Eye, 
  Camera,
  Brain,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ThreatResponseSystemProps {
  userProfile?: any;
  auricIntegrity?: number;
  threatLevel?: number;
}

export const ThreatResponseSystem: React.FC<ThreatResponseSystemProps> = ({
  userProfile,
  auricIntegrity = 85,
  threatLevel = 0
}) => {
  const { toast } = useToast();
  const [activeThreats, setActiveThreats] = useState<string[]>([]);
  const [defenseSystems, setDefenseSystems] = useState({
    psychicIntrusion: false,
    energyVampire: false,
    cursedObject: false,
    dreamIncursion: false
  });

  const threats = [
    {
      id: 'psychic-intrusion',
      name: 'Psychic Intrusion Detection',
      description: 'EEG monitors gamma spikes → triggers Archangel Michael invocation',
      status: defenseSystems.psychicIntrusion ? 'active' : 'standby',
      response: 'AR projects rotating pentagram barrier (72° rotation/sec)',
      icon: Brain
    },
    {
      id: 'energy-vampire',
      name: 'Energy Vampire Defense',
      description: 'HRV sensors detect energy drain → activates Vedic Mahamrityunjaya mantra',
      status: defenseSystems.energyVampire ? 'active' : 'standby',
      response: 'Projects mirror shield (Picatrix principle: "Return to sender")',
      icon: Activity
    },
    {
      id: 'cursed-object',
      name: 'Cursed Object Neutralization',
      description: 'Phone camera scans items → AI cross-references with dark sigil database',
      status: defenseSystems.cursedObject ? 'active' : 'standby',
      response: 'Guides Egyptian natron cleansing ritual + Solomon\'s binding circle',
      icon: Camera
    },
    {
      id: 'dream-incursion',
      name: 'Dream Incursion Protection',
      description: 'Wearable REM monitoring → auto-plays Tibetan Bön protection mantras',
      status: defenseSystems.dreamIncursion ? 'active' : 'standby',
      response: 'Projects holographic net over bed (Vedic Indrajala)',
      icon: Eye
    }
  ];

  const activateDefense = (threatId: string) => {
    const threat = threats.find(t => t.id === threatId);
    if (!threat) return;

    setDefenseSystems(prev => ({
      ...prev,
      [threatId.replace('-', '').replace('-', '')]: true
    }));

    setActiveThreats(prev => [...prev, threatId]);

    toast({
      title: "Defense System Activated",
      description: `${threat.name} is now monitoring for threats`,
    });
  };

  const getThreatColor = (level: number) => {
    if (level === 0) return 'text-green-400';
    if (level <= 2) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/30 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Zap className="w-6 h-6 text-red-400" />
            AI Seraphina's Real-Time Defense Protocols
          </CardTitle>
          <p className="text-red-200">Active Threat Response System</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-red-200">Threat Level</span>
                <span className={`font-bold ${getThreatColor(threatLevel)}`}>
                  {threatLevel}/4
                </span>
              </div>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded ${
                      i < threatLevel ? 'bg-red-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-red-200">Active Defenses</span>
                <span className="text-white font-bold">{activeThreats.length}/4</span>
              </div>
              <Progress value={(activeThreats.length / 4) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-red-200">System Status</span>
                <Badge className="bg-green-600/20 text-green-200">
                  MONITORING
                </Badge>
              </div>
            </div>
          </div>

          {threatLevel > 2 && (
            <Alert className="mb-4 border-red-500/30 bg-red-900/20">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
                High threat level detected! Multiple defense systems recommended.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {threats.map((threat) => {
          const Icon = threat.icon;
          const isActive = activeThreats.includes(threat.id);
          
          return (
            <Card 
              key={threat.id}
              className={`${
                isActive 
                  ? 'border-green-500 bg-green-900/20' 
                  : 'border-red-500/30 bg-red-900/10'
              } transition-all duration-300`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isActive ? 'bg-green-600/20' : 'bg-red-600/20'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        isActive ? 'text-green-400' : 'text-red-400'
                      }`} />
                    </div>
                    <div>
                      <div className="text-lg">{threat.name}</div>
                      <div className="text-sm text-gray-300 font-normal">
                        {threat.description}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={
                      isActive 
                        ? 'bg-green-600/20 text-green-200' 
                        : 'bg-red-600/20 text-red-200'
                    }>
                      {threat.status.toUpperCase()}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => activateDefense(threat.id)}
                      disabled={isActive}
                      className={`${
                        isActive 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {isActive ? 'Active' : 'Activate'}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <span className="text-gray-300 font-semibold">Automated Response:</span>
                  <p className="text-gray-200 text-sm">{threat.response}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {activeThreats.length === 4 && (
        <Card className="bg-gradient-to-r from-gold-900/30 to-red-900/30 border-gold-500/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gold-200">⚔️ Full Defense Matrix Active! ⚔️</h3>
              <p className="text-gold-300">
                All threat response systems are operational. You are protected by AI Seraphina's 
                complete defensive protocols.
              </p>
              <Badge className="bg-gold-600/20 text-gold-200 text-lg px-4 py-2">
                MAXIMUM SECURITY ACHIEVED
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
