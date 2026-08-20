import React, { useState, useEffect, useMemo } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      const [portalsRes, catsRes, settingsRes] = await Promise.all([
        supabase.from('portal_items').select('*').order('created_at', { ascending: false }),
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
      if (window.innerWidth >= 1280) setItemsPerPage(6); // xl screens
      else if (window.innerWidth >= 1024) setItemsPerPage(4); // lg screens (2 cols x 2 rows fit better on right half)
      else if (window.innerWidth >= 768) setItemsPerPage(4);
      else setItemsPerPage(4);
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
  }, [activeCategory, itemsPerPage]);

  const nextPage = () => setCurrentPage(p => Math.min(totalPages - 1, p + 1));
  const prevPage = () => setCurrentPage(p => Math.max(0, p - 1));

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
          <div className="min-h-screen w-full flex flex-col justify-start md:justify-center py-16 md:py-24 px-6 lg:px-12 relative z-10">
      
            {/* Global Close Button */}
            {onClose && (
              <button 
                onClick={onClose}
                className="fixed right-6 top-6 md:right-10 md:top-10 p-3 text-slate-400 hover:text-[#0B1B3D] bg-white/50 hover:bg-white rounded-full transition-all z-50 backdrop-blur-md border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md group"
              >
                <X className="w-6 h-6 md:w-7 md:h-7 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            )}

            {/* MOBILE ONLY: Text Header appears top */}
            <div className="w-full lg:hidden text-center mb-10 pt-4">
              {siteSettings.explore_title && (
                <h2 className="text-3xl md:text-5xl font-black text-[#0B1B3D] tracking-tight mb-3 leading-[1.15]" dangerouslySetInnerHTML={{ __html: siteSettings.explore_title.replace(/\n/g, '<br/>').replace(/\*(.*?)\*/g, '<span class="text-[#E85D44]">$1</span>') }}>
                </h2>
              )}
              {siteSettings.explore_subtitle && (
                <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-lg mx-auto font-medium">
                  {siteSettings.explore_subtitle}
                </p>
              )}
            </div>

            <div className="max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-center relative z-10">
              
              {/* Left Column: Character Image */}
              <div className="w-full lg:w-2/5 xl:w-[45%] flex justify-center lg:justify-center relative">
                 <div className="w-full max-w-[340px] md:max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] aspect-square relative group z-10">
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
                 <div className="w-full flex justify-start lg:justify-start mb-6 md:mb-8 px-0 -mx-4 lg:mx-0">
                   <div className="flex flex-row overflow-x-auto gap-2.5 hide-scrollbar py-1 px-4 lg:px-1 w-full">
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
                 <div className="relative w-full px-8 md:px-12 lg:px-0 lg:pr-12 xl:pr-14">
                    <div className="overflow-hidden w-full">
                      <div 
                        className="flex transition-transform duration-500 ease-in-out" 
                        style={{ transform: `translateX(-${currentPage * 100}%)` }}
                      >
                        {Array.from({ length: totalPages || 1 }).map((_, pageIndex) => (
                          <div key={pageIndex} className="w-full shrink-0 lg:pr-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 w-full">
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
                                      className="group relative flex flex-row items-center justify-start text-left gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 w-full"
                                    >
                                      {/* Icon Box */}
                                      <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-105 ${!portal.customIcon ? 'rounded-full bg-white p-1 border-2 border-white/90 shadow-sm overflow-hidden' : ''}`}>
                                        {portal.customIcon ? (
                                          <img src={portal.customIcon} alt={displayTitle} className="w-full h-full object-contain rounded-[10px]" />
                                        ) : (
                                          <div className="w-full h-full rounded-full flex items-center justify-center text-[10px] md:text-xs font-black text-[#E85D44] bg-[#E85D44]/10">
                                            MKN
                                          </div>
                                        )}
                                      </div>
                
                                      {/* Text */}
                                      <div className="flex flex-col relative z-10 flex-grow pr-4 w-full justify-center">
                                        <h3 className="text-sm md:text-[15px] font-bold text-white leading-[1.2] transition-colors line-clamp-2">
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
                    </div>

                    {/* Navigation Arrows for Slider */}
                    {totalPages > 1 && (
                      <>
                        <button 
                          onClick={prevPage}
                          disabled={currentPage === 0}
                          className="absolute left-0 md:left-2 lg:-left-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 disabled:opacity-0 flex items-center justify-center rounded-full backdrop-blur-md transition-all z-20"
                        >
                          <CaretLeft className="w-5 h-5 text-white" weight="bold" />
                        </button>
                        <button 
                          onClick={nextPage}
                          disabled={currentPage === totalPages - 1}
                          className="absolute right-0 md:right-2 lg:right-0 xl:right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 disabled:opacity-0 flex items-center justify-center rounded-full backdrop-blur-md transition-all z-20"
                        >
                          <CaretRight className="w-5 h-5 text-white" weight="bold" />
                        </button>
                      </>
                    )}
                 </div>

                 {/* Pagination Dots */}
                 {totalPages > 1 && (
                   <div className="w-full flex justify-center gap-2 mt-8 lg:pr-12">
                     {Array.from({ length: totalPages }).map((_, idx) => (
                       <button
                         key={idx}
                         onClick={() => setCurrentPage(idx)}
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
      </section>
    </>
  );
};
