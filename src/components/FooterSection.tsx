import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { FacebookLogo, TwitterLogo, LinkedinLogo, InstagramLogo, TiktokLogo } from '@phosphor-icons/react';
import { MKNLogo } from './ui/MKNLogo';
import { supabase } from '../lib/supabase';

interface FooterSectionProps {
  onOpenContact?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = () => {
  const [settings, setSettings] = useState({
    facebook_url: '',
    twitter_url: '',
    linkedin_url: '',
    instagram_url: '',
    tiktok_url: '',
    company_name: '',
    company_address: '',
    contact_phone: '',
    contact_email: '',
    company_website: '',
    logo_url: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single();
      if (data) setSettings(data);
    };
    fetchSettings();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#1B3A6B] text-white relative z-10 border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          
          {/* Left: Logo and Address */}
          <div className="flex flex-row items-center gap-6">
            {settings.logo_url ? (
               <div className="h-16 lg:h-20 w-auto flex-shrink-0 flex items-center group cursor-pointer transition-transform duration-500 hover:scale-110">
                  <img 
                    src={settings.logo_url} 
                    alt="Logo" 
                    className="h-full w-auto object-contain transition-all duration-500 group-hover:brightness-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" 
                    style={{ filter: 'brightness(0) invert(1)', opacity: 0.95 }} 
                  />
               </div>
            ) : (
               <div className="h-16 lg:h-20 w-auto flex-shrink-0 group cursor-pointer transition-transform duration-500 hover:scale-110" style={{ filter: 'brightness(0) invert(1)', opacity: 0.95 }}>
                  <div className="transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                    <MKNLogo size="md" showSubtext={false} />
                  </div>
               </div>
            )}
            
            <div className="self-stretch w-[1px] bg-white/20 hidden sm:block"></div>
            
            <div className="text-white/60 text-xs leading-relaxed max-w-xl py-1">
              <p className="font-semibold text-white/90 mb-0.5 text-sm">{settings.company_name}</p>
              <p className="whitespace-pre-wrap">{settings.company_address}</p>
              <div className="flex flex-wrap items-center gap-x-3 mt-0.5">
                 {settings.contact_phone && <span>Telp. {settings.contact_phone}</span>}
                 {settings.contact_phone && settings.contact_email && <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:block"></span>}
                 {settings.contact_email && <span>E-mail : {settings.contact_email}</span>}
                 {settings.contact_email && settings.company_website && <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:block"></span>}
                 {settings.company_website && <span>Website : {settings.company_website}</span>}
              </div>
            </div>
          </div>

          {/* Right: Socials & Scroll Top */}
          <div className="flex flex-col items-start md:items-end gap-4 mt-4 md:mt-0">
            
            <div className="flex items-center gap-4">
                {settings.facebook_url && (
                  <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1B3A6B] transition-all" title="Facebook">
                    <FacebookLogo size={16} weight="fill" />
                  </a>
                )}
                {settings.twitter_url && (
                  <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1B3A6B] transition-all" title="Twitter">
                    <TwitterLogo size={16} weight="fill" />
                  </a>
                )}
                {settings.linkedin_url && (
                  <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1B3A6B] transition-all" title="LinkedIn">
                    <LinkedinLogo size={16} weight="fill" />
                  </a>
                )}
                {settings.instagram_url && (
                  <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1B3A6B] transition-all" title="Instagram">
                    <InstagramLogo size={16} weight="bold" />
                  </a>
                )}
                {settings.tiktok_url && (
                  <a href={settings.tiktok_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1B3A6B] transition-all" title="TikTok">
                    <TiktokLogo size={16} weight="bold" />
                  </a>
                )}
                
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
