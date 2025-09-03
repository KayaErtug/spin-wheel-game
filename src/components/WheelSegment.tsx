import React from 'react';
import { WheelSegment as WheelSegmentType } from '../types/game';

interface WheelSegmentProps {
  segment: WheelSegmentType;
  index: number;
  totalSegments: number;
  isWinning: boolean;
}

export const WheelSegment: React.FC<WheelSegmentProps> = ({ 
  segment, 
  index, 
  totalSegments,
  isWinning 
}) => {
  const angle = (360 / totalSegments) * index;
  const segmentAngle = 360 / totalSegments;
  
  return (
    <div
      className={`absolute inset-0 transition-all duration-500 ${
        isWinning ? 'brightness-150 saturate-150' : ''
      }`}
      style={{
        transform: `rotate(${angle}deg)`,
        clipPath: `polygon(50% 50%, 50% 0%, ${
          50 + 50 * Math.sin((segmentAngle * Math.PI) / 180)
        }% ${50 - 50 * Math.cos((segmentAngle * Math.PI) / 180)}%)`,
      }}
    >
      {/* Base segment */}
      <div 
        className="absolute inset-0 opacity-90"
        style={{ 
          background: `linear-gradient(135deg, ${segment.color}, ${segment.color}dd)`,
        }}
      >
        {/* Circuit pattern overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 0%, ${segment.glowColor}44 50%, transparent 100%),
              repeating-linear-gradient(45deg, transparent, transparent 2px, ${segment.glowColor}22 2px, ${segment.glowColor}22 4px)
            `,
          }}
        ></div>
      </div>
      
      {/* Neon edge glow */}
      <div 
        className={`absolute inset-0 border-2 ${isWinning ? 'animate-pulse' : ''}`}
        style={{
          borderColor: segment.glowColor,
          boxShadow: `0 0 20px ${segment.glowColor}66, inset 0 0 20px ${segment.glowColor}33`,
          clipPath: `polygon(50% 50%, 50% 0%, ${
            50 + 50 * Math.sin((segmentAngle * Math.PI) / 180)
          }% ${50 - 50 * Math.cos((segmentAngle * Math.PI) / 180)}%)`,
        }}
      ></div>
      
      {/* Only points (value) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="text-center"
          style={{ 
            transform: `rotate(${segmentAngle / 2}deg) translateY(-110px)`,
          }}
        >
          <div className="bg-black/40 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-2 py-1">
            <div 
              className="text-xs md:text-sm font-mono tracking-wider font-bold"
              style={{ color: segment.glowColor }}
            >
              {segment.value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
