import { PortalSite, ProjectCardData, ServiceItem } from '../types';
import erpppImg from '../assets/images/erppp.jpg';
import logoMkn from '../assets/images/logo_mkn.png';
import gifOnward from '../assets/images/gif onward.gif';
import videoOnward from '../assets/images/onward.mp4';
import hsesclassImg from '../assets/images/hsesclass.png';
import msdclassImg from '../assets/images/msdclass.png';
import cctvmknImg from '../assets/images/cctvmkn.png';

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
  totalProjects: '7 Portal',
  activePortals: '7 Portal Live',
  clientCount: '5 Kategori',
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
  customImage?: string;
  previewImage?: string;
}

export const MARQUEE_PORTALS: MarqueeItem[] = [
  {
    id: 'mkn-smart-portal',
    title: 'MKN Smart Portal',
    company: 'MKN Smart System',
    gif: 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
    url: 'https://mknsmart.my.id/',
    category: 'Operasional & Sistem',
    tags: ['MKN Smart', 'Operasional', 'Live Web', 'Realtime'],
    description: 'Portal resmi MKN Smart untuk manajemen operasional cerdas, pemantauan sistem, dan integrasi layanan internal.',
    status: 'Active',
    statusColor: 'emerald'
  },
  {
    id: 'mkn-pm-ops-portal',
    title: 'MKN PM Ops Portal',
    company: 'MKN PM Operations',
    gif: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
    url: 'https://pm.mknops.web.id/',
    category: 'Operasional & Sistem',
    tags: ['Preventive Maintenance', 'PM Ops', 'Live Web', 'Tracking'],
    description: 'Portal pemeliharaan preventif (Preventive Maintenance Ops) dan sistem operasional harian untuk inspeksi, perawatan berkala, dan pemantauan perangkat.',
    status: 'Active',
    statusColor: 'emerald'
  },
  {
    id: 'mkn-erp-portal',
    title: 'MKN Enterprise ERP Portal',
    company: 'MKN ERP System',
    gif: 'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
    url: 'https://erp-mkn.starbit.id/login',
    category: 'Manajemen & Analitik',
    tags: ['ERP System', 'Starbit Cloud', 'Keuangan', 'Inventaris'],
    description: 'Portal ERP terpadu perusahaan untuk manajemen inventaris, keuangan, sumber daya, dan modul operasional bisnis MKN.',
    status: 'Enterprise',
    statusColor: 'emerald',
    customImage: erpppImg
  },
  {
    id: 'mkn-kpi-report-2026',
    title: 'MKN Operation KPI East-West 2026',
    company: 'MKN SharePoint',
    gif: 'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
    url: 'https://multikontrolnusantara.sharepoint.com/:x:/r/sites/MKNSangatta/_layouts/15/Doc.aspx?sourcedoc=%7B7483572E-AB8F-4594-ACDD-4CEE00CA5442%7D&file=Summary%20Report%20Operation%20KPI%20EAST%20-%20WEST%202026.xlsx&action=default&mobileredirect=true&DefaultItemOpen=1&wdOrigin=SHAREPOINT.SHELL%2CAPPHOME-WEB.JUMPBACKIN&wdPreviousSession=3a763537-f7c9-4efe-9f5d-b3f38baea803&wdPreviousSessionSrc=AppHomeWeb&ct=1785543682830',
    category: 'Manajemen & Analitik',
    tags: ['SharePoint', 'KPI East-West 2026', 'Executive Report', 'Live Sheet'],
    description: 'Laporan ringkasan KPI operasional wilayah East & West 2026 langsung di portal SharePoint resmi Multi Kontrol Nusantara.',
    status: 'Active',
    statusColor: 'emerald'
  },
  {
    id: 'hses-kpc-training',
    title: 'HSES KPC Daftar Training',
    company: 'KPC HSES Class',
    gif: 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
    url: 'https://kpc-hsesclass.azurewebsites.net/',
    category: 'Training & Sertifikasi',
    tags: ['HSES', 'KPC', 'Training', 'Safety'],
    description: 'Portal pendaftaran dan manajemen pelatihan HSES (Health, Safety, Environment & Security) KPC untuk karyawan dan kontraktor.',
    status: 'Active',
    statusColor: 'emerald',
    previewImage: hsesclassImg
  },
  {
    id: 'msd-refresh',
    title: 'MSD Refresh',
    company: 'MSD Portal',
    gif: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
    url: 'https://atdportal.netlify.app/',
    category: 'Layanan & Dukungan',
    tags: ['MSD', 'Portal', 'Layanan', 'Dukungan'],
    description: 'Portal MSD untuk layanan dan dukungan teknis perusahaan.',
    status: 'Active',
    statusColor: 'emerald',
    previewImage: msdclassImg
  },

  {
    id: 'cctv-mkn-site',
    title: 'CCTV MKN SITE',
    company: 'MKN Security System',
    gif: 'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
    url: 'http://10.80.16.29/doc/page/login.asp?_1785559389694',
    category: 'Keamanan & Monitoring',
    tags: ['CCTV', 'Security', 'Monitoring', 'Local Network'],
    description: 'Portal monitoring CCTV MKN Site. Catatan: Hanya dapat diakses melalui IE Mode dan Local Network MKN.',
    status: 'Active',
    statusColor: 'amber',
    previewImage: cctvmknImg
  }
];

export const MARQUEE_ROW_1 = [MARQUEE_PORTALS[0], MARQUEE_PORTALS[1], MARQUEE_PORTALS[2], MARQUEE_PORTALS[3], MARQUEE_PORTALS[4], MARQUEE_PORTALS[5], MARQUEE_PORTALS[6]];
export const MARQUEE_ROW_2 = [MARQUEE_PORTALS[3], MARQUEE_PORTALS[4], MARQUEE_PORTALS[5], MARQUEE_PORTALS[6], MARQUEE_PORTALS[0], MARQUEE_PORTALS[1], MARQUEE_PORTALS[2]];

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
    id: 'mkn-smart-featured',
    number: '01',
    title: 'MKN Smart Portal',
    category: 'Client',
    type: 'Portal Operasional & Layanan Cerdas',
    col1Image1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    liveUrl: 'https://mknsmart.my.id/',
    description: 'Portal sistem operasional cerdas MKN untuk manajemen kerja terpadu, pemantauan sistem, dan akses cepat layanan internal.',
    techStack: ['MKN Smart', 'Operasional', 'Live Web', 'Realtime']
  },
  {
    id: 'mkn-pm-ops-featured',
    number: '02',
    title: 'MKN PM Operations Portal',
    category: 'Personal',
    type: 'Portal Preventive Maintenance & Pemeliharaan',
    col1Image1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bac7-331adfce159f.png&w=1280&q=85',
    col1Image2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    liveUrl: 'https://pm.mknops.web.id/',
    description: 'Portal pemeliharaan preventif (Preventive Maintenance Ops) untuk pemantauan jadwal perawatan, ketersediaan perangkat, dan log teknis harian secara langsung.',
    techStack: ['Preventive Maintenance', 'PM Ops', 'Live Web', 'Tracking']
  },
  {
    id: 'mkn-erp-featured',
    number: '03',
    title: 'MKN Enterprise ERP Portal',
    category: 'Client',
    type: 'Portal Resource Planning & Keuangan',
    col1Image1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image: erpppImg,
    liveUrl: 'https://erp-mkn.starbit.id/login',
    description: 'Portal sistem ERP perusahaan untuk integrasi inventaris, keuangan, sumber daya, dan modul proses bisnis terpusat.',
    techStack: ['ERP System', 'Starbit Cloud', 'Keuangan', 'Inventaris'],
    customImage: erpppImg
  },
  {
    id: 'mkn-kpi-featured',
    number: '04',
    title: 'MKN Operation KPI East-West 2026',
    category: 'Client',
    type: 'Portal Laporan KPI SharePoint',
    col1Image1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    liveUrl: 'https://multikontrolnusantara.sharepoint.com/:x:/r/sites/MKNSangatta/_layouts/15/Doc.aspx?sourcedoc=%7B7483572E-AB8F-4594-ACDD-4CEE00CA5442%7D&file=Summary%20Report%20Operation%20KPI%20EAST%20-%20WEST%202026.xlsx&action=default&mobileredirect=true&DefaultItemOpen=1&wdOrigin=SHAREPOINT.SHELL%2CAPPHOME-WEB.JUMPBACKIN&wdPreviousSession=3a763537-f7c9-4efe-9f5d-b3f38baea803&wdPreviousSessionSrc=AppHomeWeb&ct=1785543682830',
    description: 'Dokumen laporan KPI operasional wilayah East & West tahun 2026 secara real-time di portal SharePoint resmi Multi Kontrol Nusantara.',
    techStack: ['SharePoint', 'KPI East-West 2026', 'Executive Report', 'Live Sheet']
  }
];

export const DECORATIVE_IMAGES = {
  moonIcon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  object3D: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  legoIcon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  group3D: logoMkn,
  heroPortrait: 'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png',
  gifOnward: gifOnward,
  videoOnward: videoOnward
};
