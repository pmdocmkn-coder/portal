-- =============================================
-- Fix admin user management functions
-- Use proper Supabase Auth patterns
-- =============================================

-- 1. New function: assign_user_role (only handles user_roles table)
CREATE OR REPLACE FUNCTION public.assign_user_role(p_email text, p_role text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id uuid;
BEGIN
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Access denied';
    END IF;

    SELECT id INTO v_user_id FROM auth.users WHERE email = p_email;
    
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'User dengan email % tidak ditemukan', p_email;
    END IF;

    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_user_id, p_role)
    ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role;
END;
$$;

-- 2. New function: admin_update_password (safely updates password)
CREATE OR REPLACE FUNCTION public.admin_update_password(p_email text, p_password text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id uuid;
BEGIN
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Access denied';
    END IF;

    SELECT id INTO v_user_id FROM auth.users WHERE email = p_email;
    
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'User tidak ditemukan';
    END IF;

    UPDATE auth.users 
    SET encrypted_password = crypt(p_password, gen_salt('bf', 10)),
        updated_at = now()
    WHERE id = v_user_id;
END;
$$;

-- 3. New function: delete_admin_user (full cleanup from auth.users + identities + user_roles)
CREATE OR REPLACE FUNCTION public.delete_admin_user(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Access denied';
    END IF;

    -- Prevent deleting yourself
    IF auth.uid() = p_user_id THEN
        RAISE EXCEPTION 'Anda tidak bisa menghapus akun Anda sendiri.';
    END IF;

    -- Delete from user_roles
    DELETE FROM public.user_roles WHERE user_id = p_user_id;
    
    -- Delete from auth.identities
    DELETE FROM auth.identities WHERE user_id = p_user_id;
    
    -- Delete from auth.sessions (force logout)
    DELETE FROM auth.sessions WHERE user_id = p_user_id;
    
    -- Delete from auth.refresh_tokens
    DELETE FROM auth.refresh_tokens WHERE user_id::uuid = p_user_id;
    
    -- Delete from auth.users (permanent)
    DELETE FROM auth.users WHERE id = p_user_id;
END;
$$;

-- 4. Grant execute permissions
GRANT EXECUTE ON FUNCTION public.assign_user_role(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_update_password(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_admin_user(uuid) TO authenticated;
