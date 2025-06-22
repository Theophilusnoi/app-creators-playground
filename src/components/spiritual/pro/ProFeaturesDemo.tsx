
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crown, 
  Zap, 
  Shield, 
  MessageCircle, 
  Users, 
  Brain,
  Eye,
  Sparkles,
  Heart,
  Star,
  Flame,
  Wind,
  Globe,
  Phone,
  Calendar,
  Lock,
  Check
} from 'lucide-react';

interface ProFeaturesDemoProps {
  userProfile?: any;
}

export const ProFeaturesDemo: React.FC<ProFeaturesDemoProps> = ({ userProfile }) => {
  const [activeDemo, setActiveDemo] = useState('overview');
  const [demoSession, setDemoSession] = useState(false);

  const proFeatures = [
    {
      id: 'angelic-assistance',
      title: 'Advanced Angelic Assistance',
      icon: Sparkles,
      description: 'Direct communication with 72 angelic entities',
      details: [
        'Real-time angelic guidance sessions',
        'Personalized angel matching based on your needs',
        'Emergency spiritual intervention protocols',
        'Angelic protection shield activation',
        'Divine message interpretation services'
      ],
      demoAvailable: true
    },
    {
      id: 'quantum-tools',
      title: 'Quantum Spiritual Tools',
      icon: Brain,
      description: 'Advanced consciousness manipulation technologies',
      details: [
        'Quantum field meditation chambers',
        'Morphic resonance field tuning',
        'Timeline healing and parallel life integration',
        'Akashic records deep access protocols',
        'Quantum prayer network participation'
      ],
      demoAvailable: true
    },
    {
      id: 'emergency-support',
      title: '24/7 Emergency Spiritual Support',
      icon: Shield,
      description: 'Immediate intervention for spiritual crises',
      details: [
        'Psychic attack neutralization protocols',
        'Entity removal emergency services',
        'Spiritual marriage breaking assistance',
        'Curse and hex removal systems',
        'Emergency banishing ritual activation'
      ],
      demoAvailable: true
    },
    {
      id: 'guidance-sessions',
      title: 'Personal Guidance Sessions',
      icon: MessageCircle,
      description: 'One-on-one sessions with spiritual masters',
      details: [
        'Weekly 60-minute personal sessions',
        'Custom spiritual development plans',
        'Advanced chakra balancing techniques',
        'Kundalini awakening supervision',
        'Third eye activation acceleration'
      ],
      demoAvailable: true
    },
    {
      id: 'priority-access',
      title: 'Priority Community Access',
      icon: Users,
      description: 'Exclusive access to master-level practitioners',
      details: [
        'Private master-level discussion forums',
        'Early access to new spiritual technologies',
        'Exclusive group ritual participation',
        'Advanced practitioner networking',
        'Master class workshop invitations'
      ],
      demoAvailable: false
    }
  ];

  const startDemo = (featureId: string) => {
    setActiveDemo(featureId);
    setDemoSession(true);
  };

  const renderFeatureDemo = (feature: any) => {
    switch (feature.id) {
      case 'angelic-assistance':
        return (
          <div className="space-y-4">
            <div className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-purple-200 font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Live Angelic Connection Demo
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-purple-800/20 rounded">
                  <span className="text-purple-200">Archangel Michael</span>
                  <Badge className="bg-green-600/20 text-green-200">Available</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-800/20 rounded">
                  <span className="text-purple-200">Archangel Raphael</span>
                  <Badge className="bg-green-600/20 text-green-200">Available</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-800/20 rounded">
                  <span className="text-purple-200">Seraphina (Healing)</span>
                  <Badge className="bg-yellow-600/20 text-yellow-200">Busy</Badge>
                </div>
              </div>
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Connect with Available Angel
              </Button>
            </div>
          </div>
        );

      case 'quantum-tools':
        return (
          <div className="space-y-4">
            <div className="bg-indigo-900/30 p-6 rounded-lg border border-indigo-500/30">
              <h3 className="text-indigo-200 font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Quantum Consciousness Tools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-800/20 rounded-lg">
                  <h4 className="text-indigo-200 font-semibold mb-2">Timeline Healing</h4>
                  <p className="text-indigo-300 text-sm mb-3">Heal past-life traumas affecting your current existence</p>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    <Eye className="w-3 h-3 mr-2" />
                    Access Timeline
                  </Button>
                </div>
                <div className="p-4 bg-indigo-800/20 rounded-lg">
                  <h4 className="text-indigo-200 font-semibold mb-2">Morphic Field Tuning</h4>
                  <p className="text-indigo-300 text-sm mb-3">Adjust your resonance with collective consciousness</p>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    <Wind className="w-3 h-3 mr-2" />
                    Tune Frequency
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'emergency-support':
        return (
          <div className="space-y-4">
            <div className="bg-red-900/30 p-6 rounded-lg border border-red-500/30">
              <h3 className="text-red-200 font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Emergency Spiritual Response System
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-800/20 rounded flex items-center justify-between">
                  <div>
                    <span className="text-red-200 font-semibold">Psychic Attack Detection</span>
                    <p className="text-red-300 text-sm">AI monitors for negative energy patterns</p>
                  </div>
                  <Badge className="bg-green-600/20 text-green-200">Active</Badge>
                </div>
                <div className="p-3 bg-red-800/20 rounded flex items-center justify-between">
                  <div>
                    <span className="text-red-200 font-semibold">24/7 Hotline</span>
                    <p className="text-red-300 text-sm">Direct line to spiritual emergency team</p>
                  </div>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <Phone className="w-3 h-3 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'guidance-sessions':
        return (
          <div className="space-y-4">
            <div className="bg-amber-900/30 p-6 rounded-lg border border-amber-500/30">
              <h3 className="text-amber-200 font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Personal Spiritual Guidance
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-amber-800/20 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-amber-200 font-semibold">Master Chen Wei</span>
                    <Badge className="bg-green-600/20 text-green-200">Available Today</Badge>
                  </div>
                  <p className="text-amber-300 text-sm mb-3">Specializes in Kundalini awakening and chakra balancing</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                      <Calendar className="w-3 h-3 mr-2" />
                      Book Session
                    </Button>
                    <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-200">
                      View Profile
                    </Button>
                  </div>
                </div>
                <div className="p-4 bg-amber-800/20 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-amber-200 font-semibold">Sage Amara</span>
                    <Badge className="bg-yellow-600/20 text-yellow-200">Next Available: Tomorrow</Badge>
                  </div>
                  <p className="text-amber-300 text-sm mb-3">Expert in third eye activation and psychic development</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                      <Calendar className="w-3 h-3 mr-2" />
                      Schedule
                    </Button>
                    <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-200">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">Demo not available for this feature</p>
          </div>
        );
    }
  };

  if (activeDemo === 'overview') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Crown className="w-8 h-8 text-yellow-400" />
            Pro Tier: Complete Spiritual Mastery
          </h2>
          <p className="text-purple-200 text-lg">$49.99/month - Unlock the full power of spiritual consciousness</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.id} className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="bg-purple-600/20 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-lg">{feature.title}</div>
                      <div className="text-sm text-purple-300 font-normal">
                        {feature.description}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {feature.details.slice(0, 3).map((detail, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-purple-200">{detail}</span>
                      </div>
                    ))}
                    {feature.details.length > 3 && (
                      <p className="text-purple-300 text-xs">+{feature.details.length - 3} more features...</p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {feature.demoAvailable ? (
                      <Button 
                        onClick={() => startDemo(feature.id)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Try Demo
                      </Button>
                    ) : (
                      <Button disabled className="flex-1 bg-gray-600 cursor-not-allowed">
                        <Lock className="w-4 h-4 mr-2" />
                        Pro Only
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-500/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-white">Ready to Unlock Complete Spiritual Mastery?</h3>
              <p className="text-purple-200">Join thousands of advanced practitioners who have transformed their spiritual journey</p>
              <div className="flex justify-center gap-4">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro - $49.99/month
                </Button>
                <Button variant="outline" className="border-purple-500/30 text-purple-200">
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentFeature = proFeatures.find(f => f.id === activeDemo);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          onClick={() => setActiveDemo('overview')}
          variant="outline"
          className="border-purple-500/30 text-purple-200"
        >
          ← Back to Overview
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            {currentFeature && React.createElement(currentFeature.icon, { className: "w-6 h-6 text-purple-400" })}
            {currentFeature?.title} Demo
          </h2>
          <p className="text-purple-300">{currentFeature?.description}</p>
        </div>
      </div>

      {currentFeature && renderFeatureDemo(currentFeature)}

      <Card className="bg-yellow-900/20 border-yellow-500/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-3">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-200 font-semibold">Demo Limitation Notice</span>
          </div>
          <p className="text-yellow-300 text-sm">
            This is a preview of Pro features. Full functionality requires an active Pro subscription.
            Upgrade now to access all advanced spiritual technologies and personalized guidance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
