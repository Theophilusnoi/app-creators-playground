
import React from 'react';
import SimpleSoulTravelDashboard from '@/components/spiritual/pro/soulTravel/SimpleSoulTravelDashboard';

const SoulTravelPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <SimpleSoulTravelDashboard />
      </div>
    </div>
  );
};

export default SoulTravelPage;
