import React from 'react';

export const Logo = ({ 
  className = "", 
  iconSize = "w-10 h-10",
  showText = true, 
  isDark = false 
}: { 
  className?: string, 
  iconSize?: string,
  showText?: boolean, 
  isDark?: boolean
}) => {
  const textColor = isDark ? "text-wera-white" : "text-wera-navy";
  const subTextColor = isDark ? "text-wera-cyan/70" : "text-wera-slate";

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`relative flex-shrink-0 ${iconSize}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0A192F" />
              <stop offset="100%" stopColor="#00F0FF" />
            </linearGradient>
          </defs>
          {/* Executive Shield/Hexagon Shape */}
          <path d="M50 5 L90 27.5 V72.5 L50 95 L10 72.5 V27.5 L50 5Z" fill="url(#logo-gradient)" />
          {/* Precision Chevron */}
          <path d="M35 45 L50 60 L65 45" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`text-2xl font-black tracking-widest ${textColor}`}>WERA</span>
          <span className={`text-[8px] font-bold tracking-[0.3em] ${subTextColor} uppercase`}>Marketplace</span>
        </div>
      )}
    </div>
  );
};
