
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TelekinesisGym } from './TelekinesisGym';
import { SacredTechInterface } from './SacredTechInterface';
import { NeuroFeedbackHub } from './NeuroFeedbackHub';
import { UniversalProtectionFormula } from './UniversalProtectionFormula';
import { SevenLayerProtection } from './SevenLayerProtection';
import { ThirdEyeTracker } from './ThirdEyeTracker';
import SoulTravelDashboard from './SoulTravelDashboard';
import { 
  Crown, 
  Zap, 
  Shield, 
  Brain, 
  Eye, 
  Sparkles,
  Lock,
  Unlock,
  Star
} from 'lucide-react';

interface ProFeaturesDemoProps {
  userProfile?: any;
  className?: string;
}

export const ProFeaturesDemo: React.FC<ProFeaturesDemoProps> = ({ 
  userProfile, 
  className = "" 
}) => {
  const [activeFeature, setActiveFeature] = useState('overview');
  const [unlockedFeatures, setUnlockedFeatures] = useState<string[]>([
    'soul-travel', 'telekinesis', 'protection', 'third-eye'
  ]);

  const proFeatures = [
    {
      id: 'soul-travel',
      name: 'Soul Travel Academy',
      icon: <Sparkles className="w-5 h-5" />,
      tier: 'Pro',
      description: 'Master conscious out-of-body experiences with structured training and verification',
      component: SoulTravelDashboard,
      benefits: [
        'Scientific astral projection techniques',
        'Safety protocols and emergency tools',
        'Objective verification challenges',
        'Progress tracking and analytics'
      ],
      unlocked: true
    },
    {
      id: 'telekinesis',
      name: 'Telekinesis Gym',
      icon: <Zap className="w-5 h-5" />,
      tier: 'Pro',
      description: 'Develop psychokinetic abilities through scientific training methods',
      component: TelekinesisGym,
      benefits: [
        'Progressive skill development',
        'Micro to macro object manipulation',
        'Consciousness-matter interface',
        'Ethical guidelines and safety'
      ],
      unlocked: true
    },
    {
      id: 'protection',
      name: 'Universal Protection System',
      icon: <Shield className="w-5 h-5" />,
      tier: 'Pro',
      description: 'Multi-layered spiritual protection against all forms of negative energy',
      component: UniversalProtectionFormula,
      benefits: [
        'Seven-layer protection matrix',
        'Automatic threat detection',
        'Energy signature analysis',
        'Emergency response protocols'
      ],
      unlocked: true
    },
    {
      id: 'neurofeedback',
      name: 'Consciousness Optimization',
      icon: <Brain className="w-5 h-5" />,
      tier: 'Pro',
      description: 'Advanced biofeedback for optimal spiritual states',
      component: NeuroFeedbackHub,
      benefits: [
        'Real-time consciousness monitoring',
        'Optimal state achievement',
        'Personalized training programs',
        'Scientific validation methods'
      ],
      unlocked: false
    },
    {
      id: 'third-eye',
      name: 'Third Eye Mastery',
      icon: <Eye className="w-5 h-5" />,
      tier: 'Pro',
      description: 'Systematic third eye activation and enhancement tracking',
      component: ThirdEyeTracker,
      benefits: [
        'Safe activation protocols',
        'Progress measurement tools',
        'Vision enhancement exercises',
        'Psychic development tracking'
      ],
      unlocked: true
    },
    {
      id: 'sacred-tech',
      name: 'Sacred Technology Interface',
      icon: <Star className="w-5 h-5" />,
      tier: 'Ether',
      description: 'Bridge ancient wisdom with quantum consciousness technology',
      component: SacredTechInterface,
      benefits: [
        'Quantum field manipulation',
        'Sacred geometry integration',
        'Consciousness amplification',
        'Reality modification tools'
      ],
      unlocked: false
    }
  ];

  const isFeatureUnlocked = (featureId: string) => {
    return unlockedFeatures.includes(featureId);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Pro': return 'bg-purple-500/20 text-purple-200 border-purple-500/30';
      case 'Ether': return 'bg-cyan-500/20 text-cyan-200 border-cyan-500/30';
      case 'Fire': return 'bg-orange-500/20 text-orange-200 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-200 border-gray-500/30';
    }
  };

  const handleFeatureSelect = (featureId: string) => {
    setActiveFeature(featureId);
  };

  const selectedFeature = proFeatures.find(f => f.id === activeFeature);
  const SelectedComponent = selectedFeature?.component;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Feature Overview */}
      {activeFeature === 'overview' && (
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-3">
                <Crown className="w-8 h-8 text-yellow-400" />
                SpiritualMind Pro Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-200 mb-6">
                Advanced consciousness technologies for serious spiritual practitioners. Each feature represents 
                years of research and development in consciousness science and spiritual mastery.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {proFeatures.map((feature) => {
                  const unlocked = isFeatureUnlocked(feature.id);
                  
                  return (
                    <Card 
                      key={feature.id}
                      className={`
                        cursor-pointer transition-all border
                        ${unlocked 
                          ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                          : 'bg-gray-800/30 border-gray-600/30'
                        }
                      `}
                      onClick={() => unlocked && handleFeatureSelect(feature.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`
                              ${unlocked ? 'text-purple-400' : 'text-gray-500'}
                            `}>
                              {feature.icon}
                            </div>
                            <div>
                              <h4 className={`font-semibold ${unlocked ? 'text-white' : 'text-gray-400'}`}>
                                {feature.name}
                              </h4>
                              <Badge className={getTierColor(feature.tier)}>
                                {feature.tier}
                              </Badge>
                            </div>
                          </div>
                          <div className={unlocked ? 'text-green-400' : 'text-gray-500'}>
                            {unlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          </div>
                        </div>
                        
                        <p className={`text-sm mb-3 ${unlocked ? 'text-purple-200' : 'text-gray-500'}`}>
                          {feature.description}
                        </p>
                        
                        <div className="space-y-1">
                          {feature.benefits.slice(0, 2).map((benefit, index) => (
                            <div key={index} className={`text-xs flex items-center gap-2 ${unlocked ? 'text-purple-300' : 'text-gray-600'}`}>
                              <span className={unlocked ? 'text-purple-400' : 'text-gray-600'}>•</span>
                              {benefit}
                            </div>
                          ))}
                        </div>
                        
                        {unlocked && (
                          <Button 
                            className="w-full mt-3 bg-purple-600 hover:bg-purple-700"
                            size="sm"
                          >
                            Explore Feature
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">What Makes Pro Features Special?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Scientific Approach</h4>
                  <ul className="space-y-1 text-purple-200 text-sm">
                    <li>• Evidence-based methodologies</li>
                    <li>• Measurable progress tracking</li>
                    <li>• Objective verification systems</li>
                    <li>• Safety protocols and guidelines</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Advanced Technology</h4>
                  <ul className="space-y-1 text-purple-200 text-sm">
                    <li>• Consciousness monitoring systems</li>
                    <li>• AI-powered personalization</li>
                    <li>• Real-time feedback mechanisms</li>
                    <li>• Quantum field interfaces</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Selected Feature Display */}
      {selectedFeature && activeFeature !== 'overview' && (
        <div className="space-y-6">
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-3">
                  {selectedFeature.icon}
                  {selectedFeature.name}
                  <Badge className={getTierColor(selectedFeature.tier)}>
                    {selectedFeature.tier}
                  </Badge>
                </CardTitle>
                <Button 
                  onClick={() => setActiveFeature('overview')}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/30 text-purple-200 hover:bg-purple-500/20"
                >
                  Back to Overview
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-purple-200 mb-4">{selectedFeature.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedFeature.benefits.map((benefit, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="text-purple-300 text-xs">{benefit}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Feature Component */}
          {SelectedComponent && (
            <div className="min-h-[600px]">
              <SelectedComponent 
                userId={userProfile?.id || 'demo'}
                className="w-full"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
