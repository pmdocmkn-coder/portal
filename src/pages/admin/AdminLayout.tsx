import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  SquaresFour, 
  FolderOpen, 
  Folders, 
  Desktop, 
  Users, 
  Shield, 
  ClockCounterClockwise, 
  CaretRight,
  User,
  Palette,
  ImageSquare,
  ShieldCheck,
  Clock
} from '@phosphor-icons/react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import logo from '../../assets/images/logo_mkn.png'; // MKN Logo

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole, session } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const navGroups = [
    {
      label: 'UMUM',
      items: [
        { name: 'Ringkasan', path: '/admin', icon: SquaresFour },
      ]
    },
    {
      label: 'PORTAL & LAYANAN',
      items: [
        { name: 'Kelola Portal', path: '/admin/portals', icon: FolderOpen },
        { name: 'Kategori Layanan', path: '/admin/categories', icon: Folders },
      ]
    },
    ...(userRole === 'admin' ? [{
      label: 'PENGATURAN',
      items: [
        { name: 'Identitas Website', path: '/admin/appearance', icon: Palette },
        { name: 'Slider Beranda', path: '/admin/sliders', icon: ImageSquare },
        { name: 'Pengguna Admin', path: '/admin/users', icon: Users },
        { name: 'Keamanan', path: '/admin/security', icon: ShieldCheck, disabled: true },
        { name: 'Aktivitas & Log', path: '/admin/activity', icon: Clock },
      ]
    }] : [])
  ];

  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC] flex font-sans text-slate-900 selection:bg-blue-200">
      {/* Sidebar - Slate & Cobalt Enterprise (Dark Navy) */}
      <aside className="w-[280px] bg-[#0f172a] border-r border-[#1e293b] flex flex-col z-20 shrink-0">
        {/* Brand Area */}
        <div className="px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-lg">
              <img src={logo} alt="MKN Logo" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight leading-none">MKN Portal Hub</h2>
              <span className="text-xs text-slate-400 font-medium mt-1 block">Admin Panel</span>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-2 space-y-8 overflow-y-auto">
          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-3">
              <div className="px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
                {group.label}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`group flex items-center justify-between py-2.5 pr-4 pl-5 transition-all duration-200 relative ${
                        isActive 
                          ? 'text-white bg-white/5' 
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3b82f6] rounded-r-full" />
                      )}
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#3b82f6]' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`} weight={isActive ? 'fill' : 'regular'} />
                        <span className="font-medium text-sm">{item.name}</span>
                      </div>
                      {isActive && <CaretRight className="w-3.5 h-3.5 text-slate-500" weight="bold" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#1e293b]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-slate-300">JP</span>
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">Jupri E. P.</p>
                <p className="text-xs text-slate-400 font-medium truncate">Super Admin</p>
              </div>
            </div>
            <CaretRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" weight="bold" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#ffffff]">
        {/* Page Content */}
        <div className="p-8 md:p-12 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
