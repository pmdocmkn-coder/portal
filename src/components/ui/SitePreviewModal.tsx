import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, Sparkles, Globe, Monitor, Code } from 'lucide-react';
import { PortalSite } from '../../types';

interface SitePreviewModalProps {
  site: PortalSite | null;
  onClose: () => void;
}

export const SitePreviewModal: React.FC<SitePreviewModalProps> = ({ site, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'iframe' | 'screenshot' | 'motion'>('iframe');
  const [iframeError, setIframeError] = useState(false);

  if (!site) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(site.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const liveScreenshotUrl = site.customImage || `https://image.thum.io/get/width/1280/crop/800/noanimate/${site.url}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-8 shadow-2xl text-[#1A202C]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F7F8FA] hover:bg-[#E2E8F0] text-[#1B3A6B] transition-colors cursor-pointer border border-[#E2E8F0] z-10"
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
              <span className="text-xs text-[#059669] font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                Live Web Portal MKN
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B3A6B] tracking-tight">
              {site.title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
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
              <span>Buka Live Web</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E2E8F0] pb-3 mb-4">
          <button
            onClick={() => setActiveTab('iframe')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'iframe'
                ? 'bg-[#1B3A6B] text-white shadow-xs'
                : 'text-[#718096] hover:text-[#1B3A6B] bg-[#F7F8FA]'
            }`}
          >
            <Monitor className="w-4 h-4 text-[#2B6CB0]" />
            <span>Live Interactive Web</span>
          </button>
          <button
            onClick={() => setActiveTab('screenshot')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'screenshot'
                ? 'bg-[#1B3A6B] text-white shadow-xs'
                : 'text-[#718096] hover:text-[#1B3A6B] bg-[#F7F8FA]'
            }`}
          >
            <Globe className="w-4 h-4 text-[#059669]" />
            <span>Live Web Capture Snapshot</span>
          </button>
          <button
            onClick={() => setActiveTab('motion')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'motion'
                ? 'bg-[#1B3A6B] text-white shadow-xs'
                : 'text-[#718096] hover:text-[#1B3A6B] bg-[#F7F8FA]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D94F2B]" />
            <span>Animasi Capture Motion</span>
          </button>
        </div>

        {/* Browser Mockup Window */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#F1F5F9] border border-[#CBD5E1] mb-6 shadow-inner">
          {/* Browser Top Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#E2E8F0] border-b border-[#CBD5E1]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]" />
            </div>
            <div className="flex-1 max-w-xl mx-4 bg-white px-3 py-1 rounded-md border border-[#CBD5E1] text-[11px] text-[#475569] font-mono truncate flex items-center gap-2 shadow-xs">
              <Globe className="w-3 h-3 text-[#2B6CB0] shrink-0" />
              <span className="truncate">{site.url}</span>
            </div>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-[#1B3A6B] hover:underline flex items-center gap-1"
            >
              <span>Baru</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Media Content Area */}
          <div className="relative w-full min-h-[450px] h-[520px] bg-white">
            {activeTab === 'iframe' && (
              <div className="relative w-full h-full">
                <iframe
                  src={site.url}
                  title={site.title}
                  className="w-full h-full border-0"
                  onError={() => setIframeError(true)}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
                {iframeError && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-10">
                    <Globe className="w-12 h-12 text-[#D94F2B] mb-3 animate-bounce" />
                    <h3 className="text-base font-extrabold text-[#1B3A6B] mb-1">Proteksi Keamanan Portal Live</h3>
                    <p className="text-xs text-[#718096] max-w-md mb-4 leading-relaxed">
                      Sistem keamanan portal ini membatasi tampilan langsung dalam bingkai iframe internal. Klik tombol di bawah untuk membuka situs live secara langsung.
                    </p>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 rounded-full bg-[#D94F2B] text-white text-xs font-bold flex items-center gap-2 shadow-md hover:bg-[#E86547]"
                    >
                      <span>Buka Live Web Langsung</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'screenshot' && (
              <div className="relative w-full min-h-[450px] overflow-hidden bg-slate-100 flex items-center justify-center">
                <img
                  src={site.customImage || liveScreenshotUrl}
                  alt={`Live capture of ${site.title}`}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = site.gif;
                  }}
                />
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                  Live Snapshot Web
                </div>
              </div>
            )}

            {activeTab === 'motion' && (
              <div className="relative w-full min-h-[450px] overflow-hidden bg-slate-100">
                <img
                  src={site.customImage || site.previewGif || site.gif}
                  alt={site.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
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
