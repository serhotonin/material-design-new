import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DNABuilder_Grade8 from './DNABuilder_Grade8';
import CellOrganelles_Grade7 from './CellOrganelles_Grade7';
import ParticleState_Grade6 from './ParticleState_Grade6';
import AcidBaseTest_Grade8 from './AcidBaseTest_Grade8';
import EnergyCoaster_Grade7 from './EnergyCoaster_Grade7';
import FrictionForce_Grade5 from './FrictionForce_Grade5';
import AxialTiltSeasons_Grade8 from './AxialTiltSeasons_Grade8';
import Eclipses_Grade6 from './Eclipses_Grade6';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <h1 className="text-5xl font-bold text-center mb-12 text-blue-400 drop-shadow-lg">Bilim Eğitim Laboratuvarı</h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Theme 1: Yaşamın Şifreleri */}
        <div className="bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-700">
          <h2 className="text-3xl font-semibold mb-6 text-green-400">Yaşamın Şifreleri</h2>
          <div className="flex flex-col gap-4">
            <Link to="/dna-builder" className="w-full bg-gray-700 hover:bg-gray-600 p-6 rounded-2xl text-xl font-medium text-center transition-colors shadow-lg">DNA Oluşturucu (8. Sınıf)</Link>
            <Link to="/cell-organelles" className="w-full bg-gray-700 hover:bg-gray-600 p-6 rounded-2xl text-xl font-medium text-center transition-colors shadow-lg">Hücre Organelleri (7. Sınıf)</Link>
          </div>
        </div>

        {/* Theme 2: Maddenin Serüveni */}
        <div className="bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-700">
          <h2 className="text-3xl font-semibold mb-6 text-yellow-400">Maddenin Serüveni</h2>
          <div className="flex flex-col gap-4">
            <Link to="/particle-state" className="w-full bg-gray-700 hover:bg-gray-600 p-6 rounded-2xl text-xl font-medium text-center transition-colors shadow-lg">Madde Halleri (6. Sınıf)</Link>
            <Link to="/acid-base" className="w-full bg-gray-700 hover:bg-gray-600 p-6 rounded-2xl text-xl font-medium text-center transition-colors shadow-lg">Asit-Baz Testi (8. Sınıf)</Link>
          </div>
        </div>

        {/* Theme 3: Enerji ve Sistemler */}
        <div className="bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-700">
          <h2 className="text-3xl font-semibold mb-6 text-red-400">Enerji ve Sistemler</h2>
          <div className="flex flex-col gap-4">
            <Link to="/energy-coaster" className="w-full bg-gray-700 hover:bg-gray-600 p-6 rounded-2xl text-xl font-medium text-center transition-colors shadow-lg">Enerji Dönüşümü (7. Sınıf)</Link>
            <Link to="/friction-force" className="w-full bg-gray-700 hover:bg-gray-600 p-6 rounded-2xl text-xl font-medium text-center transition-colors shadow-lg">Sürtünme Kuvveti (5. Sınıf)</Link>
          </div>
        </div>

        {/* Theme 4: Evren ve Ötesi */}
        <div className="bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-700">
          <h2 className="text-3xl font-semibold mb-6 text-purple-400">Evren ve Ötesi</h2>
          <div className="flex flex-col gap-4">
            <Link to="/axial-tilt" className="w-full bg-gray-700 hover:bg-gray-600 p-6 rounded-2xl text-xl font-medium text-center transition-colors shadow-lg">Mevsimler (8. Sınıf)</Link>
            <Link to="/eclipses" className="w-full bg-gray-700 hover:bg-gray-600 p-6 rounded-2xl text-xl font-medium text-center transition-colors shadow-lg">Tutulmalar (6. Sınıf)</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dna-builder" element={<DNABuilder_Grade8 />} />
        <Route path="/cell-organelles" element={<CellOrganelles_Grade7 />} />
        <Route path="/particle-state" element={<ParticleState_Grade6 />} />
        <Route path="/acid-base" element={<AcidBaseTest_Grade8 />} />
        <Route path="/energy-coaster" element={<EnergyCoaster_Grade7 />} />
        <Route path="/friction-force" element={<FrictionForce_Grade5 />} />
        <Route path="/axial-tilt" element={<AxialTiltSeasons_Grade8 />} />
        <Route path="/eclipses" element={<Eclipses_Grade6 />} />
      </Routes>
    </Router>
  );
}
