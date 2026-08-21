-- Add stats_visitors column to site_settings if not exists
ALTER TABLE public.site_settings 
  ADD COLUMN IF NOT EXISTS stats_visitors INTEGER DEFAULT 0;

-- Initialize to 0 if null
UPDATE public.site_settings 
  SET stats_visitors = 0 
  WHERE stats_visitors IS NULL;

-- Fix the increment_visitor_count function with SECURITY DEFINER and COALESCE
CREATE OR REPLACE FUNCTION public.increment_visitor_count()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.site_settings 
      SET stats_visitors = COALESCE(stats_visitors, 0) + 1 
      WHERE id = 1;
    
    INSERT INTO public.daily_visitors (date, count)
    VALUES (CURRENT_DATE, 1)
    ON CONFLICT (date) DO UPDATE
    SET count = daily_visitors.count + 1;
END;
$$;

-- Grant execute to anon so public visitors are counted
GRANT EXECUTE ON FUNCTION public.increment_visitor_count() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_portal_click(UUID) TO anon, authenticated;
