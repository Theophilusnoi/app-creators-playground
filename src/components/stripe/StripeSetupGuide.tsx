
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Key, CreditCard, Settings, AlertCircle } from 'lucide-react';

export const StripeSetupGuide = () => {
  const setupSteps = [
    {
      title: "Create Stripe Account",
      description: "Sign up for a Stripe account if you don't have one",
      icon: <CreditCard className="w-5 h-5" />,
      action: "Visit Stripe",
      link: "https://dashboard.stripe.com/register",
      status: "required"
    },
    {
      title: "Get Secret Key",
      description: "Copy your Stripe Secret Key from the API keys section",
      icon: <Key className="w-5 h-5" />,
      action: "Get API Keys",
      link: "https://dashboard.stripe.com/apikeys",
      status: "required"
    },
    {
      title: "Add to Supabase",
      description: "Add your Stripe Secret Key to Supabase Edge Function Secrets",
      icon: <Settings className="w-5 h-5" />,
      action: "Configure Secrets",
      link: "https://supabase.com/dashboard/project/_/settings/functions",
      status: "required"
    }
  ];

  const wisdomTierPricing = [
    { name: "Earth Keeper", price: "$29/month", features: "Basic spiritual guidance" },
    { name: "Water Bearer", price: "$79/month", features: "Advanced practices & community" },
    { name: "Fire Keeper", price: "$197/month", features: "Personal mentorship & sacred access" },
    { name: "Ether Walker", price: "$497/month", features: "Complete mastery & mysteries" }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-purple-400" />
            Stripe Payment Setup Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-200 font-semibold">Setup Required</span>
            </div>
            <p className="text-yellow-300 text-sm">
              To enable live payments, you need to configure your Stripe Secret Key in Supabase Edge Function Secrets.
            </p>
          </div>

          <div className="grid gap-4">
            {setupSteps.map((step, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-gray-600/30">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-600/20 p-2 rounded-lg">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{step.title}</h3>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={step.status === 'required' ? 'destructive' : 'default'}>
                    {step.status}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-purple-500/30 text-purple-200"
                    onClick={() => window.open(step.link, '_blank')}
                  >
                    {step.action}
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Wisdom Tier Pricing Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {wisdomTierPricing.map((tier, index) => (
                <div key={index} className="p-3 bg-black/20 rounded-lg border border-gray-600/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-purple-200 font-semibold">{tier.name}</span>
                    <span className="text-white font-bold">{tier.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{tier.features}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
            <h3 className="text-green-200 font-semibold mb-2">What's Already Configured</h3>
            <ul className="text-green-300 text-sm space-y-1">
              <li>✓ Supabase database with subscribers table</li>
              <li>✓ Edge functions for checkout, subscription checking, and customer portal</li>
              <li>✓ Proper pricing structure for all wisdom tiers</li>
              <li>✓ Referral system integration</li>
              <li>✓ Row-level security policies</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
