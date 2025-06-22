
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  Heart, 
  Brain, 
  Target, 
  Clock, 
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface Suggestion {
  type: 'ritual' | 'wisdom' | 'practice';
  title: string;
  description: string;
  duration: string;
  category: string;
  reason: string;
}

interface AnalysisResult {
  emotions: string[];
  themes: string[];
  suggestions: Suggestion[];
  affirmation: string;
}

const emotionKeywords = {
  overwhelm: ['overwhelmed', 'stressed', 'too much', 'chaotic', 'busy', 'exhausted'],
  doubt: ['doubt', 'uncertain', 'confused', 'lost', 'unclear', 'questioning'],
  disconnected: ['lonely', 'isolated', 'disconnected', 'empty', 'numb', 'apart'],
  anger: ['angry', 'frustrated', 'irritated', 'mad', 'furious', 'annoyed'],
  fear: ['afraid', 'scared', 'anxious', 'worried', 'nervous', 'fearful'],
  sadness: ['sad', 'depressed', 'down', 'grief', 'sorrow', 'melancholy'],
  seeking: ['searching', 'seeking', 'looking for', 'need guidance', 'want to grow']
};

const practiceDatabase = {
  overwhelm: [
    {
      type: 'ritual' as const,
      title: '3-Minute Breath Altar',
      description: 'A quick centering practice for chaotic moments',
      duration: '3 minutes',
      category: 'Sacred Pauses',
      reason: 'Immediate stress relief and grounding'
    },
    {
      type: 'wisdom' as const,
      title: 'The Two Arrows Teaching',
      description: 'Buddhist teaching about pain vs. suffering',
      duration: '5 minutes',
      category: 'Buddhism',
      reason: 'Helps separate actual problems from mental suffering'
    }
  ],
  doubt: [
    {
      type: 'wisdom' as const,
      title: 'Who Am I Beyond Thought?',
      description: 'Advaita inquiry into your true nature',
      duration: '10 minutes',
      category: 'Non-Duality',
      reason: 'Connects you to the certainty of your true self'
    },
    {
      type: 'practice' as const,
      title: 'Inner Compass Meditation',
      description: 'Connect with your innate wisdom and knowing',
      duration: '15 minutes',
      category: 'Self-Inquiry',
      reason: 'Strengthens trust in your inner guidance'
    }
  ],
  disconnected: [
    {
      type: 'ritual' as const,
      title: 'Heart Connection Ceremony',
      description: 'Open your heart to universal love and connection',
      duration: '20 minutes',
      category: 'Heart Opening',
      reason: 'Dissolves the illusion of separation'
    },
    {
      type: 'wisdom' as const,
      title: 'The Beloved in All Forms',
      description: 'Sufi teaching on seeing the Divine in everything',
      duration: '5 minutes',
      category: 'Sufism',
      reason: 'Reveals the connection that was never broken'
    }
  ],
  fear: [
    {
      type: 'practice' as const,
      title: 'Courage Cultivation',
      description: 'Face fear with compassionate presence',
      duration: '10 minutes',
      category: 'Shadow Work',
      reason: 'Transforms fear into wisdom and strength'
    },
    {
      type: 'ritual' as const,
      title: 'Protection Circle Visualization',
      description: 'Surround yourself with divine light and protection',
      duration: '15 minutes',
      category: 'Protection',
      reason: 'Creates sense of safety and divine support'
    }
  ],
  seeking: [
    {
      type: 'wisdom' as const,
      title: 'The Eternal Now',
      description: 'Finding what you seek in the present moment',
      duration: '8 minutes',
      category: 'Presence',
      reason: 'What you seek is already here, waiting to be recognized'
    }
  ]
};

const affirmations = {
  overwhelm: "I breathe deeply and trust that I can handle whatever comes with grace and wisdom.",
  doubt: "I trust the wisdom within me. My inner knowing is a reliable guide on my path.",
  disconnected: "I am deeply connected to all life. Love flows through me and around me always.",
  anger: "I acknowledge my anger with compassion and allow it to transform into clarity and action.",
  fear: "I face my fears with courage, knowing they are teachers guiding me to greater freedom.",
  sadness: "I honor my sadness as a sacred emotion that opens my heart to deeper compassion.",
  seeking: "Everything I seek already exists within me. I am whole and complete as I am."
};

export const PersonalGuidanceSystem: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeInput = () => {
    if (!userInput.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis with keyword matching
    setTimeout(() => {
      const inputLower = userInput.toLowerCase();
      const detectedEmotions: string[] = [];
      
      // Analyze emotions
      Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
        if (keywords.some(keyword => inputLower.includes(keyword))) {
          detectedEmotions.push(emotion);
        }
      });

      // If no specific emotions detected, default to 'seeking'
      if (detectedEmotions.length === 0) {
        detectedEmotions.push('seeking');
      }

      // Generate suggestions based on detected emotions
      const allSuggestions: Suggestion[] = [];
      detectedEmotions.forEach(emotion => {
        const practices = practiceDatabase[emotion as keyof typeof practiceDatabase] || [];
        allSuggestions.push(...practices);
      });

      // Get primary emotion for affirmation
      const primaryEmotion = detectedEmotions[0] as keyof typeof affirmations;
      
      const result: AnalysisResult = {
        emotions: detectedEmotions,
        themes: ['spiritual growth', 'self-discovery'], // Could be expanded with more analysis
        suggestions: allSuggestions.slice(0, 3), // Limit to top 3 suggestions
        affirmation: affirmations[primaryEmotion] || affirmations.seeking
      };

      setAnalysis(result);
      setIsAnalyzing(false);
    }, 1500); // Simulate processing time
  };

  const getEmotionColor = (emotion: string) => {
    const colors = {
      overwhelm: 'bg-red-600',
      doubt: 'bg-yellow-600',
      disconnected: 'bg-blue-600',
      anger: 'bg-orange-600',
      fear: 'bg-purple-600',
      sadness: 'bg-indigo-600',
      seeking: 'bg-green-600'
    };
    return colors[emotion as keyof typeof colors] || 'bg-gray-600';
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'ritual': return Target;
      case 'wisdom': return Brain;
      case 'practice': return Heart;
      default: return Lightbulb;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white mb-2">
            🧭 Personal Guidance System
          </CardTitle>
          <p className="text-purple-200 text-lg">
            Share what's on your heart, and receive personalized spiritual guidance
          </p>
        </CardHeader>
      </Card>

      {/* Input Section */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 crisp-text">
            <Heart className="w-5 h-5 text-purple-400" />
            What's happening in your spiritual journey?
          </CardTitle>
          <p className="text-purple-200 text-sm crisp-text">
            Share your feelings, challenges, or questions. Be as open and honest as you can.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="I've been feeling overwhelmed lately with work and relationships. I feel disconnected from my spiritual practice and unsure about my path forward..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="min-h-[120px] bg-purple-900/20 border-purple-500/30 text-white crisp-text resize-none"
            rows={5}
          />
          <Button 
            onClick={analyzeInput}
            disabled={!userInput.trim() || isAnalyzing}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white crisp-text"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analyzing your journey...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Receive Guidance
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Detected Emotions */}
          <Card className="bg-purple-900/20 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 crisp-text">
                <Brain className="w-5 h-5 text-purple-400" />
                What I sense in your sharing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {analysis.emotions.map((emotion) => (
                  <Badge key={emotion} className={`${getEmotionColor(emotion)} text-white crisp-text`}>
                    {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                  </Badge>
                ))}
              </div>
              <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20">
                <p className="text-purple-100 crisp-text italic">
                  "{analysis.affirmation}"
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Personalized Suggestions */}
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 crisp-text">
                <Lightbulb className="w-5 h-5 text-purple-400" />
                Personalized Practices for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.suggestions.map((suggestion, index) =>  {
                  const Icon = getSuggestionIcon(suggestion.type);
                  return (
                    <div key={index} className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:bg-purple-900/30 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-600 p-2 rounded-full flex-shrink-0">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="text-white font-semibold crisp-text">{suggestion.title}</h4>
                            <div className="flex gap-2 flex-shrink-0">
                              <Badge className="bg-blue-600 text-white text-xs crisp-text">
                                <Clock className="w-3 h-3 mr-1" />
                                {suggestion.duration}
                              </Badge>
                              <Badge className="bg-indigo-600 text-white text-xs crisp-text">
                                {suggestion.type}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-purple-200 text-sm mb-2 crisp-text">{suggestion.description}</p>
                          <p className="text-purple-300 text-xs crisp-text italic">
                            Recommended because: {suggestion.reason}
                          </p>
                          <Button 
                            size="sm" 
                            className="mt-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white crisp-text"
                          >
                            Begin Practice
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* How It Works */}
      <Card className="bg-gray-900/30 border-gray-600/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white crisp-text">How Personal Guidance Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Heart className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold crisp-text">Share Openly</h4>
              <p className="text-gray-300 text-sm crisp-text">Express your feelings, challenges, and questions honestly</p>
            </div>
            <div className="text-center">
              <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold crisp-text">AI Analysis</h4>
              <p className="text-gray-300 text-sm crisp-text">Advanced understanding of your emotional and spiritual state</p>
            </div>
            <div className="text-center">
              <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold crisp-text">Personalized Path</h4>
              <p className="text-gray-300 text-sm crisp-text">Receive practices tailored specifically to your needs</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
