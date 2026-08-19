import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowRight, Search, Code2, LayoutGrid, ChevronLeft, ChevronRight, Settings, Activity, Database, BarChart2, ShieldCheck, Headset, Cctv } from 'lucide-react';
import { LogoIntroModal } from './ui/LogoIntroModal';
import { FadeIn } from './ui/FadeIn';
import { MarqueeItem } from '../data/portalData';

const getIconForPortal = (index: number, className: string = "") => {
  const icons = [Settings, Activity, Database, BarChart2, ShieldCheck, Headset, Cctv];
  const Icon = icons[index % icons.length];
  return <Icon className={className} />;
};

interface HeroSectionProps {
  onOpenContact: () => void;
  onNavigate: (page: 'overview' | 'gallery' | 'projects') => void;
  onExpandPortals?: () => void;
}

// LIGHT THEME COLORS based on Synergy MKN Logo (Coral, Cyan, Deep Blue)
const CARD_THEMES = [
  { // Coral
    outerRing: 'ring-[#E85D44]/20',
    innerRing: 'bg-[#E85D44]/10 text-[#E85D44]',
    btnBg: 'bg-[#E85D44]/10',
    btnHover: 'group-hover:bg-[#E85D44] group-hover:text-white',
    btnText: 'text-[#E85D44]'
  },
  { // Cyan
    outerRing: 'ring-[#38BDF8]/20',
    innerRing: 'bg-[#38BDF8]/10 text-[#38BDF8]',
    btnBg: 'bg-[#38BDF8]/10',
    btnHover: 'group-hover:bg-[#38BDF8] group-hover:text-white',
    btnText: 'text-[#38BDF8]'
  },
  { // Deep Blue
    outerRing: 'ring-[#1E3A8A]/20',
    innerRing: 'bg-[#1E3A8A]/10 text-[#1E3A8A]',
    btnBg: 'bg-[#1E3A8A]/10',
    btnHover: 'group-hover:bg-[#1E3A8A] group-hover:text-white',
    btnText: 'text-[#1E3A8A]'
  },
  { // Soft Emerald
    outerRing: 'ring-emerald-500/20',
    innerRing: 'bg-emerald-500/10 text-emerald-600',
    btnBg: 'bg-emerald-500/10',
    btnHover: 'group-hover:bg-emerald-500 group-hover:text-white',
    btnText: 'text-emerald-600'
  },
  { // Purple
    outerRing: 'ring-purple-500/20',
    innerRing: 'bg-purple-500/10 text-purple-600',
    btnBg: 'bg-purple-500/10',
    btnHover: 'group-hover:bg-purple-500 group-hover:text-white',
    btnText: 'text-purple-600'
  },
];

const PortalAppItem = ({ portal, theme, themeIdx, idx }: { key?: string | number, portal: MarqueeItem, theme: typeof CARD_THEMES[0], themeIdx: number, idx: number }) => {
  const isCircle = idx % 2 === 0;
  let displayTitle = portal.title.replace(' Portal', '');
  
  return (
    <a
      href={portal.url}
      className="group w-full max-w-[280px] flex flex-col md:flex-row items-center md:items-center justify-start text-center md:text-left gap-2 md:gap-4 p-2.5 md:p-3.5 rounded-[1rem] md:rounded-2xl bg-white/60 backdrop-blur-xl hover:bg-white border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 outline-none"
    >
      <div className={`w-10 h-10 md:w-14 md:h-14 shrink-0 bg-white flex items-center justify-center shadow-sm p-0.5 md:p-1 border border-white group-hover:scale-105 transition-transform duration-300 overflow-hidden ${isCircle ? 'rounded-full' : 'rounded-[10px] md:rounded-[14px]'}`}>
         {portal.customIcon ? (
           <img src={portal.customIcon} alt={displayTitle} className={`w-full h-full object-contain mix-blend-multiply scale-[1.05] ${isCircle ? 'rounded-full' : 'rounded-[8px] md:rounded-[12px]'}`} />
         ) : (
           <div className={`w-full h-full ${theme.innerRing} flex items-center justify-center ${isCircle ? 'rounded-full' : 'rounded-[10px] md:rounded-[14px]'}`}>
             {getIconForPortal(themeIdx, `w-5 h-5 md:w-6 md:h-6`)}
           </div>
         )}
      </div>
      <div className="flex flex-col flex-1 min-w-0 text-left justify-center w-full">
         <h3 className="text-slate-900 font-bold text-[10px] sm:text-[11px] md:text-[14px] leading-[1.2] md:leading-snug line-clamp-2 md:line-clamp-2 mt-0.5 md:mt-0 text-center md:text-left">{displayTitle}</h3>
      </div>
    </a>
  );
};


import { supabase } from '../lib/supabase';

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onNavigate, onExpandPortals }) => {
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bgImageIdx, setBgImageIdx] = useState(0);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [siteSettings, setSiteSettings] = useState({
    portal_name: '',
    hero_title: '',
    hero_subtitle: '',
    hero_image_url: '',
    logo_url: ''
  });
  const [portals, setPortals] = useState<MarqueeItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      const [settingsRes, slidersRes, portalsRes] = await Promise.all([
        supabase.from('site_settings').select('*').eq('id', 1).single(),
        supabase.from('hero_sliders').select('image_url').order('display_order', { ascending: true }),
        supabase.from('portal_items').select('*').order('created_at', { ascending: false })
      ]);

      if (settingsRes.data) {
        setSiteSettings(prev => ({
          ...prev,
          portal_name: settingsRes.data.portal_name || prev.portal_name,
          hero_title: settingsRes.data.hero_title || prev.hero_title,
          hero_subtitle: settingsRes.data.hero_subtitle || prev.hero_subtitle,
          hero_image_url: settingsRes.data.hero_image_url || '',
          logo_url: settingsRes.data.logo_url || ''
        }));
      }

      if (slidersRes.data && slidersRes.data.length > 0) {
        setHeroImages(slidersRes.data.map(item => item.image_url));
      } else {
        setHeroImages([]);
      }

      if (portalsRes.data && portalsRes.data.length > 0) {
        // Map database portal items to MarqueeItem interface if needed
        const mappedPortals = portalsRes.data.map((item: any) => ({
          ...item,
          clientOrType: item.client_or_type,
          customImage: item.custom_image,
          customIcon: item.custom_image // The UI uses customIcon
        }));
        setPortals(mappedPortals as MarqueeItem[]);
      }
    };

    fetchSettings();

    // Setup live refresh subscriptions
    const portalsSubscription = supabase
      .channel('public:portal_items')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'portal_items' }, () => {
        fetchSettings();
      })
      .subscribe();

    const slidersSubscription = supabase
      .channel('public:hero_sliders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hero_sliders' }, () => {
        fetchSettings();
      })
      .subscribe();

    const settingsSubscription = supabase
      .channel('public:site_settings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, () => {
        fetchSettings();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(portalsSubscription);
      supabase.removeChannel(slidersSubscription);
      supabase.removeChannel(settingsSubscription);
    };
  }, []);

  useEffect(() => {
    if (heroImages.length === 0) return;
    const timer = setInterval(() => {
      setBgImageIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages]);



  const filteredPortals = useMemo(() => {
    if (!searchQuery) return portals;
    const lowerQuery = searchQuery.toLowerCase();
    return portals.filter(p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      (p.description && p.description.toLowerCase().includes(lowerQuery))
    );
  }, [searchQuery, portals]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative bg-[#F8FAFC] min-h-screen text-slate-900 font-sans selection:bg-[#3B82F6] selection:text-white flex flex-col overflow-hidden">
      
      {/* Background Image Slider */}
      {heroImages.map((img, idx) => (
        <div 
          key={img + idx}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${idx === bgImageIdx ? 'opacity-100' : 'opacity-0'} pointer-events-none`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      

      {/* Seamless transition into the Dark Stats Section */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2B3F56] via-transparent to-transparent pointer-events-none" />

      {/* Top Scrim (Dark) to ensure white text is always readable */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none" />

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200/60' : 'bg-transparent border-transparent'}`}>
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Container */}
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => setIsIntroOpen(true)}
          >
            {siteSettings.logo_url ? (
              <div className="w-auto h-12 sm:h-14 flex items-center justify-center group-hover:scale-105 transition-transform">
                <img 
                  src={siteSettings.logo_url} 
                  alt="Logo" 
                  className="max-h-full w-auto object-contain transition-all duration-300"
                  style={!isScrolled ? { filter: 'brightness(0) invert(1)', opacity: 0.95 } : {}}
                />
              </div>
            ) : (
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-lg shadow-sm flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform overflow-hidden">
                <img src="/src/assets/images/logo_mkn.png" alt="MKN Logo" className="w-full h-full object-contain" />
              </div>
            )}
            <span className={`font-extrabold tracking-tight hidden sm:block text-xl transition-all duration-300 ${!isScrolled ? 'drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]' : ''}`}>
              <span className={`${!isScrolled ? 'text-white' : 'text-[#233B8E]'} transition-colors duration-300`}>MKN</span> 
              <span className={`${!isScrolled ? 'text-white' : 'text-[#E05A44]'} transition-colors duration-300`}> SITE</span>
            </span>
          </div>

          {/* Navigation Container */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className={`relative text-[13px] font-bold uppercase tracking-wider transition-all duration-300 py-2 group ${isScrolled ? 'text-slate-600 hover:text-[#233B8E]' : 'text-white/90 hover:text-white'}`}
            >
              Beranda
              <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full group-hover:w-full transition-all duration-300 ease-out ${isScrolled ? 'bg-[#233B8E]' : 'bg-white'}`} />
            </button>
            <button 
              onClick={onExpandPortals} 
              className={`relative text-[13px] font-bold uppercase tracking-wider transition-all duration-300 py-2 group ${isScrolled ? 'text-[#E05A44] hover:text-[#c44935]' : 'text-white/90 hover:text-white'}`}
            >
              Eksplorasi Portal
              <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full group-hover:w-full transition-all duration-300 ease-out ${isScrolled ? 'bg-[#E05A44]' : 'bg-white'}`} />
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-[1600px] mx-auto px-4 sm:px-6 pt-32 pb-24">
        <div className="w-full flex flex-col items-center justify-center min-h-[50vh] mt-[-40px]">
          
          {/* Main Content (No Card) */}
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 px-4">
            <FadeIn y={30} duration={0.8} className="w-full mb-8">
              <span className="inline-block rounded-full bg-white/90 shadow-sm px-5 py-2 text-[11px] uppercase tracking-[0.2em] font-bold text-[#E05A44] mb-6">
                Eksplorasi Layanan
              </span>
              
              <h1 className="text-5xl md:text-7xl lg:text-7xl font-black tracking-tight mb-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 leading-[1.2]">
                <span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#E05A44] via-[#2BA5D4] to-[#233B8E] pb-2"
                  style={{ 
                    filter: 'drop-shadow(1px 1px 0px rgba(255,255,255,0.9)) drop-shadow(-1px -1px 0px rgba(255,255,255,0.9)) drop-shadow(1px -1px 0px rgba(255,255,255,0.9)) drop-shadow(-1px 1px 0px rgba(255,255,255,0.9)) drop-shadow(0px 4px 15px rgba(0,0,0,0.4))'
                  }}
                >
                  {siteSettings.hero_title}
                </span>
              </h1>
              
              <p 
                className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed font-semibold"
                style={{ filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.9)) drop-shadow(0px 0px 2px rgba(0,0,0,0.5))' }}
              >
                {siteSettings.hero_subtitle}
              </p>
            </FadeIn>

            {/* Search Bar */}
            <FadeIn y={30} delay={0.2} duration={0.8} className="w-full max-w-2xl px-4 mt-2 mb-12">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#2BA5D4] transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari aplikasi atau layanan..."
                  className="w-full bg-white/95 backdrop-blur-sm border border-white/50 rounded-full py-4 pl-16 pr-6 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#2BA5D4]/20 focus:border-[#2BA5D4] transition-all shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] text-base font-medium"
                />
              </div>
            </FadeIn>
          </div>

          {/* Carousel Section */}
          <FadeIn y={40} delay={0.3} duration={1} className="w-full relative">
            {filteredPortals.length > 0 ? (
              <div className="w-full relative flex justify-center px-4">
                {/* Centered Grid Container */}
                <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-5 mx-auto w-full max-w-6xl justify-items-center place-content-center">
                  {filteredPortals.slice(0, 8).map((portal, idx) => {
                    const themeIdx = portals.findIndex(p => p.id === portal.id) % CARD_THEMES.length;
                    const theme = CARD_THEMES[themeIdx >= 0 ? themeIdx : 0];
                    return (
                      <PortalAppItem key={`${portal.id}-${idx}`} portal={portal} theme={theme} themeIdx={themeIdx} idx={idx} />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="py-24 text-center bg-white rounded-3xl border border-slate-200 shadow-sm w-full max-w-2xl mx-auto px-6">
                <p className="text-slate-500 text-lg font-medium">Tidak ada aplikasi yang sesuai dengan "{searchQuery}"</p>
              </div>
            )}
          </FadeIn>

          {/* Lihat Semua Portal Button */}
          <FadeIn y={20} delay={0.5} duration={1}>
            <button 
              onClick={onExpandPortals}
              className="mt-4 px-8 py-3 rounded-full border-2 border-[#E85D44] bg-white/90 hover:bg-[#E85D44] text-[#E85D44] hover:text-white font-bold text-[13px] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 group mx-auto cursor-pointer backdrop-blur-sm"
            >
              Lihat Semua Portal 
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 stroke-[3]" />
            </button>
          </FadeIn>

        </div>
      </main>

      <LogoIntroModal isOpen={isIntroOpen} onClose={() => setIsIntroOpen(false)} />
      
      {/* Hide Webkit Scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};