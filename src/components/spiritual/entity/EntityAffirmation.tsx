
import React from 'react';

interface EntityAffirmationProps {
  severity: number;
}

export const EntityAffirmation: React.FC<EntityAffirmationProps> = ({ severity }) => {
  if (severity < 2) return null;

  return (
    <div className="mt-3 p-2 bg-black/30 rounded border border-current/30">
      <p className="text-xs font-medium text-center">
        🛡️ "I am sovereign. Only love may dwell within my sacred space. All else must leave now."
      </p>
    </div>
  );
};
