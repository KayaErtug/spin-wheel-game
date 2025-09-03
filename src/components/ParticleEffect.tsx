import React, { useEffect, useRef } from 'react';

interface ParticleEffectProps {
  show: boolean;
  centerX: number;
  centerY: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  color: string;
  size: number;
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({ show, centerX, centerY }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!show) {
      particlesRef.current = [];
      return;
    }

    // Create initial burst of particles
    for (let i = 0; i < 50; i++) {
      particlesRef.current.push({
        x: centerX,
        y: centerY,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        life: 1,
        decay: Math.random() * 0.02 + 0.01,
        color: `hsl(${Math.random() * 60 + 180}, 100%, 70%)`,
        size: Math.random() * 4 + 2,
      });
    }

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.life -= particle.decay;

        if (particle.life > 0) {
          ctx.save();
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          return true;
        }
        return false;
      });

      if (particlesRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [show, centerX, centerY]);

  if (!show) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-30"
      width={800}
      height={800}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};