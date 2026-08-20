-- Fix storage policies so editors can also upload/update/delete files
-- Previously only is_admin() was allowed

DROP POLICY IF EXISTS "Admins can insert portal_assets" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update portal_assets" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete portal_assets" ON storage.objects;

CREATE POLICY "Admin/Editor can insert portal_assets" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'portal_assets' AND public.has_admin_or_editor_role());

CREATE POLICY "Admin/Editor can update portal_assets" ON storage.objects
    FOR UPDATE USING (bucket_id = 'portal_assets' AND public.has_admin_or_editor_role());

CREATE POLICY "Admin/Editor can delete portal_assets" ON storage.objects
    FOR DELETE USING (bucket_id = 'portal_assets' AND public.has_admin_or_editor_role());
