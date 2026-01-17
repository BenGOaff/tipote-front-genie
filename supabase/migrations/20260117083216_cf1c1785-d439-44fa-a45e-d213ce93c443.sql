-- Create metrics table for tracking monthly business metrics
CREATE TABLE public.metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  month DATE NOT NULL, -- First day of the month
  visitors INTEGER DEFAULT 0,
  new_subscribers INTEGER DEFAULT 0,
  email_open_rate DECIMAL(5,2) DEFAULT 0,
  email_click_rate DECIMAL(5,2) DEFAULT 0,
  sales_page_views INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  revenue DECIMAL(12,2) DEFAULT 0,
  -- Calculated fields stored for performance
  capture_rate DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE WHEN visitors > 0 THEN (new_subscribers::DECIMAL / visitors) * 100 ELSE 0 END
  ) STORED,
  conversion_rate DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE WHEN sales_page_views > 0 THEN (sales_count::DECIMAL / sales_page_views) * 100 ELSE 0 END
  ) STORED,
  avg_basket DECIMAL(12,2) GENERATED ALWAYS AS (
    CASE WHEN sales_count > 0 THEN revenue / sales_count ELSE 0 END
  ) STORED,
  subscriber_value DECIMAL(12,2) GENERATED ALWAYS AS (
    CASE WHEN new_subscribers > 0 THEN revenue / new_subscribers ELSE 0 END
  ) STORED,
  ai_analysis TEXT, -- AI generated analysis
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, month)
);

-- Enable Row Level Security
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own metrics" 
ON public.metrics 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own metrics" 
ON public.metrics 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own metrics" 
ON public.metrics 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own metrics" 
ON public.metrics 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_metrics_updated_at
BEFORE UPDATE ON public.metrics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();