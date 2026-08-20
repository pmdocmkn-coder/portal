-- Categories
DROP POLICY IF EXISTS "Admins can insert categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can update categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can delete categories" ON public.categories;

CREATE POLICY "Admin/Editor can insert categories" ON public.categories FOR INSERT WITH CHECK (public.has_permission('categories', 'create'));
CREATE POLICY "Admin/Editor can update categories" ON public.categories FOR UPDATE USING (public.has_permission('categories', 'update'));
CREATE POLICY "Admin/Editor can delete categories" ON public.categories FOR DELETE USING (public.has_permission('categories', 'delete'));

-- Site Settings (Appearance)
DROP POLICY IF EXISTS "Admins can manage site_settings" ON public.site_settings;

CREATE POLICY "Admin/Editor can insert site_settings" ON public.site_settings FOR INSERT WITH CHECK (public.has_permission('appearance', 'create'));
CREATE POLICY "Admin/Editor can update site_settings" ON public.site_settings FOR UPDATE USING (public.has_permission('appearance', 'update'));
CREATE POLICY "Admin/Editor can delete site_settings" ON public.site_settings FOR DELETE USING (public.has_permission('appearance', 'delete'));

-- Brand Settings (Appearance)
DROP POLICY IF EXISTS "Admins can manage brand_settings" ON public.brand_settings;

CREATE POLICY "Admin/Editor can insert brand_settings" ON public.brand_settings FOR INSERT WITH CHECK (public.has_permission('appearance', 'create'));
CREATE POLICY "Admin/Editor can update brand_settings" ON public.brand_settings FOR UPDATE USING (public.has_permission('appearance', 'update'));
CREATE POLICY "Admin/Editor can delete brand_settings" ON public.brand_settings FOR DELETE USING (public.has_permission('appearance', 'delete'));

-- Hero Sliders (Sliders)
DROP POLICY IF EXISTS "Admins can manage hero_sliders" ON public.hero_sliders;

CREATE POLICY "Admin/Editor can insert hero_sliders" ON public.hero_sliders FOR INSERT WITH CHECK (public.has_permission('sliders', 'create'));
CREATE POLICY "Admin/Editor can update hero_sliders" ON public.hero_sliders FOR UPDATE USING (public.has_permission('sliders', 'update'));
CREATE POLICY "Admin/Editor can delete hero_sliders" ON public.hero_sliders FOR DELETE USING (public.has_permission('sliders', 'delete'));

-- User Roles (Users)
DROP POLICY IF EXISTS "Admins can manage user_roles" ON public.user_roles;

CREATE POLICY "Admin/Editor can insert user_roles" ON public.user_roles FOR INSERT WITH CHECK (public.has_permission('users', 'create'));
CREATE POLICY "Admin/Editor can update user_roles" ON public.user_roles FOR UPDATE USING (public.has_permission('users', 'update'));
CREATE POLICY "Admin/Editor can delete user_roles" ON public.user_roles FOR DELETE USING (public.has_permission('users', 'delete'));

-- Activity Logs (Activity)
DROP POLICY IF EXISTS "Admin/Editor can view activity_logs" ON public.activity_logs;
CREATE POLICY "Admin/Editor can view activity_logs" ON public.activity_logs FOR SELECT USING (public.has_permission('activity', 'view'));

