import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const SURFACES = [
  { id: 'buz', name: 'Buz', mu: 0.005, color: 'bg-cyan-200' },
  { id: 'tahta', name: 'Tahta', mu: 0.03, color: 'bg-yellow-700' },
  { id: 'zimpara', name: 'Zımpara Kağıdı', mu: 0.1, color: 'bg-gray-600' },
];

export default function FrictionForce_Grade5() {
  const [surface, setSurface] = useState(SURFACES[0]);
  const [position, setPosition] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const requestRef = useRef();

  const pushForce = 20; // Initial velocity given by push

  const updatePhysics = () => {
    setVelocity(prevV => {
      let newV = prevV - surface.mu; // Decelerate based on friction
      if (newV <= 0) {
        setIsMoving(false);
        return 0;
      }
      setPosition(prevP => prevP + newV);
      return newV;
    });

    // Add missing recursive requestAnimationFrame call using a ref state check to avoid closure issues
  };

  useEffect(() => {
    const loop = () => {
      updatePhysics();
    };

    if (isMoving) {
      requestRef.current = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isMoving, surface, position]);

  const handlePush = () => {
    if (position > 800) setPosition(0); // Reset if at end
    setVelocity(pushForce);
    setIsMoving(true);
  };

  const handleReset = () => {
    setIsMoving(false);
    setVelocity(0);
    setPosition(0);
  };

  const handleSurfaceChange = (s) => {
    setSurface(s);
    handleReset();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center font-sans">
      <Link to="/" className="self-start mb-8 p-4 bg-gray-800 rounded-xl shadow-lg text-xl hover:bg-gray-700 transition">Ana Menüye Dön</Link>

      <h1 className="text-4xl font-bold mb-12 text-red-400">Sürtünme Kuvveti</h1>

      <div className="w-full max-w-6xl flex flex-col gap-12">

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SURFACES.map(s => (
            <button
              key={s.id}
              onClick={() => handleSurfaceChange(s)}
              disabled={isMoving}
              className={`p-6 rounded-2xl text-2xl font-bold text-gray-900 shadow-xl transition-all ${s.color} ${surface.id === s.id ? 'ring-8 ring-white scale-105' : 'opacity-70 hover:opacity-100'} disabled:opacity-50`}
            >
              {s.name} Zemin
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 justify-center">
          <button
            onClick={handlePush}
            disabled={isMoving || position > 800}
            className="w-48 h-48 bg-red-600 rounded-full text-5xl font-extrabold shadow-2xl active:scale-90 transition-transform disabled:opacity-50 disabled:bg-gray-600"
          >
            İT!
          </button>
          <button
            onClick={handleReset}
            className="w-48 h-48 bg-gray-700 rounded-full text-3xl font-bold shadow-2xl active:scale-90 transition-transform"
          >
            Başa Dön
          </button>
        </div>

        {/* Stats */}
        <div className="bg-gray-800 p-6 rounded-2xl text-2xl font-bold flex justify-around">
          <span className="text-blue-400">Hız: {Math.max(0, velocity).toFixed(1)} birim</span>
          <span className="text-green-400">Alınan Yol: {position.toFixed(0)} m</span>
        </div>

        {/* Track Area */}
        <div className="relative w-full h-64 bg-gray-800 rounded-3xl overflow-hidden border-4 border-gray-700 shadow-inner">
          {/* Surface visually */}
          <div className={`absolute bottom-0 w-full h-1/2 ${surface.color} opacity-80 border-t-8 border-black`}></div>

          {/* Distance Markers */}
          <div className="absolute bottom-1/2 w-full flex justify-between px-8 text-gray-400 font-bold">
            <span>0m</span>
            <span>200m</span>
            <span>400m</span>
            <span>600m</span>
            <span>800m+</span>
          </div>

          {/* The Block */}
          <div
            className="absolute bottom-1/2 w-32 h-32 bg-orange-600 rounded-xl border-4 border-orange-900 shadow-2xl flex items-center justify-center text-xl font-bold z-10"
            style={{
              transform: `translateX(${position}px)`,
              transition: isMoving ? 'none' : 'transform 0.3s ease-out'
            }}
          >
            KUTU
          </div>
        </div>

      </div>
    </div>
  );
}
