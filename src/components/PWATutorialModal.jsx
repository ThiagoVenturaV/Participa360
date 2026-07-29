import React, { useState, useEffect } from 'react';
import { useToast } from './Toast';

export default function PWATutorialModal({ isOpen, onClose }) {
  const { showToast } = useToast();
  const [deviceType, setDeviceType] = useState('android');
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || '';
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    const inStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    setIsStandalone(inStandalone);

    if (isIOS) setDeviceType('ios');
    else if (isAndroid) setDeviceType('android');
    else setDeviceType('desktop');
  }, []);

  const handleInstallClick = async () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      const { outcome } = await window.deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('Participa 360 instalado com sucesso na sua tela inicial! 🎉', 'success');
        window.deferredPrompt = null;
        onClose();
      }
    } else {
      showToast('Siga as instruções abaixo para adicionar à tela de início.', 'info');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop z-50">
      <div className="modal animate-slide-up" style={{ maxWidth: '420px', width: '100%', padding: '24px', borderRadius: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--primary)' }}>
              {deviceType === 'ios' ? 'phone_iphone' : deviceType === 'android' ? 'adb' : 'install_desktop'}
            </span>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--on-surface)' }}>
              Instalar Participa 360
            </h3>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--outline)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
          </button>
        </div>

        {isStandalone ? (
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#ecfdf5', borderRadius: '16px', color: 'var(--secondary)', marginBottom: '16px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '32px', marginBottom: '4px' }}>check_circle</span>
            <div style={{ fontSize: '14px', fontWeight: '800' }}>Aplicativo Já Instalado!</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>Você está usando a versão PWA instalada do Participa 360.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', color: 'var(--outline)', lineHeight: '1.5' }}>
              Detectamos que você está usando <strong>{deviceType === 'ios' ? 'iPhone / iPad (iOS)' : deviceType === 'android' ? 'Android' : 'Desktop / PC'}</strong>. Veja como instalar:
            </div>

            {deviceType === 'ios' && (
              <div className="card" style={{ backgroundColor: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                  <div style={{ fontSize: '12px', fontWeight: '700' }}>
                    Toque no botão <strong>Compartilhar</strong> <span className="material-symbols-outlined" style={{ fontSize: '16px', verticalAlign: 'middle' }}>ios_share</span> no rodapé do Safari.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                  <div style={{ fontSize: '12px', fontWeight: '700' }}>
                    Role para baixo e selecione <strong>Adicionar à Tela de Início</strong> <span className="material-symbols-outlined" style={{ fontSize: '16px', verticalAlign: 'middle' }}>add_box</span>.
                  </div>
                </div>
              </div>
            )}

            {deviceType === 'android' && (
              <div className="card" style={{ backgroundColor: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                  <div style={{ fontSize: '12px', fontWeight: '700' }}>
                    Toque nos <strong>3 pontinhos do menu</strong> <span className="material-symbols-outlined" style={{ fontSize: '16px', verticalAlign: 'middle' }}>more_vert</span> no canto superior.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                  <div style={{ fontSize: '12px', fontWeight: '700' }}>
                    Selecione <strong>Instalar Aplicativo</strong> ou <strong>Adicionar à tela inicial</strong>.
                  </div>
                </div>
              </div>
            )}

            {deviceType === 'desktop' && (
              <div className="card" style={{ backgroundColor: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                  <div style={{ fontSize: '12px', fontWeight: '700' }}>
                    Clique no ícone de instalação <span className="material-symbols-outlined" style={{ fontSize: '16px', verticalAlign: 'middle' }}>install_desktop</span> na barra de endereço do navegador.
                  </div>
                </div>
              </div>
            )}

            {window.deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="btn btn-primary btn-block"
                style={{ borderRadius: '9999px', marginTop: '8px' }}
              >
                Instalar Agora
              </button>
            )}
          </div>
        )}

        <button onClick={onClose} className="btn btn-outline btn-block" style={{ borderRadius: '9999px' }}>
          Entendido
        </button>
      </div>
    </div>
  );
}
