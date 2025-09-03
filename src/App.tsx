
import { SpinWheel } from './components/SpinWheel';
import { GameInterface } from './components/GameInterface';
import { useSpinWheel } from './hooks/useSpinWheel';
import { wheelSegments } from './data/wheelSegments';
import './styles/neon.css';

function App() {
  const { gameState, spin, wheelRef } = useSpinWheel(wheelSegments);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background matrix */}
      <div className="absolute inset-0 matrix-bg opacity-10"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>
      
      {/* Main content */}
      <div className="relative z-10 p-8">
        <GameInterface gameState={gameState} onSpin={spin} />
        
        <div className="mt-12 flex justify-center">
          <SpinWheel
            segments={wheelSegments}
            isSpinning={gameState.isSpinning}
            currentResult={gameState.currentResult}
            showParticles={gameState.showParticles}
            wheelRef={wheelRef}
          />
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12">
          <div className="inline-block cyber-border rounded-lg p-4 bg-gray-900/30 backdrop-blur-sm">
            <p className="text-cyan-300 text-sm tracking-wider">
              POWERED BY QUANTUM ALGORITHMS • NEURAL PROBABILITY ENGINE v2.1
            </p>
          </div>
        </div>
      </div>
      
      {/* Side panels */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="w-2 h-64 bg-gradient-to-b from-cyan-400 via-purple-400 to-cyan-400 rounded-full animate-pulse opacity-50"></div>
      </div>
      
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="w-2 h-64 bg-gradient-to-b from-purple-400 via-cyan-400 to-purple-400 rounded-full animate-pulse opacity-50"></div>
      </div>
    </div>
  );
}

export default App;