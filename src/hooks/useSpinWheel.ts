import { useState, useCallback, useRef } from 'react';
import { WheelSegment, SpinResult, GameState } from '../types/game';
import { generateSpinRotation, getWinningSegment } from '../utils/animations';

export const useSpinWheel = (segments: WheelSegment[]) => {
  const [gameState, setGameState] = useState<GameState>({
    isSpinning: false,
    currentResult: null,
    totalWinnings: 0,
    showParticles: false,
  });

  const wheelRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playClickSound = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContextRef.current.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
      
      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 0.1);
    } catch (error) {
      // Silently handle audio context errors
    }
  }, []);

  const spin = useCallback(() => {
    if (gameState.isSpinning) return;

    playClickSound();
    
    setGameState(prev => ({
      ...prev,
      isSpinning: true,
      showParticles: false,
      currentResult: null,
    }));

    const rotation = generateSpinRotation();
    const winningIndex = getWinningSegment(rotation, segments);
    const winningSegment = segments[winningIndex];

    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${rotation}deg)`;
    }

    setTimeout(() => {
      const result: SpinResult = {
        segment: winningSegment,
        rotation,
        winnings: winningSegment.value,
      };

      setGameState(prev => ({
        ...prev,
        isSpinning: false,
        currentResult: result,
        totalWinnings: prev.totalWinnings + winningSegment.value,
        showParticles: true,
      }));

      setTimeout(() => {
        setGameState(prev => ({ ...prev, showParticles: false }));
      }, 3000);
    }, 4000);
  }, [gameState.isSpinning, segments, playClickSound]);

  return {
    gameState,
    spin,
    wheelRef,
  };
};