
-- Create referrals table to track referral codes and rewards
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL UNIQUE,
  referred_email TEXT,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'expired')),
  reward_claimed BOOLEAN NOT NULL DEFAULT false,
  reward_type TEXT DEFAULT 'free_month',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ DEFAULT (now() + INTERVAL '30 days')
);

-- Enable Row Level Security
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own referrals
CREATE POLICY "select_own_referrals" ON public.referrals
FOR SELECT
USING (referrer_user_id = auth.uid() OR referred_user_id = auth.uid());

-- Create policy for edge functions to manage referrals
CREATE POLICY "manage_referrals" ON public.referrals
FOR ALL
USING (true)
WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_referrals_code ON public.referrals(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON public.referrals(referrer_user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_email ON public.referrals(referred_email);
