CREATE OR REPLACE FUNCTION create_or_assign_admin(p_email text, p_password text, p_role text)
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

    -- Check if user exists
    SELECT id INTO v_user_id FROM auth.users WHERE email = p_email;
    
    IF v_user_id IS NULL THEN
        -- Create new user
        v_user_id := gen_random_uuid();
        INSERT INTO auth.users (
            id, instance_id, email, encrypted_password, email_confirmed_at, 
            raw_app_meta_data, raw_user_meta_data, created_at, updated_at, 
            role, confirmation_token
        )
        VALUES (
            v_user_id, '00000000-0000-0000-0000-000000000000', p_email, 
            crypt(p_password, gen_salt('bf')), now(), 
            '{"provider":"email","providers":["email"]}', '{}', now(), now(), 
            'authenticated', ''
        );
    ELSE
        -- If user exists but is trying to create with a new password, we optionally update it.
        -- But for now we just assign the role.
    END IF;

    -- Assign role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_user_id, p_role)
    ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role;
END;
$$;
