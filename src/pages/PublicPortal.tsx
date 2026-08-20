import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { StatsSection } from '../components/StatsSection';
import { PortalsShowcaseSection } from '../components/PortalsShowcaseSection';
import { FooterSection } from '../components/FooterSection';
import { SitePreviewModal } from '../components/ui/SitePreviewModal';
import { ContactModal } from '../components/ui/ContactModal';
import { PortalSite } from '../types';
import { supabase } from '../lib/supabase';

export default function PublicPortal() {
  const [selectedSite, setSelectedSite] = useState<PortalSite | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPortalsExpanded, setIsPortalsExpanded] = useState(false);
  const [isPortalsClosing, setIsPortalsClosing] = useState(false);

  React.useEffect(() => {
    // Increment visitor count when public portal mounts (once per session)
    const incrementVisitor = async () => {
      try {
        if (!sessionStorage.getItem('has_visited_portal')) {
          await supabase.rpc('increment_visitor_count');
          sessionStorage.setItem('has_visited_portal', 'true');
        }
      } catch (e) {
        console.error('Failed to increment visitor count:', e);
      }
    };
    incrementVisitor();
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExpandPortals = () => {
    setIsPortalsExpanded(true);
    setIsPortalsClosing(false);
    // Optional: Hide body scroll when modal is open to prevent background scrolling
    document.body.style.overflow = 'hidden';
  };

  const handleClosePortals = () => {
    // Start closing animation
    setIsPortalsClosing(true);
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
    
    // Wait for animation to finish before unmounting
    setTimeout(() => {
      setIsPortalsExpanded(false);
      setIsPortalsClosing(false);
    }, 600);
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen text-[#1A202C] font-sans overflow-x-clip selection:bg-[#1B3A6B] selection:text-white">
      {/* 1. Hero Section with Sticky Header */}
      <HeroSection
        onOpenContact={() => setIsContactOpen(true)}
        onNavigate={handleNavigate}
        onExpandPortals={handleExpandPortals}
      />

      {/* Portals Showcase (Expandable) */}
      {isPortalsExpanded && <PortalsShowcaseSection onClose={handleClosePortals} isClosing={isPortalsClosing} />}

      {/* 2. Stats Section */}
      <StatsSection />
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
