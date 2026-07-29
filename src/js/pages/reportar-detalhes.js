import { api } from '../api.js';
import store from '../store.js';
import { router } from '../router.js';

export function render(container) {
  const category = new URLSearchParams(window.location.search).get('category') || store.getState().currentReportCategory || 'outro';

  container.innerHTML = `
    <div class="page-container page-detalhes has-fixed-bottom">
      <header class="page-header">
        <button class="back-button" id="back-btn" aria-label="Voltar">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 class="header-title">Detalhes do Problema</h2>
        <div class="points-badge">+10 pts por relatar</div>
      </header>

      <main class="content-padding form-content">
        <div class="category-chips animate-slide-up horizontal-scroll">
          <div class="chip \${category === 'buraco' ? 'active' : ''}">Buraco</div>
          <div class="chip \${category === 'iluminacao' ? 'active' : ''}">Iluminação</div>
          <div class="chip \${category === 'lixo' ? 'active' : ''}">Lixo</div>
          <div class="chip \${category === 'vandalismo' ? 'active' : ''}">Vandalismo</div>
          <div class="chip \${category === 'agua' ? 'active' : ''}">Água</div>
          <div class="chip \${category === 'outro' ? 'active' : ''}">Outro</div>
        </div>

        <section class="form-section animate-slide-up stagger-1">
          <div class="photo-upload-area dashed-border" id="photo-upload">
            <span class="material-symbols-outlined camera-icon">photo_camera</span>
            <p>Toque para Adicionar Foto</p>
          </div>
        </section>

        <section class="form-section animate-slide-up stagger-2">
          <button class="btn btn-secondary full-width audio-btn">
            <span class="material-symbols-outlined">mic</span> Gravar Áudio
          </button>
        </section>

        <section class="form-section animate-slide-up stagger-3">
          <label class="input-label">Descrição</label>
          <textarea id="description-input" class="textarea-input" placeholder="Descreva o problema com mais detalhes..."></textarea>
        </section>

        <section class="form-section animate-slide-up stagger-4">
          <label class="input-label">Localização</label>
          <div class="location-card">
            <div class="map-placeholder">
              <span class="material-symbols-outlined">map</span>
            </div>
            <div class="location-info">
              <span class="address-text">Rua das Flores, 123 - Centro</span>
              <button class="link-btn text-primary">Atualizar GPS</button>
            </div>
          </div>
        </section>
      </main>

      <div class="fixed-bottom-bar">
        <button class="btn btn-primary full-width" id="submit-report-btn">
          Enviar Relato ➤
        </button>
      </div>
    </div>
  `;

  document.getElementById('back-btn').addEventListener('click', () => {
    window.history.back();
  });

  document.getElementById('submit-report-btn').addEventListener('click', async () => {
    const btn = document.getElementById('submit-report-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Enviando...';
    
    try {
      await api.post('/api/reports', {
        category,
        description: document.getElementById('description-input').value,
        location: 'Rua das Flores, 123 - Centro'
      });
      const points = store.getState().points || 0;
      store.setState({ points: points + 10 });
      router.navigate('/reportar-sucesso');
    } catch (e) {
      console.error(e);
      btn.disabled = false;
      btn.innerHTML = 'Enviar Relato ➤';
      alert('Erro ao enviar relato.');
    }
  });
}
