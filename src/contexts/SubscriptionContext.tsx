
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
    throw new Error('useSubscription must be used within a SubscriptionProvider');
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

  const checkSubscription = async () => {
    if (!user) {
      setSubscribed(false);
      setSubscriptionTier(null);
      setSubscriptionEnd(null);
      return;
    }
    
    setLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.access_token) {
        throw new Error('No valid session');
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) {
        console.error('Subscription check error:', error);
        toast({
          title: "Subscription Check",
          description: "Unable to verify subscription status. Using demo mode.",
          variant: "destructive",
        });
        return;
      }

      setSubscribed(data.subscribed || false);
      setSubscriptionTier(data.subscription_tier || null);
      setSubscriptionEnd(data.subscription_end || null);

      if (data.subscribed && data.subscription_tier) {
        const tierNames = {
          earth: 'Earth Keeper',
          water: 'Water Bearer', 
          fire: 'Fire Keeper',
          ether: 'Ether Walker',
          basic: 'Basic',
          premium: 'Premium',
          pro: 'Pro'
        };
        const tierName = tierNames[data.subscription_tier as keyof typeof tierNames] || data.subscription_tier;
        
        toast({
          title: "Active Subscription",
          description: `Your ${tierName} subscription is active until ${new Date(data.subscription_end).toLocaleDateString()}`,
        });
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast({
        title: "Connection Error",
        description: "Unable to connect to subscription service. Using demo mode.",
        variant: "destructive",
      });
      setSubscribed(false);
      setSubscriptionTier(null);
      setSubscriptionEnd(null);
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
      return;
    }

    setLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.access_token) {
        throw new Error('No valid session');
      }

      // Get referral code from localStorage if not provided
      const finalReferralCode = referralCode || localStorage.getItem('referralCode');
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { tier, referralCode: finalReferralCode },
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) {
        console.error('Checkout creation error:', error);
        throw error;
      }

      if (!data?.url) {
        throw new Error('No checkout URL received');
      }

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
      
      toast({
        title: "Redirecting to Checkout",
        description: "Opening secure payment page in a new tab...",
      });
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Checkout Error",
        description: "Unable to create checkout session. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

      // Open customer portal in a new tab
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

  useEffect(() => {
    if (user) {
      checkSubscription();
    } else {
      setSubscribed(false);
      setSubscriptionTier(null);
      setSubscriptionEnd(null);
    }
  }, [user]);

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
