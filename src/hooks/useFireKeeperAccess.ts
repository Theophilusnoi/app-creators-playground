import { useState, useEffect } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';

export const useFireKeeperAccess = () => {
  const { subscribed, subscriptionTier } = useSubscription();
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const demoModeEnabled = localStorage.getItem('fire_keeper_demo') === 'true';
    setDemoMode(demoModeEnabled);
  }, []);

  const hasFireKeeperAccess = () => {
    // Check if user has actual Fire Keeper subscription or higher
    const hasSubscription = subscribed && (
      subscriptionTier === 'fire' || 
      subscriptionTier === 'ether'
    );
    
    // Or if demo mode is enabled
    return hasSubscription || demoMode;
  };

  const hasFeatureAccess = (featureId: string) => {
    const fireKeeperFeatures = {
      'ai-mentor': true,
      'sacred-traditions': true,
      'ancient-library': true,
      'council-community': !demoMode, // Only available with real subscription
      'lucid-dreaming': true,
      'third-eye': true,
      'neuro-spiritual': true
    };

    return hasFireKeeperAccess() && fireKeeperFeatures[featureId as keyof typeof fireKeeperFeatures];
  };

  const getAccessType = () => {
    if (subscribed && (subscriptionTier === 'fire' || subscriptionTier === 'ether')) {
      return 'full';
    }
    if (demoMode) {
      return 'demo';
    }
    return 'none';
  };

  return {
    hasFireKeeperAccess: hasFireKeeperAccess(),
    hasFeatureAccess,
    demoMode,
    accessType: getAccessType(),
    isFullAccess: getAccessType() === 'full',
    isDemoAccess: getAccessType() === 'demo'
  };
};
