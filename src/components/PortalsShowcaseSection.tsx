import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, ArrowRight, X } from 'lucide-react';
import { MarqueeItem } from '../data/portalData';
import workerImage from '../assets/images/real_worker2.png';
import { supabase } from '../lib/supabase';

export const PortalsShowcaseSection: React.FC<{ onClose?: () => void, isClosing?: boolean }> = ({ onClose, isClosing }) => {
  const [isShowingAll, setIsShowingAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [portals, setPortals] = useState<MarqueeItem[]>([]);

  React.useEffect(() => {
    const fetchPortals = async () => {
      const { data } = await supabase.from('portal_items').select('*').order('created_at', { ascending: false });
      if (data) {
        setPortals(data as MarqueeItem[]);
      }
    };
    fetchPortals();
  }, []);

  // Extract unique categories for the filter tabs
  const categories = ['Semua', 'Operasional', 'Manajemen', 'Training', 'Layanan', 'Keamanan'];

  // Filter logic
  const filteredPortals = portals.filter(portal => {
    if (activeCategory === 'Semua') return true;
    return portal.category.includes(activeCategory);
  });

  // Display max 8 items (2 rows of 4) unless "Load More" is clicked
  const displayPortals = isShowingAll ? filteredPortals : filteredPortals.slice(0, 8);

  const renderPortalCard = (portal: any, idx: number) => {
    let displayTitle = portal.title.replace(' Portal', '');
    
    return (
      <a 
        key={`${portal.id}-${idx}`} 
        href={portal.url} 
        className="group relative flex flex-col md:flex-row items-center md:items-center justify-start text-center md:text-left gap-2 md:gap-4 p-2.5 md:p-5 rounded-[1rem] md:rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden w-full"
      >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-50/50 group-hover:to-orange-50/50 transition-all duration-500"></div>

        {/* Icon Circle */}
        <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 p-1.5 md:p-2.5 relative z-10 group-hover:scale-105 transition-transform duration-300">
          {portal.customIcon ? (
            <img src={portal.customIcon} alt={displayTitle} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-black text-slate-500">
              MKN
            </div>
          )}
        </div>

        {/* Text */}
        <div className="flex flex-col relative z-10 justify-center w-full">
          <h3 className="text-[10px] sm:text-[11px] md:text-sm font-bold text-slate-900 leading-[1.2] md:leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 md:line-clamp-2 mt-0.5 md:mt-0">
            {displayTitle}
          </h3>
        </div>
      </a>
    );
  };

  return (
    <>
      <style>{`
        @keyframes showcaseFadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes showcaseFadeOut {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(30px);
          }
        }
        @keyframes morphBlob {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
        .animate-showcase-in {
          animation: showcaseFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-showcase-out {
          animation: showcaseFadeOut 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-blob {
          animation: morphBlob 8s ease-in-out infinite;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        }
      `}</style>
      <section 
        id="portals-showcase" 
        className={`fixed inset-0 z-[100] w-full bg-slate-50 ${isClosing ? 'animate-showcase-out' : 'animate-showcase-in'}`}
      >
        {/* Background Layer (Fixed to Section) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50 to-[#E85D44] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-60 pointer-events-none"></div>

        {/* Scrollable Content Layer */}
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
          <div className="min-h-screen w-full flex flex-col justify-start md:justify-center py-16 md:py-24 px-6 lg:px-12 relative z-10">
      
      {/* Global Close Button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="fixed right-6 top-6 md:right-10 md:top-10 p-3 text-slate-400 hover:text-[#0B1B3D] bg-white/50 hover:bg-white rounded-full transition-all z-50 backdrop-blur-md border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md group"
          title="Tutup Eksplorasi Portal"
        >
          <X className="w-6 h-6 md:w-7 md:h-7 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      )}

      {/* MOBILE ONLY: Text Header appears top */}
      <div className="w-full lg:hidden text-center mb-10 pt-4">
        <h2 className="text-3xl md:text-5xl font-black text-[#0B1B3D] tracking-tight mb-3 leading-[1.15]">
          Makin Produktif dengan <br/>
          <span className="text-[#E85D44]">Ekosistem MKN</span>
        </h2>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-lg mx-auto font-medium">
          Lengkapi dan integrasikan semua aktivitas digital operasional Anda dengan layanan dan portal manajemen tingkat *enterprise* dari kami.
        </p>
      </div>

      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-center relative z-10">
        
        {/* Left Column: Clean Visual */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-center relative">
           <div className="w-full max-w-[340px] md:max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] aspect-square relative group z-10">
             
             {/* Main Image Container - Transparent PNG without background box */}
             <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_20px_50px_rgba(232,93,68,0.25)] transition-all duration-500">
               <img src={workerImage} alt="Karakter Ekosistem MKN" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03] group-hover:drop-shadow-[0_20px_40px_rgba(232,93,68,0.4)]" />
             </div>
             
           </div>
        </div>

        {/* Right Column: Text + Tabs + Grid */}
        <div className="w-full lg:w-1/2 flex flex-col relative mt-2 lg:mt-0">

           {/* DESKTOP ONLY: Authoritative Text Header */}
           <div className="hidden lg:block text-left mb-10">
             <h2 className="text-4xl md:text-5xl lg:text-[2.75rem] font-black text-[#0B1B3D] tracking-tight mb-4 leading-[1.15]">
               Makin Produktif dengan <br className="hidden lg:block"/>
               <span className="text-[#E85D44]">Ekosistem MKN</span>
             </h2>
             <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-lg font-medium">
               Lengkapi dan integrasikan semua aktivitas digital operasional Anda dengan layanan dan portal manajemen tingkat *enterprise* dari kami.
             </p>
           </div>

           {/* Pill Tabs */}
           <div className="w-full flex justify-center lg:justify-start mb-6 md:mb-8">
             <div className="flex flex-row overflow-x-auto gap-2 hide-scrollbar py-1 px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
               {categories.map(cat => (
                 <button
                   key={cat}
                   onClick={() => {
                     setActiveCategory(cat);
                     setIsShowingAll(false);
                   }}
                   className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 border ${
                     activeCategory === cat 
                       ? 'bg-[#0B1B3D] text-white border-[#0B1B3D] shadow-md shadow-[#0B1B3D]/30' 
                       : 'bg-white/80 text-slate-700 border-white shadow-sm hover:border-white hover:text-[#0B1B3D] hover:bg-white backdrop-blur-sm'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
           </div>
           
           {/* Grid Layout */}
           <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-2 sm:gap-4 lg:gap-5 w-full px-2 lg:px-0">
              {displayPortals.length > 0 ? (
                displayPortals.map((portal, idx) => {
                  let displayTitle = portal.title.replace(' Portal', '');
                  
                  return (
                    <a 
                      key={`${portal.id}-${idx}`} 
                      href={portal.url} 
                      className="group relative flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-start text-center lg:text-left gap-2 lg:gap-4 p-3 sm:p-4 rounded-[1.25rem] lg:rounded-2xl bg-white/30 backdrop-blur-xl border border-white/40 shadow-sm hover:bg-white/50 hover:border-white/60 hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-full aspect-square lg:aspect-auto"
                    >
                      {/* Icon Box */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full lg:rounded-[14px] bg-white flex items-center justify-center p-2 lg:p-2.5 relative z-10 transition-transform duration-300 shadow-sm border border-slate-100 group-hover:scale-105">
                        {portal.customIcon ? (
                          <img src={portal.customIcon} alt={displayTitle} className="w-full h-full object-contain" />
                        ) : (
                          <div className="w-full h-full rounded-md flex items-center justify-center text-[10px] md:text-xs font-black text-[#E85D44]">
                            MKN
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex flex-col relative z-10 flex-grow pr-0 lg:pr-6 w-full items-center lg:items-start justify-center">
                        <h3 className="text-[11px] sm:text-xs lg:text-sm font-bold text-[#0B1B3D] leading-[1.2] lg:leading-snug group-hover:text-[#E85D44] transition-colors line-clamp-2">
                          {displayTitle}
                        </h3>
                      </div>

                      {/* Arrow Icon - Desktop Only */}
                      <div className="hidden lg:block absolute right-4 text-slate-300 group-hover:text-[#E85D44] transform translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </a>
                  );
                })
              ) : (
               <div className="col-span-full flex flex-col items-center justify-center py-12">
                 <p className="text-white/80 text-sm font-medium">Tidak ada portal dalam kategori ini.</p>
               </div>
             )}
           </div>
           
             {/* Load More Button */}
           {!isShowingAll && filteredPortals.length > 8 && (
             <div className="w-full flex justify-center mt-8">
               <button 
                 onClick={() => setIsShowingAll(true)}
                 className="px-8 py-3 rounded-full border border-white/40 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group"
               >
                 Lihat Semua Portal
                 <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 group-hover:text-white transition-all" />
               </button>
             </div>
           )}
        </div>
        
        {/* Hide Webkit Scrollbar globally for this block if not already hidden */}
        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
      </div>
      </div>
    </section>
    </>
  );
};
