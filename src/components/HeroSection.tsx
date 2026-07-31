import React, { useState } from 'react';
import { Magnet } from './ui/Magnet';
import { FadeIn } from './ui/FadeIn';
import { MKNLogo } from './ui/MKNLogo';
import { LogoIntroModal } from './ui/LogoIntroModal';
import { COMPANY_INFO, DECORATIVE_IMAGES } from '../data/portalData';
import { Shield, Sparkles, Building2, Globe, Layers, ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onNavigate }) => {
  const [isIntroOpen, setIsIntroOpen] = useState(false);

  return (
    <div className="relative bg-[#F7F8FA]">
      {/* 1. STICKY TOP NAVBAR (z-50 ensures menu is always clickable) */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between gap-4">
          {/* Official Animated MKN Logo (Click to play 3D intro modal) */}
          <div className="cursor-pointer" onClick={() => setIsIntroOpen(true)} title="Klik untuk putar 3D Intro Motion Logo">
            <MKNLogo size="md" showSubtext={true} interactive={true} />
          </div>

          {/* Navigation Menu Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#F7F8FA] p-1.5 rounded-full border border-[#E2E8F0] shadow-xs">
            <button
              onClick={() => setIsIntroOpen(true)}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#FF5500] bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-[#FF5500]" />
              Intro 3D Logo
            </button>
            <button
              onClick={() => onNavigate('gallery')}
              className="px-4 py-2 rounded-full text-xs font-bold text-[#1B3A6B] bg-white border border-[#E2E8F0] shadow-xs hover:text-[#D94F2B] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
              Direktori Portal Live
            </button>
            <button
              onClick={() => onNavigate('overview')}
              className="px-4 py-2 rounded-full text-xs font-bold text-[#1A202C] hover:text-[#1B3A6B] hover:bg-white transition-all cursor-pointer"
            >
              Tentang MKN
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="px-4 py-2 rounded-full text-xs font-bold text-[#1A202C] hover:text-[#1B3A6B] hover:bg-white transition-all cursor-pointer"
            >
              Portal Utama
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="bg-[#1B3A6B] hover:bg-[#2B6CB0] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Hubungi Kami</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E86547]" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN HERO SECTION WITH SAFE MARGIN BOUNDARIES */}
      <section className="relative min-h-[85vh] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#F7F8FA] via-white to-[#F7F8FA] select-none pt-8 pb-12 border-b border-[#E2E8F0]">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#2B6CB0_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 my-auto py-6 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Text & Call to Actions */}
            <div className="lg:col-span-7 text-left space-y-6">
              <FadeIn y={20} delay={0.1} duration={0.6}>
                <div className="inline-flex items-center gap-2 bg-[#1B3A6B]/10 text-[#1B3A6B] border border-[#1B3A6B]/20 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                  <Shield className="w-4 h-4 text-[#D94F2B]" />
                  MKN Portal Hub — Web Portal Terpadu
                </div>
              </FadeIn>

              <FadeIn y={30} delay={0.2} duration={0.7}>
                <h1 className="hero-navy-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05]">
                  MKN PORTAL HUB
                </h1>
              </FadeIn>

              <FadeIn y={30} delay={0.3} duration={0.7}>
                <p className="text-base sm:text-lg text-[#718096] max-w-2xl font-normal leading-relaxed">
                  Pusat akses resmi dan direktori web portal MKN. Temukan seluruh tautan platform operasional, sistem manajemen, direktori layanan, dan portal internal perusahaan dalam satu pintu.
                </p>
              </FadeIn>

              {/* Corporate Stats Cards */}
              <FadeIn y={30} delay={0.4} duration={0.7}>
                <div className="grid grid-cols-2 gap-4 pt-2 max-w-md">
                  <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
                    <div className="flex items-center gap-2 text-[#2B6CB0] mb-1">
                      <Building2 className="w-4 h-4" />
                      <span className="text-xs font-bold text-[#718096]">Portal Terintegrasi</span>
                    </div>
                    <span className="text-2xl font-black text-[#1B3A6B]">{COMPANY_INFO.activePortals}</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
                    <div className="flex items-center gap-2 text-[#D94F2B] mb-1">
                      <Globe className="w-4 h-4" />
                      <span className="text-xs font-bold text-[#718096]">Kategori Sistem</span>
                    </div>
                    <span className="text-2xl font-black text-[#1B3A6B]">{COMPANY_INFO.clientCount}</span>
                  </div>
                </div>
              </FadeIn>

              {/* CTA Buttons */}
              <FadeIn y={30} delay={0.5} duration={0.7}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => onNavigate('gallery')}
                    className="bg-[#D94F2B] hover:bg-[#E86547] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    Jelajahi Portal Perusahaan
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Safely Bounded 3D Card */}
            <div className="lg:col-span-5 relative flex justify-center pt-4 lg:pt-0">
              <FadeIn y={40} delay={0.4} duration={0.8} className="w-full">
                <Magnet
                  padding={30}
                  strength={1.5}
                  activeTransition="transform 0.3s ease-out"
                  inactiveTransition="transform 0.6s ease-in-out"
                  className="w-full max-w-[360px] sm:max-w-[400px] mx-auto"
                >
                  <div className="relative mx-auto w-full">
                    {/* Decorative Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1B3A6B] to-[#D94F2B] rounded-3xl blur-xl opacity-15 transform scale-95" />

                    {/* Main Card Graphic */}
                    <div className="relative bg-white/95 backdrop-blur-xl border border-[#E2E8F0] p-5 rounded-3xl shadow-xl">
                      <img
                        src={DECORATIVE_IMAGES.group3D}
                        alt="MKN Interactive Portal 3D Graphic"
                        className="w-full h-auto max-h-[280px] object-contain rounded-2xl drop-shadow-md"
                      />

                      <div className="mt-4 p-3.5 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-extrabold text-[#1B3A6B] uppercase tracking-wider">
                            MKN DIGITAL STUDIO ECOSYSTEM
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#059669] text-white">
                            LIVE STATUS
                          </span>
                        </div>
                        <p className="text-[11px] text-[#718096] leading-relaxed font-medium">
                          Inovasi web portal perusahaan terpusat untuk pengalaman merek digital interaktif masa kini.
                        </p>
                      </div>
                    </div>
                  </div>
                </Magnet>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-[#718096] border-t border-[#E2E8F0]/80 z-10">
          <span className="font-semibold text-[#1B3A6B]">
            © 2026 MKN DIGITAL MOTION PORTAL. ALL RIGHTS RESERVED.
          </span>
          <span className="flex items-center gap-2 mt-2 sm:mt-0 font-medium text-[#D94F2B]">
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
            Interactive Motion Directory Ready
          </span>
        </div>
      </section>

      {/* 3D Intro Video Modal */}
      <LogoIntroModal isOpen={isIntroOpen} onClose={() => setIsIntroOpen(false)} />
    </div>
  );
};

