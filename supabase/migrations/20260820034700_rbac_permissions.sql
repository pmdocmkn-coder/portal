-- ============================================
-- 1. Create role_permissions table
-- ============================================
CREATE TABLE IF NOT EXISTS public.role_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL,
    page TEXT NOT NULL,
    can_view BOOLEAN DEFAULT false,
    can_create BOOLEAN DEFAULT false,
    can_update BOOLEAN DEFAULT false,
    can_delete BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(role, page)
);

-- RLS for role_permissions (only admins can manage)
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read role_permissions" ON public.role_permissions
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage role_permissions" ON public.role_permissions
    FOR ALL USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ============================================
-- 2. Seed default editor permissions
-- ============================================
INSERT INTO public.role_permissions (role, page, can_view, can_create, can_update, can_delete) VALUES
    ('editor', 'dashboard',  true,  false, false, false),
    ('editor', 'portals',    true,  true,  true,  false),
    ('editor', 'categories', true,  false, false, false),
    ('editor', 'appearance', false, false, false, false),
    ('editor', 'sliders',    false, false, false, false),
    ('editor', 'users',      false, false, false, false),
    ('editor', 'activity',   false, false, false, false),
    ('editor', 'profile',    true,  false, true,  false)
ON CONFLICT (role, page) DO NOTHING;

-- ============================================
-- 3. Helper function: check admin or editor role
-- ============================================
CREATE OR REPLACE FUNCTION public.has_admin_or_editor_role()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role IN ('admin', 'editor')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 4. Helper: check if current user has specific permission
-- ============================================
CREATE OR REPLACE FUNCTION public.has_permission(p_page TEXT, p_action TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    v_role TEXT;
BEGIN
    -- Get user's role
    SELECT role INTO v_role FROM public.user_roles WHERE user_id = auth.uid();
    
    -- Admin always has full access
    IF v_role = 'admin' THEN
        RETURN true;
    END IF;
    
    -- Check specific permission for the role
    RETURN EXISTS (
        SELECT 1 FROM public.role_permissions rp
        WHERE rp.role = v_role 
          AND rp.page = p_page
          AND CASE p_action
            WHEN 'view' THEN rp.can_view
            WHEN 'create' THEN rp.can_create
            WHEN 'update' THEN rp.can_update
            WHEN 'delete' THEN rp.can_delete
            ELSE false
          END = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 5. Update RLS on portal_items for editors
-- ============================================
-- Drop old insert/update/delete policies and recreate with editor support
DROP POLICY IF EXISTS "Admins can insert portal_items" ON public.portal_items;
DROP POLICY IF EXISTS "Admins can update portal_items" ON public.portal_items;
DROP POLICY IF EXISTS "Admins can delete portal_items" ON public.portal_items;

CREATE POLICY "Admin/Editor can insert portal_items" ON public.portal_items
    FOR INSERT WITH CHECK (public.has_permission('portals', 'create'));

CREATE POLICY "Admin/Editor can update portal_items" ON public.portal_items
    FOR UPDATE USING (public.has_permission('portals', 'update'));

CREATE POLICY "Admin/Editor can delete portal_items" ON public.portal_items
    FOR DELETE USING (public.has_permission('portals', 'delete'));

-- ============================================
-- 6. Update RLS on activity_logs for editors
-- ============================================
DROP POLICY IF EXISTS "Admins can view activity_logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Admins can insert activity_logs" ON public.activity_logs;

CREATE POLICY "Admin/Editor can view activity_logs" ON public.activity_logs
    FOR SELECT USING (public.has_admin_or_editor_role());

CREATE POLICY "Admin/Editor can insert activity_logs" ON public.activity_logs
    FOR INSERT WITH CHECK (public.has_admin_or_editor_role());

-- ============================================
-- 7. RPC: Get permissions for a role
-- ============================================
CREATE OR REPLACE FUNCTION public.get_role_permissions(p_role TEXT)
RETURNS SETOF public.role_permissions
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Access denied';
    END IF;
    RETURN QUERY SELECT * FROM public.role_permissions WHERE role = p_role ORDER BY page;
END;
$$;

-- ============================================
-- 8. RPC: Update a single permission
-- ============================================
CREATE OR REPLACE FUNCTION public.update_role_permission(
    p_role TEXT,
    p_page TEXT,
    p_can_view BOOLEAN,
    p_can_create BOOLEAN,
    p_can_update BOOLEAN,
    p_can_delete BOOLEAN
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Access denied';
    END IF;
    
    INSERT INTO public.role_permissions (role, page, can_view, can_create, can_update, can_delete, updated_at)
    VALUES (p_role, p_page, p_can_view, p_can_create, p_can_update, p_can_delete, NOW())
    ON CONFLICT (role, page) DO UPDATE SET
        can_view = EXCLUDED.can_view,
        can_create = EXCLUDED.can_create,
        can_update = EXCLUDED.can_update,
        can_delete = EXCLUDED.can_delete,
        updated_at = NOW();
END;
$$;
