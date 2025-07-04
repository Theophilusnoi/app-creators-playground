
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  Search, 
  ChevronDown,
  ChevronRight,
  Brain,
  Zap,
  Heart,
  Globe,
  Star,
  Shield,
  Sparkles,
  Crown
} from 'lucide-react';
import { deeperWisdom, getDeepWisdomByCategory, searchDeepWisdom } from '@/data/deeperWisdom';

export const DeeperWisdomHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('explore');

  const categories = [
    'all',
    'Consciousness',
    'Reality Structure', 
    'Universal Intelligence',
    'Unity Consciousness',
    'Suppressed Knowledge',
    'Human Evolution',
    'Liberation',
    'Divine Essence'
  ];

  const filteredWisdom = selectedCategory === 'all' 
    ? Object.values(deeperWisdom)
    : getDeepWisdomByCategory(selectedCategory);

  const searchResults = searchTerm 
    ? searchDeepWisdom(searchTerm)
    : filteredWisdom;

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
      case 'Consciousness': return Brain;
      case 'Reality Structure': return Zap;
      case 'Universal Intelligence': return Globe;
      case 'Unity Consciousness': return Heart;
      case 'Suppressed Knowledge': return Eye;
      case 'Human Evolution': return Crown;
      case 'Liberation': return Shield;
      case 'Divine Essence': return Sparkles;
      default: return Star;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-purple-400/10 to-pink-400/10 animate-pulse"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="text-white flex items-center gap-2 text-2xl">
            <Eye className="w-8 h-8 text-purple-400" />
            🌌 The Deeper Knowledge of Life
          </CardTitle>
          <p className="text-purple-200 text-lg">
            Hidden truths, suppressed wisdom, and the reawakening to who we truly are
          </p>
          <div className="bg-black/20 rounded-lg p-4 mt-4">
            <p className="text-yellow-200 text-sm italic">
              "This is not just philosophy; it's a reawakening to who we are, why we're here, 
              and what lies beneath the veil of ordinary perception."
            </p>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/30">
          <TabsTrigger 
            value="explore" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-600"
          >
            <Eye className="w-4 h-4" />
            Explore Wisdom
          </TabsTrigger>
          <TabsTrigger 
            value="categories" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-600"
          >
            <Star className="w-4 h-4" />
            By Category
          </TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="space-y-4 mt-6">
          {/* Search */}
          <Card className="bg-black/30 border-purple-500/30">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search deeper wisdom and hidden truths..."
                  className="pl-10 bg-black/30 border-purple-500/50 text-white placeholder-purple-300"
                />
              </div>
            </CardContent>
          </Card>

          {/* Wisdom Items */}
          <div className="space-y-4">
            {searchResults.map((concept) => {
              const isExpanded = expandedItems.has(concept.id);
              const IconComponent = getCategoryIcon(concept.category);
              
              return (
                <Card key={concept.id} className="bg-black/30 border-purple-500/30 hover:border-purple-400/50 transition-colors">
                  <CardContent className="p-6">
                    <div 
                      className="flex items-start justify-between cursor-pointer"
                      onClick={() => toggleExpanded(concept.id)}
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="bg-purple-600/20 p-3 rounded-lg mt-1">
                          <IconComponent className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-white font-bold text-lg">{concept.title}</h3>
                            <Badge className="bg-purple-600/20 text-purple-200">
                              {concept.category}
                            </Badge>
                          </div>
                          <p className="text-purple-100 text-sm italic mb-3">
                            "{concept.essence}"
                          </p>
                          
                          {!isExpanded && (
                            <div className="space-y-2">
                              <div>
                                <h5 className="text-purple-300 font-medium text-sm mb-1">Hidden Truths:</h5>
                                <p className="text-purple-200 text-sm">
                                  {concept.hiddenTruths[0]}...
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-100">
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </Button>
                    </div>

                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-purple-500/30 space-y-6">
                        {/* Hidden Truths */}
                        <div className="bg-red-900/20 p-4 rounded-lg border border-red-600/30">
                          <h4 className="text-red-200 font-semibold mb-3 flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Hidden Truths Revealed
                          </h4>
                          <ul className="space-y-2">
                            {concept.hiddenTruths.map((truth, index) => (
                              <li key={index} className="text-red-300 text-sm flex items-start gap-2">
                                <Star className="w-3 h-3 text-red-400 mt-1 flex-shrink-0" />
                                {truth}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Scientific Correlations */}
                        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-600/30">
                          <h4 className="text-blue-200 font-semibold mb-3 flex items-center gap-2">
                            <Brain className="w-4 h-4" />
                            Scientific Correlations
                          </h4>
                          <ul className="space-y-2">
                            {concept.scientificCorrelations.map((correlation, index) => (
                              <li key={index} className="text-blue-300 text-sm flex items-start gap-2">
                                <Zap className="w-3 h-3 text-blue-400 mt-1 flex-shrink-0" />
                                {correlation}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Ancient Wisdom */}
                        <div className="bg-amber-900/20 p-4 rounded-lg border border-amber-600/30">
                          <h4 className="text-amber-200 font-semibold mb-3 flex items-center gap-2">
                            <Crown className="w-4 h-4" />
                            Ancient Wisdom Sources
                          </h4>
                          <ul className="space-y-2">
                            {concept.ancientWisdom.map((wisdom, index) => (
                              <li key={index} className="text-amber-300 text-sm flex items-start gap-2">
                                <Star className="w-3 h-3 text-amber-400 mt-1 flex-shrink-0" />
                                {wisdom}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Awakening Insights */}
                        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-600/30">
                          <h4 className="text-purple-200 font-semibold mb-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Awakening Insights
                          </h4>
                          <ul className="space-y-2">
                            {concept.awakening_insights.map((insight, index) => (
                              <li key={index} className="text-purple-300 text-sm flex items-start gap-2">
                                <Heart className="w-3 h-3 text-purple-400 mt-1 flex-shrink-0" />
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Practical Application */}
                        <div className="bg-green-900/20 p-4 rounded-lg border border-green-600/30">
                          <h4 className="text-green-200 font-semibold mb-2 flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Practical Application
                          </h4>
                          <p className="text-green-300 text-sm">{concept.practicalApplication}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {searchResults.length === 0 && (
            <Card className="bg-black/30 border-purple-500/30">
              <CardContent className="text-center py-8">
                <Eye className="w-12 h-12 text-purple-400 mx-auto mb-4 opacity-50" />
                <p className="text-purple-200">No wisdom found matching your search.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-4 mt-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                className={`text-xs ${
                  selectedCategory === category 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'border-purple-400/30 text-purple-200 hover:bg-purple-600/20'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </Button>
            ))}
          </div>

          {/* Category Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.slice(1).map((category) => {
              const categoryWisdom = getDeepWisdomByCategory(category);
              const IconComponent = getCategoryIcon(category);
              
              return (
                <Card 
                  key={category} 
                  className="bg-black/30 border-purple-500/30 hover:border-purple-400/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white flex items-center gap-2 text-sm">
                      <IconComponent className="w-5 h-5 text-purple-400" />
                      {category}
                    </CardTitle>
                    <p className="text-purple-300 text-xs">
                      {categoryWisdom.length} concepts
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1">
                      {categoryWisdom.slice(0, 2).map((concept) => (
                        <p key={concept.id} className="text-purple-200 text-xs truncate">
                          • {concept.title}
                        </p>
                      ))}
                      {categoryWisdom.length > 2 && (
                        <p className="text-purple-400 text-xs">
                          +{categoryWisdom.length - 2} more...
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
