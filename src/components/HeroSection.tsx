import React, { useState, useMemo } from 'react';
import { FadeIn } from './ui/FadeIn';
import { MKNLogo } from './ui/MKNLogo';
import { LogoIntroModal } from './ui/LogoIntroModal';
import { COMPANY_INFO, MARQUEE_PORTALS, DECORATIVE_IMAGES } from '../data/portalData';
import { ArrowRight, Play, Search, LayoutGrid, Settings, Activity, Database, BarChart2, ShieldCheck, Headset, Cctv } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
  onNavigate: (sectionId: string) => void;
}

const CARD_THEMES = [
  { from: 'from-[#0B1120]/10', to: 'to-[#0B1120]', border: 'border-blue-500/40', glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]', button: 'bg-[#1e3a8a] hover:bg-blue-600', icon: 'text-blue-400', iconBorder: 'border-blue-400/50', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' },
  { from: 'from-[#0B1120]/10', to: 'to-[#0B1120]', border: 'border-emerald-500/40', glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]', button: 'bg-[#064e3b] hover:bg-emerald-600', icon: 'text-emerald-400', iconBorder: 'border-emerald-400/50', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600' },
  { from: 'from-[#0B1120]/10', to: 'to-[#0B1120]', border: 'border-amber-500/40', glow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]', button: 'bg-[#78350f] hover:bg-amber-600', icon: 'text-amber-400', iconBorder: 'border-amber-400/50', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600' },
  { from: 'from-[#0B1120]/10', to: 'to-[#0B1120]', border: 'border-purple-500/40', glow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]', button: 'bg-[#4c1d95] hover:bg-purple-600', icon: 'text-purple-400', iconBorder: 'border-purple-400/50', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600' },
  { from: 'from-[#0B1120]/10', to: 'to-[#0B1120]', border: 'border-teal-500/40', glow: 'hover:shadow-[0_0_30px_rgba(20,184,166,0.25)]', button: 'bg-[#134e4a] hover:bg-teal-600', icon: 'text-teal-400', iconBorder: 'border-teal-400/50', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600' },
  { from: 'from-[#0B1120]/10', to: 'to-[#0B1120]', border: 'border-slate-500/40', glow: 'hover:shadow-[0_0_30px_rgba(100,116,139,0.25)]', button: 'bg-[#1e293b] hover:bg-slate-600', icon: 'text-slate-400', iconBorder: 'border-slate-400/50', img: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600' },
  { from: 'from-[#0B1120]/10', to: 'to-[#0B1120]', border: 'border-cyan-500/40', glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]', button: 'bg-[#164e63] hover:bg-cyan-600', icon: 'text-cyan-400', iconBorder: 'border-cyan-400/50', img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600' },
];

const getIconForPortal = (index: number, className: string) => {
  const icons = [Settings, Activity, Database, BarChart2, ShieldCheck, Headset, Cctv];
  const Icon = icons[index % icons.length];
  return <Icon className={className} strokeWidth={1.5} />;
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onNavigate }) => {
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPortals = useMemo(() => {
    if (!searchQuery) return MARQUEE_PORTALS;
    const lowerQuery = searchQuery.toLowerCase();
    return MARQUEE_PORTALS.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

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
                className="w-full bg-[#1E293B]/60 backdrop-blur-md border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-[#3B82F6]/50 transition-all shadow-inner"
              />
            </div>
          </FadeIn>

          {/* Overlapping Cards Swiper */}
          <div className="w-full relative mb-12">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-8 hide-scrollbar items-stretch px-4 md:px-8">
              {filteredPortals.map((portal, idx) => {
                // Determine theme index (use original index for consistent color if filtered, but we'll use mapped idx for simplicity)
                const themeIdx = MARQUEE_PORTALS.findIndex(p => p.id === portal.id) % CARD_THEMES.length;
                const theme = CARD_THEMES[themeIdx >= 0 ? themeIdx : 0];

                return (
                  <FadeIn 
                    key={portal.id} 
                    y={30} 
                    delay={0.05 * idx} 
                    duration={0.5} 
                    className="flex-shrink-0 snap-center w-[260px] sm:w-[280px] h-[360px]"
                  >
                    <a 
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative flex flex-col justify-between w-full h-full rounded-2xl overflow-hidden border ${theme.border} ${theme.glow} transition-all duration-300 cursor-pointer`}
                    >
                      {/* Card Background Image & Gradients */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" 
                        style={{ backgroundImage: `url(${portal.previewImage || portal.customImage || 'https://image.thum.io/get/width/1280/crop/800/noanimate/' + portal.url})` }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-b ${theme.from} ${theme.to} pointer-events-none`} />
                      
                      {/* Card Content */}
                      <div className="relative z-10 flex flex-col items-center p-6 h-full text-center">
                        {/* Icon Circle */}
                        <div className={`w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6 bg-[#0B1120]/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                          {getIconForPortal(themeIdx, theme.icon)}
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                          {portal.title}
                        </h3>
                        
                        <p className="text-xs text-white/60 font-medium line-clamp-3 mb-6">
                          {portal.description}
                        </p>

                        <div className="mt-auto w-full">
                           <div className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-bold text-white ${theme.button} transition-colors border border-white/10`}>
                             Akses Sekarang
                             <ArrowRight className="w-3.5 h-3.5" />
                           </div>
                        </div>
                      </div>
                    </a>
                  </FadeIn>
                );
              })}
            </div>
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


