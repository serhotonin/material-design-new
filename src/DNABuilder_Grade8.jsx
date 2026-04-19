import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NUCLEOTIDES = [
  { id: 'A', name: 'Adenin', color: 'bg-red-500', pair: 'T' },
  { id: 'T', name: 'Timin', color: 'bg-green-500', pair: 'A' },
  { id: 'G', name: 'Guanin', color: 'bg-blue-500', pair: 'C' },
  { id: 'C', name: 'Sitozin', color: 'bg-yellow-500', pair: 'G' },
];

export default function DNABuilder_Grade8() {
  const [targetStrand] = useState(['A', 'C', 'T', 'G', 'A']);
  const [userStrand, setUserStrand] = useState([null, null, null, null, null]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [message, setMessage] = useState('');
  const [shake, setShake] = useState(false);

  const handleNucleotideClick = (nucleotide) => {
    if (selectedSlot === null) {
      setMessage('Lütfen önce DNA zincirinde boş bir yer seçin!');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const targetNucleotide = targetStrand[selectedSlot];
    const correctPair = NUCLEOTIDES.find(n => n.id === targetNucleotide).pair;

    if (nucleotide.id === correctPair) {
      const newStrand = [...userStrand];
      newStrand[selectedSlot] = nucleotide.id;
      setUserStrand(newStrand);
      setSelectedSlot(null);
      setMessage('Doğru eşleşme!');

      if (newStrand.every(n => n !== null)) {
        setMessage('Tebrikler! DNA zincirini başarıyla tamamladınız!');
      }
    } else {
      setMessage(`Hata! ${NUCLEOTIDES.find(n => n.id === targetNucleotide).name} sadece ${NUCLEOTIDES.find(n => n.id === correctPair).name} ile eşleşir.`);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center font-sans">
      <Link to="/" className="self-start mb-8 p-4 bg-gray-800 rounded-xl shadow-lg text-xl hover:bg-gray-700 transition">Ana Menüye Dön</Link>

      <h1 className="text-4xl font-bold mb-8 text-green-400">DNA Oluşturucu</h1>

      <div className={`h-16 flex items-center justify-center w-full max-w-2xl mb-8 rounded-xl ${message.includes('Hata') || message.includes('Lütfen') ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'} text-2xl font-semibold transition-all ${shake ? 'animate-bounce' : ''}`}>
        {message || 'Eşleşecek nükleotidi seçmek için aşağıdaki boşluklara dokunun.'}
      </div>

      <div className="flex gap-4 mb-16 bg-gray-800 p-8 rounded-3xl shadow-2xl">
        <div className="flex flex-col gap-2">
          {targetStrand.map((n, i) => {
            const nucleotide = NUCLEOTIDES.find(item => item.id === n);
            return (
              <div key={`target-${i}`} className={`w-24 h-24 flex items-center justify-center text-3xl font-bold rounded-l-full shadow-inner ${nucleotide.color}`}>
                {nucleotide.id}
              </div>
            );
          })}
        </div>

        <div className="w-8 bg-gray-700 rounded-full"></div>

        <div className="flex flex-col gap-2">
          {userStrand.map((n, i) => {
            const isSelected = selectedSlot === i;
            const nucleotide = n ? NUCLEOTIDES.find(item => item.id === n) : null;
            return (
              <div
                key={`user-${i}`}
                onClick={() => !n && setSelectedSlot(i)}
                className={`w-24 h-24 flex items-center justify-center text-3xl font-bold rounded-r-full shadow-inner cursor-pointer transition-all ${n ? nucleotide.color : 'bg-gray-700 border-4 border-dashed border-gray-500'} ${isSelected ? 'ring-8 ring-white z-10 scale-110' : ''}`}
              >
                {n ? nucleotide.id : '?'}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
        {NUCLEOTIDES.map(n => (
          <button
            key={n.id}
            onClick={() => handleNucleotideClick(n)}
            className={`p-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-4 ${n.color} active:scale-95 transition-transform`}
          >
            <span className="text-4xl font-bold">{n.id}</span>
            <span className="text-xl font-medium">{n.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
