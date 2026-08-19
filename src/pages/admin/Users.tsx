import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ShieldCheck, Plus, Trash, PencilSimple, Key } from '@phosphor-icons/react';
import toast from 'react-hot-toast';

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionUser, setSessionUser] = useState<any>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'admin' });

  useEffect(() => {
    fetchUsers();
    supabase.auth.getSession().then(({ data }) => {
      setSessionUser(data.session?.user);
    });
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc('get_admin_users');
      
    if (error) {
      toast.error('Gagal memuat pengguna: ' + error.message);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const handleAssignRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Check if password is required (only required if creating a new user, 
    // but the RPC requires it. If editing, we could pass a dummy or we modify UI)
    // Actually, since we only set email and role when editing, if password is empty, 
    // we can pass a dummy because the RPC ignores password if user exists.
    const { error } = await supabase.rpc('create_or_assign_admin', {
      p_email: formData.email,
      p_password: formData.password || 'password_dummy',
      p_role: formData.role
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Berhasil memberikan akses ${formData.role} ke ${formData.email}`);
      setIsModalOpen(false);
      setFormData({ email: '', password: '', role: 'admin' });
      fetchUsers();
    }
    setIsSubmitting(false);
  };

  const handleRemoveRole = async (userId: string) => {
    if (!confirm('Apakah Anda yakin ingin mencabut akses pengguna ini?')) return;
    
    const { error } = await supabase.rpc('remove_user_role', {
      p_user_id: userId
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Akses pengguna berhasil dicabut');
      fetchUsers();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-bold text-slate-900 tracking-tight mb-1">Pengguna Admin</h1>
          <p className="text-slate-500 font-medium text-sm">Kelola akses dan peran pengguna di dalam sistem portal</p>
        </div>
        
        <button 
          onClick={() => {
            setFormData({ email: '', password: '', role: 'admin' });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#0f172a] hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" weight="bold" /> Tambah Admin
        </button>
      </div>

      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Memuat...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Peran (Role)</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Dibuat Pada</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.length === 0 ? (
                <tr><td colSpan={4} className="py-8 text-center text-slate-500">Belum ada pengguna admin.</td></tr>
              ) : users.map((u) => (
                <tr key={u.user_id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                        {u.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <span className="font-semibold text-slate-900">{u.email || 'Unknown User'}</span>
                      {sessionUser?.id === u.user_id && (
                         <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">Anda</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                      <ShieldCheck className="w-3.5 h-3.5" weight="fill" />
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-500 font-medium">
                    {new Date(u.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td className="py-4 px-6 flex items-center justify-end gap-3">
                    <button 
                      onClick={() => {
                        const newPassword = window.prompt(`Masukkan password baru untuk ${u.email}:`);
                        if (newPassword && newPassword.length >= 6) {
                          toast.promise(
                            (async () => {
                              const { error } = await supabase.rpc('create_or_assign_admin', {
                                p_email: u.email,
                                p_password: newPassword,
                                p_role: u.role
                              });
                              if (error) throw error;
                            })(),
                            {
                              loading: 'Mereset password...',
                              success: 'Password berhasil direset',
                              error: 'Gagal mereset password'
                            }
                          ).then(() => fetchUsers());
                        } else if (newPassword !== null) {
                          toast.error('Password harus minimal 6 karakter');
                        }
                      }}
                      className="text-slate-400 hover:text-blue-600 transition-colors" title="Reset Password"
                    >
                      <Key className="w-5 h-5" weight="fill" />
                    </button>
                    <button 
                      onClick={() => {
                        setFormData({ email: u.email, password: '', role: u.role });
                        setIsModalOpen(true);
                      }}
                      className="text-slate-400 hover:text-slate-900 transition-colors" title="Edit">
                      <PencilSimple className="w-5 h-5" weight="bold" />
                    </button>
                    <button 
                      onClick={() => handleRemoveRole(u.user_id)}
                      className="text-slate-400 hover:text-red-500 transition-colors" title="Cabut Akses">
                      <Trash className="w-5 h-5" weight="bold" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Tambah/Edit Admin */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Beri Akses Pengguna</h3>
              <p className="text-sm text-slate-500 mt-1">Isi detail akun untuk memberi hak akses ke dalam sistem.</p>
            </div>
            
            <form onSubmit={handleAssignRole} className="p-6 space-y-5" autoComplete="off">
              {/* Fake hidden inputs to stop Chrome autofill */}
              <input type="email" name="fakeusernameremembered" style={{display: 'none'}} />
              <input type="password" name="fakepasswordremembered" style={{display: 'none'}} />

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Pengguna</label>
                <input
                  type="email"
                  name="new_user_email"
                  required
                  autoComplete="new-password"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  placeholder="admin@mkn.co.id"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password Baru (Opsional jika mengedit)</label>
                <input
                  type="password"
                  name="new_user_password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  placeholder="Minimal 6 karakter"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Peran (Role)</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none bg-white"
                >
                  <option value="admin">Super Admin (Akses Penuh)</option>
                  <option value="editor">Editor (Hanya kelola portal)</option>
                  <option value="user">User Biasa (Tidak ada akses)</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-semibold transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
