import React, { useState } from 'react';
import { MARQUEE_PORTALS, MarqueeItem } from '../data/portalData';
import { PortalSite } from '../types';
import { Search, ExternalLink, Sparkles, Filter, Eye, CheckCircle2 } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';

interface PortalGallerySectionProps {
  onSelectSite: (site: PortalSite) => void;
}

const CATEGORIES = [
  'Semua Portal',
  'Operasional & Sistem',
  'Manajemen & Analitik'
];

export const PortalGallerySection: React.FC<PortalGallerySectionProps> = ({ onSelectSite }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Portal');

  const filteredSites = MARQUEE_PORTALS.filter((site) => {
    const matchesSearch =
      site.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'Semua Portal' || site.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="gallery" className="bg-[#F7F8FA] border-b border-[#E2E8F0] px-6 md:px-12 py-24 relative z-30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <FadeIn y={20} delay={0}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D94F2B] animate-ping" />
                <span className="text-xs uppercase tracking-widest text-[#1B3A6B] font-bold">
                  Direktori Web Portal MKN
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1B3A6B] uppercase tracking-tight">
                Direktori Web Portal Live
              </h2>
            </div>
          </FadeIn>

          <FadeIn y={20} delay={0.15}>
            <p className="text-sm text-[#718096] max-w-md font-normal leading-relaxed">
              Jelajahi ekosistem web portal MKN. Pilih portal untuk meninjau pratinjau detail atau langsung membuka sistem live.
            </p>
          </FadeIn>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718096]" />
            <input
              type="text"
              placeholder="Cari portal perusahaan, sistem (cth: Operasional, DevHub, Analytics)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl pl-11 pr-4 py-2.5 text-sm text-[#1A202C] placeholder-[#718096] focus:outline-none focus:border-[#2B6CB0] transition-colors"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-[#718096] ml-1 flex-shrink-0 hidden sm:block" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1B3A6B] text-white shadow-md'
                    : 'bg-[#F7F8FA] text-[#718096] hover:text-[#1B3A6B] border border-[#E2E8F0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Web Portal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site, index) => (
            <FadeIn
              key={site.id}
              y={30}
              delay={index * 0.05}
              duration={0.6}
            >
              <div
                onClick={() => onSelectSite(site as unknown as PortalSite)}
                className="group bg-white border border-[#E2E8F0] hover:border-[#2B6CB0] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between h-full cursor-pointer"
              >
                {/* Image Media Preview */}
                <div className="relative aspect-video w-full bg-[#F7F8FA] overflow-hidden border-b border-[#E2E8F0]">
                  <img
                    src={site.previewImage || site.customImage || `https://s0.wp.com/mshots/v1/${encodeURIComponent(site.url)}?w=800`}
                    alt={site.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = site.gif;
                    }}
                  />
                  
                  {/* Live Tag */}
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[9px] font-bold text-white flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                    Live Web
                  </span>

                  {/* Company Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1B3A6B]/90 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
                    {site.company}
                  </span>

                  {/* Status Indicator */}
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white backdrop-blur-md ${
                      site.statusColor === 'emerald'
                        ? 'bg-[#059669]'
                        : site.statusColor === 'amber'
                        ? 'bg-[#F59E0B]'
                        : 'bg-[#D94F2B]'
                    }`}
                  >
                    {site.status}
                  </span>

                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-[#1B3A6B]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="px-4 py-2 rounded-full bg-[#D94F2B] text-white text-xs font-bold flex items-center gap-2 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Eye className="w-4 h-4" />
                      <span>Inspeksi Web Portal</span>
                    </div>
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#D94F2B] block mb-1">
                      {site.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#1A202C] group-hover:text-[#2B6CB0] transition-colors mb-1.5 flex items-center justify-between">
                      <span>{site.title}</span>
                      <ExternalLink className="w-4 h-4 text-[#718096] group-hover:text-[#D94F2B] transition-colors" />
                    </h3>
                    <p className="text-xs text-[#718096] line-clamp-2 leading-relaxed font-normal">
                      {site.description}
                    </p>
                  </div>

                  {/* Card Footer Badges */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
                    <div className="flex flex-wrap gap-1.5">
                      {site.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[10px] font-semibold bg-[#F7F8FA] text-[#1B3A6B] rounded border border-[#E2E8F0]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-bold uppercase tracking-wider text-[#2B6CB0] hover:text-[#D94F2B] inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Portal Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Empty Search Result State */}
        {filteredSites.length === 0 && (
          <div className="py-20 text-center bg-white rounded-2xl border border-[#E2E8F0]">
            <Sparkles className="w-10 h-10 text-[#D94F2B] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#1A202C] mb-1">Tidak ada portal yang cocok dengan pencarian Anda</h3>
            <p className="text-sm text-[#718096] mb-4">Coba cari kata kunci seperti &apos;WebGL&apos;, &apos;Fintech&apos;, atau reset filter pencarian Anda.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua Portal');
              }}
              className="px-5 py-2.5 rounded-full bg-[#1B3A6B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2B6CB0] transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
