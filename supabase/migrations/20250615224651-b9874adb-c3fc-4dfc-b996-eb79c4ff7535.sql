
-- Create meditation_sessions table for tracking meditation sessions
CREATE TABLE IF NOT EXISTS public.meditation_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  meditation_type text NOT NULL,
  planned_duration integer NOT NULL, -- in minutes
  actual_duration integer, -- in minutes, null if not completed
  completed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  notes text,
  difficulty_level text DEFAULT 'Beginner'
);

-- Enable RLS
ALTER TABLE public.meditation_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own meditation sessions" ON public.meditation_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meditation sessions" ON public.meditation_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own meditation sessions" ON public.meditation_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_meditation_sessions_user_id ON public.meditation_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_meditation_sessions_created_at ON public.meditation_sessions(created_at);
