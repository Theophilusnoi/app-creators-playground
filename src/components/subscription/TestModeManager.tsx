
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { 
  TestTube, 
  Crown, 
  Flame, 
  Eye,
  Book,
  Users,
  Moon,
  Sparkles,
  Settings,
  CreditCard
} from 'lucide-react';

export const TestModeManager: React.FC = () => {
  const { user } = useAuth();
  const { createCheckout, loading } = useSubscription();
  const { toast } = useToast();
  const [testMode, setTestMode] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  const handleTestSubscription = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to test subscription features",
        variant: "destructive"
      });
      return;
    }

    try {
      await createCheckout('fire');
      toast({
        title: "Test Checkout Started",
        description: "Use test card: 4242 4242 4242 4242 to complete payment",
      });
    } catch (error) {
      console.error('Test subscription error:', error);
    }
  };

  const testCards = [
    { number: '4242 4242 4242 4242', description: 'Visa - Success' },
    { number: '4000 0000 0000 0002', description: 'Visa - Declined' },
    { number: '4000 0000 0000 9995', description: 'Visa - Insufficient funds' },
    { number: '5555 5555 5555 4444', description: 'Mastercard - Success' }
  ];

  const fireKeeperFeatures = [
    {
      id: 'ai-mentor',
      name: 'Weekly 1:1 AI Mentor Sessions',
      icon: <Sparkles className="w-5 h-5" />,
      description: 'Personalized spiritual guidance sessions',
      demoAvailable: true
    },
    {
      id: 'sacred-traditions',
      name: 'Sacred Tradition Access (Limited)',
      icon: <Book className="w-5 h-5" />,
      description: 'Curated ancient wisdom practices',
      demoAvailable: true
    },
    {
      id: 'ancient-library',
      name: 'Ancient Library (Curated Selections)',
      icon: <Book className="w-5 h-5" />,
      description: 'Access to sacred texts and teachings',
      demoAvailable: true
    },
    {
      id: 'council-community',
      name: 'Council Community Access',
      icon: <Users className="w-5 h-5" />,
      description: 'Join advanced practitioner communities',
      demoAvailable: false
    },
    {
      id: 'lucid-dreaming',
      name: 'Lucid Dreaming Protocols',
      icon: <Moon className="w-5 h-5" />,
      description: 'Advanced dream consciousness techniques',
      demoAvailable: true
    },
    {
      id: 'third-eye',
      name: 'Advanced Third Eye Practices',
      icon: <Eye className="w-5 h-5" />,
      description: 'Enhanced psychic development exercises',
      demoAvailable: true
    }
  ];

  const enableDemoMode = () => {
    setDemoMode(true);
    localStorage.setItem('fire_keeper_demo', 'true');
    toast({
      title: "Demo Mode Activated",
      description: "Fire Keeper features are now available for preview",
    });
  };

  const disableDemoMode = () => {
    setDemoMode(false);
    localStorage.removeItem('fire_keeper_demo');
    toast({
      title: "Demo Mode Disabled",
      description: "Returned to normal subscription access",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Test Mode Configuration */}
      <Card className="border-orange-500/30 bg-gradient-to-r from-orange-900/20 to-red-900/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TestTube className="w-6 h-6 text-orange-400" />
              <CardTitle className="text-white">Stripe Test Mode</CardTitle>
            </div>
            <Badge className="bg-orange-600">
              <Flame className="w-3 h-3 mr-1" />
              Fire Keeper Testing
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">Test Mode</h3>
              <p className="text-gray-300 text-sm">Use test cards for safe testing</p>
            </div>
            <Switch
              checked={testMode}
              onCheckedChange={setTestMode}
            />
          </div>
          
          {testMode && (
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">Test Card Numbers</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {testCards.map((card, index) => (
                    <div key={index} className="bg-black/20 p-3 rounded-lg">
                      <div className="font-mono text-sm text-orange-200">{card.number}</div>
                      <div className="text-xs text-gray-400">{card.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button
                onClick={handleTestSubscription}
                disabled={loading || !user}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {loading ? 'Starting Test...' : 'Start Fire Keeper Test Subscription'}
              </Button>
              
              {!user && (
                <p className="text-yellow-300 text-sm text-center">
                  Please log in to test subscription features
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Demo Mode Configuration */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="w-6 h-6 text-purple-400" />
              <CardTitle className="text-white">Fire Keeper Demo Mode</CardTitle>
            </div>
            <Badge variant={demoMode ? "default" : "secondary"}>
              {demoMode ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">Preview Fire Keeper Features</h3>
              <p className="text-gray-300 text-sm">Access Fire Keeper features without subscription</p>
            </div>
            <Switch
              checked={demoMode}
              onCheckedChange={(checked) => {
                if (checked) {
                  enableDemoMode();
                } else {
                  disableDemoMode();
                }
              }}
            />
          </div>

          {/* Feature List */}
          <div className="space-y-3">
            <h4 className="text-white font-medium">Available Features:</h4>
            {fireKeeperFeatures.map((feature) => (
              <div
                key={feature.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  feature.demoAvailable 
                    ? 'bg-green-900/20 border border-green-500/30' 
                    : 'bg-gray-800/50 border border-gray-600/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  {feature.icon}
                  <div>
                    <div className="text-white text-sm font-medium">{feature.name}</div>
                    <div className="text-gray-400 text-xs">{feature.description}</div>
                  </div>
                </div>
                <Badge 
                  variant={feature.demoAvailable ? "default" : "secondary"}
                  className="text-xs"
                >
                  {feature.demoAvailable ? 'Demo Available' : 'Full Version Only'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-blue-900/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Testing Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h4 className="text-blue-200 font-semibold">For Test Subscriptions:</h4>
            <ul className="text-gray-300 ml-4 space-y-1">
              <li>• Use any test card number above</li>
              <li>• Use any future date for expiry (e.g., 12/25)</li>
              <li>• Use any 3-digit CVC (e.g., 123)</li>
              <li>• Use any valid ZIP code</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-purple-200 font-semibold">For Demo Mode:</h4>
            <ul className="text-gray-300 ml-4 space-y-1">
              <li>• Toggle demo mode to preview Fire Keeper features</li>
              <li>• No payment required for demo access</li>
              <li>• Some features may have limited functionality in demo</li>
              <li>• Demo access is temporary and for testing only</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
