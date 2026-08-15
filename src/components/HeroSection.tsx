import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowRight, Search, Code2, LayoutGrid, ChevronLeft, ChevronRight, Settings, Activity, Database, BarChart2, ShieldCheck, Headset, Cctv } from 'lucide-react';
import { LogoIntroModal } from './ui/LogoIntroModal';
import { FadeIn } from './ui/FadeIn';
import { MARQUEE_PORTALS, MarqueeItem } from '../data/portalData';

const getIconForPortal = (index: number, className: string = "") => {
  const icons = [Settings, Activity, Database, BarChart2, ShieldCheck, Headset, Cctv];
  const Icon = icons[index % icons.length];
  return <Icon className={className} />;
};

interface HeroSectionProps {
  onOpenContact: () => void;
  onNavigate: (page: 'overview' | 'gallery' | 'projects') => void;
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

const PortalAppItem = ({ portal, theme, themeIdx }: { key?: string | number, portal: MarqueeItem, theme: typeof CARD_THEMES[0], themeIdx: number }) => {
  return (
    <a
      href={portal.url}
      className="group flex-none w-[280px] md:w-[320px] h-[280px] snap-center outline-none"
    >
      {/* DOUBLE-BEZEL OUTER SHELL */}
      <div className="w-full h-full rounded-[2rem] bg-slate-900/5 p-2 ring-1 ring-slate-900/5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:ring-slate-900/10 group-active:scale-[0.98] cursor-pointer">
        {/* DOUBLE-BEZEL INNER CORE */}
        <div className="relative w-full h-full rounded-[calc(2rem-0.5rem)] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col items-center p-8 text-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
          
          {/* Logo or Icon */}
          <div className="mb-6 h-20 w-full shrink-0 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
            {portal.customIcon ? (
              <img src={portal.customIcon} alt={`${portal.title} Icon`} className="h-full w-auto object-contain max-w-[200px] drop-shadow-sm" />
            ) : (
              <div className={`w-16 h-16 shrink-0 rounded-3xl ring-1 ${theme.outerRing} ${theme.innerRing} flex items-center justify-center bg-white shadow-sm`}>
                {getIconForPortal(themeIdx, `w-8 h-8`)}
              </div>
            )}
          </div>
          
          {/* Title */}
          <div className="h-14 w-full shrink-0 flex items-start justify-center mb-2">
            <h3 className="text-slate-900 font-bold text-xl leading-tight line-clamp-2">
              {portal.title}
            </h3>
          </div>

          {/* Spacer to push button to bottom */}
          <div className="mt-auto w-full">
            {/* BUTTON-IN-BUTTON CTA */}
            <div className={`w-full py-2 pl-6 pr-2 rounded-full ${theme.btnBg} ${theme.btnText} ${theme.btnHover} text-sm font-semibold flex items-center justify-between transition-colors duration-500`}>
              <span>Akses Sekarang</span>
              <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-white group-hover:text-black group-hover:translate-x-1 shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </a>
  );
};

import img1 from '../assets/images/Hero/1.jpeg';
import img2 from '../assets/images/Hero/2.jpeg';
import img3 from '../assets/images/Hero/3.jpeg';
import img4 from '../assets/images/Hero/4.jpeg';
import img5 from '../assets/images/Hero/5.jpeg';
import img6 from '../assets/images/Hero/6.jpeg';
import img7 from '../assets/images/Hero/7.jpeg';
import img8 from '../assets/images/Hero/8.jpeg';
import img9 from '../assets/images/Hero/9.jpeg';
import img10 from '../assets/images/Hero/10.jpeg';

const HERO_IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onNavigate }) => {
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bgImageIdx, setBgImageIdx] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgImageIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredPortals = useMemo(() => {
    if (!searchQuery) return MARQUEE_PORTALS;
    const lowerQuery = searchQuery.toLowerCase();
    return MARQUEE_PORTALS.filter(p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

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
    <div className="relative bg-[#F8FAFC] min-h-screen text-slate-900 font-sans selection:bg-[#3B82F6] selection:text-white flex flex-col overflow-hidden">
      
      {/* Background Image Slider */}
      {HERO_IMAGES.map((img, idx) => (
        <div 
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${idx === bgImageIdx ? 'opacity-100' : 'opacity-0'} pointer-events-none`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      
      {/* Bright Theme Wash Overlay */}
      <div className="absolute inset-0 bg-white/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-transparent to-transparent pointer-events-none" />

      {/* Background Ambient Lights */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#E85D44]/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-[#38BDF8]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] rounded-full bg-[#1E3A8A]/5 blur-[120px] pointer-events-none" />

      {/* HEADER */}
      <header className="relative z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
          <div className="cursor-pointer flex items-center gap-3" onClick={() => setIsIntroOpen(true)} title="Klik untuk putar 3D Intro Motion Logo">
            <img src="/src/assets/images/logo_mkn.png" alt="MKN Logo" className="h-8 object-contain" />
            <span className="font-bold text-lg tracking-tight text-slate-900">PORTAL</span>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => onNavigate('gallery')} className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">Direktori Portal</button>
            <button onClick={() => onNavigate('overview')} className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">Tentang MKN</button>
            <button onClick={() => onNavigate('projects')} className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">Portal Utama</button>
          </nav>

          <button onClick={onOpenContact} className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-md hover:shadow-lg">
            Hubungi Kami
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center pt-8 pb-12 text-center w-full">
        <div className="w-full flex flex-col items-center">
          
          {/* Typography */}
          <FadeIn y={30} delay={0.1} duration={0.8}>
            <div className="px-4">
              <span className="inline-block rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-slate-200/50 px-5 py-2 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-700 mb-4">
                Eksplorasi Layanan
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] leading-[1.2]">
                <span className="text-slate-900 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">Sinergi</span>
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] via-[#3B82F6] to-[#E85D44] pb-4 pt-1 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">Terintegrasi</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-8 leading-relaxed font-semibold drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                Satu portal cerdas untuk seluruh sistem operasional dan manajemen Anda.
              </p>
            </div>
          </FadeIn>

          {/* Search Bar */}
          <FadeIn y={30} delay={0.2} duration={0.8} className="w-full max-w-2xl px-4 mb-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#3B82F6] transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari aplikasi atau layanan..."
                className="w-full bg-white border border-slate-200 rounded-full py-4 pl-16 pr-6 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-base font-medium"
              />
            </div>
          </FadeIn>

          {/* Carousel Section */}
          <FadeIn y={40} delay={0.3} duration={1} className="w-full relative">
            {filteredPortals.length > 0 ? (
              <div className="w-full relative group/carousel">
                {/* Carousel Container */}
                <div 
                  ref={scrollContainerRef}
                  className="flex flex-row overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar px-6 md:px-24 py-8 gap-6 items-stretch w-full"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {filteredPortals.map((portal, idx) => {
                    const themeIdx = MARQUEE_PORTALS.findIndex(p => p.id === portal.id) % CARD_THEMES.length;
                    const theme = CARD_THEMES[themeIdx >= 0 ? themeIdx : 0];
                    return (
                      <PortalAppItem key={`${portal.id}-${idx}`} portal={portal} theme={theme} themeIdx={themeIdx} />
                    );
                  })}
                </div>

                {/* Left/Right Navigation Arrows */}
                <button 
                  onClick={scrollLeft}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center text-slate-600 hover:text-slate-900 hover:scale-105 transition-all duration-500 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 focus:opacity-100 pointer-events-auto z-20"
                >
                  <ChevronLeft className="w-6 h-6 ml-[-2px]" />
                </button>
                <button 
                  onClick={scrollRight}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center text-slate-600 hover:text-slate-900 hover:scale-105 transition-all duration-500 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 focus:opacity-100 pointer-events-auto z-20"
                >
                  <ChevronRight className="w-6 h-6 mr-[-2px]" />
                </button>
                
                {/* Gradient Masks removed to preserve background visibility */}
              </div>
            ) : (
              <div className="py-24 text-center bg-white rounded-3xl border border-slate-200 shadow-sm w-full max-w-2xl mx-auto px-6">
                <p className="text-slate-500 text-lg font-medium">Tidak ada aplikasi yang sesuai dengan "{searchQuery}"</p>
              </div>
            )}
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