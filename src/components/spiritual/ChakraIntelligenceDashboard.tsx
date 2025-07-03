import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Circle, Zap, Heart, Eye, Crown } from 'lucide-react';

interface ChakraData {
  name: string;
  sanskrit: string;
  color: string;
  element: string;
  health: number;
  blockages: string[];
  recommendations: string[];
  angel: string;
  mantra: string;
  frequency: string;
}

const ChakraIntelligenceDashboard: React.FC = () => {
  const [chakras, setChakras] = useState<ChakraData[]>([
    {
      name: 'Root Chakra',
      sanskrit: 'Muladhara',
      color: 'red',
      element: 'Earth',
      health: 75,
      blockages: ['Financial insecurity', 'Family trauma'],
      recommendations: ['Grounding meditation', 'Red jasper crystal'],
      angel: 'Archangel Uriel',
      mantra: 'LAM',
      frequency: '396 Hz'
    },
    {
      name: 'Sacral Chakra',
      sanskrit: 'Svadhisthana',
      color: 'orange',
      element: 'Water',
      health: 60,
      blockages: ['Creative blocks', 'Relationship issues'],
      recommendations: ['Orange calcite', 'Hip-opening yoga'],
      angel: 'Archangel Gabriel',
      mantra: 'VAM',
      frequency: '417 Hz'
    },
    {
      name: 'Solar Plexus',
      sanskrit: 'Manipura',
      color: 'yellow',
      element: 'Fire',
      health: 85,
      blockages: ['Self-doubt'],
      recommendations: ['Citrine crystal', 'Core strengthening'],
      angel: 'Archangel Michael',
      mantra: 'RAM',
      frequency: '528 Hz'
    },
    {
      name: 'Heart Chakra',
      sanskrit: 'Anahata',
      color: 'green',
      element: 'Air',
      health: 90,
      blockages: [],
      recommendations: ['Rose quartz', 'Loving-kindness meditation'],
      angel: 'Archangel Raphael',
      mantra: 'YAM',
      frequency: '639 Hz'
    },
    {
      name: 'Throat Chakra',
      sanskrit: 'Vishuddha',
      color: 'blue',
      element: 'Sound',
      health: 70,
      blockages: ['Fear of speaking truth'],
      recommendations: ['Blue lace agate', 'Chanting practice'],
      angel: 'Archangel Gabriel',
      mantra: 'HAM',
      frequency: '741 Hz'
    },
    {
      name: 'Third Eye',
      sanskrit: 'Ajna',
      color: 'indigo',
      element: 'Light',
      health: 80,
      blockages: ['Mental fog'],
      recommendations: ['Amethyst crystal', 'Meditation'],
      angel: 'Archangel Raziel',
      mantra: 'OM',
      frequency: '852 Hz'
    },
    {
      name: 'Crown Chakra',
      sanskrit: 'Sahasrara',
      color: 'violet',
      element: 'Thought',
      health: 65,
      blockages: ['Spiritual disconnection'],
      recommendations: ['Clear quartz', 'Silent meditation'],
      angel: 'Archangel Metatron',
      mantra: 'AH',
      frequency: '963 Hz'
    }
  ]);

  const getChakraIcon = (index: number) => {
    const icons = [Circle, Circle, Circle, Heart, Circle, Eye, Crown];
    const IconComponent = icons[index];
    return <IconComponent className="w-6 h-6" />;
  };

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-400';
    if (health >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthStatus = (health: number) => {
    if (health >= 80) return 'Balanced';
    if (health >= 60) return 'Needs Attention';
    return 'Blocked';
  };

  const playChakraFrequency = (frequency: string) => {
    // Placeholder for audio functionality
    console.log(`Playing ${frequency} healing frequency`);
  };

  const overallBalance = Math.round(chakras.reduce((sum, chakra) => sum + chakra.health, 0) / chakras.length);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Overall Balance */}
      <Card className="border-2 border-purple-300/50 shadow-2xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
          <CardTitle className="text-center text-2xl">
            ⚡ Chakra Intelligence Dashboard
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-purple-200">Overall Energy Balance</h3>
              <div className="text-6xl">🧘‍♂️</div>
              <div className="space-y-2">
                <div className="flex justify-between text-purple-400">
                  <span>System Balance</span>
                  <span>{overallBalance}%</span>
                </div>
                <Progress value={overallBalance} className="h-4" />
              </div>
              <p className={`text-lg font-semibold ${getHealthColor(overallBalance)}`}>
                {getHealthStatus(overallBalance)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Chakras */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chakras.map((chakra, index) => (
          <Card 
            key={index}
            className="border-2 border-white/20 shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
          >
            <CardHeader className={`bg-gradient-to-r from-${chakra.color}-600 to-${chakra.color}-700 text-white`}>
              <CardTitle className="flex items-center gap-3 text-lg">
                {getChakraIcon(index)}
                {chakra.name}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6 space-y-4">
              {/* Chakra Info */}
              <div className="space-y-2">
                <p className="text-purple-200 font-semibold">{chakra.sanskrit}</p>
                <p className="text-purple-300 text-sm">Element: {chakra.element}</p>
              </div>

              {/* Health Status */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-purple-400">Health</span>
                  <span className={getHealthColor(chakra.health)}>{chakra.health}%</span>
                </div>
                <Progress value={chakra.health} className="h-2" />
                <p className={`text-sm font-semibold ${getHealthColor(chakra.health)}`}>
                  {getHealthStatus(chakra.health)}
                </p>
              </div>

              {/* Blockages */}
              {chakra.blockages.length > 0 && (
                <div className="space-y-2">
                  <p className="text-red-400 font-semibold text-sm">Blockages:</p>
                  {chakra.blockages.map((blockage, i) => (
                    <Badge key={i} variant="destructive" className="text-xs mr-1 mb-1">
                      {blockage}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Healing Info */}
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-purple-300 font-semibold">Angel:</p>
                  <p className="text-purple-200">{chakra.angel}</p>
                </div>
                
                <div>
                  <p className="text-purple-300 font-semibold">Mantra:</p>
                  <p className="text-purple-200 font-mono">{chakra.mantra}</p>
                </div>
                
                <div>
                  <p className="text-purple-300 font-semibold">Frequency:</p>
                  <p className="text-purple-200">{chakra.frequency}</p>
                </div>
              </div>

              {/* Recommendations */}
              <div className="space-y-2">
                <p className="text-green-400 font-semibold text-sm">Recommendations:</p>
                {chakra.recommendations.map((rec, i) => (
                  <Badge key={i} variant="secondary" className="text-xs mr-1 mb-1 bg-green-600/20 text-green-300">
                    {rec}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-4">
                <Button 
                  onClick={() => playChakraFrequency(chakra.frequency)}
                  variant="outline"
                  size="sm"
                  className="w-full text-purple-200 border-purple-400 hover:bg-purple-600/20"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Play Healing Frequency
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Healing Recommendations */}
      <Card className="border-2 border-green-300/50 shadow-2xl bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
          <CardTitle className="text-xl">🌿 Daily Chakra Healing Plan</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-200">Morning Ritual</h4>
              <ul className="space-y-2 text-green-300">
                <li>• 5-min grounding meditation (Root)</li>
                <li>• Heart opening breathwork (Heart)</li>
                <li>• Gratitude journaling (Crown)</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-200">Evening Practice</h4>
              <ul className="space-y-2 text-green-300">
                <li>• Chakra frequency meditation</li>
                <li>• Crystal grid activation</li>
                <li>• Angel invocation prayer</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 px-8">
              Start Daily Healing Routine
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChakraIntelligenceDashboard;