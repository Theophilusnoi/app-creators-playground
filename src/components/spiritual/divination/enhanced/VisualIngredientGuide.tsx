
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  ShoppingCart, 
  MapPin, 
  DollarSign, 
  AlertTriangle, 
  Lightbulb,
  CheckCircle,
  Info
} from 'lucide-react';
import { Ingredient, IngredientGuide } from '@/services/seraphinaBathingService';

interface VisualIngredientGuideProps {
  onBack: () => void;
  ingredientGuide: IngredientGuide;
  ritualName: string;
}

export const VisualIngredientGuide: React.FC<VisualIngredientGuideProps> = ({ 
  onBack, 
  ingredientGuide, 
  ritualName 
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());

  const toggleIngredient = (ingredientName: string) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(ingredientName)) {
      newChecked.delete(ingredientName);
    } else {
      newChecked.add(ingredientName);
    }
    setCheckedIngredients(newChecked);
  };

  const allIngredientsPicked = checkedIngredients.size === ingredientGuide.ingredients.length;

  const IngredientCard: React.FC<{ ingredient: Ingredient }> = ({ ingredient }) => {
    const isChecked = checkedIngredients.has(ingredient.name);
    
    return (
      <Card className={`transition-all duration-300 ${
        isChecked 
          ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-2 border-green-400/50' 
          : 'bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-purple-400/30'
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={`flex items-center gap-3 ${isChecked ? 'text-green-200' : 'text-purple-200'}`}>
              <Button
                onClick={() => toggleIngredient(ingredient.name)}
                variant="ghost"
                size="sm"
                className={`p-1 rounded-full ${isChecked ? 'text-green-400' : 'text-purple-400'}`}
              >
                <CheckCircle className={`w-5 h-5 ${isChecked ? 'fill-current' : ''}`} />
              </Button>
              {ingredient.name}
            </CardTitle>
            <Badge className={`${isChecked ? 'bg-green-600' : 'bg-purple-600'}`}>
              {ingredient.price_range}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className={`${isChecked ? 'text-green-100' : 'text-purple-100'} leading-relaxed`}>
            {ingredient.description}
          </p>

          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/20">
              <TabsTrigger value="properties" className="text-xs">Properties</TabsTrigger>
              <TabsTrigger value="where" className="text-xs">Where</TabsTrigger>
              <TabsTrigger value="usage" className="text-xs">Usage</TabsTrigger>
              <TabsTrigger value="safety" className="text-xs">Safety</TabsTrigger>
            </TabsList>
            
            <TabsContent value="properties" className="mt-4">
              <div className="flex flex-wrap gap-2">
                {ingredient.spiritual_properties.map((property, index) => (
                  <Badge key={index} variant="outline" className="border-yellow-400/50 text-yellow-200">
                    {property}
                  </Badge>
                ))}
              </div>
              <p className={`mt-3 text-sm ${isChecked ? 'text-green-200' : 'text-purple-200'} italic`}>
                {ingredient.spiritual_significance}
              </p>
            </TabsContent>
            
            <TabsContent value="where" className="mt-4">
              <div className="space-y-2">
                {ingredient.where_to_find.map((location, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className={`text-sm ${isChecked ? 'text-green-200' : 'text-purple-200'}`}>
                      {location}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="usage" className="mt-4">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-400 mt-0.5" />
                <span className={`text-sm ${isChecked ? 'text-green-200' : 'text-purple-200'}`}>
                  {ingredient.usage}
                </span>
              </div>
            </TabsContent>
            
            <TabsContent value="safety" className="mt-4">
              <div className="space-y-2">
                {ingredient.safety_notes && ingredient.safety_notes.length > 0 ? (
                  ingredient.safety_notes.map((note, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                      <span className={`text-sm ${isChecked ? 'text-green-200' : 'text-purple-200'}`}>
                        {note}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className={`text-sm ${isChecked ? 'text-green-200' : 'text-purple-200'}`}>
                    No special safety precautions needed.
                  </span>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Substitutions */}
          {ingredient.substitutions && ingredient.substitutions.length > 0 && (
            <div className="border-t border-current/20 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                <span className={`text-sm font-medium ${isChecked ? 'text-green-200' : 'text-purple-200'}`}>
                  Alternative Options:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {ingredient.substitutions.map((sub, index) => (
                  <Badge key={index} variant="outline" className="border-yellow-400/30 text-yellow-300 text-xs">
                    {sub}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 text-purple-300 hover:text-purple-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Guide
        </Button>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Sacred Ingredient Guide
        </h2>
        <p className="text-xl text-purple-200">Complete shopping guide for {ritualName}</p>
      </div>

      {/* Shopping Progress */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-2 border-blue-400/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="font-bold text-blue-200">Shopping Progress</h3>
                <p className="text-sm text-blue-300">
                  {checkedIngredients.size} of {ingredientGuide.ingredients.length} ingredients gathered
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-blue-200">
                <DollarSign className="w-4 h-4" />
                <span className="font-bold">{ingredientGuide.total_estimated_cost}</span>
              </div>
              <p className="text-xs text-blue-300">Total estimated cost</p>
            </div>
          </div>
          
          {allIngredientsPicked && (
            <div className="mt-4 p-3 bg-green-900/30 border border-green-400/50 rounded-lg">
              <div className="flex items-center gap-2 text-green-200">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-medium">All ingredients gathered! You're ready to begin your sacred ritual.</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ingredients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ingredientGuide.ingredients.map((ingredient, index) => (
          <IngredientCard key={index} ingredient={ingredient} />
        ))}
      </div>

      {/* Shopping Tips */}
      <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-2 border-yellow-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-yellow-200">
            <Lightbulb className="w-5 h-5" />
            Sacred Shopping Wisdom
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-100">
            <div>
              <h4 className="font-medium text-yellow-200 mb-2">Shopping Tips:</h4>
              <ul className="space-y-1">
                <li>• Start with basic ingredients from grocery stores</li>
                <li>• Visit botanicas for authentic spiritual supplies</li>
                <li>• Buy ingredients with positive intention</li>
                <li>• Bless each item as you purchase it</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-yellow-200 mb-2">Sacred Preparation:</h4>
              <ul className="space-y-1">
                <li>• Store ingredients in a clean, sacred space</li>
                <li>• Keep them away from negative energy</li>
                <li>• Use within recommended timeframes</li>
                <li>• Thank each ingredient before use</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
