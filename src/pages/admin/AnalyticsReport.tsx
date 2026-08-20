import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Users, CursorClick, CalendarBlank } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

export default function AnalyticsReport() {
  const [dailyVisitors, setDailyVisitors] = useState<any[]>([]);
  const [portalClicks, setPortalClicks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const [visitorsRes, clicksRes] = await Promise.all([
        supabase
          .from('daily_visitors')
          .select('date, count')
          .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
          .order('date', { ascending: false }),
        supabase
          .from('portal_clicks')
          .select('portal_id, clicks, date, portal_items(title)')
          .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
          .order('date', { ascending: false })
      ]);

      setDailyVisitors(visitorsRes.data || []);
      setPortalClicks(clicksRes.data || []);
      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  const totalVisitors30Days = dailyVisitors.reduce((acc, v) => acc + v.count, 0);
  const totalClicks30Days = portalClicks.reduce((acc, c) => acc + c.clicks, 0);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Ringkasan
          </Link>
          <h1 className="text-[32px] font-bold text-slate-900 tracking-tight mb-1">Laporan Lengkap</h1>
          <p className="text-slate-500 font-medium text-sm">Data riwayat analitik 30 hari terakhir</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-[16px] border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6" weight="fill" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500">Total Pengunjung (30 Hari)</p>
                <p className="text-2xl font-black text-slate-900">{totalVisitors30Days}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-[16px] border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                <CursorClick className="w-6 h-6" weight="fill" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500">Total Klik Portal (30 Hari)</p>
                <p className="text-2xl font-black text-slate-900">{totalClicks30Days}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Table: Daily Visitors */}
            <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <CalendarBlank className="w-5 h-5 text-slate-700" />
                <h2 className="text-lg font-bold text-slate-900">Riwayat Pengunjung Harian</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-6 py-4 font-bold border-b border-slate-200">Tanggal</th>
                      <th className="px-6 py-4 font-bold border-b border-slate-200 text-right">Jumlah Pengunjung</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                    {dailyVisitors.length === 0 ? (
                      <tr><td colSpan={2} className="px-6 py-8 text-center text-slate-500 italic">Belum ada data</td></tr>
                    ) : (
                      dailyVisitors.map((v, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            {new Date(v.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-slate-900">{v.count}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table: Portal Clicks */}
            <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <CursorClick className="w-5 h-5 text-slate-700" />
                <h2 className="text-lg font-bold text-slate-900">Riwayat Klik Portal Harian</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-6 py-4 font-bold border-b border-slate-200">Tanggal</th>
                      <th className="px-6 py-4 font-bold border-b border-slate-200">Nama Portal</th>
                      <th className="px-6 py-4 font-bold border-b border-slate-200 text-right">Klik</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                    {portalClicks.length === 0 ? (
                      <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500 italic">Belum ada data klik</td></tr>
                    ) : (
                      portalClicks.map((c, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                            {new Date(c.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-900">{c.portal_items?.title || 'Unknown Portal'}</td>
                          <td className="px-6 py-4 text-right text-slate-900 font-bold">{c.clicks}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
