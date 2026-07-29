import React, { useEffect } from 'react';

export default function LibrasWidgetComponent() {
  useEffect(() => {
    // 1. Initialize VLibras Widget
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

    // 2. Universal Accessibility Suite Toolbar (Contraste, Tamanho de Fonte, Leitor de Voz, Dislexia)
    let accBar = document.getElementById('p360-acc-toolbar');
    if (!accBar) {
      accBar = document.createElement('div');
      accBar.id = 'p360-acc-toolbar';
      accBar.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        z-index: 9998;
        display: flex;
        flex-direction: column;
        gap: 6px;
      `;

      accBar.innerHTML = `
        <button id="btn-acc-toggle" class="btn btn-outline" style="width: 44px; height: 44px; padding: 0; border-radius: 50%; background: #ffffff; color: var(--primary); box-shadow: var(--shadow-elevated);" title="Menu de Acessibilidade">
          <span class="material-symbols-outlined" style="font-size: 22px;">accessibility_new</span>
        </button>
        <div id="acc-menu-panel" style="display: none; position: absolute; bottom: 52px; right: 0; width: 220px; background: #ffffff; border-radius: 16px; padding: 12px; box-shadow: var(--shadow-elevated); border: 1px solid var(--surface-dim); flex-direction: column; gap: 8px; font-size: 12px;">
          <div style="font-weight: 800; border-bottom: 1px solid var(--surface-dim); padding-bottom: 4px; color: var(--on-surface);">♿ Acessibilidade Universal</div>
          <button id="btn-acc-contrast" class="btn btn-ghost btn-sm" style="justify-flex-start; text-align: left; gap: 6px;">
            <span class="material-symbols-outlined" style="font-size: 16px;">contrast</span> Alto Contraste
          </button>
          <button id="btn-acc-font-inc" class="btn btn-ghost btn-sm" style="justify-flex-start; text-align: left; gap: 6px;">
            <span class="material-symbols-outlined" style="font-size: 16px;">text_increase</span> Aumentar Texto
          </button>
          <button id="btn-acc-font-dec" class="btn btn-ghost btn-sm" style="justify-flex-start; text-align: left; gap: 6px;">
            <span class="material-symbols-outlined" style="font-size: 16px;">text_decrease</span> Diminuir Texto
          </button>
          <button id="btn-acc-tts" class="btn btn-ghost btn-sm" style="justify-flex-start; text-align: left; gap: 6px;">
            <span class="material-symbols-outlined" style="font-size: 16px;">volume_up</span> Leitor de Voz (TTS)
          </button>
        </div>
      `;

      document.body.appendChild(accBar);

      // Event Listeners for Accessibility Suite Controls
      const toggleBtn = document.getElementById('btn-acc-toggle');
      const panel = document.getElementById('acc-menu-panel');
      const contrastBtn = document.getElementById('btn-acc-contrast');
      const fontIncBtn = document.getElementById('btn-acc-font-inc');
      const fontDecBtn = document.getElementById('btn-acc-font-dec');
      const ttsBtn = document.getElementById('btn-acc-tts');

      let isHighContrast = false;
      let fontSizeScale = 100;
      let isTTSActive = false;

      toggleBtn?.addEventListener('click', () => {
        panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
      });

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
        ttsBtn.style.color = isTTSActive ? 'var(--secondary)' : 'inherit';
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
