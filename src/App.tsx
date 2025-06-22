
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import Index from './pages/Index';
import PricingPage from './pages/PricingPage';
import SpiritualMindPro from './pages/SpiritualMindPro';
import QuantumSpiritualDashboardPage from './pages/QuantumSpiritualDashboard';
import { Toaster } from '@/components/ui/toaster';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import ProFeaturesPage from '@/pages/ProFeaturesPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SubscriptionProvider>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/spiritual-mind-pro" element={<SpiritualMindPro />} />
              <Route path="/quantum-dashboard" element={<QuantumSpiritualDashboardPage />} />
              <Route path="/pro-features" element={<ProFeaturesPage />} />
            </Routes>
            <Toaster />
          </div>
        </SubscriptionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
