
-- Create synchronicities table
CREATE TABLE public.synchronicities (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  synchronicity_type text NOT NULL,
  significance integer NOT NULL CHECK (significance >= 1 AND significance <= 5),
  tags text[] DEFAULT '{}',
  meaning text,
  date_occurred date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.synchronicities ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own synchronicities" 
  ON public.synchronicities 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own synchronicities" 
  ON public.synchronicities 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own synchronicities" 
  ON public.synchronicities 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own synchronicities" 
  ON public.synchronicities 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_synchronicities_user_id ON public.synchronicities(user_id);
CREATE INDEX idx_synchronicities_date_occurred ON public.synchronicities(date_occurred);
CREATE INDEX idx_synchronicities_type ON public.synchronicities(synchronicity_type);

-- Create trigger for updated_at
CREATE TRIGGER update_synchronicities_updated_at
  BEFORE UPDATE ON public.synchronicities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
