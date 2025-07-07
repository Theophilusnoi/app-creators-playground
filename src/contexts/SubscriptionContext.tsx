
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FunctionsHttpError } from '@supabase/supabase-js';

interface SubscriptionContextType {
  subscribed: boolean;
  subscriptionTier: string | null;
  subscriptionEnd: string | null;
  loading: boolean;
  checkSubscription: () => Promise<void>;
  createCheckout: (tier: string, referralCode?: string) => Promise<void>;
  openCustomerPortal: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Better error parsing utility
const getErrorMessage = async (error: any): Promise<string> => {
  if (error instanceof FunctionsHttpError) {
    try {
      const errorMessage = await error.context.json();
      console.log('Function returned an error', errorMessage);
      return errorMessage.message || errorMessage.error || 'Function error occurred';
    } catch (parseError) {
      console.error('Failed to parse function error:', parseError);
      return 'Function error occurred';
    }
  }
  
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.context?.message) return error.context.message;
  if (error?.details) return error.details;
  return 'An unknown error occurred';
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    console.error('useSubscription must be used within a SubscriptionProvider - returning default values');
    return {
      subscribed: false,
      subscriptionTier: null,
      subscriptionEnd: null,
      loading: false,
      checkSubscription: async () => {},
      createCheckout: async () => {},
      openCustomerPortal: async () => {}
    };
  }
  return context;
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Use ref to prevent concurrent calls
  const isCheckingRef = useRef(false);
  const lastCheckTimeRef = useRef<number>(0);

  const checkSubscription = useCallback(async () => {
    if (!user?.id) {
      console.log('No user ID - resetting subscription state');
      setSubscribed(false);
      setSubscriptionTier(null);
      setSubscriptionEnd(null);
      return;
    }

    // Prevent concurrent calls and rate limiting
    const now = Date.now();
    if (isCheckingRef.current || (now - lastCheckTimeRef.current < 2000)) {
      console.log('Subscription check already in progress or too recent - skipping');
      return;
    }
    
    isCheckingRef.current = true;
    lastCheckTimeRef.current = now;
    
    console.log('Starting subscription check for user:', user.id);
    setLoading(true);
    
    try {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw new Error('Failed to get valid session');
      }

      if (!session.session?.access_token) {
        console.log('No valid session found - user may need to re-login');
        setSubscribed(false);
        setSubscriptionTier(null);
        setSubscriptionEnd(null);
        return;
      }

      console.log('Making subscription check request with valid session');
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) {
        console.error('Subscription check error:', error);
        
        if (error instanceof FunctionsHttpError) {
          try {
            const errorMessage = await error.context.json();
            console.log('Function returned an error', errorMessage);
          } catch (parseError) {
            console.error('Failed to parse function error:', parseError);
          }
        }
        
        setSubscribed(false);
        setSubscriptionTier(null);
        setSubscriptionEnd(null);
        return;
      }

      console.log('Subscription check response:', data);
      setSubscribed(data.subscribed || false);
      setSubscriptionTier(data.subscription_tier || null);
      setSubscriptionEnd(data.subscription_end || null);

    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscribed(false);
      setSubscriptionTier(null);
      setSubscriptionEnd(null);
    } finally {
      setLoading(false);
      isCheckingRef.current = false;
    }
  }, [user?.id]);

  const createCheckout = async (tier: string, referralCode?: string) => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe",
        variant: "destructive",
      });
      throw new Error('User not authenticated');
    }

    if (!tier) {
      toast({
        title: "Invalid Tier",
        description: "Please select a valid subscription tier",
        variant: "destructive",
      });
      throw new Error('Tier is required');
    }

    console.log('Creating checkout for tier:', tier, 'with referral:', referralCode);

    try {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Session error during checkout:', sessionError);
        throw new Error('Failed to get valid session for checkout');
      }

      if (!session.session?.access_token) {
        throw new Error('No valid session found. Please log in again.');
      }

      const finalReferralCode = referralCode || localStorage.getItem('referralCode');
      
      // Structure the request body properly
      const requestBody = { 
        tier: tier,
        interval: 'monthly',
        referralCode: finalReferralCode 
      };
      
      console.log('Sending checkout request with body:', requestBody);

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: requestBody,
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Checkout response:', { hasData: !!data, hasError: !!error });

      if (error) {
        console.error('Checkout creation error:', error);
        const errorMessage = await getErrorMessage(error);
        throw new Error(errorMessage);
      }

      if (!data?.url) {
        console.error('No checkout URL in response:', data);
        throw new Error('No checkout URL received from server');
      }

      console.log('Checkout URL received successfully - redirecting');
      
      if (finalReferralCode) {
        localStorage.removeItem('referralCode');
      }
      
      // Redirect to Stripe checkout
      window.location.href = data.url;
      
    } catch (error) {
      console.error('Error creating checkout:', error);
      const errorMessage = await getErrorMessage(error);
      
      let userFriendlyMessage = errorMessage;
      
      if (errorMessage.includes('not configured')) {
        userFriendlyMessage = 'Payment system is not configured. Please contact support.';
      } else if (errorMessage.includes('Authentication') || errorMessage.includes('session')) {
        userFriendlyMessage = 'Please log in again and try subscribing.';
      } else if (errorMessage.includes('Invalid subscription tier')) {
        userFriendlyMessage = 'Invalid subscription plan selected. Please try again.';
      } else if (errorMessage.includes('Please provide subscription details')) {
        userFriendlyMessage = 'Invalid subscription request. Please try again.';
      }
      
      toast({
        title: "Subscription Error",
        description: userFriendlyMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const openCustomerPortal = async () => {
    if (!user || !subscribed) {
      toast({
        title: "No Active Subscription",
        description: "You need an active subscription to access the customer portal.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        throw new Error('Failed to get valid session');
      }

      if (!session.session?.access_token) {
        throw new Error('No valid session');
      }

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) {
        const errorMessage = await getErrorMessage(error);
        throw new Error(errorMessage);
      }

      if (!data?.url) {
        throw new Error('No portal URL received');
      }

      window.open(data.url, '_blank');
      
      toast({
        title: "Opening Customer Portal",
        description: "Manage your subscription in the new tab that opened.",
      });
    } catch (error) {
      console.error('Error opening customer portal:', error);
      const errorMessage = await getErrorMessage(error);
      toast({
        title: "Portal Error",
        description: `Unable to open customer portal: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Check subscription when user changes
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (user?.id) {
      timeoutId = setTimeout(() => {
        checkSubscription();
      }, 1000);
    } else {
      setSubscribed(false);
      setSubscriptionTier(null);
      setSubscriptionEnd(null);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [user?.id, checkSubscription]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscribed,
        subscriptionTier,
        subscriptionEnd,
        loading,
        checkSubscription,
        createCheckout,
        openCustomerPortal,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
