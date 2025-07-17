
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
import SpiritualMindPro from "@/pages/SpiritualMindPro";
import QuantumSpiritualDashboardPage from "@/pages/QuantumSpiritualDashboard";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

function App() {
  const queryClient = new QueryClient();

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SubscriptionProvider>
            <div className="min-h-screen bg-gray-50">
              <nav className="w-full flex items-center justify-between px-4 py-3 bg-white/80 shadow-sm sticky top-0 z-30">
                <Link to="/" className="text-lg sm:text-2xl font-bold text-purple-800 whitespace-nowrap">
                  Spiritual Break Through
                </Link>
                <div className="flex-1 flex justify-end">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link to="/about" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">About</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link to="/contact" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">Contact</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link to="/fire-keeper-test" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">Test Fire Keeper</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </nav>
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
                <Route path="/spiritual-mind-pro" element={<SpiritualMindPro />} />
                <Route path="/quantum-spiritual-dashboard" element={<QuantumSpiritualDashboardPage />} />
                <Route path="/pro" element={<SpiritualMindPro />} />
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
