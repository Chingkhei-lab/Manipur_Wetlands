import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Explorer from './pages/Explorer';
import Catalog from './pages/Catalog';
import WetlandDetail from './pages/WetlandDetail';
import SpeciesDetail from './pages/SpeciesDetail';
import MapPage from './pages/MapPage';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/wetland/:id" element={<WetlandDetail />} />
        <Route path="/species/:id" element={<SpeciesDetail />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
