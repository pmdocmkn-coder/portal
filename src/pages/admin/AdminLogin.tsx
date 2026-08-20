import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock, Mail, KeyRound, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import logo from '../../assets/images/logo_mkn.png'; // MKN Logo

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@portal.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged in successfully');
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0A192F]">
      {/* Modern CSS Background - Abstract glowing orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/30 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[60%] rounded-full bg-teal-500/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[20%] w-[30%] h-[40%] rounded-full bg-orange-500/10 blur-[100px]" />
      </div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-[420px] p-8 sm:p-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-white/80 p-4 rounded-2xl shadow-inner mb-6 backdrop-blur-sm">
            <img src={logo} alt="MKN Logo" className="h-10 object-contain drop-shadow-sm" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-blue-100/70 text-sm font-medium">Please enter your details to sign in</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-blue-100/80 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-blue-200/50" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-200/30 focus:bg-white/10 focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50 transition-all outline-none backdrop-blur-sm"
                placeholder="admin@example.com"
              />
            </div>
          </div>
          
          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-blue-100/80 uppercase tracking-wider ml-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-blue-200/50" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-200/30 focus:bg-white/10 focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50 transition-all outline-none backdrop-blur-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 mb-8">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0 transition-colors" />
              <span className="text-sm text-blue-100/70 group-hover:text-blue-100 transition-colors">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3.5 px-4 rounded-xl transition-all disabled:opacity-70 font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] active:scale-[0.98]"
          >
            {loading ? (
              <span className="inline-block animate-pulse">Authenticating...</span>
            ) : (
              <>
                Sign In 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
