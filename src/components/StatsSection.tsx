import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const StatsSection: React.FC = () => {
  const [stats, setStats] = useState({ portals: 0, categories: 0, visitors: 0, bgImage: '/hero_tower_bg.jpg' });

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

    return () => { supabase.removeChannel(channel); };
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k+';
    return num.toString();
  };

  return (
    <section className="relative w-full py-16 bg-[#2B3F56] overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url('${stats.bgImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
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
