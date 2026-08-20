CREATE OR REPLACE VIEW public.activity_logs_with_users AS
SELECT 
    a.id, 
    a.user_id, 
    a.action, 
    a.target, 
    a.type, 
    a.created_at, 
    au.email as user_email
FROM public.activity_logs a
LEFT JOIN auth.users au ON a.user_id = au.id;

GRANT SELECT ON public.activity_logs_with_users TO authenticated;
