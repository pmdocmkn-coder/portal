import React, { useState, Suspense, lazy } from 'react';
import { HeroSection } from '../components/HeroSection'; // above fold — eager
import { PortalSite } from '../types';
import { supabase } from '../lib/supabase';

// Below-fold components — lazy loaded to reduce initial bundle
const StatsSection = lazy(() => import('../components/StatsSection').then(m => ({ default: m.StatsSection })));
const PortalsShowcaseSection = lazy(() => import('../components/PortalsShowcaseSection').then(m => ({ default: m.PortalsShowcaseSection })));
const FooterSection = lazy(() => import('../components/FooterSection').then(m => ({ default: m.FooterSection })));
const SitePreviewModal = lazy(() => import('../components/ui/SitePreviewModal').then(m => ({ default: m.SitePreviewModal })));
const ContactModal = lazy(() => import('../components/ui/ContactModal').then(m => ({ default: m.ContactModal })));

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
      {/* 1. Hero Section with Sticky Header — eagerly loaded (above fold) */}
      <HeroSection
        onOpenContact={() => setIsContactOpen(true)}
        onNavigate={handleNavigate}
        onExpandPortals={handleExpandPortals}
      />

      {/* Portals Showcase (Expandable) — lazy */}
      <Suspense fallback={null}>
        {isPortalsExpanded && <PortalsShowcaseSection onClose={handleClosePortals} isClosing={isPortalsClosing} />}
      </Suspense>

      {/* 2. Stats Section — lazy */}
      <Suspense fallback={<div className="h-32 bg-[#2B3F56]" />}>
        <StatsSection />
      </Suspense>

      {/* Footer — lazy */}
      <Suspense fallback={null}>
        <FooterSection
          onOpenContact={() => setIsContactOpen(true)}
          onNavigate={handleNavigate}
        />
      </Suspense>

      {/* Modals — lazy */}
      <Suspense fallback={null}>
        <SitePreviewModal
          site={selectedSite}
          onClose={() => setSelectedSite(null)}
        />
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      </Suspense>
    </div>
  );
}
