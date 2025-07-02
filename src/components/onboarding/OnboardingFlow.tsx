
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Moon, Star, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useSubscription } from '@/contexts/SubscriptionContext';

const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscribed } = useSubscription();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Your Spiritual Journey",
      description: "Discover ancient wisdom through AI-powered guidance",
      icon: <Sparkles className="w-12 h-12 text-purple-400" />,
      content: (
        <div className="text-center space-y-4">
          <p className="text-purple-200 text-lg">
            You've taken the first step toward unlocking your spiritual potential. 
            Let's explore what awaits you.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-purple-900/30 p-4 rounded-lg">
              <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <h4 className="text-white font-medium">Personal Growth</h4>
              <p className="text-purple-300 text-sm">Discover your true self</p>
            </div>
            <div className="bg-purple-900/30 p-4 rounded-lg">
              <Moon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h4 className="text-white font-medium">Ancient Wisdom</h4>
              <p className="text-purple-300 text-sm">Access timeless knowledge</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Explore Your Features",
      description: "Here's what you can do with SpiritualMind",
      icon: <Star className="w-12 h-12 text-yellow-400" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg border border-green-500/30">
            <Check className="w-5 h-5 text-green-400" />
            <div>
              <h4 className="text-white font-medium">Palm Reading</h4>
              <p className="text-green-300 text-sm">Free access to basic palm analysis</p>
            </div>
            <Badge className="bg-green-600/30 text-green-200 ml-auto">FREE</Badge>
          </div>
          
          {!subscribed && (
            <>
              <div className="flex items-center gap-3 p-3 bg-orange-900/20 rounded-lg border border-orange-500/30">
                <Sparkles className="w-5 h-5 text-orange-400" />
                <div>
                  <h4 className="text-white font-medium">Tarot Readings</h4>
                  <p className="text-orange-300 text-sm">AI-powered card interpretations</p>
                </div>
                <Badge className="bg-orange-600/30 text-orange-200 ml-auto">UPGRADE</Badge>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <Moon className="w-5 h-5 text-purple-400" />
                <div>
                  <h4 className="text-white font-medium">Soul Travel</h4>
                  <p className="text-purple-300 text-sm">Guided astral projection experiences</p>
                </div>
                <Badge className="bg-purple-600/30 text-purple-200 ml-auto">UPGRADE</Badge>
              </div>
            </>
          )}
        </div>
      )
    },
    {
      title: "Ready to Begin?",
      description: "Your spiritual journey starts now",
      icon: <Sparkles className="w-12 h-12 text-purple-400" />,
      content: (
        <div className="text-center space-y-6">
          <p className="text-purple-200 text-lg">
            You're all set! Choose how you'd like to continue your spiritual exploration.
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/pro')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
              size="lg"
            >
              Start with Free Palm Reading
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            {!subscribed && (
              <Button 
                onClick={() => navigate('/pricing')}
                variant="outline"
                className="w-full border-purple-400 text-purple-200 hover:bg-purple-600/20"
                size="lg"
              >
                Explore Premium Features
              </Button>
            )}
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    navigate('/pro');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-purple-200 text-sm">Step {currentStep + 1} of {steps.length}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={skipOnboarding}
              className="text-purple-300 hover:text-white"
            >
              Skip Tour
            </Button>
          </div>
          <div className="w-full bg-purple-900/30 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-gray-900/50 border-purple-500/30 text-white backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              {currentStepData.icon}
            </div>
            <CardTitle className="text-2xl mb-2">{currentStepData.title}</CardTitle>
            <p className="text-purple-200">{currentStepData.description}</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {currentStepData.content}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={prevStep}
                disabled={currentStep === 0}
                variant="outline"
                className="border-purple-400 text-purple-200 hover:bg-purple-600/20"
              >
                Previous
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => navigate('/pro')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
                >
                  Get Started
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;
