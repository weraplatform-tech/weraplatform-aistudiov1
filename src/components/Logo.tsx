import React from 'react';

export const Logo = ({ 
  className = "w-10 h-10", 
  showText = true, 
  isDark = false 
}: { 
  className?: string, 
  showText?: boolean, 
  isDark?: boolean
}) => {
  const textColor = isDark ? "text-white" : "text-black";
  const subTextColor = isDark ? "text-white/70" : "text-black/80";

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative flex-shrink-0 w-10 h-10">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#76FF03" />
            </linearGradient>
          </defs>
          {/* Circle Background */}
          <circle cx="50" cy="50" r="48" fill="url(#logo-gradient)" />
          {/* Slanted "W" leaning to the left */}
          <text 
            x="50" 
            y="68" 
            textAnchor="middle" 
            fill="black" 
            fontSize="55" 
            fontWeight="900" 
            fontFamily="Inter, sans-serif"
            style={{ 
              letterSpacing: '-2px',
              transform: 'skewX(-10deg)',
              transformOrigin: 'center'
            }}
          >
            W
          </text>
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`text-2xl font-black tracking-tighter ${textColor}`}>WÈRA</span>
          <span className={`text-[7px] font-bold tracking-[0.2em] ${subTextColor} uppercase`}>Unlocking Potential</span>
        </div>
      )}
    </div>
  );
};
