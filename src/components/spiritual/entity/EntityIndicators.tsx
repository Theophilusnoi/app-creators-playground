
import React from 'react';

interface EntityIndicatorsProps {
  indicators: string[];
}

export const EntityIndicators: React.FC<EntityIndicatorsProps> = ({ indicators }) => {
  if (indicators.length === 0) return null;

  return (
    <div className="text-xs">
      <span className="font-medium">🔍 Entity Indicators:</span>
      <div className="mt-1 space-y-1">
        {indicators.slice(0, 3).map((indicator, i) => (
          <div key={i} className="opacity-75">• {indicator}</div>
        ))}
      </div>
    </div>
  );
};
