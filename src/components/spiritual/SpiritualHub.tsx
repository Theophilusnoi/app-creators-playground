
import React, { useState, Suspense } from 'react';
import { Tabs } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SpiritualNavigation } from './navigation/SpiritualNavigation';
import { SpiritualHeader } from './header/SpiritualHeader';
import { SpiritualTabNavigation } from './navigation/SpiritualTabNavigation';
import { SpiritualTabContent } from './tabs/SpiritualTabContent';

const SecurityMonitor = React.lazy(() => import('./shared/SecurityMonitor').then(module => ({
  default: module.SecurityMonitor
})));

// Loading component
const LoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-48 w-full" />
  </div>
);

export const SpiritualHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('seraphina');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Get current user for security monitoring
  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  // Performance optimization: preload next tab content
  const handleTabChange = async (newTab: string) => {
    setLoading(true);
    try {
      setActiveTab(newTab);
      // Add any tab-specific initialization here
      toast({
        title: "✨ Loading Enhanced Features",
        description: `Accessing ${newTab} with improved performance`
      });
    } catch (error) {
      console.error('Tab change error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-blue-950 to-indigo-950 p-2 sm:p-4">
      <Suspense fallback={<LoadingSkeleton />}>
        <SecurityMonitor userId={user?.id} pageName="SpiritualHub" />
      </Suspense>
      
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Enhanced Navigation Header */}
        <SpiritualNavigation onQuickAction={setActiveTab} />

        {/* Temple Builder's Path Header */}
        <SpiritualHeader />

        {/* Enhanced Main Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          {/* Tab Navigation */}
          <SpiritualTabNavigation 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />

          {/* Tab Contents */}
          <SpiritualTabContent />
        </Tabs>
      </div>
    </div>
  );
};
