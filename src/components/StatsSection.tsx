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

    // Parallax Effect (Unified for Desktop and Mobile)
    let animationFrameId: number;
    const handleScroll = () => {
      if (bgRef.current && bgRef.current.parentElement) {
        const rect = bgRef.current.parentElement.getBoundingClientRect();
        
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const clampedProgress = Math.max(0, Math.min(1, progress));
        
        // Image is 250% height, meaning 150% extra space
        const maxTranslate = rect.height * 1.5;
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
      {/* Unified Parallax Layer (Desktop & Mobile) 
          Uses JS translate3d to guarantee the image stays centered in the section 
          and doesn't get cut off by viewport bounds like bg-fixed does. */}
      <div 
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-[250%] z-0 opacity-20 bg-cover bg-bottom"
        style={{
          backgroundImage: `url('${stats.bgImage}')`,
          willChange: 'transform'
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
