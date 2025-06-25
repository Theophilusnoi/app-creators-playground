import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useGeminiChat } from '@/hooks/useGeminiChat';
import { enhancedSeraphinaBathingService } from '@/services/seraphinaBathingService';
import { 
  Droplets, 
  Flame, 
  Heart, 
  Shield, 
  DollarSign, 
  Users,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  BookOpen
} from 'lucide-react';

interface SpiritualProblem {
  type: string;
  message: string;
  guidance: any;
}

export const SacredBathingSystem = () => {
  const [userProblem, setUserProblem] = useState('');
  const [currentGuidance, setCurrentGuidance] = useState<any>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showIngredientDetails, setShowIngredientDetails] = useState(false);
  const { sendMessage, isLoading } = useGeminiChat();

  const problemIcons = {
    protection: <Shield className="w-5 h-5" />,
    love_healing: <Heart className="w-5 h-5" />,
    abundance: <DollarSign className="w-5 h-5" />,
    moon_water: <Star className="w-5 h-5" />,
    crystal_healing: <Star className="w-5 h-5" />,
    essential_oils: <Droplets className="w-5 h-5" />
  };

  const handleAnalyzeProblem = async () => {
    if (!userProblem.trim()) return;

    try {
      const guidance = enhancedSeraphinaBathingService.generateEnhancedSacredBathingGuidance(userProblem);
      setCurrentGuidance(guidance);
    } catch (error) {
      console.error('Error generating guidance:', error);
    }
  };

  const handleGetAIGuidance = async () => {
    if (!userProblem.trim()) return;

    try {
      const spiritualPrompt = `As Seraphina, provide compassionate spiritual guidance for this concern: "${userProblem}". Include emotional support, spiritual perspective, and practical wisdom.`;
      
      const response = await sendMessage(spiritualPrompt);
      
      const guidance = enhancedSeraphinaBathingService.generateEnhancedSacredBathingGuidance(userProblem);
      setCurrentGuidance({
        ...guidance,
        ai_guidance: response
      });
    } catch (error) {
      console.error('Error getting AI guidance:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Droplets className="w-6 h-6 text-purple-400" />
            Sacred Bathing Guidance System
          </CardTitle>
          <p className="text-purple-200">
            Receive personalized spiritual cleansing rituals and sacred bathing guidance from Seraphina
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-purple-200 text-sm font-medium">
              Describe your spiritual challenge or what you need healing from:
            </label>
            <Textarea
              value={userProblem}
              onChange={(e) => setUserProblem(e.target.value)}
              placeholder="I've been feeling drained and surrounded by negative energy..."
              className="bg-black/30 border-purple-500/50 text-white placeholder-purple-300"
              rows={4}
            />
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={handleAnalyzeProblem}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              disabled={!userProblem.trim()}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Get Sacred Bathing Ritual
            </Button>
            
            <Button
              onClick={handleGetAIGuidance}
              variant="outline"
              className="border-purple-500/50 text-purple-200 hover:bg-purple-500/20"
              disabled={!userProblem.trim() || isLoading}
            >
              <Star className="w-4 h-4 mr-2" />
              Get AI Spiritual Guidance
            </Button>
          </div>
        </CardContent>
      </Card>

      {currentGuidance && (
        <div className="space-y-6">
          {/* Seraphina's Message */}
          <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-400" />
                Message from Seraphina
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-100 leading-relaxed">
                {currentGuidance.seraphina_message}
              </p>
              {currentGuidance.ai_guidance && (
                <div className="mt-4 p-4 bg-black/20 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-200 font-medium mb-2">Additional Spiritual Guidance:</h4>
                  <p className="text-purple-100 text-sm leading-relaxed">
                    {currentGuidance.ai_guidance}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ritual Details */}
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                {problemIcons[currentGuidance.ritual_details.category as keyof typeof problemIcons] || <Flame className="w-5 h-5" />}
                {currentGuidance.ritual_details.name}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-purple-600/20 text-purple-200">
                  {currentGuidance.ritual_details.difficulty_level}
                </Badge>
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-200">
                  <Clock className="w-3 h-3 mr-1" />
                  {currentGuidance.ritual_details.duration}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-purple-100">{currentGuidance.ritual_details.description}</p>
              
              <div>
                <h4 className="text-purple-200 font-medium mb-2">Spiritual Benefits:</h4>
                <ul className="space-y-1">
                  {currentGuidance.ritual_details.spiritual_benefits.map((benefit: string, index: number) => (
                    <li key={index} className="text-purple-100 text-sm flex items-start gap-2">
                      <Star className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-purple-200 font-medium mb-2">Best Timing:</h4>
                <div className="flex flex-wrap gap-1">
                  {currentGuidance.ritual_details.best_timing.map((timing: string, index: number) => (
                    <Badge key={index} variant="outline" className="border-purple-500/50 text-purple-200 text-xs">
                      {timing}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredient Guide */}
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-green-400" />
                  Sacred Ingredients Guide
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowIngredientDetails(!showIngredientDetails)}
                  className="text-purple-200 hover:text-white"
                >
                  {showIngredientDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CardTitle>
              <p className="text-green-200">
                Estimated Total Cost: {currentGuidance.ingredient_guide.total_estimated_cost}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {currentGuidance.ingredient_guide.ingredients.map((ingredient: any, index: number) => (
                  <div key={index} className="border border-purple-500/30 rounded-lg p-4 bg-purple-900/20">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">{ingredient.name}</h4>
                      <Badge variant="outline" className="border-green-500/50 text-green-200">
                        {ingredient.price_range}
                      </Badge>
                    </div>
                    
                    <p className="text-purple-200 text-sm mb-2">{ingredient.description}</p>
                    
                    {showIngredientDetails && (
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-purple-300 font-medium">Spiritual Properties: </span>
                          <span className="text-purple-100">{ingredient.spiritual_properties.join(', ')}</span>
                        </div>
                        <div>
                          <span className="text-purple-300 font-medium">Where to Find: </span>
                          <span className="text-purple-100">{ingredient.where_to_find.join(', ')}</span>
                        </div>
                        <div>
                          <span className="text-purple-300 font-medium">Usage: </span>
                          <span className="text-purple-100">{ingredient.usage}</span>
                        </div>
                        <div>
                          <span className="text-purple-300 font-medium">Significance: </span>
                          <span className="text-purple-100">{ingredient.spiritual_significance}</span>
                        </div>
                        {ingredient.substitutions && ingredient.substitutions.length > 0 && (
                          <div>
                            <span className="text-purple-300 font-medium">Substitutions: </span>
                            <span className="text-purple-100">{ingredient.substitutions.join(', ')}</span>
                          </div>
                        )}
                        {ingredient.safety_notes && ingredient.safety_notes.length > 0 && (
                          <div>
                            <span className="text-red-300 font-medium">Safety Notes: </span>
                            <span className="text-red-200">{ingredient.safety_notes.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ritual Instructions */}
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  Sacred Ritual Instructions
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="text-purple-200 hover:text-white"
                >
                  {showInstructions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            {showInstructions && (
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-purple-200 font-medium mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs">1</span>
                    Preparation Steps
                  </h4>
                  <ul className="space-y-2">
                    {currentGuidance.step_by_step_instructions.preparation_steps.map((step: string, index: number) => (
                      <li key={index} className="text-purple-100 text-sm flex items-start gap-2">
                        <span className="w-4 h-4 bg-purple-500/50 rounded-full flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="bg-purple-500/30" />

                <div>
                  <h4 className="text-purple-200 font-medium mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs">2</span>
                    Ritual Steps
                  </h4>
                  <ul className="space-y-2">
                    {currentGuidance.step_by_step_instructions.ritual_steps.map((step: string, index: number) => (
                      <li key={index} className="text-purple-100 text-sm flex items-start gap-2">
                        <span className="w-4 h-4 bg-blue-500/50 rounded-full flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="bg-purple-500/30" />

                <div>
                  <h4 className="text-purple-200 font-medium mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs">3</span>
                    Closing Ritual
                  </h4>
                  <ul className="space-y-2">
                    {currentGuidance.step_by_step_instructions.closing_ritual.map((step: string, index: number) => (
                      <li key={index} className="text-purple-100 text-sm flex items-start gap-2">
                        <span className="w-4 h-4 bg-green-500/50 rounded-full flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                {currentGuidance.step_by_step_instructions.safety_instructions && (
                  <>
                    <Separator className="bg-purple-500/30" />
                    <div>
                      <h4 className="text-red-300 font-medium mb-3">⚠️ Safety Instructions</h4>
                      <ul className="space-y-1">
                        {currentGuidance.step_by_step_instructions.safety_instructions.map((instruction: string, index: number) => (
                          <li key={index} className="text-red-200 text-sm">• {instruction}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </CardContent>
            )}
          </Card>

          {/* Ritual Incantations */}
          {currentGuidance.ritual_incantations && (
            <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Sacred Incantations & Prayers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(currentGuidance.ritual_incantations).map(([key, value]: [string, any]) => {
                  if (key === 'personalized_mantra' && !value) return null;
                  
                  const titles = {
                    space_cleansing: 'Space Cleansing Prayer',
                    candle_anointing: 'Candle Blessing',
                    water_preparation: 'Water Blessing',
                    immersion_affirmation: 'Immersion Prayer',
                    closing_ritual: 'Closing Blessing',
                    personalized_mantra: 'Personal Mantra'
                  };
                  
                  return (
                    <div key={key} className="bg-black/20 rounded-lg p-4 border border-indigo-500/30">
                      <h4 className="text-indigo-200 font-medium mb-2">
                        {titles[key as keyof typeof titles] || key.replace('_', ' ').toUpperCase()}
                      </h4>
                      <p className="text-indigo-100 text-sm italic leading-relaxed whitespace-pre-line">
                        {value}
                      </p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
