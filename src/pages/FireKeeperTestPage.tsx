import React from 'react';
import { TestModeManager } from '@/components/subscription/TestModeManager';
import { FireKeeperFeatureGate } from '@/components/spiritual/FireKeeperFeatureGate';
import { FireKeeperAIMentorDemo } from '@/components/spiritual/demo/FireKeeperAIMentorDemo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFireKeeperAccess } from '@/hooks/useFireKeeperAccess';
import { 
  Flame, 
  Book, 
  Eye, 
  Moon, 
  Users, 
  Sparkles,
  TestTube 
} from 'lucide-react';

const FireKeeperTestPage = () => {
  const { hasFireKeeperAccess, accessType } = useFireKeeperAccess();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-purple-900 py-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="w-8 h-8 text-orange-400" />
            <h1 className="text-4xl font-bold text-white">Fire Keeper Testing & Demo</h1>
          </div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Test Fire Keeper subscription features and explore demo capabilities
          </p>
          
          {hasFireKeeperAccess && (
            <div className="mt-4">
              <Badge className={accessType === 'full' ? 'bg-orange-600' : 'bg-purple-600'}>
                {accessType === 'full' ? (
                  <>
                    <Flame className="w-3 h-3 mr-1" />
                    Full Fire Keeper Access
                  </>
                ) : (
                  <>
                    <TestTube className="w-3 h-3 mr-1" />
                    Demo Mode Active
                  </>
                )}
              </Badge>
            </div>
          )}
        </div>

        {/* Test Mode Manager */}
        <TestModeManager />

        {/* Fire Keeper Features Demo */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Fire Keeper Features Preview
          </h2>

          {/* AI Mentor Sessions */}
          <FireKeeperFeatureGate
            featureId="ai-mentor"
            featureName="Weekly 1:1 AI Mentor Sessions"
            description="Personalized spiritual guidance with advanced AI"
            demoContent={<FireKeeperAIMentorDemo />}
          >
            <FireKeeperAIMentorDemo />
          </FireKeeperFeatureGate>

          {/* Sacred Traditions */}
          <FireKeeperFeatureGate
            featureId="sacred-traditions"
            featureName="Sacred Tradition Access"
            description="Limited access to ancient spiritual practices"
          >
            <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Book className="w-5 h-5" />
                  Sacred Traditions Library
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-black/20 p-3 rounded-lg">
                    <h4 className="text-purple-200 font-medium">Fire Breathing Techniques</h4>
                    <p className="text-gray-300 text-sm">Ancient Pranayama practices for energy cultivation</p>
                  </div>
                  <div className="bg-black/20 p-3 rounded-lg">
                    <h4 className="text-purple-200 font-medium">Solar Plexus Activation</h4>
                    <p className="text-gray-300 text-sm">Traditional chakra opening rituals</p>
                  </div>
                  <div className="bg-black/20 p-3 rounded-lg">
                    <h4 className="text-purple-200 font-medium">Fire Element Meditation</h4>
                    <p className="text-gray-300 text-sm">Concentration practices from various traditions</p>
                  </div>
                  <div className="bg-black/20 p-3 rounded-lg">
                    <h4 className="text-purple-200 font-medium">Transformation Rituals</h4>
                    <p className="text-gray-300 text-sm">Sacred ceremonies for personal change</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FireKeeperFeatureGate>

          {/* Advanced Third Eye Practices */}
          <FireKeeperFeatureGate
            featureId="third-eye"
            featureName="Advanced Third Eye Practices"
            description="Enhanced psychic development and intuition training"
          >
            <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Third Eye Development Center
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold">Advanced Training Modules</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="bg-black/20 p-2 rounded">
                      <div className="text-indigo-200">Clairvoyance Development</div>
                    </div>
                    <div className="bg-black/20 p-2 rounded">
                      <div className="text-indigo-200">Psychic Protection</div>
                    </div>
                    <div className="bg-black/20 p-2 rounded">
                      <div className="text-indigo-200">Energy Reading</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FireKeeperFeatureGate>

          {/* Lucid Dreaming Protocols */}
          <FireKeeperFeatureGate
            featureId="lucid-dreaming"
            featureName="Lucid Dreaming Protocols"
            description="Advanced dream consciousness and astral projection techniques"
          >
            <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Moon className="w-5 h-5" />
                  Dream Consciousness Laboratory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-blue-200 font-medium">Lucidity Techniques</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Reality checking protocols</li>
                      <li>• Dream journaling systems</li>
                      <li>• Wake-back-to-bed methods</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-blue-200 font-medium">Advanced Practices</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Shared dreaming sessions</li>
                      <li>• Astral projection training</li>
                      <li>• Dream healing protocols</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FireKeeperFeatureGate>
        </div>
      </div>
    </div>
  );
};

export default FireKeeperTestPage;
