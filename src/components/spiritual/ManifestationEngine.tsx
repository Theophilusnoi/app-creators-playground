
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Target, Zap, Heart, Star, TrendingUp, AlertCircle } from 'lucide-react';

interface Manifestation {
  id: string;
  title: string;
  description: string;
  category: string;
  vibrationAlignment: number;
  blockages: string[];
  affirmations: string[];
  actionSteps: string[];
  timeline: string;
  progress: number;
  createdAt: Date;
}

interface EnergeticBlockage {
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  clearingMethod: string;
}

const manifestationCategories = [
  { id: 'love', name: 'Love & Relationships', color: 'bg-pink-600', icon: Heart },
  { id: 'abundance', name: 'Abundance & Prosperity', color: 'bg-green-600', icon: TrendingUp },
  { id: 'health', name: 'Health & Vitality', color: 'bg-blue-600', icon: Zap },
  { id: 'purpose', name: 'Purpose & Career', color: 'bg-purple-600', icon: Target },
  { id: 'spiritual', name: 'Spiritual Growth', color: 'bg-yellow-600', icon: Star }
];

export const ManifestationEngine = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [manifestations, setManifestations] = useState<Manifestation[]>([]);
  const [currentManifest, setCurrentManifest] = useState<Partial<Manifestation>>({
    title: '',
    description: '',
    category: 'abundance',
    timeline: '3 months'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    vibrationScore: number;
    blockages: EnergeticBlockage[];
    recommendations: string[];
  } | null>(null);

  const analyzeVibrationAlignment = (title: string, description: string, category: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const baseScore = Math.random() * 40 + 60; // 60-100 range
      const blockages = generateBlockages(category, description);
      const finalScore = Math.max(baseScore - (blockages.length * 5), 40);
      
      setAnalysisResult({
        vibrationScore: Math.round(finalScore),
        blockages,
        recommendations: generateRecommendations(category, blockages)
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateBlockages = (category: string, description: string): EnergeticBlockage[] => {
    const commonBlockages: Record<string, EnergeticBlockage[]> = {
      love: [
        {
          type: 'Fear of Vulnerability',
          severity: 'medium',
          description: 'Past wounds creating barriers to intimacy',
          clearingMethod: 'Heart chakra healing meditation'
        },
        {
          type: 'Unworthiness Belief',
          severity: 'high',
          description: 'Deep belief of not deserving love',
          clearingMethod: 'Self-love affirmations and mirror work'
        }
      ],
      abundance: [
        {
          type: 'Scarcity Mindset',
          severity: 'high',
          description: 'Belief that resources are limited',
          clearingMethod: 'Abundance visualization and gratitude practice'
        },
        {
          type: 'Money Shame',
          severity: 'medium',
          description: 'Inherited beliefs about money being evil',
          clearingMethod: 'Ancestral healing and money mindset work'
        }
      ],
      health: [
        {
          type: 'Stress Accumulation',
          severity: 'medium',
          description: 'Chronic stress affecting cellular regeneration',
          clearingMethod: 'Stress-release breathwork and meditation'
        },
        {
          type: 'Victim Consciousness',
          severity: 'low',
          description: 'Identifying with illness rather than health',
          clearingMethod: 'Identity shifting and empowerment work'
        }
      ],
      purpose: [
        {
          type: 'Imposter Syndrome',
          severity: 'high',
          description: 'Doubt about worthiness to fulfill purpose',
          clearingMethod: 'Confidence building and past success acknowledgment'
        },
        {
          type: 'Comparison Trap',
          severity: 'medium',
          description: 'Measuring progress against others',
          clearingMethod: 'Unique gifts recognition and authenticity work'
        }
      ],
      spiritual: [
        {
          type: 'Spiritual Bypassing',
          severity: 'medium',
          description: 'Avoiding human experience through spirituality',
          clearingMethod: 'Grounding practices and shadow integration'
        },
        {
          type: 'Guru Complex',
          severity: 'low',
          description: 'Seeking external validation for spiritual growth',
          clearingMethod: 'Inner authority development and trust building'
        }
      ]
    };

    const categoryBlockages = commonBlockages[category] || [];
    const numBlockages = Math.floor(Math.random() * 3) + 1;
    
    return categoryBlockages.slice(0, numBlockages);
  };

  const generateRecommendations = (category: string, blockages: EnergeticBlockage[]): string[] => {
    const baseRecommendations = [
      'Practice daily visualization of your desired outcome',
      'Maintain a high-vibration lifestyle through meditation and gratitude',
      'Take inspired action steps aligned with your manifestation',
      'Release attachment to specific outcomes and trust divine timing'
    ];

    const categorySpecific: Record<string, string[]> = {
      love: ['Open your heart through loving-kindness meditation', 'Practice self-love rituals daily'],
      abundance: ['Cultivate gratitude for current blessings', 'Visualize money as flowing energy'],
      health: ['Send love and appreciation to your body', 'Practice cellular regeneration meditation'],
      purpose: ['Connect with your authentic self daily', 'Share your unique gifts fearlessly'],
      spiritual: ['Balance spiritual practice with earthly presence', 'Integrate insights into daily life']
    };

    return [...baseRecommendations, ...(categorySpecific[category] || [])];
  };

  const createManifestation = () => {
    if (!analysisResult || !currentManifest.title || !currentManifest.description) {
      toast({
        title: "Please complete the analysis first",
        description: "We need to analyze your vibration alignment before creating your manifestation.",
        variant: "destructive"
      });
      return;
    }

    const newManifestation: Manifestation = {
      id: Date.now().toString(),
      title: currentManifest.title!,
      description: currentManifest.description!,
      category: currentManifest.category!,
      timeline: currentManifest.timeline!,
      vibrationAlignment: analysisResult.vibrationScore,
      blockages: analysisResult.blockages.map(b => `${b.type}: ${b.clearingMethod}`),
      affirmations: generateAffirmations(currentManifest.category!, currentManifest.title!),
      actionSteps: generateActionSteps(currentManifest.category!, currentManifest.description!),
      progress: 0,
      createdAt: new Date()
    };

    setManifestations(prev => [...prev, newManifestation]);
    
    // Reset form
    setCurrentManifest({
      title: '',
      description: '',
      category: 'abundance',
      timeline: '3 months'
    });
    setAnalysisResult(null);

    toast({
      title: "Manifestation Created! ✨",
      description: `Your ${newManifestation.title} manifestation is now active in the quantum field.`,
    });
  };

  const generateAffirmations = (category: string, title: string): string[] => {
    const affirmationTemplates: Record<string, string[]> = {
      love: [
        "I am worthy of deep, unconditional love",
        "Love flows to me easily and naturally",
        "I attract loving, supportive relationships"
      ],
      abundance: [
        "I am a magnet for prosperity and abundance",
        "Money flows to me from multiple sources",
        "I deserve financial freedom and security"
      ],
      health: [
        "My body is healing and regenerating perfectly",
        "I radiate vibrant health and vitality",
        "Every cell in my body vibrates with wellness"
      ],
      purpose: [
        "I am living my highest purpose with joy",
        "My unique gifts serve the world beautifully",
        "I trust my path and follow my calling"
      ],
      spiritual: [
        "I am connected to infinite wisdom and love",
        "My spiritual growth accelerates daily",
        "I embody divine light in all I do"
      ]
    };

    return affirmationTemplates[category] || affirmationTemplates.abundance;
  };

  const generateActionSteps = (category: string, description: string): string[] => {
    return [
      'Set daily intention and visualize your outcome',
      'Take one aligned action step each day',
      'Practice gratitude for progress made',
      'Release resistance through meditation',
      'Trust the process and maintain high vibration'
    ];
  };

  const getVibrationColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getVibrationLabel = (score: number) => {
    if (score >= 80) return 'High Vibration';
    if (score >= 60) return 'Medium Vibration';
    return 'Low Vibration';
  };

  if (!user) {
    return (
      <Card className="bg-black/30 border-purple-500/30">
        <CardContent className="text-center py-12">
          <Target className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Manifestation Engine</h3>
          <p className="text-purple-200">Please log in to access your manifestation portal</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/30">
          <TabsTrigger value="create">Create Manifestation</TabsTrigger>
          <TabsTrigger value="track">Track Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Target className="w-5 h-5 text-purple-400" />
                Manifestation Creation Portal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-purple-200 block mb-2">Manifestation Title</label>
                <Input
                  value={currentManifest.title}
                  onChange={(e) => setCurrentManifest(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What do you want to manifest?"
                  className="bg-black/20 border-purple-500/30 text-white"
                />
              </div>

              <div>
                <label className="text-purple-200 block mb-2">Category</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {manifestationCategories.map(category => {
                    const Icon = category.icon;
                    return (
                      <Button
                        key={category.id}
                        onClick={() => setCurrentManifest(prev => ({ ...prev, category: category.id }))}
                        variant={currentManifest.category === category.id ? "default" : "outline"}
                        className={`${
                          currentManifest.category === category.id 
                            ? `${category.color} text-white` 
                            : 'border-purple-500/30'
                        } h-auto p-3`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Icon className="w-4 h-4" />
                          <span className="text-xs">{category.name}</span>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-purple-200 block mb-2">Detailed Description</label>
                <Textarea
                  value={currentManifest.description}
                  onChange={(e) => setCurrentManifest(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your manifestation in detail..."
                  className="bg-black/20 border-purple-500/30 text-white"
                  rows={4}
                />
              </div>

              <div>
                <label className="text-purple-200 block mb-2">Timeline</label>
                <select
                  value={currentManifest.timeline}
                  onChange={(e) => setCurrentManifest(prev => ({ ...prev, timeline: e.target.value }))}
                  className="w-full p-2 rounded bg-black/20 border border-purple-500/30 text-white"
                >
                  <option value="1 month">1 Month</option>
                  <option value="3 months">3 Months</option>
                  <option value="6 months">6 Months</option>
                  <option value="1 year">1 Year</option>
                </select>
              </div>

              <Button
                onClick={() => analyzeVibrationAlignment(
                  currentManifest.title || '',
                  currentManifest.description || '',
                  currentManifest.category || 'abundance'
                )}
                disabled={!currentManifest.title || !currentManifest.description || isAnalyzing}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isAnalyzing ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-pulse" />
                    Analyzing Vibration...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Analyze Vibration Alignment
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisResult && (
            <Card className="bg-black/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Vibration Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getVibrationColor(analysisResult.vibrationScore)} mb-2`}>
                    {analysisResult.vibrationScore}%
                  </div>
                  <Badge className={`${getVibrationColor(analysisResult.vibrationScore)} border-current`} variant="outline">
                    {getVibrationLabel(analysisResult.vibrationScore)}
                  </Badge>
                  <Progress value={analysisResult.vibrationScore} className="mt-4 h-3" />
                </div>

                {analysisResult.blockages.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Energetic Blockages Detected
                    </h4>
                    <div className="space-y-2">
                      {analysisResult.blockages.map((blockage, index) => (
                        <div key={index} className="p-3 rounded-lg bg-red-900/20 border border-red-500/30">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-red-200 font-medium">{blockage.type}</span>
                            <Badge variant="outline" className={`
                              ${blockage.severity === 'high' ? 'border-red-500 text-red-300' : 
                                blockage.severity === 'medium' ? 'border-yellow-500 text-yellow-300' : 
                                'border-green-500 text-green-300'}
                            `}>
                              {blockage.severity}
                            </Badge>
                          </div>
                          <p className="text-red-300 text-sm mb-2">{blockage.description}</p>
                          <p className="text-red-400 text-sm">
                            <strong>Clearing Method:</strong> {blockage.clearingMethod}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-3">Recommendations</h4>
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="text-purple-200 flex items-start gap-2">
                        <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={createManifestation}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Activate Manifestation
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="track" className="space-y-6">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Active Manifestations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {manifestations.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-purple-200">No active manifestations yet. Create your first one!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {manifestations.map((manifestation) => {
                    const category = manifestationCategories.find(c => c.id === manifestation.category);
                    const Icon = category?.icon || Target;
                    
                    return (
                      <div key={manifestation.id} className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/30">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Icon className="w-6 h-6 text-purple-400" />
                            <div>
                              <h3 className="text-lg font-semibold text-white">{manifestation.title}</h3>
                              <p className="text-purple-300 text-sm">{manifestation.description}</p>
                            </div>
                          </div>
                          <Badge className={`${getVibrationColor(manifestation.vibrationAlignment)} border-current`} variant="outline">
                            {manifestation.vibrationAlignment}%
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-purple-300">Progress</span>
                            <span className="text-purple-300">{manifestation.progress}%</span>
                          </div>
                          <Progress value={manifestation.progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center gap-4 mt-3 text-sm text-purple-400">
                          <span>Timeline: {manifestation.timeline}</span>
                          <span>Created: {manifestation.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
