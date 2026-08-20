INSERT INTO public.activity_logs (action, target, type) VALUES
('menambahkan portal baru', '"Sistem Alumni"', 'info'),
('Perubahan konfigurasi SSL pada', 'Portal Akademik', 'success'),
('Laporan mingguan Pengunjung Aktif dihasilkan', 'otomatis', 'info'),
('Peringatan: Downtime terdeteksi pada', 'E-Library (Resolved)', 'error'),
('Update sistem MKN Portal Hub ke versi', 'v2.4.1', 'info');

INSERT INTO public.categories (name, icon, is_active) VALUES
('Operasional', 'Gear', true),
('Keamanan', 'ShieldCheck', true),
('Fleet & Radio', 'CarProfile', true),
('Dokumen', 'FileText', true),
('Infrastruktur', 'Buildings', false),
('Lainnya', NULL, true);
