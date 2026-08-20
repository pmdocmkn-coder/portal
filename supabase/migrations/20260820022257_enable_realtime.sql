-- Aktifkan replikasi untuk tabel-tabel utama agar live update bekerja
ALTER PUBLICATION supabase_realtime ADD TABLE site_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE portal_items;
ALTER PUBLICATION supabase_realtime ADD TABLE hero_sliders;
