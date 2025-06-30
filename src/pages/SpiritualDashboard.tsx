
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scan, ArrowLeft, Star, User } from 'lucide-react';
import { CleanDivinationHub } from '@/components/spiritual/divination/CleanDivinationHub';

const SpiritualDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex gap-3">
            <Button
              onClick={() => navigate('/pro')}
              variant="outline"
              className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
            >
              <Star className="w-4 h-4 mr-2" />
              Pro Features
            </Button>
            <Button
              onClick={() => navigate('/soul-travel')}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <User className="w-4 h-4 mr-2" />
              Soul Travel
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <CleanDivinationHub />
      </div>
    </div>
  );
};

export default SpiritualDashboard;
