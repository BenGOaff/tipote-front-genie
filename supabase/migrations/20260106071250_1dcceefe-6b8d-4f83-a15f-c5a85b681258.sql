-- Ajouter les champs d'onboarding à la table profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS age_range text,
ADD COLUMN IF NOT EXISTS gender text,
ADD COLUMN IF NOT EXISTS country text,
ADD COLUMN IF NOT EXISTS business_type text,
ADD COLUMN IF NOT EXISTS maturity text,
ADD COLUMN IF NOT EXISTS audience_size text,
ADD COLUMN IF NOT EXISTS has_offers boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS offer_price text,
ADD COLUMN IF NOT EXISTS offer_sales_count text,
ADD COLUMN IF NOT EXISTS tools_used text[],
ADD COLUMN IF NOT EXISTS weekly_time text,
ADD COLUMN IF NOT EXISTS financial_goal text,
ADD COLUMN IF NOT EXISTS psychological_goal text,
ADD COLUMN IF NOT EXISTS content_preference text,
ADD COLUMN IF NOT EXISTS preferred_tone text;