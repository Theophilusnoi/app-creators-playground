
-- Enable Row Level Security on the dreams table
ALTER TABLE public.dreams ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own dreams
CREATE POLICY "Users can view their own dreams" 
  ON public.dreams 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own dreams
CREATE POLICY "Users can create their own dreams" 
  ON public.dreams 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to update their own dreams
CREATE POLICY "Users can update their own dreams" 
  ON public.dreams 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to delete their own dreams
CREATE POLICY "Users can delete their own dreams" 
  ON public.dreams 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Clean up data inconsistencies - remove entries that look like meditation or shadow work logs
DELETE FROM public.dreams 
WHERE title LIKE 'Meditation:%' 
   OR title LIKE 'Shadow Work:%' 
   OR content LIKE 'Meditation:%' 
   OR content LIKE 'Shadow Work:%';

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_dreams_user_id ON public.dreams(user_id);
CREATE INDEX IF NOT EXISTS idx_dreams_dream_date ON public.dreams(dream_date);
