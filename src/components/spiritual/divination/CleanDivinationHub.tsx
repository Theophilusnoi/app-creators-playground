
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PalmReader } from './PalmReader';
import { TarotReader } from './TarotReader';
import { Hand, Star, Eye, Sparkles } from 'lucide-react';

const divination_tools = [
  {
    id: 'palm',
    name: 'Palm Reading',
    description: 'Discover your spiritual path through palmistry',
    icon: <Hand className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    available: true
  },
  {
    id: 'tarot',
    name: 'Tarot Cards',
    description: 'Reveal insights through sacred tarot',
    icon: <Star className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-500',
    available: true
  },
  {
    id: 'crystal',
    name: 'Crystal Gazing',
    description: 'See visions through crystal meditation',
    icon: <Eye className="w-6 h-6" />,
    color: 'from-green-500 to-teal-500',
    available: false
  },
  {
    id: 'numerology',
    name: 'Numerology',
    description: 'Understand your numbers and destiny',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500',
    available: false
  }
];

export const CleanDivinationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  if (activeTab === 'palm') {
    return (
      <div className="space-y-4">
        <Button 
          onClick={() => setActiveTab(null)}
          variant="outline"
          className="mb-4"
        >
          ← Back to Divination Tools
        </Button>
        <PalmReader />
      </div>
    );
  }

  if (activeTab === 'tarot') {
    return (
      <div className="space-y-4">
        <Button 
          onClick={() => setActiveTab(null)}
          variant="outline"
          className="mb-4"
        >
          ← Back to Divination Tools
        </Button>
        <TarotReader />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-800 mb-3">
          Sacred Divination Tools
        </h1>
        <p className="text-gray-600 text-lg">
          Unlock the mysteries of your spiritual path
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {divination_tools.map((tool) => (
          <Card 
            key={tool.id}
            className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg ${
              tool.available 
                ? 'hover:border-purple-300 cursor-pointer' 
                : 'opacity-60 cursor-not-allowed'
            }`}
            onClick={() => tool.available && setActiveTab(tool.id)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-5`} />
            
            <CardHeader className="relative">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${tool.color} text-white`}>
                    {tool.icon}
                  </div>
                  <span className="text-xl font-bold">{tool.name}</span>
                </div>
                {tool.available ? (
                  <Badge className="bg-green-100 text-green-800">Available</Badge>
                ) : (
                  <Badge variant="secondary">Coming Soon</Badge>
                )}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative">
              <p className="text-gray-600 mb-4">{tool.description}</p>
              
              {tool.available ? (
                <Button 
                  className={`w-full bg-gradient-to-r ${tool.color} text-white hover:opacity-90`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab(tool.id);
                  }}
                >
                  Begin Reading
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  variant="outline" 
                  disabled
                >
                  Coming Soon
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">
          Why Choose Our Divination Tools?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-purple-700 mb-2">Accurate Readings</h3>
            <p className="text-sm text-gray-600">
              Advanced AI combined with ancient wisdom for precise insights
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-purple-700 mb-2">Spiritual Guidance</h3>
            <p className="text-sm text-gray-600">
              Receive divine guidance tailored to your spiritual journey
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-purple-700 mb-2">Sacred Privacy</h3>
            <p className="text-sm text-gray-600">
              Your readings are private and handled with utmost respect
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
