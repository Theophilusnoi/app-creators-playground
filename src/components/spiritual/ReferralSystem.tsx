
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Share2, Gift, Users, Copy, Mail, CheckCircle } from "lucide-react";

interface Referral {
  id: string;
  referral_code: string;
  email_invited: string;
  status: string;
  reward_claimed: boolean;
  reward_type: string;
  created_at: string;
  completed_at?: string;
}

export const ReferralSystem = () => {
  const { user } = useAuth();
  const [referralCode, setReferralCode] = useState('');
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [emailToInvite, setEmailToInvite] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [totalRewards, setTotalRewards] = useState(0);

  useEffect(() => {
    if (user) {
      initializeReferralSystem();
    }
  }, [user]);

  const initializeReferralSystem = async () => {
    if (!user) return;

    try {
      // Check if user has a referral code
      const { data: existingReferrals } = await supabase
        .from('user_referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false });

      if (existingReferrals && existingReferrals.length > 0) {
        setReferralCode(existingReferrals[0].referral_code);
        setReferrals(existingReferrals);
        
        // Calculate total rewards
        const rewards = existingReferrals
          .filter(r => r.status === 'completed' && r.reward_claimed)
          .length;
        setTotalRewards(rewards);
      } else {
        // Generate new referral code
        const code = generateReferralCode();
        setReferralCode(code);
      }
    } catch (error) {
      console.error('Error initializing referral system:', error);
    }
  };

  const generateReferralCode = () => {
    const adjectives = ['wise', 'peaceful', 'mystic', 'soul', 'zen', 'sacred', 'divine', 'light'];
    const nouns = ['seeker', 'guide', 'spirit', 'heart', 'mind', 'path', 'journey', 'essence'];
    
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const numbers = Math.floor(Math.random() * 1000);
    
    return `${adj}-${noun}-${numbers}`.toUpperCase();
  };

  const sendInvitation = async () => {
    if (!user || !emailToInvite.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_referrals')
        .insert({
          referrer_id: user.id,
          referral_code: referralCode,
          email_invited: emailToInvite.trim(),
          status: 'pending',
          reward_type: 'premium_month',
          referral_source: 'email'
        });

      if (error) throw error;

      // In a real implementation, you would send an email here
      console.log(`Invitation sent to ${emailToInvite}`);
      
      setEmailToInvite('');
      initializeReferralSystem(); // Refresh data
      
    } catch (error) {
      console.error('Error sending invitation:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = async () => {
    const referralLink = `${window.location.origin}?ref=${referralCode}`;
    
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const shareReferralLink = () => {
    const referralLink = `${window.location.origin}?ref=${referralCode}`;
    const text = `Join me on SpiritualMind Pro - a beautiful app for spiritual growth and mindfulness. Use my invite link to get started: ${referralLink}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Join SpiritualMind Pro',
        text: text,
        url: referralLink
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      copyReferralLink();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'expired': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRewardText = (rewardType: string) => {
    switch (rewardType) {
      case 'premium_month': return '1 Month Premium';
      case 'premium_week': return '1 Week Premium';
      case 'points': return '500 Points';
      default: return 'Special Reward';
    }
  };

  return (
    <div className="space-y-6">
      {/* Referral Overview */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-400/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Gift className="w-6 h-6 mr-2 text-yellow-400" />
            Invite Friends & Earn Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{referrals.length}</div>
              <div className="text-purple-200 text-sm">Total Invites</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {referrals.filter(r => r.status === 'completed').length}
              </div>
              <div className="text-purple-200 text-sm">Successful</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{totalRewards}</div>
              <div className="text-purple-200 text-sm">Rewards Earned</div>
            </div>
          </div>

          <div className="bg-black/30 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">How it works:</h3>
            <div className="space-y-2 text-sm text-purple-200">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                Share your unique referral link with friends
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                They sign up and complete their first spiritual assessment
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                You both get 1 month of premium access for free!
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Code & Sharing */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Share2 className="w-5 h-5 mr-2 text-blue-400" />
            Your Referral Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-purple-900/30 rounded-lg p-3 font-mono text-white text-center text-lg tracking-wider">
              {referralCode}
            </div>
            <Button
              onClick={copyReferralLink}
              variant="outline"
              className="border-purple-400 text-purple-200 hover:bg-purple-600/30"
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={shareReferralLink}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </Button>
            
            <Button
              onClick={() => {
                const subject = 'Join me on SpiritualMind Pro';
                const body = `I've been using SpiritualMind Pro for my spiritual journey and thought you might love it too! Use my referral code ${referralCode} to get started with premium features. Check it out: ${window.location.origin}?ref=${referralCode}`;
                window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
              }}
              variant="outline"
              className="border-purple-400 text-purple-200 hover:bg-purple-600/30"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Invite
            </Button>
          </div>

          {/* Direct Email Invitation */}
          <div className="border-t border-purple-500/30 pt-4">
            <h4 className="text-white font-medium mb-3">Send Direct Invitation</h4>
            <div className="flex gap-3">
              <Input
                value={emailToInvite}
                onChange={(e) => setEmailToInvite(e.target.value)}
                placeholder="friend@example.com"
                type="email"
                className="flex-1 bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              />
              <Button
                onClick={sendInvitation}
                disabled={!emailToInvite.trim() || loading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {loading ? 'Sending...' : 'Invite'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral History */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="w-5 h-5 mr-2 text-purple-400" />
            Invitation History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {referrals.length > 0 ? (
            <div className="space-y-3">
              {referrals.map((referral) => (
                <div key={referral.id} className="bg-purple-900/20 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-white font-medium">{referral.email_invited}</span>
                        <Badge className={`${getStatusColor(referral.status)} text-white border-0`}>
                          {referral.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-purple-300">
                          Invited: {new Date(referral.created_at).toLocaleDateString()}
                        </span>
                        {referral.status === 'completed' && (
                          <span className="text-green-400 flex items-center">
                            <Gift className="w-3 h-3 mr-1" />
                            {getRewardText(referral.reward_type)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-purple-300 py-8">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Start inviting friends to earn premium rewards!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
