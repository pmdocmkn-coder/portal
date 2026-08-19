-- Make thumbnail optional in portal_items
ALTER TABLE public.portal_items ALTER COLUMN thumbnail DROP NOT NULL;

-- Create categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    icon TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create brand_settings table (replacing site_settings for identity)
CREATE TABLE IF NOT EXISTS public.brand_settings (
    id INT PRIMARY KEY DEFAULT 1,
    company_name TEXT DEFAULT 'PT. Solusi Maju Bersama',
    portal_name TEXT DEFAULT 'Solusi Maju',
    company_website TEXT DEFAULT 'www.solusimaju.com',
    contact_phone TEXT DEFAULT '+62 812-3456-7890',
    company_address TEXT DEFAULT 'Jakarta',
    contact_email TEXT DEFAULT 'info@solusimaju.com',
    facebook_url TEXT,
    twitter_url TEXT,
    linkedin_url TEXT,
    instagram_url TEXT,
    stats_visitors INT DEFAULT 65200,
    stats_bg_image TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT brand_settings_single_row CHECK (id = 1)
);

-- Seed brand_settings if it doesn't exist
INSERT INTO public.brand_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Analytics: daily_visitors
CREATE TABLE public.daily_visitors (
    date DATE PRIMARY KEY DEFAULT CURRENT_DATE,
    count INT DEFAULT 1
);

-- Analytics: portal_clicks
CREATE TABLE public.portal_clicks (
    portal_id UUID REFERENCES public.portal_items(id) ON DELETE CASCADE,
    date DATE DEFAULT CURRENT_DATE,
    clicks INT DEFAULT 1,
    PRIMARY KEY (portal_id, date)
);

-- Activity Logs
CREATE TABLE public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    target TEXT NOT NULL,
    details TEXT,
    type TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'error', 'success')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portal_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Setup RLS Policies

-- Public access policies
CREATE POLICY "Public can read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public can read brand_settings" ON public.brand_settings FOR SELECT USING (true);

-- Allow public to insert/update daily_visitors and portal_clicks (since public tracking happens client-side without auth usually)
CREATE POLICY "Public can read daily_visitors" ON public.daily_visitors FOR SELECT USING (true);
CREATE POLICY "Public can insert daily_visitors" ON public.daily_visitors FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update daily_visitors" ON public.daily_visitors FOR UPDATE USING (true);

CREATE POLICY "Public can read portal_clicks" ON public.portal_clicks FOR SELECT USING (true);
CREATE POLICY "Public can insert portal_clicks" ON public.portal_clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update portal_clicks" ON public.portal_clicks FOR UPDATE USING (true);

-- Admin policies
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage brand_settings" ON public.brand_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can read activity_logs" ON public.activity_logs FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert activity_logs" ON public.activity_logs FOR INSERT WITH CHECK (public.is_admin());

-- RPC to safely increment daily visitor
CREATE OR REPLACE FUNCTION increment_visitor_count()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Increment brand_settings overall counter
    UPDATE public.brand_settings SET stats_visitors = stats_visitors + 1 WHERE id = 1;
    
    -- Increment daily visitors
    INSERT INTO public.daily_visitors (date, count)
    VALUES (CURRENT_DATE, 1)
    ON CONFLICT (date) DO UPDATE
    SET count = daily_visitors.count + 1;
END;
$$;

-- RPC to increment portal click
CREATE OR REPLACE FUNCTION increment_portal_click(p_portal_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.portal_clicks (portal_id, date, clicks)
    VALUES (p_portal_id, CURRENT_DATE, 1)
    ON CONFLICT (portal_id, date) DO UPDATE
    SET clicks = portal_clicks.clicks + 1;
END;
$$;
