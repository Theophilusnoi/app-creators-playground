
-- Advanced Spiritual Technologies Database Schema
-- 1. Akashic Records Interface
CREATE TABLE akashic_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  soul_signature TEXT NOT NULL,
  lifetime_focus TEXT NOT NULL,
  records_retrieved JSONB DEFAULT '{}',
  karmic_insights TEXT,
  access_level INT DEFAULT 1,
  verification_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ
);

CREATE INDEX idx_akashic_soul ON akashic_access USING hash(soul_signature);

-- 2. Merkaba Activation System
CREATE TABLE merkaba_activations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  activation_level SMALLINT CHECK (activation_level BETWEEN 1 AND 12),
  spin_direction TEXT CHECK (spin_direction IN ('masculine', 'feminine')),
  frequency_hz REAL NOT NULL,
  geometric_pattern TEXT,
  biofield_response JSONB DEFAULT '{}',
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Plasma Light Healing
CREATE TABLE plasma_healing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  plasma_color TEXT CHECK (plasma_color IN ('gold', 'silver', 'platinum', 'rainbow')),
  cellular_regeneration REAL,
  dna_activation_percent REAL,
  photon_intensity REAL,
  session_duration INTERVAL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Holographic Soul Blueprint
CREATE TABLE soul_blueprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  blueprint_data JSONB NOT NULL DEFAULT '{}',
  version_hash TEXT NOT NULL,
  activation_points JSONB DEFAULT '{}',
  modifications JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER blueprint_update 
BEFORE UPDATE ON soul_blueprints 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. Cosmic Consciousness Gateway
CREATE TABLE cosmic_gateways (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  gateway_name TEXT NOT NULL,
  dimension_level SMALLINT,
  access_codes TEXT[],
  consciousness_shift REAL,
  return_transition TEXT,
  session_log TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Stellar Language Decoder
CREATE TABLE stellar_language (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  input_symbol TEXT NOT NULL,
  decoded_meaning TEXT,
  star_origin TEXT,
  vibration_frequency REAL,
  multidimensional_context JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Time Capsule Integration
CREATE TABLE time_capsules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  capsule_content TEXT NOT NULL,
  target_timeline TEXT NOT NULL,
  temporal_coordinates JSONB DEFAULT '{}',
  encryption_key TEXT,
  retrieval_conditions JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  open_at TIMESTAMPTZ
);

-- Temporal security function
CREATE OR REPLACE FUNCTION generate_temporal_key() RETURNS TRIGGER AS $$
BEGIN
  NEW.encryption_key := encode(digest(NEW.target_timeline || NEW.user_id::text, 'sha256'), 'hex');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER temporal_security
BEFORE INSERT ON time_capsules
FOR EACH ROW EXECUTE FUNCTION generate_temporal_key();

-- 8. Multidimensional Energy Grid
CREATE TABLE energy_grids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  grid_type TEXT NOT NULL,
  coordinates JSONB NOT NULL DEFAULT '{}',
  node_connections JSONB DEFAULT '{}',
  energy_flow REAL,
  stabilization_factor REAL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Soul Fragment Recovery
CREATE TABLE soul_fragments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  fragment_source TEXT NOT NULL,
  recovery_method TEXT,
  re_integration_level REAL,
  emotional_charge JSONB DEFAULT '{}',
  recovered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_fragment_recovery ON soul_fragments (fragment_source, re_integration_level);

-- 10. Galactic Heritage Profiler
CREATE TABLE galactic_heritage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  star_system_origin TEXT NOT NULL,
  lineage_percentage REAL,
  genetic_markers TEXT[],
  soul_mission_alignment REAL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. Consciousness Waveform Analyzer
CREATE TABLE consciousness_waves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  wave_pattern JSONB NOT NULL DEFAULT '{}',
  frequency_spectrum REAL[],
  amplitude_variance REAL,
  coherence_score REAL,
  measured_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. Universal Life Force Channel
CREATE TABLE life_force_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  channel_capacity REAL NOT NULL,
  flow_rate REAL,
  source_connection TEXT,
  blockages_detected TEXT[],
  purification_level REAL,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_activated TIMESTAMPTZ
);

CREATE INDEX idx_channel_capacity ON life_force_channels (channel_capacity, flow_rate);

-- Quantum Entanglement Network
CREATE TABLE quantum_entanglement (
  node_a UUID NOT NULL,
  node_b UUID NOT NULL,
  entanglement_strength REAL,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (node_a, node_b)
);

-- Consciousness Encryption Vault
CREATE TABLE consciousness_vault (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  encrypted_essence TEXT NOT NULL,
  quantum_key TEXT,
  multi_factor_decryption JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security for all new tables
ALTER TABLE akashic_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE merkaba_activations ENABLE ROW LEVEL SECURITY;
ALTER TABLE plasma_healing ENABLE ROW LEVEL SECURITY;
ALTER TABLE soul_blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE cosmic_gateways ENABLE ROW LEVEL SECURITY;
ALTER TABLE stellar_language ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_capsules ENABLE ROW LEVEL SECURITY;
ALTER TABLE energy_grids ENABLE ROW LEVEL SECURITY;
ALTER TABLE soul_fragments ENABLE ROW LEVEL SECURITY;
ALTER TABLE galactic_heritage ENABLE ROW LEVEL SECURITY;
ALTER TABLE consciousness_waves ENABLE ROW LEVEL SECURITY;
ALTER TABLE life_force_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE quantum_entanglement ENABLE ROW LEVEL SECURITY;
ALTER TABLE consciousness_vault ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user access
CREATE POLICY "Users can view their own akashic records" ON akashic_access FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own akashic records" ON akashic_access FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own akashic records" ON akashic_access FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own akashic records" ON akashic_access FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own merkaba activations" ON merkaba_activations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own merkaba activations" ON merkaba_activations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own merkaba activations" ON merkaba_activations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own merkaba activations" ON merkaba_activations FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own plasma healing" ON plasma_healing FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own plasma healing" ON plasma_healing FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own plasma healing" ON plasma_healing FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own plasma healing" ON plasma_healing FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own soul blueprints" ON soul_blueprints FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own soul blueprints" ON soul_blueprints FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own soul blueprints" ON soul_blueprints FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own soul blueprints" ON soul_blueprints FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own cosmic gateways" ON cosmic_gateways FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own cosmic gateways" ON cosmic_gateways FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own cosmic gateways" ON cosmic_gateways FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own cosmic gateways" ON cosmic_gateways FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own stellar language" ON stellar_language FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own stellar language" ON stellar_language FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own stellar language" ON stellar_language FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own stellar language" ON stellar_language FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own time capsules" ON time_capsules FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own time capsules" ON time_capsules FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own time capsules" ON time_capsules FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own time capsules" ON time_capsules FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own energy grids" ON energy_grids FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own energy grids" ON energy_grids FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own energy grids" ON energy_grids FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own energy grids" ON energy_grids FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own soul fragments" ON soul_fragments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own soul fragments" ON soul_fragments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own soul fragments" ON soul_fragments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own soul fragments" ON soul_fragments FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own galactic heritage" ON galactic_heritage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own galactic heritage" ON galactic_heritage FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own galactic heritage" ON galactic_heritage FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own galactic heritage" ON galactic_heritage FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own consciousness waves" ON consciousness_waves FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own consciousness waves" ON consciousness_waves FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own consciousness waves" ON consciousness_waves FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own consciousness waves" ON consciousness_waves FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own life force channels" ON life_force_channels FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own life force channels" ON life_force_channels FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own life force channels" ON life_force_channels FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own life force channels" ON life_force_channels FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own consciousness vault" ON consciousness_vault FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own consciousness vault" ON consciousness_vault FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own consciousness vault" ON consciousness_vault FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own consciousness vault" ON consciousness_vault FOR DELETE USING (auth.uid() = user_id);

-- Quantum entanglement policies (users can view connections involving them)
CREATE POLICY "Users can view their quantum entanglements" ON quantum_entanglement 
FOR SELECT USING (auth.uid() = node_a OR auth.uid() = node_b);
CREATE POLICY "Users can create quantum entanglements" ON quantum_entanglement 
FOR INSERT WITH CHECK (auth.uid() = node_a OR auth.uid() = node_b);
