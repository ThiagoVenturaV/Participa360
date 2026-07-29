import React, { useEffect } from 'react';

export default function LibrasWidgetComponent() {
  useEffect(() => {
    // 1. Inject official VLibras Widget DOM structure if not already present
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

    // 2. Inject CSS rules to lock VLibras + Accessibility bar to the RIGHT LATERAL EDGE, VERTICALLY CENTERED
    let styleTag = document.getElementById('p360-libras-custom-style');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'p360-libras-custom-style';
      styleTag.innerHTML = `
        /* Dock VLibras to Right Edge Center */
        div[vw] {
          position: fixed !important;
          right: 0 !important;
          top: 50% !important;
          transform: translateY(10px) !important;
          bottom: auto !important;
          left: auto !important;
          z-index: 99990 !important;
        }

        div[vw] [vw-access-button] {
          position: relative !important;
          right: 0 !important;
          top: 0 !important;
          width: 44px !important;
          height: 44px !important;
          border-radius: 12px 0 0 12px !important;
          background-color: #1f108e !important;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2) !important;
        }

        /* Dock Universal Accessibility Button directly ABOVE VLibras on Right Center */
        #p360-acc-toolbar {
          position: fixed !important;
          right: 0 !important;
          top: 50% !important;
          transform: translateY(-44px) !important;
          z-index: 99995 !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-end !important;
        }

        #btn-acc-toggle {
          width: 44px !important;
          height: 44px !important;
          border-radius: 12px 0 0 12px !important;
          background-color: #1f108e !important;
          color: #ffffff !important;
          border: none !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2) !important;
          cursor: pointer !important;
          transition: background-color 0.2s !important;
        }

        #btn-acc-toggle:hover {
          background-color: #3730a3 !important;
        }

        #acc-menu-panel {
          position: absolute !important;
          right: 48px !important;
          top: 0 !important;
          width: 230px !important;
          background: #ffffff !important;
          border-radius: 16px !important;
          padding: 16px !important;
          box-shadow: 0 10px 30px rgba(11, 28, 48, 0.2) !important;
          border: 1px solid var(--surface-dim, #e2e8f0) !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 10px !important;
          font-size: 12px !important;
          z-index: 99999 !important;
        }
      `;
      document.head.appendChild(styleTag);
    }

    // 3. Inject Universal Accessibility Toolbar HTML (Button with Arms Open Person Icon)
    let accBar = document.getElementById('p360-acc-toolbar');
    if (!accBar) {
      accBar = document.createElement('div');
      accBar.id = 'p360-acc-toolbar';

      accBar.innerHTML = `
        <button id="btn-acc-toggle" title="Menu de Acessibilidade (Acessibilidade Universal)">
          <span class="material-symbols-outlined" style="font-size: 24px; color: #ffffff;">accessibility_new</span>
        </button>
        <div id="acc-menu-panel" style="display: none;">
          <div style="font-weight: 800; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; color: #0b1c30; display: flex; justify-content: space-between; align-items: center;">
            <span>♿ Acessibilidade Universal</span>
            <span id="btn-acc-close" style="cursor: pointer; font-size: 16px;" class="material-symbols-outlined">close</span>
          </div>
          <button id="btn-acc-contrast" className="btn btn-ghost btn-sm" style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 8px; border: 1px solid #e2e8f0; background: #f8f9ff; cursor: pointer; font-weight: 600; font-size: 12px;">
            <span class="material-symbols-outlined" style="font-size: 18px; color: #1f108e;">contrast</span> Alto Contraste
          </button>
          <button id="btn-acc-font-inc" className="btn btn-ghost btn-sm" style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 8px; border: 1px solid #e2e8f0; background: #f8f9ff; cursor: pointer; font-weight: 600; font-size: 12px;">
            <span class="material-symbols-outlined" style="font-size: 18px; color: #1f108e;">text_increase</span> Aumentar Fonte (+A)
          </button>
          <button id="btn-acc-font-dec" className="btn btn-ghost btn-sm" style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 8px; border: 1px solid #e2e8f0; background: #f8f9ff; cursor: pointer; font-weight: 600; font-size: 12px;">
            <span class="material-symbols-outlined" style="font-size: 18px; color: #1f108e;">text_decrease</span> Diminuir Fonte (-A)
          </button>
          <button id="btn-acc-tts" className="btn btn-ghost btn-sm" style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 8px; border: 1px solid #e2e8f0; background: #f8f9ff; cursor: pointer; font-weight: 600; font-size: 12px;">
            <span class="material-symbols-outlined" style="font-size: 18px; color: #1f108e;">volume_up</span> Leitor de Voz (TTS)
          </button>
        </div>
      `;

      document.body.appendChild(accBar);

      // Event Handlers
      const toggleBtn = document.getElementById('btn-acc-toggle');
      const closeBtn = document.getElementById('btn-acc-close');
      const panel = document.getElementById('acc-menu-panel');
      const contrastBtn = document.getElementById('btn-acc-contrast');
      const fontIncBtn = document.getElementById('btn-acc-font-inc');
      const fontDecBtn = document.getElementById('btn-acc-font-dec');
      const ttsBtn = document.getElementById('btn-acc-tts');

      let isHighContrast = false;
      let fontSizeScale = 100;
      let isTTSActive = false;

      const togglePanel = () => {
        panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
      };

      toggleBtn?.addEventListener('click', togglePanel);
      closeBtn?.addEventListener('click', togglePanel);

      contrastBtn?.addEventListener('click', () => {
        isHighContrast = !isHighContrast;
        document.documentElement.style.filter = isHighContrast ? 'contrast(140%) grayscale(20%)' : 'none';
      });

      fontIncBtn?.addEventListener('click', () => {
        fontSizeScale = Math.min(fontSizeScale + 10, 140);
        document.documentElement.style.fontSize = `${fontSizeScale}%`;
      });

      fontDecBtn?.addEventListener('click', () => {
        fontSizeScale = Math.max(fontSizeScale - 10, 90);
        document.documentElement.style.fontSize = `${fontSizeScale}%`;
      });

      ttsBtn?.addEventListener('click', () => {
        isTTSActive = !isTTSActive;
        ttsBtn.style.backgroundColor = isTTSActive ? '#ecfdf5' : '#f8f9ff';
        ttsBtn.style.color = isTTSActive ? '#047857' : 'inherit';
        if (isTTSActive && 'speechSynthesis' in window) {
          const speak = (e) => {
            const text = e.target.innerText;
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
