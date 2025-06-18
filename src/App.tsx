
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/components/auth/AuthProvider";
import { AuthPage } from "@/components/auth/AuthPage";
import SpiritualDashboard from "./pages/SpiritualDashboard";
import MeditationEnvironment from "./pages/MeditationEnvironment";
import NotFound from "./pages/NotFound";
import QuantumSpiritualDashboard from "./pages/QuantumSpiritualDashboard";
import './i18n'; // Initialize i18n

const queryClient = new QueryClient();

const AppContent = () => {
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpiritualDashboard />} />
        <Route path="/meditation" element={<MeditationEnvironment />} />
        <Route path="/quantum-spiritual" element={
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900">
            <QuantumSpiritualDashboard />
          </div>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
