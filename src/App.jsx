import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './components/Toast';

import BottomNav from './components/BottomNav';
import VoiceAgent from './components/VoiceAgent';
import LibrasWidgetComponent from './components/LibrasWidgetComponent';
import PWATutorialModal from './components/PWATutorialModal';

import Login from './pages/Login';
import Register from './pages/Register';
import HomeMorador from './pages/HomeMorador';
import HomeLider from './pages/HomeLider';
import HomePrefeitura from './pages/HomePrefeitura';
import HomeEmpresa from './pages/HomeEmpresa';
import ReportarCategorias from './pages/ReportarCategorias';
import ReportarDetalhes from './pages/ReportarDetalhes';
import ReportarSucesso from './pages/ReportarSucesso';
import Alertas from './pages/Alertas';
import MeusRelatos from './pages/MeusRelatos';
import Marketplace from './pages/Marketplace';
import DetalhesProjeto from './pages/DetalhesProjeto';
import Perfil from './pages/Perfil';

function ProtectedLayout() {
  const { user, token, loading } = useAuth();
  const [showPWATutorial, setShowPWATutorial] = useState(false);

  useEffect(() => {
    // Show PWA tutorial on first visit if not installed
    const hasSeenPWATutorial = localStorage.getItem('p360_pwa_tutorial_seen');
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    if (!hasSeenPWATutorial && !isStandalone) {
      const timer = setTimeout(() => {
        setShowPWATutorial(true);
        localStorage.setItem('p360_pwa_tutorial_seen', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9ff' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '36px', color: 'var(--primary)', animation: 'spin 1s linear infinite' }}>sync</span>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const getRoleHome = () => {
    if (user?.role === 'lider') return '/home-lider';
    if (user?.role === 'prefeitura') return '/home-prefeitura';
    if (user?.role === 'empresa') return '/home-empresa';
    return '/home';
  };

  return (
    <>
      <Routes>
        <Route path="/home" element={<HomeMorador />} />
        <Route path="/home-lider" element={<HomeLider />} />
        <Route path="/home-prefeitura" element={<HomePrefeitura />} />
        <Route path="/home-empresa" element={<HomeEmpresa />} />
        <Route path="/reportar" element={<ReportarCategorias />} />
        <Route path="/reportar-detalhes" element={<ReportarDetalhes />} />
        <Route path="/reportar-sucesso" element={<ReportarSucesso />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/meus-relatos" element={<MeusRelatos />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/projeto/:id" element={<DetalhesProjeto />} />
        <Route path="/perfil" element={<Perfil onOpenPWATutorial={() => setShowPWATutorial(true)} />} />
        <Route path="*" element={<Navigate to={getRoleHome()} replace />} />
      </Routes>

      <BottomNav />
      <VoiceAgent />
      <LibrasWidgetComponent />
      <PWATutorialModal isOpen={showPWATutorial} onClose={() => setShowPWATutorial(false)} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<ProtectedLayout />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
