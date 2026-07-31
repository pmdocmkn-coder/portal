import { PortalSite, ProjectCardData, ServiceItem } from '../types';

export interface CompanyInfo {
  name: string;
  tagline: string;
  subtagline: string;
  established: string;
  location: string;
  totalProjects: string;
  activePortals: string;
  clientCount: string;
  satisfactionRate: string;
  authType: string;
}

export const COMPANY_INFO: CompanyInfo = {
  name: 'MKN PORTAL HUB',
  tagline: 'Pusat Akses & Direktori Web Portal Perusahaan',
  subtagline: 'Satu pintu akses terpadu untuk seluruh sistem operasional, portal manajemen, dan layanan digital MKN.',
  established: '2021',
  location: 'Jakarta, Indonesia',
  totalProjects: '14 Portal',
  activePortals: '14 Portal Live',
  clientCount: '6 Kategori',
  satisfactionRate: '99.99%',
  authType: 'SSO Enforced'
};

export interface MarqueeItem {
  id: string;
  title: string;
  company: string;
  gif: string;
  url: string;
  category: string;
  tags: string[];
  description: string;
  status: 'Active' | 'Beta' | 'Enterprise';
  statusColor: 'emerald' | 'amber' | 'red';
}

export const MARQUEE_PORTALS: MarqueeItem[] = [
  {
    id: 'mkn-orbital-portal',
    title: 'MKN Orbital Portal',
    company: 'Operasional Satelit',
    gif: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
    url: 'https://spacevoyage.example.com',
    category: 'Operasional & Sistem',
    tags: ['Monitoring Realtime', 'Telemetri', 'Internal'],
    description: 'Portal pemantauan sistem operasional dan telemetri jaringan utama Synergy MKN Onwards.',
    status: 'Active',
    statusColor: 'emerald'
  },
  {
    id: 'mkn-devhub-portal',
    title: 'MKN DevHub Portal',
    company: 'Dev & API Suite',
    gif: 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
    url: 'https://codenest.example.com',
    category: 'Pengembang & Infrastruktur',
    tags: ['Dokumentasi API', 'DevTools', 'SDK'],
    description: 'Portal pusat dokumentasi API, pengujian sistem, dan pustaka integrasi untuk tim pengembang.',
    status: 'Active',
    statusColor: 'emerald'
  },
  {
    id: 'mkn-capital-portal',
    title: 'MKN Capital Portal',
    company: 'Manajemen Keuangan',
    gif: 'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
    url: 'https://vexventures.example.com',
    category: 'Manajemen & Analitik',
    tags: ['Keuangan Korporat', 'Alokasi Aset', 'Laporan'],
    description: 'Portal pelaporan keuangan terpadu, alokasi anggaran, dan alur persetujuan investasi perusahaan.',
    status: 'Enterprise',
    statusColor: 'emerald'
  },
  {
    id: 'mkn-intelligence-engine',
    title: 'MKN Intelligence Hub',
    company: 'Asisten AI Perusahaan',
    gif: 'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
    url: 'https://stellar.ai',
    category: 'Manajemen & Analitik',
    tags: ['AI Assistant', 'Pencarian Dokumen', 'Data Processing'],
    description: 'Portal asisten cerdas berbasis kecerdasan buatan untuk pemrosesan data dan otomasi tugas internal.',
    status: 'Active',
    statusColor: 'emerald'
  },
  {
    id: 'mkn-architecture-portal',
    title: 'MKN Architecture Hub',
    company: 'Rancangan & Arsitektur',
    gif: 'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
    url: 'https://asme.example.com',
    category: 'Operasional & Sistem',
    tags: ['Arsip Cetak Biru', 'Spesifikasi Teknik', 'Design Review'],
    description: 'Portal repositori cetak biru arsitektur sistem, cetakan desain teknis, dan arsip rancangan resmi.',
    status: 'Active',
    statusColor: 'emerald'
  },
  {
    id: 'mkn-data-matrix',
    title: 'MKN Executive Matrix',
    company: 'Dashboard Eksekutif',
    gif: 'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
    url: 'https://transformdata.example.com',
    category: 'Manajemen & Analitik',
    tags: ['KPI Perusahaan', 'Metrik Utama', 'Realtime'],
    description: 'Dashboard pemantauan KPI eksekutif, metrik pertumbuhan perusahaan, dan laporan berkala.',
    status: 'Beta',
    statusColor: 'amber'
  },
  {
    id: 'mkn-fleet-motors',
    title: 'MKN Fleet & Mobility',
    company: 'Logistik & Layanan',
    gif: 'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
    url: 'https://vitara.example.com',
    category: 'Operasional & Sistem',
    tags: ['Manajemen Fleet', 'Inventaris', 'Tracking'],
    description: 'Portal pengelolaan armada operasional, pemeliharaan aset, dan pelacakan distribusi internal.',
    status: 'Enterprise',
    statusColor: 'emerald'
  },
  {
    id: 'mkn-sustainability-hub',
    title: 'MKN Sustainability Hub',
    company: 'Laporan ESG',
    gif: 'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
    url: 'https://terra-eco.example.com',
    category: 'Informasi & Publikasi',
    tags: ['Laporan ESG', 'Lingkungan', 'Audit Hijau'],
    description: 'Portal transparansi kinerja keberlanjutan, laporan lingkungan, dan tata kelola perusahaan (ESG).',
    status: 'Active',
    statusColor: 'emerald'
  },
  {
    id: 'mkn-executive-portal',
    title: 'MKN Corporate Service',
    company: 'Layanan Korporat',
    gif: 'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
    url: 'https://skyelite.example.com',
    category: 'Layanan Karyawan & HR',
    tags: ['Layanan Direksi', 'Perjalanan Dinas', 'Protokol'],
    description: 'Portal koordinasi jadwal, reservasi fasilitas perusahaan, dan administrasi perjalanan dinas.',
    status: 'Enterprise',
    statusColor: 'emerald'
  },
  {
    id: 'mkn-sound-tech-portal',
    title: 'MKN Lab & Testing',
    company: 'R&D Lab Suite',
    gif: 'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
    url: 'https://aetherasound.example.com',
    category: 'Pengembang & Infrastruktur',
    tags: ['Pengujian Produk', 'Lab R&D', 'Simulasi'],
    description: 'Portal hasil pengujian laboratorium R&D dan pameran modul simulasi perangkat keras.',
    status: 'Active',
    statusColor: 'emerald'
  },
  {
    id: 'mkn-designpro',
    title: 'MKN Design System Hub',
    company: 'UI/UX & Brand Assets',
    gif: 'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
    url: 'https://designpro.example.com',
    category: 'Informasi & Publikasi',
    tags: ['Asset Brand', 'Design Tokens', 'Pustaka UI'],
    description: 'Portal aset resmi merek Synergy MKN Onwards, pedoman visual, dan komponen UI/UX terintegrasi.',
    status: 'Active',
    statusColor: 'emerald'
  },
  {
    id: 'mkn-cloud-network',
    title: 'MKN Cloud Operations',
    company: 'Infra & Network',
    gif: 'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
    url: 'https://nexoracloud.example.com',
    category: 'Pengembang & Infrastruktur',
    tags: ['Server Status', 'Uptime 99.9%', 'Keamanan'],
    description: 'Portal pemantauan kondisi server cloud, status konektivitas antar-cabang, dan keamanan jaringan.',
    status: 'Enterprise',
    statusColor: 'emerald'
  },
  {
    id: 'mkn-spatial-lab',
    title: 'MKN Innovation Portal',
    company: 'Inovasi Digital',
    gif: 'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
    url: 'https://evrventures.example.com',
    category: 'Pengembang & Infrastruktur',
    tags: ['R&D Inovasi', 'Eksperimen Tech', 'Prototype'],
    description: 'Portal pameran prototipe teknologi terbaru dan proyek eksperimental internal Synergy MKN Onwards.',
    status: 'Beta',
    statusColor: 'amber'
  },
  {
    id: 'mkn-private-wealth',
    title: 'MKN Encrypted Portal',
    company: 'Portal Keamanan',
    gif: 'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
    url: 'https://wealthcapital.example.com',
    category: 'Portal Keamanan & Akses',
    tags: ['SSO Enforced', 'Enkripsi 256-bit', 'Kerahasiaan'],
    description: 'Portal akses khusus dengan enkripsi ganda untuk pengelolaan dokumen rahasia dan audit internal.',
    status: 'Enterprise',
    statusColor: 'emerald'
  }
];

export const MARQUEE_ROW_1 = MARQUEE_PORTALS.slice(0, 7);
export const MARQUEE_ROW_2 = MARQUEE_PORTALS.slice(7, 14);

export const COMPANY_SOLUTIONS: ServiceItem[] = [
  {
    number: '01',
    title: 'Portal Operasional & Manajemen Sistem',
    description: 'Akses langsung ke platform kerja harian, pelaporan tugas, dan pemantauan sistem operasional perusahaan secara terpusat.'
  },
  {
    number: '02',
    title: 'Portal Analitik & Dashboard Eksekutif',
    description: 'Ringkasan data kinerja bisnis waktu nyata, indikator KPI utama, dan laporan strategi untuk manajemen.'
  },
  {
    number: '03',
    title: 'Portal Layanan Karyawan & HR Suite',
    description: 'Layanan mandiri karyawan untuk pengajuan administrasi, direktori tim, serta reservasi fasilitas perusahaan.'
  },
  {
    number: '04',
    title: 'Portal Pengembang & Infrastruktur Cloud',
    description: 'Dokumentasi API resmi, pemantauan server cloud, dan pustaka komponen desain untuk tim teknis.'
  },
  {
    number: '05',
    title: 'Portal Informasi & Keamanan Terpadu',
    description: 'Pusat pengumuman resmi, standar aset merek, dan pintu masuk portal terenkripsi khusus eksekutif.'
  }
];

export const FEATURED_PROJECTS: ProjectCardData[] = [
  {
    id: 'mkn-project-01',
    number: '01',
    title: 'MKN Executive Matrix Portal',
    category: 'Client',
    type: 'Portal Dashboard Analitik & KPI Utama',
    col1Image1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    liveUrl: 'https://transformdata.example.com',
    description: 'Portal pusat bagi jajaran manajemen untuk memantau performa bisnis, visualisasi arus kas, dan indikator kunci kinerja secara real-time.',
    techStack: ['Dashboard Analitik', 'SSO Login', 'Realtime Sync', 'Security Enforced']
  },
  {
    id: 'mkn-project-02',
    number: '02',
    title: 'MKN DevHub & API Portal',
    category: 'Personal',
    type: 'Portal Infrastruktur & Pengembang API',
    col1Image1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bac7-331adfce159f.png&w=1280&q=85',
    col1Image2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    liveUrl: 'https://codenest.example.com',
    description: 'Portal dokumentasi teknis dan pengujian API interaktif bagi tim IT internal Synergy MKN Onwards untuk memastikan integrasi data yang stabil.',
    techStack: ['DevTools', 'API Docs', 'OAuth Security', 'JSON Parser']
  },
  {
    id: 'mkn-project-03',
    number: '03',
    title: 'MKN Orbital Operations Portal',
    category: 'Client',
    type: 'Portal Telemetri & Monitoring Operasional',
    col1Image1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    liveUrl: 'https://spacevoyage.example.com',
    description: 'Portal monitoring sistem operasional terpusat dengan indikator visual dan grafik kondisi jaringan secara langsung.',
    techStack: ['Live Telemetry', 'Alert System', 'Map Visualizer', 'Cloud Storage']
  }
];

export const DECORATIVE_IMAGES = {
  moonIcon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  object3D: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  legoIcon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  group3D: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
  heroPortrait: 'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png'
};
