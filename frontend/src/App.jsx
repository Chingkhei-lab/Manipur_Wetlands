import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Explorer from './pages/Explorer';
import Catalog from './pages/Catalog';
import WetlandDetail from './pages/WetlandDetail';
import SpeciesDetail from './pages/SpeciesDetail';
import MapPage from './pages/MapPage';
import About from './pages/About';
import Login from './pages/Login';
import ManagerRegister from './pages/ManagerRegister';
import AdminManagers from './pages/AdminManagers';
import DataManager from './pages/DataManager';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/wetland/:id" element={<WetlandDetail />} />
          <Route path="/species/:speciesType/:id" element={<SpeciesDetail />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manager-register" element={<ManagerRegister />} />
          <Route path="/admin/managers" element={<AdminManagers />} />
          <Route path="/manage-data" element={<DataManager />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
