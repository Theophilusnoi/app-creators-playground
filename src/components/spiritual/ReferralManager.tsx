
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Share2, 
  Copy, 
  Gift, 
  Users, 
  Trophy,
  RefreshCw
} from 'lucide-react';

interface Referral {
  id: string;
  referral_code: string;
  referred_email: string | null;
  referred_user_id: string | null;
  status: 'pending' | 'completed' | 'expired';
  reward_claimed: boolean;
  reward_type: string;
  created_at: string;
  completed_at: string | null;
}

export const ReferralManager: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [userReferralCode, setUserReferralCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(true);

  const generateReferralCode = async () => {
    if (!user) return;
    
    setIsGenerating(true);
    try {
      // Generate a unique referral code
      const code = `SPIRIT-${user.id.slice(0, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
      
      const { data, error } = await supabase
        .from('referrals')
        .insert({
          referrer_user_id: user.id,
          referral_code: code,
          status: 'pending',
          reward_type: 'free_month'
        })
        .select()
        .single();

      if (error) throw error;

      setUserReferralCode(code);
      await loadReferrals();
      
      toast({
        title: "Referral Code Generated!",
        description: "Share this code with friends to earn rewards when they subscribe.",
      });
    } catch (error: any) {
      console.error('Error generating referral code:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate referral code",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const loadReferrals = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReferrals(data || []);
      
      // Find the user's active referral code
      const activeReferral = data?.find(r => r.status === 'pending');
      if (activeReferral) {
        setUserReferralCode(activeReferral.referral_code);
      }
    } catch (error: any) {
      console.error('Error loading referrals:', error);
      toast({
        title: "Error",
        description: "Failed to load referral data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    if (!userReferralCode) return;
    
    const referralUrl = `${window.location.origin}/pricing?ref=${userReferralCode}`;
    navigator.clipboard.writeText(referralUrl);
    
    toast({
      title: "Link Copied!",
      description: "Referral link has been copied to your clipboard.",
    });
  };

  const shareReferralCode = () => {
    if (!userReferralCode) return;
    
    const referralUrl = `${window.location.origin}/pricing?ref=${userReferralCode}`;
    const shareText = `Join me on this amazing spiritual journey! Use my referral code "${userReferralCode}" and get special benefits when you subscribe. ${referralUrl}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Spiritual Journey Referral',
        text: shareText,
        url: referralUrl,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Share Text Copied!",
        description: "Share text has been copied to your clipboard.",
      });
    }
  };

  useEffect(() => {
    if (user) {
      loadReferrals();
    }
  }, [user]);

  if (!user) {
    return (
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardContent className="text-center py-12">
          <p className="text-white">Please log in to access the referral system.</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardContent className="text-center py-12">
          <RefreshCw className="w-8 h-8 text-purple-400 mx-auto mb-4 animate-spin" />
          <p className="text-white">Loading referral data...</p>
        </CardContent>
      </Card>
    );
  }

  const completedReferrals = referrals.filter(r => r.status === 'completed');
  const pendingReferrals = referrals.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white mb-2">
            🎁 Referral Rewards
          </CardTitle>
          <p className="text-purple-200 text-lg">
            Share the spiritual journey and earn free subscription time
          </p>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-900/20 border-green-500/30 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{completedReferrals.length}</div>
            <div className="text-green-300 text-sm">Successful Referrals</div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-900/20 border-yellow-500/30 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{pendingReferrals.length}</div>
            <div className="text-yellow-300 text-sm">Pending Referrals</div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-900/20 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Gift className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{completedReferrals.length}</div>
            <div className="text-purple-300 text-sm">Free Months Earned</div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Code Section */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-xl">Your Referral Code</CardTitle>
        </CardHeader>
        <CardContent>
          {userReferralCode ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  value={userReferralCode}
                  readOnly
                  className="bg-purple-900/20 border-purple-500/30 text-white font-mono text-lg"
                />
                <Button
                  onClick={copyReferralLink}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
                <Button
                  onClick={shareReferralCode}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
              
              <div className="text-sm text-purple-200">
                Share this link: <code className="bg-purple-900/30 px-2 py-1 rounded text-purple-100">
                  {window.location.origin}/pricing?ref={userReferralCode}
                </code>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-purple-200">Generate your unique referral code to start earning rewards!</p>
              <Button
                onClick={generateReferralCode}
                disabled={isGenerating}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4 mr-2" />
                    Generate Referral Code
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-xl">How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Share Your Code</h3>
              <p className="text-purple-200 text-sm">Send your referral link to friends interested in spiritual growth</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Friend Subscribes</h3>
              <p className="text-purple-200 text-sm">When they subscribe using your code, they get special benefits</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Earn Rewards</h3>
              <p className="text-purple-200 text-sm">You receive one free month of subscription for each successful referral</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral History */}
      {referrals.length > 0 && (
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-xl">Referral History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {referrals.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-4 bg-purple-900/20 rounded-lg">
                  <div>
                    <div className="text-white font-mono text-sm">{referral.referral_code}</div>
                    <div className="text-purple-300 text-xs">
                      Created: {new Date(referral.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={
                        referral.status === 'completed' ? 'bg-green-600' :
                        referral.status === 'pending' ? 'bg-yellow-600' : 'bg-gray-600'
                      }
                    >
                      {referral.status}
                    </Badge>
                    {referral.status === 'completed' && referral.reward_claimed && (
                      <Badge className="bg-purple-600">
                        Reward Claimed
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
