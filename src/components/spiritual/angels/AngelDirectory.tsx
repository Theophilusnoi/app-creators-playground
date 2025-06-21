
import React, { useState } from 'react';
import { AngelCard } from './AngelCard';
import { AngelSearch } from './AngelSearch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import type { AngelEntity } from './angelData';
import { angelCategories, angelTraditions, getAngelsByCategory, getAngelsByTradition, searchAngelsByNeed } from './angelData';
import { Filter, X, Search } from 'lucide-react';

interface AngelDirectoryProps {
  angels: AngelEntity[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onInvokeAngel: (angel: AngelEntity) => void;
  onStartMeditation: (angel: AngelEntity) => void;
}

export const AngelDirectory: React.FC<AngelDirectoryProps> = ({
  angels,
  searchTerm,
  onSearchChange,
  onInvokeAngel,
  onStartMeditation
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTradition, setSelectedTradition] = useState<string>('all');
  const [needSearch, setNeedSearch] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter angels based on selected criteria
  let filteredAngels = angels;

  if (selectedCategory !== 'all') {
    filteredAngels = filteredAngels.filter(angel => angel.category === selectedCategory);
  }

  if (selectedTradition !== 'all') {
    filteredAngels = filteredAngels.filter(angel => angel.tradition === selectedTradition);
  }

  if (needSearch) {
    const needResults = searchAngelsByNeed(needSearch);
    filteredAngels = filteredAngels.filter(angel => 
      needResults.some(needAngel => needAngel.id === angel.id)
    );
  }

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTradition('all');
    setNeedSearch('');
    onSearchChange('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedTradition !== 'all' || needSearch || searchTerm;

  // Quick need buttons for common requests
  const quickNeeds = [
    'protection', 'healing', 'love', 'money', 'wisdom', 'peace', 'success', 'guidance'
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filter Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Divine Angelic Directory</h3>
        <p className="text-purple-200 mb-4">
          Browse {angels.length} angelic entities from sacred traditions worldwide
        </p>
        
        <AngelSearch searchTerm={searchTerm} onSearchChange={onSearchChange} />
      </div>

      {/* Quick Need Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        <span className="text-purple-300 text-sm mr-2">Quick Help:</span>
        {quickNeeds.map(need => (
          <Button
            key={need}
            variant="outline"
            size="sm"
            onClick={() => setNeedSearch(need)}
            className={`text-xs ${needSearch === need ? 'bg-purple-600' : 'bg-black/30'} border-purple-500/30 text-purple-200 hover:bg-purple-600/50`}
          >
            {need}
          </Button>
        ))}
      </div>

      {/* Advanced Filters */}
      <div className="bg-black/20 rounded-lg p-4 border border-purple-500/30">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="text-purple-300 hover:text-purple-100"
          >
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-red-300 hover:text-red-100"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-purple-300 text-sm mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-black/30 border-purple-500/30 text-white">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-purple-500/30">
                  <SelectItem value="all">All Categories</SelectItem>
                  {angelCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-purple-300 text-sm mb-2 block">Tradition</label>
              <Select value={selectedTradition} onValueChange={setSelectedTradition}>
                <SelectTrigger className="bg-black/30 border-purple-500/30 text-white">
                  <SelectValue placeholder="All Traditions" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-purple-500/30">
                  <SelectItem value="all">All Traditions</SelectItem>
                  {angelTraditions.map(tradition => (
                    <SelectItem key={tradition} value={tradition}>
                      {tradition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-purple-300 text-sm mb-2 block">Search by Need</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                <Input
                  placeholder="e.g., anxiety, money, healing..."
                  value={needSearch}
                  onChange={(e) => setNeedSearch(e.target.value)}
                  className="pl-10 bg-black/30 border-purple-500/30 text-white placeholder:text-purple-300"
                />
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-purple-400 text-sm">Active filters:</span>
            {searchTerm && (
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-200">
                Search: "{searchTerm}"
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-200">
                Category: {selectedCategory}
              </Badge>
            )}
            {selectedTradition !== 'all' && (
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-200">
                Tradition: {selectedTradition}
              </Badge>
            )}
            {needSearch && (
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-200">
                Need: {needSearch}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-purple-300 text-sm">
          Showing {filteredAngels.length} of {angels.length} angels
        </p>
      </div>

      {/* Angel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAngels.length > 0 ? (
          filteredAngels.map(angel => (
            <AngelCard
              key={angel.id}
              angel={angel}
              onInvoke={onInvokeAngel}
              onMeditate={onStartMeditation}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-4xl mb-4">😇</div>
            <p className="text-purple-300">No angels found matching your criteria</p>
            <p className="text-purple-400 text-sm mt-2">Try adjusting your filters or search terms</p>
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                className="mt-4 bg-purple-600 hover:bg-purple-700"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Directory Statistics */}
      <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-lg p-4 border border-purple-500/30">
        <h4 className="text-purple-200 font-medium mb-3">Directory Overview</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{getAngelsByCategory('Shem HaMephorash').length}</div>
            <div className="text-purple-300">Shem HaMephorash</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{getAngelsByCategory('Archangel').length}</div>
            <div className="text-purple-300">Archangels</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{getAngelsByTradition('Kabbalah').length}</div>
            <div className="text-purple-300">Kabbalistic</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{getAngelsByTradition('Universal').length}</div>
            <div className="text-purple-300">Universal</div>
          </div>
        </div>
      </div>
    </div>
  );
};
