
-- Create user_spiritual_profiles table
CREATE TABLE public.user_spiritual_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tradition TEXT NOT NULL DEFAULT 'eclectic',
  access_level INTEGER NOT NULL DEFAULT 1,
  spiritual_experience_years INTEGER DEFAULT 0,
  completed_safety_training BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create psalm_rituals table
CREATE TABLE public.psalm_rituals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  psalm_number INTEGER NOT NULL,
  situation TEXT NOT NULL,
  safety_rating INTEGER NOT NULL DEFAULT 5,
  min_user_level INTEGER NOT NULL DEFAULT 1,
  time_constraints TEXT,
  required_materials TEXT[] DEFAULT '{}',
  instructions JSONB DEFAULT '{}',
  seal_svg TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cultural_adaptations table
CREATE TABLE public.cultural_adaptations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ritual_id UUID NOT NULL REFERENCES public.psalm_rituals(id) ON DELETE CASCADE,
  tradition TEXT NOT NULL,
  modified_instructions JSONB,
  material_substitutions TEXT[],
  disclaimer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ritual_activations table
CREATE TABLE public.ritual_activations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ritual_id UUID NOT NULL REFERENCES public.psalm_rituals(id) ON DELETE CASCADE,
  safety_incidents JSONB DEFAULT '{}',
  activated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cultural_safety_logs table
CREATE TABLE public.cultural_safety_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ritual_id UUID NOT NULL REFERENCES public.psalm_rituals(id) ON DELETE CASCADE,
  safety_check_type TEXT NOT NULL,
  passed BOOLEAN NOT NULL DEFAULT true,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sacred_texts table
CREATE TABLE public.sacred_texts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  tradition TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.user_spiritual_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.psalm_rituals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cultural_adaptations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ritual_activations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cultural_safety_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sacred_texts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own spiritual profile" 
  ON public.user_spiritual_profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own spiritual profile" 
  ON public.user_spiritual_profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own spiritual profile" 
  ON public.user_spiritual_profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view psalm rituals" 
  ON public.psalm_rituals 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view cultural adaptations" 
  ON public.cultural_adaptations 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their own ritual activations" 
  ON public.ritual_activations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ritual activations" 
  ON public.ritual_activations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own safety logs" 
  ON public.cultural_safety_logs 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own safety logs" 
  ON public.cultural_safety_logs 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view sacred texts" 
  ON public.sacred_texts 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Insert sample ritual data
INSERT INTO public.psalm_rituals (psalm_number, situation, safety_rating, min_user_level, required_materials, instructions, seal_svg) VALUES
(23, 'protection', 8, 1, ARRAY['white_candle', 'salt', 'holy_water'], 
 '{"steps": ["Light the white candle", "Create a salt circle", "Recite Psalm 23", "Visualize white light protection"], "duration": "15-20 minutes"}',
 '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="2"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="12">PROTECTION</text></svg>'),

(91, 'spiritual_attack', 9, 1, ARRAY['black_candle', 'iron_nail', 'mirror'], 
 '{"steps": ["Light black candle for banishing", "Hold iron nail for grounding", "Use mirror to reflect negativity", "Recite Psalm 91 three times"], "duration": "20-30 minutes"}',
 '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="red" stroke-width="3"/><text x="50" y="55" text-anchor="middle" fill="red" font-size="10">BANISH</text></svg>'),

(121, 'divine_guidance', 7, 1, ARRAY['purple_candle', 'amethyst', 'frankincense'], 
 '{"steps": ["Light purple candle", "Hold amethyst crystal", "Burn frankincense", "Meditate on Psalm 121", "Listen for guidance"], "duration": "25-35 minutes"}',
 '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="purple" stroke-width="2"/><text x="50" y="55" text-anchor="middle" fill="purple" font-size="10">GUIDANCE</text></svg>'),

(51, 'cleansing', 6, 1, ARRAY['white_sage', 'bowl_of_water', 'sea_salt'], 
 '{"steps": ["Burn white sage", "Add sea salt to water", "Sprinkle blessed water", "Recite Psalm 51 for purification"], "duration": "15-25 minutes"}',
 '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="blue" stroke-width="2"/><text x="50" y="55" text-anchor="middle" fill="blue" font-size="10">CLEANSE</text></svg>'),

(107, 'healing', 7, 1, ARRAY['green_candle', 'rose_quartz', 'healing_herbs'], 
 '{"steps": ["Light green candle", "Hold rose quartz", "Burn healing herbs", "Recite Psalm 107", "Send healing energy"], "duration": "20-30 minutes"}',
 '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="green" stroke-width="2"/><text x="50" y="55" text-anchor="middle" fill="green" font-size="10">HEALING</text></svg>'),

(144, 'banishing', 9, 2, ARRAY['black_candle', 'obsidian', 'banishing_oil'], 
 '{"steps": ["Anoint black candle with banishing oil", "Hold obsidian for grounding", "Recite Psalm 144 with authority", "Command unwanted energies to leave"], "duration": "30-45 minutes"}',
 '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="black" stroke-width="3"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="10">BANISH</text></svg>');

-- Insert sample sacred texts
INSERT INTO public.sacred_texts (title, tradition, description) VALUES
('Psalm 23', 'christian', 'The Lord is my shepherd psalm for protection'),
('Psalm 91', 'christian', 'Psalm of protection against spiritual attacks'),
('Psalm 121', 'christian', 'Psalm for divine guidance and help'),
('Psalm 51', 'christian', 'Psalm of purification and cleansing'),
('Psalm 107', 'christian', 'Psalm of thanksgiving and healing'),
('Psalm 144', 'christian', 'Psalm for spiritual warfare and banishing');

-- Insert sample cultural adaptations
INSERT INTO public.cultural_adaptations (ritual_id, tradition, disclaimer) VALUES
((SELECT id FROM public.psalm_rituals WHERE psalm_number = 23), 'eclectic', 'This practice draws from Christian tradition but can be adapted to your personal beliefs.'),
((SELECT id FROM public.psalm_rituals WHERE psalm_number = 91), 'eclectic', 'Approach with respect for the sacred. Modify as needed for your spiritual path.'),
((SELECT id FROM public.psalm_rituals WHERE psalm_number = 121), 'eclectic', 'Universal principles of seeking guidance can be applied across traditions.'),
((SELECT id FROM public.psalm_rituals WHERE psalm_number = 51), 'eclectic', 'Purification practices exist in many traditions. Use what resonates with you.'),
((SELECT id FROM public.psalm_rituals WHERE psalm_number = 107), 'eclectic', 'Healing intentions transcend specific religious boundaries.'),
((SELECT id FROM public.psalm_rituals WHERE psalm_number = 144), 'eclectic', 'Spiritual protection practices should be approached with wisdom and respect.');

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_spiritual_profiles_updated_at 
    BEFORE UPDATE ON public.user_spiritual_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
