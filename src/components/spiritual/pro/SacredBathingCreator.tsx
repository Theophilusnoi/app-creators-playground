
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Droplets, 
  Sparkles, 
  Star, 
  Leaf, 
  Gem,
  Volume2,
  Eye,
  Clock
} from 'lucide-react';

interface SacredBathingCreatorProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
}

export const SacredBathingCreator: React.FC<SacredBathingCreatorProps> = ({ 
  userProfile, 
  setUserProfile 
}) => {
  const { toast } = useToast();
  const [intention, setIntention] = useState('');
  const [currentRitual, setCurrentRitual] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const zodiacIngredients = {
    aries: { crystal: 'Ruby', herb: 'Cinnamon', oil: 'Frankincense' },
    taurus: { crystal: 'Rose Quartz', herb: 'Rose Petals', oil: 'Ylang Ylang' },
    gemini: { crystal: 'Citrine', herb: 'Lavender', oil: 'Peppermint' },
    cancer: { crystal: 'Moonstone', herb: 'Jasmine', oil: 'Sandalwood' },
    leo: { crystal: 'Sunstone', herb: 'Marigold', oil: 'Orange' },
    virgo: { crystal: 'Moss Agate', herb: 'Eucalyptus', oil: 'Tea Tree' },
    libra: { crystal: 'Lapis Lazuli', herb: 'Rose', oil: 'Geranium' },
    scorpio: { crystal: 'Obsidian', herb: 'Patchouli', oil: 'Myrrh' },
    sagittarius: { crystal: 'Turquoise', herb: 'Sage', oil: 'Cedarwood' },
    capricorn: { crystal: 'Hematite', herb: 'Pine', oil: 'Vetiver' },
    aquarius: { crystal: 'Amethyst', herb: 'Star Anise', oil: 'Frankincense' },
    pisces: { crystal: 'Aquamarine', herb: 'Seaweed', oil: 'Ocean Breeze' }
  };

  const generateRitual = async () => {
    if (!intention.trim()) {
      toast({
        title: "Intention Required",
        description: "Please share your spiritual intention for the sacred bath",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const zodiacSign = userProfile?.zodiac || 'pisces';
      const ingredients = zodiacIngredients[zodiacSign as keyof typeof zodiacIngredients] || zodiacIngredients.pisces;
      
      const ritual = {
        intention,
        zodiacSign,
        ingredients,
        duration: '21 minutes',
        temperature: '98-102°F (37-39°C)',
        timing: 'Sunset or before sleep',
        incantation: generateIncantation(intention),
        arVisualization: `Sacred ${zodiacSign} temple with ${ingredients.crystal} energy`,
        steps: [
          'Cleanse bathroom space with sage or palo santo',
          `Light candles around tub (${zodiacSign} colors recommended)`,
          `Add ${ingredients.crystal} crystal to water`,
          `Sprinkle ${ingredients.herb} into bath`,
          `Add 5-7 drops of ${ingredients.oil} essential oil`,
          'Enter bath mindfully, state your intention',
          'Remain in sacred waters for 21 minutes',
          'Express gratitude to the elements'
        ]
      };
      
      setCurrentRitual(ritual);
      setIsGenerating(false);
      
      toast({
        title: "Sacred Ritual Created",
        description: `Personalized ${zodiacSign} cleansing bath prepared by AI Seraphina`,
      });
    }, 2000);
  };

  const generateIncantation = (userIntention: string) => {
    const intentions = {
      cleansing: "Sacred waters, wash away all that no longer serves. I emerge purified and renewed.",
      love: "Divine love flows through me. I attract and embody unconditional love.",
      protection: "I am surrounded by white light. Only positive energy may approach me.",
      abundance: "Prosperity flows to me like these sacred waters. I am worthy of all good things.",
      healing: "Healing light fills every cell of my being. I am whole, healthy, and renewed."
    };

    // Simple keyword matching for demonstration
    const key = Object.keys(intentions).find(k => 
      userIntention.toLowerCase().includes(k)
    ) as keyof typeof intentions;
    
    return intentions[key] || "I align with my highest good. Divine wisdom guides my path.";
  };

  return (
    <div className="space-y-6">
      {/* Intention Setting */}
      <Card className="bg-purple-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-200 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Set Your Spiritual Intention
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="What spiritual transformation are you seeking? (e.g., emotional healing, protection, abundance, love attraction)"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            className="bg-black/20 border-purple-400/30 text-white min-h-[100px]"
          />
          <Button
            onClick={generateRitual}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                AI Seraphina Designing Your Ritual...
              </>
            ) : (
              <>
                <Droplets className="w-4 h-4 mr-2" />
                Create Sacred Bath Ritual
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Ritual */}
      {currentRitual && (
        <div className="space-y-6">
          <Card className="bg-indigo-900/20 border-indigo-500/30">
            <CardHeader>
              <CardTitle className="text-indigo-200 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Your Personalized Sacred Bath
              </CardTitle>
              <div className="flex gap-2">
                <Badge className="bg-purple-600/20 text-purple-200">
                  {currentRitual.zodiacSign.charAt(0).toUpperCase() + currentRitual.zodiacSign.slice(1)}
                </Badge>
                <Badge className="bg-blue-600/20 text-blue-200">
                  {currentRitual.duration}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* AR Visualization */}
              <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-4 rounded-lg border border-cyan-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-200 font-semibold">AR Sacred Space Visualization</span>
                </div>
                <p className="text-cyan-100 text-sm">{currentRitual.arVisualization}</p>
                <Button size="sm" className="mt-2 bg-cyan-600 hover:bg-cyan-700">
                  Activate AR Mode
                </Button>
              </div>

              {/* Ingredients */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Gem className="w-5 h-5 text-red-400" />
                    <span className="text-red-200 font-semibold">Crystal</span>
                  </div>
                  <p className="text-red-100">{currentRitual.ingredients.crystal}</p>
                </div>
                
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="w-5 h-5 text-green-400" />
                    <span className="text-green-200 font-semibold">Herb</span>
                  </div>
                  <p className="text-green-100">{currentRitual.ingredients.herb}</p>
                </div>
                
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-200 font-semibold">Essential Oil</span>
                  </div>
                  <p className="text-yellow-100">{currentRitual.ingredients.oil}</p>
                </div>
              </div>

              {/* Incantation */}
              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <Volume2 className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-200 font-semibold">Sacred Incantation</span>
                </div>
                <p className="text-purple-100 italic text-lg leading-relaxed">
                  "{currentRitual.incantation}"
                </p>
                <Button size="sm" className="mt-3 bg-purple-600 hover:bg-purple-700">
                  Play Audio Guide
                </Button>
              </div>

              {/* Ritual Steps */}
              <div className="bg-gray-900/20 p-4 rounded-lg border border-gray-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-200 font-semibold">Step by Step Guide</span>
                </div>
                <ol className="space-y-2">
                  {currentRitual.steps.map((step: string, index: number) => (
                    <li key={index} className="text-gray-100 flex items-start gap-3">
                      <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Timing & Temperature */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30 text-center">
                  <p className="text-blue-200 font-semibold">Optimal Temperature</p>
                  <p className="text-blue-100 text-lg">{currentRitual.temperature}</p>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30 text-center">
                  <p className="text-orange-200 font-semibold">Best Timing</p>
                  <p className="text-orange-100 text-lg">{currentRitual.timing}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
