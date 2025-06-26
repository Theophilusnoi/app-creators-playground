
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Search, 
  Eye, 
  Zap, 
  Shield, 
  Brain,
  Heart,
  Star,
  ChevronDown,
  ChevronRight,
  Microscope,
  Globe2
} from 'lucide-react';
import { telekinesisKnowledgeBase, trainingProgression, ancientWisdomSources } from '@/data/telekinesisKnowledge';
import { advancedTelekinesisKnowledge, traditionalTrainingStages, researchFrameworks } from '@/data/telekinesisAdvancedKnowledge';

interface TelekinesisKnowledgeBaseProps {
  userProfile: any;
}

export const TelekinesisKnowledgeBase: React.FC<TelekinesisKnowledgeBaseProps> = ({ userProfile }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'knowledge' | 'progression' | 'wisdom' | 'advanced' | 'research'>('knowledge');

  // Combine basic and advanced knowledge
  const allKnowledge = [...telekinesisKnowledgeBase, ...advancedTelekinesisKnowledge];

  const categories = [
    'all',
    'Introduction',
    'Ancient Traditions', 
    'Hindu Traditions',
    'Buddhist Traditions',
    'Universal Principles',
    'Scientific Perspective',
    'Preparation',
    'Training Methods',
    'Progressive Exercises',
    'Advanced Techniques',
    'Safety',
    'Ethics',
    'Troubleshooting',
    'Integration',
    'Applications'
  ];

  const filteredKnowledge = allKnowledge.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Ancient Traditions': 
      case 'Hindu Traditions':
      case 'Buddhist Traditions': return Eye;
      case 'Scientific Perspective': return Brain;
      case 'Training Methods': return Zap;
      case 'Safety': return Shield;
      case 'Ethics': return Heart;
      case 'Universal Principles': return Globe2;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex gap-3 flex-wrap">
        <Button
          onClick={() => setActiveTab('knowledge')}
          variant={activeTab === 'knowledge' ? 'default' : 'outline'}
          className={activeTab === 'knowledge' ? 'bg-blue-600' : 'border-gray-400/50 text-gray-100'}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Knowledge Base
        </Button>
        <Button
          onClick={() => setActiveTab('progression')}
          variant={activeTab === 'progression' ? 'default' : 'outline'}
          className={activeTab === 'progression' ? 'bg-blue-600' : 'border-gray-400/50 text-gray-100'}
        >
          <Star className="w-4 h-4 mr-2" />
          Basic Progression
        </Button>
        <Button
          onClick={() => setActiveTab('advanced')}
          variant={activeTab === 'advanced' ? 'default' : 'outline'}
          className={activeTab === 'advanced' ? 'bg-blue-600' : 'border-gray-400/50 text-gray-100'}
        >
          <Eye className="w-4 h-4 mr-2" />
          Traditional Stages
        </Button>
        <Button
          onClick={() => setActiveTab('wisdom')}
          variant={activeTab === 'wisdom' ? 'default' : 'outline'}
          className={activeTab === 'wisdom' ? 'bg-blue-600' : 'border-gray-400/50 text-gray-100'}
        >
          <Globe2 className="w-4 h-4 mr-2" />
          Ancient Wisdom
        </Button>
        <Button
          onClick={() => setActiveTab('research')}
          variant={activeTab === 'research' ? 'default' : 'outline'}
          className={activeTab === 'research' ? 'bg-blue-600' : 'border-gray-400/50 text-gray-100'}
        >
          <Microscope className="w-4 h-4 mr-2" />
          Research
        </Button>
      </div>

      {/* Knowledge Base Tab */}
      {activeTab === 'knowledge' && (
        <div className="space-y-4">
          {/* Search and Filter */}
          <Card className="bg-blue-900/20 border-blue-500/30">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                    <Input
                      placeholder="Search telekinesis knowledge..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-blue-800/20 border-blue-600/30 text-blue-100"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      className={`text-xs ${
                        selectedCategory === category 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'border-blue-400/30 text-blue-200 hover:bg-blue-600/20'
                      }`}
                    >
                      {category === 'all' ? 'All' : category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Items */}
          <div className="space-y-3">
            {filteredKnowledge.map((item) => {
              const isExpanded = expandedItems.has(item.id);
              const IconComponent = getCategoryIcon(item.category);
              
              return (
                <Card key={item.id} className="bg-gray-900/30 border-gray-600/30">
                  <CardContent className="p-4">
                    <div 
                      className="flex items-start justify-between cursor-pointer"
                      onClick={() => toggleExpanded(item.id)}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div className="bg-blue-600/20 p-2 rounded-lg mt-1">
                          <IconComponent className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className="text-gray-100 font-semibold">{item.title}</h4>
                            <Badge className="bg-blue-600/20 text-blue-200 text-xs">
                              {item.category}
                            </Badge>
                            {(item as any).tradition && (
                              <Badge className="bg-amber-600/20 text-amber-200 text-xs">
                                {(item as any).tradition}
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {isExpanded ? item.content : `${item.content.substring(0, 150)}...`}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-100">
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </Button>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-600/30 space-y-3">
                        {item.practicalApplication && (
                          <div className="bg-green-900/20 p-3 rounded-lg border border-green-600/30">
                            <h5 className="text-green-200 font-semibold mb-1 text-sm">Practical Application</h5>
                            <p className="text-green-300 text-sm">{item.practicalApplication}</p>
                          </div>
                        )}
                        
                        {item.ancientWisdom && (
                          <div className="bg-amber-900/20 p-3 rounded-lg border border-amber-600/30">
                            <h5 className="text-amber-200 font-semibold mb-1 text-sm">Ancient Wisdom</h5>
                            <p className="text-amber-300 text-sm">{item.ancientWisdom}</p>
                          </div>
                        )}
                        
                        {item.modernContext && (
                          <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-600/30">
                            <h5 className="text-purple-200 font-semibold mb-1 text-sm">Modern Context</h5>
                            <p className="text-purple-300 text-sm">{item.modernContext}</p>
                          </div>
                        )}
                        
                        {item.safetyNotes && (
                          <div className="bg-red-900/20 p-3 rounded-lg border border-red-600/30">
                            <h5 className="text-red-200 font-semibold mb-1 text-sm">Safety Notes</h5>
                            <p className="text-red-300 text-sm">{item.safetyNotes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Basic Training Progression Tab */}
      {activeTab === 'progression' && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-purple-200 mb-2">Basic Modern Training Progression</h3>
            <p className="text-purple-300 text-sm">Contemporary approach for beginners</p>
          </div>
          {Object.entries(trainingProgression).map(([key, stage]) => (
            <Card key={key} className="bg-purple-900/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-200 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  {stage.name}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <Badge className="bg-purple-600/20 text-purple-200">
                    Duration: {stage.duration}
                  </Badge>
                  <span className="text-purple-300">Focus: {stage.focus}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-purple-200 font-semibold mb-2">Core Practices</h4>
                    <ul className="space-y-1">
                      {stage.practices.map((practice, index) => (
                        <li key={index} className="text-purple-300 text-sm flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          {practice}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-purple-200 font-semibold mb-2">Development Milestones</h4>
                    <ul className="space-y-1">
                      {stage.milestones.map((milestone, index) => (
                        <li key={index} className="text-purple-300 text-sm flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          {milestone}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Traditional Hindu/Buddhist Stages Tab */}
      {activeTab === 'advanced' && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-amber-200 mb-2">Traditional Hindu/Buddhist Training Stages</h3>
            <p className="text-amber-300 text-sm">Classical approach emphasizing spiritual development</p>
          </div>
          {Object.entries(traditionalTrainingStages).map(([key, stage]) => (
            <Card key={key} className="bg-amber-900/20 border-amber-500/30">
              <CardHeader>
                <CardTitle className="text-amber-200 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  {stage.name}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm flex-wrap">
                  <Badge className="bg-amber-600/20 text-amber-200">
                    Duration: {stage.duration}
                  </Badge>
                  <Badge className="bg-orange-600/20 text-orange-200">
                    {stage.tradition}
                  </Badge>
                  <span className="text-amber-300">Focus: {stage.focus}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-amber-200 font-semibold mb-2">Traditional Practices</h4>
                    <ul className="space-y-1">
                      {stage.practices.map((practice, index) => (
                        <li key={index} className="text-amber-300 text-sm flex items-start">
                          <span className="text-amber-400 mr-2">•</span>
                          {practice}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-amber-200 font-semibold mb-2">Spiritual Milestones</h4>
                    <ul className="space-y-1">
                      {stage.milestones.map((milestone, index) => (
                        <li key={index} className="text-amber-300 text-sm flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          {milestone}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Ancient Wisdom Tab */}
      {activeTab === 'wisdom' && (
        <div className="space-y-4">
          {Object.entries(ancientWisdomSources).map(([key, tradition]) => (
            <Card key={key} className="bg-amber-900/20 border-amber-500/30">
              <CardHeader>
                <CardTitle className="text-amber-200 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  {tradition.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-amber-200 font-semibold mb-2">Key Concepts</h4>
                    <ul className="space-y-1">
                      {tradition.key_concepts.map((concept, index) => (
                        <li key={index} className="text-amber-300 text-sm flex items-start">
                          <span className="text-amber-400 mr-2">•</span>
                          {concept}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-amber-200 font-semibold mb-2">Traditional Practices</h4>
                    <ul className="space-y-1">
                      {tradition.practices.map((practice, index) => (
                        <li key={index} className="text-amber-300 text-sm flex items-start">
                          <span className="text-amber-400 mr-2">•</span>
                          {practice}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-amber-200 font-semibold mb-2">Modern Application</h4>
                    <p className="text-amber-300 text-sm">{tradition.modern_application}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Research Tab */}
      {activeTab === 'research' && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-cyan-200 mb-2">Scientific Research Frameworks</h3>
            <p className="text-cyan-300 text-sm">Contemporary theories and research approaches</p>
          </div>
          {Object.entries(researchFrameworks).map(([key, framework]) => (
            <Card key={key} className="bg-cyan-900/20 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-200 flex items-center gap-2">
                  <Microscope className="w-5 h-5" />
                  {framework.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-cyan-200 font-semibold mb-2">Key Researchers</h4>
                    <ul className="space-y-1">
                      {framework.key_researchers.map((researcher, index) => (
                        <li key={index} className="text-cyan-300 text-sm flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          {researcher}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-cyan-200 font-semibold mb-2">Main Theories</h4>
                    <ul className="space-y-1">
                      {framework.main_theories.map((theory, index) => (
                        <li key={index} className="text-cyan-300 text-sm flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          {theory}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-cyan-800/20 p-3 rounded-lg border border-cyan-600/30">
                  <h4 className="text-cyan-200 font-semibold mb-2 text-sm">Relevance to Telekinesis</h4>
                  <p className="text-cyan-300 text-sm">{framework.relevance_to_telekinesis}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
