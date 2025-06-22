import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { supabase } from '@/integrations/supabase/client';

const SubscriptionSuccess = () => {
  const navigate = useNavigate();
  const { checkSubscription } = useSubscription();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const completeReferralProcess = async () => {
      // Check subscription status when user lands on success page
      await checkSubscription();
      
      // Handle referral completion if session_id is present
      const sessionId = searchParams.get('session_id');
      if (sessionId) {
        try {
          await supabase.functions.invoke('complete-referral', {
            body: { sessionId }
          });
        } catch (error)  {
          console.error('Error completing referral:', error);
        }
      }
      
      // Clear referral code from localStorage
      localStorage.removeItem('referralCode');
    };
    
    completeReferralProcess();
  }, [checkSubscription, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-gray-900 border-gray-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-white mb-2">
            Welcome to Premium!
          </CardTitle>
          <CardDescription className="text-gray-300">
            Your subscription has been activated successfully
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-lg">
            <Sparkles className="w-6 h-6 text-white mx-auto mb-2" />
            <p className="text-white text-sm">
              You now have access to all premium spiritual guidance features
            </p>
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
            >
              Start Your Journey
            </Button>
            <Button 
              onClick={() => navigate('/pricing')}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Manage Subscription
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionSuccess;
