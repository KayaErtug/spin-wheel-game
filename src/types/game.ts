export interface WheelSegment {
  id: number;
  label: string;
  value: number;
  color: string;
  glowColor: string;
}

export interface SpinResult {
  segment: WheelSegment;
  rotation: number;
  winnings: number;
}

export interface GameState {
  isSpinning: boolean;
  currentResult: SpinResult | null;
  totalWinnings: number;
  showParticles: boolean;
}