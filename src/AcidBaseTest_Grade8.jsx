import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LIQUIDS = [
  { id: 'limon', name: 'Limon Suyu', ph: 2, color: 'bg-yellow-400' },
  { id: 'sirke', name: 'Sirke', ph: 3, color: 'bg-orange-200' },
  { id: 'kahve', name: 'Sade Kahve', ph: 5, color: 'bg-yellow-900' },
  { id: 'su', name: 'Saf Su', ph: 7, color: 'bg-blue-300' },
  { id: 'karbonat', name: 'Karbonatlı Su', ph: 9, color: 'bg-gray-300' },
  { id: 'sabun', name: 'Sabunlu Su', ph: 10, color: 'bg-pink-300' },
  { id: 'camasir_suyu', name: 'Çamaşır Suyu', ph: 12, color: 'bg-yellow-100' },
];

export default function AcidBaseTest_Grade8() {
  const [selectedLiquid, setSelectedLiquid] = useState(null);

  // Map pH to RGB for litmus paper smoothly
  // Red (pH 0) -> Purple (pH 7) -> Blue (pH 14)
  const getLitmusColor = (ph) => {
    if (ph === null) return 'rgb(200, 200, 200)'; // Neutral gray before dip
    const r = Math.max(0, 255 - (ph / 7) * 255);
    const b = Math.min(255, (ph / 14) * 255 + (ph > 7 ? (ph-7)/7 * 255 : 0));
    const g = ph === 7 ? 150 : 50; // Little green for neutral
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center font-sans">
      <Link to="/" className="self-start mb-8 p-4 bg-gray-800 rounded-xl shadow-lg text-xl hover:bg-gray-700 transition">Ana Menüye Dön</Link>

      <h1 className="text-4xl font-bold mb-12 text-yellow-400">Asit-Baz Turnusol Testi</h1>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-12">

        {/* Liquids Selection */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {LIQUIDS.map((liquid) => (
            <button
              key={liquid.id}
              onClick={() => setSelectedLiquid(liquid)}
              className={`p-6 rounded-2xl shadow-xl flex items-center justify-center text-xl font-bold text-gray-900 transition-transform active:scale-95 ${liquid.color} ${selectedLiquid?.id === liquid.id ? 'ring-8 ring-white' : ''}`}
            >
              {liquid.name}
            </button>
          ))}
        </div>

        {/* Experiment Area */}
        <div className="flex-1 bg-gray-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center relative">
          <h2 className="text-3xl font-bold mb-8">Test Alanı</h2>

          <div className="relative w-48 h-64 border-4 border-gray-600 rounded-b-3xl rounded-t-sm flex items-end justify-center overflow-hidden mb-8 bg-gray-700">
            {/* Liquid inside beaker */}
            <div
              className="absolute bottom-0 w-full transition-all duration-1000"
              style={{
                height: selectedLiquid ? '60%' : '0%',
                backgroundColor: selectedLiquid ? 'rgba(255,255,255,0.2)' : 'transparent'
              }}
            ></div>

            {/* Litmus Paper Diping */}
            <div
              className="w-16 absolute top-0 transition-all duration-1000"
              style={{
                height: selectedLiquid ? '100%' : '50%',
                backgroundColor: getLitmusColor(selectedLiquid?.ph ?? null),
                transform: selectedLiquid ? 'translateY(20px)' : 'translateY(-20px)'
              }}
            ></div>
          </div>

          <div className="h-16 flex items-center justify-center w-full bg-gray-900 rounded-xl text-2xl font-bold mb-8">
            {selectedLiquid ? (
              <span className={selectedLiquid.ph < 7 ? 'text-red-400' : selectedLiquid.ph > 7 ? 'text-blue-400' : 'text-purple-400'}>
                pH Değeri: {selectedLiquid.ph} - {selectedLiquid.ph < 7 ? 'ASİT' : selectedLiquid.ph > 7 ? 'BAZ' : 'NÖTR'}
              </span>
            ) : (
              <span className="text-gray-500">Test etmek için bir sıvı seçin</span>
            )}
          </div>

          {/* pH Scale Visualization */}
          <div className="w-full">
            <div className="h-12 w-full rounded-full flex overflow-hidden border-2 border-gray-600 mb-2">
              {Array.from({length: 15}).map((_, i) => (
                <div key={i} className="flex-1" style={{ backgroundColor: getLitmusColor(i) }}></div>
              ))}
            </div>
            <div className="flex justify-between px-2 text-lg font-bold">
              <span>0 (Kuvvetli Asit)</span>
              <span>7 (Nötr)</span>
              <span>14 (Kuvvetli Baz)</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
