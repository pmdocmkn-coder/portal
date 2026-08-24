import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const StatsSection: React.FC = () => {
  const [stats, setStats] = useState({ portals: 0, categories: 0, visitors: 0, bgImage: '/hero_tower_bg.jpg' });

  const bgRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const [portalsRes, catsRes, settingsRes] = await Promise.all([
        supabase.from('portal_items').select('id', { count: 'exact', head: true }),
        supabase.from('categories').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('site_settings').select('stats_visitors, stats_bg_image').eq('id', 1).single()
      ]);

      setStats({
        portals: portalsRes.count || 0,
        categories: catsRes.count || 0,
        visitors: settingsRes.data?.stats_visitors || 0,
        bgImage: settingsRes.data?.stats_bg_image || '/hero_tower_bg.jpg'
      });
    };

    fetchStats();

    // Realtime: update visitor count live when site_settings changes
    const channel = supabase
      .channel('stats-section-live')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'site_settings', filter: 'id=eq.1' },
        (payload) => {
          if (payload.new?.stats_visitors !== undefined) {
            setStats(prev => ({ ...prev, visitors: payload.new.stats_visitors }));
          }
        }
      )
      .subscribe();

    // Mobile Parallax Effect
    let animationFrameId: number;
    const handleScroll = () => {
      if (window.innerWidth >= 768) return;
      
      if (bgRef.current && bgRef.current.parentElement) {
        const rect = bgRef.current.parentElement.getBoundingClientRect();
        
        // Calculate how far the section has scrolled through the viewport
        // 0 = just entered from bottom, 1 = just leaving from top
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const clampedProgress = Math.max(0, Math.min(1, progress));
        
        // The image is 150% height, meaning we have 50% extra space to move it up.
        // We move it from 0px down to -(50% of section height) as we scroll.
        const maxTranslate = rect.height * 0.5;
        const offset = -(clampedProgress * maxTranslate);
        
        bgRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => { 
      supabase.removeChannel(channel); 
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k+';
    return num.toString();
  };

  return (
    <section className="relative w-full py-16 bg-[#2B3F56] overflow-hidden">
      {/* MOBILE Parallax Layer: Uses JS translate3d to avoid iOS jumping bug */}
      <div 
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-[150%] z-0 opacity-20 bg-cover bg-center md:hidden"
        style={{
          backgroundImage: `url('${stats.bgImage}')`,
          willChange: 'transform'
        }}
      ></div>

      {/* DESKTOP Parallax Layer: Uses native CSS background-fixed (smooth on PC) */}
      <div 
        className="hidden md:block absolute inset-0 z-0 opacity-20 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('${stats.bgImage}')`
        }}
      ></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-white">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl md:text-5xl font-light mb-2">{formatNumber(stats.portals)}</h3>
            <p className="text-sm md:text-base font-semibold tracking-wide text-gray-200">Total Portal</p>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl md:text-5xl font-light mb-2">{formatNumber(stats.categories)}</h3>
            <p className="text-sm md:text-base font-semibold tracking-wide text-gray-200">Kategori Layanan</p>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl md:text-5xl font-light mb-2">{formatNumber(stats.visitors)}</h3>
            <p className="text-sm md:text-base font-semibold tracking-wide text-gray-200">Pengunjung</p>
          </div>
        </div>
      </div>
    </section>
  );
};
