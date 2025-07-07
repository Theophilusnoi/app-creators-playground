import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    console.error('useSubscription must be used within a SubscriptionProvider - returning default values');
    // Return safe defaults instead of throwing
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
  const [hasChecked, setHasChecked] = useState(false);

  const checkSubscription = async () => {
    if (!user || loading) {
      console.log('Skipping subscription check - no user or already loading');
      if (!user) {
        setSubscribed(false);
        setSubscriptionTier(null);
        setSubscriptionEnd(null);
        setHasChecked(true);
      }
      return;
    }
    
    console.log('Starting subscription check for user:', user.email);
    setLoading(true);
    
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.access_token) {
        console.log('No valid session found');
        setSubscribed(false);
        setSubscriptionTier(null);
        setSubscriptionEnd(null);
        setHasChecked(true);
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) {
        console.error('Subscription check error:', error);
        setSubscribed(false);
        setSubscriptionTier(null);
        setSubscriptionEnd(null);
        setHasChecked(true);
        return;
      }

      console.log('Subscription check response:', data);
      setSubscribed(data.subscribed || false);
      setSubscriptionTier(data.subscription_tier || null);
      setSubscriptionEnd(data.subscription_end || null);
      setHasChecked(true);

    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscribed(false);
      setSubscriptionTier(null);
      setSubscriptionEnd(null);
      setHasChecked(true);
    } finally {
      setLoading(false);
    }
  };

  const createCheckout = async (tier: string, referralCode?: string) => {
    if (!user) {
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
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.access_token) {
        throw new Error('No valid session found. Please log in again.');
      }

      const finalReferralCode = referralCode || localStorage.getItem('referralCode');
      
      const requestBody = { 
        tier: tier,
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

      console.log('Checkout response:', { data, error });

      if (error) {
        console.error('Checkout creation error:', error);
        let errorMessage = 'Failed to create checkout session';
        
        // Handle FunctionsHttpError and FunctionsRelayError
        if (error.message) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        } else if (error.context && error.context.message) {
          errorMessage = error.context.message;
        }
        
        // Log full error for debugging
        console.error('Full error object:', JSON.stringify(error, null, 2));
        
        throw new Error(errorMessage);
      }

      if (!data?.url) {
        throw new Error('No checkout URL received from server');
      }

      console.log('Checkout URL received, redirecting to:', data.url);
      
      // Clear any stored referral code after successful checkout creation
      if (finalReferralCode) {
        localStorage.removeItem('referralCode');
      }
      
      // Redirect to Stripe checkout
      window.location.href = data.url;
      
    } catch (error) {
      console.error('Error creating checkout:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // Provide more specific error messages based on common issues
      let userFriendlyMessage = errorMessage;
      
      if (errorMessage.includes('not configured')) {
        userFriendlyMessage = 'Payment system is not configured. Please contact support.';
      } else if (errorMessage.includes('Authentication')) {
        userFriendlyMessage = 'Please log in again and try subscribing.';
      } else if (errorMessage.includes('Invalid subscription tier')) {
        userFriendlyMessage = 'Invalid subscription plan selected. Please try again.';
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        userFriendlyMessage = 'Network error. Please check your connection and try again.';
      } else if (errorMessage.includes('Edge Function returned a non-2xx status code')) {
        userFriendlyMessage = 'Subscription service temporarily unavailable. Please try again in a moment.';
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
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.access_token) {
        throw new Error('No valid session');
      }

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) throw error;

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
      toast({
        title: "Portal Error",
        description: "Unable to open customer portal. Please contact support for subscription management.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Only check subscription once when user changes and hasn't been checked yet
  useEffect(() => {
    if (user && !hasChecked && !loading) {
      checkSubscription();
    } else if (!user) {
      setSubscribed(false);
      setSubscriptionTier(null);
      setSubscriptionEnd(null);
      setHasChecked(true);
    }
  }, [user, hasChecked, loading]);

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
