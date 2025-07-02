
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import { SpiritualHub } from "./components/spiritual/SpiritualHub";
import { QuantumSpiritualDashboard } from "./components/spiritual/QuantumSpiritualDashboard";
import { GamificationDashboard } from "./components/spiritual/GamificationDashboard";
import SoulTravelPage from "./pages/SoulTravelPage";
import { AuthPage } from "./components/auth/AuthPage";
import PricingPage from "./pages/PricingPage";
import OnboardingFlow from "./components/onboarding/OnboardingFlow";
import { AuthProvider } from "./components/auth/AuthProvider";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/onboarding" element={<OnboardingFlow />} />
                  <Route path="/pro" element={<SpiritualHub />} />
                  <Route path="/quantum-dashboard" element={<QuantumSpiritualDashboard />} />
                  <Route path="/gamification" element={<GamificationDashboard />} />
                  <Route path="/soul-travel" element={<SoulTravelPage />} />
                </Routes>
              </BrowserRouter>
            </SubscriptionProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
