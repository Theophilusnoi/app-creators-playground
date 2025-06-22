
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { SoundLayer } from '@/services/ambient/ambientTypes';

interface LayerControlsProps {
  layers: SoundLayer[];
  onVolumeChange: (layerId: string, volume: number) => void;
}

export const LayerControls: React.FC<LayerControlsProps> = ({ layers, onVolumeChange }) => {
  if (layers.length === 0) return null;

  return (
    <div className="space-y-3 pt-2 border-t border-gray-600">
      <h5 className="text-white font-bold text-lg crisp-text">Layer Controls</h5>
      {layers.map((layer) => (
        <div key={layer.id} className="bg-gray-700/30 rounded-lg p-3 border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge 
                className={`text-sm font-bold ${
                  layer.type === 'nature' ? 'bg-green-600 text-white' :
                  layer.type === 'instrument' ? 'bg-blue-600 text-white' :
                  'bg-purple-600 text-white'
                }`}
              >
                {layer.type}
              </Badge>
              <span className="text-white text-base font-bold crisp-text">{layer.name}</span>
            </div>
            <Badge variant="outline" className="text-sm font-bold text-white border-white">
              {layer.density}
            </Badge>
          </div>
          <Slider
            defaultValue={[layer.volume * 100]}
            onValueChange={(value) => onVolumeChange(layer.id, value[0])}
            max={100}
            step={1}
            className="mt-2"
          />
        </div>
      ))}
    </div>
  );
};
