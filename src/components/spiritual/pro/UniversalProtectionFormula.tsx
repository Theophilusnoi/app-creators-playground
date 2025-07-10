
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Zap, 
  Star, 
  Globe, 
  Brain, 
  Eye, 
  Clock,
  Activity,
  Sparkles,
  Crown,
  Target,
  Flame
} from 'lucide-react';
import { SevenLayerProtection } from './SevenLayerProtection';
import { ThreatResponseSystem } from './ThreatResponseSystem';
import { DailyProtocols } from './DailyProtocols';
import { SacredTechInterface } from './SacredTechInterface';
import { ProtectionMetrics } from './ProtectionMetrics';
import { QuantumShieldActivation } from './QuantumShieldActivation';

interface UniversalProtectionFormulaProps {
  userProfile?: any;
  setUserProfile?: (profile: any) => void;
}

export const UniversalProtectionFormula: React.FC<UniversalProtectionFormulaProps> = ({
  userProfile,
  setUserProfile
}) => {
  const [activeSystem, setActiveSystem] = useState('overview');
  const [protectionLevel, setProtectionLevel] = useState(0);
  const [quantumShieldActive, setQuantumShieldActive] = useState(false);
  const [threatLevel, setThreatLevel] = useState(0);
  const [auricIntegrity, setAuricIntegrity] = useState(85);

  useEffect(() => {
    // Simulate real-time protection monitoring
    const monitoringInterval = setInterval(() => {
      setAuricIntegrity(prev => Math.min(100, prev + Math.random() * 2 - 1));
      setThreatLevel(Math.floor(Math.random() * 4));
    }, 5000);

    return () => clearInterval(monitoringInterval);
  }, []);

  const protectionSystems = [
    {
      id: 'seven-layer',
      title: 'Seven-Layer Architecture',
      icon: Shield,
      description: '5,000 years of magical wisdom',
      component: SevenLayerProtection,
      status: quantumShieldActive ? 'active' : 'standby'
    },
    {
      id: 'threat-response',
      title: 'Active Threat Response',
      icon: Zap,
      description: 'AI Seraphina Real-Time Defense',
      component: ThreatResponseSystem,
      status: 'monitoring'
    },
    {
      id: 'daily-protocols',
      title: 'Daily Protection Protocols',
      icon: Clock,
      description: 'Personalized by Birth Chart',
      component: DailyProtocols,
      status: 'scheduled'
    },
    {
      id: 'sacred-tech',
      title: 'Sacred Tech Interface',
      icon: Brain,
      description: 'Mysticism meets Microchips',
      component: SacredTechInterface,
      status: 'online'
    },
    {
      id: 'metrics',
      title: 'Protection Metrics',
      icon: Activity,
      description: 'Quantified Spiritual Security',
      component: ProtectionMetrics,
      status: 'analyzing'
    },
    {
      id: 'activation',
      title: 'Quantum Shield Setup',
      icon: Star,
      description: '7-Minute Installation',
      component: QuantumShieldActivation,
      status: quantumShieldActive ? 'complete' : 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600/20 text-green-200 border-green-500/30';
      case 'monitoring': return 'bg-blue-600/20 text-blue-200 border-blue-500/30';
      case 'online': return 'bg-purple-600/20 text-purple-200 border-purple-500/30';
      case 'complete': return 'bg-gold-600/20 text-yellow-200 border-yellow-500/30';
      default: return 'bg-gray-600/20 text-gray-200 border-gray-500/30';
    }
  };

  if (activeSystem === 'overview') {
    return (
      <div className="space-y-6">
        {/* Header Dashboard */}
        <Card className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3 text-2xl">
              <Crown className="w-8 h-8 text-gold-400" />
              Universal Protection Formula
              <Sparkles className="w-6 h-6 text-purple-400" />
            </CardTitle>
            <p className="text-purple-200">
              🔮 Integrating the 7 Pillars of Ancient Magic into AI-Guided Defense Systems
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-purple-200">Auric Integrity</span>
                  <span className="text-white font-bold">{Math.round(auricIntegrity)}%</span>
                </div>
                <Progress value={auricIntegrity} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-purple-200">Quantum Shield</span>
                  <Badge className={quantumShieldActive ? 'bg-green-600/20 text-green-200' : 'bg-red-600/20 text-red-200'}>
                    {quantumShieldActive ? 'ACTIVE' : 'INACTIVE'}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-purple-200">Threat Level</span>
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded ${
                          i < threatLevel ? 'bg-red-500' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Protection Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {protectionSystems.map((system) => {
            const Icon = system.icon;
            
            const handleSystemClick = () => {
              setActiveSystem(system.id);
              // Add visual feedback for button activation
              if (system.id === 'activation' && !quantumShieldActive) {
                setQuantumShieldActive(true);
                setProtectionLevel(100);
              }
            };

            return (
              <Card 
                key={system.id}
                className="bg-black/30 border-purple-500/30 backdrop-blur-sm hover:bg-black/40 hover:border-purple-400/50 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                onClick={handleSystemClick}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="bg-purple-600/20 p-3 rounded-lg hover:bg-purple-600/30 transition-colors">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-lg">{system.title}</div>
                      <div className="text-sm text-purple-300 font-normal">
                        {system.description}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(system.status)}>
                      {system.status.toUpperCase()}
                    </Badge>
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSystemClick();
                      }}
                    >
                      <Target className="w-3 h-3 mr-2" />
                      Access
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <Card className="bg-gradient-to-r from-gold-900/20 to-purple-900/20 border-gold-500/30">
          <CardHeader>
            <CardTitle className="text-gold-200 flex items-center gap-2">
              <Flame className="w-5 h-5" />
              Why This Revolutionizes Spiritual Protection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="text-gold-200">✨ <strong>Precision Defense:</strong> Targeted threat-specific protocols</div>
                <div className="text-gold-200">🧬 <strong>Ancestral AI:</strong> Machine learning applied to genetic protection patterns</div>
                <div className="text-gold-200">⚖️ <strong>Ethical Enforcement:</strong> Hardcoded prevention of dark magic misuse</div>
              </div>
              <div className="space-y-2">
                <div className="text-gold-200">📊 <strong>Measurable Results:</strong> Quantifiable auric integrity scores</div>
                <div className="text-gold-200">🌍 <strong>Cross-Tradition:</strong> 12 protection lineages unified</div>
                <div className="text-gold-200">⚡ <strong>Quantum Integration:</strong> 5,000 years distilled into 7 minutes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentSystem = protectionSystems.find(s => s.id === activeSystem);
  const SystemComponent = currentSystem?.component;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          onClick={() => setActiveSystem('overview')}
          variant="outline"
          className="border-purple-500/30 text-purple-200"
        >
          ← Back to Overview
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            {currentSystem && React.createElement(currentSystem.icon, { className: "w-6 h-6 text-purple-400" })}
            {currentSystem?.title}
          </h2>
          <p className="text-purple-300">{currentSystem?.description}</p>
        </div>
      </div>

      {SystemComponent && (
        <SystemComponent 
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          quantumShieldActive={quantumShieldActive}
          setQuantumShieldActive={setQuantumShieldActive}
          auricIntegrity={auricIntegrity}
          threatLevel={threatLevel}
        />
      )}
    </div>
  );
};
