
-- Fix all function search_path security issues
-- This prevents schema injection attacks by setting explicit search paths

-- Fix update_subscribers_updated_at function
ALTER FUNCTION public.update_subscribers_updated_at()
SET search_path = "$user", public;

-- Fix update_manifestation_timestamp function  
ALTER FUNCTION public.update_manifestation_timestamp()
SET search_path = "$user", public;

-- Fix update_timestamp function
ALTER FUNCTION public.update_timestamp() 
SET search_path = "$user", public;

-- Fix handle_new_user function (also has mutable search_path)
ALTER FUNCTION public.handle_new_user()
SET search_path = "$user", public;

-- Add security comments for documentation
COMMENT ON FUNCTION public.update_subscribers_updated_at() IS 'Trigger function with secure search_path to prevent schema injection';
COMMENT ON FUNCTION public.update_manifestation_timestamp() IS 'Trigger function with secure search_path to prevent schema injection';
COMMENT ON FUNCTION public.update_timestamp() IS 'Trigger function with secure search_path to prevent schema injection';
COMMENT ON FUNCTION public.handle_new_user() IS 'Auth trigger function with secure search_path to prevent schema injection';
