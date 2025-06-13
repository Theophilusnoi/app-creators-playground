
-- Create spiritual_assessments table
CREATE TABLE public.spiritual_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  spiritual_level TEXT NOT NULL,
  awareness INTEGER NOT NULL CHECK (awareness >= 1 AND awareness <= 10),
  presence INTEGER NOT NULL CHECK (presence >= 1 AND presence <= 10),
  compassion INTEGER NOT NULL CHECK (compassion >= 1 AND compassion <= 10),
  wisdom INTEGER NOT NULL CHECK (wisdom >= 1 AND wisdom <= 10),
  inner_peace INTEGER NOT NULL CHECK (inner_peace >= 1 AND inner_peace <= 10),
  overall_score DECIMAL GENERATED ALWAYS AS ((awareness + presence + compassion + wisdom + inner_peace) / 5.0) STORED,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create spiritual_goals table
CREATE TABLE public.spiritual_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_type TEXT NOT NULL, -- 'awareness', 'presence', 'compassion', 'wisdom', 'inner_peace'
  current_level INTEGER NOT NULL,
  target_level INTEGER NOT NULL,
  target_date DATE,
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'completed', 'paused'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create spiritual_milestones table
CREATE TABLE public.spiritual_milestones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  milestone_type TEXT NOT NULL, -- 'level_up', 'goal_achieved', 'streak', 'breakthrough'
  title TEXT NOT NULL,
  description TEXT,
  points_awarded INTEGER DEFAULT 0,
  achieved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create spiritual_recommendations table
CREATE TABLE public.spiritual_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES public.spiritual_assessments(id) ON DELETE CASCADE,
  recommendation_type TEXT NOT NULL, -- 'meditation', 'shadow_work', 'dream_work', 'synchronicity'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority INTEGER DEFAULT 1, -- 1 = high, 2 = medium, 3 = low
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.spiritual_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spiritual_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spiritual_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spiritual_recommendations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for spiritual_assessments
CREATE POLICY "Users can view their own assessments" 
  ON public.spiritual_assessments 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assessments" 
  ON public.spiritual_assessments 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessments" 
  ON public.spiritual_assessments 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create RLS policies for spiritual_goals
CREATE POLICY "Users can view their own goals" 
  ON public.spiritual_goals 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own goals" 
  ON public.spiritual_goals 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals" 
  ON public.spiritual_goals 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals" 
  ON public.spiritual_goals 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for spiritual_milestones
CREATE POLICY "Users can view their own milestones" 
  ON public.spiritual_milestones 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own milestones" 
  ON public.spiritual_milestones 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for spiritual_recommendations
CREATE POLICY "Users can view their own recommendations" 
  ON public.spiritual_recommendations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own recommendations" 
  ON public.spiritual_recommendations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recommendations" 
  ON public.spiritual_recommendations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_spiritual_assessments_user_id_created_at ON public.spiritual_assessments(user_id, created_at DESC);
CREATE INDEX idx_spiritual_goals_user_id_status ON public.spiritual_goals(user_id, status);
CREATE INDEX idx_spiritual_milestones_user_id_achieved_at ON public.spiritual_milestones(user_id, achieved_at DESC);
CREATE INDEX idx_spiritual_recommendations_user_id_priority ON public.spiritual_recommendations(user_id, priority, is_completed);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_spiritual_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_spiritual_assessments_updated_at
  BEFORE UPDATE ON public.spiritual_assessments
  FOR EACH ROW EXECUTE FUNCTION public.update_spiritual_updated_at();

CREATE TRIGGER update_spiritual_goals_updated_at
  BEFORE UPDATE ON public.spiritual_goals
  FOR EACH ROW EXECUTE FUNCTION public.update_spiritual_updated_at();
