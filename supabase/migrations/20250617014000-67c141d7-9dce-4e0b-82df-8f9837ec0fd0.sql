
-- Create foundational quantum spiritual tables first
CREATE TABLE quantum_prayer_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  focal_point TEXT NOT NULL,
  intensity REAL DEFAULT 1.0,
  participants INTEGER DEFAULT 1,
  started_at TIMESTAMPTZ DEFAULT now(),
  duration INTERVAL,
  energy_signature JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE parallel_self_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  timeline_hash TEXT NOT NULL,
  wisdom_insights TEXT,
  healing_received BOOLEAN DEFAULT false,
  integration_level INTEGER DEFAULT 1,
  timeline_signature JSONB DEFAULT '{}',
  accessed_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE elemental_communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  element TEXT NOT NULL,
  location_data JSONB,
  message_symbol TEXT,
  response_received BOOLEAN DEFAULT false,
  elemental_type TEXT,
  communication_method TEXT,
  intensity_level INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE morphogenetic_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  field_type TEXT NOT NULL,
  baseline_signature JSONB DEFAULT '{}',
  current_resonance REAL DEFAULT 0.0,
  tuning_frequency REAL,
  interference_patterns JSONB DEFAULT '{}',
  calibration_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE light_language_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  input_mode TEXT NOT NULL,
  original_pattern TEXT,
  decoded_message TEXT,
  archetypal_symbols JSONB DEFAULT '{}',
  personal_resonance REAL DEFAULT 0.0,
  galactic_origin TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE timeline_healing_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  timeline_period TEXT NOT NULL,
  healing_focus TEXT,
  resonance_shifts JSONB DEFAULT '{}',
  probable_futures JSONB DEFAULT '{}',
  ancestral_integration BOOLEAN DEFAULT false,
  session_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE galactic_council_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  archetype_contacted TEXT NOT NULL,
  communication_method TEXT DEFAULT 'telepathic_simulation',
  soul_mission_insights TEXT,
  guidance_received TEXT,
  free_will_confirmed BOOLEAN DEFAULT true,
  session_duration INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE quantum_prayer_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE parallel_self_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE elemental_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE morphogenetic_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE light_language_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_healing_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE galactic_council_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user access
CREATE POLICY "Users can manage their quantum prayers" ON quantum_prayer_log
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their parallel records" ON parallel_self_records
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their elemental communications" ON elemental_communications
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their morphogenetic fields" ON morphogenetic_fields
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their light language" ON light_language_records
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their timeline healing" ON timeline_healing_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their galactic sessions" ON galactic_council_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Create update trigger function for morphogenetic fields
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_morphogenetic_fields_updated_at
  BEFORE UPDATE ON morphogenetic_fields
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
