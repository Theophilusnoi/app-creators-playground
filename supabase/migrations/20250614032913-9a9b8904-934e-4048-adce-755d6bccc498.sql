
-- Create spiritual emergencies tracking table
CREATE TABLE IF NOT EXISTS spiritual_emergencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  triggered_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  crisis_level SMALLINT CHECK (crisis_level BETWEEN 1 AND 3),
  crisis_type TEXT,
  protocol_used TEXT NOT NULL,
  tradition TEXT,
  human_specialist_involved BOOLEAN DEFAULT FALSE,
  response_time_seconds INTEGER,
  resolved BOOLEAN DEFAULT FALSE
);

-- Create specialists table
CREATE TABLE IF NOT EXISTS specialists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  credentials TEXT[],
  traditions TEXT[],
  languages TEXT[],
  rating NUMERIC(3,2) DEFAULT 0.00,
  session_count INTEGER DEFAULT 0,
  available BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create specialist ratings table
CREATE TABLE IF NOT EXISTS specialist_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  specialist_id UUID REFERENCES specialists(id),
  user_id UUID REFERENCES auth.users NOT NULL,
  session_id UUID,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create emergency sessions table
CREATE TABLE IF NOT EXISTS emergency_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  specialist_id UUID REFERENCES specialists(id),
  emergency_id UUID REFERENCES spiritual_emergencies(id),
  status TEXT DEFAULT 'pending',
  join_code TEXT,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE spiritual_emergencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE specialists ENABLE ROW LEVEL SECURITY;
ALTER TABLE specialist_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_sessions ENABLE ROW LEVEL SECURITY;

-- Users can view their own emergency data
CREATE POLICY "Users can view own emergencies" ON spiritual_emergencies
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own emergency data
CREATE POLICY "Users can create emergencies" ON spiritual_emergencies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read access to specialists (for matching)
CREATE POLICY "Public read specialists" ON specialists
  FOR SELECT USING (true);

-- Users can rate specialists
CREATE POLICY "Users can rate specialists" ON specialist_ratings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can view their own sessions
CREATE POLICY "Users can view own sessions" ON emergency_sessions
  FOR SELECT USING (auth.uid() = user_id);

-- Function to get emergency metrics (already updated in previous migration)
CREATE OR REPLACE FUNCTION get_emergency_metrics()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'responseTimes', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'timestamp', triggered_at,
          'value', response_time_seconds
        )
      ), '[]'::json)
      FROM (
        SELECT triggered_at, response_time_seconds
        FROM spiritual_emergencies
        WHERE response_time_seconds IS NOT NULL
        ORDER BY triggered_at DESC
        LIMIT 100
      ) rt
    ),
    'traditionDistribution', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'tradition', tradition,
          'count', count
        )
      ), '[]'::json)
      FROM (
        SELECT tradition, COUNT(*) as count
        FROM spiritual_emergencies
        WHERE tradition IS NOT NULL
        GROUP BY tradition
      ) t
    ),
    'resolutionRates', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'crisis_level', crisis_level,
          'rate', resolution_rate
        )
      ), '[]'::json)
      FROM (
        SELECT 
          crisis_level,
          ROUND(100.0 * SUM(CASE WHEN resolved THEN 1 ELSE 0 END) / COUNT(*)) as resolution_rate
        FROM spiritual_emergencies
        WHERE crisis_level IS NOT NULL
        GROUP BY crisis_level
      ) r
    ),
    'totalEmergencies', (
      SELECT COUNT(*) FROM spiritual_emergencies
    ),
    'averageResponseTime', (
      SELECT COALESCE(ROUND(AVG(response_time_seconds)), 0) 
      FROM spiritual_emergencies 
      WHERE response_time_seconds IS NOT NULL
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert sample specialists for testing
INSERT INTO specialists (name, email, credentials, traditions, languages, rating, available) VALUES
('Dr. Sarah Chen', 'sarah@example.com', ARRAY['PhD Theology', 'Licensed Counselor'], ARRAY['christian', 'eclectic'], ARRAY['en', 'zh'], 4.8, true),
('Lama Tenzin', 'tenzin@example.com', ARRAY['Tibetan Buddhism Master', 'Meditation Teacher'], ARRAY['buddhist'], ARRAY['en', 'bo'], 4.9, true),
('Rev. Michael Torres', 'michael@example.com', ARRAY['Ordained Minister', 'Deliverance Specialist'], ARRAY['christian'], ARRAY['en', 'es'], 4.7, false),
('Dr. Priya Sharma', 'priya@example.com', ARRAY['Ayurvedic Healer', 'Vedic Scholar'], ARRAY['hindu'], ARRAY['en', 'hi'], 4.6, true)
ON CONFLICT (email) DO NOTHING;

-- Insert sample emergency data for testing analytics
-- Note: These use hardcoded UUIDs for testing - in production these would be real user IDs
INSERT INTO spiritual_emergencies (
  user_id, 
  triggered_at, 
  resolved_at, 
  crisis_level, 
  crisis_type, 
  protocol_used, 
  tradition, 
  human_specialist_involved, 
  response_time_seconds, 
  resolved
) VALUES
-- Recent emergencies with various traditions and crisis levels
('00000000-0000-0000-0000-000000000001', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour', 1, 'anxiety', 'breathing_protocol', 'christian', false, 45, true),
('00000000-0000-0000-0000-000000000002', NOW() - INTERVAL '4 hours', NOW() - INTERVAL '3 hours', 2, 'spiritual_attack', 'protection_protocol', 'buddhist', true, 120, true),
('00000000-0000-0000-0000-000000000003', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '5 hours', 1, 'meditation_overwhelm', 'grounding_protocol', 'hindu', false, 30, true),
('00000000-0000-0000-0000-000000000004', NOW() - INTERVAL '8 hours', NULL, 3, 'possession_symptoms', 'emergency_protocol', 'christian', true, 180, false),
('00000000-0000-0000-0000-000000000005', NOW() - INTERVAL '12 hours', NOW() - INTERVAL '11 hours', 2, 'dark_night_soul', 'counseling_protocol', 'eclectic', true, 90, true),
('00000000-0000-0000-0000-000000000006', NOW() - INTERVAL '1 day', NOW() - INTERVAL '23 hours', 1, 'energy_overwhelm', 'shielding_protocol', 'buddhist', false, 60, true),
('00000000-0000-0000-0000-000000000007', NOW() - INTERVAL '2 days', NOW() - INTERVAL '47 hours', 2, 'astral_projection_stuck', 'retrieval_protocol', 'hindu', true, 150, true),
('00000000-0000-0000-0000-000000000008', NOW() - INTERVAL '3 days', NOW() - INTERVAL '71 hours', 1, 'chakra_imbalance', 'balancing_protocol', 'eclectic', false, 40, true),
('00000000-0000-0000-0000-000000000009', NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days 22 hours', 3, 'entity_attachment', 'banishing_protocol', 'christian', true, 240, true),
('00000000-0000-0000-0000-000000000010', NOW() - INTERVAL '1 week', NOW() - INTERVAL '6 days 23 hours', 2, 'psychic_overload', 'blocking_protocol', 'buddhist', false, 75, true)
ON CONFLICT DO NOTHING;
