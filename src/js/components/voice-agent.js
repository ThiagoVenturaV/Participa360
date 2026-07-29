export function renderVoiceAgent() {
    let container = document.getElementById('voice-agent-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'voice-agent-container';
        document.body.appendChild(container);
    }

    container.innerHTML = `
        <button class="fab voice-fab" id="voice-fab-btn" title="Falar com a Cora">
            <span class="material-symbols-outlined">mic</span>
        </button>
        <div id="voice-overlay" class="voice-overlay hidden">
            <div class="voice-status">Ouvindo...</div>
            <div class="voice-transcript" id="voice-transcript"></div>
            <button class="icon-button close-voice" id="close-voice-btn">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
    `;

    const fab = document.getElementById('voice-fab-btn');
    const overlay = document.getElementById('voice-overlay');
    const transcriptEl = document.getElementById('voice-transcript');
    const closeBtn = document.getElementById('close-voice-btn');
    
    let isListening = false;
    let recognition = null;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'pt-BR';
        recognition.interimResults = true;
        
        recognition.onresult = (event) => {
            let finalTranscript = '';
            let interimTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            
            transcriptEl.innerHTML = `
                <span class="final">${finalTranscript}</span>
                <span class="interim">${interimTranscript}</span>
            `;

            if (finalTranscript) {
                processCommand(finalTranscript);
            }
        };
        
        recognition.onend = () => {
            isListening = false;
            fab.classList.remove('listening');
        };
    }

    fab.addEventListener('click', () => {
        if (!recognition) {
            alert('Reconhecimento de voz não suportado neste navegador.');
            return;
        }

        if (isListening) {
            recognition.stop();
            overlay.classList.add('hidden');
        } else {
            transcriptEl.innerHTML = '';
            recognition.start();
            isListening = true;
            fab.classList.add('listening');
            overlay.classList.remove('hidden');
            document.querySelector('.voice-status').textContent = 'Ouvindo...';
        }
    });

    closeBtn.addEventListener('click', () => {
        if (recognition && isListening) recognition.stop();
        overlay.classList.add('hidden');
    });

    async function processCommand(text) {
        document.querySelector('.voice-status').textContent = 'Processando...';
        try {
            // Mock API call to /api/ai/process
            const response = await mockProcessApi(text);
            
            document.querySelector('.voice-status').textContent = 'Cora diz:';
            transcriptEl.innerHTML = `<span class="final">${response.message}</span>`;
            
            speak(response.message);
            
            if (response.action) {
                setTimeout(() => {
                    overlay.classList.add('hidden');
                    // execute action here
                }, 2000);
            }
        } catch (error) {
            document.querySelector('.voice-status').textContent = 'Erro';
            transcriptEl.textContent = 'Não foi possível processar o comando.';
        }
    }

    function speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'pt-BR';
            window.speechSynthesis.speak(utterance);
        }
    }

    async function mockProcessApi(text) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    message: 'Entendido, processando comando.',
                    action: { type: 'navigate', path: '/alertas' }
                });
            }, 1000);
        });
    }
}
