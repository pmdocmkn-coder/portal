import React, { useState } from 'react';
import { X, Play, RotateCcw, Sparkles, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { MKNLogo } from './MKNLogo';

interface LogoIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoIntroModal: React.FC<LogoIntroModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-2xl text-[#1A202C]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#F7F8FA] hover:bg-[#E2E8F0] text-[#1B3A6B] transition-colors cursor-pointer border border-[#E2E8F0]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#FF5500]" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1B3A6B]">
              Synergy MKN Onwards 3D Intro Experience
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1B3A6B] uppercase tracking-tight">
            Animated 3D Motion Identity
          </h2>
          <p className="text-xs text-[#718096] mt-1 font-medium">
            Representasi visual gerak fluid ribbon 3D yang membentuk lambang kemitraan digital MKN Onwards.
          </p>
        </div>

        {/* 3D Motion Stage */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-b from-[#F7F8FA] via-white to-[#F7F8FA] border border-[#E2E8F0] flex flex-col items-center justify-center p-8 shadow-inner group">
          {/* Animated 3D Infinity Ribbon Canvas Stage */}
          <div className="relative transform scale-125 sm:scale-150 transition-transform duration-500">
            <MKNLogo size="lg" showSubtext={true} />
          </div>

          {/* Particle floating lights in background */}
          <div className="absolute inset-0 bg-[radial-gradient(#00A3E0_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

          {/* Interactive Control overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1B3A6B]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-ping" />
              <span>3D Fluid Paint Engine Active</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1.5 rounded-lg bg-[#1B3A6B] hover:bg-[#2B6CB0] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isPlaying ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Replay Motion' : 'Play Intro'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Features description */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <div className="p-3.5 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0]">
            <span className="text-[10px] font-extrabold text-[#FF5500] uppercase tracking-wider block mb-0.5">
              3D Fluid Ribbon
            </span>
            <p className="text-xs text-[#718096] font-medium">
              Sapuan kuas dual-tone Orange & Cyan membentuk pita infinity presisi.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0]">
            <span className="text-[10px] font-extrabold text-[#1B3A6B] uppercase tracking-wider block mb-0.5">
              Badge MKN Badge
            </span>
            <p className="text-xs text-[#718096] font-medium">
              Pusat identitas MKN Onwards dengan efek metallic shine interaktif.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0]">
            <span className="text-[10px] font-extrabold text-[#059669] uppercase tracking-wider block mb-0.5">
              Vector / GIF / MP4
            </span>
            <p className="text-xs text-[#718096] font-medium">
              Dapat diintegrasikan langsung menggunakan file MP4, GIF, atau SVG 60FPS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
