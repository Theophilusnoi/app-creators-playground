
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './components/auth/AuthProvider';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import PricingPage from './pages/PricingPage';
import StripeTestPage from './pages/StripeTestPage';
import { Toaster } from '@/components/ui/toaster';
import FireKeeperTestPage from "@/pages/FireKeeperTestPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SubscriptionProvider>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/stripe-test" element={<StripeTestPage />} />
                <Route path="/fire-keeper-test" element={<FireKeeperTestPage />} />
              </Routes>
              <Toaster />
            </div>
          </SubscriptionProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
