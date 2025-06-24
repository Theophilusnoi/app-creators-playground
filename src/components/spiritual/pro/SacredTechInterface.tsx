
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Brain, 
  Fingerprint, 
  Mic, 
  Link, 
  Zap,
  Shield,
  Eye,
  Smartphone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SacredTechInterfaceProps {
  userProfile?: any;
}

export const SacredTechInterface: React.FC<SacredTechInterfaceProps> = ({
  userProfile
}) => {
  const { toast } = useToast();
  const [connectedDevices, setConnectedDevices] = useState<string[]>([]);
  const [authenticationLevel, setAuthenticationLevel] = useState(0);

  const techSystems = [
    {
      id: 'neuro-sigil',
      name: 'Neuro-Sigil Controller',
      description: 'Convert brainwaves into functioning protection sigils via EEG-to-AR pipeline',
      status: connectedDevices.includes('neuro-sigil') ? 'connected' : 'offline',
      requirements: 'EEG headset + AR display',
      icon: Brain,
      color: 'purple'
    },
    {
      id: 'quantum-rng',
      name: 'Quantum RNG Shield',
      description: 'Applies Picatrix celestial math to encrypt digital presence using planetary angles',
      status: connectedDevices.includes('quantum-rng') ? 'connected' : 'offline',
      requirements: 'Quantum encryption module',
      icon: Shield,
      color: 'blue'
    },
    {
      id: 'biometric-auth',
      name: 'Biometric Authentication',
      description: 'Palm vein scan + voice recognition required for high-level rituals',
      status: authenticationLevel >= 2 ? 'authenticated' : 'pending',
      requirements: 'Palm scanner + voice analyzer',
      icon: Fingerprint,
      color: 'green'
    },
    {
      id: 'blockchain-ledger',
      name: 'Blockchain Blessing Ledger',
      description: 'Immutable record of all protections cast (timestamped to astrological events)',
      status: 'active',
      requirements: 'Distributed ledger access',
      icon: Link,
      color: 'gold'
    }
  ];

  const authMethods = [
    {
      id: 'palm-vein',
      name: 'Palm Vein Scan',
      description: 'Unique vascular pattern recognition',
      completed: authenticationLevel >= 1,
      icon: Fingerprint
    },
    {
      id: 'voice-print',
      name: 'Voice Biometric',
      description: 'Sacred phrase vocal analysis',
      completed: authenticationLevel >= 2,
      icon: Mic
    },
    {
      id: 'retinal-scan',
      name: 'Retinal Verification',
      description: 'Eye pattern authentication',
      completed: authenticationLevel >= 3,
      icon: Eye
    }
  ];

  const connectDevice = (deviceId: string) => {
    const device = techSystems.find(d => d.id === deviceId);
    if (!device) return;

    setConnectedDevices(prev => [...prev, deviceId]);
    
    toast({
      title: "Device Connected",
      description: `${device.name} is now online and ready for use`,
    });
  };

  const performAuthentication = (methodId: string) => {
    const method = authMethods.find(m => m.id === methodId);
    if (!method || method.completed) return;

    // Simulate authentication process
    setTimeout(() => {
      setAuthenticationLevel(prev => prev + 1);
      toast({
        title: "Authentication Successful",
        description: `${method.name} verification complete`,
      });
    }, 2000);

    toast({
      title: "Authentication in Progress",
      description: `Performing ${method.name}...`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': 
      case 'authenticated': 
      case 'active': return 'bg-green-600/20 text-green-200 border-green-500/30';
      case 'pending': return 'bg-yellow-600/20 text-yellow-200 border-yellow-500/30';
      default: return 'bg-red-600/20 text-red-200 border-red-500/30';
    }
  };

  const getColorClasses = (color: string, active: boolean) => {
    const colors = {
      purple: active ? 'border-purple-500 bg-purple-900/30' : 'border-purple-500/30 bg-purple-900/10',
      blue: active ? 'border-blue-500 bg-blue-900/30' : 'border-blue-500/30 bg-blue-900/10',
      green: active ? 'border-green-500 bg-green-900/30' : 'border-green-500/30 bg-green-900/10',
      gold: active ? 'border-yellow-400 bg-yellow-900/30' : 'border-yellow-400/30 bg-yellow-900/10'
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-blue-400" />
            Sacred Tech Interface
          </CardTitle>
          <p className="text-blue-200">Bridging Mysticism and Microchips</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-blue-200">Connected Systems</span>
                <span className="text-white font-bold">{connectedDevices.length}/4</span>
              </div>
              <Progress value={(connectedDevices.length / 4) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-blue-200">Security Level</span>
                <span className="text-white font-bold">{authenticationLevel}/3</span>
              </div>
              <Progress value={(authenticationLevel / 3) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authentication Panel */}
      <Card className="bg-black/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Fingerprint className="w-6 h-6 text-green-400" />
            Biometric Authentication Required
          </CardTitle>
          <p className="text-green-200">High-level rituals require multi-factor verification</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {authMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.id} className="flex items-center justify-between p-3 rounded-lg bg-green-900/10 border border-green-500/20">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-white font-medium">{method.name}</div>
                      <div className="text-green-300 text-sm">{method.description}</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => performAuthentication(method.id)}
                    disabled={method.completed}
                    className={method.completed ? 'bg-green-600' : 'bg-green-700 hover:bg-green-800'}
                  >
                    {method.completed ? 'Verified' : 'Authenticate'}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tech Systems */}
      <div className="grid gap-4">
        {techSystems.map((system) => {
          const Icon = system.icon;
          const isActive = system.status === 'connected' || system.status === 'authenticated' || system.status === 'active';
          
          return (
            <Card 
              key={system.id}
              className={`${getColorClasses(system.color, isActive)} transition-all duration-300`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${system.color}-600/20`}>
                      <Icon className={`w-5 h-5 text-${system.color}-400`} />
                    </div>
                    <div>
                      <div className="text-lg">{system.name}</div>
                      <div className="text-sm text-gray-300 font-normal">
                        {system.requirements}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(system.status)}>
                      {system.status.toUpperCase()}
                    </Badge>
                    {!isActive && system.id !== 'blockchain-ledger' && (
                      <Button
                        size="sm"
                        onClick={() => connectDevice(system.id)}
                        className={`bg-${system.color}-600 hover:bg-${system.color}-700`}
                      >
                        <Zap className="w-3 h-3 mr-2" />
                        Connect
                      </Button>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200 text-sm">{system.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {connectedDevices.length === 3 && authenticationLevel === 3 && (
        <Card className="bg-gradient-to-r from-gold-900/30 to-blue-900/30 border-gold-500/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gold-200">🔮 Sacred Tech Matrix Online! 🔮</h3>
              <p className="text-gold-300">
                All systems connected and authenticated. You now have access to the complete 
                sacred technology interface.
              </p>
              <Badge className="bg-gold-600/20 text-gold-200 text-lg px-4 py-2">
                FULL SYSTEM ACCESS GRANTED
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
