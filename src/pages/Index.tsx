
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scan, Star, User, ArrowRight } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 'palm-reading',
      name: 'Palm Reading',
      description: 'Discover your spiritual path through palmistry',
      icon: <Scan className="w-8 h-8" />,
      route: '/dashboard',
      color: 'from-purple-500 to-pink-500',
      available: true
    },
    {
      id: 'spiritual-guidance',
      name: 'Spiritual Guidance',
      description: 'Connect with your spiritual guides',
      icon: <Star className="w-8 h-8" />,
      route: '/pro',
      color: 'from-blue-500 to-indigo-500',
      available: true
    },
    {
      id: 'soul-travel',
      name: 'Soul Travel',
      description: 'Advanced astral projection techniques',
      icon: <User className="w-8 h-8" />,
      route: '/soul-travel',
      color: 'from-green-500 to-teal-500',
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Spiritual Mind
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your gateway to spiritual discovery and personal growth
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <Card 
              key={feature.id}
              className="relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(feature.route)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <CardHeader className="relative text-center pb-4">
                <div className={`mx-auto mb-4 p-4 rounded-full bg-gradient-to-br ${feature.color} text-white w-fit`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {feature.name}
                </CardTitle>
                <Badge className="w-fit mx-auto bg-green-100 text-green-800">
                  Available
                </Badge>
              </CardHeader>
              
              <CardContent className="relative text-center">
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                
                <Button 
                  className={`w-full bg-gradient-to-r ${feature.color} text-white hover:opacity-90 group-hover:scale-105 transition-transform`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(feature.route);
                  }}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Simple Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>Discover your spiritual path with advanced AI guidance</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
