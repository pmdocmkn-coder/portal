CREATE OR REPLACE FUNCTION assign_role_by_email(p_email text, p_role text)
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
        RAISE EXCEPTION 'Pengguna dengan email % tidak ditemukan di sistem. Pastikan mereka sudah mendaftar (Sign Up) terlebih dahulu.', p_email;
    END IF;

    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_user_id, p_role)
    ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role;
END;
$$;

CREATE OR REPLACE FUNCTION remove_user_role(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Access denied';
    END IF;

    -- Prevent removing yourself
    IF auth.uid() = p_user_id THEN
        RAISE EXCEPTION 'Anda tidak bisa menghapus akses Anda sendiri.';
    END IF;

    DELETE FROM public.user_roles WHERE user_id = p_user_id;
END;
$$;
