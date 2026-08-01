import React from 'react';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title = 'MKN Onwards Video'
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
          <Play className="w-4 h-4 text-white fill-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">{title}</span>
        </div>

        <video
          src={videoUrl}
          autoPlay
          controls
          className="w-full h-auto max-h-[85vh] object-contain"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
