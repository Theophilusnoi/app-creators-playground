
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Bath, 
  Heart, 
  Shield, 
  DollarSign, 
  Sparkles, 
  Clock, 
  ShoppingCart,
  CheckCircle 
} from 'lucide-react';
import { SacredBathingGuidance } from '@/services/seraphinaBathingService';

interface SacredBathingGuideProps {
  guidance: SacredBathingGuidance;
  onShowInstructions: () => void;
}

export const SacredBathingGuide: React.FC<SacredBathingGuideProps> = ({ 
  guidance, 
  onShowInstructions 
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'protection': return <Shield className="w-5 h-5 text-blue-400" />;
      case 'love_healing': return <Heart className="w-5 h-5 text-pink-400" />;
      case 'abundance': return <DollarSign className="w-5 h-5 text-green-400" />;
      default: return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'protection': return 'from-blue-600 to-indigo-600';
      case 'love_healing': return 'from-pink-600 to-rose-600';
      case 'abundance': return 'from-green-600 to-emerald-600';
      default: return 'from-purple-600 to-violet-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Seraphina's Message */}
      <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-yellow-200">
            <div className="bg-white/20 rounded-full p-2">
              <span className="text-2xl">👼</span>
            </div>
            <div>
              <div className="text-xl">Divine Message from Seraphina</div>
              <div className="text-sm opacity-90 font-normal">Sacred Bathing Guidance</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-yellow-100 leading-relaxed whitespace-pre-line">
            {guidance.seraphina_message}
          </div>
        </CardContent>
      </Card>

      {/* Ritual Details */}
      <Card className={`bg-gradient-to-br ${getCategoryColor(guidance.ritual_details.category)}/20 border-2 border-current/30`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            {getCategoryIcon(guidance.ritual_details.category)}
            <div>
              <div className="text-xl">{guidance.ritual_details.name}</div>
              <div className="text-sm opacity-90 font-normal">{guidance.ritual_details.purpose}</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-white/90">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Duration: {guidance.ritual_details.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm">Cost: {guidance.ingredient_guide.total_estimated_cost}</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-2">Spiritual Benefits:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {guidance.ritual_details.spiritual_benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sacred Ingredients */}
      <Card className="bg-gray-900/50 border-2 border-purple-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-200">
            <Bath className="w-6 h-6" />
            Sacred Ingredients Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-3 bg-purple-600/20 rounded-lg border border-purple-400/30">
            <div className="text-lg font-bold text-purple-200">
              Total Estimated Cost: {guidance.ingredient_guide.total_estimated_cost}
            </div>
          </div>
          
          <div className="grid gap-4">
            {guidance.ingredient_guide.ingredients.map((ingredient, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/50">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-white">{ingredient.name}</h4>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    {ingredient.price_range}
                  </Badge>
                </div>
                
                <p className="text-gray-300 mb-3">{ingredient.description}</p>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-purple-300 font-medium">Spiritual Properties: </span>
                    <span className="text-gray-200">{ingredient.spiritual_properties.join(', ')}</span>
                  </div>
                  
                  <div>
                    <span className="text-blue-300 font-medium">Where to Find: </span>
                    <span className="text-gray-200">{ingredient.where_to_find.join(', ')}</span>
                  </div>
                  
                  <div>
                    <span className="text-yellow-300 font-medium">Usage: </span>
                    <span className="text-gray-200">{ingredient.usage}</span>
                  </div>
                  
                  <div className="mt-3 p-3 bg-indigo-900/30 rounded border border-indigo-500/30">
                    <div className="text-indigo-300 font-medium mb-1">Spiritual Significance:</div>
                    <div className="text-indigo-200 text-sm italic">{ingredient.spiritual_significance}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center">
        <Button
          onClick={onShowInstructions}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-lg px-8 py-3"
          size="lg"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Show Complete Ritual Instructions
        </Button>
      </div>
    </div>
  );
};
