import React from 'react';

export const Logo = ({ className = "w-10 h-10", showText = true }: { className?: string, showText?: boolean }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative flex-shrink-0 w-10 h-10">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#76FF03" />
            </linearGradient>
          </defs>
          {/* Slanted Background Parallelogram */}
          <path 
            d="M30 0L85 0L70 100L15 100L30 0Z" 
            fill="url(#logo-gradient)" 
          />
          {/* The "W" inside the shape */}
          <text 
            x="50%" 
            y="65%" 
            textAnchor="middle" 
            fill="black" 
            fontSize="45" 
            fontWeight="900" 
            fontFamily="Inter, sans-serif"
            style={{ letterSpacing: '-2px' }}
          >
            W
          </text>
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-black tracking-tighter text-black">WÈRA</span>
          <span className="text-[7px] font-bold tracking-[0.2em] text-black uppercase opacity-80">Unlocking Potential</span>
        </div>
      )}
    </div>
  );
};
