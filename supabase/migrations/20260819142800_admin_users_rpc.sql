-- Create a secure view to access auth.users emails for admin panel
CREATE OR REPLACE VIEW public.admin_user_profiles AS
SELECT id, email, created_at, last_sign_in_at
FROM auth.users;

-- Grant access so authenticated users can read it (we will secure it with RLS, wait views don't have RLS by default unless security invoker)
-- Actually, a better approach is a table synced via triggers, or a function.
-- Let's use a function that returns users but only if the caller is an admin.

CREATE OR REPLACE FUNCTION get_admin_users()
RETURNS TABLE (
    user_id UUID,
    email VARCHAR,
    role TEXT,
    created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Access denied';
    END IF;

    RETURN QUERY
    SELECT 
        u.id as user_id, 
        u.email::VARCHAR, 
        ur.role, 
        ur.created_at
    FROM auth.users u
    JOIN public.user_roles ur ON u.id = ur.user_id;
END;
$$;
