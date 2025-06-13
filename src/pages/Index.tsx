
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpiritualAssessment } from "@/components/spiritual/SpiritualAssessment";
import { ShadowWorkTracker } from "@/components/spiritual/ShadowWorkTracker";
import { SynchronicityDetector } from "@/components/spiritual/SynchronicityDetector";
import { DreamAnalysis } from "@/components/spiritual/DreamAnalysis";
import { MeditationTracker } from "@/components/spiritual/MeditationTracker";
import { Moon, Star, Heart, Eye, Compass } from "lucide-react";

const Index = () => {
  const [user, setUser] = useState(null);
  const [spiritualProgress, setSpiritualProgress] = useState(45);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">SpiritualMind Pro</h1>
                <p className="text-purple-200 text-sm">Guided by Seraphina</p>
              </div>
            </div>
            <Button variant="outline" className="border-purple-400 text-purple-200 hover:bg-purple-400/20">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!hasCompletedAssessment ? (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-white mb-2">
                  Welcome to Your Spiritual Journey
                </CardTitle>
                <CardDescription className="text-purple-200 text-lg">
                  I am Seraphina, your compassionate guide through awakening and transformation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SpiritualAssessment onComplete={() => setHasCompletedAssessment(true)} />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Dashboard Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-200">
                    Spiritual Progress
                  </CardTitle>
                  <Compass className="h-4 w-4 ml-auto text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{spiritualProgress}%</div>
                  <Progress value={spiritualProgress} className="mt-2" />
                  <p className="text-xs text-purple-300 mt-2">
                    Growing in awareness and wisdom
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-200">
                    Shadow Work
                  </CardTitle>
                  <Moon className="h-4 w-4 ml-auto text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">Level 3</div>
                  <p className="text-xs text-purple-300 mt-2">
                    Ready for deeper integration
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-200">
                    Synchronicities
                  </CardTitle>
                  <Eye className="h-4 w-4 ml-auto text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">7</div>
                  <p className="text-xs text-purple-300 mt-2">
                    Patterns detected this week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="shadow-work" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-black/30 border-purple-500/30">
                <TabsTrigger value="shadow-work" className="text-purple-200 data-[state=active]:bg-purple-600">
                  Shadow Work
                </TabsTrigger>
                <TabsTrigger value="synchronicity" className="text-purple-200 data-[state=active]:bg-purple-600">
                  Synchronicity
                </TabsTrigger>
                <TabsTrigger value="dreams" className="text-purple-200 data-[state=active]:bg-purple-600">
                  Dreams
                </TabsTrigger>
                <TabsTrigger value="meditation" className="text-purple-200 data-[state=active]:bg-purple-600">
                  Meditation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="shadow-work">
                <ShadowWorkTracker />
              </TabsContent>

              <TabsContent value="synchronicity">
                <SynchronicityDetector />
              </TabsContent>

              <TabsContent value="dreams">
                <DreamAnalysis />
              </TabsContent>

              <TabsContent value="meditation">
                <MeditationTracker />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
