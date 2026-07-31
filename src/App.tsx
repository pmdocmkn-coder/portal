import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { PortalGallerySection } from './components/PortalGallerySection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { FooterSection } from './components/FooterSection';
import { SitePreviewModal } from './components/ui/SitePreviewModal';
import { ContactModal } from './components/ui/ContactModal';
import { PortalSite } from './types';

export default function App() {
  const [selectedSite, setSelectedSite] = useState<PortalSite | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen text-[#1A202C] font-sans overflow-x-clip selection:bg-[#1B3A6B] selection:text-white">
      {/* 1. Hero Section with Sticky Header */}
      <HeroSection
        onOpenContact={() => setIsContactOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* 2. Draggable Motion Marquee */}
      <MarqueeSection onSelectSite={(site) => setSelectedSite(site)} />

      {/* 3. Company Web Portal Live Directory (Direktori Web Portal Live) */}
      <div id="gallery">
        <PortalGallerySection onSelectSite={(site) => setSelectedSite(site)} />
      </div>

      {/* 4. Company Overview Section */}
      <div id="overview">
        <AboutSection onOpenContact={() => setIsContactOpen(true)} />
      </div>

      {/* 5. Enterprise Projects Section */}
      <div id="projects">
        <ProjectsSection onOpenContact={() => setIsContactOpen(true)} />
      </div>

      {/* Footer */}
      <FooterSection
        onOpenContact={() => setIsContactOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Modals */}
      <SitePreviewModal
        site={selectedSite}
        onClose={() => setSelectedSite(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
