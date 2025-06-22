
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { SoundProfile } from '@/services/ambient/ambientTypes';

interface ProfileDisplayProps {
  profile: SoundProfile | null;
}

export const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-white font-bold text-lg crisp-text">{profile.name}</h4>
        <Badge variant="secondary" className="bg-purple-600/20 text-purple-100 font-bold border border-purple-400">
          Active
        </Badge>
      </div>
      <p className="text-gray-100 text-base font-semibold crisp-text">{profile.description}</p>
    </div>
  );
};
