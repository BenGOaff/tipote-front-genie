-- Add tutorial tracking fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS tutorial_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS tutorial_step VARCHAR(50) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS tutorial_context_flags JSONB DEFAULT '{}'::jsonb;