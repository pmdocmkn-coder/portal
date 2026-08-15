import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MARQUEE_ROW_1, MARQUEE_ROW_2, MarqueeItem } from '../data/portalData';
import { PortalSite } from '../types';
import { Eye, MoveHorizontal, MousePointerClick, ChevronLeft, ChevronRight, Globe } from 'lucide-react';

interface MarqueeSectionProps {
  onSelectSite: (site: PortalSite) => void;
}

export const MarqueeSection: React.FC<MarqueeSectionProps> = ({ onSelectSite }) => {
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const innerRef1 = useRef<HTMLDivElement>(null);
  const innerRef2 = useRef<HTMLDivElement>(null);

  const [isDragging1, setIsDragging1] = useState(false);
  const [startX1, setStartX1] = useState(0);
  const [scrollLeft1, setScrollLeft1] = useState(0);

  const [isDragging2, setIsDragging2] = useState(false);
  const [startX2, setStartX2] = useState(0);
  const [scrollLeft2, setScrollLeft2] = useState(0);

  const [isPaused1, setIsPaused1] = useState(false);
  const [isPaused2, setIsPaused2] = useState(false);
  
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [isTransitioning1, setIsTransitioning1] = useState(false);
  const [isTransitioning2, setIsTransitioning2] = useState(false);

  // Duplicate items 3 times for seamless infinite continuous looping
  const row1Items = [...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1];
  const row2Items = [...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2];

  // Smooth scroll with easing function
  const smoothScrollTo = useCallback((container: HTMLDivElement, targetScrollLeft: number, duration: number = 500) => {
    const startScrollLeft = container.scrollLeft;
    const distance = targetScrollLeft - startScrollLeft;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function (ease-out-cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      container.scrollLeft = startScrollLeft + (distance * easeOutCubic);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    requestAnimationFrame(animateScroll);
  }, []);

  // Enhanced navigation with smooth scrolling and carousel logic
  const navigateCarousel = useCallback((rowNumber: 1 | 2, direction: 'left' | 'right') => {
    const container = rowNumber === 1 ? containerRef1.current : containerRef2.current;
    const currentIndex = rowNumber === 1 ? currentIndex1 : currentIndex2;
    const setCurrentIndex = rowNumber === 1 ? setCurrentIndex1 : setCurrentIndex2;
    const setIsTransitioning = rowNumber === 1 ? setIsTransitioning1 : setIsTransitioning2;
    const items = rowNumber === 1 ? MARQUEE_ROW_1 : MARQUEE_ROW_2;
    
    if (!container || isTransitioning1 || isTransitioning2) return;
    
    setIsTransitioning(true);
    
    const cardWidth = 420; // Width of each card + gap
    const cardsPerView = Math.floor(container.clientWidth / cardWidth);
    const maxIndex = items.length - cardsPerView;
    
    let newIndex = currentIndex;
    if (direction === 'right') {
      newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    }
    
    const targetScrollLeft = newIndex * cardWidth;
    
    smoothScrollTo(container, targetScrollLeft, 600);
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [currentIndex1, currentIndex2, isTransitioning1, isTransitioning2, smoothScrollTo]);

  // Enhanced Mouse & Touch Drag Handlers for Row 1
  const handleMouseDown1 = (e: React.MouseEvent) => {
    if (!containerRef1.current) return;
    setIsDragging1(true);
    setIsPaused1(true);
    setStartX1(e.pageX - containerRef1.current.offsetLeft);
    setScrollLeft1(containerRef1.current.scrollLeft);
    containerRef1.current.style.scrollBehavior = 'auto';
  };

  const handleMouseUp1 = () => {
    if (containerRef1.current) {
      containerRef1.current.style.scrollBehavior = 'smooth';
    }
    setIsDragging1(false);
    setTimeout(() => setIsPaused1(false), 800);
  };

  const handleMouseMove1 = (e: React.MouseEvent) => {
    if (!isDragging1 || !containerRef1.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef1.current.offsetLeft;
    const walk = (x - startX1) * 2; // Increased multiplier for more responsive dragging
    containerRef1.current.scrollLeft = scrollLeft1 - walk;
  };

  // Enhanced Mouse & Touch Drag Handlers for Row 2
  const handleMouseDown2 = (e: React.MouseEvent) => {
    if (!containerRef2.current) return;
    setIsDragging2(true);
    setIsPaused2(true);
    setStartX2(e.pageX - containerRef2.current.offsetLeft);
    setScrollLeft2(containerRef2.current.scrollLeft);
    containerRef2.current.style.scrollBehavior = 'auto';
  };

  const handleMouseUp2 = () => {
    if (containerRef2.current) {
      containerRef2.current.style.scrollBehavior = 'smooth';
    }
    setIsDragging2(false);
    setTimeout(() => setIsPaused2(false), 800);
  };

  const handleMouseMove2 = (e: React.MouseEvent) => {
    if (!isDragging2 || !containerRef2.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef2.current.offsetLeft;
    const walk = (x - startX2) * 2; // Increased multiplier for more responsive dragging
    containerRef2.current.scrollLeft = scrollLeft2 - walk;
  };

  // Manual Navigation with enhanced smooth scrolling
  const nudgeRow1 = (direction: 'left' | 'right') => {
    navigateCarousel(1, direction);
  };

  const nudgeRow2 = (direction: 'left' | 'right') => {
    navigateCarousel(2, direction);
  };

  return (
    <section className="relative bg-[#F7F8FA] border-y border-[#E2E8F0] py-16 overflow-hidden select-none">
      {/* Header Info & Drag Instruction Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D94F2B] animate-ping" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B3A6B]">
              MKN Live Company Portal Showcase
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A202C]">
            Interactive Showcase Captures
          </h2>
        </div>

        {/* Mouse Drag Banner Callout */}
        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-full border border-[#E2E8F0] shadow-sm">
          <div className="w-8 h-8 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center animate-pulse">
            <MoveHorizontal className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#1B3A6B] flex items-center gap-1">
              Geser pake mouse/cursor
              <MousePointerClick className="w-3.5 h-3.5 text-[#D94F2B]" />
            </p>
            <p className="text-[11px] text-[#718096]">Klik & tahan cursor untuk menggeser galeri</p>
          </div>
        </div>
      </div>

      {/* Row 1 - Enhanced Draggable Marquee */}
      <div className="relative group mb-8">
        {/* Enhanced Navigation Arrows with Better Spacing */}
        <button
          onClick={() => nudgeRow1('left')}
          disabled={isTransitioning1}
          className="absolute -left-8 sm:-left-12 md:-left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 backdrop-blur-md border-2 border-white/50 text-[#1B3A6B] shadow-xl flex items-center justify-center hover:bg-[#1B3A6B] hover:text-white hover:border-[#1B3A6B] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
          title="Geser Kiri"
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
        </button>
        <button
          onClick={() => nudgeRow1('right')}
          disabled={isTransitioning1}
          className="absolute -right-8 sm:-right-12 md:-right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 backdrop-blur-md border-2 border-white/50 text-[#1B3A6B] shadow-xl flex items-center justify-center hover:bg-[#1B3A6B] hover:text-white hover:border-[#1B3A6B] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
          title="Geser Kanan"
        >
          <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
        </button>

        <div
          ref={containerRef1}
          onMouseDown={handleMouseDown1}
          onMouseUp={handleMouseUp1}
          onMouseMove={handleMouseMove1}
          onMouseLeave={() => {
            setIsDragging1(false);
            setTimeout(() => setIsPaused1(false), 800);
          }}
          className="overflow-hidden carousel-smooth carousel-container"
          style={{ scrollBehavior: isDragging1 ? 'auto' : 'smooth' }}
        >
          <div
            ref={innerRef1}
            className={`flex gap-6 will-change-transform transition-transform duration-300 ease-out ${
              isDragging1 ? 'cursor-grabbing' : 'cursor-grab'
            } ${!isPaused1 ? 'animate-marquee-right' : ''}`}
            style={{ width: 'fit-content' }}
          >
            {row1Items.map((item, idx) => (
              <div
                key={`row1-${item.id}-${idx}`}
                onClick={() => {
                  if (!isDragging1) {
                    onSelectSite(item as unknown as PortalSite);
                  }
                }}
                className="relative flex-shrink-0 w-[300px] sm:w-[380px] md:w-[420px] h-[190px] sm:h-[230px] md:h-[260px] rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] shadow-lg group/card transition-all duration-500 hover:shadow-2xl hover:border-[#2B6CB0] hover:-translate-y-2 hover:scale-[1.02] cursor-pointer transform-gpu"
              >
                <img
                  src={item.previewImage || item.customImage || `https://s0.wp.com/mshots/v1/${encodeURIComponent(item.url)}?w=800`}
                  alt={item.title}
                  loading="lazy"
                  draggable={false}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = item.gif;
                  }}
                  className="w-full h-full object-cover transition-all duration-700 group-hover/card:scale-110 pointer-events-none"
                />

                {/* Status & Live Badge with Enhanced Animation */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#1B3A6B]/95 text-white backdrop-blur-md border border-white/30 shadow-lg">
                    {item.company}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-[11px] font-bold text-white bg-gradient-to-r from-[#059669] to-[#10B981] backdrop-blur-md flex items-center gap-1.5 shadow-lg animate-pulse">
                    <Globe className="w-3.5 h-3.5" />
                    Live Web
                  </span>
                </div>

                {/* Enhanced Hover Overlay with Smooth Animations */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/95 via-[#1B3A6B]/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <div className="flex items-end justify-between text-white transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                    <div className="flex-1">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#F97316] block mb-1">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-base sm:text-lg text-white leading-tight mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#E2E8F0] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D94F2B] to-[#F97316] text-white flex items-center justify-center shadow-lg flex-shrink-0 ml-4 hover:scale-110 transition-transform duration-300">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Subtle border glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl ring-2 ring-[#2B6CB0] ring-opacity-0 group-hover/card:ring-opacity-30 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 - Enhanced Draggable Marquee Opposite Direction */}
      <div className="relative group">
        <button
          onClick={() => nudgeRow2('left')}
          disabled={isTransitioning2}
          className="absolute -left-8 sm:-left-12 md:-left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 backdrop-blur-md border-2 border-white/50 text-[#1B3A6B] shadow-xl flex items-center justify-center hover:bg-[#1B3A6B] hover:text-white hover:border-[#1B3A6B] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
          title="Geser Kiri"
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
        </button>
        <button
          onClick={() => nudgeRow2('right')}
          disabled={isTransitioning2}
          className="absolute -right-8 sm:-right-12 md:-right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 backdrop-blur-md border-2 border-white/50 text-[#1B3A6B] shadow-xl flex items-center justify-center hover:bg-[#1B3A6B] hover:text-white hover:border-[#1B3A6B] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
          title="Geser Kanan"
        >
          <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
        </button>

        <div
          ref={containerRef2}
          onMouseDown={handleMouseDown2}
          onMouseUp={handleMouseUp2}
          onMouseMove={handleMouseMove2}
          onMouseLeave={() => {
            setIsDragging2(false);
            setTimeout(() => setIsPaused2(false), 800);
          }}
          className="overflow-hidden carousel-smooth carousel-container"
          style={{ scrollBehavior: isDragging2 ? 'auto' : 'smooth' }}
        >
          <div
            ref={innerRef2}
            className={`flex gap-6 will-change-transform transition-transform duration-300 ease-out ${
              isDragging2 ? 'cursor-grabbing' : 'cursor-grab'
            } ${!isPaused2 ? 'animate-marquee-left' : ''}`}
            style={{ width: 'fit-content' }}
          >
            {row2Items.map((item, idx) => (
              <div
                key={`row2-${item.id}-${idx}`}
                onClick={() => {
                  if (!isDragging2) {
                    onSelectSite(item as unknown as PortalSite);
                  }
                }}
                className="relative flex-shrink-0 w-[300px] sm:w-[380px] md:w-[420px] h-[190px] sm:h-[230px] md:h-[260px] rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] shadow-lg group/card transition-all duration-500 hover:shadow-2xl hover:border-[#2B6CB0] hover:-translate-y-2 hover:scale-[1.02] cursor-pointer transform-gpu"
              >
                <img
                  src={item.previewImage || item.customImage || `https://s0.wp.com/mshots/v1/${encodeURIComponent(item.url)}?w=800`}
                  alt={item.title}
                  loading="lazy"
                  draggable={false}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = item.gif;
                  }}
                  className="w-full h-full object-cover transition-all duration-700 group-hover/card:scale-110 pointer-events-none"
                />

                {/* Status & Live Badge with Enhanced Animation */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#1B3A6B]/95 text-white backdrop-blur-md border border-white/30 shadow-lg">
                    {item.company}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-[11px] font-bold text-white bg-gradient-to-r from-[#059669] to-[#10B981] backdrop-blur-md flex items-center gap-1.5 shadow-lg animate-pulse">
                    <Globe className="w-3.5 h-3.5" />
                    Live Web
                  </span>
                </div>

                {/* Enhanced Hover Overlay with Smooth Animations */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/95 via-[#1B3A6B]/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <div className="flex items-end justify-between text-white transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                    <div className="flex-1">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#F97316] block mb-1">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-base sm:text-lg text-white leading-tight mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#E2E8F0] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D94F2B] to-[#F97316] text-white flex items-center justify-center shadow-lg flex-shrink-0 ml-4 hover:scale-110 transition-transform duration-300">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Subtle border glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl ring-2 ring-[#2B6CB0] ring-opacity-0 group-hover/card:ring-opacity-30 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
