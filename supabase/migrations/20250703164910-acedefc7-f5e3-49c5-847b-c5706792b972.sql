
-- Phase 1: Critical RLS Policy Fixes

-- Fix overly permissive policies on activity_logs
DROP POLICY IF EXISTS "Allow all operations on activity logs" ON public.activity_logs;

CREATE POLICY "Users can view their own activity logs" ON public.activity_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own activity logs" ON public.activity_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Fix projects table to be user-specific
DROP POLICY IF EXISTS "Allow all operations on projects" ON public.projects;

CREATE POLICY "Users can view projects they have access to" ON public.projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.activity_logs 
      WHERE project_id = projects.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create projects" ON public.projects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update projects they have access to" ON public.projects
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.activity_logs 
      WHERE project_id = projects.id AND user_id = auth.uid()
    )
  );

-- Fix task_assignments to be user-specific
DROP POLICY IF EXISTS "Allow all operations on task assignments" ON public.task_assignments;

CREATE POLICY "Users can view tasks assigned to or by them" ON public.task_assignments
  FOR SELECT USING (auth.uid() = assigned_to OR auth.uid() = assigned_by);

CREATE POLICY "Users can create task assignments" ON public.task_assignments
  FOR INSERT WITH CHECK (auth.uid() = assigned_by);

CREATE POLICY "Users can update tasks assigned to or by them" ON public.task_assignments
  FOR UPDATE USING (auth.uid() = assigned_to OR auth.uid() = assigned_by);

-- Fix team_comments to be user-specific
DROP POLICY IF EXISTS "Allow all operations on team comments" ON public.team_comments;

CREATE POLICY "Users can view comments on their projects" ON public.team_comments
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM public.activity_logs 
      WHERE project_id = team_comments.project_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own comments" ON public.team_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON public.team_comments
  FOR UPDATE USING (auth.uid() = user_id);

-- Fix subscribers table permissions
DROP POLICY IF EXISTS "update_own_subscription" ON public.subscribers;

CREATE POLICY "update_own_subscription" ON public.subscribers
  FOR UPDATE USING (user_id = auth.uid() OR email = auth.email());

-- Add missing DELETE policies for spiritual data protection
CREATE POLICY "Users can delete their own akashic records" ON public.akashic_records
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own akashic access" ON public.akashic_access
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own spiritual assessments" ON public.spiritual_assessments
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own spiritual practices" ON public.spiritual_practices
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own spiritual recommendations" ON public.spiritual_recommendations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own spiritual recommendations" ON public.spiritual_recommendations
  FOR DELETE USING (auth.uid() = user_id);

-- Add rate limiting table for security monitoring
CREATE TABLE IF NOT EXISTS public.security_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  event_type TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service can manage security logs" ON public.security_logs
  FOR ALL USING (true);
