import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ORGANELLES = [
  { id: 'mitokondri', name: 'Mitokondri', desc: 'Enerji üretir.', allowedIn: ['animal', 'plant'] },
  { id: 'kloroplast', name: 'Kloroplast', desc: 'Fotosentez yapar.', allowedIn: ['plant'] },
  { id: 'ribozom', name: 'Ribozom', desc: 'Protein sentezler.', allowedIn: ['animal', 'plant'] },
  { id: 'hucresuduvari', name: 'Hücre Duvarı', desc: 'Hücreye şekil verir ve korur.', allowedIn: ['plant'] },
  { id: 'sentrozom', name: 'Sentrozom', desc: 'Hücre bölünmesinde görev alır.', allowedIn: ['animal'] },
  { id: 'koful_buyuk', name: 'Büyük Koful', desc: 'Atık ve besin depolar.', allowedIn: ['plant'] },
  { id: 'koful_kucuk', name: 'Küçük Koful', desc: 'Atık ve besin depolar.', allowedIn: ['animal'] },
];

export default function CellOrganelles_Grade7() {
  const [cellType, setCellType] = useState('animal'); // 'animal' or 'plant'
  const [addedOrganelles, setAddedOrganelles] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddOrganelle = (organelle) => {
    if (!organelle.allowedIn.includes(cellType)) {
      if (cellType === 'animal' && organelle.id === 'kloroplast') {
        showToast('Hayvan hücresinde kloroplast bulunmaz!');
      } else if (cellType === 'animal' && organelle.id === 'hucresuduvari') {
        showToast('Hayvan hücresinde hücre duvarı bulunmaz!');
      } else if (cellType === 'animal' && organelle.id === 'koful_buyuk') {
        showToast('Hayvan hücrelerinde kofullar küçük ve çok sayıdadır, büyük koful bulunmaz!');
      } else if (cellType === 'plant' && organelle.id === 'sentrozom') {
        showToast('Gelişmiş bitki hücrelerinde sentrozom bulunmaz!');
      } else if (cellType === 'plant' && organelle.id === 'koful_kucuk') {
        showToast('Bitki hücrelerinde kofullar büyük ve az sayıdadır!');
      } else {
        showToast(`Bu organel ${cellType === 'animal' ? 'hayvan' : 'bitki'} hücresinde bulunmaz!`);
      }
      return;
    }

    if (!addedOrganelles.some(o => o.id === organelle.id)) {
      setAddedOrganelles([...addedOrganelles, organelle]);
      showToast(`${organelle.name} eklendi.`);
    } else {
      showToast(`${organelle.name} zaten eklendi.`);
    }
  };

  const handleCellTypeChange = (type) => {
    setCellType(type);
    setAddedOrganelles([]);
    setToastMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col font-sans">
      <Link to="/" className="self-start mb-8 p-4 bg-gray-800 rounded-xl shadow-lg text-xl hover:bg-gray-700 transition">Ana Menüye Dön</Link>

      <h1 className="text-4xl font-bold mb-8 text-center text-green-400">Hücre Organelleri</h1>

      {toastMessage && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-8 py-4 rounded-full shadow-2xl text-2xl font-bold z-50 animate-bounce">
          {toastMessage}
        </div>
      )}

      <div className="flex justify-center gap-8 mb-12">
        <button
          onClick={() => handleCellTypeChange('animal')}
          className={`p-6 rounded-3xl text-2xl font-bold shadow-xl transition-all ${cellType === 'animal' ? 'bg-blue-600 ring-4 ring-white' : 'bg-gray-800 text-gray-400'}`}
        >
          Hayvan Hücresi
        </button>
        <button
          onClick={() => handleCellTypeChange('plant')}
          className={`p-6 rounded-3xl text-2xl font-bold shadow-xl transition-all ${cellType === 'plant' ? 'bg-green-600 ring-4 ring-white' : 'bg-gray-800 text-gray-400'}`}
        >
          Bitki Hücresi
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">

        {/* Cell Visualization Area */}
        <div className="flex-1 max-w-2xl w-full aspect-square bg-gray-800 rounded-full border-8 shadow-2xl p-8 relative flex flex-wrap content-center justify-center gap-4" style={{
          borderColor: cellType === 'animal' ? '#3b82f6' : '#22c55e',
          borderRadius: cellType === 'animal' ? '50%' : '20%', // Animal round, Plant squarish
        }}>
          <div className="absolute inset-0 m-auto w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">Çekirdek</div>

          {/* Scatter added organelles around the nucleus somewhat randomly based on index */}
          {addedOrganelles.map((org, index) => {
            const angle = (index * 360) / 6;
            const distance = 120;
            const x = Math.cos(angle * Math.PI / 180) * distance;
            const y = Math.sin(angle * Math.PI / 180) * distance;

            return (
              <div
                key={org.id}
                className="absolute w-24 h-24 bg-gray-700 rounded-xl flex items-center justify-center text-center p-2 text-sm font-bold shadow-md"
                style={{
                  top: `calc(50% + ${y}px - 48px)`,
                  left: `calc(50% + ${x}px - 48px)`
                }}
              >
                {org.name}
              </div>
            );
          })}
        </div>

        {/* Organelle Selection */}
        <div className="flex-1 w-full max-w-xl grid grid-cols-2 gap-6">
          {ORGANELLES.map(org => (
            <button
              key={org.id}
              onClick={() => handleAddOrganelle(org)}
              className="p-6 bg-gray-800 hover:bg-gray-700 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <span className="text-xl font-bold">{org.name}</span>
              <span className="text-sm text-gray-400 text-center">{org.desc}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
