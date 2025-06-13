
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeditationForm } from "@/components/spiritual/MeditationForm";
import { DreamForm } from "@/components/spiritual/DreamForm";
import { ShadowWorkForm } from "@/components/spiritual/ShadowWorkForm";
import { SynchronicityForm } from "@/components/spiritual/SynchronicityForm";
import { AssessmentForm } from "@/components/spiritual/AssessmentForm";
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { 
  Star, 
  TrendingUp, 
  Clock, 
  Flame, 
  Wind, 
  Moon, 
  Eye, 
  Sparkles,
  BarChart3,
  LogOut,
  User as UserIcon
} from "lucide-react";

const SpiritualDashboard = () => {
  const { user } = useAuth();
  const [streakCount] = useState(7);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Soul Seeker';
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase();

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
                <h1 className="text-2xl font-bold text-white">Spiritual Break Through</h1>
                <p className="text-purple-200 text-sm">Your Journey to Enlightenment</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-semibold">{initials}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{displayName}</p>
                  <p className="text-purple-300 text-sm">{user?.email}</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-purple-400 text-purple-200 hover:bg-purple-400/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-white mb-2">
                Welcome back, {displayName}!
              </CardTitle>
              <CardDescription className="text-purple-200 text-lg">
                Your spiritual journey continues. Explore your personalized features below.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm text-center">
            <CardContent className="pt-6">
              <Star className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">50K+</div>
              <div className="text-purple-200">Souls Awakened</div>
              <div className="text-purple-300 text-sm mt-1">Join the transformation</div>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">94%</div>
              <div className="text-purple-200">Breakthrough Rate</div>
              <div className="text-purple-300 text-sm mt-1">Experience profound shifts</div>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm text-center">
            <CardContent className="pt-6">
              <Clock className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">28 Days</div>
              <div className="text-purple-200">Average Awakening</div>
              <div className="text-purple-300 text-sm mt-1">Rapid spiritual growth</div>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm text-center">
            <CardContent className="pt-6">
              <Flame className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">{streakCount}</div>
              <div className="text-purple-200">Day Streak</div>
              <div className="text-purple-300 text-sm mt-1">Keep going!</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="meditation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-black/30 border-purple-500/30">
            <TabsTrigger value="meditation" className="text-purple-200 data-[state=active]:bg-purple-600">
              <Wind className="w-4 h-4 mr-2" />
              Meditation
            </TabsTrigger>
            <TabsTrigger value="dreams" className="text-purple-200 data-[state=active]:bg-purple-600">
              <Moon className="w-4 h-4 mr-2" />
              Dreams
            </TabsTrigger>
            <TabsTrigger value="shadow" className="text-purple-200 data-[state=active]:bg-purple-600">
              <Eye className="w-4 h-4 mr-2" />
              Shadow Work
            </TabsTrigger>
            <TabsTrigger value="synchronicity" className="text-purple-200 data-[state=active]:bg-purple-600">
              <Sparkles className="w-4 h-4 mr-2" />
              Synchronicity
            </TabsTrigger>
            <TabsTrigger value="assessment" className="text-purple-200 data-[state=active]:bg-purple-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Assessment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="meditation">
            <MeditationForm />
          </TabsContent>

          <TabsContent value="dreams">
            <DreamForm />
          </TabsContent>

          <TabsContent value="shadow">
            <ShadowWorkForm />
          </TabsContent>

          <TabsContent value="synchronicity">
            <SynchronicityForm />
          </TabsContent>

          <TabsContent value="assessment">
            <AssessmentForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SpiritualDashboard;
