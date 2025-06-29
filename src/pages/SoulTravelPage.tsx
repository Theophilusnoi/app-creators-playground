
import React from 'react';
import SoulTravelDashboard from '@/components/spiritual/pro/soulTravel/SoulTravelDashboard';

const SoulTravelPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <SoulTravelDashboard />
      </div>
    </div>
  );
};

export default SoulTravelPage;
