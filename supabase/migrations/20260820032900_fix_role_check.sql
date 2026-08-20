-- Drop the existing check constraint that only allows limited role values
ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_role_check;

-- Recreate it with all allowed values: admin, editor, user
ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_role_check 
  CHECK (role IN ('admin', 'editor', 'user'));
