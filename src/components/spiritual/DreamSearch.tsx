
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from 'lucide-react';
import { Dream } from '@/hooks/useDreams';

interface DreamSearchProps {
  dreams: Dream[];
  onFilteredDreams: (filtered: Dream[]) => void;
}

export const DreamSearch: React.FC<DreamSearchProps> = ({ dreams, onFilteredDreams }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<'all' | 'week' | 'month' | 'year'>('all');

  // Get all unique emotions and symbols
  const allEmotions = [...new Set(dreams.flatMap(d => d.emotions || []))];
  const allSymbols = [...new Set(dreams.flatMap(d => d.symbols || []))];

  const applyFilters = () => {
    let filtered = dreams;

    // Text search
    if (searchTerm) {
      filtered = filtered.filter(dream =>
        dream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dream.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (dream.analysis && dream.analysis.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Emotion filter
    if (selectedEmotions.length > 0) {
      filtered = filtered.filter(dream =>
        selectedEmotions.some(emotion => dream.emotions?.includes(emotion))
      );
    }

    // Symbol filter
    if (selectedSymbols.length > 0) {
      filtered = filtered.filter(dream =>
        selectedSymbols.some(symbol => dream.symbols?.includes(symbol))
      );
    }

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      const cutoff = new Date();
      
      switch (dateRange) {
        case 'week':
          cutoff.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoff.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          cutoff.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(dream => new Date(dream.dream_date) >= cutoff);
    }

    onFilteredDreams(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedEmotions([]);
    setSelectedSymbols([]);
    setDateRange('all');
    onFilteredDreams(dreams);
  };

  React.useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedEmotions, selectedSymbols, dateRange, dreams]);

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions(prev =>
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const toggleSymbol = (symbol: string) => {
    setSelectedSymbols(prev =>
      prev.includes(symbol)
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search dreams by title, content, or analysis..."
          className="pl-10 bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-purple-400" />
          <span className="text-purple-200 text-sm">Filters:</span>
        </div>

        {/* Date Range */}
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value as any)}
          className="bg-black/20 border border-purple-500/30 rounded px-2 py-1 text-purple-200 text-sm"
        >
          <option value="all">All Time</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>

        {(selectedEmotions.length > 0 || selectedSymbols.length > 0 || dateRange !== 'all' || searchTerm) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-purple-300 hover:text-white"
          >
            <X className="w-3 h-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Emotion Tags */}
      {allEmotions.length > 0 && (
        <div>
          <div className="text-sm text-purple-300 mb-2">Emotions:</div>
          <div className="flex flex-wrap gap-2">
            {allEmotions.map(emotion => (
              <Badge
                key={emotion}
                variant={selectedEmotions.includes(emotion) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedEmotions.includes(emotion)
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-purple-400 text-purple-300 hover:bg-purple-600/20'
                }`}
                onClick={() => toggleEmotion(emotion)}
              >
                {emotion}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Symbol Tags */}
      {allSymbols.length > 0 && (
        <div>
          <div className="text-sm text-purple-300 mb-2">Symbols:</div>
          <div className="flex flex-wrap gap-2">
            {allSymbols.map(symbol => (
              <Badge
                key={symbol}
                variant={selectedSymbols.includes(symbol) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedSymbols.includes(symbol)
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-purple-400 text-purple-300 hover:bg-purple-600/20'
                }`}
                onClick={() => toggleSymbol(symbol)}
              >
                {symbol}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
