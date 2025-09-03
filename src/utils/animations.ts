export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const generateSpinRotation = (): number => {
  // 5-7 full rotations plus random final position
  const fullRotations = Math.floor(Math.random() * 3) + 5;
  const finalAngle = Math.random() * 360;
  return fullRotations * 360 + finalAngle;
};

export const getWinningSegment = (rotation: number, segments: any[]): number => {
  // Normalize rotation to 0-360
  const normalizedRotation = ((360 - (rotation % 360)) + 360) % 360;
  const segmentAngle = 360 / segments.length;
  const segmentIndex = Math.floor(normalizedRotation / segmentAngle);
  return segmentIndex;
};

export const createParticle = (x: number, y: number) => ({
  x,
  y,
  vx: (Math.random() - 0.5) * 8,
  vy: (Math.random() - 0.5) * 8,
  life: 1,
  decay: 0.02,
  color: `hsl(${Math.random() * 60 + 180}, 100%, 70%)`,
});