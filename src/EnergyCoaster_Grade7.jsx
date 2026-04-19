import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function EnergyCoaster_Grade7() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [friction, setFriction] = useState(0.01);
  const [ballState, setBallState] = useState({ x: 0, vx: 0, totalE: 100 });
  const requestRef = useRef();

  // Track geometry (simple parabola y = a*x^2)
  const trackWidth = 600;
  const a = 0.002; // Steepness

  const updatePhysics = () => {
    setBallState(prev => {
      let { x, vx, totalE } = prev;

      // Calculate slope at current x (derivative of a*x^2 is 2*a*x)
      const slope = 2 * a * x;
      const angle = Math.atan(slope);

      // Gravity component along the track
      const g = 0.5;
      const acceleration = -g * Math.sin(angle);

      vx += acceleration;

      // Apply friction (dampens velocity)
      vx *= (1 - friction);

      x += vx;

      // Energy calculation for visual bars
      // PE is proportional to height (y)
      const y = a * x * x;
      // Max height is at x = trackWidth/2
      const maxY = a * (trackWidth/2) * (trackWidth/2);

      let pe = (y / maxY) * 100;
      if (pe > 100) pe = 100;
      if (pe < 0) pe = 0;

      // KE is remaining total energy
      let ke = totalE - pe;
      if (ke < 0) ke = 0;

      // Decrease total energy due to friction
      totalE -= (Math.abs(vx) * friction);
      if (totalE < 0) totalE = 0;

      // Stop if almost zero energy
      if (totalE < 1 && Math.abs(vx) < 0.1) {
        setIsPlaying(false);
        vx = 0;
      }

      return { x, vx, totalE };
    });

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(updatePhysics);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(updatePhysics);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, friction]);

  const handleReset = () => {
    setIsPlaying(false);
    setBallState({ x: -trackWidth/2, vx: 0, totalE: 100 });
  };

  // Calculate current visual positions
  const currentY = a * ballState.x * ballState.x;
  const maxY = a * (trackWidth/2) * (trackWidth/2);
  const pe = Math.max(0, Math.min(100, (currentY / maxY) * 100));
  const ke = Math.max(0, ballState.totalE - pe);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col font-sans">
      <Link to="/" className="self-start mb-8 p-4 bg-gray-800 rounded-xl shadow-lg text-xl hover:bg-gray-700 transition">Ana Menüye Dön</Link>

      <h1 className="text-4xl font-bold mb-8 text-center text-red-400">Enerji Dönüşümü</h1>

      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center max-w-7xl mx-auto w-full">

        {/* Controls */}
        <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl flex flex-col gap-8 w-full max-w-md">
          <div className="flex gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex-1 p-6 rounded-2xl text-2xl font-bold shadow-lg transition-transform active:scale-95 ${isPlaying ? 'bg-yellow-600' : 'bg-green-600'}`}
            >
              {isPlaying ? 'DURDUR' : 'BAŞLAT'}
            </button>
            <button
              onClick={handleReset}
              className="flex-1 p-6 bg-red-600 rounded-2xl text-2xl font-bold shadow-lg transition-transform active:scale-95"
            >
              SIFIRLA
            </button>
          </div>

          <div>
            <label className="text-2xl font-bold mb-4 flex justify-between">
              <span>Sürtünme:</span>
              <span>{(friction * 100).toFixed(0)}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="0.05"
              step="0.001"
              value={friction}
              onChange={(e) => setFriction(parseFloat(e.target.value))}
              className="w-full h-8 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
          </div>

          {/* Energy Bars */}
          <div className="flex flex-col gap-6 mt-4">
            <div>
              <div className="flex justify-between text-xl font-bold mb-2">
                <span className="text-blue-400">Potansiyel Enerji (Yükseklik)</span>
                <span>{pe.toFixed(0)} J</span>
              </div>
              <div className="w-full h-12 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-75" style={{ width: `${pe}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xl font-bold mb-2">
                <span className="text-green-400">Kinetik Enerji (Hız)</span>
                <span>{ke.toFixed(0)} J</span>
              </div>
              <div className="w-full h-12 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all duration-75" style={{ width: `${ke}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation Canvas/Area */}
        <div className="bg-black border-4 border-gray-700 rounded-3xl shadow-2xl p-8 relative overflow-hidden" style={{ width: 800, height: 500 }}>

          {/* Draw Track (SVG) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="-400 -50 800 500">
            <path
              d={`M -300 ${a * 300 * 300} Q 0 -50 300 ${a * 300 * 300}`}
              fill="none"
              stroke="#4b5563"
              strokeWidth="10"
            />
          </svg>

          {/* The Ball */}
          <div
            className="absolute w-16 h-16 bg-gradient-to-br from-red-400 to-red-700 rounded-full shadow-lg"
            style={{
              left: '50%',
              top: 50, // Offset to match svg coords roughly
              transform: `translate(calc(-50% + ${ballState.x}px), ${currentY}px)`,
              transition: 'transform 0.05s linear'
            }}
          ></div>

        </div>

      </div>
    </div>
  );
}
