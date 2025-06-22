
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Globe, 
  Eye, 
  Volume2, 
  Zap,
  Shield,
  Heart
} from 'lucide-react';

interface CulturalFrameworksProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
}

export const CulturalFrameworks: React.FC<CulturalFrameworksProps> = ({ 
  userProfile, 
  setUserProfile 
}) => {
  const { toast } = useToast();
  const [selectedTradition, setSelectedTradition] = useState('egyptian');
  const [practiceActive, setPracticeActive] = useState(false);

  const traditions = {
    egyptian: {
      name: 'Egyptian Ka Energy',
      technique: 'Object charging via hieroglyphic focus',
      adaptation: 'AR temple holograms + resonance chanting',
      icon: Eye,
      color: 'bg-yellow-600/20 text-yellow-200 border-yellow-500/30',
      description: 'Ancient Ka energy manipulation through sacred symbols',
      lineageVerified: true,
      attributionActive: true
    },
    buddhist: {
      name: 'Buddhist Siddhis',
      technique: 'Mantra-based energy projection',
      adaptation: 'EEG-triggered OM VAJRA soundscapes',
      icon: Volume2,
      color: 'bg-orange-600/20 text-orange-200 border-orange-500/30',
      description: 'Mindfulness-based supernatural abilities development',
      lineageVerified: true,
      attributionActive: true
    },
    yoruba: {
      name: 'Yoruba Ase Power',
      technique: 'Drum-rhythm synchronized intention',
      adaptation: 'App-connected batá drum patterns',
      icon: Zap,
      color: 'bg-green-600/20 text-green-200 border-green-500/30',
      description: 'Life force energy cultivation through sacred rhythms',
      lineageVerified: true,
      attributionActive: true
    }
  };

  const startPractice = () => {
    const tradition = traditions[selectedTradition as keyof typeof traditions];
    if (!tradition.lineageVerified) {
      toast({
        title: "Lineage Verification Required",
        description: "This practice requires cultural authorization",
        variant: "destructive",
      });
      return;
    }
    
    setPracticeActive(true);
    toast({
      title: `${tradition.name} Practice Started`,
      description: tradition.adaptation,
    });
  };

  const stopPractice = () => {
    setPracticeActive(false);
    toast({
      title: "Practice Complete",
      description: "Cultural respect protocols maintained",
    });
  };

  const currentTradition = traditions[selectedTradition as keyof typeof traditions];
  const Icon = currentTradition.icon;

  return (
    <div className="space-y-6">
      {/* Cultural Ethics Banner */}
      <Card className="bg-blue-900/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-200 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Cultural Integrity Protocols
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-blue-200">
              <Heart className="w-4 h-4 text-blue-400" />
              <span>Closed traditions require lineage verification</span>
            </div>
            <div className="flex items-center gap-2 text-blue-200">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>15% revenue shared with wisdom keepers</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tradition Selection */}
      <Card className="bg-purple-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-200 flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Cultural Frameworks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(traditions).map(([key, tradition]) => {
            const TraditionIcon = tradition.icon;
            return (
              <div 
                key={key}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedTradition === key 
                    ? 'bg-purple-800/30 border-purple-400/50' 
                    : 'bg-gray-800/20 border-gray-600/30 hover:bg-gray-800/30'
                }`}
                onClick={() => setSelectedTradition(key)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tradition.color}`}>
                      <TraditionIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-purple-100 font-semibold">{tradition.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    {tradition.lineageVerified && (
                      <Badge className="bg-green-600/20 text-green-200">
                        Verified
                      </Badge>
                    )}
                    {tradition.attributionActive && (
                      <Badge className="bg-blue-600/20 text-blue-200">
                        Attribution Active
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-purple-300 text-sm mb-2">{tradition.description}</p>
                
                <div className="space-y-1 text-xs">
                  <div className="text-purple-400">
                    <strong>Traditional:</strong> {tradition.technique}
                  </div>
                  <div className="text-purple-400">
                    <strong>Modern:</strong> {tradition.adaptation}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Active Practice */}
      <Card className={`${currentTradition.color} border`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="w-6 h-6" />
            {currentTradition.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm opacity-90">{currentTradition.description}</p>
          
          <div className="bg-black/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Modern Adaptation:</h4>
            <p className="text-sm opacity-90">{currentTradition.adaptation}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={practiceActive ? stopPractice : startPractice}
              className={`${
                practiceActive 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {practiceActive ? 'Stop Practice' : 'Begin Practice'}
            </Button>
            
            {practiceActive && (
              <Badge className="bg-green-600/20 text-green-200">
                Session Active
              </Badge>
            )}
          </div>
          
          {practiceActive && selectedTradition === 'egyptian' && (
            <div className="bg-yellow-800/20 p-4 rounded-lg border border-yellow-600/30">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-200 font-semibold">AR Temple Visualization</span>
              </div>
              <p className="text-yellow-300 text-sm">
                Sacred hieroglyphs are manifesting around your practice space
              </p>
            </div>
          )}
          
          {practiceActive && selectedTradition === 'buddhist' && (
            <div className="bg-orange-800/20 p-4 rounded-lg border border-orange-600/30">
              <div className="flex items-center gap-2 mb-2">
                <Volume2 className="w-5 h-5 text-orange-400" />
                <span className="text-orange-200 font-semibold">EEG-Triggered Mantras</span>
              </div>
              <p className="text-orange-300 text-sm">
                OM VAJRA soundscape adapting to your brainwave patterns
              </p>
            </div>
          )}
          
          {practiceActive && selectedTradition === 'yoruba' && (
            <div className="bg-green-800/20 p-4 rounded-lg border border-green-600/30">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-green-400" />
                <span className="text-green-200 font-semibold">Batá Drum Synchronization</span>
              </div>
              <p className="text-green-300 text-sm">
                Sacred rhythms aligning with your intention frequency
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
