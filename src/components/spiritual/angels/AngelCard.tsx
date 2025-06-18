
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, PlayCircle } from 'lucide-react';
import type { AngelEntity } from './angelData';

interface AngelCardProps {
  angel: AngelEntity;
  onInvoke: (angel: AngelEntity) => void;
  onMeditate: (angel: AngelEntity) => void;
}

export const AngelCard: React.FC<AngelCardProps> = ({ angel, onInvoke, onMeditate }) => {
  return (
    <Card 
      className="bg-black/30 border-purple-500/30 backdrop-blur-sm transition-all duration-200 hover:bg-black/40 hover:border-purple-400/50 cursor-pointer"
      onClick={() => onInvoke(angel)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2"
            style={{ 
              backgroundColor: `${angel.color}20`,
              borderColor: `${angel.color}40`
            }}
          >
            {angel.symbol}
          </div>
          <div>
            <CardTitle className="text-white text-lg">{angel.name}</CardTitle>
            <p className="text-purple-300 text-sm">{angel.title}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-purple-200 text-sm mb-3">{angel.description}</p>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-purple-400">Domain:</span>
            <span className="text-purple-200">{angel.domain}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-400">Psalm:</span>
            <span className="text-purple-200">{angel.psalm}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-400">Best Time:</span>
            <span className="text-purple-200">{angel.timing}</span>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <Button 
            size="sm" 
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            onClick={(e) => {
              e.stopPropagation();
              onInvoke(angel);
            }}
          >
            <Zap className="w-3 h-3 mr-1" />
            Invoke
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1 border-purple-500/50 text-purple-200 hover:bg-purple-900/50"
            onClick={(e) => {
              e.stopPropagation();
              onMeditate(angel);
            }}
          >
            <PlayCircle className="w-3 h-3 mr-1" />
            Meditate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
