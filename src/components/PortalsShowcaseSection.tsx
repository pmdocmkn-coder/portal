import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { 
  CaretLeft, CaretRight, SquaresFour, Gear, CarProfile, Buildings, ShieldCheck, 
  FileText, BookOpen, Users as UsersIcon, Lightning, Globe, Wrench, ChartBar, 
  Briefcase, Heart 
} from '@phosphor-icons/react';
import { MarqueeItem } from '../data/portalData';
import workerImage from '../assets/images/real_worker2.png';
import { supabase } from '../lib/supabase';

const getCategoryIcon = (iconName?: string) => {
  const icons: Record<string, any> = {
    Gear, CarProfile, Buildings, ShieldCheck, FileText, BookOpen, 
    UsersIcon, Lightning, Globe, Wrench, ChartBar, Briefcase, Heart
  };
  return iconName && icons[iconName] ? icons[iconName] : null;
};

export const PortalsShowcaseSection: React.FC<{ onClose?: () => void, isClosing?: boolean }> = ({ onClose, isClosing }) => {
  const [portals, setPortals] = useState<MarqueeItem[]>([]);
  const [dbCategories, setDbCategories] = useState<{name: string, icon?: string}[]>([]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [siteSettings, setSiteSettings] = useState<any>({});
  const showcaseScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [portalsRes, catsRes, settingsRes] = await Promise.all([
        supabase.from('portal_items').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false }),
        supabase.from('categories').select('name, icon').eq('is_active', true).order('display_order', { ascending: true }),
        supabase.from('site_settings').select('*').eq('id', 1).single()
      ]);

      if (portalsRes.data) {
        const mappedPortals = portalsRes.data.map((item: any) => ({
          ...item,
          customIcon: item.custom_image
        }));
        setPortals(mappedPortals as MarqueeItem[]);
      }

      if (catsRes.data) {
        setDbCategories(catsRes.data);
      }
      
      if (settingsRes.data) {
        setSiteSettings(settingsRes.data);
      }
    };
    fetchData();

    const channel = supabase.channel('public_showcase_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'portal_items' }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setItemsPerPage(6); // xl screens: 3 cols x 2 rows
      else if (window.innerWidth >= 1024) setItemsPerPage(4); // lg screens: 2 cols x 2 rows
      else if (window.innerWidth >= 768) setItemsPerPage(4); // md screens: 2 cols x 2 rows
      else setItemsPerPage(12); // mobile: 4 cols x 3 rows (icon grid)
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = useMemo(() => {
    const defaultCat = { name: 'Semua', icon: 'SquaresFour' };
    if (dbCategories.length > 0) {
      return [defaultCat, ...dbCategories];
    }
    const uniqueCategories = new Set(portals.map(p => p.category).filter(Boolean));
    return [defaultCat, ...Array.from(uniqueCategories).map(name => ({ name, icon: 'Gear' }))];
  }, [dbCategories, portals]);

  const filteredPortals = useMemo(() => {
    if (activeCategory === 'Semua') return portals;
    return portals.filter(portal => portal.category.includes(activeCategory));
  }, [portals, activeCategory]);

  const totalPages = Math.ceil(filteredPortals.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(0);
    // Reset scroll position when category changes
    if (showcaseScrollRef.current) {
      showcaseScrollRef.current.scrollTo({ left: 0 });
    }
  }, [activeCategory, itemsPerPage]);

  const nextPage = () => {
    const newPage = Math.min(totalPages - 1, currentPage + 1);
    setCurrentPage(newPage);
    if (showcaseScrollRef.current) {
      showcaseScrollRef.current.scrollTo({ left: newPage * showcaseScrollRef.current.clientWidth, behavior: 'smooth' });
    }
  };
  const prevPage = () => {
    const newPage = Math.max(0, currentPage - 1);
    setCurrentPage(newPage);
    if (showcaseScrollRef.current) {
      showcaseScrollRef.current.scrollTo({ left: newPage * showcaseScrollRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        @keyframes showcaseFadeIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes showcaseFadeOut {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(30px); }
        }
        .animate-showcase-in { animation: showcaseFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-showcase-out { animation: showcaseFadeOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      <section 
        id="portals-showcase" 
        className={`fixed inset-0 z-[100] w-full bg-slate-50 ${isClosing ? 'animate-showcase-out' : 'animate-showcase-in'}`}
      >
        {/* Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50 to-[#E85D44] pointer-events-none"></div>

         {/* Scrollable Content Layer */}
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
          <div className="min-h-screen w-full flex flex-col justify-start md:justify-center py-8 md:py-24 px-4 sm:px-6 lg:px-12 relative z-10">
      
            {/* Global Close Button */}
            {onClose && (
              <button 
                onClick={onClose}
                className="fixed right-4 top-4 md:right-10 md:top-10 p-2.5 md:p-3 text-slate-400 hover:text-[#0B1B3D] bg-white/50 hover:bg-white rounded-full transition-all z-50 backdrop-blur-md border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md group"
              >
                <X className="w-5 h-5 md:w-7 md:h-7 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            )}

            {/* MOBILE ONLY: Text Header appears top */}
            <div className="w-full lg:hidden text-center mb-4 pt-2">
              {siteSettings.explore_title && (
                <h2 className="text-2xl md:text-5xl font-black text-[#0B1B3D] tracking-tight mb-2 leading-[1.15]" dangerouslySetInnerHTML={{ __html: siteSettings.explore_title.replace(/\n/g, '<br/>').replace(/\*(.*?)\*/g, '<span class="text-[#E85D44]">$1</span>') }}>
                </h2>
              )}
              {siteSettings.explore_subtitle && (
                <p className="text-slate-600 text-xs md:text-base leading-relaxed max-w-lg mx-auto font-medium">
                  {siteSettings.explore_subtitle}
                </p>
              )}
            </div>

            <div className="max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row gap-4 lg:gap-12 items-center lg:items-center relative z-10">
              
              {/* Left Column: Character Image */}
              <div className="w-full lg:w-2/5 xl:w-[45%] flex justify-center lg:justify-center relative">
                 <div className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] aspect-square relative group z-10">
                   {/* Main Image Container */}
                   <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_20px_50px_rgba(232,93,68,0.25)] transition-all duration-500">
                     <img src={siteSettings.explore_image_url || workerImage} alt="Karakter Ekosistem MKN" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03] group-hover:drop-shadow-[0_20px_40px_rgba(232,93,68,0.4)]" />
                   </div>
                 </div>
              </div>

              {/* Right Column: Text + Tabs + Slider Grid */}
              <div className="w-full lg:w-3/5 xl:w-[55%] flex flex-col relative mt-2 lg:mt-0">

                 {/* DESKTOP ONLY: Text Header */}
                  <div className="hidden lg:block text-left mb-8 xl:mb-10">
                   {siteSettings.explore_title && (
                     <h2 className="text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-black text-[#0B1B3D] tracking-tight mb-4 leading-[1.15]" dangerouslySetInnerHTML={{ __html: siteSettings.explore_title.replace(/\n/g, '<br/>').replace(/\*(.*?)\*/g, '<span class="text-[#E85D44]">$1</span>') }}>
                     </h2>
                   )}
                   {siteSettings.explore_subtitle && (
                     <p className="text-slate-600 text-sm md:text-base xl:text-lg leading-relaxed max-w-xl font-medium">
                       {siteSettings.explore_subtitle}
                     </p>
                   )}
                 </div>

                 {/* Pill Tabs */}
                 <div className="w-full flex justify-start lg:justify-start mb-3 md:mb-8 px-0 -mx-4 lg:mx-0">
                   <div className="flex flex-row overflow-x-auto gap-2 sm:gap-2.5 hide-scrollbar py-1 px-4 lg:px-1 w-full">
                     {categories.map(cat => {
                        const isActive = activeCategory === cat.name;
                        const IconComp = cat.icon === 'SquaresFour' ? SquaresFour : getCategoryIcon(cat.icon) || Gear;
                        
                        return (
                          <button
                            key={cat.name}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                              isActive 
                                ? 'bg-[#0B1B3D] text-white' 
                                : 'bg-white text-[#0B1B3D] hover:bg-slate-50'
                            }`}
                          >
                            <IconComp className="w-4 h-4 md:w-5 md:h-5" weight={isActive ? 'fill' : 'bold'} />
                            {cat.name}
                          </button>
                        );
                     })}
                   </div>
                 </div>
                 
                 {/* Slider Layout */}
                 {/* Swipeable scroll-snap slider */}
                 <div className="w-full">
                   <div className="flex items-center gap-3 w-full group/slider">
                    {/* Left Arrow - hidden on mobile */}
                    <div className="hidden md:flex shrink-0 w-11 items-center justify-center">
                      {totalPages > 1 && (
                        <button 
                          onClick={prevPage}
                          disabled={currentPage === 0}
                          className="w-11 h-11 bg-white/20 hover:bg-white/30 disabled:opacity-0 disabled:pointer-events-none flex items-center justify-center rounded-full backdrop-blur-md transition-all"
                        >
                          <CaretLeft className="w-5 h-5 text-white" weight="bold" />
                        </button>
                      )}
                    </div>

                    {/* Cards Grid - Swipeable */}
                    <div 
                      ref={showcaseScrollRef}
                      className="flex-1 flex gap-2 sm:gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                      onScroll={() => {
                        if (showcaseScrollRef.current) {
                          const el = showcaseScrollRef.current;
                          const pageWidth = el.clientWidth;
                          const newPage = Math.round(el.scrollLeft / pageWidth);
                          if (newPage !== currentPage) {
                            setCurrentPage(newPage);
                          }
                        }
                      }}
                    >
                      {Array.from({ length: totalPages || 1 }).map((_, pageIndex) => (
                        <div key={pageIndex} className="w-full shrink-0 snap-start snap-always">
                          {/* Mobile: 4-col icon grid | Tablet: 2-col | Desktop: 3-col */}
                          <div className="grid grid-cols-4 sm:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4 lg:gap-5 w-full">
                            {filteredPortals.length > 0 ? (
                              filteredPortals.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((portal, idx) => {
                                let displayTitle = portal.title.replace(' Portal', '');
                                return (
                                  <a 
                                    key={`${portal.id}-${idx}`} 
                                    href={portal.url} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => supabase.rpc('increment_portal_click', { p_portal_id: portal.id })}
                                    className="group relative flex 
                                      flex-col items-center text-center gap-2 p-3 rounded-2xl 
                                      sm:flex-row sm:items-center sm:text-left sm:gap-4 sm:p-4 sm:rounded-2xl 
                                      bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-[#E85D44] hover:border-[#E85D44] hover:shadow-[0_8px_30px_rgba(232,93,68,0.4)] transition-all duration-300 w-full"
                                  >
                                    {/* Icon Box */}
                                    <div className={`w-11 h-11 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-105 ${!portal.customIcon ? 'rounded-full bg-white p-1 border-2 border-white/90 shadow-sm overflow-hidden' : ''}`}>
                                      {portal.customIcon ? (
                                        <img src={portal.customIcon} alt={displayTitle} className="w-full h-full object-contain rounded-[10px]" />
                                      ) : (
                                        <div className="w-full h-full rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black text-[#E85D44] bg-[#E85D44]/10">
                                          MKN
                                        </div>
                                      )}
                                    </div>
              
                                    {/* Text */}
                                    <div className="flex flex-col relative z-10 sm:flex-grow sm:pr-4 w-full justify-center min-w-0">
                                      <h3 className="text-[10px] leading-tight min-h-[2.4em] sm:min-h-0 sm:text-[15px] font-bold text-white sm:leading-[1.2] transition-colors line-clamp-2">
                                        {displayTitle}
                                      </h3>
                                    </div>
                                  </a>
                                );
                              })
                            ) : (
                              <div className="col-span-full flex flex-col items-center justify-center py-12">
                                <p className="text-slate-600 text-sm font-medium">Tidak ada portal dalam kategori ini.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Arrow - hidden on mobile */}
                    <div className="hidden md:flex shrink-0 w-11 items-center justify-center">
                      {totalPages > 1 && (
                        <button 
                          onClick={nextPage}
                          disabled={currentPage === totalPages - 1}
                          className="w-11 h-11 bg-white/20 hover:bg-white/30 disabled:opacity-0 disabled:pointer-events-none flex items-center justify-center rounded-full backdrop-blur-md transition-all"
                        >
                          <CaretRight className="w-5 h-5 text-white" weight="bold" />
                        </button>
                      )}
                    </div>
                   </div>

                   {/* Pagination Dots */}
                   {totalPages > 1 && (
                    <div className="w-full flex justify-center gap-2 mt-6 sm:mt-8">
                      {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setCurrentPage(idx);
                            if (showcaseScrollRef.current) {
                              showcaseScrollRef.current.scrollTo({ left: idx * showcaseScrollRef.current.clientWidth, behavior: 'smooth' });
                            }
                          }}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            currentPage === idx 
                              ? 'w-6 bg-white shadow-sm' 
                              : 'w-2 bg-white/40 hover:bg-white/60'
                          }`}
                          aria-label={`Go to page ${idx + 1}`}
                        />
                      ))}
                    </div>
                   )}
                 </div>

              </div>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
