import React from 'react';
import { ChevronUp, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { MKNLogo } from './ui/MKNLogo';

interface FooterSectionProps {
  onOpenContact?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#1B3A6B] text-white relative z-10 border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          
          {/* Left: Logo and Address */}
          <div className="flex flex-row items-center gap-5">
            <div className="h-10 lg:h-12 w-auto flex-shrink-0" style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}>
                <MKNLogo size="sm" showSubtext={false} />
            </div>
            
            <div className="self-stretch w-[1px] bg-white/20 hidden sm:block"></div>
            
            <div className="text-white/60 text-xs leading-relaxed max-w-xl py-1">
              <p className="font-semibold text-white/90 mb-0.5 text-sm">PT Multi Kontrol Nusantara</p>
              <p>KPC Communication Building, Tango Delta D8, Sangatta</p>
              <div className="flex flex-wrap items-center gap-x-3 mt-0.5">
                 <span>Telp. 0549-2026162</span>
                 <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:block"></span>
                 <span>E-mail : contact@mkncorp.com</span>
                 <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:block"></span>
                 <span>Website : www.mkncorp.com</span>
              </div>
            </div>
          </div>

          {/* Right: Socials & Scroll Top */}
          <div className="flex flex-col items-start md:items-end gap-4 mt-4 md:mt-0">
            
            <div className="flex items-center gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1B3A6B] transition-all" title="Facebook">
                  <Facebook className="w-3.5 h-3.5 stroke-[2]" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1B3A6B] transition-all" title="Twitter">
                  <Twitter className="w-3.5 h-3.5 stroke-[2]" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1B3A6B] transition-all" title="LinkedIn">
                  <Linkedin className="w-3.5 h-3.5 stroke-[2]" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1B3A6B] transition-all" title="Instagram">
                  <Instagram className="w-3.5 h-3.5 stroke-[2]" />
                </a>
                
                {/* Simple Red Circle Scroll Button */}
                <button 
                  onClick={scrollToTop} 
                  className="w-8 h-8 rounded-full bg-[#FF4B4B] hover:bg-[#FF3333] text-white flex items-center justify-center shadow-md transition-transform hover:-translate-y-1 ml-2"
                  title="Kembali ke Atas"
                >
                  <ChevronUp className="w-4 h-4 stroke-[3]" />
                </button>
            </div>
            
            <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-white/30 font-medium">
              &copy; {new Date().getFullYear()} - Powered by MKN Site Sangatta
            </p>

          </div>

        </div>
      </div>
    </footer>
  );
};
