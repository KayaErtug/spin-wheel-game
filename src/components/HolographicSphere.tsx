import React from 'react';

export const HolographicSphere: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div className="relative w-24 h-24">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse opacity-30 blur-md"></div>
        
        {/* Main sphere */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-200 via-blue-400 to-purple-600 animate-spin-slow shadow-2xl">
          <div className="absolute inset-1 rounded-full bg-gradient-to-tl from-transparent via-white/20 to-transparent"></div>
        </div>
        
        {/* Inner core */}
        <div className="absolute inset-6 rounded-full bg-gradient-to-r from-cyan-300 to-purple-400 animate-pulse">
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
        </div>
        
        {/* Logo text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-xs tracking-wider drop-shadow-lg">
            CYBER
          </span>
        </div>
        
        {/* Rotating rings */}
        <div className="absolute inset-0 animate-spin">
          <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-cyan-400 -translate-x-0.5 rounded-full opacity-60"></div>
          <div className="absolute bottom-0 left-1/2 w-0.5 h-4 bg-purple-400 -translate-x-0.5 rounded-full opacity-60"></div>
        </div>
        
        <div className="absolute inset-0 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}>
          <div className="absolute left-0 top-1/2 w-4 h-0.5 bg-cyan-400 -translate-y-0.5 rounded-full opacity-60"></div>
          <div className="absolute right-0 top-1/2 w-4 h-0.5 bg-purple-400 -translate-y-0.5 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  );
};