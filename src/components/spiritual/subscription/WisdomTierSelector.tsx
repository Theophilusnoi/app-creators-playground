
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Mountain, Flame, Droplet } from "lucide-react";
import { WISDOM_TIERS, WisdomTier } from '@/types/subscription';

interface WisdomTierSelectorProps {
  currentTier?: string;
  onSelectTier: (tier: WisdomTier) => void;
}

export const WisdomTierSelector: React.FC<WisdomTierSelectorProps> = ({
  currentTier,
  onSelectTier
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'earth': return <Mountain className="w-6 h-6" />;
      case 'water': return <Droplet className="w-6 h-6" />;
      case 'fire': return <Flame className="w-6 h-6" />;
      case 'ether': return <Crown className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  const getElementGradient = (element: string) => {
    switch (element) {
      case 'earth': return 'from-green-600 to-amber-600';
      case 'water': return 'from-blue-600 to-cyan-500';
      case 'fire': return 'from-red-600 to-orange-500';
      case 'ether': return 'from-purple-600 to-indigo-600';
      default: return 'from-gray-600 to-gray-500';
    }
  };

  const getPrice = (tier: WisdomTier) => {
    return billingCycle === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice;
  };

  const getSavings = (tier: WisdomTier) => {
    const monthlyTotal = tier.monthlyPrice * 12;
    const yearlyPrice = tier.yearlyPrice;
    return monthlyTotal - yearlyPrice;
  };

  return (
    <div className="space-y-6">
      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-800 rounded-lg p-1 flex">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md transition-colors ${
              billingCycle === 'yearly'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Yearly
            <Badge className="ml-2 bg-green-600 text-xs">Save 20%</Badge>
          </button>
        </div>
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {WISDOM_TIERS.map((tier) => (
          <Card
            key={tier.id}
            className={`relative transition-all duration-300 hover:scale-105 ${
              currentTier === tier.id
                ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-900/50 to-indigo-900/50'
                : 'bg-black/30 border-purple-500/30 hover:border-purple-400/50'
            } backdrop-blur-sm`}
          >
            <CardHeader className="pb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getElementGradient(tier.element)} flex items-center justify-center mb-4`}>
                {getElementIcon(tier.element)}
              </div>
              
              <CardTitle className="text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{tier.name}</h3>
                  {currentTier === tier.id && (
                    <Badge className="bg-green-600">Current</Badge>
                  )}
                </div>
                <p className="text-sm text-purple-200 font-normal">
                  {tier.description}
                </p>
              </CardTitle>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  ${getPrice(tier)}
                  <span className="text-sm text-purple-300">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>
                {billingCycle === 'yearly' && (
                  <div className="text-green-400 text-sm">
                    Save ${getSavings(tier)} yearly
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Features */}
              <div className="space-y-2">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-100 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Cultural Access */}
              <div>
                <h5 className="text-white font-semibold mb-2 text-sm">Cultural Access</h5>
                <div className="flex flex-wrap gap-1">
                  {tier.culturalAccess.map((level, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs border-purple-400 text-purple-200"
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Restrictions */}
              {tier.restrictions.length > 0 && (
                <div>
                  <h5 className="text-gray-400 font-semibold mb-2 text-sm">Limitations</h5>
                  <div className="space-y-1">
                    {tier.restrictions.map((restriction, index) => (
                      <div key={index} className="text-gray-400 text-xs">
                        • {restriction}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <Button
                onClick={() => onSelectTier(tier)}
                disabled={currentTier === tier.id}
                className={`w-full ${
                  currentTier === tier.id
                    ? 'bg-gray-600 cursor-not-allowed'
                    : `bg-gradient-to-r ${getElementGradient(tier.element)} hover:scale-105 transform transition-all`
                }`}
              >
                {currentTier === tier.id ? 'Current Plan' : `Choose ${tier.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-purple-300 text-sm">
        <p>All plans include 7-day free trial • Cancel anytime • Sacred knowledge protected</p>
      </div>
    </div>
  );
};
