
import React from 'react';
import { AngelCard } from './AngelCard';
import { AngelSearch } from './AngelSearch';
import type { AngelEntity } from './angelData';

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
  return (
    <div className="space-y-4">
      <AngelSearch searchTerm={searchTerm} onSearchChange={onSearchChange} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {angels.length > 0 ? (
          angels.map(angel => (
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
            <p className="text-purple-300">No angels found matching your search</p>
            <p className="text-purple-400 text-sm mt-2">Try searching for different terms</p>
          </div>
        )}
      </div>
    </div>
  );
};
