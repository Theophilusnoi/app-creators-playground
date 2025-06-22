
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/components/auth/AuthProvider";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { AuthPage } from "@/components/auth/AuthPage";
import SpiritualDashboard from "./pages/SpiritualDashboard";
import MeditationEnvironment from "./pages/MeditationEnvironment";
import PricingPage from "./pages/PricingPage";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import NotFound from "./pages/NotFound";
import QuantumSpiritualDashboard from "./pages/QuantumSpiritualDashboard";
import './i18n'; // Initialize i18n

// Create QueryClient outside of component to prevent recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <SubscriptionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SpiritualDashboard />} />
          <Route path="/meditation" element={<MeditationEnvironment />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/subscription-success" element={<SubscriptionSuccess />} />
          <Route path="/quantum-spiritual" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900">
              <QuantumSpiritualDashboard />
            </div>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SubscriptionProvider>
  );
};

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
