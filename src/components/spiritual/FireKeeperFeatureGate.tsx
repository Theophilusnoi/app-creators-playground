
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFireKeeperAccess } from '@/hooks/useFireKeeperAccess';
import { 
  Flame, 
  Crown, 
  Lock, 
  TestTube,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FireKeeperFeatureGateProps {
  featureId: string;
  featureName: string;
  description: string;
  children: React.ReactNode;
  demoContent?: React.ReactNode;
}

export const FireKeeperFeatureGate: React.FC<FireKeeperFeatureGateProps> = ({
  featureId,
  featureName,
  description,
  children,
  demoContent
}) => {
  const { hasFeatureAccess, accessType, demoMode } = useFireKeeperAccess();

  if (hasFeatureAccess(featureId)) {
    return (
      <div className="relative">
        {accessType === 'demo' && (
          <div className="mb-4">
            <Badge className="bg-purple-600">
              <TestTube className="w-3 h-3 mr-1" />
              Demo Mode - Limited Functionality
            </Badge>
          </div>
        )}
        {accessType === 'demo' && demoContent ? demoContent : children}
      </div>
    );
  }

  return (
    <Card className="border-orange-500/30 bg-gradient-to-r from-orange-900/20 to-red-900/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Flame className="w-6 h-6 text-orange-400" />
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="w-4 h-4" />
              {featureName}
            </CardTitle>
            <p className="text-gray-300 text-sm mt-1">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-3">
          <Crown className="w-12 h-12 text-orange-400 mx-auto" />
          <h3 className="text-white font-semibold">Fire Keeper Feature</h3>
          <p className="text-gray-300 text-sm">
            This feature requires a Fire Keeper subscription or higher.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => window.location.href = '/pricing'}
              className="bg-orange-600 hover:bg-orange-700 flex-1"
            >
              <Flame className="w-4 h-4 mr-2" />
              Upgrade to Fire Keeper
            </Button>
            
            <Button 
              onClick={() => {
                localStorage.setItem('fire_keeper_demo', 'true');
                window.location.reload();
              }}
              variant="outline"
              className="border-purple-500/30 text-purple-200 hover:bg-purple-900/20 flex-1"
            >
              <TestTube className="w-4 h-4 mr-2" />
              Try Demo Mode
            </Button>
          </div>
          
          <div className="text-xs text-gray-400">
            Demo mode provides limited access to Fire Keeper features
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
