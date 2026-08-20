import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Clock, Info, WarningCircle, CheckCircle, WarningOctagon, FunnelSimple } from '@phosphor-icons/react';
import toast from 'react-hot-toast';

import { AdminHeader } from '../../components/ui/AdminHeader';

export default function ActivityLog() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Semua');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    // Fetch logs with user data
    const { data, error } = await supabase
      .from('activity_logs_with_users')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      toast.error('Gagal mengambil aktivitas');
    } else {
      setLogs(data || []);
    }
    setLoading(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'warning': return <WarningCircle className="w-5 h-5 text-amber-500" />;
      case 'error': return <WarningOctagon className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-slate-500" />;
    }
  };

  const filteredLogs = logs.filter(log => filter === 'Semua' || log.type === filter.toLowerCase());

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* Header */}
      <AdminHeader 
        title="Aktivitas & Log" 
        subtitle="Rekam jejak seluruh perubahan dan event di dalam sistem"
        action={
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            {['Semua', 'Info', 'Success', 'Warning', 'Error'].map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  filter === t ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        }
      />

      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Memuat log...</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredLogs.length === 0 ? (
              <div className="p-8 text-center text-slate-500">Tidak ada log aktivitas.</div>
            ) : (
              filteredLogs.map((log) => (
                <div key={log.id} className="p-4 sm:px-6 hover:bg-slate-50 transition-colors flex gap-4">
                  <div className="mt-1">
                    {getIcon(log.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 font-medium">
                      <span className="font-bold">{log.user_email || 'Sistem'}</span> {log.action} <span className="font-bold">{log.target}</span>
                    </p>
                    {log.details && (
                      <p className="text-xs text-slate-500 mt-1">{log.details}</p>
                    )}
                    <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(log.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

    </div>
  );
}

