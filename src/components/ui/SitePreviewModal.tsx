import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, Sparkles, Globe, Monitor, Code } from 'lucide-react';
import { PortalSite } from '../../types';

interface SitePreviewModalProps {
  site: PortalSite | null;
  onClose: () => void;
}

export const SitePreviewModal: React.FC<SitePreviewModalProps> = ({ site, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'motion' | 'iframe'>('motion');

  if (!site) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(site.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-2xl text-[#1A202C]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#F7F8FA] hover:bg-[#E2E8F0] text-[#1B3A6B] transition-colors cursor-pointer border border-[#E2E8F0]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pr-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[#1B3A6B]/10 text-[#1B3A6B] border border-[#1B3A6B]/20 rounded-full">
                {site.category}
              </span>
              <span className="text-xs text-[#718096] font-semibold">
                MKN Verified Portal
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B3A6B] tracking-tight">
              {site.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E2E8F0] hover:bg-[#F7F8FA] text-xs font-bold text-[#1B3A6B] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin Tautan'}</span>
            </button>

            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#D94F2B] hover:bg-[#E86547] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md cursor-pointer"
            >
              <span>Buka Live Portal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3 mb-6">
          <button
            onClick={() => setActiveTab('motion')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'motion'
                ? 'bg-[#1B3A6B] text-white'
                : 'text-[#718096] hover:text-[#1B3A6B] bg-[#F7F8FA]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D94F2B]" />
            <span>Tampilan Capture Motion</span>
          </button>
          <button
            onClick={() => setActiveTab('iframe')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'iframe'
                ? 'bg-[#1B3A6B] text-white'
                : 'text-[#718096] hover:text-[#1B3A6B] bg-[#F7F8FA]'
            }`}
          >
            <Monitor className="w-4 h-4 text-[#2B6CB0]" />
            <span>Pratinjau Situs Live</span>
          </button>
        </div>

        {/* Media Preview Box */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#F7F8FA] border border-[#E2E8F0] mb-6 shadow-sm">
          {activeTab === 'motion' ? (
            <img
              src={site.previewGif || site.gif}
              alt={site.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-white">
              <Globe className="w-12 h-12 text-[#2B6CB0] mb-3 animate-pulse" />
              <h3 className="text-lg font-extrabold text-[#1B3A6B] mb-2">Destinasi Web Live MKN</h3>
              <p className="text-xs text-[#718096] max-w-md mb-6 leading-relaxed">
                Anda sedang meninjau entri portal resmi untuk {site.title}. Klik tombol di bawah untuk membuka tautan interaktif secara langsung.
              </p>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-[#1B3A6B] hover:bg-[#2B6CB0] text-white font-bold text-xs transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Akses {site.title}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Description & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-[#1B3A6B] font-extrabold flex items-center gap-2">
              <Code className="w-4 h-4 text-[#D94F2B]" /> Ringkasan Web Portal
            </h3>
            <p className="text-sm leading-relaxed text-[#718096] font-normal">
              {site.description}
            </p>
          </div>

          <div className="space-y-3 bg-[#F7F8FA] p-4 rounded-2xl border border-[#E2E8F0]">
            <h4 className="text-xs uppercase tracking-wider text-[#1B3A6B] font-extrabold">
              Teknologi & Kategori
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {site.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] font-bold bg-white text-[#2B6CB0] rounded-lg border border-[#E2E8F0]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
