
-- Create challenges table for storing challenge templates
CREATE TABLE public.challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'group',
  difficulty_level TEXT NOT NULL DEFAULT 'beginner',
  duration_days INTEGER NOT NULL,
  max_participants INTEGER,
  reward_points INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create challenge_content table for daily practices and content
CREATE TABLE public.challenge_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  practice_type TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  duration_minutes INTEGER,
  difficulty_level TEXT DEFAULT 'beginner',
  resources JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_challenge_participations table
CREATE TABLE public.user_challenge_participations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  current_day INTEGER DEFAULT 1,
  total_points_earned INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT false,
  streak_days INTEGER DEFAULT 0,
  last_activity_date DATE
);

-- Create daily_check_ins table for tracking daily progress
CREATE TABLE public.daily_check_ins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  participation_id UUID REFERENCES public.user_challenge_participations(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  practice_duration_minutes INTEGER,
  reflection_notes TEXT,
  mood_before INTEGER CHECK (mood_before >= 1 AND mood_before <= 10),
  mood_after INTEGER CHECK (mood_after >= 1 AND mood_after <= 10),
  insights JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create challenge_discussions table for community features
CREATE TABLE public.challenge_discussions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  parent_id UUID REFERENCES public.challenge_discussions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  discussion_type TEXT DEFAULT 'general', -- general, question, insight, support
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create challenge_milestones table for tracking achievements
CREATE TABLE public.challenge_milestones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  participation_id UUID REFERENCES public.user_challenge_participations(id) ON DELETE CASCADE,
  milestone_type TEXT NOT NULL, -- day_7, day_14, day_21, completion, streak_5, etc.
  milestone_day INTEGER,
  points_awarded INTEGER DEFAULT 0,
  badge_earned TEXT,
  achieved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  description TEXT
);

-- Enable Row Level Security
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenge_participations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_milestones ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for challenges (public read, admin write)
CREATE POLICY "Anyone can view active challenges" ON public.challenges
  FOR SELECT USING (is_active = true);

-- Create RLS policies for challenge_content (public read for active challenges)
CREATE POLICY "Anyone can view challenge content" ON public.challenge_content
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.challenges 
      WHERE challenges.id = challenge_content.challenge_id 
      AND challenges.is_active = true
    )
  );

-- Create RLS policies for user_challenge_participations
CREATE POLICY "Users can view their own participations" ON public.user_challenge_participations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own participations" ON public.user_challenge_participations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own participations" ON public.user_challenge_participations
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for daily_check_ins
CREATE POLICY "Users can view their own check-ins" ON public.daily_check_ins
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own check-ins" ON public.daily_check_ins
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own check-ins" ON public.daily_check_ins
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for challenge_discussions
CREATE POLICY "Users can view all discussions for challenges they participate in" ON public.challenge_discussions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_challenge_participations 
      WHERE user_challenge_participations.challenge_id = challenge_discussions.challenge_id 
      AND user_challenge_participations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert discussions for challenges they participate in" ON public.challenge_discussions
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.user_challenge_participations 
      WHERE user_challenge_participations.challenge_id = challenge_discussions.challenge_id 
      AND user_challenge_participations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own discussions" ON public.challenge_discussions
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for challenge_milestones
CREATE POLICY "Users can view their own milestones" ON public.challenge_milestones
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert milestones" ON public.challenge_milestones
  FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_challenge_content_challenge_day ON public.challenge_content(challenge_id, day_number);
CREATE INDEX idx_user_participations_user_challenge ON public.user_challenge_participations(user_id, challenge_id);
CREATE INDEX idx_daily_checkins_participation ON public.daily_check_ins(participation_id, day_number);
CREATE INDEX idx_discussions_challenge ON public.challenge_discussions(challenge_id, created_at DESC);
CREATE INDEX idx_milestones_user ON public.challenge_milestones(user_id, achieved_at DESC);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_challenges_updated_at
  BEFORE UPDATE ON public.challenges
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_participations_updated_at
  BEFORE UPDATE ON public.user_challenge_participations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_discussions_updated_at
  BEFORE UPDATE ON public.challenge_discussions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample challenge data
INSERT INTO public.challenges (id, title, description, type, difficulty_level, duration_days, max_participants, reward_points, featured) VALUES
('550e8400-e29b-41d4-a716-446655440001', '21-Day Mindfulness Challenge', 'Build a daily mindfulness practice with guided meditations and community support.', 'group', 'beginner', 21, 500, 100, true),
('550e8400-e29b-41d4-a716-446655440002', 'Compassion Cultivation', 'Develop loving-kindness and compassion through daily practices and reflection.', 'group', 'intermediate', 14, 200, 75, false),
('550e8400-e29b-41d4-a716-446655440003', 'Inner Peace Journey', 'Advanced practices for finding deep inner stillness and peace.', 'individual', 'advanced', 30, 100, 150, true);

-- Insert sample content for Inner Peace Journey (30 days)
INSERT INTO public.challenge_content (challenge_id, day_number, title, description, practice_type, content, duration_minutes, difficulty_level) VALUES
('550e8400-e29b-41d4-a716-446655440003', 1, 'Foundation of Stillness', 'Begin your journey by establishing a foundation of inner stillness through breath awareness.', 'meditation', '{"instructions": ["Find a quiet space", "Sit comfortably with spine straight", "Focus on natural breath", "When mind wanders, gently return to breath"], "guided_meditation": "Focus on the sensation of breath entering and leaving your nostrils. Notice the pause between inhale and exhale.", "reflection_prompt": "What does stillness mean to you?"}', 20, 'advanced'),
('550e8400-e29b-41d4-a716-446655440003', 2, 'Observing the Mind', 'Learn to observe thoughts without attachment, developing witness consciousness.', 'mindfulness', '{"instructions": ["Sit in meditation posture", "Notice thoughts arising", "Label thoughts as thinking", "Return to breath"], "guided_meditation": "Imagine thoughts as clouds passing through the sky of your awareness.", "reflection_prompt": "What patterns do you notice in your thinking?"}', 25, 'advanced'),
('550e8400-e29b-41d4-a716-446655440003', 3, 'Heart Center Opening', 'Connect with the heart center through loving-kindness practice.', 'heart_practice', '{"instructions": ["Place hand on heart", "Feel the warmth", "Send love to yourself", "Extend love to others"], "guided_meditation": "Visualize green light radiating from your heart center, expanding with each breath.", "reflection_prompt": "How does opening your heart change your inner landscape?"}', 30, 'advanced');
