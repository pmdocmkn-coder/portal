import React, { useState } from 'react';
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
  Clock,
  List
} from '@phosphor-icons/react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import logo from '../../assets/images/logo_mkn.png'; // MKN Logo

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole, session, canAccessPage } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  // All possible nav items — filtered by permission
  const allNavItems = [
    { name: 'Ringkasan', path: '/admin', icon: SquaresFour, page: 'dashboard', group: 'UMUM' },
    { name: 'Kelola Portal', path: '/admin/portals', icon: FolderOpen, page: 'portals', group: 'PORTAL & LAYANAN' },
    { name: 'Kategori Layanan', path: '/admin/categories', icon: Folders, page: 'categories', group: 'PORTAL & LAYANAN' },
    { name: 'Identitas Website', path: '/admin/appearance', icon: Palette, page: 'appearance', group: 'PENGATURAN' },
    { name: 'Slider Beranda', path: '/admin/sliders', icon: ImageSquare, page: 'sliders', group: 'PENGATURAN' },
    { name: 'Pengguna Admin', path: '/admin/users', icon: Users, page: 'users', group: 'PENGATURAN' },
    { name: 'Pengaturan Izin', path: '/admin/permissions', icon: ShieldCheck, page: 'permissions', group: 'PENGATURAN' },
    { name: 'Aktivitas & Log', path: '/admin/activity', icon: Clock, page: 'activity', group: 'PENGATURAN' },
  ];

  // Filter items by permission and group them
  const visibleItems = allNavItems.filter(item => canAccessPage(item.page));
  const navGroups = Object.entries(
    visibleItems.reduce((groups, item) => {
      if (!groups[item.group]) groups[item.group] = [];
      groups[item.group].push(item);
      return groups;
    }, {} as Record<string, typeof allNavItems>)
  ).map(([label, items]) => ({ label, items }));

  return (
    <div className="h-screen w-full overflow-hidden flex font-sans text-slate-900 bg-white">
      {/* Sidebar - Slate & Cobalt Enterprise (Dark Navy) */}
      <aside className={`${isCollapsed ? 'w-[80px]' : 'w-[280px]'} transition-all duration-300 ease-in-out bg-[#0f172a] border-r border-[#1e293b] flex flex-col z-20 shrink-0`}>
        {/* Brand Area */}
        <div className={`px-5 py-6 flex items-center ${isCollapsed ? 'flex-col gap-4' : 'justify-between'}`}>
          <div className="flex items-center gap-3">
             <div className="bg-white p-1.5 rounded-lg shrink-0">
               <img src={logo} alt="MKN Logo" className="w-7 h-7 object-contain" />
             </div>
             {!isCollapsed && (
                <div className="overflow-hidden">
                  <h2 className="text-base font-bold text-white tracking-tight leading-none truncate">MKN Portal Hub</h2>
                </div>
             )}
          </div>
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title={isCollapsed ? "Perbesar Sidebar" : "Perkecil Sidebar"}
          >
            <List className="w-5 h-5" weight="bold" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-2 space-y-8 overflow-y-auto overflow-x-hidden">
          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-3">
              <div className={`px-6 text-xs font-bold text-slate-500 uppercase tracking-wider ${isCollapsed ? 'text-center text-[10px]' : ''}`}>
                {isCollapsed ? group.label.substring(0, 3) : group.label}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      title={item.name}
                      className={`group flex items-center ${isCollapsed ? 'justify-center py-3' : 'justify-between py-2.5 pr-4 pl-5'} transition-all duration-200 relative ${
                        isActive 
                          ? 'text-white bg-white/5' 
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3b82f6] rounded-r-full" />
                      )}
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#3b82f6]' : 'text-slate-500 group-hover:text-slate-300'} transition-colors shrink-0`} weight={isActive ? 'fill' : 'regular'} />
                        {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>}
                      </div>
                      {!isCollapsed && isActive && <CaretRight className="w-3.5 h-3.5 text-slate-500" weight="bold" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-[#1e293b]">
        <Link 
          to="/admin/profile"
          title="Profil Saya"
          className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2' : 'justify-between p-3'} rounded-xl hover:bg-white/5 transition-colors cursor-pointer group text-left`}
        >
          <div className="flex items-center gap-3">
            {session?.user?.user_metadata?.avatar_url ? (
              <img 
                src={session.user.user_metadata.avatar_url} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-slate-300">
                  {((session?.user?.user_metadata?.full_name || session?.user?.email) || 'U').charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">
                  {session?.user?.user_metadata?.full_name || session?.user?.email?.split('@')[0] || 'Pengguna'}
                </p>
                <p className="text-xs text-slate-400 font-medium truncate">
                  {userRole === 'admin' ? 'Super Admin' : 'Editor'}
                </p>
              </div>
            )}
          </div>
          {!isCollapsed && <CaretRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" weight="bold" />}
        </Link>
      </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#ffffff]">
        {/* Page Content */}
        <div className="p-8 md:p-12 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
