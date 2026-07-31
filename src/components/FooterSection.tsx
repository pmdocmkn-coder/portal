import React from 'react';
import { ArrowUp, Sparkles, Globe, Mail, MapPin } from 'lucide-react';
import { MKNLogo } from './ui/MKNLogo';
import { COMPANY_INFO } from '../data/portalData';

interface FooterSectionProps {
  onOpenContact: () => void;
  onNavigate: (sectionId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenContact, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1B3A6B] text-white px-6 md:px-12 py-16 relative z-30 border-t-4 border-[#D94F2B]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top CTA Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/15">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#E86547]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#E86547]">
                MKN Portal Hub Engine
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              Pusat Ekosistem Web Portal Terpadu
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenContact}
              className="bg-[#D94F2B] hover:bg-[#E86547] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all text-xs sm:text-sm cursor-pointer"
            >
              Layanan Akses MKN
            </button>
            <button
              onClick={scrollToTop}
              className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20"
              title="Kembali ke Atas"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Links & Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          {/* Brand Info Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white/10 p-3 rounded-2xl inline-block border border-white/15">
              <MKNLogo size="md" showSubtext={true} className="[&_span]:text-white" />
            </div>
            <p className="text-[#E2E8F0] max-w-sm text-xs leading-relaxed">
              Direktori resmi web portal perusahaan MKN. Platform navigasi terpusat untuk sistem operasional, analitik, dan layanan terintegrasi.
            </p>
            <div className="space-y-1.5 text-xs text-[#E2E8F0] pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E86547]" />
                <span>{COMPANY_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E86547]" />
                <span>contact@mknportal.id</span>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#E86547] font-extrabold">Navigasi Portal</h4>
            <ul className="space-y-2 text-xs text-[#E2E8F0]">
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors cursor-pointer">
                  Direktori Portal Live
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('overview')} className="hover:text-white transition-colors cursor-pointer">
                  Profil Perusahaan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors cursor-pointer">
                  Portal Utama
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/15 text-xs text-[#E2E8F0]">
          <p>© {new Date().getFullYear()} MKN Portal Hub. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-2">
            <span>Powered by MKN Engine</span>
            <span>•</span>
            <Globe className="w-3.5 h-3.5 text-[#E86547]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
