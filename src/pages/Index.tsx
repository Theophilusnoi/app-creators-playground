
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SpiritualAssessment } from "@/components/spiritual/SpiritualAssessment";
import { ShadowWorkTracker } from "@/components/spiritual/ShadowWorkTracker";
import { SynchronicityDetector } from "@/components/spiritual/SynchronicityDetector";
import { DreamAnalysis } from "@/components/spiritual/DreamAnalysis";
import { MeditationTracker } from "@/components/spiritual/MeditationTracker";
import { Moon, Star, Heart, Eye, Compass, User, Zap, Crown, Shield, Brain, ChevronDown, LogIn } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { validateEmail } from '@/utils/security';

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [spiritualProgress, setSpiritualProgress] = useState(45);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setShowAuthModal(true);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    if (!password) {
      toast({
        title: "Password Required",
        description: "Please enter your password",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You have been successfully signed in.",
        });
        setShowAuthModal(false);
        navigate('/pro-features');
      } else {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/pro-features`
          }
        });
        if (error) throw error;
        
        toast({
          title: "Account Created",
          description: "Please check your email for the confirmation link!",
        });
        setShowAuthModal(false);
      }
    } catch (error: any) {
      toast({
        title: "Authentication Failed",
        description: error.message || "An error occurred during authentication",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowAuthModal(false);
    setEmail('');
    setPassword('');
    setLoading(false);
  };

  const switchAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
  };

  const handleAssessmentComplete = () => {
    console.log('Assessment completed, transitioning to main dashboard');
    setHasCompletedAssessment(true);
    toast({
      title: "Welcome to Your Spiritual Journey!",
      description: "Your assessment is complete. Explore the tools below to begin your transformation.",
    });
  };

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
            <div className="flex items-center gap-4">
              <Link to="/pro-features">
                <Button variant="outline" className="border-purple-400 text-purple-200 hover:bg-purple-400/20">
                  <Crown className="w-4 h-4 mr-2" />
                  Pro Features
                </Button>
              </Link>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-purple-400 text-purple-200 hover:bg-purple-400/20">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900/95 border-purple-500/30 backdrop-blur-sm">
                    <DropdownMenuItem className="text-purple-200 hover:bg-purple-600/20 focus:bg-purple-600/20">
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-purple-200 hover:bg-purple-600/20 focus:bg-purple-600/20">
                      <Crown className="w-4 h-4 mr-2" />
                      Pro Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={signOut}
                      className="text-red-300 hover:bg-red-600/20 focus:bg-red-600/20"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={handleSignIn}
                  variant="outline" 
                  className="border-purple-400 text-purple-200 hover:bg-purple-400/20"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900/95 border border-purple-500/30 rounded-lg p-6 max-w-md w-full mx-4 backdrop-blur-sm">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-purple-200">
                {isLogin ? 'Connect with your spiritual journey' : 'Begin your spiritual awakening'}
              </p>
            </div>
            
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-purple-200 text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-purple-200 text-sm font-medium mb-2">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <Button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  className="flex-1 border-purple-500/30 text-purple-200"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-purple-300 text-sm">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button 
                    type="button"
                    className="text-purple-400 hover:text-purple-300 ml-1"
                    onClick={switchAuthMode}
                  >
                    {isLogin ? 'Sign up here' : 'Sign in here'}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

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
                <SpiritualAssessment onComplete={handleAssessmentComplete} />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Welcome Message */}
            <Card className="bg-gradient-to-r from-green-900/40 to-teal-900/40 border-green-500/30 backdrop-blur-sm">
              <CardContent className="text-center py-8">
                <div className="text-6xl mb-4">🌟</div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Welcome to Your Spiritual Dashboard!
                </h2>
                <p className="text-green-200 text-lg mb-6">
                  Your spiritual assessment is complete. Below you'll find personalized tools and practices 
                  to support your journey of awakening and transformation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/dashboard">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Star className="w-4 h-4 mr-2" />
                      Enter Full Dashboard
                    </Button>
                  </Link>
                  <Link to="/pro-features">
                    <Button variant="outline" className="border-purple-400 text-purple-200 hover:bg-purple-400/20">
                      <Crown className="w-4 h-4 mr-2" />
                      Explore Pro Features
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Featured Pro Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-indigo-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="bg-indigo-600/20 p-3 rounded-lg">
                      <Zap className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-xl">Telekinesis Training</div>
                      <Badge className="bg-yellow-600/20 text-yellow-200 mt-1">Pro Feature</Badge>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-purple-200">
                    Master mind-matter interface through ancient wisdom and modern neuroscience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-purple-200">
                      <Shield className="w-4 h-4 text-green-400" />
                      Ethical guidelines & safety protocols
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-200">
                      <Brain className="w-4 h-4 text-blue-400" />
                      Progressive 4-stage training system
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-200">
                      <Eye className="w-4 h-4 text-purple-400" />
                      Ancient Egyptian, Buddhist & Yoruba wisdom
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/spiritual-mind-pro" className="flex-1">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                        <Zap className="w-4 h-4 mr-2" />
                        Start Training
                      </Button>
                    </Link>
                    <Link to="/pro-features">
                      <Button variant="outline" className="border-indigo-500/30 text-indigo-200 hover:bg-indigo-600/20">
                        Demo
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="bg-purple-600/20 p-3 rounded-lg">
                      <Crown className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-xl">All Pro Features</div>
                      <Badge className="bg-purple-600/20 text-purple-200 mt-1">Complete Access</Badge>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-purple-200">
                    Unlock the full spiritual mastery platform with advanced consciousness technologies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-purple-200">
                      <Star className="w-4 h-4 text-yellow-400" />
                      Sacred Bathing & Third Eye Activation
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-200">
                      <Shield className="w-4 h-4 text-red-400" />
                      24/7 AI Emergency Spiritual Support
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-200">
                      <Heart className="w-4 h-4 text-pink-400" />
                      Personal Guidance Sessions
                    </div>
                  </div>
                  <Link to="/pro-features" className="block">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90">
                      <Crown className="w-4 h-4 mr-2" />
                      Explore All Features
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

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
