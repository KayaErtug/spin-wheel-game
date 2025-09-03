import React from 'react';
import { WheelSegment as WheelSegmentComponent } from './WheelSegment';
import { HolographicSphere } from './HolographicSphere';
import { ParticleEffect } from './ParticleEffect';
import { WheelSegment } from '../types/game';

interface SpinWheelProps {
  segments: WheelSegment[];
  isSpinning: boolean;
  currentResult: any;
  showParticles: boolean;
  wheelRef: React.RefObject<HTMLDivElement>;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({
  segments,
  isSpinning,
  currentResult,
  showParticles,
  wheelRef,
}) => {
  return (
    <div className="relative w-[90vw] max-w-[500px] aspect-square mx-auto">
      {/* Outer glow ring */}
      <div className="absolute -inset-6 md:-inset-8 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-spin-slow opacity-20 blur-xl"></div>
      
      {/* Digital displays around wheel */}
      <div className="absolute -inset-10 md:-inset-12">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-1.5 md:w-8 md:h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 30}deg) translateX(45%) translateY(-50%)`,
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
          </div>
        ))}
      </div>
      
      {/* Main wheel container */}
      <div className="relative w-full h-full">
        {/* Wheel shadow */}
        <div className="absolute inset-3 md:inset-4 rounded-full bg-black/50 blur-xl"></div>
        
        {/* Wheel base */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl border-2 md:border-4 border-cyan-400/30">
          {/* Circuit board background */}
          <div 
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, cyan 1px, transparent 1px),
                radial-gradient(circle at 75% 75%, purple 1px, transparent 1px),
                linear-gradient(45deg, transparent 40%, cyan 41%, cyan 42%, transparent 43%),
                linear-gradient(-45deg, transparent 40%, purple 41%, purple 42%, transparent 43%)
              `,
              backgroundSize: '6% 6%, 6% 6%, 3% 3%, 3% 3%',
            }}
          ></div>
          
          {/* Spinning wheel */}
          <div
            ref={wheelRef}
            className={`absolute inset-1.5 md:inset-2 rounded-full transition-transform duration-[4000ms] ease-out`}
            style={{
              background: 'conic-gradient(from 0deg, #1f2937, #374151, #1f2937)',
              transformOrigin: 'center',
            }}
          >
            {segments.map((segment, index) => (
              <WheelSegmentComponent
                key={segment.id}
                segment={segment}
                index={index}
                totalSegments={segments.length}
                isWinning={currentResult?.segment.id === segment.id && !isSpinning}
              />
            ))}
            
            {/* Center cap */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gray-700 via-gray-800 to-black border-2 md:border-4 border-cyan-400/50 shadow-2xl">
                <HolographicSphere />
              </div>
            </div>
          </div>
        </div>
        
  {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
      <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent border-t-cyan-400 drop-shadow-lg">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[24px]     border-l-transparent border-r-transparent border-t-purple-400"></div>
      </div>

  {/* Pointer glow */}
  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
</div>

        
        
      </div>
      
      {/* Particle effects */}
      <ParticleEffect 
        show={showParticles} 
        centerX={125} // 250 yerine yarıya düşürdük çünkü artık max 500px değil
        centerY={125}
      />
    </div>
  );
};
