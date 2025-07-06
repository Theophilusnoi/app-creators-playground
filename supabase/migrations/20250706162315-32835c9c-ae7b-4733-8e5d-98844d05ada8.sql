
-- Create manifestation_rituals table for custom ritual configurations
CREATE TABLE public.manifestation_rituals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  ritual_type TEXT NOT NULL DEFAULT 'custom',
  elements JSONB DEFAULT '[]'::jsonb, -- stores ritual components like candles, crystals, mantras
  duration INTEGER DEFAULT 30, -- in minutes
  instructions JSONB DEFAULT '[]'::jsonb, -- step-by-step instructions
  frequency TEXT DEFAULT 'once', -- once, daily, weekly, monthly
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  completion_count INTEGER DEFAULT 0
);

-- Create wealth_affirmations table for AI-generated affirmations
CREATE TABLE public.wealth_affirmations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  affirmation_text TEXT NOT NULL,
  category TEXT DEFAULT 'general', -- general, career, business, investment
  personalization_data JSONB DEFAULT '{}'::jsonb, -- user goals, name, etc.
  usage_count INTEGER DEFAULT 0,
  effectiveness_rating INTEGER CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_used_at TIMESTAMP WITH TIME ZONE,
  is_favorite BOOLEAN DEFAULT false
);

-- Create manifestation_journals table for user reflections and progress
CREATE TABLE public.manifestation_journals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  entry_type TEXT NOT NULL DEFAULT 'daily', -- daily, ritual, goal, gratitude
  title TEXT,
  content TEXT NOT NULL,
  mood_rating INTEGER CHECK (mood_rating >= 1 AND mood_rating <= 10),
  manifestation_progress INTEGER CHECK (manifestation_progress >= 1 AND manifestation_progress <= 10),
  tags TEXT[] DEFAULT ARRAY[]::text[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create moon_phase_actions table for lunar cycle tracking
CREATE TABLE public.moon_phase_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  moon_phase TEXT NOT NULL, -- new_moon, waxing_crescent, first_quarter, waxing_gibbous, full_moon, waning_gibbous, last_quarter, waning_crescent
  action_type TEXT NOT NULL, -- intention_setting, manifestation, release, gratitude
  action_description TEXT NOT NULL,
  completion_status TEXT DEFAULT 'pending', -- pending, completed, skipped
  scheduled_date DATE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  results_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create oracle_readings table for wealth oracle card readings
CREATE TABLE public.oracle_readings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  question TEXT,
  cards_drawn JSONB NOT NULL DEFAULT '[]'::jsonb, -- array of card objects
  interpretation TEXT NOT NULL,
  reading_type TEXT DEFAULT 'general', -- general, career, finance, business
  accuracy_rating INTEGER CHECK (accuracy_rating >= 1 AND accuracy_rating <= 5),
  follow_up_actions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_bookmarked BOOLEAN DEFAULT false
);

-- Create group_rituals table for community manifestation sessions
CREATE TABLE public.group_rituals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  ritual_type TEXT NOT NULL,
  scheduled_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER DEFAULT 60, -- in minutes
  max_participants INTEGER DEFAULT 50,
  current_participants INTEGER DEFAULT 0,
  shared_intention TEXT,
  status TEXT DEFAULT 'scheduled', -- scheduled, active, completed, cancelled
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create group_ritual_participants table for tracking participation
CREATE TABLE public.group_ritual_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ritual_id UUID REFERENCES public.group_rituals(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  participation_status TEXT DEFAULT 'joined', -- joined, active, completed, left
  contribution_notes TEXT,
  energy_rating INTEGER CHECK (energy_rating >= 1 AND energy_rating <= 10),
  UNIQUE(ritual_id, user_id)
);

-- Create prosperity_goals table for user goal setting and tracking
CREATE TABLE public.prosperity_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  goal_title TEXT NOT NULL,
  goal_description TEXT,
  goal_category TEXT NOT NULL, -- income, savings, debt_reduction, investment, business, career
  target_amount DECIMAL(15,2),
  current_amount DECIMAL(15,2) DEFAULT 0,
  target_date DATE,
  priority_level TEXT DEFAULT 'medium', -- low, medium, high, urgent
  status TEXT DEFAULT 'active', -- active, completed, paused, cancelled
  milestones JSONB DEFAULT '[]'::jsonb,
  action_steps JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Add Row Level Security (RLS) to all tables
ALTER TABLE public.manifestation_rituals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wealth_affirmations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manifestation_journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moon_phase_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.oracle_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_rituals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_ritual_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prosperity_goals ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for manifestation_rituals
CREATE POLICY "Users can view their own rituals" ON public.manifestation_rituals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own rituals" ON public.manifestation_rituals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own rituals" ON public.manifestation_rituals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own rituals" ON public.manifestation_rituals FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for wealth_affirmations
CREATE POLICY "Users can view their own affirmations" ON public.wealth_affirmations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own affirmations" ON public.wealth_affirmations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own affirmations" ON public.wealth_affirmations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own affirmations" ON public.wealth_affirmations FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for manifestation_journals
CREATE POLICY "Users can view their own journal entries" ON public.manifestation_journals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own journal entries" ON public.manifestation_journals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own journal entries" ON public.manifestation_journals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own journal entries" ON public.manifestation_journals FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for moon_phase_actions
CREATE POLICY "Users can view their own moon phase actions" ON public.moon_phase_actions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own moon phase actions" ON public.moon_phase_actions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own moon phase actions" ON public.moon_phase_actions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own moon phase actions" ON public.moon_phase_actions FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for oracle_readings
CREATE POLICY "Users can view their own oracle readings" ON public.oracle_readings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own oracle readings" ON public.oracle_readings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own oracle readings" ON public.oracle_readings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own oracle readings" ON public.oracle_readings FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for group_rituals
CREATE POLICY "Users can view all group rituals" ON public.group_rituals FOR SELECT USING (true);
CREATE POLICY "Users can create group rituals" ON public.group_rituals FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Creators can update their group rituals" ON public.group_rituals FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "Creators can delete their group rituals" ON public.group_rituals FOR DELETE USING (auth.uid() = creator_id);

-- Create RLS policies for group_ritual_participants
CREATE POLICY "Users can view participations they're involved in" ON public.group_ritual_participants FOR SELECT USING (auth.uid() = user_id OR auth.uid() IN (SELECT creator_id FROM public.group_rituals WHERE id = ritual_id));
CREATE POLICY "Users can join group rituals" ON public.group_ritual_participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own participation" ON public.group_ritual_participants FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can leave group rituals" ON public.group_ritual_participants FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for prosperity_goals
CREATE POLICY "Users can view their own prosperity goals" ON public.prosperity_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own prosperity goals" ON public.prosperity_goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own prosperity goals" ON public.prosperity_goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own prosperity goals" ON public.prosperity_goals FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_manifestation_rituals_user_id ON public.manifestation_rituals(user_id);
CREATE INDEX idx_manifestation_rituals_ritual_type ON public.manifestation_rituals(ritual_type);
CREATE INDEX idx_wealth_affirmations_user_id ON public.wealth_affirmations(user_id);
CREATE INDEX idx_wealth_affirmations_category ON public.wealth_affirmations(category);
CREATE INDEX idx_manifestation_journals_user_id ON public.manifestation_journals(user_id);
CREATE INDEX idx_manifestation_journals_entry_type ON public.manifestation_journals(entry_type);
CREATE INDEX idx_moon_phase_actions_user_id ON public.moon_phase_actions(user_id);
CREATE INDEX idx_moon_phase_actions_scheduled_date ON public.moon_phase_actions(scheduled_date);
CREATE INDEX idx_oracle_readings_user_id ON public.oracle_readings(user_id);
CREATE INDEX idx_group_rituals_scheduled_datetime ON public.group_rituals(scheduled_datetime);
CREATE INDEX idx_group_ritual_participants_ritual_id ON public.group_ritual_participants(ritual_id);
CREATE INDEX idx_group_ritual_participants_user_id ON public.group_ritual_participants(user_id);
CREATE INDEX idx_prosperity_goals_user_id ON public.prosperity_goals(user_id);
CREATE INDEX idx_prosperity_goals_status ON public.prosperity_goals(status);

-- Create trigger to update timestamps
CREATE OR REPLACE FUNCTION update_manifestation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update timestamp triggers
CREATE TRIGGER update_manifestation_rituals_timestamp
  BEFORE UPDATE ON public.manifestation_rituals
  FOR EACH ROW EXECUTE FUNCTION update_manifestation_timestamp();

CREATE TRIGGER update_manifestation_journals_timestamp
  BEFORE UPDATE ON public.manifestation_journals
  FOR EACH ROW EXECUTE FUNCTION update_manifestation_timestamp();

CREATE TRIGGER update_group_rituals_timestamp
  BEFORE UPDATE ON public.group_rituals
  FOR EACH ROW EXECUTE FUNCTION update_manifestation_timestamp();

CREATE TRIGGER update_prosperity_goals_timestamp
  BEFORE UPDATE ON public.prosperity_goals
  FOR EACH ROW EXECUTE FUNCTION update_manifestation_timestamp();
