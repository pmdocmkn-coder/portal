import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { DECORATIVE_IMAGES } from '../../data/portalData';

interface LogoIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoIntroModal: React.FC<LogoIntroModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-gradient-to-br from-[#0F172A] via-[#1B3A6B] to-[#0F172A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Video Section */}
          <div className="lg:w-3/5 relative">
            <div className="aspect-video lg:aspect-[4/3]">
              <video
                src={DECORATIVE_IMAGES.videoOnward}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0F172A]/80 pointer-events-none" />
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#FF5500]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF5500]">
                MKN ONWARDS
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">
              Transformasi Digital MKN
            </h2>

            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Pengalaman visual interaktif yang menggambarkan perjalanan transformasi digital MKN menuju era kemitraan dan inovasi berkelanjutan.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};
