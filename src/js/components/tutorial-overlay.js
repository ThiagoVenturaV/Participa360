export function showTutorial() {
    if (localStorage.getItem('p360_tutorial_done')) {
        return;
    }

    const steps = [
        { text: 'Bem-vindo ao Participa 360! Veja como transformar sua cidade.' },
        { text: 'Toque aqui para reportar problemas na sua comunidade.', targetSelector: '.bottom-nav [data-tab="acao"]' },
        { text: 'Ganhe pontos por cada contribuição e suba de nível!', targetSelector: '.points-badge' },
        { text: 'Use a Cora, nossa assistente por voz, para navegar com facilidade.', targetSelector: '.voice-fab' }
    ];

    let currentStep = 0;
    
    let overlay = document.getElementById('tutorial-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'tutorial-overlay';
        overlay.className = 'tutorial-overlay';
        document.body.appendChild(overlay);
    }

    function renderStep() {
        const step = steps[currentStep];
        
        // Reset any previous highlights
        document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
        
        if (step.targetSelector) {
            const target = document.querySelector(step.targetSelector);
            if (target) {
                target.classList.add('tutorial-highlight');
            }
        }

        overlay.innerHTML = `
            <div class="tutorial-box">
                <p class="tutorial-text">${step.text}</p>
                <div class="tutorial-actions">
                    <button class="button secondary" id="tutorial-skip">Pular</button>
                    <button class="button primary" id="tutorial-next">${currentStep === steps.length - 1 ? 'Começar' : 'Próximo'}</button>
                </div>
                <div class="tutorial-progress">
                    ${steps.map((_, i) => `<span class="dot ${i === currentStep ? 'active' : ''}"></span>`).join('')}
                </div>
            </div>
        `;
        
        document.getElementById('tutorial-skip').addEventListener('click', finishTutorial);
        document.getElementById('tutorial-next').addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                renderStep();
            } else {
                finishTutorial();
            }
        });
    }

    function finishTutorial() {
        document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
        overlay.remove();
        localStorage.setItem('p360_tutorial_done', 'true');
    }

    renderStep();
}
