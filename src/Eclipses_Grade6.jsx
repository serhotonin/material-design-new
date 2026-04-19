import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Eclipses_Grade6() {
  const [moonPos, setMoonPos] = useState({ x: 400, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const sunX = 100;
  const sunY = 250;
  const earthX = 700;
  const earthY = 250;

  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMoonPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  // Check conditions
  // Simple check: y roughly matches (e.g. within 50px), x is between Sun and Earth or behind Earth
  const yAligned = Math.abs(moonPos.y - 250) < 50;
  const isSolarEclipse = yAligned && moonPos.x > sunX + 50 && moonPos.x < earthX - 50;
  const isLunarEclipse = yAligned && moonPos.x > earthX + 50;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center font-sans">
      <Link to="/" className="self-start mb-8 p-4 bg-gray-800 rounded-xl shadow-lg text-xl hover:bg-gray-700 transition">Ana Menüye Dön</Link>

      <h1 className="text-4xl font-bold mb-4 text-purple-400">Güneş ve Ay Tutulması</h1>
      <p className="text-xl mb-8">Ay'ı sürükleyerek Dünya ile Güneş arasına veya Dünya'nın arkasına getirin.</p>

      {/* Alert Banner */}
      <div className={`w-full max-w-4xl h-24 rounded-3xl mb-8 flex items-center justify-center text-3xl font-bold shadow-2xl transition-colors ${isSolarEclipse ? 'bg-yellow-600 text-white animate-pulse' : isLunarEclipse ? 'bg-red-900 text-red-200 animate-pulse' : 'bg-gray-800 text-gray-500'}`}>
        {isSolarEclipse ? 'GÜNEŞ TUTULMASI!' : isLunarEclipse ? 'AY TUTULMASI!' : 'Tutulma Yok'}
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-5xl h-[500px] bg-black border-4 border-gray-700 rounded-3xl shadow-2xl overflow-hidden touch-none"
        onPointerMove={handlePointerMove}
      >

        {/* Light rays from sun (visual only) */}
        <div className="absolute top-1/2 left-[150px] w-[800px] h-[200px] -translate-y-1/2 bg-gradient-to-r from-yellow-500/20 to-transparent pointer-events-none"></div>

        {/* Sun */}
        <div
          className="absolute w-48 h-48 bg-yellow-500 rounded-full shadow-[0_0_100px_rgba(234,179,8,1)] flex items-center justify-center text-black font-bold text-2xl"
          style={{ left: sunX - 96, top: sunY - 96 }} // Center is sunX, sunY
        >
          GÜNEŞ
        </div>

        {/* Earth */}
        <div
          className="absolute w-32 h-32 bg-blue-500 rounded-full shadow-lg flex items-center justify-center font-bold text-xl overflow-hidden"
          style={{ left: earthX - 64, top: earthY - 64 }}
        >
          DÜNYA
          {/* Earth Night side shading */}
          <div className="absolute right-0 w-1/2 h-full bg-black/60"></div>

          {/* Shadow from Moon (Solar Eclipse) */}
          {isSolarEclipse && (
            <div className="absolute w-16 h-16 bg-black rounded-full opacity-80" style={{ left: '10%' }}></div>
          )}
        </div>

        {/* Earth's shadow cone (for Lunar Eclipse) */}
        <div
          className="absolute w-64 h-32 bg-black/50 pointer-events-none"
          style={{ left: earthX + 64, top: earthY - 64, clipPath: 'polygon(0 0, 100% 30%, 100% 70%, 0 100%)' }}
        ></div>

        {/* Moon (Draggable) */}
        <div
          className="absolute w-16 h-16 bg-gray-300 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center text-black text-sm font-bold cursor-grab active:cursor-grabbing z-50 touch-none"
          style={{
            left: moonPos.x - 32,
            top: moonPos.y - 32,
            filter: isLunarEclipse ? 'brightness(0.2) sepia(1) hue-rotate(-50deg) saturate(5)' : 'none' // Blood moon effect
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          AY
        </div>

      </div>
    </div>
  );
}
