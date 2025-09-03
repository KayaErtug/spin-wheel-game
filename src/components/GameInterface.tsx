import React from 'react';
import { GameState } from '../types/game';
import { Trophy, Zap, Target, Cpu } from 'lucide-react';

interface GameInterfaceProps {
  gameState: GameState;
  onSpin: () => void;
}

export const GameInterface: React.FC<GameInterfaceProps> = ({ gameState, onSpin }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center px-2">
        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight text-cyan-300 drop-shadow-lg break-words">
          CYBERNETIC FORTUNE
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-cyan-300 tracking-wide opacity-80">
          Neural Network Probability Engine
        </p>
      </div>
      
      {/* Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        <div className="cyber-border rounded-lg p-4 sm:p-6 bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
            <div>
              <div className="text-xs sm:text-sm text-gray-400 tracking-wide">TOTAL CREDITS</div>
              <div className="text-xl sm:text-2xl font-bold text-yellow-400 tracking-wider break-words">
                {gameState.totalWinnings.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        
        <div className="cyber-border rounded-lg p-4 sm:p-6 bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            <div>
              <div className="text-xs sm:text-sm text-gray-400 tracking-wide">SYSTEM STATUS</div>
              <div className="text-xl sm:text-2xl font-bold text-purple-400 tracking-wider">
                {gameState.isSpinning ? 'PROCESSING' : 'READY'}
              </div>
            </div>
          </div>
        </div>
        
        <div className="cyber-border rounded-lg p-4 sm:p-6 bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
            <div>
              <div className="text-xs sm:text-sm text-gray-400 tracking-wide">LAST SCAN</div>
              <div className="text-xl sm:text-2xl font-bold text-cyan-400 tracking-wider break-words">
                {gameState.currentResult ? 
                  `${gameState.currentResult.segment.value}` : '---'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spin Button */}
      <div className="text-center px-2">
        <button
          onClick={onSpin}
          disabled={gameState.isSpinning}
          className={`
            relative px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6
            text-lg sm:text-xl md:text-2xl font-bold tracking-wider rounded-lg
            transition-all duration-300 transform
            ${gameState.isSpinning 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'holographic-bg text-white hover:scale-105 hover:shadow-2xl cyber-border'
            }
          `}
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <Cpu className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${gameState.isSpinning ? 'animate-spin' : ''}`} />
            <span>
              {gameState.isSpinning ? 'PROCESSING QUANTUM DATA...' : 'ACTIVATE NEURAL SPIN'}
            </span>
          </div>
          
          {!gameState.isSpinning && (
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          )}
        </button>
      </div>
      
      {/* Result Display */}
      {gameState.currentResult && !gameState.isSpinning && (
        <div className="text-center animate-pulse px-2">
          <div className="cyber-border rounded-lg p-4 sm:p-6 md:p-8 bg-gray-900/80 backdrop-blur-sm max-w-sm sm:max-w-md md:max-w-lg mx-auto">
            <div className="text-xs sm:text-sm text-gray-400 tracking-wide mb-2">
              NEURAL ANALYSIS COMPLETE
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold neon-text mb-2 break-words">
              {gameState.currentResult.segment.label}
            </div>
            <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-yellow-400 tracking-wider break-words">
              +{gameState.currentResult.segment.value} CREDITS
            </div>
            <div className="text-xs sm:text-sm text-cyan-300 mt-4 tracking-wide">
              Quantum probability matrix synchronized
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
