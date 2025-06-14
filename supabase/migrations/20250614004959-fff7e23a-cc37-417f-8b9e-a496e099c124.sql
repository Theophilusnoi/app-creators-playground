
-- Create table for tracking spiritual emergency sessions
CREATE TABLE soul_guide_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  conversation_data JSONB DEFAULT '{}',
  spiritual_emergency_count INT DEFAULT 0,
  last_protection_ritual TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create table for curse breaking journeys
CREATE TABLE user_curse_journeys (
  user_id UUID REFERENCES auth.users PRIMARY KEY,
  family_patterns JSONB DEFAULT '{}',
  burned_curses TEXT[] DEFAULT '{}',
  transmutation_rituals TEXT[] DEFAULT '{}',
  last_cleansing_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create table for daily protection practices
CREATE TABLE daily_protection_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  practice_type TEXT NOT NULL,
  practice_details JSONB DEFAULT '{}',
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE soul_guide_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_curse_journeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_protection_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for soul_guide_conversations
CREATE POLICY "Users can view their own conversations" 
  ON soul_guide_conversations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversations" 
  ON soul_guide_conversations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations" 
  ON soul_guide_conversations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for user_curse_journeys
CREATE POLICY "Users can view their own curse journeys" 
  ON user_curse_journeys 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own curse journeys" 
  ON user_curse_journeys 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own curse journeys" 
  ON user_curse_journeys 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for daily_protection_logs
CREATE POLICY "Users can view their own protection logs" 
  ON daily_protection_logs 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own protection logs" 
  ON daily_protection_logs 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_soul_guide_conversations_user_id ON soul_guide_conversations(user_id);
CREATE INDEX idx_daily_protection_logs_user_id ON daily_protection_logs(user_id);
CREATE INDEX idx_daily_protection_logs_completed_at ON daily_protection_logs(completed_at);
