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
      if (window.innerWidth >= 768) {
        if (bgRef.current) bgRef.current.style.transform = 'translate3d(0,0,0)';
        return;
      }
      
      if (bgRef.current) {
        // Calculate parallax based on scroll position
        const scrolled = window.scrollY;
        // Use translate3d for hardware acceleration
        bgRef.current.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
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
      {/* Background Image with Overlay */}
      <div 
        ref={bgRef}
        className="absolute top-[-50%] left-0 w-full h-[200%] z-0 opacity-20 bg-cover bg-center md:bg-fixed"
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
