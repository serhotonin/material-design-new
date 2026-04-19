import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MONTHS = [
  { id: 1, name: 'Ocak' }, { id: 2, name: 'Şubat' }, { id: 3, name: 'Mart' },
  { id: 4, name: 'Nisan' }, { id: 5, name: 'Mayıs' }, { id: 6, name: 'Haziran' },
  { id: 7, name: 'Temmuz' }, { id: 8, name: 'Ağustos' }, { id: 9, name: 'Eylül' },
  { id: 10, name: 'Ekim' }, { id: 11, name: 'Kasım' }, { id: 12, name: 'Aralık' }
];

export default function AxialTiltSeasons_Grade8() {
  const [month, setMonth] = useState(6); // Start at June

  // Calculate position on elliptical orbit
  // Angles: 3 (Mart)=0 deg, 6 (Haziran)=90 deg, 9 (Eylül)=180 deg, 12 (Aralık)=270 deg
  const angleDeg = ((month - 3) / 12) * 360;
  const angleRad = angleDeg * (Math.PI / 180);

  const orbitX = 350; // Semi-major axis
  const orbitY = 200; // Semi-minor axis

  const earthX = Math.cos(angleRad) * orbitX;
  const earthY = Math.sin(angleRad) * orbitY;

  // Determine season for Northern Hemisphere
  let season = '';
  let seasonColor = '';
  if (month >= 3 && month <= 5) { season = 'İlkbahar'; seasonColor = 'text-green-400'; }
  else if (month >= 6 && month <= 8) { season = 'Yaz'; seasonColor = 'text-yellow-400'; }
  else if (month >= 9 && month <= 11) { season = 'Sonbahar'; seasonColor = 'text-orange-400'; }
  else { season = 'Kış'; seasonColor = 'text-blue-400'; }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center font-sans">
      <Link to="/" className="self-start mb-8 p-4 bg-gray-800 rounded-xl shadow-lg text-xl hover:bg-gray-700 transition">Ana Menüye Dön</Link>

      <h1 className="text-4xl font-bold mb-4 text-purple-400">Mevsimlerin Oluşumu</h1>
      <p className="text-xl mb-8">Kuzey Yarımküre için eksen eğikliği ve Güneş etrafındaki dolanımın etkileri</p>

      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-3xl shadow-2xl mb-12 flex flex-col items-center">
        <label className="text-3xl font-bold mb-6 w-full flex justify-between">
          <span>Ay: <span className="text-purple-300">{MONTHS[month-1].name}</span></span>
          <span>Mevsim: <span className={seasonColor}>{season}</span></span>
        </label>

        <input
          type="range"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className="w-full h-8 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 mb-4"
        />
        <div className="w-full flex justify-between text-gray-400 font-bold px-2">
          <span>Oca</span><span>Şub</span><span>Mar</span><span>Nis</span>
          <span>May</span><span>Haz</span><span>Tem</span><span>Ağu</span>
          <span>Eyl</span><span>Eki</span><span>Kas</span><span>Ara</span>
        </div>
      </div>

      {/* Orbit Visualization */}
      <div className="relative w-full max-w-5xl h-[600px] bg-black border-4 border-gray-800 rounded-[50px] shadow-2xl flex items-center justify-center overflow-hidden">

        {/* Orbit Path */}
        <div
          className="absolute border border-dashed border-gray-600 rounded-full"
          style={{ width: orbitX * 2, height: orbitY * 2 }}
        ></div>

        {/* The Sun */}
        <div className="absolute w-32 h-32 bg-yellow-500 rounded-full shadow-[0_0_100px_rgba(234,179,8,0.8)] flex items-center justify-center text-black font-bold text-xl z-10">
          GÜNEŞ
        </div>

        {/* The Earth */}
        <div
          className="absolute w-24 h-24 z-20 flex items-center justify-center"
          style={{
            transform: `translate(${earthX}px, ${earthY}px)`
          }}
        >
          {/* Axial Tilt Representation (23.5 degrees relative to vertical) */}
          <div className="relative w-full h-full bg-blue-600 rounded-full border-2 border-blue-400 overflow-hidden shadow-lg" style={{ transform: 'rotate(23.5deg)' }}>
            {/* Equator */}
            <div className="absolute top-1/2 w-full h-[2px] bg-red-500"></div>
            {/* Axis line */}
            <div className="absolute left-1/2 h-full w-[2px] bg-white border-l border-black border-dashed -translate-x-1/2 -scale-y-125"></div>
            <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold">KYK</span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold">GYK</span>
          </div>

          {/* Simple shading to simulate day/night based on Sun position */}
          <div
            className="absolute w-full h-full rounded-full pointer-events-none"
            style={{
              background: `linear-gradient(${angleDeg + 180}deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 50%, transparent 50%, transparent 100%)`
            }}
          ></div>
        </div>

      </div>
    </div>
  );
}
