-- Insert default site settings
INSERT INTO public.site_settings (id, portal_name, hero_title, hero_subtitle) VALUES (1, 'MKN Portal', 'Sinergi Terintegrasi', 'Satu portal untuk semua sistem.') ON CONFLICT DO NOTHING;

-- Insert an admin user (using a known hash for 'password123')
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'admin@portal.com',
    crypt('password123', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
) ON CONFLICT DO NOTHING;

-- Grant admin role
INSERT INTO public.user_roles (user_id, role) VALUES ('00000000-0000-0000-0000-000000000000', 'admin') ON CONFLICT DO NOTHING;

