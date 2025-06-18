
import { useState, useEffect } from 'react';
import type { AngelEntity } from './angelData';

export const useAngelSearch = (angels: AngelEntity[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAngels, setFilteredAngels] = useState<AngelEntity[]>(angels);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredAngels(angels);
      return;
    }
    
    const searchLower = searchTerm.toLowerCase();
    
    // Create different priority groups for sorting
    const startsWithName: AngelEntity[] = [];
    const containsName: AngelEntity[] = [];
    const startsWithTitle: AngelEntity[] = [];
    const containsTitle: AngelEntity[] = [];
    const containsDomain: AngelEntity[] = [];
    
    angels.forEach(angel => {
      const nameLower = angel.name.toLowerCase();
      const titleLower = angel.title.toLowerCase();
      const domainLower = angel.domain.toLowerCase();
      
      // Priority 1: Name starts with search term
      if (nameLower.startsWith(searchLower)) {
        startsWithName.push(angel);
      }
      // Priority 2: Name contains search term (but doesn't start with it)
      else if (nameLower.includes(searchLower)) {
        containsName.push(angel);
      }
      // Priority 3: Title starts with search term
      else if (titleLower.startsWith(searchLower)) {
        startsWithTitle.push(angel);
      }
      // Priority 4: Title contains search term
      else if (titleLower.includes(searchLower)) {
        containsTitle.push(angel);
      }
      // Priority 5: Domain contains search term
      else if (domainLower.includes(searchLower)) {
        containsDomain.push(angel);
      }
    });
    
    // Sort each group alphabetically by name
    const sortByName = (a: AngelEntity, b: AngelEntity) => a.name.localeCompare(b.name);
    
    startsWithName.sort(sortByName);
    containsName.sort(sortByName);
    startsWithTitle.sort(sortByName);
    containsTitle.sort(sortByName);
    containsDomain.sort(sortByName);
    
    // Combine all groups in priority order
    const filtered = [
      ...startsWithName,
      ...containsName,
      ...startsWithTitle,
      ...containsTitle,
      ...containsDomain
    ];
    
    setFilteredAngels(filtered);
  }, [searchTerm, angels]);

  return {
    searchTerm,
    setSearchTerm,
    filteredAngels
  };
};
