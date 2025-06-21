
import { useState, useEffect, useMemo } from 'react';
import type { AngelEntity } from './angelData';

export const useAngelSearch = (angels: AngelEntity[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Enhanced search with multiple criteria and intelligent ranking
  const filteredAngels = useMemo(() => {
    if (!searchTerm) {
      // Return angels sorted by tradition priority when no search
      return [...angels].sort((a, b) => {
        const traditionPriority = {
          'Kabbalah': 1,
          'Universal': 2,
          'Christian': 3,
          'Islamic': 4,
          'New Age': 5
        };
        
        const aPriority = traditionPriority[a.tradition as keyof typeof traditionPriority] || 6;
        const bPriority = traditionPriority[b.tradition as keyof typeof traditionPriority] || 6;
        
        if (aPriority !== bPriority) {
          return aPriority - bPriority;
        }
        
        return a.name.localeCompare(b.name);
      });
    }
    
    const searchLower = searchTerm.toLowerCase();
    
    // Create different priority groups for intelligent ranking
    const exactNameMatch: AngelEntity[] = [];
    const startsWithName: AngelEntity[] = [];
    const containsName: AngelEntity[] = [];
    const startsWithTitle: AngelEntity[] = [];
    const containsTitle: AngelEntity[] = [];
    const domainMatch: AngelEntity[] = [];
    const practicalUseMatch: AngelEntity[] = [];
    const descriptionMatch: AngelEntity[] = [];
    const hebrewNameMatch: AngelEntity[] = [];
    
    angels.forEach(angel => {
      const nameLower = angel.name.toLowerCase();
      const titleLower = angel.title.toLowerCase();
      const domainLower = angel.domain.toLowerCase();
      const descriptionLower = angel.description.toLowerCase();
      const hebrewName = angel.hebrewName?.toLowerCase() || '';
      
      // Priority 1: Exact name match
      if (nameLower === searchLower) {
        exactNameMatch.push(angel);
      }
      // Priority 2: Name starts with search term
      else if (nameLower.startsWith(searchLower)) {
        startsWithName.push(angel);
      }
      // Priority 3: Name contains search term
      else if (nameLower.includes(searchLower)) {
        containsName.push(angel);
      }
      // Priority 4: Title starts with search term
      else if (titleLower.startsWith(searchLower)) {
        startsWithTitle.push(angel);
      }
      // Priority 5: Title contains search term
      else if (titleLower.includes(searchLower)) {
        containsTitle.push(angel);
      }
      // Priority 6: Domain contains search term
      else if (domainLower.includes(searchLower)) {
        domainMatch.push(angel);
      }
      // Priority 7: Practical uses contain search term
      else if (angel.practicalUses.some(use => use.toLowerCase().includes(searchLower))) {
        practicalUseMatch.push(angel);
      }
      // Priority 8: Description contains search term
      else if (descriptionLower.includes(searchLower)) {
        descriptionMatch.push(angel);
      }
      // Priority 9: Hebrew name matches
      else if (hebrewName.includes(searchLower)) {
        hebrewNameMatch.push(angel);
      }
    });
    
    // Sort each group by tradition priority, then alphabetically
    const sortByTraditionAndName = (a: AngelEntity, b: AngelEntity) => {
      const traditionPriority = {
        'Kabbalah': 1,
        'Universal': 2,
        'Christian': 3,
        'Islamic': 4,
        'New Age': 5
      };
      
      const aPriority = traditionPriority[a.tradition as keyof typeof traditionPriority] || 6;
      const bPriority = traditionPriority[b.tradition as keyof typeof traditionPriority] || 6;
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      
      return a.name.localeCompare(b.name);
    };
    
    exactNameMatch.sort(sortByTraditionAndName);
    startsWithName.sort(sortByTraditionAndName);
    containsName.sort(sortByTraditionAndName);
    startsWithTitle.sort(sortByTraditionAndName);
    containsTitle.sort(sortByTraditionAndName);
    domainMatch.sort(sortByTraditionAndName);
    practicalUseMatch.sort(sortByTraditionAndName);
    descriptionMatch.sort(sortByTraditionAndName);
    hebrewNameMatch.sort(sortByTraditionAndName);
    
    // Combine all groups in priority order
    return [
      ...exactNameMatch,
      ...startsWithName,
      ...containsName,
      ...startsWithTitle,
      ...containsTitle,
      ...domainMatch,
      ...practicalUseMatch,
      ...descriptionMatch,
      ...hebrewNameMatch
    ];
  }, [searchTerm, angels]);

  return {
    searchTerm,
    setSearchTerm,
    filteredAngels
  };
};

// Additional utility hooks for enhanced functionality
export const useAngelRecommendations = (userNeeds: string[]) => {
  const [recommendations, setRecommendations] = useState<AngelEntity[]>([]);
  
  useEffect(() => {
    // Logic to recommend angels based on user's stated needs
    // This would integrate with user preferences and past invocations
  }, [userNeeds]);
  
  return recommendations;
};

export const useAngelStatistics = (angels: AngelEntity[]) => {
  return useMemo(() => {
    const stats = {
      totalAngels: angels.length,
      byCategory: {} as Record<string, number>,
      byTradition: {} as Record<string, number>,
      byDomain: {} as Record<string, number>
    };
    
    angels.forEach(angel => {
      // Count by category
      if (angel.category) {
        stats.byCategory[angel.category] = (stats.byCategory[angel.category] || 0) + 1;
      }
      
      // Count by tradition
      if (angel.tradition) {
        stats.byTradition[angel.tradition] = (stats.byTradition[angel.tradition] || 0) + 1;
      }
      
      // Count by domain (split multiple domains)
      const domains = angel.domain.split(',').map(d => d.trim());
      domains.forEach(domain => {
        stats.byDomain[domain] = (stats.byDomain[domain] || 0) + 1;
      });
    });
    
    return stats;
  }, [angels]);
};
