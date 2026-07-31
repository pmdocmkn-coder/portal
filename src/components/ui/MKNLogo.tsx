import React, { useState } from 'react';

interface MKNLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtext?: boolean;
  mediaUrl?: string;
  mediaType?: 'svg' | 'gif' | 'video';
  interactive?: boolean;
  onClick?: () => void;
}

export const MKNLogo: React.FC<MKNLogoProps> = ({
  className = '',
  size = 'md',
  showSubtext = true,
  mediaUrl,
  mediaType,
  interactive = false,
  onClick
}) => {
  const [hasMediaError, setHasMediaError] = useState(false);
  const activeMediaUrl = mediaUrl || '/mkn-logo.mp4';
  
  const heightMap = {
    sm: 'h-8',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16'
  };

  const detectedType = mediaType || (activeMediaUrl.endsWith('.mp4') || activeMediaUrl.endsWith('.webm') ? 'video' : 'gif');
  const showVideo = !hasMediaError && detectedType === 'video';
  const showGif = !hasMediaError && detectedType === 'gif' && activeMediaUrl !== '/mkn-logo.mp4';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${interactive ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Dynamic Animated Logo Container */}
      <div className={`relative flex-shrink-0 ${heightMap[size]} aspect-[2.2/1] flex items-center justify-center animate-logo-float`}>
        {showVideo ? (
          <video
            src={activeMediaUrl}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setHasMediaError(true)}
            className="h-full w-auto object-contain rounded-lg drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />
        ) : showGif ? (
          <img
            src={activeMediaUrl}
            alt="Synergy MKN Onwards Motion Logo"
            onError={() => setHasMediaError(true)}
            className="h-full w-auto object-contain rounded-lg drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <svg
            viewBox="0 0 220 100"
            className="w-auto h-full overflow-visible drop-shadow-md group-hover:scale-105 transition-all duration-300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Dynamic Animated Gradient for Ribbon Motion */}
              <linearGradient id="mknRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF5500">
                  <animate attributeName="stop-color" values="#FF5500;#D94F2B;#00A3E0;#FF5500" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="40%" stopColor="#D94F2B">
                  <animate attributeName="stop-color" values="#D94F2B;#1B3A6B;#FF5500;#D94F2B" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="70%" stopColor="#1B3A6B">
                  <animate attributeName="stop-color" values="#1B3A6B;#00A3E0;#D94F2B;#1B3A6B" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#00A3E0">
                  <animate attributeName="stop-color" values="#00A3E0;#FF5500;#1B3A6B;#00A3E0" dur="4s" repeatCount="indefinite" />
                </stop>
              </linearGradient>

              {/* Glowing Badge Gradient */}
              <linearGradient id="mknCircleGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1B3A6B" />
                <stop offset="100%" stopColor="#0F2447" />
              </linearGradient>

              {/* Liquid Gloss Shine Gradient */}
              <linearGradient id="mknShineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>

              <filter id="mknGlowShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComponentTransfer in="blur" result="glow">
                  <feFuncA type="linear" slope="0.5" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing Backdrop Path */}
            <path
              d="M 90,85 C 40,85 10,65 10,40 C 10,15 45,10 95,35 C 135,55 170,80 195,50 C 215,25 185,5 155,5 C 120,5 100,25 80,50"
              stroke="#D94F2B"
              strokeWidth="18"
              strokeLinecap="round"
              strokeOpacity="0.15"
              fill="none"
              className="animate-pulse"
            />

            {/* Main Fluid 3D Animated Infinity Ribbon */}
            <path
              d="M 90,85 C 40,85 10,65 10,40 C 10,15 45,10 95,35 C 135,55 170,80 195,50 C 215,25 185,5 155,5 C 120,5 100,25 80,50"
              stroke="url(#mknRibbonGrad)"
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#mknGlowShadow)"
            />

            {/* Highlight Liquid Wave Dash Overlay */}
            <path
              d="M 90,85 C 40,85 10,65 10,40 C 10,15 45,10 95,35 C 135,55 170,80 195,50 C 215,25 185,5 155,5 C 120,5 100,25 80,50"
              stroke="url(#mknShineGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              className="animate-ribbon-flow"
              strokeDasharray="60 300"
            />

            {/* Circle Badge at bottom left loop with animated pulse glow */}
            <g className="animate-logo-pulse">
              <circle cx="85" cy="72" r="23" fill="url(#mknCircleGrad)" stroke="#FF5500" strokeWidth="2.5" />
              <circle cx="85" cy="72" r="20" stroke="#00A3E0" strokeWidth="1.5" fill="none" />

              <text
                x="85"
                y="77"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="13"
                fontWeight="900"
                fontFamily="Kanit, sans-serif"
                letterSpacing="0.5"
              >
                MKN
              </text>
            </g>
          </svg>
        )}
      </div>

      {/* Brand Text */}
      {showSubtext && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-lg sm:text-xl tracking-tight text-[#1B3A6B] uppercase">
              MKN
            </span>
          </div>
          <span className="text-[9px] font-extrabold text-[#D94F2B] uppercase tracking-widest mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
            PORTAL HUB
          </span>
        </div>
      )}
    </div>
  );
};

