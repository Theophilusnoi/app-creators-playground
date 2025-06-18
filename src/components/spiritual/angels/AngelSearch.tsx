
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface AngelSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const AngelSearch: React.FC<AngelSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative max-w-md mx-auto">
      <Search className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
      <Input
        placeholder="Search angels by name, title, or domain..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 bg-black/30 border-purple-500/30 text-white placeholder:text-purple-300"
      />
    </div>
  );
};
