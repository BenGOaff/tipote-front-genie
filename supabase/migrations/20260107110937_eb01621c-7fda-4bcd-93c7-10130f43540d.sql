-- Ajouter les nouveaux champs pour l'onboarding selon le cahier des charges
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS mission_statement text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS biggest_blocker text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS offers jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS social_audience text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS social_links jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email_list_size text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS weekly_hours text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS main_goal_90_days text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS main_goals text[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS unique_value text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS untapped_strength text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS biggest_challenge text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS success_definition text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS client_feedback text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS communication_style text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_tones text[];