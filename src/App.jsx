import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './components/Toast';

import BottomNav from './components/BottomNav';
import VoiceAgent from './components/VoiceAgent';

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
        <Route path="/perfil" element={<Perfil />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      <BottomNav />
      <VoiceAgent />
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
