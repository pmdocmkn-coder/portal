-- RPC to safely increment daily visitor
CREATE OR REPLACE FUNCTION increment_visitor_count()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Increment site_settings overall counter
    UPDATE public.site_settings SET stats_visitors = stats_visitors + 1 WHERE id = 1;
    
    -- Increment daily visitors
    INSERT INTO public.daily_visitors (date, count)
    VALUES (CURRENT_DATE, 1)
    ON CONFLICT (date) DO UPDATE
    SET count = daily_visitors.count + 1;
END;
$$;
