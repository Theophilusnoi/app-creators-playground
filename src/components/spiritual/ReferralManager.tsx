
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Share2, Gift, Users, Copy, CheckCircle } from "lucide-react";

interface Referral {
  id: string;
  referral_code: string;
  referred_email: string | null;
  status: string;
  reward_claimed: boolean;
  reward_type: string;
  created_at: string;
  completed_at?: string;
}

export const ReferralManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
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
      // Get or create referral code for user
      let { data: existingCode } = await supabase
        .from('referrals')
        .select('referral_code')
        .eq('referrer_user_id', user.id)
        .limit(1)
        .single();

      if (!existingCode) {
        const newCode = generateReferralCode();
        const { error } = await supabase
          .from('referrals')
          .insert({
            referrer_user_id: user.id,
            referral_code: newCode
          });
        if (error) throw error;
        setReferralCode(newCode);
      } else {
        setReferralCode(existingCode.referral_code);
      }

      // Load user's referrals
      const { data: referralData, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setReferrals(referralData || []);
      
      // Calculate total rewards
      const rewards = (referralData || [])
        .filter(r => r.status === 'completed' && r.reward_claimed)
        .length;
      setTotalRewards(rewards);
      
    } catch (error) {
      console.error('Error initializing referral system:', error);
      toast({
        title: "Error",
        description: "Failed to load referral data",
        variant: "destructive",
      });
    }
  };

  const generateReferralCode = () => {
    const adjectives = ['WISE', 'SACRED', 'MYSTIC', 'DIVINE', 'SOUL', 'ZEN'];
    const nouns = ['SEEKER', 'GUIDE', 'SPIRIT', 'PATH', 'JOURNEY', 'LIGHT'];
    
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const numbers = Math.floor(Math.random() * 1000);
    
    return `${adj}-${noun}-${numbers}`;
  };

  const sendInvitation = async () => {
    if (!user || !emailToInvite.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('referrals')
        .insert({
          referrer_user_id: user.id,
          referral_code: referralCode,
          referred_email: emailToInvite.trim(),
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Invitation Sent!",
        description: `Referral invitation sent to ${emailToInvite}`,
      });

      setEmailToInvite('');
      initializeReferralSystem(); // Refresh data
      
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
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
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
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

  return (
    <div className="space-y-6">
      {/* Referral Overview */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-400/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Gift className="w-6 h-6 mr-2 text-yellow-400" />
            Refer Friends & Get Free Subscriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{referrals.length}</div>
              <div className="text-purple-200 text-sm">Total Referrals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {referrals.filter(r => r.status === 'completed').length}
              </div>
              <div className="text-purple-200 text-sm">Successful</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{totalRewards}</div>
              <div className="text-purple-200 text-sm">Free Months Earned</div>
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
                They sign up using your link and subscribe to any plan
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                You get 1 free month added to your subscription!
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
            Referral History
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
                        <span className="text-white font-medium">
                          {referral.referred_email || 'Pending Email'}
                        </span>
                        <Badge className={`${getStatusColor(referral.status)} text-white border-0`}>
                          {referral.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-purple-300">
                          Created: {new Date(referral.created_at).toLocaleDateString()}
                        </span>
                        {referral.status === 'completed' && (
                          <span className="text-green-400 flex items-center">
                            <Gift className="w-3 h-3 mr-1" />
                            Free Month Earned!
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
              <p>Start inviting friends to earn free subscriptions!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
