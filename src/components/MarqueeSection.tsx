import React, { useState, useEffect, useRef } from 'react';
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

  // Duplicate items 2 times for seamless infinite continuous looping
  const row1Items = [...MARQUEE_ROW_1, ...MARQUEE_ROW_1];
  const row2Items = [...MARQUEE_ROW_2, ...MARQUEE_ROW_2];

  // Mouse & Touch Drag Handlers for Row 1
  const handleMouseDown1 = (e: React.MouseEvent) => {
    if (!containerRef1.current) return;
    setIsDragging1(true);
    setIsPaused1(true);
    setStartX1(e.pageX - containerRef1.current.offsetLeft);
    setScrollLeft1(containerRef1.current.scrollLeft);
  };

  const handleMouseUp1 = () => {
    setIsDragging1(false);
    setTimeout(() => setIsPaused1(false), 500);
  };

  const handleMouseMove1 = (e: React.MouseEvent) => {
    if (!isDragging1 || !containerRef1.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef1.current.offsetLeft;
    const walk = (x - startX1) * 1.5;
    containerRef1.current.scrollLeft = scrollLeft1 - walk;
  };

  // Mouse & Touch Drag Handlers for Row 2
  const handleMouseDown2 = (e: React.MouseEvent) => {
    if (!containerRef2.current) return;
    setIsDragging2(true);
    setIsPaused2(true);
    setStartX2(e.pageX - containerRef2.current.offsetLeft);
    setScrollLeft2(containerRef2.current.scrollLeft);
  };

  const handleMouseUp2 = () => {
    setIsDragging2(false);
    setTimeout(() => setIsPaused2(false), 500);
  };

  const handleMouseMove2 = (e: React.MouseEvent) => {
    if (!isDragging2 || !containerRef2.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef2.current.offsetLeft;
    const walk = (x - startX2) * 1.5;
    containerRef2.current.scrollLeft = scrollLeft2 - walk;
  };

  // Manual Nudge Buttons
  const nudgeRow1 = (direction: 'left' | 'right') => {
    if (containerRef1.current) {
      containerRef1.current.scrollBy({
        left: direction === 'left' ? -380 : 380,
        behavior: 'smooth'
      });
    }
  };

  const nudgeRow2 = (direction: 'left' | 'right') => {
    if (containerRef2.current) {
      containerRef2.current.scrollBy({
        left: direction === 'left' ? -380 : 380,
        behavior: 'smooth'
      });
    }
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

      {/* Row 1 - Draggable Marquee */}
      <div className="relative group mb-6">
        {/* Navigation Arrows on Hover */}
        <button
          onClick={() => nudgeRow1('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 border border-[#E2E8F0] text-[#1B3A6B] shadow-lg flex items-center justify-center hover:bg-[#1B3A6B] hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          title="Geser Kiri"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => nudgeRow1('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 border border-[#E2E8F0] text-[#1B3A6B] shadow-lg flex items-center justify-center hover:bg-[#1B3A6B] hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          title="Geser Kanan"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div
          ref={containerRef1}
          onMouseDown={handleMouseDown1}
          onMouseUp={handleMouseUp1}
          onMouseMove={handleMouseMove1}
          onMouseLeave={() => {
            setIsDragging1(false);
            setTimeout(() => setIsPaused1(false), 500);
          }}
          className="overflow-hidden px-6"
        >
          <div
            ref={innerRef1}
            className={`flex gap-4 will-change-transform ${isDragging1 ? 'cursor-grabbing' : 'cursor-grab'} ${!isPaused1 ? 'animate-marquee-right' : ''}`}
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
                className="relative flex-shrink-0 w-[300px] sm:w-[380px] md:w-[420px] h-[190px] sm:h-[230px] md:h-[260px] rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] shadow-md group/card transition-all duration-300 hover:shadow-xl hover:border-[#2B6CB0] hover:-translate-y-1 cursor-pointer"
              >
                <img
                  src={item.previewImage || item.customImage || `https://image.thum.io/get/width/1280/crop/800/noanimate/${item.url}`}
                  alt={item.title}
                  loading="lazy"
                  draggable={false}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = item.gif;
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105 pointer-events-none"
                />

                {/* Status & Live Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1B3A6B]/90 text-white backdrop-blur-md border border-white/20">
                    {item.company}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-[#059669] backdrop-blur-md flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Live Web
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/95 via-[#1B3A6B]/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-end justify-between text-white">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#E86547]">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-base sm:text-lg text-white leading-tight mt-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#E2E8F0] line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#D94F2B] text-white flex items-center justify-center shadow-md flex-shrink-0 ml-3">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 - Draggable Marquee Opposite Direction */}
      <div className="relative group">
        <button
          onClick={() => nudgeRow2('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 border border-[#E2E8F0] text-[#1B3A6B] shadow-lg flex items-center justify-center hover:bg-[#1B3A6B] hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          title="Geser Kiri"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => nudgeRow2('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 border border-[#E2E8F0] text-[#1B3A6B] shadow-lg flex items-center justify-center hover:bg-[#1B3A6B] hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          title="Geser Kanan"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div
          ref={containerRef2}
          onMouseDown={handleMouseDown2}
          onMouseUp={handleMouseUp2}
          onMouseMove={handleMouseMove2}
          onMouseLeave={() => {
            setIsDragging2(false);
            setTimeout(() => setIsPaused2(false), 500);
          }}
          className="overflow-hidden px-6"
        >
          <div
            ref={innerRef2}
            className={`flex gap-4 will-change-transform ${isDragging2 ? 'cursor-grabbing' : 'cursor-grab'} ${!isPaused2 ? 'animate-marquee-left' : ''}`}
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
                className="relative flex-shrink-0 w-[300px] sm:w-[380px] md:w-[420px] h-[190px] sm:h-[230px] md:h-[260px] rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] shadow-md group/card transition-all duration-300 hover:shadow-xl hover:border-[#2B6CB0] hover:-translate-y-1 cursor-pointer"
              >
                <img
                  src={item.previewImage || item.customImage || `https://image.thum.io/get/width/1280/crop/800/noanimate/${item.url}`}
                  alt={item.title}
                  loading="lazy"
                  draggable={false}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = item.gif;
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105 pointer-events-none"
                />

                {/* Status & Live Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1B3A6B]/90 text-white backdrop-blur-md border border-white/20">
                    {item.company}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-[#059669] backdrop-blur-md flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Live Web
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/95 via-[#1B3A6B]/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-end justify-between text-white">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#E86547]">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-base sm:text-lg text-white leading-tight mt-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#E2E8F0] line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#D94F2B] text-white flex items-center justify-center shadow-md flex-shrink-0 ml-3">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
