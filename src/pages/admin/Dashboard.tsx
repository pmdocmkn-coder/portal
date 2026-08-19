import React, { useState, useEffect } from 'react';
import { 
  GlobeHemisphereWest, 
  Graph, 
  Users, 
  ArrowUpRight, 
  ArrowRight,
  Circle
} from '@phosphor-icons/react';
import { supabase } from '../../lib/supabase';

export default function Dashboard() {
  const [stats, setStats] = useState({
    portals: 0,
    categories: 0,
    visitors: 0,
  });
  const [activities, setActivities] = useState<any[]>([]);
  const [popularPortals, setPopularPortals] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [portalsRes, settingsRes, activitiesRes, clicksRes] = await Promise.all([
        supabase.from('portal_items').select('*'),
        supabase.from('brand_settings').select('stats_visitors').single(),
        supabase.from('activity_logs').select('*, users:user_id(email)').order('created_at', { ascending: false }).limit(5),
        supabase.from('portal_clicks').select('portal_id, clicks, portal_items(title, category)')
      ]);

      let categoriesCount = 0;
      let portalsCount = 0;

      if (portalsRes.data) {
        portalsCount = portalsRes.data.length;
        const uniqueCategories = new Set(portalsRes.data.map((p: any) => p.category));
        categoriesCount = uniqueCategories.size;
      }

      // Aggregate popular portals
      let portalStats: Record<string, any> = {};
      let totalClicks = 0;
      
      if (clicksRes.data) {
        clicksRes.data.forEach((row: any) => {
          if (!row.portal_items) return;
          const pid = row.portal_id;
          if (!portalStats[pid]) {
            portalStats[pid] = {
              name: row.portal_items.title,
              tag: row.portal_items.category,
              clicks: 0
            };
          }
          portalStats[pid].clicks += row.clicks;
          totalClicks += row.clicks;
        });
      }

      const popular = Object.values(portalStats)
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 5)
        .map(p => ({
          ...p,
          pct: totalClicks > 0 ? Math.round((p.clicks / totalClicks) * 100) : 0
        }));

      setPopularPortals(popular);
      setActivities(activitiesRes.data || []);
      setStats({
        portals: portalsCount,
        categories: categoriesCount,
        visitors: settingsRes.data?.stats_visitors || 0,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[32px] font-bold text-slate-900 tracking-tight mb-1">Ringkasan</h1>
          <p className="text-slate-500 font-medium text-sm">Pantauan singkat performa portal hari ini</p>
        </div>
        <div className="bg-slate-100/80 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200/50">
          Diperbarui {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-sm flex flex-col justify-between h-[140px]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Portal</span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <GlobeHemisphereWest className="w-4 h-4" weight="fill" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{stats.portals}</span>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
              <ArrowUpRight className="w-3 h-3" weight="bold" /> Aktif
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-sm flex flex-col justify-between h-[140px]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori Layanan</span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <Graph className="w-4 h-4" weight="fill" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{stats.categories}</span>
            <span className="text-sm font-semibold text-slate-500">Aktif</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-sm flex flex-col justify-between h-[140px]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pengunjung</span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <Users className="w-4 h-4" weight="fill" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{stats.visitors >= 1000 ? (stats.visitors/1000).toFixed(1) + 'K' : stats.visitors}</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-[16px] border border-slate-200/80 shadow-sm p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-8 relative z-10">
          <h2 className="text-lg font-bold text-slate-900">Kunjungan 30 Hari Terakhir</h2>
          <button className="flex items-center gap-2 text-sm font-bold text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            Laporan Lengkap <ArrowRight className="w-4 h-4" weight="bold" />
          </button>
        </div>
        
        {/* Mock Chart SVG */}
        <div className="w-full h-[220px] relative">
          <svg viewBox="0 0 1000 220" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* The fill area */}
            <path 
              d="M0,150 C100,150 150,170 250,170 C350,170 380,120 450,120 C520,120 560,180 620,180 C700,180 720,80 800,80 C880,80 920,110 950,110 C980,110 1000,80 1000,80 L1000,220 L0,220 Z" 
              fill="url(#chartGradient)" 
            />
            {/* The stroke line */}
            <path 
              d="M0,150 C100,150 150,170 250,170 C350,170 380,120 450,120 C520,120 560,180 620,180 C700,180 720,80 800,80 C880,80 920,110 950,110 C980,110 1000,80 1000,80" 
              fill="none" 
              stroke="#0f172a" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between items-center text-xs font-bold text-slate-400 mt-4 px-2">
          <span>1 Agu</span>
          <span>10 Agu</span>
          <span>19 Agu</span>
        </div>
      </div>

      {/* Bottom Grid: Popular Portals & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Popular Portals (Left - 7 cols) */}
        <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-sm lg:col-span-7">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Portal Terpopuler</h2>
          
          <div className="space-y-6">
            {popularPortals.length === 0 ? (
              <p className="text-sm text-slate-500 italic">Belum ada data klik portal</p>
            ) : (
              popularPortals.map((portal, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-900">{portal.name}</span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {portal.tag}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-500">{portal.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-800 rounded-full" style={{ width: `${portal.pct}%` }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity (Right - 5 cols) */}
        <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-sm lg:col-span-5">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Aktivitas Terbaru</h2>
          
          <div className="relative border-l-2 border-slate-100 ml-3 space-y-6 pb-2">
            
            {activities.length === 0 ? (
              <p className="text-sm text-slate-500 italic pl-6">Belum ada aktivitas</p>
            ) : (
              activities.map((act) => {
                const getDotColor = (type: string) => {
                  switch(type) {
                    case 'error': return 'bg-red-500';
                    case 'warning': return 'bg-amber-500';
                    case 'success': return 'bg-emerald-500';
                    case 'info': return 'bg-slate-800';
                    default: return 'bg-slate-200';
                  }
                };
                
                return (
                  <div key={act.id} className="relative pl-6">
                    <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${getDotColor(act.type)} ring-4 ring-white`} />
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {act.users?.email ? <span className="font-bold text-slate-900">{act.users.email}</span> : ''} {act.action} <span className="font-bold text-slate-900">{act.target}</span>
                    </p>
                    <p className="text-xs font-bold text-slate-400 mt-1">
                      {new Date(act.created_at).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}
                    </p>
                  </div>
                );
              })
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
