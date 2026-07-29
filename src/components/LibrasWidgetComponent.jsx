import React, { useEffect } from 'react';

export default function LibrasWidgetComponent() {
  useEffect(() => {
    // 1. Initialize Official VLibras Widget (Untouched default styling and official hands symbol)
    if (!document.getElementById('vlibras-plugin-script')) {
      const div = document.createElement('div');
      div.setAttribute('vw', '');
      div.className = 'enabled';
      div.innerHTML = `
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
          <div class="vw-plugin-top-wrapper"></div>
        </div>
      `;
      document.body.appendChild(div);

      const script = document.createElement('script');
      script.id = 'vlibras-plugin-script';
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
      script.async = true;
      script.onload = () => {
        if (window.VLibras) {
          new window.VLibras.Widget('https://vlibras.gov.br/app');
        }
      };
      document.body.appendChild(script);
    }

    // Remove any legacy custom style overrides that broke VLibras
    const oldStyle = document.getElementById('p360-libras-custom-style');
    if (oldStyle) oldStyle.remove();

    // 2. Inject Universal Accessibility Toolbar (starts collapsed, opens on click, closes with X)
    let accContainer = document.getElementById('p360-acc-container');
    if (!accContainer) {
      accContainer = document.createElement('div');
      accContainer.id = 'p360-acc-container';
      accContainer.style.cssText = `
        position: fixed;
        right: 0;
        top: 45%;
        transform: translateY(-50%);
        z-index: 99999;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      `;

      accContainer.innerHTML = `
        <button id="p360-acc-toggle-btn" style="width: 44px; height: 44px; background-color: #1f108e; color: #ffffff; border: none; border-radius: 12px 0 0 12px; display: flex; align-items: center; justifyContent: center; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.25);" title="Menu de Acessibilidade">
          <span class="material-symbols-outlined" style="font-size: 24px;">accessibility_new</span>
        </button>

        <div id="p360-acc-modal-panel" style="display: none; position: absolute; right: 50px; top: 0; width: 240px; background: #ffffff; border-radius: 16px; padding: 16px; box-shadow: 0 10px 30px rgba(11, 28, 48, 0.25); border: 1px solid #e2e8f0; flex-direction: column; gap: 10px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
            <span style="font-weight: 800; color: #0b1c30; display: flex; align-items: center; gap: 6px;">
              <span class="material-symbols-outlined" style="font-size: 18px; color: #1f108e;">accessible</span> Acessibilidade
            </span>
            <button id="p360-acc-close-btn" style="border: none; background: none; cursor: pointer; color: #64748b; padding: 0; display: flex; align-items: center;">
              <span class="material-symbols-outlined" style="font-size: 20px;">close</span>
            </button>
          </div>

          <button id="acc-btn-contrast" style="display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 10px; border: 1px solid #e2e8f0; background: #f8f9ff; cursor: pointer; font-weight: 600; font-size: 12px; color: #0b1c30;">
            <span class="material-symbols-outlined" style="font-size: 18px; color: #1f108e;">contrast</span> Alto Contraste
          </button>

          <button id="acc-btn-font-inc" style="display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 10px; border: 1px solid #e2e8f0; background: #f8f9ff; cursor: pointer; font-weight: 600; font-size: 12px; color: #0b1c30;">
            <span class="material-symbols-outlined" style="font-size: 18px; color: #1f108e;">text_increase</span> Aumentar Fonte (+A)
          </button>

          <button id="acc-btn-font-dec" style="display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 10px; border: 1px solid #e2e8f0; background: #f8f9ff; cursor: pointer; font-weight: 600; font-size: 12px; color: #0b1c30;">
            <span class="material-symbols-outlined" style="font-size: 18px; color: #1f108e;">text_decrease</span> Diminuir Fonte (-A)
          </button>

          <button id="acc-btn-tts" style="display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 10px; border: 1px solid #e2e8f0; background: #f8f9ff; cursor: pointer; font-weight: 600; font-size: 12px; color: #0b1c30;">
            <span class="material-symbols-outlined" style="font-size: 18px; color: #1f108e;">volume_up</span> Leitor de Voz (TTS)
          </button>
        </div>
      `;

      document.body.appendChild(accContainer);

      // Event listeners
      const toggleBtn = document.getElementById('p360-acc-toggle-btn');
      const closeBtn = document.getElementById('p360-acc-close-btn');
      const panel = document.getElementById('p360-acc-modal-panel');

      const openPanel = () => { panel.style.display = 'flex'; };
      const closePanel = () => { panel.style.display = 'none'; };

      toggleBtn?.addEventListener('click', () => {
        if (panel.style.display === 'none') openPanel();
        else closePanel();
      });

      closeBtn?.addEventListener('click', closePanel);

      // Accessibility features logic
      let isHighContrast = false;
      let fontSizeScale = 100;
      let isTTSActive = false;

      document.getElementById('acc-btn-contrast')?.addEventListener('click', () => {
        isHighContrast = !isHighContrast;
        document.documentElement.style.filter = isHighContrast ? 'contrast(140%) grayscale(20%)' : 'none';
      });

      document.getElementById('acc-btn-font-inc')?.addEventListener('click', () => {
        fontSizeScale = Math.min(fontSizeScale + 10, 140);
        document.documentElement.style.fontSize = `${fontSizeScale}%`;
      });

      document.getElementById('acc-btn-font-dec')?.addEventListener('click', () => {
        fontSizeScale = Math.max(fontSizeScale - 10, 90);
        document.documentElement.style.fontSize = `${fontSizeScale}%`;
      });

      document.getElementById('acc-btn-tts')?.addEventListener('click', (e) => {
        const btn = e.currentTarget;
        isTTSActive = !isTTSActive;
        btn.style.backgroundColor = isTTSActive ? '#ecfdf5' : '#f8f9ff';
        btn.style.color = isTTSActive ? '#047857' : '#0b1c30';

        if (isTTSActive && 'speechSynthesis' in window) {
          const speak = (ev) => {
            const text = ev.target?.innerText;
            if (text && text.length > 2 && text.length < 200) {
              window.speechSynthesis.cancel();
              const utt = new SpeechSynthesisUtterance(text);
              utt.lang = 'pt-BR';
              window.speechSynthesis.speak(utt);
            }
          };
          document.body.addEventListener('mouseover', speak);
        }
      });
    }
  }, []);

  return null;
}
