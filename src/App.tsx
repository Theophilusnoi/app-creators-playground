
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { AuthPage } from "@/components/auth/AuthPage";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import Index from "./pages/Index";
import SpiritualDashboard from "./pages/SpiritualDashboard";
import QuantumSpiritualDashboard from "./pages/QuantumSpiritualDashboard";
import MeditationEnvironment from "./pages/MeditationEnvironment";
import SpiritualMindPro from "./pages/SpiritualMindPro";
import SoulTravelPage from "./pages/SoulTravelPage";
import ProFeaturesPage from "./pages/ProFeaturesPage";
import PricingPage from "./pages/PricingPage";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SubscriptionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<SpiritualDashboard />} />
              <Route path="/quantum-dashboard" element={<QuantumSpiritualDashboard />} />
              <Route path="/meditation" element={<MeditationEnvironment />} />
              <Route path="/pro" element={<SpiritualMindPro />} />
              <Route path="/soul-travel" element={<SoulTravelPage />} />
              <Route path="/pro-features" element={<ProFeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/subscription-success" element={<SubscriptionSuccess />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SubscriptionProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
