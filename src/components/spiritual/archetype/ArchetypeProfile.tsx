
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Crown, Star, Shield, Heart, Flame, Mountain } from "lucide-react";
import { SoulArchetype } from '@/types/archetype';

interface ArchetypeProfileProps {
  primaryArchetype: SoulArchetype;
  secondaryArchetype?: SoulArchetype;
  spiritualMaturity: number;
  onStartGrowthPath: () => void;
}

export const ArchetypeProfile: React.FC<ArchetypeProfileProps> = ({
  primaryArchetype,
  secondaryArchetype,
  spiritualMaturity,
  onStartGrowthPath
}) => {
  const getElementIcon = (element: string) => {
    switch (element) {
      case 'fire': return <Flame className="w-5 h-5" />;
      case 'water': return <Heart className="w-5 h-5" />;
      case 'earth': return <Mountain className="w-5 h-5" />;
      case 'air': return <Star className="w-5 h-5" />;
      case 'ether': return <Crown className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  const getElementColor = (element: string) => {
    switch (element) {
      case 'fire': return 'from-red-600 to-orange-500';
      case 'water': return 'from-blue-600 to-cyan-500';
      case 'earth': return 'from-green-600 to-amber-600';
      case 'air': return 'from-purple-600 to-pink-500';
      case 'ether': return 'from-indigo-600 to-purple-600';
      default: return 'from-gray-600 to-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Primary Archetype */}
      <Card className={`bg-gradient-to-br ${getElementColor(primaryArchetype.element)} border-none shadow-2xl`}>
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            {getElementIcon(primaryArchetype.element)}
            <div>
              <h2 className="text-2xl font-bold">{primaryArchetype.name}</h2>
              <p className="text-lg opacity-90">{primaryArchetype.tradition} Tradition</p>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-white text-lg">{primaryArchetype.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">Sacred Attributes</h4>
                <div className="flex flex-wrap gap-2">
                  {primaryArchetype.attributes.map((attr, index) => (
                    <Badge key={index} className="bg-white/20 text-white border-white/30">
                      {attr}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">Spiritual Gifts</h4>
                <div className="space-y-1">
                  {primaryArchetype.gifts.map((gift, index) => (
                    <div key={index} className="flex items-center gap-2 text-white">
                      <Star className="w-4 h-4" />
                      <span>{gift}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">Sacred Colors</h4>
                <div className="flex gap-2">
                  {primaryArchetype.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-white/50"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">Shadow Work</h4>
                <div className="space-y-1">
                  {primaryArchetype.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/80">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Archetype */}
      {secondaryArchetype && (
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              {getElementIcon(secondaryArchetype.element)}
              <div>
                <h3 className="text-xl">Secondary Archetype: {secondaryArchetype.name}</h3>
                <p className="text-purple-200">{secondaryArchetype.tradition} Tradition</p>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <p className="text-purple-100 mb-4">{secondaryArchetype.description}</p>
            <div className="flex flex-wrap gap-2">
              {secondaryArchetype.attributes.slice(0, 4).map((attr, index) => (
                <Badge key={index} variant="outline" className="border-purple-400 text-purple-200">
                  {attr}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Spiritual Maturity */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Spiritual Development Path</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-purple-200 mb-2">
              <span>Spiritual Maturity</span>
              <span>{spiritualMaturity}%</span>
            </div>
            <Progress value={spiritualMaturity} className="w-full" />
          </div>
          
          <div className="text-purple-100">
            <p className="mb-4">
              Your soul archetype provides a framework for understanding your spiritual gifts and challenges. 
              Through dedicated practice and shadow work, you can unlock deeper levels of your archetypal power.
            </p>
            
            <Button 
              onClick={onStartGrowthPath}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Begin Archetypal Growth Path
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
