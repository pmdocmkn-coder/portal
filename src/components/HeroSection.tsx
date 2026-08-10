import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FadeIn } from './ui/FadeIn';
import { MKNLogo } from './ui/MKNLogo';
import { LogoIntroModal } from './ui/LogoIntroModal';
import { COMPANY_INFO, MARQUEE_PORTALS, DECORATIVE_IMAGES } from '../data/portalData';
import { ArrowRight, Play, Search, LayoutGrid, Settings, Activity, Database, BarChart2, ShieldCheck, Headset, Cctv, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
  onNavigate: (sectionId: string) => void;
}

const CARD_THEMES = [
  { from: 'from-[#0B1120]/10', to: 'to-[#0B1120]', border: 'border-blue-500/40', ringHover: 'hover:ring-[#3B82F6]/80', glow: 'hover:shadow-[0_0_35px_rgba(59,130,246,0.35),0_0_70px_rgba(59,130,246,0.45)]', button: 'bg-[#1e3a8a] hover:bg-blue-600', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' },
  { from: 'from-[#0B1120]/10', to: 'to-[#0B1120]', border: 'border-emerald-500/40', ringHover: 'hover:ring-[#10B981]/80', glow: 'hover:shadow-[0_0_35px_rgba(16,185,129,0.35),0_0_70px_rgba(16,185,129,0.45)]', button: 'bg-[#064e3b] hover:bg-emerald-600', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600' },
  { from: 'from-[#0B1120]/10', to: 'to-[#0B1120]', border: 'border-amber-500/40', ringHover: 'hover:ring-[#F59E0B]/80', glow: 'hover:shadow-[0_0_35px_rgba(245,158,11,0.35),0_0_70px_rgba(245,158,11,0.45)]', button: 'bg-[#78350f] hover:bg-amber-600', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600' },
  { from: 'from-[#0B1120]/10', to: 'to-[#0B1120]', border: 'border-purple-500/40', ringHover: 'hover:ring-[#8B5CF6]/80', glow: 'hover:shadow-[0_0_35px_rgba(139,92,246,0.35),0_0_70px_rgba(139,92,246,0.45)]', button: 'bg-[#4c1d95] hover:bg-purple-600', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600' },
  { from: 'from-[#0B1120]/10', to: 'to-[#0B1120]', border: 'border-teal-500/40', ringHover: 'hover:ring-[#14B8A6]/80', glow: 'hover:shadow-[0_0_35px_rgba(20,184,166,0.35),0_0_70px_rgba(20,184,166,0.45)]', button: 'bg-[#134e4a] hover:bg-teal-600', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600' },
  { from: 'from-[#0B1120]/10', to: 'to-[#0B1120]', border: 'border-slate-500/40', ringHover: 'hover:ring-[#94A3B8]/80', glow: 'hover:shadow-[0_0_35px_rgba(148,163,184,0.35),0_0_70px_rgba(148,163,184,0.45)]', button: 'bg-[#1e293b] hover:bg-slate-600', img: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600' },
  { from: 'from-[#0B1120]/10', to: 'to-[#0B1120]', border: 'border-cyan-500/40', ringHover: 'hover:ring-[#06B6D4]/80', glow: 'hover:shadow-[0_0_35px_rgba(6,182,212,0.35),0_0_70px_rgba(6,182,212,0.45)]', button: 'bg-[#164e63] hover:bg-cyan-600', img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600' },
];

const getIconForPortal = (index: number, className: string) => {
  const icons = [Settings, Activity, Database, BarChart2, ShieldCheck, Headset, Cctv];
  const Icon = icons[index % icons.length];
  return <Icon className={className} strokeWidth={1.5} />;
};

interface PortalAppItemProps {
  portal: (typeof MARQUEE_PORTALS)[number];
  theme: (typeof CARD_THEMES)[number];
  themeIdx: number;
}

const PortalAppItem: React.FC<PortalAppItemProps> = ({ portal, theme, themeIdx }) => {
  const labelRef = useRef<HTMLHeadingElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = labelRef.current;
    if (!el) return;
    const check = () => setIsOverflowing(el.scrollHeight > el.clientHeight + 1);
    check();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(check).catch(() => { });
    }
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [portal.title]);

  return (
    <div className="group flex-shrink-0 snap-center flex flex-col items-center gap-3 relative z-20 pointer-events-auto">
      <div className="relative z-20">
        {/* Tooltip: full title when the 2-line label is truncated */}
        {isOverflowing && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-[60] w-max max-w-[240px] px-3 py-1.5 rounded-lg bg-[#1E293B]/95 border border-white/10 text-white/95 text-xs font-semibold text-center leading-snug shadow-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
            {portal.title}
          </div>
        )}

        <a
          href={portal.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-[3px] ${theme.border} ${theme.glow} shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-3 hover:scale-110 hover:z-30 cursor-pointer ring-4 ring-[#0B1120] ${theme.ringHover} transform-gpu group-hover:animate-spring-bounce z-20`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay group-hover:scale-125 group-hover:opacity-80 transition-all duration-700 transform-gpu"
            style={{ backgroundImage: `url(${portal.previewImage || portal.customImage || 'https://image.thum.io/get/width/1280/crop/800/noanimate/' + portal.url})` }}
          />
          {/* Gradients */}
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.from} ${theme.to} pointer-events-none transition-opacity duration-500 group-hover:opacity-90`} />

          {/* Icon - uniform white line-art style */}
          <div className="relative z-10 flex items-center justify-center group-hover:scale-125 group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.5)] transition-all duration-500">
            {getIconForPortal(themeIdx, 'text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 drop-shadow-lg transition-all duration-300')}
          </div>
        </a>
      </div>

      {/* Portal Name — max 2 lines, proper word-wrap, width matches icon */}
      <h3
        ref={labelRef}
        className="w-24 sm:w-28 md:w-32 text-xs sm:text-sm md:text-base font-bold text-white/80 text-center leading-snug group-hover:text-white group-hover:scale-105 transition-all duration-300 px-1 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden break-words"
      >
        {portal.title}
      </h3>
    </div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onNavigate }) => {
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const getCarouselItems = (el: HTMLDivElement) =>
    Array.from(el.querySelectorAll<HTMLElement>('[data-carousel-item]'));

  const alignItemToStart = (el: HTMLDivElement, item: HTMLElement, behavior: ScrollBehavior = 'smooth') => {
    const leftPadding = Number.parseFloat(getComputedStyle(el).paddingLeft);
    el.scrollTo({
      left: item.offsetLeft - leftPadding,
      behavior,
    });
  };

  const getClosestItemIndex = (el: HTMLDivElement, items: HTMLElement[]) => {
    const viewportStart = el.scrollLeft + Number.parseFloat(getComputedStyle(el).paddingLeft);
    return items.reduce((closestIndex, item, index) => {
      const closestDistance = Math.abs(items[closestIndex].offsetLeft - viewportStart);
      const distance = Math.abs(item.offsetLeft - viewportStart);
      return distance < closestDistance ? index : closestIndex;
    }, 0);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el || filteredPortals.length === 0) return;

    const items = getCarouselItems(el);
    let currentItemIndex = getClosestItemIndex(el, items);
    const cycleLength = filteredPortals.length;

    // Reposition to an equivalent copy before either edge, then animate one card only.
    if (direction === 'left' && currentItemIndex === 0) {
      currentItemIndex = cycleLength;
      alignItemToStart(el, items[currentItemIndex], 'auto');
    }
    if (direction === 'right' && currentItemIndex === items.length - 1) {
      currentItemIndex = items.length - cycleLength - 1;
      alignItemToStart(el, items[currentItemIndex], 'auto');
    }

    const targetItemIndex = currentItemIndex + (direction === 'left' ? -1 : 1);
    alignItemToStart(el, items[targetItemIndex]);
  };

  const goToSlide = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>(`[data-carousel-item="${filteredPortals.length + index}"]`);
    if (!item) return;
    alignItemToStart(el, item);
  };

  const filteredPortals = useMemo(() => {
    if (!searchQuery) return MARQUEE_PORTALS;
    const lowerQuery = searchQuery.toLowerCase();
    return MARQUEE_PORTALS.filter(p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  // Initialize carousel to middle section for infinite loop
  useEffect(() => {
    const el = carouselRef.current;
    if (!el || filteredPortals.length === 0) return;

    // Use the actual rendered item position so the loop remains accurate at every breakpoint.
    const initialPosition = () => {
      const middleCopy = el.querySelector<HTMLElement>(`[data-carousel-item="${filteredPortals.length}"]`);
      if (middleCopy) alignItemToStart(el, middleCopy, 'auto');
    };
    const frame = requestAnimationFrame(initialPosition);

    // Hide swipe hint after 5 seconds
    const timer = setTimeout(() => setShowSwipeHint(false), 5000);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [filteredPortals.length]);

  // Track scroll position for indicator dots
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const handleScroll = () => {
      const items = getCarouselItems(el);
      if (!items.length) return;
      const itemIndex = getClosestItemIndex(el, items);
      setCurrentIndex(itemIndex % filteredPortals.length);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [filteredPortals.length]);

  return (
    <div className="relative bg-[#0B1120] min-h-screen text-white font-sans selection:bg-[#3B82F6] selection:text-white">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0B1120]/80 via-[#0B1120]/60 to-[#0B1120] pointer-events-none" />

      {/* STICKY TOP NAVBAR (Dark Theme) */}
      <header className="sticky top-0 z-50 w-full bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/10 shadow-lg transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between gap-4">
          <div className="cursor-pointer flex items-center gap-2" onClick={() => setIsIntroOpen(true)} title="Klik untuk putar 3D Intro Motion Logo">
            {/* Using standard text for logo to match minimal dark theme */}
            <div className="font-black text-xl tracking-tight text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center">
                <span className="text-white text-xs font-bold">MKN</span>
              </div>
              <span>PORTAL HUB</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1.5 bg-white/5 p-1.5 rounded-full border border-white/10 shadow-inner">
            <button
              onClick={() => onNavigate('gallery')}
              className="px-4 py-2 rounded-full text-xs font-bold text-white bg-white/10 border border-white/5 shadow-xs hover:bg-white/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Direktori Portal Live
            </button>
            <button
              onClick={() => onNavigate('overview')}
              className="px-4 py-2 rounded-full text-xs font-bold text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              Tentang MKN
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="px-4 py-2 rounded-full text-xs font-bold text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              Portal Utama
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Hubungi Kami</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN HERO CONTENT */}
      <section className="relative z-10 flex flex-col items-center justify-start pt-16 pb-24 text-center min-h-[calc(100vh-76px)]">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center">

          <FadeIn y={20} delay={0.1} duration={0.6}>
            <p className="text-white/80 text-sm md:text-base font-medium tracking-wide mb-2">
              Selamat Datang di
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-4 flex items-center justify-center gap-3">
              <span className="text-[#3B82F6] drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]">MKN</span>
              <span className="text-white">PORTAL</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto mb-10 font-medium">
              Satu portal untuk semua sistem. Pilih layanan yang ingin Anda akses.
            </p>
          </FadeIn>

          {/* Search Bar */}
          <FadeIn y={20} delay={0.2} duration={0.6} className="w-full max-w-2xl mb-16">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/40 group-focus-within:text-[#3B82F6] transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari aplikasi atau layanan..."
                className="w-full bg-white/10 backdrop-blur-lg border-2 border-[#3B82F6]/30 rounded-full py-4 pl-12 pr-6 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/60 focus:border-[#3B82F6] focus:bg-white/15 transition-all shadow-lg shadow-black/20"
              />
            </div>
          </FadeIn>

          {/* Portal Directory: enhanced layout with proper spacing */}
          <div className="relative w-full mx-auto mb-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            
            {/* Swipe Hint - positioned higher and more spaced */}
            {showSwipeHint && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full border border-white/20 text-white/80 text-sm font-medium animate-pulse shadow-lg">
                <span>← Geser atau gunakan panah →</span>
              </div>
            )}

            {/* Left Navigation Arrow - positioned outside with more distance */}
            <button
              onClick={() => scrollCarousel('left')}
              aria-label="Geser daftar aplikasi ke kiri"
              title="Geser ke kiri"
              className="absolute -left-2 sm:-left-4 md:-left-6 lg:-left-8 xl:-left-12 2xl:-left-16 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0B1120]/95 backdrop-blur-md border-2 border-[#3B82F6]/50 text-white flex items-center justify-center transition-all duration-300 hover:bg-[#3B82F6] hover:border-[#3B82F6] hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer shadow-xl shadow-black/30"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            </button>

            {/* Carousel Container with NO overflow restriction */}
            <div className="relative w-full mx-auto">
              <div
                ref={carouselRef}
                tabIndex={0}
                aria-label="Daftar aplikasi. Gunakan tombol kiri dan kanan untuk berpindah."
                onKeyDown={(event) => {
                  if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    scrollCarousel('left');
                  }
                  if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    scrollCarousel('right');
                  }
                }}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 sm:gap-8 md:gap-10 lg:gap-12 py-20 px-16 sm:px-20 md:px-24 lg:px-32 xl:px-40 2xl:px-48 hide-scrollbar items-center carousel-smooth carousel-track-enhanced focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3B82F6]"
                style={{ overflow: 'visible' }}
              >
                {/* Infinite loop: duplicate items at both ends */}
                {[...filteredPortals, ...filteredPortals, ...filteredPortals].map((portal, idx) => {
                  const originalIdx = idx % filteredPortals.length;
                  const themeIdx = MARQUEE_PORTALS.findIndex(p => p.id === portal.id) % CARD_THEMES.length;
                  const theme = CARD_THEMES[themeIdx >= 0 ? themeIdx : 0];

                  return (
                    <div key={`${portal.id}-${idx}`} data-carousel-item={idx} className="portal-item-enhanced carousel-snap-enhanced">
                      <PortalAppItem portal={portal} theme={theme} themeIdx={themeIdx} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Navigation Arrow - positioned outside with more distance */}
            <button
              onClick={() => scrollCarousel('right')}
              aria-label="Geser daftar aplikasi ke kanan"
              title="Geser ke kanan"
              className="absolute -right-2 sm:-right-4 md:-right-6 lg:-right-8 xl:-right-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0B1120]/95 backdrop-blur-md border-2 border-[#3B82F6]/50 text-white flex items-center justify-center transition-all duration-300 hover:bg-[#3B82F6] hover:border-[#3B82F6] hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer shadow-xl shadow-black/30"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </button>

            {/* Enhanced Indicator Dots dengan spacing yang lebih baik */}
            {filteredPortals.length > 1 && (
              <div className="flex justify-center gap-3 mt-8">
                {filteredPortals.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`rounded-full transition-all duration-500 cursor-pointer hover:scale-125 ${idx === currentIndex
                        ? 'bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] w-10 h-3 shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse'
                        : 'bg-white/20 hover:bg-white/40 w-3 h-3'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bottom Button */}
          <FadeIn y={20} delay={0.6} duration={0.6}>
            <button
              onClick={() => onNavigate('gallery')}
              className="bg-[#1E293B]/80 hover:bg-[#1E293B] border border-white/10 backdrop-blur-md text-white/90 text-sm font-semibold px-6 py-3 rounded-full transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Lihat Semua Aplikasi</span>
            </button>
          </FadeIn>

        </div>
      </section>

      <LogoIntroModal isOpen={isIntroOpen} onClose={() => setIsIntroOpen(false)} />
    </div>
  );
};